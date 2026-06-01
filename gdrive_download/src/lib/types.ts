// Tipos para o sistema de gestao contabil
export interface Cliente {
  id: string;
  codigo: string;
  nome: string;
  cnpj: string;
  regimeTributario: 'MEI' | 'Simples' | 'LucroPresumido' | 'LucroReal';
  porte: 'MEI' | 'ME' | 'EPP' | 'Medio' | 'Grande';
  cidade: string;
  estado: string;
  telefone: string;
  email: string;
  responsavel: string;
  dataEntrada: string;
  situacao: 'Ativo' | 'Inativo' | 'Suspenso';
  servicosContratados: string[];
  honorarioMensal: number;
  scoreSaude: number;
  observacoes: string;
}

export interface Receita {
  id: string;
  clienteId: string;
  descricao: string;
  tipoServico: 'Contabilidade' | 'Fiscal' | 'DP' | 'Legalizacao' | 'Consultoria' | 'Avulso';
  valor: number;
  dataVencimento: string;
  dataRecebimento?: string;
  status: 'Pendente' | 'Recebido' | 'Vencido' | 'Cancelado';
  competencia: string;
}

export interface Despesa {
  id: string;
  descricao: string;
  categoria: 'Salarios' | 'ProLabore' | 'Aluguel' | 'Software' | 'Impostos' | 'Marketing' | 'Outros';
  valor: number;
  dataVencimento: string;
  dataPagamento?: string;
  status: 'Pendente' | 'Pago' | 'Vencido';
  fixo: boolean;
  departmento: string;
  pagoPor?: string;
}

export interface Colaborador {
  id: string;
  nome: string;
  cargo: string;
  salario: number;
  custoHora: number;
  produtividade: number;
  email: string;
  telefone: string;
  dataAdmissao: string;
}

export interface Prospect {
  id: string;
  nomeEmpresa: string;
  cnpj?: string;
  cidade: string;
  categoria: string;
  faturamentoEstimado: number;
  regimeProbavel: string;
  contato: string;
  telefone?: string;
  email?: string;
  canal: 'Indicacao' | 'Google' | 'ColdCall' | 'Redes' | 'Evento';
  etapa: 'ContatoInicial' | 'PropostaEnviada' | 'Negociacao' | 'FechadoGanho' | 'FechadoPerdido';
  scorePotencial: number;
  observacoes: string;
  dataCriacao: string;
}

export interface MetaMensal {
  id: string;
  mes: string;
  ano: number;
  metaFaturamento: number;
  metaClientes: number;
  metaNovosClientes: number;
  realizadoFaturamento: number;
  realizadoClientes: number;
  realizadoNovosClientes: number;
}

export interface Configuracoes {
  escritorio: {
    nome: string;
    cnpj: string;
    endereco: string;
    responsavelTecnico: string;
    crc: string;
    telefone: string;
    email: string;
  };
  metas: {
    faturamentoMensal: number;
    faturamentoAnual: number;
    pontoEquilibrio: number;
  };
  apis: {
    groqApiKey: string;
    geminiApiKey: string;
    huggingFaceApiKey: string;
    cohereApiKey: string;
    alterdataUrl: string;
    alterdataToken: string;
  };
  smtp: {
    host: string;
    porta: number;
    usuario: string;
    senha: string;
    emailRemetente: string;
  };
}

export interface DadosDashboard {
  faturamentoMensal: number;
  faturamentoAnual: number;
  lucroLiquido: number;
  margemLucro: number;
  totalClientes: number;
  clientesInadimplentes: number;
  honorariosReceber: number;
  honorariosRecebidos: number;
  custoFixoMensal: number;
  pontoEquilibrio: number;
}

export interface TransacaoFluxoCaixa {
  id: string;
  data: string;
  tipo: 'Entrada' | 'Saida';
  descricao: string;
  valor: number;
  categoria: string;
  realizado: boolean;
  clienteId?: string;
}

export interface ObrigacaoFiscal {
  id: string;
  nome: string;
  periodicidade: 'Mensal' | 'Trimestral' | 'Anual';
  prazo: string;
  status: 'Pendente' | 'Enviado' | 'Atrasado';
  clientes?: string[];
}

export interface Tarefa {
  id: string;
  titulo: string;
  descricao: string;
  prazo: string;
  status: 'Pendente' | 'EmAndamento' | 'Concluida' | 'Atrasada';
  prioridade: 'Baixa' | 'Media' | 'Alta' | 'Critica';
  responsavelId: string;
  clienteId?: string;
  categoria: string;
}
