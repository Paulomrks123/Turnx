import React from 'react';
import { ChevronLeft, Share2, CheckCircle, Calendar, Clock, MapPin, Users, ArrowRight, Info } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function MastermindDetails() {
  const navigate = useNavigate();

  return (
    <div className="bg-transparent text-[#0F172A] min-h-screen pb-32 font-sans">
      {/* Mobile Header Overlay */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 px-4 h-16 flex items-center justify-between safe-top">
        <button 
          onClick={() => navigate(-1)}
          className="size-10 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-md text-white border border-white/20"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button className="size-10 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-md text-white border border-white/20">
          <Share2 className="w-5 h-5" />
        </button>
      </div>

      <main>
        <div className="max-w-7xl mx-auto lg:px-8 lg:py-12">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Left Column: Image and Main Info */}
            <div className="flex-1">
              <div className="relative h-[40vh] lg:h-[500px] w-full lg:rounded-[48px] overflow-hidden shadow-2xl">
                <img 
                  src="https://picsum.photos/seed/mastermind/1200/800"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-transparent to-transparent opacity-60"></div>
                
                {/* Desktop Header Overlay */}
                <div className="hidden lg:flex absolute top-8 left-8 right-8 justify-between">
                  <button 
                    onClick={() => navigate(-1)}
                    className="px-6 py-3 rounded-2xl bg-white/10 backdrop-blur-xl text-white border border-white/10 font-bold text-sm flex items-center gap-2 hover:bg-white/20 transition-all"
                  >
                    <ChevronLeft className="w-5 h-5" /> Voltar
                  </button>
                  <button className="size-12 flex items-center justify-center rounded-2xl bg-white/10 backdrop-blur-xl text-white border border-white/10 hover:bg-white/20 transition-all">
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>

                <div className="absolute bottom-8 left-8 right-8">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="px-3 py-1 rounded-full bg-[#C6A75E] text-white text-[10px] font-black uppercase tracking-widest shadow-lg">
                      Membro Plus
                    </span>
                    <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-widest border border-white/10">
                      Online • Exclusivo
                    </span>
                  </div>
                  <h1 className="text-3xl lg:text-5xl font-black text-white leading-tight tracking-tight">
                    Mastermind de Investimentos: Estratégias de Alto Nível
                  </h1>
                </div>
              </div>

              <div className="px-6 lg:px-0 pt-12 space-y-12">
                <section>
                  <h2 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-6">Sobre o Encontro</h2>
                  <p className="text-lg text-slate-500 leading-relaxed font-medium">
                    Uma sessão exclusiva voltada para executivos e investidores que buscam aprofundar conhecimentos em teses de investimento complexas. Discutiremos o cenário macroeconômico atual e as janelas de oportunidade para o próximo trimestre com foco em preservação e crescimento de capital.
                  </p>
                </section>

                <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h2 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-6">Tópicos Principais</h2>
                    <ul className="space-y-4">
                      {[
                        'Asset Allocation: Rebalanceamento em cenários de volatilidade.',
                        'Gestão de Risco: Proteção de patrimônio em mercados emergentes.',
                        'Market Trends: IA e o futuro dos investimentos em tecnologia.'
                      ].map((topic, i) => (
                        <li key={i} className="flex items-start gap-4 group">
                          <div className="size-6 rounded-full bg-[#C6A75E]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#C6A75E] transition-colors">
                            <CheckCircle className="w-4 h-4 text-[#C6A75E] group-hover:text-white transition-colors" />
                          </div>
                          <span className="text-sm font-bold text-slate-600 leading-snug">{topic}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-slate-50 rounded-[40px] p-8 border border-slate-100">
                    <h2 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-6">Facilitador</h2>
                    <div className="flex items-center gap-6">
                      <div className="size-20 rounded-3xl overflow-hidden border-4 border-white shadow-xl">
                        <img 
                          src="https://picsum.photos/seed/facilitator/200/200" 
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div>
                        <h3 className="text-xl font-black text-[#0F172A]">Ricardo Rocha</h3>
                        <p className="text-sm font-bold text-[#C6A75E] mb-1">Expert em Private Equity</p>
                        <p className="text-xs text-slate-400 font-medium leading-relaxed">20 anos de mercado financeiro.</p>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </div>

            {/* Right Column: Sidebar (Desktop) / Floating Action (Mobile) */}
            <aside className="w-full lg:w-[400px] px-6 lg:px-0 pb-12">
              <div className="lg:sticky lg:top-32 space-y-8">
                {/* Event Info Card */}
                <div className="bg-white rounded-[48px] p-8 border border-slate-50 shadow-xl shadow-slate-200/50 space-y-8">
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="size-12 rounded-2xl bg-slate-50 flex items-center justify-center">
                        <Calendar className="w-6 h-6 text-[#C6A75E]" />
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Data</p>
                        <p className="text-sm font-bold text-[#0F172A]">Sexta-feira, 27 de Março</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="size-12 rounded-2xl bg-slate-50 flex items-center justify-center">
                        <Clock className="w-6 h-6 text-[#C6A75E]" />
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Horário</p>
                        <p className="text-sm font-bold text-[#0F172A]">14:00 — 16:00 (Brasília)</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="size-12 rounded-2xl bg-slate-50 flex items-center justify-center">
                        <MapPin className="w-6 h-6 text-[#C6A75E]" />
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Local</p>
                        <p className="text-sm font-bold text-[#0F172A]">Plataforma TurnX (Online)</p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-8 border-t border-slate-50">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-slate-400" />
                        <span className="text-xs font-bold text-slate-500">Participantes</span>
                      </div>
                      <span className="text-xs font-black text-[#C6A75E]">12 confirmados</span>
                    </div>
                    <div className="flex -space-x-3 mb-8">
                      {[1, 2, 3, 4].map((i) => (
                        <div 
                          key={i}
                          className="size-10 rounded-full border-4 border-white bg-slate-100 overflow-hidden shadow-sm"
                        >
                          <img src={`https://picsum.photos/seed/user${i}/100/100`} referrerPolicy="no-referrer" />
                        </div>
                      ))}
                      <div className="size-10 rounded-full border-4 border-white bg-slate-50 flex items-center justify-center text-[10px] font-black text-slate-400 shadow-sm">
                        +8
                      </div>
                    </div>

                    <button className="w-full h-16 bg-[#0F172A] text-white rounded-[24px] font-black text-sm flex items-center justify-center gap-3 shadow-2xl shadow-[#0F172A]/20 hover:scale-[1.02] active:scale-95 transition-all">
                      Confirmar Participação <ArrowRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Additional Info */}
                <div className="bg-[#C6A75E]/5 rounded-[40px] p-8 border border-[#C6A75E]/10">
                  <div className="flex gap-4">
                    <Info className="w-6 h-6 text-[#C6A75E] flex-shrink-0" />
                    <p className="text-xs font-bold text-[#C6A75E] leading-relaxed">
                      Este evento é exclusivo para membros Plus. Certifique-se de que sua assinatura está ativa para acessar o link da transmissão.
                    </p>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>

      {/* Mobile Floating Action Button */}
      <div className="lg:hidden fixed bottom-24 left-0 right-0 px-6 z-40">
        <button className="w-full h-16 bg-[#0F172A] text-white rounded-[24px] font-black text-sm flex items-center justify-center gap-3 shadow-2xl shadow-[#0F172A]/40 active:scale-95 transition-all">
          Confirmar Participação <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
