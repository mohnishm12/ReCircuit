"use client";

import { motion, type HTMLMotionProps } from "framer-motion";

import { cn } from "@/lib/utils";

export function Reveal({
  children,
  className,
  delay = 0,
  ...props
}: HTMLMotionProps<"div"> & { delay?: number }) {
  return (
    <motion.div
      className={cn(className)}
      initial={{ opacity: 0, y: 34, filter: "blur(14px)", scale: 0.985 }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-5 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.035] px-3 py-1.5 text-xs font-medium uppercase tracking-[0.24em] text-[#7df9ff]">
      <span className="h-px w-6 bg-[#14f195]" />
      {children}
    </div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  body,
  className
}: {
  eyebrow: string;
  title: string;
  body: string;
  className?: string;
}) {
  return (
    <Reveal className={cn("mx-auto max-w-4xl text-center", className)}>
      <SectionLabel>{eyebrow}</SectionLabel>
      <h2 className="text-balance text-4xl font-semibold leading-[0.98] text-white md:text-6xl lg:text-7xl">
        {title}
      </h2>
      <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-[#a0a0a0] md:text-lg">{body}</p>
    </Reveal>
  );
}
