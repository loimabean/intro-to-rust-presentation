import type { CodeRunnerOutputText } from "@slidev/types";

export const PLAYGROUND_ENDPOINT = "https://play.rust-lang.org/execute";

export const OFFLINE_MESSAGE = "Couldn't reach the Rust Playground (offline?)";

export interface PlaygroundResult {
  success: boolean;
  exitDetail?: string;
  stdout: string;
  stderr: string;
}

export function buildExecuteBody(code: string): Record<string, unknown> {
  return {
    channel: "stable",
    mode: "debug",
    edition: "2024",
    crateType: "bin",
    tests: false,
    backtrace: false,
    code,
  };
}

// only want real output
const CARGO_BOILERPLATE = /^\s*(Compiling|Finished|Running)\b/;

export function stripCargoBoilerplate(stderr: string): string {
  return stderr
    .split("\n")
    .filter((line) => !CARGO_BOILERPLATE.test(line))
    .join("\n")
    .trim();
}

// @unocss-include (unocss does not scan .ts by default)
// whitespace-pre preserves rustc's caret alignment. slidev's output
// container is already monospace but doesn't preserve whitespace by default
const BASE_CLASS = "whitespace-pre";

export function formatRunOutput(
  result: PlaygroundResult,
): CodeRunnerOutputText[] {
  const outputs: CodeRunnerOutputText[] = [];

  const stdout = result.stdout.replace(/\n+$/, "");
  if (stdout.length > 0) {
    outputs.push({ text: stdout, class: BASE_CLASS });
  }

  const diagnostics = stripCargoBoilerplate(result.stderr);
  if (diagnostics.length > 0) {
    const color = result.success ? "text-yellow-500" : "text-red-500";
    outputs.push({ text: diagnostics, class: `${BASE_CLASS} ${color}` });
  }

  if (outputs.length === 0) {
    outputs.push({ text: "(no output)", class: `${BASE_CLASS} op-50` });
  }

  return outputs;
}
