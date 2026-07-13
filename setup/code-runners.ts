import { defineCodeRunnersSetup } from "@slidev/types";
import {
  buildExecuteBody,
  formatRunOutput,
  OFFLINE_MESSAGE,
  PLAYGROUND_ENDPOINT,
  type PlaygroundResult,
} from "./rust-playground";

export default defineCodeRunnersSetup(() => ({
  async rust(code) {
    try {
      const res = await fetch(PLAYGROUND_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(buildExecuteBody(code)),
      });
      if (!res.ok) {
        return { error: `${OFFLINE_MESSAGE} (HTTP ${res.status})` };
      }
      const result = (await res.json()) as PlaygroundResult;
      return formatRunOutput(result);
    } catch {
      return { error: OFFLINE_MESSAGE };
    }
  },
}));
