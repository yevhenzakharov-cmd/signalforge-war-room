import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SignalForge War Room",
  description:
    "CLI-first multi-agent business intelligence war room powered by synthetic data, deterministic tools, OpenAI Structured Outputs, and evidence judging."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
