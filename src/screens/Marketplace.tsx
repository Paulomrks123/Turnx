import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  UserCircle, 
  PlusCircle, 
  Search, 
  SlidersHorizontal, 
  ChevronDown, 
  Star, 
  Bookmark, 
  Share2,
  Loader2,
  Store,
  X
} from 'lucide-react';
import { BottomNav } from '../components/BottomNav';
import { serviceService } from '../services/serviceService';

export function Marketplace() {
  const navigate = useNavigate();
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [filters, setFilters] = useState({
    sector: '',
    model: '',
    priceRange: ''
  });
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  useEffect(() => {
    async function fetchServices() {
      try {
        setLoading(true);
        const data = await serviceService.getServices();
        setServices(data || []);
      } catch (error) {
        console.error('Error fetching services:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchServices();
  }, []);

  const filteredServices = services.filter(service => {
    const matchesSearch = service.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         service.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || service.category === selectedCategory;
    const matchesSector = !filters.sector || service.sector === filters.sector;
    const matchesModel = !filters.model || service.model === filters.model;
    
    return matchesSearch && matchesCategory && matchesSector && matchesModel;
  });

  return (
    <div className="bg-[#f8f7f6] text-[#111318] min-h-screen font-sans">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-screen-xl mx-auto">
          <div className="flex items-center px-4 py-3 justify-between">
          <div className="flex items-center gap-2">
            <div className="text-[#c59f47] size-10 flex items-center justify-center rounded-full bg-[#c59f47]/10">
              <UserCircle className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-lg font-bold leading-tight tracking-tight">Marketplace de Oportunidades</h1>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <button 
              onClick={() => navigate('/create-service')}
              className="flex items-center gap-1 text-[#c59f47] font-bold text-sm bg-[#c59f47]/5 px-3 py-1.5 rounded-full"
            >
              <PlusCircle className="w-4.5 h-4.5" />
              <span>Inserir Serviço</span>
            </button>
            <button 
              onClick={() => navigate('/my-services')}
              className="flex items-center gap-1 text-gray-500 font-bold text-[10px] uppercase tracking-wider bg-gray-100 px-3 py-1 rounded-full self-end"
            >
              <span>Meus Serviços</span>
            </button>
          </div>
        </div>
        {/* Search Bar Container */}
        <div className="px-4 pb-2">
          <div className="flex w-full items-stretch rounded-xl h-11 bg-gray-100 border border-transparent focus-within:border-[#c59f47]/30 transition-all">
            <div className="text-gray-500 flex items-center justify-center pl-4">
              <Search className="w-5 h-5" />
            </div>
            <input 
              className="flex w-full min-w-0 flex-1 border-none bg-transparent focus:ring-0 placeholder:text-gray-500 px-3 text-sm font-medium" 
              placeholder="Buscar M&A, Tax, Tech..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button 
              onClick={() => setShowAdvancedFilters(true)}
              className="flex items-center pr-3 text-gray-400 hover:text-[#c59f47] transition-colors"
            >
              <SlidersHorizontal className="w-5 h-5" />
            </button>
          </div>
        </div>
        {/* Horizontal Chips/Filters */}
        <div 
          ref={scrollRef}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          className={`flex gap-2 px-4 py-3 overflow-x-auto no-scrollbar pb-4 select-none ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
        >
          {['Todos', 'Consultoria', 'Mentoria', 'Software', 'Jurídico', 'Financeiro', 'Marketing', 'RH', 'Operações', 'Vendas'].map((cat) => (
            <button 
              key={cat}
              onClick={() => !isDragging && setSelectedCategory(cat === 'Todos' ? null : cat)}
              className={`flex h-9 shrink-0 items-center justify-center gap-x-1.5 rounded-full px-4 transition-all ${
                (selectedCategory === cat || (cat === 'Todos' && !selectedCategory))
                  ? 'bg-[#c59f47] text-white shadow-sm' 
                  : 'bg-white border border-gray-200 text-gray-600'
              }`}
            >
              <span className="text-sm font-medium">{cat}</span>
            </button>
          ))}
        </div>
        </div>
      </header>

      <main className="max-w-screen-xl mx-auto p-4 space-y-4 pb-24">
        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-[#c59f47]" />
          </div>
        ) : filteredServices.length === 0 ? (
          <div className="text-center py-20">
            <Store className="w-12 h-12 text-slate-200 mx-auto mb-4" />
            <p className="text-gray-500 text-sm">Nenhum serviço encontrado.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.map((service) => (
              <div 
                key={service.id}
                className="bg-white rounded-xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-gray-100 h-full flex flex-col"
              >
                <div className="p-4 flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-1">
                    <div className="flex flex-col gap-1">
                      <span className="text-[10px] font-bold text-[#c59f47] uppercase tracking-wider">{service.category}</span>
                      <h3 className="text-lg font-bold text-[#0a192f] leading-tight">{service.title}</h3>
                    </div>
                    <Bookmark className="w-5 h-5 text-gray-400" />
                  </div>
                  <div className="flex items-center gap-2 mb-3 mt-2">
                    <div className="size-6 rounded-full bg-slate-100 flex items-center justify-center">
                      <UserCircle className="w-4 h-4 text-slate-300" />
                    </div>
                    <p className="text-xs text-gray-500 font-medium">
                      {service.profiles?.full_name} • <span className="text-[#c59f47]">{service.profiles?.company}</span>
                    </p>
                  </div>
                  <p className="text-sm text-gray-600 mb-5 leading-relaxed flex-1">
                    {service.description}
                  </p>
                  <div className="flex gap-2 mt-auto">
                    <button className="flex-1 flex items-center justify-center gap-2 h-11 rounded-lg bg-gray-100 text-gray-700 text-sm font-bold">
                      <Share2 className="w-4.5 h-4.5" />
                      Indicar
                    </button>
                    <button 
                      onClick={() => alert('Interesse registrado! O prestador entrará em contato.')}
                      className="flex-[1.5] flex items-center justify-center gap-2 h-11 rounded-lg bg-[#c59f47] text-white text-sm font-bold shadow-md shadow-[#c59f47]/20"
                    >
                      Tenho Interesse
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Advanced Filters Modal */}
      {showAdvancedFilters && (
        <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div 
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setShowAdvancedFilters(false)}
          />
          <div className="relative bg-white w-full max-w-lg rounded-t-[32px] sm:rounded-[32px] shadow-2xl overflow-hidden animate-in slide-in-from-bottom duration-300">
            <div className="p-6 space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-slate-900">Filtros Avançados</h2>
                <button 
                  onClick={() => setShowAdvancedFilters(false)}
                  className="p-2 hover:bg-slate-100 rounded-full transition-colors"
                >
                  <X className="w-6 h-6 text-slate-400" />
                </button>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">Setor de Atuação</label>
                <div className="flex flex-wrap gap-2">
                  {['Agronegócio', 'Indústria', 'Serviços', 'Varejo', 'Tecnologia'].map(s => (
                    <button 
                      key={s}
                      onClick={() => setFilters({...filters, sector: filters.sector === s ? '' : s})}
                      className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
                        filters.sector === s ? 'bg-[#c59f47] border-[#c59f47] text-white' : 'bg-slate-50 border-slate-100 text-slate-600'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">Modelo de Contratação</label>
                <div className="flex flex-wrap gap-2">
                  {['Projeto Fixo', 'Success Fee', 'Retainer', 'Híbrido'].map(m => (
                    <button 
                      key={m}
                      onClick={() => setFilters({...filters, model: filters.model === m ? '' : m})}
                      className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
                        filters.model === m ? 'bg-[#c59f47] border-[#c59f47] text-white' : 'bg-slate-50 border-slate-100 text-slate-600'
                      }`}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-4 flex gap-3">
                <button 
                  onClick={() => {
                    setFilters({ sector: '', model: '', priceRange: '' });
                    setSelectedCategory(null);
                  }}
                  className="flex-1 h-14 rounded-2xl border border-slate-200 text-slate-600 font-bold text-sm"
                >
                  Limpar
                </button>
                <button 
                  onClick={() => setShowAdvancedFilters(false)}
                  className="flex-[2] h-14 rounded-2xl bg-[#0F172A] text-white font-bold text-sm shadow-xl"
                >
                  Aplicar Filtros
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      <BottomNav />
    </div>
  );
}
