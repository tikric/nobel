'use client';

import * as React from "react";
import { Bell, Search, Sun, Moon, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { useTheme } from "next-themes";
import { mockTarefas, mockObrigacoesFiscais } from "@/lib/mock-data";

export function AppHeader() {
  const { theme, setTheme } = useTheme();
  const [searchOpen, setSearchOpen] = React.useState(false);

  // Contagem de alertas
  const tarefasPendentes = mockTarefas.filter(t => t.status === 'Pendente' || t.status === 'EmAndamento').length;
  const obrigacoesPendentes = mockObrigacoesFiscais.filter(o => o.status === 'Pendente').length;
  const totalAlertas = tarefasPendentes + obrigacoesPendentes;

  // Data atual formatada
  const dataAtual = new Date().toLocaleDateString('pt-BR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  return (
    <header className="sticky top-0 z-40 flex h-16 items-center gap-4 border-b border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-6">
      {/* Sidebar trigger para mobile */}
      <Button variant="ghost" size="icon" className="md:hidden">
        <Search className="h-5 w-5" />
      </Button>

      {/* Titulo da pagina */}
      <div className="flex-1">
        <h1 className="text-lg font-semibold text-foreground">
          Sistema de Gestao Contabil
        </h1>
        <p className="text-xs text-muted-foreground hidden sm:block">{dataAtual}</p>
      </div>

      {/* Barra de pesquisa */}
      <div className="hidden md:flex items-center relative w-80">
        <Search className="absolute left-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Buscar clientes, tarefas..."
          className="pl-10 bg-muted/50 border-0 focus-visible:ring-1"
        />
        <kbd className="absolute right-3 pointer-events-none hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground sm:flex">
          <span className="text-xs">Ctrl</span>K
        </kbd>
      </div>

      <div className="flex items-center gap-2">
        {/* Toggle de tema */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="text-muted-foreground hover:text-foreground"
        >
          <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Alternar tema</span>
        </Button>

        {/* Notificacoes */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative text-muted-foreground hover:text-foreground">
              <Bell className="h-5 w-5" />
              {totalAlertas > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-[10px] font-bold text-white">
                  {totalAlertas}
                </span>
              )}
              <span className="sr-only">Notificacoes</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <div className="flex items-center justify-between px-2 py-1.5 border-b">
              <span className="text-sm font-semibold">Notificacoes</span>
              <Badge variant="secondary" className="text-xs">{totalAlertas} pendentes</Badge>
            </div>

            {/* Tarefas */}
            {mockTarefas.slice(0, 3).map((tarefa) => (
              <DropdownMenuItem key={tarefa.id} className="flex items-start gap-3 py-3 cursor-pointer">
                <div className={`mt-0.5 h-2 w-2 rounded-full ${
                  tarefa.prioridade === 'Critica' ? 'bg-red-500' :
                  tarefa.prioridade === 'Alta' ? 'bg-amber-500' :
                  'bg-blue-500'
                }`} />
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium">{tarefa.titulo}</p>
                  <p className="text-xs text-muted-foreground">
                    Prazo: {new Date(tarefa.prazo).toLocaleDateString('pt-BR')}
                  </p>
                </div>
                <Badge variant="outline" className="text-xs">
                  {tarefa.prioridade}
                </Badge>
              </DropdownMenuItem>
            ))}

            {/* Obrigacoes fiscais */}
            {mockObrigacoesFiscais.filter(o => o.status === 'Pendente').slice(0, 2).map((obrigacao) => (
              <DropdownMenuItem key={obrigacao.id} className="flex items-start gap-3 py-3 cursor-pointer">
                <div className="mt-0.5 h-2 w-2 rounded-full bg-amber-500" />
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium">{obrigacao.nome}</p>
                  <p className="text-xs text-muted-foreground">
                    Vence: {new Date(obrigacao.prazo).toLocaleDateString('pt-BR')}
                  </p>
                </div>
                <Badge variant="outline" className="text-xs">
                  {obrigacao.periodicidade}
                </Badge>
              </DropdownMenuItem>
            ))}

            <div className="border-t pt-2">
              <DropdownMenuItem className="text-center text-sm text-primary cursor-pointer justify-center">
                Ver todas as notificacoes
              </DropdownMenuItem>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Meta do mes */}
        <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
          <Calendar className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
          <div className="flex flex-col">
            <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">META JUN</span>
            <span className="text-sm font-bold text-emerald-700 dark:text-emerald-300">
              R$ 185.000
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
