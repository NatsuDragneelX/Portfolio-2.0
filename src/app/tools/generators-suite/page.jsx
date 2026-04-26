import { ToolPageChrome } from "@/components/tools/ToolPageChrome";
import { GeneratorsSuite } from "@/components/tools/suites/GeneratorsSuite";

export const metadata = {
  title: "Generators Suite",
  description: "A clearer generators suite for password creation and standout QR output.",
};

export default function GeneratorsSuitePage() {
  return (
    <ToolPageChrome
      title="Generators Suite"
      description="Easier-to-scan generator cards and a stronger QR preview panel so output is clearer."
      maxWidthClass="max-w-5xl"
    >
      <GeneratorsSuite />
    </ToolPageChrome>
  );
}
