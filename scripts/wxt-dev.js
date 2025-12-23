#!/usr/bin/env node
// Increase default listener limit to avoid MaxListenersExceededWarning during dev.
// This is a safe, local workaround when the dev server or tooling attaches
// multiple listeners (for example when hot-reloading spawns multiple browser
// inspector sessions).
import events from "events";
import { spawn } from "child_process";

try {
  // set to a higher number (or 0 for unlimited). 20 is usually enough.
  events.defaultMaxListeners = 20;
} catch (err) {
  // ignore if require fails
}

const child = spawn("wxt", process.argv.slice(2), {
  stdio: "inherit",
  shell: true,
});
child.on("exit", function (code) {
  process.exit(code);
});
