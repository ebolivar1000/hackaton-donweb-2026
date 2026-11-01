import { getDbPool } from "./db";

export interface AgentMetric {
  conversationsCount: number;
  appointmentsBooked: number;
  avgResponseTimeMs: number;
  errorRatePercent: number;
  lastExecutedAt: string;
}

export interface AgentConfig {
  id: string;
  name: string;
  role: string;
  description: string;
  active: boolean;
  provider: "openai" | "gemini" | "local";
  model: string;
  systemPrompt: string;
  tools: string[];
  permissions: {
    read: string[];
    write: string[];
  };
  metrics: AgentMetric;
  historyChanges: Array<{ date: string; user: string; note: string }>;
}

export const DEFAULT_AGENTS: AgentConfig[] = [
  {
    id: "recepcionista",
    name: "Recepcionista Virtual",
    role: "Atención administrativa y derivación",
    description: "Responde consultas sobre ubicación, horarios, coberturas médicas, aranceles y deriva al agente adecuado.",
    active: true,
    provider: "openai",
    model: "gpt-4o-mini",
    tools: ["consultar_info_clinica", "consultar_coberturas", "derivar_agente"],
    permissions: {
      read: ["info_clinica", "horarios", "faq"],
      write: []
    },
    metrics: {
      conversationsCount: 142,
      appointmentsBooked: 0,
      avgResponseTimeMs: 420,
      errorRatePercent: 0.2,
      lastExecutedAt: "Hace 2 minutos"
    },
    historyChanges: [
      { date: "01/11/2026", user: "Admin", note: "Inicialización del agente" }
    ],
    systemPrompt: `Eres la Recepcionista Virtual de MediConnect. Tu función es dar una cálida bienvenida a los pacientes, responder dudas sobre la ubicación en Av. Santa Fe 2450 (CABA), horarios de atención (Lun a Vie 08 a 20hs, Sáb 09 a 14hs, Guardia 24hs), obras sociales y prepagas con reintegro, y derivar al Gestor de Turnos o al Orientador según corresponda. Mantén siempre un tono educado, formal y empático.`
  },
  {
    id: "turnos",
    name: "Gestor de Turnos",
    role: "Agenda, confirmación y disponibilidad real",
    description: "Consulta disponibilidad médica en PostgreSQL, agenda turnos evitando duplicidades y gestiona cancelaciones.",
    active: true,
    provider: "openai",
    model: "gpt-4o-mini",
    tools: ["buscar_disponibilidad", "crear_reserva_postgresql", "validar_conflicto_horario", "cancelar_turno"],
    permissions: {
      read: ["citas_postgresql", "agenda_medica"],
      write: ["citas_postgresql"]
    },
    metrics: {
      conversationsCount: 98,
      appointmentsBooked: 74,
      avgResponseTimeMs: 510,
      errorRatePercent: 0.0,
      lastExecutedAt: "Hace 5 minutos"
    },
    historyChanges: [
      { date: "01/11/2026", user: "Admin", note: "Activación de validación de conflictos en PostgreSQL" }
    ],
    systemPrompt: `Eres el Gestor de Turnos de MediConnect. Tienes acceso exclusivo a las operaciones de reserva en PostgreSQL. Ayudas al paciente a buscar horarios disponibles para el doctor solicitado, verificas que no haya superposición con otros pacientes en el mismo horario, confirmas únicamente operaciones guardadas en base de datos y entregas el código de turno MED-XXXXXX.`
  },
  {
    id: "orientador",
    name: "Orientador de Especialidades",
    role: "Triage sintomático y detección de urgencias",
    description: "Escucha el motivo de consulta y sugiere la especialidad médica adecuada. Identifica emergencias (107/Guardia).",
    active: true,
    provider: "openai",
    model: "gpt-4o-mini",
    tools: ["analizar_sintomas", "alertar_emergencia_107", "recomendar_especialistas"],
    permissions: {
      read: ["catalogo_especialidades", "cuerpo_medico"],
      write: []
    },
    metrics: {
      conversationsCount: 168,
      appointmentsBooked: 52,
      avgResponseTimeMs: 380,
      errorRatePercent: 0.1,
      lastExecutedAt: "Hace 1 minuto"
    },
    historyChanges: [
      { date: "01/11/2026", user: "Admin", note: "Protocolo de emergencias SAM y código rojo activado" }
    ],
    systemPrompt: `Eres el Orientador de Especialidades de MediConnect. Ayudas a los pacientes a identificar qué especialista de las 12 ramas médicas necesitan según sus síntomas. REGLA CRÍTICA: Si el paciente describe síntomas de alarma vital (dolor opresivo de pecho, asfixia súbita, convulsiones o parálisis), no ofrezcas un turno ordinario; ordena acudir inmediatamente a la Guardia 24hs o llamar al 107 (SAME). Recuerda que no prescribes medicamentos ni sustituyes el examen médico presencial.`
  },
  {
    id: "seguimiento",
    name: "Seguimiento y Recuperación",
    role: "Recordatorios y recuperación de consultas",
    description: "Identifica pacientes con reservas pendientes o incompletas y genera recordatorios preventivos respetando el consentimiento.",
    active: true,
    provider: "openai",
    model: "gpt-4o-mini",
    tools: ["identificar_turnos_incompletos", "preparar_recordatorio_paciente"],
    permissions: {
      read: ["historial_consultas", "metricas_turnos"],
      write: ["cola_recordatorios"]
    },
    metrics: {
      conversationsCount: 36,
      appointmentsBooked: 18,
      avgResponseTimeMs: 460,
      errorRatePercent: 0.0,
      lastExecutedAt: "Hace 14 minutos"
    },
    historyChanges: [
      { date: "01/11/2026", user: "Admin", note: "Configuración de política de privacidad de datos médicos" }
    ],
    systemPrompt: `Eres el Agente de Seguimiento y Recuperación de MediConnect. Tu misión es asistir a pacientes que iniciaron una consulta o reserva y no la finalizaron, ofreciendo resolver sus dudas y facilitando el enlace de confirmación. Todo mensaje debe ser respetuoso, no invasivo y garantizar el consentimiento previo del paciente.`
  },
  {
    id: "analista",
    name: "Analista Administrativo",
    role: "Métricas de demanda y analítica operativa",
    description: "Analiza volumen de consultas, especialidades con mayor demanda, horarios pico y tasas de conversión reales.",
    active: true,
    provider: "openai",
    model: "gpt-4o-mini",
    tools: ["calcular_metricas_demanda", "generar_reporte_conversion", "auditar_actividad_agentes"],
    permissions: {
      read: ["estadisticas_generales", "citas_postgresql", "logs_consultas"],
      write: []
    },
    metrics: {
      conversationsCount: 45,
      appointmentsBooked: 0,
      avgResponseTimeMs: 310,
      errorRatePercent: 0.0,
      lastExecutedAt: "Hace 8 minutos"
    },
    historyChanges: [
      { date: "01/11/2026", user: "Admin", note: "Dashboard de conversión habilitado" }
    ],
    systemPrompt: `Eres el Analista Administrativo de MediConnect. Proporcionas información ejecutiva a los directores médicos y administradores de la clínica: porcentaje de turnos confirmados, ranking de especialidades más requeridas (Cardiología, Pediatría y Dermatología a la cabeza), horarios de mayor afluencia y rendimiento de los agentes virtuales.`
  }
];

