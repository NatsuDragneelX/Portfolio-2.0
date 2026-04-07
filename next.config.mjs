import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  outputFileTracingRoot: path.join(__dirname),
  async redirects() {
    return [
      {
        source: "/games/tic-tac-toe",
        destination: "/games/tictactoe",
        permanent: false,
      },
      { source: "/qr/:path*", destination: "/", permanent: false },
      { source: "/contact", destination: "/", permanent: false },
    ];
  },
};

export default nextConfig;
