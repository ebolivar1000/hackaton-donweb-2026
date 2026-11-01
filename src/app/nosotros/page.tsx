import Link from "next/link";
import {
  Award,
  ShieldCheck,
  HeartHandshake,
  Microscope,
  Calendar,
  CheckCircle2,
} from "lucide-react";

export default function NosotrosPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-100/70 px-3.5 py-1 rounded-full">
            Nuestra Institución
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Excelencia Médica con Vocación Humana
          </h1>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            Desde 2011, MediConnect combina los mejores profesionales médicos con tecnología de vanguardia para brindar una experiencia de salud ágil, sin esperas y de máxima confianza.
          </p>
        </div>

        {/* Hero Image Showcase */}
        <div className="relative rounded-3xl overflow-hidden shadow-2xl h-80 sm:h-[420px]">
          <img
            src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1920&auto=format&fit=crop&q=80"
            alt="Instalaciones MediConnect"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-900/30 to-transparent flex items-end p-8 sm:p-12">
            <div className="text-white space-y-2 max-w-2xl">
              <span className="text-xs uppercase tracking-widest text-teal-300 font-bold">
                Infraestructura Hospitalaria
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold">
                Más de 1.800 m² dedicados al cuidado de tu salud
              </h2>
              <p className="text-xs sm:text-sm text-slate-200">
                18 consultorios inteligentes, laboratorio propio de análisis clínicos y centro de diagnóstico por imágenes de alta resolución.
              </p>
            </div>
          </div>
        </div>

        {/* Pillars / Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Atención Empática y Cálida</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              La tecnología nos ayuda a ser más rápidos, pero el corazón de MediConnect sigue siendo la escucha atenta y el tiempo dedicado a cada paciente.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center">
              <Microscope className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Tecnología de Precisión</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Equipamiento Siemens y General Electric para ecografías 5D, resonancias magnéticas, ergometrías y mapeo digital de lunares con microcámara.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">IA al Servicio del Paciente</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Pioneros en Argentina en integrar un sistema de triage y turnos inteligente que elimina las esperas telefónicas y asigna al especialista correcto.
            </p>
          </div>
        </div>

        {/* Clinical Story */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-sm grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-600">
              Nuestra Historia
            </span>
            <h2 className="text-3xl font-bold text-slate-900">
              Nacidos para transformar la experiencia del paciente
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Fundada en 2011 por un grupo de médicos especialistas de los principales hospitales públicos de la Ciudad de Buenos Aires, MediConnect nació con una premisa clara: terminar con los laberintos burocráticos que sufren las personas cuando necesitan ver a un médico.
            </p>
            <p className="text-sm text-slate-600 leading-relaxed">
              Hoy atendemos a más de 4.000 pacientes por mes en nuestras 12 especialidades médicas, manteniendo un estándar de satisfacción superior al 98% gracias a nuestra infraestructura digitalizada.
            </p>
            <div className="pt-2">
              <Link
                href="/turnos"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-teal-600 text-white font-semibold text-xs shadow-md hover:from-blue-700 hover:to-teal-700 transition-all"
              >
                <Calendar className="w-4 h-4" />
                <span>Agendar Consulta Hoy</span>
              </Link>
            </div>
          </div>

          <div className="space-y-3">
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
              <span className="text-xs text-slate-700 font-medium">
                Miembro de la Sociedad Argentina de Cardiología (SAC)
              </span>
            </div>
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
              <span className="text-xs text-slate-700 font-medium">
                Acreditación de Calidad por la Sociedad Argentina de Pediatría (SAP)
              </span>
            </div>
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
              <span className="text-xs text-slate-700 font-medium">
                Convenios y reintegros con las principales obras sociales y prepagas
              </span>
            </div>
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
              <span className="text-xs text-slate-700 font-medium">
                Historia clínica electrónica universal y digitalizada
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
