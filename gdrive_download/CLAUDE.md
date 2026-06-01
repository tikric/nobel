# Contabilidade Nobel - Sistema de Gestao Contabil

## Overview
Sistema SaaS premium para gestao de lucros e rentabilidade de escritorio contábil. Focado em ajudar contadores a enxergar e aumentar a lucratividade do proprio escritório.

## Tech Stack
- **Framework**: Next.js 15 (App Router)
- **UI**: shadcn/ui, Tailwind CSS, Framer Motion
- **Graficos**: Recharts
- **Icones**: Lucide React
- **Estado**: Zustand (configurado)
- **Formularios**: React Hook Form + Zod
- **Datas**: date-fns
- **Notificacoes**: Sonner (react-hot-toast)
- **Tema**: Dark/Light mode com next-themes

## Directory Structure
```
src/
├── app/
│   ├── page.tsx              # Dashboard Executivo
│   ├── layout.tsx           # Layout principal com sidebar
│   ├── globals.css          # Variaveis de tema customizado
│   ├── erp/                 # Modulo ERP
│   │   ├── page.tsx         # Visao geral do ERP
│   │   ├── receitas/        # Gestao de Receitas
│   │   ├── despesas/        # Gestao de Despesas
│   │   ├── dre/             # DRE Gerencial
│   │   ├── fluxo-caixa/    # Fluxo de Caixa
│   │   └── ponto-equilibrio/ # Ponto de Equilibrio
│   ├── clientes/            # Gestao de Clientes + Alterdata
│   ├── prospeccao/          # Prospeccao Norte de Minas
│   ├── ia/                  # Assistente IA Multi-Modelo
│   └── configuracoes/        # Configuracoes do Sistema
├── components/
│   ├── layout/               # AppSidebar, AppHeader
│   └── ui/                  # Componentes shadcn/ui
└── lib/
    ├── types.ts              # Tipos TypeScript
    └── mock-data.ts          # Dados de demonstracao
```

## Design System
- **Cores Principais**: Azul escuro (#0F3460), Verde esmeralda (#16A085)
- **Layout**: Sidebar fixa esquerda, topbar com notificacoes
- **Fonte**: Inter (Google Fonts)
- **Dark/Light Mode**: Toggle automatico

## Core Systems

### Dashboard Executivo
- Status: Implementado
- KPIs: Faturamento, Lucro Liquido, Clientes, Ponto de Equilibrio
- Graficos: Barras, Pizza, Area, Gauges
- Alertas: Tarefas pendentes, Obrigacoes fiscais

### ERP Contabil
- Status: Implementado
- Modulos: Receitas, Despesas, DRE, Fluxo de Caixa, Ponto de Equilibrio
- Features: Filtros, ordenacao, exportacao

### Gestao de Clientes
- Status: Implementado
- Integracao: Mock Alterdata (API configuravel)
- Features: Busca por nome/CNPJ, score de saude, dialog de detalhes

### Assistente IA
- Status: Implementado
- Modelos: Groq, Gemini, HuggingFace, Cohere (gratuitos)
- Prompts: Pre-configurados para contabilidade

### Prospeccao
- Status: Implementado
- Regiao: Norte de Minas Gerais (32 cidades)
- Categorias: 100 tipos de empresas
- Kanban: Funil de vendas completo

### Configuracoes
- Status: Implementado
- Modulos: Escritorio, Metas, Colaboradores, APIs, Backup, Acesso

## API Configuration

### Variaveis de Ambiente (.env.local)
```env
GROQ_API_KEY=
GEMINI_API_KEY=
HUGGINGFACE_API_KEY=
COHERE_API_KEY=
ALTERDATA_URL=
ALTERDATA_TOKEN=
```

## Maintenance Log
- 2025-06-01: Criacao inicial do sistema completo
  - Dashboard Executivo com KPIs e graficos
  - ERP Contabil (Receitas, Despesas, DRE, Fluxo de Caixa, Ponto de Equilibrio)
  - Gestao de Clientes com integracao mock Alterdata
  - Assistente IA com multiplos modelos gratuitos
  - Prospeccao focada em Norte de Minas
  - Modulo de Configuracoes completo
