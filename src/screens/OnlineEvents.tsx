import React, { useState, useEffect } from 'react';
import { ChevronLeft, SlidersHorizontal, Award, Loader2, Calendar, Star, Check, ArrowRight, Video } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { eventService } from '../services/eventService';
import { useAuth } from '../hooks/useAuth';

export function OnlineEvents() {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [registrations, setRegistrations] = useState<string[]>([]);

  useEffect(() => {
    async function fetchData() {
      if (authLoading) return;
      if (!user) return;

      try {
        setLoading(true);
        const [eventsData, regsData] = await Promise.all([
          eventService.getEvents(),
          eventService.getMyRegistrations(user.id)
        ]);
        setEvents(eventsData || []);
        setRegistrations(regsData?.map(r => r.event_id) || []);
      } catch (error) {
        console.error('Error fetching events:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [user, authLoading]);

  const handleRegister = async (eventId: string) => {
    try {
      if (!user) return;
      await eventService.registerToEvent(user.id, eventId);
      setRegistrations(prev => [...prev, eventId]);
      alert('Inscrição realizada com sucesso!');
    } catch (error: any) {
      if (error.code === '23505') {
        alert('Você já está inscrito neste evento!');
      } else {
        alert('Erro ao se inscrever: ' + error.message);
      }
    }
  };

  if (loading || authLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-[#C6A75E]" />
      </div>
    );
  }

  return (
    <div className="bg-transparent text-[#0F172A] min-h-screen pb-24 font-sans">
      {/* Main Content */}
      <main className="py-8 lg:py-12">
        <div className="w-full max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Desktop Header */}
          <div className="hidden lg:flex items-center justify-between mb-12">
            <div>
              <h1 className="text-4xl font-black tracking-tight mb-2">Eventos Online</h1>
              <p className="text-slate-500 font-medium">Participe de masterclasses e webinars exclusivos.</p>
            </div>
            <div className="flex gap-4">
              <div className="bg-white px-6 py-4 rounded-[24px] border border-slate-100 shadow-sm flex items-center gap-4">
                <div className="size-12 rounded-full border-4 border-[#C6A75E]/20 flex items-center justify-center relative">
                  <svg className="absolute inset-0 size-full -rotate-90">
                    <circle className="text-[#C6A75E]/20" cx="24" cy="24" fill="transparent" r="20" stroke="currentColor" strokeWidth="4"></circle>
                    <circle className="text-[#C6A75E]" cx="24" cy="24" fill="transparent" r="20" stroke="currentColor" strokeDasharray="125.6" strokeDashoffset="62.8" strokeWidth="4"></circle>
                  </svg>
                  <span className="text-xs font-bold">{registrations.length}/2</span>
                </div>
                <div>
                  <p className="text-sm font-bold leading-tight">Eventos Gratuitos</p>
                  <p className="text-xs text-slate-400">Você usou {registrations.length} de 2 este mês</p>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Progress Card */}
          <div className="lg:hidden bg-slate-50 rounded-[32px] p-6 border border-slate-100 flex items-center gap-4 mb-8">
            <div className="size-14 rounded-full border-4 border-[#C6A75E]/20 flex items-center justify-center relative flex-shrink-0">
              <svg className="absolute inset-0 size-full -rotate-90">
                <circle className="text-[#C6A75E]/20" cx="28" cy="28" fill="transparent" r="24" stroke="currentColor" strokeWidth="4"></circle>
                <circle className="text-[#C6A75E]" cx="28" cy="28" fill="transparent" r="24" stroke="currentColor" strokeDasharray="150.7" strokeDashoffset="75.3" strokeWidth="4"></circle>
              </svg>
              <span className="text-xs font-black">{registrations.length}/2</span>
            </div>
            <div className="flex-1">
              <p className="text-sm font-bold leading-tight text-[#0F172A]">Eventos Gratuitos</p>
              <p className="text-xs text-slate-500 mt-1">Você participou de {registrations.length} de 2 eventos gratuitos este mês.</p>
            </div>
          </div>

          {/* Events Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {events.length === 0 ? (
              <div className="col-span-full py-24 text-center">
                <div className="size-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Calendar className="w-10 h-10 text-slate-200" />
                </div>
                <h3 className="text-xl font-bold text-[#0F172A] mb-2">Nenhum evento disponível</h3>
                <p className="text-slate-400">Tente novamente mais tarde para novos webinars.</p>
              </div>
            ) : (
              events.map((event) => (
                <article 
                  key={event.id} 
                  className="group bg-white rounded-[40px] border border-slate-50 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col"
                >
                  <div className="relative h-48 lg:h-56 overflow-hidden">
                    <img 
                      src={event.image_url || `https://picsum.photos/seed/${event.id}/800/600`} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    {event.is_premium && (
                      <div className="absolute inset-0 bg-[#0F172A]/40 backdrop-blur-[2px] flex items-center justify-center">
                        <div className="bg-[#C6A75E] text-white px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest flex items-center gap-2 shadow-xl">
                          <Star className="w-4 h-4 fill-current" /> Exclusive Member
                        </div>
                      </div>
                    )}
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-1 shadow-sm">
                      <Video className="w-3.5 h-3.5 text-[#C6A75E]" />
                      <span className="text-[10px] font-black text-[#0F172A] uppercase tracking-widest">Online</span>
                    </div>
                  </div>

                  <div className="p-8 flex-1 flex flex-col">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-[10px] font-bold text-[#C6A75E] uppercase tracking-widest px-2 py-1 bg-[#C6A75E]/10 rounded-lg">
                        Webinar
                      </span>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                        {event.date} • {event.time}
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-black text-[#0F172A] mb-3 line-clamp-2 group-hover:text-[#C6A75E] transition-colors">
                      {event.title}
                    </h3>
                    
                    <p className="text-slate-500 text-sm leading-relaxed mb-8 line-clamp-2">
                      {event.description || 'Participe deste encontro exclusivo para membros do Club e acelere seus resultados.'}
                    </p>

                    <div className="mt-auto pt-6 border-t border-slate-50 flex items-center justify-between">
                      {registrations.includes(event.id) ? (
                        <div className="flex items-center gap-2 text-green-600 font-bold text-sm">
                          <Check className="w-5 h-5" /> Inscrito
                        </div>
                      ) : (
                        <button 
                          onClick={() => handleRegister(event.id)}
                          className="w-full h-14 bg-[#0F172A] text-white rounded-2xl font-bold text-sm flex items-center justify-center gap-2 shadow-xl shadow-[#0F172A]/10 active:scale-95 transition-all"
                        >
                          Garantir Vaga <ArrowRight className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                </article>
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
