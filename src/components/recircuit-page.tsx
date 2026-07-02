"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowDown,
  BadgeCheck,
  BarChart3,
  Binary,
  BrainCircuit,
  Check,
  ChevronRight,
  CircuitBoard,
  Cpu,
  Database,
  Factory,
  FileText,
  Gauge,
  Globe2,
  Hexagon,
  Layers3,
  Leaf,
  LineChart,
  Mail,
  Network,
  Radar,
  Recycle,
  Route,
  ShieldCheck,
  Sparkles,
  Zap
} from "lucide-react";

import { Reveal, SectionHeading, SectionLabel } from "@/components/reveal";
import { SmoothShell } from "@/components/smooth-shell";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const HeroScene = dynamic(() => import("@/components/hero-scene").then((mod) => mod.HeroScene), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(20,241,149,0.18),transparent_42%)]" />
});

const navItems = [
  "Mission",
  "AI Engine",
  "Platform",
  "ESG",
  "Technology",
  "Roadmap",
  "Founder",
  "Status",
  "Contact"
];

const heroSignals = [
  { value: "Research", label: "current stage" },
  { value: "Whitepaper", label: "published brief" },
  { value: "Prototype", label: "in development" },
  { value: "Pilots", label: "coming soon" }
];

const aiFlow = [
  {
    title: "Device Upload",
    body: "Capture device photos, condition notes, serial evidence, and safety flags for one recoverable asset record.",
    icon: CircuitBoard
  },
  {
    title: "Computer Vision",
    body: "Early model concept reads category, condition, corrosion, battery risk, visible damage, and reusable modules.",
    icon: BrainCircuit
  },
  {
    title: "Object Detection",
    body: "Component-level detection maps processors, cells, PCBs, memory, cameras, ports, and salvageable assemblies.",
    icon: Radar
  },
  {
    title: "Component Analysis",
    body: "Rules and model outputs estimate repairability, harvest potential, material stream, and data-risk workflow.",
    icon: Cpu
  },
  {
    title: "Market Valuation",
    body: "Valuation layer compares resale, refurbishment, component harvest, recycling, and certified destruction paths.",
    icon: LineChart
  },
  {
    title: "Carbon Impact",
    body: "Carbon model estimates avoided emissions, material recovery benefit, transport burden, and evidence needed.",
    icon: Leaf
  },
  {
    title: "Collection Optimization",
    body: "Routing concept balances pickup density, facility capacity, safety class, and recovery priority.",
    icon: Route
  },
  {
    title: "ESG Report",
    body: "Report builder prepares Scope 3 notes, diversion logic, chain-of-custody fields, and confidence levels.",
    icon: FileText
  }
];

const platformCards = [
  {
    title: "Research Platform",
    body: "A founder-led product architecture for AI-assisted e-waste intake, recovery decisions, and evidence capture.",
    icon: Cpu
  },
  {
    title: "Recovery Logic",
    body: "Decision paths compare repair, resale, component reuse, recycling, and certified destruction without hiding uncertainty.",
    icon: Sparkles
  },
  {
    title: "ESG Evidence",
    body: "Structured records explain what was known, what was estimated, and which proof would be needed for audits.",
    icon: ShieldCheck
  }
];

const circularSteps = [
  {
    label: "Electronics",
    body: "Phones, laptops, boards, batteries, and accessories enter a structured intake concept.",
    icon: CircuitBoard
  },
  {
    label: "Collection",
    body: "Collection planning considers pickup density, battery safety, repair channels, and local recycler access.",
    icon: Route
  },
  {
    label: "Sorting",
    body: "Vision-assisted sorting grades condition and identifies reusable modules before destructive processing.",
    icon: Layers3
  },
  {
    label: "AI",
    body: "Models estimate value, carbon delta, data-risk workflow, and best circular path with visible confidence.",
    icon: BrainCircuit
  },
  {
    label: "Refurbishment",
    body: "Viable devices and parts move toward repair, reuse, resale, or educational lab recovery.",
    icon: Zap
  },
  {
    label: "Recycling",
    body: "Non-viable streams route toward certified recycling with material recovery evidence.",
    icon: Recycle
  },
  {
    label: "New Materials",
    body: "Recovered metals and plastics become traceable inputs for lower-waste manufacturing loops.",
    icon: Factory
  }
];

const esgRows = [
  ["Scope 3 method", "Drafted", "Research"],
  ["Diversion logic", "Mapped", "Concept"],
  ["Chain-of-custody fields", "Designed", "Architecture"],
  ["Audit evidence packet", "In progress", "Prototype"]
];

