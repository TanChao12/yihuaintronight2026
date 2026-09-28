import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "毅见倾新 · The Beginning of Us",
  description: "KPZ 新生迎新会 2026 — Arrive as Strangers. Rise as One.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
