import { ToolPageChrome } from "@/components/tools/ToolPageChrome";
import { ExpenseSplitter } from "@/tools/ExpenseSplitter/ExpenseSplitter";

export const metadata = {
  title: "Expense Splitter",
  description: "Split shared costs fairly and see who should pay whom.",
};

export default function ExpenseSplitterPage() {
  return (
    <ToolPageChrome
      instructionKey="expense-splitter"
      title="Expense Splitter"
      description="Add people and expenses with equal splits — balances and minimum transfers update automatically."
      maxWidthClass="max-w-5xl"
    >
      <ExpenseSplitter />
    </ToolPageChrome>
  );
}
