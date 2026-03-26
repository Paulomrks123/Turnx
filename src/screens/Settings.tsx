import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ChevronLeft, 
  ChevronRight, 
  Bell, 
  Shield, 
  User, 
  HelpCircle, 
  LogOut,
  Moon,
  Sun,
  Lock,
  Mail,
  Eye,
  ShoppingBag,
  Newspaper,
  Settings as SettingsIcon,
  ShieldCheck
} from 'lucide-react';
import { supabase } from '../lib/supabase';

export function Settings() {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const [notifications, setNotifications] = useState({
    networking: true,
    events: true,
    marketplace: false,
    content: true
  });

  useEffect(() => {
    async function checkAdmin() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', user.id)
          .single();
        
        if (profile?.role === 'admin' || user.email === 'turnxapp@gmail.com') {
          setIsAdmin(true);
        }
      }
    }
    checkAdmin();
  }, []);

  const [privacy, setPrivacy] = useState({
    directory: true,
    marketplace: true
  });

  const toggleNotification = (key: keyof typeof notifications) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const togglePrivacy = (key: keyof typeof privacy) => {
    setPrivacy(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const Switch = ({ checked, onChange }: { checked: boolean, onChange: () => void }) => (
    <button 
      onClick={onChange}
      className={`relative w-12 h-7 rounded-full transition-all duration-300 ${checked ? 'bg-[#C6A75E]' : 'bg-slate-200'}`}
    >
      <div className={`absolute top-1 left-1 size-5 bg-white rounded-full shadow-md transition-all duration-300 ${checked ? 'translate-x-5' : 'translate-x-0'}`}></div>
    </button>
  );

  return (
    <div className="bg-[#f8f7f6] text-[#0F172A] min-h-screen flex flex-col font-sans">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100 safe-top">
        <div className="max-w-screen-xl mx-auto px-4 h-16 flex items-center justify-between">
          <button onClick={() => navigate(-1)} className="p-2 -ml-2">
            <ChevronLeft className="w-6 h-6 text-[#C6A75E]" />
          </button>
          <h1 className="text-lg font-bold tracking-tight">Configurações</h1>
          <div className="w-10"></div>
        </div>
      </header>

      <main className="flex-1 pb-32 max-w-screen-xl mx-auto w-full">
        {/* Notifications Section */}
        <section className="mt-6">
          <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-5 mb-3">Notificações</h3>
          <div className="bg-white border-y border-slate-100 divide-y divide-slate-50">
            {[
              { label: 'Convites para Networking', key: 'networking' as const },
              { label: 'Eventos e Workshops', key: 'events' as const },
              { label: 'Novas Oportunidades no Marketplace', key: 'marketplace' as const },
              { label: 'Newsletter e Conteúdo Executivo', key: 'content' as const }
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between px-5 py-4">
                <p className="text-sm font-medium text-[#0F172A]">{item.label}</p>
                <Switch 
                  checked={notifications[item.key]} 
                  onChange={() => toggleNotification(item.key)} 
                />
              </div>
            ))}
          </div>
        </section>

        {/* Privacy Section */}
        <section className="mt-8">
          <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-5 mb-3">Privacidade & Governança</h3>
          <div className="bg-white border-y border-slate-100 divide-y divide-slate-50">
            <div className="flex items-center justify-between px-5 py-4">
              <div className="flex flex-col gap-0.5">
                <p className="text-sm font-medium text-[#0F172A]">Visibilidade no Diretório</p>
                <p className="text-[10px] text-slate-400 font-medium">Permite que outros membros encontrem seu perfil</p>
              </div>
              <Switch 
                checked={privacy.directory} 
                onChange={() => togglePrivacy('directory')} 
              />
            </div>
            <div className="flex items-center justify-between px-5 py-4">
              <div className="flex flex-col gap-0.5">
                <p className="text-sm font-medium text-[#0F172A]">Visibilidade no Marketplace</p>
                <p className="text-[10px] text-slate-400 font-medium">Exibir seu cargo e empresa em negociações</p>
              </div>
              <Switch 
                checked={privacy.marketplace} 
                onChange={() => togglePrivacy('marketplace')} 
              />
            </div>
          </div>
        </section>

        {/* Account Section */}
        <section className="mt-8">
          <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-5 mb-3">Conta</h3>
          <div className="bg-white border-y border-slate-100 divide-y divide-slate-50">
            {isAdmin && (
              <button 
                onClick={() => navigate('/admin')}
                className="w-full flex items-center justify-between px-5 py-4 active:bg-slate-50 transition-all text-[#C6A75E]"
              >
                <div className="flex items-center gap-3">
                  <ShieldCheck className="w-5 h-5" />
                  <p className="text-sm font-bold">Painel Administrativo</p>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-300" />
              </button>
            )}
            <button className="w-full flex items-center justify-between px-5 py-4 active:bg-slate-50 transition-all">
              <p className="text-sm font-medium text-[#0F172A]">E-mail corporativo</p>
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400 font-bold">exec@empresa.com</span>
                <ChevronRight className="w-4 h-4 text-slate-300" />
              </div>
            </button>
            <button className="w-full flex items-center justify-between px-5 py-4 active:bg-slate-50 transition-all">
              <p className="text-sm font-medium text-[#0F172A]">Alterar Senha</p>
              <ChevronRight className="w-4 h-4 text-slate-300" />
            </button>
          </div>
        </section>

        {/* Support Section */}
        <section className="mt-8">
          <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-5 mb-3">Suporte & Compliance</h3>
          <div className="bg-white border-y border-slate-100 divide-y divide-slate-50">
            {['Termos de Uso', 'Política de Privacidade', 'Helpdesk / Suporte'].map((item, i) => (
              <button key={i} className="w-full flex items-center justify-between px-5 py-4 active:bg-slate-50 transition-all">
                <p className="text-sm font-medium text-[#0F172A]">{item}</p>
                <ChevronRight className="w-4 h-4 text-slate-300" />
              </button>
            ))}
          </div>
        </section>

        <div className="mt-8 text-center">
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Versão 2.4.1 (Build 120)</p>
          <button className="mt-6 text-red-500 text-sm font-bold flex items-center justify-center gap-2 mx-auto">
            <LogOut className="w-4 h-4" />
            Sair da Conta
          </button>
        </div>
      </main>

      {/* Bottom Action */}
      <div className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-[#f8f7f6] via-[#f8f7f6]/95 to-transparent z-40">
        <div className="w-full">
          <button 
            onClick={() => navigate(-1)}
            className="w-full h-14 bg-[#C6A75E] text-white font-bold rounded-2xl shadow-xl shadow-[#C6A75E]/20 active:scale-[0.98] transition-all"
          >
            Salvar ajustes
          </button>
        </div>
      </div>
    </div>
  );
}
