import { ToolPageChrome } from "@/components/tools/ToolPageChrome";
import { ScientificCalculator } from "@/tools/ScientificCalculator/ScientificCalculator";

export const metadata = {
  title: "Scientific Calculator",
  description: "Trig, log, powers, π and e — responsive keypad.",
};

export default function ScientificCalculatorPage() {
  return (
    <ToolPageChrome
      instructionKey="scientific-calculator"
      title="Scientific Calculator"
      description="Build expressions with the keypad; display scrolls for long lines."
      maxWidthClass="max-w-lg"
    >
      <ScientificCalculator />
    </ToolPageChrome>
  );
}
