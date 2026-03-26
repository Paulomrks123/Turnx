import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ChevronLeft, 
  ShieldCheck, 
  Send,
  Rocket,
  Loader2,
  X,
  Info,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { opportunityService } from '../services/opportunityService';
import { useAuth } from '../hooks/useAuth';

export function CreateOpportunity() {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'negócio'
  });

  const handleSubmit = async () => {
    try {
      if (authLoading) return;
      if (!user) {
        navigate('/auth');
        return;
      }

      if (!formData.title || !formData.description) {
        return;
      }

      setLoading(true);
      await opportunityService.createOpportunity({
        user_id: user.id,
        title: formData.title,
        description: formData.description,
        type: formData.type as any
      });

      setShowSuccess(true);
      setTimeout(() => {
        navigate('/home');
      }, 3000);
    } catch (error: any) {
      console.error('Error creating opportunity:', error);
    } finally {
      setLoading(false);
    }
  };

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-6 text-center">
        <div className="max-w-md space-y-8">
          <div className="size-24 bg-emerald-50 rounded-[32px] flex items-center justify-center mx-auto animate-bounce">
            <CheckCircle2 className="w-12 h-12 text-emerald-500" />
          </div>
          <div className="space-y-4">
            <h2 className="text-3xl font-black text-[#0F172A] tracking-tight">Oportunidade Enviada!</h2>
            <p className="text-slate-500 font-medium leading-relaxed">
              Sua publicação foi enviada para nossa curadoria. Em breve ela estará disponível para toda a rede.
            </p>
          </div>
          <div className="pt-8">
            <button 
              onClick={() => navigate('/home')}
              className="h-14 px-12 bg-[#0F172A] text-white rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-[#0F172A]/20"
            >
              Voltar ao Início
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-transparent text-[#0F172A] min-h-screen pb-24 font-sans">
      {/* Mobile Header */}
      <header className="lg:hidden sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100 px-4 h-16 flex items-center justify-between safe-top">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2">
          <ChevronLeft className="w-6 h-6 text-slate-600" />
        </button>
        <h1 className="text-lg font-bold tracking-tight">Nova Oportunidade</h1>
        <div className="w-10"></div>
      </header>

      <main className="py-8 lg:py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Desktop Header */}
          <div className="hidden lg:flex items-center justify-between mb-12">
            <div>
              <h1 className="text-4xl font-black tracking-tight mb-2">Publicar Oportunidade</h1>
              <p className="text-slate-500 font-medium">Compartilhe negócios, parcerias ou investimentos com a rede.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left Column: Info */}
            <div className="lg:col-span-4 space-y-8">
              <div className="bg-white rounded-[40px] p-8 border border-slate-50 shadow-xl shadow-slate-200/50">
                <div className="size-16 bg-[#C6A75E]/10 rounded-2xl flex items-center justify-center mb-6">
                  <ShieldCheck className="w-8 h-8 text-[#C6A75E]" />
                </div>
                <h3 className="text-xl font-black text-[#0F172A] mb-4 leading-tight">Curadoria Ativa</h3>
                <p className="text-sm text-slate-500 font-medium leading-relaxed">
                  Para garantir o altíssimo nível das interações, todas as publicações passam por uma revisão manual antes de serem exibidas no feed global.
                </p>
              </div>

              <div className="bg-slate-50 rounded-[32px] p-8 border border-slate-100 flex items-start gap-4">
                <Info className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
                <p className="text-xs text-slate-400 font-bold leading-relaxed">
                  Evite publicações puramente comerciais ou SPAM. Foque em gerar valor real para a comunidade.
                </p>
              </div>
            </div>

            {/* Right Column: Form */}
            <div className="lg:col-span-8">
              <div className="bg-white rounded-[48px] p-8 lg:p-12 border border-slate-50 shadow-xl shadow-slate-200/50 space-y-8">
                {/* Title */}
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Título da Oportunidade</label>
                  <input 
                    type="text" 
                    placeholder="Ex: Procuro sócio para expansão internacional"
                    className="w-full h-16 px-6 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-sm focus:outline-none focus:ring-2 focus:ring-[#C6A75E]/20 transition-all"
                    value={formData.title}
                    onChange={e => setFormData({...formData, title: e.target.value})}
                  />
                </div>

                {/* Type Selection */}
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Tipo de Negócio</label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {['negócio', 'investimento', 'm&a', 'parceria'].map((type) => (
                      <button
                        key={type}
                        onClick={() => setFormData({...formData, type})}
                        className={`h-12 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all border-2 ${
                          formData.type === type 
                            ? 'bg-[#0F172A] border-[#0F172A] text-white shadow-lg shadow-[#0F172A]/20' 
                            : 'bg-white border-slate-100 text-slate-400 hover:border-slate-200'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Descrição Detalhada</label>
                  <textarea 
                    placeholder="Descreva os detalhes da oportunidade, o que você busca e o que oferece..."
                    className="w-full h-48 p-6 bg-slate-50 border border-slate-100 rounded-[32px] font-bold text-sm focus:outline-none focus:ring-2 focus:ring-[#C6A75E]/20 transition-all resize-none"
                    value={formData.description}
                    onChange={e => setFormData({...formData, description: e.target.value})}
                  />
                </div>

                {/* Submit */}
                <div className="pt-4">
                  <button 
                    onClick={handleSubmit}
                    disabled={loading || !formData.title || !formData.description}
                    className="w-full h-16 bg-[#0F172A] text-white rounded-[24px] font-black text-sm uppercase tracking-widest shadow-2xl shadow-[#0F172A]/20 flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 disabled:pointer-events-none"
                  >
                    {loading ? (
                      <Loader2 className="w-6 h-6 animate-spin" />
                    ) : (
                      <>
                        Enviar para Aprovação <Rocket className="w-5 h-5" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
