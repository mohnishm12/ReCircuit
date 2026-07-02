import { spawn, spawnSync } from "node:child_process";
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { chromium } from "playwright";

const port = 3100;
const url = `http://127.0.0.1:${port}`;
const outDir = join(process.cwd(), "test-results");
mkdirSync(outDir, { recursive: true });

const server = spawn(process.execPath, ["node_modules/next/dist/bin/next", "dev", "-H", "127.0.0.1", "-p", String(port)], {
  cwd: process.cwd(),
  stdio: ["ignore", "pipe", "pipe"]
});

let logs = "";
server.stdout.on("data", (chunk) => {
  logs += chunk.toString();
});
server.stderr.on("data", (chunk) => {
  logs += chunk.toString();
});

async function waitForServer() {
  const deadline = Date.now() + 45_000;
  while (Date.now() < deadline) {
    try {
      const response = await fetch(url);
      if (response.ok) return;
    } catch {
      await new Promise((resolve) => setTimeout(resolve, 700));
    }
  }
  throw new Error(`Server did not start. Logs:\n${logs}`);
}

function countNonBlankPixels(data) {
  let count = 0;
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const a = data[i + 3];
    if (a > 20 && (r > 16 || g > 16 || b > 16) && Math.max(r, g, b) - Math.min(r, g, b) > 8) {
      count += 1;
    }
  }
  return count;
}

try {
  await waitForServer();
  const browser = await chromium.launch();

  for (const viewport of [
    { width: 1440, height: 1000, name: "desktop" },
    { width: 390, height: 844, name: "mobile" }
  ]) {
    const page = await browser.newPage({ viewport });
    await page.goto(url, { waitUntil: "networkidle" });
    await page.waitForSelector("canvas", { timeout: 25_000 });
    await page.waitForTimeout(1800);
    await page.screenshot({ path: join(outDir, `recircuit-${viewport.name}.png`), fullPage: true });

    const result = await page.evaluate(() => {
      const canvas = document.querySelector("canvas");
      if (!canvas) return { ok: false, reason: "missing canvas", pixels: 0 };
      const sample = document.createElement("canvas");
      sample.width = 180;
      sample.height = 120;
      const ctx = sample.getContext("2d");
      if (!ctx) return { ok: false, reason: "missing 2d context", pixels: 0 };
      ctx.drawImage(canvas, 0, 0, sample.width, sample.height);
      return { ok: true, reason: "sampled", pixels: Array.from(ctx.getImageData(0, 0, sample.width, sample.height).data) };
    });

    if (!result.ok) throw new Error(result.reason);
    const nonBlank = countNonBlankPixels(result.pixels);
    if (nonBlank < 1400) {
      throw new Error(`Canvas too blank on ${viewport.name}: ${nonBlank} colored pixels`);
    }

    await page.close();
  }

  const sectionPage = await browser.newPage({ viewport: { width: 1440, height: 950 } });
  await sectionPage.goto(url, { waitUntil: "domcontentloaded" });
  const sectionIds = [
    "hero",
    "mission",
    "ai-engine",
    "platform",
    "circular-economy",
    "esg",
    "enterprise-dashboard",
    "technology",
    "roadmap",
    "whitepaper",
    "founder",
    "status",
    "contact"
  ];

  for (const id of sectionIds) {
    await sectionPage.locator(`#${id}`).scrollIntoViewIfNeeded();
    await sectionPage.waitForTimeout(450);
    const visibleText = await sectionPage.locator(`#${id}`).evaluate((element) => {
      const rect = element.getBoundingClientRect();
      const inViewport = rect.bottom > 80 && rect.top < window.innerHeight - 80;
      return {
        inViewport,
        textLength: element.textContent?.trim().length ?? 0
      };
    });

    if (!visibleText.inViewport || visibleText.textLength < 80) {
      throw new Error(`Section ${id} not visibly populated`);
    }
  }

  await sectionPage.screenshot({ path: join(outDir, "recircuit-section-contact.png"), fullPage: false });
  await sectionPage.close();

  await browser.close();
  writeFileSync(join(outDir, "visual-check.txt"), "visual render ok\n");
  console.log("visual render ok");
} finally {
  if (process.platform === "win32" && server.pid) {
    spawnSync("taskkill", ["/PID", String(server.pid), "/T", "/F"], { stdio: "ignore" });
  } else {
    server.kill();
  }
}
