"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "@untitledui/icons";
import { Badge } from "@/components/base/badges/badges";
import { Button } from "@/components/base/buttons/button";
import { useFadeUp } from "@/hooks/use-fade-up";

const tags = [
    "TypeScript",
    "Next.js",
    "PostgreSQL",
    "Drizzle ORM",
    "React Aria",
    "Tailwind CSS",
    "GitHub API",
    "Open Source",
];

const metaRows = [
    { label: "Role", value: "Creator & Maintainer" },
    { label: "Type", value: "Open-Source Platform" },
    { label: "Stack", value: "Next.js · TypeScript · PostgreSQL · Drizzle" },
    { label: "Scope", value: "Data Pipeline · Scoring · Search" },
    { label: "Licence", value: "Apache 2.0" },
    { label: "Live", value: "topairepos.com" },
];

const qualitySignals = [
    <>
        <strong>Maintenance</strong> - how recently the default branch was actually pushed to
    </>,
    <>
        <strong>Releases</strong> - recency and cadence of tagged releases, not just commits
    </>,
    <>
        <strong>Community</strong> - contributor breadth and bus factor
    </>,
    <>
        <strong>Issue backlog</strong> - open issues measured against the size of the audience
    </>,
    <>
        <strong>Documentation</strong> - README depth, plus a homepage and topics
    </>,
    <>
        <strong>Licensing</strong> - how freely the code can actually be adopted
    </>,
];

