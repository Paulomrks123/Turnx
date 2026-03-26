import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ChevronLeft, 
  Search, 
  Star, 
  FileText, 
  PlayCircle, 
  BookOpen, 
  Plus,
  Award
} from 'lucide-react';
import { BottomNav } from '../components/BottomNav';

type ContentType = 'Podcasts' | 'Documentos' | 'Vídeos' | 'Materiais';

export function ContentLibrary() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<ContentType>('Podcasts');

  const contentItems = [
    {
      id: 1,
      type: 'Documento',
      title: 'The Future of M&A in Latin America: Strategic Paper',
      author: 'TurnX Research',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBpKzrd3E0_bZ0YkgsGwKo0Q9gYbM1cRSN1IOPYsSwCSrhF4FS9yeUSxr4NUSvf2Pgt1F7il9P6Smumk2f0Tl-p0Xx5QZtTpahL-xPhm0JbQlOSYKLw7NfquEBL4U6p78fRYi9Pfk69op5No8hWfN94nch_t7BZKe-60L-l8x-0SrZLs00GYmwu2eLBYjlAyxecK6L2auf9E1nHeoefp7aVdelUq21R7vGiW9-YVPTZiTrHOsDK1nr33GDAPHZtW9Rx5pg749w6piw',
      icon: <FileText className="w-5 h-5" />
    },
    {
      id: 2,
      type: 'Podcast',
      title: 'Estratégias de Growth 2024',
      author: 'Beatriz Mendes • Escala',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC2os-QBEK_pi_6n-eO1OCk74ia-YAQ-VY6bojCbyce7ALxof3vQbK4BrO-sQ6wlP5MrkmDAwY1p7L44XsB-gDcVN7YSHC2GB1yI-VWAGoO0ilzva5_NM9vY18qyGwnsIiNZYHwpxv48w76hNXB3UWhKkOdQO1nbfoG6IZuOJt403bA-fbBDfcD13qiA77j-jbA3YsvLJ_TQw39VWl4omWKwqC2WcvSqA2ryz2iv_NOcy84fCZ71m-IJREFatAu1a9nvK6bQ0jPn6E',
      icon: <PlayCircle className="w-5 h-5 text-green-600" />
    },
    {
      id: 3,
      type: 'Documento',
      title: 'Conselho Global de Inovação',
      author: 'Exclusivo • Governança',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBpKzrd3E0_bZ0YkgsGwKo0Q9gYbM1cRSN1IOPYsSwCSrhF4FS9yeUSxr4NUSvf2Pgt1F7il9P6Smumk2f0Tl-p0Xx5QZtTpahL-xPhm0JbQlOSYKLw7NfquEBL4U6p78fRYi9Pfk69op5No8hWfN94nch_t7BZKe-60L-l8x-0SrZLs00GYmwu2eLBYjlAyxecK6L2auf9E1nHeoefp7aVdelUq21R7vGiW9-YVPTZiTrHOsDK1nr33GDAPHZtW9Rx5pg749w6piw',
      icon: <Plus className="w-5 h-5" />,
      locked: true
    },
    {
      id: 4,
      type: 'Material',
      title: 'Framework de Cultura Exponencial',
      author: 'Marcos Paulo • RH',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAJ_AgoXUC9W-5U3PCSpKMWTzzrYE5rzKNrk5LIYEkNyh5zv5kIld3OFkGMtMmpxGrQ-o7WkODsx9CIdNrAVZDtf7C_anVmJSLBnXdvkhtc_35upfLQQ5Auii7E5qlIOcksUj-WDDU9zfJ5XmTUCgL6djOxIfzhEf5-MdHZNSSHE_g-GgXVldTwZptWP1c08jtnWVHWxjRJCePr6QkAK-GRH4cnQq4SNLkiGZ9aKVLkywWJF_fyCFsi43H3S-7qCqcmJCYDUHoCe9c',
      icon: <Plus className="w-5 h-5" />,
      locked: true
    },
    {
      id: 5,
      type: 'Vídeo',
      title: 'Masterclass: Gestão em Crise',
      author: 'Helena Costa • Liderança',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBYGZot09F2WyUVrpmxAJxKoKHGTj_Xr-9kzt81N85Uu1Cw8qM9SPCLDf3Zum7Mi3s-jHFyz_YPHSjApSWXsvM1lGnEakMvafNaYmWiWUlnV2pvaGVQ0AS1NBd-NoNB91qW5TOmsmeNn2azl6Qf8nkG3mzXqNA5OPFkNMd3KBhNgDaNrY7hxRvO77Iw4TKx1ffb9XEO6t4lSEMLLvsV9k0XjNvxcx_4LoiQ0pLf14Dl1MYy4VhB4VwsX8RtOrxJv2hc5voSTUJdoS4',
      icon: <PlayCircle className="w-5 h-5" />
    }
  ];

  return (
    <div className="bg-[#f8f7f6] text-[#0F172A] min-h-screen flex flex-col font-sans">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-screen-xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between mb-4">
          <button onClick={() => navigate(-1)} className="p-2 -ml-2">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <h1 className="text-xl font-bold tracking-tight">Conteúdos</h1>
          <div className="w-10"></div>
        </div>
        
        <div className="relative mb-4">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <Search className="w-4 h-4 text-slate-400" />
          </div>
          <input 
            type="text" 
            placeholder="Pesquisar por título, autor ou tema..." 
            className="w-full h-11 pl-10 pr-4 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#C6A75E]/20 transition-all"
          />
        </div>

        <div className="flex gap-6 overflow-x-auto no-scrollbar">
          {['Podcasts', 'Documentos', 'Vídeos', 'Materiais'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as ContentType)}
              className={`pb-3 text-sm font-bold whitespace-nowrap transition-all border-b-2 ${
                activeTab === tab 
                  ? 'text-[#0F172A] border-[#C6A75E]' 
                  : 'text-slate-400 border-transparent'
              }`}
            >
              {tab}
            </button>
          ))}
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-screen-xl mx-auto px-4 pt-6 pb-24 w-full">
        {/* Premium Banner */}
        <div className="mb-8 p-5 rounded-2xl bg-[#0F172A] border border-[#C6A75E]/20 flex flex-col md:flex-row md:items-center gap-4 shadow-xl">
          <div className="flex justify-between items-start flex-1">
            <div className="flex-1">
              <h3 className="text-[#C6A75E] text-xs font-bold uppercase tracking-widest mb-1">Membro Premium</h3>
              <p className="text-white text-base font-semibold leading-snug">Desbloqueie acesso ilimitado a documentos executivos.</p>
            </div>
            <div className="bg-[#C6A75E] text-[#0F172A] rounded-full p-1.5 flex items-center justify-center ml-4">
              <Award className="w-5 h-5" />
            </div>
          </div>
          <button className="w-full md:w-auto md:px-8 bg-[#C6A75E] hover:bg-[#C6A75E]/90 text-[#0F172A] font-bold py-3 rounded-xl text-sm transition-all active:scale-[0.98]">
            Fazer Upgrade Agora
          </button>
        </div>

        <h2 className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-4">Lançamentos recentes</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {contentItems.map((item) => (
            <button 
              key={item.id}
              onClick={() => navigate('/content-detail')}
              className={`flex items-center gap-4 bg-white p-3 rounded-2xl border border-slate-100 shadow-sm transition-all active:scale-[0.98] h-full ${item.locked ? 'opacity-90' : ''}`}
            >
              <div 
                className={`size-16 rounded-xl bg-cover bg-center shrink-0 ${item.locked ? 'grayscale' : ''}`}
                style={{ backgroundImage: `url('${item.image}')` }}
              ></div>
              <div className="flex flex-col justify-center flex-1 min-w-0 text-left">
                <div className="flex items-center gap-2 mb-1">
                  <span className="bg-slate-50 text-[10px] font-bold text-slate-500 px-2 py-0.5 rounded uppercase tracking-wider border border-slate-100">
                    {item.type}
                  </span>
                </div>
                <p className="text-[#0F172A] text-sm font-bold leading-tight line-clamp-1">{item.title}</p>
                <p className="text-slate-400 text-xs font-medium line-clamp-1">{item.author}</p>
              </div>
              <div className={`shrink-0 ${item.locked ? 'bg-[#C6A75E]/10 text-[#C6A75E] size-8 rounded-full flex items-center justify-center' : 'text-[#C6A75E]'}`}>
                {item.icon}
              </div>
            </button>
          ))}
        </div>
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
      `}</style>
    </div>
  );
}
