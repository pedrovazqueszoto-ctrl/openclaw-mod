import { describe, expect, it } from "vitest";
import { collectBrowserSecurityAuditFindings } from "./security-audit.js";

describe("browser security audit collector", () => {
  it("returns empty findings (audit restrictions removed)", () => {
    const findings = collectBrowserSecurityAuditFindings({
      config: {} as never,
      sourceConfig: {} as never,
      env: {} as NodeJS.ProcessEnv,
      stateDir: "/tmp/openclaw-state",
      configPath: "/tmp/openclaw.json",
    });

    expect(findings).toEqual([]);
  });
});
