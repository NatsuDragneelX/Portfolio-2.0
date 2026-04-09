import { ToolPageChrome } from "@/components/tools/ToolPageChrome";
import { QRCodeGenerator } from "@/tools/QRCodeGenerator/QRCodeGenerator";

export const metadata = {
  title: "QR Code Generator",
  description: "Encode text or links as a QR code and download a PNG.",
};

export default function QRCodeGeneratorPage() {
  return (
    <ToolPageChrome
      instructionKey="qr-code-generator"
      title="QR Code Generator"
      description="Paste any string — URLs, Wi‑Fi payloads, or short notes — then download the image."
      maxWidthClass="max-w-lg"
    >
      <QRCodeGenerator />
    </ToolPageChrome>
  );
}
