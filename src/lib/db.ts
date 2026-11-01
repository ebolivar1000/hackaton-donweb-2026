import { Pool } from "pg";

let pool: Pool | null = null;

export function getDbPool() {
  if (!pool) {
    const connectionString =
      process.env.DATABASE_URL ||
      "postgresql://admindb:VUma51pepo@127.0.0.1:5432/mediconnect";

    pool = new Pool({
      connectionString,
      connectionTimeoutMillis: 3000,
      idleTimeoutMillis: 10000,
    });

    pool.on("error", (err) => {
      console.warn("Postgres pool error (handled):", err.message);
    });
  }
  return pool;
}

export interface AppointmentRecord {
  id: string;
  patientName: string;
  patientEmail: string;
  patientPhone: string;
  doctorId: string;
  doctorName: string;
  specialtyId: string;
  specialtyName: string;
  date: string;
  time: string;
  notes?: string;
  createdAt: string;
  status: "confirmado" | "pendiente" | "cancelado";
}

declare global {
  // eslint-disable-next-line no-var
  var __mediconnect_appointments: AppointmentRecord[] | undefined;
}

if (!global.__mediconnect_appointments) {
  global.__mediconnect_appointments = [];
}

export async function saveAppointment(
  app: Omit<AppointmentRecord, "id" | "createdAt" | "status">
): Promise<AppointmentRecord> {
  // 1. Conflict Prevention Check in Memory
  const memConflict = (global.__mediconnect_appointments || []).find(
    (a) =>
      a.doctorId === app.doctorId &&
      a.date === app.date &&
      a.time === app.time &&
      a.status === "confirmado"
  );

  if (memConflict) {
    throw new Error(
      `El turno para el doctor seleccionado el día ${app.date} a las ${app.time} hs ya está reservado por otro paciente. Por favor selecciona otro horario.`
    );
  }

  const newAppointment: AppointmentRecord = {
    ...app,
    id: `MED-${Date.now().toString().slice(-6)}`,
    createdAt: new Date().toISOString(),
    status: "confirmado",
  };

  try {
    const db = getDbPool();
    // Ensure table exists
    await db.query(`
      CREATE TABLE IF NOT EXISTS appointments (
        id VARCHAR(50) PRIMARY KEY,
        patient_name VARCHAR(150) NOT NULL,
        patient_email VARCHAR(150) NOT NULL,
        patient_phone VARCHAR(50) NOT NULL,
        doctor_id VARCHAR(50) NOT NULL,
        doctor_name VARCHAR(150) NOT NULL,
        specialty_id VARCHAR(50) NOT NULL,
        specialty_name VARCHAR(150) NOT NULL,
        appointment_date VARCHAR(50) NOT NULL,
        appointment_time VARCHAR(50) NOT NULL,
        notes TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        status VARCHAR(20) DEFAULT 'confirmado'
      );
    `);

    // 2. Strict Conflict Prevention Check in PostgreSQL
    const existing = await db.query(
      `SELECT id FROM appointments 
       WHERE doctor_id = $1 AND appointment_date = $2 AND appointment_time = $3 AND status = 'confirmado'
       LIMIT 1;`,
      [app.doctorId, app.date, app.time]
    );

    if (existing.rows && existing.rows.length > 0) {
      throw new Error(
        `Conflicto de horario: El profesional ya cuenta con una cita confirmada el ${app.date} a las ${app.time} hs en PostgreSQL.`
      );
    }

    await db.query(
      `INSERT INTO appointments (id, patient_name, patient_email, patient_phone, doctor_id, doctor_name, specialty_id, specialty_name, appointment_date, appointment_time, notes, status)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)`,
      [
        newAppointment.id,
        newAppointment.patientName,
        newAppointment.patientEmail,
        newAppointment.patientPhone,
        newAppointment.doctorId,
        newAppointment.doctorName,
        newAppointment.specialtyId,
        newAppointment.specialtyName,
        newAppointment.date,
        newAppointment.time,
        newAppointment.notes || "",
        newAppointment.status,
      ]
    );
  } catch (err) {
    if ((err as Error).message.includes("Conflicto") || (err as Error).message.includes("ya está reservado")) {
      throw err;
    }
    console.warn("DB save warning (handled in-memory):", (err as Error).message);
  }

  global.__mediconnect_appointments!.unshift(newAppointment);
  return newAppointment;
}

export async function getAppointments(): Promise<AppointmentRecord[]> {
  try {
    const db = getDbPool();
    const res = await db.query("SELECT * FROM appointments ORDER BY created_at DESC LIMIT 100");
    if (res.rows && res.rows.length > 0) {
      return res.rows.map((r) => ({
        id: r.id,
        patientName: r.patient_name,
        patientEmail: r.patient_email,
        patientPhone: r.patient_phone,
        doctorId: r.doctor_id,
        doctorName: r.doctor_name,
        specialtyId: r.specialty_id,
        specialtyName: r.specialty_name,
        date: r.appointment_date,
        time: r.appointment_time,
        notes: r.notes,
        createdAt: r.created_at,
        status: r.status,
      }));
    }
  } catch {
    // fallback
  }
  return global.__mediconnect_appointments || [];
}
