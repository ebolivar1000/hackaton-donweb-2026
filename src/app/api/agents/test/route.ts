import { NextRequest, NextResponse } from "next/server";
import { getAgents, recordAgentExecution } from "@/lib/agents";
import { SPECIALTIES, DOCTORS, CLINIC_INFO } from "@/lib/data";

export async function POST(req: NextRequest) {
  try {
    const { agentId, message } = await req.json();

    if (!agentId || !message) {
      return NextResponse.json(
        { success: false, error: "agentId y message son requeridos" },
        { status: 400 }
      );
    }

    const agents = await getAgents();
    const agent = agents.find((a) => a.id === agentId);

    if (!agent) {
      return NextResponse.json(
        { success: false, error: "Agente no encontrado" },
        { status: 404 }
      );
    }

    const startTime = Date.now();
    const aiKey = process.env.OPENAI_API_KEY || process.env.GEMINI_API_KEY || "";

    const systemContext = `
${agent.systemPrompt}

DATOS CLÍNICOS:
${CLINIC_INFO.name} - ${CLINIC_INFO.address}. Tel: ${CLINIC_INFO.phone}. Horarios: ${CLINIC_INFO.hours}.
Especialidades: ${SPECIALTIES.map((s) => s.name).join(", ")}.
Doctores: ${DOCTORS.map((d) => `${d.name} (${d.specialtyName})`).join(", ")}.
`;

    let reply = "";
    let providerUsed = "Motor Local de Pruebas";

    if (agent.provider === "openai" && aiKey.startsWith("sk-")) {
      try {
        const res = await fetch("https://api.openai.com/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${aiKey}`,
          },
          body: JSON.stringify({
            model: agent.model || "gpt-4o-mini",
            messages: [
              { role: "system", content: systemContext },
              { role: "user", content: message },
            ],
            temperature: 0.7,
            max_tokens: 500,
          }),
        });

        if (res.ok) {
          const data = await res.json();
          reply = data.choices?.[0]?.message?.content || "";
          providerUsed = `OpenAI ${agent.model} (Directo)`;
        }
      } catch (err) {
        console.warn("Direct test call failed:", err);
      }
    }

    if (!reply) {
      reply = `[Respuesta de Prueba de ${agent.name}]: He recibido tu mensaje: "${message}". Operando con ${agent.tools.length} herramientas autorizadas. Mis permisos: ${agent.permissions.read.join(", ")}.`;
    }

    const latency = Date.now() - startTime;
    await recordAgentExecution(agent.id, latency, true);

    return NextResponse.json({
      success: true,
      agentId: agent.id,
      agentName: agent.name,
      reply,
      provider: providerUsed,
      latencyMs: latency,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}
