import { getToolsByCategory } from "@/config/tools";
import { ToolsHubContent } from "./ToolsHubContent";

export const metadata = {
  title: "Tools",
  description:
    "Browser utilities — text, color, math, clocks, tips, and more in one place.",
};

export default function ToolsHubPage() {
  const sections = getToolsByCategory();
  return <ToolsHubContent sections={sections} />;
}
