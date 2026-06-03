import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Agenda de Contatos",
  description:
    "Sua agenda de contatos pessoal: nome, telefone e e-mail organizados, com favoritos, busca e atalhos pra ligar, mandar WhatsApp ou e-mail. Funciona offline.",
  applicationName: "Agenda de Contatos",
  openGraph: {
    title: "Agenda de Contatos",
    description: "Seus contatos organizados, com atalhos de ligação, WhatsApp e e-mail.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#e11d48",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.variable} font-sans antialiased`}>{children}</body>
    </html>
  );
}
