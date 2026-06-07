import Link from "next/link";
import { libraryTracks, solutionCases } from "./data";

export default function Home() {
  return (
    <main id="top" className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(243,178,62,0.18),_transparent_32%),radial-gradient(circle_at_80%_20%,_rgba(42,105,86,0.18),_transparent_28%),linear-gradient(180deg,_rgba(247,243,233,0.96),_rgba(239,233,220,0.92))]" />
        <div className="absolute -left-24 top-24 h-72 w-72 rounded-full bg-[rgba(24,58,46,0.08)] blur-3xl" />
        <div className="absolute right-0 top-12 h-80 w-80 rounded-full bg-[rgba(197,124,44,0.12)] blur-3xl" />

        <div className="relative mx-auto flex min-h-[calc(100vh-74px)] w-full max-w-7xl flex-col px-6 pb-16 pt-10 sm:px-10 lg:px-12">
          <div className="grid flex-1 items-center gap-14 py-14 lg:grid-cols-[1.05fr_0.95fr] lg:py-20">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-[rgba(24,40,33,0.12)] bg-white/70 px-4 py-2 text-sm text-[var(--muted)] shadow-[0_10px_30px_rgba(37,51,45,0.08)] backdrop-blur">
                <span className="h-2 w-2 rounded-full bg-[var(--accent)]" />
                Structured from simple to advanced
              </div>

              <h2 className="mt-7 max-w-4xl font-display text-5xl leading-[0.96] tracking-[-0.04em] sm:text-6xl lg:text-7xl">
                A real problems library built for serious practice.
              </h2>

              <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--muted)] sm:text-xl">
                The product now has two clear pillars: a scalable problems
                library and a dedicated solutions space for real engineering
                cases, explanations, and tradeoffs.
              </p>

              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <Link
                  href="/problems"
                  className="inline-flex items-center justify-center rounded-full bg-[var(--text)] px-6 py-3 text-sm font-semibold text-[var(--surface)] transition-transform duration-300 hover:-translate-y-0.5"
                >
                  Open problems
                </Link>
                <Link
                  href="/solutions"
                  className="inline-flex items-center justify-center rounded-full border border-[rgba(24,40,33,0.16)] bg-white/70 px-6 py-3 text-sm font-semibold transition-colors duration-300 hover:bg-white"
                >
                  Open solutions
                </Link>
              </div>

              <div className="mt-12 grid gap-4 sm:grid-cols-3">
                <Stat value="159+" label="Planned problems" />
                <Stat value="2" label="Core sections" />
                <Stat value="Pro" label="UI direction" />
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 translate-x-4 translate-y-4 rounded-[2rem] bg-[rgba(31,54,46,0.1)] blur-xl" />
              <div className="relative flex min-h-[520px] flex-col justify-between rounded-[2rem] border border-dashed border-[rgba(24,40,33,0.18)] bg-[rgba(250,247,240,0.7)] p-8 shadow-[0_30px_80px_rgba(52,58,49,0.12)] backdrop-blur">
                <div>
                  <p className="text-sm uppercase tracking-[0.28em] text-[var(--muted)]">
                    Hero Visual Zone
                  </p>
                  <h3 className="mt-3 font-display text-3xl leading-tight">
                    Reserved for 3D model or custom interactive visual
                  </h3>
                </div>

                <div className="rounded-[1.75rem] border border-[rgba(24,40,33,0.08)] bg-white/65 p-5">
                  <p className="text-sm uppercase tracking-[0.24em] text-[var(--muted)]">
                    Placeholder
                  </p>
                  <p className="mt-3 text-base leading-7 text-[var(--text)]">
                    This area stays intentionally clean so we can later place a
                    premium 3D object, animated scene, or product visualization
                    without redesigning the hero again.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-6 py-20 sm:px-10 lg:px-12">
        <div className="grid gap-6 lg:grid-cols-3">
          {libraryTracks.map((track) => (
            <article
              key={track.title}
              className="rounded-[2rem] border border-[rgba(24,40,33,0.1)] bg-[var(--panel)] p-7 shadow-[0_20px_60px_rgba(54,58,50,0.07)]"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--muted)]">
                {track.level}
              </p>
              <h3 className="mt-4 font-display text-3xl tracking-[-0.03em]">
                {track.title}
              </h3>
              <p className="mt-4 text-base leading-7 text-[var(--muted)]">
                {track.description}
              </p>
              <p className="mt-8 text-sm font-semibold">{track.count}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-[rgba(24,40,33,0.08)] bg-[linear-gradient(180deg,_rgba(249,246,238,1),_rgba(243,238,228,0.82))]">
        <div className="mx-auto w-full max-w-7xl px-6 py-20 sm:px-10 lg:px-12">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="font-mono text-xs uppercase tracking-[0.35em] text-[var(--muted)]">
                Solutions Preview
              </p>
              <h2 className="mt-3 font-display text-4xl tracking-[-0.03em] sm:text-5xl">
                Practical cases with readable solution paths
              </h2>
            </div>
            <Link
              href="/solutions"
              className="inline-flex items-center justify-center rounded-full bg-[var(--text)] px-6 py-3 text-sm font-semibold text-[var(--surface)]"
            >
              Go to solutions
            </Link>
          </div>

          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {solutionCases.map((item) => (
              <article
                key={item.title}
                className="rounded-[1.75rem] border border-[rgba(24,40,33,0.1)] bg-white/80 p-6 shadow-[0_18px_44px_rgba(52,58,49,0.08)]"
              >
                <div className="flex items-center justify-between gap-3">
                  <h3 className="font-display text-2xl tracking-[-0.03em]">
                    {item.title}
                  </h3>
                  <span className="rounded-full bg-[var(--accent-soft)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-[var(--accent-deep)]">
                    {item.stage}
                  </span>
                </div>
                <p className="mt-4 text-sm uppercase tracking-[0.2em] text-[var(--muted)]">
                  {item.type}
                </p>
                <p className="mt-4 text-base leading-7 text-[var(--muted)]">
                  {item.summary}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-[1.5rem] border border-[rgba(24,40,33,0.1)] bg-white/70 p-5 shadow-[0_12px_32px_rgba(46,52,46,0.06)] backdrop-blur">
      <div className="font-display text-3xl tracking-[-0.04em]">{value}</div>
      <div className="mt-2 text-sm text-[var(--muted)]">{label}</div>
    </div>
  );
}
