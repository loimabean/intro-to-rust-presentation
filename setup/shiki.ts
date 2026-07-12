import { defineShikiSetup } from "@slidev/types";
import warmBurnoutDark from "./warm-burnout-dark.json";
import warmBurnoutLight from "./warm-burnout-light.json";

export default defineShikiSetup(() => {
  return {
    themes: {
      dark: warmBurnoutDark,
      light: warmBurnoutLight,
    },
    transformers: [
      // ...
    ],
  };
});
