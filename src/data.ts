import { Company, Lead, KanbanColumn, Employee, FinancialAccount, DocumentInfo, EventLog } from './types';

export const empresasProspeccao: Company[] = [
  {
    nome: "Clínica Vida Plena",
    cat: "Clínicas médicas",
    cidade: "Montes Claros",
    endereco: "Av. Deputado Esteves Rodrigues, 1000",
    site: "www.clinicavidaplena.com.br",
    tel: "(38) 3224-7890",
    avaliacoes: 127,
    nota: 4.8,
    funcionarios: 15,
    score: 94,
    regime: "Simples Nacional",
    oportunidade: "alta"
  },
  {
    nome: "Hospital Santa Maria",
    cat: "Hospitais",
    cidade: "Montes Claros",
    endereco: "Rua Dr. Santos, 500",
    site: "www.hospitalsantamaria.com.br",
    tel: "(38) 3221-6789",
    avaliacoes: 342,
    nota: 4.9,
    funcionarios: 142,
    score: 97,
    regime: "Lucro Real",
    oportunidade: "alta"
  },
  {
    nome: "Consultório OdontoSmile",
    cat: "Consultórios odontológicos",
    cidade: "Pirapora",
    endereco: "Av. São Francisco, 200",
    site: "www.odontosmile.com.br",
    tel: "(38) 3741-7890",
    avaliacoes: 89,
    nota: 4.7,
    funcionarios: 8,
    score: 88,
    regime: "Simples Nacional",
    oportunidade: "alta"
  },
  {
    nome: "Restaurante Chef's Table",
    cat: "Restaurantes",
    cidade: "Montes Claros",
    endereco: "Av. Sanitária, 500",
    site: "www.chefstables.com.br",
    tel: "(38) 3215-6789",
    avaliacoes: 342,
    nota: 4.9,
    funcionarios: 28,
    score: 91,
    regime: "Lucro Presumido",
    oportunidade: "alta"
  },
  {
    nome: "Construtora Horizonte",
    cat: "Construtoras",
    cidade: "Janaúba",
    endereco: "Av. do Comércio, 300",
    site: "www.horizonteconst.com.br",
    tel: "(38) 3821-0123",
    avaliacoes: 201,
    nota: 4.7,
    funcionarios: 45,
    score: 88,
    regime: "Lucro Presumido",
    oportunidade: "alta"
  },
  {
    nome: "TechSolutions Brasil",
    cat: "Empresas de software",
    cidade: "Montes Claros",
    endereco: "Rua Lafetá, 100",
    site: "www.techsolutions.com.br",
    tel: "(38) 3222-7890",
    avaliacoes: 156,
    nota: 4.8,
    funcionarios: 56,
    score: 92,
    regime: "Lucro Real",
    oportunidade: "alta"
  },
  {
    nome: "Advocacia Mendes & Cia",
    cat: "Escritórios de advocacia",
    cidade: "Januária",
    endereco: "Rua da República, 200",
    site: "www.mendesadv.com.br",
    tel: "(38) 3621-1234",
    avaliacoes: 89,
    nota: 4.5,
    funcionarios: 8,
    score: 76,
    regime: "Lucro Real",
    oportunidade: "media"
  },
  {
    nome: "Transportadora Rápida Norte",
    cat: "Transportadoras",
    cidade: "Bocaiúva",
    endereco: "Av. Francisco Dumont, 1500",
    site: "www.transportadorarapida.com.br",
    tel: "(38) 3251-7890",
    avaliacoes: 234,
    nota: 4.6,
    funcionarios: 78,
    score: 89,
    regime: "Lucro Presumido",
    oportunidade: "alta"
  },
  {
    nome: "Imobiliária Premium",
    cat: "Imobiliárias",
    cidade: "Manga",
    endereco: "Av. Do Rio, 800",
    site: "www.imobiliariapremium.com.br",
    tel: "(38) 3615-7890",
    avaliacoes: 67,
    nota: 4.4,
    funcionarios: 12,
    score: 72,
    regime: "Simples Nacional",
    oportunidade: "media"
  },
  {
    nome: "Academia PowerFit",
    cat: "Academias",
    cidade: "Francisco Sá",
    endereco: "Av. Getúlio Vargas, 600",
    site: "www.powerfit.com.br",
    tel: "(38) 3233-7890",
    avaliacoes: 198,
    nota: 4.7,
    funcionarios: 22,
    score: 85,
    regime: "Simples Nacional",
    oportunidade: "alta"
  },
  {
    nome: "Clínica Norte Saúde",
    cat: "Clínicas médicas",
    cidade: "Montes Claros",
    endereco: "Av. Deputado Esteves Rodrigues, 1500",
    site: "www.clinicanortesaude.com.br",
    tel: "(38) 3221-1020",
    avaliacoes: 142,
    nota: 4.8,
    funcionarios: 18,
    score: 95,
    regime: "Simples Nacional",
    oportunidade: "alta"
  },
  {
    nome: "Cachaça Premium Salinas",
    cat: "Restaurantes",
    cidade: "Salinas",
    endereco: "Rodovia MG-404, Km 2",
    site: "www.cachacasalinasshow.com.br",
    tel: "(38) 3841-1122",
    avaliacoes: 280,
    nota: 4.9,
    funcionarios: 34,
    score: 98,
    regime: "Lucro Presumido",
    oportunidade: "alta"
  },
  {
    nome: "Fruticultura Vale do Gorutuba",
    cat: "Construtoras",
    cidade: "Janaúba",
    endereco: "Distrito Irrigado, Lote 45",
    site: "www.frutasgorutuba.com.br",
    tel: "(38) 3821-4300",
    avaliacoes: 95,
    nota: 4.6,
    funcionarios: 120,
    score: 90,
    regime: "Lucro Real",
    oportunidade: "alta"
  },
  {
    nome: "Cachaçaria Vale do São Francisco",
    cat: "Restaurantes",
    cidade: "Januária",
    endereco: "Av. Vasconcelos, 120",
    site: "www.cachacascjanuaria.com.br",
    tel: "(38) 3621-3400",
    avaliacoes: 75,
    nota: 4.5,
    funcionarios: 10,
    score: 82,
    regime: "Simples Nacional",
    oportunidade: "media"
  },
  {
    nome: "Navegação São Francisco Eireli",
    cat: "Transportadoras",
    cidade: "Pirapora",
    endereco: "Av. São Francisco, 10",
    site: "www.navesaofrancisco.com.br",
    tel: "(38) 3741-2300",
    avaliacoes: 110,
    nota: 4.7,
    funcionarios: 45,
    score: 87,
    regime: "Lucro Presumido",
    oportunidade: "alta"
  },
  {
    nome: "Reflorestamento Bocaiúva S/A",
    cat: "Empresas de software",
    cidade: "Bocaiúva",
    endereco: "Fazenda Olhos d'Água, s/n",
    site: "www.reflorestabocaiuva.com.br",
    tel: "(38) 3251-1234",
    avaliacoes: 44,
    nota: 4.3,
    funcionarios: 150,
    score: 89,
    regime: "Lucro Real",
    oportunidade: "media"
  }
];

