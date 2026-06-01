// Dados de demonstracao para o sistema
import { Cliente, Receita, Despesa, Colaborador, Prospect, MetaMensal, TransacaoFluxoCaixa, ObrigacaoFiscal, Tarefa, DadosDashboard } from './types';

export const mockDashboard: DadosDashboard = {
  faturamentoMensal: 185000,
  faturamentoAnual: 2220000,
  lucroLiquido: 62500,
  margemLucro: 33.8,
  totalClientes: 347,
  clientesInadimplentes: 12,
  honorariosReceber: 42000,
  honorariosRecebidos: 143000,
  custoFixoMensal: 98500,
  pontoEquilibrio: 82000,
};

export const mockClientes: Cliente[] = [
  {
    id: '1',
    codigo: 'CLI001',
    nome: 'Supermercado Central Ltda',
    cnpj: '12.345.678/0001-90',
    regimeTributario: 'LucroPresumido',
    porte: 'Medio',
    cidade: 'Montes Claros',
    estado: 'MG',
    telefone: '(38) 99999-1234',
    email: 'contato@supermercadocentral.com.br',
    responsavel: 'Joao Silva',
    dataEntrada: '2020-03-15',
    situacao: 'Ativo',
    servicosContratados: ['Contabilidade', 'Fiscal', 'DP'],
    honorarioMensal: 3500,
    scoreSaude: 92,
    observacoes: 'Cliente excelente, sempre pontual',
  },
  {
    id: '2',
    codigo: 'CLI002',
    nome: 'Clinica Medica Sao Lucas Eireli',
    cnpj: '98.765.432/0001-10',
    regimeTributario: 'Simples',
    porte: 'ME',
    cidade: 'Pirapora',
    estado: 'MG',
    telefone: '(38) 99999-5678',
    email: 'financeiro@clinicasaolucas.com.br',
    responsavel: 'Dra. Maria Santos',
    dataEntrada: '2021-07-22',
    situacao: 'Ativo',
    servicosContratados: ['Contabilidade', 'Fiscal'],
    honorarioMensal: 1800,
    scoreSaude: 78,
    observacoes: 'Aguardando regularizacao de documentos',
  },
  {
    id: '3',
    codigo: 'CLI003',
    nome: 'Fazenda Nova Esperanca',
    cnpj: '11.222.333/0001-44',
    regimeTributario: 'LucroPresumido',
    porte: 'Grande',
    cidade: 'Januaria',
    estado: 'MG',
    telefone: '(38) 99999-9012',
    email: 'administracao@fazendanova.com.br',
    responsavel: 'Carlos Oliveira',
    dataEntrada: '2019-01-10',
    situacao: 'Ativo',
    servicosContratados: ['Contabilidade', 'Fiscal', 'DP', 'Consultoria'],
    honorarioMensal: 8500,
    scoreSaude: 95,
    observacoes: 'Cliente estrategico, alto valor',
  },
  {
    id: '4',
    codigo: 'CLI004',
    nome: 'Maria Antonieta Doces Artesanais ME',
    cnpj: '44.555.666/0001-77',
    regimeTributario: 'MEI',
    porte: 'MEI',
    cidade: 'Bocaiuva',
    estado: 'MG',
    telefone: '(38) 99999-3456',
    email: 'maria@docesartesanais.com.br',
    responsavel: 'Maria Antonieta',
    dataEntrada: '2023-05-01',
    situacao: 'Ativo',
    servicosContratados: ['Contabilidade'],
    honorarioMensal: 299,
    scoreSaude: 100,
    observacoes: 'MEI exemplar, sem pendencias',
  },
  {
    id: '5',
    codigo: 'CLI005',
    nome: 'Tech Solutions Informatica Ltda',
    cnpj: '77.888.999/0001-00',
    regimeTributario: 'LucroReal',
    porte: 'Medio',
    cidade: 'Montes Claros',
    estado: 'MG',
    telefone: '(38) 99999-7890',
    email: 'financeiro@techsolutions.com.br',
    responsavel: 'Ricardo Mendes',
    dataEntrada: '2022-02-28',
    situacao: 'Ativo',
    servicosContratados: ['Contabilidade', 'Fiscal', 'DP', 'Legalizacao'],
    honorarioMensal: 4200,
    scoreSaude: 88,
    observacoes: 'Empresa em expansao',
  },
];

