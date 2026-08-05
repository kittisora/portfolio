import type { Metadata } from "next";
import { SITE_NAME, caseStudyJsonLd } from "@/lib/site";
import { SiteAuditorPage } from "./site-auditor-page";

const OG_IMAGE = "/siteautitor/report-perf.webp";

export const metadata: Metadata = {
    title: "Site Auditor - Case Study",
    description:
        "An AI-powered website audit platform that crawls entire sites and scores SEO, performance, security, UX, AI visibility, and brand health with LLM-driven recommendations.",
    keywords: [
        "Kittipong Sorasuchart",
        "Site Auditor",
        "ReviewMySite",
        "website audit tool",
        "SEO audit",
        "AI website analysis",
        "Lighthouse",
        "site performance",
    ],
    alternates: { canonical: "/work/site-auditor" },
    openGraph: {
        type: "article",
        locale: "en_US",
        siteName: SITE_NAME,
        url: "/work/site-auditor",
        title: "Site Auditor - Case Study · Kittipong Sorasuchart",
        description:
            "An AI-powered website audit platform that crawls entire sites and scores SEO, performance, security, UX, AI visibility, and brand health with LLM-driven recommendations.",
        images: [{ url: OG_IMAGE, width: 1879, height: 905, alt: "Site Auditor" }],
    },
    twitter: {
        card: "summary_large_image",
        title: "Site Auditor - Case Study",
        description:
            "An AI-powered website audit platform that crawls entire sites and scores SEO, performance, security, UX, AI visibility, and brand health with LLM-driven recommendations.",
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
                            title: "Site Auditor - Case Study",
                            description:
                                "An AI-powered website audit platform that crawls entire sites and scores SEO, performance, security, UX, AI visibility, and brand health with LLM-driven recommendations.",
                            slug: "site-auditor",
                            image: OG_IMAGE,
                        }),
                    ),
                }}
            />
            <SiteAuditorPage />
        </>
    );
}
