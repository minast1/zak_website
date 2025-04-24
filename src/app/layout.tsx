import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import clsx from "clsx";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sankofa Sustainability",
  description: "Reclaiming Wisdom, Redefining Sustainability",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={clsx(inter.className, "bg-white text-gray-800")}>
        {children}
        <Toaster richColors expand={true} />
      </body>
    </html>
  );
}
