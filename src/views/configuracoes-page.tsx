'use client';

import * as React from "react";
import {
  Settings,
  Building2,
  Users,
  Key,
  Database,
  Bell,
  Shield,
  Save,
  RefreshCw,
  Clock,
  Trash2,
  Play,
  Download,
  CheckCircle2,
  Server,
  Lock,
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { generatePlatformManualPDF } from "@/lib/pdf-generator";

export default function ConfiguracoesPage() {
  const [saving, setSaving] = React.useState(false);

  const handleDownloadManual = () => {
    toast.promise(
      new Promise((resolve) => {
        setTimeout(() => {
          generatePlatformManualPDF();
          resolve(true);
        }, 800);
      }),
      {
        loading: "Compilando manual oficial em formato PDF...",
        success: "PDF do Manual Operacional baixado com sucesso!",
        error: "Erro ao gerar PDF",
      }
    );
  };

  // Backup-specific states
  const [backups, setBackups] = React.useState<any[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("nobel_backups");
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {}
      }
    }
    return [
      { id: "b-1", nome: "Backup_Cron_Receitas_Despesas.db", data: "01/06/2026, 14:00:00", tamanho: "148 KB", hash: "sha256-4b8ef21e", tipo: "Automático (3h)" },
      { id: "b-2", nome: "Backup_Cron_Clientes_Contratos.db", data: "01/06/2026, 17:00:00", tamanho: "162 KB", hash: "sha256-e8da4910", tipo: "Automático (3h)" },
    ];
  });

  const [countdown, setCountdown] = React.useState("02h 57m 45s");
  const [isBackingUp, setIsBackingUp] = React.useState(false);
  const [backupStep, setBackupStep] = React.useState("");

  // Countdown timer simulation for 3h backups
  React.useEffect(() => {
    let secondsLeft = 10800; // 3 hours (3 * 3600)
    const interval = setInterval(() => {
      secondsLeft--;
      if (secondsLeft <= 0) {
        secondsLeft = 10800;
        // Trigger automatic backup simulation
        triggerAutoBackup();
      }
      const h = Math.floor(secondsLeft / 3600);
      const m = Math.floor((secondsLeft % 3600) / 60);
      const s = secondsLeft % 60;
      setCountdown(
        `${String(h).padStart(2, '0')}h ${String(m).padStart(2, '0')}m ${String(s).padStart(2, '0')}s`
      );
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Save backups list to localStorage
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("nobel_backups", JSON.stringify(backups));
    }
  }, [backups]);

  // Handle auto backup trigger
  const triggerAutoBackup = () => {
    const formattedDate = new Date().toLocaleString("pt-BR");
    const newBackup = {
      id: "b-auto-" + Date.now(),
      nome: `Backup_Automático_Completo.db`,
      data: formattedDate,
      tamanho: "175 KB",
      hash: "sha256-" + Math.random().toString(16).substring(2, 10),
      tipo: "Automático (3h)"
    };
    setBackups(prev => [newBackup, ...prev]);
    toast.info("Backup Automático de 3h realizado com sucesso no Banco de Dados!");
  };

  // Run manual backup process with beautiful step visualizer
  const handleManualBackup = () => {
    setIsBackingUp(true);
    const steps = [
      "Iniciando varredura das tabelas fiscais de receitas...",
      "Processando Livros Fiscais e Ativos Faturados...",
      "Processando Folhas de Pagamento e Admissões...",
      "Empacotando Base de Clientes, CRM e Contratos...",
      "Criptografando com módulo seguro de chave SHA-256...",
      "Sincronizando dump no Banco de Dados Cloud SQL...",
      "Backup catalogado com sucesso na nuvem fiduciária Nobel!"
    ];
    let currentStep = 0;
    setBackupStep(steps[0]);

    const runSteps = () => {
      setTimeout(() => {
        currentStep++;
        if (currentStep < steps.length) {
          setBackupStep(steps[currentStep]);
          runSteps();
        } else {
          setIsBackingUp(false);
          const formattedDate = new Date().toLocaleString("pt-BR");
          const newBackup = {
            id: "b-manual-" + Date.now(),
            nome: `Backup_Manual_Completo.db`,
            data: formattedDate,
            tamanho: `${Math.floor(Math.random() * 50) + 150} KB`,
            hash: "sha256-" + Math.random().toString(16).substring(2, 10),
            tipo: "Manual"
          };
          setBackups(prev => [newBackup, ...prev]);
          toast.success("Backup Manual efetuado com sucesso no Banco de Dados!");
        }
      }, 500);
    };

    runSteps();
  };

  const handleDeleteBackup = (id: string) => {
    setBackups(prev => prev.filter(b => b.id !== id));
    toast.success("Arquivo de backup removido do catálogo.");
  };

  const handleDownloadBackup = (backupNome: string) => {
    toast.success(`Iniciando download do dump para restauração: ${backupNome}`);
  };

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      toast.success("Configuracoes salvas com sucesso!");
    }, 1000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Configuracoes</h2>
          <p className="text-muted-foreground">
            Configure o sistema, APIs e preferencias
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2.5">
          <Button 
            onClick={handleDownloadManual}
            variant="outline" 
            className="border-amber-500/40 text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-950/20 font-black h-10 px-4"
          >
            <Download className="h-4 w-4 mr-2 text-amber-500 animate-pulse" />
            Baixar Manual PDF Completo
          </Button>

          <Button onClick={handleSave} disabled={saving} className="h-10 px-4">
            {saving ? (
              <>
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                Salvando...
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Salvar Alterações
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Tabs de configuracao */}
      <Tabs defaultValue="escritorio" className="space-y-6">
        <TabsList>
          <TabsTrigger value="escritorio">
            <Building2 className="h-4 w-4 mr-2" />
            Escritorio
          </TabsTrigger>
          <TabsTrigger value="metas">
            <Settings className="h-4 w-4 mr-2" />
            Metas
          </TabsTrigger>
          <TabsTrigger value="colaboradores">
            <Users className="h-4 w-4 mr-2" />
            Colaboradores
          </TabsTrigger>
          <TabsTrigger value="apis">
            <Key className="h-4 w-4 mr-2" />
            APIs
          </TabsTrigger>
          <TabsTrigger value="backup">
            <Database className="h-4 w-4 mr-2" />
            Backup
          </TabsTrigger>
          <TabsTrigger value="acesso">
            <Shield className="h-4 w-4 mr-2" />
            Acesso
          </TabsTrigger>
        </TabsList>

        {/* Dados do Escritorio */}
        <TabsContent value="escritorio">
          <Card>
            <CardHeader>
              <CardTitle>Dados do Escritorio</CardTitle>
              <CardDescription>
                Informacoes cadastrais da Contabilidade Nobel
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="nome">Nome do Escritorio</Label>
                  <Input id="nome" defaultValue="Contabilidade Nobel" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cnpj">CNPJ</Label>
                  <Input id="cnpj" defaultValue="12.345.678/0001-90" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="responsavel">Responsavel Tecnico</Label>
                  <Input id="responsavel" defaultValue="Ricardo Carlos Nobel" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="crc">CRC</Label>
                  <Input id="crc" defaultValue="MG-123456/O-5" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="telefone">Telefone</Label>
                  <Input id="telefone" defaultValue="(38) 3210-1234" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">E-mail</Label>
                  <Input id="email" type="email" defaultValue="contato@contabilidadenobel.com.br" />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="endereco">Endereco</Label>
                  <Input id="endereco" defaultValue="Av. Coronel Prates, 376 - Centro, Montes Claros - MG" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Metas */}
        <TabsContent value="metas">
          <Card>
            <CardHeader>
              <CardTitle>Metas do Escritorio</CardTitle>
              <CardDescription>
                Configure as metas mensais e anuais de faturamento
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="metaMensal">Meta de Faturamento Mensal</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">R$</span>
                    <Input id="metaMensal" type="number" className="pl-10" defaultValue="185000" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="metaAnual">Meta de Faturamento Anual</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">R$</span>
                    <Input id="metaAnual" type="number" className="pl-10" defaultValue="2200000" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pontoEquilibrio">Ponto de Equilibrio</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">R$</span>
                    <Input id="pontoEquilibrio" type="number" className="pl-10" defaultValue="82000" />
                  </div>
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="metaClientes">Meta de Clientes</Label>
                  <Input id="metaClientes" type="number" defaultValue="350" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="metaNovos">Meta de Novos Clientes/Mes</Label>
                  <Input id="metaNovos" type="number" defaultValue="12" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Colaboradores */}
        <TabsContent value="colaboradores">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div>
                  <CardTitle>Colaboradores</CardTitle>
                  <CardDescription>
                    Cadastro e gestao de colaboradores
                  </CardDescription>
                </div>
                <Button>
                  <Users className="h-4 w-4 mr-2" />
                  Novo Colaborador
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Lista de colaboradores em implementacao...
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        {/* APIs */}
        <TabsContent value="apis">
          <Card>
            <CardHeader>
              <CardTitle>Configuracao de APIs</CardTitle>
              <CardDescription>
                Configure as chaves de API para IA e integracoes
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Groq */}
              <div className="space-y-4 p-4 border rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-orange-500/10">
                      <Key className="h-5 w-5 text-orange-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold">GROQ API</h4>
                      <p className="text-xs text-muted-foreground">
                        https://api.groq.com/openai/v1/chat/completions
                      </p>
                    </div>
                  </div>
                  <Badge className="bg-orange-500/10 text-orange-700">Gratuito</Badge>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="groqKey">API Key</Label>
                  <Input id="groqKey" type="password" placeholder="gsk_..." />
                </div>
              </div>

              {/* Gemini */}
              <div className="space-y-4 p-4 border rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-blue-500/10">
                      <Key className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Google Gemini</h4>
                      <p className="text-xs text-muted-foreground">
                        https://generativelanguage.googleapis.com
                      </p>
                    </div>
                  </div>
                  <Badge className="bg-blue-500/10 text-blue-700">Gratuito</Badge>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="geminiKey">API Key</Label>
                  <Input id="geminiKey" type="password" placeholder="AI..." />
                </div>
              </div>

              {/* HuggingFace */}
              <div className="space-y-4 p-4 border rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-yellow-500/10">
                      <Key className="h-5 w-5 text-yellow-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold">HuggingFace</h4>
                      <p className="text-xs text-muted-foreground">
                        https://api-inference.huggingface.co
                      </p>
                    </div>
                  </div>
                  <Badge className="bg-yellow-500/10 text-yellow-700">Gratuito</Badge>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="hfKey">API Key</Label>
                  <Input id="hfKey" type="password" placeholder="hf_..." />
                </div>
              </div>

              {/* Alterdata */}
              <div className="space-y-4 p-4 border rounded-lg border-[#0F3460]/20">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-[#0F3460]/10">
                      <Key className="h-5 w-5 text-[#0F3460]" />
                    </div>
                    <div>
                      <h4 className="font-semibold">API Alterdata</h4>
                      <p className="text-xs text-muted-foreground">
                        Omega, Sigma e WinThor
                      </p>
                    </div>
                  </div>
                  <Badge className="bg-[#0F3460]/10 text-[#0F3460]">Premium</Badge>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="alterdataUrl">URL Base</Label>
                    <Input id="alterdataUrl" placeholder="https://api.alterdata.com.br" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="alterdataToken">Token</Label>
                    <Input id="alterdataToken" type="password" placeholder="Token de acesso" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Backup */}
        <TabsContent value="backup">
          <Card className="border-[#0C3E26]/10 shadow-sm">
            <CardHeader className="bg-gradient-to-r from-[#0C3E26]/5 to-transparent pb-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <CardTitle className="text-xl font-black text-[#0C3E26] dark:text-[#00b86b] flex items-center gap-2">
                    <Server className="w-5 h-5 text-[#D4AF37]" />
                    <span>Centro de Backup Contábil Automatizado</span>
                  </CardTitle>
                  <CardDescription>
                    Gerenciador de snapshots e redundância fiduciária em banco de dados
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2.5 bg-white dark:bg-slate-800 border border-[#0C3E26]/10 rounded-xl px-4 py-2 self-start md:self-auto">
                  <Clock className="w-4 h-4 text-[#D3af37] animate-spin" />
                  <div className="text-left">
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Próximo Auto-backup (3h)</p>
                    <p className="text-sm font-black text-[#0C3E26] dark:text-[#00b86b] font-mono leading-none mt-0.5">{countdown}</p>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              {/* Info banner about 3h scheduling */}
              <div className="p-4 bg-emerald-500/10 dark:bg-emerald-500/15 rounded-xl border border-emerald-500/20 flex gap-3.5 items-start">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 mt-0.5 shrink-0" />
                <div className="text-xs">
                  <p className="font-extrabold text-[#0C3E26] dark:text-[#00b86b] uppercase tracking-wide">Backup Automático a cada 3h Ativo</p>
                  <p className="text-slate-600 dark:text-slate-355 mt-1 font-semibold leading-relaxed">
                    Nossa central de faturamento automatizado sincroniza e realiza o dump de receitas, despesas, propostas e histórico de clientes diretamente no banco de dados seguro da Contabilidade Nobel a cada 3 horas. Próximo ciclo agendado com sucesso.
                  </p>
                </div>
              </div>

              {/* Action grid (Manual triggers and step logs) */}
              <div className="grid gap-6 md:grid-cols-12">
                <div className="md:col-span-4 space-y-4">
                  <h4 className="font-extrabold text-xs text-slate-400 uppercase tracking-wider flex items-center gap-2">
                    <span>Ações Operacionais</span>
                  </h4>
                  
                  <div className="p-4 border rounded-xl bg-slate-50/50 dark:bg-slate-900/30 space-y-4">
                    <p className="text-xs text-slate-500 font-semibold leading-relaxed">
                      Deseja forçar uma cópia de segurança antes de realizar fechamentos adicionais?
                    </p>
                    
                    <Button 
                      onClick={handleManualBackup} 
                      disabled={isBackingUp}
                      className="w-full bg-gradient-to-r from-[#D4AF37] to-[#0C3E26] text-white font-black text-xs py-2.5 hover:shadow-lg transition-all"
                    >
                      {isBackingUp ? (
                        <>
                          <RefreshCw className="h-3.5 w-3.5 mr-2 animate-spin" />
                          <span>Processando Backup...</span>
                        </>
                      ) : (
                        <>
                          <Play className="h-3.5 w-3.5 mr-2" />
                          <span>Fazer Backup Agora</span>
                        </>
                      )}
                    </Button>
                  </div>

                  {/* Manual backup execution visualizer */}
                  {isBackingUp && (
                    <div className="p-4 rounded-xl border-l-4 border-[#D4AF37] bg-[#D4AF37]/5 dark:bg-[#D4AF37]/10 space-y-2 animate-pulse">
                      <div className="flex items-center gap-2">
                        <Lock className="w-3.5 h-3.5 text-[#D4AF37]" />
                        <span className="text-[10px] uppercase font-bold text-[#D4AF37]">Progresso Operacional</span>
                      </div>
                      <p className="text-[11px] font-mono text-slate-600 dark:text-slate-300 font-black leading-snug">
                        {backupStep}
                      </p>
                    </div>
                  )}

                  <div className="space-y-2 pt-2">
                    <Label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Exportar Dados Manualmente</Label>
                    <div className="grid grid-cols-3 gap-2">
                      <Button variant="outline" size="sm" onClick={() => toast.success("Exportando JSON de Receitas e Despesas...")} className="text-[10px] font-black h-9 border border-[#0C3E26]/10">JSON</Button>
                      <Button variant="outline" size="sm" onClick={() => toast.success("Exportando CSV estruturado de Clientes...")} className="text-[10px] font-black h-9 border border-[#0C3E26]/10">CSV</Button>
                      <Button variant="outline" size="sm" onClick={() => toast.success("Gerando Planilha XLS de DRE...")} className="text-[10px] font-black h-9 border border-[#0C3E26]/10">EXCEL</Button>
                    </div>
                  </div>
                </div>

                <div className="md:col-span-8 space-y-3">
                  <h4 className="font-extrabold text-xs text-slate-400 uppercase tracking-wider">
                    Histórico de Backups e Pontos de Restauração (Banco de Dados)
                  </h4>

                  <div className="border border-slate-150 dark:border-slate-800 rounded-xl overflow-hidden bg-white dark:bg-[#15233a]">
                    <div className="bg-slate-50 dark:bg-slate-900/40 p-3 text-[10px] font-black uppercase tracking-wider text-slate-400 grid grid-cols-12 gap-2 border-b border-slate-150 dark:border-slate-800">
                      <div className="col-span-4">Nome do Arquivo</div>
                      <div className="col-span-3">Data/Hora</div>
                      <div className="col-span-2">Tamanho</div>
                      <div className="col-span-2">Tipo</div>
                      <div className="col-span-1 text-right">Ação</div>
                    </div>

                    <div className="divide-y divide-slate-100 dark:divide-slate-800/65 max-h-[240px] overflow-y-auto">
                      {backups.map((bak) => (
                        <div key={bak.id} className="p-3 text-xs grid grid-cols-12 gap-2 items-center hover:bg-slate-500/5 transition-colors">
                          <div className="col-span-4 font-mono text-[11px] font-bold text-[#0C3E26] dark:text-[#52cfa4] truncate" title={bak.nome}>
                            {bak.nome}
                            <div className="text-[9px] text-slate-400 select-none text-ellipsis overflow-hidden font-normal tracking-tight">{bak.hash}</div>
                          </div>
                          <div className="col-span-3 text-slate-500 font-medium">{bak.data}</div>
                          <div className="col-span-2 font-mono text-xs font-semibold">{bak.tamanho}</div>
                          <div className="col-span-2">
                            <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                              bak.tipo.includes("Automático") 
                                ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-500/10 dark:text-emerald-450' 
                                : 'bg-blue-100 text-blue-800 dark:bg-blue-500/10 dark:text-blue-450'
                            }`}>
                              {bak.tipo}
                            </span>
                          </div>
                          <div className="col-span-1 text-right flex justify-end gap-1">
                            <button 
                              onClick={() => handleDownloadBackup(bak.nome)} 
                              className="p-1 bg-slate-100 hover:bg-emerald-500 hover:text-white dark:bg-slate-850 dark:hover:bg-emerald-600 rounded transition-colors text-slate-500 border-none cursor-pointer"
                              title="Fazer download"
                            >
                              <Download className="w-3.5 h-3.5" />
                            </button>
                            <button 
                              onClick={() => handleDeleteBackup(bak.id)} 
                              className="p-1 bg-slate-100 hover:bg-red-500 hover:text-white dark:bg-slate-850 dark:hover:bg-red-600 rounded transition-colors text-slate-500 border-none cursor-pointer"
                              title="Remover"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                      
                      {backups.length === 0 && (
                        <div className="p-8 text-center text-xs text-slate-400 font-bold uppercase tracking-wider">
                          Nenhum backup catalogado no sistema.
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Controle de Acesso */}
        <TabsContent value="acesso">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-[#0F3460]" />
                Controle de Acesso
              </CardTitle>
              <CardDescription>
                Gerencie usuarios e permissoes do sistema
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">Ricardo Carlos Nobel</p>
                    <p className="text-sm text-muted-foreground">ricardo@contabilidadenobel.com.br</p>
                  </div>
                  <Badge className="bg-[#0F3460]">Administrador</Badge>
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">Ana Paula Souza</p>
                    <p className="text-sm text-muted-foreground">ana@nobel.com.br</p>
                  </div>
                  <Badge variant="outline">Contador</Badge>
                </div>
              </div>
              <Button variant="outline">
                <Users className="h-4 w-4 mr-2" />
                Convidar Novo Usuario
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
