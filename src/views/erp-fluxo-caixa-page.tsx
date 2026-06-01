'use client';

import * as React from "react";
import {
  ArrowRightLeft,
  TrendingUp,
  TrendingDown,
  Calendar,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
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
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  BarChart,
  Bar,
} from "recharts";
import { mockFluxoCaixa } from "@/lib/mock-data";
import { format } from "date-fns";

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

// Dados projetados para grafico
const dadosProjecao = [
  { dia: "01", entrada: 13200, saida: 60000, saldo: -46800 },
  { dia: "05", entrada: 13200, saida: 75000, saldo: -105000 },
  { dia: "10", entrada: 13200, saida: 83500, saldo: -134800 },
  { dia: "15", entrada: 15000, saida: 86000, saldo: -119800 },
  { dia: "20", entrada: 15000, saida: 88500, saldo: -92400 },
  { dia: "25", entrada: 15000, saida: 91000, saldo: -58400 },
  { dia: "30", entrada: 15000, saida: 91000, saldo: -23400 },
];

// Saldo projetado
const saldoInicial = 85000;
const entradasPrevistas = 84200;
const saidasPrevistas = 102600;
const saldoFinal = saldoInicial + entradasPrevistas - saidasPrevistas;

export default function FluxoCaixaPage() {
  const [periodo, setPeriodo] = React.useState("30dias");

  // Calculos
  const entradas = mockFluxoCaixa.filter(t => t.tipo === "Entrada");
  const saidas = mockFluxoCaixa.filter(t => t.tipo === "Saida");
  const totalEntradas = entradas.reduce((acc, t) => acc + t.valor, 0);
  const totalSaidas = saidas.reduce((acc, t) => acc + t.valor, 0);
  const saldoPeriodo = totalEntradas - totalSaidas;

  // Entradas vs Saidas por categoria
  const entradasPorCategoria = [
    { categoria: "Receita Servicos", valor: 84200 },
    { categoria: "Outros", valor: 0 },
  ];
  const saidasPorCategoria = [
    { categoria: "Salarios", valor: 60000 },
    { categoria: "Pro Labore", valor: 15000 },
    { categoria: "Aluguel", valor: 8500 },
    { categoria: "Software", valor: 2500 },
    { categoria: "Outros", valor: 16600 },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Fluxo de Caixa</h2>
          <p className="text-muted-foreground">
            Projecao e controle de entradas e saidas
          </p>
        </div>
        <Select value={periodo} onValueChange={setPeriodo}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Selecione o periodo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="30dias">Prox. 30 dias</SelectItem>
            <SelectItem value="60dias">Prox. 60 dias</SelectItem>
            <SelectItem value="90dias">Prox. 90 dias</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* KPIs */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="border-emerald-500/30">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-emerald-500/10">
                <ArrowUpRight className="h-6 w-6 text-emerald-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Entradas Previstas</p>
                <p className="text-2xl font-bold text-emerald-600">
                  {formatCurrency(entradasPrevistas)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-red-500/30">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-red-500/10">
                <ArrowDownRight className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Saidas Previstas</p>
                <p className="text-2xl font-bold text-red-600">
                  {formatCurrency(saidasPrevistas)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-amber-500/30">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-amber-500/10">
                <DollarSign className="h-6 w-6 text-amber-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Saldo Periodo</p>
                <p className="text-2xl font-bold text-amber-600">
                  {formatCurrency(saldoFinal)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-blue-500/30">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-blue-500/10">
                <Calendar className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Saldo Atual</p>
                <p className="text-2xl font-bold text-blue-600">
                  {formatCurrency(saldoInicial)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Grafico de projecao */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ArrowRightLeft className="h-5 w-5 text-[#0F3460]" />
            Projecao de Fluxo - Junho 2025
          </CardTitle>
          <CardDescription>
            Projecao diaria de entradas e saidas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={dadosProjecao}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="dia" className="text-xs" />
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
                <Area
                  type="monotone"
                  dataKey="entrada"
                  name="Entradas"
                  stroke="#16A085"
                  fill="#16A085"
                  fillOpacity={0.2}
                />
                <Area
                  type="monotone"
                  dataKey="saida"
                  name="Saidas"
                  stroke="#EF4444"
                  fill="#EF4444"
                  fillOpacity={0.2}
                />
                <Area
                  type="monotone"
                  dataKey="saldo"
                  name="Saldo Acumulado"
                  stroke="#0F3460"
                  fill="#0F3460"
                  fillOpacity={0.1}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Tabela de transacoes */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-emerald-600" />
              Transacoes Previstas
            </CardTitle>
            <CardDescription>
              Lista de entradas e saidas programadas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Data</TableHead>
                  <TableHead>Descricao</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead className="text-right">Valor</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockFluxoCaixa.map((transacao) => (
                  <TableRow key={transacao.id}>
                    <TableCell className="text-sm">
                      {format(new Date(transacao.data), "dd/MM")}
                    </TableCell>
                    <TableCell className="text-sm">{transacao.descricao}</TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        transacao.tipo === "Entrada"
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-red-100 text-red-700"
                      }`}>
                        {transacao.tipo}
                      </span>
                    </TableCell>
                    <TableCell className={`text-right font-semibold ${
                      transacao.tipo === "Entrada" ? "text-emerald-600" : "text-red-600"
                    }`}>
                      {transacao.tipo === "Entrada" ? "+" : "-"}
                      {formatCurrency(transacao.valor)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Resumo por categoria */}
        <Card>
          <CardHeader>
            <CardTitle>Resumo por Categoria</CardTitle>
            <CardDescription>
              Distribuicao de entradas e saidas
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h4 className="text-sm font-semibold text-emerald-600 mb-3 flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                Entradas
              </h4>
              <div className="space-y-2">
                {entradasPorCategoria.map((cat) => (
                  <div key={cat.categoria} className="flex items-center justify-between">
                    <span className="text-sm">{cat.categoria}</span>
                    <span className="font-semibold text-emerald-600">
                      {formatCurrency(cat.valor)}
                    </span>
                  </div>
                ))}
                <div className="pt-2 border-t flex items-center justify-between font-bold">
                  <span>Total Entradas</span>
                  <span className="text-emerald-600">
                    {formatCurrency(entradasPrevistas)}
                  </span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-red-600 mb-3 flex items-center gap-2">
                <TrendingDown className="h-4 w-4" />
                Saidas
              </h4>
              <div className="space-y-2">
                {saidasPorCategoria.map((cat) => (
                  <div key={cat.categoria} className="flex items-center justify-between">
                    <span className="text-sm">{cat.categoria}</span>
                    <span className="font-semibold text-red-600">
                      {formatCurrency(cat.valor)}
                    </span>
                  </div>
                ))}
                <div className="pt-2 border-t flex items-center justify-between font-bold">
                  <span>Total Saidas</span>
                  <span className="text-red-600">
                    {formatCurrency(saidasPrevistas)}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
