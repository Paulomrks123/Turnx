import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ChevronLeft, 
  Bell, 
  Star, 
  TrendingUp, 
  Calendar, 
  Coffee, 
  BookOpen, 
  ChevronRight,
  MoreHorizontal,
  Loader2
} from 'lucide-react';
import { BottomNav } from '../components/BottomNav';
import { motion } from 'motion/react';
import { profileService } from '../services/profileService';
import { useAuth } from '../hooks/useAuth';

export function Ranking() {
  const navigate = useNavigate();
  const { user, profile: currentUserProfile, loading: authLoading } = useAuth();
  const [activeTab, setActiveTab] = useState('Geral');
  const [ranking, setRanking] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [userRank, setUserRank] = useState<number>(0);

  useEffect(() => {
    async function fetchData() {
      if (authLoading) return;
      if (!user) {
        navigate('/auth');
        return;
      }

      try {
        setLoading(true);
        const allProfiles = await profileService.getRanking();
        setRanking(allProfiles || []);
        
        const rankIndex = allProfiles?.findIndex(p => p.id === user.id);
        setUserRank(rankIndex !== -1 ? (rankIndex || 0) + 1 : 0);

      } catch (error) {
        console.error('Error fetching ranking data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [user, authLoading, navigate]);

  if (loading || authLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-[#C6A75E]" />
      </div>
    );
  }

  return (
    <div className="bg-[#f8f7f6] text-[#0F172A] min-h-screen pb-24 font-sans">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-slate-100 safe-top">
        <div className="max-w-screen-xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate(-1)} className="p-2 -ml-2">
              <ChevronLeft className="w-6 h-6 text-slate-600" />
            </button>
            <h1 className="text-lg font-bold tracking-tight">Meu Desempenho</h1>
          </div>
          <button className="p-2">
            <Bell className="w-6 h-6 text-slate-600" />
          </button>
        </div>
      </header>

      <main className="max-w-screen-xl mx-auto p-5 space-y-8">
        {/* Performance Summary Card */}
        <section className="bg-[#0F172A] rounded-[32px] p-6 text-white shadow-2xl relative overflow-hidden max-w-2xl mx-auto w-full">
          <div className="flex justify-between items-start mb-8">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div 
                  className="size-20 rounded-full border-4 border-[#C6A75E] bg-cover bg-center"
                  style={{ backgroundImage: `url('${currentUserProfile?.avatar_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(currentUserProfile?.full_name || 'User')}&background=random`}')` }}
                />
                <span className="absolute bottom-1 right-1 size-4 bg-green-500 border-2 border-[#0F172A] rounded-full"></span>
              </div>
              <div>
                <h2 className="text-2xl font-bold leading-tight">Olá,</h2>
                <h2 className="text-2xl font-bold leading-tight truncate max-w-[200px]">
                  {currentUserProfile?.full_name || 'Membro'}!
                </h2>
                <div className="flex gap-2 mt-1">
                  <span className="text-[10px] font-bold bg-white/10 px-2 py-0.5 rounded uppercase tracking-wider text-[#C6A75E]">Active</span>
                  <span className="text-[10px] font-bold bg-white/10 px-2 py-0.5 rounded uppercase tracking-wider text-[#C6A75E]">Member</span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <p className="text-4xl font-bold">{currentUserProfile?.points || 0}</p>
              <p className="text-[10px] font-bold text-[#C6A75E] uppercase tracking-widest">Pontos Acumulados</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-end">
              <div>
                <p className="text-slate-400 text-xs mb-1">Sua posição atual</p>
                <p className="text-2xl font-bold">#{userRank} no Ranking</p>
              </div>
              <p className="text-[10px] font-bold text-[#C6A75E] uppercase tracking-wider">
                {userRank > 1 ? `Faltam ${ranking[userRank - 2]?.points - (currentUserProfile?.points || 0) + 1} pts para subir` : 'Você é o #1!'}
              </p>
            </div>
            
            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(((currentUserProfile?.points || 0) / (ranking[0]?.points || 1)) * 100, 100)}%` }}
                className="h-full bg-[#C6A75E]"
              />
            </div>

            <div className="flex items-center gap-2 text-[11px] text-slate-400">
              <TrendingUp className="w-4 h-4 text-green-500" />
              <span>Continue engajando para subir no ranking global!</span>
            </div>
          </div>
        </section>

        {/* How to increase score */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Como aumentar seu score</h3>
            <button className="text-[#C6A75E] text-xs font-bold">Ver Tudo</button>
          </div>
          
          <div className="space-y-3">
            {[
              { icon: Calendar, title: 'Confirmar presença no Jantar', date: 'Próxima terça-feira às 19:30', points: '+100', color: 'bg-amber-50 text-amber-500' },
              { icon: Coffee, title: 'Agendar Coffee Meeting', date: 'Conecte-se com novos membros', points: '+75', color: 'bg-blue-50 text-blue-500' },
              { icon: BookOpen, title: 'Ler Insight da Semana', date: 'Conteúdo exclusivo para CEOs', points: '+20', color: 'bg-emerald-50 text-emerald-500' },
            ].map((item, i) => (
              <div key={i} className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
                <div className={`size-12 rounded-xl flex items-center justify-center ${item.color}`}>
                  <item.icon className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-bold">{item.title}</h4>
                  <p className="text-[11px] text-slate-400">{item.date}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-[#C6A75E]">{item.points}</p>
                  <p className="text-[9px] font-bold text-slate-300 uppercase">pts</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Club Ranking */}
        <section>
          <div className="mb-6">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Ranking do Clube</h3>
            <p className="text-[11px] text-slate-400">Engajamento total da rede de membros</p>
          </div>

          <div className="bg-slate-100 p-1 rounded-2xl flex mb-6">
            {['Semana', 'Mês', 'Geral'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all ${
                  activeTab === tab ? 'bg-white text-[#0F172A] shadow-sm' : 'text-slate-400'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="space-y-3">
            {ranking.slice(0, 10).map((member, index) => (
              <div 
                key={member.id} 
                className={`bg-white p-4 rounded-2xl border flex items-center gap-4 transition-all ${
                  member.id === currentUserProfile?.id ? 'border-[#C6A75E] ring-1 ring-[#C6A75E]/20' : 'border-slate-100'
                }`}
              >
                <div className="relative">
                  <div className="size-12 rounded-full overflow-hidden border-2 border-slate-100">
                    <img src={member.avatar_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(member.full_name)}&background=random`} className="w-full h-full object-cover" alt="" />
                  </div>
                  <div className={`absolute -top-1 -left-1 size-5 rounded-full flex items-center justify-center text-[10px] font-bold text-white shadow-sm ${
                    index === 0 ? 'bg-amber-400' : index === 1 ? 'bg-slate-400' : index === 2 ? 'bg-orange-400' : 'bg-slate-300'
                  }`}>
                    {index + 1}º
                  </div>
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-bold">{member.full_name}</h4>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{member.company}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold">{member.points || 0} pts</p>
                </div>
              </div>
            ))}
          </div>

          <button className="w-full py-4 text-xs font-bold text-slate-400 uppercase tracking-widest mt-6 hover:text-[#C6A75E] transition-colors">
            Ver ranking completo
          </button>
        </section>
      </main>

      <BottomNav />
    </div>
  );
}
