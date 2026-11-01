import Link from "next/link";
import {
  Calendar,
  Sparkles,
  Bot,
  ShieldCheck,
  Clock,
  Award,
  Users,
  ChevronRight,
  PhoneCall,
  Star,
  CheckCircle2,
  Stethoscope,
  HeartPulse,
  Brain,
  Baby,
  Eye,
  Bone,
  UserCheck,
  Headphones,
  Smile,
  Activity,
} from "lucide-react";
import { SPECIALTIES, DOCTORS, CLINIC_INFO } from "@/lib/data";

const iconMap: Record<string, React.ReactNode> = {
  HeartPulse: <HeartPulse className="w-6 h-6" />,
  Sparkles: <Sparkles className="w-6 h-6" />,
  Baby: <Baby className="w-6 h-6" />,
  Bone: <Bone className="w-6 h-6" />,
  UserCheck: <UserCheck className="w-6 h-6" />,
  Brain: <Brain className="w-6 h-6" />,
  Eye: <Eye className="w-6 h-6" />,
  Stethoscope: <Stethoscope className="w-6 h-6" />,
  Activity: <Activity className="w-6 h-6" />,
  Headphones: <Headphones className="w-6 h-6" />,
  Smile: <Smile className="w-6 h-6" />,
  ShieldAlert: <Award className="w-6 h-6" />,
};

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* HERO SECTION - REFINED WITH MOODBOARD PREMIUM ART DIRECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#F5F7F5] via-[#EBF3F0] to-white text-slate-800 pt-12 pb-20 lg:pt-16 lg:pb-28 border-b border-slate-200/60">
        {/* Ambient subtle blur glow */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#DCECE7]/60 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-emerald-100/40 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Headlines & Call to Action */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#DCECE7] text-[#123C3A] border border-[#123C3A]/10 text-xs sm:text-sm font-semibold tracking-wide shadow-xs">
                <Sparkles className="w-4 h-4 text-[#123C3A]" />
                <span>Asistencia inteligente 24/7</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#123C3A] leading-[1.12]">
                Tu salud merece <br className="hidden sm:inline" />
                una atención <span className="underline decoration-[#E5AE80] decoration-wavy decoration-2">sin esperas.</span>
              </h1>

              <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
                Encontrá especialistas, consultá disponibilidad y reservá tu turno desde cualquier dispositivo. Di adiós a esperar horas por WhatsApp o teléfono con nuestros <strong className="text-[#123C3A] font-semibold">24 médicos de élite</strong> y <strong className="text-[#123C3A] font-semibold">12 especialidades</strong>.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-2">
                <Link
                  href="/turnos"
                  className="flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-[#123C3A] hover:bg-[#1a4a47] text-white font-bold text-base shadow-lg shadow-[#123C3A]/25 transition-all transform hover:-translate-y-0.5"
                >
                  <Calendar className="w-5 h-5 text-[#E5AE80]" />
                  <span>Agendar mi turno</span>
                  <ChevronRight className="w-4 h-4 text-[#DCECE7]" />
                </Link>

                <Link
                  href="/turnos"
                  className="flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-white hover:bg-[#DCECE7]/40 text-[#123C3A] font-semibold text-base border border-[#123C3A]/20 transition-all shadow-xs"
                >
                  <Bot className="w-5 h-5 text-[#123C3A]" />
                  <span>Hablar con MediBot</span>
                </Link>
              </div>

              {/* Trust Badges */}
              <div className="pt-6 grid grid-cols-2 sm:grid-cols-3 gap-4 border-t border-slate-200/80 text-xs text-slate-600 font-medium">
                <div className="flex items-center gap-2 justify-center lg:justify-start">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Sin esperas telefónicas</span>
                </div>
                <div className="flex items-center gap-2 justify-center lg:justify-start">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Guardia 24hs activa</span>
                </div>
                <div className="flex items-center gap-2 justify-center lg:justify-start col-span-2 sm:col-span-1">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Triage con IA clínico</span>
                </div>
              </div>
            </div>

            {/* Right Column: Modern Doctor Photo + Floating Live Appointment Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Main Doctor Image */}
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                  <img
                    src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=800&auto=format&fit=crop&q=80"
                    alt="Atención médica profesional MediConnect"
                    className="w-full h-[400px] sm:h-[440px] object-cover object-top hover:scale-102 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#123C3A]/60 via-transparent to-transparent"></div>
                  <div className="absolute bottom-4 left-4 text-white text-xs font-medium">
                    <p className="font-bold text-sm">Dra. Lucía Fernández</p>
                    <p className="text-[#DCECE7]">Especialista en Cardiología · MN 158.420</p>
                  </div>
                </div>

                {/* Floating Confirmed Appointment Card (Inspired by Moodboard) */}
                <div className="absolute -bottom-6 -left-4 sm:-left-6 bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-slate-100 flex items-center gap-3.5 z-20">
                  <div className="w-10 h-10 rounded-full bg-[#DCECE7] text-[#123C3A] flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#123C3A] flex items-center gap-1.5">
                      Turno confirmado
                    </p>
                    <p className="text-xs font-semibold text-slate-800">Cardiología · Dr. Martín Álvarez</p>
                    <p className="text-[11px] text-slate-500 font-medium">Vie. 20 de Nov · 10:00 hs</p>
                  </div>
                </div>

                {/* Floating Active Badge */}
                <div className="absolute -top-3 -right-3 bg-[#123C3A] text-white rounded-2xl px-4 py-2 shadow-lg hidden sm:flex items-center gap-2 z-20">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span className="text-xs font-semibold">Guardia 24hs Activa</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* QUICK STATS & CAPABILITIES STRIP (Matching Moodboard) */}
      <section className="bg-white border-b border-slate-200/80 py-6 shadow-xs relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 text-center items-center">
            <div className="flex items-center justify-center gap-3 text-slate-700">
              <div className="w-10 h-10 rounded-full bg-[#DCECE7]/70 text-[#123C3A] flex items-center justify-center shrink-0">
                <Stethoscope className="w-5 h-5" />
              </div>
              <div className="text-left">
                <p className="text-sm font-bold text-[#123C3A]">12 Especialidades</p>
                <p className="text-[11px] text-slate-500">De Cardiología a Salud Mental</p>
              </div>
            </div>
            <div className="flex items-center justify-center gap-3 text-slate-700">
              <div className="w-10 h-10 rounded-full bg-[#DCECE7]/70 text-[#123C3A] flex items-center justify-center shrink-0">
                <Users className="w-5 h-5" />
              </div>
              <div className="text-left">
                <p className="text-sm font-bold text-[#123C3A]">+24 Profesionales</p>
                <p className="text-[11px] text-slate-500">Médicos de élite matriculados</p>
              </div>
            </div>
            <div className="flex items-center justify-center gap-3 text-slate-700">
              <div className="w-10 h-10 rounded-full bg-[#DCECE7]/70 text-[#123C3A] flex items-center justify-center shrink-0">
                <Calendar className="w-5 h-5" />
              </div>
              <div className="text-left">
                <p className="text-sm font-bold text-[#123C3A]">Turnos Online</p>
                <p className="text-[11px] text-slate-500">Disponibilidad real en vivo</p>
              </div>
            </div>
            <div className="flex items-center justify-center gap-3 text-slate-700">
              <div className="w-10 h-10 rounded-full bg-[#DCECE7]/70 text-[#123C3A] flex items-center justify-center shrink-0">
                <Bot className="w-5 h-5" />
              </div>
              <div className="text-left">
                <p className="text-sm font-bold text-[#123C3A]">Atención con IA</p>
                <p className="text-[11px] text-slate-500">Triage médico sin demoras</p>
              </div>
            </div>
            <div className="flex items-center justify-center gap-3 text-slate-700 col-span-2 md:col-span-1">
              <div className="w-10 h-10 rounded-full bg-[#DCECE7]/70 text-[#123C3A] flex items-center justify-center shrink-0">
                <Award className="w-5 h-5 text-[#E5AE80]" />
              </div>
              <div className="text-left">
                <p className="text-sm font-bold text-[#123C3A]">Barrio Norte</p>
                <p className="text-[11px] text-slate-500">Av. Santa Fe 2450, CABA</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROBLEM SOLVED SECTION (Addresses Hackathon Premise directly!) */}
      <section className="py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-100/70 px-3 py-1 rounded-full">
              Innovación en Salud
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
              ¿Por qué los consultorios tradicionales pierden pacientes?
            </h2>
            <p className="text-slate-600 text-base sm:text-lg">
              Atender turnos y consultas médicas a mano por WhatsApp o teléfono genera demoras de horas, citas perdidas y frustración en el paciente. Así lo resolvimos en MediConnect:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            {/* The Old Way */}
            <div className="bg-red-50/70 border-2 border-dashed border-red-200 rounded-3xl p-8 space-y-6">
              <div className="flex items-center space-x-3 text-red-700">
                <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center font-bold text-lg">
                  ✕
                </div>
                <h3 className="text-xl font-bold">Atención Tradicional a Mano</h3>
              </div>
              <ul className="space-y-3.5 text-sm text-slate-700">
                <li className="flex items-start gap-2.5">
                  <span className="text-red-500 font-bold shrink-0 mt-0.5">•</span>
                  <span><strong>WhatsApp desbordado:</strong> Mensajes que tardan hasta 4 horas en responderse.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-red-500 font-bold shrink-0 mt-0.5">•</span>
                  <span><strong>Líneas telefónicas ocupadas:</strong> El paciente cuelga y busca otra clínica.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-red-500 font-bold shrink-0 mt-0.5">•</span>
                  <span><strong>Errores de agenda:</strong> Sobreturnos involuntarios y horarios cruzados en planillas de papel.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-red-500 font-bold shrink-0 mt-0.5">•</span>
                  <span><strong>Sin orientación médica previa:</strong> El paciente saca turno con la especialidad equivocada.</span>
                </li>
              </ul>
            </div>

            {/* The MediConnect Way */}
            <div className="bg-gradient-to-br from-blue-600 to-teal-600 text-white rounded-3xl p-8 space-y-6 shadow-xl shadow-blue-600/20">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center font-bold text-lg text-white">
                  ✓
                </div>
                <h3 className="text-xl font-bold">Plataforma MediConnect con IA</h3>
              </div>
              <ul className="space-y-3.5 text-sm text-blue-50">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-teal-300 shrink-0 mt-0.5" />
                  <span><strong>Respuesta en menos de 1 segundo:</strong> MediBot orienta los síntomas 24/7/365.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-teal-300 shrink-0 mt-0.5" />
                  <span><strong>Triage médico asistido:</strong> Derivación automática al especialista y horario adecuado.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-teal-300 shrink-0 mt-0.5" />
                  <span><strong>Reserva online directa en PostgreSQL:</strong> Confirmación instantánea y código único de turno.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-teal-300 shrink-0 mt-0.5" />
                  <span><strong>Cero fricción:</strong> Integración de WhatsApp directo, web y base de datos sincronizada.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* SPECIALTIES GRID PREVIEW */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-teal-600 bg-teal-50 px-3 py-1 rounded-full">
                Servicios Médicos
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight mt-2">
                Nuestras 12 Especialidades Médicas
              </h2>
              <p className="text-slate-600 text-sm sm:text-base mt-2 max-w-xl">
                Contamos con consultorios equipados y profesionales matriculados en cada rama médica.
              </p>
            </div>
            <Link
              href="/especialidades"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-blue-600 hover:text-blue-800 transition-colors"
            >
              <span>Ver catálogo completo con síntomas</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {SPECIALTIES.map((spec) => {
              const docCount = DOCTORS.filter((d) => d.specialtyId === spec.id).length;
              return (
                <div
                  key={spec.id}
                  className="group bg-slate-50 hover:bg-white rounded-2xl p-6 border border-slate-200/80 hover:border-blue-400 hover:shadow-xl transition-all duration-200 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-blue-600 to-teal-500 text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                      {iconMap[spec.iconName] || <Stethoscope className="w-6 h-6" />}
                    </div>
                    <h3 className="font-bold text-lg text-slate-900 group-hover:text-blue-600 transition-colors">
                      {spec.name}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                      {spec.shortDesc}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-200/60 flex items-center justify-between text-xs">
                    <span className="font-medium text-slate-500">
                      {docCount} especialistas
                    </span>
                    <Link
                      href={`/turnos?specialty=${spec.id}`}
                      className="font-bold text-teal-600 hover:text-teal-700 flex items-center gap-0.5"
                    >
                      Turno →
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FEATURED DOCTORS PREVIEW */}
      <section className="py-20 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-100/70 px-3 py-1 rounded-full">
                Cuerpo Médico
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight mt-2">
                Conoce a Nuestros Especialistas
              </h2>
              <p className="text-slate-600 text-sm sm:text-base mt-2 max-w-xl">
                24 médicos y médicas formados en los mejores hospitales del país, con horarios flexibles.
              </p>
            </div>
            <Link
              href="/equipo"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-blue-600 hover:text-blue-800 transition-colors"
            >
              <span>Ver los 24 profesionales</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {DOCTORS.slice(0, 4).map((doc) => (
              <div
                key={doc.id}
                className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-lg transition-all group"
              >
                <div className="relative h-48 w-full bg-slate-100 overflow-hidden">
                  <img
                    src={doc.avatar}
                    alt={doc.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full text-xs font-bold text-slate-800 flex items-center gap-1 shadow-sm">
                    <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                    <span>{doc.rating}</span>
                  </div>
                </div>

                <div className="p-5 space-y-3">
                  <div>
                    <span className="text-[11px] font-bold text-teal-600 uppercase tracking-wide">
                      {doc.specialtyName}
                    </span>
                    <h3 className="font-bold text-base text-slate-900">{doc.name}</h3>
                    <p className="text-xs text-slate-400">{doc.matricula}</p>
                  </div>

                  <p className="text-xs text-slate-600 line-clamp-2">
                    {doc.bio}
                  </p>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                    <div>
                      <p className="text-[10px] text-slate-400">Atención:</p>
                      <p className="font-medium text-slate-700">{doc.days.slice(0, 2).join(", ")}</p>
                    </div>
                    <Link
                      href={`/turnos?doctor=${doc.id}`}
                      className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-colors"
                    >
                      Reservar
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS (3 STEPS) */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-600 bg-teal-50 px-3 py-1 rounded-full">
              Paso a Paso
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
              Cómo reservar tu consulta en 3 minutos
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            <div className="bg-slate-50 rounded-3xl p-8 border border-slate-200/80 text-center space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-blue-600 text-white font-bold text-xl flex items-center justify-center mx-auto shadow-md">
                1
              </div>
              <h3 className="text-xl font-bold text-slate-900">Consulta tus síntomas o elige doctor</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Usa nuestro MediBot con IA si no estás seguro de a qué médico acudir, o explora las 12 especialidades directamente.
              </p>
            </div>

            <div className="bg-slate-50 rounded-3xl p-8 border border-slate-200/80 text-center space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-teal-500 text-white font-bold text-xl flex items-center justify-center mx-auto shadow-md">
                2
              </div>
              <h3 className="text-xl font-bold text-slate-900">Selecciona día y horario disponible</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Visualiza la agenda en tiempo real del profesional elegido. Elige el turno que mejor se adapte a tu rutina.
              </p>
            </div>

            <div className="bg-slate-50 rounded-3xl p-8 border border-slate-200/80 text-center space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-emerald-600 text-white font-bold text-xl flex items-center justify-center mx-auto shadow-md">
                3
              </div>
              <h3 className="text-xl font-bold text-slate-900">Confirmación y código de turno</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Recibes tu comprobante instantáneo con instrucciones de llegada a nuestra sede de Av. Santa Fe y recordatorio.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20 bg-gradient-to-b from-slate-900 to-blue-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-400 bg-teal-500/20 px-3 py-1 rounded-full">
              Testimonios Reales
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Lo que opinan nuestros pacientes
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10 space-y-4">
              <div className="flex text-amber-400 space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <p className="text-sm text-slate-200 italic leading-relaxed">
                &ldquo;Tenía dudas si mis dolores eran de traumatología o neurología. El asistente con IA me explicó con calma y me asignó con el Dr. Ramos. La atención fue impecable.&rdquo;
              </p>
              <div>
                <p className="font-bold text-sm text-white">Mariana V. (Palermo)</p>
                <p className="text-xs text-teal-300">Paciente de Neurología</p>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10 space-y-4">
              <div className="flex text-amber-400 space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <p className="text-sm text-slate-200 italic leading-relaxed">
                &ldquo;Siempre era un calvario conseguir turno para mi nene por teléfono en otras clínicas. Acá entré a las 23hs un domingo y en 1 minuto tenía turno con la Dra. Castro.&rdquo;
              </p>
              <div>
                <p className="font-bold text-sm text-white">Gonzalo M. (Belgrano)</p>
                <p className="text-teal-300 text-xs">Paciente de Pediatría</p>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10 space-y-4">
              <div className="flex text-amber-400 space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <p className="text-sm text-slate-200 italic leading-relaxed">
                &ldquo;El Dr. Álvarez en Cardiología me hizo todos los estudios en la misma mañana. Instalaciones de primer nivel y puntualidad británica. 100% recomendable.&rdquo;
              </p>
              <div>
                <p className="font-bold text-sm text-white">Esteban R. (Recoleta)</p>
                <p className="text-teal-300 text-xs">Paciente de Cardiología</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BIG FINAL CTA */}
      <section className="py-20 bg-gradient-to-r from-blue-700 via-teal-600 to-emerald-600 text-white relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Tu salud no puede esperar a que alguien responda un teléfono.
          </h2>
          <p className="text-lg text-blue-50 max-w-2xl mx-auto font-light">
            Agenda tu turno ahora mismo en línea o consulta con nuestro asistente de triage con IA disponible las 24 horas.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/turnos"
              className="px-9 py-4 rounded-xl bg-white text-blue-900 font-extrabold text-base shadow-xl hover:bg-slate-100 transition-all transform hover:scale-105"
            >
              Agendar Turno Inmediato
            </Link>
            <a
              href={CLINIC_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 rounded-xl bg-slate-900/60 hover:bg-slate-900 text-white font-semibold text-base border border-white/30 backdrop-blur-md transition-all flex items-center justify-center gap-2"
            >
              <PhoneCall className="w-5 h-5" />
              <span>Contactar por WhatsApp</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
