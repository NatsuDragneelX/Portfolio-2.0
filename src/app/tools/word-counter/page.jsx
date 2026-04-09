import { ToolPageChrome } from "@/components/tools/ToolPageChrome";
import { WordCounter } from "@/tools/WordCounter/WordCounter";

export const metadata = {
  title: "Word Counter",
  description: "Words, characters, sentences, paragraphs, and reading time.",
};

export default function WordCounterPage() {
  return (
    <ToolPageChrome
      instructionKey="word-counter"
      title="Word Counter"
      description="Paste prose or drafts — stats and reading time stay in sync."
      maxWidthClass="max-w-3xl"
    >
      <WordCounter />
    </ToolPageChrome>
  );
}
