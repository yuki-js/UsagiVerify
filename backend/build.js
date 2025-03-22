import * as esbuild from "esbuild";

await esbuild.build({
  entryPoints: ["src/index.ts"],
  bundle: true,
  outfile: "dist/index.cjs",
  platform: "node",
  target: "node22",
  format: "cjs",
  sourcemap: true,
  minify: false,
});
