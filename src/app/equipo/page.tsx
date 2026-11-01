"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Star,
  Calendar,
  Clock,
  Award,
  Search,
  Filter,
} from "lucide-react";
import { DOCTORS, SPECIALTIES } from "@/lib/data";

export default function EquipoPage() {
  const [selectedSpecialty, setSelectedSpecialty] = useState("todas");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredDoctors = DOCTORS.filter((doc) => {
    const matchesSpec =
      selectedSpecialty === "todas" || doc.specialtyId === selectedSpecialty;
    const matchesSearch =
      doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.specialtyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.bio.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSpec && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-50 py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-100/70 px-3.5 py-1 rounded-full">
            Staff Profesional
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Nuestro Cuerpo Médico Especializado
          </h1>
          <p className="text-slate-600 text-base sm:text-lg">
            24 profesionales de excelencia, rigurosamente seleccionados y comprometidos con una atención humana, empática y puntual.
          </p>
        </div>

        {/* Filters and Search Bar */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            {/* Search */}
            <div className="md:col-span-6 relative">
              <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar por nombre de doctor o especialidad..."
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white text-slate-800 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Specialty dropdown */}
            <div className="md:col-span-6 flex items-center gap-2">
              <Filter className="w-4 h-4 text-slate-400 shrink-0 hidden sm:block" />
              <select
                value={selectedSpecialty}
                onChange={(e) => setSelectedSpecialty(e.target.value)}
                className="w-full py-3 px-4 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
              >
                <option value="todas">Todas las especialidades (12)</option>
                {SPECIALTIES.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Quick pills */}
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none text-xs">
            <button
              onClick={() => setSelectedSpecialty("todas")}
              className={`px-3 py-1.5 rounded-full font-medium transition-colors shrink-0 ${
                selectedSpecialty === "todas"
                  ? "bg-blue-600 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              Todos ({DOCTORS.length})
            </button>
            {SPECIALTIES.map((s) => {
              const count = DOCTORS.filter((d) => d.specialtyId === s.id).length;
              return (
                <button
                  key={s.id}
                  onClick={() => setSelectedSpecialty(s.id)}
                  className={`px-3 py-1.5 rounded-full font-medium transition-colors shrink-0 ${
                    selectedSpecialty === s.id
                      ? "bg-blue-600 text-white"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {s.name} ({count})
                </button>
              );
            })}
          </div>
        </div>

        {/* Doctors Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredDoctors.map((doc) => (
            <div
              key={doc.id}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-200 flex flex-col justify-between group"
            >
              <div>
                {/* Photo & Rating Banner */}
                <div className="relative h-56 w-full bg-slate-100 overflow-hidden">
                  <img
                    src={doc.avatar}
                    alt={doc.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-slate-800 flex items-center gap-1 shadow-sm">
                    <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                    <span>{doc.rating}</span>
                    <span className="text-[10px] text-slate-400 font-normal">
                      ({doc.reviewsCount})
                    </span>
                  </div>
                  <div className="absolute bottom-3 left-3 bg-slate-900/80 backdrop-blur-md text-white text-[11px] font-medium px-2.5 py-1 rounded-lg">
                    {doc.experienceYears} años de experiencia
                  </div>
                </div>

                {/* Info */}
                <div className="p-6 space-y-3">
                  <div>
                    <span className="text-xs font-bold text-teal-600 uppercase tracking-wide">
                      {doc.specialtyName}
                    </span>
                    <h2 className="text-lg font-bold text-slate-900 leading-snug">
                      {doc.name}
                    </h2>
                    <p className="text-xs text-slate-400 font-mono">
                      {doc.matricula}
                    </p>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                    {doc.bio}
                  </p>

                  <div className="pt-3 border-t border-slate-100 space-y-1.5 text-xs text-slate-600">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                      <span className="font-medium text-slate-800">Días:</span>
                      <span>{doc.days.join(", ")}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                      <span className="font-medium text-slate-800">Horario:</span>
                      <span>{doc.hours}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Award className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                      <span className="font-medium text-slate-800">Consulta:</span>
                      <span className="font-bold text-slate-900">{doc.price}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action */}
              <div className="p-6 pt-0">
                <Link
                  href={`/turnos?doctor=${doc.id}&specialty=${doc.specialtyId}`}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-teal-600 text-white font-semibold text-xs shadow-md hover:from-blue-700 hover:to-teal-700 transition-all"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Agendar Consulta</span>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {filteredDoctors.length === 0 && (
          <div className="text-center py-16 bg-white rounded-3xl border border-slate-200">
            <p className="text-slate-500 text-sm">
              No se encontraron médicos con los filtros aplicados.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
