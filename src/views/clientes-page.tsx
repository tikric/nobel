'use client';

import * as React from "react";
import {
  Users,
  Search,
  Filter,
  Download,
  Plus,
  MoreHorizontal,
  Building2,
  Phone,
  Mail,
  MapPin,
  Calendar,
  TrendingUp,
  AlertCircle,
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
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { mockClientes } from "@/lib/mock-data";

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
};

const regimeConfig: Record<string, { label: string; color: string }> = {
  MEI: { label: "MEI", color: "bg-green-100 text-green-700" },
  Simples: { label: "Simples", color: "bg-blue-100 text-blue-700" },
  LucroPresumido: { label: "Lucro Presumido", color: "bg-purple-100 text-purple-700" },
  LucroReal: { label: "Lucro Real", color: "bg-amber-100 text-amber-700" },
};

const porteConfig: Record<string, { label: string }> = {
  MEI: { label: "MEI" },
  ME: { label: "ME" },
  EPP: { label: "EPP" },
  Medio: { label: "Medio" },
  Grande: { label: "Grande" },
};

const situacaoConfig: Record<string, { label: string; color: string }> = {
  Ativo: { label: "Ativo", color: "bg-emerald-100 text-emerald-700" },
  Inativo: { label: "Inativo", color: "bg-slate-100 text-slate-700" },
  Suspenso: { label: "Suspenso", color: "bg-red-100 text-red-700" },
};

