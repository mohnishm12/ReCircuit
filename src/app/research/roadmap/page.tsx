import type { Metadata } from "next";

import { RoadmapPage } from "@/components/research-portal";

export const metadata: Metadata = {
  title: "Research Roadmap",
  description:
    "Transparent ReCircuit roadmap from research to prototype, MVP, pilot, enterprise platform, and long-term circular intelligence vision.",
  alternates: {
    canonical: "/research/roadmap"
  }
};

export default function Page() {
  return <RoadmapPage />;
}
