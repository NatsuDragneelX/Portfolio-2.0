import { ToolPageChrome } from "@/components/tools/ToolPageChrome";
import { WorldClock } from "@/tools/WorldClock/WorldClock";

export const metadata = {
  title: "World Clock",
  description: "Live clocks for cities worldwide — add zones and see day or night.",
};

export default function WorldClockPage() {
  return (
    <ToolPageChrome
      instructionKey="world-clock"
      title="World Clock"
      description="Seconds-accurate times with a compact zone overview strip."
      maxWidthClass="max-w-3xl"
    >
      <WorldClock />
    </ToolPageChrome>
  );
}
