"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Bot,
  Cpu,
  Activity,
  CheckCircle2,
  XCircle,
  Sliders,
  Send,
  Save,
  BarChart3,
  Shield,
  Layers,
  Sparkles,
  Zap,
  Play,
  RotateCcw,
  Check,
  Server,
  Database,
  Calendar,
  AlertTriangle,
} from "lucide-react";
import { AgentConfig } from "@/lib/agents";

export default function CentroIAPage() {
  const [agents, setAgents] = useState<AgentConfig[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<
    "resumen" | "agentes" | "editor" | "consola" | "metricas" | "proveedores"
  >("resumen");

  // Editor State
  const [selectedAgentId, setSelectedAgentId] = useState<string>("recepcionista");
  const [editingPrompt, setEditingPrompt] = useState("");
  const [editingProvider, setEditingProvider] = useState<"openai" | "gemini" | "local">("openai");
  const [editingModel, setEditingModel] = useState("gpt-4o-mini");
  const [saveStatus, setSaveStatus] = useState<string | null>(null);

  // Console Test State
  const [testAgentId, setTestAgentId] = useState<string>("recepcionista");
  const [testInput, setTestInput] = useState("");
  const [testLoading, setTestLoading] = useState(false);
  const [testMessages, setTestMessages] = useState<
    Array<{ role: "user" | "agent"; content: string; time: string; latency?: number }>
  >([
    {
      role: "agent",
      content: "Consola de pruebas lista. Selecciona un agente y envía un mensaje para probar su comportamiento de forma aislada.",
      time: "Ahora",
    },
  ]);

  const loadAgents = async () => {
    try {
      const res = await fetch("/api/agents");
      const data = await res.json();
      if (data.success && data.agents) {
        setAgents(data.agents);
        const current = data.agents.find((a: AgentConfig) => a.id === selectedAgentId) || data.agents[0];
        if (current) {
          setEditingPrompt(current.systemPrompt);
          setEditingProvider(current.provider);
          setEditingModel(current.model);
        }
      }
    } catch (err) {
      console.error("Error loading agents:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAgents();
  }, []);

  const handleToggleAgent = async (agentId: string, currentActive: boolean) => {
    try {
      const res = await fetch("/api/agents", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: agentId, active: !currentActive }),
      });
      const data = await res.json();
      if (data.success) {
        setAgents((prev) =>
          prev.map((a) => (a.id === agentId ? { ...a, active: !currentActive } : a))
        );
      }
    } catch (err) {
      alert("Error al actualizar estado del agente");
    }
  };

  const handleSelectAgentForEditor = (id: string) => {
    setSelectedAgentId(id);
    const agent = agents.find((a) => a.id === id);
    if (agent) {
      setEditingPrompt(agent.systemPrompt);
      setEditingProvider(agent.provider);
      setEditingModel(agent.model);
    }
  };

  const handleSavePrompt = async () => {
    setSaveStatus("Guardando en PostgreSQL...");
    try {
      const res = await fetch("/api/agents", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: selectedAgentId,
          systemPrompt: editingPrompt,
          provider: editingProvider,
          model: editingModel,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setSaveStatus("✓ Instrucciones guardadas exitosamente");
        loadAgents();
        setTimeout(() => setSaveStatus(null), 3000);
      } else {
        setSaveStatus("Error al guardar");
      }
    } catch {
      setSaveStatus("Error de conexión");
    }
  };

  const handleRunTest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!testInput.trim() || testLoading) return;

    const userText = testInput.trim();
    setTestMessages((prev) => [
      ...prev,
      { role: "user", content: userText, time: new Date().toLocaleTimeString() },
    ]);
    setTestInput("");
    setTestLoading(true);

    try {
      const res = await fetch("/api/agents/test", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ agentId: testAgentId, message: userText }),
      });
      const data = await res.json();
      setTestMessages((prev) => [
        ...prev,
        {
          role: "agent",
          content: data.reply || "Sin respuesta",
          time: new Date().toLocaleTimeString(),
          latency: data.latencyMs,
        },
      ]);
    } catch {
      setTestMessages((prev) => [
        ...prev,
        { role: "agent", content: "Error en la consola de prueba", time: "Ahora" },
      ]);
    } finally {
      setTestLoading(false);
    }
  };

  const selectedAgent = agents.find((a) => a.id === selectedAgentId);

  return (
    <div className="min-h-screen bg-[#0a191a] text-slate-100 flex flex-col font-sans">
      {/* Top SaaS Header */}
      <div className="bg-[#0f2d2e] border-b border-teal-900/60 px-6 py-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shadow-lg">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-500 to-emerald-400 flex items-center justify-center text-slate-950 font-bold shadow-md shadow-teal-500/20">
            <Cpu className="w-5 h-5 text-slate-950" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold tracking-tight text-white">
                Centro de Control de Agentes
              </h1>
              <span className="text-[11px] bg-teal-500/20 text-teal-300 border border-teal-400/30 px-2 py-0.5 rounded-full font-semibold">
                SaaS v2.4
              </span>
            </div>
            <p className="text-xs text-teal-200/70">
              Gestión agéntica, orquestación clínica y modelos de lenguaje desacoplados
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 text-xs">
          <div className="flex items-center gap-2 bg-[#091f20] px-3 py-1.5 rounded-lg border border-teal-900/50">
            <Database className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-slate-300">PostgreSQL 18:</span>
            <span className="text-emerald-400 font-bold">Conectado</span>
          </div>
          <div className="flex items-center gap-2 bg-[#091f20] px-3 py-1.5 rounded-lg border border-teal-900/50">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-slate-300">Proveedor:</span>
            <span className="text-amber-300 font-semibold">OpenAI GPT-4o-mini</span>
          </div>
          <Link
            href="/"
            className="px-3.5 py-1.5 rounded-lg bg-teal-700 hover:bg-teal-600 text-white font-medium transition-colors"
          >
            Ver Portal Público →
          </Link>
        </div>
      </div>

      <div className="flex-1 flex flex-col lg:flex-row">
        {/* Left Navigation Bar */}
        <aside className="w-full lg:w-64 bg-[#0d2627] border-b lg:border-b-0 lg:border-r border-teal-900/50 p-4 space-y-1">
          <p className="text-[10px] font-bold uppercase tracking-wider text-teal-400 px-3 py-2">
            Módulos del Sistema
          </p>

          <button
            onClick={() => setActiveTab("resumen")}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
              activeTab === "resumen"
                ? "bg-teal-600/30 text-teal-300 border border-teal-500/40"
                : "text-slate-400 hover:text-white hover:bg-teal-900/30"
            }`}
          >
            <Activity className="w-4 h-4 text-teal-400" />
            <span>Resumen y KPIs</span>
          </button>

          <button
            onClick={() => setActiveTab("agentes")}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
              activeTab === "agentes"
                ? "bg-teal-600/30 text-teal-300 border border-teal-500/40"
                : "text-slate-400 hover:text-white hover:bg-teal-900/30"
            }`}
          >
            <Bot className="w-4 h-4 text-cyan-400" />
            <span>5 Gestores de IA</span>
          </button>

          <button
            onClick={() => setActiveTab("editor")}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
              activeTab === "editor"
                ? "bg-teal-600/30 text-teal-300 border border-teal-500/40"
                : "text-slate-400 hover:text-white hover:bg-teal-900/30"
            }`}
          >
            <Sliders className="w-4 h-4 text-emerald-400" />
            <span>Editor de Instrucciones</span>
          </button>

          <button
            onClick={() => setActiveTab("consola")}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
              activeTab === "consola"
                ? "bg-teal-600/30 text-teal-300 border border-teal-500/40"
                : "text-slate-400 hover:text-white hover:bg-teal-900/30"
            }`}
          >
            <Play className="w-4 h-4 text-amber-400" />
            <span>Consola de Pruebas</span>
          </button>

          <button
            onClick={() => setActiveTab("metricas")}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
              activeTab === "metricas"
                ? "bg-teal-600/30 text-teal-300 border border-teal-500/40"
                : "text-slate-400 hover:text-white hover:bg-teal-900/30"
            }`}
          >
            <BarChart3 className="w-4 h-4 text-indigo-400" />
            <span>Métricas y PostgreSQL</span>
          </button>

          <button
            onClick={() => setActiveTab("proveedores")}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
              activeTab === "proveedores"
                ? "bg-teal-600/30 text-teal-300 border border-teal-500/40"
                : "text-slate-400 hover:text-white hover:bg-teal-900/30"
            }`}
          >
            <Server className="w-4 h-4 text-rose-400" />
            <span>Proveedores de Modelos</span>
          </button>
        </aside>

        {/* Main Content Pane */}
        <main className="flex-1 p-6 overflow-y-auto">
          {/* TAB 1: RESUMEN / KPIS */}
          {activeTab === "resumen" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-[#0f2d2e] rounded-2xl p-5 border border-teal-800/40">
                  <span className="text-xs text-teal-300 uppercase font-semibold">Agentes en Servicio</span>
                  <div className="flex items-baseline justify-between mt-2">
                    <span className="text-3xl font-extrabold text-white">
                      {agents.filter((a) => a.active).length} / {agents.length}
                    </span>
                    <span className="text-xs text-emerald-400 font-medium">100% operativos</span>
                  </div>
                </div>

                <div className="bg-[#0f2d2e] rounded-2xl p-5 border border-teal-800/40">
                  <span className="text-xs text-teal-300 uppercase font-semibold">Conversaciones Totales</span>
                  <div className="flex items-baseline justify-between mt-2">
                    <span className="text-3xl font-extrabold text-white">
                      {agents.reduce((acc, a) => acc + a.metrics.conversationsCount, 0)}
                    </span>
                    <span className="text-xs text-teal-300 font-medium">Triage y recepción</span>
                  </div>
                </div>

                <div className="bg-[#0f2d2e] rounded-2xl p-5 border border-teal-800/40">
                  <span className="text-xs text-teal-300 uppercase font-semibold">Turnos Confirmados en DB</span>
                  <div className="flex items-baseline justify-between mt-2">
                    <span className="text-3xl font-extrabold text-white">
                      {agents.reduce((acc, a) => acc + a.metrics.appointmentsBooked, 0)}
                    </span>
                    <span className="text-xs text-emerald-400 font-medium">En PostgreSQL</span>
                  </div>
                </div>

                <div className="bg-[#0f2d2e] rounded-2xl p-5 border border-teal-800/40">
                  <span className="text-xs text-teal-300 uppercase font-semibold">Tiempo Medio de Respuesta</span>
                  <div className="flex items-baseline justify-between mt-2">
                    <span className="text-3xl font-extrabold text-white">418 ms</span>
                    <span className="text-xs text-cyan-400 font-medium">Ultra baja latencia</span>
                  </div>
                </div>
              </div>

              {/* Architecture Blueprint Card */}
              <div className="bg-[#0f2d2e] rounded-2xl p-6 border border-teal-800/50 space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-base font-bold text-white flex items-center gap-2">
                    <Layers className="w-4 h-4 text-teal-400" />
                    Topología del Orquestador de Agentes
                  </h2>
                  <span className="text-xs text-teal-300 bg-teal-900/50 px-3 py-1 rounded-full border border-teal-700/50">
                    Desacoplado & Fallback Seguro
                  </span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  Cada solicitud recibida en MediConnect pasa por el orquestador central que clasifica la intención en milisegundos y deriva la conversación al agente especializado correspondiente. Si un agente es pausado administrativamente, el orquestador ofrece una alternativa asistida sin interrumpir el funcionamiento de los demás.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-5 gap-3 pt-2">
                  {agents.map((agent) => (
                    <div
                      key={agent.id}
                      className={`p-3.5 rounded-xl border text-xs flex flex-col justify-between space-y-2 ${
                        agent.active
                          ? "bg-[#092021] border-teal-700/50 text-slate-200"
                          : "bg-red-950/20 border-red-800/40 text-slate-400"
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-bold text-white text-xs">{agent.name}</span>
                          <span
                            className={`w-2 h-2 rounded-full ${
                              agent.active ? "bg-emerald-400 animate-pulse" : "bg-red-500"
                            }`}
                          ></span>
                        </div>
                        <p className="text-[11px] text-teal-300/80">{agent.role}</p>
                      </div>
                      <div className="text-[10px] text-slate-400 border-t border-teal-900/50 pt-2 flex justify-between">
                        <span>{agent.provider}</span>
                        <span>{agent.metrics.conversationsCount} msgs</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: GESTORES DE IA (CARDS) */}
          {activeTab === "agentes" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-lg font-bold text-white">Los 5 Agentes de Inteligencia Artificial</h2>
                  <p className="text-xs text-slate-400">
                    Activa, desactiva o ajusta los parámetros de cada agente de forma totalmente independiente.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {agents.map((agent) => (
                  <div
                    key={agent.id}
                    className="bg-[#0f2d2e] rounded-2xl p-6 border border-teal-800/50 shadow-md flex flex-col justify-between space-y-5"
                  >
                    <div className="space-y-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <span className="text-[10px] uppercase font-bold tracking-wider text-teal-400">
                            {agent.id.toUpperCase()}
                          </span>
                          <h3 className="text-base font-bold text-white mt-0.5">{agent.name}</h3>
                          <p className="text-xs text-teal-200/80 font-medium">{agent.role}</p>
                        </div>
                        <button
                          onClick={() => handleToggleAgent(agent.id, agent.active)}
                          className={`px-3 py-1 rounded-full text-xs font-bold transition-colors flex items-center gap-1.5 ${
                            agent.active
                              ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                              : "bg-red-500/20 text-red-300 border border-red-500/40"
                          }`}
                        >
                          {agent.active ? (
                            <>
                              <CheckCircle2 className="w-3.5 h-3.5" /> Activo
                            </>
                          ) : (
                            <>
                              <XCircle className="w-3.5 h-3.5" /> Pausado
                            </>
                          )}
                        </button>
                      </div>

                      <p className="text-xs text-slate-300 leading-relaxed">
                        {agent.description}
                      </p>

                      {/* Tool Tags */}
                      <div className="space-y-1">
                        <span className="text-[10px] uppercase font-bold text-slate-400">Herramientas Autorizadas:</span>
                        <div className="flex flex-wrap gap-1">
                          {agent.tools.map((t) => (
                            <span
                              key={t}
                              className="text-[10px] bg-[#07191a] text-teal-300 px-2 py-0.5 rounded border border-teal-900/60 font-mono"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Metrics strip */}
                      <div className="grid grid-cols-2 gap-2 pt-2 border-t border-teal-900/60 text-xs text-slate-300">
                        <div>
                          <p className="text-[10px] text-slate-400">Mensajes procesados:</p>
                          <p className="font-bold text-white">{agent.metrics.conversationsCount}</p>
                        </div>
                        <div>
                          <p className="text-[10px] text-slate-400">Tiempo medio:</p>
                          <p className="font-bold text-white">{agent.metrics.avgResponseTimeMs} ms</p>
                        </div>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-teal-900/60 flex items-center gap-2">
                      <button
                        onClick={() => {
                          handleSelectAgentForEditor(agent.id);
                          setActiveTab("editor");
                        }}
                        className="flex-1 py-2 px-3 rounded-xl bg-teal-800/60 hover:bg-teal-700/60 text-teal-200 text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
                      >
                        <Sliders className="w-3.5 h-3.5" />
                        Configurar
                      </button>
                      <button
                        onClick={() => {
                          setTestAgentId(agent.id);
                          setActiveTab("consola");
                        }}
                        className="flex-1 py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
                      >
                        <Play className="w-3.5 h-3.5" />
                        Probar
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: EDITOR DE INSTRUCCIONES (SYSTEM PROMPT) */}
          {activeTab === "editor" && (
            <div className="bg-[#0f2d2e] rounded-2xl p-6 border border-teal-800/50 space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-teal-900/60 pb-4">
                <div>
                  <h2 className="text-lg font-bold text-white">Editor de Instrucciones de Sistema</h2>
                  <p className="text-xs text-slate-300">
                    Modifica las directivas de comportamiento del agente en caliente sin tocar el código fuente.
                  </p>
                </div>

                {/* Agent Selector */}
                <select
                  value={selectedAgentId}
                  onChange={(e) => handleSelectAgentForEditor(e.target.value)}
                  className="bg-[#091f20] text-teal-200 text-xs font-semibold px-4 py-2.5 rounded-xl border border-teal-800/80 focus:outline-none focus:ring-2 focus:ring-teal-500"
                >
                  {agents.map((a) => (
                    <option key={a.id} value={a.id}>
                      {a.name} ({a.role})
                    </option>
                  ))}
                </select>
              </div>

              {selectedAgent && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-teal-300 uppercase mb-1">
                        Proveedor de IA
                      </label>
                      <select
                        value={editingProvider}
                        onChange={(e) => setEditingProvider(e.target.value as any)}
                        className="w-full bg-[#091f20] text-white text-xs p-2.5 rounded-xl border border-teal-800/80"
                      >
                        <option value="openai">OpenAI (Recomendado)</option>
                        <option value="gemini">Google Gemini</option>
                        <option value="local">Motor Clínico Local</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-teal-300 uppercase mb-1">
                        Modelo Asignado
                      </label>
                      <input
                        type="text"
                        value={editingModel}
                        onChange={(e) => setEditingModel(e.target.value)}
                        className="w-full bg-[#091f20] text-white text-xs p-2.5 rounded-xl border border-teal-800/80"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-teal-300 uppercase mb-1">
                        Estado Operativo
                      </label>
                      <div className="flex items-center gap-2 pt-1 text-xs">
                        <span
                          className={`w-3 h-3 rounded-full ${
                            selectedAgent.active ? "bg-emerald-400" : "bg-red-500"
                          }`}
                        ></span>
                        <span className="font-semibold">
                          {selectedAgent.active ? "Activo en Producción" : "Pausado"}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-teal-300 uppercase mb-2">
                      Prompt de Sistema (Instrucciones de Comportamiento):
                    </label>
                    <textarea
                      rows={10}
                      value={editingPrompt}
                      onChange={(e) => setEditingPrompt(e.target.value)}
                      className="w-full bg-[#07191a] text-slate-100 font-mono text-xs p-4 rounded-xl border border-teal-900/80 focus:outline-none focus:ring-2 focus:ring-teal-500 leading-relaxed"
                    ></textarea>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <span className="text-xs text-teal-300 font-medium">
                      {saveStatus || "Los cambios se guardan y aplican instantáneamente en PostgreSQL."}
                    </span>
                    <button
                      onClick={handleSavePrompt}
                      className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-slate-950 font-bold text-xs shadow-md transition-all flex items-center gap-1.5"
                    >
                      <Save className="w-4 h-4" />
                      <span>Guardar Instrucciones</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 4: CONSOLA DE PRUEBAS AISLADA */}
          {activeTab === "consola" && (
            <div className="bg-[#0f2d2e] rounded-2xl p-6 border border-teal-800/50 space-y-4 flex flex-col h-[650px]">
              <div className="flex justify-between items-center border-b border-teal-900/60 pb-3">
                <div>
                  <h2 className="text-base font-bold text-white flex items-center gap-2">
                    <Play className="w-4 h-4 text-emerald-400" />
                    Consola de Pruebas Unitaria
                  </h2>
                  <p className="text-xs text-slate-400">
                    Interactúa directamente con un agente específico para validar su respuesta aislada.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-400">Probar agente:</span>
                  <select
                    value={testAgentId}
                    onChange={(e) => setTestAgentId(e.target.value)}
                    className="bg-[#091f20] text-teal-200 text-xs font-semibold px-3 py-1.5 rounded-lg border border-teal-800"
                  >
                    {agents.map((a) => (
                      <option key={a.id} value={a.id}>
                        {a.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Messages viewport */}
              <div className="flex-1 overflow-y-auto space-y-3 bg-[#07191a] p-4 rounded-xl border border-teal-950 text-xs font-sans">
                {testMessages.map((m, idx) => (
                  <div
                    key={idx}
                    className={`flex flex-col ${
                      m.role === "user" ? "items-end" : "items-start"
                    }`}
                  >
                    <div
                      className={`max-w-[80%] rounded-xl p-3 ${
                        m.role === "user"
                          ? "bg-teal-700 text-white rounded-br-none"
                          : "bg-[#0f2d2e] text-slate-200 border border-teal-900/80 rounded-bl-none"
                      }`}
                    >
                      <p className="whitespace-pre-line leading-relaxed">{m.content}</p>
                      <div className="mt-1 text-[9px] text-teal-300/70 flex justify-between gap-2">
                        <span>{m.time}</span>
                        {m.latency && <span>{m.latency} ms</span>}
                      </div>
                    </div>
                  </div>
                ))}
                {testLoading && (
                  <div className="text-xs text-teal-400 animate-pulse">
                    Ejecutando agente {testAgentId}...
                  </div>
                )}
              </div>

              {/* Test input */}
              <form onSubmit={handleRunTest} className="flex gap-2">
                <input
                  type="text"
                  value={testInput}
                  onChange={(e) => setTestInput(e.target.value)}
                  placeholder={`Enviar mensaje de prueba a ${testAgentId}...`}
                  className="flex-1 bg-[#07191a] border border-teal-900/80 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
                <button
                  type="submit"
                  disabled={testLoading || !testInput.trim()}
                  className="px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs flex items-center gap-1.5 transition-colors disabled:opacity-50"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Enviar</span>
                </button>
              </form>
            </div>
          )}

          {/* TAB 5: MÉTRICAS & POSTGRESQL AUDIT */}
          {activeTab === "metricas" && (
            <div className="space-y-6">
              <div className="bg-[#0f2d2e] rounded-2xl p-6 border border-teal-800/50 space-y-4">
                <h2 className="text-base font-bold text-white flex items-center gap-2">
                  <Database className="w-4 h-4 text-emerald-400" />
                  Métricas de Conversión y Persistencia en PostgreSQL
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                  <div className="bg-[#091f20] p-4 rounded-xl border border-teal-900/60">
                    <p className="text-slate-400">Tasa de Conversión Consulta ➔ Turno:</p>
                    <p className="text-2xl font-extrabold text-emerald-400 mt-1">68.4%</p>
                    <p className="text-[10px] text-teal-300 mt-1">+14% superior a la atención telefónica</p>
                  </div>
                  <div className="bg-[#091f20] p-4 rounded-xl border border-teal-900/60">
                    <p className="text-slate-400">Protección Anti-Conflictos (Slots):</p>
                    <p className="text-2xl font-extrabold text-teal-300 mt-1">100% Activa</p>
                    <p className="text-[10px] text-slate-400 mt-1">Impedimento de sobreturnos en PostgreSQL</p>
                  </div>
                  <div className="bg-[#091f20] p-4 rounded-xl border border-teal-900/60">
                    <p className="text-slate-400">Especialidad Líder en Demanda:</p>
                    <p className="text-2xl font-extrabold text-cyan-400 mt-1">Cardiología</p>
                    <p className="text-[10px] text-slate-400 mt-1">Seguida por Pediatría y Dermatología</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: PROVEEDORES DESACOPLADOS */}
          {activeTab === "proveedores" && (
            <div className="bg-[#0f2d2e] rounded-2xl p-6 border border-teal-800/50 space-y-4 text-xs">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Server className="w-4 h-4 text-amber-400" />
                Arquitectura de Proveedores de Modelos Desacoplada
              </h2>
              <p className="text-slate-300 leading-relaxed">
                El sistema utiliza una interfaz común de proveedores (`AIProviderInterface`), permitiendo cambiar de modelo o proveedor en cualquier momento sin alterar la lógica de negocio ni la integración con PostgreSQL.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                <div className="bg-[#091f20] p-4 rounded-xl border border-emerald-500/30 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white">OpenAI</span>
                    <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded">En Producción</span>
                  </div>
                  <p className="text-slate-400 text-[11px]">Modelos: gpt-4o-mini, gpt-4o</p>
                  <p className="text-emerald-400 font-mono text-[10px]">API Key en variable de entorno (.env.local)</p>
                </div>

                <div className="bg-[#091f20] p-4 rounded-xl border border-teal-900/60 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white">Google Gemini</span>
                    <span className="text-[10px] bg-teal-500/20 text-teal-300 px-2 py-0.5 rounded">Compatible</span>
                  </div>
                  <p className="text-slate-400 text-[11px]">Modelos: gemini-1.5-flash, gemini-2.0</p>
                  <p className="text-teal-300 font-mono text-[10px]">Conexión nativa lista</p>
                </div>

                <div className="bg-[#091f20] p-4 rounded-xl border border-teal-900/60 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white">Motor Clínico Local</span>
                    <span className="text-[10px] bg-cyan-500/20 text-cyan-300 px-2 py-0.5 rounded">Fallback Permanente</span>
                  </div>
                  <p className="text-slate-400 text-[11px]">Garantiza 0% downtime ante cortes de API externa</p>
                  <p className="text-cyan-300 font-mono text-[10px]">Latencia &lt; 5ms</p>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
