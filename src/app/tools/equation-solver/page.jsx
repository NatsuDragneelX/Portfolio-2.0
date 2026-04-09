import { ToolPageChrome } from "@/components/tools/ToolPageChrome";
import { EquationSolver } from "@/tools/EquationSolver/EquationSolver";

export const metadata = {
  title: "Equation Solver",
  description: "Linear and quadratic equations with short step explanations.",
};

export default function EquationSolverPage() {
  return (
    <ToolPageChrome
      instructionKey="equation-solver"
      title="Equation Solver"
      description="Use one equals sign. Supports forms like 2x+3=15 and x^2+5x+6=0."
    >
      <EquationSolver />
    </ToolPageChrome>
  );
}
