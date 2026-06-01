import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Calendar as CalendarIcon, 
  Plus, 
  Trash2, 
  CheckCircle, 
  Clock, 
  AlertTriangle, 
  Filter, 
  HelpCircle,
  Building2,
  DollarSign,
  Briefcase,
  ChevronLeft,
  ChevronRight,
  Info
} from 'lucide-react';

interface Client {
  id: string;
  nome: string;
  cnpj: string;
  regime: string;
  honorario: number;
  status: string;
}

interface AgendaEntry {
  id: string;
  title: string;
  category: 'fiscal' | 'trabalhista' | 'societario' | 'geral';
  clientName: string;
  dueDay: number; // For June 2026 (1 to 30)
  value?: number;
  priority: 'Alta' | 'Média' | 'Baixa';
  completed: boolean;
  notes?: string;
}

interface AgendaPageProps {
  clientesList: Client[];
  tasks: any[];
  setTasks: React.Dispatch<React.SetStateAction<any[]>>;
  obligations: any[];
  setObligations: React.Dispatch<React.SetStateAction<any[]>>;
  setActiveTab: (tab: string) => void;
  setHelpTab: (tab: string) => void;
  setIsHelpOpen: (open: boolean) => void;
  renderHelpButton: (tabKey: string, sizeClasses?: string) => React.ReactNode;
}

// Map Brazilian Bookkeeping terms for learners
const DUTY_DICTIONARY: Record<string, { term: string; meaning: string; why: string }> = {
  DAS: {
    term: "DAS (Documento de Arrecadação do Simples)",
    meaning: "Guia única mensal que recolhe até 8 tributos federais, estaduais e municipais de forma unificada.",
    why: "Obrigatório para todas as micro e pequenas empresas optantes pelo Simples Nacional até o dia 20 de cada mês."
  },
  DCTF: {
    term: "DCTF Web & DCTF Geral",
    meaning: "Declaração de Débitos e Créditos Tributários Federais Previdenciários.",
    why: "Informa à Receita sobre impostos devidos da folha e das atividades comerciais. Essencial para emitir as guias previdenciárias."
  },
  SPED: {
    term: "SPED Fiscal (Sistema Público de Escrituração Digital)",
    meaning: "Arquivo digital com o inventário, apurações de ICMS/IPI e operações comerciais.",
    why: "Transmite mensalmente à fazenda estadual os dados detalhados para fiscalização e apuração de crédito fiscal."
  },
  eSocial: {
    term: "eSocial & Folha de Pagamento",
    meaning: "Plataforma centralizadora das obrigações previdenciárias, trabalhistas e fiscais da mão de obra da empresa.",
    why: "Essencial para admitir demitir, calcular salários e garantir direitos trabalhistas perante o MTE e Receita."
  },
  FGTS: {
    term: "FGTS (Fundo de Garantia por Tempo de Serviço)",
    meaning: "Depósito de 8% do salário nominal do empregado realizado pela empresa na Caixa Econômica.",
    why: "Obrigatório o pagamento até o dia 7 de cada mês para conformidade trabalhista do quadro funcional ativo."
  },
  EFD: {
    term: "EFD-Contribuições",
    meaning: "Escrituração digital do imposto PIS e da COFINS sobre faturamento de empresas no Lucro Presumido ou Real.",
    why: "Enviado até o 10º dia útil do segundo mês subsequente. O atraso gera multas pesadas proporcionais ao faturamento bruto."
  }
};

