import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { SPECIALTIES, DOCTORS, CLINIC_INFO } from "@/lib/data";

const SYSTEM_PROMPT = `
Eres "MediBot", el asistente médico inteligente oficial de ${CLINIC_INFO.name}.
Eslogan: "${CLINIC_INFO.tagline}".
Dirección: ${CLINIC_INFO.address}. Teléfono: ${CLINIC_INFO.phone}. WhatsApp: ${CLINIC_INFO.whatsapp}. Horarios: ${CLINIC_INFO.hours}.

Tus funciones son:
1. Orientar a los pacientes según los síntomas que describen, recomendando la especialidad médica más adecuada y explicando brevemente por qué.
2. Sugerir los médicos especialistas disponibles en MediConnect con sus días y horarios de atención.
3. Invitar al paciente a agendar su turno desde la sección "Turnos Online" o a través de este chat.
4. Responder dudas sobre coberturas, estudios, preparación médica y ubicación.
5. Si detectas síntomas de URGENCIA GRAVE (dolor opresivo en el pecho irradiado al brazo izquierdo, dificultad respiratoria extrema, pérdida de conocimiento, parálisis facial o debilidad repentina), debes advertir INMEDIATAMENTE llamar al 107 o acudir a la Guardia 24hs más cercana.

Especialidades disponibles (12):
${SPECIALTIES.map(
  (s) => `- ${s.name}: ${s.shortDesc}. Síntomas comunes: ${s.popularSymptoms.join(", ")}`
).join("\n")}

Médicos de nuestro equipo (24):
${DOCTORS.map(
  (d) =>
    `- ${d.name} (${d.specialtyName}, ${d.matricula}). Días: ${d.days.join(", ")}. Horario: ${d.hours}. Arancel: ${d.price}.`
).join("\n")}

Instrucciones de formato:
- Sé empático, cálido, profesional y muy claro.
- Usa viñetas para enumerar doctores y horarios.
- Responde siempre en español rioplatense o neutro profesional.
- No des diagnósticos definitivos; enfatiza que la consulta presencial o por telemedicina es indispensable.
`;

function intelligentMockTriage(userMessage: string) {
  const msg = userMessage.toLowerCase();

  // Emergencias
  if (
    msg.includes("infarto") ||
    (msg.includes("pecho") && (msg.includes("fuerte") || msg.includes("brazo") || msg.includes("opresion"))) ||
    msg.includes("acv") ||
    msg.includes("desmayo") ||
    msg.includes("no respira")
  ) {
    return `🚨 **¡ADVERTENCIA DE URGENCIA MÉDICA!**
Los síntomas que describes requieren atención inmediata. Por favor:
- Llama de inmediato al **107 (SAME)** o acude a la **Guardia de Emergencias 24hs** más cercana.
- Nuestra Guardia Médica Permanente está activa en **${CLINIC_INFO.address}**.
- Línea de urgencias: **${CLINIC_INFO.emergencyPhone}**.
*No te quedes esperando un turno programado.*`;
  }

  // Triage por síntomas
  const matches: { specialtyId: string; score: number }[] = [];

  SPECIALTIES.forEach((spec) => {
    let score = 0;
    if (msg.includes(spec.name.toLowerCase())) score += 5;
    spec.popularSymptoms.forEach((symp) => {
      const words = symp.toLowerCase().split(" ");
      words.forEach((w) => {
        if (w.length > 3 && msg.includes(w)) score += 2;
      });
    });
    if (score > 0) matches.push({ specialtyId: spec.id, score });
  });

  matches.sort((a, b) => b.score - a.score);

  if (matches.length > 0) {
    const topSpec = SPECIALTIES.find((s) => s.id === matches[0].specialtyId)!;
    const docs = DOCTORS.filter((d) => d.specialtyId === topSpec.id);

    return `👋 **Orientación médica inteligente MediConnect:**

Según los síntomas que mencionas, la especialidad recomendada es **${topSpec.name}**.
_${topSpec.shortDesc}_

👨‍⚕️👩‍⚕️ **Especialistas disponibles en nuestro centro:**
${docs
  .map(
    (d) =>
      `• **${d.name}** (${d.matricula})\n  📅 Días: ${d.days.join(", ")}\n  ⏰ Horario: ${d.hours}\n  ⭐ Calificación: ${d.rating}/5.0`
  )
  .join("\n\n")}

💡 **¿Cómo agendar?**
Puedes reservar tu turno ahora mismo en la pestaña **Turnos Online** o escribiéndonos directamente por WhatsApp al [${CLINIC_INFO.whatsapp}](${CLINIC_INFO.whatsappUrl}).`;
  }

  // Horarios o información general
  if (msg.includes("horario") || msg.includes("abierto") || msg.includes("atienden") || msg.includes("donde")) {
    return `🏥 **Información de atención MediConnect:**

📍 **Sede Central:** ${CLINIC_INFO.address}
⏰ **Horarios de Consultorios:** ${CLINIC_INFO.hours}
🚨 **Guardia Clínica y Pediátrica:** Abierta las 24 horas, los 365 días del año.
📞 **Central de Turnos:** ${CLINIC_INFO.phone}
📱 **WhatsApp:** ${CLINIC_INFO.whatsapp}

¿Te gustaría consultar por una especialidad o médico en particular?`;
  }

  // Respuesta general de bienvenida y orientación
  return `¡Hola! Soy **MediBot**, el asistente de atención médica de **${CLINIC_INFO.name}**. 🩺✨

Puedo ayudarte a resolver tus consultas de salud de forma inmediata:
1. **Contarme qué síntomas sientes** y te indicaré qué especialista debe atenderte.
2. **Consultar horarios y días** de cualquiera de nuestros 24 médicos.
3. **Agendar un turno médico** en menos de 1 minuto.

Contamos con 12 especialidades: *Cardiología, Dermatología, Pediatría, Traumatología, Ginecología, Neurología, Oftalmología, Gastroenterología, Urología, Otorrino, Psiquiatría y Endocrinología*.

¿En qué puedo ayudarte hoy?`;
}

export async function POST(req: NextRequest) {
  try {
    const { message, history } = await req.json();

    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "Mensaje requerido" }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (apiKey && apiKey.trim() !== "" && !apiKey.includes("your-gemini")) {
      try {
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({
          model: "gemini-1.5-flash",
          systemInstruction: SYSTEM_PROMPT,
        });

        // Format history for Gemini chat if present
        const chat = model.startChat({
          history: Array.isArray(history)
            ? history.slice(-6).map((h: { role: string; content: string }) => ({
                role: h.role === "assistant" ? "model" : "user",
                parts: [{ text: h.content }],
              }))
            : [],
        });

        const result = await chat.sendMessage(message);
        const text = result.response.text();

        return NextResponse.json({
          reply: text,
          provider: "Google Gemini 1.5 Flash (Live AI)",
        });
      } catch (geminiError) {
        console.warn("Gemini API call failed, falling back to local NLP triage:", geminiError);
      }
    }

    // Fallback NLP intelligent triage (always works, fast, zero latency)
    const reply = intelligentMockTriage(message);
    return NextResponse.json({
      reply,
      provider: "MediBot Triage Engine (Clínico)",
    });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
