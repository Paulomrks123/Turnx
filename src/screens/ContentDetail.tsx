import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ChevronLeft, 
  Share2, 
  Play, 
  Bookmark, 
  Download, 
  Lightbulb, 
  FileText, 
  BarChart3, 
  ChevronRight, 
  Lock,
  Award
} from 'lucide-react';
import { BottomNav } from '../components/BottomNav';

export function ContentDetail() {
  const navigate = useNavigate();

  return (
    <div className="bg-[#f8f7f6] text-[#111318] min-h-screen flex flex-col font-sans">
      {/* Top Navigation */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-screen-xl mx-auto px-4 py-3 flex items-center justify-between">
          <button onClick={() => navigate(-1)} className="p-2 -ml-2">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <h2 className="text-base font-bold tracking-tight">Detalhe do Conteúdo</h2>
          <button className="p-2 -mr-2 text-[#C6A75E]">
            <Share2 className="w-5 h-5" />
          </button>
        </div>
      </header>

      <main className="flex-1 pb-32 max-w-screen-xl mx-auto w-full">
        {/* Media Player */}
        <div className="p-4 pt-2">
          <div 
            className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl bg-[#0F172A] flex items-center justify-center bg-cover bg-center"
            style={{ 
              backgroundImage: "linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('https://lh3.googleusercontent.com/aida-public/AB6AXuCp-Z5aoKaDErVCa4xIlVxg2u99XEN36FxZAsRKuJD-PaFI9Z2O55AM3yvc9ySVQCHQDSy0D9DF_liWGv29BkIA6_JYMlQKfVnFl-eb-ztHWLWkk3PP2dk6CgoJdh0RbOfFV7go3EnBs5vNJvXlyrx9pi0phZx0gMLO3BnktaZr5wt7f7aIG06S4F3eSWZPjq8Sro3OUncDJuAh6MM11qOaqSxR16x-OvrjWdszxj3iULzoD11Jt8yo7BpMKXH521hN-V4E6OPcurw')" 
            }}
          >
            <button className="size-16 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white hover:bg-white/30 transition-all active:scale-90">
              <Play className="w-8 h-8 fill-current ml-1" />
            </button>
            
            {/* Player Controls Overlay */}
            <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
              <div className="flex items-center gap-3 mb-2">
                <div className="h-1.5 flex-[0.35] rounded-full bg-[#C6A75E]"></div>
                <div className="size-4 rounded-full bg-white border-2 border-[#C6A75E] -ml-2"></div>
                <div className="h-1.5 flex-[0.65] rounded-full bg-white/30"></div>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-white text-[10px] font-bold">12:45</p>
                <div className="flex items-center gap-4">
                  <span className="text-white text-[10px] font-bold px-2 py-0.5 border border-white/40 rounded">1.5x</span>
                  <p className="text-white text-[10px] font-bold">42:10</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Header */}
        <div className="px-5 pt-2">
          <h1 className="text-[#0F172A] text-2xl font-bold leading-tight tracking-tight">
            Estratégias de Liderança em Tempos de Crise: O Framework Ágil
          </h1>
          <p className="text-slate-400 text-sm mt-3 pb-6">
            Por <span className="text-[#C6A75E] font-bold">Ricardo Almeida</span> • Diretor Executivo • 12 Out 2023
          </p>
        </div>

        {/* Quick Actions */}
        <div className="px-5 flex gap-3 pb-8">
          <button className="flex-1 h-14 bg-[#C6A75E] text-white rounded-xl font-bold text-sm shadow-lg shadow-[#C6A75E]/20 flex items-center justify-center gap-2 active:scale-[0.98] transition-all">
            <Bookmark className="w-5 h-5 fill-current" />
            Favoritar
          </button>
          <button className="w-14 h-14 bg-white border border-slate-200 rounded-xl text-[#C6A75E] flex items-center justify-center active:scale-[0.98] transition-all">
            <Download className="w-6 h-6" />
          </button>
        </div>

        {/* Divider */}
        <div className="h-2 bg-slate-100"></div>

        {/* Key Insights */}
        <section className="bg-white px-5 py-8">
          <h3 className="text-[#0F172A] text-lg font-bold flex items-center gap-2 mb-6">
            <Lightbulb className="w-6 h-6 text-[#C6A75E]" />
            Principais Insights
          </h3>
          <div className="space-y-6">
            {[
              { num: '01', text: 'Priorize a <span class="font-bold text-[#0F172A]">comunicação radicalmente transparente</span> para manter a confiança das equipes em períodos de incerteza.' },
              { num: '02', text: 'A tomada de decisão descentralizada aumenta a velocidade de resposta em até <span class="font-bold text-[#0F172A]">40%</span>.' },
              { num: '03', text: 'Mapeamento de riscos não deve ser trimestral, mas sim um <span class="font-bold text-[#0F172A]">fluxo contínuo</span> em operações globais.' }
            ].map((insight, i) => (
              <div key={i} className="flex gap-4">
                <span className="text-[#C6A75E] font-bold text-xl leading-none">{insight.num}.</span>
                <p className="text-slate-600 text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: insight.text }}></p>
              </div>
            ))}
          </div>
        </section>

        {/* Related Materials */}
        <section className="bg-white px-5 py-4 border-t border-slate-50">
          <h3 className="text-[#0F172A] text-lg font-bold mb-5">Materiais Relacionados</h3>
          <div className="space-y-3">
            {[
              { title: 'Relatório de Tendências 2024', meta: 'PDF • 4.2 MB', icon: <FileText className="w-5 h-5" /> },
              { title: 'Framework de Implementação', meta: 'XLSX • 1.8 MB', icon: <BarChart3 className="w-5 h-5" /> }
            ].map((item, i) => (
              <button key={i} className="w-full flex items-center p-4 bg-slate-50 border border-slate-100 rounded-2xl transition-all active:scale-[0.98]">
                <div className="size-10 bg-[#C6A75E]/10 rounded-xl flex items-center justify-center text-[#C6A75E] mr-4">
                  {item.icon}
                </div>
                <div className="flex-1 text-left">
                  <h4 className="text-sm font-bold text-[#0F172A]">{item.title}</h4>
                  <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">{item.meta}</p>
                </div>
                <ChevronRight className="w-5 h-5 text-slate-300" />
              </button>
            ))}
          </div>
        </section>

        {/* Premium Section (Locked) */}
        <section className="px-5 py-8">
          <div className="relative bg-[#C6A75E]/5 p-6 rounded-3xl border border-[#C6A75E]/20 overflow-hidden">
            <div className="absolute top-6 right-6 text-[#C6A75E]">
              <Lock className="w-6 h-6 fill-current" />
            </div>
            <h3 className="text-[#0F172A] text-base font-bold mb-2">Conteúdo Plus: Caso Avançado</h3>
            <p className="text-sm text-slate-500 mb-6 pr-8">
              Assista ao estudo de caso real sobre a fusão da TechCorp e GlobalLogistics detalhado pelo CEO.
            </p>
            <div className="blur-[4px] opacity-30 select-none mb-6">
              <div className="h-12 bg-slate-200 rounded-xl w-full"></div>
            </div>
            <button className="w-full bg-[#C6A75E] text-white py-4 rounded-xl font-bold text-sm shadow-xl shadow-[#C6A75E]/20 active:scale-[0.98] transition-all">
              Upgrade para o Plano Gold
            </button>
          </div>
        </section>
      </main>

      {/* Bottom CTA Bar */}
      <div className="fixed bottom-16 left-0 right-0 z-40 bg-white/95 backdrop-blur-xl border-t border-slate-100 p-4">
        <div className="max-w-screen-xl mx-auto flex flex-col gap-3">
          <button className="w-full bg-[#0F172A] hover:bg-slate-800 text-white font-bold py-4 rounded-2xl text-sm transition-all flex items-center justify-center gap-2 shadow-xl">
            Solicitar Acesso Completo
            <Award className="w-5 h-5 text-[#C6A75E]" />
          </button>
          <button className="w-full bg-white border border-slate-200 text-[#0F172A] font-bold py-3 rounded-2xl text-sm transition-all flex items-center justify-center gap-2">
            <Bookmark className="w-5 h-5" />
            Adicionar aos Favoritos
          </button>
        </div>
      </div>
      <BottomNav />
      <style>{`
        .pb-safe {
          padding-bottom: env(safe-area-inset-bottom, 20px);
        }
      `}</style>
    </div>
  );
}
