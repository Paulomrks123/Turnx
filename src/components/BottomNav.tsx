import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Home, 
  Briefcase, 
  Handshake, 
  User,
  MessageSquare
} from 'lucide-react';
import { motion } from 'motion/react';

export function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { icon: Home, label: 'Home', path: '/home' },
    { icon: Briefcase, label: 'Oportunidades', path: '/marketplace' },
    { icon: Handshake, label: 'TurnX Connect', path: '/turnx-connect' },
    { icon: User, label: 'Perfil', path: '/profile' },
  ];

  return (
    <>
      {/* Floating Message Button */}
      <motion.button 
        drag
        dragMomentum={false}
        dragElastic={0}
        dragConstraints={{
          top: -(window.innerHeight - 160), 
          left: -(window.innerWidth - 80),
          right: 0,
          bottom: 0,
        }}
        whileDrag={{ scale: 1.1, cursor: 'grabbing' }}
        onClick={() => navigate('/messages')}
        className="fixed bottom-24 right-6 z-50 w-14 h-14 bg-[#C6A75E] text-white rounded-full shadow-2xl flex items-center justify-center active:scale-95 cursor-grab touch-none"
      >
        <MessageSquare className="w-6 h-6" />
        <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 border-2 border-white rounded-full flex items-center justify-center text-[10px] font-bold">
          2
        </div>
      </motion.button>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl border-t border-slate-100 pb-safe">
        <div className="max-w-screen-xl mx-auto flex justify-around items-center h-16">
          {navItems.map((item) => {
            const active = isActive(item.path);
            const Icon = item.icon;
            return (
              <button 
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`flex flex-col items-center justify-center w-full h-full gap-1 transition-colors ${
                  active ? 'text-[#C6A75E]' : 'text-slate-400'
                }`}
              >
                <Icon className={`w-6 h-6 ${active ? 'fill-current' : ''}`} />
                <span className="text-[10px] font-bold">{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      <style>{`
        .pb-safe {
          padding-bottom: env(safe-area-inset-bottom, 20px);
        }
      `}</style>
    </>
  );
}
