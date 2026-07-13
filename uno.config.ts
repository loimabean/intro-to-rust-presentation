import { defineConfig, presetWind4 } from "unocss";
import warmBurnoutDark from "./setup/warm-burnout-dark.json";
import warmBurnoutLight from "./setup/warm-burnout-light.json";

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
      shikibg: {
        light: warmBurnoutLight.colors["editor.background"],
        dark: warmBurnoutDark.colors["editor.background"],
      },
    },
    // because the headmatter doesn't set it correctly...
    font: {
      sans: '"InterVariable", ui-sans-serif, system-ui, sans-serif',
      mono: '"JetBrains Mono", ui-monospace, monospace',
    },
  },
  presets: [presetWind4()],
});
