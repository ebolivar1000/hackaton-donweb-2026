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
    <header className="sticky top-0 z-40 w-full shadow-sm">
      {/* Top emergency / quick contact bar */}
      <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-teal-800 text-white text-xs py-2 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center space-x-4">
            <span className="flex items-center gap-1.5 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              Guardia Médica 24hs activa
            </span>
            <span className="hidden md:inline-block text-blue-200">|</span>
            <span className="hidden md:flex items-center gap-1 text-blue-100">
              <Clock className="w-3.5 h-3.5" />
              {CLINIC_INFO.hours}
            </span>
          </div>
          <div className="flex items-center space-x-4 font-medium">
            <a
              href={`tel:${CLINIC_INFO.phone}`}
              className="flex items-center gap-1 hover:text-blue-200 transition-colors"
            >
              <Phone className="w-3 h-3 text-cyan-300" />
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
              <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-blue-600 to-teal-500 flex items-center justify-center shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
                <HeartPulse className="w-6 h-6 text-white animate-pulse" />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-700 to-teal-600 bg-clip-text text-transparent tracking-tight">
                  MediConnect
                </span>
                <span className="text-[10px] tracking-wider uppercase font-semibold text-slate-400">
                  Centro Médico & IA
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
                    className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                      isActive
                        ? "text-blue-700 bg-blue-50 font-semibold"
                        : "text-slate-600 hover:text-blue-600 hover:bg-slate-50"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </div>

            {/* CTA action */}
            <div className="hidden sm:flex items-center space-x-3">
              <Link
                href="/turnos"
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-teal-600 text-white font-medium text-sm shadow-md shadow-blue-600/20 hover:from-blue-700 hover:to-teal-700 hover:shadow-lg hover:shadow-blue-600/30 transition-all transform hover:-translate-y-0.5"
              >
                <Calendar className="w-4 h-4" />
                <span>Agendar Turno</span>
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="flex lg:hidden items-center">
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="p-2 rounded-lg text-slate-600 hover:text-blue-600 hover:bg-slate-100 transition-colors"
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
                  className={`block px-4 py-2.5 rounded-lg text-base font-medium ${
                    isActive
                      ? "text-blue-700 bg-blue-50 font-semibold"
                      : "text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
            <div className="pt-2">
              <Link
                href="/turnos"
                onClick={() => setMobileOpen(false)}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-teal-600 text-white font-semibold shadow-md"
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
