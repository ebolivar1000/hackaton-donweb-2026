import { NextRequest, NextResponse } from "next/server";
import { orchestrateMessage } from "@/lib/orchestrator";
import { getAgents } from "@/lib/agents";

export async function GET() {
  const agents = await getAgents();
  return NextResponse.json({
    service: "MediConnect Orquestador de Agentes",
    status: "online",
    activeAgentsCount: agents.filter((a) => a.active).length,
    totalAgentsCount: agents.length,
    agents: agents.map((a) => ({
      id: a.id,
      name: a.name,
      active: a.active,
      provider: a.provider,
      model: a.model,
    })),
  });
}

export async function POST(req: NextRequest) {
  try {
    const { message, history } = await req.json();

    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "Mensaje requerido" }, { status: 400 });
    }

    const result = await orchestrateMessage(message, history || []);

    return NextResponse.json({
      reply: result.reply,
      agentId: result.agentId,
      agentName: result.agentName,
      provider: result.provider,
      latencyMs: result.latencyMs,
      routedIntent: result.routedIntent,
    });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