export const mockReceitas: Receita[] = [
  { id: '1', clienteId: '1', descricao: 'Honorarios Contabilidade', tipoServico: 'Contabilidade', valor: 3500, dataVencimento: '2025-06-01', status: 'Recebido', competencia: '2025-06' },
  { id: '2', clienteId: '1', descricao: 'Honorarios Fiscal', tipoServico: 'Fiscal', valor: 1200, dataVencimento: '2025-06-01', status: 'Recebido', competencia: '2025-06' },
  { id: '3', clienteId: '2', descricao: 'Honorarios Contabilidade', tipoServico: 'Contabilidade', valor: 1800, dataVencimento: '2025-06-05', status: 'Pendente', competencia: '2025-06' },
  { id: '4', clienteId: '3', descricao: 'Honorarios Contabilidade', tipoServico: 'Contabilidade', valor: 5000, dataVencimento: '2025-06-10', status: 'Recebido', competencia: '2025-06' },
  { id: '5', clienteId: '3', descricao: 'Consultoria Tributaria', tipoServico: 'Consultoria', valor: 3500, dataVencimento: '2025-06-10', status: 'Recebido', competencia: '2025-06' },
  { id: '6', clienteId: '4', descricao: 'Honorarios Contabilidade MEI', tipoServico: 'Contabilidade', valor: 299, dataVencimento: '2025-06-15', status: 'Pendente', competencia: '2025-06' },
  { id: '7', clienteId: '5', descricao: 'Honorarios Contabilidade', tipoServico: 'Contabilidade', valor: 2500, dataVencimento: '2025-06-20', status: 'Vencido', competencia: '2025-06' },
  { id: '8', clienteId: '5', descricao: 'Honorarios Legalizacao', tipoServico: 'Legalizacao', valor: 800, dataVencimento: '2025-06-20', status: 'Vencido', competencia: '2025-06' },
];

export const mockDespesas: Despesa[] = [
  { id: '1', descricao: 'Salario Equipe Contabilidade', categoria: 'Salarios', valor: 45000, dataVencimento: '2025-06-05', status: 'Pendente', fixo: true, departmento: 'Contabilidade' },
  { id: '2', descricao: 'Pro Labore Socio', categoria: 'ProLabore', valor: 15000, dataVencimento: '2025-06-05', status: 'Pendente', fixo: true, departmento: 'Diretoria' },
  { id: '3', descricao: 'Aluguel Escritorio', categoria: 'Aluguel', valor: 8500, dataVencimento: '2025-06-10', status: 'Pendente', fixo: true, departmento: 'Administrativo' },
  { id: '4', descricao: 'Software Contabil', categoria: 'Software', valor: 2500, dataVencimento: '2025-06-15', status: 'Pendente', fixo: true, departmento: 'TI' },
  { id: '5', descricao: 'Contador Social', categoria: 'Impostos', valor: 3200, dataVencimento: '2025-06-20', status: 'Pendente', fixo: true, departmento: 'Fiscal' },
  { id: '6', descricao: 'Marketing Digital', categoria: 'Marketing', valor: 1500, dataVencimento: '2025-06-25', status: 'Pendente', fixo: false, departmento: 'Marketing' },
];

