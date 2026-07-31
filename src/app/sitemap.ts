import type { MetadataRoute } from "next";
import { CASE_STUDY_SLUGS, SITE_URL } from "@/lib/site";

/**
 * Evaluated once per build rather than once per entry, so every URL in a given
 * sitemap shares a single coherent `lastmod` instead of drifting by milliseconds.
 */
const BUILD_DATE = new Date();

export default function sitemap(): MetadataRoute.Sitemap {
    return [
        {
            url: SITE_URL,
            lastModified: BUILD_DATE,
            changeFrequency: "weekly",
            priority: 1,
        },
        {
            url: `${SITE_URL}/services`,
            lastModified: BUILD_DATE,
            changeFrequency: "monthly",
            priority: 0.9,
        },
        ...CASE_STUDY_SLUGS.map((slug) => ({
            url: `${SITE_URL}/work/${slug}`,
            lastModified: BUILD_DATE,
            changeFrequency: "monthly" as const,
            priority: 0.8,
        })),
        {
            url: `${SITE_URL}/privacy-policy`,
            lastModified: BUILD_DATE,
            changeFrequency: "yearly",
            priority: 0.3,
        },
    ];
}