declare global {
  // eslint-disable-next-line no-var
  var __mediconnect_agents: AgentConfig[] | undefined;
}

if (!global.__mediconnect_agents) {
  global.__mediconnect_agents = JSON.parse(JSON.stringify(DEFAULT_AGENTS));
}

// In-database table setup & loader
export async function getAgents(): Promise<AgentConfig[]> {
  try {
    const db = getDbPool();
    await db.query(`
      CREATE TABLE IF NOT EXISTS ai_agents (
        id VARCHAR(50) PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        role VARCHAR(150) NOT NULL,
        description TEXT NOT NULL,
        active BOOLEAN DEFAULT TRUE,
        provider VARCHAR(50) DEFAULT 'openai',
        model VARCHAR(50) DEFAULT 'gpt-4o-mini',
        system_prompt TEXT NOT NULL,
        tools TEXT NOT NULL,
        permissions TEXT NOT NULL,
        metrics TEXT NOT NULL,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    const res = await db.query("SELECT * FROM ai_agents");
    if (res.rows && res.rows.length > 0) {
      const dbAgents: AgentConfig[] = res.rows.map((r) => ({
        id: r.id,
        name: r.name,
        role: r.role,
        description: r.description,
        active: r.active,
        provider: r.provider || "openai",
        model: r.model || "gpt-4o-mini",
        systemPrompt: r.system_prompt,
        tools: JSON.parse(r.tools || "[]"),
        permissions: JSON.parse(r.permissions || '{"read":[],"write":[]}'),
        metrics: JSON.parse(r.metrics || "{}"),
        historyChanges: [
          { date: "01/11/2026", user: "Admin", note: "Configuración persistida en PostgreSQL" }
        ]
      }));

      // Update in-memory copy
      global.__mediconnect_agents = dbAgents;
      return dbAgents;
    } else {
      // Seed default agents to PostgreSQL
      for (const a of DEFAULT_AGENTS) {
        await db.query(`
          INSERT INTO ai_agents (id, name, role, description, active, provider, model, system_prompt, tools, permissions, metrics)
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
          ON CONFLICT (id) DO NOTHING;
        `, [
          a.id,
          a.name,
          a.role,
          a.description,
          a.active,
          a.provider,
          a.model,
          a.systemPrompt,
          JSON.stringify(a.tools),
          JSON.stringify(a.permissions),
          JSON.stringify(a.metrics)
        ]);
      }
    }
  } catch (err) {
    console.warn("DB agents load warning (using in-memory store):", (err as Error).message);
  }

  return global.__mediconnect_agents || DEFAULT_AGENTS;
}

export async function updateAgent(
  id: string,
  updates: Partial<Pick<AgentConfig, "active" | "systemPrompt" | "provider" | "model">>
): Promise<AgentConfig | null> {
  const agents = await getAgents();
  const agent = agents.find((a) => a.id === id);
  if (!agent) return null;

  if (updates.active !== undefined) agent.active = updates.active;
  if (updates.systemPrompt !== undefined) agent.systemPrompt = updates.systemPrompt;
  if (updates.provider !== undefined) agent.provider = updates.provider;
  if (updates.model !== undefined) agent.model = updates.model;

  agent.historyChanges.unshift({
    date: new Date().toLocaleDateString("es-AR") + " " + new Date().toLocaleTimeString("es-AR", { hour: "2-digit", minute: "2-digit" }),
    user: "Admin",
    note: updates.systemPrompt ? "Instrucciones de sistema modificadas desde panel" : "Estado o modelo actualizado"
  });

  try {
    const db = getDbPool();
    await db.query(`
      UPDATE ai_agents
      SET active = $1, system_prompt = $2, provider = $3, model = $4, updated_at = CURRENT_TIMESTAMP
      WHERE id = $5;
    `, [agent.active, agent.systemPrompt, agent.provider, agent.model, agent.id]);
  } catch (err) {
    console.warn("Could not update agent in DB, updated memory store:", (err as Error).message);
  }

  return agent;
}

export async function recordAgentExecution(agentId: string, durationMs: number, success: boolean = true) {
  const agents = await getAgents();
  const agent = agents.find((a) => a.id === agentId);
  if (agent) {
    agent.metrics.conversationsCount += 1;
    agent.metrics.avgResponseTimeMs = Math.round((agent.metrics.avgResponseTimeMs * 4 + durationMs) / 5);
    agent.metrics.lastExecutedAt = "Hace unos segundos";
    if (!success) {
      agent.metrics.errorRatePercent = Number((agent.metrics.errorRatePercent + 0.1).toFixed(1));
    }
  }
}