export const landingServices = [
  {
    id: "abrir-empresa",
    icon: "Building2",
    title: "Abertura de Empresas",
    desc: "Abra sua empresa de forma rápida, segura e guiada com todo o suporte societário e enquadramento ideal."
  },
  {
    id: "troca-contador",
    icon: "Repeat",
    title: "Troca de Assessoria",
    desc: "Migramos toda a sua escrituração anterior de forma imperceptível e sem custos adicionais de transição."
  },
  {
    id: "planejamento",
    icon: "Calculator",
    title: "Assessoria Tributária",
    desc: "Reduza legalmente sua carga fiscal com análises contínuas de elisão e reestruturação corporativa."
  },
  {
    id: "bpo-financeiro",
    icon: "Wallet",
    title: "BPO Financeiro",
    desc: "Terceirize o departamento de tesouraria: contas a pagar, faturamento de notas e relatórios de fluxo de caixa."
  },
  {
    id: "folha-pgto",
    icon: "Receipt",
    title: "Folha e Recursos Humanos",
    desc: "Gestão pontual de pessoal, férias, rescisões, pró-labore e as complexas declarações do eSocial."
  },
  {
    id: "consultoria",
    icon: "Briefcase",
    title: "Consultoria de Negócios",
    desc: "Suporte consultivo estratégico para consolidação de balanços, valuation e planos de crescimento sustentáveis."
  }
];

