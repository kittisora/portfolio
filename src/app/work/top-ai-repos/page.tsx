import type { Metadata } from "next";
import { SITE_NAME, caseStudyJsonLd } from "@/lib/site";
import { TopAiReposPage } from "./top-ai-repos-page";

const OG_IMAGE = "/topairepos/hero.webp";

const DESCRIPTION =
    "An open-source platform that indexes 25,000+ AI repositories on GitHub and scores them on two axes - trend momentum and production-readiness quality - so you can tell what is moving from what you can build on.";

export const metadata: Metadata = {
    title: "Top AI Repos - Case Study",
    description: DESCRIPTION,
    keywords: [
        "Kittipong Sorasuchart",
        "Top AI Repos",
        "open source",
        "AI repository ranking",
        "GitHub data pipeline",
        "repository quality scoring",
        "Next.js",
        "PostgreSQL",
        "Drizzle ORM",
    ],
    alternates: { canonical: "/work/top-ai-repos" },
    openGraph: {
        type: "article",
        locale: "en_US",
        siteName: SITE_NAME,
        url: "/work/top-ai-repos",
        title: "Top AI Repos - Case Study · Kittipong Sorasuchart",
        description: DESCRIPTION,
        images: [{ url: OG_IMAGE, width: 1600, height: 1000, alt: "Top AI Repos" }],
    },
    twitter: {
        card: "summary_large_image",
        title: "Top AI Repos - Case Study",
        description: DESCRIPTION,
        images: [OG_IMAGE],
    },
};

export default function Page() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(
                        caseStudyJsonLd({
                            title: "Top AI Repos - Case Study",
                            description: DESCRIPTION,
                            slug: "top-ai-repos",
                            image: OG_IMAGE,
                        }),
                    ),
                }}
            />
            <TopAiReposPage />
        </>
    );
}