const techNodes = [
  { label: "Edge Vision", x: 12, y: 24, icon: Radar },
  { label: "Kafka Streams", x: 37, y: 38, icon: Network },
  { label: "AI Models", x: 57, y: 18, icon: BrainCircuit },
  { label: "Carbon Graph", x: 76, y: 42, icon: Database },
  { label: "Enterprise APIs", x: 62, y: 70, icon: Binary },
  { label: "Cloud Control", x: 24, y: 68, icon: Globe2 }
];

const roadmap = [
  ["Q3 2026", "Research: e-waste recovery workflows, ESG reporting needs, computer vision datasets, and market constraints."],
  ["Q4 2026", "Prototype: interactive product demo, AI pipeline simulation, and first recovery decision engine draft."],
  ["Q1 2027", "MVP: device intake flow, component analysis, carbon estimate, and downloadable ESG evidence report."],
  ["Q2 2027", "Pilot Program: invite recyclers, campus labs, and local collection operators for controlled testing."],
  ["2028", "Enterprise Platform: expand integrations, compliance workflows, and recovery network intelligence."],
  ["2030", "Global Circular Intelligence Platform: connect recovery decisions, material traceability, and climate data at scale."]
];

const founderFocus = [
  "Climate AI",
  "Reverse Logistics",
  "ESG",
  "Computer Vision",
  "Artificial Intelligence",
  "Product Engineering"
];

const projectStatus = [
  "Research",
  "Whitepaper Published",
  "Website Live",
  "Architecture Complete",
  "Prototype In Development",
  "Pilot Partners Coming Soon"
];

function slug(label: string) {
  return label.toLowerCase().replace(/\s+/g, "-");
}

