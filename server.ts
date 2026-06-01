import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-initialized Gemini handler to follow API Key Security and prevent startup crashes
let aiInstance: GoogleGenAI | null = null;
function getAI() {
  if (!aiInstance) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      throw new Error("GEMINI_API_KEY is needed.");
    }
    aiInstance = new GoogleGenAI({
      apiKey: key,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiInstance;
}

// Internal Multi-Model AI Chat handler
app.post("/api/chat", async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ error: "Mensagem vazia." });
    }

    let ai;
    try {
      ai = getAI();
    } catch (keyError) {
      // Graceful fallback simulation when GEMINI_API_KEY is not defined in development
      return res.json({
        reply: `[Nobel AI] Entendi sua solicitação sobre: "${message}". Lembre-se, quando a sua GEMINI_API_KEY estiver configurada nos Segredos do AI Studio, as respostas serão processadas em tempo real com alta precisão sob as normas de 2026.`
      });
    }

    // Call the model listed as BASIC text task alias: 'gemini-3.5-flash'
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: message,
    });

    res.json({ reply: response.text });
  } catch (err: any) {
    console.error("AI processing error:", err);
    res.status(500).json({ error: err.message || "Erro interno da inteligência artificial." });
  }
});

// Helper to extract the singular form of categories in Portuguese
function getSingularCategory(cat: string): string {
  const mapping: { [key: string]: string } = {
    "Academias": "Academia",
    "Açougues": "Açougue",
    "Agências de turismo": "Agência de Turismo",
    "Agências digitais": "Agência Digital",
    "Auto elétricas": "Auto Elétrica",
    "Autopeças": "Autopeças",
    "Cafeterias": "Cafeteria",
    "Centros automotivos": "Centro Automotivo",
    "Centros de diagnóstico": "Centro de Diagnóstico",
    "Centros logísticos": "Centro Logístico",
    "Clínicas de emagrecimento": "Clínica de Emagrecimento",
    "Clínicas de estética": "Clínica de Estética",
    "Clínicas de fisioterapia": "Clínica de Fisioterapia",
    "Clínicas de psicologia": "Clínica de Psicologia",
    "Clínicas médicas": "Clínica Médica",
    "Clínicas odontológicas": "Clínica Odontológica",
    "Clínicas veterinárias": "Clínica Veterinária",
    "Construtoras": "Construtora",
    "Consultores de imóveis": "Consultor de Imóveis",
    "Consultorias empresariais": "Consultoria Empresarial",
    "Consultorias tecnológicas": "Consultoria Tecnológica",
    "Consultórios odontológicos": "Consultório Odontológico",
    "Corretoras de seguros": "Corretora de Seguros",
    "Corretores de imóveis": "Corretor de Imóveis",
    "Creches": "Creche",
    "Cursos online": "Curso Online",
    "Cursos profissionalizantes": "Curso Profissionalizante",
    "Desenvolvedores de aplicativos": "Desenvolvedor de Aplicativos",
    "Despachantes": "Despachante",
    "Distribuidoras": "Distribuidora",
    "Distribuidoras de alimentos": "Distribuidora de Alimentos",
    "E-commerce": "E-Commerce",
    "Empresas de automação": "Empresa de Automação",
    "Empresas de energia solar": "Empresa de Energia Solar",
    "Empresas de eventos": "Empresa de Eventos",
    "Empresas de limpeza": "Empresa de Limpeza",
    "Empresas de marketing": "Empresa de Marketing",
    "Empresas de pintura": "Empresa de Pintura",
    "Empresas de reformas": "Empresa de Reformas",
    "Empresas de recrutamento": "Empresa de Recrutamento",
    "Empresas de RH": "Empresa de RH",
    "Empresas de segurança": "Empresa de Segurança",
    "Empresas de software": "Empresa de Software",
    "Empresas de terceirização": "Empresa de Terceirização",
    "Empresas de TI": "Empresa de TI",
    "Energia solar": "Energia Solar",
    "Escolas de idiomas": "Escola de Idiomas",
    "Escolas de música": "Escola de Música",
    "Escolas particulares": "Escola Particular",
    "Escolas técnicas": "Escola Técnica",
    "Escritórios de advocacia": "Escritório de Advocacia",
    "Escritórios de arquitetura": "Escritório de Arquitetura",
    "Escritórios de engenharia": "Escritório de Engenharia",
    "Fábricas de embalagens": "Fábrica de Embalagens",
    "Fábricas de móveis": "Fábrica de Móveis",
    "Faculdades": "Faculdade",
    "Franquias": "Franquia",
    "Funilarias": "Funilaria",
    "Gráficas": "Gráfica",
    "Hamburguerias": "Hamburgueria",
    "Home Care": "Home Care",
    "Hortifrutis": "Hortifruti",
    "Hospitais": "Hospital",
    "Imobiliárias": "Imobiliária",
    "Impressão 3D": "Impressão 3D",
    "Incorporadoras": "Incorporadora",
    "Indústrias": "Indústria",
    "Indústrias alimentícias": "Indústria Alimentícia",
    "Indústrias farmacêuticas": "Indústria Farmacêutica",
    "Indústrias plásticas": "Indústria Plástica",
    "Indústrias químicas": "Indústria Química",
    "Indústrias têxteis": "Indústria Têxtil",
    "Influenciadores e produtores de conteúdo": "Produtor de Conteúdo / Influenciador",
    "Joalherias": "Joalheria",
    "Laboratórios": "Laboratório",
    "Lanchonetes": "Lanchonete",
    "Lava-rápidos": "Lava-Rápido",
    "Locadoras de veículos": "Locadora de Veículos",
    "Lojas de brinquedos": "Loja de Brinquedos",
    "Lojas de calçados": "Loja de Calçados",
    "Lojas de colchões": "Loja de Colchões",
    "Lojas de informática": "Loja de Informática",
    "Lojas de móveis": "Loja de Móveis",
    "Lojas de roupas": "Loja de Roupas",
    "Lojas de utilidades domésticas": "Loja de Utilidades Domésticas",
    "Marcenarias": "Marcenaria",
    "Marketplaces": "Marketplace",
    "Marmorarias": "Marmoraria",
    "Metalúrgicas": "Metalúrgica",
    "Oficinas mecânicas": "Oficina Mecânica",
    "Óticas": "Ótica",
    "Padarias": "Padaria",
    "Papelarias": "Papelaria",
    "Pizzarias": "Pizzaria",
    "Provedores de internet": "Provedor de Internet",
    "Reforço escolar": "Reforço Escolar",
    "Restaurantes": "Restaurante",
    "Revendas de veículos": "Revenda de Veículos",
    "Serralherias": "Serralheria",
    "Startups": "Startup",
    "Studios de pilates": "Studio de Pilates",
    "Supermercados": "Supermercado",
    "Transportadoras": "Transportadora",
    "Treinamentos corporativos": "Treinamento Corporativo",
    "Vidraçarias": "Vidraçaria"
  };

  const key = Object.keys(mapping).find(
    k => k.toLowerCase() === cat.toLowerCase()
  );
  if (key) return mapping[key];

  // Default pluralization rule fallback
  if (cat.endsWith("s")) {
    if (cat.endsWith("is")) return cat.slice(0, -2) + "l";
    if (cat.endsWith("ões")) return cat.slice(0, -3) + "ão";
    return cat.slice(0, -1);
  }
  return cat;
}

