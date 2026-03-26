import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ChevronLeft, 
  Rocket, 
  Calendar, 
  Users, 
  Target, 
  TrendingUp, 
  ShieldCheck,
  MessageSquare,
  Share2,
  Bookmark,
  ArrowRight,
  Info,
  CheckCircle2,
  Globe,
  User
} from 'lucide-react';

export function OpportunityDetails() {
  const navigate = useNavigate();

  return (
    <div className="bg-transparent text-[#0F172A] min-h-screen pb-24 font-sans">
      {/* Mobile Header */}
      <header className="lg:hidden sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100 px-4 h-16 flex items-center justify-between safe-top">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2">
          <ChevronLeft className="w-6 h-6 text-slate-600" />
        </button>
        <h1 className="text-lg font-bold tracking-tight">Oportunidade</h1>
        <button className="p-2 -mr-2 text-[#C6A75E]">
          <Share2 className="w-5 h-5" />
        </button>
      </header>

      <main className="py-8 lg:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left Column: Details */}
            <div className="lg:col-span-8 space-y-8 lg:space-y-12">
              {/* Hero Card */}
              <div className="bg-white rounded-[48px] p-8 lg:p-12 border border-slate-50 shadow-xl shadow-slate-200/50">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-10">
                  <div className="flex items-center gap-6">
                    <div className="size-16 lg:size-20 rounded-[24px] bg-[#C6A75E]/10 flex items-center justify-center text-[#C6A75E] shadow-lg shadow-[#C6A75E]/10">
                      <Rocket className="w-8 h-8 lg:w-10 lg:h-10" />
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <span className="px-3 py-1 rounded-lg bg-[#C6A75E]/10 text-[#C6A75E] text-[10px] font-black uppercase tracking-widest">Rodada Seed</span>
                        <span className="px-3 py-1 rounded-lg bg-emerald-50 text-emerald-500 text-[10px] font-black uppercase tracking-widest">Ativo</span>
                      </div>
                      <h1 className="text-3xl lg:text-5xl font-black text-[#0F172A] tracking-tight">Healthtech AI</h1>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <button className="size-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 hover:text-[#C6A75E] transition-colors">
                      <Bookmark className="w-6 h-6" />
                    </button>
                    <button className="size-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 hover:text-[#C6A75E] transition-colors">
                      <Share2 className="w-6 h-6" />
                    </button>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3 mb-10">
                  {['SaaS', 'Health', 'AI / ML', 'B2B'].map((tag) => (
                    <span key={tag} className="px-5 py-2 bg-slate-50 text-slate-500 text-xs font-black rounded-xl uppercase tracking-widest border border-slate-100">
                      {tag}
                    </span>
                  ))}
                </div>

                <p className="text-lg lg:text-xl text-slate-500 font-medium leading-relaxed mb-12">
                  Startup focada em otimização de triagem hospitalar utilizando inteligência artificial generativa. Já presente em 15 hospitais de grande porte com redução de 30% no tempo de espera.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="bg-slate-50 p-8 rounded-[32px] border border-slate-100">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Busca de Investimento</p>
                    <p className="text-3xl font-black text-[#0F172A]">R$ 1.5M</p>
                  </div>
                  <div className="bg-slate-50 p-8 rounded-[32px] border border-slate-100">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Equity Oferecido</p>
                    <p className="text-3xl font-black text-[#0F172A]">8%</p>
                  </div>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {[
                  { icon: TrendingUp, label: 'Faturamento', value: 'R$ 120k (MRR)', color: 'emerald' },
                  { icon: Target, label: 'Valuation', value: 'R$ 18M', color: 'blue' },
                  { icon: ShieldCheck, label: 'Diligence', value: 'Auditada', color: 'purple' }
                ].map((stat, i) => (
                  <div key={i} className="bg-white p-8 rounded-[40px] border border-slate-50 shadow-sm flex items-center gap-6">
                    <div className={`size-14 rounded-2xl bg-${stat.color}-50 text-${stat.color}-500 flex items-center justify-center shadow-sm`}>
                      <stat.icon className="w-7 h-7" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
                      <p className="text-sm lg:text-base font-black text-[#0F172A]">{stat.value}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Founders */}
              <section className="space-y-6">
                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-4">Fundadores</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {[
                    { name: 'Ricardo Almeida', role: 'CEO & Founder', bio: 'Ex-Diretor de Inovação no Hospital Sírio Libanês.' },
                    { name: 'Ana Beatriz', role: 'CTO', bio: 'PhD em Machine Learning pela Stanford University.' }
                  ].map((founder, i) => (
                    <div key={i} className="bg-white p-8 rounded-[40px] border border-slate-50 shadow-sm flex items-center gap-6">
                      <div className="size-16 rounded-[24px] bg-slate-100 flex items-center justify-center border-4 border-white shadow-xl shadow-slate-200/50">
                        <User className="w-8 h-8 text-slate-300" />
                      </div>
                      <div>
                        <h4 className="text-base font-black text-[#0F172A] mb-1">{founder.name}</h4>
                        <p className="text-[10px] font-bold text-[#C6A75E] uppercase tracking-widest mb-2">{founder.role}</p>
                        <p className="text-xs text-slate-400 font-medium leading-relaxed line-clamp-2">{founder.bio}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* Right Column: Actions */}
            <div className="lg:col-span-4 space-y-8">
              <div className="bg-white rounded-[48px] p-8 lg:p-10 border border-slate-50 shadow-xl shadow-slate-200/50 space-y-6">
                <div className="text-center pb-6 border-b border-slate-50">
                  <h4 className="text-2xl font-black text-[#0F172A] mb-2">Interessado?</h4>
                  <p className="text-sm text-slate-500 font-medium">Conecte-se diretamente com os fundadores.</p>
                </div>

                <div className="space-y-4">
                  <button className="w-full h-16 bg-[#0F172A] text-white rounded-[24px] font-black text-sm uppercase tracking-widest shadow-2xl shadow-[#0F172A]/20 flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-95 transition-all">
                    <MessageSquare className="w-5 h-5" />
                    Enviar Mensagem
                  </button>
                  <button className="w-full h-16 bg-white border-2 border-slate-100 text-[#0F172A] rounded-[24px] font-black text-sm uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-slate-50 active:scale-95 transition-all">
                    <Globe className="w-5 h-5" />
                    Ver Pitch Deck
                  </button>
                </div>

                <div className="bg-slate-50 rounded-[32px] p-6 border border-slate-100 flex items-start gap-4">
                  <ShieldCheck className="w-5 h-5 text-[#C6A75E] shrink-0 mt-0.5" />
                  <p className="text-[11px] text-slate-500 font-medium leading-relaxed">
                    Sua identidade e dados de contato só serão compartilhados após o aceite da conexão pelos fundadores.
                  </p>
                </div>
              </div>

              {/* Related */}
              <div className="space-y-6">
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-4">Oportunidades Similares</h4>
                <div className="space-y-4">
                  {[
                    { title: 'Fintech Payment Solutions', type: 'Série A', value: 'R$ 5M' },
                    { title: 'EdTech Gamification', type: 'Seed', value: 'R$ 800k' }
                  ].map((rel, i) => (
                    <div key={i} className="bg-white p-6 rounded-[32px] border border-slate-50 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 cursor-pointer flex items-center justify-between group">
                      <div className="min-w-0">
                        <span className="text-[10px] font-black text-[#C6A75E] uppercase tracking-widest mb-1 block">{rel.type}</span>
                        <h5 className="text-sm font-black text-[#0F172A] truncate pr-4 group-hover:text-[#C6A75E] transition-colors">{rel.title}</h5>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Busca: {rel.value}</p>
                      </div>
                      <ArrowRight className="w-5 h-5 text-slate-200 group-hover:text-[#C6A75E] transition-colors" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
