import * as React from "react";
import { BookOpen, Sparkles, X, MessageSquare, Send, Award, HelpCircle, CheckCircle, ArrowRight, Play, BookOpenCheck, FlameKindling, Info } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface NobelAcademyProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Message {
  id: string;
  sender: "ai" | "user";
  text: string;
  timestamp: Date;
}

const ACADEMY_TOPICS = [
  {
    id: "dre",
    title: "DRE - Demonstrativo de Resultado",
    desc: "Aprenda a analisar receitas, custos diretos, despesas operacionais e o lucro líquido real.",
    icon: "📈",
    difficulty: "Iniciante",
    duration: "6 min"
  },
  {
    id: "breakeven",
    title: "Break-Even (Ponto de Equilíbrio)",
    desc: "Descubra o faturamento mínimo necessário para cobrir absolutamente todos os custos da empresa.",
    icon: "⚖️",
    difficulty: "Intermediário",
    duration: "8 min"
  },
  {
    id: "contribution",
    title: "Margem de Contribuição",
    desc: "Entenda o que sobra de cada venda após descontar os custos diretos para pagar os custos fixos.",
    icon: "💰",
    difficulty: "Intermediário",
    duration: "5 min"
  },
  {
    id: "tax_planning",
    title: "Planejamento e Elisão Fiscal",
    desc: "Conceitos de Simples Nacional, Lucro Presumido e Lucro Real para reduzir impostos legalmente.",
    icon: "🛡️",
    difficulty: "Avançado",
    duration: "10 min"
  }
];