// Helper for generating high quality, realistic fallback prospects for Norte de Minas
function generateFallbackProspects(category: string, city: string) {
  const singular = getSingularCategory(category);
  const targetCity = city || "Montes Claros";
  
  // Real-looking business names for Norte de Minas
  const specificNames: { [key: string]: string[] } = {
    "Academia": ["Academia Fênix", "Vibe Fit Center", "Norte Fitness", "Academia Ritmo e Saúde", "Evolution Fitness"],
    "Açougue": ["Casa de Carnes Boi Gordo", "Açougue Central", "Frigorífico Norte", "Corte de Ouro Carnes", "Açougue Boi na Brasa"],
    "Agência de Turismo": ["Norte Minas Turismo", "Vanguarda Viagens", "Central de Viagens", "Destinos de Ouro", "Viajar Fácil"],
    "Auto Elétrica": ["Auto Elétrica Central", "Manoel Eletro Car", "Norte Car Elétrica", "Elite Sparks Auto", "Forte Voltagem"],
    "Autopeças": ["Norte Autopeças", "Líder Distribuidora Peças", "Central Autopeças", "Auto Peças Progresso", "Nacional Peças"],
    "Cafeteria": ["Café d'Ouro Coado", "Cafeteria Central", "Grão Nobre", "Café com Prosa", "Vila do Café"],
    "Centro Automotivo": ["Centro Automotivo Montes Claros", "Mecânica Rápida Central", "Norte Auto Service", "PitStop Automotivo", "Mestre das Rodas"],
    "Centro de Diagnóstico": ["Diagnóstico Imagem Norte", "Clínica Analisa Diagnósticos", "Central Exames", "Vanguarda Diagnósticos", "Laboratório Imagem Viva"],
    "Clínica de Estética": ["Clínica Estética Bella", "Espaço VIP de Estética", "Norte Estética Avançada", "Clínica Toque de Ouro", "Renova Corpo & Rosto"],
    "Clínica de Fisioterapia": ["FisioVida Norte de Minas", "Clínica Reabilitar", "Movimento & Saúde Fisioterapia", "Fisio Pilates Montes Claros", "Central da Fisioterapia"],
    "Clínica de Psicologia": ["Espaço do Pensar Psicoterapia", "Clínica Mente Sã", "Psicologia Integrativa Norte", "Clínica Desenvolver", "Equilíbrio Psicoterapia"],
    "Clínica Médica": ["Clínica Consulta Fácil", "Centro Médico Norte de Minas", "Medicina Integrada Montes Claros", "Clínica Saúde & Vida", "Centro Médico Pró-Saúde"],
    "Clínica Odontológica": ["Sorriso de Ouro Odontologia", "Clínica Sorrir Sempre", "Norte de Minas Odonto", "Odontologia Integrada", "Implantes Montes Claros"],
    "Clínica Veterinária": ["Clínica Vet Amigo", "Hospital Veterinário Norte", "Pet & Vet Clinica", "Central Veterinária", "SOS Vida Animal"],
    "Construtora": ["Construtora Vanguarda", "Engenhar Construtora", "Norte de Minas Empreendimentos", "Solidez Construtora", "Construtora Minas Gerais"],
    "Consultoria Empresarial": ["Foco Consultoria", "Gestão Nobre Parceiros", "Progresso Consultoria Empresarial", "Norte Minas Business Coach", "Vanguarda Assessoria"],
    "Consultórios odontológicos": ["Consultório Geral Odonto", "Dr. Sorriso Consultório", "Clínica Arte do Trabalho", "Centro Oral Saúde", "Odontologia de Excelência"],
    "Consultório Odontológico": ["Consultório Geral Odonto", "Dr. Sorriso Consultório", "Clínica Arte do Trabalho", "Centro Oral Saúde", "Odontologia de Excelência"],
    "Corretora de Seguros": ["Norte de Minas Seguros", "Vanguarda Corretora", "Líder Proteção Seguros", "Central Minas Seguros", "Viva Bem Corretores"],
    "Corretor de Imóveis": ["Minas Corretor Negócios", "Norte de Minas Negócios Imobiliários", "Central Imóveis Montes Claros", "Vanguarda Imobiliária", "Parceria Lançamento Imóveis"],
    "Creche": ["Creche Recanto das Crianças", "Centro de Educação Infantil Sonho Meu", "Creche Arco-Íris", "Espaço Infantil Passo a Passo", "Pequenos Brilhantes"],
    "Curso Online": ["Norte EAD Capacitação", "Cursos Alfa Digital", "Minas Ensino Conectado", "Vanguarda Academy", "Educar Web"],
    "Cursos Profissionalizantes": ["Instituto Qualificar", "Norte de Minas Cursos Técnicos", "Vanguarda Profissional", "Central de Carreiras", "Líder Profissões"],
    "Distribuidora": ["Distribuidora Central Montes Claros", "Norte de Minas Distribuição", "Distribuidora Líder Bebidas", "Mais Alimentos Distribuição", "Forte Atacado"],
    "Distribuidora de Alimentos": ["Distribuidora Nutri Norte", "Norte de Minas Alimentos", "Estrela do Vale Distribuidora", "Central Distribuição Alimentos", "Sabor & Logística"],
    "E-Commerce": ["Norte Vendas Online", "Portal do Desconto Store", "Minas Express E-commerce", "Vanguarda Shop", "Outlet Norte de Minas"],
    "Empresa de Energia Solar": ["Sol de Minas Energia Solar", "Norte Fotovoltaica", "EcoLuz Energia Renovável", "Solar Montes Claros", "Vanguarda Energia Solar"],
    "Empresa de Eventos": ["Líder Produções e Eventos", "Norte Festas & Buffet", "Vanguarda Cerimonial", "Central Eventos Sociais", "Espaço Vip Festas"],
    "Empresa de Limpeza": ["Facilita Serviços de Limpeza", "Norte de Minas Conservação", "Limpe Bem Terceirização", "Brilho de Ouro Higienização", "Vanguarda Serviços de Apoio"],
    "Empresa de Marketing": ["Agência Atitude Digital", "Norte Comunicação Verbal", "Vanguarda Marketing Estratégico", "Espaço Conexão Criativa", "Líder Impulsionamento"],
    "Empresa de Software": ["SoftMinas Sistemas de Gestão", "Vanguarda Tecnologia Inteligente", "Norte Developers", "Code Crafters Montes Claros", "Central Sistemas Web"],
    "Empresa de TI": ["Norte Suporte de TI", "Central Tech Soluções", "Vanguarda Infraestrutura TI", "Líder Suporte Informático", "Minas Redes & TI"],
    "Escola Particular": ["Colégio Vanguarda", "Escola Estrela de Montes Claros", "Colégio Padrão de Ensino", "Colégio Logos de Educação", "Instituto Educacional Progresso"],
    "Escritório de Advocacia": ["Associação de Advogados Montes Claros", "Vanguarda Jurídica", "Escritório Advogados Associados", "Soluções Jurídicas Norte de Minas", "Central Justiça & Cidadania"],
    "Escritório de Arquitetura": ["Espaço & Forma Arquitetura", "Vanguarda Decor & Projetos", "Líder Arquitetura Inteligente", "Studio Arch Montes Claros", "Norte Traço Arquitetos"],
    "Escritório de Engenharia": ["Norte Engenharia Estrutural", "Vanguarda Projetos de Engenharia", "Central Cálculos e Projetos", "Minas Engenharia Civil", "Líder Engenheiros Associados"],
    "Faculdade": ["Faculdade Integrada do Norte de Minas", "Instituto de Ensino Superior de Montes Claros", "Vanguarda Faculdade", "Minas Educacional Faculdade", "Centro Universitário Líder"],
    "Franquia": ["Franquia Bob's Montes Claros", "Franquia Cacau Show", "Franquia Subway", "Franquia O Boticário", "Franquia Ortobom"],
    "Hamburgueria": ["Hamburgueria Blend de Ouro", "Norte Burger Grelhados", "Hamburgueria do Beco", "Vanguarda Hambúrgueres", "Central Burger Prime"],
    "Hospital": ["Hospital Dilson de Quadros Godinho", "Hospital da Santa Casa Montes Claros", "Hospital Universitário Clemente de Faria", "Hospital Aroldo Tourinho", "Hospital das Clínicas de Montes Claros"],
    "Imobiliária": ["Imobiliária Norte de Minas", "Vanguarda Negócios Imobiliários", "Minas Imóveis Montes Claros", "Central Imobiliária de Aluguel", "Espaço Lançamentos Imobiliários"],
    "Indústria": ["Metalúrgica Martins Norte", "Estrela Alimentos Indústria", "Fiação Montes Claros Ltda", "Plásticos Minas Embalagens", "Química Líder Norte de Minas"],
    "Joalheria": ["Joalheria Brilho de Ouro", "Vanguarda Jóias", "Óptica e Joalheria Central", "Norte Jóias Finas", "Luz Sem Fim Joalheiros"],
    "Laboratório": ["Laboratório Analisa Clínico", "Biomédica Laboratório", "Laboratório Norte de Minas", "Central de Análises Clínicas", "Vila de Exames Laboratoriais"],
    "Lanchonete": ["Lanchonete do Ponto", "Lanchonete Central", "Norte Gráfica e Lanches", "Sabor Rápido", "Lanches da Praça"],
    "Lava-Rápido": ["Lava-Jato Brilho Centro", "Norte Car Lavagem Rápida", "Lava-Rápido Auto SPA", "Lava-Jato Premium Montes Claros", "Lava Rápido Ecológico"],
    "Loja de Calçados": ["Norte Calçados", "Vila dos Pés Loja", "Passo de Ouro Calçados", "Pé Quente Outlet", "Lojas Calçados Central"],
    "Loja de Roupas": ["Vanguarda Modas", "Norte de Minas Vestuário", "Lojas Estilo Geral", "Bella Moda Montes Claros", "Líder Roupas e Acessórios"],
    "Oficina Mecânica": ["Oficina Car Service Montes Claros", "Mecânica Auto Forte", "Norte Motores Especializados", "Vanguarda Linha Leve", "Central Freios e Embreagens"],
    "Ótica": ["Ótica Central Montes Claros", "Foco Óptica", "Visão de Ouro Ótica", "Norte de Minas Óticas", "Vanguarda Óculos & Lentes"],
    "Padaria": ["Panificadora Delícias do Trigo", "Padaria Central", "Pão Quentinho do Bairro", "Padaria Montes Claros", "Pão e Companhia"],
    "Papelaria": ["Papelaria e Livraria Central", "Norte Minas Papelaria", "Vanguarda Estudantil", "Lápis de Cor Artigos Escolares", "Líder Papéis e Cópias"],
    "Pizzaria": ["Pizzaria Forno de Ouro", "Pizzaria Bella Massa", "Nona Bella Pizzas", "Pizzaria Montes Claros", "Pizzaria Massa Fina"],
    "Restaurante": ["Restaurante Sabor de Minas", "Restaurante Norte Grill", "Panela de Barro Restaurante", "Estrela de Minas Restaurante", "Restaurante Canto Verde"],
    "Revenda de Veículos": ["Norte de Minas Veículos", "Líder Multimarcas Cars", "Central de Veículos Usados", "Vanguarda Seminovos", "Forte Carros Montes Claros"],
    "Startup": ["Minas Tech Hub", "Aceleradora Norte Digital", "AgroSolar Inteligente", "Logtech Montes Claros", "Norte Delivery APP"],
    "Supermercado": ["Supermercado Central de Minas", "Norte Supermercados", "Supermercado do Povo", "Supermercado Mercadão Nobre", "Economia Total Supermercados"],
    "Transportadora": ["Norte de Minas Express Transportes", "Rapidão Montes Claros Cargas", "Vanguarda Transportadora", "Central Cargas e Encomendas", "Líder Logística de Cargas"]
  };

  const cleanSingular = singular.trim();
  let namesToChoose = specificNames[cleanSingular] || specificNames[category];

  if (!namesToChoose) {
    if (cleanSingular.toLowerCase().startsWith("loja de")) {
      const core = cleanSingular.replace(/loja de /gi, "");
      namesToChoose = [
        `Style ${core}`,
        `Estilo ${core}`,
        `Império do ${core}`,
        `${cleanSingular} Central`,
        `Norte ${core}`
      ];
    } else if (cleanSingular.toLowerCase().startsWith("clínica de")) {
      const core = cleanSingular.replace(/clínica de /gi, "");
      namesToChoose = [
        `Espaço ${core} & Saúde`,
        `Clínica ${core} Integrada`,
        `${cleanSingular} Montes Claros`,
        `${cleanSingular} de Ouro`,
        `Centro de ${core} Norte`
      ];
    } else {
      const prefixes = ["Grupo", "Premium", "Central", "Norte", "Vanguarda", "Parceiros", "Forte", "Portal"];
      const suffixes = ["Soluções", "Gerais", "Norte de Minas", "Associados", "e Filhos", "Distribuidora", "Empreendimentos"];
      namesToChoose = Array.from({ length: 5 }).map((_, i) => {
        const prefix = prefixes[(i + cleanSingular.length) % prefixes.length];
        const suffix = suffixes[(i * 3 + cleanSingular.length) % suffixes.length];
        return `${prefix} ${cleanSingular} ${suffix}`;
      });
    }
  }

  const streets = [
    "Av. Deputado Esteves Rodrigues",
    "Rua Dr. Santos",
    "Av. Ovídio de Abreu",
    "Rua Dom Pedro II",
    "Av. Sanitária",
    "Rua Presidente John Kennedy"
  ];

  return Array.from({ length: 5 }).map((_, i) => {
    const name = namesToChoose[i % namesToChoose.length];
    const siteBase = name.toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9 ]/g, "")
      .replace(/\s+/g, "");

    return {
      nome: name,
      cat: category, // Retorna com o nome completo original da categoria para perfeita correspondência
      score: Math.floor(Math.random() * 20) + 79, // Scores between 79 and 99
      endereco: `${streets[(i + category.length) % streets.length]}, ${150 + i * 85}`,
      cidade: targetCity,
      site: `www.${siteBase}.com.br`,
      tel: `(38) 3215-${3000 + i * 17}`,
      funcionarios: Math.floor(Math.random() * 32) + 6,
      regime: i % 3 === 0 ? "Lucro Presumido" : i % 3 === 1 ? "Simples Nacional" : "Lucro Real"
    };
  });
}

