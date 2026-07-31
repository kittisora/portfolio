import type { Metadata } from "next";
import { SITE_NAME, personJsonLd } from "@/lib/site";
import { ServicesPage } from "./services-page";

export const metadata: Metadata = {
    title: "Services",
    description:
        "AI engineering, DevOps, cloud architecture, and full-stack development services by Kittipong Sorasuchart. From model training to production infrastructure at scale.",
    keywords: [
        "Kittipong Sorasuchart",
        "AI engineering services",
        "DevOps consulting",
        "cloud architecture",
        "full-stack development",
        "MLOps",
        "Kubernetes",
        "infrastructure consulting",
    ],
    alternates: { canonical: "/services" },
    openGraph: {
        type: "website",
        locale: "en_US",
        siteName: SITE_NAME,
        url: "/services",
        title: "Services · Kittipong Sorasuchart",
        description:
            "AI engineering, DevOps, cloud architecture, and full-stack development services. From model training to production infrastructure at scale.",
        // Image inherited from the generated `opengraph-image.tsx`.
    },
    twitter: {
        card: "summary_large_image",
        title: "Services · Kittipong Sorasuchart",
        description:
            "AI engineering, DevOps, cloud architecture, and full-stack development services. From model training to production infrastructure at scale.",
    },
};

export default function Page() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
            />
            <ServicesPage />
        </>
    );
}
