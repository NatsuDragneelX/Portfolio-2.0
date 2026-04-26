import { ToolPageChrome } from "@/components/tools/ToolPageChrome";
import { CalculatorSuite } from "@/components/tools/suites/CalculatorSuite";

export const metadata = {
  title: "Calculator Suite",
  description: "A clearer calculator suite for scientific, percentage, and tip workflows.",
};

export default function CalculatorSuitePage() {
  return (
    <ToolPageChrome
      title="Calculator Suite"
      description="Easier-to-scan calculator cards and a focused workspace for scientific, percentage, and tip modes."
      maxWidthClass="max-w-5xl"
    >
      <CalculatorSuite />
    </ToolPageChrome>
  );
}
