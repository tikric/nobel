'use client';

import * as React from "react";
import {
  Brain,
  Send,
  Copy,
  Check,
  Sparkles,
  Bot,
  Zap,
  Clock,
  ChevronDown,
  FileText,
  Mail,
  Calculator,
  TrendingUp,
  Users,
  MessageSquare,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { mockClientes } from "@/lib/mock-data";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  model?: string;
}

// Modelos de IA disponiveis
const modelos = [
  { id: "groq-llama", nome: "Groq - Llama 3 70B", provedor: "GROQ", descricao: "Modelo rapido e eficiente" },
  { id: "groq-mixtral", nome: "Groq - Mixtral 8x7B", provedor: "GROQ", descricao: "Excelente para analise" },
  { id: "gemini", nome: "Google Gemini 1.5 Flash", provedor: "GEMINI", descricao: "Melhor para documentos" },
  { id: "huggingface", nome: "HuggingFace Mixtral", provedor: "HF", descricao: "Backup e tarefas leves" },
  { id: "cohere", nome: "Cohere Command R", provedor: "COHERE", descricao: "Analise de textos" },
];

// Prompts pre-configurados
const promptsPreConfigurados = [
  {
    titulo: "Analisar Rentabilidade",
    descricao: "Analise a rentabilidade deste cliente",
    icone: TrendingUp,
    prompt: "Analise a rentabilidade deste cliente considerando: receita gerada vs custo de atendimento, margem de contribuicao e sugestoes de reajuste.",
  },
  {
    titulo: "Gerar E-mail de Cobranca",
    descricao: "Crie um e-mail profissional de cobranca",
    icone: Mail,
    prompt: "Gere um e-mail profissional de cobranca para cliente inadimplente, incluindo: educacao, prazos, consequencias e canal de contato.",
  },
  {
    titulo: "Obrigacoes Fiscais",
    descricao: "Liste as obrigacoes do mes",
    icone: FileText,
    prompt: "Liste todas as obrigacoes fiscais que vencem este mes (SPED, DCTF, DEFIS, GPS, FGTS) com prazos e orientacoes.",
  },
  {
    titulo: "Sugerir Reajuste",
    descricao: "Calcule e sugira reajuste de honorarios",
    icone: Calculator,
    prompt: "Baseado no historico e no porte da empresa, sugira um percentual de reajuste de honorarios com justificativa.",
  },
  {
    titulo: "Proposta Comercial",
    descricao: "Crie proposta para novo cliente",
    icone: Users,
    prompt: "Crie uma proposta comercial personalizada incluindo: servicos oferecidos, precos, prazos e beneficios.",
  },
  {
    titulo: "Custo Hora",
    descricao: "Calcule custo hora de atendimento",
    icone: Clock,
    prompt: "Calcule o custo hora de atendimento para este cliente considerando: tempo medio de atendimento, custo da equipe e encargos.",
  },
];

const corProvedor: Record<string, string> = {
  GROQ: "bg-orange-500/10 text-orange-700 border-orange-500/20",
  GEMINI: "bg-blue-500/10 text-blue-700 border-blue-500/20",
  HF: "bg-yellow-500/10 text-yellow-700 border-yellow-500/20",
  COHERE: "bg-teal-500/10 text-teal-700 border-teal-500/20",
};

