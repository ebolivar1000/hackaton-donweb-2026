import { NextRequest, NextResponse } from "next/server";
import { saveAppointment, getAppointments } from "@/lib/db";
import { DOCTORS, SPECIALTIES } from "@/lib/data";

export async function GET() {
  try {
    const list = await getAppointments();
    return NextResponse.json({ success: true, count: list.length, appointments: list });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { patientName, patientEmail, patientPhone, doctorId, specialtyId, date, time, notes } = body;

    if (!patientName || !patientEmail || !patientPhone || !doctorId || !date || !time) {
      return NextResponse.json(
        { success: false, error: "Faltan campos obligatorios para agendar el turno." },
        { status: 400 }
      );
    }

    const doctor = DOCTORS.find((d) => d.id === doctorId);
    const specialty = SPECIALTIES.find((s) => s.id === specialtyId) ||
      (doctor ? SPECIALTIES.find((s) => s.id === doctor.specialtyId) : null);

    const record = await saveAppointment({
      patientName,
      patientEmail,
      patientPhone,
      doctorId,
      doctorName: doctor ? doctor.name : "Profesional Médico",
      specialtyId: specialty ? specialty.id : (doctor?.specialtyId || "general"),
      specialtyName: specialty ? specialty.name : (doctor?.specialtyName || "Consulta Médica"),
      date,
      time,
      notes: notes || "",
    });

    return NextResponse.json({
      success: true,
      message: "¡Turno agendado exitosamente!",
      appointment: record,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}
