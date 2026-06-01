import * as React from "react";
import { Mail, Lock, ArrowRight, User, RefreshCw, Check, CheckCircle2, ShieldCheck, HelpCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import NobelLogo from "./NobelLogo";
import erikaPortraitAsset from '@/assets/images/erika.png';

interface LoginGateProps {
  onSuccess: () => void;
  onCancel: () => void;
}

export default function LoginGate({ onSuccess, onCancel }: LoginGateProps) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [view, setView] = React.useState<"login" | "forgot" | "sent_email" | "reset_password">("login");
  
  // Local storage based credentials management so it persists and is modifiable!
  const [storedCredentials, setStoredCredentials] = React.useState(() => {
    if (typeof window !== "undefined") {
      const savedEmail = localStorage.getItem("nobel_admin_email") || "erika@contabilidadenobel.com.br";
      const savedPass = localStorage.getItem("nobel_admin_pass") || "admin2026";
      return { email: savedEmail, pass: savedPass };
    }
    return { email: "erika@contabilidadenobel.com.br", pass: "admin2026" };
  });

  const [recoverEmail, setRecoverEmail] = React.useState("");
  const [newPassword, setNewPassword] = React.useState("");
  const [confirmNewPassword, setConfirmNewPassword] = React.useState("");

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    setTimeout(() => {
      if (email.trim() === storedCredentials.email && password === storedCredentials.pass) {
        localStorage.setItem("nobel_admin_logged", "true");
        onSuccess();
      } else {
        setError("E-mail ou senha incorretos para o painel executivo.");
      }
      setIsLoading(false);
    }, 700);
  };

  const handleRequestReset = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!recoverEmail.trim()) {
      setError("Favor digitar seu e-mail.");
      return;
    }
    setIsLoading(true);

    setTimeout(() => {
      if (recoverEmail.trim().toLowerCase() === storedCredentials.email.toLowerCase()) {
        setView("sent_email");
      } else {
        setError("Este e-mail não corresponde ao administrador cadastrado.");
      }
      setIsLoading(false);
    }, 800);
  };

  const handleSaveNewPassword = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (newPassword.length < 4) {
      setError("A senha deve conter no mínimo 4 caracteres.");
      return;
    }
    if (newPassword !== confirmNewPassword) {
      setError("As senhas não coincidem.");
      return;
    }
    setIsLoading(true);

    setTimeout(() => {
      localStorage.setItem("nobel_admin_pass", newPassword);
      setStoredCredentials(prev => ({ ...prev, pass: newPassword }));
      setPassword(newPassword);
      setEmail(storedCredentials.email);
      setView("login");
      setError("");
      setIsLoading(false);
      // Show recovery alert success
      alert("Senha alterada com sucesso! Entre com seus novos dados.");
    }, 600);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#090D16] flex flex-col justify-center py-10 px-4 sm:px-6 lg:px-8 relative overflow-hidden transition-colors duration-300">
      {/* Structural visual cues */}
      <div className="absolute top-0 left-0 w-full h-1 bg-[#0C3E26]" />
      
      {/* Decorative ambient elements */}
      <div className="absolute top-[-10%] right-[-10%] w-[350px] h-[350px] rounded-full bg-[#0C3E26]/5 blur-3xl" />
      <div className="absolute bottom-[-10%] left-[-15%] w-[400px] h-[400px] rounded-full bg-[#00b86b]/3 blur-3xl" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center z-10">
        <div className="flex justify-center mb-4">
          <NobelLogo className="h-14 sm:h-16" />
        </div>
        <p className="mt-1 text-xs text-slate-500 font-bold uppercase tracking-wider">
          Acesso Restrito · Cockpit Executivo
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-[460px] z-10">
        <div className="bg-white dark:bg-[#0F172A] py-8 px-6 sm:px-10 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 shadow-md">
          <AnimatePresence mode="wait">
            {view === "login" && (
              <motion.div
                key="login-form"
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 15 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                <div className="text-left">
                  <h2 className="text-xl font-display font-black text-slate-900 dark:text-white">
                    Entrar como Administrador
                  </h2>
                  <p className="text-xs text-slate-400 mt-1">
                    Insira suas credenciais exclusivas para acessar o ERP e CRM.
                  </p>
                </div>

                {error && (
                  <div className="p-3.5 bg-rose-50 dark:bg-rose-950/20 border border-rose-100 dark:border-rose-900/30 rounded-xl text-xs text-rose-600 dark:text-rose-400 font-bold flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0" />
                    {error}
                  </div>
                )}

                <form onSubmit={handleLoginSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-widest mb-1.5">
                      E-mail do Admin
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail className="h-4 w-4 text-slate-400" />
                      </div>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="nome@contabilidadenobel.com.br"
                        className="block w-full pl-10 pr-3 py-2.5 text-xs text-slate-900 dark:text-white bg-slate-50 dark:bg-slate-800/50 border border-slate-250 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-[#00b86b] focus:border-[#00b86b] outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-widest">
                        Senha de Acesso
                      </label>
                      <button
                        type="button"
                        onClick={() => setView("forgot")}
                        className="text-[11px] font-bold text-[#00b86b] hover:text-[#0C3E26] bg-transparent border-none p-0 cursor-pointer"
                      >
                        Esqueceu a senha?
                      </button>
                    </div>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock className="h-4 w-4 text-slate-400" />
                      </div>
                      <input
                        type="password"
                        required
                        value={password}
                        placeholder="••••••••"
                        onChange={(e) => setPassword(e.target.value)}
                        className="block w-full pl-10 pr-3 py-2.5 text-xs text-slate-900 dark:text-white bg-slate-50 dark:bg-slate-800/50 border border-slate-250 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-[#00b86b] focus:border-[#00b86b] outline-none"
                      />
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full bg-[#0C3E26] hover:bg-[#0b5c3a] text-white py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-sm border-none transition-colors cursor-pointer"
                    >
                      {isLoading ? (
                        <>
                          <RefreshCw className="w-4 h-4 animate-spin" />
                          <span>Autenticando...</span>
                        </>
                      ) : (
                        <>
                          <span>Entrar no Sistema</span>
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>
                </form>

                <div className="border-t border-slate-100 dark:border-slate-800/60 pt-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full border border-slate-200 dark:border-slate-800 shrink-0 overflow-hidden bg-slate-100 flex items-center justify-center">
                      <img 
                        src={erikaPortraitAsset} 
                        alt="Erika" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="text-[10px] text-slate-500 text-left">
                      <p className="font-bold text-slate-700 dark:text-slate-300">Érika Blank</p>
                      <p>Gestora da Nobel</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={onCancel}
                    className="text-xs font-bold text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 border border-slate-200 dark:border-slate-800 bg-transparent px-3 py-1.5 rounded-lg cursor-pointer"
                  >
                    Voltar ao Site
                  </button>
                </div>
              </motion.div>
            )}

            {view === "forgot" && (
              <motion.div
                key="forgot-form"
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 15 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                <div className="text-left">
                  <h2 className="text-xl font-display font-black text-slate-900 dark:text-white">
                    Redefinir Senha do Admin
                  </h2>
                  <p className="text-xs text-slate-400 mt-1">
                    Digite o e-mail administrativo correspondente para redefinição.
                  </p>
                </div>

                {error && (
                  <div className="p-3.5 bg-rose-50 dark:bg-rose-950/20 border border-rose-100 dark:border-rose-900/30 rounded-xl text-xs text-rose-600 dark:text-rose-400 font-bold flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0" />
                    {error}
                  </div>
                )}

                <form onSubmit={handleRequestReset} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-widest mb-1.5">
                      Seu E-mail Corporativo
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail className="h-4 w-4 text-slate-400" />
                      </div>
                      <input
                        type="email"
                        required
                        value={recoverEmail}
                        onChange={(e) => setRecoverEmail(e.target.value)}
                        placeholder="erika@contabilidadenobel.com.br"
                        className="block w-full pl-10 pr-3 py-2.5 text-xs text-slate-900 dark:text-white bg-slate-50 dark:bg-slate-800/50 border border-slate-250 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-[#00b86b] focus:border-[#00b86b] outline-none"
                      />
                    </div>
                  </div>

                  <div className="pt-2 flex gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        setView("login");
                        setError("");
                      }}
                      className="flex-1 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 py-2.5 rounded-xl font-bold text-xs border-none cursor-pointer"
                    >
                      Voltar
                    </button>
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="flex-1 bg-[#0C3E26] hover:bg-[#0b5c3a] text-white py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-sm border-none transition-colors cursor-pointer"
                    >
                      {isLoading ? (
                        <RefreshCw className="w-4 h-4 animate-spin" />
                      ) : (
                        <span>Simular E-mail</span>
                      )}
                    </button>
                  </div>
                </form>
              </motion.div>
            )}

            {view === "sent_email" && (
              <motion.div
                key="sent-email-alert"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25 }}
                className="space-y-6 text-center"
              >
                <div className="flex flex-col items-center justify-center">
                  <div className="w-14 h-14 bg-emerald-50 dark:bg-emerald-950/30 rounded-full flex items-center justify-center text-emerald-500 mb-4 border border-emerald-100 dark:border-emerald-900/30">
                    <Mail className="w-7 h-7" />
                  </div>
                  <h2 className="text-xl font-display font-black text-slate-900 dark:text-white">
                    Simulação de Envio de E-mail
                  </h2>
                  <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                    Um link de redefinição seguro foi disparado para o e-mail:
                    <br />
                    <span className="font-extrabold text-slate-700 dark:text-slate-350">{storedCredentials.email}</span>
                  </p>
                </div>

                {/* Simulated Email Box inside Dashboard */}
                <div className="bg-slate-50 dark:bg-slate-800/40 p-4 rounded-xl border border-dashed border-slate-250 dark:border-slate-700 text-left">
                  <div className="flex items-center justify-between text-[10px] text-slate-400 mb-2 border-b border-slate-150 dark:border-slate-800 pb-1.5">
                    <span>Para: {storedCredentials.email}</span>
                    <span className="bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 px-1.5 py-0.5 rounded font-bold uppercase text-[8px]">Recebido</span>
                  </div>
                  <p className="text-[11px] font-extrabold text-slate-700 dark:text-slate-300">Nobel Seguros - Solicitação de Redefinição</p>
                  <p className="text-[11px] text-slate-500 mt-1 mb-3">
                    Olá Érika, clique abaixo para alterar a sua senha para o erp nobel contabilidade de forma instantânea.
                  </p>
                  <button
                    onClick={() => {
                      setView("reset_password");
                      setError("");
                    }}
                    className="w-full bg-[#00b86b] hover:bg-[#0a5c3a] text-white py-2 rounded-lg font-bold text-xs border-none flex items-center justify-center gap-1.5 duration-250 cursor-pointer"
                  >
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Redefinir Senha Agora</span>
                  </button>
                </div>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setView("login");
                    }}
                    className="text-xs font-bold text-[#00b86b] hover:underline bg-transparent border-none p-0 cursor-pointer"
                  >
                    Voltar para o Login
                  </button>
                </div>
              </motion.div>
            )}

            {view === "reset_password" && (
              <motion.div
                key="reset-password-form"
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -15 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                <div className="text-left">
                  <h2 className="text-xl font-display font-black text-slate-900 dark:text-white">
                    Definir Nova Senha
                  </h2>
                  <p className="text-xs text-slate-400 mt-1">
                    Crie uma nova senha de segurança exclusiva para a sua conta.
                  </p>
                </div>

                {error && (
                  <div className="p-3.5 bg-rose-50 dark:bg-rose-950/20 border border-rose-100 dark:border-rose-900/30 rounded-xl text-xs text-rose-600 dark:text-rose-400 font-bold flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0" />
                    {error}
                  </div>
                )}

                <form onSubmit={handleSaveNewPassword} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-widest mb-1.5">
                      Nova Senha de Acesso
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock className="h-4 w-4 text-slate-400" />
                      </div>
                      <input
                        type="password"
                        required
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="Mínimo 4 caracteres"
                        className="block w-full pl-10 pr-3 py-2.5 text-xs text-slate-900 dark:text-white bg-slate-50 dark:bg-slate-800/50 border border-slate-250 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-[#00b86b] focus:border-[#00b86b] outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-widest mb-1.5">
                      Confirmar Nova Senha
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock className="h-4 w-4 text-slate-400" />
                      </div>
                      <input
                        type="password"
                        required
                        value={confirmNewPassword}
                        onChange={(e) => setConfirmNewPassword(e.target.value)}
                        placeholder="Repita a nova senha"
                        className="block w-full pl-10 pr-3 py-2.5 text-xs text-slate-900 dark:text-white bg-slate-50 dark:bg-slate-800/50 border border-slate-250 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-[#00b86b] focus:border-[#00b86b] outline-none"
                      />
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full bg-[#00b86b] hover:bg-[#0a5c3a] text-white py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-sm border-none transition-colors cursor-pointer"
                    >
                      {isLoading ? (
                        <RefreshCw className="w-4 h-4 animate-spin" />
                      ) : (
                        <span>Atualizar Senha & Logar</span>
                      )}
                    </button>
                  </div>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
