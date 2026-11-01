"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  Calendar,
  Clock,
  User,
  Phone,
  Mail,
  CheckCircle2,
  Stethoscope,
  ChevronRight,
  ShieldCheck,
  MapPin,
  Bot,
  Sparkles,
} from "lucide-react";
import { SPECIALTIES, DOCTORS, CLINIC_INFO, Doctor } from "@/lib/data";

function TurnosForm() {
  const searchParams = useSearchParams();
  const initialDoctorId = searchParams.get("doctor");
  const initialSpecialtyId = searchParams.get("specialty");

  const [step, setStep] = useState(1);
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>("");
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");

  // Patient Info
  const [patientName, setPatientName] = useState("");
  const [patientEmail, setPatientEmail] = useState("");
  const [patientPhone, setPatientPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const [submitting, setSubmitting] = useState(false);
  const [confirmation, setConfirmation] = useState<{
    id: string;
    doctorName: string;
    specialtyName: string;
    date: string;
    time: string;
  } | null>(null);

  // Initialize from params
  useEffect(() => {
    if (initialDoctorId) {
      const doc = DOCTORS.find((d) => d.id === initialDoctorId);
      if (doc) {
        setSelectedDoctor(doc);
        setSelectedSpecialty(doc.specialtyId);
        setStep(3); // jump to date/time
      }
    } else if (initialSpecialtyId) {
      setSelectedSpecialty(initialSpecialtyId);
      setStep(2); // jump to doctor
    }
  }, [initialDoctorId, initialSpecialtyId]);

  const availableDoctors = DOCTORS.filter(
    (d) => !selectedSpecialty || d.specialtyId === selectedSpecialty
  );

  // Generated time slots
  const timeSlots = [
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "12:00",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
    "17:30",
    "18:00",
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    if (!selectedDoctor || !selectedDate || !selectedTime || !patientName || !patientEmail || !patientPhone) {
      setErrorMsg("Por favor completa todos los campos obligatorios.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          patientName,
          patientEmail,
          patientPhone,
          doctorId: selectedDoctor.id,
          specialtyId: selectedSpecialty,
          date: selectedDate,
          time: selectedTime,
          notes,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setConfirmation({
          id: data.appointment.id,
          doctorName: selectedDoctor.name,
          specialtyName: selectedDoctor.specialtyName,
          date: selectedDate,
          time: selectedTime,
        });
        setStep(5); // Success confirmation
      } else {
        setErrorMsg(data.error || "No fue posible agendar el turno. Por favor intenta otro horario.");
      }
    } catch (err) {
      setErrorMsg("Error de conexión al servidor PostgreSQL. Intente nuevamente.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Stepper */}
      {step < 5 && (
        <div className="mb-10">
          <div className="flex items-center justify-between text-xs sm:text-sm font-semibold text-slate-500">
            <span className={step >= 1 ? "text-blue-600 font-bold" : ""}>
              1. Especialidad
            </span>
            <ChevronRight className="w-4 h-4 text-slate-300" />
            <span className={step >= 2 ? "text-blue-600 font-bold" : ""}>
              2. Médico
            </span>
            <ChevronRight className="w-4 h-4 text-slate-300" />
            <span className={step >= 3 ? "text-blue-600 font-bold" : ""}>
              3. Fecha y Hora
            </span>
            <ChevronRight className="w-4 h-4 text-slate-300" />
            <span className={step >= 4 ? "text-blue-600 font-bold" : ""}>
              4. Tus Datos
            </span>
          </div>
          <div className="w-full bg-slate-200 h-2 rounded-full mt-3 overflow-hidden">
            <div
              className="bg-gradient-to-r from-blue-600 to-teal-500 h-full transition-all duration-300"
              style={{ width: `${(step / 4) * 100}%` }}
            ></div>
          </div>
        </div>
      )}

      {/* STEP 1: SELECT SPECIALTY */}
      {step === 1 && (
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h2 className="text-2xl font-bold text-slate-900">
              Paso 1: Selecciona la Especialidad Médica
            </h2>
            <p className="text-sm text-slate-500">
              ¿No estás seguro? Consulta con nuestro MediBot con IA en la esquina inferior derecha.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {SPECIALTIES.map((spec) => (
              <button
                key={spec.id}
                onClick={() => {
                  setSelectedSpecialty(spec.id);
                  setStep(2);
                }}
                className={`p-5 rounded-2xl border text-left transition-all flex flex-col justify-between space-y-2 group ${
                  selectedSpecialty === spec.id
                    ? "border-blue-600 bg-blue-50/50 shadow-md ring-2 ring-blue-500/20"
                    : "border-slate-200 hover:border-blue-400 hover:bg-slate-50"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-base text-slate-900 group-hover:text-blue-600">
                    {spec.name}
                  </span>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600" />
                </div>
                <p className="text-xs text-slate-500 line-clamp-2">
                  {spec.shortDesc}
                </p>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* STEP 2: SELECT DOCTOR */}
      {step === 2 && (
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">
                Paso 2: Elige a tu Médico Especialista
              </h2>
              <p className="text-sm text-slate-500">
                Mostrando doctores de la especialidad seleccionada.
              </p>
            </div>
            <button
              onClick={() => setStep(1)}
              className="text-xs font-semibold text-blue-600 hover:underline"
            >
              Cambiar especialidad
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {availableDoctors.map((doc) => (
              <div
                key={doc.id}
                onClick={() => {
                  setSelectedDoctor(doc);
                  setStep(3);
                }}
                className={`p-5 rounded-2xl border cursor-pointer transition-all flex items-start gap-4 group ${
                  selectedDoctor?.id === doc.id
                    ? "border-blue-600 bg-blue-50/50 shadow-md ring-2 ring-blue-500/20"
                    : "border-slate-200 hover:border-blue-400 hover:bg-slate-50"
                }`}
              >
                <img
                  src={doc.avatar}
                  alt={doc.name}
                  className="w-16 h-16 rounded-2xl object-cover shrink-0 border border-slate-200"
                />
                <div className="space-y-1 flex-1">
                  <h3 className="font-bold text-base text-slate-900 group-hover:text-blue-600">
                    {doc.name}
                  </h3>
                  <p className="text-xs text-teal-600 font-semibold">
                    {doc.specialtyName}
                  </p>
                  <p className="text-[11px] text-slate-500">
                    📅 {doc.days.join(", ")}
                  </p>
                  <p className="text-[11px] text-slate-500">
                    ⏰ {doc.hours}
                  </p>
                  <p className="text-xs font-bold text-slate-800 pt-1">
                    Arancel: {doc.price}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* STEP 3: DATE AND TIME */}
      {step === 3 && (
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">
                Paso 3: Selecciona Fecha y Horario
              </h2>
              <p className="text-sm text-slate-500">
                Médico: <strong>{selectedDoctor?.name}</strong> ({selectedDoctor?.specialtyName})
              </p>
            </div>
            <button
              onClick={() => setStep(2)}
              className="text-xs font-semibold text-blue-600 hover:underline"
            >
              Cambiar médico
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Date picker */}
            <div className="space-y-3">
              <label className="block text-sm font-bold text-slate-800">
                Fecha del turno:
              </label>
              <input
                type="date"
                min={new Date().toISOString().split("T")[0]}
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full p-3.5 rounded-xl border border-slate-200 text-slate-800 font-medium text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              <p className="text-xs text-slate-500">
                Días de atención del profesional: {selectedDoctor?.days.join(", ")}
              </p>
            </div>

            {/* Time slots */}
            <div className="space-y-3">
              <label className="block text-sm font-bold text-slate-800">
                Horario disponible:
              </label>
              <div className="grid grid-cols-3 gap-2 max-h-56 overflow-y-auto pr-1">
                {timeSlots.map((slot) => (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => setSelectedTime(slot)}
                    className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-all ${
                      selectedTime === slot
                        ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                        : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-blue-50"
                    }`}
                  >
                    {slot} hs
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-100 flex justify-end">
            <button
              disabled={!selectedDate || !selectedTime}
              onClick={() => setStep(4)}
              className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-teal-600 text-white font-bold text-sm shadow-md disabled:opacity-40 hover:from-blue-700 hover:to-teal-700 transition-all"
            >
              Continuar a Datos del Paciente →
            </button>
          </div>
        </div>
      )}

      {/* STEP 4: PATIENT DETAILS */}
      {step === 4 && (
        <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">
                Paso 4: Datos del Paciente y Confirmación
              </h2>
              <p className="text-sm text-slate-500">
                Revisa los detalles y completa tu información para enviar el turno.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setStep(3)}
              className="text-xs font-semibold text-blue-600 hover:underline"
            >
              Modificar fecha/hora
            </button>
          </div>

          {/* Booking summary box */}
          <div className="bg-blue-50/80 border border-blue-200/80 rounded-2xl p-5 text-sm space-y-2">
            <p className="font-bold text-blue-900 text-base">Resumen de tu Turno:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-700 text-xs sm:text-sm">
              <p>👨‍⚕️ <strong>Profesional:</strong> {selectedDoctor?.name}</p>
              <p>🩺 <strong>Especialidad:</strong> {selectedDoctor?.specialtyName}</p>
              <p>📅 <strong>Fecha:</strong> {selectedDate}</p>
              <p>⏰ <strong>Horario:</strong> {selectedTime} hs</p>
              <p>📍 <strong>Lugar:</strong> {CLINIC_INFO.address}</p>
              <p>💵 <strong>Arancel:</strong> {selectedDoctor?.price}</p>
            </div>
          </div>

          {errorMsg && (
            <div className="p-4 bg-amber-50 border border-amber-300 rounded-2xl text-amber-900 text-xs flex items-start gap-2.5 shadow-sm">
              <span className="font-bold text-base">⚠️</span>
              <div className="space-y-1">
                <p className="font-bold">{errorMsg}</p>
                <p className="text-amber-800">
                  Por favor regresa al paso 3 para seleccionar otro horario disponible.
                </p>
              </div>
            </div>
          )}

          {/* Form fields */}
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Nombre y Apellido *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    placeholder="Ej. Juan Pérez"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Teléfono / WhatsApp *
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    required
                    value={patientPhone}
                    onChange={(e) => setPatientPhone(e.target.value)}
                    placeholder="Ej. 11 5555-4321"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Correo Electrónico (para comprobante) *
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={patientEmail}
                  onChange={(e) => setPatientEmail(e.target.value)}
                  placeholder="ejemplo@correo.com"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Motivo de consulta o síntomas (opcional)
              </label>
              <textarea
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Breve descripción para el profesional..."
                className="w-full p-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800"
              ></textarea>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs text-slate-500 flex items-center gap-1">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              Tus datos están protegidos por secreto médico
            </span>
            <button
              type="submit"
              disabled={submitting}
              className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold text-sm shadow-md hover:from-emerald-700 hover:to-teal-700 transition-all disabled:opacity-50"
            >
              {submitting ? "Guardando turno..." : "Confirmar Turno Inmediato"}
            </button>
          </div>
        </form>
      )}

      {/* STEP 5: SUCCESS CONFIRMATION */}
      {step === 5 && confirmation && (
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-xl text-center space-y-6">
          <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-sm">
            <CheckCircle2 className="w-12 h-12" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
              ¡Turno Confirmado con Éxito!
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900">
              Te esperamos en MediConnect
            </h2>
            <p className="text-sm text-slate-600 max-w-md mx-auto">
              Se ha reservado tu espacio en el sistema de nuestra clínica y sincronizado con la base de datos de PostgreSQL.
            </p>
          </div>

          {/* Ticket Comprobante */}
          <div className="max-w-md mx-auto bg-slate-50 border-2 border-dashed border-slate-300 rounded-2xl p-6 text-left space-y-3">
            <div className="flex justify-between items-center border-b border-slate-200 pb-3">
              <span className="text-xs font-bold uppercase text-slate-400">Código de Turno:</span>
              <span className="text-base font-mono font-extrabold text-blue-700 bg-blue-100 px-3 py-0.5 rounded-md">
                {confirmation.id}
              </span>
            </div>

            <div className="text-xs sm:text-sm space-y-2 text-slate-700">
              <p>👨‍⚕️ <strong>Médico:</strong> {confirmation.doctorName}</p>
              <p>🩺 <strong>Especialidad:</strong> {confirmation.specialtyName}</p>
              <p>📅 <strong>Fecha:</strong> {confirmation.date}</p>
              <p>⏰ <strong>Horario:</strong> {confirmation.time} hs</p>
              <p>📍 <strong>Dirección:</strong> {CLINIC_INFO.address}</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
            <button
              onClick={() => window.print()}
              className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs transition-colors"
            >
              Imprimir / Guardar Comprobante
            </button>
            <Link
              href="/"
              className="px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors"
            >
              Volver al Inicio
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default function TurnosPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-teal-600 bg-teal-50 border border-teal-200/60 px-3.5 py-1 rounded-full">
            Autogestión de Citas
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Reserva tu Turno Médico Online
          </h1>
          <p className="text-slate-600 text-base sm:text-lg">
            Sistema directo conectado a nuestra base de datos. Sin llamadas en espera ni demoras.
          </p>
        </div>

        <Suspense fallback={<div className="text-center py-10">Cargando formulario...</div>}>
          <TurnosForm />
        </Suspense>
      </div>
    </div>
  );
}
