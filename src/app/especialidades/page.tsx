"use client";

import { useState } from "react";
import Link from "next/link";
import {
  HeartPulse,
  Sparkles,
  Baby,
  Bone,
  UserCheck,
  Brain,
  Eye,
  Stethoscope,
  Activity,
  Headphones,
  Smile,
  Award,
  Search,
  Calendar,
  Users,
} from "lucide-react";
import { SPECIALTIES, DOCTORS } from "@/lib/data";

const iconMap: Record<string, React.ReactNode> = {
  HeartPulse: <HeartPulse className="w-8 h-8" />,
  Sparkles: <Sparkles className="w-8 h-8" />,
  Baby: <Baby className="w-8 h-8" />,
  Bone: <Bone className="w-8 h-8" />,
  UserCheck: <UserCheck className="w-8 h-8" />,
  Brain: <Brain className="w-8 h-8" />,
  Eye: <Eye className="w-8 h-8" />,
  Stethoscope: <Stethoscope className="w-8 h-8" />,
  Activity: <Activity className="w-8 h-8" />,
  Headphones: <Headphones className="w-8 h-8" />,
  Smile: <Smile className="w-8 h-8" />,
  ShieldAlert: <Award className="w-8 h-8" />,
};

export default function EspecialidadesPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filtered = SPECIALTIES.filter((s) => {
    const term = searchTerm.toLowerCase();
    const matchesName = s.name.toLowerCase().includes(term);
    const matchesDesc = s.shortDesc.toLowerCase().includes(term) || s.fullDesc.toLowerCase().includes(term);
    const matchesSymptoms = s.popularSymptoms.some((symp) => symp.toLowerCase().includes(term));
    return matchesName || matchesDesc || matchesSymptoms;
  });

  return (
    <div className="min-h-screen bg-slate-50 py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-teal-600 bg-teal-50 border border-teal-200/60 px-3.5 py-1 rounded-full">
            Catálogo Clínico
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            12 Especialidades Médicas Integradas
          </h1>
          <p className="text-slate-600 text-base sm:text-lg">
            Consultorios modernos equipados con aparatología de última generación y profesionales de trayectoria comprobada.
          </p>

          {/* Search bar */}
          <div className="pt-4 max-w-xl mx-auto relative">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar por especialidad o síntoma (ej: dolor de rodilla, acné, vista)..."
              className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-slate-200 bg-white text-slate-800 placeholder-slate-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
          </div>
        </div>

        {/* Results count */}
        {searchTerm && (
          <p className="text-xs text-slate-500 text-center">
            Mostrando {filtered.length} especialidades que coinciden con &ldquo;{searchTerm}&rdquo;
          </p>
        )}

        {/* Grid of Specialties */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((spec) => {
            const doctors = DOCTORS.filter((d) => d.specialtyId === spec.id);

            return (
              <div
                key={spec.id}
                id={spec.id}
                className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:shadow-xl hover:border-blue-400 transition-all duration-200 flex flex-col justify-between"
              >
                <div className="space-y-5">
                  <div className="flex items-center justify-between">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-600 to-teal-500 text-white flex items-center justify-center shadow-md">
                      {iconMap[spec.iconName] || <Stethoscope className="w-8 h-8" />}
                    </div>
                    <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-3 py-1 rounded-full flex items-center gap-1">
                      <Users className="w-3.5 h-3.5" />
                      {doctors.length} médicos
                    </span>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold text-slate-900 mb-2">
                      {spec.name}
                    </h2>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {spec.fullDesc}
                    </p>
                  </div>

                  {/* Common symptoms tags */}
                  <div>
                    <p className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                      Motivos frecuentes de consulta:
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {spec.popularSymptoms.map((symp) => (
                        <span
                          key={symp}
                          className="text-[11px] bg-slate-100 text-slate-600 px-2.5 py-1 rounded-lg"
                        >
                          {symp}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Doctors of this specialty */}
                  <div className="pt-4 border-t border-slate-100">
                    <p className="text-xs font-semibold text-slate-500 mb-2">
                      Profesionales a cargo:
                    </p>
                    <div className="space-y-1.5">
                      {doctors.map((d) => (
                        <div
                          key={d.id}
                          className="flex items-center justify-between text-xs text-slate-700 bg-slate-50 p-2 rounded-xl"
                        >
                          <span className="font-medium">{d.name}</span>
                          <span className="text-slate-400 text-[10px]">{d.hours}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-6 mt-6 border-t border-slate-100 flex items-center gap-3">
                  <Link
                    href={`/turnos?specialty=${spec.id}`}
                    className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-teal-600 text-white font-semibold text-xs shadow-md hover:from-blue-700 hover:to-teal-700 transition-all"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>Agendar Turno</span>
                  </Link>
                  <Link
                    href={`/equipo?specialty=${spec.id}`}
                    className="px-4 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors"
                  >
                    Ver Médicos
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