export default function AgendaPage({ 
  clientesList,
  tasks,
  setTasks,
  obligations,
  setObligations,
  setActiveTab,
  setHelpTab,
  setIsHelpOpen,
  renderHelpButton
}: AgendaPageProps) {
  
  // Internal state for events (we seed from available tasks/obligations and state-store it)
  const [events, setEvents] = useState<AgendaEntry[]>([
    { id: 'e1', title: 'Revisar DCTF - Fazenda Nova', category: 'fiscal', clientName: 'Fazenda Nova Esperança', dueDay: 5, priority: 'Alta', completed: false, notes: 'Análise completa com e-CAC' },
    { id: 'e2', title: 'Atualizar Cadastro - Tech Solutions', category: 'geral', clientName: 'Tech Solutions Brasil', dueDay: 8, priority: 'Média', completed: true },
    { id: 'e3', title: 'Gerar Relatório DRE Mensal', category: 'geral', clientName: 'Todas as Empresas', dueDay: 10, priority: 'Alta', completed: false },
    { id: 'e4', title: 'Reunião Apresentação - Construtora Vale', category: 'societario', clientName: 'Construtora Vale', dueDay: 15, priority: 'Média', completed: false },
    { id: 'e5', title: 'EFD-Contribuições - Supermercado Central', category: 'fiscal', clientName: 'Supermercado Central', dueDay: 15, value: 5400, priority: 'Alta', completed: true },
    { id: 'e6', title: 'DCTFWeb Geração de Guia Previdenciária', category: 'fiscal', clientName: 'Clínica Vida Plena', dueDay: 15, value: 1200, priority: 'Alta', completed: true },
    { id: 'e7', title: 'SPED Fiscal Transmissão Geral', category: 'fiscal', clientName: 'Supermercado Central', dueDay: 20, priority: 'Alta', completed: false },
    { id: 'e8', title: 'Geração e Envio do DAS Simples Nacional', category: 'fiscal', clientName: 'Restaurante Chef\'s Table', dueDay: 20, value: 890, priority: 'Alta', completed: false },
    { id: 'e9', title: 'Escrituração de ECF Trimestral', category: 'fiscal', clientName: 'Tech Solutions Brasil', dueDay: 25, priority: 'Alta', completed: false },
    { id: 'e10', title: 'Apuração e Envio de Guias de PIS/COFINS', category: 'fiscal', clientName: 'Tech Solutions Brasil', dueDay: 25, value: 3450, priority: 'Média', completed: false },
    { id: 'e11', title: 'Transmissão e Guia de FGTS Mensal', category: 'trabalhista', clientName: 'Fazenda Nova Esperança', dueDay: 7, value: 3200, priority: 'Alta', completed: true },
    { id: 'e12', title: 'Fechamento de Folha de Pagamento', category: 'trabalhista', clientName: 'Clínica Vida Plena', dueDay: 15, value: 8500, priority: 'Alta', completed: false },
  ]);

  // Form State
  const [formTitle, setFormTitle] = useState('');
  const [formCategory, setFormCategory] = useState<'fiscal' | 'trabalhista' | 'societario' | 'geral'>('fiscal');
  const [formClient, setFormClient] = useState('');
  const [formDueDay, setFormDueDay] = useState<number>(15);
  const [formValue, setFormValue] = useState('');
  const [formPriority, setFormPriority] = useState<'Alta' | 'Média' | 'Baixa'>('Média');
  const [formNotes, setFormNotes] = useState('');
  const [addSuccess, setAddSuccess] = useState(false);

  // Filters State
  const [filterCategory, setFilterCategory] = useState<string>('todos');
  const [filterClient, setFilterClient] = useState<string>('todos');
  const [filterStatus, setFilterStatus] = useState<'todos' | 'concluidos' | 'pendentes'>('todos');

  // Selected Day on Calendar Grid (Pre-selection)
  const [selectedDay, setSelectedDay] = useState<number | null>(1);

  // June 2026 Grid setup
  // Jun 1st, 2026 is a Mon. Total days = 30.
  const GRID_DAYS = Array.from({ length: 30 }, (_, i) => i + 1);

  // Handler for adding commitments
  const handleCreateEntry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim()) return;

    const newEntry: AgendaEntry = {
      id: 'evt-' + Date.now(),
      title: formTitle,
      category: formCategory,
      clientName: formClient || 'Escritório Nobel / Geral',
      dueDay: Number(formDueDay),
      value: formValue ? Number(formValue) : undefined,
      priority: formPriority,
      completed: false,
      notes: formNotes
    };

    setEvents(prev => [...prev, newEntry]);

    // Also mirror to tasks or obligations state if it corresponds
    if (formCategory === 'fiscal') {
      const newObligation = {
        id: 'ob-' + Date.now(),
        name: formTitle,
        status: 'Pendente',
        due: `${String(formDueDay).padStart(2, '0')}/06`,
        type: 'Guia Gerada'
      };
      setObligations(prev => [...prev, newObligation]);
    } else {
      const newTask = {
        id: 't-' + Date.now(),
        title: `${formTitle} (${formClient || 'Geral'})`,
        completed: false,
        priority: formPriority,
        due: `${String(formDueDay).padStart(2, '0')}/06`
      };
      setTasks(prev => [...prev, newTask]);
    }

    // Reset Form
    setFormTitle('');
    setFormValue('');
    setFormNotes('');
    setAddSuccess(true);
    setTimeout(() => setAddSuccess(false), 3000);
  };

  // Give Baixa (Conclude)
  const toggleEvent = (id: string) => {
    setEvents(prev => prev.map(ev => {
      if (ev.id === id) {
        const nextStatus = !ev.completed;
        
        // Let's mirror this completion status directly to obligations and tasks!
        if (ev.category === 'fiscal') {
          setObligations(objs => objs.map(o => {
            if (o.name === ev.title) {
              return { ...o, status: nextStatus ? 'Concluído' : 'Pendente' };
            }
            return o;
          }));
        } else {
          setTasks(tsks => tsks.map(t => {
            if (t.title.startsWith(ev.title)) {
              return { ...t, completed: nextStatus };
            }
            return t;
          }));
        }

        return { ...ev, completed: nextStatus };
      }
      return ev;
    }));
  };

  // Delete event
  const deleteEvent = (id: string) => {
    setEvents(prev => prev.filter(ev => ev.id !== id));
  };

  // Filter events list
  const filteredEvents = events.filter(ev => {
    const categoryMatch = filterCategory === 'todos' || ev.category === filterCategory;
    const clientMatch = filterClient === 'todos' || ev.clientName === filterClient;
    const statusMatch = filterStatus === 'todos' || 
                        (filterStatus === 'concluidos' && ev.completed) ||
                        (filterStatus === 'pendentes' && !ev.completed);
    return categoryMatch && clientMatch && statusMatch;
  });

  // Events of specifically selected Day
  const selectedDayEvents = events.filter(ev => ev.dueDay === selectedDay);

  return (
    <div className="space-y-8 animate-fade-in text-left">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2.5">
            <h2 className="font-display font-black text-2xl text-primary dark:text-[#00b86b] uppercase tracking-wide flex items-center gap-2">
              <CalendarIcon className="w-6 h-6 text-[#D4AF37]" />
              Agenda Fiscal e Operacional Completa
            </h2>
            {renderHelpButton('agenda', 'w-6 h-6 text-sm')}
          </div>
          <p className="text-xs text-slate-500 mt-1.5 font-bold">
            Calendário vigente: <span className="text-[#0c3e26] dark:text-[#00b86b]">Junho de 2026 (Mês Oficial)</span> • Administre calendários fiscais brasileiros (DAS, DCTF, SPED) sem quebras de banco de dados.
          </p>
        </div>
        
        {/* Buttons to navigate tabs directly */}
        <div className="flex gap-2">
          <button 
            onClick={() => setActiveTab('dashboard')}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-350 rounded-xl text-xs font-extrabold transition-all border-none cursor-pointer"
          >
            ← Voltar ao Dashboard
          </button>
        </div>
      </div>

      {/* Dictionary Quick-Learn Section for Beginners */}
      <div className="p-4.5 rounded-2xl bg-gradient-to-r from-[#0C3E26]/20 to-[#D4AF37]/10 border border-[#D4AF37]/20 flex flex-col md:flex-row gap-5 items-start">
        <div className="p-3 bg-gradient-to-br from-[#0c3e26] to-[#041a10] rounded-xl text-[#D4AF37] shrink-0">
          <HelpCircle className="w-6 h-6" />
        </div>
        <div>
          <h4 className="font-display font-black text-xs text-primary dark:text-[#00b86b] uppercase tracking-wider mb-1.5">Tutorial Rápido: O que representam os prazos fiscais?</h4>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-semibold">
            Como empresário ou iniciante, o fisco brasileiro possui impostos cruciais. Na nossa agenda contábil, garantimos que o seu Simples Nacional (através da guia <strong>DAS</strong>) vença dia 20, e as rotinas previdenciárias de funcionários (como <strong>FGTS</strong> e <strong>Folha</strong>) sejam concluídas até o dia 7 e 15. Clique nas datas correspondentes abaixo para registrar novas apurações ou gerenciar pendências vigentes.
          </p>
        </div>
      </div>

      {/* Top filter strip */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex flex-wrap gap-4 items-center">
        <span className="text-xs font-black text-slate-500 uppercase tracking-wider inline-flex items-center gap-1.5 mr-2">
          <Filter className="w-3.5 h-3.5 text-accent" />
          Filtros de Compliance:
        </span>
        
        <div className="flex flex-col sm:flex-row gap-2 flex-1 scrollbar-none min-w-0">
          {/* Regime/Categoria filter */}
          <div className="flex items-center gap-1.5 min-w-0 flex-1 sm:max-w-xs">
            <span className="text-[10px] uppercase font-black text-slate-400">Tipo:</span>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-2.5 py-1.5 text-xs text-current font-bold"
            >
              <option value="todos">Todos os Tipos</option>
              <option value="fiscal">🧾 Fiscais (Impostos/DCTF)</option>
              <option value="trabalhista">👥 Trabalhistas (Folha/FGTS)</option>
              <option value="societario">⚖️ Societário (Contratos/Atas)</option>
              <option value="geral">⚙️ Geral / Escriturações</option>
            </select>
          </div>

          {/* Client Filter */}
          <div className="flex items-center gap-1.5 min-w-0 flex-1 sm:max-w-xs">
            <span className="text-[10px] uppercase font-black text-slate-400">Cliente:</span>
            <select
              value={filterClient}
              onChange={(e) => setFilterClient(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-2.5 py-1.5 text-xs text-current font-bold"
            >
              <option value="todos">Todos os Contribuintes</option>
              {clientesList.map(c => (
                <option key={c.id} value={c.nome}>{c.nome}</option>
              ))}
              <option value="Todas as Empresas">Todas as Empresas</option>
              <option value="Escritório Nobel / Geral">Geral Nobel</option>
            </select>
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-1.5 min-w-0 flex-1 sm:max-w-xs">
            <span className="text-[10px] uppercase font-black text-slate-400">Status:</span>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as any)}
              className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-2.5 py-1.5 text-xs text-current font-bold"
            >
              <option value="todos">Toda Situação (Concluído/Pendente)</option>
              <option value="pendentes">⚠️ Somente Pendentes</option>
              <option value="concluidos">✓ Somente Baixados / Concluídos</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Two-Row Dashboard Section (Calendar Grid on Left, Registration Form on Right) */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        
        {/* Calendar Grid (Span 2) */}
        <div className="xl:col-span-2 space-y-6">
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm">
            {/* Calendar title strip */}
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100 dark:border-slate-700/50">
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="font-display font-black text-base text-slate-900 dark:text-slate-100">
                  Visualização Mensal Integrada — Junho 2026
                </span>
              </div>
              <div className="flex gap-1">
                <button disabled className="p-1.5 px-2 bg-slate-100 dark:bg-slate-900 rounded-lg text-slate-400 border-none pointer-events-none">
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="text-xs font-black uppercase text-slate-600 dark:text-slate-350 self-center px-2">Junho de 2026</span>
                <button disabled className="p-1.5 px-2 bg-slate-100 dark:bg-slate-900 rounded-lg text-slate-400 border-none pointer-events-none">
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Weekdays indicator */}
            <div className="grid grid-cols-7 text-center font-black text-[10px] text-slate-450 uppercase mb-4 tracking-wider select-none">
              <div>Segunda</div>
              <div>Terça</div>
              <div>Quarta</div>
              <div>Quinta</div>
              <div>Sexta</div>
              <div className="text-slate-400 dark:text-slate-500">Sábado</div>
              <div className="text-slate-400 dark:text-slate-500">Domingo</div>
            </div>

            {/* June 2026 Monthly Grid */}
            <div className="grid grid-cols-7 gap-3 min-h-[380px]">
              {GRID_DAYS.map(day => {
                const dayEvts = events.filter(e => e.dueDay === day);
                const hasPending = dayEvts.some(e => !e.completed);
                const isSelected = selectedDay === day;
                
                return (
                  <motion.div
                    key={day}
                    onClick={() => {
                      setSelectedDay(day);
                      setFormDueDay(day);
                    }}
                    whileHover={{ scale: 1.02 }}
                    className={`p-2.5 rounded-2xl border min-h-[75px] flex flex-col justify-between cursor-pointer transition-all ${
                      isSelected 
                        ? 'border-[#00b86b] bg-[#00b86b]/10 dark:bg-[#00b86b]/20 text-[#00b86b]' 
                        : 'border-slate-150 hover:border-[#D4AF37]/40 bg-slate-50/20 dark:bg-slate-900/10'
                    }`}
                  >
                    {/* Day number and indicator */}
                    <div className="flex items-center justify-between">
                      <span className={`text-xs font-black select-none ${isSelected ? 'text-[#00b86b] underline decoration-2' : 'text-slate-800 dark:text-slate-300'}`}>
                        {day}
                      </span>
                      {dayEvts.length > 0 && (
                        <span className={`w-2 h-2 rounded-full ${hasPending ? 'bg-rose-500 animate-custom-pulse' : 'bg-emerald-500'}`} />
                      )}
                    </div>

                    {/* Commitments list in cell (renders tiny badges max 2) */}
                    <div className="space-y-1 mt-2">
                      {dayEvts.slice(0, 2).map((ev, index) => (
                        <div 
                          key={ev.id}
                          className={`text-[8.5px] font-extrabold truncate px-1 py-0.5 rounded-md ${
                            ev.completed 
                              ? 'bg-emerald-500/10 text-emerald-600 line-through' 
                              : ev.priority === 'Alta' 
                                ? 'bg-rose-500/10 text-rose-600' 
                                : 'bg-amber-500/10 text-amber-600'
                          }`}
                          title={`${ev.title} - ${ev.clientName}`}
                        >
                          {ev.title.split(' - ')[0].substring(0, 16)}
                        </div>
                      ))}
                      {dayEvts.length > 2 && (
                        <div className="text-[7.5px] font-black text-slate-400 text-center uppercase tracking-normal">
                          + {dayEvts.length - 2} Obrigações
                        </div>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Calendar Legend */}
            <div className="flex flex-wrap gap-4 items-center justify-center border-t border-slate-100 dark:border-slate-700/50 mt-6 pt-4 text-[10px] font-extrabold text-slate-500 uppercase tracking-wider select-none">
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 bg-rose-500 rounded-full inline-block"></span> Pendência Crítica / Fiscal</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 bg-emerald-500 rounded-full inline-block"></span> Obrigado já baixada / Concluída</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 bg-amber-500 rounded-full inline-block"></span> Média Complexidade</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 border border-[#00b86b] rounded-full inline-block"></span> Data Ativa Selecionada</span>
            </div>
          </div>

          {/* List detailed obligations of selected day */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm text-left">
            <h4 className="font-display font-black text-sm text-slate-900 dark:text-slate-150 uppercase tracking-wider mb-4 inline-flex items-center gap-2">
              <Clock className="w-4.5 h-4.5 text-accent" />
              Compromissos Agendados para o Dia {selectedDay} de Junho
            </h4>

            {selectedDayEvents.length === 0 ? (
              <div className="py-8 text-center text-xs font-bold text-slate-450 border border-dashed border-slate-200 dark:border-slate-700 rounded-2xl bg-slate-50/30">
                Livre de compromissos ou tributos pendentes agendados para este dia! 🎉 
              </div>
            ) : (
              <div className="space-y-3">
                {selectedDayEvents.map(evt => (
                  <div 
                    key={evt.id}
                    className={`p-4 rounded-2xl border transition-all flex flex-col md:flex-row md:items-center justify-between gap-3 ${
                      evt.completed 
                        ? 'bg-emerald-500/5 border-emerald-500/20' 
                        : 'bg-slate-50/20 border-slate-200 dark:border-slate-700 hover:border-slate-350 dark:hover:border-slate-650'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-xl mt-0.5 shrink-0 ${
                        evt.completed ? 'bg-emerald-500/10 text-emerald-600' : 'bg-[#0C3E26]/10 text-primary dark:text-[#00b86b]'
                      }`}>
                        {evt.category === 'fiscal' ? <Building2 className="w-4 h-4" /> : evt.category === 'trabalhista' ? <Briefcase className="w-4 h-4" /> : <Info className="w-4 h-4" />}
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className={`text-xs font-bold ${evt.completed ? 'line-through text-slate-405' : 'text-slate-800 dark:text-slate-100'}`}>
                            {evt.title}
                          </span>
                          <span className={`text-[8.5px] font-black uppercase px-2 py-0.5 rounded-full ${
                            evt.category === 'fiscal' ? 'bg-rose-100 text-rose-700 dark:bg-rose-950/20 dark:text-rose-400' : 'bg-slate-100 text-slate-600 dark:bg-slate-900 dark:text-slate-400'
                          }`}>
                            {evt.category}
                          </span>
                          <span className={`text-[8.5px] font-black uppercase px-1.5 py-0.5 rounded-full ${
                            evt.priority === 'Alta' ? 'bg-rose-500/15 text-rose-600' : 'bg-amber-500/15 text-amber-600'
                          }`}>
                            {evt.priority}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 font-bold">
                          Contribuinte: <strong className="text-slate-700 dark:text-slate-300">{evt.clientName}</strong>
                        </p>
                        {evt.notes && (
                          <p className="text-[10px] text-slate-400 italic">Notas: {evt.notes}</p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between md:justify-end gap-3 pt-3 md:pt-0 border-t md:border-none border-slate-100">
                      {evt.value && (
                        <span className="text-xs font-mono font-extrabold text-slate-700 dark:text-slate-300">
                          Guia: {new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(evt.value)}
                        </span>
                      )}
                      
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => toggleEvent(evt.id)}
                          className={`text-xs font-black px-3 py-1.5 rounded-lg flex items-center gap-1 cursor-pointer transition-all border-none ${
                            evt.completed 
                              ? 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 text-slate-450 hover:text-slate-600' 
                              : 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-xs'
                          }`}
                        >
                          <CheckCircle className="w-3.5 h-3.5" />
                          <span>{evt.completed ? 'Reabrir' : 'Dar Baixa ✓'}</span>
                        </button>
                        
                        <button
                          onClick={() => deleteEvent(evt.id)}
                          className="p-2 hover:bg-rose-500/10 hover:text-rose-600 rounded-lg text-slate-400 cursor-pointer border-none transition-colors"
                          title="Excluir da agenda"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Form and Accounting Explanations (Span 1) */}
        <div className="space-y-6">
          
          {/* Register Duty Form */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm text-left">
            <h4 className="font-display font-black text-sm text-primary dark:text-[#00b86b] uppercase tracking-wider mb-4 flex items-center gap-2">
              <Plus className="w-4.5 h-4.5 text-accent" />
              Lançamento na Agenda
            </h4>

            <form onSubmit={handleCreateEntry} className="space-y-4">
              {/* Succession Alerts */}
              {addSuccess && (
                <div className="p-3 bg-emerald-500/15 border border-emerald-500/35 text-emerald-600 rounded-xl text-xs font-bold mb-3">
                  ✓ Compromisso contábil cadastrado e sincronizado com sucesso!
                </div>
              )}

              {/* Day preselected info */}
              <div className="p-2 px-3 bg-slate-50 dark:bg-slate-900 rounded-xl text-[11px] text-slate-500 font-semibold flex justify-between items-center select-none border border-slate-200/50">
                <span>Vencimento pré-selecionado:</span>
                <span className="font-black text-[#00b86b]">{formDueDay} de Junho (06/2026)</span>
              </div>

              {/* Title input */}
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-black text-slate-450 tracking-wider">Nome da Obrigação / Afazer</label>
                <input 
                  type="text"
                  required
                  placeholder="Ex: Entrega GIA ICMS, Apuração DAS"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2 text-xs text-current font-semibold focus:outline-none focus:border-accent"
                />
              </div>

              {/* Category selector */}
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-black text-slate-450 tracking-wider">Tipo de Atividade</label>
                <select
                  value={formCategory}
                  onChange={(e: any) => setFormCategory(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-current font-bold"
                >
                  <option value="fiscal">🧾 Fiscal (Guias, Livros, Impostos)</option>
                  <option value="trabalhista">👥 Trabalhista (Folha, INSS, FGTS)</option>
                  <option value="societario">⚖️ Societário (Alterações, Atas)</option>
                  <option value="geral">⚙️ Geral Pró-Labore / Administrativo</option>
                </select>
              </div>

              {/* Client Selection */}
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-black text-slate-450 tracking-wider">Cliente Vinculado</label>
                <select
                  value={formClient}
                  onChange={(e) => setFormClient(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-current font-bold"
                >
                  <option value="">Selecione um Contribuinte</option>
                  {clientesList.map(c => (
                    <option key={c.id} value={c.nome}>{c.nome} ({c.regime})</option>
                  ))}
                  <option value="Todas as Empresas">Todas as Empresas (Fechamento)</option>
                  <option value="Escritório Nobel / Geral">Geral Escritório Nobel</option>
                </select>
              </div>

              {/* Two Column Grid: Day of Vencimento & Suggested Value */}
              <div className="grid grid-cols-2 gap-3.5">
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-black text-slate-450 tracking-wider">Dia de Venc.</label>
                  <input 
                    type="number"
                    min="1"
                    max="30"
                    required
                    value={formDueDay}
                    onChange={(e) => setFormDueDay(Number(e.target.value))}
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-current font-semibold focus:outline-none focus:border-accent"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-black text-slate-450 tracking-wider">Guia R$ (Opcional)</label>
                  <input 
                    type="number"
                    placeholder="Ex: 890"
                    value={formValue}
                    onChange={(e) => setFormValue(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-current font-semibold focus:outline-none focus:border-accent"
                  />
                </div>
              </div>

              {/* Priority */}
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-black text-slate-450 tracking-wider">Criticidade / Urgência</label>
                <div className="flex gap-2">
                  {['Alta', 'Média', 'Baixa'].map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => setFormPriority(p as any)}
                      className={`flex-1 py-1.5 text-xs font-extrabold rounded-lg border cursor-pointer transition-all ${
                        formPriority === p 
                          ? p === 'Alta' 
                            ? 'bg-rose-500/10 border-rose-500 text-rose-500' 
                            : p === 'Média'
                              ? 'bg-amber-500/10 border-amber-500 text-amber-500'
                              : 'bg-slate-300/20 border-slate-400 text-slate-500'
                          : 'bg-transparent border-slate-200 dark:border-slate-700 text-slate-400'
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>

              {/* Notes */}
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-black text-slate-450 tracking-wider">Instruções / Anotação</label>
                <textarea 
                  rows={2}
                  placeholder="Ex: Analisar balancete prévio enviado via drive."
                  value={formNotes}
                  onChange={(e) => setFormNotes(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-1.5 text-xs text-current font-semibold focus:outline-none focus:border-accent resize-none"
                />
              </div>

              <button 
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-[#D4AF37] to-[#0c3e26] hover:-translate-y-0.5 hover:shadow-md text-white rounded-xl text-xs font-black transition-all uppercase tracking-wider cursor-pointer border-none mt-2"
              >
                Cadastrar na Agenda Corporativa +
              </button>
            </form>
          </div>

          {/* Educational Explanations Accordion / Dictionary for the Beginner user */}
          <div className="p-6 rounded-3xl bg-gradient-to-br from-white to-slate-50/50 dark:from-slate-800 dark:to-slate-900 border border-slate-200 dark:border-slate-700 shadow-sm text-left">
            <h4 className="font-display font-black text-xs text-primary dark:text-[#00b86b] uppercase tracking-wider mb-4 flex items-center gap-1.5">
              <Info className="w-4 h-4 text-[#D4AF37]" />
              Dicionário do Gestor Contábil
            </h4>
            <p className="text-[11px] text-slate-450 mb-4 leading-relaxed">
              Mantenha-se atualizado sobre o que representa cada termo cobrado e gerido na agenda de impostos:
            </p>

            <div className="space-y-3.5 max-h-[350px] overflow-y-auto pr-1">
              {Object.values(DUTY_DICTIONARY).map((obj, i) => (
                <div key={i} className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-850 space-y-1.5 shadow-2xs">
                  <span className="text-xs font-black text-[#0c3e26] dark:text-[#00b86b] block">
                    {obj.term}
                  </span>
                  <p className="text-[11px] text-slate-650 dark:text-slate-350 leading-relaxed font-semibold">
                    {obj.meaning}
                  </p>
                  <p className="text-[10px] text-[#D4AF37] font-bold">
                    💡 Relevância: <span className="text-slate-400 italic font-semibold">{obj.why}</span>
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
