import { ToolPageChrome } from "@/components/tools/ToolPageChrome";
import { BinaryTranslator } from "@/tools/BinaryTranslator/BinaryTranslator";

export const metadata = {
  title: "Binary Translator",
  description: "Convert plain text to 8-bit binary and back.",
};

export default function BinaryTranslatorPage() {
  return (
    <ToolPageChrome
      instructionKey="binary-translator"
      title="Binary Translator"
      description="Encode text as 8-bit binary or decode binary back into readable text."
    >
      <BinaryTranslator />
    </ToolPageChrome>
  );
}
