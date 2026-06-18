import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kalro Farm - Modern Agriculture Solutions in Kenya",
  description:
    "Kalro Farm provides modern farming knowledge, agriculture insights, and solutions for farmers in Kenya.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}