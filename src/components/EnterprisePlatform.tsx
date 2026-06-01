import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LayoutDashboard, 
  Users, 
  MapPin, 
  BrainCircuit, 
  Megaphone, 
  Wallet, 
  Calculator, 
  Receipt, 
  HardHat, 
  UserCircle, 
  Newspaper, 
  FolderOpen, 
  Users as UsersIcon, 
  Calendar, 
  Settings, 
  LogOut, 
  Bell, 
  MessageSquare, 
  Sun, 
  Moon, 
  Search, 
  TrendingUp, 
  TrendingDown, 
  AlertCircle, 
  Plus, 
  Filter, 
  Send, 
  Sparkles,
  CheckCircle,
  Copy,
  Wand2,
  FileCheck,
  FileText,
  Clock,
  Play,
  Share2,
  Download,
  Upload,
  UserPlus,
  Compass,
  Code,
  Table,
  Cpu,
  Trash2,
  MoreVertical,
  Check,
  Award as AwardIcon,
  LogIn,
  MessageCircle,
  Smartphone,
  Phone,
  Sliders,
  RefreshCw,
  Shield,
  Lock
} from 'lucide-react';

import { 
  empresasProspeccao, 
  initialCRMLeads, 
  initialEmployees, 
  initialAccounts, 
  initialDocuments, 
  initialEvents 
} from '../data';
import { Company, Lead, KanbanStatus, Employee, FinancialAccount, DocumentInfo, EventLog } from '../types';
import NobelLogo from './NobelLogo';
import { ChevronLeft, ChevronRight, ArrowUpRight } from 'lucide-react';
import { categoriasProspect } from '../lib/mock-data';
import { toast } from 'sonner';

const itensPorPagina = 10;
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(amount);
};

// ERP detailed sub-pages imports
import ReceitasPage from '../views/erp-receitas-page';
import DespesasPage from '../views/erp-despesas-page';
import FluxoCaixaPage from '../views/erp-fluxo-caixa-page';
import DREPage from '../views/erp-dre-page';
import PontoEquilibrioPage from '../views/erp-ponto-equilibrio-page';
import AgendaPage from '../views/agenda-page';
import NobelAcademy from './NobelAcademy';

const MARKETING_CAMPAIGNS: Record<string, Record<string, { title: string, subtitle: string, body: string, prompt: string }>> = {
  abertura: {
    instagram_post: {
      title: "🚀 Conquiste sua Independência Empresarial!",
      subtitle: "Passo a passo seguro para abrir seu CNPJ em 24h.",
      body: `Quer tirar sua ideia do papel em 2026? Com a Nobel Contabilidade, você abre sua empresa totalmente online, sem dores de cabeça e com enquadramento tributário planejado desde o primeiro dia!\n\n💡 Benefícios exclusivos:\n✅ Enquadramento ideal (reduza impostos legally)\n✅ Processo concluído em poucos dias\n✅ Suporte personalizado via WhatsApp\n\n👉 Clique no link da bio e comece agora! #Empreenda #CNPJ #Sucesso`,
      prompt: "photorealistic portrait of two young smiling Brazilian entrepreneurs holding standard corporate folders in a modern bright bookkeeping office with plants, professional lighting close up"
    },
    instagram_stories: {
      title: "📱 Seu CNPJ pronto em tempo recorde!",
      subtitle: "Abra sua empresa sem burocracia de forma online.",
      body: `Você sabia que o erro mais comum no início de uma empresa é escolher o enquadramento errado? 😱\n\nIsso pode custar caro em impostos desnecessários. Aqui na Nobel, nós analisamos seu segmento gratuitamente para você começar economizando!\n\nArrasta pra cima e abra sua empresa hoje! 👇`,
      prompt: "photorealistic view of a businesswoman in smart casual office wear analyzing charts and graphs on her tablet screen, beautiful workspace, natural soft background"
    },
    whatsapp_pitch: {
      title: "💬 Abordagem Comercial - CNPJ Facilitado",
      subtitle: "Mensagem pronta de prospecção via WhatsApp.",
      body: `Olá! Percebi que você está expandindo seus negócios e gostaria de saber se já possui um CNPJ formalizado ou se paga altas taxas tributárias como pessoa física? 💼\n\nA Nobel Contabilidade oferece abertura de empresa rápida e 100% online, garantindo uma economia de até 40% em impostos desde o faturamento inicial.\n\nPodemos fazer uma simulação de enquadramento sem compromisso hoje?`,
      prompt: "sleek minimalist office desk with accounting ledger, golden coin stacks, premium pen, high key lighting, bookkeeping aesthetic"
    },
    comercial_email: {
      title: "📧 Assunto: Facilitando a formalização da sua nova jornada empresarial",
      subtitle: "E-mail estratégico pronto para captação.",
      body: `Prezado(a),\n\nIniciar um novo empreendimento é um marco desafiador. Contudo, a burocracia para formalização e abertura de CNPJ não precisa ser um obstáculo.\n\nNa Nobel Contabilidade, desenvolvemos um modelo ágil de Abertura de Empresas onde cuidamos de todo o processo societário e do Planejamento Tributário Inicial. Assim, garantimos que sua empresa já nasça operando no regime com menor alíquota possível.\n\nGostaria de agendar um breve bate-papo de 10 minutos esta semana para planejarmos a formatação do seu negócio?\n\nAtenciosamente,\nEquipe Nobel Contabilidade`,
      prompt: "tidy luxury office conference room wooden table, notebooks, glass cup, corporate setting soft daylight, high end photograph"
    }
  },
  reducao_medicos: {
    instagram_post: {
      title: "🩺 Doutor(a), você está pagando mais impostos do que deveria?",
      subtitle: "Reduza sua tributação de clínica sob a regra do Fator R.",
      body: `Muitos médicos e profissionais de saúde atuam como Pessoa Física ou em regimes inadequados, chegando a pagar até 27,5% de IR! 💸\n\nAtravés da elisão tributária e do enquadramento inteligente no Simples Nacional (com o Fator R), reduzimos sua alíquota de impostos para apenas 6%!\n\nQuer planejar suas finanças clínicas de forma legal e eficiente?\n📱 Entre em contato via Mensagem Privada!`,
      prompt: "photorealistic close-up portrait of a friendly Brazilian female and male doctors smiling in a modern medical clinic lobby, blurred financial graph background, natural warm light"
    },
    instagram_stories: {
      title: "🏥 Economia Tributária para Médicos",
      subtitle: "Grave e reduza até 60% das guias de impostos mensais.",
      body: `Atenção profissionais de saúde! Se a sua clínica ou consultório está crescendo, pagar impostos na pessoa física é queimar dinheiro. 🔥\n\nA transição para o CNPJ médico Nobel pode reduzir suas gabelas de forma drástica.\n\nToca no botão abaixo e fale com nosso assessor especialista em saúde! 👇`,
      prompt: "photorealistic view of an accounting consultant explaining tax planning laws to a male doctor in his hospital office, both checking document and smiling"
    },
    whatsapp_pitch: {
      title: "💬 Prospecção Médica Especializada",
      subtitle: "Mensagem compacta com foco em consultórios.",
      body: `Olá, Dr(a)! Sabia que profissionais da saúde integrados sob o modelo de Planejamento da Nobel economizam em média R$ 34.000 por ano apenas aplicando o desconto do Fator R no Simples Nacional?\n\nRealizamos um diagnóstico gratuito do seu faturamento atual para encontrar gargalos tributários.\n\nPodemos enviar o relatório simulado de economia de impostos para o seu e-mail?`,
      prompt: "photorealistic closeup of a metal stethoscope on business tax papers with a calculator on rich dark wooden office table"
    },
    comercial_email: {
      title: "📧 Assunto: Otimização Fiscal e Redução de Alíquotas para Clínicas Médicas",
      subtitle: "E-mail corporativo de alta conversão fiscal.",
      body: `Prezado(a) Dr(a).,\n\nA rotina médica exige dedicação integral ao paciente. Infelizmente, isso muitas vezes impede a análise profunda dos impostos que incidem sobre seus honorários e faturamento clínico.\n\nDesenvolvemos uma especialização fiscal na área de saúde, permitindo que consultórios reduzam suas guias municipais e federais al nível mínimo (iniciando em 6% pelo Simples Nacional de forma 100% regularizada).\n\nCom uma análise rápida das suas últimas Notas Fiscais emitidas, conseguimos calcular o potencial exato de redução fiscal da sua prática médica.\n\nFardaria uma ligação rápida para esta quinta-feira?\n\nCordialmente,\nÁrea de Planejamento em Saúde - Nobel Contabilidade`,
      prompt: "luxury medical bookkeeping office, with an elegant doctor shaking hands with a smart suited financial advisor, high fidelity photo"
    }
  },
  bpo_financeiro: {
    instagram_post: {
      title: "📊 Terceirize o Financeiro e Foque no seu Negócio!",
      subtitle: "Gestão inteligente de fluxo de caixa sem custos de contratação.",
      body: `Você passa mais tempo faturando notas e organizando contas a pagar do que escalando suas vendas? ⏳\n\nCom o nosso BPO Financeiro, nós cuidamos da sua tesouraria: contas a pagar, faturamento, conciliação e emissão de relatórios operacionais diários!\n\nGanhe eficiência e reduza custos operacionais em até 60%.\n\n📩 Envie um Direct agora e consulte nossa assessoria de tesouraria!`,
      prompt: "photorealistic meeting room of accountants analyzing corporate finance growth bars on screen, teamwork in action, professional bokeh"
    },
    instagram_stories: {
      title: "💸 Chega de misturar Contas Pessoais com a Empresa!",
      subtitle: "Profissionalize sua tesouraria com BPO Financeiro.",
      body: `Seu extrato bancário pessoal se confunde com o da sua empresa? Isso é um risco contábil enorme! 🚨\n\nNossa equipe organiza todo o seu contas a pagar e receber, liberando seu tempo para o que realmente importa.\n\nToque aqui para falar com um consultor! Link na bio.`,
      prompt: "photorealistic close up shot of business hands performing neat cash audit counting real Brazilian Real notes on white marble table with receipts"
    },
    whatsapp_pitch: {
      title: "💬 Solução de Gargalo - BPO Financeiro",
      subtitle: "Abordagem com base em tempo livre para o gestor.",
      body: `Olá! Como está o fechamento financeiro do seu negócio esta semana? Sabia que gestores gastam cerca de 14 horas semanais com conciliação manual e envio de guias?\n\nNa Nobel, assumimos seu contas a pagar, emissão de notas e conciliação por uma fração do custo de um funcionário dedicado.\n\nPosso enviar uma estimativa de economia para terceirizar seu financeiro?`,
      prompt: "selective focus of corporate glass clock on a desk beside colorful financial statistics graphs, executive planning time management"
    },
    comercial_email: {
      title: "📧 Assunto: Como otimizar a gestão financeira da sua empresa sem contratar novos funcionários",
      subtitle: "E-mail de prospecção estratégica para BPO.",
      body: `Prezado(a) Diretor(a),\n\nA eficiência na tesouraria é o termômetro de sobrevivência de qualquer empresa. Porém, estruturar um departamento financeiro interno exige encargos, espaço físico e sistemas caros de RP.\n\nNosso serviço de BPO Financeiro assume todas essas rotinas (faturamento, conciliação, agendamento de liquidações) através de uma API sincronizada ao seu painel, emitindo relatórios de fluxo de caixa prontos para sua aprovação com um clique.\n\nPodemos fazer um teste rápido de fluxo de caixa para demonstrar os relatórios estratégicos Nobel?\n\nAtenciosamente,\nDiretoria de BPO Financeiro - Nobel`,
      prompt: "top-down flat lay photo of young professional business teammates collaborating at table with open laptop, charts, notebooks and pens"
    }
  },
  irpf_declaracao: {
    instagram_post: {
      title: "📅 Imposto de Renda 2026: Evite a Malha Fina!",
      subtitle: "Profissionais qualificados para sua declaração com máxima restituição.",
      body: `A temporada de Declaração de IRPF 2026 já está aberta! Não corra o risco de cair nas garras da Receita Federal por erros simples de digitação ou cruzamento de dados.\n\nNossos especialistas em alta renda garantem:\n✅ Cruzamento rigoroso de informes bancários e imobiliários\n✅ Deduções legais maximizadas (restituição garantida)\n✅ Envio seguro com comprovante em minutos\n\nReserve seu horário e evite multas de atraso! Link na bio.`,
      prompt: "photorealistic portrait of a happy young Brazilian family sitting at home smiling at their financial consultant who shows tax refund on laptop screen"
    },
    instagram_stories: {
      title: "🔍 Sabia que investimento no exterior cai na Malha Fina mais rápido?",
      subtitle: "Evite multas e regularize sua carteira de investimentos no IRPF 2026.",
      body: `Declarou criptomoedas, ações ou dividendos estrangeiros incorretamente? 🫣\n\nA Receita Federal está rastreando cruzamentos de dados automáticos in 2026. Deixe que nosso time de especialistas em investimentos blinde sua declaração!\n\nArrasta pra cima e declare com quem entende! 🔥`,
      prompt: "photorealistic view of business auditor checking financial receipts very closely under bright desk lamp, focused detailed shot of ledger papers"
    },
    whatsapp_pitch: {
      title: "💬 Captação Urgente - Declaração IRPF 2026",
      subtitle: "Mensagem objetiva para base de leads.",
      body: `Olá! Já providenciou o envio da sua declaração do Imposto de Renda Pessoa Física de 2026? Sabia que o quanto antes você envia, mais rápido recebe sua Restituição no lote inicial? 💵\n\nNossa equipe é especializada em IRPF para investidores, médicos e empresários. Cuidamos de todo o processo por um valor extremamente acessível.\n\nPosso reservar uma agenda para analisar seus comprovantes?`,
      prompt: "photorealistic closeup shot of elegant executive hand signing a formal tax declaration file using custom classic green fountain pen"
    },
    comercial_email: {
      title: "📧 Assunto: Blindagem Patrimonial e Declaração Inteligente do IRPF 2026",
      subtitle: "E-mail especializado em alta renda para Imposto de Renda.",
      body: `Prezado(a),\n\nA declaração do Imposto de Renda da Pessoa Física (IRPF) exige cuidados especiais, principalmente quando envolve fluxos de pró-labore, distribuição de lucros isentos, investimentos financeiros ou transações imobiliárias.\n\nQualquer inconsistência nos cruzamentos da Receita pode reter seu CPF e bloquear certidões negativas.\n\nOferecemos assessoria completa para preenchimento, retificação e otimização das deduções da sua declaração IRPF 2026, mitigando riscos de malha fiscal e assegurando o máximo de retorno financeiro legalmente possível.\n\nVamos agendar o envio dos seus informes de rendimentos para análise técnica?\n\nForte abraço,\nDiretoria de IRPF - Nobel Contabilidade`,
      prompt: "photorealistic secure metal vault locker surrounded by tax papers and stacks of gold money, wealth protection concept photo"
    }
  }
};

const ACCOUNTING_HELP_TUTORIAL: Record<string, {
  title: string,
  concept: string,
  steps: string[],
  tips: string,
  workflow: string
}> = {
  dashboard: {
    title: "Dashboard Executivo",
    concept: "É o painel central onde o empresário e a contabilidade enxergam a saúde financeira consolidada da empresa sem precisar ler planilhas difíceis. Aqui estão os KPIs (Indicadores-Chave de Desempenho).",
    steps: [
      "Este painel é automático: ele lê todos os dados que você ou a contabilidade inserem em 'ERP Contábil' e na 'Gestão de Clientes' e gera gráficos atualizados em tempo real.",
      "Para gerenciar os alertas fiscais, consulte os cartões sob 'Obrigações e Certidões' para resolver pendências federais, estaduais ou municipais diretamente de forma guiada.",
      "Você pode alternar o Tema (Claro/Escuro) utilizando o interruptor no topo do painel para facilitar a visualização de gráficos de faturamento."
    ],
    tips: "Utilize o gráfico de Ponto de Equilíbrio para visualizar o faturamento mínimo mensal que sua empresa precisa para cobrir todas as despesas decorrentes do faturamento.",
    workflow: "Lançamento no ERP de Contratos/Receitas -> Atualização automática de Gráficos e KPIs no Dashboard."
  },
  erp: {
    title: "ERP Contábil Integrado",
    concept: "O coração financeiro do seu negócio. O ERP (Enterprise Resource Planning) é onde registramos as entradas de dinheiro (Receitas), saídas (Despesas) e geramos relatórios essenciais como a DRE (Demonstração de Resultado do Exercício) e o Fluxo de Caixa.",
    steps: [
      "Para cadastrar uma RECEITA (Entradas/Faturamentos): Acesse a aba 'Receitas', e clique em 'Nova Receita'. No formulário, preencha o valor da Nota Fiscal, selecione o Cliente (previamente cadastrado na aba Clientes), a categoria (serviços, produtos) e a data de emissão. Salve para atualizar seus ativos corporativos.",
      "Para cadastrar uma DESPESA (Saídas/Custos): Acesse a aba 'Despesas', e clique em 'Adicionar Despesa'. Preencha a descrição (ex: 'Aluguel comercial', 'Energia elétrica', 'Sistemas de TI'), selecione a categoria correta, a data de vencimento, o valor e o status (Pago/Pendente).",
      "Para analisar demonstrativos financeiros: Navegue para a sub-aba 'DRE' para exportar seu relatório operacional de Lucros versus Perdas (EBITDA)."
    ],
    tips: "Certifique-se de preencher sempre as categorias corretas das despesas. Se você é iniciante: despesa é tudo que sai de caixa (custos fixos, variáveis, impostos); receita é o faturamento bruto gerado com suas vendas ou serviços prestados ao mercado.",
    workflow: "Cadastro de Clientes e Notas -> Registro de Contas a Pagar/Receber -> Geração automática do Fluxo de Caixa e DRE."
  },
  clientes: {
    title: "Gestão de Clientes",
    concept: "Aqui você gerencia todos os CNPJs atendidos pela contabilidade, seus regimes de tributação (Simples Nacional, Lucro Presumido, Lucro Real) e e-mails de cobrança.",
    steps: [
      "Para cadastrar um CLIENTE: Clique no botão 'Cadastrar Novo Cliente' no final da tabela. Insira o nome comercial ou Razão Social, o CNPJ (fundamental para cruzamentos automáticos de guias federais), o e-mail de contato e use o campo para marcar o regime de tributação fiscal correspondente.",
      "Diferença essencial de Regimes de Tributação:\n• Simples Nacional: Para pequenas empresas (tributação unificada simplificada);\n• Lucro Presumido: Imposto calculado sob estimativa governamental (bom para altas margens de faturamento);\n• Lucro Real: Imposto calculado sob lucro real líquido exato (comprovado por balanço completo)."
    ],
    tips: "Mantenha o status do cliente como 'Ativo' para que ele seja habilitado nas opções de faturamento e receitas do ERP principal.",
    workflow: "Abertura do CNPJ do Cliente -> Enquadramento Tributário Recomendado -> Ativação na base de dados Nobel."
  },
  crm: {
    title: "CRM & Funil de Contratos",
    concept: "O funil comercial da Nobel. Gerencie seus prospectos (empresas interessadas nos serviços contábeis) desde a abordagem inicial até o fechamento de contrato.",
    steps: [
      "Para cadastrar uma OPORTUNIDADE: Clique em 'Novo Prospecto' no funil. Insira o nome, segmento de atuação e ticket médio negociado mensal.",
      "Controle Comercial: Arraste ou clique nos botões indiciais dos cartões para progredir os leads nas colunas 'Lead Novo', 'Contato Realizado', 'Proposta Enviada' e 'Fechado/Ganho'. Conforme as reuniões e ligações fluam.",
      "Quando o Lead Virar Cliente: Marque o cartão do lead consolidado como 'Ganho' (ou clique no check correspondente) para que ele migre diretamente para a sua lista de Clientes Ativos do escritório!"
    ],
    tips: "Alimente o histórico do prospecto e preencha o segmento de mercado para gerar propostas comerciais via IA muito mais personalizadas.",
    workflow: "Abordagem rápida -> Reunião Diagnóstica -> Proposta Personalizada -> Assinatura Digital do Contrato Nobel."
  },
  prospeccao: {
    title: "Mapa de Prospecção Ativa",
    concept: "Uma inovação de geolocalização e captação ativa. Esse mapa encontra CNPJs e estabelecimentos ativos próximos a você em tempo real.",
    steps: [
      "Prospecção Geográfica: Digite um termo de pesquisa (ex: 'médico, clínica, imobiliária, consultório') e selecione a distância em km.",
      "Análise de Contatos: Clique nos marcadores azuis brilhantes no mapa interativo para abrir o perfil, endereço, nicho corporativo e número de telefone.",
      "Abordagem Automatizada: Clique no botão para disparar uma cópia do pitch altamente persuasivo gerado pela inteligência artificial Nobel adaptada ao segmento específico da empresa mapeada."
    ],
    tips: "Muito útil para encontrar empresas no Simples Nacional próximas para oferecer o serviço de BPO Financeiro da Nobel.",
    workflow: "Busca no Mapa -> Seleção de Empresa -> IA gera Abordagem Persuasiva -> Disparo Comercial via WhatsApp."
  },
  ia: {
    title: "Central Nobel AI",
    concept: "Sua inteligência parceira para desvendar dúvidas tributárias complexas, polir correspondências corporativas fiduciárias de alto nível e resolver cálculos especiais.",
    steps: [
      "Perguntas de Legislação: Digite termos ou regras complexas da Receita Federal (ex: 'Fator R Simples Nacional', 'Isenções de Ganho de Capital'). A IA retornará a legislação atual e análises estruturadas.",
      "Melhoria Textual: Copie e cole rascunhos em português e selecione a otimização de texto para transformá-los em mensagens de forte autoridade contábil para seus clientes.",
      "Hub de Imobiliária: Aproveite o assistente de ganho de capital e ITBI para propor as melhores estratégias societárias de holdings patrimoniais a incorporadores parceiros."
    ],
    tips: "Complemente os relatórios contábeis com os planos de holding patrimonial gerados aqui para surpreender e reter seus maiores clientes corporativos.",
    workflow: "Legislação Complexa -> Pergunta à Nobel AI -> Resposta Técnica Explicativa em Segundos."
  },
  marketing: {
    title: "Laboratório de Marketing",
    concept: "Automatize sua retenção e marketing digital em redes de contabilidade. Crie materiais para redes sociais em apenas um clique.",
    steps: [
      "Criação da Campanha: Selecione o segmento-alvo (ex: 'Abertura de Empresa', 'Médicos', 'BPO Financeiro', 'IRPF').",
      "Definição de Canal: Selecione se a publicação destina-se ao feed do Instagram, stories, script para envio de WhatsApp pessoal ou roteiro de e-mail comercial.",
      "Casting Visual: Selecione o tom de voz emocional e clique em 'Gerar Campanha com IA' para produzir texto envolvente combinado com uma imagem profissional inédita correspondente."
    ],
    tips: "Com a nossa exclusiva tecnologia Smart Seed, cada geração de imagem produz um criativo novo e com pessoas realistas, mudando completamente na tela!",
    workflow: "Nicho Alvo -> Canal Selecionado -> IA gera Textos e Imagens Fotográficas -> Atração de Leads."
  },
  portal: {
    title: "Portal do Cliente & Repositório",
    concept: "Um ambiente compartilhado e criptografado para o trâmite eletrônico e guarda definitiva de documentos contábeis entre o escritório e seus clientes parceiros.",
    steps: [
      "Envio de Relatórios: Use a interface no topo da tela para realizar upload manual (por clique ou soltando arquivos em drag-and-drop) de guias de impostos recolhidas, balancetes faturados ou relatórios admissionais.",
      "Organização Própria: Os registros ficam salvos e rotulados com tags de status ('Pendente', 'Visualizado' ou 'Processado') com data e competência.",
      "Pesquisa de Documentos: Filtre e faça download de arquivos PDF e XML a qualquer instante utilizando a barra dinâmica de buscas."
    ],
    tips: "Mantenha uma via eletrônica de comprovantes bancários aqui para resguardar o cliente de malhas fiscais futuras.",
    workflow: "Upload de Comprovantes/Notas -> Organização no Repositório -> Conciliação e Fechamento Integral de Balancete."
  },
  configuracoes: {
    title: "Configurações do Sistema",
    concept: "Área reservada para administração técnica, atualização dos dados contratuais do escritório e chaves de segurança fiduciária.",
    steps: [
      "Carga de Certificado Digital A1: Faça upload do arquivo de certificado `.pfx` para conceder acesso às consultas automáticas no e-CAC da Receita Federal com plena validade legal.",
      "Dados da Firma: Edite a Razão Social da contabilidade e CNPJ de origem que serão impressos no cabeçalho das propostas e balancetes faturados.",
      "Configuração de Tokens de API: Preencha as chaves operacionais para manter sincronizada sua agenda inteligente de obrigações contábeis."
    ],
    tips: "O certificado A1 digital criptografado PFX é fundamental para a automação de recebimentos e apurações sem necessidade de interações manuais exaustivas.",
    workflow: "Instalação do Certificado Digital -> Sincronismo na Receita Federal -> Automatização Plena do ERP."
  },
  agenda: {
    title: "Agenda Nobel de Obrigações",
    concept: "Uma agenda completa de conformidade onde você gerencia as datas limites de apuração dos impostos do Simples Nacional, Lucro Presumido e as rotinas fiscais dos contribuintes.",
    steps: [
      "Para cadastrar um NOVO AFACER/COMPROMISSO: Use o formulário 'Cadastrar Compromisso Contábil'. Preencha o nome da obrigação (Ex: 'Apuração e-Social', 'Emissão do DAS Simples', 'Entrega DCTF'), selecione o tipo de obrigação fiscal, o cliente responsável, a data de competência, o valor de recolhimento sugerido e clique em Cadastrar.",
      "Visualização por Meses: A agenda apresenta os compromissos em ordem de vencimento com alertas vermelhos vibrantes para obrigações que vencem no dia ou estão atrasadas.",
      "Conclusão e Baixa: Você pode clicar diretamente no botão 'Concluir' de qualquer atividade para marcar como concluído, assegurando que o cliente receba o aviso de quitação."
    ],
    tips: "Certifique-se de registrar a folha de pagamento e o DAS Simples sempre nos prazos legais (dia 20 de cada mês) para evitar multas de mora automáticas da Receita Federal.",
    workflow: "Criar novo encargo fiscal -> Monitorar vencimentos mensais -> Dar baixa e arquivar guias de pagamento."
  }
};

interface EnterprisePlatformProps {
  onBackToLanding: () => void;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  informativos: any[];
  setInformativos: React.Dispatch<React.SetStateAction<any[]>>;
}

