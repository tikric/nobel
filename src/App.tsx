import * as React from "react";
import LandingPage from "@/components/LandingPage";
import EnterprisePlatform from "@/components/EnterprisePlatform";
import LoginGate from "@/components/LoginGate";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Toaster } from "@/components/ui/sonner";
import GlobalClientEffects from "@/components/GlobalClientEffects";
import { AnimatePresence, motion } from "motion/react";

const DEFAULT_INFORMATIVOS = [
  {
    id: "inf-1",
    mes: "Março 2026",
    titulo: "Regras de IRPF 2026 e Isenção de Distribuição de Lucros",
    conteudo: "A temporada de Imposto de Renda exige atenção de sócios e diretores. A isenção tributária sobre lucros distribuídos é assegurada pela escrituração contábil regular. Na Nobel, nossa inteligência de monitoria avisa antecipadamente sobre gargalos nas declarações acessórias de IRPF.",
    dataEmissao: "12/03/2026",
    autor: "IA Nobel & Érika"
  },
  {
    id: "inf-2",
    mes: "Abril 2026",
    titulo: "Como o Domicílio Eletrônico (DTE) Blindará sua Empresa",
    conteudo: "Secretarias de Fazenda estaduais e municipais estão emitindo avisos de fiscalização exclusivamente por portais virtuais (DTE). Nossa plataforma de inteligência artificial automatizou as consultas diárias das caixas postais fiscais, permitindo conformidade instantânea e eliminando riscos de sanções.",
    dataEmissao: "15/04/2026",
    autor: "IA Nobel & Érika"
  },
  {
    id: "inf-3",
    mes: "Maio 2026",
    titulo: "Mudanças e Planejamento Fiscal para o Segundo Semestre",
    conteudo: "O monitoramento contínuo das faixas de receita no Simples Nacional é indispensável. Empresas em escala rápida de faturamento correm o risco de ultrapassar limites estaduais, o que acarreta cobranças retroativas graves. Sugerimos elisão consultiva preventiva.",
    dataEmissao: "22/05/2026",
    autor: "IA Nobel & Érika"
  }
];

export default function App() {
  const [isPlatformActive, setIsPlatformActive] = React.useState(false);
  const [isLoggedIn, setIsLoggedIn] = React.useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("nobel_admin_logged") === "true";
    }
    return false;
  });
  const [theme, setTheme] = React.useState<'light' | 'dark'>('light');
  const [informativos, setInformativos] = React.useState<any[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("nobel_informativos");
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          // ignore error
        }
      }
    }
    return DEFAULT_INFORMATIVOS;
  });

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
    if (typeof window !== "undefined") {
      if (nextTheme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  };

  React.useEffect(() => {
    // Sync current document class name with theme state
    if (typeof window !== "undefined") {
      const isDark = document.documentElement.classList.contains('dark');
      setTheme(isDark ? 'dark' : 'light');
    }
  }, []);

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("nobel_informativos", JSON.stringify(informativos));
    }
  }, [informativos]);

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("nobel_admin_logged");
    }
    setIsLoggedIn(false);
    setIsPlatformActive(false);
  };

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
      disableTransitionOnChange
    >
      <div className="w-full min-h-screen bg-background text-foreground overflow-x-hidden">
        <AnimatePresence mode="wait">
          {!isPlatformActive ? (
            <motion.div
              key="landing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="w-full min-h-screen"
            >
              <LandingPage 
                onEnterPlatform={() => setIsPlatformActive(true)} 
                informativos={informativos}
              />
            </motion.div>
          ) : !isLoggedIn ? (
            <motion.div
              key="login-gate"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.3 }}
              className="w-full min-h-screen"
            >
              <LoginGate 
                onSuccess={() => setIsLoggedIn(true)} 
                onCancel={() => setIsPlatformActive(false)} 
              />
            </motion.div>
          ) : (
            <motion.div
              key="platform"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="w-full min-h-screen"
            >
              <EnterprisePlatform 
                onBackToLanding={handleLogout} 
                theme={theme}
                toggleTheme={toggleTheme}
                informativos={informativos}
                setInformativos={setInformativos}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <GlobalClientEffects />
      <Toaster position="top-right" richColors />
    </ThemeProvider>
  );
}
