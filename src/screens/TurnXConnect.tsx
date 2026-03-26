import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Handshake, Rocket, Users, Globe, ArrowRight, ShieldCheck } from 'lucide-react';

export function TurnXConnect() {
  const navigate = useNavigate();

  return (
    <div className="bg-transparent text-[#0F172A] min-h-screen pb-24 font-sans">
      <main className="py-12 lg:py-24">
        <div className="w-full max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            {/* Left Column: Content */}
            <div className="space-y-12 text-center lg:text-left">
              <div className="inline-flex items-center gap-3 px-6 py-2.5 bg-[#C6A75E]/10 rounded-full border border-[#C6A75E]/20">
                <ShieldCheck className="w-4 h-4 text-[#C6A75E]" />
                <span className="text-[10px] font-black text-[#C6A75E] uppercase tracking-widest">Networking de Elite</span>
              </div>

              <div className="space-y-6">
                <h1 className="text-4xl lg:text-7xl font-black leading-[1.1] tracking-tight">
                  TurnX Connect:<br />
                  <span className="text-[#C6A75E]">A evolução do networking.</span>
                </h1>
                <p className="text-lg lg:text-2xl text-slate-500 font-medium leading-relaxed max-w-2xl mx-auto lg:mx-0">
                  Além de um grupo exclusivo de alto nível, utilizamos tecnologia para aproximar você dos melhores do mercado e viabilizar grandes negócios.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6 pt-4">
                <button 
                  onClick={() => navigate('/matchmaking')}
                  className="w-full sm:w-auto h-16 lg:h-20 px-12 bg-[#0F172A] text-white rounded-[24px] font-black text-sm lg:text-base uppercase tracking-widest shadow-2xl shadow-[#0F172A]/20 hover:scale-[1.05] active:scale-95 transition-all flex items-center justify-center gap-3"
                >
                  Ver rede de membros <ArrowRight className="w-5 h-5" />
                </button>
                <button className="w-full sm:w-auto h-16 lg:h-20 px-12 bg-white border-2 border-slate-100 text-[#0F172A] rounded-[24px] font-black text-sm lg:text-base uppercase tracking-widest hover:bg-slate-50 transition-all">
                  Saiba Mais
                </button>
              </div>

              {/* Stats/Features */}
              <div className="grid grid-cols-3 gap-8 pt-12 border-t border-slate-100">
                <div className="space-y-2">
                  <p className="text-2xl lg:text-4xl font-black text-[#0F172A]">500+</p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Membros Elite</p>
                </div>
                <div className="space-y-2">
                  <p className="text-2xl lg:text-4xl font-black text-[#0F172A]">R$ 2B+</p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Volume M&A</p>
                </div>
                <div className="space-y-2">
                  <p className="text-2xl lg:text-4xl font-black text-[#0F172A]">12</p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Países</p>
                </div>
              </div>
            </div>

            {/* Right Column: Visual */}
            <div className="relative">
              <div className="relative z-10 bg-white rounded-[64px] p-12 lg:p-20 border border-slate-50 shadow-2xl shadow-slate-200/50 overflow-hidden group">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#C6A75E]/5 rounded-full -mr-32 -mt-32 blur-3xl group-hover:bg-[#C6A75E]/10 transition-colors duration-700"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#0F172A]/5 rounded-full -ml-32 -mb-32 blur-3xl group-hover:bg-[#0F172A]/10 transition-colors duration-700"></div>
                
                <div className="relative space-y-12">
                  <div className="size-24 lg:size-32 rounded-[32px] bg-white flex items-center justify-center border border-slate-100 shadow-2xl shadow-[#C6A75E]/20 mx-auto group-hover:scale-110 transition-transform duration-500">
                    <Handshake className="w-12 h-12 lg:w-16 lg:h-16 text-[#C6A75E]" />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-6">
                    <div className="p-6 bg-slate-50 rounded-[32px] border border-slate-100 space-y-3">
                      <Rocket className="w-6 h-6 text-[#C6A75E]" />
                      <h4 className="text-xs font-black text-[#0F172A] uppercase tracking-widest">Matchmaking IA</h4>
                      <p className="text-[10px] text-slate-500 font-medium leading-relaxed">Conexões precisas baseadas em seus objetivos.</p>
                    </div>
                    <div className="p-6 bg-slate-50 rounded-[32px] border border-slate-100 space-y-3">
                      <Users className="w-6 h-6 text-[#C6A75E]" />
                      <h4 className="text-xs font-black text-[#0F172A] uppercase tracking-widest">Comunidade</h4>
                      <p className="text-[10px] text-slate-500 font-medium leading-relaxed">Acesso direto a C-Levels e Fundadores.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute -top-12 -right-12 size-48 bg-[#C6A75E]/10 rounded-full blur-3xl -z-10"></div>
              <div className="absolute -bottom-12 -left-12 size-48 bg-[#0F172A]/10 rounded-full blur-3xl -z-10"></div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
