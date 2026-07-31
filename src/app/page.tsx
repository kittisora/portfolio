import type { Metadata } from "next";
import { SITE_NAME, personJsonLd, websiteJsonLd } from "@/lib/site";
import { HomePage } from "./home-page";

export const metadata: Metadata = {
    title: "Kittipong Sorasuchart - AI Specialist & DevOps Engineer",
    description:
        "AI Specialist and DevOps Engineer building intelligent systems with reliable infrastructure. From model development to production deployment at scale.",
    alternates: {
        canonical: "/",
    },
    openGraph: {
        type: "website",
        locale: "en_US",
        siteName: SITE_NAME,
        url: "/",
        title: "Kittipong Sorasuchart - AI Specialist & DevOps Engineer",
        description:
            "AI Specialist and DevOps Engineer building intelligent systems with reliable, scalable infrastructure.",
        // Image inherited from the generated `opengraph-image.tsx`.
    },
    twitter: {
        card: "summary_large_image",
        title: "Kittipong Sorasuchart - AI Specialist & DevOps Engineer",
        description:
            "AI Specialist and DevOps Engineer building intelligent systems with reliable, scalable infrastructure.",
    },
};

export default function Page() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
            />
            <HomePage />
        </>
    );
}
