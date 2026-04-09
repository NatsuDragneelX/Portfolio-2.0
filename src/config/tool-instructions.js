/**
 * Short “how to use” copy shown inside each tool page (see ToolPageChrome + ToolHelp).
 * Keys must match `slug` in src/config/tools.js and `instructionKey` on each route.
 */
export const toolInstructions = {
  "password-generator": {
    summary: "Create strong random passwords for logins, API keys, or demos.",
    steps: [
      "Drag the length slider (6–50) and toggle character types.",
      "Preview updates as you change options; click Generate for a fresh random string.",
      "Use Copy when you are happy; the bar is a simple strength hint, not a guarantee.",
    ],
  },
  "qr-code-generator": {
    summary: "Encode any text or link as a QR code for sharing or print.",
    steps: [
      "Type or paste your content, then click Generate QR.",
      "Download PNG for slides, posters, or messaging apps.",
      "Colors follow light/dark theme so the code stays readable on screen.",
    ],
  },
  "unit-converter": {
    summary: "Convert between common length, weight, temperature, and speed units.",
    steps: [
      "Pick a category, enter a value, and choose from / to units.",
      "Results update as you type; temperature uses standard C ↔ F ↔ K math.",
    ],
  },
  pomodoro: {
    summary: "Run focused work sessions and short breaks with a visible ring timer.",
    steps: [
      "Set focus and break minutes (only editable while paused).",
      "Start / Pause / Reset; when a phase ends you will hear a short chime.",
    ],
  },
  "expense-splitter": {
    summary: "Track who paid and how costs were split, then see fair settle-up amounts.",
    steps: [
      "Add people, then add each expense: amount, payer, and who shares it equally.",
      "Net balance and minimum transfers update automatically; export text for your records.",
    ],
  },
  "text-case-converter": {
    summary: "Change capitalization for drafts, titles, or social posts in one place.",
    steps: [
      "Paste or type text, then tap a case style (UPPERCASE, Title Case, etc.).",
      "Each button transforms the whole box; use Copy result when done.",
    ],
  },
  "tip-calculator": {
    summary: "Split a bill with tip across any number of people.",
    steps: [
      "Enter the bill total and headcount.",
      "Adjust tip with the slider or quick percent buttons; per-person totals update live.",
    ],
  },
  "color-picker": {
    summary: "Inspect a color in multiple formats and grab matching lighter/darker swatches.",
    steps: [
      "Tap the square for the system picker, or type a hex code (e.g. #6366f1).",
      "Copy HEX, RGB, or HSL from the cards; tap palette swatches to switch the active color.",
    ],
  },
  "gradient-generator": {
    summary: "Preview CSS linear gradients and paste them into your styles.",
    steps: [
      "Choose two colors and a direction (or angle preset).",
      "Copy CSS for your project, or Random gradient for inspiration.",
    ],
  },
  "world-clock": {
    summary: "Compare live times across cities with second-by-second updates.",
    steps: [
      "The world view uses pins on a simple map (day = warm pin, night = cool). Below, each city has a large digital clock and local date.",
      "Add cities from the dropdown or remove them with ✕. Times use your browser’s locale for formatting.",
    ],
  },
  "scientific-calculator": {
    summary: "Evaluate expressions with trig, logs, powers, and constants.",
    steps: [
      "Tap keys to build an expression; ÷ and × insert / and *.",
      "Trig uses radians; log is base 10, ln is natural log. Press = when ready.",
    ],
  },
  "percentage-calculator": {
    summary: "Answer common “what percent” and “percent of” questions quickly.",
    steps: [
      "Each card is independent—fill the fields that match your question.",
      "Reverse percentage finds the original value before a known percent increase.",
    ],
  },
  "equation-solver": {
    summary: "Solve straightforward linear or quadratic equations with brief steps.",
    steps: [
      "Use one equals sign, e.g. 2x+3=15 or x^2+5x+6=0.",
      "Click Solve; complex edge cases may need a dedicated CAS tool.",
    ],
  },
  "word-counter": {
    summary: "Measure draft length: words, characters, structure, and rough reading time.",
    steps: [
      "Paste text; counts update live. Reading time assumes about 200 words per minute.",
      "Copy text sends the current box contents to the clipboard.",
    ],
  },
};
