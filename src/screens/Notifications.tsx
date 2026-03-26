import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Rocket, Calendar, Users, Star, ArrowRight, Loader2 } from 'lucide-react';
import { BottomNav } from '../components/BottomNav';
import { supabase } from '../lib/supabase';

export function Notifications() {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchNotifications() {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          navigate('/auth');
          return;
        }

        const { data, error } = await supabase
          .from('notifications')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });

        if (error) throw error;
        setNotifications(data || []);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchNotifications();
  }, [navigate]);

  const getIcon = (type: string) => {
    switch (type) {
      case 'opportunity': return Rocket;
      case 'connection': return Users;
      case 'event': return Calendar;
      case 'networking': return Star;
      default: return Star;
    }
  };

  const getColor = (type: string) => {
    switch (type) {
      case 'opportunity': return 'bg-emerald-500';
      case 'connection': return 'bg-blue-500';
      case 'event': return 'bg-[#C6A75E]';
      case 'networking': return 'bg-purple-500';
      default: return 'bg-slate-500';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-[#C6A75E]" />
      </div>
    );
  }

  return (
    <div className="bg-[#f8f7f6] text-[#0F172A] min-h-screen flex flex-col font-sans">
      <header className="sticky top-0 z-50 bg-white border-b border-slate-100 safe-top">
        <div className="max-w-screen-xl mx-auto px-4 h-16 flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="p-2 -ml-2">
            <ChevronLeft className="w-6 h-6 text-slate-600" />
          </button>
          <h1 className="text-lg font-bold tracking-tight">Notificações</h1>
        </div>
      </header>

      <main className="flex-1 p-4 space-y-4 pb-24 max-w-screen-xl mx-auto w-full">
        <div className="flex items-center justify-between px-1 mb-2">
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Recentes</h2>
          <button className="text-[10px] font-bold text-[#C6A75E] uppercase">Marcar todas como lidas</button>
        </div>

        {notifications.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-slate-400 text-sm">Nenhuma notificação por enquanto.</p>
          </div>
        ) : (
          notifications.map((notif) => {
            const Icon = getIcon(notif.type);
            const color = getColor(notif.type);
            return (
              <div 
                key={notif.id}
                className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex gap-4 relative overflow-hidden group active:bg-slate-50 transition-colors"
              >
                <div className={`shrink-0 w-12 h-12 ${color} rounded-xl flex items-center justify-center text-white shadow-lg`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-bold text-sm truncate pr-2">{notif.title}</h3>
                    <span className="text-[10px] text-slate-400 font-medium whitespace-nowrap">
                      {new Date(notif.created_at).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">{notif.message}</p>
                  <button className="mt-3 text-[10px] font-bold text-[#C6A75E] flex items-center gap-1 uppercase tracking-wider">
                    Ver detalhes <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
                <div className="absolute top-0 right-0 w-1 h-full bg-[#C6A75E] opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            );
          })
        )}
      </main>

      <BottomNav />
    </div>
  );
}
