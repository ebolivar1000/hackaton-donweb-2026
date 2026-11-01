import { NextRequest, NextResponse } from "next/server";
import { getAgents, updateAgent } from "@/lib/agents";

export async function GET() {
  try {
    const agents = await getAgents();
    return NextResponse.json({
      success: true,
      count: agents.length,
      agents,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, active, systemPrompt, provider, model } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, error: "ID de agente requerido" },
        { status: 400 }
      );
    }

    const updated = await updateAgent(id, {
      active,
      systemPrompt,
      provider,
      model,
    });

    if (!updated) {
      return NextResponse.json(
        { success: false, error: "Agente no encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `Agente ${updated.name} actualizado exitosamente`,
      agent: updated,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}
