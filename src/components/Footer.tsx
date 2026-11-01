import Link from "next/link";
import {
  HeartPulse,
  MapPin,
  Phone,
  Mail,
  Clock,
  ShieldCheck,
  Award,
  Calendar,
} from "lucide-react";
import { CLINIC_INFO, SPECIALTIES } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Column 1: Info & Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-500 to-teal-400 flex items-center justify-center text-white shadow-md">
                <HeartPulse className="w-5 h-5" />
              </div>
              <span className="text-2xl font-bold text-white tracking-tight">
                MediConnect
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Centro médico de alta complejidad con atención personalizada, 12 especialidades y un sistema de inteligencia artificial que resuelve tus consultas y turnos las 24 horas del día.
            </p>
            <div className="flex items-center space-x-2 text-xs text-emerald-400 font-medium">
              <ShieldCheck className="w-4 h-4" />
              <span>Habilitación Sanitaria Nacional N° 45.981</span>
            </div>
          </div>

          {/* Column 2: Especialidades destacadas */}
          <div>
            <h3 className="text-white text-sm font-semibold uppercase tracking-wider mb-4">
              Especialidades
            </h3>
            <ul className="space-y-2 text-sm">
              {SPECIALTIES.slice(0, 7).map((s) => (
                <li key={s.id}>
                  <Link
                    href={`/especialidades#${s.id}`}
                    className="hover:text-teal-400 transition-colors flex items-center gap-1.5"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                    {s.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/especialidades"
                  className="text-xs text-teal-400 font-semibold hover:underline"
                >
                  + Ver las 12 especialidades completas →
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Enlaces Rápidos & Guardia */}
          <div>
            <h3 className="text-white text-sm font-semibold uppercase tracking-wider mb-4">
              Atención Médica
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/turnos" className="hover:text-white transition-colors flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-blue-400" />
                  Agendar Turno Online
                </Link>
              </li>
              <li>
                <Link href="/equipo" className="hover:text-white transition-colors flex items-center gap-2">
                  <Award className="w-4 h-4 text-teal-400" />
                  Staff de 24 Médicos
                </Link>
              </li>
              <li>
                <Link href="/nosotros" className="hover:text-white transition-colors">
                  Instalaciones y Tecnología
                </Link>
              </li>
              <li>
                <Link href="/contacto" className="hover:text-white transition-colors">
                  Preguntas Frecuentes
                </Link>
              </li>
            </ul>

            <div className="mt-6 p-3.5 bg-slate-800/80 rounded-xl border border-slate-700">
              <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold uppercase mb-1">
                <Clock className="w-3.5 h-3.5" />
                Guardia 24 Horas
              </div>
              <p className="text-xs text-slate-400">
                Guardia clínica y pediátrica abierta las 24 horas, todos los días.
              </p>
            </div>
          </div>

          {/* Column 4: Contacto */}
          <div>
            <h3 className="text-white text-sm font-semibold uppercase tracking-wider mb-4">
              Contacto y Sede
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2.5 text-slate-400">
                <MapPin className="w-4 h-4 text-rose-400 shrink-0 mt-1" />
                <span>{CLINIC_INFO.address}</span>
              </li>
              <li className="flex items-center gap-2.5 text-slate-400">
                <Phone className="w-4 h-4 text-blue-400 shrink-0" />
                <span>{CLINIC_INFO.phone}</span>
              </li>
              <li className="flex items-center gap-2.5 text-slate-400">
                <Mail className="w-4 h-4 text-teal-400 shrink-0" />
                <span>{CLINIC_INFO.email}</span>
              </li>
            </ul>

            <div className="mt-6">
              <a
                href={CLINIC_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs transition-colors shadow-sm"
              >
                Escribir por WhatsApp
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 mt-8 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500 gap-4">
          <p>© 2026 MediConnect. Todos los derechos reservados.</p>
          <div className="flex space-x-6">
            <span>Privacidad de Datos Médicos</span>
            <span>Términos de Servicio</span>
            <span>Portal del Paciente</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
