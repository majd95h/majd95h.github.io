import Image from "next/image";
import Hero from "@/components/Hero";
import ContactForm from "@/components/ContactForm";
import Marquee from "@/components/Marquee";
import {
  CountUp,
  Magnetic,
  Parallax,
  Reveal,
  ScrollProgress,
  SplitHeading,
  Stagger,
  StaggerItem,
  Tilt,
  TimelineDot,
  TimelineRail,
} from "@/components/motion";
import {
  about,
  experience,
  facts,
  languages,
  profile,
  projects,
  services,
  skills,
} from "@/content";

function SectionHeading({ id, title, lead, light }: { id: string; title: string; lead?: string; light?: boolean }) {
  return (
    <div className="max-w-2xl">
      <SplitHeading
        id={id}
        text={title}
        className="font-display text-[clamp(2rem,4.5vw,3.25rem)] font-bold leading-[1.05] tracking-[-0.03em]"
      />
      {lead && (
        <Reveal from="blur" delay={0.3}>
          <p className={`mt-4 text-lg ${light ? "text-white/80" : "text-ink-soft"}`}>{lead}</p>
        </Reveal>
      )}
    </div>
  );
}

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <Hero />

      <main>
        {/* About */}
        <section aria-labelledby="about" className="mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
          <div className="grid gap-12 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-16">
            <Reveal from="scale" className="mx-auto w-full max-w-sm self-start md:mx-0">
              <Parallax speed={40}>
                <Tilt className="rounded-[2rem]">
                  <div aria-hidden="true" className="absolute inset-0 translate-x-4 translate-y-4 rounded-[2rem] bg-amber [transform:translateZ(-40px)]" />
                  <Image
                    src="/majd.jpg"
                    alt="Portrait of Majd Hsien"
                    width={375}
                    height={482}
                    priority
                    className="relative aspect-[375/482] w-full rounded-[2rem] object-cover"
                  />
                </Tilt>
              </Parallax>
            </Reveal>
            <div>
              <SectionHeading id="about" title="ERP work that people actually like using." />
              <div className="mt-8 max-w-[62ch] space-y-5 text-lg">
                {about.map((p, i) => (
                  <Reveal key={p.slice(0, 20)} from="up" delay={0.1 + i * 0.12}>
                    <p>{p}</p>
                  </Reveal>
                ))}
              </div>
              <Stagger as="dl" className="mt-12 grid gap-8 sm:grid-cols-3" gap={0.15}>
                {facts.map((f) => (
                  <StaggerItem as="div" key={f.label} className="group border-t-4 border-violet pt-4">
                    <dt className="sr-only">{f.label}</dt>
                    <dd>
                      <CountUp
                        value={f.value}
                        className="block origin-left font-display text-5xl font-bold tracking-tight text-violet transition-transform duration-300 group-hover:scale-110"
                      />
                      <span className="mt-1 block text-ink-soft">{f.label}</span>
                    </dd>
                  </StaggerItem>
                ))}
              </Stagger>
              <Reveal from="blur" delay={0.2}>
                <p className="mt-10 text-ink-soft">
                  I speak{" "}
                  {languages.map((l, i) => (
                    <span key={l.name}>
                      <strong className="font-semibold text-ink">{l.name}</strong> ({l.level})
                      {i < languages.length - 2 ? ", " : i === languages.length - 2 ? " and " : "."}
                    </span>
                  ))}
                </p>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Services */}
        <section aria-labelledby="services" className="overflow-hidden bg-white py-24 sm:py-32">
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <SectionHeading
              id="services"
              title="What I can build for you"
              lead="Available for full-time remote roles, contracts and one-off projects."
            />
            <Stagger className="mt-14 grid gap-x-12 md:grid-cols-2" gap={0.12}>
              {services.map((s, i) => (
                <StaggerItem
                  key={s.title}
                  className={`group relative isolate border-t-2 border-mist py-8 ${i === 0 ? "md:col-span-2 md:border-violet" : ""}`}
                >
                  {/* Hover: an amber wash sweeps in from the left */}
                  <span
                    aria-hidden="true"
                    className="absolute inset-y-0 -left-5 -right-5 -z-10 origin-left scale-x-0 rounded-2xl bg-amber/25 transition-transform duration-500 ease-out group-hover:scale-x-100"
                  />
                  <h3
                    className={`font-display font-bold tracking-[-0.02em] transition-transform duration-500 group-hover:translate-x-3 ${
                      i === 0 ? "text-[clamp(1.75rem,3.5vw,2.6rem)] text-violet" : "text-[1.4rem]"
                    }`}
                  >
                    {s.title}
                  </h3>
                  <p className={`mt-3 max-w-[60ch] text-ink-soft ${i === 0 ? "text-lg" : ""}`}>{s.description}</p>
                  <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-[0.95rem] font-medium text-ink">
                    {s.tools.map((t, ti) => (
                      <li
                        key={t}
                        className="transition-transform duration-300 group-hover:-translate-y-1"
                        style={{ transitionDelay: `${ti * 50}ms` }}
                      >
                        {t}
                      </li>
                    ))}
                  </ul>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>

        <div className="overflow-hidden py-16">
          <Marquee />
        </div>

        {/* Work */}
        <section aria-labelledby="work" className="mx-auto max-w-6xl px-5 pb-24 pt-8 sm:px-8 sm:pb-32">
          <SectionHeading
            id="work"
            title="Selected work"
            lead="Client names stay private, so here is what the work involved."
          />
          <Stagger className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" gap={0.1}>
            {projects.map((p, i) => (
              <StaggerItem
                key={p.title}
                className={`${i === 0 ? "lg:row-span-2" : ""} ${i === projects.length - 1 ? "lg:col-span-3" : ""}`}
              >
                <Tilt className="rounded-3xl">
                  <div
                    className={`relative flex h-full flex-col overflow-hidden rounded-3xl p-7 ${
                      i === 0 ? "bg-violet text-white lg:justify-end lg:p-9" : "bg-white"
                    }`}
                  >
                    {i === 0 && (
                      <span
                        aria-hidden="true"
                        className="pointer-events-none absolute -right-10 -top-10 size-48 rounded-full border-[18px] border-amber/80 motion-safe:animate-[spin_18s_linear_infinite]"
                        style={{ borderTopColor: "transparent" }}
                      />
                    )}
                    <h3
                      className={`relative font-display font-bold tracking-[-0.02em] ${
                        i === 0 ? "text-[clamp(1.8rem,3vw,2.4rem)] leading-tight" : "text-xl"
                      }`}
                    >
                      {p.title}
                    </h3>
                    <p className={`relative mt-3 ${i === 0 ? "text-lg text-white/85" : "text-ink-soft"}`}>{p.summary}</p>
                    <ul className="relative mt-5 flex flex-wrap gap-2" aria-label="Stack">
                      {p.stack.map((t) => (
                        <li
                          key={t}
                          className={`rounded-full px-3 py-1 text-sm font-medium ${
                            i === 0 ? "bg-white/15 text-white" : "bg-paper text-ink"
                          }`}
                        >
                          {t}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Tilt>
              </StaggerItem>
            ))}
          </Stagger>
        </section>

        {/* Experience */}
        <section aria-labelledby="experience" className="bg-white py-24 sm:py-32">
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <SectionHeading id="experience" title="Experience" />
            <TimelineRail>
              <ol className="space-y-14 pl-8 sm:pl-12">
                {experience.map((job) => (
                  <li key={job.company} className="relative">
                    <TimelineDot />
                    <div className="grid gap-2 md:grid-cols-[13rem_1fr] md:gap-10">
                      <Reveal from="left">
                        <p className="font-semibold text-violet">{job.period}</p>
                      </Reveal>
                      <Reveal from="right" delay={0.1}>
                        <h3 className="font-display text-2xl font-bold tracking-[-0.02em]">{job.company}</h3>
                        <p className="mt-1 text-ink-soft">
                          {job.role}, {job.place}
                        </p>
                        <Stagger className="mt-5 max-w-[64ch] list-disc space-y-2 pl-5 marker:text-amber" gap={0.12}>
                          {job.points.map((pt) => (
                            <StaggerItem key={pt}>{pt}</StaggerItem>
                          ))}
                        </Stagger>
                      </Reveal>
                    </div>
                  </li>
                ))}
              </ol>
            </TimelineRail>
            <Reveal from="blur">
              <p className="mt-14 text-ink-soft">
                Bachelor of Engineering in Information Technology, Syrian Virtual University.
              </p>
            </Reveal>
          </div>
        </section>

        {/* Skills */}
        <section aria-labelledby="skills" className="mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
          <SectionHeading id="skills" title="Tools I work with" />
          <Stagger as="dl" className="mt-12 grid gap-x-12 gap-y-8 sm:grid-cols-2 lg:grid-cols-3" gap={0.1}>
            {skills.map((s) => (
              <StaggerItem as="div" key={s.group}>
                <dt className="font-display text-lg font-bold">{s.group}</dt>
                <dd className="mt-3 flex flex-wrap gap-2">
                  {s.items.map((item) => (
                    <span
                      key={item}
                      className="cursor-default rounded-full border-2 border-mist bg-white px-3 py-1 text-[0.95rem] transition-all duration-200 hover:-translate-y-1 hover:-rotate-3 hover:border-violet hover:bg-violet hover:text-white"
                    >
                      {item}
                    </span>
                  ))}
                </dd>
              </StaggerItem>
            ))}
          </Stagger>
        </section>

        {/* Contact */}
        <section aria-labelledby="contact" className="relative overflow-hidden bg-ink text-white">
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -left-32 -top-32 size-96 rounded-full bg-violet/50 blur-3xl motion-safe:animate-[pulse_6s_ease-in-out_infinite]"
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-40 right-0 size-[28rem] rounded-full bg-amber/15 blur-3xl motion-safe:animate-[pulse_8s_ease-in-out_infinite]"
          />
          <div className="relative mx-auto grid max-w-6xl gap-14 px-5 py-24 sm:px-8 sm:py-32 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
            <div>
              <SplitHeading
                id="contact"
                text="Have an Odoo project in mind?"
                className="font-display text-[clamp(2.25rem,5vw,3.75rem)] font-bold leading-[1.02] tracking-[-0.03em]"
              />
              <Reveal from="blur" delay={0.3}>
                <p className="mt-6 max-w-[40ch] text-lg text-white/80">
                  Tell me what you need. {profile.availability}.
                </p>
              </Reveal>
              <Stagger className="mt-10 space-y-3 text-lg" gap={0.1}>
                {[
                  { href: `mailto:${profile.email}`, label: profile.email },
                  { href: profile.linkedin, label: "LinkedIn", external: true },
                  ...(profile.github ? [{ href: profile.github, label: "GitHub", external: true }] : []),
                  { href: profile.cv, label: "Download my CV (PDF)", download: true },
                ].map((link) => (
                  <StaggerItem key={link.label}>
                    <Magnetic strength={0.2}>
                      <a
                        href={link.href}
                        {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                        {...(link.download ? { download: true } : {})}
                        className="group relative inline-block"
                      >
                        {link.label}
                        <span className="absolute -bottom-0.5 left-0 h-0.5 w-full bg-amber transition-transform duration-300 group-hover:scale-x-0" />
                        <span className="absolute -bottom-0.5 left-0 h-0.5 w-full origin-left scale-x-0 bg-white transition-transform delay-150 duration-300 group-hover:scale-x-100" />
                      </a>
                    </Magnetic>
                  </StaggerItem>
                ))}
              </Stagger>
            </div>
            <Reveal from="right" delay={0.15}>
              <ContactForm />
            </Reveal>
          </div>
        </section>
      </main>

      <footer className="bg-ink text-white/60">
        <div className="mx-auto flex max-w-6xl flex-wrap justify-between gap-4 border-t border-white/10 px-5 py-8 text-sm sm:px-8">
          <p>© 2026 {profile.fullName}</p>
          <a href="#top" className="transition-colors hover:text-amber">
            Back to top
          </a>
        </div>
      </footer>
    </>
  );
}
