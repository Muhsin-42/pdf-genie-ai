import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ReactNode } from "react";
import { Toaster } from "sonner";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pdf Genie",
  description: "Pdf Genie - Your Gpt for the pdf.",
  keywords: ["Pdf Analyzer", "Chat Pdf", "ChatGpt", "PdfGpt", "PdfGenie"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-slate-100 text-gray-950  dark:bg-gray-900 dark:text-gray-50`}
      >
        <Toaster richColors position="top-center" />
        <div className="absolute right-[11rem] top-[-6rem] -z-10 size-[31.25rem] translate-y-[-50%] rounded-full bg-[#f8a0a2] blur-[10rem] sm:w-[68.75rem] dark:bg-[#946263]"></div>
        <div className="absolute left-[-35rem] top-[-1rem] -z-10 size-[50rem] translate-y-[-50%] rounded-full bg-[#b6aef5] blur-[10rem] sm:w-[68.75rem] md:left-[-33rem] lg:left-[-28rem]  xl:left-[-15rem] 2xl:left-[-5rem] dark:bg-[#676394]"></div>
        {children}
      </body>
    </html>
  );
}
