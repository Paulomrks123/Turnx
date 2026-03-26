import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Bell, Check, ArrowRight } from 'lucide-react';

export function NotificationSettings() {
  const navigate = useNavigate();
  const [settings, setSettings] = useState({
    pendingConnections: true,
    newEvents: true,
    newOpportunities: true,
    newNetworkingEvents: true,
  });

  const toggleSetting = (key: keyof typeof settings) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = () => {
    localStorage.setItem('notificationsConfigured', 'true');
    navigate('/notifications');
  };

  return (
    <div className="bg-[#f8f7f6] text-[#0F172A] min-h-screen flex flex-col font-sans">
      <header className="sticky top-0 z-50 bg-white border-b border-slate-100 safe-top">
        <div className="max-w-screen-xl mx-auto px-4 h-16 flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="p-2 -ml-2">
            <ChevronLeft className="w-6 h-6 text-slate-600" />
          </button>
          <h1 className="text-lg font-bold tracking-tight">Configurações de Notificações</h1>
        </div>
      </header>

      <main className="flex-1 p-6 space-y-8 max-w-screen-xl mx-auto w-full">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-[#C6A75E]/10 rounded-full mb-2">
            <Bell className="w-8 h-8 text-[#C6A75E]" />
          </div>
          <h2 className="text-xl font-bold">Personalize seus avisos</h2>
          <p className="text-sm text-slate-500">Selecione o que você deseja acompanhar de perto no Club.</p>
        </div>

        <div className="space-y-4">
          {[
            { id: 'pendingConnections', label: 'Conexões pendentes', desc: 'Saiba quando alguém quer se conectar com você.' },
            { id: 'newEvents', label: 'Novos eventos que surgiram', desc: 'Fique por dentro de Masterclasses e encontros.' },
            { id: 'newOpportunities', label: 'Novas oportunidades', desc: 'Alertas de M&A e rodadas de investimento.' },
            { id: 'newNetworkingEvents', label: 'Novos eventos de networking', desc: 'Encontros sociais e happy hours exclusivos.' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => toggleSetting(item.id as keyof typeof settings)}
              className="w-full bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between text-left transition-all active:scale-[0.98]"
            >
              <div className="flex-1 pr-4">
                <h3 className="font-bold text-sm">{item.label}</h3>
                <p className="text-[11px] text-slate-500 mt-0.5">{item.desc}</p>
              </div>
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                settings[item.id as keyof typeof settings] 
                  ? 'bg-[#C6A75E] border-[#C6A75E]' 
                  : 'border-slate-200'
              }`}>
                {settings[item.id as keyof typeof settings] && <Check className="w-4 h-4 text-white" />}
              </div>
            </button>
          ))}
        </div>
      </main>

      <footer className="p-6 bg-white border-t border-slate-100">
        <button 
          onClick={handleSave}
          className="w-full h-14 bg-[#0F172A] text-white rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-slate-200"
        >
          Continuar para Notificações
          <ArrowRight className="w-5 h-5" />
        </button>
      </footer>
    </div>
  );
}