// Respostas simuladas
const respostasSimuladas: Record<string, string> = {
  default: `Com base nos dados do cliente, aqui esta a analise:

**Indicadores Financeiros:**
- Receita mensal: R$ 3.500,00
- Custo de atendimento estimado: R$ 1.800,00
- Margem de contribuicao: 48,6%

**Analise:**
O cliente apresenta uma margem saudavel acima da media do escritorio (33,8%). O custo de atendimento esta dentro dos parametros esperados para empresas de porte medio.

**Sugestoes:**
1. Manter o monitoramento mensal da margem
2. Considerar reajuste de 8-10% no proximo contrato
3. Avaliar oportunidades de cross-selling em servicos de fiscal

**Conclusao:**
Cliente com perfil de alta rentabilidade. Manter relacionamento e buscar expansao de servicos.`,
  cobranca: `Prezado(a) cliente,

Espero que esta mensagem o encontre bem.

Gostaríamos de informar que identificamos uma pendência financeira em sua conta, referente aos honorários do mês anterior.

**Resumo da Pendência:**
- Valor: R$ 1.800,00
- Vencimento: 05/05/2025
- Dias em atraso: 25

Solicitamos que o pagamento seja realizado até o dia 15/06/2025 para evitar a aplicacao de juros e a suspensao dos servicos.

Para sua comodidade, oferecemos as seguintes opcoes de pagamento:
- Transferencia bancaria
- PIX
- Boleto

Caso ja tenha realizado o pagamento, por favor desconsidere esta mensagem.

Estamos a disposicao para qualquer esclarecimento.

Atenciosamente,
Contabilidade Nobel`,
  obrigacoes: `**Obrigacoes Fiscais - Junho 2025:**

| Obrigacao | Prazo | Status |
|-----------|-------|--------|
| EFD-Contribuicoes | 10/06 | Pendente |
| SPED Fiscal | 15/06 | Pendente |
| GPS INSS | 20/06 | Pendente |
| FGTS | 07/06 | Enviado |
| DCTFWeb | 25/06 | Pendente |
| ECF | 30/06 | Pendente |
| DEFIS | 30/06 | Pendente |

**Observacoes:**
- Atencao especial para o SPED Fiscal que envolve 3 clientes
- DCTFWeb deve ser enviada ate o dia 25 com todos os recolhimentos
- ECF e DEFIS sao anuais mas也有很多 Details a serem preenchidos`,
};

