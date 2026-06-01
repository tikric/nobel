'use client';

import * as React from "react";
import {
  MapPin,
  Search,
  Filter,
  Plus,
  MoreHorizontal,
  Users,
  Target,
  TrendingUp,
  Phone,
  Mail,
  Building2,
  ChevronRight,
  Send,
  Award,
  Sparkles,
  ChevronLeft,
  ArrowUpRight,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
import { mockProspects, cidadesNorteMinas, categoriasProspect } from "@/lib/mock-data";

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 0,
  }).format(value);
};

const etapaConfig: Record<string, { label: string; color: string; bgColor: string }> = {
  ContatoInicial: { label: "Contato Inicial", color: "text-blue-700", bgColor: "bg-blue-100" },
  PropostaEnviada: { label: "Proposta Enviada", color: "text-amber-700", bgColor: "bg-amber-100" },
  Negociacao: { label: "Negociacao", color: "text-purple-700", bgColor: "bg-purple-100" },
  FechadoGanho: { label: "Fechado Ganho", color: "text-emerald-700", bgColor: "bg-emerald-100" },
  FechadoPerdido: { label: "Fechado Perdido", color: "text-slate-700", bgColor: "bg-slate-100" },
};

const canalConfig: Record<string, { label: string }> = {
  Indicacao: { label: "Indicacao" },
  Google: { label: "Google" },
  ColdCall: { label: "Cold Call" },
  Redes: { label: "Redes Sociais" },
  Evento: { label: "Evento" },
};

