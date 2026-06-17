import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Karlo Farm",
  description:
    "Karlo Farm is a trusted agricultural business in Nakuru providing quality farm products and services.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}