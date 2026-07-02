import { writeFileSync } from "node:fs";
import { join } from "node:path";

const lines = [
  "ReCircuit Intelligence Brief",
  "Building the Intelligence Layer for the Circular Economy",
  "",
  "Version 0.1 - founder research note",
  "",
  "1. Problem",
  "E-waste recovery is fragmented. Useful materials are lost, carbon data is weak, and reverse",
  "logistics decisions often happen without enough intelligence.",
  "",
  "2. AI recovery intelligence",
  "ReCircuit explores how computer vision, component analysis, valuation, and routing logic can",
  "support better recovery decisions without hiding uncertainty.",
  "",
  "3. ESG evidence",
  "The system design separates measured evidence from estimates. Strong claims require proof,",
  "chain-of-custody fields, processor records, and clear confidence levels.",
  "",
  "4. Current stage",
  "Research is active. Website is live. Architecture is complete. Prototype is in development.",
  "Pilot partners are coming soon after controlled testing workflows are ready.",
  "",
  "5. Founder",
  "Mohnish M is a Computer Science Engineering student building AI systems for the Circular Economy."
];

function pdfEscape(value) {
  return value.replaceAll("\\", "\\\\").replaceAll("(", "\\(").replaceAll(")", "\\)");
}

const content = [
  "BT",
  "/F1 24 Tf",
  "72 760 Td",
  `(${pdfEscape(lines[0])}) Tj`,
  "/F1 12 Tf",
  "0 -34 Td",
  ...lines.slice(1).flatMap((line) => [`(${pdfEscape(line)}) Tj`, "0 -18 Td"]),
  "ET"
].join("\n");

const objects = [
  "<< /Type /Catalog /Pages 2 0 R >>",
  "<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
  "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >>",
  "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>",
  `<< /Length ${Buffer.byteLength(content)} >>\nstream\n${content}\nendstream`
];

let pdf = "%PDF-1.4\n";
const offsets = [0];

objects.forEach((object, index) => {
  offsets.push(Buffer.byteLength(pdf));
  pdf += `${index + 1} 0 obj\n${object}\nendobj\n`;
});

const xrefOffset = Buffer.byteLength(pdf);
pdf += `xref\n0 ${objects.length + 1}\n`;
pdf += "0000000000 65535 f \n";
offsets.slice(1).forEach((offset) => {
  pdf += `${String(offset).padStart(10, "0")} 00000 n \n`;
});
pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF\n`;

writeFileSync(join(process.cwd(), "public", "recircuit-ai-circular-economy-whitepaper.pdf"), pdf);
