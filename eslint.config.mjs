import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Vendored FFmpeg WASM runtime copied from node_modules (see scripts/copy-ffmpeg-assets.mjs)
    "public/ffmpeg/**",
    // Vendored ONNX Runtime Web WASM runtime + AI model, same rationale (see scripts/copy-bg-remover-assets.mjs)
    "public/ort/**",
    "public/models/**",
  ]),
]);

export default eslintConfig;
