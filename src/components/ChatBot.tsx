"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  X,
  Send,
  Bot,
  User,
  Calendar,
  Minimize2,
  Maximize2,
  RefreshCw,
  HeartHandshake,
} from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  time: string;
}

const QUICK_PROMPTS = [
  "Dolor en el pecho o palpitaciones",
  "Manchas o erupciones en la piel",
  "Pediatra disponible para mi hijo",
  "Dolor de rodilla o columna",
  "Horarios de atención de la clínica",
  "Quiero agendar un turno médico",
];

// Helper to render bold text without raw asterisks
function FormattedMessage({ text }: { text: string }) {
  const lines = text.split("\n");
  return (
    <div className="space-y-1.5 leading-relaxed text-sm">
      {lines.map((line, i) => {
        if (!line.trim()) return <div key={i} className="h-1" />;
        
        // Match bold **text**
        const parts = line.split(/(\*\*[^*]+\*\*)/g);
        return (
          <p key={i}>
            {parts.map((part, j) => {
              if (part.startsWith("**") && part.endsWith("**")) {
                return (
                  <strong key={j} className="font-bold text-slate-900">
                    {part.slice(2, -2)}
                  </strong>
                );
              }
              return part;
            })}
          </p>
        );
      })}
    </div>
  );
}

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome-1",
      role: "assistant",
      content:
        "¡Hola! Soy MediBot, el asistente de atención médica de MediConnect. 🩺\n\nPuedo orientarte según los síntomas que sientas, decirte qué doctores y horarios están disponibles o ayudarte a reservar un turno.\n\n¿Qué consulta o molestia tienes hoy?",
      time: "Ahora",
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = async (textToSend?: string) => {
    const text = textToSend || input;
    if (!text.trim() || loading) return;

    const userMsg: Message = {
      id: `u-${Date.now()}`,
      role: "user",
      content: text.trim(),
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text.trim(),
          history: messages.map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      const data = await res.json();
      const botMsg: Message = {
        id: `b-${Date.now()}`,
        role: "assistant",
        content: data.reply || "Lo siento, tuve un inconveniente al procesar tu consulta. Por favor intenta de nuevo.",
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch {
      const errorMsg: Message = {
        id: `err-${Date.now()}`,
        role: "assistant",
        content: "Ocurrió un error momentáneo en la consulta. Puedes comunicarte directamente al teléfono de la clínica o por WhatsApp.",
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setMessages([
      {
        id: `w-${Date.now()}`,
        role: "assistant",
        content: "Chat reiniciado. ¿En qué síntoma o consulta médica puedo ayudarte ahora?",
        time: "Ahora",
      },
    ]);
  };

  return (
    <aside aria-label="Asistente de Atención" className="fixed bottom-6 right-6 z-50">
      {/* Floating launcher badge */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="relative group flex items-center gap-3 px-5 py-3.5 rounded-full bg-gradient-to-r from-blue-600 via-teal-600 to-emerald-600 text-white font-semibold shadow-xl shadow-blue-500/30 hover:shadow-2xl hover:scale-105 transition-all transform duration-200"
          aria-label="Abrir Asistente MediBot"
        >
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 border-2 border-white"></span>
          </span>
          <Bot className="w-6 h-6 animate-pulse" />
          <div className="flex flex-col text-left">
            <span className="text-xs uppercase tracking-wider font-extrabold text-blue-100 flex items-center gap-1">
              <HeartHandshake className="w-3.5 h-3.5 text-cyan-300" /> MediBot
            </span>
            <span className="text-sm">Atención y Triage 24/7</span>
          </div>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div
          className={`flex flex-col bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden transition-all duration-300 ${
            isExpanded
              ? "w-[92vw] sm:w-[620px] h-[85vh] max-h-[780px]"
              : "w-[92vw] sm:w-[440px] h-[640px]"
          }`}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-700 via-blue-600 to-teal-600 text-white p-4 flex items-center justify-between shadow-sm">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center">
                  <Bot className="w-6 h-6 text-white" />
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 rounded-full border-2 border-blue-700"></span>
              </div>
              <div>
                <h3 className="font-bold text-base flex items-center gap-1.5 leading-tight">
                  MediBot
                  <span className="text-[10px] bg-emerald-500/30 border border-emerald-300/40 text-emerald-100 px-2 py-0.5 rounded-full font-medium">
                    En línea
                  </span>
                </h3>
                <p className="text-xs text-blue-100">
                  Orientación médica & asignación de turnos
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-1 text-blue-100">
              <button
                onClick={handleReset}
                className="p-1.5 hover:bg-white/10 rounded-lg transition-colors"
                title="Reiniciar conversación"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="p-1.5 hover:bg-white/10 rounded-lg transition-colors hidden sm:block"
                title={isExpanded ? "Reducir" : "Expandir"}
              >
                {isExpanded ? (
                  <Minimize2 className="w-4 h-4" />
                ) : (
                  <Maximize2 className="w-4 h-4" />
                )}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 hover:bg-white/10 rounded-lg transition-colors"
                title="Cerrar chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Messages list */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/70 text-sm">
            {messages.map((m) => {
              const isAssistant = m.role === "assistant";
              return (
                <div
                  key={m.id}
                  className={`flex items-start gap-2.5 ${
                    isAssistant ? "justify-start" : "justify-end"
                  }`}
                >
                  {isAssistant && (
                    <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-blue-600 to-teal-500 flex items-center justify-center text-white shrink-0 shadow-sm mt-0.5">
                      <Bot className="w-4 h-4" />
                    </div>
                  )}

                  <div
                    className={`max-w-[85%] rounded-2xl p-3.5 shadow-sm ${
                      isAssistant
                        ? "bg-white text-slate-800 border border-slate-200/80 rounded-tl-none"
                        : "bg-blue-600 text-white rounded-tr-none"
                    }`}
                  >
                    <FormattedMessage text={m.content} />

                    <div
                      className={`text-[10px] mt-2 flex items-center justify-between gap-2 ${
                        isAssistant ? "text-slate-400" : "text-blue-200"
                      }`}
                    >
                      <span>{m.time}</span>
                    </div>
                  </div>

                  {!isAssistant && (
                    <div className="w-7 h-7 rounded-lg bg-slate-700 flex items-center justify-center text-white shrink-0 shadow-sm mt-0.5">
                      <User className="w-4 h-4" />
                    </div>
                  )}
                </div>
              );
            })}

            {loading && (
              <div className="flex items-start gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-blue-600 to-teal-500 flex items-center justify-center text-white shrink-0 mt-0.5">
                  <Bot className="w-4 h-4 animate-spin" />
                </div>
                <div className="bg-white border border-slate-200 rounded-2xl rounded-tl-none p-3.5 shadow-sm">
                  <div className="flex items-center space-x-1.5">
                    <span className="w-2 h-2 rounded-full bg-blue-600 animate-bounce"></span>
                    <span className="w-2 h-2 rounded-full bg-teal-500 animate-bounce [animation-delay:0.2s]"></span>
                    <span className="w-2 h-2 rounded-full bg-blue-400 animate-bounce [animation-delay:0.4s]"></span>
                    <span className="text-xs text-slate-500 ml-2">Orientando consulta médica...</span>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick prompts chips - 6 options in 2 columns */}
          <div className="px-3.5 py-2.5 bg-slate-100/90 border-t border-slate-200/80">
            <p className="text-[10px] uppercase font-bold text-slate-400 mb-1.5 flex items-center gap-1">
              <span>Opciones rápidas de consulta:</span>
            </p>
            <div className="grid grid-cols-2 gap-1.5">
              {QUICK_PROMPTS.map((prompt) => (
                <button
                  key={prompt}
                  onClick={() => handleSend(prompt)}
                  disabled={loading}
                  className="px-2.5 py-2 rounded-xl bg-white text-slate-700 border border-slate-200 hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50/50 transition-colors shadow-2xs text-left text-[11px] leading-tight font-medium"
                >
                  • {prompt}
                </button>
              ))}
            </div>
          </div>

          {/* Quick schedule action bar */}
          <div className="bg-blue-50/80 px-4 py-1.5 border-t border-blue-100 flex items-center justify-between text-xs text-blue-900">
            <span className="flex items-center gap-1 font-medium">
              <Calendar className="w-3.5 h-3.5 text-blue-600" />
              ¿Listo para consultar?
            </span>
            <Link
              href="/turnos"
              onClick={() => setIsOpen(false)}
              className="font-bold text-blue-600 hover:text-blue-800 underline"
            >
              Ir a Turnos Online →
            </Link>
          </div>

          {/* Input field */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-3 bg-white border-t border-slate-200 flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Describe tus síntomas o haz tu pregunta..."
              disabled={loading}
              className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm text-slate-800 placeholder-slate-400"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="p-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-teal-600 text-white disabled:opacity-40 hover:from-blue-700 hover:to-teal-700 transition-all shadow-md shrink-0"
              aria-label="Enviar mensaje"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </aside>
  );
}
