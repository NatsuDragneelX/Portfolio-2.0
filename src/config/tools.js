/**
 * Tools hub on /tools. `icon` maps to lucide-react in `src/app/tools/page.jsx`.
 * `category` must match an `id` in `toolCategories`. `tagline` is the hub blurb (list + grid).
 */
export const toolCategories = [
  {
    id: "daily",
    title: "Daily & money",
    subtitle: "Tips, bills, focus, and clocks for everyday use.",
    filterLabel: "Daily",
  },
  {
    id: "writing",
    title: "Writing & sharing",
    subtitle: "Text tweaks, counts, and sharable QR codes.",
    filterLabel: "Writing",
  },
  {
    id: "calculate",
    title: "Calculators & conversion",
    subtitle: "Units, math, percentages, and simple equations.",
    filterLabel: "Math",
  },
  {
    id: "visual",
    title: "Colors & gradients",
    subtitle: "Pick colors and build CSS gradients.",
    filterLabel: "Color",
  },
  {
    id: "security",
    title: "Security",
    subtitle: "One tool for stronger passwords.",
    filterLabel: "Security",
  },
];

export const tools = [
  {
    slug: "password-generator",
    category: "security",
    title: "Password Generator",
    tagline:
      "So ugly-strong your cat can't guess it—spin one up, copy it, disappear.",
    description:
      "Random secure passwords with length, character sets, strength meter, and copy.",
    href: "/tools/password-generator",
    icon: "KeyRound",
    accent: "from-amber-500/25 to-orange-500/15",
  },
  {
    slug: "qr-code-generator",
    category: "writing",
    title: "QR Code Generator",
    tagline:
      "Turn any link or rant into a scannable square—phones love the drama.",
    description: "Turn any text or URL into a QR code — preview and download as PNG.",
    href: "/tools/qr-code-generator",
    icon: "QrCode",
    accent: "from-cyan-500/25 to-blue-500/15",
  },
  {
    slug: "unit-converter",
    category: "calculate",
    title: "Unit Converter",
    tagline:
      "Miles, meters, °C, and \"how many cups is that?\"—math you shouldn't do at midnight.",
    description: "Length, weight, temperature, and speed with live conversion.",
    href: "/tools/unit-converter",
    icon: "Ruler",
    accent: "from-violet-500/25 to-fuchsia-500/15",
  },
  {
    slug: "pomodoro",
    category: "daily",
    title: "Pomodoro Timer",
    tagline:
      "25 minutes of main-character focus, then a break before your chair owns you.",
    description: "Focus and break intervals with a progress ring and completion chime.",
    href: "/tools/pomodoro",
    icon: "Timer",
    accent: "from-rose-500/25 to-red-500/15",
  },
  {
    slug: "text-case-converter",
    category: "writing",
    title: "Text Case Converter",
    tagline:
      "SHOUT IN CAPS or whisper in Title Case—your draft, your emotional range.",
    description: "Transform casing — uppercase, title, sentence, and more with one click.",
    href: "/tools/text-case-converter",
    icon: "Type",
    accent: "from-sky-500/25 to-indigo-500/15",
  },
  {
    slug: "binary-translator",
    category: "writing",
    title: "Binary Translator",
    tagline:
      "Flip words into 0s and 1s (and back) when you want nerdy text magic fast.",
    description: "Convert plain text to 8-bit binary and decode binary back to text.",
    href: "/tools/binary-translator",
    icon: "Code2",
    accent: "from-indigo-500/25 to-violet-500/15",
  },
  {
    slug: "morse-code-translator",
    category: "writing",
    title: "Morse Code Translator",
    tagline:
      "Dot dot dash your message, decode signals, and pretend you are radio ops.",
    description: "Translate text to Morse code and decode Morse back into readable text.",
    href: "/tools/morse-code-translator",
    icon: "Radio",
    accent: "from-blue-500/25 to-sky-500/15",
  },
  {
    slug: "tip-calculator",
    category: "daily",
    title: "Tip Calculator",
    tagline:
      "Tip math while the waiter hovers—split fairly and still look like an adult.",
    description: "Bill, tip percent, and party size — per-person totals instantly.",
    href: "/tools/tip-calculator",
    icon: "Receipt",
    accent: "from-lime-500/25 to-green-500/15",
  },
  {
    slug: "color-picker",
    category: "visual",
    title: "Color Picker",
    tagline:
      "Hex, RGB, HSL, and a whole mood board—steal a palette without opening Figma.",
    description: "Hex, RGB, HSL, and a generated tint/shade palette with copy buttons.",
    href: "/tools/color-picker",
    icon: "Palette",
    accent: "from-pink-500/25 to-purple-500/15",
  },
  {
    slug: "gradient-generator",
    category: "visual",
    title: "Gradient Generator",
    tagline:
      "Sunset gradients for buttons nobody admits they'll click—copy CSS or roll random.",
    description: "Two colors, direction, live preview — copy CSS or roll random.",
    href: "/tools/gradient-generator",
    icon: "Layers",
    accent: "from-fuchsia-500/25 to-pink-500/15",
  },
  {
    slug: "world-clock",
    category: "daily",
    title: "World Clock",
    tagline:
      "Is it tomorrow in Tokyo yet? Line up cities and stop doing timezone guesswork.",
    description: "Major cities, live seconds, add or remove zones — day/night hints.",
    href: "/tools/world-clock",
    icon: "Globe",
    accent: "from-blue-500/25 to-cyan-500/15",
  },
  {
    slug: "scientific-calculator",
    category: "calculate",
    title: "Scientific Calculator",
    tagline:
      "Sin, cos, logs, powers—the fancy π button finally pulls its weight.",
    description: "Trig, log, powers, π and e — responsive keypad with scrollable display.",
    href: "/tools/scientific-calculator",
    icon: "Calculator",
    accent: "from-orange-500/25 to-amber-500/15",
  },
  {
    slug: "percentage-calculator",
    category: "calculate",
    title: "Percentage Calculator",
    tagline:
      "What's 17% of this invoice? What's 100% of this headache? Answers inside.",
    description: "Percent of, is what % of, increase/decrease, and reverse percent.",
    href: "/tools/percentage-calculator",
    icon: "Percent",
    accent: "from-teal-500/25 to-emerald-500/15",
  },
  {
    slug: "equation-solver",
    category: "calculate",
    title: "Equation Solver",
    tagline:
      "Linear or quadratic—drag x out from under the couch with readable steps.",
    description: "Linear and quadratic equations with readable step-by-step notes.",
    href: "/tools/equation-solver",
    icon: "Equal",
    accent: "from-slate-500/25 to-zinc-500/15",
  },
  {
    slug: "word-counter",
    category: "writing",
    title: "Word Counter",
    tagline:
      "Words, characters, reading time—proof you wrote more than three bullet points.",
    description: "Words, characters, sentences, paragraphs, and reading time.",
    href: "/tools/word-counter",
    icon: "FileText",
    accent: "from-stone-500/25 to-neutral-500/15",
  },
];

/** Tools grouped in hub order; only categories that have tools are returned. */
export function getToolsByCategory() {
  return toolCategories
    .map((cat) => ({
      ...cat,
      tools: tools.filter((t) => t.category === cat.id),
    }))
    .filter((g) => g.tools.length > 0);
}
