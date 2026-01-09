#!/usr/bin/env node
import "./index";
import { ExecMindClient } from "./client";

async function main() {
  const argv = process.argv.slice(2);
  const cmd = argv[0];
  if (cmd === "init") {
    console.log("ExecMind Copilot SDK CLI — initialize config");
    console.log("Create a .env file with EXECMIND_API_KEY and EXECMIND_WEBHOOK_SECRET");
    return;
  }

  if (cmd === "run") {
    const promptIndex = argv.indexOf("--prompt");
    if (promptIndex === -1 || !argv[promptIndex + 1]) {
      console.error("Missing --prompt argument");
      process.exit(1);
    }
    const prompt = argv[promptIndex + 1];

    const apiKey = process.env.EXECMIND_API_KEY;
    if (!apiKey) {
      console.error("EXECMIND_API_KEY env var required");
      process.exit(1);
    }

    const client = new ExecMindClient({ apiKey });
    const resp = await client.copilot.run({ prompt });
    console.log(resp.output);
    return;
  }

  console.log("Usage: execmind-copilot <init|run --prompt '...'\n");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
