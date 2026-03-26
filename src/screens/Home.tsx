import React, { useState, useEffect } from 'react';
import { 
  Bell, Video, Calendar, Store, BookOpen, SlidersHorizontal, 
  Star, ArrowRight, Rocket, Bookmark, X, Check, Users, User,
  MapPin, Clock, MessageSquare, Send, ChevronRight, Loader2
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { BottomNav } from '../components/BottomNav';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from '../hooks/useAuth';
import { profileService } from '../services/profileService';
import { eventService } from '../services/eventService';
import { opportunityService } from '../services/opportunityService';

import { connectionService } from '../services/connectionService';

export function Home() {
  const navigate = useNavigate();
  const { user, profile, loading: authLoading } = useAuth();
  const [showFilters, setShowFilters] = useState(false);
  const [activeFilters, setActiveFilters] = useState<string[]>(['eventos', 'oportunidades', 'sugestoes']);
  const [showNotificationPopup, setShowNotificationPopup] = useState(false);
  const [showOpportunityModal, setShowOpportunityModal] = useState(false);
  const [newOpportunity, setNewOpportunity] = useState({
    title: '',
    description: '',
    type: 'negócio'
  });
  const [hasNewNotifications, setHasNewNotifications] = useState(true);
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState<any[]>([]);
  const [opportunities, setOpportunities] = useState<any[]>([]);
  const [suggestedMembers, setSuggestedMembers] = useState<any[]>([]);
  
  // Modals state
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [selectedMember, setSelectedMember] = useState<any>(null);
  const [selectedOpenEvent, setSelectedOpenEvent] = useState<any>(null);
  const [connectionMessage, setConnectionMessage] = useState('');

  const [userRank, setUserRank] = useState<number>(0);

  useEffect(() => {
    async function fetchData() {
      if (!user) return;
      
      try {
        setLoading(true);
        
        // Fetch Ranking to find position
        const ranking = await profileService.getRanking();
        if (ranking) {
          const rankIndex = ranking.findIndex(p => p.id === user.id);
          setUserRank(rankIndex !== -1 ? rankIndex + 1 : 0);
        }

        // Fetch Events
        const eventsData = await eventService.getEvents();
        setEvents(eventsData || []);

        // Fetch Opportunities
        const oppsData = await opportunityService.getOpportunities();
        setOpportunities(oppsData || []);

        // Fetch Suggested Members
        const membersData = await profileService.getSuggestedMembers(user.id);
        setSuggestedMembers(membersData || []);

      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    }

    if (!authLoading) {
      fetchData();
    }
  }, [user, authLoading]);

  const handleBellClick = () => {
    const configured = localStorage.getItem('notificationsConfigured');
    if (!configured) {
      navigate('/notification-settings');
    } else {
      setShowNotificationPopup(true);
      setHasNewNotifications(false);
    }
  };

  const toggleFilter = (filter: string) => {
    setActiveFilters(prev => 
      prev.includes(filter) ? prev.filter(f => f !== filter) : [...prev, filter]
    );
  };

  const handleReserveEvent = async (eventId: string) => {
    try {
      if (!user) return;
      await eventService.registerToEvent(user.id, eventId);
      alert('Vaga reservada com sucesso!');
      setSelectedEvent(null);
      setSelectedOpenEvent(null);
    } catch (error: any) {
      if (error.code === '23505') {
        alert('Você já reservou sua vaga para este evento!');
      } else {
        alert('Erro ao reservar vaga: ' + error.message);
      }
    }
  };

  const handleSendConnection = async () => {
    try {
      if (!user || !selectedMember) return;
      
      await connectionService.sendRequest({
        requester_id: user.id,
        receiver_id: selectedMember.id,
        status: 'pending',
        message: connectionMessage
      });

      alert('Solicitação de conexão enviada!');
      setSelectedMember(null);
      setConnectionMessage('');
    } catch (error: any) {
      if (error.code === '23505') {
        alert('Você já enviou uma solicitação para este membro!');
      } else {
        alert('Erro ao conectar: ' + error.message);
      }
    }
  };

  const handleCreateOpportunity = async () => {
    try {
      if (!user) return;

      if (!newOpportunity.title || !newOpportunity.description) {
        alert('Preencha todos os campos');
        return;
      }

      await opportunityService.createOpportunity({
        user_id: user.id,
        title: newOpportunity.title,
        description: newOpportunity.description,
        type: newOpportunity.type as any
      });

      alert('Oportunidade enviada para aprovação!');
      setShowOpportunityModal(false);
      setNewOpportunity({ title: '', description: '', type: 'negócio' });
    } catch (error: any) {
      alert('Erro ao criar oportunidade: ' + error.message);
    }
  };

  // Combine and filter items for the feed
  const feedItems = [
    ...events.map(e => {
      const eventDateTime = new Date(`${e.date}T${e.time}`);
      return { 
        ...e, 
        type: 'eventos', 
        category: `Masterclass • ${eventDateTime.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })}`,
        image: e.image_url || 'https://picsum.photos/seed/event/800/400',
        desc: e.description,
        exclusive: e.is_premium,
        action: 'Reservar Vaga',
        confirmedMembers: [
          'https://picsum.photos/seed/1/40/40',
          'https://picsum.photos/seed/2/40/40',
          'https://picsum.photos/seed/3/40/40',
          'https://picsum.photos/seed/4/40/40'
        ]
      };
    }),
    ...opportunities.map(o => ({ 
      ...o, 
      type: 'oportunidades', 
      category: 'Oportunidade', 
      desc: o.description,
      time: 'Recente',
      interested: o.interested_count || 0,
      action: 'Saiba mais'
    })),
    ...suggestedMembers.map(m => ({ 
      ...m, 
      type: 'sugestoes', 
      category: 'Novo Membro', 
      title: m.full_name, 
      desc: `${m.role} na ${m.company}`,
      image: m.avatar_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(m.full_name)}&background=random`,
      action: 'Conectar'
    }))
  ].sort((a, b) => new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime());

  const filteredItems = feedItems.filter(item => activeFilters.includes(item.type));

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-[#C6A75E]" />
      </div>
    );
  }

  return (
    <div className="bg-[#F8FAFC] text-[#0F172A] antialiased min-h-screen pb-24 font-sans">
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-100 transition-colors safe-top">
        <div className="max-w-screen-xl mx-auto px-5 pt-6 pb-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
          <div className="relative">
            <div 
              className="bg-center bg-no-repeat bg-cover rounded-full size-11 border-2 border-[#C6A75E]/20 flex items-center justify-center bg-slate-100" 
            >
              <User className="w-6 h-6 text-slate-300" />
            </div>
            <span className="absolute bottom-0.5 right-0.5 size-3 bg-green-500 border-2 border-white rounded-full"></span>
          </div>
          <div className="flex flex-col">
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Membro Premium</p>
            <h2 className="text-[#0F172A] text-lg font-bold leading-tight">Olá,</h2>
            <h2 className="text-[#0F172A] text-lg font-bold leading-tight truncate max-w-[12rem]">
              {profile?.full_name || 'Membro'}
            </h2>
          </div>
        </div>
        <button 
          onClick={handleBellClick}
          className="relative flex items-center justify-center rounded-full size-11 bg-slate-50 text-[#0F172A] hover:bg-slate-100 transition-colors"
        >
          <Bell className="w-6 h-6" />
          {hasNewNotifications && (
            <span className="absolute top-2.5 right-2.5 size-2 bg-red-500 rounded-full"></span>
          )}
        </button>
        </div>
      </header>

      <main className="max-w-screen-xl mx-auto flex flex-col gap-6 px-5 pt-6">
        {/* Ranking Summary Card */}
        <section 
          onClick={() => navigate('/ranking')}
          className="bg-white rounded-3xl p-4 shadow-[0_4px_20px_-2px_rgba(15,23,42,0.05)] border border-slate-50 flex items-center justify-between cursor-pointer active:scale-[0.98] transition-all max-w-md"
        >
          <div className="flex items-center gap-4">
            <div className="size-12 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-500">
              <Star className="w-6 h-6 fill-current" />
            </div>
            <div>
              <p className="text-sm font-bold text-[#0F172A]">
                Sua posição: <span className="text-[#C6A75E]">#{userRank || '--'}</span>
              </p>
              <p className="text-[11px] text-slate-400">Ranking Global do Club</p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-slate-300" />
        </section>

        <section>
          <h3 className="text-[#0F172A] text-xs font-bold uppercase tracking-widest mb-4 opacity-60">Acesso Rápido</h3>
          <div className="flex flex-wrap items-start gap-4 sm:gap-6">
            <button onClick={() => navigate('/online-events')} className="flex flex-col items-center gap-2">
              <div className="size-14 rounded-2xl bg-white shadow-[0_4px_20px_-2px_rgba(15,23,42,0.05)] flex items-center justify-center text-[#C6A75E]">
                <Video className="w-7 h-7" />
              </div>
              <span className="text-[10px] font-bold text-[#0F172A] text-center leading-tight">Encontros Online</span>
            </button>
            <button onClick={() => navigate('/agenda')} className="flex flex-col items-center gap-2">
              <div className="size-14 rounded-2xl bg-white shadow-[0_4px_20_rgba(15,23,42,0.05)] flex items-center justify-center text-[#C6A75E]">
                <Calendar className="w-7 h-7" />
              </div>
              <span className="text-[10px] font-bold text-[#0F172A] text-center leading-tight">Agenda 1:1</span>
            </button>
            <button onClick={() => navigate('/marketplace')} className="flex flex-col items-center gap-2">
              <div className="size-14 rounded-2xl bg-white shadow-[0_4px_20px_-2px_rgba(15,23,42,0.05)] flex items-center justify-center text-[#C6A75E]">
                <Store className="w-7 h-7" />
              </div>
              <span className="text-[10px] font-bold text-[#0F172A] text-center leading-tight">Marketplace</span>
            </button>
            <button onClick={() => navigate('/content-library')} className="flex flex-col items-center gap-2">
              <div className="size-14 rounded-2xl bg-white shadow-[0_4px_20px_-2px_rgba(15,23,42,0.05)] flex items-center justify-center text-[#C6A75E]">
                <BookOpen className="w-7 h-7" />
              </div>
              <span className="text-[10px] font-bold text-[#0F172A] text-center leading-tight">Conteúdo</span>
            </button>
          </div>
        </section>

        <section className="flex flex-col gap-5">
          <div className="flex items-center justify-between">
            <h3 className="text-[#0F172A] text-xs font-bold uppercase tracking-widest opacity-60">Feed do Club</h3>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setShowOpportunityModal(true)}
                className="text-white text-xs font-bold flex items-center gap-1 bg-[#C6A75E] px-3 py-1.5 rounded-full shadow-lg shadow-[#C6A75E]/20"
              >
                <Rocket className="w-3.5 h-3.5" /> Postar
              </button>
              <button 
                onClick={() => setShowFilters(true)}
                className="text-[#C6A75E] text-xs font-bold flex items-center gap-1 bg-white px-3 py-1.5 rounded-full border border-slate-100 shadow-sm"
              >
                Filtros <SlidersHorizontal className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <React.Fragment key={item.id}>
                {item.type === 'eventos' && (
                  <article className="flex flex-col rounded-3xl bg-white shadow-[0_4px_20px_-2px_rgba(15,23,42,0.05)] overflow-hidden border border-slate-50">
                    <div 
                      className="relative h-44 w-full bg-cover bg-center" 
                      style={{ backgroundImage: `url('${item.image}')` }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/80 via-transparent to-transparent"></div>
                      {item.exclusive && (
                        <div className="absolute top-4 left-4">
                          <span className="inline-flex items-center gap-1 bg-[#C6A75E] px-3 py-1 rounded-full shadow-lg">
                            <Star className="text-white w-3 h-3 fill-current" />
                            <span className="text-white text-[10px] font-bold tracking-wider uppercase">Exclusivo Plus</span>
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="p-5 flex flex-col gap-3">
                      <p className="text-[#C6A75E] text-[10px] font-bold uppercase tracking-widest">{item.category}</p>
                      <h4 className="text-[#0F172A] text-lg font-bold leading-tight">{item.title}</h4>
                      <p className="text-slate-500 text-sm line-clamp-2">{item.desc}</p>
                      <button 
                        onClick={() => item.action === 'Reservar Vaga' ? setSelectedEvent(item) : setSelectedOpenEvent(item)}
                        className="mt-2 w-full h-11 rounded-xl bg-[#0F172A] text-white font-bold text-sm flex items-center justify-center gap-2"
                      >
                        {item.action} <ArrowRight className="w-4.5 h-4.5" />
                      </button>
                    </div>
                  </article>
                )}

                {item.type === 'oportunidades' && (
                  <article className="rounded-3xl bg-white shadow-[0_4px_20px_-2px_rgba(15,23,42,0.05)] p-5 border-l-4 border-[#C6A75E]">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <span className="flex items-center justify-center size-8 rounded-lg bg-[#C6A75E]/10 text-[#C6A75E]">
                          <Rocket className="w-5 h-5" />
                        </span>
                        <span className="text-[10px] font-bold text-[#C6A75E] uppercase tracking-widest">{item.category}</span>
                      </div>
                      <span className="text-[10px] text-slate-400 font-medium">{item.time}</span>
                    </div>
                    <h4 className="text-[#0F172A] text-lg font-bold mb-2">{item.title}</h4>
                    <p className="text-slate-500 text-sm mb-4">{item.desc}</p>
                    <div className="flex items-center gap-3 pt-4 border-t border-slate-50">
                      <div className="flex -space-x-2">
                        <div className="size-6 rounded-full border-2 border-white bg-slate-200"></div>
                        <div className="size-6 rounded-full border-2 border-white bg-slate-300"></div>
                      </div>
                      <span className="text-[10px] text-slate-400 font-medium">{item.interested} membros interessados</span>
                      <button 
                        onClick={() => navigate('/opportunity-details')}
                        className="ml-auto text-[#C6A75E] text-xs font-bold"
                      >
                        Saiba mais
                      </button>
                    </div>
                  </article>
                )}

                {item.type === 'sugestoes' && (
                  <article className="rounded-2xl bg-white shadow-[0_4px_20px_-2px_rgba(15,23,42,0.05)] p-4 border border-slate-50 flex items-center gap-4">
                    <div className="size-14 rounded-full bg-cover shrink-0 border-2 border-slate-100" style={{ backgroundImage: `url('${item.image}')` }}></div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <h4 className="text-[#0F172A] text-sm font-bold truncate">{item.title}</h4>
                        <span className="text-[9px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded-md font-bold uppercase tracking-tighter">{item.category}</span>
                      </div>
                      <p className="text-slate-500 text-xs truncate">{item.desc}</p>
                    </div>
                    <button 
                      onClick={() => setSelectedMember(item)}
                      className="h-9 px-4 rounded-lg bg-[#C6A75E]/10 text-[#C6A75E] text-xs font-bold hover:bg-[#C6A75E]/20 transition-colors"
                    >
                      Conectar
                    </button>
                  </article>
                )}
              </React.Fragment>
            ))}
          </div>
        </section>
      </main>

      {/* Notification Pop-up */}
      <AnimatePresence>
        {showNotificationPopup && (
          <div className="fixed inset-0 z-[100] flex items-start justify-end p-4 pointer-events-none">
            <motion.div 
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              className="w-full bg-white rounded-3xl shadow-2xl border border-slate-100 pointer-events-auto overflow-hidden mt-16"
            >
              <div className="p-5 border-b border-slate-50 flex items-center justify-between">
                <h3 className="font-bold text-sm">Notificações Recentes</h3>
                <button onClick={() => setShowNotificationPopup(false)} className="p-1">
                  <X className="w-4 h-4 text-slate-400" />
                </button>
              </div>
              <div className="max-h-[60vh] overflow-y-auto p-2">
                {[
                  { id: 1, title: 'Nova Oportunidade', desc: 'Fintech Seed acaba de abrir rodada.', time: 'há 5 min', icon: Rocket, color: 'text-emerald-500' },
                  { id: 2, title: 'Evento Confirmado', desc: 'Sua vaga na Masterclass foi reservada.', time: 'há 1h', icon: Calendar, color: 'text-[#C6A75E]' },
                ].map((n) => (
                  <div key={n.id} className="p-3 hover:bg-slate-50 rounded-2xl transition-colors flex gap-3">
                    <div className={`w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center ${n.color}`}>
                      <n.icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <h4 className="text-xs font-bold">{n.title}</h4>
                        <span className="text-[9px] text-slate-400">{n.time}</span>
                      </div>
                      <p className="text-[11px] text-slate-500 line-clamp-1">{n.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button 
                onClick={() => { setShowNotificationPopup(false); navigate('/notifications'); }}
                className="w-full p-4 text-center text-xs font-bold text-[#C6A75E] bg-slate-50 hover:bg-slate-100 transition-colors"
              >
                Ver todas as notificações
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Filters Modal */}
      <AnimatePresence>
        {showFilters && (
          <div className="fixed inset-0 z-[100] flex items-end justify-center">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowFilters(false)}
              className="absolute inset-0 bg-[#0F172A]/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              className="relative w-full bg-white rounded-t-[40px] p-8 shadow-2xl"
            >
              <div className="w-12 h-1.5 bg-slate-200 rounded-full mx-auto mb-8" />
              <h3 className="text-xl font-bold mb-6">O que você quer ver?</h3>
              <div className="space-y-4">
                {[
                  { id: 'eventos', label: 'Apenas Eventos', icon: Calendar },
                  { id: 'oportunidades', label: 'Apenas Oportunidades', icon: Rocket },
                  { id: 'sugestoes', label: 'Sugestões de Conexão', icon: Users },
                ].map((f) => (
                  <button
                    key={f.id}
                    onClick={() => toggleFilter(f.id)}
                    className={`w-full p-5 rounded-2xl border-2 flex items-center justify-between transition-all ${
                      activeFilters.includes(f.id) 
                        ? 'border-[#C6A75E] bg-[#C6A75E]/5' 
                        : 'border-slate-100 bg-white'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                        activeFilters.includes(f.id) ? 'bg-[#C6A75E] text-white' : 'bg-slate-100 text-slate-400'
                      }`}>
                        <f.icon className="w-5 h-5" />
                      </div>
                      <span className={`font-bold ${activeFilters.includes(f.id) ? 'text-[#0F172A]' : 'text-slate-400'}`}>
                        {f.label}
                      </span>
                    </div>
                    {activeFilters.includes(f.id) && <Check className="w-5 h-5 text-[#C6A75E]" />}
                  </button>
                ))}
              </div>
              <button 
                onClick={() => setShowFilters(false)}
                className="w-full h-14 bg-[#0F172A] text-white rounded-2xl font-bold mt-8 shadow-lg"
              >
                Aplicar Filtros
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Event Reservation Modal */}
      <AnimatePresence>
        {selectedEvent && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setSelectedEvent(null)}
              className="absolute inset-0 bg-[#0F172A]/60 backdrop-blur-md"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-md bg-white rounded-[32px] overflow-hidden shadow-2xl"
            >
              <div className="h-40 bg-cover bg-center" style={{ backgroundImage: `url('${selectedEvent.image}')` }} />
              <div className="p-8">
                <p className="text-[#C6A75E] text-[10px] font-bold uppercase tracking-widest mb-2">{selectedEvent.category}</p>
                <h3 className="text-xl font-bold mb-4">{selectedEvent.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed mb-8">
                  {selectedEvent.desc || 'Este evento é exclusivo para membros Plus. Durante a sessão, abordaremos estratégias avançadas de governança e preparação para liquidez.'}
                </p>
                <div className="flex gap-3">
                  <button 
                    onClick={() => setSelectedEvent(null)}
                    className="flex-1 h-12 rounded-xl border border-slate-200 text-slate-600 font-bold text-sm"
                  >
                    Cancelar
                  </button>
                  <button 
                    onClick={() => handleReserveEvent(selectedEvent.id)}
                    className="flex-1 h-12 rounded-xl bg-[#C6A75E] text-white font-bold text-sm shadow-lg shadow-[#C6A75E]/20"
                  >
                    Confirmar Solicitação
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Connection Request Modal */}
      <AnimatePresence>
        {selectedMember && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setSelectedMember(null)}
              className="absolute inset-0 bg-[#0F172A]/60 backdrop-blur-md"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-md bg-white rounded-[32px] p-8 shadow-2xl"
            >
              <div className="flex items-center gap-4 mb-6">
                <img src={selectedMember.image} className="w-16 h-16 rounded-2xl object-cover" alt="" />
                <div>
                  <h3 className="font-bold text-lg">{selectedMember.title}</h3>
                  <p className="text-xs text-slate-500">{selectedMember.desc}</p>
                </div>
              </div>
              <div className="bg-slate-50 rounded-2xl p-4 mb-6">
                <label className="text-[10px] font-bold text-slate-400 uppercase mb-2 block">Mensagem de Conexão</label>
                <textarea 
                  value={connectionMessage}
                  onChange={(e) => setConnectionMessage(e.target.value)}
                  placeholder="Olá, gostaria de me conectar para conversarmos sobre..."
                  className="w-full bg-transparent border-none focus:ring-0 text-sm h-24 resize-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <button 
                  onClick={() => setSelectedMember(null)}
                  className="h-12 rounded-xl border border-slate-200 text-slate-600 font-bold text-sm"
                >
                  Cancelar
                </button>
                <button 
                  onClick={handleSendConnection}
                  className="h-12 rounded-xl bg-[#C6A75E] text-white font-bold text-sm shadow-lg"
                >
                  Enviar Convite
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Open Event Confirmation Modal */}
      <AnimatePresence>
        {selectedOpenEvent && (
          <div className="fixed inset-0 z-[110] flex items-end justify-center">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setSelectedOpenEvent(null)}
              className="absolute inset-0 bg-[#0F172A]/60 backdrop-blur-md"
            />
            <motion.div 
              initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
              className="relative w-full bg-white rounded-t-[40px] p-8 shadow-2xl max-h-[90vh] overflow-y-auto"
            >
              <div className="w-12 h-1.5 bg-slate-200 rounded-full mx-auto mb-8" />
              <div className="flex flex-col gap-6">
                <div>
                  <p className="text-[#C6A75E] text-[10px] font-bold uppercase tracking-widest mb-2">{selectedOpenEvent.category}</p>
                  <h3 className="text-2xl font-bold">{selectedOpenEvent.title}</h3>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-2xl">
                    <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-[#C6A75E] shadow-sm">
                      <Calendar className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase">Data</p>
                      <p className="text-sm font-bold">
                        {new Date(`${selectedOpenEvent.date}T${selectedOpenEvent.time}`).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-2xl">
                    <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-[#C6A75E] shadow-sm">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase">Horário</p>
                      <p className="text-sm font-bold">
                        {selectedOpenEvent.time.substring(0, 5)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-2xl">
                    <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-[#C6A75E] shadow-sm">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase">Localização</p>
                      <p className="text-sm font-bold">{selectedOpenEvent.location}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-bold mb-3">Membros Confirmados</h4>
                  <div className="flex items-center gap-2">
                    <div className="flex -space-x-3">
                      {selectedOpenEvent.confirmedMembers.map((m: string, i: number) => (
                        <img key={i} src={m} className="w-10 h-10 rounded-full border-2 border-white object-cover" alt="" />
                      ))}
                    </div>
                    <span className="text-xs text-slate-400 font-medium ml-2">+24 membros confirmados</span>
                  </div>
                </div>

                <div className="flex gap-3 mt-4">
                  <button 
                    onClick={() => setSelectedOpenEvent(null)}
                    className="flex-1 h-14 rounded-2xl border border-slate-200 text-slate-600 font-bold"
                  >
                    Voltar
                  </button>
                  <button 
                    onClick={() => handleReserveEvent(selectedOpenEvent.id)}
                    className="flex-[2] h-14 rounded-2xl bg-[#C6A75E] text-white font-bold shadow-lg shadow-[#C6A75E]/20"
                  >
                    Eu estarei presente
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Opportunity Modal */}
      <AnimatePresence>
        {showOpportunityModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-[#0F172A]/60 backdrop-blur-md">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white w-full max-w-md rounded-[32px] p-8 shadow-2xl"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold">Nova Oportunidade</h3>
                <button onClick={() => setShowOpportunityModal(false)}><X className="w-6 h-6 text-slate-400" /></button>
              </div>

              <div className="space-y-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">Título</label>
                  <input 
                    type="text" 
                    value={newOpportunity.title}
                    onChange={e => setNewOpportunity({...newOpportunity, title: e.target.value})}
                    placeholder="Ex: Procuro sócio para Tech"
                    className="w-full h-12 px-4 bg-slate-50 border border-slate-100 rounded-xl text-sm"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">Descrição</label>
                  <textarea 
                    rows={4}
                    value={newOpportunity.description}
                    onChange={e => setNewOpportunity({...newOpportunity, description: e.target.value})}
                    placeholder="Descreva sua oportunidade..."
                    className="w-full p-4 bg-slate-50 border border-slate-100 rounded-xl text-sm resize-none"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">Tipo</label>
                  <select 
                    value={newOpportunity.type}
                    onChange={e => setNewOpportunity({...newOpportunity, type: e.target.value})}
                    className="w-full h-12 px-4 bg-slate-50 border border-slate-100 rounded-xl text-sm appearance-none"
                  >
                    <option value="negócio">Negócio</option>
                    <option value="parceria">Parceria</option>
                    <option value="investimento">Investimento</option>
                    <option value="venda">Venda</option>
                  </select>
                </div>

                <button 
                  onClick={handleCreateOpportunity}
                  className="w-full h-14 bg-[#0F172A] text-white font-bold rounded-2xl mt-4 shadow-xl active:scale-[0.98] transition-all"
                >
                  Enviar para Aprovação
                </button>
                <p className="text-[10px] text-center text-slate-400 mt-2">
                  Sua postagem passará por uma curadoria antes de ser exibida no feed.
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

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



