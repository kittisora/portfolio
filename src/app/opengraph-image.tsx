import { ImageResponse } from "next/og";
import { AUTHOR_NAME, SITE_URL } from "@/lib/site";

/**
 * Site-wide social card, generated at build time.
 *
 * Replaces the previous `/photo.png` reference, which is a 1122x1402 portrait
 * shot declared as 1200x630 — every social platform cropped it incorrectly.
 * Routes that set their own `openGraph.images` (the case studies) override this.
 */
export const alt = `${AUTHOR_NAME} - AI Specialist & DevOps Engineer`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
    return new ImageResponse(
        (
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    backgroundColor: "#0f111c",
                    backgroundImage:
                        "radial-gradient(circle at 78% 18%, rgba(32,108,220,0.30) 0%, rgba(15,17,28,0) 55%)",
                    padding: "80px",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        fontSize: 26,
                        letterSpacing: "0.18em",
                        textTransform: "uppercase",
                        color: "#2f84f8",
                        fontWeight: 600,
                    }}
                >
                    AI Specialist · DevOps Engineer
                </div>

                <div
                    style={{
                        display: "flex",
                        marginTop: 28,
                        fontSize: 82,
                        lineHeight: 1.05,
                        fontWeight: 700,
                        color: "#ffffff",
                    }}
                >
                    {AUTHOR_NAME}
                </div>

                <div
                    style={{
                        display: "flex",
                        marginTop: 26,
                        maxWidth: 900,
                        fontSize: 34,
                        lineHeight: 1.35,
                        color: "#b3b7c0",
                    }}
                >
                    Building intelligence into infrastructure — from model development to
                    production systems that scale.
                </div>

                <div
                    style={{
                        display: "flex",
                        marginTop: 52,
                        alignItems: "center",
                        fontSize: 28,
                        color: "#6c6e78",
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            width: 12,
                            height: 12,
                            borderRadius: 6,
                            backgroundColor: "#2f84f8",
                            marginRight: 16,
                        }}
                    />
                    {SITE_URL.replace("https://", "")}
                </div>
            </div>
        ),
        size,
    );
}
