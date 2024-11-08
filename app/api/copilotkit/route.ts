import { NextRequest } from "next/server";
import {
  CopilotRuntime,
  copilotRuntimeNextJSAppRouterEndpoint,
} from "@copilotkit/runtime";

// Define a RemoteServiceAdapter to forward requests to the backend
class RemoteServiceAdapter {
  private apiUrl: string;

  constructor(apiUrl: string) {
    this.apiUrl = apiUrl;
  }

  async process(request: any): Promise<any> {
    const response = await fetch(this.apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      throw new Error(`Failed to communicate with backend API: ${response.statusText}`);
    }

    return response.json();
  }
}

// Instantiate the runtime and service adapter
const runtime = new CopilotRuntime({
  remoteActions: [
    {
      url: process.env.REMOTE_ACTION_URL || "https://agent.fcode.info/copilotkit",
    },
  ],
});

const serviceAdapter = new RemoteServiceAdapter(
  process.env.REMOTE_ACTION_URL || "https://agent.fcode.info/copilotkit"
);

export const POST = async (req: NextRequest) => {
  const { handleRequest } = copilotRuntimeNextJSAppRouterEndpoint({
    runtime,
    serviceAdapter,
    endpoint: "/api/copilotkit",
  });

  return handleRequest(req);
};
