import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
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
          <h1 className="font-semibold text-lg">VENDA DE PASTÉIS! 🎉</h1>
          <nav>
            <Link
              href={"/caixa"}
              className="bg-orange p-2 px-3 rounded-md text-white text-lg mr-5"
            >
              Caixa
            </Link>
            <Link
              href={"/vendas"}
              className="bg-orange p-2 px-3 rounded-md text-white text-lg"
            >
              Vendas
            </Link>
          </nav>
        </header>

        <main className="p-5 overflow-auto bg-grey/10 flex-1">
          <QueryProvider>{children}</QueryProvider>
        </main>
      </body>
    </html>
  );
}