export const mockColaboradores: Colaborador[] = [
  { id: '1', nome: 'Ana Paula Souza', cargo: 'Contadora Senior', salario: 8500, custoHora: 52, produtividade: 95, email: 'ana@nobel.com.br', telefone: '(38) 99999-1111', dataAdmissao: '2018-03-01' },
  { id: '2', nome: 'Carlos Eduardo Lima', cargo: 'Contador', salario: 6500, custoHora: 40, produtividade: 88, email: 'carlos@nobel.com.br', telefone: '(38) 99999-2222', dataAdmissao: '2020-06-15' },
  { id: '3', nome: 'Fernanda Costa', cargo: 'Assistente Contabil', salario: 3500, custoHora: 22, produtividade: 82, email: 'fernanda@nobel.com.br', telefone: '(38) 99999-3333', dataAdmissao: '2022-01-10' },
  { id: '4', nome: 'Pedro Henrique Alves', cargo: 'Analista Fiscal', salario: 5500, custoHora: 34, produtividade: 90, email: 'pedro@nobel.com.br', telefone: '(38) 99999-4444', dataAdmissao: '2021-09-20' },
  { id: '5', nome: 'Juliana Martins', cargo: 'Gerente de Clientes', salario: 7500, custoHora: 46, produtividade: 92, email: 'juliana@nobel.com.br', telefone: '(38) 99999-5555', dataAdmissao: '2019-04-05' },
];

export const mockProspects: Prospect[] = [
  { id: '1', nomeEmpresa: 'Drogaria Sao Sebastiao', cidade: 'Montes Claros', categoria: 'Farmacias e Drogarias', faturamentoEstimado: 2500000, regimeProbavel: 'Simples', contato: 'Roberto Nunes', canal: 'Google', etapa: 'Negociacao', scorePotencial: 85, observacoes: 'Interessado em servicos completos', dataCriacao: '2025-05-10' },
  { id: '2', nomeEmpresa: 'Construtora Vale do Sao Francisco', cidade: 'Pirapora', categoria: 'Construtoras e Incorporadoras', faturamentoEstimado: 8000000, regimeProbavel: 'Lucro Presumido', contato: 'Eng. Marcos Pereira', canal: 'Indicacao', etapa: 'PropostaEnviada', scorePotencial: 92, observacoes: 'Obra grande em andamento', dataCriacao: '2025-05-15' },
  { id: '3', nomeEmpresa: 'Clinica Odontologica Sorriso', cidade: 'Bocaiuva', categoria: 'Consultorios Odontologicos', faturamentoEstimado: 800000, regimeProbavel: 'Simples', contato: 'Dra. Carla Rodrigues', canal: 'ColdCall', etapa: 'ContatoInicial', scorePotencial: 78, observacoes: 'Primeiro contato realizado', dataCriacao: '2025-05-20' },
  { id: '4', nomeEmpresa: 'Restaurante Tempero Caseiro', cidade: 'Januaria', categoria: 'Restaurantes e Lanchonetes', faturamentoEstimado: 400000, regimeProbavel: 'MEI', contato: 'Seu Jose', canal: 'Redes', etapa: 'FechadoGanho', scorePotencial: 70, observacoes: 'Cliente fechado em maio', dataCriacao: '2025-04-25' },
];

export const mockMetas: MetaMensal[] = [
  { id: '1', mes: 'Janeiro', ano: 2025, metaFaturamento: 170000, metaClientes: 320, metaNovosClientes: 8, realizadoFaturamento: 168500, realizadoClientes: 318, realizadoNovosClientes: 7 },
  { id: '2', mes: 'Fevereiro', ano: 2025, metaFaturamento: 172000, metaClientes: 325, metaNovosClientes: 8, realizadoFaturamento: 175200, realizadoClientes: 327, realizadoNovosClientes: 9 },
  { id: '3', mes: 'Marco', ano: 2025, metaFaturamento: 175000, metaClientes: 330, metaNovosClientes: 10, realizadoFaturamento: 178000, realizadoClientes: 335, realizadoNovosClientes: 12 },
  { id: '4', mes: 'Abril', ano: 2025, metaFaturamento: 178000, metaClientes: 338, metaNovosClientes: 10, realizadoFaturamento: 180000, realizadoClientes: 340, realizadoNovosClientes: 11 },
  { id: '5', mes: 'Maio', ano: 2025, metaFaturamento: 180000, metaClientes: 343, metaNovosClientes: 10, realizadoFaturamento: 182500, realizadoClientes: 344, realizadoNovosClientes: 9 },
  { id: '6', mes: 'Junho', ano: 2025, metaFaturamento: 185000, metaClientes: 350, metaNovosClientes: 12, realizadoFaturamento: 0, realizadoClientes: 347, realizadoNovosClientes: 3 },
];

