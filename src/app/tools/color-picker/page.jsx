import { ToolPageChrome } from "@/components/tools/ToolPageChrome";
import { ColorPicker } from "@/tools/ColorPicker/ColorPicker";

export const metadata = {
  title: "Color Picker",
  description: "Hex, RGB, HSL, and an auto-generated tint and shade palette.",
};

export default function ColorPickerPage() {
  return (
    <ToolPageChrome
      instructionKey="color-picker"
      title="Color Picker"
      description="Pick a color, read formats, copy values, and explore generated shades."
    >
      <ColorPicker />
    </ToolPageChrome>
  );
}
