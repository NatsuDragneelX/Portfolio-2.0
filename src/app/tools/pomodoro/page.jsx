import { ToolPageChrome } from "@/components/tools/ToolPageChrome";
import { Pomodoro } from "@/tools/Pomodoro/Pomodoro";

export const metadata = {
  title: "Pomodoro Timer",
  description: "Focus and break intervals with a progress ring and completion chime.",
};

export default function PomodoroPage() {
  return (
    <ToolPageChrome
      instructionKey="pomodoro"
      title="Pomodoro"
      description="Editable focus and break lengths — start, pause, or reset anytime."
      maxWidthClass="max-w-md"
    >
      <Pomodoro />
    </ToolPageChrome>
  );
}
