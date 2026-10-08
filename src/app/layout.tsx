import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Cyber or Chill? | CAM 2026 Meme Quiz",
  description: "Test your cybersecurity awareness with meme-powered quiz — Cybersecurity Awareness Month 2026",
  icons: { icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🛡️</text></svg>" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen scanline-overlay">
        <div className="matrix-bg" />
        {children}
      </body>
    </html>
  );
}