function MagneticCard({
  children,
  className
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rx = useSpring(useTransform(y, [-80, 80], [5, -5]), { stiffness: 180, damping: 18 });
  const ry = useSpring(useTransform(x, [-80, 80], [-5, 5]), { stiffness: 180, damping: 18 });

  return (
    <motion.div
      className={cn("premium-border glass rounded-[8px]", className)}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 900 }}
      onPointerMove={(event) => {
        const bounds = event.currentTarget.getBoundingClientRect();
        x.set(event.clientX - bounds.left - bounds.width / 2);
        y.set(event.clientY - bounds.top - bounds.height / 2);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}

function Header() {
  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-white/[0.07] bg-[#050505]/55 backdrop-blur-2xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <a href="#hero" className="group flex items-center gap-3" aria-label="ReCircuit home">
          <span className="relative flex size-9 items-center justify-center rounded-full border border-[#14f195]/35 bg-[#14f195]/10">
            <span className="absolute inset-1 rounded-full border border-[#7df9ff]/20" />
            <Recycle className="size-4 text-[#14f195] transition-transform duration-500 group-hover:rotate-180" />
          </span>
          <span className="text-sm font-semibold tracking-[0.18em] text-white">RECIRCUIT</span>
        </a>
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main navigation">
          {navItems.map((item) => (
            <a
              key={item}
              href={`#${slug(item)}`}
              className="rounded-full px-3 py-2 text-xs font-medium text-[#a0a0a0] transition hover:bg-white/[0.06] hover:text-white"
            >
              {item}
            </a>
          ))}
        </nav>
        <Button asChild variant="ghost" className="h-10 px-4 text-xs" showArrow>
          <a href="#contact">Connect</a>
        </Button>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section id="hero" className="relative min-h-screen overflow-hidden">
      <HeroScene />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,5,5,0.86)_0%,rgba(5,5,5,0.54)_34%,rgba(5,5,5,0.08)_68%,rgba(5,5,5,0.26)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,5,5,0.1),rgba(5,5,5,0.2)_58%,#050505_100%)]" />
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#050505] to-transparent" />
      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col justify-end px-4 pb-16 pt-28 md:pb-24">
        <Reveal className="max-w-5xl">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-3 py-1.5 text-xs text-[#d7fff0] backdrop-blur-xl">
            <span className="size-1.5 rounded-full bg-[#14f195] shadow-[0_0_18px_#14f195]" />
            Founder-led climate AI research project
          </div>
          <h1 className="text-balance text-6xl font-semibold leading-[0.88] text-white drop-shadow-[0_18px_60px_rgba(0,0,0,0.85)] md:text-8xl lg:text-[9.4rem]">
            Build Intelligence
            <br />
            for the Circular Economy.
          </h1>
          <p className="mt-6 max-w-3xl text-balance text-xl leading-8 text-white/86 drop-shadow-[0_14px_40px_rgba(0,0,0,0.85)] md:text-3xl md:leading-10">
            AI-powered infrastructure for smarter e-waste recovery, reverse logistics, and ESG intelligence.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button asChild showArrow>
              <a href="/research/whitepaper-v2">Read Whitepaper</a>
            </Button>
            <Button asChild variant="ghost">
              <a href="#platform">Explore Platform</a>
            </Button>
          </div>
        </Reveal>
        <div className="mt-16 grid max-w-5xl grid-cols-2 gap-3 md:grid-cols-4">
          {heroSignals.map((signal, index) => (
            <Reveal key={signal.label} delay={0.08 + index * 0.04} className="glass premium-border rounded-[8px] px-4 py-5">
              <div className="text-2xl font-semibold text-white md:text-3xl">{signal.value}</div>
              <div className="mt-2 text-xs uppercase tracking-[0.14em] text-[#a0a0a0]">{signal.label}</div>
            </Reveal>
          ))}
        </div>
        <a
          href="#mission"
          className="absolute bottom-6 right-4 hidden size-12 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-[#a0a0a0] transition hover:border-[#14f195]/40 hover:text-white md:flex"
          aria-label="Scroll to mission"
        >
          <ArrowDown className="size-4" />
        </a>
      </div>
    </section>
  );
}

function Mission() {
  return (
    <section id="mission" className="section-shell">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
        <Reveal>
          <SectionLabel>Mission</SectionLabel>
          <h2 className="text-balance text-4xl font-semibold leading-[0.98] md:text-6xl">
            Building the Intelligence Layer for the Circular Economy.
          </h2>
        </Reveal>
        <Reveal delay={0.1} className="text-lg leading-8 text-[#a0a0a0]">
          <p>
            ReCircuit explores how artificial intelligence can modernize e-waste recovery, reverse logistics, ESG
            intelligence, and sustainable resource management. Current work focuses on research, architecture, and a
            prototype that makes circularity easier to understand, measure, and build.
          </p>
          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {["Electronic Waste", "Lost Materials", "AI Recovery"].map((item) => (
              <div key={item} className="flex items-center gap-3 rounded-[8px] border border-white/10 bg-white/[0.035] p-4 text-sm text-white">
                <Check className="size-4 text-[#14f195]" />
                {item}
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function AIEngine() {
  return (
    <section id="ai-engine" className="section-shell overflow-hidden">
      <SectionHeading
        eyebrow="AI Engine"
        title="One research pipeline from device upload to ESG report."
        body="Signature concept: computer vision, component analysis, valuation, carbon reasoning, collection optimization, and evidence generation in one transparent flow."
      />
      <div className="mx-auto mt-16 grid max-w-7xl gap-4 px-4 lg:grid-cols-6">
        {aiFlow.map((item, index) => {
          const Icon = item.icon;
          return (
            <Reveal key={item.title} delay={index * 0.05} className="relative lg:col-span-2">
              <MagneticCard className="ai-step h-full p-5">
                <div className="mb-7 flex items-center justify-between">
                  <div className="flex size-11 items-center justify-center rounded-full border border-[#14f195]/25 bg-[#14f195]/10">
                    <Icon className="size-5 text-[#14f195]" />
                  </div>
                  <span className="text-xs text-[#7df9ff]">0{index + 1}</span>
                </div>
                <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-[#a0a0a0]">{item.body}</p>
              </MagneticCard>
              {index < aiFlow.length - 1 ? (
                <ChevronRight className="pointer-events-none absolute -right-3 top-1/2 hidden size-6 -translate-y-1/2 text-[#14f195]/50 lg:block" />
              ) : null}
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}

function Platform() {
  return (
    <section id="platform" className="section-shell">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeading
          eyebrow="Platform"
          title="A product architecture for smarter e-waste recovery."
          body="Early-stage concept for intake, recovery logic, ESG evidence, and dashboards that explain decisions instead of pretending certainty."
        />
        <div className="mt-16 grid gap-4 lg:grid-cols-3">
          {platformCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <Reveal key={card.title} delay={index * 0.08}>
                <MagneticCard className="h-full p-7">
                  <Icon className="mb-12 size-7 text-[#7df9ff]" />
                  <h3 className="text-2xl font-semibold">{card.title}</h3>
                  <p className="mt-4 leading-7 text-[#a0a0a0]">{card.body}</p>
                </MagneticCard>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function CircularEconomy() {
  const [active, setActive] = useState(3);
  const ActiveIcon = circularSteps[active].icon;

  return (
    <section id="circular-economy" className="section-shell">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeading
          eyebrow="Circular Economy"
          title="Map the journey from waste to recovery."
          body="Move the timeline to inspect how electronics, lost materials, carbon, supply-chain friction, AI, and recovery decisions connect."
        />
        <Reveal className="mt-16 grid gap-6 lg:grid-cols-[0.82fr_1.18fr]">
          <div className="glass premium-border rounded-[8px] p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.18em] text-[#7df9ff]">Timeline</p>
                <h3 className="mt-2 text-2xl font-semibold">{circularSteps[active].label}</h3>
              </div>
              <div className="flex size-14 items-center justify-center rounded-full border border-[#14f195]/25 bg-[#14f195]/10">
                <ActiveIcon className="size-6 text-[#14f195]" />
              </div>
            </div>
            <p className="mt-8 min-h-24 text-lg leading-8 text-[#d6d6d6]">{circularSteps[active].body}</p>
            <input
              aria-label="Circular economy timeline"
              className="mt-8 h-2 w-full accent-[#14f195]"
              type="range"
              min="0"
              max={circularSteps.length - 1}
              value={active}
              onChange={(event) => setActive(Number(event.target.value))}
            />
            <div className="mt-4 flex justify-between text-[10px] uppercase tracking-[0.12em] text-[#777]">
              <span>Input</span>
              <span>Intelligence</span>
              <span>Material return</span>
            </div>
          </div>
          <div className="relative min-h-[420px] overflow-hidden rounded-[8px] border border-white/10 bg-[#080808] p-5">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(20,241,149,0.12),transparent_38%)]" />
            {circularSteps.map((step, index) => {
              const Icon = step.icon;
              const angle = (index / circularSteps.length) * Math.PI * 2 - Math.PI / 2;
              const x = 50 + Math.cos(angle) * 35;
              const y = 50 + Math.sin(angle) * 35;
              const isActive = active === index;
              return (
                <button
                  key={step.label}
                  className={cn(
                    "absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-2 rounded-[8px] border px-3 py-3 text-xs transition",
                    isActive
                      ? "border-[#14f195]/70 bg-[#14f195]/12 text-white shadow-[0_0_40px_rgba(20,241,149,0.24)]"
                      : "border-white/10 bg-white/[0.04] text-[#a0a0a0] hover:border-[#7df9ff]/40 hover:text-white"
                  )}
                  style={{ left: `${x}%`, top: `${y}%` }}
                  onClick={() => setActive(index)}
                >
                  <Icon className="size-4" />
                  {step.label}
                </button>
              );
            })}
            <div className="absolute left-1/2 top-1/2 flex size-28 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-[#14f195]/30 bg-[#14f195]/10">
              <Recycle className="size-10 text-[#14f195]" />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function ESGIntelligence() {
  return (
    <section id="esg" className="section-shell">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 lg:grid-cols-[0.88fr_1.12fr] lg:items-center">
        <Reveal>
          <SectionLabel>ESG Intelligence</SectionLabel>
          <h2 className="text-balance text-4xl font-semibold leading-[0.98] md:text-6xl">
            ESG intelligence without inflated claims.
          </h2>
          <p className="mt-6 text-lg leading-8 text-[#a0a0a0]">
            ReCircuit frames ESG reporting as evidence design: what happened, what was measured, what was estimated,
            and what proof must be collected before a claim becomes credible.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            {["Scope 3", "CSRD", "GHG Protocol", "Battery safety", "Data destruction"].map((item) => (
              <span key={item} className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-sm text-white/80">
                {item}
              </span>
            ))}
          </div>
        </Reveal>
        <Reveal delay={0.12}>
          <div className="glass premium-border rounded-[8px] p-6">
            <div className="mb-8 flex items-center justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.18em] text-[#7df9ff]">Evidence model</p>
                <h3 className="mt-2 text-2xl font-semibold">Prototype reporting logic</h3>
              </div>
              <Gauge className="size-7 text-[#14f195]" />
            </div>
            <div className="space-y-3">
              {esgRows.map(([label, value, delta]) => (
                <div key={label} className="grid grid-cols-[1fr_auto_auto] items-center gap-4 rounded-[8px] border border-white/8 bg-black/20 p-4 text-sm">
                  <span className="text-[#a0a0a0]">{label}</span>
                  <span className="font-semibold text-white">{value}</span>
                  <span className="rounded-full bg-[#14f195]/10 px-2 py-1 text-xs text-[#14f195]">{delta}</span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function EnterpriseDashboard() {
  return (
    <section id="enterprise-dashboard" className="section-shell">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeading
          eyebrow="Enterprise Dashboard"
          title="A prototype workspace for circularity decisions."
          body="A simulated dashboard shows how recovery value, route logic, evidence quality, and ESG reporting could live in one product surface."
        />
        <Reveal className="mt-16 overflow-hidden rounded-[8px] border border-white/10 bg-[#090909] shadow-[0_40px_120px_rgba(0,0,0,0.45)]">
          <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
            <div className="flex items-center gap-2">
              <span className="size-2.5 rounded-full bg-[#ff5f57]" />
              <span className="size-2.5 rounded-full bg-[#ffbd2e]" />
              <span className="size-2.5 rounded-full bg-[#28c840]" />
            </div>
            <span className="text-xs uppercase tracking-[0.2em] text-[#777]">ReCircuit OS</span>
          </div>
          <div className="grid gap-0 lg:grid-cols-[260px_1fr]">
            <aside className="border-b border-white/10 p-5 lg:border-b-0 lg:border-r">
              {["Overview", "Routes", "Assets", "Carbon", "Reports"].map((item, index) => (
                <div
                  key={item}
                  className={cn(
                    "mb-2 flex items-center justify-between rounded-[8px] px-3 py-3 text-sm",
                    index === 0 ? "bg-[#14f195]/10 text-white" : "text-[#a0a0a0]"
                  )}
                >
                  {item}
                  {index === 0 ? <span className="size-1.5 rounded-full bg-[#14f195]" /> : null}
                </div>
              ))}
            </aside>
            <div className="grid gap-4 p-5 md:grid-cols-3">
              <div className="rounded-[8px] border border-white/10 bg-white/[0.035] p-5 md:col-span-2">
                <div className="mb-6 flex items-center justify-between">
                  <h3 className="font-semibold">Recovery path simulation</h3>
                  <BarChart3 className="size-5 text-[#7df9ff]" />
                </div>
                <div className="flex h-48 items-end gap-3">
                  {[34, 48, 42, 66, 59, 74, 86, 78, 91, 96, 88, 99].map((height, index) => (
                    <div key={index} className="flex-1 rounded-t bg-gradient-to-t from-[#14f195] to-[#7df9ff]" style={{ height: `${height}%` }} />
                  ))}
                </div>
              </div>
              <div className="rounded-[8px] border border-white/10 bg-white/[0.035] p-5">
                <h3 className="font-semibold">Concept readiness</h3>
                <div className="mt-6 space-y-4">
                  {["Research model", "Prototype UI", "Pilot workflow"].map((item, index) => (
                    <div key={item} className="rounded-[8px] bg-black/24 p-3">
                      <div className="flex items-center justify-between text-sm">
                        <span>{item}</span>
                        <span className="text-[#14f195]">{["Active", "Building", "Planned"][index]}</span>
                      </div>
                      <div className="mt-3 h-1.5 rounded-full bg-white/10">
                        <div className="h-full rounded-full bg-[#14f195]" style={{ width: `${72 - index * 18}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Technology() {
  return (
    <section id="technology" className="section-shell overflow-hidden">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeading
          eyebrow="Technology"
          title="An interactive architecture for asset intelligence."
          body="A living technical map: upload, event pipeline, model layer, carbon reasoning, storage, dashboard, and APIs ready for future integrations."
        />
        <Reveal className="relative mt-16 min-h-[560px] overflow-hidden rounded-[8px] border border-white/10 bg-[#080808]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(47,124,255,0.18),transparent_36%)]" />
          <svg className="absolute inset-0 h-full w-full opacity-60" aria-hidden="true">
            {techNodes.map((node, index) => {
              const next = techNodes[(index + 1) % techNodes.length];
              return (
                <line
                  key={node.label}
                  x1={`${node.x}%`}
                  y1={`${node.y}%`}
                  x2={`${next.x}%`}
                  y2={`${next.y}%`}
                  stroke="url(#lineGradient)"
                  strokeWidth="1"
                />
              );
            })}
            <defs>
              <linearGradient id="lineGradient" x1="0" x2="1">
                <stop stopColor="#14f195" stopOpacity="0.2" />
                <stop offset="1" stopColor="#7df9ff" stopOpacity="0.68" />
              </linearGradient>
            </defs>
          </svg>
          {techNodes.map((node) => {
            const Icon = node.icon;
            return (
              <button
                key={node.label}
                className="tech-node absolute flex -translate-x-1/2 -translate-y-1/2 items-center gap-3 rounded-[8px] border border-white/10 bg-white/[0.055] px-4 py-3 text-sm text-white backdrop-blur-xl transition hover:border-[#14f195]/50 hover:bg-[#14f195]/10"
                style={{ left: `${node.x}%`, top: `${node.y}%` }}
              >
                <Icon className="size-4 text-[#14f195]" />
                {node.label}
              </button>
            );
          })}
          <div className="absolute left-1/2 top-1/2 flex size-32 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-[#14f195]/30 bg-[#14f195]/10 shadow-[0_0_90px_rgba(20,241,149,0.2)]">
            <Hexagon className="size-11 text-[#14f195]" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Roadmap() {
  return (
    <section id="roadmap" className="section-shell">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeading
          eyebrow="Roadmap"
          title="An honest roadmap from research to pilot."
          body="No fake traction. ReCircuit is early-stage: research first, prototype second, pilot learning before enterprise platform claims."
        />
        <div className="mx-auto mt-16 max-w-4xl">
          {roadmap.map(([year, body], index) => (
            <Reveal key={year} delay={index * 0.06} className="relative border-l border-white/10 pl-8">
              <span className="absolute -left-2.5 top-1 flex size-5 items-center justify-center rounded-full bg-[#050505] ring-1 ring-[#14f195]/50">
                <span className="size-2 rounded-full bg-[#14f195]" />
              </span>
              <div className="pb-12">
                <div className="text-4xl font-semibold text-white">{year}</div>
                <p className="mt-3 text-lg leading-8 text-[#a0a0a0]">{body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Whitepaper() {
  return (
    <section id="whitepaper" className="section-shell">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <Reveal>
          <SectionLabel>Whitepaper</SectionLabel>
          <h2 className="text-balance text-4xl font-semibold leading-[0.98] md:text-6xl">
            The intelligence layer for circular electronics.
          </h2>
          <p className="mt-6 text-lg leading-8 text-[#a0a0a0]">
            A publication-ready research whitepaper covering the global context, architecture, AI methods, roadmap,
            risks, references, and current build status behind ReCircuit.
          </p>
          <div className="mt-6 flex flex-wrap gap-3 text-sm text-[#a0a0a0]">
            <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5">Version 2.0</span>
            <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5">Public research release</span>
            <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5">References included</span>
          </div>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild showArrow>
              <a href="/research/recircuit-research-whitepaper-v2.0.pdf" download>
                Download PDF
              </a>
            </Button>
            <Button asChild variant="ghost" showArrow>
              <a href="/research">Research portal</a>
            </Button>
          </div>
        </Reveal>
        <Reveal delay={0.12}>
          <div className="relative mx-auto h-[520px] max-w-md rounded-[8px] border border-white/10 bg-[#090909] p-5 perspective-1000">
            <div className="absolute inset-5 rounded-[8px] bg-[radial-gradient(circle_at_50%_0%,rgba(20,241,149,0.16),transparent_40%)]" />
            <motion.div
              className="relative h-full rounded-[8px] border border-white/10 bg-[#f6f7f2] p-7 text-black shadow-2xl"
              whileHover={{ rotateY: -10, rotateX: 2 }}
              transition={{ type: "spring", stiffness: 90, damping: 16 }}
              style={{ transformStyle: "preserve-3d" }}
            >
              <div className="text-xs uppercase tracking-[0.24em] text-black/45">ReCircuit Intelligence Brief</div>
              <h3 className="mt-10 text-4xl font-semibold leading-none">AI Recovery Economics</h3>
              <p className="mt-6 text-sm leading-6 text-black/62">
                Circular electronics is no longer waste management. It is a data system that prices material, carbon,
                resale, risk, and compliance in one decision.
              </p>
              <div className="mt-10 space-y-3">
                {["Version 2.0", "Research portal", "PDF + DOCX + Markdown"].map((item) => (
                  <div key={item} className="flex items-center gap-3 border-t border-black/10 pt-3 text-sm">
                    <Check className="size-4" />
                    {item}
                  </div>
                ))}
              </div>
              <div className="absolute bottom-7 left-7 right-7">
                <div className="mb-2 flex justify-between text-xs text-black/45">
                  <span>Reading progress</span>
                  <span>72%</span>
                </div>
                <div className="h-1.5 rounded-full bg-black/10">
                  <motion.div
                    className="h-full rounded-full bg-black"
                    animate={{ width: "72%" }}
                    transition={{ duration: 0.55 }}
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Founder() {
  return (
    <section id="founder" className="section-shell">
      <div className="mx-auto max-w-7xl px-4">
        <Reveal className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <div>
            <SectionLabel>Founder</SectionLabel>
            <h2 className="text-balance text-4xl font-semibold leading-[0.98] md:text-6xl">
              Mohnish M is building AI systems for the Circular Economy.
            </h2>
            <p className="mt-6 text-lg leading-8 text-[#a0a0a0]">
              Computer Science Engineering student, founder of ReCircuit, and founder of House of Mohny. Current work
              combines product engineering, computer vision, ESG research, and reverse logistics systems thinking.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              {founderFocus.map((focus) => (
                <span key={focus} className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-sm text-white/82">
                  {focus}
                </span>
              ))}
            </div>
          </div>
          <MagneticCard className="overflow-hidden p-0">
            <div className="relative min-h-[460px] bg-[radial-gradient(circle_at_50%_22%,rgba(20,241,149,0.24),transparent_34%),linear-gradient(145deg,#111,#050505)] p-7">
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:34px_34px]" />
              <div className="relative flex h-full min-h-[406px] flex-col justify-between">
                <div className="flex items-center justify-between text-xs uppercase tracking-[0.18em] text-[#7df9ff]">
                  <span>Portrait Placeholder</span>
                  <span>Founder-led</span>
                </div>
                <div className="mx-auto flex size-52 items-center justify-center rounded-full border border-[#14f195]/30 bg-[#14f195]/10 text-6xl font-semibold shadow-[0_0_90px_rgba(20,241,149,0.18)]">
                  MM
                </div>
                <div>
                  <h3 className="text-3xl font-semibold">Mohnish M</h3>
                  <p className="mt-2 text-[#a0a0a0]">Founder of ReCircuit and House of Mohny</p>
                </div>
              </div>
            </div>
          </MagneticCard>
        </Reveal>
      </div>
    </section>
  );
}

function ProjectStatus() {
  return (
    <section id="status" className="section-shell">
      <div className="mx-auto max-w-7xl px-4">
        <Reveal className="rounded-[8px] border border-white/10 bg-[#0a0a0a] p-8 md:p-12">
          <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div>
              <SectionLabel>Project Status</SectionLabel>
              <h2 className="text-balance text-4xl font-semibold leading-[0.98] md:text-6xl">
                Early-stage, transparent, and still being built.
              </h2>
              <p className="mt-6 text-lg leading-8 text-[#a0a0a0]">
                ReCircuit is not presenting fake traction. This site shows the product vision, research direction, and
                current build status.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {projectStatus.map((item) => (
                <div key={item} className="flex items-center gap-3 rounded-[8px] border border-white/10 bg-white/[0.04] p-4">
                  <BadgeCheck className="size-5 text-[#14f195]" />
                  <span className="text-sm text-white/86">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Contact() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const messageValid = message.trim().length >= 20;
  const ready = emailValid && messageValid;

  return (
    <section id="contact" className="section-shell">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
        <Reveal>
          <SectionLabel>Contact</SectionLabel>
          <h2 className="text-balance text-4xl font-semibold leading-[0.98] md:text-6xl">
            Discuss research, pilots, or climate AI collaboration.
          </h2>
          <div className="mt-8 space-y-4 text-[#a0a0a0]">
            <p className="flex items-center gap-3">
              <Mail className="size-5 text-[#14f195]" />
              strategy@recircuit.online
            </p>
            <p className="text-base leading-7">Founder-led research project. Pilot conversations opening after prototype.</p>
          </div>
          <div className="mt-10 h-64 overflow-hidden rounded-[8px] border border-white/10 bg-[#080808]">
            <div className="relative h-full w-full bg-[radial-gradient(circle_at_28%_38%,rgba(20,241,149,0.18),transparent_16%),radial-gradient(circle_at_62%_42%,rgba(125,249,255,0.16),transparent_18%),radial-gradient(circle_at_76%_65%,rgba(47,124,255,0.14),transparent_16%)]">
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:42px_42px]" />
              {["AI", "ESG", "CV"].map((label, index) => (
                <span
                  key={label}
                  className="absolute flex size-10 items-center justify-center rounded-full border border-[#14f195]/35 bg-[#14f195]/12 text-xs text-white"
                  style={{ left: `${24 + index * 25}%`, top: `${38 + (index % 2) * 18}%` }}
                >
                  {label}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
        <Reveal delay={0.12}>
          <form
            className="glass premium-border rounded-[8px] p-6"
            onSubmit={(event) => {
              event.preventDefault();
            }}
          >
            <div className="grid gap-5 md:grid-cols-2">
              <label className="block">
                <span className="text-sm text-white/78">Work email</span>
                <input
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="mt-2 h-12 w-full rounded-[8px] border border-white/10 bg-black/30 px-4 text-white outline-none transition focus:border-[#14f195]/60"
                  placeholder="you@company.com"
                  type="email"
                />
                <span className={cn("mt-2 block text-xs", email.length === 0 || emailValid ? "text-[#777]" : "text-[#ff8a8a]")}>
                  {email.length === 0 || emailValid ? "Enterprise domains prioritized" : "Enter valid email"}
                </span>
              </label>
              <label className="block">
                <span className="text-sm text-white/78">Interest area</span>
                <select className="mt-2 h-12 w-full rounded-[8px] border border-white/10 bg-black/30 px-4 text-white outline-none transition focus:border-[#14f195]/60">
                  <option>Research collaboration</option>
                  <option>Prototype feedback</option>
                  <option>Pilot conversation</option>
                </select>
              </label>
            </div>
            <label className="mt-5 block">
              <span className="text-sm text-white/78">Message</span>
              <textarea
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                className="mt-2 min-h-40 w-full resize-none rounded-[8px] border border-white/10 bg-black/30 p-4 text-white outline-none transition focus:border-[#14f195]/60"
                placeholder="Share what you want to discuss: research, e-waste workflows, ESG reporting, or prototype feedback."
              />
              <span className={cn("mt-2 block text-xs", message.length === 0 || messageValid ? "text-[#777]" : "text-[#ff8a8a]")}>
                {message.length === 0 || messageValid ? "20+ characters helps route request" : "Add a little more detail"}
              </span>
            </label>
            <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <Button disabled={!ready} showArrow>
                Send message
              </Button>
              <p className="text-sm text-[#a0a0a0]">
                {ready ? "Validation complete. Ready to submit." : "Live validation active."}
              </p>
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/10 px-4 py-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 text-sm text-[#a0a0a0] md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <Recycle className="size-5 text-[#14f195]" />
          <span className="font-semibold tracking-[0.18em] text-white">RECIRCUIT</span>
        </div>
        <p>mohnishm12.github.io/ReCircuit</p>
        <div className="flex gap-4">
          <a href="/research" className="transition hover:text-white">Research</a>
          <a href="#status" className="transition hover:text-white">Status</a>
          <a href="#contact" className="transition hover:text-white">Contact</a>
        </div>
      </div>
    </footer>
  );
}

function StructuredData() {
  const json = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "ReCircuit",
    url: "https://mohnishm12.github.io/ReCircuit",
    slogan: "Building the Intelligence Layer for the Circular Economy",
    sameAs: ["https://mohnishm12.github.io/ReCircuit"],
    description:
      "Founder-led climate AI research project exploring electronics recovery, reverse logistics, ESG intelligence, e-waste recycling, and carbon intelligence.",
    knowsAbout: [
      "Climate Tech",
      "Artificial Intelligence",
      "Circular Economy",
      "ESG",
      "E-Waste",
      "Sustainability",
      "Recycling",
      "Carbon Intelligence"
    ]
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }} />;
}

function ScrollEffects() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const context = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".ai-step").forEach((element, index) => {
        gsap.to(element, {
          y: index % 2 === 0 ? -18 : 18,
          scrollTrigger: {
            trigger: element,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.8
          }
        });
      });

      gsap.utils.toArray<HTMLElement>(".tech-node").forEach((element, index) => {
        gsap.to(element, {
          rotate: index % 2 === 0 ? 2 : -2,
          scale: 1.04,
          scrollTrigger: {
            trigger: element,
            start: "top 80%",
            end: "bottom 20%",
            scrub: 1
          }
        });
      });
    });

    return () => context.revert();
  }, []);

  return null;
}

export function ReCircuitPage() {
  return (
    <SmoothShell>
      <StructuredData />
      <ScrollEffects />
      <Header />
      <main>
        <Hero />
        <Mission />
        <AIEngine />
        <Platform />
        <CircularEconomy />
        <ESGIntelligence />
        <EnterpriseDashboard />
        <Technology />
        <Roadmap />
        <Whitepaper />
        <Founder />
        <ProjectStatus />
        <Contact />
      </main>
      <Footer />
    </SmoothShell>
  );
}
