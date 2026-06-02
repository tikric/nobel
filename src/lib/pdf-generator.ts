import { jsPDF } from "jspdf";

/**
 * Generates and downloads a polished, multi-page PDF document detailing
 * all features, modules, configurations, and tools available on the Nobel Contabilidade Cockpit.
 */
export function generatePlatformManualPDF(): void {
  // Create jsPDF instance
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  let currentPage = 1;
  let y = 30; // Vertical coordinate tracker

  // Decorates secondary pages with high-contrast header and footer lines
  const drawPageDecorations = (pageNum: number) => {
    doc.setDrawColor(12, 62, 38, 0.15); // Deep green opacity
    doc.setLineWidth(0.35);
    doc.line(20, 15, 190, 15); // Header line

    doc.setFont("Helvetica", "bold");
    doc.setFontSize(8);
    doc.setTextColor(12, 62, 38); // Forest Green
    doc.text("COCKPIT EXECUTIVO NOBEL ENTERPRISE · MANUAL OPERACIONAL", 20, 11);

    doc.setFont("Helvetica", "normal");
    doc.setTextColor(148, 163, 184); // Slate grey
    doc.text("CONFORMIDADE, ERP & MULTI-MODELO IA", 190, 11, { align: "right" });

    // Footer decoration
    doc.setDrawColor(12, 62, 38, 0.15);
    doc.line(20, 275, 190, 275); // Footer line
    
    doc.setFont("Helvetica", "bold");
    doc.setFontSize(7.5);
    doc.setTextColor(100, 116, 139);
    doc.text("Contabilidade Nobel Enterprise LTDA. © 2026 · Todos os direitos reservados", 20, 281);
    doc.text(`Página ${pageNum}`, 190, 281, { align: "right" });
  };

  // Safe multi-page paragraph writer
  const printParagraph = (text: string, size = 9.5, isBold = false, gap = 4, color = [51, 65, 85]) => {
    doc.setFont("Helvetica", isBold ? "bold" : "normal");
    doc.setFontSize(size);
    doc.setTextColor(color[0], color[1], color[2]);
    
    const lines = doc.splitTextToSize(text, 170); // 170mm width constraint (A4 210mm - 20mm left - 20mm right)
    for (const line of lines) {
      if (y + 6 > 263) {
        doc.addPage();
        currentPage++;
        drawPageDecorations(currentPage);
        y = 28; // reset to top after header
        doc.setFont("Helvetica", isBold ? "bold" : "normal");
        doc.setFontSize(size);
        doc.setTextColor(color[0], color[1], color[2]);
      }
      doc.text(line, 20, y);
      y += 5.2;
    }
    y += gap;
  };

  // Section Header Generator
  const printSectionHeader = (title: string) => {
    y += 4;
    if (y + 22 > 263) {
      doc.addPage();
      currentPage++;
      drawPageDecorations(currentPage);
      y = 28;
    }
    
    doc.setFont("Helvetica", "bold");
    doc.setFontSize(13);
    doc.setTextColor(12, 62, 38); // Nobel Forest Green (#0C3E26)
    
    // Draw green left bar accent
    doc.setFillColor(12, 62, 38);
    doc.rect(20, y - 4, 3, 11, "F");
    
    doc.text(title, 25, y + 4);
    y += 9;
    
    // Thin gold separator line
    doc.setDrawColor(212, 175, 55); // Nobel Gold (#D4AF37)
    doc.setLineWidth(0.6);
    doc.line(20, y, 190, y);
    y += 7.5;
  };

  // Sub Section Header Generator
  const printSubHeader = (title: string) => {
    if (y + 12 > 263) {
      doc.addPage();
      currentPage++;
      drawPageDecorations(currentPage);
      y = 28;
    }
    
    doc.setFont("Helvetica", "bold");
    doc.setFontSize(10.5);
    doc.setTextColor(184, 134, 11); // Nobel Dark Gold Accent
    doc.text(title, 20, y);
    y += 5.5;
  };

  // Bullet point list item generator
  const printBullet = (label: string, text: string) => {
    if (y + 12 > 263) {
      doc.addPage();
      currentPage++;
      drawPageDecorations(currentPage);
      y = 28;
    }
    
    doc.setFont("Helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(12, 62, 38); // Deep forest green
    doc.text("•  " + label + ":", 22, y);
    
    // Measure dynamic width of the bold label to offset description
    const labelWidth = doc.getTextWidth("•  " + label + ": ");
    
    doc.setFont("Helvetica", "normal");
    doc.setTextColor(71, 85, 105); // slate-600
    
    const lines = doc.splitTextToSize(text, 170 - labelWidth);
    let isFirstLine = true;
    for (const line of lines) {
      if (y + 5 > 263) {
        doc.addPage();
        currentPage++;
        drawPageDecorations(currentPage);
        y = 28;
        doc.setFont("Helvetica", "normal");
        doc.setTextColor(71, 85, 105);
      }
      doc.text(line, 22 + (isFirstLine ? labelWidth : 6), y);
      y += 4.8;
      isFirstLine = false;
    }
    y += 1.5; // slight spacing after bullet
  };

  /* ==========================================
     PAGE 1: COVER PAGE STYLE (PÁGINA CAPA)
     ========================================== */
  
  // Outer forest green accent border frame
  doc.setDrawColor(12, 62, 38); // deep green
  doc.setLineWidth(1.5);
  doc.rect(10, 10, 190, 277);

  doc.setDrawColor(212, 175, 55); // gold inner line
  doc.setLineWidth(0.4);
  doc.rect(12, 12, 186, 273);

  // Top header text
  doc.setFont("Helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(212, 175, 55); // Gold
  doc.text("CENTRAL DE PLANEJAMENTO E TECNOLOGIA FISCAL", 105, 45, { align: "center" });

  // Big forest green card header block in middle
  doc.setFillColor(12, 62, 38);
  doc.rect(20, 65, 170, 75, "F");

  // Gold accent lines on top & bottom of green rect block
  doc.setDrawColor(212, 175, 55);
  doc.setLineWidth(1.2);
  doc.line(20, 65, 190, 65);
  doc.line(20, 140, 190, 140);

  // Title texts inside the beautiful dark card background
  doc.setFont("Helvetica", "bold");
  doc.setFontSize(26);
  doc.setTextColor(255, 255, 255); // White primary title
  doc.text("MANUAL DE OPERAÇÃO", 105, 93, { align: "center" });

  doc.setFont("Helvetica", "bold");
  doc.setFontSize(17);
  doc.setTextColor(212, 175, 55); // Gold subheading
  doc.text("COCKPIT EXECUTIVO NOBEL ENTERPRISE", 105, 112, { align: "center" });

  doc.setFont("Helvetica", "normal");
  doc.setFontSize(11);
  doc.setTextColor(241, 245, 249); // light blue/slate
  doc.text("Suíte Integrada de Compliance, ERP Contábil, Inteligência", 105, 126, { align: "center" });

  // Description copy in lower segment of cover
  y = 168;
  doc.setFont("Helvetica", "bold");
  doc.setFontSize(12);
  doc.setTextColor(12, 62, 38);
  doc.text("SOBRE A PLATAFORMA NOBEL:", 105, y, { align: "center" });
  y += 8;

  const descIntro = 
    "O Cockpit Executivo Nobel Enterprise representa o estado da arte na fusão de tecnologia e assessoria societária. Trata-se de uma plataforma financeira inteligente projetada exclusivamente para garantir a máxima elisão tributária, blindagem de passivos, automação de BPO de tesouraria de alta performance e atração ativa de clientes corporativos através de inteligência geográfica integrada.";
  printParagraph(descIntro, 10, false, 8, [51, 65, 85]);

  // Bottom Metadata panel
  y = 230;
  // Draw subtle light-grey metadata box
  doc.setFillColor(248, 250, 252); // slate-50
  doc.setDrawColor(12, 62, 38, 0.2); // forest green opacity
  doc.setLineWidth(0.3);
  doc.rect(25, y, 160, 38, "FD");

  // Metadata items
  doc.setFont("Helvetica", "bold");
  doc.setFontSize(8.5);
  doc.setTextColor(12, 62, 38);
  
  doc.text("Versão do Sistema:", 32, y + 8);
  doc.setFont("Helvetica", "normal");
  doc.setTextColor(100, 116, 139);
  doc.text("v2.6 Stable Framework Build (React + Vite + CJS Engine)", 65, y + 8);

  doc.setFont("Helvetica", "bold");
  doc.setTextColor(12, 62, 38);
  doc.text("Distribuição do DRE:", 32, y + 15);
  doc.setFont("Helvetica", "normal");
  doc.setTextColor(100, 116, 139);
  doc.text("Regulamentação e Conformidade sob a Lei de IRPF/2026", 65, y + 15);

  doc.setFont("Helvetica", "bold");
  doc.setTextColor(12, 62, 38);
  doc.text("Autoria & Emissão:", 32, y + 22);
  doc.setFont("Helvetica", "normal");
  doc.setTextColor(100, 116, 139);
  doc.text("Inteligência Artificial Nobel & Érika (Mentoria Fiduciária)", 65, y + 22);

  doc.setFont("Helvetica", "bold");
  doc.setTextColor(12, 62, 38);
  doc.text("Data de Compilação:", 32, y + 29);
  doc.setFont("Helvetica", "normal");
  doc.setTextColor(100, 116, 139);
  doc.text("02 de Junho de 2026 às 00:36 UTC", 65, y + 29);

  /* ==========================================
     PAGE 2: SECTION 1 & 2
     ========================================== */
  doc.addPage();
  currentPage++;
  drawPageDecorations(currentPage);
  y = 28;

  printSectionHeader("1. PAINEL EXECUTIVO E MONITOR DE MÉTRICAS");
  
  const sec1Text = 
    "O Painel Executivo do Cockpit Nobel consolida dados em tempo real para permitir tomadas de decisão cirúrgicas por diretores e assessores de faturamento. Sendo totalmente dinâmico, ele sincroniza receitas fiscais declaradas, índices de margens, custos diretos e indiretos, conectando-se diretamente ao banco de dados e APIs contratadas.";
  printParagraph(sec1Text, 9.5, false, 5);

  printSubHeader("Métricas Chave de Desempenho Monitoradas:");
  
  printBullet("Faturamento Mensal", "Registra a soma agregada de todas as notas fiscais emitidas no mês de referência. Apresenta o percentual exato de atingimento da meta financeira pré-definida.");
  printBullet("Lucro Líquido", "Calculado de forma automatizada sobre o faturamento do ERP, subtraídas as despesas listadas, fornecendo a margem líquida real de rentabilidade operacional do negócio (padrão otimizado: 33.8%).");
  printBullet("Total de Clientes Ativos", "Consolida a contagem de clientes com contratos de honorários devidamente assinados e integrados ao faturamento mensal, rastreando conversões orgânicas e via Nobel AI.");
  printBullet("Ponto de Equilíbrio (Breakeven)", "Demonstra graficamente e em valores numéricos a receita mínima absoluta necessária para cobrir todas as despesas fixas de operação, divididas pela margem de contribuição.");
  printBullet("Honorários a Receber", "Identifica faturas pro-labore em aberto e receitas societárias em atraso, automatizando fluxos de e-mail e notificações preventivas para zerar a inadimplência.");
  printBullet("Faturamento Anual Acumulado", "Avalia o desempenho financeiro histórico comparando o ano corrente com períodos fiscais anteriores, identificando crescimento sustentado real (+12.5% em escala).");

  printSectionHeader("2. INTEGRADO EM NUVEM E GOOGLE DRIVE");
  const sec2Text =
    "O Cockpit Nobel possui um módulo inteligente de sincronização bidirecional em tempo real com pastas do Google Drive e repositórios fiduciários. Os arquivos de notas fiscais recebidas, relatórios contábeis emitidos, balancetes patrimoniais e DFDs de folha de pagamento são arrastados de forma simples e armazenados na nuvem oficial, sendo indexados de forma automática em milissegundos pela IA da plataforma para consulta instantânea.";
  printParagraph(sec2Text, 9.5, false, 8);

  /* ==========================================
     PAGE 3: SECTION 3: ERP FINANCEIRO
     ========================================== */
  doc.addPage();
  currentPage++;
  drawPageDecorations(currentPage);
  y = 28;

  printSectionHeader("3. SUÍTE COMPLETA ERP FINANCEIRO");
  
  const sec3Text =
    "O Módulo ERP Contábil e Financeiro da Nobel foi desenvolvido sob as regras do ICMS, ISS e regimes do Simples Nacional, Lucro Presumido e Lucro Real, proporcionando um controle rigoroso de fluxo de tesouraria. Composto por cinco sub-painéis operacionais com filtros avançados e busca textual inteligente:";
  printParagraph(sec3Text, 9.5, false, 6);

  printSubHeader("Detalhamento de Abas e Funcionalidades do ERP:");

  printBullet("Lançamento de Receitas", "Registra todas as entradas financeiras, permitindo categorizar fluxo recorrente (como assinaturas e honorários contábeis tradicionais) ou entradas avulsas de assessoria. Possui filtros para buscar itens por competência ou data e emitir extratos ordenados.");
  printBullet("Controle Consolidado de Despesas", "Agrega despesas operacionais divididas entre operacionais fixas e administrativas variáveis. Permite ao administrador lançar novos débitos, folha salarial de colaboradores, pró-labore de sócios e guias mensais de tributação federal.");
  printBullet("DRE Gerencial (Demonstrativo do Exercício)", "Gera uma tabela contábil instantânea das finanças em estrutura em cascata de nível profissional. Calcula: Receita Bruta, Deduções tributárias diretas, Receita Líquida, Custos Fiscais de Entrada, Margem de Contribuição, EBITDA consolidado e Resultado Líquido do Exercício.");
  printBullet("Fluxo de Caixa Mensal / Anual", "Fornece gráficos detalhados analíticos com barras de conciliação diária de entradas e saídas financeiras, permitindo avaliar visualmente a liquidez corrente e projetar fluxos em horizontes de até 12 meses de operação.");
  printBullet("Painel do Ponto de Equilíbrio", "Apresenta simulação interativa baseada nos seus dados operacionais correntes. Demonstra o Ponto de Equilíbrio Financeiro (exatos R$ 82.000, meta segura de vendas) e alerta sobre perigos caso a meta caia para regimes críticos.");

  printSectionHeader("4. AGENDA INTEGRADA DE OBRIGAÇÕES");
  const sec4Text =
    "Agenda gerencial dedicada ao agendamento de tributos assessórios (como SPED Fiscal, DCTFWeb, guias de DAS, FGTS, eSocial e vistorias anuais). Sinaliza eventos fiscais com cores em sistema de semáforo de risco para impedir multas por atraso:";
  printParagraph(sec4Text, 9.5, false, 4);
  printBullet("Vermelho (Urgente)", "Obrigações acumuladas vencendo no dia corrente ou guias financeiras em atraso operacional crítico.");
  printBullet("Amarelo / Verde (Planejado)", "Calendário de transmissões em zona segura e agendados com sucesso.");

  /* ==========================================
     PAGE 4: SECTION 4: CRM & PROSPECÇÃO
     ========================================== */
  doc.addPage();
  currentPage++;
  drawPageDecorations(currentPage);
  y = 28;

  printSectionHeader("5. INTELIGÊNCIA COMERCIAL, CRM E MAPAS");
  
  const sec5Text =
    "A expansão de faturamento de escritórios e consultórios é automatizada dentro da Nobel pelo ecossistema unificado de captação de clientes. O módulo combina gestão ativa com ferramentas de busca e geolocalização:";
  printParagraph(sec5Text, 9.5, false, 6);

  printSubHeader("Sub-Módulos de Captação e Prospecção:");

  printBullet("Painel de Gestão de Clientes", "Centraliza a relação completa de parceiros comerciais, CNPJ de atuação, regime tributário (Simples, Presumido, Real), honorários fixados e status de adimplência regulatória e operacional. Possui sync com Alterdata para auditoria de adimplência de guias.");
  printBullet("Kanban CRM Funil Comercial", "Mapeia as oportunidades comerciais em coluna visual contínua. Abrange canais desde 'Novo Prospecto', 'Contato Inicial', 'Qualificação Técnica', 'Diagnóstico Fiscal', 'Proposta Emitida' até 'Fechado/Ganho'. Permite cadastrar novos leads manualmente, estimar valores contratuais anuais e movimentações ágeis de arrastar e soltar.");
  printBullet("Módulo Inteligente de Prospecção Geográfica", "Integração poderosa com mapas e bases geográficas (Google Maps). Permite ao administrador fazer buscas por empresas na sua região utilizando filtros (exemplo: 'clínicas médicas Montes Claros', 'imobiliárias em São Paulo').");
  printBullet("Enriquecimento de Dados no Mapa", "Para cada empresa localizada no raio geográfico, a IA da Nobel extrai e analisa: Nome Comercial, Telefone de Contato Direto, Endereço Postal Completo, Média de Avaliações no Google, Score estimativo de faturamento e Regime provável de arrecadação. Fornece uma régua de 'Sucesso Recomendado' e o botão 'Adicionar ao CRM' com inteligência instantiva de dados.");

  printSectionHeader("6. ACADEMIA DE CAPACITAÇÃO E TUTORIAIS");
  const sec6Text =
    "O 'Nobel Academy' é um portal de aprendizagem integrado contendo apostilas passo a passo sobre tópicos fiscais complexos elaboradas pela Érika e pela equipa Nobel. Abrange desde a configuração ideal de enquadramento do Simples Nacional, elisão eficiente de impostos diretos de serviços e clínicas, regras do Fator R e blindagem jurídica através de holding imobiliária.";
  printParagraph(sec6Text, 9.5, false, 8);

  /* ==========================================
     PAGE 5: SECTION 5: COCKPIT IA & CONFIG
     ========================================== */
  doc.addPage();
  currentPage++;
  drawPageDecorations(currentPage);
  y = 28;

  printSectionHeader("7. HELICE DE INTELIGÊNCIA IA MULTI-MODELOS");
  
  const sec7Text =
    "O Cockpit Nobel possui uma das mais avançadas centrais de inteligência artificial do mercado corporativo, permitindo ao contador ou consultor alternar de forma nativa entre modelos de linguagem (Google Gemini Pro, Claude 3.5 Sonnet, GPT-4o e DeepSeek V3). A suíte de inteligência artificial é dividida em quatro sub-ferramentas:";
  printParagraph(sec7Text, 9.5, false, 6);

  printSubHeader("Ferramentas de IA Ativas:");

  printBullet("Assistente Virtual Érika Nobel", "Chat interativo treinado profundamente em Legislação Tributária Federal e Municipal brasileira. Possui botões rápidos de diagnóstico societário prontos para clique rápido (Simulação de holding, Elisão de ISS, transição de Simples Nacional para Lucro Presumido, e auditorias fiscais automáticas).");
  printBullet("Idealizador de E-mails B2B IA", "Roteirizador de propostas e pitches de captação comercial corporativa. O usuário digita o nome do destinatário, segmento de atuação e a dor tributária a destacar. A IA cria em segundos uma sequência de abordagens persuasiva e profissional de e-mails B2B.");
  printBullet("Polidor de Textos Profissional", "Reescreve comunicações informais, rascunhos de propostas ou comunicados corporativos, elevando o vocabulário para o padrão técnico e formal exigido nas relações com sócios, tribunais administrativos e cartórios de registro civil.");
  printBullet("Simulador Especial Imobiliário", "Ferramenta analítica que calcula instantaneamente e de forma automatizada o ganho real de imposto de uma holding patrimonial em comparação direta ao imposto de pessoa física (CPF) padrão, demonstrando a redução de alíquota de 27.5% tributável para até 11.3% na locação de imóveis.");

  printSectionHeader("8. CONFIGURAÇÕES, SEGURANÇA E SNAPS DE BACKUP");
  
  const sec8Text =
    "O ambiente administrativo centraliza a segurança e os tokens de APIs da suíte Nobel. O Cockpit possui o Módulo de Snapshot de Backup com agendador de redundância contínua:";
  printParagraph(sec8Text, 9.5, false, 4);

  printBullet("Backup Automático Recorrente (3h)", "O banco de dados sincroniza de forma transparente e segura todas as tabelas de receitas, despesas, contratos de clientes e leads do CRM a cada 3 horas. O painel exibe um cronômetro regressivo real informando o próximo ciclo planejado.");
  printBullet("Simulação e Histórico de Dumps", "Permite ao administrador forçar a gravação de um backup manual de segurança antes de realizar encerramentos fiscais volumosos. O progresso é demonstrado através de logs operacionais criptografados gerando hashes SHA-256 e tamanho exato de arquivo catalogado.");
  printBullet("Exportadores e Controle de Acesso", "Exportação rápida das tabelas consolidadas em formatos JSON, planilhas CSV e layouts do Microsoft Excel. A aba de Acesso gerencia permissões hierárquicas limitando o acesso a ferramentas financeiras apenas para perfis de Diretores e Administradores cadastrados.");

  // Footer visual finish on last page
  y += 6;
  if (y + 15 > 263) {
    doc.addPage();
    currentPage++;
    drawPageDecorations(currentPage);
    y = 28;
  }
  
  doc.setDrawColor(212, 175, 55);
  doc.setLineWidth(0.4);
  doc.line(40, y + 5, 170, y + 5);
  
  doc.setFont("Helvetica", "bold");
  doc.setFontSize(8.5);
  doc.setTextColor(12, 62, 38);
  doc.text("Fim do Manual Operacional - Contabilidade Nobel Enterprise v2.6", 105, y + 11, { align: "center" });

  // Save the PDF!
  doc.save("Manual_Nobel_Enterprise.pdf");
}
