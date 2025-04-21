import './globals.css';
import { Inter } from 'next/font/google';
import type { Metadata } from "next";
import { ThemeProvider } from "@/context/ThemeContext";

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: "Hackathon Automator",
  description: "Automate your hackathon project generation with AI",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
