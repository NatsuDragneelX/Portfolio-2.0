import { ToolPageChrome } from "@/components/tools/ToolPageChrome";
import { UnitConverter } from "@/tools/UnitConverter/UnitConverter";

export const metadata = {
  title: "Unit Converter",
  description: "Convert length, weight, temperature, and speed units live.",
};

export default function UnitConverterPage() {
  return (
    <ToolPageChrome
      instructionKey="unit-converter"
      title="Unit Converter"
      description="Pick a category, enter a value, and read the converted result instantly."
      maxWidthClass="max-w-2xl"
    >
      <UnitConverter />
    </ToolPageChrome>
  );
}
