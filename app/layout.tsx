import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import { QueryProvider } from "./providers/query-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Venda de Pastéis",
  description: "Venda de Pastéis - 3°A Informática 2025",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col h-screen`}
      >
        <header className="p-5 border-b-1 border-grey flex justify-between items-center">
          <h1 className="font-semibold text-sm md:text-lg">
            VENDA DE PASTÉIS! 🎉
          </h1>
          <nav className="flex items-center gap-3 md:gap-8">
            <Link
              href={"/caixa"}
              className="bg-orange p-2 rounded-md text-white text-sm md:text-lg"
            >
              Caixa
            </Link>
            <Link
              href={"/vendas"}
              className="bg-orange p-2 rounded-md text-white text-sm md:text-lg"
            >
              Vendas
            </Link>
          </nav>
        </header>

        <main className="p-4 md:p-5 overflow-auto bg-grey/10 flex-1">
          <QueryProvider>{children}</QueryProvider>
        </main>
      </body>
    </html>
  );
}