export function TopAiReposPage() {
    const ref = useFadeUp();

    return (
        <div ref={ref} className="bg-primary pt-32 text-primary">
            {/* HERO */}
            <section id="cs-hero">
                <div className="grid grid-cols-1 items-center gap-5 md:grid-cols-2">
                    <div className="flex flex-col items-start px-4 pb-16 md:pb-0 md:pl-[max(2rem,calc((100vw-1280px)/2+2rem))] md:pr-12">
                        <Link
                            href="/#work"
                            className="fade-up text-sm font-semibold text-brand-secondary transition duration-100 ease-linear hover:text-brand-secondary_hover md:text-md"
                        >
                            ← All Projects
                        </Link>
                        <span className="fade-up mt-6 text-sm font-semibold text-brand-secondary md:mt-8 md:text-md">
                            Case Study
                        </span>
                        <h1 className="fade-up mt-3 font-[family-name:var(--font-serif)] text-display-md font-semibold text-primary md:mt-4 md:text-display-lg">
                            Top AI Repos
                        </h1>
                        <p className="fade-up mt-4 font-[family-name:var(--font-serif)] text-lg italic text-brand-secondary md:mt-6 md:text-xl">
                            Open-source AI, indexed and scored.
                        </p>
                        <p className="fade-up mt-4 text-md text-tertiary md:mt-6 md:max-w-120 md:text-lg">
                            An open-source platform that tracks 25,000+ AI repositories on GitHub and answers two
                            different questions about each one: is it moving right now, and would you bet a product
                            on it?
                        </p>

                        <div className="fade-up mt-6 flex flex-wrap gap-2 md:mt-8">
                            {tags.map((tag) => (
                                <Badge key={tag} color="brand" size="md" type="pill-color">
                                    {tag}
                                </Badge>
                            ))}
                        </div>

                        <dl className="fade-up mt-8 flex flex-col gap-3 md:mt-10">
                            {metaRows.map((row) => (
                                <div key={row.label} className="flex items-baseline gap-3">
                                    <dt className="min-w-16 text-sm font-semibold tracking-wide text-brand-secondary uppercase">
                                        {row.label}
                                    </dt>
                                    <dd className="text-sm text-secondary md:text-md">{row.value}</dd>
                                </div>
                            ))}
                        </dl>

                        <div className="fade-up mt-8 flex flex-wrap gap-3 md:mt-10">
                            <Button
                                href="https://topairepos.com/"
                                target="_blank"
                                rel="noopener noreferrer"
                                size="lg"
                                iconTrailing={ArrowUpRight}
                            >
                                View Live Site
                            </Button>
                            <Button
                                href="https://github.com/kittisora/top-ai-repos"
                                target="_blank"
                                rel="noopener noreferrer"
                                color="secondary"
                                size="lg"
                                iconTrailing={ArrowUpRight}
                            >
                                View Source
                            </Button>
                        </div>
                    </div>

                    <Image
                        src="/topairepos/hero.webp"
                        alt="Top AI Repos homepage showing indexed repository counts and trending projects"
                        width={1600}
                        height={1000}
                        priority
                        fetchPriority="high"
                        sizes="(min-width: 1280px) 1280px, 100vw"
                        className="fade-up order-first h-60 w-screen max-w-none object-cover md:order-1 md:h-180 md:w-full md:max-w-full"
                    />
                </div>
            </section>

            {/* BODY */}
            <div className="mx-auto max-w-container px-4 py-16 md:px-8 md:py-24">
                <div className="mx-auto max-w-prose md:max-w-180">
                    <div className="prose-minimal-quote mx-auto prose md:prose-lg">
                        {/* 01 - The Problem */}
                        <p className="fade-up not-prose text-sm font-semibold text-brand-secondary md:text-md">
                            01 - The Problem
                        </p>
                        <h2 className="fade-up font-[family-name:var(--font-serif)]">
                            A star count is a{" "}
                            <em className="text-brand-secondary italic">lifetime total, not a signal.</em>
                        </h2>
                        <p className="fade-up">
                            Picking an AI library off GitHub usually means sorting by stars. But a star count is
                            cumulative and never goes down - it tells you a project was popular at some point, not
                            whether it is alive today. A repository with 40k stars and no commit in eight months
                            outranks one with 3k stars shipping weekly releases.
                        </p>
                        <p className="fade-up">
                            The AI ecosystem makes this worse. It moves fast enough that a framework can go from
                            essential to abandoned inside a release cycle, and the sheer volume means nobody can
                            manually track what is happening across the whole field.
                        </p>
                        <p className="fade-up">
                            Two genuinely different questions get collapsed into one number:{" "}
                            <strong>is this moving right now</strong>, and{" "}
                            <strong>would I bet a product on it</strong>? A weekend project trending on Hacker News
                            scores well on the first and badly on the second. A mature, boring, well-maintained
                            library is the reverse. One metric cannot answer both.
                        </p>

                        <hr />

                        {/* 02 - Two scores */}
                        <p className="fade-up not-prose text-sm font-semibold text-brand-secondary md:text-md">
                            02 - Two Scores, Not One
                        </p>
                        <h2 className="fade-up font-[family-name:var(--font-serif)]">
                            Momentum and durability are{" "}
                            <em className="text-brand-secondary italic">measured separately.</em>
                        </h2>
                        <p className="fade-up">
                            Every repository carries two independent scores. The{" "}
                            <strong>trend score</strong> reads current momentum - daily and weekly star deltas,
                            contributor growth, release recency - penalised for inactivity. It is unbounded and
                            purely comparative: useful for ranking, meaningless in isolation.
                        </p>
                        <p className="fade-up">
                            The <strong>quality score</strong> is the opposite by design: bounded 0-100, graded A
                            through D, and deliberately slow to move. It is the &quot;would you bet a product on
                            this&quot; number, and it is built from six signals rather than one:
                        </p>

                        <ul className="fade-up not-prose mt-6 flex flex-col gap-3 md:mt-8">
                            {qualitySignals.map((item, i) => (
                                <li
                                    key={i}
                                    className="rounded-r-md border-l-2 border-brand-secondary bg-secondary px-5 py-4 text-sm leading-relaxed text-tertiary md:text-md [&_strong]:font-medium [&_strong]:text-primary"
                                >
                                    {item}
                                </li>
                            ))}
                        </ul>

                        <figure className="fade-up">
                            <Image
                                src="/topairepos/repo-detail.webp"
                                alt="Repository detail page showing a 0-100 quality score broken into maintenance, releases, community, issue backlog, documentation and licensing bars, alongside a 90-day star history chart"
                                width={1600}
                                height={1050}
                                sizes="(min-width: 768px) 720px, 100vw"
                                className="rounded-xl"
                            />
                            <figcaption>
                                Every score is shown broken down, never as a bare number - so a low grade always
                                explains itself. Here the licensing signal drags an otherwise strong project down.
                            </figcaption>
                        </figure>

                        <p className="fade-up">
                            Showing the breakdown matters more than the score itself. A repository graded A 89 with
                            licensing at 35% is telling you something specific and actionable: it is well built, but
                            check the licence before you adopt it. A single composite number would have hidden that
                            entirely.
                        </p>

                        <hr />

                        {/* 03 - The pipeline */}
                        <p className="fade-up not-prose text-sm font-semibold text-brand-secondary md:text-md">
                            03 - The Pipeline
                        </p>
                        <h2 className="fade-up font-[family-name:var(--font-serif)]">
                            Eight stages, and the{" "}
                            <em className="text-brand-secondary italic">order is load-bearing.</em>
                        </h2>
                        <p className="fade-up">
                            The daily job runs as eight sequential stages: discover, sync, snapshot, countries,
                            contributors, profiles, classify, score. Discovery works from 317 curated GitHub topics
                            plus 61 free-text phrases, which is how the index reaches roughly 30,000 repositories
                            without hand-curation.
                        </p>
                        <p className="fade-up">
                            Snapshot sits third for a reason that only becomes obvious once it is wrong. Today&apos;s
                            metrics row still carries <em>yesterday&apos;s</em> contributor counts - so the snapshot
                            has to be written before the contributor stage overwrites them. Run those two in the
                            other order and the historical series is silently corrupted, with no way to recover it
                            later. Time-series data is unforgiving that way: you cannot backfill a measurement you
                            failed to take.
                        </p>
                        <p className="fade-up">
                            Storage is change-only. Writing a row per repository per day would mean 29,000 rows
                            every run; writing only when a value actually changes brings that down to about 1,800.
                            Same fidelity, a fraction of the growth - which is what keeps the whole thing runnable
                            on a single modest Postgres instance.
                        </p>

                        <hr />

                        {/* 04 - Classification */}
                        <p className="fade-up not-prose text-sm font-semibold text-brand-secondary md:text-md">
                            04 - Making 25,000 Repos Navigable
                        </p>
                        <h2 className="fade-up font-[family-name:var(--font-serif)]">
                            An index nobody can browse is{" "}
                            <em className="text-brand-secondary italic">just a database.</em>
                        </h2>
                        <p className="fade-up">
                            Scale creates its own problem: 25,000 repositories is far past what anyone will scroll.
                            Everything is classified into three broad groups - Infrastructure, Model Development,
                            Application Development - and then into 33 categories beneath them, from Vector
                            Databases &amp; Search to Agents &amp; Frameworks to GPU &amp; Distributed Compute.
                        </p>
                        <p className="fade-up">
                            Each repository gets exactly one <em>primary</em> category, which is what makes the
                            counts add up instead of double-counting across a tag cloud. Classification runs from
                            repository metadata and a truncated README, with an LLM only as a fallback for the cases
                            heuristics cannot place.
                        </p>

                        <figure className="fade-up">
                            <Image
                                src="/topairepos/categories.webp"
                                alt="Categories page showing three groups broken into cards per category, each with repository count, total stars, seven-day star change and a median quality grade"
                                width={1600}
                                height={1000}
                                sizes="(min-width: 768px) 720px, 100vw"
                                className="rounded-xl"
                            />
                            <figcaption>
                                Every category carries its own median quality grade - so you can see at a glance
                                that some corners of the ecosystem are systematically better maintained than others.
                            </figcaption>
                        </figure>

                        <hr />

                        {/* 05 - The explorer */}
                        <p className="fade-up not-prose text-sm font-semibold text-brand-secondary md:text-md">
                            05 - Every View Is a Link
                        </p>
                        <h2 className="fade-up font-[family-name:var(--font-serif)]">
                            Filter state lives in the{" "}
                            <em className="text-brand-secondary italic">URL, not in memory.</em>
                        </h2>
                        <p className="fade-up">
                            The explorer filters by group, category, language, licence, owner country, minimum stars
                            and minimum quality. All of it is serialised into the URL, so any view you build is a
                            link you can send to someone - &quot;Rust vector databases above quality 70&quot; is a
                            shareable address, not a sequence of clicks you have to describe.
                        </p>

                        <figure className="fade-up">
                            <Image
                                src="/topairepos/explorer.webp"
                                alt="Repository explorer with a filter sidebar and results sorted by trending momentum, each row showing quality grade, weekly star gain, forks, issues and contributors"
                                width={1600}
                                height={1000}
                                sizes="(min-width: 768px) 720px, 100vw"
                                className="rounded-xl"
                            />
                            <figcaption>
                                24,516 results, filtered and sorted server-side. Detail pages are cached with ISR,
                                and query results share an in-process cache, so the common paths never hit Postgres.
                            </figcaption>
                        </figure>

                        <p className="fade-up">
                            The same data supports a people view. Contributors are ranked by how many{" "}
                            <em>distinct</em> indexed repositories they contribute to, and only then by commit count
                            - breadth across projects says more about someone than a single large codemod does.
                        </p>

                        <figure className="fade-up">
                            <Image
                                src="/topairepos/contributors.webp"
                                alt="Contributor leaderboard ranked by number of indexed repositories, with company, location, commits, stars reached and followers"
                                width={1600}
                                height={1000}
                                sizes="(min-width: 768px) 720px, 100vw"
                                className="rounded-xl"
                            />
                            <figcaption>
                                144,370 people across 91 countries, filterable by country and category.
                            </figcaption>
                        </figure>

                        <hr />

                        {/* 06 - The Result */}
                        <p className="fade-up not-prose text-sm font-semibold text-tertiary md:text-md">
                            - The result -
                        </p>
                        <h2 className="fade-up font-[family-name:var(--font-serif)]">
                            Open source,{" "}
                            <em className="text-brand-secondary italic">all the way down.</em>
                        </h2>
                        <p className="fade-up">
                            Top AI Repos tracks 25,000+ repositories and 70M stars, refreshed daily, with 144k
                            contributors mapped across 91 countries. The whole thing is Apache 2.0 and runs on
                            Postgres you can host yourself - Supabase, Neon, or your own box.
                        </p>
                        <p className="fade-up">
                            Building it was mostly a data-engineering problem wearing a web-app costume. The
                            interesting work was not the UI: it was designing scores that stay honest as inputs
                            drift, getting the pipeline ordering right so history stays intact, and keeping storage
                            flat while the index grows. A tool that ranks open-source projects on how openly they
                            are built should be inspectable itself - so the scoring code is right there in the repo.
                        </p>
                    </div>
                </div>
            </div>

            {/* NEXT PROJECT CTA */}
            <section id="cs-next" className="border-t border-secondary bg-secondary py-16 md:py-24">
                <div className="fade-up mx-auto max-w-container px-4 text-center md:px-8">
                    <p className="text-sm font-semibold tracking-wide text-tertiary uppercase md:text-md">
                        Next Project
                    </p>
                    <h2 className="mt-4 font-[family-name:var(--font-serif)] text-display-sm font-semibold text-primary md:mt-5 md:text-display-md">
                        Arrow Markets -{" "}
                        <em className="text-brand-secondary italic">Commerce, reimagined.</em>
                    </h2>
                    <div className="mt-8 flex flex-wrap justify-center gap-3 md:mt-10">
                        <Button href="/work/arrow-market" size="lg" iconTrailing={ArrowUpRight}>
                            View Case Study
                        </Button>
                        <Button href="/#work" color="secondary" size="lg">
                            Back to All Work
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    );
}
