import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

/** @type {import("eslint").Linter.Config[]} */
const config = [
    {
        ignores: [
            ".next/**",
            "out/**",
            "build/**",
            "node_modules/**",
            "next-env.d.ts",
            // Unrelated static site kept locally; also gitignored.
            "same/**",
        ],
    },
    ...nextCoreWebVitals,
    ...nextTypescript,
    {
        rules: {
            "@typescript-eslint/no-explicit-any": "warn",
            "@typescript-eslint/no-unused-vars": [
                "warn",
                { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
            ],
        },
    },
    {
        // The handful of files still vendored from the Untitled UI React kit.
        // They are third-party and not maintained here, so `<img>` usage is not
        // worth churning; everything else stays at full strictness.
        files: ["src/components/base/**", "src/components/foundations/**"],
        rules: {
            "@next/next/no-img-element": "off",
        },
    },
];

export default config;
