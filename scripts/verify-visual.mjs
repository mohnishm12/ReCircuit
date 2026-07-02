import { spawn, spawnSync } from "node:child_process";
import { existsSync, mkdirSync, writeFileSync } from "node:fs";
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

  const researchRoutes = [
    { path: "/research", name: "research", mustContain: ["Public research portal", "Publication files"] },
    { path: "/research/whitepaper-v2", name: "research-whitepaper", mustContain: ["Executive Summary", "Current Status"] },
    { path: "/research/architecture", name: "research-architecture", mustContain: ["Original SVG diagrams", "System Architecture"] },
    { path: "/research/roadmap", name: "research-roadmap", mustContain: ["Transparent path", "research to pilot"] },
    { path: "/research/resources", name: "research-resources", mustContain: ["Download, cite, inspect sources", "Recommended citation"] }
  ];

  for (const route of researchRoutes) {
    const page = await browser.newPage({ viewport: { width: 1440, height: 950 } });
    await page.goto(`${url}${route.path}`, { waitUntil: "networkidle" });
    const pageState = await page.locator("main").evaluate((element, expectedText) => {
      const text = element.textContent?.trim() ?? "";
      return {
        textLength: text.length,
        matches: expectedText.map((needle) => text.includes(needle))
      };
    }, route.mustContain);

    if (pageState.matches.some((match) => !match) || pageState.textLength < 400) {
      throw new Error(`Research route ${route.path} not visibly populated`);
    }
    await page.screenshot({ path: join(outDir, `${route.name}.png`), fullPage: false });
    await page.close();
  }

  for (const artifact of [
    "public/research/recircuit-research-whitepaper-v2.0.pdf",
    "public/research/recircuit-research-whitepaper-v2.0.docx",
    "public/research/recircuit-research-whitepaper-v2.0.md",
    "public/research/citation.cff",
    "public/research/diagrams/system-architecture.svg"
  ]) {
    if (!existsSync(join(process.cwd(), artifact))) {
      throw new Error(`Missing research artifact: ${artifact}`);
    }
  }

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
