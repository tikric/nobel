'use client';

import * as React from "react";
import Link from "next/link";
import {
  TrendingUp,
  CreditCard,
  FileBarChart,
  ArrowRightLeft,
  PieChart,
  Calculator,
  ArrowRight,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const modulosERP = [
  {
    titulo: "Receitas",
    descricao: "Gestao de honorarios, cobrancas e inadimplencia",
    href: "/erp/receitas",
    icon: TrendingUp,
    cor: "bg-emerald-500",
  },
  {
    titulo: "Despesas",
    descricao: "Controle de custos fixos e variaveis",
    href: "/erp/despesas",
    icon: CreditCard,
    cor: "bg-blue-500",
  },
  {
    titulo: "DRE Gerencial",
    descricao: "Demonstrativo de resultado em tempo real",
    href: "/erp/dre",
    icon: FileBarChart,
    cor: "bg-purple-500",
  },
  {
    titulo: "Fluxo de Caixa",
    descricao: "Projecao 30/60/90 dias e controle de entradas/saidas",
    href: "/erp/fluxo-caixa",
    icon: ArrowRightLeft,
    cor: "bg-amber-500",
  },
  {
    titulo: "Ponto de Equilibrio",
    descricao: "Calculo de rentabilidade e ROI por cliente",
    href: "/erp/ponto-equilibrio",
    icon: PieChart,
    cor: "bg-rose-500",
  },
];

export default function ERPPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">ERP Contabil</h2>
        <p className="text-muted-foreground">
          Gestao financeira completa do seu escritorio
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {modulosERP.map((modulo) => (
          <Link key={modulo.titulo} href={modulo.href}>
            <Card className="h-full transition-all hover:shadow-lg hover:border-primary/50 cursor-pointer group">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className={`p-3 rounded-xl ${modulo.cor}`}>
                    <modulo.icon className="h-6 w-6 text-white" />
                  </div>
                  <ArrowRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
                </div>
              </CardHeader>
              <CardContent>
                <CardTitle className="text-xl mb-2">{modulo.titulo}</CardTitle>
                <CardDescription>{modulo.descricao}</CardDescription>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Resumo rapido */}
      <div className="grid gap-6 md:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Faturamento Mensal</p>
              <p className="text-2xl font-bold text-emerald-600">R$ 185.000</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Despesas Fixas</p>
              <p className="text-2xl font-bold text-blue-600">R$ 98.500</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Lucro Liquido</p>
              <p className="text-2xl font-bold text-purple-600">R$ 62.500</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Margem</p>
              <p className="text-2xl font-bold text-amber-600">33.8%</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
