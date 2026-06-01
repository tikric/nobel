'use client';

import * as React from "react";
import {
  FileBarChart,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Calculator,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  LineChart,
  Line,
} from "recharts";
import { dadosDRE, rankingClientesRentaveis, mockClientes, mockReceitas } from "@/lib/mock-data";

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

// Dados para grafico comparativo
const dadosComparativo = [
  { mes: "Jan", receita: 168500, despesa: 105000, lucro: 63500 },
  { mes: "Fev", receita: 175200, despesa: 110000, lucro: 65200 },
  { mes: "Mar", receita: 178000, despesa: 112000, lucro: 66000 },
  { mes: "Abr", receita: 180000, despesa: 113000, lucro: 67000 },
  { mes: "Mai", receita: 182500, despesa: 115000, lucro: 67500 },
  { mes: "Jun", receita: 185000, despesa: 122500, lucro: 62500 },
];

// Margens por cliente
const dadosMargemCliente = rankingClientesRentaveis.map(c => ({
  nome: c.nome.length > 20 ? c.nome.substring(0, 20) + "..." : c.nome,
  margem: c.margem,
}));

export default function DREPage() {
  const [mes, setMes] = React.useState("Junho/2025");
  const dre = dadosDRE;

  // Calculos de margem
  const margemContribuicaoPercent = (dre.margemContribuicao / dre.receitaLiquida) * 100;
  const margemEbitdaPercent = (dre.ebitda / dre.receitaLiquida) * 100;
  const margemLucroPercent = (dre.lucroLiquido / dre.receitaLiquida) * 100;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">DRE Gerencial</h2>
          <p className="text-muted-foreground">
            Demonstrativo de Resultado em Tempo Real
          </p>
        </div>
        <Select value={mes} onValueChange={setMes}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Selecione o mes" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Janeiro/2025">Janeiro/2025</SelectItem>
            <SelectItem value="Fevereiro/2025">Fevereiro/2025</SelectItem>
            <SelectItem value="Marco/2025">Marco/2025</SelectItem>
            <SelectItem value="Abril/2025">Abril/2025</SelectItem>
            <SelectItem value="Maio/2025">Maio/2025</SelectItem>
            <SelectItem value="Junho/2025">Junho/2025</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* KPIs de Margem */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="border-emerald-500/30 bg-emerald-50/50 dark:bg-emerald-950/20">
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-2">Margem de Contribuicao</p>
              <p className="text-3xl font-bold text-emerald-600">{formatPercent(margemContribuicaoPercent)}</p>
              <p className="text-xs text-muted-foreground mt-1">
                {formatCurrency(dre.margemContribuicao)}
              </p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-blue-500/30 bg-blue-50/50 dark:bg-blue-950/20">
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-2">Margem EBITDA</p>
              <p className="text-3xl font-bold text-blue-600">{formatPercent(margemEbitdaPercent)}</p>
              <p className="text-xs text-muted-foreground mt-1">
                {formatCurrency(dre.ebitda)}
              </p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-purple-500/30 bg-purple-50/50 dark:bg-purple-950/20">
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-2">Margem Liquida</p>
              <p className="text-3xl font-bold text-purple-600">{formatPercent(margemLucroPercent)}</p>
              <p className="text-xs text-muted-foreground mt-1">
                {formatCurrency(dre.lucroLiquido)}
              </p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-amber-500/30 bg-amber-50/50 dark:bg-amber-950/20">
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-2">Receita Liquida</p>
              <p className="text-3xl font-bold text-amber-600">{formatCurrency(dre.receitaLiquida)}</p>
              <p className="text-xs text-muted-foreground mt-1">
                Faturamento - Deducoes
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* DRE Detalhado */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileBarChart className="h-5 w-5 text-[#0F3460]" />
            Demonstrativo de Resultado
          </CardTitle>
          <CardDescription>
            {mes} - Todos os valores em Reais
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Receita */}
            <div className="border-b pb-4">
              <div className="flex justify-between items-center py-2">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-emerald-600" />
                  <span className="font-semibold">Receita Bruta</span>
                </div>
                <span className="font-bold text-emerald-600">{formatCurrency(dre.receitaBruta)}</span>
              </div>
              <div className="flex justify-between items-center py-2 pl-6 text-sm text-muted-foreground">
                <span>(-) Deducoes e Abatimentos</span>
                <span className="text-red-500">({formatCurrency(dre.deducoes)})</span>
              </div>
              <div className="flex justify-between items-center py-2 bg-muted/30 -mx-4 px-4 rounded">
                <span className="font-semibold">Receita Liquida</span>
                <span className="font-bold">{formatCurrency(dre.receitaLiquida)}</span>
              </div>
            </div>

            {/* Custos */}
            <div className="border-b pb-4">
              <div className="flex justify-between items-center py-2">
                <span className="font-semibold text-red-600">(-) Custos Diretos (Mao de Obra)</span>
                <span className="font-bold text-red-600">({formatCurrency(dre.custosDiretos)})</span>
              </div>
              <div className="flex justify-between items-center py-2 bg-emerald-50/50 dark:bg-emerald-950/20 -mx-4 px-4 rounded border border-emerald-500/20">
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-emerald-600" />
                  <span className="font-bold text-emerald-700">Margem de Contribuicao</span>
                </div>
                <span className="font-bold text-emerald-600">
                  {formatCurrency(dre.margemContribuicao)} ({formatPercent(margemContribuicaoPercent)})
                </span>
              </div>
            </div>

            {/* Despesas */}
            <div className="border-b pb-4">
              <div className="flex justify-between items-center py-2">
                <span>(-) Despesas Fixas</span>
                <span className="text-red-500">({formatCurrency(dre.despesasFixas)})</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span>(-) Despesas Variaveis</span>
                <span className="text-red-500">({formatCurrency(dre.despesasVariaveis)})</span>
              </div>
            </div>

            {/* EBITDA */}
            <div className="border-b pb-4">
              <div className="flex justify-between items-center py-2 bg-blue-50/50 dark:bg-blue-950/20 -mx-4 px-4 rounded border border-blue-500/20">
                <div className="flex items-center gap-2">
                  <Calculator className="h-4 w-4 text-blue-600" />
                  <span className="font-bold text-blue-700">EBITDA</span>
                </div>
                <span className="font-bold text-blue-600">
                  {formatCurrency(dre.ebitda)} ({formatPercent(margemEbitdaPercent)})
                </span>
              </div>
            </div>

            {/* Lucro Liquido */}
            <div className="flex justify-between items-center py-3 bg-purple-50/50 dark:bg-purple-950/20 -mx-4 px-4 rounded-lg border border-purple-500/30">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-purple-600" />
                <span className="text-lg font-bold text-purple-700">Lucro Liquido</span>
              </div>
              <span className="text-2xl font-bold text-purple-600">
                {formatCurrency(dre.lucroLiquido)} ({formatPercent(margemLucroPercent)})
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Graficos */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Comparativo mensal */}
        <Card>
          <CardHeader>
            <CardTitle>Evolucao Mensal</CardTitle>
            <CardDescription>Receita, despesa e lucro por mes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dadosComparativo}>
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
                  <Bar dataKey="receita" name="Receita" fill="#16A085" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="despesa" name="Despesa" fill="#0F3460" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="lucro" name="Lucro" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Margem por cliente */}
        <Card>
          <CardHeader>
            <CardTitle>Rentabilidade por Cliente</CardTitle>
            <CardDescription>Margem de contribuicao em %</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dadosMargemCliente} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis type="number" domain={[0, 100]} className="text-xs" tickFormatter={(v) => `${v}%`} />
                  <YAxis dataKey="nome" type="category" width={150} className="text-xs" />
                  <Tooltip
                    formatter={(value: number) => `${value.toFixed(1)}%`}
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Bar dataKey="margem" name="Margem %" fill="#16A085" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
