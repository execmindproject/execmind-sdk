export type LogLevel = "silent" | "error" | "info" | "debug";

export class Logger {
  private level: LogLevel;
  constructor(level: LogLevel = "info") {
    this.level = level;
  }

  debug(...args: unknown[]) {
    if (this.level === "debug") console.debug("[execmind][debug]", ...args);
  }

  info(...args: unknown[]) {
    if (this.level === "debug" || this.level === "info") console.info("[execmind][info]", ...args);
  }

  error(...args: unknown[]) {
    if (this.level !== "silent") console.error("[execmind][error]", ...args);
  }
}
