import type { Express, Request } from "express";
import express from "express";

export function installBrowserCommonMiddleware(app: Express) {
  app.use((req, res, next) => {
    const ctrl = new AbortController();
    const abort = () => ctrl.abort(new Error("request aborted"));
    req.once("aborted", abort);
    res.once("close", () => {
      if (!res.writableEnded) {
        abort();
      }
    });
    // Make the signal available to browser route handlers (best-effort).
    // Use a non-conflicting property name; Node 22+ IncomingMessage has a getter-only `signal`.
    (req as unknown as { abortSignal?: AbortSignal }).abortSignal = ctrl.signal;
    next();
  });
  app.use(express.json({ limit: "1mb" }));
}
