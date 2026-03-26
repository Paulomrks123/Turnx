import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ChevronLeft, 
  Share2, 
  CheckCircle, 
  Lock, 
  Copy,
  Mail,
  MessageCircle
} from 'lucide-react';
import { BottomNav } from '../components/BottomNav';

export function ServiceDetails() {
  const navigate = useNavigate();
  const [showReferralModal, setShowReferralModal] = useState(false);

  return (
    <div className="bg-[#f8f7f6] font-sans text-slate-900 antialiased min-h-screen relative">
      <header className="sticky top-0 z-40 bg-[#f8f7f6]/80 backdrop-blur-md border-b border-slate-200">
        <div className="flex items-center p-4 justify-between max-w-screen-xl mx-auto">
          <div className="flex items-center gap-2">
            <button onClick={() => navigate(-1)} className="p-2 -ml-2 text-slate-700">
              <ChevronLeft className="w-6 h-6" />
            </button>
            <h2 className="text-sm font-semibold tracking-tight uppercase opacity-60">Detalhes do Serviço</h2>
          </div>
          <button className="p-2 text-slate-700">
            <Share2 className="w-6 h-6" />
          </button>
        </div>
      </header>

      <main className="max-w-screen-xl mx-auto pb-32">
        <section className="px-4 pt-8 pb-4">
          <h1 className="text-3xl font-bold leading-tight tracking-[-0.02em] text-slate-900">
            Due Diligence Tributária e Planejamento Fiscal
          </h1>
          <div className="flex gap-2 mt-4 flex-wrap">
            <div className="flex h-7 items-center justify-center gap-x-2 rounded-lg bg-[#c59f47]/10 px-3 border border-[#c59f47]/20">
              <p className="text-[#c59f47] text-xs font-semibold uppercase tracking-wider">Tributário</p>
            </div>
            <div className="flex h-7 items-center justify-center gap-x-2 rounded-lg bg-slate-200 px-3">
              <p className="text-slate-600 text-xs font-semibold uppercase tracking-wider">Audit & Risk</p>
            </div>
          </div>
        </section>

        <section className="px-4 py-6 border-y border-slate-100 my-4 bg-white">
          <div className="flex items-center gap-4 justify-between">
            <div className="flex items-center gap-3">
              <div 
                className="bg-center bg-no-repeat aspect-square bg-cover rounded-full h-14 w-14 border-2 border-[#c59f47]/20" 
                style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCmlS5-4YMKTlS_VpfLUYdSBYCJDZi2n1nIT3-VPnJ7e4c-TBacmskMFmkm3CDiV67BBKPkdBQEOdEZP4nM5EMmu3Pn4_IYftUjukG736UlJP2N7ioUQhclZkp1iXYy-84cYaRRqZnZDGX5FrxR-EKCS6QGKwd6VYvbwfyYiXRsxCCLMQ5QMSoNbEBbWQXNOeCSuZwEzth2pG0ZYTHP0cG2eIZHHlVNYJ00e8ck8cN4Yw71pb-3eGSlUSVNeI4kNL4ha-Jd3cn6vkw')" }}
              ></div>
              <div className="flex flex-col">
                <p className="text-slate-900 text-base font-bold leading-tight">Ricardo Almeida</p>
                <p className="text-[#c59f47] text-xs font-medium leading-normal">Tax Partner na InvestCorp</p>
              </div>
            </div>
            <ChevronLeft className="w-5 h-5 text-slate-400 rotate-180" />
          </div>
        </section>

        <section className="px-4 py-4">
          <h3 className="text-lg font-bold text-slate-900 mb-3">Sobre o Serviço</h3>
          <p className="text-slate-600 text-sm leading-relaxed mb-6">
            Oferecemos uma análise profunda e técnica das obrigações fiscais para mitigar riscos e maximizar a eficiência financeira. Nossa Due Diligence Tributária foca na identificação de contingências ocultas e na otimização de fluxos de caixa através de planejamento fiscal estratégico e conformidade rigorosa.
          </p>
          <h4 className="text-sm font-bold text-slate-900 mb-4 uppercase tracking-widest">Escopo de Atuação</h4>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <CheckCircle className="text-[#c59f47] w-5 h-5 mt-0.5" />
              <span className="text-sm text-slate-700">Auditoria de passivos e ativos tributários</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="text-[#c59f47] w-5 h-5 mt-0.5" />
              <span className="text-sm text-slate-700">Revisão de conformidade fiscal e regulatória</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="text-[#c59f47] w-5 h-5 mt-0.5" />
              <span className="text-sm text-slate-700">Identificação de oportunidades de recuperação de impostos</span>
            </li>
          </ul>
        </section>

        <section className="px-4 mt-8 space-y-4">
          <div className="relative overflow-hidden rounded-xl border border-slate-200 bg-white p-5">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-bold text-slate-900">Cases de Sucesso</h3>
              <span className="bg-[#c59f47]/10 text-[#c59f47] text-[10px] font-bold px-2 py-0.5 rounded uppercase">Plus</span>
            </div>
            <div className="relative">
              <div className="space-y-2 opacity-20 select-none">
                <div className="h-4 w-3/4 bg-slate-200 rounded"></div>
                <div className="h-4 w-full bg-slate-200 rounded"></div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <button className="flex items-center gap-2 text-[#c59f47] text-sm font-bold">
                  <Lock className="w-4 h-4" />
                  Upgrade para visualizar
                </button>
              </div>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-1 relative overflow-hidden rounded-xl border border-slate-200 bg-white p-4">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-xs font-bold uppercase text-slate-500">Valores</h3>
                <Lock className="w-3 h-3 text-slate-400" />
              </div>
              <div className="h-6 w-16 bg-slate-100 rounded blur-sm"></div>
            </div>
            <div className="flex-1 relative overflow-hidden rounded-xl border border-slate-200 bg-white p-4">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-xs font-bold uppercase text-slate-500">Barter/Troca</h3>
                <Lock className="w-3 h-3 text-slate-400" />
              </div>
              <div className="h-6 w-12 bg-slate-100 rounded blur-sm"></div>
            </div>
          </div>
        </section>

        <footer className="px-4 py-12 text-center">
          <div className="flex items-center justify-center gap-2 mb-2 opacity-40">
            <div className="h-px w-8 bg-slate-400"></div>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em]">TurnX Certified</span>
            <div className="h-px w-8 bg-slate-400"></div>
          </div>
          <p className="text-xs text-slate-500">Serviços passam por curadoria rigorosa TurnX para garantir excelência e segurança aos membros.</p>
        </footer>
      </main>

      {/* Action Footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-xl border-t border-slate-200 p-4 pb-safe z-40">
        <div className="max-w-screen-xl mx-auto flex gap-3">
          <button 
            onClick={() => setShowReferralModal(true)}
            className="flex-1 flex h-14 items-center justify-center rounded-xl border-2 border-slate-200 text-slate-900 font-bold text-sm tracking-tight"
          >
            Indicar
          </button>
          <button className="flex-[2] flex h-14 items-center justify-center rounded-xl bg-[#c59f47] text-white font-bold text-sm tracking-tight shadow-lg shadow-[#c59f47]/20">
            Tenho Interesse
          </button>
        </div>
      </div>

      {/* Referral Modal */}
      {showReferralModal && (
        <div className="fixed inset-0 z-[60] flex items-end justify-center">
          <div 
            className="absolute inset-0 bg-[#0F172A]/40 backdrop-blur-sm" 
            onClick={() => setShowReferralModal(false)}
          ></div>
          <div className="w-full max-w-screen-xl bg-white rounded-t-[2.5rem] shadow-2xl p-6 pb-safe relative z-10 animate-in slide-in-from-bottom duration-300">
            <div className="w-12 h-1.5 bg-slate-200 rounded-full mx-auto mb-8"></div>
            <div className="text-center mb-10 px-4">
              <h3 className="text-[#0F172A] text-2xl font-bold tracking-tight mb-2">Indicar Serviço</h3>
              <p className="text-slate-500 text-sm font-normal leading-relaxed">Indique este serviço para sua rede ou um contato específico.</p>
            </div>
            <div className="space-y-3 mb-10">
              <button className="w-full flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100 active:bg-slate-100 transition-colors">
                <div className="w-10 h-10 flex items-center justify-center bg-white rounded-full shadow-sm">
                  <Copy className="w-5 h-5 text-[#0F172A]" />
                </div>
                <span className="text-[#0F172A] font-semibold text-[15px]">Copiar Link</span>
                <ChevronLeft className="w-5 h-5 text-slate-300 ml-auto rotate-180" />
              </button>
              <button className="w-full flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100 active:bg-slate-100 transition-colors">
                <div className="w-10 h-10 flex items-center justify-center bg-white rounded-full shadow-sm">
                  <Mail className="w-5 h-5 text-[#0F172A]" />
                </div>
                <span className="text-[#0F172A] font-semibold text-[15px]">Enviar via Mensagem Direta (TurnX)</span>
                <ChevronLeft className="w-5 h-5 text-slate-300 ml-auto rotate-180" />
              </button>
              <button className="w-full flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100 active:bg-slate-100 transition-colors">
                <div className="w-10 h-10 flex items-center justify-center bg-white rounded-full shadow-sm">
                  <MessageCircle className="w-5 h-5 text-[#25D366]" />
                </div>
                <span className="text-[#0F172A] font-semibold text-[15px]">Compartilhar via WhatsApp</span>
                <ChevronLeft className="w-5 h-5 text-slate-300 ml-auto rotate-180" />
              </button>
            </div>
            <button 
              onClick={() => setShowReferralModal(false)}
              className="w-full py-4 text-slate-500 font-bold text-sm tracking-wide uppercase active:opacity-60"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

      <BottomNav />
      <style>{`
        .pb-safe {
          padding-bottom: calc(env(safe-area-inset-bottom, 20px) + 4rem);
        }
      `}</style>
    </div>
  );
}