export const landingTestimonials = [
  {
    text: "A Contabilidade Nobel revolucionou nossa gestão fiscal de ponta a ponta. Conseguimos reestruturar nossas operações e reduzir em 30% a carga tributária no primeiro semestre com o planejamento estratégico deles.",
    name: "Ricardo Ferreira",
    role: "CEO, TechSolutions Brasil",
    avatar: "RF"
  },
  {
    text: "O acesso à plataforma deles é fenomenal. Consigo baixar todas as certidões e guias consolidadas pelo celular em segundos. Além disso, o suporte do time Nobel via IA integrada nos poupa inúmeras horas mensais.",
    name: "Dra. Maria Santos",
    role: "Diretora Clínica São Rafael",
    avatar: "MS"
  },
  {
    text: "A transição de assessores anterior parecia intimidadora, mas o time Nobel cuidou de tudo em menos de 48 horas. A automatização do envio das obrigações acessórias nos deu total conformidade.",
    name: "André Lima",
    role: "Fundador, Construtora Horizonte",
    avatar: "AL"
  }
];

export const initialCRMLeads: Lead[] = [
  { id: "1", nome: "TechSolutions Brasil", categoria: "Tecnologia", cidade: "Montes Claros", contato: "Carlos M.", valor: 4200, avatar: "CM" },
  { id: "2", nome: "Restaurante Sabor & Arte", categoria: "Alimentação", cidade: "Salinas", contato: "Julia A.", valor: 1800, avatar: "JA" },
  { id: "3", nome: "Clínica OdontoVida", categoria: "Saúde", cidade: "Janaúba", contato: "Luis M.", valor: 3500, avatar: "LM" },
  { id: "4", nome: "Construtora Horizonte", categoria: "Construção", cidade: "Pirapora", contato: "Ana P.", valor: 8500, avatar: "AP" },
  { id: "5", nome: "Farmácia Bem Estar", categoria: "Saúde", cidade: "Bocaiúva", contato: "Thiago B.", valor: 2200, avatar: "TB" }
];

export const initialEmployees: Employee[] = [
  { id: "e1", nome: "Carlos Mendes", avatar: "CM", cargo: "Diretor Comercial", departamento: "comercial", tarefas: 42, produtividade: 98 },
  { id: "e2", nome: "Ana Paula", avatar: "AP", cargo: "Gerente Contábil", departamento: "contabil", tarefas: 128, produtividade: 96 },
  { id: "e3", nome: "Fernando Silva", avatar: "FS", cargo: "Analista Fiscal", departamento: "financeiro", tarefas: 85, produtividade: 94 },
  { id: "e4", nome: "Julia Rocha", avatar: "JR", cargo: "Líder de Atendimento", departamento: "atendimento", tarefas: 312, produtividade: 99 }
];

export const initialAccounts: FinancialAccount[] = [
  { id: "f1", nome: "Licenças de Software", descricao: "Assinaturas de ERP e sistemas", vencimento: "10/06/2026", valor: 18500, status: "Pendente" },
  { id: "f2", nome: "Imobiliária Centro", descricao: "Aluguel da sede física", vencimento: "15/06/2026", valor: 12000, status: "Pendente" },
  { id: "f3", nome: "Concessionária Elétrica", descricao: "Conta de energia mensal", vencimento: "20/06/2026", valor: 3450, status: "Agendado" },
  { id: "f4", nome: "Papelaria Moderna", descricao: "Material de expediente", vencimento: "25/06/2026", valor: 2180, status: "Pago" }
];

export const initialDocuments: DocumentInfo[] = [
  { id: "d1", nome: "Balancete_Maio.pdf", ext: "pdf", tamanho: "2.4 MB", data: "28/05/2026", status: "Indexado" },
  { id: "d2", nome: "NFe_123456.xml", ext: "xml", tamanho: "45 KB", data: "10/06/2026", status: "Indexado" },
  { id: "d3", nome: "Contrato_Social_Assinado.pdf", ext: "pdf", tamanho: "1.2 MB", data: "15/01/2026", status: "Indexado" },
  { id: "d4", nome: "Folha_Maio.xlsx", ext: "xlsx", tamanho: "890 KB", data: "30/05/2026", status: "Indexado" }
];

export const initialEvents: EventLog[] = [
  { id: "ev1", title: "Novo cliente integrado", details: "Clínica Vida Plena - Enquadrada no Simples Nacional", time: "há 15 minutos", type: "success" },
  { id: "ev2", title: "Obrigação entregue", details: "SPED Fiscal gerado e transmitido à receita federal", time: "há 42 minutos", type: "info" },
  { id: "ev3", title: "Follow-up agendado", details: "Ligação para prospect Construtora Horizonte agendada para 14h", time: "há 1 hora", type: "warning" }
];
