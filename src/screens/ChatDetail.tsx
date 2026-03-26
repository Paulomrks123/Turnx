import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  ChevronLeft, 
  MoreVertical, 
  Send, 
  Paperclip, 
  Smile, 
  Phone, 
  Video,
  CheckCheck,
  Loader2
} from 'lucide-react';
import { supabase } from '../lib/supabase';

interface Message {
  id: string;
  text: string;
  time: string;
  sender: 'me' | 'other';
  status: 'sent' | 'delivered' | 'read';
}

interface PartnerProfile {
  full_name: string;
  avatar_url: string;
  company: string;
  role: string;
}

export function ChatDetail() {
  const navigate = useNavigate();
  const { id: partnerId } = useParams();
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState<Message[]>([]);
  const [partner, setPartner] = useState<PartnerProfile | null>(null);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function initChat() {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          navigate('/auth');
          return;
        }
        setCurrentUser(user);

        // Fetch partner profile
        const { data: profileData } = await supabase
          .from('profiles')
          .select('full_name, avatar_url, company, role')
          .eq('id', partnerId)
          .single();
        
        setPartner(profileData);

        // Fetch messages
        const { data: messagesData } = await supabase
          .from('messages')
          .select('*')
          .or(`and(sender_id.eq.${user.id},receiver_id.eq.${partnerId}),and(sender_id.eq.${partnerId},receiver_id.eq.${user.id})`)
          .order('created_at', { ascending: true });

        setMessages(messagesData?.map(m => ({
          id: m.id,
          text: m.content,
          time: new Date(m.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          sender: m.sender_id === user.id ? 'me' : 'other',
          status: 'read'
        })) || []);

        // Subscribe to new messages
        const subscription = supabase
          .channel('public:messages')
          .on('postgres_changes', { 
            event: 'INSERT', 
            schema: 'public', 
            table: 'messages',
            filter: `receiver_id=eq.${user.id}`
          }, (payload) => {
            const newMsg = payload.new;
            if (newMsg.sender_id === partnerId) {
              setMessages(prev => [...prev, {
                id: newMsg.id,
                text: newMsg.content,
                time: new Date(newMsg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                sender: 'other',
                status: 'read'
              }]);
            }
          })
          .subscribe();

        return () => {
          supabase.removeChannel(subscription);
        };

      } catch (error) {
        console.error('Error initializing chat:', error);
      } finally {
        setLoading(false);
      }
    }

    initChat();
  }, [partnerId, navigate]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !currentUser || !partnerId) return;

    const content = newMessage;
    setNewMessage('');

    try {
      const { data, error } = await supabase
        .from('messages')
        .insert({
          sender_id: currentUser.id,
          receiver_id: partnerId,
          content: content
        })
        .select()
        .single();

      if (error) throw error;

      setMessages(prev => [...prev, {
        id: data.id,
        text: data.content,
        time: new Date(data.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        sender: 'me',
        status: 'sent'
      }]);
    } catch (error: any) {
      alert('Erro ao enviar mensagem: ' + error.message);
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
    <div className="bg-[#f8f7f6] text-[#0F172A] h-screen flex flex-col font-sans overflow-hidden">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-slate-100 h-16 shadow-sm">
        <div className="max-w-screen-xl mx-auto px-4 h-full flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate(-1)} className="p-2 -ml-2">
              <ChevronLeft className="w-6 h-6 text-slate-600" />
            </button>
            <div className="flex items-center gap-3">
              <div className="relative">
                <img 
                  src={partner?.avatar_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(partner?.full_name || '')}&background=random`} 
                  alt={partner?.full_name} 
                  className="w-10 h-10 rounded-full object-cover border border-slate-100"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
              </div>
              <div>
                <h1 className="text-sm font-bold tracking-tight">{partner?.full_name}</h1>
                <p className="text-[10px] text-green-500 font-medium">Online agora</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <button className="p-2 text-slate-400 hover:text-[#C6A75E] transition-colors">
              <Phone className="w-5 h-5" />
            </button>
            <button className="p-2 text-slate-400 hover:text-[#C6A75E] transition-colors">
              <Video className="w-5 h-5" />
            </button>
            <button className="p-2 text-slate-400 hover:text-[#C6A75E] transition-colors">
              <MoreVertical className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Messages List */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto bg-[#f8f7f6]"
      >
        <div className="max-w-screen-xl mx-auto p-4 space-y-4">
          <div className="flex justify-center mb-6">
            <span className="bg-white/50 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold text-slate-400 border border-slate-100 uppercase tracking-wider">
              Hoje
            </span>
          </div>

          {messages.map((msg) => (
            <div 
              key={msg.id}
              className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[80%] rounded-2xl px-4 py-2.5 shadow-sm relative ${
                msg.sender === 'me' 
                  ? 'bg-[#C6A75E] text-white rounded-tr-none' 
                  : 'bg-white text-[#0F172A] rounded-tl-none border border-slate-100'
              }`}>
                <p className="text-sm leading-relaxed">{msg.text}</p>
                <div className={`flex items-center justify-end gap-1 mt-1 ${
                  msg.sender === 'me' ? 'text-white/70' : 'text-slate-400'
                }`}>
                  <span className="text-[9px] font-medium">{msg.time}</span>
                  {msg.sender === 'me' && (
                    <CheckCheck className={`w-3 h-3 ${msg.status === 'read' ? 'text-white' : 'text-white/50'}`} />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Input Area */}
      <div className="bg-white border-t border-slate-100 pb-[env(safe-area-inset-bottom,20px)]">
        <div className="max-w-screen-xl mx-auto p-4 flex items-center gap-2">
          <button className="p-2 text-slate-400 hover:text-[#C6A75E] transition-colors">
            <Paperclip className="w-5 h-5" />
          </button>
          <div className="flex-1 relative">
            <input 
              type="text" 
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Digite sua mensagem..." 
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 px-4 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-[#C6A75E]/20 focus:border-[#C6A75E] transition-all"
            />
            <button className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#C6A75E] transition-colors">
              <Smile className="w-5 h-5" />
            </button>
          </div>
          <button 
            onClick={handleSendMessage}
            disabled={!newMessage.trim()}
            className={`p-3 rounded-2xl shadow-lg transition-all active:scale-95 ${
              newMessage.trim() 
                ? 'bg-[#C6A75E] text-white shadow-[#C6A75E]/30' 
                : 'bg-slate-100 text-slate-300 shadow-none cursor-not-allowed'
            }`}
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
