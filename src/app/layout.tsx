import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
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
    <html lang="pt-br" className="bg-background02 text-zinc-200">
      <body>
        <Providers>
          <Header />
          <NextTopLoader
            color="#5249B6"
            height={3}
            speed={500}
            crawlSpeed={500}
            showSpinner={false}
            shadow={false}
          />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