export default function NobelAcademy({ isOpen, onClose }: NobelAcademyProps) {
  const [activeTab, setActiveTab] = React.useState<"courses" | "tutor">("courses");
  const [selectedTopic, setSelectedTopic] = React.useState<string | null>(null);
  const [messages, setMessages] = React.useState<Message[]>([
    {
      id: "welcome",
      sender: "ai",
      text: "Olá, Érika! Bem-vinda à Nobel AI Academy. 🧠🎓\n\nSou seu Tutor de Inteligência Contábil. Estou pronto para te ensinar conceitos fundamentais que guiam o sucesso da Nobel e ajudam a explicar este ERP de maneira didática para seus clientes.\n\nEscolha um dos tópicos ao lado ou pergunte-me diretamente sobre DRE, Break-even e Ponto de Equilíbrio!",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = React.useState("");
  const [isTyping, setIsTyping] = React.useState(false);
  const [completedTopics, setCompletedTopics] = React.useState<string[]>([]);
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  // Auto-scroll messages
  React.useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim()) return;

    const userMsg: Message = {
      id: String(Date.now()),
      sender: "user",
      text: textToSend,
      timestamp: new Date()
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");
    setIsTyping(true);

    try {
      // Prompt customization grounded on actual Nobel dashboard figures!
      const systemPrompt = `Você é o Tutor de Inteligência Contábil da Nobel AI Academy.
      Responda de forma extremamente clara, didática, profissional e em parágrafos bem estruturados em português.
      Contexto de Dados Atuais do ERP Nobel Contabilidade (fatos reais do painel):
      - Faturamento Mensal Atualizado: R$ 185.000,00
      - Custos Fixos Mensais: R$ 98.500,00
      - Lucro Líquido Previsto: R$ 62.500,00
      - Margem de Lucro: 33.8%
      - Ponto de Equilíbrio Estimado: R$ 82.000,00
      
      Assunto que o usuário perguntou ou selecionou: "${textToSend}".
      Forneça explicações passo a passo sobre o tema, incluindo fórmulas simplificadas (por exemplo, como funciona a DRE deduzindo impostos e despesas, ou como o Break-even identifica a receita crítica de R$ 82.000 da Nobel). Sempre parabenize a Érika e cite a Contabilidade Nobel.`;

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: systemPrompt })
      });

      if (!response.ok) throw new Error("API request failed");
      
      const data = await response.json();
      
      const aiMsg: Message = {
        id: String(Date.now() + 1),
        sender: "ai",
        text: data.reply || "Desculpe, tive um contratempo ao gerar o conteúdo didático.",
        timestamp: new Date()
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (e) {
      // Fallback response simulation
      const fallbackMsg: Message = {
        id: String(Date.now() + 1),
        sender: "ai",
        text: `[Nobel Tutoria] Excelente pergunta sobre "${textToSend}". No regime contábil gerencial do ERP, analisamos o DRE começando pela receita bruta (R$ 185 mil), deduzindo os custos (R$ 98.5 mil) para achar o ponto de equilíbrio real no norte de minas. (Configure sua chave corporativa GEMINI_API_KEY no painel de segredos para dispor do tutor em tempo real).`,
        timestamp: new Date()
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  const startLesson = (topicId: string) => {
    setSelectedTopic(topicId);
    setActiveTab("tutor");
    
    let prompt = "";
    if (topicId === "dre") {
      prompt = "Desejo iniciar o curso rápido sobre DRE e entender como ler o demonstrativo financeiro da minha empresa!";
    } else if (topicId === "breakeven") {
      prompt = "Quero aprender o que é Break-Even (Ponto de Equilíbrio) e qual a fórmula para encontrar o limite neutro nas finanças.";
    } else if (topicId === "contribution") {
      prompt = "Explique detalhadamente o conceito de Margem de Contribuição e como ela influi no lucro líquido.";
    } else {
      prompt = "Quero fazer o curso de Planejamento e Elisão Fiscal sob as regras de 2026.";
    }
    
    // Mark as completed
    if (!completedTopics.includes(topicId)) {
      setCompletedTopics(prev => [...prev, topicId]);
    }

    handleSendMessage(prompt);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay border backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/60 z-40 backdrop-blur-sm"
          />

          {/* Drawer container from right side */}
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 20, stiffness: 100 }}
            className="fixed top-0 right-0 w-full md:w-[620px] max-w-full h-full bg-white dark:bg-[#090E17] border-l border-slate-200 dark:border-slate-800 z-50 flex flex-col shadow-2xl text-left"
          >
            {/* Header section */}
            <div className="p-6 border-b border-slate-150 dark:border-slate-850 flex items-center justify-between bg-gradient-to-r from-emerald-500/5 to-primary/5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#0C3E26] text-white rounded-xl flex items-center justify-center shrink-0 shadow-md">
                  <Sparkles className="w-5.5 h-5.5 text-accent animate-pulse" />
                </div>
                <div>
                  <h3 className="font-display font-black text-lg text-primary dark:text-accent">
                    Nobel AI Academy
                  </h3>
                  <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                    Sua Escola e Tutoria Financeira Integrada
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 flex items-center justify-center border-none cursor-pointer text-slate-500 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Navigation buttons */}
            <div className="px-6 py-2 border-b border-slate-100 dark:border-slate-850 bg-slate-50/50 dark:bg-slate-900/30 flex gap-2">
              <button
                onClick={() => setActiveTab("courses")}
                className={`px-4 py-2 font-bold text-xs rounded-xl transition-all cursor-pointer border-none flex items-center gap-2 ${
                  activeTab === "courses"
                    ? "bg-[#0C3E26] text-white shadow-sm"
                    : "bg-transparent text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                }`}
              >
                <BookOpen className="w-4 h-4" />
                <span>Trilhas de Cursos</span>
              </button>
              <button
                onClick={() => setActiveTab("tutor")}
                className={`px-4 py-2 font-bold text-xs rounded-xl transition-all cursor-pointer border-none flex items-center gap-2 ${
                  activeTab === "tutor"
                    ? "bg-[#0C3E26] text-white shadow-sm"
                    : "bg-transparent text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                }`}
              >
                <MessageSquare className="w-4 h-4" />
                <span>Conversar com Tutor IA</span>
                {isTyping && <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />}
              </button>
            </div>

            {/* Main content viewport */}
            <div className="flex-1 overflow-y-auto">
              <AnimatePresence mode="wait">
                {activeTab === "courses" ? (
                  <motion.div
                    key="courses-list"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="p-6 space-y-6"
                  >
                    {/* Intro Bannercard */}
                    <div className="bg-gradient-to-br from-[#0C3E26] to-[#0a5c3a] p-5 rounded-2xl text-white relative overflow-hidden shadow">
                      {/* Graphics support */}
                      <div className="absolute right-[-10%] bottom-[-10%] w-40 h-40 rounded-full bg-white/5 blur-xl pointer-events-none" />
                      <div className="relative z-10 space-y-2">
                        <span className="bg-[#D4AF37] text-[#0C3E26] text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full inline-block">
                          Capacitação Profissional
                        </span>
                        <h4 className="font-display font-black text-lg">
                          Domine as Finanças do seu ERP
                        </h4>
                        <p className="text-xs text-emerald-100 leading-relaxed">
                          Uma formação pensada exclusivamente para Erika capacitar-se e instruir seus clientes sobre indicadores gerenciais complexes de forma simples e de alto nível.
                        </p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h5 className="font-bold text-xs text-slate-400 uppercase tracking-widest">
                        Aulas Disponíveis
                      </h5>

                      <div className="grid grid-cols-1 gap-4">
                        {ACADEMY_TOPICS.map((topic) => {
                          const isCompleted = completedTopics.includes(topic.id);
                          return (
                            <div
                              key={topic.id}
                              className="bg-white dark:bg-[#0c1322]/40 rounded-xl p-4 border border-slate-200 dark:border-slate-800 hover:border-[#00b86b]/40 transition-all flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 shadow-sm"
                            >
                              <div className="flex items-start gap-3.5 text-left">
                                <div className="text-3xl bg-slate-50 dark:bg-slate-800/40 w-12 h-12 rounded-xl flex items-center justify-center shrink-0">
                                  {topic.icon}
                                </div>
                                <div className="space-y-1">
                                  <div className="flex items-center gap-1.5 flex-wrap">
                                    <h6 className="font-bold text-sm text-slate-800 dark:text-slate-100">
                                      {topic.title}
                                    </h6>
                                    {isCompleted && (
                                      <span className="flex items-center gap-0.5 text-[9px] font-black text-emerald-600 bg-emerald-50 dark:bg-emerald-950/20 px-1.5 py-0.5 rounded-full uppercase">
                                        <CheckCircle className="w-2.5 h-2.5" /> Concluído
                                      </span>
                                    )}
                                  </div>
                                  <p className="text-xs text-slate-400 dark:text-slate-400 font-medium">
                                    {topic.desc}
                                  </p>
                                  <div className="flex items-center gap-2.5 text-[10px] text-slate-400">
                                    <span className="font-bold text-slate-500">{topic.difficulty}</span>
                                    <span>·</span>
                                    <span>{topic.duration}</span>
                                  </div>
                                </div>
                              </div>

                              <button
                                onClick={() => startLesson(topic.id)}
                                className="bg-[#00b86b]/10 hover:bg-[#00b86b] text-[#00b86b] hover:text-white px-4 py-2 border-none rounded-xl text-xs font-black self-end sm:self-center flex items-center gap-1.5 duration-200 cursor-pointer"
                              >
                                <Play className="w-3.5 h-3.5 shrink-0" />
                                <span>Iniciar</span>
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <div className="flex flex-col h-full bg-[#FAFAFA] dark:bg-[#070A11]">
                    {/* Chat Messages Log */}
                    <div className="flex-1 p-6 space-y-4 overflow-y-auto min-h-[350px]">
                      {messages.map((msg) => (
                        <div
                          key={msg.id}
                          className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                        >
                          <div
                            className={`max-w-[85%] rounded-2xl p-4 text-xs leading-relaxed ${
                              msg.sender === "user"
                                ? "bg-[#0C3E26] text-white rounded-tr-none text-right"
                                : "bg-white dark:bg-[#0F172A] text-slate-700 dark:text-slate-200 border border-slate-150 dark:border-slate-800 rounded-tl-none text-left"
                            }`}
                          >
                            <div className="whitespace-pre-line">{msg.text}</div>
                            <div
                              className={`text-[9px] mt-1.5 opacity-60 ${
                                msg.sender === "user" ? "text-slate-200 text-left" : "text-slate-400 text-right"
                              }`}
                            >
                              {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </div>
                          </div>
                        </div>
                      ))}

                      {isTyping && (
                        <div className="flex justify-start">
                          <div className="bg-white dark:bg-[#0F172A] border border-slate-150 dark:border-slate-800 rounded-2xl rounded-tl-none p-4 flex items-center gap-1.5">
                            <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce [animation-delay:-0.3s]" />
                            <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce [animation-delay:-0.15s]" />
                            <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce" />
                          </div>
                        </div>
                      )}
                      
                      <div ref={messagesEndRef} />
                    </div>

                    {/* Pre-written quick prompt ideas */}
                    <div className="px-6 py-2 bg-white dark:bg-[#090E17] border-t border-slate-100 dark:border-slate-850 flex gap-2 overflow-x-auto select-none shrink-0">
                      <button
                        onClick={() => handleSendMessage("Explique didaticamente o meu Break-Even ideal baseado no faturamento atual de R$ 185 mil.")}
                        className="bg-slate-50 dark:bg-slate-800/40 hover:bg-slate-100 hover:border-slate-350 dark:hover:bg-slate-750 text-[10px] font-bold text-slate-500 dark:text-slate-300 border border-slate-200 dark:border-slate-800 px-3 py-1.5 rounded-full shrink-0 transition-all cursor-pointer"
                      >
                        ⚖️ Minhas Metas de Break-Even
                      </button>
                      <button
                        onClick={() => handleSendMessage("Por que os impostos e a Margem de Contribuição são cruciais no cálculo do Ponto de Equilíbrio?")}
                        className="bg-slate-50 dark:bg-slate-800/40 hover:bg-slate-100 hover:border-slate-350 dark:hover:bg-slate-750 text-[10px] font-bold text-slate-500 dark:text-slate-300 border border-slate-200 dark:border-slate-800 px-3 py-1.5 rounded-full shrink-0 transition-all cursor-pointer"
                      >
                        📈 Impostos e Ponto de Equilíbrio
                      </button>
                      <button
                        onClick={() => handleSendMessage("Como posso ensinar no Excel a estrutura operacional de uma DRE de sucesso?")}
                        className="bg-slate-50 dark:bg-slate-800/40 hover:bg-slate-100 hover:border-slate-350 dark:hover:bg-slate-750 text-[10px] font-bold text-slate-500 dark:text-slate-300 border border-slate-200 dark:border-slate-800 px-3 py-1.5 rounded-full shrink-0 transition-all cursor-pointer"
                      >
                        📕 Ensinar DRE passo-a-passo
                      </button>
                    </div>

                    {/* Footer Input Form */}
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        handleSendMessage(inputValue);
                      }}
                      className="p-4 bg-white dark:bg-[#090E17] border-t border-slate-150 dark:border-slate-850 flex items-center gap-2"
                    >
                      <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="Escreva sua dúvida sobre contabilidade e ERP..."
                        className="flex-1 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 px-4 py-2.5 rounded-xl text-xs text-slate-900 dark:text-white outline-none focus:ring-1 focus:ring-[#00b86b]"
                      />
                      <button
                        type="submit"
                        className="bg-[#0C3E26] hover:bg-[#0a5c3a] text-white w-9 h-9 rounded-xl flex items-center justify-center border-none shrink-0 cursor-pointer active:scale-95 duration-100"
                      >
                        <Send className="w-4 h-4" />
                      </button>
                    </form>
                  </div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
