/**
 * Stylized continent silhouettes (equirectangular 1000×500) so the clock map reads as Earth,
 * not an empty grid. Shapes are approximate, not cartographic precision.
 */
export function WorldLandmasses() {
  const land = "hsl(203 36% 28%)";
  const edge = "hsl(203 28% 36%)";

  return (
    <g aria-hidden>
      {/* North America */}
      <path
        fill={land}
        stroke={edge}
        strokeWidth={0.6}
        d="M 118 78 C 88 92 78 128 92 168 C 102 212 128 252 158 278 C 188 302 222 292 248 258 C 272 218 278 168 262 122 C 248 88 208 68 168 72 C 142 74 118 78 118 78 Z"
      />
      {/* Greenland */}
      <path
        fill={land}
        stroke={edge}
        strokeWidth={0.5}
        d="M 308 42 C 348 38 382 52 392 82 C 398 112 378 138 342 134 C 308 130 288 98 298 62 C 302 50 308 42 308 42 Z"
      />
      {/* South America */}
      <path
        fill={land}
        stroke={edge}
        strokeWidth={0.6}
        d="M 198 288 C 228 292 252 338 242 388 C 232 432 198 452 168 428 C 142 402 152 338 178 302 C 186 292 198 288 198 288 Z"
      />
      {/* Europe + Africa */}
      <path
        fill={land}
        stroke={edge}
        strokeWidth={0.6}
        d="M 458 88 C 498 78 542 92 568 128 C 592 168 598 228 582 288 C 568 352 522 398 472 392 C 422 385 392 338 388 278 C 385 218 408 162 438 118 C 448 102 458 88 458 88 Z"
      />
      {/* Asia */}
      <path
        fill={land}
        stroke={edge}
        strokeWidth={0.6}
        d="M 578 72 C 668 58 778 78 852 118 C 912 152 938 212 922 272 C 908 328 858 362 792 352 C 728 342 668 298 628 242 C 598 198 582 148 578 102 C 576 88 578 72 578 72 Z"
      />
      {/* Southeast Asia / Indonesia hint */}
      <path
        fill={land}
        stroke={edge}
        strokeWidth={0.4}
        d="M 738 298 C 768 292 798 308 808 332 C 812 348 792 362 768 358 C 742 352 722 332 728 312 C 730 302 738 298 738 298 Z"
      />
      {/* Australia */}
      <path
        fill={land}
        stroke={edge}
        strokeWidth={0.6}
        d="M 818 352 C 868 342 918 362 932 398 C 942 428 912 452 868 448 C 822 442 788 412 798 378 C 802 362 818 352 818 352 Z"
      />
      {/* New Zealand-ish */}
      <ellipse cx="942" cy="385" rx="10" ry="22" fill={land} stroke={edge} strokeWidth={0.4} />
      {/* Antarctica strip */}
      <path
        fill={land}
        stroke={edge}
        strokeWidth={0.3}
        opacity={0.45}
        d="M 40 462 C 200 452 500 448 960 458 L 960 498 L 40 498 Z"
      />
    </g>
  );
}
