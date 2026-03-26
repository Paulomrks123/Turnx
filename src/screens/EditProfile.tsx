import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ChevronLeft, 
  Camera, 
  Plus, 
  X,
  Check,
  Loader2
} from 'lucide-react';
import { profileService } from '../services/profileService';
import { useAuth } from '../hooks/useAuth';

export function EditProfile() {
  const navigate = useNavigate();
  const { user, profile, loading: authLoading, refreshProfile } = useAuth();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    full_name: '',
    role: '',
    company: '',
    bio: '',
    avatar_url: ''
  });

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      navigate('/auth');
      return;
    }

    if (profile) {
      setFormData({
        full_name: profile.full_name || '',
        role: profile.role || '',
        company: profile.company || '',
        bio: profile.bio || '',
        avatar_url: profile.avatar_url || ''
      });
      setLoading(false);
    }
  }, [user, profile, authLoading, navigate]);

  const handleSave = async () => {
    if (!user) return;
    setSaving(true);
    try {
      await profileService.updateProfile(user.id, {
        full_name: formData.full_name,
        role: formData.role,
        company: formData.company,
        bio: formData.bio,
        avatar_url: formData.avatar_url
      });

      await refreshProfile();
      navigate('/profile');
    } catch (error: any) {
      alert('Erro ao salvar perfil: ' + error.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading || authLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-[#C6A75E]" />
      </div>
    );
  }

  const renderStep1 = () => (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col items-center gap-4 py-6">
        <div className="relative">
          <div 
            className="w-32 h-32 rounded-full bg-cover bg-center border-4 border-white shadow-xl bg-slate-100 flex items-center justify-center overflow-hidden"
            style={{ backgroundImage: formData.avatar_url ? `url('${formData.avatar_url}')` : 'none' }}
          >
            {!formData.avatar_url && <Camera className="w-12 h-12 text-slate-300" />}
          </div>
          <button className="absolute bottom-0 right-0 bg-[#C6A75E] p-2.5 rounded-full border-2 border-white shadow-lg text-white">
            <Camera className="w-5 h-5" />
          </button>
        </div>
        <p className="text-sm font-bold text-[#0F172A]">Alterar foto de perfil</p>
      </div>

      <div className="px-4">
        <div className="bg-[#C6A75E]/5 p-4 rounded-2xl border border-[#C6A75E]/10 mb-6">
          <p className="text-[#C6A75E] text-xs font-bold text-center leading-relaxed">
            Seu perfil é utilizado para matchmaking inteligente e curadoria de oportunidades de negócios exclusivas.
          </p>
        </div>

        <div className="space-y-5">
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">Nome Completo</label>
            <input 
              type="text" 
              value={formData.full_name}
              onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
              className="w-full h-14 px-4 bg-white border border-slate-200 rounded-2xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#C6A75E]/20 focus:border-[#C6A75E] transition-all"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">Cargo</label>
            <input 
              type="text" 
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              className="w-full h-14 px-4 bg-white border border-slate-200 rounded-2xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#C6A75E]/20 focus:border-[#C6A75E] transition-all"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">Empresa</label>
            <input 
              type="text" 
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              className="w-full h-14 px-4 bg-white border border-slate-200 rounded-2xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#C6A75E]/20 focus:border-[#C6A75E] transition-all"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">URL da Foto (Avatar)</label>
            <input 
              type="text" 
              value={formData.avatar_url}
              onChange={(e) => setFormData({ ...formData, avatar_url: e.target.value })}
              placeholder="https://exemplo.com/foto.jpg"
              className="w-full h-14 px-4 bg-white border border-slate-200 rounded-2xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#C6A75E]/20 focus:border-[#C6A75E] transition-all"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="px-4 py-6 flex flex-col gap-6">
      <div className="flex flex-col gap-1.5">
        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">Bio Executiva</label>
        <textarea 
          rows={6}
          placeholder="Resuma sua tese de investimento ou foco de atuação..."
          value={formData.bio}
          onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
          className="w-full p-4 bg-white border border-slate-200 rounded-2xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#C6A75E]/20 focus:border-[#C6A75E] transition-all resize-none"
        />
        <p className="text-right text-[10px] text-slate-400 font-bold mt-1">{formData.bio.length} / 300 caracteres</p>
      </div>

      <div className="flex flex-col gap-4">
        <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">Áreas de Atuação</h3>
        <div className="flex flex-wrap gap-2">
          {['Finanças Corporativas', 'Gestão de Risco', 'Supply Chain 4.0'].map((tag, i) => (
            <div key={i} className="flex items-center gap-2 bg-[#C6A75E] text-white px-4 py-2 rounded-full text-xs font-bold">
              {tag}
              <X className="w-3 h-3 cursor-pointer" />
            </div>
          ))}
          <button className="size-9 rounded-full border border-dashed border-[#C6A75E] text-[#C6A75E] flex items-center justify-center">
            <Plus className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">Objetivos no Club</h3>
        <div className="flex flex-wrap gap-2">
          {['Investir', 'Networking'].map((tag, i) => (
            <div key={i} className="flex items-center gap-2 bg-[#C6A75E] text-white px-4 py-2 rounded-full text-xs font-bold">
              {tag}
              <X className="w-3 h-3 cursor-pointer" />
            </div>
          ))}
          <button className="size-9 rounded-full border border-dashed border-[#C6A75E] text-[#C6A75E] flex items-center justify-center">
            <Plus className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-[#f8f7f6] text-[#0F172A] min-h-screen flex flex-col font-sans">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100 py-3">
        <div className="max-w-screen-xl mx-auto px-4">
          <div className="flex items-center justify-between mb-4">
            <button onClick={() => navigate(-1)} className="p-2 -ml-2">
              <ChevronLeft className="w-6 h-6" />
            </button>
            <h2 className="text-lg font-bold tracking-tight">Editar Perfil</h2>
            <button onClick={() => navigate(-1)} className="text-[#C6A75E] text-sm font-bold">Cancelar</button>
          </div>
          
          <div className="px-2">
            <div className="flex justify-between items-center mb-2">
              <span className="text-[10px] font-bold text-[#C6A75E] uppercase tracking-widest">Passo {step} de 2</span>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                {step === 1 ? 'Informações Básicas' : 'Bio & Tags'}
              </span>
            </div>
            <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-[#C6A75E] transition-all duration-500" 
                style={{ width: `${(step / 2) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 pb-32 max-w-screen-xl mx-auto w-full">
        {step === 1 ? renderStep1() : renderStep2()}
      </main>

      <div className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-[#f8f7f6] via-[#f8f7f6]/95 to-transparent z-40">
        <div className="max-w-md mx-auto flex gap-3">
          {step > 1 && (
            <button 
              onClick={() => setStep(step - 1)}
              className="flex-1 h-14 bg-white border border-slate-200 text-[#0F172A] font-bold rounded-2xl active:scale-[0.98] transition-all"
            >
              Voltar
            </button>
          )}
          <button 
            onClick={() => {
              if (step < 2) setStep(step + 1);
              else handleSave();
            }}
            disabled={saving}
            className="flex-[2] h-14 bg-[#C6A75E] text-white font-bold rounded-2xl shadow-xl shadow-[#C6A75E]/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {saving ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                {step < 2 ? 'Próximo' : 'Salvar Alterações'}
                {step === 2 && <Check className="w-5 h-5" />}
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