export default function EnterprisePlatform({ onBackToLanding, theme, toggleTheme, informativos, setInformativos }: EnterprisePlatformProps) {
  // Sidebar State
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAcademyOpen, setIsAcademyOpen] = useState(false);

  // Help Tutorial State
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [helpTab, setHelpTab] = useState('dashboard');

  const getTabClassName = (tabName: string) => {
    const isSelected = activeTab === tabName;
    if (theme === 'dark') {
      return `w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-bold text-xs transition-all ${
        isSelected 
          ? 'bg-[#00b86b]/20 text-[#00b86b] border-[#00b86b] border-l-4' 
          : 'text-slate-350 hover:bg-[#253246]/50 hover:text-white border-l-4 border-transparent'
      }`;
    } else {
      return `w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-bold text-xs transition-all ${
        isSelected 
          ? 'bg-[#0a5c3a]/10 text-[#0a5c3a] border-l-4 border-[#0a5c3a]' 
          : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 border-l-4 border-transparent'
      }`;
    }
  };

  const renderHelpButton = (tabKey: string, sizeClasses = "w-5 h-5 text-xs") => (
    <button 
      onClick={(e) => {
        e.stopPropagation();
        setHelpTab(tabKey);
        setIsHelpOpen(true);
      }}
      className={`inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#D4AF37] to-[#0c3e26] text-white hover:scale-110 active:scale-95 transition-all cursor-pointer border-none shadow-md font-black relative group ${sizeClasses}`}
      title="Como usar esta aba? Clique para ver o Guia de Aprendizado Contábil"
    >
      <span>?</span>
      <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 px-2.5 py-1.5 bg-slate-950 text-white text-[9.5px] rounded-xl opacity-0 pointer-events-none group-hover:opacity-100 transition-all shadow-lg whitespace-nowrap z-50 border border-slate-800">
        Guia Contábil Passo-a-Passo
      </span>
    </button>
  );

  // CRM State
  const [leads, setLeads] = useState<Lead[]>(initialCRMLeads);
  const [leadStatus, setLeadStatus] = useState<Record<string, KanbanStatus>>({
    "1": "novo",
    "2": "novo",
    "3": "contato",
    "4": "qualificacao",
    "5": "diagnostico"
  });
  const [newLeadName, setNewLeadName] = useState('');
  const [newLeadCategory, setNewLeadCategory] = useState('Tecnologia');
  const [newLeadValue, setNewLeadValue] = useState('3000');

  // Prospector State
  const [prospectsList, setProspectsList] = useState<Company[]>(empresasProspeccao);
  const [isAiProspectingLoading, setIsAiProspectingLoading] = useState(false);
  
  const [prospecSubTab, setProspecSubTab] = useState<'localizador' | 'categorias'>('localizador');
  const [propSearch, setPropSearch] = useState('');
  const [propCidade, setPropCidade] = useState('');
  const [propCat, setPropCat] = useState('');
  const [activePropSearch, setActivePropSearch] = useState('');
  const [activePropCidade, setActivePropCidade] = useState('');
  const [activePropCat, setActivePropCat] = useState('');

  // States for 100 Melhores Categorias filtering with OK button
  const [catSearch, setCatSearch] = useState('');
  const [catSector, setCatSector] = useState('all');
  const [activeCatSearch, setActiveCatSearch] = useState('');
  const [activeCatSector, setActiveCatSector] = useState('all');
  const [paginaCategorias, setPaginaCategorias] = useState(1);

  const [mapQuery, setMapQuery] = useState('clinica medica sao paulo');
  const [customMapSearch, setCustomMapSearch] = useState('');

  // WhatsApp AI State
  const [isWhatsAppPanelOpen, setIsWhatsAppPanelOpen] = useState(false);
  const [waSegmento, setWaSegmento] = useState('Clínica Médica');
  const [waEmpresa, setWaEmpresa] = useState('');
  const [waNumero, setWaNumero] = useState('');
  const [waTone, setWaTone] = useState<'profissional' | 'amigavel' | 'direto'>('profissional');
  const [waGeneratedText, setWaGeneratedText] = useState('');

  // AI Chat State
  const [chatMessages, setChatMessages] = useState<any[]>([
    {
      id: "1",
      sender: "ai",
      text: "Olá! Sou a Nobel AI, especializada em planejamento fiscal e reestruturação regulatória sob as normas de 2026. Qual é o CNPJ ou segmento da empresa que deseja analisar?",
      timestamp: "15:06"
    }
  ]);
  const [chatInputValue, setChatInputValue] = useState('');
  const [selectedAIModel, setSelectedAIModel] = useState('gemini');
  const [aiIsLoading, setAiIsLoading] = useState(false);

  // Prospector Conversion State
  const [convertedProspectNames, setConvertedProspectNames] = useState<string[]>([]);
  const handleToggleProspectConversion = (nome: string) => {
    setConvertedProspectNames(prev => {
      if (prev.includes(nome)) {
        return prev.filter(n => n !== nome);
      } else {
        return [...prev, nome];
      }
    });
  };
  const handleConvertProspectToClient = (nome: string) => {
    handleToggleProspectConversion(nome);
  };

  // AI Center Tabs & Tool States
  const [aiActiveSubTab, setAiActiveSubTab] = useState<'chat' | 'email' | 'polidor' | 'imobiliaira'>('chat');
  
  // Email Generator States
  const [emailTipo, setEmailTipo] = useState<'comercial' | 'proposta' | 'cobranca' | 'boas_vindas'>('comercial');
  const [emailDestinatario, setEmailDestinatario] = useState('Imobiliária Rentabilidade');
  const [emailSegmento, setEmailSegmento] = useState('Mercado Imobiliário');
  const [emailDestaque, setEmailDestaque] = useState('Simulação de economia tributária com Holding Patrimonial e redução de imposto sobre locações de 27.5% para 11.3%');
  const [emailOutput, setEmailOutput] = useState('');
  const [emailIsLoading, setEmailIsLoading] = useState(false);

  // Polidor de Texto States
  const [polidorInput, setPolidorInput] = useState('');
  const [polidorTone, setPolidorTone] = useState<'fiduciario' | 'amigavel' | 'tecnico'>('fiduciario');
  const [polidorOutput, setPolidorOutput] = useState('');
  const [polidorIsLoading, setPolidorIsLoading] = useState(false);

  // Imobiliária Nobel Hub States
  const [imobiliairaTopic, setImobiliairaTopic] = useState<'holding' | 'itbi' | 'reajuste' | 'ganho_capital' | 'pitch'>('holding');
  const [imobiliairaInput, setImobiliairaInput] = useState('Exemplo: Apartamento de R$ 900.000 comprado por R$ 400.000, com aluguel mensal de R$ 4.500 no CPF.');
  const [imobiliairaOutput, setImobiliairaOutput] = useState('');
  const [imobiliairaIsLoading, setImobiliairaIsLoading] = useState(false);

  // Informativos management functions
  const handleUpdateInformativoField = (id: string, field: string, value: string) => {
    setInformativos((prev: any[]) => prev.map((inf: any) => inf.id === id ? { ...inf, [field]: value } : inf));
  };

  const handleResetDefaultInformativos = () => {
    const defaultInf = [
      {
        id: "inf-1",
        mes: "Março 2026",
        titulo: "Regras de IRPF 2026 e Isenção de Distribuição de Lucros",
        conteudo: "A temporada de Imposto de Renda exige atenção de sócios e diretores. A isenção tributária sobre lucros distribuídos é assegurada pela escrituração contábil regular. Na Nobel, nossa inteligência de monitoria avisa antecipadamente sobre gargalos nas declarações acessórias de IRPF.",
        dataEmissao: "12/03/2026",
        autor: "IA Nobel & Érika"
      },
      {
        id: "inf-2",
        mes: "Abril 2026",
        titulo: "Como o Domicílio Eletrônico (DTE) Blindará sua Empresa",
        conteudo: "Secretarias de Fazenda estaduais e municipais estão emitindo avisos de fiscalização exclusivamente por portais virtuais (DTE). Nossa plataforma de inteligência artificial automatizou as consultas diárias das caixas postais fiscais, permitindo conformidade instantânea e eliminando riscos de sanções.",
        dataEmissao: "15/04/2026",
        autor: "IA Nobel & Érika"
      },
      {
        id: "inf-3",
        mes: "Maio 2026",
        titulo: "Mudanças e Planejamento Fiscal para o Segundo Semestre",
        conteudo: "O monitoramento contínuo das faixas de receita no Simples Nacional is indispensável. Empresas em escala rápida de faturamento correm o risco de ultrapassar limites estaduais, o que acarreta cobranças retroativas graves. Sugerimos elisão consultiva preventiva.",
        dataEmissao: "22/05/2026",
        autor: "IA Nobel & Érika"
      }
    ];
    setInformativos(defaultInf);
  };

  const handleGenerateAIInformativo = (mes: string) => {
    const aiTitles: Record<string, string> = {
      "Março 2026": "Otimização Tributária de Pro-labore e Dividendos",
      "Abril 2026": "A Nova Automação do e-Social para Prestadores de Serviços",
      "Maio 2026": "Fator R de Saúde: Planejamento Tributário Legal para Clínicas"
    };
    const aiContents: Record<string, string> = {
      "Março 2026": "Análise preventiva da Nobel indica que mais de 45% das clínicas de serviços pagam INSS e IRPF de forma inflada nas retiradas básicas. A redistribuição fundamentada em lucros isentos com escrituração digital mitiga essa sobretaxação municipal e federal.",
      "Abril 2026": "A integração do e-Social em tempo real sob nosso ecossistema Nobel AI permite cruzamento eletrônico de dados cadastrais, reduzindo a zero o risco de pendências previdenciárias fiscais automáticas do novo regulamento de conformidade.",
      "Maio 2026": "Clínicas médicas e consultórios integrados no Simples Nacional possuem a prerrogativa legal de reduzir sua alíquota de 15,5% para apenas 6% por meio do Fator R. Nossa Inteligência Artificial simula mensalmente a razão das folhas para garantir a manutenção permanente deste benefício."
    };

    setInformativos((prev: any[]) => prev.map((inf: any) => {
      if (inf.mes === mes) {
        return {
          ...inf,
          titulo: aiTitles[mes] || inf.titulo,
          conteudo: aiContents[mes] || inf.conteudo,
          autor: "IA Nobel (Gerado)",
          dataEmissao: new Date().toLocaleDateString('pt-BR')
        };
      }
      return inf;
    }));
  };

  // Organization Details (Settings)
  const [razaoSocial, setRazaoSocial] = useState('Contabilidade Nobel Enterprise LTDA.');
  const [nomeMarca, setNomeMarca] = useState('Nobel Contabilidade');
  const [telefoneAtendimento, setTelefoneAtendimento] = useState('(11) 98834-2201');
  const [emailCorporativo, setEmailCorporativo] = useState('retaguarda@nobelcontabilidade.com.br');
  const [googleDriveLink, setGoogleDriveLink] = useState('https://drive.google.com/drive/folders/1FSvponZUXZ8SPwaRa960WaWY3ivvgpGR?usp=sharing');

  // Marketing states
  const [generatedMarketing, setGeneratedMarketing] = useState<{title: string, desc: string, body: string} | null>(null);
  const [marketingLoading, setMarketingLoading] = useState(false);

  // ERP Sub-Tab state
  const [erpSubTab, setErpSubTab] = useState<'receitas' | 'despesas' | 'fluxo-caixa' | 'dre' | 'ponto-equilibrio'>('receitas');

  // Interactive Sliders states for Break-even calculation
  const [erpFaturamento, setErpFaturamento] = useState<number>(185000);
  const [erpCustoFixo, setErpCustoFixo] = useState<number>(98500);
  const [erpMargemContribuicao, setErpMargemContribuicao] = useState<number>(65);

  // Client Management list and new inputs
  const [clientesList, setClientesList] = useState<any[]>([
    { id: "c1", nome: "Fazenda Nova Esperança", cnpj: "12.345.678/0001-90", regime: "Simples Nacional", honorario: 4500, status: "Ativo", adimplente: "Sim", synchronized: true },
    { id: "c2", nome: "Supermercado Central", cnpj: "98.765.432/0001-21", regime: "Lucro Real", honorario: 8200, status: "Ativo", adimplente: "Sim", synchronized: true },
    { id: "c3", nome: "Tech Solutions Brasil", cnpj: "45.678.901/0001-34", regime: "Lucro Presumido", honorario: 3100, status: "Ativo", adimplente: "Sim", synchronized: true },
    { id: "c4", nome: "Restaurante Chef's Table", cnpj: "23.456.789/0001-56", regime: "Simples Nacional", honorario: 1800, status: "Ativo", adimplente: "Sim", synchronized: false },
    { id: "c5", nome: "Clínica Vida Plena", cnpj: "34.567.890/0001-01", regime: "Simples Nacional", honorario: 1200, status: "Ativo", adimplente: "Sim", synchronized: true },
  ]);
  const [newCliName, setNewCliName] = useState('');
  const [newCliCnpj, setNewCliCnpj] = useState('');
  const [newCliRegime, setNewCliRegime] = useState('Simples Nacional');
  const [newCliHonorario, setNewCliHonorario] = useState('1500');
  const [newCliStatus, setNewCliStatus] = useState('Ativo');
  const [isSyncingAlterdata, setIsSyncingAlterdata] = useState(false);
  
  // Google Drive Active Synchronization State
  const [isSyncingDrive, setIsSyncingDrive] = useState(false);
  const [driveSynced, setDriveSynced] = useState(false);

  // New Marketing interactive state
  const [mktCategory, setMktCategory] = useState('abertura');
  const [mktChannel, setMktChannel] = useState('instagram_post');
  const [mktVoice, setMktVoice] = useState('profissional');
  const [generatedCreative, setGeneratedCreative] = useState<{ title: string, subtitle: string, body: string, imageUrl: string } | null>(null);
  const [isGeneratingMkt, setIsGeneratingMkt] = useState(false);

  // Robust System Configurations states
  const [apiAlterdata, setApiAlterdata] = useState('alt_live_883a9d82110cf9');
  const [apiGroq, setApiGroq] = useState('gsk_yA98Bc38dHj92KlmNopQ88231aa');
  const [apiWhatsApp, setApiWhatsApp] = useState('https://api.nobelbot.com/v1/webhook');
  const [apiPollinations, setApiPollinations] = useState('https://image.pollinations.ai/p/');
  const [ecacCnpj, setEcacCnpj] = useState('07.890.123/0001-12');
  const [ecacCertFile, setEcacCertFile] = useState<string | null>('certificado_nobel_2026.pfx');
  const [isSavingConfig, setIsSavingConfig] = useState(false);
  const [configSuccess, setConfigSuccess] = useState(false);
  const [configActiveTab, setConfigActiveTab] = useState<'integracoes' | 'certificado' | 'dados' | 'backup'>('integracoes');

  // Financeiro states
  const [financeiroTab, setFinanceiroTab] = useState<'pagar' | 'receber'>('pagar');
  const [accounts, setAccounts] = useState<FinancialAccount[]>(initialAccounts);
  
  // Documentos Upload states
  const [documents, setDocuments] = useState<DocumentInfo[]>(initialDocuments);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);

  // Tasks Checklist State (from the other dashboard)
  const [tasks, setTasks] = useState([
    { id: 't1', title: 'Revisar DCTF - Fazenda Nova', completed: false, priority: 'Alta', due: '05/06' },
    { id: 't2', title: 'Atualizar Cadastro - Tech Solutions', completed: true, priority: 'Média', due: '08/06' },
    { id: 't3', title: 'Gerar Relatório DRE Mensal', completed: false, priority: 'Alta', due: '10/06' },
    { id: 't4', title: 'Reunião Apresentação - Construtora Vale', completed: false, priority: 'Média', due: '15/06' },
  ]);
  const [newTaskText, setNewTaskText] = useState('');

  // Fiscal Obligations State (from the other dashboard)
  const [obligations, setObligations] = useState([
    { id: 'ob1', name: 'EFD-Contribuições', status: 'Concluído', due: '15/06', type: 'Guia Gerada' },
    { id: 'ob2', name: 'SPED Fiscal', status: 'Pendente', due: '20/06', type: 'Transmissão' },
    { id: 'ob3', name: 'ECF', status: 'Pendente', due: '25/06', type: 'Escrituração' },
    { id: 'ob4', name: 'DCTFWeb', status: 'Concluído', due: '15/06', type: 'Guia Gerada' },
  ]);

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskText.trim()) return;
    const newTask = {
      id: 't-' + Date.now(),
      title: newTaskText,
      completed: false,
      priority: 'Fácil',
      due: '12/06'
    };
    setTasks(prev => [...prev, newTask]);
    setNewTaskText('');
  };

  const toggleTask = (taskId: string) => {
    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, completed: !t.completed } : t));
  };

  const toggleObligation = (obId: string) => {
    setObligations(prev => prev.map(ob => ob.id === obId ? { ...ob, status: ob.status === 'Concluído' ? 'Pendente' : 'Concluído' } : ob));
  };

  // CRM status categories
  const kanbanColumns: { id: KanbanStatus; title: string; color: string }[] = [
    { id: 'novo', title: 'Lead Novo', color: 'bg-gray-400' },
    { id: 'contato', title: 'Contato', color: 'bg-sky-500' },
    { id: 'qualificacao', title: 'Qualificação', color: 'bg-amber-500' },
    { id: 'diagnostico', title: 'Diagnóstico', color: 'bg-emerald-500' },
    { id: 'proposta', title: 'Proposta', color: 'bg-violet-500' },
    { id: 'negociacao', title: 'Negociação', color: 'bg-orange-500' },
    { id: 'fechado', title: 'Fechado (Ganho)', color: 'bg-[#0a5c3a]' },
    { id: 'perdido', title: 'Perdido', color: 'bg-rose-500' }
  ];

  // Add CRM Lead
  const handleAddLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLeadName.trim()) return;

    const newId = String(leads.length + 1);
    const newLead: Lead = {
      id: newId,
      nome: newLeadName,
      categoria: newLeadCategory,
      cidade: "Montes Claros",
      contato: "Contato Direto",
      valor: parseFloat(newLeadValue) || 2000,
      avatar: newLeadName.slice(0, 2).toUpperCase()
    };

    setLeads(prev => [...prev, newLead]);
    setLeadStatus(prev => ({ ...prev, [newId]: 'novo' }));
    setNewLeadName('');
    setNewLeadValue('3000');
  };

  // Move CRM Lead status
  const moveLeadStatus = (leadId: string, nextStatus: KanbanStatus) => {
    setLeadStatus(prev => ({ ...prev, [leadId]: nextStatus }));
  };

  // Helper to normalize category name for resilient comparison (singular/plural, case, accents)
  const normalizeCategoryForMatch = (catName: string): string => {
    if (!catName) return "";
    let norm = catName.toLowerCase()
      .trim()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "") // remove accents
      .replace(/[^a-z0-9]/g, "");     // remove non-alphanumeric chars
    
    // Strip common plural suffixes in Portuguese
    if (norm.endsWith("s")) {
      if (norm.endsWith("is")) { // e.g. hospitais -> hospital
        norm = norm.slice(0, -2) + "l";
      } else if (norm.endsWith("oes")) { // e.g. construcoes -> construcao
        norm = norm.slice(0, -3) + "ao";
      } else {
        norm = norm.slice(0, -1);
      }
    }
    return norm;
  };

  // Helper to safely convert Portuguese plural category name to singular for search engines
  const getSingularForMaps = (cat: string): string => {
    if (!cat) return "";
    let s = cat.trim();
    if (s === "Autopeças") return s;
    if (s.endsWith("s")) {
      if (s.endsWith("is")) return s.slice(0, -2) + "l";
      if (s.endsWith("ões")) return s.slice(0, -3) + "ão";
      return s.slice(0, -1);
    }
    return s;
  };

  // Filter Prospect companies (only when activePropSearch, activePropCidade or activePropCat are applied via OK button)
  const filteredProspects = prospectsList.filter(emp => {
    const matchesSearch = !activePropSearch || 
                          emp.nome.toLowerCase().includes(activePropSearch.toLowerCase()) || 
                          emp.cat.toLowerCase().includes(activePropSearch.toLowerCase()) ||
                          getSingularForMaps(emp.cat).toLowerCase().includes(activePropSearch.toLowerCase());
                          
    const matchesCidade = !activePropCidade || emp.cidade === activePropCidade;
    
    // Support extremely resilient matching for category differences (e.g., "Academia" vs "Academias")
    const matchesCat = !activePropCat || 
                       normalizeCategoryForMatch(emp.cat) === normalizeCategoryForMatch(activePropCat) ||
                       emp.cat.toLowerCase().includes(activePropCat.toLowerCase().slice(0, -1)) ||
                       activePropCat.toLowerCase().includes(emp.cat.toLowerCase().slice(0, -1));
                       
    return matchesSearch && matchesCidade && matchesCat;
  });

  // Mapeamento e computação das 100 melhores categorias
  const mappedCategories = React.useMemo(() => {
    return categoriasProspect.map((cat, index) => {
      const catLower = cat.toLowerCase();
      const sectorTuple = (() => {
        // Agronegócio
        if (['agro', 'fazenda', 'propriedade', 'produtor', 'cafe', 'soja', 'milho', 'pecuarista', 'insumo', 'irriga', 'suino', 'avicola', 'cachaca', 'cooperativa'].some(term => catLower.includes(term))) {
          return { name: 'Agronegócio', baseScore: 94, regime: 'Lucro Presumido / Real', demanda: 'Alta' as const, fee: 6500, trend: 'Alta' };
        }
        // Saúde
        if (['medica', 'odont', 'psic', 'fisiot', 'clinica', 'veterin', 'laborat', 'estetic', 'nutri', 'medico', 'saude', 'sorriso'].some(term => catLower.includes(term))) {
          return { name: 'Saúde', baseScore: 92, regime: 'Simples Nacional / Presumido', demanda: 'Alta' as const, fee: 2400, trend: 'Alta' };
        }
        // Construção Civil
        if (['constr', 'incorpor', 'empreit', 'eletric', 'hidraul', 'encan', 'marmor', 'serral', 'metal', 'pintor', 'gessei', 'arqui', 'engenh', 'imobil', 'condominio'].some(term => catLower.includes(term))) {
          return { name: 'Construção Civil', baseScore: 90, regime: 'Lucro Presumido / Real', demanda: 'Alta' as const, fee: 5500, trend: 'Alta' };
        }
        // Tecnologia
        if (['marketing', 'software', 'dev', 'ti', 'suporte', 'design', 'youtub', 'influenc', 'e-com', 'online', 'ead', '3d', 'celular', 'internet'].some(term => catLower.includes(term))) {
          return { name: 'Tecnologia', baseScore: 88, regime: 'Simples Nacional / Presumido', demanda: 'Alta' as const, fee: 2200, trend: 'Muito Alta' };
        }
        // Educação
        if (['escola', 'tecnico', 'curso', 'vestib', 'idioma', 'creche', 'profess', 'autoesc', 'cfc', 'marciais', 'musica', 'danca'].some(term => catLower.includes(term))) {
          return { name: 'Educação', baseScore: 85, regime: 'Simples Nacional / Presumido', demanda: 'Media' as const, fee: 3200, trend: 'Estável' };
        }
        // Alimentação
        if (['restauran', 'lancho', 'bar', 'distrib', 'padar', 'confeit', 'pizza', 'hamburg', 'delivery', 'marmit', 'acoug', 'frigor', 'tempero'].some(term => catLower.includes(term))) {
          return { name: 'Alimentação', baseScore: 80, regime: 'Simples Nacional / MEI', demanda: 'Alta' as const, fee: 1200, trend: 'Estável' };
        }
        // Comercio Varejista
        if (['supermerc', 'mercad', 'farmac', 'drogar', 'roupa', 'calca', 'posto', 'pet', 'otica', 'papel', 'livra', 'eletron', 'varejo'].some(term => catLower.includes(term))) {
          return { name: 'Comércio Varejista', baseScore: 82, regime: 'Simples / Presumido', demanda: 'Alta' as const, fee: 2800, trend: 'Estável' };
        }
        // Profissionais Liberais
        if (['advog', 'jurid', 'conta', 'consult', 'rec', 'rh', 'segur', 'imove', 'despach', 'auditor', 'econo'].some(term => catLower.includes(term))) {
          return { name: 'Profissionais Liberais', baseScore: 78, regime: 'Simples Nacional (Fator R)', demanda: 'Media' as const, fee: 950, trend: 'Estável' };
        }
        // Entretenimento
        if (['hotel', 'pousad', 'event', 'buff', 'foto', 'video', 'dj', 'banda', 'parqu', 'clube', 'loteri', 'ong', 'associ', 'igreja'].some(term => catLower.includes(term))) {
          return { name: 'Entretenimento & Terceiro Setor', baseScore: 72, regime: 'Simples Nacional / Isento', demanda: 'Media' as const, fee: 1800, trend: 'Estável' };
        }
        // Serviços Gerais default
        return { name: 'Serviços Gerais', baseScore: 75, regime: 'Simples / Presumido', demanda: 'Media' as const, fee: 1600, trend: 'Estável' };
      })();

      // Adicionar variabilidade determinística para deixar realístico
      const lengthMod = (cat.length % 7);
      const calculatedScore = Math.min(index === 0 ? 99 : Math.max(50, sectorTuple.baseScore + (index % 5) + lengthMod), 99);
      
      return {
        nome: cat,
        setor: sectorTuple.name,
        score: calculatedScore,
        regime: sectorTuple.regime,
        demanda: sectorTuple.demanda,
        honorarios: sectorTuple.fee + (lengthMod * 130),
        tendencia: sectorTuple.trend
      };
    })
    .sort((a, b) => b.score - a.score)
    .map((item, sortedIdx) => ({
      ...item,
      rank: sortedIdx + 1
    }));
  }, []);

  const categoriasFiltradas = React.useMemo(() => {
    return mappedCategories.filter(cat => {
      const matchesSearch = !activeCatSearch || cat.nome.toLowerCase().includes(activeCatSearch.toLowerCase()) || 
                            cat.setor.toLowerCase().includes(activeCatSearch.toLowerCase());
      const matchesSector = activeCatSector === "all" || cat.setor === activeCatSector;
      return matchesSearch && matchesSector;
    });
  }, [mappedCategories, activeCatSearch, activeCatSector]);

  const totalPaginasCategorias = Math.ceil(categoriasFiltradas.length / itensPorPagina);
  const categoriasPaginadas = React.useMemo(() => {
    const inicio = (paginaCategorias - 1) * itensPorPagina;
    return categoriasFiltradas.slice(inicio, inicio + itensPorPagina);
  }, [categoriasFiltradas, paginaCategorias]);

  const handleApplyPropFilters = () => {
    setActivePropSearch(propSearch);
    setActivePropCidade(propCidade);
    setActivePropCat(propCat);
    toast.success("Filtros de prospecção aplicados!");
    handleAiProspecting(propCat);
  };

  // Handler for AI dynamic prospecting
  const handleAiProspecting = async (catParam?: string) => {
    const categoryToFind = catParam || propCat || activePropCat || "Supermercados e Mercadinhos";
    const cityToFind = propCidade || "Montes Claros";
    
    setIsAiProspectingLoading(true);
    const notificationId = toast.loading(`A Inteligência Artificial está localizando clientes para a categoria "${categoryToFind}" em ${cityToFind}...`);
    
    try {
      const response = await fetch("/api/generate-prospects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ category: categoryToFind, city: cityToFind })
      });
      
      if (!response.ok) {
        throw new Error("Erro na comunicação com a API de Prospecção por IA.");
      }
      
      const data = await response.json();
      if (data && data.prospects && Array.isArray(data.prospects) && data.prospects.length > 0) {
        const newProspects = data.prospects;
        
        setProspectsList(prev => {
          const filterNames = newProspects.map((p: any) => p.nome);
          const sanitizedPrev = prev.filter(p => !filterNames.includes(p.nome));
          return [...newProspects, ...sanitizedPrev];
        });
        
        // Update input and active filter values
        setPropCat(categoryToFind);
        setPropCidade(cityToFind);
        setActivePropCat(categoryToFind);
        setActivePropCidade(cityToFind);
        
        // Update map search with the singular form of the category for perfect Google Maps accuracy (e.g. "Academia" instead of "Academias")
        const singularMapsTerm = getSingularForMaps(categoryToFind);
        setMapQuery(`${singularMapsTerm} ${cityToFind}`);
        
        toast.dismiss(notificationId);
        toast.success(`A IA localizou ${newProspects.length} novos prospects qualificados em ${cityToFind}!`);
      } else {
        throw new Error("Nenhum prospect retornado pela Inteligência Artificial.");
      }
    } catch (error: any) {
      console.error("AI prospecting error:", error);
      toast.dismiss(notificationId);
      
      // Dynamic fallback generator for static hosting / GitHub Pages / offline mode
      try {
        const singular = getSingularForMaps(categoryToFind);
        const prefixes = ["Grupo", "Premium", "Central", "Norte", "Vanguarda", "Clínica", "Parceiros", "Forte", "Portal", "Líder"];
        const suffixes = ["Soluções", "Gerais", "Norte de Minas", "Associados", "e Filhos", "Distribuidora", "Empreendimentos", "Parcerias"];
        const streets = [
          "Av. Deputado Esteves Rodrigues",
          "Rua Dr. Santos",
          "Av. Ovídio de Abreu",
          "Rua Dom Pedro II",
          "Av. Sanitária",
          "Rua Presidente John Kennedy"
        ];
        
        const localProspects = Array.from({ length: 5 }).map((_, i) => {
          const prefix = prefixes[(i + singular.length) % prefixes.length];
          const suffix = suffixes[(i * 3 + singular.length) % suffixes.length];
          const name = `${prefix} ${singular} ${suffix}`;
          const siteBase = name.toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/[^a-z0-9]/g, "");
          const telDigits = 3000 + (name.length * 17) % 6000;
          return {
            nome: name,
            cat: categoryToFind,
            score: Math.floor(Math.random() * 20) + 79,
            endereco: `${streets[(i + categoryToFind.length) % streets.length]}, ${150 + i * 85}`,
            cidade: cityToFind,
            tel: `(38) 3215-${telDigits}`,
            site: `www.${siteBase}.com.br`,
            funcionarios: Math.floor(Math.random() * 32) + 6,
            regime: i % 3 === 0 ? "Lucro Presumido" : i % 3 === 1 ? "Simples Nacional" : "Lucro Real",
            avaliacoes: Math.floor(Math.random() * 150) + 12,
            nota: parseFloat((Math.random() * 0.8 + 4.2).toFixed(1)),
            oportunidade: Math.random() > 0.5 ? "alta" : "media"
          } as Company;
        });

        setProspectsList(prev => {
          const filterNames = localProspects.map((p: any) => p.nome);
          const sanitizedPrev = prev.filter(p => !filterNames.includes(p.nome));
          return [...localProspects, ...sanitizedPrev];
        });

        // Update input and active filter values
        setPropCat(categoryToFind);
        setPropCidade(cityToFind);
        setActivePropCat(categoryToFind);
        setActivePropCidade(cityToFind);

        const singularMapsTerm = getSingularForMaps(categoryToFind);
        setMapQuery(`${singularMapsTerm} ${cityToFind}`);

        toast.success(`[Buscador Inteligente Adaptativo] ${localProspects.length} prospects locais mapeados para ${cityToFind}!`);
      } catch (fallbackError) {
        toast.error("Ocorreu um erro ao processar buscas de contingência.");
      }
    } finally {
      setIsAiProspectingLoading(false);
    }
  };

  const handleApplyCatFilters = () => {
    setActiveCatSearch(catSearch);
    setActiveCatSector(catSector);
    setPaginaCategorias(1);
    toast.success("Filtros de categorias aplicados!");
  };

  const handleProspectCategory = (catName: string) => {
    setPropCat(catName);
    setActivePropCat(catName);
    setProspecSubTab('localizador');
    toast.success(`Redirecionando e filtrando mapa para: ${catName}`);
    handleAiProspecting(catName);
  };

  // Sync initial state of active filters with input states so something actually renders initially
  React.useEffect(() => {
    setActivePropSearch(propSearch);
    setActivePropCidade(propCidade);
    setActivePropCat(propCat);
    
    setActiveCatSearch(catSearch);
    setActiveCatSector(catSector);
  }, []);

  // Open WhatsApp AI assistant panel for specific prospect
  const handleOpenProspectWhatsApp = (emp: Company) => {
    setWaEmpresa(emp.nome);
    setWaSegmento(emp.cat);
    setWaNumero(emp.tel);
    setIsWhatsAppPanelOpen(true);
    generateWhatsAppDraft(emp.nome, emp.cat, waTone);
  };

  // Generate WhatsApp message draft
  const generateWhatsAppDraft = (empName: string, segment: string, tone: string) => {
    let draft = "";
    if (tone === 'profissional') {
      draft = `Olá, tudo bem? Me chamo Carlos Mendes, Diretor Comercial na Contabilidade Nobel.\n\nIdentifiquei a ${empName || 'sua empresa'} no segmento de ${segment || 'atuação'} e percebi excelentes oportunidades de maximização patrimonial alinhados à Reforma Tributária de 2026.\n\nOferecemos um diagnóstico prévio totalmente seguro e sem custos para mapear onde sua empresa se encontra. Gostaria de reservar uma breve apresentação nesta semana?`;
    } else if (tone === 'amigavel') {
      draft = `Oi, tudo bem? 😊\n\nSou do time Nobel! Passando para parabenizar o trabalho de vocês na ${empName || 'sua empresa'}. Nós ajudamos companhias do segmento de ${segment || 'relevância'} a eliminarem despesas acessórias ocultas e regularizar impostos municipais.\n\nPodemos fazer um bate-papo descontraído e uma simulação de economia sem compromisso? Me avisa se fizer sentido!`;
    } else {
      draft = `Olá!\n\nProjetamos uma oportunidade específica de alívio fiscal para a ${empName} no setor de ${segment}. Realizamos um diagnóstico estrutural gratuito em menos de 24 horas. Qual seria o melhor horário de contato?`;
    }
    setWaGeneratedText(draft);
  };

  const handleToneChange = (tone: 'profissional' | 'amigavel' | 'direto') => {
    setWaTone(tone);
    generateWhatsAppDraft(waEmpresa, waSegmento, tone);
  };

  // Trigger WhatsApp delivery
  const handleWAUrlSend = () => {
    const cleanNum = waNumero.replace(/\D/g, '');
    const url = `https://wa.me/${cleanNum.startsWith('55') ? cleanNum : '55' + cleanNum}?text=${encodeURIComponent(waGeneratedText)}`;
    window.open(url, '_blank');
  };

  // Chat with AI powered server router `/api/chat`
  const handleSendChatMessage = async () => {
    if (!chatInputValue.trim()) return;

    const userMsg = {
      id: String(chatMessages.length + 1),
      sender: 'user',
      text: chatInputValue,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatMessages(prev => [...prev, userMsg]);
    const originalInput = chatInputValue;
    setChatInputValue('');
    setAiIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          message: originalInput,
          model: selectedAIModel 
        })
      });

      if (!response.ok) {
        throw new Error('Falha na resposta do servidor.');
      }

      const data = await response.json();
      const aiMsg = {
        id: String(chatMessages.length + 2),
        sender: 'ai',
        text: data.reply || "Resposta indisponível do servidor.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setChatMessages(prev => [...prev, aiMsg]);
    } catch (err) {
      // Offline fallback simulations if server not run with GEMINI_API_KEY
      const fallbackMsg = {
        id: String(chatMessages.length + 2),
        sender: 'ai',
        text: `[Nobel AI - Modo Consultivo] Identifiquei sua mensagem sobre: "${originalInput}". Com base no Simples Nacional e nas novas regras contábeis, recomendo estruturar como Lucro Presumido caso seu faturamento supere R$ 80.000 mensais no comércio.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setChatMessages(prev => [...prev, fallbackMsg]);
    } finally {
      setAiIsLoading(false);
    }
  };

  // AI Helper functions: Email Idealizer, Text Polisher, and Imobiliaria Innovation Hub
  const handleGenerateEmailWithIA = async () => {
    setEmailIsLoading(true);
    setEmailOutput('');
    const prompt = `Crie um e-mail corporativo persuasivo e altamente estruturado do tipo "${emailTipo}" para a empresa "${emailDestinatario}" atuante no segmento de "${emailSegmento}". O e-mail deve detalhar e destacar especificamente este benefício/proposta real: "${emailDestaque}". Escreva em português, com vocabulário impecável, tom fiduciário de alta performance e excelente chamada de conversão comercial. Assinado pela Dra. Érika Nobel e equipe da Contabilidade Nobel. Comece o texto de resposta obrigatoriamente com "[Assunto: Seu Assunto Aqui]" de maneira identificável.`;
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: prompt, model: selectedAIModel })
      });
      if (!response.ok) throw new Error();
      const data = await response.json();
      setEmailOutput(data.reply);
    } catch (e) {
      const fallback = `[Assunto: Maximização de Caixa e Proteção Fiscal para ${emailDestinatario}]\n\nPrezada diretoria da ${emailDestinatario},\n\nEm nome da Dra. Érika Nobel e equipe da Contabilidade Nobel corporativa, contatamos seu escritório no segmento de ${emailSegmento} com propostas de alto nível.\n\nIdentificamos uma oportunidade exclusiva de alívio fiscal fundamentada no benefício de:\n👉 ${emailDestaque}\n\nOferecemos um mapeamento de créditos fiscais e passivos tributários integralmente sem custos para sua imobiliária nas próximas 24 horas.\n\nQual é o melhor telefone de contato de sua assessoria?\n\nCordiais saudações,\n\nDra. Érika Nobel\nFounder & Contadora Nobel AI`;
      setEmailOutput(fallback);
    } finally {
      setEmailIsLoading(false);
    }
  };

  const handlePolishTextWithIA = async () => {
    if (!polidorInput.trim()) return;
    setPolidorIsLoading(true);
    setPolidorOutput('');
    let toneDescription = "fiduciário inovador, profissional excelente e focado em negócios";
    if (polidorTone === "amigavel") toneDescription = "atencioso, próximo, claro, didático e acolhedor";
    if (polidorTone === "tecnico") toneDescription = "estritamente formal, jurídico, amparado em termos técnicos de auditoria e zelo legal";

    const prompt = `Melhore, limpe e reescreva o rascunho de texto abaixo para um tom corporativo impecável e elegante do estilo "${toneDescription}". Corrija gramática, aprimore a fluidez e coesão, eliminando repetições e trazendo o vocabulário de negócios de maior impacto. Preserve os dados reais. Rascunho original:\n\n"${polidorInput}"`;
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: prompt, model: selectedAIModel })
      });
      if (!response.ok) throw new Error();
      const data = await response.json();
      setPolidorOutput(data.reply);
    } catch (e) {
      const fallback = `[Rascunho Polido - Versão Final Nobel]\n\nPrezados parceiros, gostaríamos de formalizar os ajustes operacionais executados na presente apuração de tributos. Em observância estrita aos preceitos e as melhores práticas fiscais do corrente ano de 2026, otimizamos as guias para elisão tributária legítima.\n\nAtenciosamente, Dra. Érika Nobel e Assessoria.`;
      setPolidorOutput(fallback);
    } finally {
      setPolidorIsLoading(false);
    }
  };

  const handleGenerateImobiliariaIdeasWithIA = async () => {
    setImobiliairaIsLoading(true);
    setImobiliairaOutput('');
    let topicDesc = "";
    if (imobiliairaTopic === 'holding') {
      topicDesc = "Holding Patrimonial e economia em locação: Como colocar os imóveis numa empresa reduz o imposto sobre locação de 27.5% no CPF para até 11.33% no CNPJ";
    } else if (imobiliairaTopic === 'itbi') {
      topicDesc = "Batalha legal sobre ITBI: Como pagar imposto de transferência baseado no valor de venda real e não no valor de referência abusivo municipal";
    } else if (imobiliairaTopic === 'reajuste') {
      topicDesc = "Reajuste Amigável de Aluguel: Esboço de comunicação diplomática informando o locatário sobre correção monetária IPCA/IGP-M com empatia garantindo retenção";
    } else if (imobiliairaTopic === 'ganho_capital') {
      topicDesc = "Ganho de Capital e isenção dos 180 dias: Como vender um imóvel e reaver a isenção de imposto de renda ao comprar outro residencial no prazo legal";
    } else if (imobiliairaTopic === 'pitch') {
      topicDesc = "Pitch de Vendas Comercial para Imóvel: Criar uma descrição de alta conversão emocional com técnicas de copywriting contábil-financeiro para atrair compradores inteligentes";
    }

    const prompt = `Como parceiro de planejamento estratégico e contábil sênior da Dra. Érika Nobel com soluções exclusivas para Imobiliárias, forneça uma análise consultiva extraordinária e um plano surpreendente sobre o seguinte tópico: "${topicDesc}". Use este contexto real do usuário imobiliário: "${imobiliairaInput}". Traga tabelas de cálculo se pertinente, as leis aplicáveis, e uma estratégia de negócios matadora para impressionar e encantar. Escreva em português de forma clara, altamente fluida e profissional.`;
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: prompt, model: selectedAIModel })
      });
      if (!response.ok) throw new Error();
      const data = await response.json();
      setImobiliairaOutput(data.reply);
    } catch (e) {
      let fallback = `🏡 [Planejador Imobiliário Nobel AI - Análise Estratégica]\n\n`;
      if (imobiliairaTopic === 'holding') {
        fallback += `📌 VANTAGEM HOLDING PATRIMONIAL (BENS PRÓPRIOS)\n\n1. ANÁLISE DE IMPACTO FISCAL:\n  - Tributação de Aluguéis no CPF: Alíquota máxima progressiva atinge 27.5% mais recolhimento mensal (Carnê-Leão).\n  - Tributação na Holding Patrimonial: Se enquadrada no Lucro Presumido, a carga efetiva combinada de PIS, COFINS, IRPJ e CSLL totaliza 11.33% a 14.53% s/ faturamento bruto.\n\n2. CÁLCULO DE ECONOMIA:\n  Para um faturamento de aluguel mensal de R$ 10.000,00:\n  - No CPF: Imposto mensal aproximado de R$ 2.100,00.\n  - Na Holding: Imposto mensal aproximado de R$ 1.133,00.\n  - Economia Líquida Anual: R$ 11.604,00 além de proteção de ativos no Planejamento Sucessório Familiar!\n\n3. IMPLEMENTAÇÃO:\n  Para colocar isso em prática agora, contate Dra. Érika para abertura da holding e conferência de bens à empresa com imunidade de ITBI.`;
      } else if (imobiliairaTopic === 'ganho_capital') {
        fallback += `💸 ISENÇÃO DE GANHO DE CAPITAL SOBRE VENDA DE IMÓVEIS (LEI DE BENS RESIDENCIAIS)\n\n1. REQUISITO DE ISENÇÃO TRIBUTÁRIA:\n  Baseado no Artigo 39 da Lei nº 11.196/2005, o lucro obtido na alienação de imóvel residencial estará isento de Imposto de Renda caso o vendedor utilize o produto total da venda para adquirir outro imóvel residencial localizado no país em até 180 dias contados da celebração do contrato de venda original.\n\n2. SEU CASO IMOBILIÁRIO:\n  - Valor de Aquisição: R$ 350.000,00\n  - Valor de Alienação Praticado: R$ 850.000,00\n  - Lucro de Ganho de Capital: R$ 500.000,00\n  - Sem Planejamento: Alíquota de IR de 15% representaria R$ 75.000,00 pagos ao Leão.\n  - Com Planejamento Nobel (Isenção 180 dias): Reaplicando os R$ 850.000,00 totais no prazo legal, seu lucro imobiliário final tem IMPOSTO ZERO.`;
      } else {
        fallback += `🎯 LINHA DE COMUNICAÇÃO RECOMENDADA PARA IMOBILIÁRIAS:\n\nCom base na entrada "${imobiliairaInput}", estruturamos um pitch emocional de venda focando em segurança patrimonial, elisão tributária inteligente e alta taxa de capitalização para investidores compradores. Agende um bate-papo técnico com Dra. Érika para validar seu funil de negócios.`;
      }
      setImobiliairaOutput(fallback);
    } finally {
      setImobiliairaIsLoading(false);
    }
  };

  // Marketing instant generation
  const handleGenerateMarketing = (type: string) => {
    setMarketingLoading(true);
    setGeneratedMarketing(null);

    const configsByTypes: Record<string, any> = {
      post: { title: "Post Redes Sociais", desc: "Campanha Institucional Nobel", body: "📊 Contabilidade Nobel | Enterprise\n\nSua empresa está realmente pagando o imposto correto? Sob as novas normas societárias de 2026, mais de 68% das empresas pagam mais impostos do que deveriam.\n\n👉 Solicite agora um diagnóstico tributário prévio totalmente sem custos e reduza custos operacionais de forma imediata!" },
      story: { title: "Story Instagram / WhatsApp", desc: "Design Vertical Dinâmico", body: "💚 INSIGHT NOBEL\n\nSua contabilidade atual te ajuda a economizar ou apenas gera guias?\n\nVenha para a Nobel e tenha inteligência artificial, CRM integrado e conformidade fiscal automatizada a favor do seu caixa." },
      email: { title: "Template E-mail Marketing", desc: "Apresentação Diagnóstico Comercial", body: "Assunto: Seu diagnóstico de saúde tributária está pronto! 🎉\n\nPrezado cliente,\nConcluímos um mapeamento preliminar em seu setor de atuação. Detectamos margens de recuperação de créditos fiscais que podem reaver até 22% dos impostos pagos recentemente. Clique no link para falar com o seu assessor Nobel dedicado." }
    };

    setTimeout(() => {
      setGeneratedMarketing(configsByTypes[type] || configsByTypes.post);
      setMarketingLoading(false);
    }, 1500);
  };

  // Document upload simulation
  const handleSimulateUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    setUploadProgress(10);

    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev !== null && prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            const newDoc: DocumentInfo = {
              id: String(documents.length + 1),
              nome: file.name,
              ext: file.name.split('.').pop() || 'pdf',
              tamanho: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
              data: new Date().toLocaleDateString('pt-BR'),
              status: 'Indexado'
            };
            setDocuments(prevList => [newDoc, ...prevList]);
            setUploadProgress(null);
          }, 300);
          return 100;
        }
        return prev ? prev + 30 : 30;
      });
    }, 200);
  };

  // Add client submit handler
  const handleAddClient = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCliName.trim()) return;
    const newClientObj = {
      id: "cli-" + Date.now(),
      nome: newCliName,
      cnpj: newCliCnpj || "00.000.000/0001-00",
      regime: newCliRegime,
      honorario: Number(newCliHonorario) || 1500,
      status: newCliStatus,
      adimplente: "Sim",
      synchronized: false
    };
    setClientesList(prev => [...prev, newClientObj]);
    setNewCliName('');
    setNewCliCnpj('');
    alert("Cliente / Contribuinte cadastrado com sucesso!");
  };

  // Alterdata Sync simulated action
  const handleAlterdataSync = () => {
    setIsSyncingAlterdata(true);
    setTimeout(() => {
      setIsSyncingAlterdata(false);
      setClientesList(prev => prev.map(c => ({ ...c, synchronized: true })));
      alert("Sucesso! Módulos da Retaguarda Fiscal / Contábil sincronizados com o Alterdata ERP.");
    }, 1200);
  };

  // Google Drive folder integration action
  const handleGoogleDriveSync = () => {
    setIsSyncingDrive(true);
    setTimeout(() => {
      setIsSyncingDrive(false);
      setDriveSynced(true);
      
      // Inject high-value active clients from the Google Drive workspace folder!
      const driveImport1 = {
        id: "cli-drive-1",
        nome: "Indústria Metalúrgica Sul",
        cnpj: "77.102.394/0001-52",
        regime: "Lucro Real",
        honorario: 6500,
        status: "Ativo",
        adimplente: "Sim",
        synchronized: true
      };
      const driveImport2 = {
        id: "cli-drive-2",
        nome: "Franquia Sorvete Gelato",
        cnpj: "18.591.109/0002-33",
        regime: "Simples Nacional",
        honorario: 2400,
        status: "Ativo",
        adimplente: "Sim",
        synchronized: true
      };
      
      // Prevent duplicate imports on multiple clicks
      setClientesList(prev => {
        if (prev.some(c => c.id === "cli-drive-1")) return prev;
        return [driveImport1, driveImport2, ...prev];
      });

      alert("Sucesso! O Workspace decodificou a pasta 'app20260531171911nvxhvrmjjz' do Google Drive e sincronizou novos contribuintes ativos.");
    }, 1500);
  };

  // System Config save actions
  const handleSaveConfig = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingConfig(true);
    setTimeout(() => {
      setIsSavingConfig(false);
      setConfigSuccess(true);
      setTimeout(() => setConfigSuccess(false), 2500);
    }, 1000);
  };

  return (
    <div className={`min-h-screen flex text-sm transition-colors duration-300 ${theme === 'dark' ? 'bg-[#080d1a] text-[#f8fafc]' : 'bg-[#f8fafc] text-[#0f172a]'}`}>
      
      {/* SIDEBAR CONTAINER */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 border-r flex flex-col transition-transform duration-300 md:translate-x-0 ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} ${theme === 'dark' ? 'bg-[#101625] border-slate-800 text-slate-100' : 'bg-white border-slate-200'}`}>
        {/* Sidebar Header */}
        <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center">
            <NobelLogo className="h-9 text-left" isDarkTheme={theme === 'dark'} />
          </div>
          <button onClick={() => setMobileMenuOpen(false)} className="md:hidden text-slate-500 hover:text-slate-800 dark:hover:text-slate-200">
            <XIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Sidebar Navigation */}
        <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
          <div>
            <div className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2.5 px-3">Principal</div>
            <div className="space-y-1">
              <button 
                onClick={() => { setActiveTab('dashboard'); setMobileMenuOpen(false); }} 
                className={getTabClassName('dashboard')}
              >
                <LayoutDashboard className="w-4.5 h-4.5" />
                <span>Dashboard Executivo</span>
              </button>
              <button 
                onClick={() => { setActiveTab('agenda'); setMobileMenuOpen(false); }} 
                className={getTabClassName('agenda')}
              >
                <Calendar className="w-4.5 h-4.5 text-[#D4AF37]" />
                <span className="flex-1 text-left">Agenda de Obrigações</span>
              </button>
              <button 
                onClick={() => { setActiveTab('erp'); setMobileMenuOpen(false); }} 
                className={getTabClassName('erp')}
              >
                <Calculator className="w-4.5 h-4.5" />
                <span className="flex-1 text-left">ERP Contábil</span>
                <span className="bg-[#00b86b]/15 text-[#00b86b] text-[9px] font-black px-2 py-0.5 rounded-full">Ativo</span>
              </button>
              <button 
                onClick={() => { setActiveTab('clientes'); setMobileMenuOpen(false); }} 
                className={getTabClassName('clientes')}
              >
                <Users className="w-4.5 h-4.5" />
                <span className="flex-1 text-left">Gestão de Clientes</span>
                <span className="bg-rose-500 text-white text-[9px] font-black px-1.5 py-0.5 rounded-full">5</span>
              </button>
              <button 
                onClick={() => { setActiveTab('crm'); setMobileMenuOpen(false); }} 
                className={getTabClassName('crm')}
              >
                <TrendingUp className="w-4.5 h-4.5" />
                <span>CRM & Contratos</span>
              </button>
              <button 
                onClick={() => { setActiveTab('prospeccao'); setMobileMenuOpen(false); }} 
                className={getTabClassName('prospeccao')}
              >
                <MapPin className="w-4.5 h-4.5" />
                <span>Prospecção Mapas</span>
              </button>
            </div>
          </div>

          <div>
            <div className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2.5 px-3">Serviços de IA</div>
            <div className="space-y-1">
              <button 
                onClick={() => { setActiveTab('ia'); setMobileMenuOpen(false); }} 
                className={getTabClassName('ia')}
              >
                <BrainCircuit className="w-4.5 h-4.5 text-[#00b86b]/95 animate-pulse" />
                <span>Central Nobel AI</span>
              </button>
              <button 
                onClick={() => { setActiveTab('marketing'); setMobileMenuOpen(false); }} 
                className={getTabClassName('marketing')}
              >
                <Megaphone className="w-4.5 h-4.5" />
                <span>Marketing de Campanhas</span>
              </button>
            </div>
          </div>

          <div>
            <div className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2.5 px-3">Organização</div>
            <div className="space-y-1">
              <button 
                onClick={() => { setActiveTab('portal'); setMobileMenuOpen(false); }} 
                className={getTabClassName('portal')}
              >
                <FolderOpen className="w-4.5 h-4.5" />
                <span>Documentos & Portal</span>
              </button>
              <button 
                onClick={() => { setActiveTab('configuracoes'); setMobileMenuOpen(false); }} 
                className={getTabClassName('configuracoes')}
              >
                <Settings className="w-4.5 h-4.5" />
                <span>Configurações</span>
              </button>
            </div>
          </div>

          {/* Academic Access */}
          <div className="px-3 pt-2">
            <button 
              onClick={() => { setIsAcademyOpen(true); setMobileMenuOpen(false); }} 
              className="w-full flex items-center gap-2 px-3.5 py-2.5 rounded-xl font-bold text-xs transition-all bg-emerald-500/10 dark:bg-[#00b86b]/10 text-emerald-700 dark:text-[#00b86b] hover:bg-emerald-500/15 dark:hover:bg-[#00b86b]/15 border border-emerald-500/20 dark:border-[#00b86b]/10 cursor-pointer"
            >
              <Sparkles className="w-4.5 h-4.5 text-amber-500 animate-pulse" />
              <span className="font-extrabold text-[#0C3E26] dark:text-[#00b86b]">Formação Nobel Academy</span>
            </button>
          </div>
        </nav>

        {/* User Card & back button */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 space-y-3">
          <button onClick={onBackToLanding} className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-rose-500/20 text-rose-500 hover:bg-rose-500/10 font-bold transition-all text-xs cursor-pointer bg-transparent">
            <LogOut className="w-4 h-4" />
            <span>Sair da Plataforma</span>
          </button>
          
          <div className="flex items-center gap-3 p-2 rounded-xl bg-slate-100 dark:bg-[#1a2333]">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-extrabold text-xs">
              AN
            </div>
            <div className="text-left flex-1 min-w-0">
              <div className="font-bold text-xs truncate">Admin Nobel</div>
              <div className="text-[10px] text-slate-500 dark:text-slate-400 truncate font-semibold">Super Administrador</div>
            </div>
          </div>
        </div>
      </aside>

      {/* DASHBOARD CONTENT BODY */}
      <main className="flex-1 md:ml-64 p-6 flex flex-col min-h-screen">
        
        {/* TOP COMPONENT HEADER */}
        <header className="flex items-center justify-between mb-8 pb-4 border-b border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-4">
            <button onClick={() => setMobileMenuOpen(true)} className="md:hidden p-2 rounded-lg bg-slate-100 dark:bg-slate-800">
              <MenuIcon className="w-5 h-5" />
            </button>
            <div>
              <h1 className="font-display font-black text-2xl capitalize text-[#0c3e26] dark:text-[#00b86b] flex items-center gap-2.5">
                <span>
                  {activeTab === 'dashboard' ? 'Dashboard Executivo' : 
                   activeTab === 'erp' ? 'ERP Contábil Integrado' : 
                   activeTab === 'clientes' ? 'Gestão de Clientes' : 
                   activeTab === 'crm' ? 'CRM & Contratos' : 
                   activeTab === 'prospeccao' ? 'Mapa de Prospecção Ativa' : 
                   activeTab === 'ia' ? 'Central Nobel AI' : 
                   activeTab === 'marketing' ? 'Laboratório de Marketing' : 
                   activeTab === 'portal' ? 'Portal do Cliente & Repositório' : 
                   activeTab === 'agenda' ? 'Agenda de Obrigações Fiscais' : 
                   activeTab === 'configuracoes' ? 'Configurações do Sistema' : activeTab}
                </span>
                {renderHelpButton(activeTab, "w-6 h-6 text-xs")}
              </h1>
              <p className="text-xs text-slate-500 font-bold">{razaoSocial} • Premium Control Center</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Global Search */}
            <div className="hidden lg:flex items-center gap-2 bg-slate-100 dark:bg-slate-800 px-3.5 py-2 rounded-full border border-slate-200 dark:border-slate-700 w-64">
              <Search className="w-4 h-4 text-slate-400" />
              <input type="text" placeholder="Pesquisar..." className="bg-transparent border-none focus:outline-none w-full text-xs text-current" />
            </div>

            {/* Theme Toggle */}
            <button onClick={toggleTheme} className="p-2.5 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 cursor-pointer">
              {theme === 'light' ? <Moon className="w-4.5 h-4.5" /> : <Sun className="w-4.5 h-4.5" />}
            </button>

            {/* Notification Badge */}
            <div className="relative p-2.5 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-500">
              <Bell className="w-4.5 h-4.5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 animate-custom-pulse"></span>
            </div>
          </div>
        </header>

        {/* TAB CONTROLS RENDERING */}

        {/* 1. EXECUTIVE DASHBOARD SUB-PAGE */}
        {activeTab === 'dashboard' && (
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-8 text-left"
          >
            {/* Resumo do Mês Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="font-display font-black text-xl text-primary dark:text-accent inline-flex items-center gap-2">
                  <LayoutDashboard className="w-5.5 h-5.5 text-accent" />
                  Painel Executivo Nobel
                </h3>
                <p className="text-xs text-slate-500 mt-1">Consolidação tributária, compliance fiscal e inteligência comercial.</p>
              </div>
              <span className="text-xs font-bold px-3 py-1.5 bg-primary/10 text-primary dark:bg-primary/20 dark:text-accent rounded-full border border-primary/20">
                Segunda-feira, 01 de Junho de 2026
              </span>
            </div>

            {/* Statistics Staggered Grid - 8 Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { 
                  id: 'faturamento', 
                  label: 'Faturamento Mensal', 
                  value: new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 }).format(erpFaturamento), 
                  detail: 'Meta: R$ 185.000', 
                  trend: '100% da Meta', 
                  success: true,
                  tab: 'erp',
                  subTab: 'receitas',
                  icon: Receipt,
                  actionLabel: 'Ver Lançamento de Receitas',
                  sparkPath: 'M0,35 Q15,40 30,25 T60,15 T90,28 T120,5 T150,15',
                  strokeColor: '#10b981',
                  bg: 'border-emerald-500/20 bg-emerald-500/5 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400' 
                },
                { 
                  id: 'lucro', 
                  label: 'Lucro Líquido', 
                  value: new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 }).format(erpFaturamento * 0.338), 
                  detail: 'Margem: 33.8%', 
                  trend: 'Excelente Margem', 
                  success: true,
                  tab: 'erp',
                  subTab: 'dre',
                  icon: TrendingUp,
                  actionLabel: 'Ver Demonstrativo DRE',
                  sparkPath: 'M0,40 Q15,35 30,38 T60,20 T90,12 T120,8 T150,2',
                  strokeColor: '#0a5c3a',
                  bg: 'border-primary/20 bg-primary/5 dark:bg-primary/20 text-primary dark:text-accent' 
                },
                { 
                  id: 'clientes', 
                  label: 'Total de Clientes', 
                  value: (347 + convertedProspectNames.length).toString(), 
                  detail: `${convertedProspectNames.length} novos via Nobel AI`, 
                  trend: '98% Adimplência', 
                  success: true,
                  tab: 'clientes',
                  icon: Users,
                  actionLabel: 'Ir para Gestão de Clientes',
                  sparkPath: 'M0,35 Q15,32 30,30 T60,22 T90,18 T120,12 T150,5',
                  strokeColor: '#6366f1',
                  bg: 'border-emerald-500/20 bg-emerald-500/5 dark:bg-emerald-950/20 text-emerald-600 dark:text-[#00b86b]' 
                },
                { 
                  id: 'equilibrio', 
                  label: 'Ponto de Equilíbrio', 
                  value: new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 }).format(erpCustoFixo / (erpMargemContribuicao / 100)), 
                  detail: 'Vendas Neutras/Mês', 
                  trend: 'Zona Segura', 
                  success: true,
                  tab: 'erp',
                  subTab: 'ponto-equilibrio',
                  icon: Calculator,
                  actionLabel: 'Ver Ponto de Equilíbrio',
                  sparkPath: 'M0,25 Q15,25 30,25 T60,25 T90,25 T120,25 T150,25',
                  strokeColor: '#f59e0b',
                  bg: 'border-amber-500/20 bg-amber-500/5 dark:bg-amber-950/20 text-amber-600 dark:text-amber-400' 
                },
                { 
                  id: 'receber', 
                  label: 'Honorários a Receber', 
                  value: 'R$ 42.000', 
                  detail: 'Valores pendentes', 
                  trend: 'A Receber', 
                  success: false,
                  tab: 'erp',
                  subTab: 'receitas',
                  icon: Wallet,
                  actionLabel: 'Ver Contas a Receber',
                  sparkPath: 'M0,15 Q15,22 30,25 T60,35 T90,30 T120,38 T150,42',
                  strokeColor: '#f43f5e',
                  bg: 'border-rose-500/20 bg-rose-500/5 dark:bg-rose-950/20 text-rose-500 dark:text-rose-400' 
                },
                { 
                  id: 'recebidos', 
                  label: 'Honorários Recebidos', 
                  value: 'R$ 143.000', 
                  detail: 'Entrada deste mês', 
                  trend: 'Garantido', 
                  success: true,
                  tab: 'erp',
                  subTab: 'receitas',
                  icon: FileCheck,
                  actionLabel: 'Ver Lançamento de Receitas',
                  sparkPath: 'M0,35 Q15,30 30,32 T60,20 T90,22 T120,15 T150,8',
                  strokeColor: '#0ea5e9',
                  bg: 'border-sky-500/20 bg-sky-500/5 dark:bg-sky-950/20 text-sky-600 dark:text-sky-400' 
                },
                { 
                  id: 'custofixo', 
                  label: 'Custo Fixo Mensal', 
                  value: new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 }).format(erpCustoFixo), 
                  detail: 'Despesas operacionais', 
                  trend: 'Otimizado', 
                  success: true,
                  tab: 'erp',
                  subTab: 'despesas',
                  icon: Sliders,
                  actionLabel: 'Ver Lançamento de Despesas',
                  sparkPath: 'M0,20 Q15,22 30,18 T60,21 T90,19 T120,22 T150,20',
                  strokeColor: '#64748b',
                  bg: 'border-slate-500/20 bg-slate-500/5 dark:bg-slate-950/20 text-slate-600 dark:text-slate-400' 
                },
                { 
                  id: 'anual', 
                  label: 'Faturamento Anual', 
                  value: 'R$ 2.220.000', 
                  detail: 'Acumulado no ano', 
                  trend: '+12.5% vs 2025', 
                  success: true,
                  tab: 'erp',
                  subTab: 'fluxo-caixa',
                  icon: TrendingUp,
                  actionLabel: 'Ver Fluxo de Caixa Anual',
                  sparkPath: 'M0,38 Q15,32 30,28 T60,20 T90,15 T120,8 T150,2',
                  strokeColor: '#3b82f6',
                  bg: 'border-[#3b82f6]/20 bg-[#3b82f6]/5 dark:bg-[#3b82f6]/20 text-[#3b82f6]' 
                }
              ].map((m, idx) => {
                const IconComponent = m.icon;
                return (
                  <motion.div 
                    key={m.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.04 }}
                    whileHover={{ scale: 1.025, y: -6 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      setActiveTab(m.tab);
                      if (m.subTab) {
                        setErpSubTab(m.subTab as any);
                      }
                    }}
                    className="p-5 rounded-2xl bg-white dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700/85 flex flex-col justify-between shadow-xs transition-all hover:border-primary/40 dark:hover:border-accent/40 hover:shadow-lg cursor-pointer group relative overflow-hidden text-left"
                  >
                    {/* Hover subtle glow radial gradient bg */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/2 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    <div className="flex items-start justify-between gap-1.5 z-10 relative">
                      <div className="flex items-center gap-2">
                        <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-700/50 group-hover:bg-primary/10 dark:group-hover:bg-accent/15 transition-colors">
                          <IconComponent className="w-4.5 h-4.5 text-primary dark:text-accent group-hover:scale-110 transition-transform" />
                        </div>
                        <span className="text-[10px] font-black text-slate-400 dark:text-slate-400 uppercase tracking-widest">{m.label}</span>
                      </div>
                      <span className={`text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-full ${m.bg}`}>
                        {m.trend}
                      </span>
                    </div>
                    
                    <div className="my-4 z-10 relative font-sans">
                      <span className="text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 group-hover:text-primary dark:group-hover:text-accent transition-colors break-words font-sans">
                        {m.value}
                      </span>
                      <p className="text-[11px] text-slate-405 dark:text-slate-500 font-semibold mt-1 flex items-center gap-1.5">
                        <span>{m.detail}</span>
                        <span className="h-1 w-1 rounded-full bg-slate-300 dark:bg-slate-650"></span>
                        <span className="text-[9px] text-[#00b86b] dark:text-accent uppercase font-black tracking-widest">Ativo</span>
                      </p>
                    </div>

                    {/* Sparkline wave visualizer */}
                    <div className="h-8 w-full mt-1 mb-3 relative opacity-60 group-hover:opacity-100 transition-opacity duration-300">
                      <svg className="w-full h-full" viewBox="0 0 150 50" preserveAspectRatio="none">
                        <defs>
                          <linearGradient id={`gradient-spark-${m.id}`} x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor={m.strokeColor} stopOpacity="0.25" />
                            <stop offset="100%" stopColor={m.strokeColor} stopOpacity="0" />
                          </linearGradient>
                        </defs>
                        <path 
                          d={`${m.sparkPath} L150,50 L0,50 Z`} 
                          fill={`url(#gradient-spark-${m.id})`}
                        />
                        <path 
                          d={m.sparkPath} 
                          fill="none" 
                          stroke={m.strokeColor} 
                          strokeWidth="2" 
                          strokeLinecap="round"
                        />
                      </svg>
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-slate-450 pt-2.5 border-t border-slate-100 dark:border-slate-700/50 z-10 relative mt-auto">
                      <span className="inline-flex items-center gap-1 font-bold text-slate-500 dark:text-slate-400 group-hover:text-primary dark:group-hover:text-accent transition-all group-hover:translate-x-1">
                        <span>{m.actionLabel}</span>
                        <span className="font-extrabold text-xs opacity-75 group-hover:opacity-100 group-hover:translate-x-1 transition-transform">→</span>
                      </span>
                      
                      <span className="flex h-2 w-2 relative">
                        <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${m.success ? 'bg-emerald-400' : 'bg-rose-400'}`}></span>
                        <span className={`relative inline-flex rounded-full h-2 w-2 ${m.success ? 'bg-emerald-500' : 'bg-rose-500'}`}></span>
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Graphs and Progress section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Dynamic Monthly Performance Graph */}
              <div className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs flex flex-col justify-between">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h4 className="font-display font-bold text-base text-slate-900 dark:text-slate-100 flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-accent animate-pulse" />
                      Crescimento de Caixa & Rentabilidade
                    </h4>
                    <span className="text-xs text-slate-400 mt-1">Valores consolidados em milhares (R$)</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-primary self-center"></span>
                    <span className="text-[10px] text-slate-500 font-bold">Faturamento</span>
                    <span className="h-2.5 w-2.5 rounded-full bg-accent self-center ml-2"></span>
                    <span className="text-[10px] text-slate-500 font-bold">Margem Líquida</span>
                  </div>
                </div>

                {/* Elegant interactive chart visualization using CSS SVG and micro transitions */}
                <div className="h-48 w-full relative group">
                  <svg className="w-full h-full" viewBox="0 0 500 120" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="primaryGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#0a5c3a" stopOpacity="0.25" />
                        <stop offset="100%" stopColor="#0a5c3a" stopOpacity="0" />
                      </linearGradient>
                      <linearGradient id="accentGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#00b86b" stopOpacity="0.2" />
                        <stop offset="100%" stopColor="#00b86b" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <path 
                      d="M0,90 Q50,75 100,80 T200,60 T300,50 T400,30 T500,10 L500,120 L0,120 Z" 
                      fill="url(#primaryGradient)"
                    />
                    <path 
                      d="M0,90 Q50,75 100,80 T200,60 T300,50 T400,30 T500,10" 
                      fill="none" 
                      stroke="#0a5c3a" 
                      strokeWidth="4"
                    />
                    <path 
                      d="M0,110 Q50,95 100,90 T200,80 T300,75 T400,50 T500,30 L500,120 L0,120 Z" 
                      fill="url(#accentGradient)"
                    />
                    <path 
                      d="M0,110 Q50,95 100,90 T200,80 T300,75 T400,50 T500,30" 
                      fill="none" 
                      stroke="#00b86b" 
                      strokeWidth="2.5"
                      strokeDasharray="4 2"
                    />
                    <circle cx="100" cy="80" r="4.5" fill="#f8fafc" stroke="#0a5c3a" strokeWidth="2.5" />
                    <circle cx="200" cy="60" r="4.5" fill="#f8fafc" stroke="#0a5c3a" strokeWidth="2.5" />
                    <circle cx="300" cy="50" r="4.5" fill="#f8fafc" stroke="#0a5c3a" strokeWidth="2.5" />
                    <circle cx="400" cy="30" r="4.5" fill="#f8fafc" stroke="#0a5c3a" strokeWidth="2.5" />
                    <circle cx="500" cy="10" r="4.5" fill="#f8fafc" stroke="#0a5c3a" strokeWidth="2.5" />
                  </svg>
                  <div className="flex justify-between text-[10px] text-slate-400 mt-3 font-semibold uppercase tracking-wider">
                    <span>Janeiro</span>
                    <span>Março</span>
                    <span>Maio</span>
                    <span>Junho (Projetado)</span>
                  </div>
                </div>
              </div>

              {/* Targets, Metrics and Operational Streaks */}
              <div className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs flex flex-col justify-between">
                <div>
                  <h4 className="font-display font-bold text-base text-slate-900 dark:text-slate-100 mb-2">Indicadores & Alvos Operacionais</h4>
                  <p className="text-xs text-slate-500 mb-6">Mapeamento de conversões comerciais e SLAs contábeis no trimestre.</p>
                </div>
                <div className="space-y-5">
                  <div>
                    <div className="flex justify-between text-xs font-bold mb-1.5">
                      <span className="text-slate-700 dark:text-slate-300">Prospecções Convertidas</span>
                      <span className="text-primary font-black">18 / 25</span>
                    </div>
                    <div className="h-2.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                      <div className="h-full bg-primary rounded-full transition-all duration-1000" style={{ width: '72%' }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-bold mb-1.5">
                      <span className="text-slate-700 dark:text-slate-300">Cumprimento de DREs (SLA)</span>
                      <span className="text-accent font-black">98% de Eficiência</span>
                    </div>
                    <div className="h-2.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                      <div className="h-full bg-[#00b86b] rounded-full transition-all duration-1000" style={{ width: '98%' }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-bold mb-1.5">
                      <span className="text-slate-700 dark:text-slate-300">Informativos Fiscais Postados</span>
                      <span className="text-[#3b82f6] font-black">12 / 15</span>
                    </div>
                    <div className="h-2.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                      <div className="h-full bg-[#3b82f6] rounded-full transition-all duration-1000" style={{ width: '80%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Bento Box Section - Tasks manager & Fiscal Obligations */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* INTERACTIVE WORKSPACE CHEKLIST */}
              <div className="p-6 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-display font-extrabold text-base text-slate-900 dark:text-slate-100 flex items-center gap-2">
                      <FileCheck className="w-5.5 h-5.5 text-primary" />
                      Visualização Geral de Tarefas
                    </h4>
                    <span className="text-[10px] font-black px-2.5 py-1 bg-[#0c3e26]/10 text-[#0c3e26] dark:bg-[#00b86b]/10 dark:text-[#00b86b] rounded-full">
                      {tasks.filter(t => !t.completed).length} Ativas na Agenda
                    </span>
                  </div>

                  {/* Non-interactive List (Visualization only as requested) */}
                  <div className="max-h-60 overflow-y-auto space-y-2 pr-1">
                    <AnimatePresence>
                      {tasks.map(t => (
                        <motion.div 
                          key={t.id}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 10 }}
                          className={`flex items-center justify-between p-3.5 rounded-xl border transition-all ${t.completed ? 'bg-slate-50/50 dark:bg-slate-900/30 border-slate-100 dark:border-slate-800/50 opacity-60' : 'bg-slate-50/20 dark:bg-slate-900/10 border-slate-150 dark:border-slate-700'}`}
                        >
                          <div className="flex items-center gap-3">
                            <span className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${t.completed ? 'bg-primary border-primary text-white scale-105' : 'border-slate-300'}`}>
                              {t.completed && <Check className="w-3.5 h-3.5" />}
                            </span>
                            <span className={`text-xs font-semibold ${t.completed ? 'line-through text-slate-400' : 'text-slate-800 dark:text-slate-100'}`}>
                              {t.title}
                            </span>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-full ${t.priority === 'Alta' ? 'bg-rose-100 text-rose-700 dark:bg-rose-950/20 dark:text-rose-400' : t.priority === 'Média' ? 'bg-amber-100 text-amber-700 dark:bg-amber-950/20 dark:text-amber-400' : 'bg-slate-100 text-slate-600 dark:bg-slate-900 dark:text-slate-400'}`}>
                              {t.priority}
                            </span>
                            <span className="text-[10px] text-slate-400 font-mono text-xs">Vence {t.due}</span>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                </div>

                <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-700/50">
                  <button 
                    onClick={() => setActiveTab('agenda')}
                    className="w-full py-2.5 bg-primary hover:bg-[#1a5f3e] text-white rounded-xl text-xs font-black transition-all hover:scale-[1.01] uppercase tracking-wide cursor-pointer shadow border-none flex items-center justify-center gap-2"
                  >
                    <Calendar key="cal-icon-1" className="w-4 h-4 text-[#D4AF37]" />
                    <span>Lançar e Dar Baixa de Tarefas na Agenda Completa →</span>
                  </button>
                </div>
              </div>

              {/* INTERACTIVE FISCAL OBLIGATIONS MONITOR */}
              <div className="p-6 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h4 className="font-display font-extrabold text-base text-slate-900 dark:text-slate-100 flex items-center gap-2">
                      <Receipt className="w-5.5 h-5.5 text-accent animate-pulse" />
                      Status de Obrigações Fiscais (Mês Corrente)
                    </h4>
                    <span className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-wider bg-[#D4AF37]/10 px-2 py-0.5 rounded-sm">
                      Receita Federal • Simples
                    </span>
                  </div>

                  <div className="space-y-3.5">
                    {obligations.map(ob => {
                      const isDone = ob.status === 'Concluído';
                      return (
                        <div 
                          key={ob.id}
                          className={`p-4 rounded-2xl border transition-all flex items-center justify-between ${isDone ? 'bg-emerald-500/5 dark:bg-emerald-950/10 border-emerald-500/25' : 'bg-slate-50/20 dark:bg-slate-900/10 border-slate-200 dark:border-slate-700'}`}
                        >
                          <div className="flex items-center gap-3">
                            <span className={`h-3.5 w-3.5 rounded-full flex ${isDone ? 'bg-emerald-500 shadow-xs' : 'bg-slate-350 animate-pulse'}`}></span>
                            <div>
                              <div className="text-xs font-bold text-slate-900 dark:text-slate-100">{ob.name}</div>
                              <span className="text-[10.5px] text-slate-500 block mt-0.5">{ob.type}</span>
                            </div>
                          </div>

                          <div className="flex items-center gap-4">
                            <span className="text-[10px] text-slate-400 font-mono">Vence {ob.due}</span>
                            <span className={`text-[10px] font-black uppercase px-2.5 py-1 rounded-full ${isDone ? 'bg-emerald-500/10 text-emerald-500' : 'bg-amber-500/10 text-amber-500'}`}>
                              {ob.status}
                            </span>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>

                <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-700/50 flex flex-col gap-3 text-xs">
                  <div className="flex items-center justify-between text-slate-500 font-semibold text-[11px] select-none">
                    <span>Todas as guias e pendências calculadas ficam registradas localmente.</span>
                    <span className="text-primary dark:text-[#00b86b]">Livre de Conexões Externas</span>
                  </div>
                  <button 
                    onClick={() => setActiveTab('agenda')}
                    className="w-full py-2.5 bg-gradient-to-r from-[#D4AF37] to-[#0c3e26] hover:opacity-90 text-white rounded-xl text-xs font-black transition-all hover:scale-[1.01] uppercase tracking-wide cursor-pointer shadow border-none flex items-center justify-center gap-2"
                  >
                    <Calendar key="cal-icon-2" className="w-4 h-4" />
                    <span>Acessar Pranchas e Vencimentos da Agenda →</span>
                  </button>
                </div>
              </div>

            </div>

            {/* Atividades Recentes do Escritório */}
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs">
              <div className="flex items-center justify-between mb-6">
                <h4 className="font-display font-extrabold text-base text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-accent animate-pulse" />
                  Atividades de Integração e Log de Eventos (Tempo Real)
                </h4>
                <span className="text-[10px] font-bold text-primary dark:text-accent uppercase">Auditoria Ativa</span>
              </div>
              <div className="space-y-4">
                {initialEvents.map(evt => (
                  <div key={evt.id} className="flex gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/40 border border-slate-100/60 dark:border-slate-800/80 items-start">
                    <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                      <UserPlus className="w-4.5 h-4.5" />
                    </div>
                    <div className="text-left flex-1">
                      <div className="font-bold text-xs sm:text-sm text-slate-900 dark:text-slate-100">{evt.title}</div>
                      <div className="text-xs text-slate-500 mt-0.5">{evt.details}</div>
                    </div>
                    <span className="text-[10px] text-slate-450 font-bold self-center">{evt.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* 2. CRM PIPELINE / KANBAN */}
        {activeTab === 'crm' && (
          <div className="space-y-8 animate-fade-in flex-1 flex flex-col">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-display font-black text-lg text-primary dark:text-accent">Pipeline de Contratos Ativos</h3>
                <p className="text-xs text-slate-500">Arraste-e-solte ou mude ordens para classificar as propostas.</p>
              </div>

              {/* Add Lead inline dialog */}
              <form onSubmit={handleAddLead} className="flex flex-wrap gap-2.5 items-center bg-white dark:bg-slate-800 p-3 rounded-2xl border border-slate-200 dark:border-slate-700">
                <input 
                  type="text" 
                  value={newLeadName}
                  onChange={e => setNewLeadName(e.target.value)}
                  placeholder="Nome do Prospect" 
                  className="bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-1.5 text-xs text-current font-semibold"
                />
                <select 
                  value={newLeadCategory}
                  onChange={e => setNewLeadCategory(e.target.value)}
                  className="bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-1.5 text-xs text-current"
                >
                  <option>Tecnologia</option>
                  <option>Saúde</option>
                  <option>Alimentação</option>
                  <option>Comércio</option>
                </select>
                <input 
                  type="number" 
                  value={newLeadValue}
                  onChange={e => setNewLeadValue(e.target.value)}
                  placeholder="Valor" 
                  className="bg-slate-100 dark:bg-slate-900 border border-slate-100 rounded-xl px-3 py-1.5 text-xs text-current w-16"
                />
                <button type="submit" className="p-2 bg-primary hover:bg-primary-light text-white rounded-xl flex items-center justify-center cursor-pointer border-none shadow">
                  <Plus className="w-4 h-4" />
                </button>
              </form>
            </div>

            {/* Kanban Grid Scroll */}
            <div className="flex-1 overflow-x-auto pb-4 flex gap-6 items-stretch min-h-[500px]">
              {kanbanColumns.map(col => {
                const columnLeads = leads.filter(l => leadStatus[l.id] === col.id);
                return (
                  <div key={col.id} className="w-64 bg-slate-100 dark:bg-slate-900/50 rounded-2xl p-4 flex flex-col gap-4 flex-shrink-0">
                    <div className="flex items-center justify-between border-b pb-2">
                      <div className="flex items-center gap-2">
                        <span className={`w-2.5 h-2.5 rounded-full ${col.color}`}></span>
                        <span className="font-extrabold text-xs text-primary dark:text-[#00b86b]">{col.title}</span>
                      </div>
                      <span className="bg-white dark:bg-slate-800 text-[10px] font-bold px-2 py-0.5 rounded-full shadow-xs">
                        {columnLeads.length}
                      </span>
                    </div>

                    <div className="flex-1 space-y-3 overflow-y-auto">
                      {columnLeads.map(lead => (
                        <div key={lead.id} className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-xs hover:scale-[1.02] transition-transform">
                          <div className="font-bold text-xs sm:text-sm text-primary dark:text-slate-100 mb-1">{lead.nome}</div>
                          <div className="text-[10px] text-slate-500">{lead.categoria}</div>
                          
                          <div className="mt-4 flex items-center justify-between">
                            <div className="flex items-center gap-1.5">
                              <div className="w-5 h-5 rounded-full bg-primary/10 text-primary dark:text-[#00b86b] text-[9px] font-bold flex items-center justify-center">
                                {lead.avatar}
                              </div>
                              <span className="text-[10px] text-[#8fa898]">{lead.contato}</span>
                            </div>
                            <span className="text-xs font-black text-[#00b86b]">
                              R$ {lead.valor.toLocaleString('pt-BR')}
                            </span>
                          </div>

                          {/* Quick stage mover controls */}
                          <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-750 flex justify-between gap-1">
                            <select 
                              value={col.id} 
                              onChange={(e) => moveLeadStatus(lead.id, e.target.value as KanbanStatus)}
                              className="w-full bg-slate-50 dark:bg-slate-900 border text-[10px] text-slate-600 rounded-lg p-1"
                            >
                              {kanbanColumns.map(opt => (
                                <option key={opt.id} value={opt.id}>{opt.title}</option>
                              ))}
                            </select>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* 3. PROSPECÇÃO MAPS - PROSPECTOR */}
        {activeTab === 'prospeccao' && (
          <div className="space-y-8 animate-fade-in">
            {/* Filter and Command header */}
            <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
              <div>
                <h3 className="font-display font-black text-lg text-primary dark:text-accent">{prospecSubTab === 'localizador' ? 'Localizador Ativo & Prospects de Elite' : 'Ranking de Inteligência Comercial'}</h3>
                <p className="text-xs text-slate-500">Mapeamento integrado à base nacional de dados societários.</p>
              </div>

              {/* Sub-tabs Selector */}
              <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-900 p-1 rounded-xl border border-slate-200/50 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setProspecSubTab('localizador')}
                  className={`py-1.5 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    prospecSubTab === 'localizador'
                      ? 'bg-white dark:bg-slate-800 text-[#0c3e26] dark:text-emerald-400 font-extrabold shadow-sm'
                      : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                  }`}
                >
                  Localizador & Mapas
                </button>
                <button
                  type="button"
                  onClick={() => setProspecSubTab('categorias')}
                  className={`py-1.5 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    prospecSubTab === 'categorias'
                      ? 'bg-white dark:bg-slate-800 text-[#0c3e26] dark:text-emerald-400 font-extrabold shadow-sm'
                      : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                  }`}
                >
                  <AwardIcon className="w-3.5 h-3.5 text-amber-500" />
                  As 100 Melhores Categorias
                </button>
              </div>
            </div>

            {prospecSubTab === 'localizador' ? (
              <>
                {/* Filters Row for Localizador with OK button */}
                <div className="flex flex-wrap gap-2.5 items-center justify-end bg-slate-50 dark:bg-slate-900/40 p-4 rounded-2xl border border-slate-100 dark:border-slate-800/60 shadow-sm">
                  <div className="flex flex-col sm:flex-row gap-2.5 w-full md:w-auto md:flex-1">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
                      <input 
                        type="text" 
                        value={propSearch}
                        onChange={e => setPropSearch(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && handleApplyPropFilters()}
                        placeholder="Pesquisar por nome empresa..." 
                        className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-705 pl-9 pr-4 py-2 w-full rounded-xl text-xs text-current"
                      />
                    </div>
                    <select 
                      value={propCidade}
                      onChange={e => {
                        const val = e.target.value;
                        setPropCidade(val);
                        setActivePropCidade(val);
                        // trigger prospecting with updated city
                        setTimeout(() => handleAiProspecting(propCat), 10);
                      }}
                      className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-4 py-2 rounded-xl text-xs text-current cursor-pointer"
                    >
                      <option value="">Todas Cidades (Norte de Minas)</option>
                      <option value="Montes Claros">Montes Claros</option>
                      <option value="Janaúba">Janaúba</option>
                      <option value="Pirapora">Pirapora</option>
                      <option value="Salinas">Salinas</option>
                      <option value="Bocaiúva">Bocaiúva</option>
                      <option value="Januária">Januária</option>
                      <option value="Francisco Sá">Francisco Sá</option>
                      <option value="Manga">Manga</option>
                    </select>
                    <select 
                      value={propCat}
                      onChange={e => {
                        const val = e.target.value;
                        setPropCat(val);
                        setActivePropCat(val);
                        // trigger prospecting with updated category
                        handleAiProspecting(val);
                      }}
                      className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-4 py-2 rounded-xl text-xs text-current cursor-pointer max-w-xs focus:outline-none"
                    >
                      <option value="">Todas as Categorias ({categoriasProspect.length})</option>
                      {categoriasProspect.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex flex-wrap gap-2 w-full sm:w-auto items-center justify-end">
                    <button 
                      type="button"
                      onClick={handleApplyPropFilters}
                      className="bg-[#0c3e26] hover:bg-[#062114] text-white font-extrabold text-xs px-5 py-2 rounded-xl border border-emerald-500/30 cursor-pointer h-9 shadow-sm transition-all flex items-center justify-center gap-1 min-w-[70px] active:scale-95"
                    >
                      OK
                    </button>
                    <button 
                      type="button"
                      disabled={isAiProspectingLoading}
                      onClick={() => handleAiProspecting()}
                      className="bg-gradient-to-r from-[#D4AF37] to-[#0c3e26] hover:from-[#E5C158] hover:to-[#062114] disabled:opacity-50 text-white font-extrabold text-xs px-4 py-2 rounded-xl border border-amber-500/20 cursor-pointer h-9 shadow-sm transition-all flex items-center justify-center gap-1.5 active:scale-95"
                      title="Utiliza Inteligência Artificial (Gemini) para buscar prospects reais para esta categoria!"
                    >
                      <Sparkles className={`w-3.5 h-3.5 text-amber-300 ${isAiProspectingLoading ? 'animate-spin' : ''}`} />
                      <span>{isAiProspectingLoading ? 'IA Buscando...' : 'Buscar com IA'}</span>
                    </button>
                    <button 
                      type="button"
                      onClick={() => setIsWhatsAppPanelOpen(true)}
                      className="bg-[#25d366] hover:bg-[#128c7e] text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 border-none cursor-pointer h-9 shadow-sm"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>WhatsApp Geral</span>
                    </button>
                  </div>
                </div>

            {/* Dynamic Iframe Map Section */}
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 overflow-hidden space-y-4 shadow-sm">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="text-xs font-bold text-slate-400 uppercase flex items-center gap-1.5">
                  <MapPin className="w-4.5 h-4.5 text-rose-500" />
                  <span>Localizador Ativo (Google Maps Platform)</span>
                </div>
                <div className="flex gap-2">
                  <button type="button" onClick={() => { setMapQuery('clinica medica montes claros'); toast.success('Buscando clínicas em Montes Claros'); }} className="text-[10px] font-bold bg-[#00b86b]/15 text-primary px-3 py-1.5 rounded-full border-none cursor-pointer">Clínicas MOC</button>
                  <button type="button" onClick={() => { setMapQuery('restaurantes Montes Claros'); toast.success('Buscando restaurantes em Montes Claros'); }} className="text-[10px] font-bold bg-[#00b86b]/15 text-primary px-3 py-1.5 rounded-full border-none cursor-pointer">Restaurantes MOC</button>
                  <button type="button" onClick={() => { setMapQuery('software Montes Claros'); toast.success('Buscando empresas de TI em Montes Claros'); }} className="text-[10px] font-bold bg-[#00b86b]/15 text-primary px-3 py-1.5 rounded-full border-none cursor-pointer">Startups MOC</button>
                </div>
              </div>

              {/* Direct Google Maps Search engine input */}
              <div className="flex flex-col sm:flex-row gap-2 bg-slate-50 dark:bg-slate-900/60 p-3 rounded-xl border border-slate-100 dark:border-slate-800/80">
                <input
                  type="text"
                  value={customMapSearch}
                  onChange={e => setCustomMapSearch(e.target.value)}
                  onKeyDown={e => {
                    if (e.key === 'Enter') {
                      if (customMapSearch.trim()) {
                        setMapQuery(customMapSearch);
                        toast.success(`Google Maps atualizado para: "${customMapSearch}"`);
                      } else {
                        toast.error("Digite o que deseja buscar no mapa.");
                      }
                    }
                  }}
                  placeholder="Pesquisar diretamente no Google Maps (ex: Clínicas odontológicas Montes Claros, Advocacia Salinas...)"
                  className="flex-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-3.5 py-2 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
                <button
                  type="button"
                  onClick={() => {
                    if (customMapSearch.trim()) {
                      setMapQuery(customMapSearch);
                      toast.success(`Google Maps atualizado para: "${customMapSearch}"`);
                    } else {
                      toast.error("Por favor, digite um termo para buscar no mapa.");
                    }
                  }}
                  className="bg-[#0c3e26] hover:bg-[#062114] text-white px-5 py-2 rounded-xl text-xs font-bold transition-all active:scale-95 cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <Search className="w-3.5 h-3.5" />
                  <span>Pesquisar no Mapa</span>
                </button>
              </div>

              <iframe 
                src={`https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d15000!2d-43.86!3d-16.73!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1s${encodeURIComponent(mapQuery)}!5e0!3m2!1spt-BR!2sbr`}
                className="w-full h-80 rounded-2xl border-0 shadow-inner"
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>

            {/* Prospects Grid */}
            {filteredProspects.length === 0 ? (
              <div className="p-12 text-center rounded-2xl border border-dashed border-slate-300 dark:border-slate-700 text-slate-405 bg-white dark:bg-slate-800 text-xs w-full">
                Nenhum prospect ativo atende aos filtros de busca aplicados. Pressione o botão "OK" para atualizar.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
                {filteredProspects.map((emp, i) => {
                  const isConverted = convertedProspectNames.includes(emp.nome);
                  return (
                    <div key={i} className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:shadow-lg hover:-translate-y-1 transition-all flex flex-col justify-between">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-2">
                          {/* Bullet / Interactive Checkbox */}
                          <button
                            type="button"
                            onClick={() => handleToggleProspectConversion(emp.nome)}
                            className={`mt-1 flex items-center justify-center w-5 h-5 rounded-md border-2 transition-all cursor-pointer ${
                              isConverted
                                ? 'bg-[#0c3e26] dark:bg-[#00b86b] border-[#0c3e26] dark:border-[#00b86b] text-white shadow-sm'
                                : 'bg-white dark:bg-slate-900 border-slate-350 dark:border-slate-700 hover:border-emerald-500'
                            }`}
                            title={isConverted ? "Remover de Clientes" : "Marcar como Ganho/Cliente"}
                          >
                            {isConverted && <Check className="w-3.5 h-3.5" />}
                          </button>
                          <div>
                            <div className={`font-bold text-sm sm:text-base text-primary dark:text-slate-100 mb-1 leading-snug cursor-pointer hover:opacity-85 ${
                              isConverted ? 'line-through text-slate-400' : ''
                            }`}
                            onClick={() => handleToggleProspectConversion(emp.nome)}
                            >
                              {emp.nome}
                            </div>
                            <div className="text-[10px] text-slate-500">{emp.cat}</div>
                            <div className="text-[11px] font-bold text-slate-700 dark:text-emerald-400 mt-1.5 flex items-center gap-1.5 bg-slate-50 dark:bg-slate-900/40 px-2 py-1 rounded-md border border-slate-100 dark:border-slate-800/80 w-fit">
                              <Phone className="w-3 h-3 text-slate-500 dark:text-emerald-500" />
                              <span>{emp.tel || `(38) 3215-${3100 + (emp.nome.length * 13) % 870}`}</span>
                            </div>
                          </div>
                        </div>
                        <span className="text-[10px] bg-[#0c3e26]/10 dark:bg-[#00b86b]/15 text-[#0c3e26] dark:text-[#00b86b] px-2.5 py-1 rounded-full font-bold">
                          Score: {emp.score}
                        </span>
                      </div>

                      <div className="mt-4 space-y-2 text-xs text-[#4a6354] dark:text-slate-300">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-[#8fa898]" />
                          <span>{emp.endereco} - {emp.cidade}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Compass className="w-4 h-4 text-[#8fa898]" />
                          <span>{emp.site}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <UsersIcon className="w-4 h-4 text-[#8fa898]" />
                          <span>{emp.funcionarios} Funcionários • {emp.regime}</span>
                        </div>
                      </div>

                      <div className="mt-6 flex flex-col gap-2">
                        <div className="flex gap-2">
                          <button 
                            type="button"
                            onClick={() => handleOpenProspectWhatsApp(emp)}
                            className="flex-1 py-1.5 bg-[#25d366] hover:bg-[#128c7e] text-white text-[11px] font-bold rounded-lg flex items-center justify-center gap-1 border-none cursor-pointer py-1.5"
                          >
                            <MessageCircle className="w-3.5 h-3.5" />
                            <span>WhatsApp IA</span>
                          </button>
                          <button 
                            type="button"
                            onClick={() => { setMapQuery(`${emp.nome} ${emp.cidade}`); toast.success(`Buscando no mapa por: ${emp.nome}`); }}
                            className="px-3 py-1.5 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-200 text-[11px] rounded-lg hover:bg-slate-200 cursor-pointer"
                          >
                            Mapa
                          </button>
                        </div>

                        {isConverted ? (
                          <div className="flex items-center gap-1.5 text-[11px] text-[#0C3E26] dark:text-emerald-400 font-extrabold bg-emerald-500/15 py-2.5 rounded-lg justify-center w-full shadow-inner animate-fade-in">
                            <Check className="w-3.5 h-3.5 text-emerald-550 animate-pulse" />
                            <span>✓ Convertido em Cliente</span>
                          </div>
                        ) : (
                          <button 
                            type="button"
                            onClick={() => handleConvertProspectToClient(emp.nome)}
                            className="w-full py-2 bg-gradient-to-r from-[#D4AF37] to-[#0C3E26] text-white text-[11px] font-black rounded-lg flex items-center justify-center gap-1 border-none hover:shadow active:scale-95 transition-all cursor-pointer"
                          >
                            <UserPlus className="w-3.5 h-3.5 text-white" />
                            <span>Tornar Cliente Ativo</span>
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </>
        ) : (
          /* AS 100 MELHORES CATEGORIAS DE PROSPECÇÃO VIEW WITH OK BUTTON FILTER AND PAGINATION */
          <div className="space-y-6 animate-fade-in pb-12 w-full">
            {/* Stats panel for categories */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="bg-[#0c3e26]/10 dark:bg-[#00b86b]/10 border border-slate-200 dark:border-slate-800 p-5 rounded-2xl flex items-center gap-4 shadow-sm">
                <div className="p-3 bg-[#0c3e26] text-[#E5C158] rounded-xl flex items-center justify-center">
                  <AwardIcon className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-slate-400 font-extrabold">Total Mapeado</p>
                  <h4 className="text-xl font-black text-slate-800 dark:text-slate-100">100 Nichos de Elite</h4>
                </div>
              </div>
              <div className="bg-[#E5C158]/15 dark:bg-[#E5C158]/10 border border-slate-200/60 dark:border-slate-800 p-5 rounded-2xl flex items-center gap-4 shadow-sm">
                <div className="p-3 bg-[#E5C158] text-[#0c3e26] rounded-xl flex items-center justify-center">
                  <Sparkles className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-slate-400 font-extrabold">Tickets mais Lucrativos</p>
                  <h4 className="text-sm font-black text-slate-800 dark:text-slate-100">Agronegócio, Saúde & Tech</h4>
                </div>
              </div>
              <div className="bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 p-5 rounded-2xl flex items-center gap-4 shadow-sm">
                <div className="p-3 bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-slate-400 font-extrabold font-bold">Média de Potencial (Score)</p>
                  <h4 className="text-xl font-black text-[#0c3e26] dark:text-[#E2C054]">86.2 / 100</h4>
                </div>
              </div>
            </div>

            {/* Categories ranking description */}
            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 shadow-sm">
              <div className="space-y-1 mb-5">
                <h4 className="font-display font-black text-base text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <AwardIcon className="h-5 w-5 text-amber-500 animate-pulse" />
                  Ranking de Inteligência: As 100 Melhores Categorias de Prospecção
                </h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Nesta ferramenta você encontra ordenadas pelo score de potencial de fechamento e ticket de honorários, as 100 melhores categorias industriais, varejistas e comerciais recomendadas para prospecção no Norte de Minas pela assessoria contábil Nobel.
                </p>
              </div>

              {/* Filter controls row with green O.K. button */}
              <div className="flex flex-col sm:flex-row gap-3 mb-6 items-center">
                <div className="relative flex-1 w-full">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input 
                    type="text" 
                    value={catSearch}
                    onChange={e => setCatSearch(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleApplyCatFilters()}
                    placeholder="Filtrar categoria econômica / atividades..." 
                    className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 w-full pl-10 pr-4 py-2.5 rounded-xl text-xs text-current focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                </div>
                <div className="w-full sm:w-[240px]">
                  <select 
                    value={catSector}
                    onChange={e => setCatSector(e.target.value)}
                    className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 w-full px-4 py-2.5 rounded-xl text-xs text-current cursor-pointer focus:outline-none"
                  >
                    <option value="all">Todos os Setores (100)</option>
                    <option value="Agronegócio">Agronegócio</option>
                    <option value="Saúde">Saúde</option>
                    <option value="Construção Civil">Construção Civil</option>
                    <option value="Tecnologia">Tecnologia</option>
                    <option value="Educação">Educação</option>
                    <option value="Alimentação">Alimentação</option>
                    <option value="Comércio Varejista">Comércio Varejista</option>
                    <option value="Profissionais Liberais">Profissionais Liberais</option>
                    <option value="Entretenimento & Terceiro Setor">Entretenimento & Terceiro Setor</option>
                    <option value="Serviços Gerais">Serviços Gerais</option>
                  </select>
                </div>
                <button 
                  type="button"
                  onClick={handleApplyCatFilters}
                  className="bg-[#0c3e26] hover:bg-[#062114] text-white font-extrabold text-xs px-6 py-2.5 rounded-xl border border-emerald-500/30 cursor-pointer h-10 shadow-sm transition-all flex items-center justify-center gap-1.5 w-full sm:w-auto active:scale-95"
                >
                  O.K.
                </button>
              </div>

              {/* Categories Data table */}
              {categoriasFiltradas.length === 0 ? (
                <div className="text-center py-12 text-slate-400 border border-dashed rounded-xl dark:border-slate-700 bg-slate-50 dark:bg-slate-900/30 text-xs">
                  Nenhuma categoria contábil atende aos critérios selecionados. Pressione o botão O.K. para realizar a busca.
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="rounded-xl border border-slate-200 dark:border-slate-700 overflow-x-auto bg-slate-50/55 dark:bg-slate-900/10">
                    <table className="w-full text-left border-collapse text-xs">
                      <thead>
                        <tr className="bg-slate-100 dark:bg-slate-900/80 border-b border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-350">
                          <th className="py-3.5 px-4 font-bold text-center w-16">Rank</th>
                          <th className="py-3.5 px-4 font-bold">Categoria Econômica</th>
                          <th className="py-3.5 px-4 font-bold">Setor Alvo</th>
                          <th className="py-3.5 px-4 font-bold">Tributação Provável</th>
                          <th className="py-3.5 px-4 font-bold text-center">Score Potencial</th>
                          <th className="py-3.5 px-4 font-bold text-right font-bold text-slate-900 dark:text-[#E2C054]">Honorários (Médios)</th>
                          <th className="py-3.5 px-4 font-bold text-center">Demanda</th>
                          <th className="py-3.5 px-4 font-bold text-center w-28">Ação</th>
                        </tr>
                      </thead>
                      <tbody>
                        {categoriasPaginadas.map((cat) => {
                          let badgeColor = "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400";
                          if (cat.score < 80) badgeColor = "bg-blue-500/10 text-blue-700 dark:text-blue-400";
                          if (cat.score < 75) badgeColor = "bg-slate-500/10 text-slate-700 dark:text-slate-450";

                          return (
                            <tr key={cat.nome} className="hover:bg-slate-100/50 dark:hover:bg-slate-900/20 border-b border-slate-150/60 dark:border-slate-800 transition-colors">
                              <td className="py-3 px-4 font-mono font-bold text-center">
                                <span className={`inline-flex items-center justify-center w-7 h-7 rounded-full text-[10px] ${
                                  cat.rank <= 3 
                                    ? "bg-gradient-to-r from-[#D4AF37] to-[#9a7e28] text-white font-black shadow-sm" 
                                    : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                                }`}>
                                  #{cat.rank}
                                </span>
                              </td>
                              <td className="py-3 px-4 font-bold text-slate-800 dark:text-slate-200">
                                {cat.nome}
                              </td>
                              <td className="py-3 px-4">
                                <div className="font-semibold text-slate-600 dark:text-slate-300">{cat.setor}</div>
                              </td>
                              <td className="py-3 px-4 font-mono text-[10px] text-slate-500 dark:text-slate-400">
                                {cat.regime}
                              </td>
                              <td className="py-3 px-4 text-center">
                                <span className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-black ${badgeColor}`}>
                                  {cat.score} pts
                                </span>
                              </td>
                              <td className="py-3 px-4 text-right font-bold text-slate-900 dark:text-[#E5C158]">
                                {formatCurrency(cat.honorarios)}
                              </td>
                              <td className="py-3 px-4 text-center">
                                <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-extrabold ${
                                  cat.demanda === "Alta" 
                                    ? "bg-rose-500/15 text-rose-600 dark:text-rose-450" 
                                    : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                                }`}>
                                  {cat.demanda}
                                </span>
                              </td>
                              <td className="py-3 px-4 text-center">
                                <button 
                                  type="button"
                                  onClick={() => handleProspectCategory(cat.nome)}
                                  className="py-1 px-3 bg-[#0c3e26]/10 hover:bg-[#0c3e26] text-[#0c3e26] hover:text-white rounded-lg text-[10px] font-extrabold border-none transition-all cursor-pointer flex items-center justify-center gap-1.5 w-full mx-auto"
                                >
                                  <span>Mapear</span>
                                  <ArrowUpRight className="w-3" />
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>

                  {/* Pagination Controls */}
                  {totalPaginasCategorias > 1 && (
                    <div className="flex items-center justify-between pt-2">
                      <p className="text-[11px] text-slate-400">
                        Exibindo página <span className="font-bold text-slate-600 dark:text-slate-350">{paginaCategorias}</span> de <span className="font-bold text-slate-600 dark:text-slate-350">{totalPaginasCategorias}</span> ({categoriasFiltradas.length} resultados)
                      </p>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          disabled={paginaCategorias === 1}
                          onClick={() => setPaginaCategorias(p => Math.max(1, p - 1))}
                          className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed hover:bg-slate-50 transition-colors"
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          disabled={paginaCategorias === totalPaginasCategorias}
                          onClick={() => setPaginaCategorias(p => Math.min(totalPaginasCategorias, p + 1))}
                          className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed hover:bg-slate-50 transition-colors"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

            {/* WHATSAPP SCRIPT DRAFP PANEL (AI INLINE) */}
            {isWhatsAppPanelOpen && (
              <div className="fixed bottom-6 right-6 w-96 bg-white dark:bg-slate-800 border-2 border-primary/25 rounded-3xl shadow-2xl z-[1001] overflow-hidden flex flex-col">
                <div className="bg-[#128c7e] text-white p-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MessageCircle className="w-5 h-5" />
                    <div>
                      <div className="font-bold text-sm">Nobel AI - Whatsapp Pitch</div>
                      <div className="text-[10px] opacity-80">Roteirizador de prospecção instantânea</div>
                    </div>
                  </div>
                  <button onClick={() => setIsWhatsAppPanelOpen(false)} className="text-white bg-transparent border-none cursor-pointer">
                    <XIcon className="w-5 h-5" />
                  </button>
                </div>

                <div className="p-6 space-y-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500">Nome da Empresa</label>
                    <input 
                      type="text" 
                      value={waEmpresa}
                      onChange={e => { setWaEmpresa(e.target.value); generateWhatsAppDraft(e.target.value, waSegmento, waTone); }}
                      className="w-full bg-slate-100 dark:bg-slate-900 border px-3 py-2 rounded-xl text-xs text-current" 
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500">Segmento</label>
                    <input 
                      type="text" 
                      value={waSegmento}
                      onChange={e => { setWaSegmento(e.target.value); generateWhatsAppDraft(waEmpresa, e.target.value, waTone); }}
                      className="w-full bg-slate-100 dark:bg-slate-900 border px-3 py-2 rounded-xl text-xs text-current" 
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500">Telefone Destinatário</label>
                    <input 
                      type="text" 
                      value={waNumero}
                      onChange={e => setWaNumero(e.target.value)}
                      placeholder="(11) 90000-0000"
                      className="w-full bg-slate-100 dark:bg-slate-900 border px-3 py-2 rounded-xl text-xs text-current" 
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500">Tom de Voz</label>
                    <div className="grid grid-cols-3 gap-1">
                      {(['profissional', 'amigavel', 'direto'] as const).map(t => (
                        <button 
                          key={t}
                          onClick={() => handleToneChange(t)}
                          className={`py-1.5 border rounded-lg text-xs capitalize cursor-pointer ${waTone === t ? 'bg-[#128c7e] text-white' : 'bg-white dark:bg-slate-900'}`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="bg-slate-50 dark:bg-slate-900/60 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 text-xs leading-relaxed max-h-48 overflow-y-auto">
                    {waGeneratedText}
                  </div>

                  <button 
                    onClick={handleWAUrlSend}
                    className="w-full py-3 bg-[#25d366] hover:bg-[#128c7e] text-white rounded-xl font-bold flex items-center justify-center gap-2 border-none cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Disparar WhatsApp</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* 4. CENTRAL DE INTELIGÊNCIA ARTIFICIAL */}
        {activeTab === 'ia' && (
          <div className="space-y-8 animate-fade-in flex-1 flex flex-col">
            <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="font-display font-black text-lg text-primary flex items-center gap-2">
                  <Cpu className="w-5 h-5 text-accent" />
                  Módulo de IA Multi-Modelos
                </h3>
                  <p className="text-xs text-slate-500 text-left">Conecte sua API Key em Settings para habilitar respostas em milissegundos.</p>
              </div>

              <select 
                value={selectedAIModel}
                onChange={e => setSelectedAIModel(e.target.value)}
                className="bg-slate-100 dark:bg-slate-900 border px-4 py-2 rounded-xl text-xs text-current font-bold"
              >
                <option value="gemini">Google Gemini Pro (aistudio-build)</option>
                <option value="gpt">OpenAI GPT-4o (Fallback)</option>
                <option value="claude">Claude 3.5 Sonnet (Fallback)</option>
                <option value="deepseek">DeepSeek V3 (Fallback)</option>
              </select>
            </div>

            {/* SUB-TABS NAVIGATION */}
            <div className="flex flex-wrap gap-2 border-b border-slate-200 dark:border-slate-700 pb-3 text-left">
              {[
                { id: 'chat', label: 'Chat Assistente Ativo', icon: <MessageSquare className="w-4 h-4" /> },
                { id: 'email', label: 'Idealizador de E-mails IA', icon: <Send className="w-4 h-4" /> },
                { id: 'polidor', label: 'Polidor de Textos', icon: <Wand2 className="w-4 h-4" /> },
                { id: 'imobiliaira', label: 'Especial Imobiliário (Surpresa!)', icon: <BrainCircuit className="w-4 h-4 text-accent" /> },
              ].map(subTab => (
                <button
                  key={subTab.id}
                  onClick={() => setAiActiveSubTab(subTab.id as any)}
                  className={`px-4 py-2.5 rounded-xl text-xs font-black inline-flex items-center gap-2 transition-all cursor-pointer border ${
                    aiActiveSubTab === subTab.id 
                      ? 'bg-primary text-white border-primary shadow-sm' 
                      : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-350 hover:bg-slate-50 dark:hover:bg-slate-900 border-slate-200 dark:border-slate-700'
                  }`}
                >
                  {subTab.icon}
                  <span>{subTab.label}</span>
                </button>
              ))}
            </div>

            {/* Chat Sub-tab */}
            {aiActiveSubTab === 'chat' && (
              <div className="flex flex-col lg:flex-row gap-6">
                {/* Preconfigured Questions Menu */}
                <div className="w-full lg:w-80 bg-slate-50 dark:bg-slate-900/60 p-5 rounded-3xl border border-slate-200 dark:border-slate-700 text-left space-y-3 flex-shrink-0">
                  <div className="font-extrabold text-xs text-primary dark:text-[#00b86b] uppercase tracking-wider flex items-center gap-1.5 mb-2">
                    <Sparkles className="w-3.5 h-3.5" />
                    Perguntas Próprias de Contabilidade
                  </div>
                  <p className="text-[11px] text-slate-500 mb-4 font-semibold">Selecione uma pergunta pronta de especialistas:</p>
                  {[
                    "Simples Nacional vs Lucro Presumido: Como fazer a transição ideal 2026?",
                    "Como montar o Planejamento Tributário de Prestadores de Serviços?",
                    "Elisão Fiscal Legal de ISS/ICMS em clínicas e engenharias.",
                    "Qual a melhor alíquota de impostos para holding patrimonial?",
                    "Como auditar obrigações acessórias do SPED Contábil de forma automática?",
                    "Simule estratégias corporativas de redução fiscal no Simples."
                  ].map((preset, pIdx) => (
                    <button
                      key={pIdx}
                      onClick={() => {
                        setChatInputValue(preset);
                      }}
                      className="w-full text-left p-3 rounded-xl bg-white dark:bg-slate-800 text-xs text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-primary hover:bg-primary/5 transition-all cursor-pointer font-medium space-y-1 block shadow-xs"
                    >
                      <span>{preset}</span>
                    </button>
                  ))}
                </div>

                {/* Chat Sandbox */}
                <div className="flex-1 bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 flex flex-col overflow-hidden min-h-[450px]">
                  <div className="bg-slate-50 dark:bg-slate-900/40 px-6 py-4 border-b border-slate-100 dark:border-slate-700 flex items-center justify-between">
                    <div className="text-left">
                      <div className="text-xs font-black text-slate-700 dark:text-slate-200">Assistente Fiduciário Ativo</div>
                      <div className="text-[10px] text-slate-400">Pronto para dar respostas técnicas e relatórios estruturados</div>
                    </div>
                    <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping"></span>
                  </div>

                  <div className="flex-1 p-6 space-y-4 overflow-y-auto max-h-[350px]">
                    {chatMessages.map(msg => (
                      <div key={msg.id} className={`flex gap-3 max-w-[85%] ${msg.sender === 'user' ? 'ml-auto flex-row-reverse' : ''}`}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-xs ${msg.sender === 'ai' ? 'bg-primary text-white' : 'bg-slate-200 text-slate-800'}`}>
                          {msg.sender === 'ai' ? 'AI' : 'U'}
                        </div>
                        <div className={`p-4 rounded-2xl text-xs leading-relaxed text-left ${msg.sender === 'ai' ? 'bg-slate-100 dark:bg-slate-900 text-current whitespace-pre-line' : 'bg-primary text-white shadow-md'}`}>
                          {msg.text}
                          <div className="text-[8px] opacity-40 mt-1 text-right">{msg.timestamp}</div>
                        </div>
                      </div>
                    ))}
                    {aiIsLoading && (
                      <div className="flex gap-3 max-w-[85%]">
                        <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-xs animate-spin font-bold">
                          AI
                        </div>
                        <div className="p-4 rounded-2xl text-xs bg-slate-100 dark:bg-slate-900 italic text-slate-500 animate-pulse text-left">
                          Dra. Érika AI está calculando sua resposta fiduciária sênior...
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Chat Send */}
                  <div className="p-4 border-t border-slate-200 dark:border-slate-700 flex gap-2">
                    <input 
                      type="text" 
                      value={chatInputValue}
                      onChange={e => setChatInputValue(e.target.value)}
                      onKeyPress={e => e.key === 'Enter' && handleSendChatMessage()}
                      placeholder="Escreva perguntas fiscais, regulatórias ou simulações..."
                      className="flex-1 bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 px-4 py-3.5 rounded-xl text-xs text-current focus:outline-none focus:border-primary"
                    />
                    <button 
                      onClick={handleSendChatMessage}
                      className="p-3.5 bg-primary hover:bg-primary-light text-white rounded-xl flex items-center justify-center cursor-pointer border-none shadow transition-transform active:scale-95"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Email Idealizer Sub-tab */}
            {aiActiveSubTab === 'email' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-left">
                {/* Form fields */}
                <div className="lg:col-span-5 bg-slate-50 dark:bg-slate-900/60 p-6 rounded-3xl border border-slate-200 dark:border-slate-700 space-y-4">
                  <div className="font-extrabold text-sm text-primary dark:text-[#00b86b] flex items-center gap-1.5 border-b border-slate-250 dark:border-slate-700 pb-3">
                    <Send className="w-4 h-4" />
                    Idealizador de E-mails de Alta Conversão
                  </div>
                  
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-500">Objetivo do E-mail</label>
                    <select
                      value={emailTipo}
                      onChange={e => setEmailTipo(e.target.value as any)}
                      className="w-full bg-white dark:bg-slate-800 border border-slate-250 dark:border-slate-700 px-4 py-2.5 rounded-xl text-xs text-current font-bold"
                    >
                      <option value="comercial">Apresentação & Atração Comercial (Cold Mail)</option>
                      <option value="proposta">Encaminhamento de Proposta Premium</option>
                      <option value="cobranca">Aviso de Auditoria / Cobrança Amigável</option>
                      <option value="boas_vindas">Boas-vindas & Onboarding de Cliente</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-500 font-bold">Destinatário</label>
                    <input
                      type="text"
                      value={emailDestinatario}
                      onChange={e => setEmailDestinatario(e.target.value)}
                      placeholder="Ex: Imobiliária Rentabilidade"
                      className="w-full bg-white dark:bg-slate-800 border border-slate-250 dark:border-slate-700 px-4 py-2.5 rounded-xl text-xs text-current"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-500 font-bold">Segmento do Destinatário</label>
                    <input
                      type="text"
                      value={emailSegmento}
                      onChange={e => setEmailSegmento(e.target.value)}
                      placeholder="Ex: Mercado Imobiliário"
                      className="w-full bg-white dark:bg-slate-800 border border-slate-250 dark:border-slate-700 px-4 py-2.5 rounded-xl text-xs text-current"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-500 font-bold block">Argumento Principal / Oportunidade a Destacar</label>
                    <textarea
                      rows={3}
                      value={emailDestaque}
                      onChange={e => setEmailDestaque(e.target.value)}
                      placeholder="O que deseja focar? Ex: Economia no lucro de ganho imobiliário ou fusão societária facilitada."
                      className="w-full bg-white dark:bg-slate-800 border border-slate-250 dark:border-slate-700 px-4 py-2.5 rounded-xl text-xs text-current focus:outline-none"
                    />
                  </div>

                  <button
                    onClick={handleGenerateEmailWithIA}
                    disabled={emailIsLoading}
                    className="w-full py-3 bg-primary hover:bg-primary-light text-white rounded-xl text-xs font-black flex items-center justify-center gap-2 border-none shadow transition-all cursor-pointer disabled:opacity-50"
                  >
                    <Sparkles className="w-4 h-4 text-accent" />
                    <span>{emailIsLoading ? 'Gerando E-mail Inteligente...' : 'Gerar E-mail com AI Nobel'}</span>
                  </button>
                </div>

                {/* Email Output */}
                <div className="lg:col-span-7 bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 p-6 flex flex-col justify-between space-y-4">
                  <div className="flex-1">
                    <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700 pb-3 mb-4">
                      <span className="text-xs font-black text-slate-700 dark:text-slate-200">Layout do E-mail Produzido</span>
                      {emailOutput && (
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(emailOutput);
                            alert('E-mail copiado para a área de transferência com sucesso!');
                          }}
                          className="px-3 py-1.5 bg-[#0C3E26]/10 text-primary dark:text-[#00b86b] rounded-lg text-[10px] font-black border-none cursor-pointer flex items-center gap-1 hover:bg-[#0C3E26]/20"
                        >
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copiar E-mail</span>
                        </button>
                      )}
                    </div>

                    <div className="min-h-[250px] bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-2xl whitespace-pre-wrap text-xs text-slate-700 dark:text-slate-350 overflow-y-auto max-h-[350px]">
                      {emailOutput ? emailOutput : (
                        <p className="text-slate-400 italic text-center mt-20">Configure os parâmetros ao lado e clique em "Gerar E-mail com AI Nobel" para conferir uma cópia fiduciária perfeita de alta conversão.</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="text-[10px] text-slate-400 flex items-center gap-1 justify-center">
                    <Shield className="w-3.5 h-3.5 text-accent" />
                    <span>Revisado pela retaguarda e em conformidade estrita com as leis de direito comercial e privacidade 2026.</span>
                  </div>
                </div>
              </div>
            )}

            {/* Polidor de Textos Sub-tab */}
            {aiActiveSubTab === 'polidor' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-left">
                {/* Inputs */}
                <div className="bg-slate-50 dark:bg-slate-900/60 p-6 rounded-3xl border border-slate-200 dark:border-slate-700 space-y-5">
                  <div className="font-extrabold text-sm text-primary dark:text-[#00b86b] flex items-center gap-1.5 border-b border-slate-250 dark:border-[#2C3E50] pb-3">
                    <Wand2 className="w-4 h-4 text-accent" />
                    Melhoria de Textos & Polimento Inteligente
                  </div>

                  <p className="text-xs text-slate-500 leading-relaxed">Cole qualquer rascunho simplificado, e-mail técnico denso ou mensagem fiscal apressada e clique no botão para ganhar coesão fiduciária instântanea.</p>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-500 font-bold block">Cole seu Rascunho Bruto</label>
                    <textarea
                      rows={6}
                      value={polidorInput}
                      onChange={e => setPolidorInput(e.target.value)}
                      placeholder="Ex: Erika, avisa o cliente que se ele botar a locação na holding dele de administração de imóveis particulares, em vez de pagar 27.5% de imposto no CPF mensal, ele passa a pagar só uns 11.33% no CNPJ que é super gain no bolso..."
                      className="w-full bg-white dark:bg-slate-800 border border-slate-250 dark:border-slate-700 px-4 py-3 rounded-xl text-xs text-current focus:outline-none"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-slate-500 block font-bold">Estilo de Tom Desejado</label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { id: 'fiduciario', label: 'Fiduciário Nobre', desc: 'Líder e CEO' },
                        { id: 'amigavel', label: 'Amigável Próximo', desc: 'Claro e Didático' },
                        { id: 'tecnico', label: 'Técnico Rigoroso', desc: 'Perfeito Legal' }
                      ].map(t => (
                        <button
                          key={t.id}
                          onClick={() => setPolidorTone(t.id as any)}
                          type="button"
                          className={`p-2 rounded-xl border text-[10px] text-left cursor-pointer transition-all ${
                            polidorTone === t.id 
                              ? 'bg-primary border-primary text-white font-bold shadow-md' 
                              : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'
                          }`}
                        >
                          <div className="font-bold">{t.label}</div>
                          <div className="opacity-70 mt-0.5 text-[9px]">{t.desc}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={handlePolishTextWithIA}
                    disabled={polidorIsLoading || !polidorInput.trim()}
                    className="w-full py-3 bg-[#0C3E26] hover:bg-[#128C54] text-white rounded-xl text-xs font-black flex items-center justify-center gap-2 border-none shadow transition-all cursor-pointer disabled:opacity-50"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-accent animate-pulse" />
                    <span>{polidorIsLoading ? 'Polindo Rascunho com IA...' : 'Refinar e Polir Texto Agora'}</span>
                  </button>
                </div>

                {/* Output */}
                <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 p-6 flex flex-col justify-between space-y-4">
                  <div className="flex-1 flex flex-col">
                    <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700 pb-3 mb-4">
                      <span className="text-xs font-black text-slate-700 dark:text-slate-200">Resultado do Texto Refinado</span>
                      {polidorOutput && (
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(polidorOutput);
                            alert('Texto refinado copiado com sucesso!');
                          }}
                          className="px-3 py-1.5 bg-[#0C3E26]/10 text-primary dark:text-[#00b86b] rounded-lg text-[10px] font-black border-none cursor-pointer flex items-center gap-1 hover:bg-[#0C3E26]/20"
                        >
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copiar Texto</span>
                        </button>
                      )}
                    </div>

                    <div className="flex-1 min-h-[300px] bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-2xl whitespace-pre-wrap text-xs text-slate-700 dark:text-slate-350 overflow-y-auto">
                      {polidorOutput ? polidorOutput : (
                        <p className="text-slate-400 italic text-center mt-24">Insira o rascunho de texto e clique em "Refinar e Polir" para obter a versão final elegante da inteligência artificial.</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="text-[10px] text-slate-400 text-center">
                    Todas as sugestões visam coesão corporativa, segurança de elisão fiscal e conformidade gramatical imediata.
                  </div>
                </div>
              </div>
            )}

            {/* Imobiliária Sub-tab */}
            {aiActiveSubTab === 'imobiliaira' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-left">
                {/* Inputs and Selectors */}
                <div className="lg:col-span-5 bg-slate-50 dark:bg-slate-900/60 p-6 rounded-3xl border border-slate-200 dark:border-slate-700 space-y-4">
                  <div className="font-extrabold text-sm text-[#0C3E26] dark:text-[#00b86b] flex items-center gap-1.5 border-b border-slate-250 dark:border-slate-700 pb-3">
                    <BrainCircuit className="w-4.5 h-4.5 text-[#D4AF37]" />
                    Hub Nobel Imobiliário - Oportunidades & Tributos
                  </div>

                  <p className="text-[11px] text-slate-500">Desenvolvido sob medida para surpreender imobiliárias do setor de administração, correções e vendas imobiliárias de alta margem.</p>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-500 font-bold block">Escolha a Estratégia de Sucesso</label>
                    <div className="space-y-2">
                      {[
                        { id: 'holding', label: 'Estratégia Holding Patrimonial', desc: 'Isenção/Redução de aluguel (27.5% no CPF para 11% no CNPJ)' },
                        { id: 'ganho_capital', label: 'Isenção de Ganho de Capital (180 dias)', desc: 'Imposto ZERO reinvestindo no prazo legal' },
                        { id: 'itbi', label: 'Recuperação / Redução de ITBI de Registro', desc: 'Combate ao valor de referência abusivo municipal' },
                        { id: 'reajuste', label: 'Reajuste Diplomático de Aluguel', desc: 'IGP-M/IPCA explicativo sem atritos com locatário' },
                        { id: 'pitch', label: 'Pitch Comercial de Copywriting', desc: 'Descrição de vendas elegante para investidores' }
                      ].map(topic => (
                        <button
                          key={topic.id}
                          onClick={() => {
                            setImobiliairaTopic(topic.id as any);
                            if (topic.id === 'holding') setImobiliairaInput('Apartamento alugado mensalmente por R$ 12.000,00 no CPF do proprietário.');
                            else if (topic.id === 'ganho_capital') setImobiliairaInput('Venda residencial por R$ 900.000,00 que fora comprada por R$ 380.000,00.');
                            else if (topic.id === 'itbi') setImobiliairaInput('ITBI cobrado sobre valor de referência da Prefeitura de R$ 750.000 sendo que a venda real foi R$ 600.000.');
                            else if (topic.id === 'reajuste') setImobiliairaInput('Inquilino comercial há 4 anos com aluguel de R$ 5.400,00. Aplicar o índice IPCA em vigor.');
                            else if (topic.id === 'pitch') setImobiliairaInput('Prédio comercial corporativo, 800m², vaga para 15 carros, no centro corporativo.');
                          }}
                          type="button"
                          className={`w-full p-2.5 rounded-xl border text-xs text-left cursor-pointer transition-all flex items-start gap-2.5 ${
                            imobiliairaTopic === topic.id 
                              ? 'bg-gradient-to-r from-[#D4AF37] to-[#0C3E26] text-white border-none font-bold shadow-md' 
                              : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100/50'
                          }`}
                        >
                          <div className={`w-2.5 h-2.5 rounded-full mt-1 ${imobiliairaTopic === topic.id ? 'bg-white animate-pulse' : 'bg-primary dark:bg-[#00b86b]'}`} />
                          <div className="flex-1">
                            <div className="font-bold">{topic.label}</div>
                            <div className={`text-[10px] opacity-80 ${imobiliairaTopic === topic.id ? 'text-slate-100' : 'text-slate-400'}`}>{topic.desc}</div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-500 font-bold block">Dados do Caso Real (Editar valores)</label>
                    <textarea
                      rows={3}
                      value={imobiliairaInput}
                      onChange={e => setImobiliairaInput(e.target.value)}
                      placeholder=" Customize estes números para a simulação..."
                      className="w-full bg-white dark:bg-slate-800 border border-slate-250 dark:border-slate-700 px-4 py-2.5 rounded-xl text-xs text-current"
                    />
                  </div>

                  <button
                    onClick={handleGenerateImobiliariaIdeasWithIA}
                    disabled={imobiliairaIsLoading}
                    className="w-full py-3 bg-gradient-to-r from-[#D4AF37] to-[#0C3E26] hover:opacity-90 leading-tight text-white rounded-xl text-xs font-black flex items-center justify-center gap-2 border-none shadow transition-all cursor-pointer disabled:opacity-50"
                  >
                    <Sparkles className="w-4 h-4 text-[#D4AF37] animate-bounce" />
                    <span>{imobiliairaIsLoading ? 'Calculando Cálculos e Insights...' : 'Simular Estratégia Jurídica Imobiliária'}</span>
                  </button>
                </div>

                {/* Strategy Result Panel */}
                <div className="lg:col-span-7 bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 p-6 flex flex-col justify-between space-y-4">
                  <div className="flex-1">
                    <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700 pb-3 mb-4">
                      <span className="text-xs font-black text-slate-700 dark:text-slate-200">Relatório Executivo Geral & Insights</span>
                      {imobiliairaOutput && (
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(imobiliairaOutput);
                            alert('Relatório imobiliário copiado com sucesso! Parabéns.');
                          }}
                          className="px-3 py-1.5 bg-[#D4AF37]/15 text-[#0C3E26] dark:text-[#e9d690] rounded-lg text-[10px] font-black border-none cursor-pointer flex items-center gap-1 hover:bg-[#D4AF37]/35"
                        >
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copiar Relatório</span>
                        </button>
                      )}
                    </div>

                    <div className="min-h-[300px] bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl whitespace-pre-wrap text-xs text-slate-700 dark:text-slate-350 overflow-y-auto max-h-[420px] text-left leading-relaxed">
                      {imobiliairaOutput ? imobiliairaOutput : (
                        <div className="text-center mt-20 space-y-3">
                          <BrainCircuit className="w-12 h-12 text-[#D4AF37] mx-auto animate-pulse opacity-40" />
                          <p className="text-slate-400 italic">Configure as bases da sua holding patrimonial ou simulação de ganho físico legal ao lado para liberar inteligência automatizada inédita.</p>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="p-3 bg-slate-100 dark:bg-slate-900 rounded-xl text-[10px] text-[#4a6354] flex gap-2.5 items-start">
                    <AlertCircle className="w-4 h-4 text-primary shrink-0" />
                    <span>Os relatórios estimativos são fiduciários e sugerem o enquadramento de planejamento legal mais lucrativo de acordo com o regulamento do ganho de capital e lei de registros públicos do ano corrente de 2026.</span>
                  </div>
                </div>
              </div>
            )}\n

            {/* GERENCIADOR DE INFORMATIVOS INTEGRADO AO SITE */}
            <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200 dark:border-slate-700 space-y-6 text-left">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-700 pb-4">
                <div>
                  <h4 className="font-display font-black text-lg text-[#0C3E26] dark:text-[#00b86b] flex items-center gap-2">
                    <Newspaper className="w-5 h-5 text-[#D4AF37]" />
                    Gerenciador de Informativos - Site Institucional
                  </h4>
                  <p className="text-xs text-slate-500 mt-0.5">Edite e gere informativos fiscais de IA que aparecem instantaneamente na seção de Informativos do site institucional.</p>
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={() => handleGenerateAIInformativo("Maio 2026")}
                    type="button"
                    className="flex items-center gap-1.5 px-3.5 py-2 bg-[#0C3E26] hover:bg-[#128C54] text-white rounded-xl text-xs font-bold hover:shadow transition-all border-none cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>Recriar Maio com IA</span>
                  </button>
                  <button 
                    onClick={() => handleResetDefaultInformativos()}
                    type="button"
                    className="flex items-center gap-1.5 px-3.5 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-950 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 rounded-xl text-xs font-bold transition-all cursor-pointer"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Resetar Padrões</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {informativos.map((inf, index) => (
                  <div key={inf.id || index} className="bg-slate-55 dark:bg-slate-900/60 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4 flex flex-col justify-between shadow-sm">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between gap-4">
                        <span className="text-[10px] font-black uppercase text-white bg-[#0C3E26] px-2.5 py-1 rounded-full">{inf.mes}</span>
                        <div className="flex items-center gap-1">
                          <label className="text-[9px] font-bold text-slate-400">Data:</label>
                          <input 
                            type="text" 
                            value={inf.dataEmissao}
                            onChange={(e) => handleUpdateInformativoField(inf.id, 'dataEmissao', e.target.value)}
                            className="text-[10px] font-bold text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:outline-none focus:border-[#0C3E26] rounded px-2 py-0.5 w-24 text-right"
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-1">
                        <label className="text-[10px] font-extrabold text-[#4a6354] block">Título do Informativo</label>
                        <input 
                          type="text"
                          value={inf.titulo}
                          onChange={(e) => handleUpdateInformativoField(inf.id, 'titulo', e.target.value)}
                          className="w-full text-xs font-extrabold bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 px-3 py-2 rounded-xl focus:outline-none focus:border-[#0C3E26] text-current font-sans shadow-sm"
                          placeholder="Título do artigo..."
                        />
                      </div>
                      
                      <div className="space-y-1">
                        <label className="text-[10px] font-extrabold text-[#4a6354] block">Conteúdo (Parágrafo)</label>
                        <textarea
                          value={inf.conteudo}
                          onChange={(e) => handleUpdateInformativoField(inf.id, 'conteudo', e.target.value)}
                          className="w-full text-[11px] leading-relaxed h-32 bg-white dark:bg-slate-955 border border-slate-200 dark:border-slate-800 px-3 py-2 rounded-xl focus:outline-none focus:border-[#0C3E26] resize-none text-current font-sans shadow-sm"
                          placeholder="Escreva as diretrizes fiscais..."
                        ></textarea>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800 font-semibold text-[10px] text-slate-400">
                      <span className="inline-flex items-center gap-1.5 text-[#0C3E26] font-extrabold">
                        <Sparkles className="w-3 h-3 text-[#D4AF37]" />
                        <input 
                          type="text"
                          value={inf.autor}
                          onChange={(e) => handleUpdateInformativoField(inf.id, 'autor', e.target.value)}
                          className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-[10px] text-[#0C3E26] font-bold w-24 focus:outline-none rounded px-2 py-0.5 text-center"
                        />
                      </span>
                      <span className="text-emerald-500 font-bold bg-emerald-500/10 dark:bg-emerald-500/20 px-2.5 py-1 rounded-full inline-flex items-center gap-1 text-[10px]">
                        <Check className="w-3 h-3" /> Exibindo no site
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 5. MARKETING CREATIVITY GENERATOR */}
        {activeTab === 'marketing' && (
          <div className="space-y-8 animate-fade-in text-left">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
              <div>
                <h3 className="font-display font-black text-xl text-primary dark:text-[#00b86b]">Laboratório do Marketing de Campanhas com IA</h3>
                <p className="text-xs text-slate-500">Formule materiais de marketing e prospecção de altíssima conversão integrados à geração de imagens via Pollinations e Groq.</p>
              </div>
              <span className="bg-[#00b86b]/10 text-[#00b86b] font-extrabold text-[10px] uppercase px-3 py-1 rounded-full self-start sm:self-center border border-[#00b86b]/20">
                Premium Gateway Ativo
              </span>
            </div>

            {/* Selector form */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-5 bg-white dark:bg-[#111827] p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-6">
                <div className="font-bold text-sm text-slate-800 dark:text-slate-100 uppercase tracking-wider flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-[#00b86b]" />
                  <span>Configurar Campanha</span>
                </div>

                <div className="space-y-4">
                  {/* Category selector */}
                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-2">Segmento Contábil:</label>
                    <div className="grid grid-cols-2 gap-2">
                      <button 
                        onClick={() => setMktCategory('abertura')} 
                        className={`text-xs p-2.5 rounded-xl border text-center transition-all cursor-pointer ${mktCategory === 'abertura' ? 'bg-[#00b86b]/15 border-[#00b86b] text-[#00b86b] font-black' : 'bg-transparent border-slate-200 dark:border-slate-800 text-slate-400 hover:text-slate-100'}`}
                      >
                        💼 Abertura Empresas
                      </button>
                      <button 
                        onClick={() => setMktCategory('reducao_medicos')} 
                        className={`text-xs p-2.5 rounded-xl border text-center transition-all cursor-pointer ${mktCategory === 'reducao_medicos' ? 'bg-[#00b86b]/15 border-[#00b86b] text-[#00b86b] font-black' : 'bg-transparent border-slate-200 dark:border-slate-800 text-slate-400 hover:text-slate-100'}`}
                      >
                        🩺 Redução para Médicos
                      </button>
                      <button 
                        onClick={() => setMktCategory('bpo_financeiro')} 
                        className={`text-xs p-2.5 rounded-xl border text-center transition-all cursor-pointer ${mktCategory === 'bpo_financeiro' ? 'bg-[#00b86b]/15 border-[#00b86b] text-[#00b86b] font-black' : 'bg-transparent border-slate-200 dark:border-slate-800 text-slate-400 hover:text-slate-100'}`}
                      >
                        📊 BPO Financeiro
                      </button>
                      <button 
                        onClick={() => setMktCategory('irpf_declaracao')} 
                        className={`text-xs p-2.5 rounded-xl border text-center transition-all cursor-pointer ${mktCategory === 'irpf_declaracao' ? 'bg-[#00b86b]/15 border-[#00b86b] text-[#00b86b] font-black' : 'bg-transparent border-slate-200 dark:border-slate-800 text-slate-400 hover:text-slate-100'}`}
                      >
                        📅 Declaração IRPF 2026
                      </button>
                    </div>
                  </div>

                  {/* Channel selector */}
                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-2">Canal / Formato da Peça:</label>
                    <div className="grid grid-cols-2 gap-2">
                      <button 
                        onClick={() => setMktChannel('instagram_post')} 
                        className={`text-xs p-2.5 rounded-xl border text-center transition-all cursor-pointer ${mktChannel === 'instagram_post' ? 'bg-primary/20 border-primary text-primary dark:text-[#00b86b] dark:border-[#00b86b] font-black' : 'bg-transparent border-slate-200 dark:border-slate-800 text-slate-400'}`}
                      >
                        🖼️ Feed Instagram
                      </button>
                      <button 
                        onClick={() => setMktChannel('instagram_stories')} 
                        className={`text-xs p-2.5 rounded-xl border text-center transition-all cursor-pointer ${mktChannel === 'instagram_stories' ? 'bg-primary/20 border-primary text-primary dark:text-[#00b86b] dark:border-[#00b86b] font-black' : 'bg-transparent border-slate-200 dark:border-slate-800 text-slate-400'}`}
                      >
                        📱 Stories (Vertical)
                      </button>
                      <button 
                        onClick={() => setMktChannel('whatsapp_pitch')} 
                        className={`text-xs p-2.5 rounded-xl border text-center transition-all cursor-pointer ${mktChannel === 'whatsapp_pitch' ? 'bg-primary/20 border-primary text-primary dark:text-[#00b86b] dark:border-[#00b86b] font-black' : 'bg-transparent border-slate-200 dark:border-slate-800 text-slate-400'}`}
                      >
                        💬 Pitch WhatsApp
                      </button>
                      <button 
                        onClick={() => setMktChannel('comercial_email')} 
                        className={`text-xs p-2.5 rounded-xl border text-center transition-all cursor-pointer ${mktChannel === 'comercial_email' ? 'bg-primary/20 border-primary text-primary dark:text-[#00b86b] dark:border-[#00b86b] font-black' : 'bg-transparent border-slate-200 dark:border-slate-800 text-slate-400'}`}
                      >
                        📧 E-mail Prospecção
                      </button>
                    </div>
                  </div>

                  {/* Tone of Voice */}
                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-2">Tom de Voz:</label>
                    <select 
                      value={mktVoice} 
                      onChange={(e) => setMktVoice(e.target.value)} 
                      className="w-full bg-slate-50 dark:bg-[#111827] border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2.5 text-xs text-slate-700 dark:text-slate-300 font-bold focus:outline-none focus:border-[#00b86b]"
                    >
                      <option value="profissional">👔 Altamente Profissional & Corporativo</option>
                      <option value="persuasivo">🔥 Persuasivo, Pragmático & Agressivo comercialmente</option>
                      <option value="educativo">🎓 Educativo & Didático (Atração Orgânica)</option>
                    </select>
                  </div>
                </div>

                {/* Submit button */}
                <button 
                  onClick={() => {
                    setIsGeneratingMkt(true);
                    setGeneratedCreative(null);
                    setTimeout(() => {
                      const selected = MARKETING_CAMPAIGNS[mktCategory]?.[mktChannel];
                      if (selected) {
                        const PROMPT_MODIFIERS = [
                          "brazilian business team collaborating, premium modern accounting office, ledgers and laptops on desk, warm soft afternoon lighting, photorealistic 8k",
                          "confident professional accountant showing financial tax report to smiling clients, modern sleek corporate glass meeting room, realistic portrait, high key lighting",
                          "tidy business workspace, executive hands calculating taxes with graphs and notebooks, luxury accounting firm aesthetic, sharp depth of field, high-end commercial photo",
                          "two young brazilian partners smiling in success, holding tablet with business charts, elegant modern bookkeeping lobby background, daylight cinematic photo",
                          "modern corporate accounting team workspace, cheerful financial advisors sitting together, documents, premium executive look, high fidelity realistic textures"
                        ];
                        const randomStyle = PROMPT_MODIFIERS[Math.floor(Math.random() * PROMPT_MODIFIERS.length)];
                        const augmentedPrompt = `${selected.prompt}. Style: ${randomStyle}. Shot with award-winning commercial camera, natural colors.`;

                        setGeneratedCreative({
                          title: selected.title,
                          subtitle: selected.subtitle,
                          body: mktVoice === 'persuasivo' 
                            ? selected.body + "\n\n⚠️ NÃO PERCA TEMPO! Vagas para simulação tributária gratuita limitadas para esta semana!" 
                            : mktVoice === 'educativo' 
                            ? "📖 Insights Importantes:\n" + selected.body 
                            : selected.body,
                          imageUrl: `https://image.pollinations.ai/p/${encodeURIComponent(augmentedPrompt)}?width=800&height=800&nologo=true&seed=${Math.floor(Math.random() * 10000000)}`
                        });
                      }
                      setIsGeneratingMkt(false);
                    }, 1200);
                  }}
                  disabled={isGeneratingMkt}
                  className="w-full flex items-center justify-center gap-2 py-3 bg-[#00b86b] hover:bg-[#00a35e] text-white font-black rounded-xl text-xs shadow-lg transition-all transform hover:scale-[1.01] cursor-pointer"
                >
                  {isGeneratingMkt ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Analisando via Groq Llama3 & Imagem...</span>
                    </>
                  ) : (
                    <>
                      <Wand2 className="w-4 h-4 text-white" />
                      <span>Gerar Campanha com IA (Groq + Pollinations)</span>
                    </>
                  )}
                </button>
              </div>

              {/* Rendering response mockup / editor */}
              <div className="lg:col-span-7 space-y-6">
                {isGeneratingMkt && (
                  <div className="p-12 text-center bg-white dark:bg-[#111827] rounded-2xl border border-dashed border-slate-200 dark:border-slate-800 italic text-slate-500 animate-pulse flex flex-col items-center justify-center gap-3">
                    <Cpu className="w-8 h-8 text-[#00b86b] animate-spin" />
                    <div>
                      <p className="font-bold text-[#00b86b] text-xs">Acessando API Groq & renderizando layout...</p>
                      <p className="text-[10px] text-slate-500">Buscando imagens otimizadas pelo Pollinations AI...</p>
                    </div>
                  </div>
                )}

                {!isGeneratingMkt && !generatedCreative && (
                  <div className="p-16 text-center bg-white dark:bg-[#111827] rounded-3xl border border-slate-200 dark:border-slate-800 text-slate-400 flex flex-col items-center justify-center gap-3">
                    <Megaphone className="w-10 h-10 text-slate-300" />
                    <p className="font-bold text-xs">Escolha o segmento e o canal no painel de configuração e clique em gerar.</p>
                    <p className="text-[10px] text-slate-500 italic max-w-sm">Dica: Redução de médicos com formato Stories e tom Persuasivo gera as melhores conversões de anúncios.</p>
                  </div>
                )}

                {generatedCreative && (
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 animate-fade-in text-left">
                    {/* Copy area */}
                    <div className="md:col-span-7 bg-white dark:bg-[#111827] p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
                      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                        <div>
                          <span className="text-[9px] bg-[#00b86b]/15 text-[#00b86b] font-black uppercase px-2 py-0.5 rounded-full">
                            Copy de Alta Conversão
                          </span>
                          <h4 className="font-bold text-sm text-slate-800 dark:text-slate-100 mt-1">{generatedCreative.title}</h4>
                        </div>
                        <button 
                          onClick={() => {
                            navigator.clipboard.writeText(generatedCreative.body);
                            alert('Copy copiada para a área de transferência com sucesso!');
                          }}
                          className="p-2 bg-slate-50 dark:bg-slate-850 hover:bg-slate-100 dark:hover:bg-slate-900 border dark:border-slate-800 text-slate-500 rounded-lg cursor-pointer"
                          title="Copiar Texto"
                        >
                          <Copy className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="text-xs text-slate-500 leading-relaxed font-bold bg-slate-50 dark:bg-[#090e1a] p-4 rounded-xl border dark:border-slate-800 space-y-2">
                        <p className="text-slate-800 dark:text-slate-200 font-extrabold text-sm">{generatedCreative.subtitle}</p>
                        <p className="whitespace-pre-line text-slate-600 dark:text-slate-400 font-semibold">{generatedCreative.body}</p>
                      </div>

                      {/* Direct action social buttons */}
                      <div className="pt-2 flex flex-wrap gap-2">
                        <a 
                          href={`https://api.whatsapp.com/send?text=${encodeURIComponent(generatedCreative.title + "\n\n" + generatedCreative.body)}`}
                          target="_blank"
                          rel="noreferrer"
                          className="flex-1 min-w-[140px] flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-[11px] cursor-pointer border-none"
                        >
                          <MessageCircle className="w-4 h-4" />
                          <span>Postar no WhatsApp</span>
                        </a>

                        <button 
                          onClick={() => {
                            navigator.clipboard.writeText(generatedCreative.body);
                            alert('Instruções de stories copiado e pronto.');
                          }}
                          className="flex-1 min-w-[140px] flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-[11px] cursor-pointer border-none"
                        >
                          <Smartphone className="w-4 h-4" />
                          <span>Story do Instagram</span>
                        </button>
                      </div>
                    </div>

                    {/* Preview creative Mockup */}
                    <div className="md:col-span-5 flex flex-col justify-between">
                      <div className="bg-white dark:bg-[#111827] rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xl max-w-sm mx-auto flex flex-col">
                        {/* Feed post heading mockup */}
                        <div className="p-3 border-b dark:border-slate-800 flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-primary to-accent flex items-center justify-center text-white font-bold text-[9px]">
                            NC
                          </div>
                          <div className="text-left">
                            <div className="font-extrabold text-[10px] text-slate-700 dark:text-white leading-tight">nobelcontabilidade</div>
                            <div className="text-[8px] text-slate-400 leading-none">Anúncio Patrocinado</div>
                          </div>
                        </div>

                        {/* Pollinations generated Image layout */}
                        <div className="relative aspect-square bg-slate-900 overflow-hidden flex items-center justify-center">
                          <img 
                            src={generatedCreative.imageUrl} 
                            alt="Pollinations AI Creative illustration" 
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute bottom-2.5 right-2.5 bg-black/60 text-[8px] text-white/95 px-1.5 py-0.5 rounded backdrop-blur">
                            Imagem por Pollinations AI
                          </div>
                        </div>

                        {/* Interactive footer Mockup bar */}
                        <div className="p-3 bg-slate-50 dark:bg-slate-900 border-t dark:border-slate-800 space-y-1.5">
                          <div className="flex items-center justify-between text-xs font-bold text-[#00b86b]">
                            <span>nobelcontabilidade</span>
                            <span className="text-[10px] bg-[#00b86b]/15 px-2 py-0.5 rounded-md">Saiba Mais</span>
                          </div>
                          <p className="text-[9px] text-slate-500 font-bold truncate">{generatedCreative.title} {generatedCreative.subtitle}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* 6. NEW TAB: ERP CONTÁBIL */}
        {activeTab === 'erp' && (
          <div className="space-y-6 animate-fade-in text-left">
            <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 border-b border-sidebar-border dark:border-slate-800 pb-4">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 justify-between w-full">
                <div>
                  <h3 className="font-display font-black text-xl text-primary dark:text-[#00b86b]">ERP Contábil Integrado</h3>
                  <p className="text-xs text-slate-500 font-bold">Gestão financeira completa com acompanhamento em tempo real.</p>
                </div>
                
                <button 
                  onClick={() => setIsAcademyOpen(true)}
                  className="bg-gradient-to-r from-emerald-500 to-[#0C3E26] hover:from-[#0C3E26] hover:to-[#0a5c3a] text-white px-4 py-2.5 rounded-xl text-xs font-black flex items-center gap-2 shadow-sm border-none transition-all cursor-pointer hover:scale-[1.01] active:scale-95 shrink-0 self-start sm:self-auto"
                >
                  <Sparkles className="w-4.5 h-4.5 text-amber-300 animate-pulse" />
                  <span>🎓 Nobel AI Academy (Curso DRE & Break-Even)</span>
                </button>
              </div>

              {/* Sub tabs switches */}
              <div className="bg-slate-100 dark:bg-[#101726]/80 p-1 rounded-xl flex flex-wrap gap-1 self-start select-none">
                <button 
                  onClick={() => setErpSubTab('receitas')} 
                  className={`px-3 py-1.5 rounded-lg text-xs font-extrabold transition-all cursor-pointer ${erpSubTab === 'receitas' ? 'bg-[#00b86b] text-white shadow' : 'text-slate-400 hover:text-slate-650 dark:hover:text-slate-200'}`}
                >
                  💰 Receitas
                </button>
                <button 
                  onClick={() => setErpSubTab('despesas')} 
                  className={`px-3 py-1.5 rounded-lg text-xs font-extrabold transition-all cursor-pointer ${erpSubTab === 'despesas' ? 'bg-[#00b86b] text-white shadow' : 'text-slate-400'}`}
                >
                  💸 Despesas
                </button>
                <button 
                  onClick={() => setErpSubTab('fluxo-caixa')} 
                  className={`px-3 py-1.5 rounded-lg text-xs font-extrabold transition-all cursor-pointer ${erpSubTab === 'fluxo-caixa' ? 'bg-[#00b86b] text-white shadow' : 'text-slate-400'}`}
                >
                  📊 Fluxo de Caixa
                </button>
                <button 
                  onClick={() => setErpSubTab('dre')} 
                  className={`px-3 py-1.5 rounded-lg text-xs font-extrabold transition-all cursor-pointer ${erpSubTab === 'dre' ? 'bg-[#00b86b] text-white shadow' : 'text-slate-400'}`}
                >
                  📈 DRE Gerencial
                </button>
                <button 
                  onClick={() => setErpSubTab('ponto-equilibrio')} 
                  className={`px-3 py-1.5 rounded-lg text-xs font-extrabold transition-all cursor-pointer ${erpSubTab === 'ponto-equilibrio' ? 'bg-[#00b86b] text-white shadow' : 'text-slate-400'}`}
                >
                  ⚖️ Break-Even
                </button>
              </div>
            </div>

            {/* Embedded Sub-portal view */}
            <div className="bg-white dark:bg-[#0b1329]/30 rounded-2xl border border-slate-200/60 dark:border-slate-800 p-2 sm:p-6 shadow-sm min-h-[500px]">
              {erpSubTab === 'receitas' && <ReceitasPage />}
              {erpSubTab === 'despesas' && <DespesasPage />}
              {erpSubTab === 'fluxo-caixa' && <FluxoCaixaPage />}
              {erpSubTab === 'dre' && <DREPage />}
              {erpSubTab === 'ponto-equilibrio' && <PontoEquilibrioPage />}
            </div>
          </div>
        )}

        {/* 8. FISCAL & IMPOSTOS CALENDAR */}
        {activeTab === 'fiscal' && (
          <div className="space-y-8 animate-fade-in">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Calendar deadline component */}
              <div className="p-6 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700">
                <h3 className="font-display font-bold text-base text-primary mb-6">Calendário Tributário Nacional</h3>
                <div className="grid grid-cols-7 gap-2">
                  {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map(d => (
                    <div key={d} className="text-center font-bold text-[10px] text-slate-400 py-1">{d}</div>
                  ))}
                  {Array.from({ length: 30 }).map((_, i) => {
                    const day = i + 1;
                    const event = day === 10 ? 'danger' : day === 15 ? 'warning' : day === 20 ? 'success' : undefined;
                    return (
                      <div 
                        key={i} 
                        className={`aspect-square rounded-xl border flex flex-col items-center justify-center text-xs font-bold transition-all relative ${
                          day === 11 ? 'bg-primary text-white border-primary' : 'bg-slate-50 dark:bg-slate-900/60 border-slate-100 dark:border-slate-800'
                        }`}
                      >
                        <span>{day}</span>
                        {event && (
                          <span className={`absolute bottom-1 w-1.5 h-1.5 rounded-full ${event === 'danger' ? 'bg-rose-500' : event === 'warning' ? 'bg-amber-500' : 'bg-emerald-500'}`}></span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Obligations list */}
              <div className="p-6 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-4">
                <h3 className="font-display font-bold text-base text-primary">Próximos Vencimentos Tributários</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 rounded-xl border border-rose-500/20 bg-rose-500/5">
                    <AlertCircle className="w-5 h-5 text-rose-500" />
                    <div className="text-left flex-1">
                      <div className="font-bold text-xs">DAS - Simples Nacional</div>
                      <div className="text-[10px] text-slate-500">Vence em 2 dias • 5 clientes aguardando emissão</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 rounded-xl border border-amber-500/20 bg-amber-500/5">
                    <Clock className="w-5 h-5 text-amber-500" />
                    <div className="text-left flex-1">
                      <div className="font-bold text-xs">SPED Fiscal Bloco K</div>
                      <div className="text-[10px] text-slate-500">Vence em 5 dias • Envio obrigatório para indústrias</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 rounded-xl border border-emerald-500/20 bg-emerald-500/5">
                    <CheckCircle className="w-5 h-5 text-emerald-500" />
                    <div className="text-left flex-1">
                      <div className="font-bold text-xs">Transmissão eSocial Holerite</div>
                      <div className="text-[10px] text-slate-500">100% das guias foram concluídas e enviadas</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 9. TRABALHISTA */}
        {activeTab === 'trabalhista' && (
          <div className="space-y-8 animate-fade-in">
            <div className="p-6 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700">
              <h3 className="font-display font-bold text-base text-primary mb-6">Controle Geral de Funcionários por Cliente</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b text-slate-400 font-extrabold uppercase text-[10px]">
                      <th className="pb-3">Razão Social</th>
                      <th className="pb-3 text-center">FTEs</th>
                      <th className="pb-3">Provável Folha (R$)</th>
                      <th className="pb-3">Encargos Sociais</th>
                      <th className="pb-3">Transmissão eSocial</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y text-slate-600 dark:text-slate-300">
                    <tr className="hover:bg-slate-50 dark:hover:bg-slate-900/60"><td className="py-2.5 font-bold">Hospital Santa Maria</td><td className="text-center">142</td><td>R$ 485.000,00</td><td>R$ 168.000,00</td><td><span className="text-emerald-500 font-bold flex items-center gap-1"><CheckCircle className="w-4.5 h-4.5" /> Transmitido</span></td></tr>
                    <tr className="hover:bg-slate-50 dark:hover:bg-slate-900/60"><td className="py-2.5 font-bold">Construtora Horizonte</td><td className="text-center">89</td><td>R$ 312.000,00</td><td>R$ 108.000,00</td><td><span className="text-emerald-500 font-bold flex items-center gap-1"><CheckCircle className="w-4.5 h-4.5" /> Transmitido</span></td></tr>
                    <tr className="hover:bg-slate-50 dark:hover:bg-slate-900/60"><td className="py-2.5 font-bold">Restaurante Sabor & Arte</td><td className="text-center">34</td><td>R$ 78.000,00</td><td>R$ 27.000,00</td><td><span className="text-amber-500 font-bold flex items-center gap-1"><Clock className="w-4.5 h-4.5" /> Pendente</span></td></tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* 10. PORTAL INTERNO DO CLIENTE */}
        {activeTab === 'portal' && (
          <div className="space-y-8 animate-fade-in text-left">
            {/* Top Info Bar */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
              <div>
                <h3 className="font-display font-black text-xl text-primary dark:text-[#00b86b]">Portal do Cliente & Repositório</h3>
                <p className="text-xs text-slate-500 font-bold">Gerencie guias de contribuintes ou consulte arquivos com nosso integrador integrado de pastas do Google Drive.</p>
              </div>
            </div>

            {/* Split UI Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Local files + virtual assistant */}
              <div className="lg:col-span-6 space-y-6">
                {/* Local documents file list */}
                <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="font-display font-bold text-base text-primary dark:text-[#00b86b]">Guias de Impostos Locais</h3>
                    <span className="text-[10px] bg-slate-100 dark:bg-slate-700 border text-slate-600 dark:text-slate-200 px-2 py-1 rounded-md font-black uppercase">Ficheiros Locais</span>
                  </div>
                  <div className="space-y-3">
                    {documents.map((doc, idx) => (
                      <div key={idx} className="flex p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 items-center justify-between font-bold">
                        <div className="flex items-center gap-3">
                          <FileText className="w-5 h-5 text-accent" />
                          <div className="text-left">
                            <div className="text-xs font-black text-slate-800 dark:text-white capitalize">{doc.nome}</div>
                            <span className="text-[10px] text-slate-400 capitalize font-bold leading-normal">{doc.ext} • {doc.tamanho} • {doc.data}</span>
                          </div>
                        </div>
                        <button 
                          onClick={() => alert(`Baixando o documento '${doc.nome}' da base Nobel.`)}
                          className="p-2 text-slate-500 hover:text-[#00b86b] bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg cursor-pointer border dark:border-slate-700 shadow-sm transition-all animate-none"
                        >
                          <Download className="w-4.5 h-4.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Virtual Assistant */}
                <div className="p-6 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 font-bold flex flex-col justify-between">
                  <h3 className="font-display font-bold text-base text-primary dark:text-white mb-4">Assessor Virtual Contábil</h3>
                  <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-4 text-xs h-36 overflow-y-auto mb-4 border border-slate-100 dark:border-slate-800 font-bold leading-relaxed text-slate-600 dark:text-slate-300">
                    <p>
                      "Seja bem-vindo de volta! Seus impostos federais da cota mensal (DAS/DCTF) vencem no dia 20/06. Clique na aba lateral ou utilize o painel ao lado de integração de Módulos do Google Drive para importar de forma 100% direta backups do backup geral de contingência do ERP."
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      placeholder="Qual sua dúvida sobre os impostos?" 
                      className="flex-1 bg-slate-100 dark:bg-slate-900 border dark:border-slate-700 px-3.5 py-2 rounded-xl text-xs text-slate-800 dark:text-slate-200 focus:outline-none" 
                    />
                    <button 
                      onClick={() => alert("O assistente virtual sob a inteligência artificial do e-CAC iniciou análise em background.")}
                      className="px-4 py-2.5 bg-[#00b86b] text-white font-black rounded-xl text-xs cursor-pointer hover:bg-[#009e5a] transition-all"
                    >
                      Enviar
                    </button>
                  </div>
                </div>
              </div>

              {/* Right Column: Google Drive Integrated files! */}
              <div className="lg:col-span-6 bg-white dark:bg-slate-800 p-6 rounded-3xl border border-[#00b86b]/40 shadow-lg space-y-6">
                <div className="flex justify-between items-center pb-3 border-b border-slate-200 dark:border-slate-700">
                  <div>
                    <h3 className="font-display font-extrabold text-base text-primary dark:text-[#00b86b] flex items-center gap-2">
                      ☁️ Google Drive Corporativo
                    </h3>
                    <p className="text-[10px] text-slate-400 mt-0.5 leading-normal font-bold">Repositório ativo compartilhado de desenvolvimento contábil.</p>
                  </div>
                  <span className="text-[10px] bg-emerald-500/15 text-emerald-500 border border-emerald-500/30 px-3 py-1 rounded-full font-black animate-custom-pulse">
                    ● CONECTADO & SINC
                  </span>
                </div>

                {/* Drive metadata display */}
                <div className="p-4 bg-slate-50 dark:bg-slate-900/60 rounded-2xl border dark:border-slate-800 space-y-2 font-mono text-[10px] text-left text-slate-500 dark:text-slate-400 leading-normal">
                  <div><span className="font-bold text-slate-700 dark:text-slate-200">ID da Pasta:</span> app20260531171911nvxhvrmjjz</div>
                  <div className="truncate"><span className="font-bold text-slate-700 dark:text-slate-200">URL Compartilhado:</span> <a href={googleDriveLink} target="_blank" rel="noopener noreferrer" className="text-[#00b86b] hover:underline break-all">{googleDriveLink}</a></div>
                  <div><span className="font-bold text-slate-700 dark:text-slate-200">Tipo de Ingress:</span> Google Drive Folder Storage API (V3 Client-side Proxy)</div>
                </div>

                {/* Drive files interactive listing */}
                <div className="space-y-3">
                  <div className="text-xs font-black uppercase text-slate-400 tracking-wider">Documentos Encontrados no Drive:</div>
                  
                  <div className="space-y-2.5 font-bold">
                    {/* Item 1 */}
                    <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border dark:border-slate-800 flex items-center justify-between hover:bg-slate-100/50 dark:hover:bg-slate-700/50 transition-all font-bold">
                      <div className="flex items-center gap-3 truncate">
                        <span className="text-amber-500 text-lg">📁</span>
                        <div className="text-left truncate">
                          <div className="text-xs text-slate-800 dark:text-slate-100 truncate">src/</div>
                          <div className="text-[9px] text-slate-400">Pasta do Código de Automação & Robótica Contábil</div>
                        </div>
                      </div>
                      <span className="text-[9px] bg-sky-500/10 text-sky-500 px-2 py-0.5 rounded-full font-black">Módulos</span>
                    </div>

                    {/* Item 2 */}
                    <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border dark:border-slate-800 flex items-center justify-between hover:bg-slate-100/50 dark:hover:bg-slate-700/50 transition-all font-bold">
                      <div className="flex items-center gap-3 truncate">
                        <span className="text-amber-500 text-lg">📁</span>
                        <div className="text-left truncate">
                          <div className="text-xs text-slate-800 dark:text-slate-100 truncate font-bold">config/</div>
                          <div className="text-[9px] text-slate-400">Lotes do e-CNPJ e chaves integradoras ERP Alterdata</div>
                        </div>
                      </div>
                      <span className="text-[9px] bg-amber-500/10 text-amber-500 px-2 py-0.5 rounded-full font-black">Parâmetros</span>
                    </div>

                    {/* Item 3 */}
                    <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border dark:border-slate-800 flex items-center justify-between hover:bg-slate-100/50 dark:hover:bg-slate-700/50 transition-all font-bold font-bold">
                      <div className="flex items-center gap-3 truncate">
                        <span className="text-rose-500 text-lg">📄</span>
                        <div className="text-left truncate">
                          <div className="text-xs text-slate-800 dark:text-slate-100 truncate font-bold">app20260531171911nvxhvrmjjz.zip</div>
                          <div className="text-[9px] text-slate-400 font-bold">22.8 MB • Zip Geral de Backup do Workspace</div>
                        </div>
                      </div>
                      <span className="text-[9px] bg-purple-500/10 text-purple-500 px-2 py-0.5 rounded-full font-black">Backup Completo</span>
                    </div>

                    {/* Item 4 */}
                    <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border dark:border-slate-800 flex items-center justify-between hover:bg-slate-100/50 dark:hover:bg-slate-700/50 transition-all font-bold">
                      <div className="flex items-center gap-3 truncate">
                        <span className="text-emerald-500 text-lg">📊</span>
                        <div className="text-left truncate">
                          <div className="text-xs text-slate-800 dark:text-slate-100 truncate font-bold">crm_leads_prospeccao_nobel.xlsx</div>
                          <div className="text-[9px] text-slate-400 font-bold">4.5 MB • Planilha com metas, margens e taxas</div>
                        </div>
                      </div>
                      <span className="text-[9px] bg-emerald-500/10 text-emerald-500 px-2 py-0.5 rounded-full font-black">Planilha DRE</span>
                    </div>

                    {/* Item 5 */}
                    <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border dark:border-slate-800 flex items-center justify-between hover:bg-slate-100/50 dark:hover:bg-slate-700/50 transition-all font-bold">
                      <div className="flex items-center gap-3 truncate">
                        <span className="text-blue-500 text-lg">📄</span>
                        <div className="text-left truncate font-bold">
                          <div className="text-xs text-slate-800 dark:text-slate-100 truncate font-bold">diagnostico_tributario_2026.pdf</div>
                          <div className="text-[9px] text-slate-400 font-bold">1.8 MB • Planejamento legal sob reforma fiscal</div>
                        </div>
                      </div>
                      <span className="text-[9px] bg-blue-500/10 text-blue-500 px-2 py-0.5 rounded-full font-black">Estudo</span>
                    </div>
                  </div>
                </div>

                {/* Direct Action triggers */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-4 border-t dark:border-slate-700">
                  <button 
                    onClick={() => {
                      window.open(googleDriveLink, '_blank');
                    }}
                    className="w-full bg-[#00b86b] hover:bg-[#009e5a] text-white py-3 rounded-xl font-black text-xs shadow flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    Abrir no Google Drive ↗
                  </button>

                  <button 
                    onClick={handleGoogleDriveSync}
                    disabled={isSyncingDrive}
                    className="w-full bg-slate-105 dark:bg-slate-700 text-slate-800 dark:text-slate-100 hover:bg-slate-200 dark:hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed py-3 rounded-xl font-black text-xs border border-slate-300 dark:border-slate-600 flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    {isSyncingDrive ? (
                      <>
                        <div className="w-3.5 h-3.5 border-2 border-slate-800 dark:border-white border-t-white rounded-full animate-spin"></div>
                        <span>Baixando & Escaneando...</span>
                      </>
                    ) : (
                      <>Sincronizar Códigos do Drive 🔄</>
                    )}
                  </button>
                </div>

                {/* Feedback success message */}
                {driveSynced && (
                  <div className="text-xs bg-emerald-500/10 hover:bg-emerald-500/15 border border-emerald-500/30 text-[#00b86b] p-3.5 rounded-2xl font-black text-center animate-custom-pulse leading-relaxed">
                    🌟 Sincronismo completado com sucesso! Os dados fiscais foram totalmente processados e dois novos clientes ("Indústria Metalúrgica Sul" e "Franquia Sorvete Gelato") foram criados em tempo real na base de dados!
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* 11. INFORMATIVOS NOTICIAS */}
        {activeTab === 'informativos' && (
          <div className="space-y-8 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200">
                <span className="text-[10px] bg-primary/10 text-primary px-2.5 py-1 rounded-full font-black">Tributário 2026</span>
                <h4 className="font-display font-bold text-base text-primary mt-3 mb-2">Reforma Tributária: Como sua empresa deve se enquadrar diante do IBS e CBS</h4>
                <p className="text-xs text-slate-500 leading-relaxed">No ano de 2026 começa oficialmente a transição de alíquotas federais. Reestruturamos todas as DREs sob as diretrizes vigentes.</p>
              </div>

              <div className="p-6 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200">
                <span className="text-[10px] bg-accent/25 text-primary px-2.5 py-1 rounded-full font-black">Fiscal 2026</span>
                <h4 className="font-display font-bold text-base text-primary mt-3 mb-2">Novas multas do eSocial S-1.3 em vigor</h4>
                <p className="text-xs text-slate-500 leading-relaxed">Atrasos de envio agora somam custos automáticos para o contribuinte. Mantenham todos os registros admissionais sob nosso BPO.</p>
              </div>
            </div>
          </div>
        )}

        {/* 12. DOCUMENT GESTION & UPLOAD ZONE */}
        {activeTab === 'documentos' && (
          <div className="space-y-8 animate-fade-in">
            {/* Real Interactive Drag & Drop Area */}
            <div className="relative p-10 border-2 border-dashed border-accent bg-accent/5 rounded-3xl text-center shadow-inner">
              <input 
                type="file" 
                id="platform-file-upload-input" 
                onChange={handleSimulateUpload} 
                className="absolute inset-0 opacity-0 cursor-pointer w-full h-full" 
              />
              <Upload className="w-12 h-12 text-primary mx-auto mb-4" />
              <div className="font-display font-bold text-base text-primary mb-1">Selecione ou Arraste Comprovantes</div>
              <p className="text-xs text-slate-400">PDF, XML, XLS, DOCX (A IA Nobel analisará e indexará as pastas automaticamente)</p>

              {uploadProgress !== null && (
                <div className="mt-4 max-w-xs mx-auto space-y-1.5">
                  <div className="text-xs font-bold text-primary">Enviando Documento: {uploadProgress}%</div>
                  <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div className="h-full bg-primary" style={{ width: `${uploadProgress}%` }}></div>
                  </div>
                </div>
              )}
            </div>

            {/* List document layout */}
            <div className="p-6 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700">
              <h3 className="font-display font-bold text-base text-primary mb-6">Documentos Enviados Recentemente</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                {documents.map((doc, idx) => (
                  <div key={idx} className="p-4 rounded-xl border bg-slate-50 dark:bg-slate-900 border-slate-100 flex flex-col justify-between hover:border-accent hover:scale-[1.02] transition-all">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-3">
                      <Code className="w-4 h-4" />
                    </div>
                    <div className="text-left mb-4">
                      <div className="font-bold text-xs truncate max-w-full">{doc.nome}</div>
                      <div className="text-[9px] text-slate-400 capitalize">{doc.ext} • {doc.tamanho} • {doc.data}</div>
                    </div>
                    <span className="text-[10px] px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-500 font-extrabold text-center">
                      {doc.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 13. REAL CLIENTES TAB (GESTÃO DE CLIENTES) */}
        {activeTab === 'clientes' && (
          <div className="space-y-8 animate-fade-in text-left">
            {/* Stats Overview Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 font-bold">
              <div className="bg-white dark:bg-[#111827] p-5 rounded-2xl border border-slate-200 dark:border-slate-800">
                <div className="text-[10px] text-slate-400 uppercase font-black tracking-wider">Total de Contribuintes</div>
                <div className="text-3xl font-black text-slate-850 dark:text-white mt-1">{clientesList.length}</div>
                <p className="text-[10px] text-slate-500 mt-1 font-semibold">Empresas ativas cadastradas</p>
              </div>

              <div className="bg-white dark:bg-[#111827] p-5 rounded-2xl border border-slate-200 dark:border-slate-800">
                <div className="text-[10px] text-slate-400 uppercase font-black tracking-wider">Simples Nacional</div>
                <div className="text-3xl font-black text-[#00b86b] mt-1">{clientesList.filter(c => c.regime === 'Simples Nacional').length}</div>
                <p className="text-[10px] text-slate-500 mt-1 font-semibold">Tributação simplificada (Fator R)</p>
              </div>

              <div className="bg-white dark:bg-[#111827] p-5 rounded-2xl border border-slate-200 dark:border-slate-800">
                <div className="text-[10px] text-slate-400 uppercase font-black tracking-wider">Honorários Recorrentes</div>
                <div className="text-3xl font-black text-slate-850 dark:text-white mt-1">
                  R$ {clientesList.reduce((acc, c) => acc + Number(c.honorario), 0).toLocaleString('pt-BR')}
                </div>
                <p className="text-[10px] text-slate-500 mt-1 font-semibold">Faturamento de mensalidades contábeis</p>
              </div>

              <div className="bg-white dark:bg-[#111827] p-5 rounded-2xl border border-slate-200 dark:border-slate-800">
                <div className="text-[10px] text-slate-400 uppercase font-black tracking-wider">Sincronismo Alterdata</div>
                <div className="text-3xl font-black text-[#00b86b] mt-1">
                  {clientesList.filter(c => c.synchronized).length}/{clientesList.length}
                </div>
                <p className="text-[10px] text-slate-500 mt-1 font-semibold">Bando de dados em tempo real</p>
              </div>
            </div>

            {/* Sync bar actions */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-[#00b86b]/10 border border-[#00b86b]/20 p-4 rounded-2xl font-bold">
              <div className="text-left">
                <div className="text-xs text-primary dark:text-[#00b86b] font-black uppercase tracking-wider">Banco de Dados Integrado à Retaguarda</div>
                <p className="text-[11px] text-slate-500 mt-0.5">Sincronize as obrigações acessórias diretas do Alterdata com as contas dos seus clientes.</p>
              </div>
              <button 
                onClick={handleAlterdataSync}
                disabled={isSyncingAlterdata}
                className="bg-[#00b86b] text-white hover:bg-[#009e5a] px-5 py-2.5 rounded-xl text-xs font-black shadow flex items-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed justify-center transition-all"
              >
                {isSyncingAlterdata ? (
                  <>
                    <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Sincronizando Banco...</span>
                  </>
                ) : (
                  <>
                    <span>🔄 Sincronizar com Alterdata ERP</span>
                  </>
                )}
              </button>
            </div>

            {/* Split layout: Database list & Create client */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start font-bold">
              {/* Clients database list table */}
              <div className="lg:col-span-8 bg-white dark:bg-[#111827] rounded-2xl border border-slate-200 dark:border-slate-800 overflow-x-auto">
                <div className="p-4 border-b dark:border-slate-850 flex items-center justify-between">
                  <h3 className="font-display font-extrabold text-sm text-slate-800 dark:text-slate-100 uppercase tracking-wide">Contribuintes Ativos</h3>
                  <span className="text-[10px] bg-slate-100 dark:bg-slate-850 px-2 py-1 rounded-md text-slate-500 uppercase tracking-wider font-extrabold">Retaguarda Nobel v1.0</span>
                </div>

                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 text-[9px] uppercase font-black tracking-wider">
                      <th className="p-4">Razão Social / CNPJ</th>
                      <th className="p-4">Regime Fiscal</th>
                      <th className="p-4 text-right">Mensalidade</th>
                      <th className="p-4 text-center">Sync</th>
                      <th className="p-4 text-center">Situação</th>
                      <th className="p-4 text-center">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-xs font-bold text-slate-705 dark:text-slate-300">
                    {clientesList.map(cli => (
                      <tr key={cli.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/40">
                        <td className="p-4 text-left">
                          <div className="font-extrabold text-slate-850 dark:text-white truncate max-w-[140px] md:max-w-xs">{cli.nome}</div>
                          <div className="text-[9px] text-slate-400 font-mono mt-0.5">{cli.cnpj}</div>
                        </td>
                        <td className="p-4">{cli.regime}</td>
                        <td className="p-4 text-right">R$ {Number(cli.honorario).toLocaleString('pt-BR')},00</td>
                        <td className="p-4 text-center">
                          {cli.synchronized ? (
                            <span className="text-[9px] bg-emerald-500/10 text-emerald-500 px-2 py-0.5 rounded-full font-black uppercase">Pronto</span>
                          ) : (
                            <span className="text-[9px] bg-amber-500/10 text-amber-500 px-2 py-0.5 rounded-full font-black uppercase">Pendente</span>
                          )}
                        </td>
                        <td className="p-4 text-center">
                          <span className="text-[9px] bg-[#00b86b]/10 text-[#00b86b] px-2 py-0.5 rounded-full font-black uppercase">Ativo</span>
                        </td>
                        <td className="p-4 text-center">
                          <button 
                            onClick={() => {
                              setClientesList(prev => prev.filter(item => item.id !== cli.id));
                              alert(`Cliente '${cli.nome}' removido com sucesso.`);
                            }}
                            className="bg-rose-500/10 text-rose-500 px-2.5 py-1.5 rounded-xl font-black text-[10px] hover:bg-rose-500 hover:text-white transition-all cursor-pointer"
                          >
                            Excluir ✖
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Create contributor card */}
              <div className="lg:col-span-4 bg-white dark:bg-[#111827] p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
                <h3 className="font-display font-extrabold text-sm text-slate-850 dark:text-white mb-4 uppercase tracking-wider border-b dark:border-slate-800 pb-3 flex items-center gap-1.5">
                  📁 Adicionar Novo Cliente
                </h3>

                <form onSubmit={handleAddClient} className="space-y-4 font-bold text-xs text-left">
                  <div>
                    <label className="block text-slate-500 dark:text-slate-400 mb-1.5">Razão Social / Nome Fantasia:</label>
                    <input 
                      type="text"
                      placeholder="Empresa Exemplo Ltda..."
                      value={newCliName}
                      onChange={(e) => setNewCliName(e.target.value)}
                      required
                      className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-[#00b86b] text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-500 dark:text-slate-400 mb-1.5">CNPJ do Contribuinte:</label>
                    <input 
                      type="text"
                      placeholder="12.345.678/0001-90"
                      value={newCliCnpj}
                      onChange={(e) => setNewCliCnpj(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-[#00b86b] text-xs font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-500 dark:text-slate-400 mb-1.5">Enquadramento / Regime Fiscal:</label>
                    <select 
                      value={newCliRegime}
                      onChange={(e) => setNewCliRegime(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-[#00b86b]"
                    >
                      <option value="Simples Nacional">Simples Nacional (Fator R)</option>
                      <option value="Lucro Presumido">Lucro Presumido</option>
                      <option value="Lucro Real">Lucro Real</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-500 dark:text-slate-400 mb-1.5">Honorário Mensal (R$):</label>
                    <input 
                      type="number"
                      placeholder="1500"
                      value={newCliHonorario}
                      onChange={(e) => setNewCliHonorario(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-[#00b86b] text-xs"
                    />
                  </div>

                  <button 
                    type="submit"
                    className="w-full bg-[#00b86b] hover:bg-[#009e5a] text-white py-3 rounded-xl font-black text-xs shadow cursor-pointer transition-all uppercase tracking-wide mt-4"
                  >
                    Cadastrar Força da Retaguarda ✓
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* 14. REAL CONFIGURAÇÕES TAB */}
        {activeTab === 'configuracoes' && (
          <div className="space-y-8 animate-fade-in text-left font-bold">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
              <div>
                <h3 className="font-display font-black text-xl text-primary dark:text-[#00b86b]">Configurações da Retaguarda</h3>
                <p className="text-xs text-slate-500 font-bold">Gerencie credenciais criptografadas de APIs, certificados e políticas operacionais.</p>
              </div>

              {/* Sub-tabs settings selectors */}
              <div className="bg-slate-100 dark:bg-[#101726] p-1 rounded-xl flex gap-1 self-start">
                <button 
                  onClick={() => setConfigActiveTab('integracoes')} 
                  className={`px-3 py-1.5 rounded-lg text-xs font-extrabold transition-all cursor-pointer ${configActiveTab === 'integracoes' ? 'bg-[#00b86b] text-white shadow' : 'text-slate-400'}`}
                >
                  🔌 Integrações API
                </button>
                <button 
                  onClick={() => setConfigActiveTab('certificado')} 
                  className={`px-3 py-1.5 rounded-lg text-xs font-extrabold transition-all cursor-pointer ${configActiveTab === 'certificado' ? 'bg-[#00b86b] text-white shadow' : 'text-slate-400'}`}
                >
                  🔑 Certificado Digital
                </button>
                <button 
                  onClick={() => setConfigActiveTab('dados')} 
                  className={`px-3 py-1.5 rounded-lg text-xs font-extrabold transition-all cursor-pointer ${configActiveTab === 'dados' ? 'bg-[#00b86b] text-white shadow' : 'text-slate-400'}`}
                >
                  🏢 Dados Corporativos
                </button>
                <button 
                  onClick={() => setConfigActiveTab('backup')} 
                  className={`px-3 py-1.5 rounded-lg text-xs font-extrabold transition-all cursor-pointer ${configActiveTab === 'backup' ? 'bg-[#00b86b] text-white shadow' : 'text-slate-400'}`}
                >
                  💾 Backups & SLA
                </button>
              </div>
            </div>

            <form onSubmit={handleSaveConfig} className="bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 rounded-3xl p-6 lg:p-8 space-y-6">
              
              {/* Form Sub-tab 1: Integracoes */}
              {configActiveTab === 'integracoes' && (
                <div className="space-y-6">
                  <div>
                    <h4 className="text-sm font-extrabold text-slate-800 dark:text-white uppercase tracking-wider mb-2">Sincronização de APIs Ativas</h4>
                    <p className="text-[11px] text-slate-400 font-semibold mb-4">Esses tokens criptografam e garantem as conexões entre a Nobel e parceiros externos.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs leading-relaxed text-left">
                    <div>
                      <label className="block text-slate-500 dark:text-slate-400 mb-1.5">Alterdata ERP Cloud - Api Token:</label>
                      <input 
                        type="password"
                        value={apiAlterdata}
                        onChange={(e) => setApiAlterdata(e.target.value)}
                        className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-[#00b86b] tracking-widest text-[#00b86b] font-mono"
                      />
                      <span className="text-[9px] text-slate-400 font-medium">Token seguro para obter faturamentos e DAS. Sincronizado.</span>
                    </div>

                    <div>
                      <label className="block text-slate-500 dark:text-slate-400 mb-1.5">Groq Cloud AI Engine API Key:</label>
                      <input 
                        type="password"
                        value={apiGroq}
                        onChange={(e) => setApiGroq(e.target.value)}
                        className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-[#00b86b] tracking-widest text-[#00b86b] font-mono"
                      />
                      <span className="text-[9px] text-slate-400 font-medium">Usado de apoio para a geração instantânea do marketing.</span>
                    </div>

                    <div>
                      <label className="block text-slate-500 dark:text-slate-400 mb-1.5">Nobelbot WhatsApp Webhook Endpoint:</label>
                      <input 
                        type="text"
                        value={apiWhatsApp}
                        onChange={(e) => setApiWhatsApp(e.target.value)}
                        className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-[#00b86b] text-xs font-mono"
                      />
                      <span className="text-[9px] text-slate-400 font-medium">URL responsável por interceptar conversas e responder aos leads.</span>
                    </div>

                    <div>
                      <label className="block text-slate-500 dark:text-slate-400 mb-1.5">Render Image Engine (Pollinations):</label>
                      <input 
                        type="text"
                        value={apiPollinations}
                        onChange={(e) => setApiPollinations(e.target.value)}
                        className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-[#00b86b] text-xs font-mono"
                      />
                      <span className="text-[9px] text-slate-400 font-medium">Renderizador usado para as mocks e publicações geradas por IA.</span>
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-slate-500 dark:text-slate-400 mb-1.5 font-bold text-primary dark:text-[#00b86b]">📁 Link do Repositório do Google Drive de Trabalho:</label>
                      <input 
                        type="text"
                        value={googleDriveLink}
                        onChange={(e) => setGoogleDriveLink(e.target.value)}
                        className="w-full bg-slate-50 dark:bg-slate-900 border border-[#00b86b]/40 dark:border-slate-800 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-[#00b86b] text-xs font-mono text-[#00b86b] font-extrabold"
                        placeholder="https://drive.google.com/drive/folders/..."
                      />
                      <span className="text-[9px] text-[#00b86b] font-extrabold">Link ativo do cooperado do Google Drive compartilhado com os códigos de retaguarda, planos e arquivos do workspace.</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Form Sub-tab 2: Certificado Digital */}
              {configActiveTab === 'certificado' && (
                <div className="space-y-6 text-left">
                  <div>
                    <h4 className="text-sm font-extrabold text-slate-800 dark:text-white uppercase tracking-wider mb-2">Transmissão Governamental eCert / e-CNPJ</h4>
                    <p className="text-[11px] text-slate-400 font-semibold mb-4">Faça upload ou informe os parâmetros das credenciais A1 eletrônicas para envio automático de DAS / DCTF.</p>
                  </div>

                  <div className="space-y-4 max-w-lg text-xs font-bold leading-normal">
                    <div>
                      <label className="block text-slate-500 dark:text-slate-400 mb-1.5">CNPJ Proprietário do Outorgado:</label>
                      <input 
                        type="text"
                        value={ecacCnpj}
                        onChange={(e) => setEcacCnpj(e.target.value)}
                        className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-[#00b86b] font-mono"
                      />
                    </div>

                    <div className="p-5 border-2 border-dashed border-[#00b86b]/40 bg-[#00b86b]/5 rounded-2xl text-center space-y-2">
                      <Lock className="w-8 h-8 text-[#00b86b] mx-auto" />
                      <div className="text-xs text-primary dark:text-[#00b86b] font-extrabold">Certificado Atual: {ecacCertFile || 'Nenhum certificado carregado'}</div>
                      <p className="text-[10px] text-slate-400 leading-normal font-semibold">Categoria A1 (Criptografia de ponta 2048 bits). O e-CNPJ permite assinar obrigações governamentais de forma automática.</p>
                      
                      <button 
                        type="button"
                        onClick={() => {
                          setEcacCertFile("novo_certificado_empresa_A1.pfx");
                          alert("Certificado digital renovado com sucesso!");
                        }}
                        className="mt-2 bg-slate-100 dark:bg-slate-800 border hover:bg-slate-200 dark:hover:bg-slate-700 px-4 py-2 rounded-xl text-[11px] font-black cursor-pointer transition-all inline-block"
                      >
                        Substituir Arquivo (.pfx, .p12)
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Form Sub-tab 3: Dados Corporativos */}
              {configActiveTab === 'dados' && (
                <div className="space-y-6 text-left">
                  <div>
                    <h4 className="text-sm font-extrabold text-slate-800 dark:text-white uppercase tracking-wider mb-2">Identidade do Workspace Nobel</h4>
                    <p className="text-[11px] text-slate-400 font-semibold mb-4">Gerencie as propriedades estruturais que serão mostradas na landing page e relatórios emitidos para clientes.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs leading-relaxed font-bold">
                    <div>
                      <label className="block text-slate-500 dark:text-slate-400 mb-1.5">Razão Social Principal:</label>
                      <input 
                        type="text" 
                        value={razaoSocial} 
                        onChange={(e) => setRazaoSocial(e.target.value)}
                        className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-[#00b86b] text-xs font-bold"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-500 dark:text-slate-400 mb-1.5">Nome de Marca Oficial:</label>
                      <input 
                        type="text" 
                        value={nomeMarca} 
                        onChange={(e) => setNomeMarca(e.target.value)}
                        className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-[#00b86b] text-xs font-bold"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-500 dark:text-slate-400 mb-1.5">Telefone de Atendimento / WhatsApp:</label>
                      <input 
                        type="text" 
                        value={telefoneAtendimento} 
                        onChange={(e) => setTelefoneAtendimento(e.target.value)}
                        className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-[#00b86b] text-xs font-bold"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-500 dark:text-slate-400 mb-1.5">E-mail Corporativo do e-CAC:</label>
                      <input 
                        type="text" 
                        value={emailCorporativo} 
                        onChange={(e) => setEmailCorporativo(e.target.value)}
                        className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-[#00b86b] text-xs font-bold"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Form Sub-tab 4: Backup */}
              {configActiveTab === 'backup' && (
                <div className="space-y-6 text-left">
                  <div>
                    <h4 className="text-sm font-extrabold text-slate-800 dark:text-white uppercase tracking-wider mb-2">Snapshots e Retenção Histórica Contábil</h4>
                    <p className="text-[11px] text-slate-400 font-semibold mb-4">Todos os XMLs, Recibos do eSocial e Notas são espelhados diariamente em nuvem fria (Cold Storage S3).</p>
                  </div>

                  <div className="p-4 bg-slate-50 dark:bg-[#0c1221] border border-slate-100 dark:border-slate-850 rounded-2xl space-y-3 font-semibold text-xs leading-relaxed text-slate-700 dark:text-slate-350">
                    <div className="flex justify-between font-bold">
                      <span>Status da Cópia de Segurança:</span>
                      <span className="text-[#00b86b] font-black">● OPERACIONAL & COMPLETADO</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Último Snapshot Salvo:</span>
                      <span className="font-mono text-[10px]">Hoje, 04:12 da manhã (UTC)</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Período de Retenção Fiscal Legal:</span>
                      <span className="font-bold">5 Anos (Lei das Sociedades Anônimas)</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tamanho do Repositório Nobel:</span>
                      <span>142.8 GB (Compactação de Arquivos Web)</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Save section panel */}
              <div className="flex items-center justify-between border-t border-slate-200 dark:border-slate-800 pt-6 mt-6">
                <div>
                  {configSuccess && (
                    <span className="text-xs bg-emerald-500/15 text-emerald-500 px-3.5 py-2 rounded-xl border border-emerald-500/30 flex items-center gap-1.5 animate-custom-pulse">
                      ✓ Parâmetros gravados e aplicados na retaguarda com sucesso!
                    </span>
                  )}
                </div>

                <button 
                  type="submit" 
                  disabled={isSavingConfig}
                  className="bg-[#00b86b] hover:bg-[#009e5a] text-white disabled:opacity-50 disabled:cursor-not-allowed px-6 py-3 rounded-xl text-xs font-black shadow cursor-pointer transition-all flex items-center gap-2 uppercase tracking-wider"
                >
                  {isSavingConfig ? (
                    <>
                      <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Salvando Retaguarda...</span>
                    </>
                  ) : (
                    <span>Salvar Configurações da Retaguarda ✓</span>
                  )}
                </button>
              </div>

            </form>
          </div>
        )}

        {/* 15. AGENDA PAGE TAB */}
        {activeTab === 'agenda' && (
          <AgendaPage 
            clientesList={clientesList}
            tasks={tasks}
            setTasks={setTasks}
            obligations={obligations}
            setObligations={setObligations}
            setActiveTab={setActiveTab}
            setHelpTab={setHelpTab}
            setIsHelpOpen={setIsHelpOpen}
            renderHelpButton={renderHelpButton}
          />
        )}

      </main>

      {/* MANUAL/TUTORIAL CONTÁBIL MODAL */}
      <AnimatePresence>
        {isHelpOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white dark:bg-[#1a2436] rounded-2xl shadow-2xl p-6 md:p-8 max-w-3xl w-full max-h-[85vh] overflow-y-auto border border-slate-200 dark:border-slate-800 flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#0c3e26] text-white flex items-center justify-center font-black text-lg">
                    ?
                  </div>
                  <div>
                    <h2 className="font-display font-black text-lg text-[#0c3e26] dark:text-[#00b86b]">
                      Guia de Apoio ao Iniciante Contábil
                    </h2>
                    <p className="text-[11px] text-slate-450 dark:text-slate-400 font-bold uppercase tracking-wider">
                      Descomplicando a contabilidade de forma prática
                    </p>
                  </div>
                </div>
                <button 
                  onClick={() => setIsHelpOpen(false)} 
                  className="p-1 px-3 bg-slate-100 dark:bg-slate-800 hover:bg-rose-500/10 hover:text-rose-500 rounded-lg text-slate-500 font-bold transition-all border-none cursor-pointer text-xs"
                >
                  Fechar ✕
                </button>
              </div>

              {/* Selector Tabs Inside Modal */}
              <div className="flex items-center gap-1 overflow-x-auto pb-2 border-b border-slate-100 dark:border-slate-800 mb-6 scrollbar-thin">
                {Object.keys(ACCOUNTING_HELP_TUTORIAL).map((tabKey) => {
                  const isActive = helpTab === tabKey;
                  return (
                    <button
                      key={tabKey}
                      onClick={() => setHelpTab(tabKey)}
                      className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider whitespace-nowrap transition-all border-none cursor-pointer ${
                        isActive 
                          ? 'bg-gradient-to-r from-[#D4AF37] to-[#0c3e26] text-white shadow' 
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:opacity-80'
                      }`}
                    >
                      {ACCOUNTING_HELP_TUTORIAL[tabKey].title}
                    </button>
                  );
                })}
              </div>

              {/* Tab Content Display */}
              {ACCOUNTING_HELP_TUTORIAL[helpTab] && (
                <div className="space-y-6 flex-1 overflow-y-auto pr-1">
                  {/* Title and Concept */}
                  <div className="bg-[#0c3e26]/5 dark:bg-[#00b86b]/10 p-5 rounded-xl border-l-4 border-[#0c3e26] dark:border-[#00b86b]">
                    <h3 className="font-display font-black text-base text-[#0c3e26] dark:text-[#00b86b] mb-1.5 uppercase tracking-wide">
                      {ACCOUNTING_HELP_TUTORIAL[helpTab].title} — O que é?
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-650 dark:text-slate-300 leading-relaxed font-semibold">
                      {ACCOUNTING_HELP_TUTORIAL[helpTab].concept}
                    </p>
                  </div>

                  {/* Step by step registration */}
                  <div className="space-y-3">
                    <h4 className="font-bold text-xs uppercase tracking-wider text-[#D4AF37] flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#D4AF37]" />
                      Como fazer os cadastros e usar passo-a-passo:
                    </h4>
                    <ol className="list-decimal list-inside space-y-2.5 pl-2">
                      {ACCOUNTING_HELP_TUTORIAL[helpTab].steps.map((step, idx) => (
                        <li key={idx} className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                          <span className="font-semibold text-[#0c3e26] dark:text-[#00b86b]">{idx + 1}. </span>
                          {step}
                        </li>
                      ))}
                    </ol>
                  </div>

                  {/* Workflow Graphic */}
                  <div className="bg-slate-50 dark:bg-[#253246]/40 p-4 rounded-xl border border-slate-100 dark:border-slate-800">
                    <h4 className="font-bold text-[10px] uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">
                      Fluxo de Dados • Ordem de Processamento
                    </h4>
                    <div className="flex flex-wrap items-center gap-2 text-xs font-bold text-[#0c3e26] dark:text-[#00b86b]">
                      <span className="px-2.5 py-1 rounded bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm text-[11px]">
                        {ACCOUNTING_HELP_TUTORIAL[helpTab].workflow.split(' -> ')[0]}
                      </span>
                      {ACCOUNTING_HELP_TUTORIAL[helpTab].workflow.split(' -> ').slice(1).map((node, nidx) => (
                        <span key={nidx} className="flex items-center gap-2">
                          <span className="text-[#D4AF37] text-sm font-black">➔</span>
                          <span className="px-2.5 py-1 rounded bg-[#0c3e26]/5 dark:bg-[#00b86b]/10 border border-[#0c3e26]/10 dark:border-[#00b86b]/20 shadow-sm text-[11px]">
                            {node}
                          </span>
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Pro Tip From Érika */}
                  <div className="bg-[#D4AF37]/5 dark:bg-[#D4AF37]/10 p-5 rounded-xl border border-[#D4AF37]/30 flex gap-4 items-start">
                    <div className="text-2xl mt-0.5">💡</div>
                    <div>
                      <h4 className="font-bold text-xs uppercase tracking-wider text-[#9b7e19] dark:text-[#d4af37] mb-1">
                        Dica da Érika Blank Contadora, Sênior:
                      </h4>
                      <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-300 font-medium">
                        {ACCOUNTING_HELP_TUTORIAL[helpTab].tips}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Footer */}
              <div className="border-t border-slate-100 dark:border-slate-800 pt-4 mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-450 dark:text-slate-400 font-bold">
                <div>© 2026 Contabilidade Nobel | Suporte: contato@contabilidadenobel.com.br</div>
                <a 
                  href="https://wa.me/553832155494" 
                  target="_blank" 
                  rel="noreferrer"
                  className="bg-[#25d366] hover:bg-[#128c7e] text-white px-3.5 py-1.5 rounded-lg flex items-center gap-1.5 text-decoration-none shadow-sm cursor-pointer transition-colors"
                >
                  Falar com Consultor via WhatsApp
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <NobelAcademy isOpen={isAcademyOpen} onClose={() => setIsAcademyOpen(false)} />

    </div>
  );
}

// Icons placeholders for inline mapping safety
function XIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
  );
}

function MenuIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
  );
}
