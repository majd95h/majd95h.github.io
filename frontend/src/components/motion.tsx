"use client";

import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type Variants,
} from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

/* ---------- Reveal: content enters as it scrolls into view ---------- */

const revealVariants: Record<string, Variants> = {
  up: { hidden: { opacity: 0, y: 60 }, show: { opacity: 1, y: 0 } },
  left: { hidden: { opacity: 0, x: -80 }, show: { opacity: 1, x: 0 } },
  right: { hidden: { opacity: 0, x: 80 }, show: { opacity: 1, x: 0 } },
  scale: { hidden: { opacity: 0, scale: 0.85, rotate: -2 }, show: { opacity: 1, scale: 1, rotate: 0 } },
  blur: { hidden: { opacity: 0, filter: "blur(16px)", y: 20 }, show: { opacity: 1, filter: "blur(0px)", y: 0 } },
};

export function Reveal({
  children,
  from = "up",
  delay = 0,
  className,
}: {
  children: ReactNode;
  from?: keyof typeof revealVariants;
  delay?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      variants={revealVariants[from]}
      initial={reduce ? false : "hidden"}
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.9, ease, delay }}
    >
      {children}
    </motion.div>
  );
}

/* ---------- Stagger: children enter one after another ---------- */

export function Stagger({
  children,
  className,
  as = "ul",
  gap = 0.09,
}: {
  children: ReactNode;
  className?: string;
  as?: "ul" | "ol" | "div" | "dl";
  gap?: number;
}) {
  const reduce = useReducedMotion();
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      initial={reduce ? false : "hidden"}
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: gap } } }}
    >
      {children}
    </Tag>
  );
}

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 50, scale: 0.96 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7, ease } },
};

export function StaggerItem({
  children,
  className,
  as = "li",
}: {
  children: ReactNode;
  className?: string;
  as?: "li" | "div";
}) {
  const Tag = motion[as];
  return (
    <Tag className={className} variants={staggerItem}>
      {children}
    </Tag>
  );
}

/* ---------- SplitHeading: letters rise out of a mask, word by word ---------- */

export function SplitHeading({
  text,
  className,
  as = "h2",
  id,
  delay = 0,
  onLoad = false,
}: {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3";
  id?: string;
  delay?: number;
  onLoad?: boolean;
}) {
  const reduce = useReducedMotion();
  const Tag = motion[as];
  const words = text.split(" ");
  let index = 0;
  const trigger = onLoad ? { animate: "show" } : { whileInView: "show", viewport: { once: true, amount: 0.4 } };
  return (
    <Tag
      id={id}
      className={className}
      aria-label={text}
      initial={reduce ? false : "hidden"}
      {...trigger}
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.035, delayChildren: delay } } }}
    >
      {words.map((word, w) => (
        <span key={w} aria-hidden="true" className="inline-block whitespace-nowrap">
          {Array.from(word).map((char) => {
            index += 1;
            return (
              <span key={index} className="inline-block overflow-hidden pb-[0.08em] align-bottom">
                <motion.span
                  className="inline-block"
                  variants={{
                    hidden: { y: "110%", rotate: 12 },
                    show: { y: "0%", rotate: 0, transition: { duration: 0.75, ease } },
                  }}
                >
                  {char}
                </motion.span>
              </span>
            );
          })}
          {w < words.length - 1 && <span className="inline-block">&nbsp;</span>}
        </span>
      ))}
    </Tag>
  );
}

/* ---------- CountUp: numbers count from zero when seen ---------- */

export function CountUp({ value, className }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotion();
  const target = parseInt(value, 10);
  const suffix = value.replace(/^\d+/, "");
  const [shown, setShown] = useState(reduce ? target : 0);

  useEffect(() => {
    if (!inView || reduce) return;
    const controls = animate(0, target, {
      duration: 1.6,
      ease: "easeOut",
      onUpdate: (v) => setShown(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, reduce, target]);

  return (
    <span ref={ref} className={className}>
      {shown}
      {suffix}
    </span>
  );
}

/* ---------- Tilt: card leans toward the pointer, with a moving shine ---------- */

export function Tilt({ children, className }: { children: ReactNode; className?: string }) {
  const reduce = useReducedMotion();
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(y, [0, 1], [10, -10]), { stiffness: 200, damping: 18 });
  const rotateY = useSpring(useTransform(x, [0, 1], [-12, 12]), { stiffness: 200, damping: 18 });
  const shine = useTransform(
    [x, y],
    ([px, py]: number[]) =>
      `radial-gradient(circle at ${px * 100}% ${py * 100}%, rgba(255,255,255,0.35), transparent 55%)`,
  );

  return (
    <motion.div
      className={`group/tilt relative h-full [transform-style:preserve-3d] ${className ?? ""}`}
      style={reduce ? undefined : { rotateX, rotateY, transformPerspective: 900 }}
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - r.left) / r.width);
        y.set((e.clientY - r.top) / r.height);
      }}
      onPointerLeave={() => {
        x.set(0.5);
        y.set(0.5);
      }}
      whileHover={reduce ? undefined : { scale: 1.03 }}
    >
      {children}
      {!reduce && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover/tilt:opacity-100"
          style={{ background: shine }}
        />
      )}
    </motion.div>
  );
}

/* ---------- Magnetic: buttons drift toward the pointer ---------- */

export function Magnetic({ children, strength = 0.35 }: { children: ReactNode; strength?: number }) {
  const reduce = useReducedMotion();
  const x = useSpring(0, { stiffness: 250, damping: 15 });
  const y = useSpring(0, { stiffness: 250, damping: 15 });
  return (
    <motion.span
      className="inline-block"
      style={reduce ? undefined : { x, y }}
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - r.left - r.width / 2) * strength);
        y.set((e.clientY - r.top - r.height / 2) * strength);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.span>
  );
}

/* ---------- ScrollProgress: amber bar across the top of the page ---------- */

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 25 });
  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-50 h-1.5 origin-left bg-amber"
      style={{ scaleX }}
    />
  );
}

/* ---------- TimelineLine: the experience rail fills as you scroll ---------- */

export function TimelineRail({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 60%"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 25 });
  return (
    <div ref={ref} className="relative mt-14">
      <div aria-hidden="true" className="absolute left-0 top-0 h-full w-1 rounded bg-mist" />
      <motion.div
        aria-hidden="true"
        className="absolute left-0 top-0 h-full w-1 origin-top rounded bg-violet"
        style={{ scaleY }}
      />
      {children}
    </div>
  );
}

export function TimelineDot() {
  return (
    <motion.span
      aria-hidden="true"
      className="absolute -left-[2.6rem] top-1.5 size-5 rounded-full border-4 border-white bg-violet sm:-left-[3.6rem]"
      initial={{ scale: 0 }}
      whileInView={{ scale: [0, 1.6, 1] }}
      viewport={{ once: true, amount: 1 }}
      transition={{ duration: 0.6, ease }}
    />
  );
}

/* ---------- Parallax: drifts at a different speed to the page ---------- */

export function Parallax({ children, speed = 80, className }: { children: ReactNode; speed?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [speed, -speed]);
  return (
    <motion.div ref={ref} className={className} style={reduce ? undefined : { y }}>
      {children}
    </motion.div>
  );
}
