import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ChevronLeft, 
  Settings, 
  Edit3, 
  Award, 
  Briefcase, 
  Users, 
  Share2, 
  CheckCircle2,
  Brain,
  User,
  Loader2
} from 'lucide-react';
import { BottomNav } from '../components/BottomNav';
import { useAuth } from '../hooks/useAuth';
import { supabase } from '../lib/supabase';

export function Profile() {
  const navigate = useNavigate();
  const { user, profile, loading: authLoading } = useAuth();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    connections: 0,
    referrals: 0,
    governance: 0
  });

  useEffect(() => {
    async function getProfileData() {
      if (authLoading) return;
      if (!user) {
        navigate('/auth');
        return;
      }

      try {
        setLoading(true);
        // Fetch connection count
        const { count, error: countError } = await supabase
          .from('connections')
          .select('*', { count: 'exact', head: true })
          .or(`requester_id.eq.${user.id},receiver_id.eq.${user.id}`)
          .eq('status', 'accepted');

        if (!countError) {
          setStats(prev => ({ ...prev, connections: count || 0 }));
        }

      } catch (error) {
        console.error('Error fetching profile stats:', error);
      } finally {
        setLoading(false);
      }
    }

    getProfileData();
  }, [user, authLoading, navigate]);

  if (loading || authLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-[#C6A75E]" />
      </div>
    );
  }

  return (
    <div className="bg-[#f8f7f6] text-[#0F172A] min-h-screen flex flex-col font-sans">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100 h-16 flex items-center justify-between">
        <div className="max-w-screen-xl mx-auto w-full px-4 flex items-center justify-between">
          <button onClick={() => navigate(-1)} className="p-2 -ml-2">
            <ChevronLeft className="w-6 h-6 text-slate-600" />
          </button>
          <h1 className="text-lg font-bold tracking-tight">Meu Perfil</h1>
          <button onClick={() => navigate('/settings')} className="p-2 -mr-2 text-slate-600">
            <Settings className="w-6 h-6" />
          </button>
        </div>
      </header>

      <main className="flex-1 pb-32 max-w-screen-xl mx-auto w-full">
        {/* Profile Header */}
        <section className="mt-8 px-4 text-center">
          <div className="flex flex-col items-center">
            <div className="relative">
              <div className="w-32 h-32 rounded-full border-2 border-[#D4AF37] p-1 bg-white shadow-xl overflow-hidden">
                <div 
                  className="w-full h-full rounded-full bg-cover bg-center flex items-center justify-center bg-slate-100" 
                  style={{ backgroundImage: profile?.avatar_url ? `url('${profile.avatar_url}')` : 'none' }}
                >
                  {!profile?.avatar_url && <User className="w-12 h-12 text-slate-300" />}
                </div>
              </div>
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-[#D4AF37] text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-sm flex items-center gap-1 uppercase tracking-wider whitespace-nowrap">
                <Award className="w-3 h-3" /> VIP Member
              </div>
            </div>
            
            <div className="mt-6">
              <h2 className="text-2xl font-bold tracking-tight text-[#0F172A]">{profile?.full_name || 'Usuário'}</h2>
              <p className="text-[#C6A75E] font-bold text-sm mt-1">{profile?.role} | {profile?.company}</p>
              <div className="flex items-center justify-center gap-2 mt-1 text-slate-500 text-[10px] font-bold uppercase tracking-widest">
                <Briefcase className="w-3 h-3" /> {profile?.company}
              </div>
              <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-bold uppercase tracking-wider">
                <Award className="w-3 h-3" /> {profile?.points || 0} Pontos
              </div>
            </div>
          </div>

          <div className="mt-6 max-w-md mx-auto">
            <button 
              onClick={() => navigate('/edit-profile')}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 border border-slate-200 text-[#0F172A] font-bold text-sm rounded-xl hover:bg-slate-50 transition-all active:scale-[0.98]"
            >
              <Edit3 className="w-4 h-4" />
              Editar Perfil
            </button>
          </div>
        </section>

        {/* Stats */}
        <section className="mt-8 px-4 max-w-2xl mx-auto">
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: 'Conexões', value: stats.connections.toString() },
              { label: 'Indicações', value: stats.referrals.toString() },
              { label: 'Governança', value: stats.governance.toString() }
            ].map((stat, i) => (
              <div key={i} className="bg-white border border-slate-100 rounded-2xl p-4 flex flex-col items-center shadow-sm">
                <span className="text-[#C6A75E] font-bold text-lg leading-none">{stat.value}</span>
                <span className="text-[10px] uppercase font-bold tracking-tighter text-slate-400 mt-1">{stat.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Networking Goals */}
        <section className="mt-8 max-w-2xl mx-auto">
          <h3 className="px-5 text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">Objetivos de Networking</h3>
          <div className="flex gap-2 px-5 overflow-x-auto no-scrollbar">
            {['Investir', 'Networking', 'Mentoria'].map((goal, i) => (
              <div key={i} className="flex items-center gap-2 bg-[#C6A75E]/10 text-[#C6A75E] border border-[#C6A75E]/20 px-4 py-2 rounded-xl font-bold text-sm whitespace-nowrap">
                {goal}
              </div>
            ))}
          </div>
        </section>

        {/* About & Expertise Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8 px-4 max-w-4xl mx-auto">
          {/* About */}
          <section>
            <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm h-full">
              <h3 className="text-sm font-bold text-[#0F172A] flex items-center gap-2 mb-3">
                <User className="w-4 h-4 text-[#C6A75E]" />
                Sobre
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {profile?.bio || `Membro da rede TurnX. ${profile?.role} na ${profile?.company}.`}
              </p>
            </div>
          </section>

          {/* Expertise */}
          <section>
            <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm h-full">
              <h3 className="text-sm font-bold text-[#0F172A] flex items-center gap-2 mb-4">
                <Brain className="w-4 h-4 text-[#C6A75E]" />
                Áreas de Atuação
              </h3>
              <div className="flex flex-wrap gap-2">
                {['Liderança', 'Estratégia', 'Networking'].map((tag, i) => (
                  <span key={i} className="bg-slate-50 text-slate-600 text-[11px] font-bold px-3 py-1.5 rounded-full border border-slate-100">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* Floating Plan Card */}
      <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-40 px-4 w-full max-w-screen-xl">
        <div className="bg-[#0F172A] text-white rounded-2xl p-4 shadow-2xl flex items-center justify-between border border-white/10 max-w-md mx-auto">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/20 flex items-center justify-center">
              <Award className="w-6 h-6 text-[#D4AF37]" />
            </div>
            <div>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Plano Atual</p>
              <p className="text-sm font-bold uppercase tracking-wider">Executivo Gold</p>
            </div>
          </div>
          <button 
            onClick={() => navigate('/billing')}
            className="bg-[#C6A75E] hover:bg-[#C6A75E]/90 text-white text-[10px] font-bold px-5 py-2.5 rounded-xl transition-all active:scale-95 shadow-lg"
          >
            UPGRADE
          </button>
        </div>
      </div>

      <BottomNav />
      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
