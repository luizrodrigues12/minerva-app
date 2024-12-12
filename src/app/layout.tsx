import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import dotenv from "dotenv";
import NextTopLoader from "nextjs-toploader";
import Providers from "@/components/layout/Providers";

dotenv.config();

export const metadata: Metadata = {
  title: "Minerva",
  description: "Agilidade nos seus planejamentos.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br" className="bg-zinc-900 text-zinc-100">
      <body className="flex flex-col justify-center items-center min-h-screen">
        <Header />
        <div className="min-h-screen w-full flex flex-col justify-center items-center">
          <NextTopLoader
            color="#e4e4e7"
            speed={500}
            crawlSpeed={500}
            showSpinner={false}
            shadow={false}
          />
          <Providers>{children}</Providers>
        </div>
        <Footer />
      </body>
    </html>
  );
}
