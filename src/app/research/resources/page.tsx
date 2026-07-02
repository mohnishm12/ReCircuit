import type { Metadata } from "next";

import { ResourcesPage } from "@/components/research-portal";

export const metadata: Metadata = {
  title: "Research Resources",
  description:
    "Download ReCircuit Whitepaper v2.0 PDF, DOCX, Markdown, citation metadata, version history, change log, and references.",
  alternates: {
    canonical: "/research/resources"
  }
};

export default function Page() {
  return <ResourcesPage />;
}
