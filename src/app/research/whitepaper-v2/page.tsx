import type { Metadata } from "next";

import { WhitepaperOnlinePage } from "@/components/research-portal";

export const metadata: Metadata = {
  title: "Whitepaper v2.0",
  description:
    "ReCircuit Research Whitepaper v2.0: Building the Intelligence Layer for the Circular Economy.",
  alternates: {
    canonical: "/research/whitepaper-v2"
  }
};

export default function Page() {
  return <WhitepaperOnlinePage />;
}
