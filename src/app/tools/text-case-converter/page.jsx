import { ToolPageChrome } from "@/components/tools/ToolPageChrome";
import { TextCaseConverter } from "@/tools/TextCaseConverter/TextCaseConverter";

export const metadata = {
  title: "Text Case Converter",
  description: "Convert text to uppercase, lowercase, title, sentence, and more.",
};

export default function TextCaseConverterPage() {
  return (
    <ToolPageChrome
      instructionKey="text-case-converter"
      title="Text Case Converter"
      description="Transform casing in one click — then copy the result."
    >
      <TextCaseConverter />
    </ToolPageChrome>
  );
}
