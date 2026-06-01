# Sistema de Gestao Contabil - Contabilidade Nobel

Sistema SaaS premium para gestao de lucros e rentabilidade de escritorio contabil.

## Funcionalidades

### Dashboard Executivo
- KPIs em tempo real: faturamento, lucro liquido, clientes, ponto de equilibrio
- Graficos interativos com Recharts
- Alertasautomaticos de tarefas e obrigacoes fiscais

### ERP Contabil
- **Receitas**: Gestao de honorarios, cobrancas e inadimplencia
- **Despesas**: Controle de custos fixos e variaveis
- **DRE Gerencial**: Demonstrativo de resultado em tempo real
- **Fluxo de Caixa**: Projecao 30/60/90 dias
- **Ponto de Equilibrio**: Analise de rentabilidade por cliente

### Gestao de Clientes
- Integracao com API Alterdata (Omega/Sigma/WinThor)
- Busca por nome, CNPJ, codigo
- Score de saude do cliente
- Filtros por regime tributario, porte e cidade

### Assistente IA
- Suporte a multiplos modelos gratuitos:
  - Groq (Llama 3 70B, Mixtral 8x7B)
  - Google Gemini 1.5 Flash
  - HuggingFace
  - Cohere Command R
- Prompts pre-configurados para contabilidade
- Contexto automatico por cliente

### Prospeccao de Clientes
- Base de 32 cidades do Norte de Minas Gerais
- 100 categorias de empresas
- Kanban de funil de vendas
- Geracao automatica de propostas via IA

## Tecnologias

- **Frontend**: Next.js 15, React 19, TypeScript
- **UI**: shadcn/ui, Tailwind CSS, Framer Motion
- **Graficos**: Recharts
- **Icones**: Lucide React
- **Estado**: Zustand
- **Formularios**: React Hook Form + Zod

## Configuracao das APIs

### Groq API (Gratuito)
1. Acesse https://console.groq.com/keys
2. Crie uma nova API key
3. Adicione ao arquivo `.env.local`:

```
GROQ_API_KEY=gsk_xxxxxxxxxxxx
```

### Google Gemini (Gratuito)
1. Acesse https://aistudio.google.com/app/apikey
2. Gere uma nova API key
3. Adicione ao arquivo `.env.local`:

```
GEMINI_API_KEY=AIzaSyxxxxxxxxxxxx
```

### HuggingFace (Gratuito)
1. Acesse https://huggingface.co/settings/tokens
2. Crie um token de acesso
3. Adicione ao arquivo `.env.local`:

```
HUGGINGFACE_API_KEY=hf_xxxxxxxxxxxx
```

### Cohere (Free Tier)
1. Acesse https://dashboard.cohere.com/api-keys
2. Crie uma nova API key
3. Adicione ao arquivo `.env.local`:

```
COHERE_API_KEY=xxxxxxxxxxxx
```

### API Alterdata (Premium)
Consulte a documentacao da Alterdata para obter:
- URL base da API
- Token de autenticacao

```
ALTERDATA_URL=https://api.alterdata.com.br
ALTERDATA_TOKEN=seu_token_aqui
```

## Variaveis de Ambiente

```env
# APIs de IA
GROQ_API_KEY=
GEMINI_API_KEY=
HUGGINGFACE_API_KEY=
COHERE_API_KEY=

# Integracao Alterdata
ALTERDATA_URL=
ALTERDATA_TOKEN=

# Configuracoes do Sistema
NEXT_PUBLIC_APP_NAME="Contabilidade Nobel"
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## Instalacao

```bash
# Instalar dependencias
pnpm install

# Executar em modo de desenvolvimento
pnpm dev

# Build para producao
pnpm build

# Iniciar em producao
pnpm start
```

## Scripts Disponiveis

- `pnpm dev` - Executar servidor de desenvolvimento
- `pnpm build` - Build para producao
- `pnpm start` - Iniciar servidor de producao
- `pnpm lint` - Verificar erros de lint

## Estrutura do Projeto

```
src/
├── app/
│   ├── page.tsx          # Dashboard principal
│   ├── layout.tsx       # Layout principal
│   ├── erp/             # Modulo ERP
│   │   ├── receitas/
│   │   ├── despesas/
│   │   ├── dre/
│   │   ├── fluxo-caixa/
│   │   └── ponto-equilibrio/
│   ├── clientes/        # Gestao de clientes
│   ├── prospeccao/      # Prospeccao de clientes
│   ├── ia/              # Assistente IA
│   └── configuracoes/    # Configuracoes do sistema
├── components/
│   ├── layout/          # Componentes de layout
│   └── ui/              # Componentes UI
└── lib/
    ├── types.ts         # Tipos TypeScript
    └── mock-data.ts     # Dados de demonstracao
```

## Licenca

Proprietario - Contabilidade Nobel
