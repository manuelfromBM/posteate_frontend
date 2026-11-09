import { defineConfig, Options } from "tsup";

export default defineConfig((options: Options) => ({
  entry: {
    web: "src/web/index.tsx",
    native: "src/native/index.tsx",
  },
  banner: {
    js: "'use client'",
  },
  clean: true,
  format: ["cjs", "esm"],
  external: ["react", "react-native"],
  dts: {
    compilerOptions: {
      ignoreDeprecations: "6.0",
      skipLibCheck: true,
    },
  },
  ...options,
}));