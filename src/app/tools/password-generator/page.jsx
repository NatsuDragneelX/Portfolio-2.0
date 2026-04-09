import { ToolPageChrome } from "@/components/tools/ToolPageChrome";
import { PasswordGenerator } from "@/tools/PasswordGenerator/PasswordGenerator";

export const metadata = {
  title: "Password Generator",
  description:
    "Generate secure random passwords with custom length, character sets, and strength meter.",
};

export default function PasswordGeneratorPage() {
  return (
    <ToolPageChrome
      instructionKey="password-generator"
      title="Password Generator"
      description="Tune length and character sets, then copy when you are happy with the preview."
    >
      <PasswordGenerator />
    </ToolPageChrome>
  );
}
