import type { Metadata } from "next";

import { ResearchOverviewPage } from "@/components/research-portal";

export const metadata: Metadata = {
  title: "Research",
  description:
    "ReCircuit Research portal with Whitepaper v2.0, architecture companion, roadmap, references, citation metadata, and downloadable publication files.",
  alternates: {
    canonical: "/research"
  }
};

export default function Page() {
  return <ResearchOverviewPage />;
}
