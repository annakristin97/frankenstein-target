import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Steinar Freyr Kjartansson — Unicorn Rider of Mosfellsbær",
  description: "The legend. The man. The unicorn. Steinar Freyr Kjartansson rides through Mosfellsbær in glory.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
