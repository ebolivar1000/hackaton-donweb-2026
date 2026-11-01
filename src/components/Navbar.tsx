"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  HeartPulse,
  Calendar,
  Phone,
  Clock,
  Menu,
  X,
  MessageCircle,
  ShieldCheck,
  Cpu,
} from "lucide-react";
import { CLINIC_INFO } from "@/lib/data";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: "Inicio", href: "/" },
    { name: "Especialidades", href: "/especialidades" },
    { name: "Equipo Médico", href: "/equipo" },
    { name: "Turnos Online", href: "/turnos" },
    { name: "Nosotros", href: "/nosotros" },
    { name: "Contacto", href: "/contacto" },
  ];

  return (
    <header className="sticky top-0 z-40 w-full shadow-sm font-sans">
      {/* Top emergency / quick contact bar (Petrol green tone) */}
      <div className="bg-[#0f2d2e] text-white text-xs py-2 px-4 border-b border-teal-900/60">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center space-x-4">
            <span className="flex items-center gap-1.5 font-medium text-emerald-400">
              <ShieldCheck className="w-3.5 h-3.5" />
              Guardia Médica 24hs activa
            </span>
            <span className="hidden md:inline-block text-teal-800">|</span>
            <span className="hidden md:flex items-center gap-1 text-teal-200/80">
              <Clock className="w-3.5 h-3.5" />
              {CLINIC_INFO.hours}
            </span>
          </div>
          <div className="flex items-center space-x-4 font-medium">
            <a
              href={`tel:${CLINIC_INFO.phone}`}
              className="flex items-center gap-1 hover:text-teal-300 transition-colors"
            >
              <Phone className="w-3 h-3 text-teal-400" />
              <span>{CLINIC_INFO.phone}</span>
            </a>
            <a
              href={CLINIC_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-emerald-300 hover:text-emerald-100 font-semibold transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp Directo</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <nav className="bg-white/95 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-teal-700 to-emerald-600 flex items-center justify-center shadow-md shadow-teal-700/20 group-hover:scale-105 transition-transform">
                <HeartPulse className="w-6 h-6 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-extrabold bg-gradient-to-r from-[#0f2d2e] via-teal-800 to-emerald-700 bg-clip-text text-transparent tracking-tight">
                  MediConnect
                </span>
                <span className="text-[10px] tracking-wider uppercase font-bold text-teal-700">
                  Centro Médico
                </span>
              </div>
            </Link>

            {/* Desktop links */}
            <div className="hidden lg:flex items-center space-x-1">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
                      isActive
                        ? "text-teal-800 bg-teal-50"
                        : "text-slate-600 hover:text-teal-700 hover:bg-slate-50"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}

              {/* Centro de IA Admin Link */}
              <Link
                href="/centro-ia"
                className={`ml-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 border ${
                  pathname === "/centro-ia"
                    ? "bg-teal-900 text-teal-200 border-teal-700"
                    : "bg-[#0f2d2e]/5 text-teal-900 border-teal-800/20 hover:bg-[#0f2d2e] hover:text-white"
                }`}
              >
                <Cpu className="w-3.5 h-3.5" />
                <span>Centro de IA</span>
                <span className="text-[9px] bg-teal-600 text-white px-1.5 py-0.2 rounded font-extrabold">
                  Admin
                </span>
              </Link>
            </div>

            {/* CTA action */}
            <div className="hidden sm:flex items-center space-x-3">
              <Link
                href="/turnos"
                className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#123C3A] hover:bg-[#1a4a47] text-white font-bold text-sm shadow-md shadow-[#123C3A]/20 transition-all transform hover:-translate-y-0.5"
              >
                <Calendar className="w-4 h-4 text-[#E5AE80]" />
                <span>Reservar Turno</span>
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="flex lg:hidden items-center">
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="p-2 rounded-lg text-slate-600 hover:text-teal-700 hover:bg-slate-100 transition-colors"
                aria-label="Abrir menú"
              >
                {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile dropdown */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-slate-100 bg-white px-4 pt-3 pb-6 space-y-2 shadow-lg">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`block px-4 py-2.5 rounded-lg text-base font-semibold ${
                    isActive
                      ? "text-teal-800 bg-teal-50"
                      : "text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
            <Link
              href="/centro-ia"
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-between px-4 py-2.5 rounded-lg text-sm font-bold bg-teal-900 text-teal-200"
            >
              <span className="flex items-center gap-2">
                <Cpu className="w-4 h-4" /> Centro de IA (Admin SaaS)
              </span>
              <span className="text-[10px] bg-teal-600 text-white px-2 py-0.5 rounded">
                Admin
              </span>
            </Link>
            <div className="pt-2">
              <Link
                href="/turnos"
                onClick={() => setMobileOpen(false)}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-teal-700 to-emerald-600 text-white font-bold shadow-md"
              >
                <Calendar className="w-5 h-5" />
                Agendar Turno Online
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
