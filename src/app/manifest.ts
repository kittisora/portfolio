import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: "Kittipong Sorasuchart - AI Specialist & DevOps Engineer",
        short_name: "Kittipong",
        description:
            "AI Specialist and DevOps Engineer building intelligent systems with reliable infrastructure.",
        start_url: "/",
        display: "standalone",
        background_color: "#0F111C",
        theme_color: "#0F111C",
        icons: [
            {
                src: "/icon.png",
                sizes: "512x512",
                type: "image/png",
                purpose: "any",
            },
            {
                src: "/favicon.ico",
                sizes: "any",
                type: "image/x-icon",
            },
        ],
    };
}
