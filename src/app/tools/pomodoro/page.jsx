import { ToolPageChrome } from "@/components/tools/ToolPageChrome";
import { Pomodoro } from "@/tools/Pomodoro/Pomodoro";

export const metadata = {
  title: "Pomodoro Timer",
  description: "Focus dashboard with presets, custom timing, and cycle control.",
};

export default function PomodoroPage() {
  return (
    <ToolPageChrome
      instructionKey="pomodoro"
      title="Pomodoro"
      description="Pick a session style, then start focus/break cycles with a cleaner dashboard."
      maxWidthClass="max-w-5xl"
    >
      <Pomodoro />
    </ToolPageChrome>
  );
}
