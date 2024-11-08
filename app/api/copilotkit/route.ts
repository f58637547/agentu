import { NextRequest } from "next/server";
import {
  CopilotRuntime,
  GroqAdapter,
  copilotRuntimeNextJSAppRouterEndpoint,
} from "@copilotkit/runtime";
import { Groq } from "groq-sdk";

// Initialize the Groq SDK with your API key
const groq = new Groq({ apiKey: process.env["GROQ_API_KEY"] });
const serviceAdapter = new GroqAdapter({ groq, model: "llama3-groq-8b-8192-tool-use-preview" });

// Set up the CopilotRuntime with Groq as the primary service adapter
const runtime = new CopilotRuntime({
  remoteActions: [
    {
      url: process.env.REMOTE_ACTION_URL || "https://agent.fcode.info/copilotkit",
    },
  ],
});

export const POST = async (req: NextRequest) => {
  const { handleRequest } = copilotRuntimeNextJSAppRouterEndpoint({
    runtime,
    serviceAdapter,  // Use GroqAdapter instead of OpenAIAdapter
    endpoint: "/api/copilotkit",
  });

  return handleRequest(req);
};