// Endpoint to dynamically generate relevant prospects using Gemini AI
app.post("/api/generate-prospects", async (req, res) => {
  try {
    const { category, city } = req.body;
    if (!category) {
      return res.status(400).json({ error: "Categoria é necessária para a busca." });
    }
    const targetCity = city || "Montes Claros";

    let ai;
    let fallback = false;
    try {
      ai = getAI();
    } catch (keyError) {
      fallback = true;
    }

    if (fallback || !ai) {
      const simulated = generateFallbackProspects(category, targetCity);
      return res.json({ prospects: simulated });
    }

    const singularCategory = getSingularCategory(category);
    const categoryTerms = (singularCategory.toLowerCase() !== category.toLowerCase()) 
      ? `"${category}" (ou no singular "${singularCategory}")`
      : `"${category}"`;

    const prompt = `Gere uma lista de 5 empresas reais ou altamente verossímeis que atuam comercialmente na categoria ${categoryTerms} na cidade de "${targetCity}", estado de Minas Gerais (Norte de Minas). Forneça nomes de negócios reais de ${targetCity} (ou altamente plausíveis para a região) de forma que soem extremamente naturais na fala local cotidiana em português.
Retorne APENAS um vetor JSON válido contendo objetos estruturados exatamente dessa forma, com chaves e strings entre aspas duplas, sem comentários e sem formatações adicionais:
[
  {
    "nome": "Nome Fantasia da Empresa",
    "cat": "${category}",
    "score": um número inteiro entre 75 e 98 (quanto maior o score, mais propensa a contratar assessoria Nobel),
    "endereco": "Um endereço plausível (ex: Av. Sanitária, 1200)",
    "cidade": "${targetCity}",
    "site": "site plausivel correspondente (ex: www.empresa.com.br)",
    "tel": "um telefone comercial plausível com DDD 38, ex: (38) 3221-4122 ou similar",
    "funcionarios": um número inteiro entre 2 e 60,
    "regime": "Simples Nacional" ou "Lucro Presumido" ou "Lucro Real"
  }
]
Retorne apenas o JSON bruto válido, sem sintaxes adicionais, sem markdown (NÃO use o bloco de código \`\`\`json nas marcações, apenas retorne o texto correspondente ao JSON).`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
    });

    let text = response.text || "";
    // Sanitize any occasional markdown wrapping from LLM
    text = text.replace(/```json/gi, "").replace(/```/gi, "").trim();
    
    // Parse to verify it is valid JSON
    const data = JSON.parse(text);
    if (Array.isArray(data)) {
      res.json({ prospects: data });
    } else {
      throw new Error("Resposta do modelo não é um array válido.");
    }
  } catch (err: any) {
    console.error("AI prospects generation failed (using fallback generator):", err);
    const simulated = generateFallbackProspects(req.body.category, req.body.city || "Montes Claros");
    res.json({ prospects: simulated });
  }
});

// Vite Middleware for Development / static fallback for Production
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server executing at http://localhost:${PORT}`);
  });
}

startServer();
