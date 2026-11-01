"use client";

import { useState } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageCircle,
  ShieldCheck,
  Send,
  CheckCircle2,
} from "lucide-react";
import { CLINIC_INFO } from "@/lib/data";

export default function ContactoPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-teal-600 bg-teal-50 border border-teal-200/60 px-3.5 py-1 rounded-full">
            Canales de Atención
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Estamos para Cuidarte
          </h1>
          <p className="text-slate-600 text-base sm:text-lg">
            Visítanos en nuestra sede de Barrio Norte, comunícate por WhatsApp o envíanos tu mensaje.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Contact Information & Channels */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-6">
              <h2 className="text-xl font-bold text-slate-900">
                Información de Contacto
              </h2>

              <div className="space-y-5 text-sm">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900">Sede Principal</p>
                    <p className="text-slate-600 text-xs mt-0.5">{CLINIC_INFO.address}</p>
                    <p className="text-slate-400 text-[11px] mt-1">A 2 cuadras de Estación Pueyrredón (Línea D)</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900">Central Telefónica</p>
                    <p className="text-slate-600 text-xs mt-0.5">{CLINIC_INFO.phone}</p>
                    <p className="text-slate-400 text-[11px] mt-1">Líneas rotativas</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900">WhatsApp Directo</p>
                    <p className="text-slate-600 text-xs mt-0.5">{CLINIC_INFO.whatsapp}</p>
                    <a
                      href={CLINIC_INFO.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-bold text-emerald-600 hover:underline mt-1 inline-block"
                    >
                      Abrir chat ahora →
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900">Horarios</p>
                    <p className="text-slate-600 text-xs mt-0.5">{CLINIC_INFO.hours}</p>
                    <span className="inline-block mt-1 text-[11px] bg-red-100 text-red-700 font-bold px-2 py-0.5 rounded">
                      Guardia 24hs activa
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900">Correo Electrónico</p>
                    <p className="text-slate-600 text-xs mt-0.5">{CLINIC_INFO.email}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Emergency Banner */}
            <div className="bg-gradient-to-br from-red-600 to-rose-700 text-white rounded-3xl p-6 shadow-lg shadow-red-600/20 space-y-2">
              <div className="flex items-center gap-2 font-bold text-base">
                <ShieldCheck className="w-5 h-5" />
                <span>¿Urgencia o Emergencia Médica?</span>
              </div>
              <p className="text-xs text-red-100 leading-relaxed">
                Si presentas dolor de pecho agudo, falta de aire súbita o pérdida de conciencia, comunícate de inmediato al 107 (SAME) o a nuestra central de guardia:
              </p>
              <p className="text-xl font-mono font-extrabold text-white pt-1">
                {CLINIC_INFO.emergencyPhone}
              </p>
            </div>
          </div>

          {/* Form & Map */}
          <div className="lg:col-span-7 space-y-6">
            {/* Contact form */}
            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-6">
              <h2 className="text-xl font-bold text-slate-900">
                Envíanos una Consulta Administrativa o General
              </h2>

              {submitted ? (
                <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-2">
                  <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                  <p className="font-bold text-emerald-800">¡Mensaje Enviado con Éxito!</p>
                  <p className="text-xs text-emerald-700">
                    Nos pondremos en contacto contigo a la brevedad.
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setSubmitted(true);
                  }}
                  className="space-y-4"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                        Nombre Completo *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Tu nombre"
                        className="w-full p-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                        Correo Electrónico *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="tu@correo.com"
                        className="w-full p-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                        Teléfono / Celular
                      </label>
                      <input
                        type="tel"
                        placeholder="Ej. 11 1234-5678"
                        className="w-full p-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                        Motivo de Contacto
                      </label>
                      <select className="w-full p-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium text-slate-700">
                        <option>Consulta general</option>
                        <option>Coberturas médicas y prepagas</option>
                        <option>Estudios y análisis de laboratorio</option>
                        <option>Solicitud de historia clínica</option>
                        <option>Otro</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                      Mensaje *
                    </label>
                    <textarea
                      rows={4}
                      required
                      placeholder="Escribe tu consulta aquí..."
                      className="w-full p-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-teal-600 text-white font-bold text-sm shadow-md hover:from-blue-700 hover:to-teal-700 transition-all flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Enviar Mensaje</span>
                  </button>
                </form>
              )}
            </div>

            {/* Interactive Map card */}
            <div className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm">
              <div className="p-4 bg-slate-100 flex items-center justify-between text-xs text-slate-600 font-medium">
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-rose-500" />
                  Ubicación: Av. Santa Fe 2450, CABA
                </span>
                <span className="text-blue-600 font-semibold">Google Maps</span>
              </div>
              <div className="h-64 w-full bg-slate-200 relative">
                <iframe
                  title="Ubicación MediConnect"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3284.453303126786!2d-58.40348732448372!3d-34.59269557295982!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcca979b9b4f97%3A0x6b30689b940e53a3!2sAv.%20Santa%20Fe%202450%2C%20C1123ABQ%20Cdad.%20Aut%C3%B3noma%20de%20Buenos%20Aires!5e0!3m2!1ses-419!2sar!4v1714570000000!5m2!1ses-419!2sar"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
