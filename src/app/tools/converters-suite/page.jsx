import { ToolPageChrome } from "@/components/tools/ToolPageChrome";
import { ConvertersSuite } from "@/components/tools/suites/ConvertersSuite";

export const metadata = {
  title: "Converters Suite",
  description: "A clearer converters suite for unit, binary, and Morse workflows.",
};

export default function ConvertersSuitePage() {
  return (
    <ToolPageChrome
      title="Converters Suite"
      description="Easier-to-scan converter cards and a focused workspace for unit, binary, and Morse modes."
      maxWidthClass="max-w-5xl"
    >
      <ConvertersSuite />
    </ToolPageChrome>
  );
}
