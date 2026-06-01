'use client';

import * as React from "react";
import {
  CreditCard,
  Plus,
  Search,
  Download,
  MoreHorizontal,
  TrendingDown,
} from "lucide-react";
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
import { mockDespesas } from "@/lib/mock-data";
import { format } from "date-fns";

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
};

const categoriaConfig: Record<string, { icon: React.ElementType; color: string }> = {
  Salarios: { icon: CreditCard, color: "bg-blue-500/10 text-blue-700" },
  ProLabore: { icon: CreditCard, color: "bg-purple-500/10 text-purple-700" },
  Aluguel: { icon: CreditCard, color: "bg-emerald-500/10 text-emerald-700" },
  Software: { icon: CreditCard, color: "bg-cyan-500/10 text-cyan-700" },
  Impostos: { icon: CreditCard, color: "bg-amber-500/10 text-amber-700" },
  Marketing: { icon: CreditCard, color: "bg-rose-500/10 text-rose-700" },
  Outros: { icon: CreditCard, color: "bg-slate-500/10 text-slate-700" },
};

const statusConfig: Record<string, { label: string; color: string }> = {
  Pago: { label: "Pago", color: "bg-emerald-100 text-emerald-700" },
  Pendente: { label: "Pendente", color: "bg-amber-100 text-amber-700" },
  Vencido: { label: "Vencido", color: "bg-red-100 text-red-700" },
};

export default function DespesasPage() {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [categoriaFilter, setCategoriaFilter] = React.useState<string>("all");
  const [statusFilter, setStatusFilter] = React.useState<string>("all");

  // Estatisticas
  const totalDespesas = mockDespesas.reduce((acc, d) => acc + d.valor, 0);
  const despesasFixas = mockDespesas.filter(d => d.fixo).reduce((acc, d) => acc + d.valor, 0);
  const despesasVariaveis = mockDespesas.filter(d => !d.fixo).reduce((acc, d) => acc + d.valor, 0);

  // Filtros
  const filteredDespesas = mockDespesas.filter((despesa) => {
    const matchesSearch = despesa.descricao.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategoria = categoriaFilter === "all" || despesa.categoria === categoriaFilter;
    const matchesStatus = statusFilter === "all" || despesa.status === statusFilter;
    return matchesSearch && matchesCategoria && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Gestao de Despesas</h2>
          <p className="text-muted-foreground">
            Controle de custos fixos e variaveis do escritorio
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Exportar
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Nova Despesa
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Nova Despesa</DialogTitle>
                <DialogDescription>
                  Cadastre uma nova despesa
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <p className="text-sm text-muted-foreground">
                  Formulario de cadastro de despesas em implementacao...
                </p>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Cards de estatisticas */}
      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="p-2 sm:p-3 rounded-xl bg-slate-500/10 shrink-0">
                <CreditCard className="h-5 w-5 sm:h-6 sm:w-6 text-slate-600" />
              </div>
              <div className="min-w-0">
                <p className="text-xs sm:text-sm text-muted-foreground truncate">Total Despesas</p>
                <p className="text-sm sm:text-lg md:text-2xl font-bold truncate">{formatCurrency(totalDespesas)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="p-2 sm:p-3 rounded-xl bg-blue-500/10 shrink-0">
                <TrendingDown className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
              </div>
              <div className="min-w-0">
                <p className="text-xs sm:text-sm text-muted-foreground truncate">Despesas Fixas</p>
                <p className="text-sm sm:text-lg md:text-2xl font-bold text-blue-600 truncate">{formatCurrency(despesasFixas)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="p-2 sm:p-3 rounded-xl bg-amber-500/10 shrink-0">
                <TrendingDown className="h-5 w-5 sm:h-6 sm:w-6 text-amber-600" />
              </div>
              <div className="min-w-0">
                <p className="text-xs sm:text-sm text-muted-foreground truncate">Despesas Variaveis</p>
                <p className="text-sm sm:text-lg md:text-2xl font-bold text-amber-600 truncate">{formatCurrency(despesasVariaveis)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="p-2 sm:p-3 rounded-xl bg-emerald-500/10 shrink-0">
                <CreditCard className="h-5 w-5 sm:h-6 sm:w-6 text-emerald-600" />
              </div>
              <div className="min-w-0">
                <p className="text-xs sm:text-sm text-muted-foreground truncate">Qtd Despesas</p>
                <p className="text-sm sm:text-lg md:text-2xl font-bold truncate">{mockDespesas.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabela de despesas */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <CardTitle>Despesas do Mes</CardTitle>
              <CardDescription>
                Lista de todas as despesas
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar despesa..."
                  className="pl-10 w-[200px]"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select value={categoriaFilter} onValueChange={setCategoriaFilter}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Categoria" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas Categorias</SelectItem>
                  <SelectItem value="Salarios">Salarios</SelectItem>
                  <SelectItem value="ProLabore">Pro Labore</SelectItem>
                  <SelectItem value="Aluguel">Aluguel</SelectItem>
                  <SelectItem value="Software">Software</SelectItem>
                  <SelectItem value="Impostos">Impostos</SelectItem>
                  <SelectItem value="Marketing">Marketing</SelectItem>
                  <SelectItem value="Outros">Outros</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Descricao</TableHead>
                <TableHead>Categoria</TableHead>
                <TableHead>Departamento</TableHead>
                <TableHead>Valor</TableHead>
                <TableHead>Vencimento</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDespesas.map((despesa) => (
                <TableRow key={despesa.id}>
                  <TableCell className="font-medium">{despesa.descricao}</TableCell>
                  <TableCell>
                    <Badge className={categoriaConfig[despesa.categoria]?.color}>
                      {despesa.categoria}
                    </Badge>
                  </TableCell>
                  <TableCell>{despesa.departmento}</TableCell>
                  <TableCell className="font-semibold text-red-600">
                    -{formatCurrency(despesa.valor)}
                  </TableCell>
                  <TableCell>
                    {format(new Date(despesa.dataVencimento), "dd/MM/yyyy")}
                  </TableCell>
                  <TableCell>
                    <Badge className={statusConfig[despesa.status]?.color}>
                      {statusConfig[despesa.status]?.label}
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
    </div>
  );
}