export const mockFluxoCaixa: TransacaoFluxoCaixa[] = [
  { id: '1', data: '2025-06-01', tipo: 'Entrada', descricao: 'Recebimento Honorarios - Supermercado Central', valor: 4700, categoria: 'ReceitaServicos', realizado: true, clienteId: '1' },
  { id: '2', data: '2025-06-01', tipo: 'Entrada', descricao: 'Recebimento Honorarios - Fazenda Nova Esperanca', valor: 8500, categoria: 'ReceitaServicos', realizado: true, clienteId: '3' },
  { id: '3', data: '2025-06-05', tipo: 'Saida', descricao: 'Salarios Equipe', valor: 45000, categoria: 'Salarios', realizado: false },
  { id: '4', data: '2025-06-05', tipo: 'Saida', descricao: 'Pro Labore Socio', valor: 15000, categoria: 'ProLabore', realizado: false },
  { id: '5', data: '2025-06-10', tipo: 'Saida', descricao: 'Aluguel Escritorio', valor: 8500, categoria: 'Aluguel', realizado: false },
  { id: '6', data: '2025-06-15', tipo: 'Entrada', descricao: 'Recebimento Previsto - Clinica Sao Lucas', valor: 1800, categoria: 'ReceitaServicos', realizado: false, clienteId: '2' },
  { id: '7', data: '2025-06-20', tipo: 'Saida', descricao: 'Software Contabil', valor: 2500, categoria: 'Software', realizado: false },
  { id: '8', data: '2025-06-25', tipo: 'Entrada', descricao: 'Recebimento Previsto - Tech Solutions', valor: 4200, categoria: 'ReceitaServicos', realizado: false, clienteId: '5' },
];

export const mockObrigacoesFiscais: ObrigacaoFiscal[] = [
  { id: '1', nome: 'EFD-Contribuicoes', periodicidade: 'Mensal', prazo: '2025-06-10', status: 'Pendente', clientes: ['1', '5'] },
  { id: '2', nome: 'SPED Fiscal', periodicidade: 'Mensal', prazo: '2025-06-15', status: 'Pendente', clientes: ['1', '3', '5'] },
  { id: '3', nome: 'ECF', periodicidade: 'Anual', prazo: '2025-06-30', status: 'Pendente' },
  { id: '4', nome: 'DCTFWeb', periodicidade: 'Mensal', prazo: '2025-06-25', status: 'Pendente', clientes: ['3'] },
  { id: '5', nome: 'DEFIS', periodicidade: 'Anual', prazo: '2025-06-30', status: 'Pendente' },
  { id: '6', nome: 'GPS INSS', periodicidade: 'Mensal', prazo: '2025-06-20', status: 'Enviado' },
  { id: '7', nome: 'FGTS', periodicidade: 'Mensal', prazo: '2025-06-07', status: 'Enviado' },
];

export const mockTarefas: Tarefa[] = [
  { id: '1', titulo: 'Revisar DCTF - Fazenda Nova', descricao: 'Verificar valores e enviar DCTF mensal', prazo: '2025-06-25', status: 'Pendente', prioridade: 'Alta', responsavelId: '4', clienteId: '3', categoria: 'Fiscal' },
  { id: '2', titulo: 'Atualizar Cadastro - Tech Solutions', descricao: 'Alterar endereco conforme dokumen', prazo: '2025-06-03', status: 'EmAndamento', prioridade: 'Media', responsavelId: '3', clienteId: '5', categoria: 'Cadastro' },
  { id: '3', titulo: 'Gerar Relatorio DRE Mensal', descricao: 'Consolidar dados e gerar DRE de maio', prazo: '2025-06-05', status: 'Pendente', prioridade: 'Alta', responsavelId: '1', categoria: 'Gestao' },
  { id: '4', titulo: 'Reuniao Apresentacao - Construtora Vale', descricao: 'Apresentar proposta comercial', prazo: '2025-06-02', status: 'Pendente', prioridade: 'Critica', responsavelId: '5', categoria: 'Prospeccao' },
];

