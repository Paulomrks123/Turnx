import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ChevronLeft, 
  Award, 
  CheckCircle2, 
  CreditCard, 
  Users, 
  Calendar, 
  TrendingUp, 
  Lock,
  ChevronRight
} from 'lucide-react';

export function Billing() {
  const navigate = useNavigate();

  return (
    <div className="bg-[#f8f7f6] text-[#0F172A] min-h-screen flex flex-col font-sans">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100 safe-top">
        <div className="max-w-screen-xl mx-auto px-4 h-16 flex items-center justify-between">
          <button onClick={() => navigate(-1)} className="p-2 -ml-2">
            <ChevronLeft className="w-6 h-6 text-slate-600" />
          </button>
          <h1 className="text-lg font-bold tracking-tight">Plano & Billing</h1>
          <div className="w-10"></div>
        </div>
      </header>

      <main className="flex-1 pb-32 max-w-screen-xl mx-auto w-full">
        {/* Current Plan Card */}
        <div className="p-4">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#C6A75E] to-[#0F172A] text-white p-6 shadow-2xl border border-white/10">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Award className="w-32 h-32" />
            </div>
            
            <div className="relative z-10 flex flex-col gap-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-white/70 text-[10px] font-bold uppercase tracking-widest">Plano Atual</p>
                  <h2 className="text-2xl font-bold tracking-tight mt-1">Plano Executivo</h2>
                </div>
                <div className="bg-white/20 backdrop-blur-md border border-white/30 px-3 py-1 rounded-lg text-[10px] font-bold tracking-tighter uppercase">
                  Premium Member
                </div>
              </div>

              <div className="flex items-end justify-between">
                <div>
                  <p className="text-white/70 text-[10px] font-bold uppercase tracking-widest">Próximo faturamento</p>
                  <p className="text-lg font-bold mt-1">15 Set, 2024</p>
                </div>
                <button className="h-10 px-6 bg-white text-[#C6A75E] font-bold text-sm rounded-xl shadow-lg active:scale-95 transition-all">
                  Upgrade
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Benefits Section */}
        <section className="mt-6">
          <h3 className="px-5 text-lg font-bold tracking-tight mb-4 text-[#0F172A]">Benefícios do Plano</h3>
          <div className="bg-white border-y border-slate-100 divide-y divide-slate-50">
            {[
              { icon: <Users className="w-5 h-5" />, label: 'Networking de Governança' },
              { icon: <Calendar className="w-5 h-5" />, label: 'Acesso a Eventos Exclusivos' },
              { icon: <TrendingUp className="w-5 h-5" />, label: 'Relatórios de Mercado Trimestrais' }
            ].map((benefit, i) => (
              <div key={i} className="flex items-center justify-between px-5 py-4">
                <div className="flex items-center gap-4">
                  <div className="size-10 bg-[#C6A75E]/10 rounded-xl flex items-center justify-center text-[#C6A75E]">
                    {benefit.icon}
                  </div>
                  <p className="text-sm font-medium text-[#0F172A]">{benefit.label}</p>
                </div>
                <CheckCircle2 className="w-5 h-5 text-[#C6A75E] fill-current" />
              </div>
            ))}
          </div>
        </section>

        {/* Billing Info Section */}
        <section className="mt-8">
          <h3 className="px-5 text-lg font-bold tracking-tight mb-4 text-[#0F172A]">Informações de Cobrança</h3>
          <div className="px-4">
            <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col gap-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-8 bg-slate-50 rounded-lg flex items-center justify-center border border-slate-100">
                    <span className="text-[10px] font-black italic text-blue-800">VISA</span>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-[#0F172A]">•••• 4421</p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Expira em 10/2027</p>
                  </div>
                </div>
                <button className="text-[#C6A75E] text-xs font-bold hover:underline">Alterar</button>
              </div>
              <div className="h-px bg-slate-50 w-full"></div>
              <div className="flex justify-between items-center">
                <p className="text-sm text-slate-500 font-medium">Próximo pagamento:</p>
                <p className="text-sm font-bold text-[#0F172A]">R$ 499,00</p>
              </div>
            </div>
          </div>
        </section>

        {/* Next Tiers Section */}
        <section className="mt-8">
          <div className="px-5 flex justify-between items-end mb-4">
            <h3 className="text-lg font-bold tracking-tight text-[#0F172A]">Próximos Níveis</h3>
            <span className="text-[#D4AF37] text-[10px] font-bold flex items-center gap-1 uppercase tracking-widest">
              <Award className="w-3 h-3" /> EXCLUSIVO
            </span>
          </div>
          
          <div className="px-4 pb-8">
            <div className="relative overflow-hidden rounded-2xl bg-white border border-slate-100 p-6 shadow-sm group cursor-pointer active:scale-[0.98] transition-all">
              <div className="absolute top-6 right-6 text-slate-200">
                <Lock className="w-6 h-6" />
              </div>
              
              <div className="flex flex-col gap-3 opacity-60">
                <h4 className="text-lg font-bold text-[#0F172A]">Plano Chairman</h4>
                <p className="text-sm text-slate-500 leading-relaxed pr-8">Desbloqueie rodadas exclusivas de Private Equity e Jantares de Conselho Internacionais.</p>
                <div className="flex gap-2 mt-2">
                  <span className="px-3 py-1 bg-[#D4AF37]/10 rounded-full text-[10px] text-[#D4AF37] font-bold uppercase tracking-widest border border-[#D4AF37]/20">Investments</span>
                  <span className="px-3 py-1 bg-[#D4AF37]/10 rounded-full text-[10px] text-[#D4AF37] font-bold uppercase tracking-widest border border-[#D4AF37]/20">Global Dinner</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="px-6 py-8 mt-auto flex flex-col items-center gap-6 border-t border-slate-100">
          <p className="text-center text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-relaxed">
            Sua assinatura é renovada automaticamente. <br/>
            Cancelamento disponível a qualquer momento nas configurações.
          </p>
          <div className="flex gap-8">
            <button className="text-xs font-bold text-[#C6A75E]">Histórico de Faturas</button>
            <button className="text-xs font-bold text-slate-400">Termos de Uso</button>
          </div>
        </footer>
      </main>
    </div>
  );
}
