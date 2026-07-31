import type { Metadata } from "next";
import { SITE_NAME, caseStudyJsonLd } from "@/lib/site";
import { UniqueLeveragePage } from "./unique-leverage-page";

// hero.jpg is a 1920x2226 portrait — social cards crop it badly.
// docs.png is the widest referenced asset for this case study.
const OG_IMAGE = "/uniqueleverage/docs.png";

export const metadata: Metadata = {
    title: "Unique Leverage - Case Study",
    description:
        "An AI-powered marketing automation platform for car dealers - automated Facebook Marketplace posting, per-vehicle AI ad creative, and VIN-level lead attribution.",
    keywords: [
        "Kittipong Sorasuchart",
        "Unique Leverage",
        "automotive marketing automation",
        "Facebook Marketplace automation",
        "AI ad generation",
        "car dealer software",
        "lead attribution",
        "Meta ads",
    ],
    alternates: { canonical: "/work/unique-leverage" },
    openGraph: {
        type: "article",
        locale: "en_US",
        siteName: SITE_NAME,
        url: "/work/unique-leverage",
        title: "Unique Leverage - Case Study · Kittipong Sorasuchart",
        description:
            "An AI-powered marketing automation platform for car dealers - automated Facebook Marketplace posting, per-vehicle AI ad creative, and VIN-level lead attribution.",
        images: [{ url: OG_IMAGE, width: 1572, height: 959, alt: "Unique Leverage" }],
    },
    twitter: {
        card: "summary_large_image",
        title: "Unique Leverage - Case Study",
        description:
            "An AI-powered marketing automation platform for car dealers - automated Facebook Marketplace posting, per-vehicle AI ad creative, and VIN-level lead attribution.",
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
                            title: "Unique Leverage - Case Study",
                            description:
                                "An AI-powered marketing automation platform for car dealers - automated Facebook Marketplace posting, per-vehicle AI ad creative, and VIN-level lead attribution.",
                            slug: "unique-leverage",
                            image: OG_IMAGE,
                        }),
                    ),
                }}
            />
            <UniqueLeveragePage />
        </>
    );
}
