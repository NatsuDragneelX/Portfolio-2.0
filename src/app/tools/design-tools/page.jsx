import { ToolPageChrome } from "@/components/tools/ToolPageChrome";
import { DesignToolsSuite } from "@/components/tools/suites/DesignToolsSuite";

export const metadata = {
  title: "Design Tools",
  description: "A clearer design tools workspace for color picking and gradient generation.",
};

export default function DesignToolsPage() {
  return (
    <ToolPageChrome
      title="Design Tools"
      description="Easier-to-scan cards for Color Picker and Gradient Generator, plus a focused workspace below."
      maxWidthClass="max-w-5xl"
    >
      <DesignToolsSuite />
    </ToolPageChrome>
  );
}
