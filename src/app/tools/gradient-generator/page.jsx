import { ToolPageChrome } from "@/components/tools/ToolPageChrome";
import { GradientGenerator } from "@/tools/GradientGenerator/GradientGenerator";

export const metadata = {
  title: "Gradient Generator",
  description: "Linear CSS gradients — two colors, direction, copy or randomize.",
};

export default function GradientGeneratorPage() {
  return (
    <ToolPageChrome
      instructionKey="gradient-generator"
      title="Gradient Generator"
      description="Preview linear gradients and copy ready-to-paste CSS."
    >
      <GradientGenerator />
    </ToolPageChrome>
  );
}
