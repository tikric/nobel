export type AppSection = 'landing' | 'app';

export interface Company {
  nome: string;
  cat: string;
  cidade: string;
  endereco: string;
  site: string;
  tel: string;
  avaliacoes: number;
  nota: number;
  funcionarios: number;
  score: number;
  regime: string;
  oportunidade: 'alta' | 'media' | 'baixa';
}

export interface Lead {
  id: string;
  nome: string;
  categoria: string;
  cidade: string;
  contato: string;
  valor: number;
  avatar: string;
}

export type KanbanStatus = 
  | 'novo' 
  | 'contato' 
  | 'qualificacao' 
  | 'diagnostico' 
  | 'proposta' 
  | 'negociacao' 
  | 'fechado' 
  | 'perdido';

export interface KanbanColumn {
  id: KanbanStatus;
  title: string;
  color: string;
  leads: Lead[];
}

export interface Message {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
}

export interface Employee {
  id: string;
  nome: string;
  avatar: string;
  cargo: string;
  departamento: 'comercial' | 'contabil' | 'financeiro' | 'atendimento';
  tarefas: number;
  produtividade: number;
}

export interface FinancialAccount {
  id: string;
  nome: string;
  descricao: string;
  vencimento: string;
  valor: number;
  status: 'Pendente' | 'Agendado' | 'Pago' | 'Recebido';
}

export interface DocumentInfo {
  id: string;
  nome: string;
  ext: string;
  tamanho: string;
  data: string;
  status: 'Indexado' | 'Pendente';
}

export interface EventLog {
  id: string;
  title: string;
  details: string;
  time: string;
  type: 'success' | 'info' | 'warning' | 'error';
}

export interface CalendarEvent {
  day: number;
  type?: 'danger' | 'warning' | 'success'; 
}
