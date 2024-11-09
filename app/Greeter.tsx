"use client";

import { useCoAgent } from "@copilotkit/react-core";
import { CopilotPopup } from "@copilotkit/react-ui";

export function Greeter() {
  useCoAgent({
    name: "greeting_agent",
    initialState: {
      model: "llama3-groq-8b-8192-tool-use-preview", // Hardcode the model here if required
    },
  });

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="text-2xl">Text Q&A example</div>
      <div>
        ask: {'"'}Greet me!{'"'}
      </div>

      <CopilotPopup defaultOpen={true} clickOutsideToClose={false} />
    </div>
  );
}
