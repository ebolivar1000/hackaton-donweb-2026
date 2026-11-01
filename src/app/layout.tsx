import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ChatBot from "@/components/ChatBot";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MediConnect | Centro Médico con Atención e IA Integrada",
  description:
    "Centro médico multidisciplinario con 12 especialidades y 24 doctores. Triage y turnos inteligentes las 24 horas con inteligencia artificial.",
  keywords: [
    "centro médico",
    "consultorio médico",
    "turnos online",
    "médicos especialistas",
    "cardiología",
    "pediatría",
    "dermatología",
    "inteligencia artificial médica",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className={`${inter.className} bg-slate-50 text-slate-800 antialiased min-h-screen flex flex-col`}>
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <ChatBot />
      </body>
    </html>
  );
}
