"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import { useRef } from "react";
import { profile } from "@/content";
import { Magnetic, SplitHeading } from "./motion";

// Points of the data line, in the 1200 x 420 viewBox. Purely a visual motif.
const points: [number, number][] = [
  [0, 360], [120, 330], [230, 345], [340, 280], [450, 300],
  [560, 220], [670, 240], [780, 160], [890, 185], [1000, 95], [1110, 110], [1200, 40],
];
const path = points.map(([x, y], i) => `${i ? "L" : "M"}${x} ${y}`).join(" ");
const LINE_START = 1.1;
const LINE_DURATION = 2.2;

const nav = [
  { href: "#services", label: "Services" },
  { href: "#work", label: "Work" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
];

const ease = [0.22, 1, 0.36, 1] as const;

// Floating shapes that drift with the pointer at different depths.
const shapes = [
  { kind: "ring", className: "left-[60%] top-[20%] size-24 lg:size-36", depth: 40, float: 14 },
  { kind: "plus", className: "left-[80%] top-[42%] size-10 lg:size-14", depth: -55, float: 10 },
  { kind: "dot", className: "left-[70%] top-[58%] size-5", depth: 70, float: 18 },
  { kind: "square", className: "left-[88%] top-[64%] size-8 lg:size-10", depth: -30, float: 12 },
];

function Shape({ kind }: { kind: string }) {
  if (kind === "ring") return <span className="block size-full rounded-full border-[10px] border-amber/90" />;
  if (kind === "plus")
    return (
      <svg viewBox="0 0 40 40" className="size-full text-white/80" aria-hidden="true">
        <path d="M20 4v32M4 20h32" stroke="currentColor" strokeWidth="7" strokeLinecap="round" />
      </svg>
    );
  if (kind === "square") return <span className="block size-full rotate-12 rounded-lg bg-white/20" />;
  return <span className="block size-full rounded-full bg-amber" />;
}

function FloatingShape({
  shape,
  px,
  py,
  index,
}: {
  shape: (typeof shapes)[number];
  px: MotionValue<number>;
  py: MotionValue<number>;
  index: number;
}) {
  const reduce = useReducedMotion();
  const x = useTransform(px, (v) => v * shape.depth);
  const y = useTransform(py, (v) => v * shape.depth);
  return (
    <motion.div
      aria-hidden="true"
      className={`pointer-events-none absolute hidden md:block ${shape.className}`}
      style={reduce ? undefined : { x, y }}
      initial={reduce ? false : { opacity: 0, scale: 0, rotate: -90 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      transition={{ delay: 0.6 + index * 0.15, duration: 0.9, type: "spring", bounce: 0.5 }}
    >
      <motion.div
        className="size-full"
        animate={reduce ? undefined : { y: [0, -shape.float, 0], rotate: [0, index % 2 ? 20 : -20, 0] }}
        transition={{ duration: 5 + index, repeat: Infinity, ease: "easeInOut" }}
      >
        <Shape kind={shape.kind} />
      </motion.div>
    </motion.div>
  );
}

function SpinningBadge() {
  const reduce = useReducedMotion();
  const text = "OPEN TO REMOTE WORK • ODOO DEVELOPER • ";
  return (
    <motion.a
      href="#contact"
      aria-label="Open to remote work. Go to the contact form"
      className="absolute right-8 top-28 z-20 hidden size-36 lg:block"
      initial={reduce ? false : { opacity: 0, scale: 0.4 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1.4, duration: 0.8, type: "spring", bounce: 0.45 }}
      whileHover={{ scale: 1.12 }}
    >
      <motion.svg
        viewBox="0 0 200 200"
        className="size-full"
        aria-hidden="true"
        animate={reduce ? undefined : { rotate: 360 }}
        transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
      >
        <defs>
          <path id="badge-circle" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
        </defs>
        <text fill="white" fontFamily="var(--font-unbounded)" fontSize="14" fontWeight="600">
          <textPath href="#badge-circle" textLength="486" lengthAdjust="spacing">{text}</textPath>
        </text>
      </motion.svg>
      <span className="absolute inset-[33%] grid place-items-center rounded-full bg-amber text-2xl text-ink">
        ✦
      </span>
    </motion.a>
  );
}

export default function Hero() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);

  // Pointer position from -0.5 to 0.5, smoothed.
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const px = useSpring(mx, { stiffness: 60, damping: 18 });
  const py = useSpring(my, { stiffness: 60, damping: 18 });
  const chartX = useTransform(px, (v) => v * -30);

  // Scrolling away: the name lifts and shrinks, the chart sinks.
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const nameY = useTransform(scrollYProgress, [0, 1], [0, -160]);
  const nameScale = useTransform(scrollYProgress, [0, 1], [1, 0.85]);
  const chartSink = useTransform(scrollYProgress, [0, 1], [0, 140]);

  return (
    <header
      ref={ref}
      className="relative overflow-hidden bg-violet text-white"
      onPointerMove={(e) => {
        if (reduce) return;
        const r = e.currentTarget.getBoundingClientRect();
        mx.set((e.clientX - r.left) / r.width - 0.5);
        my.set((e.clientY - r.top) / r.height - 0.5);
      }}
    >
      <motion.nav
        aria-label="Main"
        className="relative z-30 mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-5 py-5 sm:px-8"
        initial={reduce ? false : { y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease }}
      >
        <a href="#top" className="font-display text-sm font-semibold tracking-tight">
          {profile.name}
        </a>
        <ul className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[0.95rem]">
          {nav.map((item) => (
            <li key={item.href} className="hidden sm:block">
              <a href={item.href} className="group relative text-white/80 hover:text-white">
                {item.label}
                <span className="absolute -bottom-1 left-0 h-0.5 w-full origin-right scale-x-0 bg-amber transition-transform duration-300 group-hover:origin-left group-hover:scale-x-100" />
              </a>
            </li>
          ))}
          <li>
            <Magnetic>
              <a
                href={profile.cv}
                download
                className="inline-block rounded-full bg-white px-4 py-2 font-semibold text-violet transition-colors hover:bg-amber hover:text-ink"
              >
                Download CV
              </a>
            </Magnetic>
          </li>
        </ul>
      </motion.nav>

      {/* Chart */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-x-6 bottom-0 h-[34%] sm:h-[70%]"
        style={reduce ? undefined : { x: chartX, y: chartSink }}
      >
        <svg viewBox="0 0 1200 420" preserveAspectRatio="none" className="absolute inset-0 size-full overflow-visible">
          {[100, 200, 300].map((y, i) => (
            <motion.line
              key={y}
              x1="-100"
              x2="1300"
              y1={y}
              y2={y}
              stroke="white"
              strokeOpacity="0.14"
              strokeWidth="1.5"
              initial={reduce ? false : { pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 0.2 + i * 0.15, duration: 1.2, ease }}
            />
          ))}
          <motion.path
            d={`${path} L1200 420 L0 420 Z`}
            fill="var(--violet-deep)"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 0.55 }}
            transition={{ delay: LINE_START + 0.6, duration: 1.4 }}
          />
          <motion.path
            d={path}
            fill="none"
            stroke="var(--amber)"
            strokeWidth="4"
            strokeLinejoin="round"
            strokeLinecap="round"
            initial={reduce ? false : { pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: LINE_START, duration: LINE_DURATION, ease: [0.65, 0, 0.35, 1] }}
          />
        </svg>
        {points.slice(1, -1).map(([x, y], i) => (
          <span
            key={x}
            className="absolute block -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${(x / 1200) * 100}%`, top: `${(y / 420) * 100}%` }}
          >
            <motion.span
              className="block size-3.5 rounded-full border-[3px] border-violet bg-amber"
              initial={reduce ? false : { scale: 0 }}
              animate={{ scale: [0, 1.9, 1] }}
              transition={{ delay: LINE_START + (LINE_DURATION * (i + 1)) / (points.length - 1), duration: 0.5 }}
            />
            {/* Each point keeps breathing once the line has arrived */}
            {!reduce && (
              <motion.span
                className="absolute inset-0 rounded-full bg-amber"
                initial={{ scale: 1, opacity: 0 }}
                animate={{ scale: [1, 1, 3.2], opacity: [0, 0.6, 0] }}
                transition={{
                  delay: LINE_START + LINE_DURATION + i * 0.25,
                  duration: 1.8,
                  repeat: Infinity,
                  repeatDelay: 2.4,
                  ease: "easeOut",
                }}
              />
            )}
          </span>
        ))}
      </motion.div>

      {shapes.map((s, i) => (
        <FloatingShape key={s.kind} shape={s} px={px} py={py} index={i} />
      ))}
      <SpinningBadge />

      <motion.div
        id="top"
        className="relative z-10 mx-auto max-w-6xl px-5 pb-60 pt-12 sm:px-8 sm:pb-56 sm:pt-24"
        style={reduce ? undefined : { y: nameY, scale: nameScale, transformOrigin: "left top" }}
      >
        <motion.p
          className="text-lg text-white/85"
          initial={reduce ? false : { opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.15, duration: 0.7, ease }}
        >
          {profile.role} based in {profile.location}, working remotely.
        </motion.p>

        <h1 className="mt-4 font-display text-[clamp(3.25rem,13vw,10.5rem)] font-extrabold leading-[0.88] tracking-[-0.04em]">
          <span className="sr-only">{profile.name}</span>
          {["Majd", "Hsien"].map((word, w) => (
            <span key={word} aria-hidden="true" className="block">
              {Array.from(word).map((ch, c) => (
                <span key={c} className="inline-block overflow-hidden pb-[0.06em] align-bottom">
                  <motion.span
                    className="inline-block cursor-default"
                    initial={reduce ? false : { y: "115%", rotate: 18 }}
                    animate={{ y: "0%", rotate: 0 }}
                    transition={{ delay: 0.25 + w * 0.22 + c * 0.06, duration: 0.9, ease }}
                    whileHover={reduce ? undefined : { y: "-12%", color: "#ffb020", transition: { duration: 0.2 } }}
                  >
                    {ch}
                  </motion.span>
                </span>
              ))}
            </span>
          ))}
        </h1>

        <SplitHeading
          as="h2"
          onLoad
          delay={0.9}
          text={profile.headline}
          className="mt-8 max-w-[34ch] text-[clamp(1.35rem,2.6vw,1.9rem)] font-medium leading-snug"
        />

        <motion.div
          className="mt-10 flex flex-wrap gap-3"
          initial={reduce ? false : { opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.7, ease }}
        >
          <Magnetic>
            <a
              href="#contact"
              className="group relative inline-block overflow-hidden rounded-full bg-amber px-6 py-3 font-semibold text-ink"
            >
              <span className="absolute inset-0 translate-y-full rounded-full bg-white transition-transform duration-300 group-hover:translate-y-0" />
              <span className="relative">Start a project</span>
            </a>
          </Magnetic>
          <Magnetic>
            <a
              href="#work"
              className="group relative inline-block overflow-hidden rounded-full border-2 border-white/70 px-6 py-3 font-semibold text-white transition-colors duration-300 hover:text-violet"
            >
              <span className="absolute inset-0 -translate-x-full bg-white transition-transform duration-300 group-hover:translate-x-0" />
              <span className="relative">See my work</span>
            </a>
          </Magnetic>
        </motion.div>
      </motion.div>
    </header>
  );
}