export default function ClientesPage() {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [regimeFilter, setRegimeFilter] = React.useState<string>("all");
  const [porteFilter, setPorteFilter] = React.useState<string>("all");
  const [situacaoFilter, setSituacaoFilter] = React.useState<string>("all");
  const [selectedCliente, setSelectedCliente] = React.useState<typeof mockClientes[0] | null>(null);

  // Estatisticas
  const totalClientes = mockClientes.length;
  const clientesAtivos = mockClientes.filter(c => c.situacao === "Ativo").length;
  const clientesInadimplentes = mockClientes.filter(c => c.situacao === "Suspenso").length;
  const faturamentoTotal = mockClientes.reduce((acc, c) => acc + c.honorarioMensal, 0);

  // Filtros
  const filteredClientes = mockClientes.filter((cliente) => {
    const matchesSearch =
      cliente.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cliente.cnpj.includes(searchTerm) ||
      cliente.cidade.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRegime = regimeFilter === "all" || cliente.regimeTributario === regimeFilter;
    const matchesPorte = porteFilter === "all" || cliente.porte === porteFilter;
    const matchesSituacao = situacaoFilter === "all" || cliente.situacao === situacaoFilter;
    return matchesSearch && matchesRegime && matchesPorte && matchesSituacao;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Gestao de Clientes</h2>
          <p className="text-muted-foreground">
            Clientes cadastrados e integracao Alterdata
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Exportar
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Novo Cliente
          </Button>
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
                <p className="text-sm text-muted-foreground">Total de Clientes</p>
                <p className="text-2xl font-bold">{totalClientes}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-emerald-500/10">
                <Building2 className="h-6 w-6 text-emerald-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Clientes Ativos</p>
                <p className="text-2xl font-bold text-emerald-600">{clientesAtivos}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-red-500/10">
                <AlertCircle className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Inadimplentes</p>
                <p className="text-2xl font-bold text-red-600">{clientesInadimplentes}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-amber-500/10">
                <TrendingUp className="h-6 w-6 text-amber-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Faturamento Total</p>
                <p className="text-2xl font-bold text-amber-600">{formatCurrency(faturamentoTotal)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Integracao Alterdata */}
      <Card className="border-dashed border-2 border-muted-foreground/25">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5 text-[#0F3460]" />
            Integracao Alterdata
          </CardTitle>
          <CardDescription>
            Sincronizacao com Omega, Sigma e WinThor
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-white">
                <Building2 className="h-8 w-8 text-[#0F3460]" />
              </div>
              <div>
                <p className="font-semibold">API Alterdata Conectada</p>
                <p className="text-sm text-muted-foreground">
                  Ultima sincronizacao: Hoje as 08:30
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline">Configurar</Button>
              <Button>Sincronizar Agora</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabela de clientes */}
      <Card>
        <CardHeader>
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <CardTitle>Lista de Clientes</CardTitle>
              <CardDescription>
                {filteredClientes.length} clientes encontrados
              </CardDescription>
            </div>
            <div className="flex flex-wrap gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar por nome, CNPJ..."
                  className="pl-10 w-[220px]"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select value={regimeFilter} onValueChange={setRegimeFilter}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Regime" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos Regimes</SelectItem>
                  <SelectItem value="MEI">MEI</SelectItem>
                  <SelectItem value="Simples">Simples</SelectItem>
                  <SelectItem value="LucroPresumido">Lucro Presumido</SelectItem>
                  <SelectItem value="LucroReal">Lucro Real</SelectItem>
                </SelectContent>
              </Select>
              <Select value={porteFilter} onValueChange={setPorteFilter}>
                <SelectTrigger className="w-[130px]">
                  <SelectValue placeholder="Porte" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos Portes</SelectItem>
                  <SelectItem value="MEI">MEI</SelectItem>
                  <SelectItem value="ME">ME</SelectItem>
                  <SelectItem value="EPP">EPP</SelectItem>
                  <SelectItem value="Medio">Medio</SelectItem>
                  <SelectItem value="Grande">Grande</SelectItem>
                </SelectContent>
              </Select>
              <Select value={situacaoFilter} onValueChange={setSituacaoFilter}>
                <SelectTrigger className="w-[130px]">
                  <SelectValue placeholder="Situacao" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="Ativo">Ativo</SelectItem>
                  <SelectItem value="Inativo">Inativo</SelectItem>
                  <SelectItem value="Suspenso">Suspenso</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Codigo</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead>CNPJ</TableHead>
                <TableHead>Regime</TableHead>
                <TableHead>Porte</TableHead>
                <TableHead>Cidade</TableHead>
                <TableHead>Honorario</TableHead>
                <TableHead>Score</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredClientes.map((cliente) => (
                <TableRow key={cliente.id} className="cursor-pointer" onClick={() => setSelectedCliente(cliente)}>
                  <TableCell className="font-mono text-sm">{cliente.codigo}</TableCell>
                  <TableCell className="font-medium">{cliente.nome}</TableCell>
                  <TableCell className="font-mono text-sm">{cliente.cnpj}</TableCell>
                  <TableCell>
                    <Badge className={regimeConfig[cliente.regimeTributario]?.color}>
                      {regimeConfig[cliente.regimeTributario]?.label}
                    </Badge>
                  </TableCell>
                  <TableCell>{porteConfig[cliente.porte]?.label}</TableCell>
                  <TableCell>{cliente.cidade}</TableCell>
                  <TableCell className="font-semibold">
                    {formatCurrency(cliente.honorarioMensal)}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-12 bg-muted rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            cliente.scoreSaude >= 90 ? "bg-emerald-500" :
                            cliente.scoreSaude >= 70 ? "bg-amber-500" : "bg-red-500"
                          }`}
                          style={{ width: `${cliente.scoreSaude}%` }}
                        />
                      </div>
                      <span className="text-xs">{cliente.scoreSaude}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={situacaoConfig[cliente.situacao]?.color}>
                      {situacaoConfig[cliente.situacao]?.label}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon" onClick={(e) => e.stopPropagation()}>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Dialog de detalhes do cliente */}
      <Dialog open={!!selectedCliente} onOpenChange={() => setSelectedCliente(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{selectedCliente?.nome}</DialogTitle>
            <DialogDescription>
              Codigo: {selectedCliente?.codigo}
            </DialogDescription>
          </DialogHeader>
          {selectedCliente && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Building2 className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">CNPJ:</span>
                    <span className="font-mono">{selectedCliente.cnpj}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Cidade:</span>
                    <span>{selectedCliente.cidade}, {selectedCliente.estado}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Telefone:</span>
                    <span>{selectedCliente.telefone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Email:</span>
                    <span>{selectedCliente.email}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Regime:</span>
                    <Badge className={regimeConfig[selectedCliente.regimeTributario]?.color}>
                      {regimeConfig[selectedCliente.regimeTributario]?.label}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Cliente desde:</span>
                    <span>{new Date(selectedCliente.dataEntrada).toLocaleDateString('pt-BR')}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-muted-foreground">Responsavel:</span>
                    <span>{selectedCliente.responsavel}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-muted-foreground">Honorario:</span>
                    <span className="font-bold text-emerald-600">
                      {formatCurrency(selectedCliente.honorarioMensal)}
                    </span>
                  </div>
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-2">Servicos Contratados:</p>
                <div className="flex flex-wrap gap-2">
                  {selectedCliente.servicosContratados.map((servico) => (
                    <Badge key={servico} variant="outline">
                      {servico}
                    </Badge>
                  ))}
                </div>
              </div>
              {selectedCliente.observacoes && (
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Observacoes:</p>
                  <p className="text-sm bg-muted/50 p-3 rounded">{selectedCliente.observacoes}</p>
                </div>
              )}
              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline">Ver Historico</Button>
                <Button>Editar Cliente</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
