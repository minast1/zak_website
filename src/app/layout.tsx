import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import clsx from "clsx";
import { Toaster } from "@/components/ui/sonner";
import Header from "@/components/home/header";
import Footer from "@/components/home/footer";

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
      <body
        className={clsx(
          inter.className,
          "min-h-screen bg-white text-white font-sans transition-colors duration-500"
        )}
      >
        <Header />
        {children}
        <Footer />
        <Toaster richColors expand={true} />
      </body>
    </html>
  );
}
