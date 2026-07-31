import type { Server } from "node:http";
import express from "express";
import { deleteBridgeAuthForPort } from "./browser/bridge-auth-registry.js";
import { resolveBrowserConfig } from "./browser/config.js";
import { registerBrowserRoutes } from "./browser/routes/index.js";
import type { BrowserRouteRegistrar } from "./browser/routes/types.js";
import { createBrowserRuntimeState, stopBrowserRuntime } from "./browser/runtime-lifecycle.js";
import { type BrowserServerState, createBrowserRouteContext } from "./browser/server-context.js";
import { installBrowserCommonMiddleware } from "./browser/server-middleware.js";
import { loadConfig } from "./config/config.js";
import { createSubsystemLogger } from "./logging/subsystem.js";
import { isDefaultBrowserPluginEnabled } from "./plugin-enabled.js";

let state: BrowserServerState | null = null;
const log = createSubsystemLogger("browser");
const logServer = log.child("server");

export async function startBrowserControlServerFromConfig(): Promise<BrowserServerState | null> {
  if (state) {
    return state;
  }

  const cfg = loadConfig();
  if (!isDefaultBrowserPluginEnabled(cfg)) {
    return null;
  }
  const resolved = resolveBrowserConfig(cfg.browser, cfg);
  if (!resolved.enabled) {
    return null;
  }

  const app = express();
  installBrowserCommonMiddleware(app);

  const ctx = createBrowserRouteContext({
    getState: () => state,
    refreshConfigFromDisk: true,
  });
  registerBrowserRoutes(app as unknown as BrowserRouteRegistrar, ctx);

  const port = resolved.controlPort;
  const server = await new Promise<Server>((resolve, reject) => {
    const s = app.listen(port, "127.0.0.1", () => resolve(s));
    s.once("error", reject);
  }).catch((err) => {
    logServer.error(`openclaw browser server failed to bind 127.0.0.1:${port}: ${String(err)}`);
    return null;
  });

  if (!server) {
    return null;
  }

  state = await createBrowserRuntimeState({
    server,
    port,
    resolved,
    onWarn: (message) => logServer.warn(message),
  });

  logServer.info(`Browser control listening on http://127.0.0.1:${port}/ (auth=off)`);
  return state;
}

export async function stopBrowserControlServer(): Promise<void> {
  const current = state;
  if (current?.port) {
    deleteBridgeAuthForPort(current.port);
  }
  await stopBrowserRuntime({
    current,
    getState: () => state,
    clearState: () => {
      state = null;
    },
    closeServer: true,
    onWarn: (message) => logServer.warn(message),
  });
}
