import { ToolPageChrome } from "@/components/tools/ToolPageChrome";
import { PercentageCalculator } from "@/tools/PercentageCalculator/PercentageCalculator";

export const metadata = {
  title: "Percentage Calculator",
  description: "Percent of, ratio to percent, increase/decrease, and reverse percent.",
};

export default function PercentageCalculatorPage() {
  return (
    <ToolPageChrome
      instructionKey="percentage-calculator"
      title="Percentage Calculator"
      description="Four common percentage questions in one place — all update as you type."
      maxWidthClass="max-w-xl"
    >
      <PercentageCalculator />
    </ToolPageChrome>
  );
}