export default function IAPage() {
  const [messages, setMessages] = React.useState<Message[]>([]);
  const [input, setInput] = React.useState("");
  const [selectedModel, setSelectedModel] = React.useState(modelos[0]);
  const [selectedCliente, setSelectedCliente] = React.useState<string>("all");
  const [isLoading, setIsLoading] = React.useState(false);
  const [copiedId, setCopiedId] = React.useState<string | null>(null);
  const [showPrompts, setShowPrompts] = React.useState(true);
  const scrollRef = React.useRef<HTMLDivElement>(null);

  const handleSend = async (promptTexto?: string) => {
    const texto = promptTexto || input;
    if (!texto.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: texto,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Simular resposta da IA
    setTimeout(() => {
      let resposta = respostasSimuladas.default;
      if (texto.toLowerCase().includes("cobranca")) {
        resposta = respostasSimuladas.cobranca;
      } else if (texto.toLowerCase().includes("obrigac") || texto.toLowerCase().includes("fiscal")) {
        resposta = respostasSimuladas.obrigacoes;
      }

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: resposta,
        timestamp: new Date(),
        model: selectedModel.nome,
      };

      setMessages((prev) => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  React.useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex h-[calc(100vh-8rem)] gap-6">
      {/* Painel de Prompts */}
      {showPrompts && (
        <Card className="w-80 flex-shrink-0 hidden lg:flex flex-col">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-[#16A085]" />
              Prompts Rapidos
            </CardTitle>
            <CardDescription>
              Selecione um prompt pre-configurado
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-1 overflow-auto">
            <ScrollArea className="h-full">
              <div className="space-y-2">
                {promptsPreConfigurados.map((prompt) => (
                  <button
                    key={prompt.titulo}
                    onClick={() => handleSend(prompt.prompt)}
                    className="w-full text-left p-3 rounded-lg border hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <prompt.icone className="h-5 w-5 text-[#0F3460]" />
                      <div>
                        <p className="font-medium text-sm">{prompt.titulo}</p>
                        <p className="text-xs text-muted-foreground">{prompt.descricao}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      )}

      {/* Chat Principal */}
      <Card className="flex-1 flex flex-col">
        <CardHeader className="pb-3 border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-[#0F3460]">
                <Brain className="h-5 w-5 text-white" />
              </div>
              <div>
                <CardTitle className="text-lg">Assistente IA Contabil</CardTitle>
                <CardDescription>
                  IA gratuita para analise e assistencia
                </CardDescription>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Select
                value={selectedCliente}
                onValueChange={setSelectedCliente}
              >
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Contexto do cliente" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Sem contexto</SelectItem>
                  {mockClientes.map((cliente) => (
                    <SelectItem key={cliente.id} value={cliente.id}>
                      {cliente.nome}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select
                value={selectedModel.id}
                onValueChange={(v) => setSelectedModel(modelos.find(m => m.id === v) || modelos[0])}
              >
                <SelectTrigger className="w-[220px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {modelos.map((model) => (
                    <SelectItem key={model.id} value={model.id}>
                      <div className="flex items-center gap-2">
                        <span>{model.nome}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowPrompts(!showPrompts)}
              >
                <ChevronDown className={`h-4 w-4 transition-transform ${showPrompts ? "rotate-180" : ""}`} />
              </Button>
            </div>
          </div>
        </CardHeader>

        {/* Mensagens */}
        <CardContent className="flex-1 flex flex-col p-0">
          <ScrollArea className="flex-1 p-4">
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <div className="p-4 rounded-full bg-muted mb-4">
                  <Bot className="h-12 w-12 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Bem-vindo ao Assistente IA</h3>
                <p className="text-sm text-muted-foreground max-w-md">
                  Selecione um prompt rapido ao lado ou digite sua pergunta abaixo.
                  Posso ajudar com analise de rentabilidade, geracao de e-mails,
                  obrigacoes fiscais e muito mais.
                </p>
                <div className="flex gap-2 mt-4">
                  <Badge className={corProvedor[selectedModel.provedor]}>
                    {selectedModel.provedor}
                  </Badge>
                  <Badge variant="outline">{selectedModel.descricao}</Badge>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg p-4 ${
                        message.role === "user"
                          ? "bg-[#0F3460] text-white"
                          : "bg-muted"
                      }`}
                    >
                      {message.role === "assistant" && (
                        <div className="flex items-center gap-2 mb-2">
                          <Bot className="h-4 w-4" />
                          <span className="text-xs font-medium">Assistente IA</span>
                          {message.model && (
                            <Badge variant="outline" className="text-xs">
                              {message.model}
                            </Badge>
                          )}
                        </div>
                      )}
                      <div className="prose prose-sm dark:prose-invert max-w-none">
                        <p className="whitespace-pre-wrap">{message.content}</p>
                      </div>
                      <div className="flex items-center justify-between mt-2 pt-2 border-t border-current/10">
                        <span className={`text-xs ${
                          message.role === "user" ? "text-white/60" : "text-muted-foreground"
                        }`}>
                          {message.timestamp.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}
                        </span>
                        {message.role === "assistant" && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyToClipboard(message.content, message.id)}
                          >
                            {copiedId === message.id ? (
                              <>
                                <Check className="h-3 w-3 mr-1" />
                                Copiado
                              </>
                            ) : (
                              <>
                                <Copy className="h-3 w-3 mr-1" />
                                Copiar
                              </>
                            )}
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-muted rounded-lg p-4">
                      <div className="flex items-center gap-2">
                        <Bot className="h-4 w-4 animate-pulse" />
                        <span className="text-sm text-muted-foreground">
                          Digitando...
                        </span>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={scrollRef} />
              </div>
            )}
          </ScrollArea>

          {/* Input */}
          <div className="p-4 border-t">
            <div className="flex gap-2">
              <Input
                placeholder="Digite sua pergunta..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                className="flex-1"
              />
              <Button onClick={() => handleSend()} disabled={isLoading || !input.trim()}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-2 text-center">
              Respostas geradas por IA - Verifique as informacoes antes de usar
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
