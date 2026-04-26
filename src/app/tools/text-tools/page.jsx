import { ToolPageChrome } from "@/components/tools/ToolPageChrome";
import { TextToolsPanel } from "@/components/tools/TextToolsPanel";

export const metadata = {
  title: "Text Tools",
  description: "Word count, case conversion, and cleanup in one workspace.",
};

export default function TextToolsPage() {
  return (
    <ToolPageChrome
      title="Text Tools"
      description="A unified text studio for counting, case changes, and cleanup workflows."
      maxWidthClass="max-w-6xl"
    >
      <TextToolsPanel />
    </ToolPageChrome>
  );
}