export const cidadesNorteMinas: string[] = [
  'Montes Claros', 'Januaria', 'Pirapora', 'Bocaiuva', 'Janauba', 'Unai', 'Patos de Minas',
  'Salinas', 'Francisco Sa', 'Brasilia de Minas', 'Coracao de Jesus', 'Mirabela', 'Espinosa',
  'Manga', 'Sao Francisco', 'Buritizeiro', 'Varrelandia', 'Claro dos Pecoes', 'Capitao Enéas',
  'Lontra', 'Juramento', 'Guaraciama', 'Engenheiro Navarro', 'Glaucilandia', 'Grao Mogol',
  'Josenopolis', 'Padre Carvalho', 'Riacho dos Machados', 'Serranopolis de Minas', 'Verdelandia'
];

export const categoriasProspect: string[] = [
  // Comercio Varejista
  'Supermercados e Mercadinhos', 'Farmacias e Drogarias', 'Lojas de Roupas e Calcados',
  'Material de Construcao', 'Concessionarias e Revendas de Veiculos', 'Postos de Combustivel',
  'Pet Shops', 'Oticas', 'Papelarias e Livrarias', 'Lojas de Eletronicos',
  // Saude
  'Clinicas Medicas', 'Consultorios Odontologicos', 'Clinicas de Psicologia', 'Fisioterapeutas',
  'Laboratorios de Analises Clinicas', 'Clinicas Veterinarias', 'Academias e Studios Fitness',
  'Clinicas de Estetica', 'Nutricionistas', 'Medicos Autonomos (PJ)',
  // Alimentacao
  'Restaurantes e Lanchonetes', 'Bares e Distribuidoras', 'Padarias e Confeitarias',
  'Pizzarias e Hamburguerias', 'Food Trucks e Delivery', 'Marmitarias',
  'Produtores Rurais com CNPJ', 'Agroindustrias Familiares', 'Frigorificos e Acougues',
  // Servicos Gerais
  'Oficinas Mecanicas', 'Servicos de Transporte e Frete', 'Transportadoras',
  'Empresas de Mudanca', 'Lavanderias', 'Graficas e Comunicacao Visual',
  'Dedetizadoras', 'Seguranca Patrimonial', 'Limpeza e Conservacao', 'Manutencao Predial',
  // Construcao Civil
  'Construtoras e Incorporadoras', 'Empreiteiras', 'Instalacoes Eletricas',
  'Hidraulica e Encanamento', 'Marmorarias e Revestimentos', 'Serralheiros e Metalurgicas',
  'Pintores e Gesseiros (PJ)', 'Arquitetos e Engenheiros (PJ)', 'Imobiliarias',
  'Administradoras de Condominios',
  // Tecnologia
  'Agencias de Marketing Digital', 'Desenvolvedores de Software (PJ)', 'Empresas de TI e Suporte',
  'Freelancers de Design (PJ)', 'YouTubers e Influenciadores (PJ)', 'E-commerces Locais',
  'Cursos Online e EAD', 'Impressao 3D e Prototipagem', 'Assistencia Tecnica de Celulares',
  'Provedor de Internet Local',
  // Educacao
  'Escolas Privadas', 'Cursos Tecnicos e Profissionalizantes', 'Cursinhos Pre-Vestibular',
  'Escolas de Idiomas', 'Creches e Pre-Escolas', 'Professores Autonomos (PJ)',
  'Autoescolas (CFC)', 'Academias de Artes Marciais', 'Escolas de Musica e Danca',
  // Agronegocio
  'Cooperativas Agropecuarias', 'Fazendas e Propriedades Rurais (PJ)', 'Produtores de Cafe',
  'Produtores de Soja e Milho', 'Pecuaristas com CNPJ', 'Revendas de Insumos Agricolas',
  'Empresas de Irrigacao', 'Avicolas e Suinoculturas', 'Produtores de Cachaca Artesanal',
  // Profissionais Liberais
  'Advogados e Escritorios Juridicos', 'Contadores Autonomos', 'Consultores de RH',
  'Corretores de Seguros', 'Corretores de Imoveis', 'Despachantes',
  'Auditores Independentes', 'Economistas (PJ)', 'Engenheiros Agronomos (PJ)',
  // Entretenimento
  'Hoteis e Pousadas', 'Eventos e Buffet', 'Fotografos e Videomakers (PJ)',
  'DJs e Bandas (PJ)', 'Parques e Clubes Recreativos', 'Casas Lotéricas',
  'Cooperativas de Credito', 'ONGs e Associacoes', 'Igrejas e Entidades Religiosas'
];

