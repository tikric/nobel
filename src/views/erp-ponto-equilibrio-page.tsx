'use client';

import * as React from "react";
import {
  PieChart,
  Target,
  TrendingUp,
  Users,
  DollarSign,
  Lightbulb,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
  Cell,
} from "recharts";
import { rankingClientesRentaveis, mockDashboard } from "@/lib/mock-data";

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

// Calculos
const custoFixo = 98500;
const margemContribuicaoMedia = 0.65; // 65%
const pontoEquilibrioContabil = custoFixo / margemContribuicaoMedia;
const pontoEquilibrioEconomico = pontoEquilibrioContabil * 1.1; // 10% de lucro desejado

export default function PontoEquilibrioPage() {
  // Dados para grafico de clientes rentaveis
  const dadosRentabilidade = rankingClientesRentaveis.map((c, i) => ({
    nome: c.nome.split(" ")[0] + " " + c.nome.split(" ")[1],
    receita: c.receita,
    custo: c.custo,
    margem: c.margem,
    cor: i === 0 ? "#16A085" : i === 1 ? "#0F3460" : i === 2 ? "#8B5CF6" : "#F59E0B",
  }));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Ponto de Equilibrio e Rentabilidade</h2>
        <p className="text-muted-foreground">
          Analise de break-even e ROI por cliente
        </p>
      </div>

      {/* KPIs de Ponto de Equilibrio */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border-emerald-500/30 bg-emerald-50/50 dark:bg-emerald-950/20">
          <CardContent className="pt-6">
            <div className="text-center">
              <Target className="h-10 w-10 mx-auto text-emerald-600 mb-3" />
              <p className="text-sm text-muted-foreground mb-2">Ponto de Equilibrio Contabil</p>
              <p className="text-3xl font-bold text-emerald-600">
                {formatCurrency(pontoEquilibrioContabil)}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Faturamento minimo para cobrir custos
              </p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-blue-500/30 bg-blue-50/50 dark:bg-blue-950/20">
          <CardContent className="pt-6">
            <div className="text-center">
              <TrendingUp className="h-10 w-10 mx-auto text-blue-600 mb-3" />
              <p className="text-sm text-muted-foreground mb-2">Ponto Economico</p>
              <p className="text-3xl font-bold text-blue-600">
                {formatCurrency(pontoEquilibrioEconomico)}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Com margem de lucro de 10%
              </p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-purple-500/30 bg-purple-50/50 dark:bg-purple-950/20">
          <CardContent className="pt-6">
            <div className="text-center">
              <DollarSign className="h-10 w-10 mx-auto text-purple-600 mb-3" />
              <p className="text-sm text-muted-foreground mb-2">Margem Atual</p>
              <p className="text-3xl font-bold text-purple-600">
                {mockDashboard.margemLucro}%
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Lucro acima do ponto de equilibrio
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Informacoes de custos fixos */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-[#0F3460]" />
            Composicao dos Custos Fixos
          </CardTitle>
          <CardDescription>
            Breakdown dos custos que formam o ponto de equilibrio
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-lg">
              <p className="text-sm text-muted-foreground">Salarios e Encargos</p>
              <p className="text-xl font-bold">{formatCurrency(60000)}</p>
              <p className="text-xs text-muted-foreground">60.9%</p>
            </div>
            <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-lg">
              <p className="text-sm text-muted-foreground">Pro Labore</p>
              <p className="text-xl font-bold">{formatCurrency(15000)}</p>
              <p className="text-xs text-muted-foreground">15.2%</p>
            </div>
            <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-lg">
              <p className="text-sm text-muted-foreground">Aluguel e Operacionais</p>
              <p className="text-xl font-bold">{formatCurrency(12000)}</p>
              <p className="text-xs text-muted-foreground">12.2%</p>
            </div>
            <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-lg">
              <p className="text-sm text-muted-foreground">Software e Servicos</p>
              <p className="text-xl font-bold">{formatCurrency(11500)}</p>
              <p className="text-xs text-muted-foreground">11.7%</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Ranking de rentabilidade */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-[#16A085]" />
            Ranking de Clientes por Rentabilidade
          </CardTitle>
          <CardDescription>
            Analise de receita, custo e margem por cliente
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Posicao</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead className="text-right">Receita</TableHead>
                <TableHead className="text-right">Custo</TableHead>
                <TableHead className="text-right">Margem</TableHead>
                <TableHead>Score</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rankingClientesRentaveis.map((cliente, index) => (
                <TableRow key={cliente.nome}>
                  <TableCell>
                    <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold ${
                      index === 0 ? "bg-amber-100 text-amber-700" :
                      index === 1 ? "bg-slate-100 text-slate-700" :
                      index === 2 ? "bg-orange-100 text-orange-700" :
                      "bg-muted text-muted-foreground"
                    }`}>
                      {index + 1}
                    </span>
                  </TableCell>
                  <TableCell className="font-medium">{cliente.nome}</TableCell>
                  <TableCell className="text-right text-emerald-600">
                    {formatCurrency(cliente.receita)}
                  </TableCell>
                  <TableCell className="text-right text-red-500">
                    {formatCurrency(cliente.custo)}
                  </TableCell>
                  <TableCell className="text-right font-semibold">
                    {cliente.margem.toFixed(1)}%
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-16 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#16A085] rounded-full"
                          style={{ width: `${cliente.margem}%` }}
                        />
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {(cliente.margem / 100 * 100).toFixed(0)}
                      </span>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Grafico de comparacao */}
      <Card>
        <CardHeader>
          <CardTitle>Comparativo Receita vs Custo</CardTitle>
          <CardDescription>
            Visualizacao da margem por cliente
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dadosRentabilidade} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis type="number" className="text-xs" tickFormatter={(v) => `R$ ${v}`} />
                <YAxis dataKey="nome" type="category" width={100} className="text-xs" />
                <Tooltip
                  formatter={(value: number) => formatCurrency(value)}
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Bar dataKey="receita" name="Receita" fill="#16A085" radius={[0, 4, 4, 0]} />
                <Bar dataKey="custo" name="Custo" fill="#0F3460" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Sugestoes */}
      <Card className="border-amber-500/30 bg-amber-50/50 dark:bg-amber-950/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-amber-600" />
            Sugestoes de Acao
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-start gap-3 p-3 bg-white dark:bg-slate-900 rounded-lg">
            <TrendingUp className="h-5 w-5 text-emerald-600 mt-0.5" />
            <div>
              <p className="font-medium">Aumentar precos para clientes de baixo valor</p>
              <p className="text-sm text-muted-foreground">
                Clientes com margem abaixo de 40% podem ter seus honorarios reajustados em 10-15%
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-3 bg-white dark:bg-slate-900 rounded-lg">
            <Users className="h-5 w-5 text-blue-600 mt-0.5" />
            <div>
              <p className="font-medium">Focar em clientes de alto valor</p>
              <p className="text-sm text-muted-foreground">
                Fazenda Nova Esperanca e Supermercado Central representam 45% da receita com margens acima de 60%
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-3 bg-white dark:bg-slate-900 rounded-lg">
            <DollarSign className="h-5 w-5 text-purple-600 mt-0.5" />
            <div>
              <p className="font-medium">Revisar custos de atendimento</p>
              <p className="text-sm text-muted-foreground">
                O custo medio por cliente esta em R$ 1.450. Buscar reduzir em 5% atraves de automacao
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
