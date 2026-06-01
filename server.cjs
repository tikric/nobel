var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// server.ts
var import_express = __toESM(require("express"), 1);
var import_path = __toESM(require("path"), 1);
var import_vite = require("vite");
var import_genai = require("@google/genai");
var import_dotenv = __toESM(require("dotenv"), 1);
import_dotenv.default.config();
var app = (0, import_express.default)();
var PORT = 3e3;
app.use(import_express.default.json());
var aiInstance = null;
function getAI() {
  if (!aiInstance) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      throw new Error("GEMINI_API_KEY is needed.");
    }
    aiInstance = new import_genai.GoogleGenAI({
      apiKey: key,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build"
        }
      }
    });
  }
  return aiInstance;
}
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
      return res.json({
        reply: `[Nobel AI] Entendi sua solicita\xE7\xE3o sobre: "${message}". Lembre-se, quando a sua GEMINI_API_KEY estiver configurada nos Segredos do AI Studio, as respostas ser\xE3o processadas em tempo real com alta precis\xE3o sob as normas de 2026.`
      });
    }
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: message
    });
    res.json({ reply: response.text });
  } catch (err) {
    console.error("AI processing error:", err);
    res.status(500).json({ error: err.message || "Erro interno da intelig\xEAncia artificial." });
  }
});
function getSingularCategory(cat) {
  const mapping = {
    "Academias": "Academia",
    "A\xE7ougues": "A\xE7ougue",
    "Ag\xEAncias de turismo": "Ag\xEAncia de Turismo",
    "Ag\xEAncias digitais": "Ag\xEAncia Digital",
    "Auto el\xE9tricas": "Auto El\xE9trica",
    "Autope\xE7as": "Autope\xE7as",
    "Cafeterias": "Cafeteria",
    "Centros automotivos": "Centro Automotivo",
    "Centros de diagn\xF3stico": "Centro de Diagn\xF3stico",
    "Centros log\xEDsticos": "Centro Log\xEDstico",
    "Cl\xEDnicas de emagrecimento": "Cl\xEDnica de Emagrecimento",
    "Cl\xEDnicas de est\xE9tica": "Cl\xEDnica de Est\xE9tica",
    "Cl\xEDnicas de fisioterapia": "Cl\xEDnica de Fisioterapia",
    "Cl\xEDnicas de psicologia": "Cl\xEDnica de Psicologia",
    "Cl\xEDnicas m\xE9dicas": "Cl\xEDnica M\xE9dica",
    "Cl\xEDnicas odontol\xF3gicas": "Cl\xEDnica Odontol\xF3gica",
    "Cl\xEDnicas veterin\xE1rias": "Cl\xEDnica Veterin\xE1ria",
    "Construtoras": "Construtora",
    "Consultores de im\xF3veis": "Consultor de Im\xF3veis",
    "Consultorias empresariais": "Consultoria Empresarial",
    "Consultorias tecnol\xF3gicas": "Consultoria Tecnol\xF3gica",
    "Consult\xF3rios odontol\xF3gicos": "Consult\xF3rio Odontol\xF3gico",
    "Corretoras de seguros": "Corretora de Seguros",
    "Corretores de im\xF3veis": "Corretor de Im\xF3veis",
    "Creches": "Creche",
    "Cursos online": "Curso Online",
    "Cursos profissionalizantes": "Curso Profissionalizante",
    "Desenvolvedores de aplicativos": "Desenvolvedor de Aplicativos",
    "Despachantes": "Despachante",
    "Distribuidoras": "Distribuidora",
    "Distribuidoras de alimentos": "Distribuidora de Alimentos",
    "E-commerce": "E-Commerce",
    "Empresas de automa\xE7\xE3o": "Empresa de Automa\xE7\xE3o",
    "Empresas de energia solar": "Empresa de Energia Solar",
    "Empresas de eventos": "Empresa de Eventos",
    "Empresas de limpeza": "Empresa de Limpeza",
    "Empresas de marketing": "Empresa de Marketing",
    "Empresas de pintura": "Empresa de Pintura",
    "Empresas de reformas": "Empresa de Reformas",
    "Empresas de recrutamento": "Empresa de Recrutamento",
    "Empresas de RH": "Empresa de RH",
    "Empresas de seguran\xE7a": "Empresa de Seguran\xE7a",
    "Empresas de software": "Empresa de Software",
    "Empresas de terceiriza\xE7\xE3o": "Empresa de Terceiriza\xE7\xE3o",
    "Empresas de TI": "Empresa de TI",
    "Energia solar": "Energia Solar",
    "Escolas de idiomas": "Escola de Idiomas",
    "Escolas de m\xFAsica": "Escola de M\xFAsica",
    "Escolas particulares": "Escola Particular",
    "Escolas t\xE9cnicas": "Escola T\xE9cnica",
    "Escrit\xF3rios de advocacia": "Escrit\xF3rio de Advocacia",
    "Escrit\xF3rios de arquitetura": "Escrit\xF3rio de Arquitetura",
    "Escrit\xF3rios de engenharia": "Escrit\xF3rio de Engenharia",
    "F\xE1bricas de embalagens": "F\xE1brica de Embalagens",
    "F\xE1bricas de m\xF3veis": "F\xE1brica de M\xF3veis",
    "Faculdades": "Faculdade",
    "Franquias": "Franquia",
    "Funilarias": "Funilaria",
    "Gr\xE1ficas": "Gr\xE1fica",
    "Hamburguerias": "Hamburgueria",
    "Home Care": "Home Care",
    "Hortifrutis": "Hortifruti",
    "Hospitais": "Hospital",
    "Imobili\xE1rias": "Imobili\xE1ria",
    "Impress\xE3o 3D": "Impress\xE3o 3D",
    "Incorporadoras": "Incorporadora",
    "Ind\xFAstrias": "Ind\xFAstria",
    "Ind\xFAstrias aliment\xEDcias": "Ind\xFAstria Aliment\xEDcia",
    "Ind\xFAstrias farmac\xEAuticas": "Ind\xFAstria Farmac\xEAutica",
    "Ind\xFAstrias pl\xE1sticas": "Ind\xFAstria Pl\xE1stica",
    "Ind\xFAstrias qu\xEDmicas": "Ind\xFAstria Qu\xEDmica",
    "Ind\xFAstrias t\xEAxteis": "Ind\xFAstria T\xEAxtil",
    "Influenciadores e produtores de conte\xFAdo": "Produtor de Conte\xFAdo / Influenciador",
    "Joalherias": "Joalheria",
    "Laborat\xF3rios": "Laborat\xF3rio",
    "Lanchonetes": "Lanchonete",
    "Lava-r\xE1pidos": "Lava-R\xE1pido",
    "Locadoras de ve\xEDculos": "Locadora de Ve\xEDculos",
    "Lojas de brinquedos": "Loja de Brinquedos",
    "Lojas de cal\xE7ados": "Loja de Cal\xE7ados",
    "Lojas de colch\xF5es": "Loja de Colch\xF5es",
    "Lojas de inform\xE1tica": "Loja de Inform\xE1tica",
    "Lojas de m\xF3veis": "Loja de M\xF3veis",
    "Lojas de roupas": "Loja de Roupas",
    "Lojas de utilidades dom\xE9sticas": "Loja de Utilidades Dom\xE9sticas",
    "Marcenarias": "Marcenaria",
    "Marketplaces": "Marketplace",
    "Marmorarias": "Marmoraria",
    "Metal\xFArgicas": "Metal\xFArgica",
    "Oficinas mec\xE2nicas": "Oficina Mec\xE2nica",
    "\xD3ticas": "\xD3tica",
    "Padarias": "Padaria",
    "Papelarias": "Papelaria",
    "Pizzarias": "Pizzaria",
    "Provedores de internet": "Provedor de Internet",
    "Refor\xE7o escolar": "Refor\xE7o Escolar",
    "Restaurantes": "Restaurante",
    "Revendas de ve\xEDculos": "Revenda de Ve\xEDculos",
    "Serralherias": "Serralheria",
    "Startups": "Startup",
    "Studios de pilates": "Studio de Pilates",
    "Supermercados": "Supermercado",
    "Transportadoras": "Transportadora",
    "Treinamentos corporativos": "Treinamento Corporativo",
    "Vidra\xE7arias": "Vidra\xE7aria"
  };
  const key = Object.keys(mapping).find(
    (k) => k.toLowerCase() === cat.toLowerCase()
  );
  if (key) return mapping[key];
  if (cat.endsWith("s")) {
    if (cat.endsWith("is")) return cat.slice(0, -2) + "l";
    if (cat.endsWith("\xF5es")) return cat.slice(0, -3) + "\xE3o";
    return cat.slice(0, -1);
  }
  return cat;
}
function generateFallbackProspects(category, city) {
  const singular = getSingularCategory(category);
  const targetCity = city || "Montes Claros";
  const specificNames = {
    "Academia": ["Academia F\xEAnix", "Vibe Fit Center", "Norte Fitness", "Academia Ritmo e Sa\xFAde", "Evolution Fitness"],
    "A\xE7ougue": ["Casa de Carnes Boi Gordo", "A\xE7ougue Central", "Frigor\xEDfico Norte", "Corte de Ouro Carnes", "A\xE7ougue Boi na Brasa"],
    "Ag\xEAncia de Turismo": ["Norte Minas Turismo", "Vanguarda Viagens", "Central de Viagens", "Destinos de Ouro", "Viajar F\xE1cil"],
    "Auto El\xE9trica": ["Auto El\xE9trica Central", "Manoel Eletro Car", "Norte Car El\xE9trica", "Elite Sparks Auto", "Forte Voltagem"],
    "Autope\xE7as": ["Norte Autope\xE7as", "L\xEDder Distribuidora Pe\xE7as", "Central Autope\xE7as", "Auto Pe\xE7as Progresso", "Nacional Pe\xE7as"],
    "Cafeteria": ["Caf\xE9 d'Ouro Coado", "Cafeteria Central", "Gr\xE3o Nobre", "Caf\xE9 com Prosa", "Vila do Caf\xE9"],
    "Centro Automotivo": ["Centro Automotivo Montes Claros", "Mec\xE2nica R\xE1pida Central", "Norte Auto Service", "PitStop Automotivo", "Mestre das Rodas"],
    "Centro de Diagn\xF3stico": ["Diagn\xF3stico Imagem Norte", "Cl\xEDnica Analisa Diagn\xF3sticos", "Central Exames", "Vanguarda Diagn\xF3sticos", "Laborat\xF3rio Imagem Viva"],
    "Cl\xEDnica de Est\xE9tica": ["Cl\xEDnica Est\xE9tica Bella", "Espa\xE7o VIP de Est\xE9tica", "Norte Est\xE9tica Avan\xE7ada", "Cl\xEDnica Toque de Ouro", "Renova Corpo & Rosto"],
    "Cl\xEDnica de Fisioterapia": ["FisioVida Norte de Minas", "Cl\xEDnica Reabilitar", "Movimento & Sa\xFAde Fisioterapia", "Fisio Pilates Montes Claros", "Central da Fisioterapia"],
    "Cl\xEDnica de Psicologia": ["Espa\xE7o do Pensar Psicoterapia", "Cl\xEDnica Mente S\xE3", "Psicologia Integrativa Norte", "Cl\xEDnica Desenvolver", "Equil\xEDbrio Psicoterapia"],
    "Cl\xEDnica M\xE9dica": ["Cl\xEDnica Consulta F\xE1cil", "Centro M\xE9dico Norte de Minas", "Medicina Integrada Montes Claros", "Cl\xEDnica Sa\xFAde & Vida", "Centro M\xE9dico Pr\xF3-Sa\xFAde"],
    "Cl\xEDnica Odontol\xF3gica": ["Sorriso de Ouro Odontologia", "Cl\xEDnica Sorrir Sempre", "Norte de Minas Odonto", "Odontologia Integrada", "Implantes Montes Claros"],
    "Cl\xEDnica Veterin\xE1ria": ["Cl\xEDnica Vet Amigo", "Hospital Veterin\xE1rio Norte", "Pet & Vet Clinica", "Central Veterin\xE1ria", "SOS Vida Animal"],
    "Construtora": ["Construtora Vanguarda", "Engenhar Construtora", "Norte de Minas Empreendimentos", "Solidez Construtora", "Construtora Minas Gerais"],
    "Consultoria Empresarial": ["Foco Consultoria", "Gest\xE3o Nobre Parceiros", "Progresso Consultoria Empresarial", "Norte Minas Business Coach", "Vanguarda Assessoria"],
    "Consult\xF3rios odontol\xF3gicos": ["Consult\xF3rio Geral Odonto", "Dr. Sorriso Consult\xF3rio", "Cl\xEDnica Arte do Trabalho", "Centro Oral Sa\xFAde", "Odontologia de Excel\xEAncia"],
    "Consult\xF3rio Odontol\xF3gico": ["Consult\xF3rio Geral Odonto", "Dr. Sorriso Consult\xF3rio", "Cl\xEDnica Arte do Trabalho", "Centro Oral Sa\xFAde", "Odontologia de Excel\xEAncia"],
    "Corretora de Seguros": ["Norte de Minas Seguros", "Vanguarda Corretora", "L\xEDder Prote\xE7\xE3o Seguros", "Central Minas Seguros", "Viva Bem Corretores"],
    "Corretor de Im\xF3veis": ["Minas Corretor Neg\xF3cios", "Norte de Minas Neg\xF3cios Imobili\xE1rios", "Central Im\xF3veis Montes Claros", "Vanguarda Imobili\xE1ria", "Parceria Lan\xE7amento Im\xF3veis"],
    "Creche": ["Creche Recanto das Crian\xE7as", "Centro de Educa\xE7\xE3o Infantil Sonho Meu", "Creche Arco-\xCDris", "Espa\xE7o Infantil Passo a Passo", "Pequenos Brilhantes"],
    "Curso Online": ["Norte EAD Capacita\xE7\xE3o", "Cursos Alfa Digital", "Minas Ensino Conectado", "Vanguarda Academy", "Educar Web"],
    "Cursos Profissionalizantes": ["Instituto Qualificar", "Norte de Minas Cursos T\xE9cnicos", "Vanguarda Profissional", "Central de Carreiras", "L\xEDder Profiss\xF5es"],
    "Distribuidora": ["Distribuidora Central Montes Claros", "Norte de Minas Distribui\xE7\xE3o", "Distribuidora L\xEDder Bebidas", "Mais Alimentos Distribui\xE7\xE3o", "Forte Atacado"],
    "Distribuidora de Alimentos": ["Distribuidora Nutri Norte", "Norte de Minas Alimentos", "Estrela do Vale Distribuidora", "Central Distribui\xE7\xE3o Alimentos", "Sabor & Log\xEDstica"],
    "E-Commerce": ["Norte Vendas Online", "Portal do Desconto Store", "Minas Express E-commerce", "Vanguarda Shop", "Outlet Norte de Minas"],
    "Empresa de Energia Solar": ["Sol de Minas Energia Solar", "Norte Fotovoltaica", "EcoLuz Energia Renov\xE1vel", "Solar Montes Claros", "Vanguarda Energia Solar"],
    "Empresa de Eventos": ["L\xEDder Produ\xE7\xF5es e Eventos", "Norte Festas & Buffet", "Vanguarda Cerimonial", "Central Eventos Sociais", "Espa\xE7o Vip Festas"],
    "Empresa de Limpeza": ["Facilita Servi\xE7os de Limpeza", "Norte de Minas Conserva\xE7\xE3o", "Limpe Bem Terceiriza\xE7\xE3o", "Brilho de Ouro Higieniza\xE7\xE3o", "Vanguarda Servi\xE7os de Apoio"],
    "Empresa de Marketing": ["Ag\xEAncia Atitude Digital", "Norte Comunica\xE7\xE3o Verbal", "Vanguarda Marketing Estrat\xE9gico", "Espa\xE7o Conex\xE3o Criativa", "L\xEDder Impulsionamento"],
    "Empresa de Software": ["SoftMinas Sistemas de Gest\xE3o", "Vanguarda Tecnologia Inteligente", "Norte Developers", "Code Crafters Montes Claros", "Central Sistemas Web"],
    "Empresa de TI": ["Norte Suporte de TI", "Central Tech Solu\xE7\xF5es", "Vanguarda Infraestrutura TI", "L\xEDder Suporte Inform\xE1tico", "Minas Redes & TI"],
    "Escola Particular": ["Col\xE9gio Vanguarda", "Escola Estrela de Montes Claros", "Col\xE9gio Padr\xE3o de Ensino", "Col\xE9gio Logos de Educa\xE7\xE3o", "Instituto Educacional Progresso"],
    "Escrit\xF3rio de Advocacia": ["Associa\xE7\xE3o de Advogados Montes Claros", "Vanguarda Jur\xEDdica", "Escrit\xF3rio Advogados Associados", "Solu\xE7\xF5es Jur\xEDdicas Norte de Minas", "Central Justi\xE7a & Cidadania"],
    "Escrit\xF3rio de Arquitetura": ["Espa\xE7o & Forma Arquitetura", "Vanguarda Decor & Projetos", "L\xEDder Arquitetura Inteligente", "Studio Arch Montes Claros", "Norte Tra\xE7o Arquitetos"],
    "Escrit\xF3rio de Engenharia": ["Norte Engenharia Estrutural", "Vanguarda Projetos de Engenharia", "Central C\xE1lculos e Projetos", "Minas Engenharia Civil", "L\xEDder Engenheiros Associados"],
    "Faculdade": ["Faculdade Integrada do Norte de Minas", "Instituto de Ensino Superior de Montes Claros", "Vanguarda Faculdade", "Minas Educacional Faculdade", "Centro Universit\xE1rio L\xEDder"],
    "Franquia": ["Franquia Bob's Montes Claros", "Franquia Cacau Show", "Franquia Subway", "Franquia O Botic\xE1rio", "Franquia Ortobom"],
    "Hamburgueria": ["Hamburgueria Blend de Ouro", "Norte Burger Grelhados", "Hamburgueria do Beco", "Vanguarda Hamb\xFArgueres", "Central Burger Prime"],
    "Hospital": ["Hospital Dilson de Quadros Godinho", "Hospital da Santa Casa Montes Claros", "Hospital Universit\xE1rio Clemente de Faria", "Hospital Aroldo Tourinho", "Hospital das Cl\xEDnicas de Montes Claros"],
    "Imobili\xE1ria": ["Imobili\xE1ria Norte de Minas", "Vanguarda Neg\xF3cios Imobili\xE1rios", "Minas Im\xF3veis Montes Claros", "Central Imobili\xE1ria de Aluguel", "Espa\xE7o Lan\xE7amentos Imobili\xE1rios"],
    "Ind\xFAstria": ["Metal\xFArgica Martins Norte", "Estrela Alimentos Ind\xFAstria", "Fia\xE7\xE3o Montes Claros Ltda", "Pl\xE1sticos Minas Embalagens", "Qu\xEDmica L\xEDder Norte de Minas"],
    "Joalheria": ["Joalheria Brilho de Ouro", "Vanguarda J\xF3ias", "\xD3ptica e Joalheria Central", "Norte J\xF3ias Finas", "Luz Sem Fim Joalheiros"],
    "Laborat\xF3rio": ["Laborat\xF3rio Analisa Cl\xEDnico", "Biom\xE9dica Laborat\xF3rio", "Laborat\xF3rio Norte de Minas", "Central de An\xE1lises Cl\xEDnicas", "Vila de Exames Laboratoriais"],
    "Lanchonete": ["Lanchonete do Ponto", "Lanchonete Central", "Norte Gr\xE1fica e Lanches", "Sabor R\xE1pido", "Lanches da Pra\xE7a"],
    "Lava-R\xE1pido": ["Lava-Jato Brilho Centro", "Norte Car Lavagem R\xE1pida", "Lava-R\xE1pido Auto SPA", "Lava-Jato Premium Montes Claros", "Lava R\xE1pido Ecol\xF3gico"],
    "Loja de Cal\xE7ados": ["Norte Cal\xE7ados", "Vila dos P\xE9s Loja", "Passo de Ouro Cal\xE7ados", "P\xE9 Quente Outlet", "Lojas Cal\xE7ados Central"],
    "Loja de Roupas": ["Vanguarda Modas", "Norte de Minas Vestu\xE1rio", "Lojas Estilo Geral", "Bella Moda Montes Claros", "L\xEDder Roupas e Acess\xF3rios"],
    "Oficina Mec\xE2nica": ["Oficina Car Service Montes Claros", "Mec\xE2nica Auto Forte", "Norte Motores Especializados", "Vanguarda Linha Leve", "Central Freios e Embreagens"],
    "\xD3tica": ["\xD3tica Central Montes Claros", "Foco \xD3ptica", "Vis\xE3o de Ouro \xD3tica", "Norte de Minas \xD3ticas", "Vanguarda \xD3culos & Lentes"],
    "Padaria": ["Panificadora Del\xEDcias do Trigo", "Padaria Central", "P\xE3o Quentinho do Bairro", "Padaria Montes Claros", "P\xE3o e Companhia"],
    "Papelaria": ["Papelaria e Livraria Central", "Norte Minas Papelaria", "Vanguarda Estudantil", "L\xE1pis de Cor Artigos Escolares", "L\xEDder Pap\xE9is e C\xF3pias"],
    "Pizzaria": ["Pizzaria Forno de Ouro", "Pizzaria Bella Massa", "Nona Bella Pizzas", "Pizzaria Montes Claros", "Pizzaria Massa Fina"],
    "Restaurante": ["Restaurante Sabor de Minas", "Restaurante Norte Grill", "Panela de Barro Restaurante", "Estrela de Minas Restaurante", "Restaurante Canto Verde"],
    "Revenda de Ve\xEDculos": ["Norte de Minas Ve\xEDculos", "L\xEDder Multimarcas Cars", "Central de Ve\xEDculos Usados", "Vanguarda Seminovos", "Forte Carros Montes Claros"],
    "Startup": ["Minas Tech Hub", "Aceleradora Norte Digital", "AgroSolar Inteligente", "Logtech Montes Claros", "Norte Delivery APP"],
    "Supermercado": ["Supermercado Central de Minas", "Norte Supermercados", "Supermercado do Povo", "Supermercado Mercad\xE3o Nobre", "Economia Total Supermercados"],
    "Transportadora": ["Norte de Minas Express Transportes", "Rapid\xE3o Montes Claros Cargas", "Vanguarda Transportadora", "Central Cargas e Encomendas", "L\xEDder Log\xEDstica de Cargas"]
  };
  const cleanSingular = singular.trim();
  let namesToChoose = specificNames[cleanSingular] || specificNames[category];
  if (!namesToChoose) {
    if (cleanSingular.toLowerCase().startsWith("loja de")) {
      const core = cleanSingular.replace(/loja de /gi, "");
      namesToChoose = [
        `Style ${core}`,
        `Estilo ${core}`,
        `Imp\xE9rio do ${core}`,
        `${cleanSingular} Central`,
        `Norte ${core}`
      ];
    } else if (cleanSingular.toLowerCase().startsWith("cl\xEDnica de")) {
      const core = cleanSingular.replace(/clínica de /gi, "");
      namesToChoose = [
        `Espa\xE7o ${core} & Sa\xFAde`,
        `Cl\xEDnica ${core} Integrada`,
        `${cleanSingular} Montes Claros`,
        `${cleanSingular} de Ouro`,
        `Centro de ${core} Norte`
      ];
    } else {
      const prefixes = ["Grupo", "Premium", "Central", "Norte", "Vanguarda", "Parceiros", "Forte", "Portal"];
      const suffixes = ["Solu\xE7\xF5es", "Gerais", "Norte de Minas", "Associados", "e Filhos", "Distribuidora", "Empreendimentos"];
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
    "Av. Ov\xEDdio de Abreu",
    "Rua Dom Pedro II",
    "Av. Sanit\xE1ria",
    "Rua Presidente John Kennedy"
  ];
  return Array.from({ length: 5 }).map((_, i) => {
    const name = namesToChoose[i % namesToChoose.length];
    const siteBase = name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9 ]/g, "").replace(/\s+/g, "");
    return {
      nome: name,
      cat: category,
      // Retorna com o nome completo original da categoria para perfeita correspondência
      score: Math.floor(Math.random() * 20) + 79,
      // Scores between 79 and 99
      endereco: `${streets[(i + category.length) % streets.length]}, ${150 + i * 85}`,
      cidade: targetCity,
      site: `www.${siteBase}.com.br`,
      tel: `(38) 3215-${3e3 + i * 17}`,
      funcionarios: Math.floor(Math.random() * 32) + 6,
      regime: i % 3 === 0 ? "Lucro Presumido" : i % 3 === 1 ? "Simples Nacional" : "Lucro Real"
    };
  });
}
app.post("/api/generate-prospects", async (req, res) => {
  try {
    const { category, city } = req.body;
    if (!category) {
      return res.status(400).json({ error: "Categoria \xE9 necess\xE1ria para a busca." });
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
    const categoryTerms = singularCategory.toLowerCase() !== category.toLowerCase() ? `"${category}" (ou no singular "${singularCategory}")` : `"${category}"`;
    const prompt = `Gere uma lista de 5 empresas reais ou altamente veross\xEDmeis que atuam comercialmente na categoria ${categoryTerms} na cidade de "${targetCity}", estado de Minas Gerais (Norte de Minas). Forne\xE7a nomes de neg\xF3cios reais de ${targetCity} (ou altamente plaus\xEDveis para a regi\xE3o) de forma que soem extremamente naturais na fala local cotidiana em portugu\xEAs.
Retorne APENAS um vetor JSON v\xE1lido contendo objetos estruturados exatamente dessa forma, com chaves e strings entre aspas duplas, sem coment\xE1rios e sem formata\xE7\xF5es adicionais:
[
  {
    "nome": "Nome Fantasia da Empresa",
    "cat": "${category}",
    "score": um n\xFAmero inteiro entre 75 e 98 (quanto maior o score, mais propensa a contratar assessoria Nobel),
    "endereco": "Um endere\xE7o plaus\xEDvel (ex: Av. Sanit\xE1ria, 1200)",
    "cidade": "${targetCity}",
    "site": "site plausivel correspondente (ex: www.empresa.com.br)",
    "tel": "um telefone comercial plaus\xEDvel com DDD 38, ex: (38) 3221-4122 ou similar",
    "funcionarios": um n\xFAmero inteiro entre 2 e 60,
    "regime": "Simples Nacional" ou "Lucro Presumido" ou "Lucro Real"
  }
]
Retorne apenas o JSON bruto v\xE1lido, sem sintaxes adicionais, sem markdown (N\xC3O use o bloco de c\xF3digo \`\`\`json nas marca\xE7\xF5es, apenas retorne o texto correspondente ao JSON).`;
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt
    });
    let text = response.text || "";
    text = text.replace(/```json/gi, "").replace(/```/gi, "").trim();
    const data = JSON.parse(text);
    if (Array.isArray(data)) {
      res.json({ prospects: data });
    } else {
      throw new Error("Resposta do modelo n\xE3o \xE9 um array v\xE1lido.");
    }
  } catch (err) {
    console.error("AI prospects generation failed (using fallback generator):", err);
    const simulated = generateFallbackProspects(req.body.category, req.body.city || "Montes Claros");
    res.json({ prospects: simulated });
  }
});
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await (0, import_vite.createServer)({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    const distPath = import_path.default.join(process.cwd(), "dist");
    app.use(import_express.default.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(import_path.default.join(distPath, "index.html"));
    });
  }
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server executing at http://localhost:${PORT}`);
  });
}
startServer();
//# sourceMappingURL=server.cjs.map
