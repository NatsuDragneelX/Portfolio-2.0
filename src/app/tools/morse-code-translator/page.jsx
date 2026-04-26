import { ToolPageChrome } from "@/components/tools/ToolPageChrome";
import { MorseCodeTranslator } from "@/tools/MorseCodeTranslator/MorseCodeTranslator";

export const metadata = {
  title: "Morse Code Translator",
  description: "Convert text to Morse code and decode Morse back to text.",
};

export default function MorseCodeTranslatorPage() {
  return (
    <ToolPageChrome
      instructionKey="morse-code-translator"
      title="Morse Code Translator"
      description="Create Morse code from text or decode Morse symbols back into letters."
    >
      <MorseCodeTranslator />
    </ToolPageChrome>
  );
}
