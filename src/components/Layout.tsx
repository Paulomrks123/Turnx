import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Home as HomeIcon, 
  Briefcase, 
  Handshake, 
  User,
  MessageSquare,
  Menu,
  X,
  Bell,
  LogOut,
  Search,
  Settings,
  ShieldCheck,
  ChevronRight,
  Plus
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from '../hooks/useAuth';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, profile, signOut } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { icon: HomeIcon, label: 'Início', path: '/home' },
    { icon: Briefcase, label: 'Marketplace', path: '/marketplace' },
    { icon: Handshake, label: 'Connect', path: '/turnx-connect' },
    { icon: MessageSquare, label: 'Mensagens', path: '/messages' },
    { icon: User, label: 'Meu Perfil', path: '/profile' },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col lg:flex-row font-sans selection:bg-[#C6A75E]/30">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-80 bg-white border-r border-slate-100 sticky top-0 h-screen z-50">
        <div className="p-10">
          <div className="flex items-center gap-3 mb-12">
            <div className="size-12 bg-[#0F172A] rounded-2xl flex items-center justify-center shadow-xl shadow-[#0F172A]/20">
              <span className="text-white font-black text-2xl">T</span>
            </div>
            <h1 className="text-2xl font-black text-[#0F172A] tracking-tighter">TurnX<span className="text-[#C6A75E]">Club</span></h1>
          </div>
          
          <nav className="space-y-3">
            {navItems.map((item) => {
              const active = isActive(item.path);
              const Icon = item.icon;
              return (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className={`w-full flex items-center justify-between px-6 py-4 rounded-[24px] font-black text-sm uppercase tracking-widest transition-all duration-300 group ${
                    active 
                      ? 'bg-[#0F172A] text-white shadow-2xl shadow-[#0F172A]/20' 
                      : 'text-slate-400 hover:bg-slate-50 hover:text-[#0F172A]'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <Icon className={`w-5 h-5 transition-transform duration-300 group-hover:scale-110 ${active ? 'text-[#C6A75E]' : ''}`} />
                    <span>{item.label}</span>
                  </div>
                  {active && <div className="size-2 bg-[#C6A75E] rounded-full"></div>}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="mt-auto p-10 space-y-6">
          <div className="bg-slate-50 rounded-[32px] p-6 border border-slate-100">
            <div className="flex items-center gap-4 mb-4">
              <div className="size-12 rounded-2xl bg-white shadow-lg flex items-center justify-center border border-slate-100 overflow-hidden">
                {profile?.avatar_url ? (
                  <img src={profile.avatar_url} alt="" className="w-full h-full object-cover" />
                ) : (
                  <User className="w-6 h-6 text-slate-300" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-black text-[#0F172A] truncate">{profile?.full_name || 'Membro'}</p>
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3 h-3 text-[#C6A75E]" />
                  <p className="text-[10px] text-[#C6A75E] font-black uppercase tracking-widest">Elite Member</p>
                </div>
              </div>
            </div>
            <button 
              onClick={() => navigate('/settings')}
              className="w-full h-12 bg-white border border-slate-100 rounded-xl font-black text-[10px] uppercase tracking-widest text-slate-400 hover:text-[#0F172A] hover:border-slate-200 transition-all flex items-center justify-center gap-2"
            >
              <Settings className="w-4 h-4" /> Configurações
            </button>
          </div>

          <button 
            onClick={() => signOut()}
            className="w-full flex items-center gap-4 px-6 py-4 text-slate-400 font-black text-xs uppercase tracking-widest hover:text-red-500 transition-colors"
          >
            <LogOut className="w-5 h-5" /> Sair da Conta
          </button>
        </div>
      </aside>

      {/* Mobile Header */}
      <header className={`lg:hidden sticky top-0 z-50 transition-all duration-300 safe-top ${
        scrolled ? 'bg-white/90 backdrop-blur-md shadow-lg border-b border-slate-100' : 'bg-transparent'
      }`}>
        <div className="px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="size-10 bg-[#0F172A] rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-black text-lg">T</span>
            </div>
            <h1 className="text-xl font-black text-[#0F172A] tracking-tighter">TurnX<span className="text-[#C6A75E]">Club</span></h1>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => navigate('/notifications')}
              className="p-3 text-slate-500 relative bg-white rounded-xl shadow-sm border border-slate-50"
            >
              <Bell className="w-6 h-6" />
              <span className="absolute top-3 right-3 size-2.5 bg-[#C6A75E] rounded-full border-2 border-white animate-pulse"></span>
            </button>
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-3 bg-[#0F172A] text-white rounded-xl shadow-xl shadow-[#0F172A]/20"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="lg:hidden fixed inset-0 z-[45] bg-white pt-24 px-6 flex flex-col"
          >
            <div className="flex-1 space-y-4 py-8 overflow-y-auto">
              {navItems.map((item) => {
                const active = isActive(item.path);
                const Icon = item.icon;
                return (
                  <button
                    key={item.path}
                    onClick={() => navigate(item.path)}
                    className={`w-full flex items-center justify-between p-6 rounded-[32px] font-black text-lg transition-all ${
                      active 
                        ? 'bg-[#0F172A] text-white shadow-2xl shadow-[#0F172A]/20' 
                        : 'text-slate-400 bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-6">
                      <Icon className={`w-7 h-7 ${active ? 'text-[#C6A75E]' : ''}`} />
                      <span>{item.label}</span>
                    </div>
                    <ChevronRight className={`w-6 h-6 ${active ? 'text-[#C6A75E]' : 'text-slate-200'}`} />
                  </button>
                );
              })}
            </div>

            <div className="pb-12 space-y-6">
              <div className="p-8 bg-slate-50 rounded-[40px] flex items-center gap-6">
                <div className="size-16 rounded-[24px] bg-white shadow-xl flex items-center justify-center border border-slate-100 overflow-hidden">
                  {profile?.avatar_url ? (
                    <img src={profile.avatar_url} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <User className="w-8 h-8 text-slate-300" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-xl font-black text-[#0F172A]">{profile?.full_name || 'Membro'}</p>
                  <p className="text-xs font-black text-[#C6A75E] uppercase tracking-widest">Elite Member</p>
                </div>
              </div>
              <button 
                onClick={() => signOut()}
                className="w-full h-16 bg-red-50 text-red-500 rounded-[24px] font-black text-sm uppercase tracking-widest flex items-center justify-center gap-3"
              >
                <LogOut className="w-5 h-5" /> Sair da Conta
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-1 relative">
        {children}
      </main>

      {/* Mobile Bottom Navigation (Optional, but good for app-like feel) */}
      <nav className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-white/80 backdrop-blur-md border-t border-slate-100 px-6 h-20 flex items-center justify-between safe-bottom">
        {navItems.slice(0, 4).map((item) => {
          const active = isActive(item.path);
          const Icon = item.icon;
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center gap-1 transition-all ${
                active ? 'text-[#C6A75E]' : 'text-slate-300'
              }`}
            >
              <Icon className={`w-6 h-6 ${active ? 'fill-current' : ''}`} />
              <span className="text-[10px] font-black uppercase tracking-widest">{item.label.split(' ')[0]}</span>
            </button>
          );
        })}
        <button 
          onClick={() => navigate('/create-opportunity')}
          className="size-14 bg-[#0F172A] text-white rounded-2xl flex items-center justify-center shadow-xl shadow-[#0F172A]/20 -translate-y-6 border-4 border-white"
        >
          <Plus className="w-8 h-8" />
        </button>
      </nav>
    </div>
  );
}
