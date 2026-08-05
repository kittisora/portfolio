import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { Footer } from "@/components/portfolio/footer";
import { PortfolioHeader } from "@/components/portfolio/portfolio-header";
import { RouteProvider } from "@/providers/router-provider";
import { Theme } from "@/providers/theme";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import "@/styles/globals.css";
import { cx } from "@/utils/cx";

const inter = Inter({
    subsets: ["latin"],
    display: "swap",
    variable: "--font-inter",
});

const playfair = Playfair_Display({
    subsets: ["latin"],
    display: "swap",
    variable: "--font-playfair",
});

export const metadata: Metadata = {
    metadataBase: new URL(SITE_URL),
    title: {
        default: "Kittipong Sorasuchart - AI Specialist & DevOps Engineer",
        template: "%s · Kittipong Sorasuchart",
    },
    description:
        "AI Specialist and DevOps Engineer building intelligent systems with reliable infrastructure. From model development to production deployment at scale.",
    keywords: [
        "Kittipong",
        "Kittipong Sorasuchart",
        "Kittipong Mirimera",
        "Kittipong Sorasuchart Mirimera",
        "Mirimera",
        "AI specialist",
        "DevOps engineer",
        "cloud architect",
        "machine learning",
        "MLOps",
        "Kubernetes",
        "infrastructure",
        "AI engineering",
        "platform engineering",
    ],
    authors: [{ name: "Kittipong Sorasuchart", url: SITE_URL }],
    creator: "Kittipong Sorasuchart",
    publisher: "Kittipong Sorasuchart",
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },
    alternates: {
        canonical: SITE_URL,
    },
    openGraph: {
        type: "website",
        locale: "en_US",
        url: SITE_URL,
        siteName: SITE_NAME,
        title: "Kittipong Sorasuchart - AI Specialist & DevOps Engineer",
        description:
            "AI Specialist and DevOps Engineer building intelligent systems with reliable, scalable infrastructure.",
        // Image comes from `opengraph-image.tsx` (generated 1200x630) — do not
        // hardcode one here, or the generated card is overridden site-wide.
    },
    twitter: {
        card: "summary_large_image",
        title: "Kittipong Sorasuchart - AI Specialist & DevOps Engineer",
        description:
            "AI Specialist and DevOps Engineer building intelligent systems with reliable, scalable infrastructure.",
    },
    icons: {
        icon: [
            { url: "/favicon.ico", sizes: "any" },
            { url: "/icon.png", type: "image/png" },
        ],
    },
};

export const viewport: Viewport = {
    themeColor: "#0F111C",
    colorScheme: "light dark",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    // Font variables must live on <html>, not <body>. `--font-body` and
    // `--font-serif` are declared at `:root` (= <html>) and substitute
    // `var(--font-inter)` there — if the variable is only defined on <body> it is
    // not in scope, the var() falls back to the literal "Inter" string, and
    // next/font's metric-matched fallback face (the thing that prevents CLS on
    // font swap) is silently never used.
    return (
        <html
            lang="en"
            suppressHydrationWarning
            className={cx(inter.variable, playfair.variable)}
        >
            <body className="bg-primary text-primary antialiased">
                <RouteProvider>
                    <Theme>
                        <a
                            href="#main"
                            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-lg focus:bg-brand-solid focus:px-4 focus:py-2 focus:text-white"
                        >
                            Skip to content
                        </a>
                        <PortfolioHeader />
                        {/*
                          * Single `main` landmark for every route — page components must not
                          * add their own. `tabIndex={-1}` is required: without it the skip
                          * link moves the scroll position but not focus, so the next Tab
                          * returns to the header nav and the link does nothing useful.
                          */}
                        <main id="main" tabIndex={-1}>
                            {children}
                        </main>
                        <Footer />
                    </Theme>
                </RouteProvider>
            </body>
        </html>
    );
}
