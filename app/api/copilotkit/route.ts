import { NextRequest } from "next/server";
import {
  CopilotRuntime,
  copilotRuntimeNextJSAppRouterEndpoint,
} from "@copilotkit/runtime";

// Define the NoOpServiceAdapter class to act as a placeholder
class NoOpServiceAdapter {
  async process(request: any): Promise<any> {
    // Returns an empty response, satisfying TypeScript without actual processing
    return { threadId: "noop", messages: [] };
  }
}

// Instantiate the runtime with remote actions
const runtime = new CopilotRuntime({
  remoteActions: [
    {
      url: process.env.REMOTE_ACTION_URL || "https://agent.fcode.info/copilotkit",
    },
  ],
});

// Use NoOpServiceAdapter as the service adapter
const serviceAdapter = new NoOpServiceAdapter();

export const POST = async (req: NextRequest) => {
  const { handleRequest } = copilotRuntimeNextJSAppRouterEndpoint({
    runtime,
    serviceAdapter, // Assign the no-op adapter here
    endpoint: "/api/copilotkit",
  });

  return handleRequest(req);
};
