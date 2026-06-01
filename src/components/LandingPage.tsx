import React, { useState } from 'react';
import { 
  Building2, 
  Repeat, 
  Wallet, 
  Receipt, 
  Briefcase, 
  Sparkles, 
  TrendingUp, 
  CheckCircle2, 
  ArrowRight, 
  MessageCircle, 
  LogIn, 
  LayoutDashboard, 
  ShieldCheck, 
  Zap, 
  Users, 
  Globe,
  Instagram,
  Facebook,
  Award as AwardIcon,
  Smartphone,
  Send,
  Check,
  Newspaper
} from 'lucide-react';
import { motion } from 'motion/react';
import { landingServices, landingTestimonials } from '../data';
import NobelLogo from './NobelLogo';

interface LandingPageProps {
  onEnterPlatform: () => void;
  informativos: any[];
}

export default function LandingPage({ onEnterPlatform, informativos }: LandingPageProps) {
  // Contact Form State
  const [formData, setFormData] = useState({
    nome: '',
    empresa: '',
    whatsapp: '',
    email: '',
    cidade: '',
    segmento: '',
    mensagem: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Contact Submit Handlers
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        nome: '',
        empresa: '',
        whatsapp: '',
        email: '',
        cidade: '',
        segmento: '',
        mensagem: ''
      });
    }, 5000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const serviceIcons: Record<string, React.ReactNode> = {
    Building2: <Building2 className="w-6 h-6 text-white" />,
    Repeat: <Repeat className="w-6 h-6 text-white" />,
    Calculator: <Receipt className="w-6 h-6 text-white" />,
    Wallet: <Wallet className="w-6 h-6 text-white" />,
    Receipt: <Receipt className="w-6 h-6 text-white" />,
    Briefcase: <Briefcase className="w-6 h-6 text-white" />
  };

  return (
    <div className="bg-[#fcfdfd] text-[#0f2115] font-sans antialiased">
      {/* HEADER / NAVBAR */}
      <nav id="navbar" className="fixed top-0 left-0 right-0 z-[1000] px-6 py-4 bg-white/94 backdrop-blur-md border-b border-[#0C3E26]/10 transition-all duration-300">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <a href="#" className="flex items-center gap-2 hover:opacity-90 transition-opacity">
            <NobelLogo className="h-10 sm:h-12" />
          </a>

          <div className="hidden md:flex gap-8 items-center">
            <a href="#servicos" className="text-sm font-semibold text-[#4a6354] hover:text-[#0C3E26] transition-colors text-decoration-none">Serviços</a>
            <a href="#sobre" className="text-sm font-semibold text-[#4a6354] hover:text-[#0C3E26] transition-colors text-decoration-none">Sobre Nós</a>
            <a href="#informativos" className="text-sm font-semibold text-[#4a6354] hover:text-[#0C3E26] transition-colors text-decoration-none">Informativos</a>
            <a href="#depoimentos" className="text-sm font-semibold text-[#4a6354] hover:text-[#0C3E26] transition-colors text-decoration-none">Depoimentos</a>
            <a href="#contato" className="text-sm font-semibold text-[#4a6354] hover:text-[#0C3E26] transition-colors text-decoration-none">Contato</a>
          </div>

          <div className="flex gap-3 items-center">
            <a 
              href="https://econtador.alterdata.com.br/NobelContabilidade" 
              target="_blank" 
              rel="noreferrer"
              className="text-xs sm:text-sm font-extrabold bg-gradient-to-r from-[#D4AF37] to-[#0C3E26] hover:from-[#B8902B] hover:to-[#092B1B] text-white px-4 py-2 sm:px-5 sm:py-2.5 rounded-full inline-flex items-center gap-2 hover:-translate-y-0.5 hover:shadow-lg transition-all border-none text-decoration-none shadow cursor-pointer"
            >
              <LogIn className="w-4 h-4 text-white" />
              <span>Portal Clientes</span>
            </a>
            <button 
              onClick={onEnterPlatform}
              className="text-xs sm:text-sm font-extrabold bg-gradient-to-r from-[#0C3E26] to-[#D4AF37] hover:from-[#092B1B] hover:to-[#B8902B] text-white px-4 py-2 sm:px-5 sm:py-2.5 rounded-full inline-flex items-center gap-2 hover:-translate-y-0.5 hover:shadow-xl transition-all cursor-pointer border-none shadow-md"
            >
              <LayoutDashboard className="w-4 h-4 text-white" />
              <span>Plataforma</span>
            </button>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section id="inicio" className="min-h-screen flex items-center justify-center relative overflow-hidden px-6 pt-24 pb-12 sm:pt-32 bg-gradient-to-b from-[#e3ede6] via-white to-[#f0f5f2] border-b border-[#0C3E26]/5">
        {/* Animated Background Motion Blobs */}
        <div className="absolute top-1/4 left-10 w-72 h-72 rounded-full bg-[#16A085]/10 blur-3xl pointer-events-none animate-float-1"></div>
        <div className="absolute bottom-1/4 right-10 w-96 h-96 rounded-full bg-[#D4AF37]/10 blur-3xl pointer-events-none animate-float-2"></div>
        <div className="absolute top-1/2 left-1/3 w-64 h-64 rounded-full bg-[#0C3E26]/5 blur-3xl pointer-events-none animate-float-1"></div>
        
        <div className="absolute inset-0 bg-radial-[circle_at_20%_30%] from-[#0C3E26]/5 to-transparent pointer-events-none"></div>
        <div className="absolute inset-0 bg-radial-[circle_at_80%_70%] from-[#D4AF37]/5 to-transparent pointer-events-none"></div>
        
        <div className="max-w-4xl text-center relative z-10 flex flex-col items-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full text-xs sm:text-sm font-bold text-[#0C3E26] border border-[#0C3E26]/10 shadow-sm mb-6"
          >
            <Sparkles className="w-4 h-4 text-[#D4AF37] animate-pulse" />
            <span>Plataforma Enterprise de Contabilidade Digital</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
            className="font-display font-black text-3xl sm:text-5xl md:text-6xl text-[#0c2417] leading-tight tracking-tight mb-8"
          >
            Mais que Contabilidade.<br />
            <span className="bg-gradient-to-r from-[#D4AF37] via-[#8A8B35] to-[#0C3E26] bg-clip-text text-transparent">
              Inteligência para o crescimento da sua empresa.
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            className="text-sm sm:text-base md:text-lg text-[#4a6354] max-w-2xl leading-relaxed mb-10"
          >
            Transformamos obrigações em decisões estratégicas de alto impacto. Combinamos automação de ponta, 
            contabilidade consultiva sob a liderança da Dra. Érika e inteligência artificial para amparar sua empresa.
          </motion.p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-4xl mb-12">
            {[
              {
                href: "#diagnostico",
                bg: "bg-[#0C3E26] hover:bg-[#128C54] text-white shadow-lg shadow-[#0C3E26]/20",
                icon: <Building2 className="w-4 h-4" />,
                label: "Abrir Empresa"
              },
              {
                href: "#diagnostico",
                bg: "bg-white border-2 border-[#0C3E26]/25 hover:border-[#0C3E26] text-[#0C3E26] shadow-sm",
                icon: <Repeat className="w-4 h-4 text-[#0C3E26]" />,
                label: "Trocar de Contador"
              },
              {
                href: "https://wa.me/5511999999999",
                target: "_blank",
                bg: "bg-[#25d366] hover:bg-[#128c7e] text-white shadow-lg shadow-green-500/10",
                icon: <MessageCircle className="w-4 h-4" />,
                label: "Falar no WhatsApp"
              },
              {
                href: "#diagnostico",
                bg: "bg-gradient-to-r from-[#D4AF37] to-[#0C3E26] text-white shadow-lg shadow-[#D4AF37]/10",
                icon: <Sparkles className="w-4 h-4" />,
                label: "Fazer Diagnóstico"
              }
            ].map((btn, idx) => (
              <motion.a
                key={idx}
                href={btn.href}
                target={btn.target}
                rel={btn.target ? "noreferrer" : undefined}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + idx * 0.08 }}
                whileHover={{ y: -3, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`${btn.bg} font-bold text-sm px-6 py-3.5 rounded-full inline-flex items-center justify-center gap-2 transition-all text-center text-decoration-none`}
              >
                {btn.icon}
                <span>{btn.label}</span>
              </motion.a>
            ))}
          </div>

          {/* FLOATING APP CARDS CONTAINER */}
          <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
            {/* Card 1: Growth */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              whileHover={{ y: -6, scale: 1.02, boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.08)" }}
              className="bg-white/80 p-5 rounded-2xl border border-[#0C3E26]/10 shadow-md backdrop-blur-sm cursor-pointer text-left"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-[#0C3E26]/10 rounded-xl flex items-center justify-center text-[#0C3E26]">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <div className="font-bold text-sm text-[#0C3E26]">Crescimento Fiscal</div>
                  <div className="text-xs text-[#8fa898]">+147% registrado</div>
                </div>
              </div>
              <div className="h-2 bg-[#0C3E26]/10 rounded-full overflow-hidden">
                <div className="w-[78%] h-full bg-gradient-to-r from-[#D4AF37] to-[#0C3E26] rounded-full"></div>
              </div>
            </motion.div>

            {/* Card 2: Compliance */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              whileHover={{ y: -6, scale: 1.02, boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.08)" }}
              className="bg-white/80 p-5 rounded-2xl border border-[#0C3E26]/10 shadow-md backdrop-blur-sm cursor-pointer text-left"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-[#0C3E26]/15 rounded-full flex items-center justify-center text-[#0C3E26]">
                  <CheckCircle2 className="w-5 h-5 animate-pulse" />
                </div>
                <div className="text-left">
                  <div className="font-bold text-sm text-[#0C3E26]">Obrigações Entregues</div>
                  <div className="text-xs text-[#0C3E26] font-semibold">100% em conformidade legal</div>
                </div>
              </div>
            </motion.div>

            {/* Card 3: Economics */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              whileHover={{ y: -6, scale: 1.02, boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.08)" }}
              className="bg-white/80 p-5 rounded-2xl border border-[#0C3E26]/10 shadow-md backdrop-blur-sm cursor-pointer text-left"
            >
              <div className="text-left">
                <div className="text-xs text-[#8fa898] font-bold uppercase tracking-wider mb-1">Economia Projetada</div>
                <div className="text-2xl font-black text-[#0C3E26] font-display bg-gradient-to-r from-[#D4AF37] to-[#0C3E26] bg-clip-text text-transparent">R$ 2.4 Milhões</div>
                <div className="text-xs text-[#8fa898]">Recuperado em planejamento tributário</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* TRENDING MARQUEE ACCENTS */}
      <div className="overflow-hidden whitespace-nowrap py-5 border-y border-[#0C3E26]/10 bg-white shadow-inner flex relative">
        <div className="flex animate-marquee-scroll gap-16 pr-16 text-sm font-semibold tracking-wide text-[#8fa898]">
          <span className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-[#0C3E26]" /> Conformidade Exata</span>
          <span className="flex items-center gap-2"><Zap className="w-4 h-4 text-[#D4AF37]" /> Automação de Processos</span>
          <span className="flex items-center gap-2"><Users className="w-4 h-4 text-[#0C3E26]" /> +500 Empresas Ativas</span>
          <span className="flex items-center gap-2"><AwardIcon className="w-4 h-4 text-[#D4AF37]" /> Escrituração Digital</span>
          <span className="flex items-center gap-2"><Globe className="w-4 h-4 text-[#0C3E26]" /> Atendimento Nacional</span>
        </div>
        <div className="flex animate-marquee-scroll gap-16 pr-16 text-sm font-semibold tracking-wide text-[#8fa898]" aria-hidden="true">
          <span className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-[#0C3E26]" /> Conformidade Exata</span>
          <span className="flex items-center gap-2"><Zap className="w-4 h-4 text-[#D4AF37]" /> Automação de Processos</span>
          <span className="flex items-center gap-2"><Users className="w-4 h-4 text-[#0C3E26]" /> +500 Empresas Ativas</span>
          <span className="flex items-center gap-2"><AwardIcon className="w-4 h-4 text-[#D4AF37]" /> Escrituração Digital</span>
          <span className="flex items-center gap-2"><Globe className="w-4 h-4 text-[#0C3E26]" /> Atendimento Nacional</span>
        </div>
      </div>

      {/* STATS COUNT */}
      <section className="py-16 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-[#0C3E26]/10 text-center hover:shadow-lg transition-shadow">
            <div className="font-display font-black text-4xl text-[#0C3E26] mb-2">500+</div>
            <div className="text-xs sm:text-sm text-[#4a6354] font-medium">Clientes Satisfeitos</div>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-[#0C3E26]/10 text-center hover:shadow-lg transition-shadow">
            <div className="font-display font-black text-4xl text-[#0C3E26] mb-2">25+ ANOS</div>
            <div className="text-xs sm:text-sm text-[#4a6354] font-medium">De Experiência Contábil</div>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-[#0C3E26]/10 text-center hover:shadow-lg transition-shadow">
            <div className="font-display font-black text-4xl text-[#D4AF37] mb-2">98%</div>
            <div className="text-xs sm:text-sm text-[#4a6354] font-medium">NPS & Avaliação Excelente</div>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-[#0C3E26]/10 text-center hover:shadow-lg transition-all duration-300 hover:scale-105">
            <div className="font-display font-black text-4xl text-[#0C3E26] mb-2">99.8%</div>
            <div className="text-xs sm:text-sm text-[#4a6354] font-medium">De Sucesso em Elisão Fiscal</div>
          </div>
        </div>
      </section>

      {/* ABOUT US & ERIKA BIO SECTION */}
      <section id="sobre" className="py-20 bg-white scroll-mt-20">
        <div className="max-w-7xl mx-auto px-6">
          {/* Erika Contadora Bio Section - Split Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24 bg-gradient-to-br from-[#f0f6f2] to-white p-8 sm:p-14 rounded-3xl border border-[#0C3E26]/10 shadow-sm">
            <div className="lg:col-span-5 flex flex-col items-center justify-center gap-4">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-tr from-[#D4AF37] to-[#0C3E26] rounded-2xl blur-lg opacity-30 group-hover:opacity-50 transition-all duration-300"></div>
                <img 
                  src="./imagens/erika.png" 
                  alt="Érika - Diretora e Contadora Nobel" 
                  referrerPolicy="no-referrer"
                  className="w-full max-w-[340px] h-auto object-cover rounded-2xl shadow-lg border-4 border-white relative z-10 transition-transform duration-300 group-hover:scale-[1.02]"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = "./imagens/erika.png";
                  }}
                />
              </div>
              <div className="text-center z-10 bg-[#0C3E26]/10 px-4 py-2.5 rounded-xl border border-[#0C3E26]/10 shadow-sm max-w-[340px] w-full flex flex-col items-center justify-center">
                <p className="font-display font-black text-base text-[#0C3E26] tracking-wide m-0">Dra. Érika Blank</p>
                <div className="mt-1.5 px-3.5 py-1 bg-[#D4AF37] text-[#0C3E26] rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm">Contadora</div>
              </div>
            </div>
            
            <div className="lg:col-span-7 space-y-6 text-left">
              <span className="text-xs font-bold uppercase tracking-wider text-white bg-[#0C3E26] px-4 py-1.5 rounded-full inline-block shadow-sm">Diretora Técnica & Fundadora</span>
              <h3 className="font-display font-black text-3xl sm:text-4xl text-[#0f2115]">
                Conheça a Dra. Érika
              </h3>
              <p className="text-xs sm:text-sm text-[#D4AF37] font-extrabold uppercase tracking-widest bg-[#0C3E26]/5 py-1 px-3.5 rounded inline-block">
                Mais de 25 Anos de Atuação no Setor Contábil
              </p>
              
              <p className="text-sm sm:text-base text-[#4a6354] leading-relaxed">
                Fundadora da <strong>Contabilidade Nobel</strong>, Érika acumula mais de 25 anos de experiência técnica consolidada em consultoria corporativa de alto escalão, planejamento tributário complexo e elisão fiscal. Graduada em Ciências Contábeis e com sólidas especializações jurídicas, Érika tem como princípio fundamental traduzir a burocracia governamental em estratégias ágeis de lucro e elisão regulamentar segura para pequenas, médias e grandes empresas.
              </p>
              <p className="text-sm sm:text-base text-[#4a6354] leading-relaxed">
                Sua liderança impulsiona uma equipe multidisciplinar que concilia a tradicional confiança contábil com as modernas ferramentas de inteligência artificial (IA) e processamentos robotizados (RPAs). O resultado engloba obrigações em tempo recorde e insights valiosos para o caixa empresarial diário dos clientes da Nobel.
              </p>
              
              <div className="pt-6 border-t border-[#0C3E26]/10 flex flex-col sm:flex-row gap-5 items-start sm:items-center">
                <a 
                  href="https://wa.me/5511999999999" 
                  target="_blank" 
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 font-black text-xs bg-[#0C3E26] hover:bg-[#128C54] text-white px-6 py-3.5 rounded-full shadow-md text-decoration-none transition-all hover:translate-x-1"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Falar com a Dra. Érika</span>
                </a>
                <div className="text-xs text-[#627d6d] font-medium italic">
                  "Nosso compromisso é ajudar o gestor a pagar o menor imposto legal e prosperar."
                </div>
              </div>
            </div>
          </div>

          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-[#0C3E26] bg-[#0C3E26]/10 px-4.5 py-1.5 rounded-full inline-block mb-4">A Linha do Tempo</span>
            <h2 className="font-display font-black text-3xl sm:text-4xl text-[#0f2115] mb-4">Tradição de Excelência e Inovação</h2>
            <p className="text-sm sm:text-base text-[#4a6354]">Unimos a solidez técnica de Érika com os recursos que definem a contabilidade do amanhã.</p>
          </div>

          <div className="relative max-w-3xl mx-auto before:absolute before:inset-y-0 before:left-1/2 before:w-0.5 before:bg-gradient-to-b before:from-[#D4AF37] before:to-[#0C3E26]">
            <div className="flex flex-col gap-12">
              <div className="relative w-full md:w-1/2 md:pr-10 md:text-right self-start">
                <div className="absolute right-[-10px] md:right-[-7px] top-6 w-3.5 h-3.5 bg-[#0C3E26] rounded-full border-2 border-white ring-2 ring-[#0C3E26]"></div>
                <div className="bg-white p-6 rounded-2xl border border-[#0C3E26]/10 shadow-sm inline-block md:block text-left md:text-right">
                  <div className="text-[#0C3E26] font-extrabold text-sm mb-1">2001 - Início da Carreira</div>
                  <h4 className="font-bold text-base mb-2">Trajetória Setorial de Érika</h4>
                  <p className="text-xs sm:text-sm text-[#4a6354]">Érika inicia no segmento contábil em multinacionais e auditorias estratégicas fiscais.</p>
                </div>
              </div>

              <div className="relative w-full md:w-1/2 md:pl-10 self-end">
                <div className="absolute left-[-10px] md:left-[-7px] top-6 w-3.5 h-3.5 bg-[#D4AF37] rounded-full border-2 border-white ring-2 ring-[#D4AF37]"></div>
                <div className="bg-white p-6 rounded-2xl border border-[#0C3E26]/10 shadow-sm text-left">
                  <div className="text-[#D4AF37] font-extrabold text-sm mb-1">2009 - Fundação da Nobel</div>
                  <h4 className="font-bold text-base mb-2">Nascimento do Escritório</h4>
                  <p className="text-xs sm:text-sm text-[#4a6354]">Érika une a experiência para fundar a Nobel, focada em planejamento tributário preventivo.</p>
                </div>
              </div>

              <div className="relative w-full md:w-1/2 md:pr-10 md:text-right self-start">
                <div className="absolute right-[-10px] md:right-[-7px] top-6 w-3.5 h-3.5 bg-[#0C3E26] rounded-full border-2 border-white ring-2 ring-[#0C3E26]"></div>
                <div className="bg-white p-6 rounded-2xl border border-[#0C3E26]/10 shadow-sm inline-block md:block text-left md:text-right">
                  <div className="text-[#0C3E26] font-extrabold text-sm mb-1">2018 - Expansão de Clientes</div>
                  <h4 className="font-bold text-base mb-2">Sincronia Regional</h4>
                  <p className="text-xs sm:text-sm text-[#4a6354]">Atendimento integrado a clínicas médicas e prestadores no estado de São Paulo.</p>
                </div>
              </div>

              <div className="relative w-full md:w-1/2 md:pl-10 self-end">
                <div className="absolute left-[-10px] md:left-[-7px] top-6 w-3.5 h-3.5 bg-[#D4AF37] rounded-full border-2 border-white ring-2 ring-[#D4AF37]"></div>
                <div className="bg-white p-6 rounded-2xl border border-[#0C3E26]/10 shadow-sm text-left">
                  <div className="text-[#D4AF37] font-extrabold text-sm mb-1">2026 - Conectividade e IAs</div>
                  <h4 className="font-bold text-base mb-2">Plataforma Nobel Enterprise</h4>
                  <p className="text-xs sm:text-sm text-[#4a6354]">Mapeamento eletrônico de certidões eletrônicas em nuvem ativa com inteligência artificial.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="servicos" className="py-20 max-w-7xl mx-auto px-6 scroll-mt-20">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-[#0C3E26] bg-[#0C3E26]/10 px-4.5 py-1.5 rounded-full inline-block mb-4">Nossas Soluções</span>
          <h2 className="font-display font-black text-3xl sm:text-4xl text-[#0f2115] mb-4 bg-gradient-to-r from-[#D4AF37] to-[#0C3E26] bg-clip-text text-transparent">Serviços que geram resultado definitivo</h2>
          <p className="text-sm sm:text-base text-[#4a6354]">Oferecemos assessoria detalhada para elidir obrigações desnecessárias e otimizar margens financeiras.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {landingServices.map((serv, index) => (
            <motion.a 
              href="#diagnostico" 
              key={serv.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02, borderColor: 'rgba(212,175,55,0.4)', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.05), 0 8px 10px -6px rgb(0 0 0 / 0.05)' }}
              className="block bg-white p-8 rounded-2xl border border-[#0C3E26]/10 transition-all text-decoration-none text-current cursor-pointer shadow-sm text-left"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#D4AF37] to-[#0C3E26] flex items-center justify-center mb-6 shadow-md shadow-[#D4AF37]/25">
                {serviceIcons[serv.icon] || <Building2 className="w-6 h-6 text-white" />}
              </div>
              <h3 className="font-display font-bold text-lg mb-2 text-[#0c2417]">{serv.title}</h3>
              <p className="text-xs sm:text-sm text-[#4a6354] leading-relaxed">{serv.desc}</p>
            </motion.a>
          ))}
        </div>
      </section>

      {/* INFORMATIVOS TRIBUTÁRIOS (REPLACED CALCULATOR WITH THIS SECTION) */}
      <section id="informativos" className="py-24 bg-gradient-to-b from-white to-[#f5f9f6] border-t border-[#0C3E26]/5 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-[#0C3E26] bg-[#0C3E26]/10 px-4.5 py-1.5 rounded-full inline-block mb-4">Consultoria de IA & Érika Nobel</span>
            <h2 className="font-display font-black text-3xl sm:text-4xl text-[#0f2115] mb-4 bg-gradient-to-r from-[#D4AF37] via-[#8A8B35] to-[#0C3E26] bg-clip-text text-transparent">Informativos Fiscais Recentes</h2>
            <p className="text-sm sm:text-base text-[#4a6354]">Informativos produzidos pela inteligência artificial e revisados pela nossa retaguarda contábil.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {informativos.slice().reverse().map((inf, idx) => {
              const bgStyle = idx % 3 === 0 
                ? "bg-[#0C3E26] text-white border-[#D4AF37]/50 shadow-md shadow-[#0C3E26]/20" 
                : idx % 3 === 1
                ? "bg-gradient-to-br from-[#f2f7f4] to-[#e6efe9] text-[#0f2115] border-[#0C3E26]/20 shadow-sm"
                : "bg-gradient-to-br from-[#0c2417] to-[#124b30] text-white border-[#D4AF37]/30 shadow-md";

              const badgeStyle = idx % 3 === 0
                ? "bg-[#D4AF37]/20 text-[#D4AF37]"
                : idx % 3 === 1
                ? "bg-[#0C3E26]/10 text-[#0C3E26]"
                : "bg-[#D4AF37]/20 text-[#e9d690]";

              const textDescStyle = idx % 3 === 0 || idx % 3 === 2
                ? "text-emerald-100/90"
                : "text-[#4a6354]";

              const titleStyle = idx % 3 === 0 || idx % 3 === 2
                ? "text-white"
                : "text-[#0f2115]";

              const footerBorder = idx % 3 === 0 || idx % 3 === 2
                ? "border-emerald-800/60"
                : "border-emerald-900/10";

              const authorStyle = idx % 3 === 0 || idx % 3 === 2
                ? "text-[#D4AF37]"
                : "text-[#0C3E26]";

              const linkStyle = idx % 3 === 0 || idx % 3 === 2
                ? "text-[#D4AF37] hover:text-white"
                : "text-[#0C3E26] hover:text-[#D4AF37]";

              return (
                <motion.div 
                  key={inf.id || idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.15 }}
                  className={`${bgStyle} p-6 sm:p-8 rounded-3xl border flex flex-col justify-between hover:shadow-xl hover:scale-[1.02] transition-colors text-left duration-300`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-5 mb-4">
                      <span className={`${badgeStyle} text-[10px] font-extrabold uppercase px-3 py-1 rounded-full`}>{inf.mes}</span>
                      <span className={`text-[10px] font-bold ${idx % 3 === 0 || idx % 3 === 2 ? 'text-emerald-300/80' : 'text-slate-400'}`}>{inf.dataEmissao}</span>
                    </div>
                    <h3 className={`font-display font-bold text-base mb-3 leading-snug ${titleStyle}`}>{inf.titulo}</h3>
                    <p className={`text-xs sm:text-sm leading-relaxed mb-6 whitespace-pre-line ${textDescStyle}`}>{inf.conteudo}</p>
                  </div>
                  
                  <div className={`pt-4 border-t ${footerBorder} flex items-center justify-between text-xs`}>
                    <span className={`flex items-center gap-1.5 font-extrabold ${authorStyle}`}><Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" /> {inf.autor || 'IA Nobel'}</span>
                    <a href="#diagnostico" className={`font-extrabold flex items-center gap-1 transition-colors text-decoration-none ${linkStyle}`}>Saber Mais <ArrowRight className="w-3 h-3" /></a>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="depoimentos" className="py-20 max-w-7xl mx-auto px-6 scroll-mt-20">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-[#0C3E26] bg-[#0C3E26]/10 px-4.5 py-1.5 rounded-full inline-block mb-4">Depoimentos</span>
          <h2 className="font-display font-black text-3xl sm:text-4xl text-[#0f2115] mb-4">O que dizem os nossos clientes</h2>
          <p className="text-sm sm:text-base text-[#4a6354]">A satisfação de mais de 500 empresários atendidos e assessorados por Érika Contadora e seu time.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {landingTestimonials.map((test, index) => (
            <div key={index} className="bg-white p-8 rounded-2xl border border-[#0C3E26]/10 shadow-sm relative flex flex-col justify-between hover:shadow-md transition-shadow text-left">
              <span className="absolute top-4 right-6 text-7xl font-serif text-[#0C3E26]/10 pointer-events-none">“</span>
              <p className="text-sm sm:text-base text-[#4a6354] italic leading-relaxed mb-6 relative z-10">{test.text}</p>
              
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#0C3E26] text-white flex items-center justify-center font-bold text-sm shadow-inner">
                  {test.avatar}
                </div>
                <div>
                  <div className="font-bold text-sm sm:text-base text-[#0C3E26]">{test.name}</div>
                  <div className="text-xs text-[#8fa898] font-semibold">{test.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* DIAGNOSTICO AD-FORM */}
      <section id="diagnostico" className="py-20 bg-white scroll-mt-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-[#0C3E26] bg-[#0C3E26]/10 px-4.5 py-1.5 rounded-full inline-block mb-4">Análise Gratuita</span>
            <h2 className="font-display font-black text-3xl text-[#0f2115] mb-4">Solicite seu Diagnóstico Gratuito</h2>
            <p className="text-sm sm:text-base text-[#4a6354]">Deixe as coordenadas do seu negócio e receba uma análise detalhada das suas faixas tributárias.</p>
          </div>

          <div className="max-w-xl mx-auto bg-white border border-[#0C3E26]/10 p-6 sm:p-10 rounded-3xl shadow-xl">
            {isSubmitted ? (
              <div className="text-center py-12 animate-fade-in flex flex-col items-center justify-center">
                <div className="w-16 h-16 bg-[#e3ede6] rounded-full flex items-center justify-center text-[#0C3E26] mb-6 animate-bounce">
                  <Check className="w-8 h-8" />
                </div>
                <h3 className="font-display font-bold text-xl text-[#0C3E26] mb-2">Solicitação Enviada!</h3>
                <p className="text-sm text-[#4a6354] max-w-xs mx-auto">A equipe de Érika analisará suas coordenadas e entrará em contato via WhatsApp/e-mail em até 24 horas.</p>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="flex flex-col gap-4 text-left">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-[#4a6354]">Nome Completo</label>
                    <input 
                      type="text" 
                      name="nome"
                      value={formData.nome}
                      onChange={handleInputChange}
                      required 
                      placeholder="Seu nome"
                      className="w-full px-4 py-3 border border-[#0C3E26]/15 rounded-xl bg-[#fcfdfd] focus:outline-none focus:border-[#D4AF37] text-sm"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-[#4a6354]">Nome da Empresa</label>
                    <input 
                      type="text" 
                      name="empresa"
                      value={formData.empresa}
                      onChange={handleInputChange}
                      required 
                      placeholder="Empresa Ltda"
                      className="w-full px-4 py-3 border border-[#0C3E26]/15 rounded-xl bg-[#fcfdfd] focus:outline-none focus:border-[#D4AF37] text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-[#4a6354]">WhatsApp</label>
                    <input 
                      type="tel" 
                      name="whatsapp"
                      value={formData.whatsapp}
                      onChange={handleInputChange}
                      required 
                      placeholder="(11) 99999-9999"
                      className="w-full px-4 py-3 border border-[#0C3E26]/15 rounded-xl bg-[#fcfdfd] focus:outline-none focus:border-[#D4AF37] text-sm"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-[#4a6354]">E-mail Corporativo</label>
                    <input 
                      type="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required 
                      placeholder="contato@empresa.com"
                      className="w-full px-4 py-3 border border-[#0C3E26]/15 rounded-xl bg-[#fcfdfd] focus:outline-none focus:border-[#D4AF37] text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-[#4a6354]">Cidade / UF</label>
                    <input 
                      type="text" 
                      name="cidade"
                      value={formData.cidade}
                      onChange={handleInputChange}
                      required 
                      placeholder="São Paulo - SP"
                      className="w-full px-4 py-3 border border-[#0C3E26]/15 rounded-xl bg-[#fcfdfd] focus:outline-none focus:border-[#D4AF37] text-sm"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-[#4a6354]">Segmento</label>
                    <select 
                      name="segmento"
                      value={formData.segmento}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-[#0C3E26]/15 rounded-xl bg-[#fcfdfd] focus:outline-none focus:border-[#D4AF37] text-sm"
                    >
                      <option value="">Selecione...</option>
                      <option value="Comercio">Comércio</option>
                      <option value="Servicos">Serviços Profissionais</option>
                      <option value="Industria">Indústria / Manufatura</option>
                      <option value="Saude">Clínicas / Saúde</option>
                      <option value="Tecnologia">Tecnologia / SaaS</option>
                      <option value="Construcao">Construção Civil</option>
                    </select>
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-[#4a6354]">Mensagem (opcional)</label>
                  <textarea 
                    name="mensagem"
                    value={formData.mensagem}
                    onChange={handleInputChange}
                    placeholder="Nos diga o seu principal desafio tributário..."
                    className="w-full px-4 py-3 border border-[#0C3E26]/15 rounded-xl bg-[#fcfdfd] focus:outline-none focus:border-[#D4AF37] text-sm h-24 resize-none"
                  ></textarea>
                </div>

                <button 
                  type="submit" 
                  className="w-full py-4 rounded-xl font-bold text-white bg-gradient-to-r from-[#D4AF37] to-[#0C3E26] hover:opacity-90 transition-all flex items-center justify-center gap-2 shadow-lg cursor-pointer border-none mt-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Solicitar Diagnóstico Inteligente</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* CONTACT INFO */}
      <section id="contato" className="py-20 max-w-7xl mx-auto px-6 text-center scroll-mt-20">
        <div className="max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-[#0C3E26] bg-[#0C3E26]/10 px-4.5 py-1.5 rounded-full inline-block mb-4">Contato Oficial</span>
          <h2 className="font-display font-black text-3xl text-[#0f2115] mb-4">Fale ativamente com nossos assessores</h2>
          <p className="text-sm sm:text-base text-[#4a6354]">Planejamentos sob medida, dúvidas regulatórias ou abertura imediata de nova empresa.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto mb-10">
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#0C3E26]/10 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-full bg-[#0C3E26]/10 text-[#0C3E26] flex items-center justify-center mx-auto mb-4">
              <Smartphone className="w-5 h-5" />
            </div>
            <div className="font-bold text-sm sm:text-base mb-1 text-slate-900">Telefone Central</div>
            <p className="text-xs xs:text-sm sm:text-base text-[#4a6354] font-bold break-all select-all leading-normal md:tracking-wide">
              (38) 3215-5494
            </p>
          </div>

          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#0C3E26]/10 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-full bg-[#25d366]/10 text-[#25d366] flex items-center justify-center mx-auto mb-4">
              <MessageCircle className="w-5 h-5" />
            </div>
            <div className="font-bold text-sm sm:text-base mb-1 text-slate-900">WhatsApp Business</div>
            <p className="text-xs xs:text-sm sm:text-base text-[#4a6354] font-bold break-all select-all leading-normal md:tracking-wide">
              (38) 3215-5494
            </p>
          </div>

          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#0C3E26]/10 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-full bg-[#0C3E26]/10 text-[#0C3E26] flex items-center justify-center mx-auto mb-4">
              <Send className="w-5 h-5" />
            </div>
            <div className="font-bold text-sm sm:text-base mb-1 text-slate-900">E-mail Comercial</div>
            <p className="text-[11px] xs:text-xs sm:text-sm md:text-base text-[#0C3E26] font-extrabold break-all select-all leading-normal">
              erika@contabilidadenobel.com.br
            </p>
          </div>
        </div>

        <div className="mb-8"></div>

        <a 
          href="https://wa.me/553832155494" 
          target="_blank" 
          rel="noreferrer" 
          className="bg-[#25d366] hover:bg-[#128c7e] text-white font-black text-sm xs:text-base px-8 xs:px-10 py-3.5 xs:py-4 rounded-full inline-flex items-center gap-3 shadow-xl hover:-translate-y-1 transition-all text-decoration-none"
        >
          <MessageCircle className="w-5.5 h-5.5" />
          <span>Falar no WhatsApp Agora</span>
        </a>
      </section>


      {/* CURVED/WAVY TRANSITION FOR FOOTER */}
      <div className="w-full relative -mb-1 leading-[0] z-10 overflow-hidden select-none pointer-events-none">
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="w-full h-12 sm:h-20 block">
          <path 
            d="M0,64 C240,12 480,72 720,48 C960,24 1200,96 1440,64 L1440,120 L0,120 Z" 
            fill="#041A0E"
          />
        </svg>
      </div>

      {/* FOOTER */}
      <footer className="bg-[#041A0E] py-16 px-6 text-[#DFBA5E] relative font-sans">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-10">
          <div className="md:col-span-2 text-left space-y-5">
            {/* Written Nobel Contabilidade logo instead of picture logo */}
            <div className="flex flex-col items-start gap-1 select-none">
              <span className="font-display font-black text-3xl tracking-tight text-[#E5C158] uppercase">Nobel</span>
              <span className="font-sans font-black text-[11px] uppercase tracking-[0.25em] text-[#DFBA5E] -mt-1.5">Contabilidade</span>
            </div>
            <p className="text-xs sm:text-sm font-medium text-[#DFBA5E]/90 leading-relaxed max-w-sm">
              Mais de uma década simplificando a contabilidade de pequenas, médias e grandes empresas brasileiras 
              com integridade jurídica de Dra. Érika e tecnologia inteligente avançada.
            </p>
            <div className="flex gap-3.5 pt-2">
              <a href="https://www.instagram.com/contabilidadenobel/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-[#E5C158]/10 border border-[#E5C158]/30 flex items-center justify-center text-[#E5C158] hover:bg-[#E5C158] hover:text-[#041A0E] hover:scale-105 transition-all"><Instagram className="w-5 h-5 font-bold" /></a>
              <a href="https://www.facebook.com/contabilidadenobel/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-[#E5C158]/10 border border-[#E5C158]/30 flex items-center justify-center text-[#E5C158] hover:bg-[#E5C158] hover:text-[#041A0E] hover:scale-105 transition-all"><Facebook className="w-5 h-5 font-bold" /></a>
            </div>
          </div>

          <div>
            <div className="font-extrabold text-xs uppercase tracking-wider text-[#E5C158] mb-4 text-left border-b border-[#E5C158]/20 pb-1">Serviços</div>
            <ul className="list-none flex flex-col gap-3 text-xs sm:text-sm font-semibold text-[#DFBA5E]/90 text-left p-0">
              <li><a href="#servicos" className="hover:text-white transition-colors text-current text-decoration-none">Abertura de Empresa</a></li>
              <li><a href="#servicos" className="hover:text-white transition-colors text-current text-decoration-none">Troca de Contador</a></li>
              <li><a href="#servicos" className="hover:text-white transition-colors text-current text-decoration-none">Planejamento Tributário</a></li>
              <li><a href="#servicos" className="hover:text-white transition-colors text-current text-decoration-none">BPO Financeiro</a></li>
              <li><a href="#servicos" className="hover:text-white transition-colors text-current text-decoration-none">Clínicas Médicas</a></li>
            </ul>
          </div>

          <div>
            <div className="font-extrabold text-xs uppercase tracking-wider text-[#E5C158] mb-4 text-left border-b border-[#E5C158]/20 pb-1">Empresa</div>
            <ul className="list-none flex flex-col gap-3 text-xs sm:text-sm font-semibold text-[#DFBA5E]/90 text-left p-0">
              <li><a href="#sobre" className="hover:text-white transition-colors text-current text-decoration-none">Sobre Nós</a></li>
              <li><a href="#sobre" className="hover:text-white transition-colors text-current text-decoration-none">Dra. Érika Nobel</a></li>
              <li><a href="#depoimentos" className="hover:text-white transition-colors text-current text-decoration-none">Depoimentos</a></li>
              <li><a href="#informativos" className="hover:text-white transition-colors text-current text-decoration-none">Informativos Fiscais</a></li>
            </ul>
          </div>

          <div>
            <div className="font-extrabold text-xs uppercase tracking-wider text-[#E5C158] mb-4 text-left border-b border-[#E5C158]/20 pb-1">Legal</div>
            <ul className="list-none flex flex-col gap-3 text-xs sm:text-sm font-semibold text-[#DFBA5E]/90 text-left p-0">
              <li><a href="#" className="hover:text-white transition-colors text-current text-decoration-none">Política de Privacidade</a></li>
              <li><a href="#" className="hover:text-white transition-colors text-current text-decoration-none">Termos de Uso</a></li>
              <li><a href="#" className="hover:text-white transition-colors text-current text-decoration-none">Conformidade LGPD</a></li>
              <li><button onClick={onEnterPlatform} className="hover:text-white transition-colors text-current text-decoration-none bg-none border-none p-0 cursor-pointer font-sans font-semibold text-left">Plataforma Retaguarda</button></li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-[#E5C158]/25 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-semibold text-[#DFBA5E]/75">
          <div className="flex flex-col gap-1 text-center sm:text-left">
            <div>© 2026 Contabilidade Nobel. Todos os direitos reservados.</div>
            <div className="font-bold text-[#E5C158] hover:underline cursor-pointer">Site criado por Rich (38) 98833-8246</div>
          </div>
          <div className="text-center sm:text-right font-medium">CNPJ: 14.394.882/0001-90 | CRC: SP-038291/O</div>
        </div>
      </footer>
    </div>
  );
}
