import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  SlidersHorizontal, 
  Star, 
  Lock, 
  Verified, 
  Coffee, 
  UserPlus, 
  MapPin, 
  Map as MapIcon,
  LocateFixed as MyLocation,
  Layers,
  Compass as Explore,
  ChevronLeft,
  MoreVertical,
  Check,
  X,
  Navigation,
  Loader2,
  Calendar,
  MessageSquare,
  Send,
  Search as SearchIcon
} from 'lucide-react';
import { BottomNav } from '../components/BottomNav';
import { profileService } from '../services/profileService';
import { connectionService } from '../services/connectionService';
import { useAuth } from '../hooks/useAuth';
import { motion, AnimatePresence } from 'motion/react';

type Tab = 'sugestões' | 'prioritários' | 'solicitações' | 'próximos';

export function Matchmaking() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<Tab>('sugestões');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'sugestões':
        return <SuggestionsTab onTabChange={setActiveTab} />;
      case 'prioritários':
        return <PriorityTab />;
      case 'solicitações':
        return <RequestsTab />;
      case 'próximos':
        return <NearbyTab />;
      default:
        return <SuggestionsTab onTabChange={setActiveTab} />;
    }
  };

  return (
    <div className="bg-[#f8f7f6] text-[#111318] min-h-screen font-sans flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-100">
        <div className="max-w-screen-xl mx-auto">
          <div className="flex items-center px-4 py-3 justify-between">
            <div className="w-10">
              <button onClick={() => navigate(-1)} className="p-2 -ml-2">
                <ChevronLeft className="w-6 h-6" />
              </button>
            </div>
            <h1 className="text-lg font-bold tracking-tight">Matchmaking</h1>
            <div className="w-10 flex justify-end">
              <button className="p-2 -mr-2">
                <SlidersHorizontal className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex px-4 gap-6 overflow-x-auto no-scrollbar">
            {(['sugestões', 'prioritários', 'solicitações', 'próximos'] as Tab[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-3 text-sm font-bold whitespace-nowrap transition-all border-b-2 ${
                  activeTab === tab 
                    ? 'text-[#c59f47] border-[#c59f47]' 
                    : 'text-gray-400 border-transparent'
                } capitalize`}
              >
                {tab === 'próximos' ? (
                  <div className="flex items-center gap-1">
                    <Navigation className="w-4 h-4" />
                    <span>Próximos</span>
                  </div>
                ) : tab}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 pb-24 max-w-screen-xl mx-auto w-full">
        {renderTabContent()}
      </main>

      <BottomNav />
      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .map-mesh {
          background-color: #f3f4f6;
          background-image: radial-gradient(#d1d5db 1px, transparent 1px);
          background-size: 20px 20px;
        }
      `}</style>
    </div>
  );
}

function SuggestionsTab({ onTabChange }: { onTabChange: (tab: Tab) => void }) {
  const { user, loading: authLoading } = useAuth();
  const [loading, setLoading] = useState(true);
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [showCoffeeModal, setShowCoffeeModal] = useState(false);
  const [showConnectModal, setShowConnectModal] = useState(false);
  const [showMapPopup, setShowMapPopup] = useState(false);
  const [citySearch, setCitySearch] = useState('');
  
  const [coffeeData, setCoffeeData] = useState({
    date: '',
    place: '',
    message: ''
  });
  const [connectMessage, setConnectMessage] = useState('');

  useEffect(() => {
    async function fetchSuggestions() {
      if (authLoading) return;
      if (!user) return;

      try {
        setLoading(true);
        const profiles = await profileService.getSuggestedMembers(user.id);
        setSuggestions(profiles || []);
      } catch (error) {
        console.error('Error fetching suggestions:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchSuggestions();
  }, [user, authLoading]);

  const handleCoffeeRequest = async () => {
    if (!selectedUser || !user) return;
    try {
      await connectionService.sendRequest({
        requester_id: user.id,
        receiver_id: selectedUser.id,
        type: 'coffee',
        status: 'pending',
        message: coffeeData.message,
        meeting_date: coffeeData.date,
        meeting_place: coffeeData.place
      });

      alert('Solicitação de café enviada!');
      setShowCoffeeModal(false);
      setCoffeeData({ date: '', place: '', message: '' });
    } catch (error: any) {
      alert('Erro ao solicitar café: ' + error.message);
    }
  };

  const handleConnectRequest = async () => {
    if (!selectedUser || !user) return;
    try {
      await connectionService.sendRequest({
        requester_id: user.id,
        receiver_id: selectedUser.id,
        type: 'connect',
        status: 'pending',
        message: connectMessage
      });

      alert('Solicitação de conexão enviada!');
      setShowConnectModal(false);
      setConnectMessage('');
    } catch (error: any) {
      alert('Erro ao conectar: ' + error.message);
    }
  };

  if (loading || authLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-[#c59f47]" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 p-4">
      {/* Map Preview Card */}
      <div className="relative w-full h-32 rounded-xl overflow-hidden map-mesh border border-gray-200 shadow-sm flex flex-col justify-end p-3">
        <div className="absolute inset-0 opacity-50">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-[#c59f47] rounded-full border-2 border-white shadow-lg animate-pulse"></div>
          <div className="absolute top-1/4 right-1/3 w-6 h-6 bg-[#D4AF37]/40 rounded-full border border-[#D4AF37]/60 flex items-center justify-center text-[10px] font-bold text-gray-800">12</div>
          <div className="absolute bottom-1/4 left-1/4 w-8 h-8 bg-[#D4AF37]/40 rounded-full border border-[#D4AF37]/60 flex items-center justify-center text-[10px] font-bold text-gray-800">24</div>
        </div>
        <div className="relative z-10 flex flex-col items-start gap-1">
          <div className="flex items-center gap-1.5 px-2 py-1 bg-white/90 rounded-md backdrop-blur shadow-sm">
            <MapPin className="text-[#c59f47] w-3.5 h-3.5" />
            <span className="text-[10px] font-bold text-[#111318] uppercase tracking-wider">Perto de você</span>
          </div>
          <button 
            onClick={() => setShowMapPopup(true)}
            className="w-full h-10 bg-[#c59f47] text-white rounded-lg flex items-center justify-center gap-2 text-sm font-bold shadow-lg shadow-[#c59f47]/20"
          >
            <MapIcon className="w-5 h-5" />
            <span>Ver no Mapa Completo</span>
          </button>
        </div>
      </div>

      {/* Map Pop-up Modal */}
      <AnimatePresence>
        {showMapPopup && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white w-full rounded-2xl overflow-hidden shadow-2xl"
            >
              <div className="p-6 space-y-4 max-w-md mx-auto w-full">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-bold text-[#111318]">Explorar Mapa</h3>
                  <button onClick={() => setShowMapPopup(false)} className="p-1">
                    <X className="w-6 h-6 text-gray-400" />
                  </button>
                </div>
                
                <p className="text-sm text-gray-600">
                  Para ver quem está perto de você, por favor informe sua cidade ou ative sua localização.
                </p>

                <div className="relative">
                  <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input 
                    type="text"
                    placeholder="Pesquisar por cidade..."
                    className="w-full h-12 pl-10 pr-4 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:ring-2 focus:ring-[#c59f47] outline-none"
                    value={citySearch}
                    onChange={(e) => setCitySearch(e.target.value)}
                  />
                </div>

                <div className="flex flex-col gap-3">
                  <button 
                    onClick={() => {
                      setShowMapPopup(false);
                      onTabChange('próximos');
                    }}
                    className="w-full h-12 bg-[#c59f47] text-white rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg"
                  >
                    <MyLocation className="w-5 h-5" />
                    Usar Minha Localização
                  </button>
                  <button 
                    onClick={() => {
                      if (citySearch) {
                        setShowMapPopup(false);
                        onTabChange('próximos');
                      }
                    }}
                    className="w-full h-12 bg-gray-100 text-[#111318] rounded-xl font-bold flex items-center justify-center gap-2"
                  >
                    <SearchIcon className="w-5 h-5" />
                    Buscar na Cidade
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Coffee Modal */}
      <AnimatePresence>
        {showCoffeeModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              className="bg-white w-full rounded-2xl overflow-hidden shadow-2xl"
            >
              <div className="p-6 space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-bold text-[#111318]">Marcar Café</h3>
                  <button onClick={() => setShowCoffeeModal(false)} className="p-1">
                    <X className="w-6 h-6 text-gray-400" />
                  </button>
                </div>
                
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                  <img src={selectedUser?.avatar_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(selectedUser?.full_name)}&background=random`} className="w-10 h-10 rounded-full" />
                  <div>
                    <p className="text-sm font-bold">{selectedUser?.full_name}</p>
                    <p className="text-xs text-gray-500">{selectedUser?.company}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input 
                      type="datetime-local"
                      className="w-full h-12 pl-10 pr-4 bg-gray-50 border border-gray-100 rounded-xl text-sm outline-none"
                      value={coffeeData.date}
                      onChange={(e) => setCoffeeData({...coffeeData, date: e.target.value})}
                    />
                  </div>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input 
                      type="text"
                      placeholder="Local sugerido..."
                      className="w-full h-12 pl-10 pr-4 bg-gray-50 border border-gray-100 rounded-xl text-sm outline-none"
                      value={coffeeData.place}
                      onChange={(e) => setCoffeeData({...coffeeData, place: e.target.value})}
                    />
                  </div>
                  <textarea 
                    placeholder="Escreva uma mensagem..."
                    rows={3}
                    className="w-full p-4 bg-gray-50 border border-gray-100 rounded-xl text-sm outline-none resize-none"
                    value={coffeeData.message}
                    onChange={(e) => setCoffeeData({...coffeeData, message: e.target.value})}
                  />
                </div>

                <button 
                  onClick={handleCoffeeRequest}
                  className="w-full h-12 bg-[#c59f47] text-white rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg"
                >
                  <Send className="w-5 h-5" />
                  Enviar Convite
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Connect Modal */}
      <AnimatePresence>
        {showConnectModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              className="bg-white w-full rounded-2xl overflow-hidden shadow-2xl"
            >
              <div className="p-6 space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-bold text-[#111318]">Solicitar Conexão</h3>
                  <button onClick={() => setShowConnectModal(false)} className="p-1">
                    <X className="w-6 h-6 text-gray-400" />
                  </button>
                </div>
                
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                  <img src={selectedUser?.avatar_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(selectedUser?.full_name)}&background=random`} className="w-10 h-10 rounded-full" />
                  <div>
                    <p className="text-sm font-bold">{selectedUser?.full_name}</p>
                    <p className="text-xs text-gray-500">{selectedUser?.company}</p>
                  </div>
                </div>

                <textarea 
                  placeholder="Escreva uma mensagem de apresentação..."
                  rows={4}
                  className="w-full p-4 bg-gray-50 border border-gray-100 rounded-xl text-sm outline-none resize-none"
                  value={connectMessage}
                  onChange={(e) => setConnectMessage(e.target.value)}
                />

                <button 
                  onClick={handleConnectRequest}
                  className="w-full h-12 bg-[#c59f47] text-white rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg"
                >
                  <UserPlus className="w-5 h-5" />
                  Enviar Solicitação
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Premium Section (Locked) */}
      <div className="relative overflow-hidden rounded-2xl bg-gray-50 border border-gray-100">
        <div className="flex items-center justify-between px-4 pt-4">
          <h3 className="text-[#111318] text-md font-bold leading-tight tracking-tight flex items-center gap-2">
            <Star className="text-[#D4AF37] w-5 h-5 fill-current" />
            Matches de Alta Relevância
          </h3>
        </div>
        
        <div className="p-4 space-y-4 filter blur-[2px] pointer-events-none opacity-40">
          <div className="flex items-stretch justify-between gap-4 rounded-xl bg-white p-4 shadow-sm border border-[#D4AF37]/10">
            <div className="flex flex-col gap-1">
              <p className="text-[#D4AF37] text-[10px] font-bold uppercase tracking-wider">Top Tier Match</p>
              <p className="text-[#111318] text-sm font-bold">Alexandra Vasconcellos</p>
              <p className="text-[#616f89] text-xs">Managing Director | VC</p>
            </div>
            <div className="w-12 h-12 bg-slate-200 rounded-lg shrink-0"></div>
          </div>
        </div>

        <div className="absolute inset-0 flex items-center justify-center bg-white/20 backdrop-blur-[2px] z-10 p-4 text-center">
          <div className="flex flex-col items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-[#D4AF37]/10 flex items-center justify-center">
              <Lock className="text-[#D4AF37] w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-[#111318]">Conexões Premium</h4>
            <button className="bg-[#c59f47] text-white px-4 py-1.5 rounded-lg font-bold text-[10px] shadow-lg">
              Upgrade Agora
            </button>
          </div>
        </div>
      </div>

      <h3 className="text-[#111318] text-lg font-bold leading-tight tracking-tight mt-2">Conexões Recomendadas</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {suggestions.map((person) => (
          <div key={person.id} className="flex flex-col gap-4 rounded-xl bg-white p-4 shadow-[0_2px_8px_rgba(0,0,0,0.06)] border border-gray-100">
            <div className="flex items-start justify-between gap-4">
              <div className="flex flex-col gap-1 flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-[#c59f47] text-xs font-bold px-2 py-0.5 bg-[#c59f47]/10 rounded">95% Match</span>
                  <Verified className="text-[#D4AF37] w-4.5 h-4.5" />
                </div>
                <p className="text-[#111318] text-base font-bold leading-tight pt-1">{person.full_name}</p>
                <p className="text-[#616f89] text-sm font-normal">{person.role} @ {person.company}</p>
              </div>
              <img 
                src={person.avatar_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(person.full_name)}&background=random`} 
                alt={person.full_name}
                className="w-20 h-20 rounded-lg border border-gray-100 object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <div className="flex h-7 items-center justify-center rounded-lg bg-gray-50 px-3">
                <p className="text-[#616f89] text-xs font-medium">Objetivos:</p>
              </div>
              {['Networking', 'Business'].map((obj, j) => (
                <div key={j} className="flex h-7 items-center justify-center rounded-lg bg-[#c59f47]/5 px-3 border border-[#c59f47]/10">
                  <p className="text-[#c59f47] text-xs font-semibold">{obj}</p>
                </div>
              ))}
            </div>
            <div className="flex gap-2 pt-1">
              <button 
                onClick={() => {
                  setSelectedUser(person);
                  setShowCoffeeModal(true);
                }}
                className="flex-1 flex items-center justify-center rounded-lg h-10 px-4 bg-[#c59f47] text-white gap-2 text-sm font-bold shadow-md"
              >
                <Coffee className="w-4.5 h-4.5" />
                <span>Marcar Café</span>
              </button>
              <button 
                onClick={() => {
                  setSelectedUser(person);
                  setShowConnectModal(true);
                }}
                className="flex-1 flex items-center justify-center rounded-lg h-10 px-4 bg-gray-100 text-[#111318] gap-2 text-sm font-bold border border-gray-200"
              >
                <UserPlus className="w-4.5 h-4.5" />
                <span>Conectar</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PriorityTab() {
  return (
    <div className="relative overflow-hidden bg-gray-50 min-h-[60vh]">
      <div className="flex items-center justify-between px-4 pt-4">
        <h3 className="text-[#111318] text-md font-bold leading-tight tracking-tight flex items-center gap-2">
          <Star className="text-[#D4AF37] w-5 h-5 fill-current" />
          Matches de Alta Relevância
        </h3>
      </div>
      
      <div className="p-4 space-y-4 filter blur-[3px] pointer-events-none opacity-60">
        <div className="flex items-stretch justify-between gap-4 rounded-xl bg-white p-4 shadow-sm border border-[#D4AF37]/20">
          <div className="flex flex-[2_2_0px] flex-col gap-3">
            <div className="flex flex-col gap-1">
              <p className="text-[#D4AF37] text-xs font-bold uppercase tracking-wider">Top Tier Match</p>
              <p className="text-[#111318] text-base font-bold leading-tight">Alexandra Vasconcellos</p>
              <p className="text-[#616f89] text-sm font-normal">Managing Director | Venture Capital</p>
            </div>
          </div>
          <div className="w-24 h-24 bg-center bg-no-repeat bg-cover rounded-lg shrink-0 grayscale" style={{ backgroundImage: "url('https://picsum.photos/seed/alexandra/200/200')" }}></div>
        </div>
      </div>

      <div className="absolute inset-0 flex items-center justify-center bg-white/40 backdrop-blur-sm z-10 px-8 text-center">
        <div className="flex flex-col items-center gap-4 bg-white p-8 rounded-3xl shadow-2xl border border-[#D4AF37]/20">
          <div className="w-14 h-14 rounded-full bg-[#D4AF37]/10 flex items-center justify-center">
            <Lock className="text-[#D4AF37] w-8 h-8" />
          </div>
          <div>
            <h4 className="text-lg font-bold text-[#111318]">Conexões Premium</h4>
            <p className="text-sm text-[#616f89] mt-1">Acesse decisores C-Level e investidores qualificados com o plano Elite.</p>
          </div>
          <button className="w-full bg-[#c59f47] text-white px-6 py-3 rounded-xl font-bold text-sm shadow-lg">
            Fazer Upgrade Agora
          </button>
        </div>
      </div>
    </div>
  );
}

function RequestsTab() {
  const { user, loading: authLoading } = useAuth();
  const [loading, setLoading] = useState(true);
  const [requests, setRequests] = useState<any[]>([]);
  const [activeSubTab, setActiveSubTab] = useState<'connect' | 'coffee'>('connect');

  useEffect(() => {
    async function fetchRequests() {
      if (authLoading) return;
      if (!user) return;

      try {
        setLoading(true);
        const data = await connectionService.getPendingRequests(user.id);
        setRequests(data || []);
      } catch (error) {
        console.error('Error fetching requests:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchRequests();
  }, [user, authLoading]);

  const handleAction = async (requestId: string, status: 'accepted' | 'rejected') => {
    try {
      await connectionService.updateRequestStatus(requestId, status);
      setRequests(prev => prev.filter(r => r.id !== requestId));
      alert(status === 'accepted' ? 'Conexão aceita!' : 'Solicitação recusada.');
    } catch (error: any) {
      alert('Erro ao processar: ' + error.message);
    }
  };

  const filteredRequests = requests.filter(req => {
    if (activeSubTab === 'coffee') return req.type === 'coffee';
    return req.type === 'connect' || !req.type;
  });

  if (loading || authLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-[#c59f47]" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 p-4">
      {/* Map Preview Card */}
      <div className="relative w-full h-28 rounded-xl overflow-hidden map-mesh border border-gray-200 shadow-sm">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-blue-500 rounded-full border-2 border-white shadow-lg"></div>
          <div className="absolute top-1/4 right-1/4 w-7 h-7 bg-[#c59f47]/30 rounded-full border border-[#c59f47]/50 flex items-center justify-center text-[10px] font-bold text-[#0F172A]">8</div>
          <div className="absolute bottom-1/3 right-1/2 w-5 h-5 bg-[#c59f47]/30 rounded-full border border-[#c59f47]/50 flex items-center justify-center text-[10px] font-bold text-[#0F172A]">3</div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent flex flex-col justify-end p-3">
          <button className="w-full h-10 bg-white/95 backdrop-blur-sm text-[#0F172A] rounded-lg flex items-center justify-center gap-2 text-xs font-bold shadow-lg border border-gray-200/50">
            <Navigation className="w-4 h-4" />
            ABRIR MAPA • Ver quem está perto de mim
          </button>
        </div>
      </div>

      {/* Sub-tabs for Requests */}
      <div className="flex bg-gray-100 p-1 rounded-xl">
        <button 
          onClick={() => setActiveSubTab('connect')}
          className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${activeSubTab === 'connect' ? 'bg-white text-[#c59f47] shadow-sm' : 'text-gray-500'}`}
        >
          Conexões
        </button>
        <button 
          onClick={() => setActiveSubTab('coffee')}
          className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${activeSubTab === 'coffee' ? 'bg-white text-[#c59f47] shadow-sm' : 'text-gray-500'}`}
        >
          Marcar Café
        </button>
      </div>

      <div className="space-y-4">
        {filteredRequests.map((req) => (
          <div key={req.id} className="flex flex-col gap-4 rounded-xl bg-white p-4 shadow-sm border border-gray-100">
            <div className="flex gap-4">
              <img 
                src={req.profiles.avatar_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(req.profiles.full_name)}&background=random`} 
                alt={req.profiles.full_name}
                className="w-16 h-16 rounded-lg shrink-0 object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="flex flex-col flex-1">
                <h3 className="text-base font-bold text-[#0F172A]">{req.profiles.full_name}</h3>
                <p className="text-xs text-gray-500 font-medium">{req.profiles.role} @ {req.profiles.company}</p>
                {req.type === 'coffee' && (
                  <div className="mt-2 p-2 bg-gray-50 rounded-lg space-y-1">
                    <p className="text-[10px] font-bold text-[#c59f47] uppercase tracking-wider">Sugestão de Café</p>
                    {req.meeting_date && (
                      <p className="text-[11px] text-gray-600 flex items-center gap-1">
                        <Calendar className="w-3 h-3" /> {new Date(req.meeting_date).toLocaleString()}
                      </p>
                    )}
                    {req.meeting_place && (
                      <p className="text-[11px] text-gray-600 flex items-center gap-1">
                        <MapPin className="w-3 h-3" /> {req.meeting_place}
                      </p>
                    )}
                  </div>
                )}
                <p className="mt-2 text-xs text-gray-600 italic">"{req.message || 'Gostaria de me conectar!'}"</p>
              </div>
            </div>
            <div className="flex gap-3 mt-1">
              <button 
                onClick={() => handleAction(req.id, 'accepted')}
                className="flex-1 h-10 rounded-lg bg-[#c59f47] text-white text-sm font-bold shadow-sm flex items-center justify-center gap-2"
              >
                <Check className="w-4 h-4" />
                Aceitar
              </button>
              <button 
                onClick={() => handleAction(req.id, 'rejected')}
                className="flex-1 h-10 rounded-lg bg-transparent border border-gray-200 text-gray-500 text-sm font-bold flex items-center justify-center gap-2"
              >
                <X className="w-4 h-4" />
                Recusar
              </button>
            </div>
          </div>
        ))}
        {filteredRequests.length === 0 && (
          <div className="text-center py-10">
            <p className="text-sm text-gray-500">Nenhuma solicitação de {activeSubTab === 'connect' ? 'conexão' : 'café'} pendente.</p>
          </div>
        )}
      </div>
    </div>
  );
}

function NearbyTab() {
  const { user, loading: authLoading } = useAuth();
  const [showFullMap, setShowFullMap] = useState(false);
  const [locationEnabled, setLocationEnabled] = useState(false);
  const [nearbyProfiles, setNearbyProfiles] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchNearby() {
      if (authLoading) return;
      if (!user) return;

      setLoading(true);
      try {
        const data = await profileService.getSuggestedMembers(user.id);
        setNearbyProfiles(data || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchNearby();
  }, [user, authLoading]);

  const handleEnableGPS = () => {
    setLoading(true);
    // Simulate GPS activation
    setTimeout(() => {
      setLocationEnabled(true);
      setLoading(false);
      alert('Localização ativada com sucesso!');
    }, 1500);
  };

  if (!showFullMap) {
    return (
      <div className="flex flex-col items-center justify-center h-[calc(100vh-184px)] p-8 text-center bg-white">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="flex flex-col items-center gap-6"
        >
          <div className="w-24 h-24 rounded-full bg-[#c59f47]/10 flex items-center justify-center">
            <Navigation className="w-12 h-12 text-[#c59f47]" />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-[#111318]">Explorar Próximos</h2>
            <p className="text-gray-500 text-sm">
              Veja membros do clube que estão próximos a você em tempo real e conecte-se.
            </p>
          </div>
          <button 
            onClick={() => setShowFullMap(true)}
            className="w-full h-14 bg-[#c59f47] text-white rounded-2xl font-bold text-lg shadow-xl shadow-[#c59f47]/30 active:scale-95 transition-all"
          >
            Próximo
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="relative flex-1 h-[calc(100vh-184px)] bg-[#f0f0f0] overflow-hidden">
      {/* Map Grid Background */}
      <div className="absolute inset-0 opacity-40 pointer-events-none">
        <div className="w-full h-full" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #c59f47 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
      </div>
      
      {/* Map Controls */}
      <div className="absolute top-4 right-4 flex flex-col gap-2 z-20">
        <button 
          onClick={handleEnableGPS}
          className={`p-2 rounded-lg shadow-lg border transition-all ${locationEnabled ? 'bg-[#c59f47] border-[#c59f47] text-white' : 'bg-white border-gray-200 text-gray-600'}`}
        >
          {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : <MyLocation className="w-6 h-6" />}
        </button>
        <button className="bg-white p-2 rounded-lg shadow-lg border border-gray-200">
          <Layers className="w-6 h-6 text-gray-600" />
        </button>
      </div>

      {/* User Location Marker */}
      {locationEnabled && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
          <div className="relative flex items-center justify-center">
            <div className="absolute w-24 h-24 bg-[#c59f47]/20 rounded-full animate-ping"></div>
            <div className="w-6 h-6 bg-[#c59f47] rounded-full border-2 border-white shadow-lg"></div>
          </div>
        </div>
      )}

      {/* Nearby Members */}
      {nearbyProfiles.map((member, i) => (
        <div 
          key={member.id} 
          className="absolute z-20 transition-all duration-1000" 
          style={{ 
            top: `${20 + (i * 15) % 60}%`, 
            left: `${15 + (i * 25) % 70}%`,
            opacity: locationEnabled ? 1 : 0.3
          }}
        >
          <div className="flex flex-col items-center">
            <div 
              className={`w-12 h-12 rounded-xl bg-center bg-cover border-2 shadow-xl mb-1 transition-transform hover:scale-110 cursor-pointer ${member.role === 'admin' ? 'border-[#D4AF37]' : 'border-white'}`} 
              style={{ backgroundImage: `url('${member.avatar_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(member.full_name)}&background=random`}')` }}
            ></div>
            <div className="bg-white px-2 py-0.5 rounded shadow-sm border border-gray-100">
              <p className="text-[10px] font-bold whitespace-nowrap">{member.full_name}</p>
              <p className="text-[8px] text-gray-500 whitespace-nowrap">{member.company}</p>
            </div>
          </div>
        </div>
      ))}

      {/* Bottom Info Card */}
      <div className="absolute bottom-4 left-4 right-4 z-30">
        <div className="bg-white/90 backdrop-blur-md p-4 rounded-xl shadow-xl border border-white/20">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-sm font-bold flex items-center gap-1">
              <Explore className="text-[#c59f47] w-5 h-5" />
              Conexões em volta de você
            </h4>
            <span className="text-[10px] font-medium text-gray-500 uppercase">Raio de 2km</span>
          </div>
          <p className="text-xs text-gray-600">
            {locationEnabled 
              ? `Há ${nearbyProfiles.length} membros do clube ativos na sua região no momento. Toque nos ícones para ver o perfil.`
              : 'Ative sua localização para ver membros próximos a você.'
            }
          </p>
          {!locationEnabled && (
            <button 
              onClick={handleEnableGPS}
              className="mt-3 w-full h-10 bg-[#c59f47] text-white rounded-lg text-xs font-bold flex items-center justify-center gap-2"
            >
              <MyLocation className="w-4 h-4" />
              Ativar GPS
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
