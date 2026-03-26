import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ChevronLeft, 
  Search, 
  MoreVertical, 
  CheckCheck,
  UserPlus,
  MessageSquare,
  ArrowRight,
  Loader2
} from 'lucide-react';
import { BottomNav } from '../components/BottomNav';
import { supabase } from '../lib/supabase';

interface Conversation {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unread: number;
  online: boolean;
  role: string;
}

interface Request {
  id: string;
  name: string;
  avatar: string;
  role: string;
  mutualConnections: number;
}

export function Messages() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'conversations' | 'requests'>('conversations');
  const [loading, setLoading] = useState(true);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [requests, setRequests] = useState<Request[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          navigate('/auth');
          return;
        }

        // Fetch Connection Requests
        const { data: requestsData } = await supabase
          .from('connections')
          .select('*, profiles:requester_id(full_name, company, role, avatar_url)')
          .eq('receiver_id', user.id)
          .eq('status', 'pending');

        setRequests(requestsData?.map(r => ({
          id: r.id,
          name: r.profiles.full_name,
          avatar: r.profiles.avatar_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(r.profiles.full_name)}&background=random`,
          role: `${r.profiles.role} @ ${r.profiles.company}`,
          mutualConnections: 0 // Placeholder
        })) || []);

        // Fetch Conversations (Latest messages)
        const { data: messagesData } = await supabase
          .from('messages')
          .select('*, sender:sender_id(full_name, company, role, avatar_url), receiver:receiver_id(full_name, company, role, avatar_url)')
          .or(`sender_id.eq.${user.id},receiver_id.eq.${user.id}`)
          .order('created_at', { ascending: false });

        // Group messages by conversation partner
        const conversationMap = new Map<string, Conversation>();
        messagesData?.forEach(msg => {
          const partner = msg.sender_id === user.id ? msg.receiver : msg.sender;
          const partnerId = msg.sender_id === user.id ? msg.receiver_id : msg.sender_id;
          
          if (!conversationMap.has(partnerId)) {
            conversationMap.set(partnerId, {
              id: partnerId,
              name: partner.full_name,
              avatar: partner.avatar_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(partner.full_name)}&background=random`,
              lastMessage: msg.content,
              time: new Date(msg.created_at).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
              unread: 0, // Placeholder
              online: false,
              role: `${partner.role} @ ${partner.company}`
            });
          }
        });

        setConversations(Array.from(conversationMap.values()));

      } catch (error) {
        console.error('Error fetching messages data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [navigate]);

  const handleAcceptRequest = async (requestId: string) => {
    try {
      const { error } = await supabase
        .from('connections')
        .update({ status: 'accepted' })
        .eq('id', requestId);

      if (error) throw error;
      
      setRequests(prev => prev.filter(r => r.id !== requestId));
      alert('Conexão aceita!');
    } catch (error: any) {
      alert('Erro ao aceitar: ' + error.message);
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
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-slate-100 safe-top">
        <div className="max-w-screen-xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="p-2 -ml-2">
            <ChevronLeft className="w-6 h-6 text-slate-600" />
          </button>
          <h1 className="text-lg font-bold tracking-tight">Mensagens</h1>
        </div>
        <button className="p-2">
          <MoreVertical className="w-5 h-5 text-slate-400" />
        </button>
        </div>
      </header>

      <div className="max-w-screen-xl mx-auto w-full">
        {/* Search */}
        <div className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Buscar conversas..." 
              className="w-full bg-white border border-slate-200 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#C6A75E]/20 focus:border-[#C6A75E] transition-all"
            />
          </div>
        </div>

        {/* Tabs */}
        <div className="px-4 flex gap-6 border-b border-slate-100 bg-white">
          <button 
            onClick={() => setActiveTab('conversations')}
            className={`pb-3 text-sm font-bold transition-all relative ${
              activeTab === 'conversations' ? 'text-[#C6A75E]' : 'text-slate-400'
            }`}
          >
            Conversas
            {activeTab === 'conversations' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#C6A75E] rounded-full" />
            )}
          </button>
          <button 
            onClick={() => setActiveTab('requests')}
            className={`pb-3 text-sm font-bold transition-all relative ${
              activeTab === 'requests' ? 'text-[#C6A75E]' : 'text-slate-400'
            }`}
          >
            Solicitações
            {requests.length > 0 && (
              <span className="ml-1.5 px-1.5 py-0.5 bg-red-500 text-white text-[10px] rounded-full">
                {requests.length}
              </span>
            )}
            {activeTab === 'requests' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#C6A75E] rounded-full" />
            )}
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto pb-32">
          {activeTab === 'conversations' ? (
            <div className="divide-y divide-slate-50 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-slate-50">
              {conversations.map((chat) => (
                <button 
                  key={chat.id}
                  onClick={() => navigate(`/chat/${chat.id}`)}
                  className="w-full flex items-center gap-4 p-4 bg-white hover:bg-slate-50 active:bg-slate-100 transition-colors text-left"
                >
                  <div className="relative">
                    <img 
                      src={chat.avatar} 
                      alt={chat.name} 
                      className="w-14 h-14 rounded-full object-cover border-2 border-slate-100"
                      referrerPolicy="no-referrer"
                    />
                    {chat.online && (
                      <div className="absolute bottom-0.5 right-0.5 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start mb-0.5">
                      <h4 className="font-bold text-sm truncate">{chat.name}</h4>
                      <span className="text-[10px] text-slate-400 font-medium">{chat.time}</span>
                    </div>
                    <p className="text-xs text-slate-500 truncate mb-1">{chat.role}</p>
                    <div className="flex justify-between items-center">
                      <p className={`text-xs truncate flex-1 ${chat.unread > 0 ? 'text-[#0F172A] font-bold' : 'text-slate-400'}`}>
                        {chat.lastMessage}
                      </p>
                      {chat.unread > 0 ? (
                        <span className="ml-2 w-5 h-5 bg-[#C6A75E] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                          {chat.unread}
                        </span>
                      ) : (
                        <CheckCheck className="w-4 h-4 text-[#C6A75E] ml-2" />
                      )}
                    </div>
                  </div>
                </button>
              ))}
              {conversations.length === 0 && (
                <div className="flex flex-col items-center justify-center py-20 text-center col-span-full">
                  <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                    <MessageSquare className="w-8 h-8 text-slate-300" />
                  </div>
                  <h3 className="font-bold text-slate-900">Nenhuma conversa</h3>
                  <p className="text-sm text-slate-500 mt-1">Inicie uma conversa com um membro.</p>
                </div>
              )}
            </div>
          ) : (
            <div className="p-4 space-y-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {requests.map((request) => (
                <div key={request.id} className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm flex items-center gap-4">
                  <img 
                    src={request.avatar} 
                    alt={request.name} 
                    className="w-14 h-14 rounded-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-sm truncate">{request.name}</h4>
                    <p className="text-xs text-slate-500 truncate">{request.role}</p>
                    <p className="text-[10px] text-[#C6A75E] font-medium mt-1 flex items-center gap-1">
                      <UserPlus className="w-3 h-3" />
                      {request.mutualConnections} conexões em comum
                    </p>
                  </div>
                  <button 
                    onClick={() => handleAcceptRequest(request.id)}
                    className="bg-[#C6A75E] text-white p-2 rounded-xl shadow-lg shadow-[#C6A75E]/20"
                  >
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              ))}
              {requests.length === 0 && (
                <div className="flex flex-col items-center justify-center py-20 text-center col-span-full">
                  <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                    <MessageSquare className="w-8 h-8 text-slate-300" />
                  </div>
                  <h3 className="font-bold text-slate-900">Nenhuma solicitação</h3>
                  <p className="text-sm text-slate-500 mt-1">Você está em dia com suas solicitações.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