export default function ProspeccaoPage() {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [etapaFilter, setEtapaFilter] = React.useState<string>("all");
  const [cidadeFilter, setCidadeFilter] = React.useState<string>("all");
  const [ativaTab, setAtivaTab] = React.useState("kanban");

  // Estados para as categorias
  const [searchTermCategorias, setSearchTermCategorias] = React.useState("");
  const [sectorFilterCategorias, setSectorFilterCategorias] = React.useState("all");
  const [paginaCategorias, setPaginaCategorias] = React.useState(1);

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
      const matchesSearch = cat.nome.toLowerCase().includes(searchTermCategorias.toLowerCase()) || 
                            cat.setor.toLowerCase().includes(searchTermCategorias.toLowerCase());
      const matchesSector = sectorFilterCategorias === "all" || cat.setor === sectorFilterCategorias;
      return matchesSearch && matchesSector;
    });
  }, [mappedCategories, searchTermCategorias, sectorFilterCategorias]);

  const itensPorPagina = 10;
  const totalPaginas = Math.ceil(categoriasFiltradas.length / itensPorPagina);
  const categoriasPaginadas = React.useMemo(() => {
    const inicio = (paginaCategorias - 1) * itensPorPagina;
    return categoriasFiltradas.slice(inicio, inicio + itensPorPagina);
  }, [categoriasFiltradas, paginaCategorias]);

  React.useEffect(() => {
    setPaginaCategorias(1);
  }, [searchTermCategorias, sectorFilterCategorias]);

  // Estatisticas
  const totalProspects = mockProspects.length;
  const emNegociacao = mockProspects.filter(p => p.etapa === "Negociacao").length;
  const fechados = mockProspects.filter(p => p.etapa === "FechadoGanho").length;
  const totalPotencial = mockProspects.reduce((acc, p) => acc + p.faturamentoEstimado, 0);

  // Metricas
  const metaMensal = 50000;
  const realizado = mockProspects
    .filter(p => p.etapa === "FechadoGanho")
    .reduce((acc, p) => acc + p.faturamentoEstimado * 0.7, 0);
  const progressoMeta = (realizado / metaMensal) * 100;

  // Prospects por etapa para kanban
  const prospectsPorEtapa = {
    ContatoInicial: mockProspects.filter(p => p.etapa === "ContatoInicial"),
    PropostaEnviada: mockProspects.filter(p => p.etapa === "PropostaEnviada"),
    Negociacao: mockProspects.filter(p => p.etapa === "Negociacao"),
    FechadoGanho: mockProspects.filter(p => p.etapa === "FechadoGanho"),
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Prospeccao de Clientes</h2>
          <p className="text-muted-foreground">
            Norte de Minas Gerais - Captacao de novos clientes
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            Exportar Lista
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Novo Prospect
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg">
              <DialogHeader>
                <DialogTitle>Novo Prospect</DialogTitle>
                <DialogDescription>
                  Cadastre um novo prospect para prospeccao
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <label className="text-sm font-medium">Nome da Empresa</label>
                  <Input placeholder="Nome da empresa" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <label className="text-sm font-medium">CNPJ (opcional)</label>
                    <Input placeholder="00.000.000/0001-00" />
                  </div>
                  <div className="grid gap-2">
                    <label className="text-sm font-medium">Cidade</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        {cidadesNorteMinas.slice(0, 10).map((cidade) => (
                          <SelectItem key={cidade} value={cidade}>{cidade}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid gap-2">
                  <label className="text-sm font-medium">Categoria</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      {categoriasProspect.slice(0, 20).map((cat) => (
                        <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <label className="text-sm font-medium">Contato</label>
                    <Input placeholder="Nome do contato" />
                  </div>
                  <div className="grid gap-2">
                    <label className="text-sm font-medium">Telefone</label>
                    <Input placeholder="(00) 99999-9999" />
                  </div>
                </div>
                <Button className="w-full mt-4">Cadastrar Prospect</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Cards de estatisticas */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-blue-500/10">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Prospects</p>
                <p className="text-2xl font-bold">{totalProspects}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-purple-500/10">
                <TrendingUp className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Em Negociacao</p>
                <p className="text-2xl font-bold text-purple-600">{emNegociacao}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-emerald-500/10">
                <Target className="h-6 w-6 text-emerald-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Fechados</p>
                <p className="text-2xl font-bold text-emerald-600">{fechados}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-amber-500/10">
                <MapPin className="h-6 w-6 text-amber-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Potencial Total</p>
                <p className="text-2xl font-bold text-amber-600">{formatCurrency(totalPotencial)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Meta mensal */}
      <Card className="border-[#16A085]/30 bg-emerald-50/50 dark:bg-emerald-950/20">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="font-semibold">Meta de Captacao Mensal</p>
              <p className="text-sm text-muted-foreground">
                {formatCurrency(realizado)} de {formatCurrency(metaMensal)} ({progressoMeta.toFixed(0)}%)
              </p>
            </div>
            <Badge className="bg-emerald-500 text-white">{progressoMeta.toFixed(0)}% atingido</Badge>
          </div>
          <div className="h-3 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-emerald-500 rounded-full transition-all"
              style={{ width: `${Math.min(progressoMeta, 100)}%` }}
            />
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs value={ativaTab} onValueChange={setAtivaTab}>
        <TabsList>
          <TabsTrigger value="kanban">Kanban</TabsTrigger>
          <TabsTrigger value="lista">Lista</TabsTrigger>
          <TabsTrigger value="categorias">100 Melhores Categorias</TabsTrigger>
          <TabsTrigger value="mapa">Mapa</TabsTrigger>
        </TabsList>

        {/* Kanban */}
        <TabsContent value="kanban" className="mt-6">
          <div className="grid gap-4 md:grid-cols-4">
            {Object.entries(prospectsPorEtapa).map(([etapa, prospects]) => (
              <div key={etapa} className="space-y-3">
                <div className={`px-3 py-2 rounded-lg ${etapaConfig[etapa]?.bgColor}`}>
                  <div className="flex items-center justify-between">
                    <span className={`font-semibold text-sm ${etapaConfig[etapa]?.color}`}>
                      {etapaConfig[etapa]?.label}
                    </span>
                    <Badge variant="outline" className={etapaConfig[etapa]?.color}>
                      {prospects.length}
                    </Badge>
                  </div>
                </div>
                <div className="space-y-2 min-h-[200px]">
                  {prospects.map((prospect) => (
                    <Card key={prospect.id} className="cursor-pointer hover:shadow-md transition-shadow">
                      <CardContent className="p-3">
                        <p className="font-medium text-sm mb-1">{prospect.nomeEmpresa}</p>
                        <p className="text-xs text-muted-foreground mb-2">{prospect.categoria}</p>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-muted-foreground flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {prospect.cidade}
                          </span>
                          <Badge variant="outline" className="text-xs">
                            {prospect.scorePotencial}%
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        {/* Lista */}
        <TabsContent value="lista" className="mt-6">
          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <CardTitle>Todos os Prospects</CardTitle>
                  <CardDescription>
                    Lista completa de prospects cadastrados
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Buscar prospect..."
                      className="pl-10 w-[200px]"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <Select value={etapaFilter} onValueChange={setEtapaFilter}>
                    <SelectTrigger className="w-[160px]">
                      <SelectValue placeholder="Etapa" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todas Etapas</SelectItem>
                      <SelectItem value="ContatoInicial">Contato Inicial</SelectItem>
                      <SelectItem value="PropostaEnviada">Proposta Enviada</SelectItem>
                      <SelectItem value="Negociacao">Negociacao</SelectItem>
                      <SelectItem value="FechadoGanho">Fechado Ganho</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Empresa</TableHead>
                    <TableHead>Categoria</TableHead>
                    <TableHead>Cidade</TableHead>
                    <TableHead>Faturamento</TableHead>
                    <TableHead>Canal</TableHead>
                    <TableHead>Score</TableHead>
                    <TableHead>Etapa</TableHead>
                    <TableHead className="w-[50px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockProspects.map((prospect) => (
                    <TableRow key={prospect.id}>
                      <TableCell className="font-medium">
                        <div>
                          <p>{prospect.nomeEmpresa}</p>
                          <p className="text-xs text-muted-foreground">{prospect.contato}</p>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm">{prospect.categoria}</TableCell>
                      <TableCell className="text-sm">{prospect.cidade}</TableCell>
                      <TableCell className="font-semibold">
                        {formatCurrency(prospect.faturamentoEstimado)}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{canalConfig[prospect.canal]?.label}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-10 bg-muted rounded-full overflow-hidden">
                            <div
                              className="h-full bg-[#16A085] rounded-full"
                              style={{ width: `${prospect.scorePotencial}%` }}
                            />
                          </div>
                          <span className="text-xs">{prospect.scorePotencial}%</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={`${etapaConfig[prospect.etapa]?.bgColor} ${etapaConfig[prospect.etapa]?.color}`}>
                          {etapaConfig[prospect.etapa]?.label}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Novidade: As 100 Melhores Categorias */}
        <TabsContent value="categorias" className="mt-6 space-y-6">
          <div className="grid gap-4 md:grid-cols-4">
            <Card className="bg-emerald-500/10 border-emerald-500/20 text-emerald-950 dark:text-emerald-100">
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-emerald-500/20">
                    <Award className="h-6 w-6 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground font-medium">Categorias Analisadas</p>
                    <p className="text-2xl font-bold">100 Nichos</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-amber-500/10 border-amber-500/20 text-amber-950 dark:text-amber-100">
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-amber-500/20">
                    <Sparkles className="h-6 w-6 text-amber-600" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground font-medium">Melhores Setores</p>
                    <p className="text-lg font-bold">Agronegócio & Saúde</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-blue-500/10 border-blue-500/20 text-blue-950 dark:text-blue-100">
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-blue-500/20">
                    <TrendingUp className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground font-medium">Score Médio</p>
                    <p className="text-2xl font-bold">86.2 / 100</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-purple-500/10 border-purple-500/20 text-purple-950 dark:text-purple-100">
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-purple-500/20">
                    <MapPin className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground font-medium">Foco Regional</p>
                    <p className="text-base font-bold">Norte de Minas</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader className="pb-4">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <CardTitle className="text-xl font-bold flex items-center gap-2 text-slate-900 dark:text-slate-100">
                    <Award className="h-5 w-5 text-amber-500" />
                    Ranking de Inteligência: As 100 Melhores Categorias de Prospecção
                  </CardTitle>
                  <CardDescription>
                    Nesta aba você encontra listadas, ordenadas por score de potencial de fechamento e ticket médio de honorários, as 100 melhores categorias estratégicas para prospecção B2B da Contabilidade Nobel no Norte de Minas.
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-3 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Filtrar por nome da categoria..."
                    className="pl-10 h-10 w-full"
                    value={searchTermCategorias}
                    onChange={(e) => setSearchTermCategorias(e.target.value)}
                  />
                </div>
                <div className="w-full sm:w-[240px]">
                  <Select value={sectorFilterCategorias} onValueChange={setSectorFilterCategorias}>
                    <SelectTrigger className="h-10">
                      <SelectValue placeholder="Filtrar por Setor" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos os Setores (100)</SelectItem>
                      <SelectItem value="Agronegócio">Agronegócio</SelectItem>
                      <SelectItem value="Saúde">Saúde</SelectItem>
                      <SelectItem value="Construção Civil">Construção Civil</SelectItem>
                      <SelectItem value="Tecnologia">Tecnologia</SelectItem>
                      <SelectItem value="Educação">Educação</SelectItem>
                      <SelectItem value="Alimentação">Alimentação</SelectItem>
                      <SelectItem value="Comércio Varejista">Comércio Varejista</SelectItem>
                      <SelectItem value="Profissionais Liberais">Profissionais Liberais</SelectItem>
                      <SelectItem value="Entretenimento & Terceiro Setor">Entretenimento & Terceiro Setor</SelectItem>
                      <SelectItem value="Serviços Gerais">Serviços Gerais</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {categoriasFiltradas.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground border border-dashed rounded-lg">
                  Nenhuma categoria encontrada para os critérios de busca selecionados.
                </div>
              ) : (
                <>
                  <div className="rounded-md border overflow-x-auto">
                    <Table>
                      <TableHeader className="bg-slate-50 dark:bg-slate-900/40">
                        <TableRow>
                          <TableHead className="w-[80px] font-bold text-center">Rank</TableHead>
                          <TableHead className="min-w-[200px] font-bold">Categoria Econômica</TableHead>
                          <TableHead className="font-bold">Setor Alvo</TableHead>
                          <TableHead className="font-bold">Regime Tributário Provável</TableHead>
                          <TableHead className="font-bold text-center">Score Potencial</TableHead>
                          <TableHead className="font-bold text-right">Honorários Estimados</TableHead>
                          <TableHead className="font-bold text-center">Demanda</TableHead>
                          <TableHead className="w-[140px] font-bold text-center">Ação</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {categoriasPaginadas.map((cat) => {
                          let badgeBg = "bg-emerald-500/10 text-emerald-700 hover:bg-emerald-500/15";
                          if (cat.score < 80) badgeBg = "bg-blue-500/10 text-blue-700 hover:bg-blue-500/15";
                          if (cat.score < 75) badgeBg = "bg-slate-500/10 text-slate-700 hover:bg-slate-500/15";

                          return (
                            <TableRow key={cat.nome} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/20">
                              <TableCell className="font-mono font-bold text-center text-slate-600 dark:text-slate-400">
                                <span className={`inline-flex items-center justify-center w-7 h-7 rounded-full text-xs ${
                                  cat.rank <= 3 
                                    ? "bg-amber-500 text-white font-black shadow-sm" 
                                    : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                                }`}>
                                  #{cat.rank}
                                </span>
                              </TableCell>
                              <TableCell className="font-medium text-slate-900 dark:text-slate-100">
                                {cat.nome}
                              </TableCell>
                              <TableCell>
                                <Badge variant="outline" className="text-xs bg-slate-50/50">
                                  {cat.setor}
                                </Badge>
                              </TableCell>
                              <TableCell className="text-xs text-slate-600 dark:text-slate-400">
                                {cat.regime}
                              </TableCell>
                              <TableCell className="text-center font-bold">
                                <span className={`px-2 py-1 rounded text-xs ${badgeBg}`}>
                                  {cat.score}%
                                </span>
                              </TableCell>
                              <TableCell className="text-right font-semibold text-emerald-600 dark:text-emerald-400">
                                {new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(cat.honorarios)}/mês
                              </TableCell>
                              <TableCell className="text-center">
                                <span className={`inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full font-medium ${
                                  cat.demanda === 'Alta' 
                                    ? "bg-rose-50 text-rose-700 dark:bg-rose-950/20 dark:text-rose-400" 
                                    : "bg-amber-50 text-amber-700 dark:bg-amber-950/20 dark:text-amber-400"
                                }`}>
                                  {cat.demanda}
                                </span>
                              </TableCell>
                              <TableCell className="text-center">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="h-8 text-xs font-semibold hover:bg-emerald-500 hover:text-white transition-all border border-[#0C3E26]/10 gap-1"
                                  onClick={() => toast.success(`Campanha de prospecção iniciada com sucesso na região para o nicho de "${cat.nome}"!`)}
                                >
                                  Prospectar
                                  <ArrowUpRight className="h-3.5 w-3.5" />
                                </Button>
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </div>

                  {totalPaginas > 1 && (
                    <div className="flex items-center justify-between mt-4 pt-2">
                      <span className="text-xs text-muted-foreground">
                        Mostrando {((paginaCategorias - 1) * itensPorPagina) + 1} a {Math.min(paginaCategorias * itensPorPagina, categoriasFiltradas.length)} de {categoriasFiltradas.length} nichos mapeados.
                      </span>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setPaginaCategorias(p => Math.max(1, p - 1))}
                          disabled={paginaCategorias === 1}
                          className="h-8"
                        >
                          <ChevronLeft className="h-4 w-4 mr-1" /> Anterior
                        </Button>
                        <div className="flex items-center gap-1 font-mono text-xs">
                          {Array.from({ length: Math.min(5, totalPaginas) }, (_, i) => {
                            let num = i + 1;
                            if (paginaCategorias > 3 && totalPaginas > 5) {
                              num = paginaCategorias - 3 + i;
                              if (num + (4 - i) > totalPaginas) {
                                num = totalPaginas - 4 + i;
                              }
                            }
                            return (
                              <Button
                                key={num}
                                variant={paginaCategorias === num ? "default" : "outline"}
                                size="sm"
                                className="h-8 w-8 p-0"
                                onClick={() => setPaginaCategorias(num)}
                              >
                                {num}
                              </Button>
                            );
                          })}
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setPaginaCategorias(p => Math.min(totalPaginas, p + 1))}
                          disabled={paginaCategorias === totalPaginas}
                          className="h-8"
                        >
                          Próxima <ChevronRight className="h-4 w-4 ml-1" />
                        </Button>
                      </div>
                    </div>
                  )}
                </>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Mapa */}
        <TabsContent value="mapa" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-[#0F3460]" />
                Mapa de Prospeccao - Norte de Minas
              </CardTitle>
              <CardDescription>
                Distribuicao geografica dos prospects e clientes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[500px] bg-muted/50 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                  <p className="text-lg font-semibold">Mapa Interativo</p>
                  <p className="text-sm text-muted-foreground">
                    Integração com mapa em desenvolvimento
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
