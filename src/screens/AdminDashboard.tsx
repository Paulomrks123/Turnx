import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ChevronLeft, 
  Check, 
  X, 
  Plus, 
  Calendar, 
  Rocket, 
  Store,
  Loader2,
  AlertCircle,
  ShieldCheck,
  LayoutDashboard,
  Users,
  Settings
} from 'lucide-react';
import { supabase } from '../lib/supabase';

export function AdminDashboard() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [activeTab, setActiveTab] = useState<'events' | 'moderation'>('events');
  
  // Moderation state
  const [pendingOpps, setPendingOpps] = useState<any[]>([]);
  const [pendingServices, setPendingServices] = useState<any[]>([]);
  
  // New Event state
  const [showEventModal, setShowEventModal] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: '',
    description: '',
    event_date: '',
    location: '',
    image_url: '',
    is_exclusive: false
  });

  useEffect(() => {
    async function checkAdminAndFetch() {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          navigate('/auth');
          return;
        }

        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', user.id)
          .single();

        // Check if user is admin or the specific email
        if (profile?.role !== 'admin' && user.email !== 'turnxapp@gmail.com') {
          navigate('/');
          return;
        }

        setIsAdmin(true);
        fetchPendingItems();
      } catch (error) {
        console.error('Error checking admin status:', error);
      } finally {
        setLoading(false);
      }
    }

    checkAdminAndFetch();
  }, [navigate]);

  async function fetchPendingItems() {
    const { data: opps } = await supabase
      .from('opportunities')
      .select('*, profiles(full_name, company)')
      .eq('status', 'pending');
    
    const { data: servs } = await supabase
      .from('services')
      .select('*, profiles(full_name, company)')
      .eq('status', 'pending');

    setPendingOpps(opps || []);
    setPendingServices(servs || []);
  }

  const handleApprove = async (type: 'opp' | 'service', id: string) => {
    const table = type === 'opp' ? 'opportunities' : 'services';
    const { error } = await supabase
      .from(table)
      .update({ status: 'approved' })
      .eq('id', id);

    if (error) alert('Erro ao aprovar: ' + error.message);
    else fetchPendingItems();
  };

  const handleReject = async (type: 'opp' | 'service', id: string) => {
    const table = type === 'opp' ? 'opportunities' : 'services';
    const { error } = await supabase
      .from(table)
      .update({ status: 'rejected' })
      .eq('id', id);

    if (error) alert('Erro ao rejeitar: ' + error.message);
    else fetchPendingItems();
  };

  const handleCreateEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase
        .from('events')
        .insert([{
          title: newEvent.title,
          description: newEvent.description,
          date: newEvent.event_date.split('T')[0],
          time: newEvent.event_date.split('T')[1],
          location: newEvent.location,
          image_url: newEvent.image_url,
          is_premium: newEvent.is_exclusive
        }]);

      if (error) throw error;
      
      setShowEventModal(false);
      setNewEvent({
        title: '',
        description: '',
        event_date: '',
        location: '',
        image_url: '',
        is_exclusive: false
      });
      alert('Evento criado com sucesso!');
    } catch (error: any) {
      alert('Erro ao criar evento: ' + error.message);
    } finally {
      setLoading(false);
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
    <div className="bg-transparent text-[#0F172A] min-h-screen font-sans pb-24">
      {/* Main Content */}
      <main className="py-8 lg:py-12">
        <div className="w-full max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Stats Overview */}
          <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            <div className="bg-white p-6 rounded-[32px] border border-slate-50 shadow-sm">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Pendentes</p>
              <p className="text-3xl font-black text-[#0F172A]">{pendingOpps.length + pendingServices.length}</p>
            </div>
            <div className="bg-white p-6 rounded-[32px] border border-slate-50 shadow-sm">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Eventos</p>
              <p className="text-3xl font-black text-[#0F172A]">--</p>
            </div>
            <div className="bg-white p-6 rounded-[32px] border border-slate-50 shadow-sm">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Membros</p>
              <p className="text-3xl font-black text-[#0F172A]">--</p>
            </div>
            <div className="bg-white p-6 rounded-[32px] border border-slate-50 shadow-sm">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Reports</p>
              <p className="text-3xl font-black text-red-500">0</p>
            </div>
          </section>

          {/* Admin Tabs */}
          <section className="mb-8">
            <div className="flex gap-4 border-b border-slate-100 pb-4">
              <button
                onClick={() => setActiveTab('events')}
                className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${
                  activeTab === 'events' 
                    ? 'bg-[#0F172A] text-white shadow-lg' 
                    : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                Eventos
              </button>
              <button
                onClick={() => setActiveTab('moderation')}
                className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${
                  activeTab === 'moderation' 
                    ? 'bg-[#0F172A] text-white shadow-lg' 
                    : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                Moderação
              </button>
            </div>
          </section>

          {activeTab === 'events' ? (
            <section>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Gerenciar Eventos</h2>
                <button 
                  onClick={() => setShowEventModal(true)}
                  className="bg-[#C6A75E] text-white px-6 py-3 rounded-2xl font-bold text-sm flex items-center gap-2 shadow-lg shadow-[#C6A75E]/20 active:scale-95 transition-all"
                >
                  <Plus className="w-5 h-5" /> Novo Evento
                </button>
              </div>

              <div className="bg-white rounded-[40px] border border-slate-50 shadow-sm p-8 text-center">
                <div className="size-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Calendar className="w-10 h-10 text-slate-200" />
                </div>
                <h3 className="text-lg font-bold mb-2">Lista de Eventos</h3>
                <p className="text-slate-400 text-sm">Os eventos ativos aparecem na página inicial para os membros.</p>
              </div>
            </section>
          ) : (
            <section className="space-y-8">
              {/* Opportunities Moderation */}
              <div>
                <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <Rocket className="w-6 h-6 text-[#C6A75E]" /> Oportunidades Pendentes
                </h2>
                {pendingOpps.length === 0 ? (
                  <div className="bg-slate-50 rounded-[32px] p-12 text-center border border-dashed border-slate-200">
                    <p className="text-slate-400 font-medium">Nenhuma oportunidade aguardando aprovação.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {pendingOpps.map(opp => (
                      <div key={opp.id} className="bg-white p-6 rounded-[32px] border border-slate-50 shadow-sm flex flex-col">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="font-bold text-lg">{opp.title}</h3>
                            <p className="text-xs text-slate-400 font-medium uppercase tracking-widest">{opp.profiles?.full_name} @ {opp.profiles?.company}</p>
                          </div>
                          <span className="px-3 py-1 bg-amber-50 text-amber-600 text-[10px] font-bold rounded-full uppercase tracking-widest">Pendente</span>
                        </div>
                        <p className="text-sm text-slate-500 mb-6 line-clamp-2">{opp.description}</p>
                        <div className="mt-auto flex gap-2">
                          <button 
                            onClick={() => handleApprove('opp', opp.id)}
                            className="flex-1 h-12 bg-green-500 text-white rounded-2xl font-bold text-xs flex items-center justify-center gap-2 active:scale-95 transition-all"
                          >
                            <Check className="w-4 h-4" /> Aprovar
                          </button>
                          <button 
                            onClick={() => handleReject('opp', opp.id)}
                            className="flex-1 h-12 bg-red-50 text-red-500 rounded-2xl font-bold text-xs flex items-center justify-center gap-2 active:scale-95 transition-all"
                          >
                            <X className="w-4 h-4" /> Rejeitar
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Services Moderation */}
              <div>
                <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <Store className="w-6 h-6 text-[#C6A75E]" /> Serviços Pendentes
                </h2>
                {pendingServices.length === 0 ? (
                  <div className="bg-slate-50 rounded-[32px] p-12 text-center border border-dashed border-slate-200">
                    <p className="text-slate-400 font-medium">Nenhum serviço aguardando aprovação.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {pendingServices.map(service => (
                      <div key={service.id} className="bg-white p-6 rounded-[32px] border border-slate-50 shadow-sm flex flex-col">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="font-bold text-lg">{service.title}</h3>
                            <p className="text-xs text-slate-400 font-medium uppercase tracking-widest">{service.profiles?.full_name} @ {service.profiles?.company}</p>
                          </div>
                          <span className="px-3 py-1 bg-amber-50 text-amber-600 text-[10px] font-bold rounded-full uppercase tracking-widest">Pendente</span>
                        </div>
                        <p className="text-sm text-slate-500 mb-6 line-clamp-2">{service.description}</p>
                        <div className="mt-auto flex gap-2">
                          <button 
                            onClick={() => handleApprove('service', service.id)}
                            className="flex-1 h-12 bg-green-500 text-white rounded-2xl font-bold text-xs flex items-center justify-center gap-2 active:scale-95 transition-all"
                          >
                            <Check className="w-4 h-4" /> Aprovar
                          </button>
                          <button 
                            onClick={() => handleReject('service', service.id)}
                            className="flex-1 h-12 bg-red-50 text-red-500 rounded-2xl font-bold text-xs flex items-center justify-center gap-2 active:scale-95 transition-all"
                          >
                            <X className="w-4 h-4" /> Rejeitar
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </section>
          )}
        </div>
      </main>

      {/* Event Modal */}
      {showEventModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <div className="absolute inset-0 bg-[#0F172A]/80 backdrop-blur-sm" onClick={() => setShowEventModal(false)} />
          <div className="relative bg-white w-full max-w-2xl rounded-[48px] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
            <div className="p-8 lg:p-12">
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-2xl font-black tracking-tight">Novo Evento</h3>
                <button onClick={() => setShowEventModal(false)} className="size-10 bg-slate-50 rounded-full flex items-center justify-center text-slate-400">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleCreateEvent} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Título do Evento</label>
                    <input 
                      type="text" 
                      required
                      value={newEvent.title}
                      onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                      className="w-full h-14 px-6 bg-slate-50 border border-slate-100 rounded-2xl font-medium outline-none focus:border-[#C6A75E] transition-all"
                      placeholder="Ex: Networking Dinner"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Data e Hora</label>
                    <input 
                      type="datetime-local" 
                      required
                      value={newEvent.event_date}
                      onChange={(e) => setNewEvent({...newEvent, event_date: e.target.value})}
                      className="w-full h-14 px-6 bg-slate-50 border border-slate-100 rounded-2xl font-medium outline-none focus:border-[#C6A75E] transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Localização</label>
                  <input 
                    type="text" 
                    required
                    value={newEvent.location}
                    onChange={(e) => setNewEvent({...newEvent, location: e.target.value})}
                    className="w-full h-14 px-6 bg-slate-50 border border-slate-100 rounded-2xl font-medium outline-none focus:border-[#C6A75E] transition-all"
                    placeholder="Ex: Hotel Fasano, São Paulo"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">URL da Imagem</label>
                  <input 
                    type="url" 
                    value={newEvent.image_url}
                    onChange={(e) => setNewEvent({...newEvent, image_url: e.target.value})}
                    className="w-full h-14 px-6 bg-slate-50 border border-slate-100 rounded-2xl font-medium outline-none focus:border-[#C6A75E] transition-all"
                    placeholder="https://..."
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Descrição</label>
                  <textarea 
                    required
                    value={newEvent.description}
                    onChange={(e) => setNewEvent({...newEvent, description: e.target.value})}
                    className="w-full h-32 p-6 bg-slate-50 border border-slate-100 rounded-2xl font-medium outline-none focus:border-[#C6A75E] transition-all resize-none"
                    placeholder="Detalhes do evento..."
                  />
                </div>

                <div className="flex items-center gap-3 p-4 bg-amber-50 rounded-2xl border border-amber-100">
                  <input 
                    type="checkbox" 
                    id="exclusive"
                    checked={newEvent.is_exclusive}
                    onChange={(e) => setNewEvent({...newEvent, is_exclusive: e.target.checked})}
                    className="size-5 accent-[#C6A75E]"
                  />
                  <label htmlFor="exclusive" className="text-sm font-bold text-amber-900">Evento Exclusivo (Premium Only)</label>
                </div>

                <button 
                  type="submit"
                  disabled={loading}
                  className="w-full h-16 bg-[#0F172A] text-white rounded-2xl font-bold text-lg shadow-xl shadow-[#0F172A]/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                >
                  {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : 'Publicar Evento'}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
