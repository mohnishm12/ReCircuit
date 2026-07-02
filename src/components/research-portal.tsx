import {
  ArrowRight,
  BookOpen,
  Braces,
  Download,
  FileText,
  GitBranch,
  Layers3,
  Network,
  ShieldCheck
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import type { ReactNode } from "react";

import research from "@/data/research-whitepaper-v2.json";
import { cn } from "@/lib/utils";

const data = research;

const researchNav = [
  { label: "Overview", href: "/research" },
  { label: "Whitepaper", href: "/research/whitepaper-v2" },
  { label: "Architecture", href: "/research/architecture" },
  { label: "Roadmap", href: "/research/roadmap" },
  { label: "Resources", href: "/research/resources" }
];

const downloads = [
  { label: "PDF", href: data.meta.pdfPath, icon: Download },
  { label: "DOCX", href: data.meta.docxPath, icon: FileText },
  { label: "Markdown", href: data.meta.markdownPath, icon: Braces },
  { label: "Citation", href: data.meta.citationPath, icon: BookOpen }
];

function ResearchHeader({ active = "Overview" }: { active?: string }) {
  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.08] bg-[#050505]/84 backdrop-blur-2xl">
      <div className="mx-auto flex min-h-16 max-w-7xl flex-col gap-3 px-4 py-3 md:flex-row md:items-center md:justify-between">
        <Link href="/" className="flex items-center gap-3" aria-label="ReCircuit home">
          <span className="flex size-9 items-center justify-center rounded-full border border-[#14f195]/35 bg-[#14f195]/10">
            <Network className="size-4 text-[#14f195]" />
          </span>
          <span className="text-sm font-semibold tracking-[0.18em] text-white">RECIRCUIT RESEARCH</span>
        </Link>
        <nav className="flex gap-1 overflow-x-auto" aria-label="Research navigation">
          {researchNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "shrink-0 rounded-[8px] px-3 py-2 text-xs font-medium transition",
                active === item.label ? "bg-[#14f195] text-[#04110c]" : "text-[#a0a0a0] hover:bg-white/[0.07] hover:text-white"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

function PageShell({
  active,
  eyebrow,
  title,
  body,
  children
}: {
  active: string;
  eyebrow: string;
  title: string;
  body: string;
  children: ReactNode;
}) {
  return (
    <>
      <ResearchHeader active={active} />
      <main>
        <section className="px-4 pb-16 pt-20 md:pt-28">
          <div className="mx-auto max-w-7xl">
            <p className="text-sm uppercase tracking-[0.2em] text-[#7df9ff]">{eyebrow}</p>
            <h1 className="mt-5 max-w-5xl text-balance text-5xl font-semibold leading-[0.96] text-white md:text-7xl">
              {title}
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-[#a0a0a0] md:text-xl md:leading-9">{body}</p>
          </div>
        </section>
        {children}
      </main>
      <ResearchFooter />
    </>
  );
}

function ResearchFooter() {
  return (
    <footer className="border-t border-white/10 px-4 py-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-5 text-sm text-[#a0a0a0] md:flex-row md:items-center md:justify-between">
        <span>{data.meta.title} v{data.meta.version}</span>
        <span>{data.meta.author} | {data.meta.authorRole}</span>
        <Link className="transition hover:text-white" href="/#contact">Contact</Link>
      </div>
    </footer>
  );
}

function DownloadRow() {
  return (
    <div className="grid gap-3 md:grid-cols-4">
      {downloads.map((item) => {
        const Icon = item.icon;
        return (
          <a
            key={item.href}
            href={item.href}
            className="group flex items-center justify-between rounded-[8px] border border-white/10 bg-white/[0.04] p-4 transition hover:border-[#14f195]/50 hover:bg-[#14f195]/10"
          >
            <span className="flex items-center gap-3 text-sm font-medium text-white">
              <Icon className="size-4 text-[#14f195]" />
              {item.label}
            </span>
            <ArrowRight className="size-4 text-[#a0a0a0] transition group-hover:translate-x-1 group-hover:text-white" />
          </a>
        );
      })}
    </div>
  );
}

function Band({ children, className }: { children: ReactNode; className?: string }) {
  return <section className={cn("border-t border-white/10 px-4 py-14 md:py-20", className)}>{children}</section>;
}

function SectionIntro({ eyebrow, title, body }: { eyebrow: string; title: string; body?: string }) {
  return (
    <div className="mb-10 max-w-4xl">
      <p className="text-xs uppercase tracking-[0.2em] text-[#7df9ff]">{eyebrow}</p>
      <h2 className="mt-3 text-balance text-3xl font-semibold leading-tight text-white md:text-5xl">{title}</h2>
      {body ? <p className="mt-4 text-lg leading-8 text-[#a0a0a0]">{body}</p> : null}
    </div>
  );
}

export function ResearchOverviewPage() {
  return (
    <PageShell
      active="Overview"
      eyebrow="ReCircuit Research"
      title="Public research portal for circular economy intelligence."
      body="Whitepaper v2.0, architecture companion, citation metadata, diagrams, and source files for ReCircuit's early-stage AI research direction."
    >
      <Band>
        <div className="mx-auto max-w-7xl">
          <SectionIntro eyebrow="Abstract" title="The recovery problem is an intelligence problem." />
          <div className="grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="space-y-5 text-lg leading-8 text-[#d6d6d6]">
              {data.abstract.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                ["Version", data.meta.version],
                ["Publication", data.meta.publicationDate],
                ["Author", data.meta.author],
                ["Status", "Research + prototype"]
              ].map(([label, value]) => (
                <div key={label} className="rounded-[8px] border border-white/10 bg-[#0b0b0b] p-5">
                  <p className="text-xs uppercase tracking-[0.18em] text-[#7df9ff]">{label}</p>
                  <p className="mt-3 text-2xl font-semibold text-white">{value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Band>

      <Band className="bg-white/[0.025]">
        <div className="mx-auto max-w-7xl">
          <SectionIntro
            eyebrow="Downloads"
            title="Publication files and citation metadata."
            body="PDF, DOCX, Markdown source, change log, version history, and CFF citation metadata are generated from the same research source."
          />
          <DownloadRow />
        </div>
      </Band>

      <Band>
        <div className="mx-auto max-w-7xl">
          <SectionIntro eyebrow="Read Online" title="Explore Whitepaper v2.0 by section." />
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {data.sections.map((section) => (
              <a
                key={section.id}
                href={`/research/whitepaper-v2#${section.id}`}
                className="group rounded-[8px] border border-white/10 bg-white/[0.035] p-5 transition hover:border-[#14f195]/45 hover:bg-white/[0.06]"
              >
                <p className="text-sm text-[#7df9ff]">{section.title}</p>
                <p className="mt-3 text-base leading-7 text-[#a0a0a0]">{section.kicker}</p>
                <ArrowRight className="mt-5 size-4 text-[#a0a0a0] transition group-hover:translate-x-1 group-hover:text-white" />
              </a>
            ))}
          </div>
        </div>
      </Band>
    </PageShell>
  );
}

export function WhitepaperOnlinePage() {
  return (
    <PageShell
      active="Whitepaper"
      eyebrow={`Version ${data.meta.version}`}
      title={data.meta.title}
      body={data.meta.subtitle}
    >
      <Band>
        <article className="mx-auto max-w-4xl">
          <SectionIntro eyebrow="Executive Summary" title="One-page argument." />
          <div className="space-y-8">
            {data.executiveSummary.map((item) => (
              <section key={item.question} className="border-l border-[#14f195]/45 pl-5">
                <h2 className="text-2xl font-semibold text-white">{item.question}</h2>
                <p className="mt-3 text-lg leading-8 text-[#d6d6d6]">{item.answer}</p>
              </section>
            ))}
          </div>
        </article>
      </Band>

      <Band className="bg-white/[0.025]">
        <article className="mx-auto max-w-4xl">
          {data.sections.map((section) => (
            <section key={section.id} id={section.id} className="scroll-mt-28 border-t border-white/10 py-12 first:border-t-0 first:pt-0">
              <p className="text-xs uppercase tracking-[0.2em] text-[#7df9ff]">{section.title}</p>
              <h2 className="mt-3 text-balance text-3xl font-semibold leading-tight text-white">{section.kicker}</h2>
              <div className="mt-6 space-y-5 text-lg leading-8 text-[#d6d6d6]">
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
              {section.currentStatus ? (
                <StatusList title="Current Status" items={section.currentStatus} icon="check" />
              ) : null}
              {section.futureCapabilities ? (
                <StatusList title="Proposed Future Capabilities" items={section.futureCapabilities} icon="arrow" />
              ) : null}
            </section>
          ))}
        </article>
      </Band>

      <Band>
        <div className="mx-auto max-w-4xl">
          <SectionIntro eyebrow="References" title="IEEE-style source list." />
          <ReferenceList />
        </div>
      </Band>
    </PageShell>
  );
}

function StatusList({ title, items, icon }: { title: string; items: string[]; icon: "check" | "arrow" }) {
  const Icon = icon === "check" ? ShieldCheck : ArrowRight;
  return (
    <div className="mt-8">
      <h3 className="text-sm uppercase tracking-[0.18em] text-[#7df9ff]">{title}</h3>
      <div className="mt-4 grid gap-3">
        {items.map((item) => (
          <div key={item} className="flex items-start gap-3 rounded-[8px] border border-white/10 bg-white/[0.035] p-4 text-[#d6d6d6]">
            <Icon className="mt-1 size-4 shrink-0 text-[#14f195]" />
            <span>{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ArchitecturePage() {
  return (
    <PageShell
      active="Architecture"
      eyebrow="Technical Companion"
      title="Architecture for material intelligence."
      body="Subsystems are described by purpose, inputs, outputs, current status, and future work."
    >
      <Band>
        <div className="mx-auto max-w-7xl">
          <SectionIntro eyebrow="Diagrams" title="Original SVG diagrams." />
          <div className="grid gap-5 lg:grid-cols-2">
            {data.diagrams.map((diagram) => (
              <figure key={diagram.id} className="rounded-[8px] border border-white/10 bg-[#080808] p-4">
                <Image
                  src={`/research/diagrams/${diagram.id}.svg`}
                  alt={`${diagram.title} diagram`}
                  width={1200}
                  height={680}
                  unoptimized
                  className="aspect-[16/9] w-full rounded-[6px] object-cover"
                />
                <figcaption className="mt-4 text-sm leading-6 text-[#a0a0a0]">
                  <span className="font-semibold text-white">{diagram.title}.</span> {diagram.description}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </Band>

      <Band className="bg-white/[0.025]">
        <div className="mx-auto max-w-7xl">
          <SectionIntro eyebrow="Subsystems" title="Purpose, inputs, outputs, and future work." />
          <div className="grid gap-4 md:grid-cols-2">
            {data.architecture.map((item) => (
              <section key={item.name} className="rounded-[8px] border border-white/10 bg-white/[0.035] p-5">
                <div className="flex items-start justify-between gap-4">
                  <h2 className="text-2xl font-semibold text-white">{item.name}</h2>
                  <Layers3 className="size-5 shrink-0 text-[#14f195]" />
                </div>
                <dl className="mt-5 space-y-4 text-sm leading-6">
                  <Field label="Purpose" value={item.purpose} />
                  <Field label="Inputs" value={item.inputs} />
                  <Field label="Outputs" value={item.outputs} />
                  <Field label="Current Status" value={item.currentStatus} />
                  <Field label="Future Work" value={item.futureWork} />
                </dl>
              </section>
            ))}
          </div>
        </div>
      </Band>
    </PageShell>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs uppercase tracking-[0.16em] text-[#7df9ff]">{label}</dt>
      <dd className="mt-1 text-[#d6d6d6]">{value}</dd>
    </div>
  );
}

export function RoadmapPage() {
  return (
    <PageShell
      active="Roadmap"
      eyebrow="Plan + Risk"
      title="Transparent path from research to pilot."
      body="Milestones are framed as intended work, not achieved traction."
    >
      <Band>
        <div className="mx-auto max-w-5xl">
          <SectionIntro eyebrow="Roadmap" title="Research, prototype, MVP, pilot, enterprise, global platform." />
          <div className="space-y-6">
            {data.roadmap.map((item) => (
              <section key={item.period} className="relative border-l border-white/10 pl-8">
                <span className="absolute -left-2.5 top-1 flex size-5 items-center justify-center rounded-full bg-[#050505] ring-1 ring-[#14f195]/50">
                  <span className="size-2 rounded-full bg-[#14f195]" />
                </span>
                <p className="text-sm uppercase tracking-[0.18em] text-[#7df9ff]">{item.period}</p>
                <h2 className="mt-2 text-3xl font-semibold text-white">{item.stage}</h2>
                <p className="mt-3 pb-8 text-lg leading-8 text-[#a0a0a0]">{item.summary}</p>
              </section>
            ))}
          </div>
        </div>
      </Band>

      <Band className="bg-white/[0.025]">
        <div className="mx-auto max-w-7xl">
          <SectionIntro eyebrow="Risk Register" title="Known failure modes and mitigations." />
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {data.risks.map((item) => (
              <section key={item.category} className="rounded-[8px] border border-white/10 bg-white/[0.035] p-5">
                <ShieldCheck className="size-5 text-[#14f195]" />
                <h2 className="mt-5 text-2xl font-semibold text-white">{item.category}</h2>
                <p className="mt-4 text-sm leading-6 text-[#d6d6d6]">{item.risk}</p>
                <p className="mt-4 border-t border-white/10 pt-4 text-sm leading-6 text-[#a0a0a0]">{item.mitigation}</p>
              </section>
            ))}
          </div>
        </div>
      </Band>
    </PageShell>
  );
}

export function ResourcesPage() {
  return (
    <PageShell
      active="Resources"
      eyebrow="Publication Resources"
      title="Download, cite, inspect sources."
      body="All files are generated for public release on the research portal."
    >
      <Band>
        <div className="mx-auto max-w-7xl">
          <SectionIntro eyebrow="Downloads" title="Publication-ready files." />
          <DownloadRow />
          <div className="mt-4 grid gap-3 md:grid-cols-3">
            {[
              ["Executive Summary", "/research/executive-summary.md"],
              ["Architecture Companion", "/research/technical-architecture-companion.md"],
              ["Change Log", "/research/change-log.md"],
              ["Version History", "/research/version-history.json"],
              ["Citation JSON", "/research/citation.json"]
            ].map(([label, href]) => (
              <a key={href} href={href} className="flex items-center justify-between rounded-[8px] border border-white/10 bg-white/[0.035] p-4 text-sm text-white transition hover:border-[#14f195]/45">
                {label}
                <ArrowRight className="size-4 text-[#a0a0a0]" />
              </a>
            ))}
          </div>
        </div>
      </Band>

      <Band className="bg-white/[0.025]">
        <div className="mx-auto max-w-5xl">
          <SectionIntro eyebrow="Citation" title="Recommended citation." />
          <div className="rounded-[8px] border border-white/10 bg-[#0b0b0b] p-5 text-sm leading-7 text-[#d6d6d6]">
            {data.citation.apa}
          </div>
        </div>
      </Band>

      <Band>
        <div className="mx-auto max-w-5xl">
          <SectionIntro eyebrow="Version History" title="Document evolution." />
          <div className="grid gap-4 md:grid-cols-2">
            {data.versionHistory.map((item) => (
              <section key={item.version} className="rounded-[8px] border border-white/10 bg-white/[0.035] p-5">
                <GitBranch className="size-5 text-[#14f195]" />
                <h2 className="mt-4 text-2xl font-semibold text-white">Version {item.version}</h2>
                <p className="mt-2 text-sm uppercase tracking-[0.16em] text-[#7df9ff]">{item.label}</p>
                <p className="mt-4 leading-7 text-[#a0a0a0]">{item.summary}</p>
              </section>
            ))}
          </div>
        </div>
      </Band>

      <Band className="bg-white/[0.025]">
        <div className="mx-auto max-w-5xl">
          <SectionIntro eyebrow="References" title="Research sources." />
          <ReferenceList />
        </div>
      </Band>
    </PageShell>
  );
}

function ReferenceList() {
  return (
    <div className="space-y-3">
      {data.references.map((reference) => (
        <a
          key={reference.id}
          href={reference.url}
          className="group flex gap-4 rounded-[8px] border border-white/10 bg-white/[0.035] p-4 transition hover:border-[#14f195]/45"
        >
          <span className="font-mono text-sm text-[#7df9ff]">[{reference.id}]</span>
          <span className="text-sm leading-6 text-[#d6d6d6]">
            {reference.label}, <span className="text-white">{reference.title},</span> {reference.year}.
            <span className="ml-2 text-[#a0a0a0] transition group-hover:text-white">{reference.url}</span>
          </span>
        </a>
      ))}
    </div>
  );
}
