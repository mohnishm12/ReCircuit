import type { Metadata } from "next";

import { ArchitecturePage } from "@/components/research-portal";

export const metadata: Metadata = {
  title: "Research Architecture",
  description:
    "Technical architecture companion for ReCircuit material intelligence, AI, carbon intelligence, ESG evidence, and data pipeline subsystems.",
  alternates: {
    canonical: "/research/architecture"
  }
};

export default function Page() {
  return <ArchitecturePage />;
}
