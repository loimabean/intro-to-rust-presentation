import { defineConfig, presetWind4 } from "unocss";

const shade = (name: string) =>
  Object.fromEntries(
    [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950].map((n) => [
      n,
      `var(--color-${name}-${n})`,
    ]),
  );

export default defineConfig({
  theme: {
    colors: {
      rust: shade("rust"),
      taupe: shade("taupe"), // to make sure all shades generate
    },
    // because the headmatter doesn't set it correctly...
    font: {
      sans: '"InterVariable", ui-sans-serif, system-ui, sans-serif',
      mono: '"JetBrains Mono", ui-monospace, monospace',
    },
  },
  presets: [presetWind4()],
});
