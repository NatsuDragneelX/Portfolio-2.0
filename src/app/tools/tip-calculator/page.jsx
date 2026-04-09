import { ToolPageChrome } from "@/components/tools/ToolPageChrome";
import { TipCalculator } from "@/tools/TipCalculator/TipCalculator";

export const metadata = {
  title: "Tip Calculator",
  description: "Split the bill with tip — per-person totals and presets.",
};

export default function TipCalculatorPage() {
  return (
    <ToolPageChrome
      instructionKey="tip-calculator"
      title="Tip Calculator"
      description="Enter the bill, tip percent, and party size. Totals update live."
    >
      <TipCalculator />
    </ToolPageChrome>
  );
}
