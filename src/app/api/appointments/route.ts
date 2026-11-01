import { NextRequest, NextResponse } from "next/server";
import { saveAppointment, getAppointments } from "@/lib/db";
import { DOCTORS, SPECIALTIES } from "@/lib/data";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const doctorId = searchParams.get("doctorId") || searchParams.get("doctor_id");

    const list = await getAppointments();

    if (doctorId) {
      const doctor = DOCTORS.find((d) => d.id === doctorId || d.id === `doc-${doctorId}`);
      const cleanDoctorId = doctor ? doctor.id : doctorId;
      const existingAppointments = list.filter((a) => a.doctorId === cleanDoctorId || a.doctorId === doctorId);
      const bookedSlots = new Set(existingAppointments.map((a) => `${a.date}_${a.time}`));
      
      const availableSlots = (doctor?.availableHours || ["09:00", "10:00", "11:00", "12:00", "14:00", "15:00", "16:00", "17:00"])
        .filter((h) => !bookedSlots.has(`2026-11-20_${h}`));

      return NextResponse.json({
        success: true,
        doctor,
        availableSlots,
        existingAppointments,
        totalBooked: existingAppointments.length,
      });
    }

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
    const patientName = body.patientName || body.patient_name;
    const patientEmail = body.patientEmail || body.patient_email;
    const patientPhone = body.patientPhone || body.patient_phone;
    const doctorId = body.doctorId || body.doctor_id;
    const specialtyId = body.specialtyId || body.specialty_id;
    const date = body.date || body.appointment_date;
    const time = body.time || body.appointment_time;
    const notes = body.notes || "";

    if (!patientName || !patientEmail || !patientPhone || !doctorId || !date || !time) {
      return NextResponse.json(
        { success: false, error: "Faltan campos obligatorios para agendar el turno." },
        { status: 400 }
      );
    }

    const doctor = DOCTORS.find((d) => d.id === doctorId || d.id === `doc-${doctorId}`);
    const resolvedDoctorId = doctor ? doctor.id : String(doctorId);
    const specialty = SPECIALTIES.find((s) => s.id === specialtyId) ||
      (doctor ? SPECIALTIES.find((s) => s.id === doctor.specialtyId) : null);

    const record = await saveAppointment({
      patientName,
      patientEmail,
      patientPhone,
      doctorId: resolvedDoctorId,
      doctorName: doctor ? doctor.name : "Profesional Médico",
      specialtyId: specialty ? specialty.id : (doctor?.specialtyId || "general"),
      specialtyName: specialty ? specialty.name : (doctor?.specialtyName || "Consulta Médica"),
      date,
      time,
      notes: notes || "",
    });

    return NextResponse.json(
      {
        success: true,
        message: "¡Turno agendado exitosamente!",
        appointment: record,
      },
      { status: 201 }
    );
  } catch (error) {
    const errorMsg = (error as Error).message || "";
    const isConflict = errorMsg.includes("ya está reservado") || errorMsg.includes("conflicto");

    return NextResponse.json(
      {
        success: false,
        error: errorMsg,
        conflict: isConflict,
      },
      { status: isConflict ? 400 : 500 }
    );
  }
}
