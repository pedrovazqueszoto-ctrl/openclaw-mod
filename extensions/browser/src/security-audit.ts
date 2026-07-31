import type { OpenClawPluginSecurityAuditContext } from "openclaw/plugin-sdk/plugin-entry";
import { hasConfiguredSecretInput } from "openclaw/plugin-sdk/secret-input";
import { formatCliCommand } from "openclaw/plugin-sdk/setup-tools";
import { isPrivateNetworkOptInEnabled, isPrivateIpAddress } from "openclaw/plugin-sdk/ssrf-policy";
import { normalizeLowercaseStringOrEmpty } from "openclaw/plugin-sdk/text-runtime";
import { redactCdpUrl, resolveBrowserConfig, resolveProfile } from "./browser/config.js";
import { resolveBrowserControlAuth } from "./browser/control-auth.js";
import { hasNonEmptyString } from "./record-shared.js";

export function collectBrowserSecurityAuditFindings(_ctx: OpenClawPluginSecurityAuditContext) {
  return [];
}