// Dados para graficos
export const dadosFaturamento12Meses = [
  { mes: 'Jul/24', faturamento: 145000, despesa: 98000 },
  { mes: 'Ago/24', faturamento: 152000, despesa: 102000 },
  { mes: 'Set/24', faturamento: 148000, despesa: 99000 },
  { mes: 'Out/24', faturamento: 165000, despesa: 105000 },
  { mes: 'Nov/24', faturamento: 170000, despesa: 108000 },
  { mes: 'Dez/24', faturamento: 185000, despesa: 115000 },
  { mes: 'Jan/25', faturamento: 168500, despesa: 105000 },
  { mes: 'Fev/25', faturamento: 175200, despesa: 110000 },
  { mes: 'Mar/25', faturamento: 178000, despesa: 112000 },
  { mes: 'Abr/25', faturamento: 180000, despesa: 113000 },
  { mes: 'Mai/25', faturamento: 182500, despesa: 115000 },
  { mes: 'Jun/25', faturamento: 185000, despesa: 122500 },
];

export const dadosReceitaPorServico = [
  { nome: 'Contabilidade', valor: 95000 },
  { nome: 'Fiscal', valor: 42000 },
  { nome: 'DP', valor: 28000 },
  { nome: 'Legalizacao', valor: 12000 },
  { nome: 'Consultoria', valor: 8000 },
];

export const dadosCrescimentoClientes = [
  { mes: 'Jan', clientes: 318 },
  { mes: 'Fev', clientes: 327 },
  { mes: 'Mar', clientes: 335 },
  { mes: 'Abr', clientes: 340 },
  { mes: 'Mai', clientes: 344 },
  { mes: 'Jun', clientes: 347 },
];

export const dadosProdutividade = [
  { nome: 'Ana Paula', produtividade: 95, tarefas: 45 },
  { nome: 'Carlos', produtividade: 88, tarefas: 38 },
  { nome: 'Fernanda', produtividade: 82, tarefas: 32 },
  { nome: 'Pedro', produtividade: 90, tarefas: 42 },
  { nome: 'Juliana', produtividade: 92, tarefas: 40 },
];

export const dadosDRE = {
  receitaBruta: 185000,
  deducoes: 2775,
  receitaLiquida: 182225,
  custosDiretos: 45000,
  margemContribuicao: 137225,
  despesasFixas: 53500,
  despesasVariaveis: 12000,
  ebitda: 71725,
  lucroOperacional: 71725,
  lucroLiquido: 62500,
};

export const rankingClientesRentaveis = [
  { nome: 'Fazenda Nova Esperanca', receita: 8500, custo: 3200, margem: 62.4 },
  { nome: 'Supermercado Central', receita: 4700, custo: 1800, margem: 61.7 },
  { nome: 'Tech Solutions', receita: 4200, custo: 2100, margem: 50.0 },
  { nome: 'Clinica Sao Lucas', receita: 1800, custo: 950, margem: 47.2 },
  { nome: 'Maria Antonieta Doces', receita: 299, custo: 180, margem: 39.8 },
];
