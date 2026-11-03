import { skills } from "@/content";

const tools = skills.flatMap((s) => s.items);

function Row({ items, reverse, duration }: { items: string[]; reverse?: boolean; duration: string }) {
  // Content is doubled so the -50% loop is seamless.
  return (
    <div className="flex overflow-hidden">
      <ul
        className={`marquee flex shrink-0 items-center gap-6 pr-6 ${reverse ? "marquee-reverse" : ""}`}
        style={{ ["--marquee-duration" as string]: duration }}
      >
        {[...items, ...items].map((t, i) => (
          <li key={i} aria-hidden={i >= items.length} className="flex shrink-0 items-center gap-6">
            <span className="whitespace-nowrap font-display text-[clamp(1.75rem,5vw,3.5rem)] font-bold tracking-[-0.03em]">
              {t}
            </span>
            <span aria-hidden="true" className="opacity-40">✦</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Marquee() {
  const half = Math.ceil(tools.length / 2);
  return (
    <section aria-label="Tools I work with" className="marquee-wrap -rotate-2 scale-105 overflow-hidden bg-amber py-6 text-ink">
      <Row items={tools.slice(0, half)} duration="45s" />
      <div className="mt-3 text-violet">
        <Row items={tools.slice(half)} reverse duration="38s" />
      </div>
    </section>
  );
}
