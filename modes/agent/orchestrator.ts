import chalk from "chalk";
import { isCancel, text } from "@clack/prompts";
import { defaultAgentConfig } from "./types";
import { ActionTracker } from "./action-traker";
import { ToolExecutor } from "./tool-executor"
export async function runAgentMode() {
    console.log(chalk.bold('\n Agent Mode'))

    const goal = await text({
        message: "What wound you like the agent to do ?",
        placeholder: "Concreate task for this codebase...",
    });
    if(isCancel(goal) || !goal.trim()) return;

    const config = defaultAgentConfig()
    const tracker = new ActionTracker()
    const executor = new ToolExecutor(tracker, config)
}