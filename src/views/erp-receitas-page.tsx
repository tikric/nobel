'use client';

import * as React from "react";
import {
  TrendingUp,
  Plus,
  Search,
  Filter,
  Download,
  MoreHorizontal,
  AlertCircle,
  CheckCircle,
  Clock,
  XCircle,
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
import { mockReceitas, mockClientes } from "@/lib/mock-data";
import { format } from "date-fns";

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
};

const statusConfig: Record<string, { icon: React.ElementType; color: string; label: string }> = {
  Recebido: { icon: CheckCircle, color: "text-emerald-600 bg-emerald-100", label: "Recebido" },
  Pendente: { icon: Clock, color: "text-amber-600 bg-amber-100", label: "Pendente" },
  Vencido: { icon: AlertCircle, color: "text-red-600 bg-red-100", label: "Vencido" },
  Cancelado: { icon: XCircle, color: "text-slate-600 bg-slate-100", label: "Cancelado" },
};

const tipoServicoConfig: Record<string, { color: string }> = {
  Contabilidade: { color: "bg-blue-500/10 text-blue-700 border-blue-500/20" },
  Fiscal: { color: "bg-emerald-500/10 text-emerald-700 border-emerald-500/20" },
  DP: { color: "bg-purple-500/10 text-purple-700 border-purple-500/20" },
  Legalizacao: { color: "bg-amber-500/10 text-amber-700 border-amber-500/20" },
  Consultoria: { color: "bg-rose-500/10 text-rose-700 border-rose-500/20" },
  Avulso: { color: "bg-slate-500/10 text-slate-700 border-slate-500/20" },
};

export default function ReceitasPage() {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState<string>("all");
  const [servicoFilter, setServicoFilter] = React.useState<string>("all");

  // Estatisticas
  const totalReceitas = mockReceitas.reduce((acc, r) => acc + r.valor, 0);
  const recebidas = mockReceitas.filter(r => r.status === "Recebido").reduce((acc, r) => acc + r.valor, 0);
  const pendentes = mockReceitas.filter(r => r.status === "Pendente").reduce((acc, r) => acc + r.valor, 0);
  const vencidas = mockReceitas.filter(r => r.status === "Vencido").reduce((acc, r) => acc + r.valor, 0);

  // Filtros
  const filteredReceitas = mockReceitas.filter((receita) => {
    const cliente = mockClientes.find(c => c.id === receita.clienteId);
    const matchesSearch = cliente?.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         receita.descricao.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || receita.status === statusFilter;
    const matchesServico = servicoFilter === "all" || receita.tipoServico === servicoFilter;
    return matchesSearch && matchesStatus && matchesServico;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Gestao de Receitas</h2>
          <p className="text-muted-foreground">
            Controle de honorarios, cobrancas e inadimplencia
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
                Nova Receita
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Nova Receita</DialogTitle>
                <DialogDescription>
                  Cadastre uma nova receita ou cobranca
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <p className="text-sm text-muted-foreground">
                  Formulario de cadastro de receitas em implementacao...
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
              <div className="p-2 sm:p-3 rounded-xl bg-emerald-500/10 shrink-0">
                <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 text-emerald-600" />
              </div>
              <div className="min-w-0">
                <p className="text-xs sm:text-sm text-muted-foreground truncate">Recebido</p>
                <p className="text-sm sm:text-lg md:text-2xl font-bold text-emerald-600 truncate">{formatCurrency(recebidas)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="p-2 sm:p-3 rounded-xl bg-amber-500/10 shrink-0">
                <Clock className="h-5 w-5 sm:h-6 sm:w-6 text-amber-600" />
              </div>
              <div className="min-w-0">
                <p className="text-xs sm:text-sm text-muted-foreground truncate">Pendente</p>
                <p className="text-sm sm:text-lg md:text-2xl font-bold text-amber-600 truncate">{formatCurrency(pendentes)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="p-2 sm:p-3 rounded-xl bg-red-500/10 shrink-0">
                <AlertCircle className="h-5 w-5 sm:h-6 sm:w-6 text-red-600" />
              </div>
              <div className="min-w-0">
                <p className="text-xs sm:text-sm text-muted-foreground truncate">Vencido</p>
                <p className="text-sm sm:text-lg md:text-2xl font-bold text-red-600 truncate">{formatCurrency(vencidas)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="p-2 sm:p-3 rounded-xl bg-blue-500/10 shrink-0">
                <TrendingUp className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
              </div>
              <div className="min-w-0">
                <p className="text-xs sm:text-sm text-muted-foreground truncate">Total</p>
                <p className="text-sm sm:text-lg md:text-2xl font-bold truncate">{formatCurrency(totalReceitas)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabela de receitas */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <CardTitle>Receitas do Mes</CardTitle>
              <CardDescription>
                Lista de todas as receitas e cobrancas
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar cliente..."
                  className="pl-10 w-[200px]"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos Status</SelectItem>
                  <SelectItem value="Recebido">Recebido</SelectItem>
                  <SelectItem value="Pendente">Pendente</SelectItem>
                  <SelectItem value="Vencido">Vencido</SelectItem>
                </SelectContent>
              </Select>
              <Select value={servicoFilter} onValueChange={setServicoFilter}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Servico" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos Servicos</SelectItem>
                  <SelectItem value="Contabilidade">Contabilidade</SelectItem>
                  <SelectItem value="Fiscal">Fiscal</SelectItem>
                  <SelectItem value="DP">DP</SelectItem>
                  <SelectItem value="Legalizacao">Legalizacao</SelectItem>
                  <SelectItem value="Consultoria">Consultoria</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Cliente</TableHead>
                <TableHead>Descricao</TableHead>
                <TableHead>Servico</TableHead>
                <TableHead>Valor</TableHead>
                <TableHead>Vencimento</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredReceitas.map((receita) => {
                const cliente = mockClientes.find(c => c.id === receita.clienteId);
                const StatusIcon = statusConfig[receita.status].icon;
                return (
                  <TableRow key={receita.id}>
                    <TableCell className="font-medium">
                      {cliente?.nome || "Cliente nao encontrado"}
                    </TableCell>
                    <TableCell>{receita.descricao}</TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={tipoServicoConfig[receita.tipoServico]?.color}
                      >
                        {receita.tipoServico}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-semibold">
                      {formatCurrency(receita.valor)}
                    </TableCell>
                    <TableCell>
                      {format(new Date(receita.dataVencimento), "dd/MM/yyyy")}
                    </TableCell>
                    <TableCell>
                      <div className={`flex items-center gap-2 ${statusConfig[receita.status].color} px-2 py-1 rounded-full w-fit`}>
                        <StatusIcon className="h-4 w-4" />
                        <span className="text-xs font-medium">{statusConfig[receita.status].label}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
