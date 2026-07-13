import { describe, expect, it } from "vitest";
import {
  buildExecuteBody,
  formatRunOutput,
  stripCargoBoilerplate,
} from "./rust-playground";

describe("buildExecuteBody", () => {
  it("sets the params and edition 2024", () => {
    const body = buildExecuteBody("fn main() {}");
    expect(body).toMatchObject({
      channel: "stable",
      mode: "debug",
      edition: "2024",
      crateType: "bin",
      tests: false,
      backtrace: false,
      code: "fn main() {}",
    });
  });
});

describe("stripCargoBoilerplate", () => {
  it("removes Compiling/Finished/Running progress lines", () => {
    const stderr =
      "   Compiling playground v0.0.1 (/playground)\n" +
      "    Finished `dev` profile in 0.70s\n" +
      "     Running `target/debug/playground`\n";
    expect(stripCargoBoilerplate(stderr)).toBe("");
  });

  it("keeps real diagnostics", () => {
    const stderr =
      "   Compiling playground v0.0.1 (/playground)\n" +
      "error[E0382]: borrow of moved value: `s1`\n" +
      " --> src/main.rs:1:61\n";
    const out = stripCargoBoilerplate(stderr);
    expect(out).toContain("error[E0382]");
    expect(out).toContain("--> src/main.rs");
    expect(out).not.toContain("Compiling");
  });
});

describe("formatRunOutput", () => {
  it("returns stdout as a whitespace-preserving text output", () => {
    const outs = formatRunOutput({
      success: true,
      stdout: "hi from playground\n",
      stderr: "   Compiling playground v0.0.1\n    Finished\n     Running\n",
    });
    // cargo boilerplate stripped, so only stdout remains
    expect(outs).toHaveLength(1);
    expect(outs[0].text).toBe("hi from playground");
    expect(outs[0].class).toContain("whitespace-pre");
  });

  it("returns a failure diagnostic in the error color, unescaped", () => {
    const outs = formatRunOutput({
      success: false,
      stdout: "",
      stderr:
        "error[E0382]: borrow of moved value: `s1`\n --> src/main.rs:1:61\n",
    });
    expect(outs).toHaveLength(1);
    expect(outs[0].text).toContain("error[E0382]");
    expect(outs[0].text).toContain("--> src/main.rs");
    expect(outs[0].class).toContain("text-red-500");
    expect(outs[0].class).toContain("whitespace-pre-wrap");
  });

  it("uses the warning color for diagnostics on a successful run", () => {
    const outs = formatRunOutput({
      success: true,
      stdout: "hi\n",
      stderr: "warning: unused variable: `x`\n",
    });
    expect(outs).toHaveLength(2);
    expect(outs[1].text).toContain("warning:");
    expect(outs[1].class).toContain("text-yellow-500");
  });

  it("shows a placeholder when there is no output", () => {
    const outs = formatRunOutput({ success: true, stdout: "", stderr: "" });
    expect(outs).toHaveLength(1);
    expect(outs[0].text).toBe("(no output)");
  });
});
