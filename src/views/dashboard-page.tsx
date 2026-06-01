'use client';

import * as React from "react";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
  AlertCircle,
  Wallet,
  Target,
  Building2,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  Clock,
  CheckCircle,
  AlertTriangle,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { mockDashboard, dadosFaturamento12Meses, dadosReceitaPorServico, dadosCrescimentoClientes, dadosProdutividade, mockTarefas, mockObrigacoesFiscais, mockClientes } from "@/lib/mock-data";

// Formatadores de moeda
const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

const formatPercent = (value: number) => {
  return `${value.toFixed(1)}%`;
};

// Componente de KPI Card
function KPICard({
  title,
  value,
  subtitle,
  trend,
  trendValue,
  icon: Icon,
  color,
}: {
  title: string;
  value: string;
  subtitle?: string;
  trend?: "up" | "down" | "stable";
  trendValue?: string;
  icon: React.ElementType;
  color: string;
}) {
  return (
    <Card className="relative overflow-hidden w-full">
      <CardContent className="p-4 sm:p-6">
        <div className="flex items-start justify-between gap-2">
          <div className="space-y-1.5 min-w-0 flex-1">
            <p className="text-xs sm:text-sm font-medium text-muted-foreground truncate">{title}</p>
            <h3 className="text-[15px] sm:text-xl md:text-2xl font-black text-current truncate" title={value}>{value}</h3>
            {subtitle && (
              <p className="text-[10px] sm:text-xs text-muted-foreground truncate">{subtitle}</p>
            )}
            {trend && trendValue && (
              <div className={`flex items-center gap-1 text-[10px] sm:text-xs font-medium ${
                trend === "up" ? "text-emerald-600" : trend === "down" ? "text-red-600" : "text-slate-500"
              } truncate`}>
                {trend === "up" ? (
                  <ArrowUpRight className="h-3 w-3 shrink-0" />
                ) : (
                  <ArrowDownRight className="h-3 w-3 shrink-0" />
                )}
                <span>{trendValue}</span>
              </div>
            )}
          </div>
          <div className={`p-2 sm:p-3 rounded-xl ${color} shrink-0`}>
            <Icon className="h-4.5 w-4.5 sm:h-6 sm:w-6 text-white" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Componente de alerta
function AlertCard({
  tipo,
  titulo,
  descricao,
  prazo,
  prioridade,
}: {
  key?: string;
  tipo: "tarefa" | "obrigacao" | "inadimplencia";
  titulo: string;
  descricao?: string;
  prazo?: string;
  prioridade?: string;
}) {
  const colors = {
    tarefa: "bg-blue-500/10 border-blue-500/20",
    obrigacao: "bg-amber-500/10 border-amber-500/20",
    inadimplencia: "bg-red-500/10 border-red-500/20",
  };

  const icons = {
    tarefa: Clock,
    obrigacao: AlertTriangle,
    inadimplencia: AlertCircle,
  };

  const Icon = icons[tipo];

  return (
    <div className={`p-4 rounded-lg border ${colors[tipo]}`}>
      <div className="flex items-start gap-3">
        <Icon className={`h-5 w-5 mt-0.5 ${
          tipo === "tarefa" ? "text-blue-600" :
          tipo === "obrigacao" ? "text-amber-600" : "text-red-600"
        }`} />
        <div className="flex-1 space-y-1">
          <p className="text-sm font-medium">{titulo}</p>
          {descricao && (
            <p className="text-xs text-muted-foreground">{descricao}</p>
          )}
          <div className="flex items-center gap-2">
            {prazo && (
              <Badge variant="outline" className="text-xs">
                {prazo}
              </Badge>
            )}
            {prioridade && (
              <Badge variant={prioridade === "Critica" ? "destructive" : "secondary"} className="text-xs">
                {prioridade}
              </Badge>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const [periodo, setPeriodo] = React.useState("12meses");
  const dashboard = mockDashboard;

  // Clientes inadimplentes
  const clientesInadimplentes = mockClientes.filter(c =>
    mockTarefas.some(t => t.clienteId === c.id && t.status === 'Atrasada')
  );

  // Meta de faturamento
  const metaFaturamento = 185000;
  const realizadoFaturamento = dashboard.faturamentoMensal;
  const percentualMeta = (realizadoFaturamento / metaFaturamento) * 100;

  // Gastos fixos vs ponto de equilibrio
  const pontoEquilibrio = dashboard.custoFixoMensal;
  const gastoAtual = dashboard.custoFixoMensal + (dashboard.faturamentoMensal - dashboard.honorariosRecebidos);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Dashboard Executivo</h2>
          <p className="text-muted-foreground">
            Visao geral do desempenho do escritorio
          </p>
        </div>
        <Select value={periodo} onValueChange={setPeriodo}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Selecione o periodo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="12meses">Ultimos 12 meses</SelectItem>
            <SelectItem value="6meses">Ultimos 6 meses</SelectItem>
            <SelectItem value="3meses">Ultimos 3 meses</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
        <KPICard
          title="Faturamento Mensal"
          value={formatCurrency(dashboard.faturamentoMensal)}
          subtitle="Meta: R$ 185.000"
          trend="up"
          trendValue="+2.5% vs mes anterior"
          icon={DollarSign}
          color="bg-[#0F3460]"
        />
        <KPICard
          title="Lucro Liquido"
          value={formatCurrency(dashboard.lucroLiquido)}
          subtitle={`Margem: ${dashboard.margemLucro}%`}
          trend="up"
          trendValue="+5.2% vs mes anterior"
          icon={TrendingUp}
          color="bg-[#16A085]"
        />
        <KPICard
          title="Total de Clientes"
          value={dashboard.totalClientes.toString()}
          subtitle={`${dashboard.clientesInadimplentes} inadimplentes`}
          trend="up"
          trendValue="+3 este mes"
          icon={Users}
          color="bg-emerald-600"
        />
        <KPICard
          title="Ponto de Equilibrio"
          value={formatCurrency(dashboard.pontoEquilibrio)}
          subtitle="Custo fixo mensal"
          trend="stable"
          icon={Target}
          color="bg-amber-600"
        />
      </div>

      {/* KPI Cards Segunda Linha */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <KPICard
          title="Honorarios a Receber"
          value={formatCurrency(dashboard.honorariosReceber)}
          subtitle="Valores pendentes"
          trend="down"
          trendValue="-12% vs mes anterior"
          icon={Wallet}
          color="bg-purple-600"
        />
        <KPICard
          title="Honorarios Recebidos"
          value={formatCurrency(dashboard.honorariosRecebidos)}
          subtitle="Este mes"
          trend="up"
          trendValue="+8.3% vs mes anterior"
          icon={CheckCircle}
          color="bg-emerald-600"
        />
        <KPICard
          title="Custo Fixo Mensal"
          value={formatCurrency(dashboard.custoFixoMensal)}
          subtitle="Despesas operacionais"
          icon={Building2}
          color="bg-slate-600"
        />
        <KPICard
          title="Faturamento Anual"
          value={formatCurrency(dashboard.faturamentoAnual)}
          subtitle="Acumulado no ano"
          trend="up"
          trendValue="+18.5% vs ano anterior"
          icon={Calendar}
          color="bg-indigo-600"
        />
      </div>

      {/* Graficos Principais */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Faturamento 12 meses */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-[#0F3460]" />
              Faturamento vs Despesas - Ultimos 12 meses
            </CardTitle>
            <CardDescription>
              Evolucao mensal de receitas e despesas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dadosFaturamento12Meses}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="mes" className="text-xs" />
                  <YAxis className="text-xs" tickFormatter={(v) => `R$ ${v/1000}k`} />
                  <Tooltip
                    formatter={(value: number) => formatCurrency(value)}
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Legend />
                  <Bar dataKey="faturamento" name="Faturamento" fill="#16A085" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="despesa" name="Despesa" fill="#0F3460" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Graficos Segunda Fileira */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Distribuicao por servico */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Receita por Servico</CardTitle>
            <CardDescription>Distribuicao atual</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={dadosReceitaPorServico}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={2}
                    dataKey="valor"
                  >
                    {dadosReceitaPorServico.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={[
                        "#0F3460", "#16A085", "#8B5CF6", "#F59E0B", "#EC4899"
                      ][index % 5]} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value: number) => formatCurrency(value)}
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Crescimento de clientes */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Crescimento de Clientes</CardTitle>
            <CardDescription>Evolucao mensal</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={dadosCrescimentoClientes}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="mes" className="text-xs" />
                  <YAxis className="text-xs" domain={[300, 360]} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="clientes"
                    name="Clientes"
                    stroke="#16A085"
                    fill="#16A085"
                    fillOpacity={0.2}
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Produtividade */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Produtividade da Equipe</CardTitle>
            <CardDescription>Desempenho por colaborador</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dadosProdutividade} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis type="number" domain={[0, 100]} className="text-xs" />
                  <YAxis dataKey="nome" type="category" width={80} className="text-xs" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Bar dataKey="produtividade" name="Produtividade %" fill="#0F3460" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Gauge e Alertas */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Meta de faturamento */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Target className="h-5 w-5 text-[#16A085]" />
              Meta de Faturamento
            </CardTitle>
            <CardDescription>Junho 2025</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center">
              <div className="relative h-[180px] w-[180px]">
                <svg className="h-full w-full -rotate-90 transform">
                  <circle
                    cx="90"
                    cy="90"
                    r="80"
                    fill="none"
                    stroke="hsl(var(--muted))"
                    strokeWidth="12"
                  />
                  <circle
                    cx="90"
                    cy="90"
                    r="80"
                    fill="none"
                    stroke="#16A085"
                    strokeWidth="12"
                    strokeLinecap="round"
                    strokeDasharray={`${(percentualMeta / 100) * 502} 502`}
                    className="transition-all duration-1000"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl font-bold text-[#0F3460]">
                    {percentualMeta.toFixed(0)}%
                  </span>
                  <span className="text-xs text-muted-foreground">atingido</span>
                </div>
              </div>
              <div className="mt-4 text-center">
                <p className="text-sm text-muted-foreground">
                  {formatCurrency(realizadoFaturamento)} de {formatCurrency(metaFaturamento)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tarefas pendentes */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Clock className="h-5 w-5 text-blue-600" />
              Tarefas Pendentes
            </CardTitle>
            <CardDescription>
              {mockTarefas.filter(t => t.status !== 'Concluida').length} tarefas em aberto
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {mockTarefas.filter(t => t.status !== 'Concluida').slice(0, 4).map((tarefa) => (
              <AlertCard
                key={tarefa.id}
                tipo="tarefa"
                titulo={tarefa.titulo}
                prazo={new Date(tarefa.prazo).toLocaleDateString('pt-BR')}
                prioridade={tarefa.prioridade}
              />
            ))}
          </CardContent>
        </Card>

        {/* Obrigacoes fiscais */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-amber-600" />
              Obrigacoes do Mes
            </CardTitle>
            <CardDescription>
              {mockObrigacoesFiscais.filter(o => o.status === 'Pendente').length} pendentes
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {mockObrigacoesFiscais.filter(o => o.status === 'Pendente').slice(0, 4).map((obrigacao) => (
              <AlertCard
                key={obrigacao.id}
                tipo="obrigacao"
                titulo={obrigacao.nome}
                prazo={new Date(obrigacao.prazo).toLocaleDateString('pt-BR')}
              />
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
