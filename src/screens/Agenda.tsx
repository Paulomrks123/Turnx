import { Bell, Compass, Map as MapIcon, Clock, Coffee, Video, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { BottomNav } from '../components/BottomNav';

export function Agenda() {
  const navigate = useNavigate();

  return (
    <div className="bg-[#F8F9FA] font-sans text-[#0F172A] antialiased">
      <div className="relative flex h-auto min-h-screen w-full flex-col mx-auto overflow-x-hidden border-x border-gray-200 bg-white shadow-xl">
        <div className="sticky top-0 z-50 bg-white border-b border-gray-100">
          <div className="max-w-screen-xl mx-auto">
            <div className="flex items-center p-4 justify-between">
              <div className="w-10"></div>
              <h1 className="text-[#0F172A] text-lg font-bold leading-tight tracking-tight text-center">Minha Agenda 1:1</h1>
              <div className="flex w-10 items-center justify-end">
                <Bell className="text-[#0F172A] w-6 h-6" />
              </div>
            </div>
            <div className="calendar-strip flex overflow-x-auto gap-3 px-4 pb-4 no-scrollbar">
            <div className="flex flex-col items-center justify-center min-w-[50px] h-16 rounded-xl bg-gray-50 border border-gray-100">
              <span className="text-[10px] uppercase font-bold text-gray-400">Seg</span>
              <span className="text-lg font-bold">12</span>
            </div>
            <div className="flex flex-col items-center justify-center min-w-[50px] h-16 rounded-xl bg-[#C6A75E] text-white shadow-lg shadow-[#C6A75E]/20">
              <span className="text-[10px] uppercase font-bold opacity-80">Ter</span>
              <span className="text-lg font-bold">13</span>
            </div>
            <div className="flex flex-col items-center justify-center min-w-[50px] h-16 rounded-xl bg-gray-50 border border-gray-100">
              <span className="text-[10px] uppercase font-bold text-gray-400">Qua</span>
              <span className="text-lg font-bold">14</span>
            </div>
            <div className="flex flex-col items-center justify-center min-w-[50px] h-16 rounded-xl bg-gray-50 border border-gray-100">
              <span className="text-[10px] uppercase font-bold text-gray-400">Qui</span>
              <span className="text-lg font-bold">15</span>
            </div>
            <div className="flex flex-col items-center justify-center min-w-[50px] h-16 rounded-xl bg-gray-50 border border-gray-100">
              <span className="text-[10px] uppercase font-bold text-gray-400">Sex</span>
              <span className="text-lg font-bold">16</span>
            </div>
            <div className="flex flex-col items-center justify-center min-w-[50px] h-16 rounded-xl bg-gray-50 border border-gray-100">
              <span className="text-[10px] uppercase font-bold text-gray-400">Sáb</span>
              <span className="text-lg font-bold">17</span>
            </div>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="max-w-screen-xl mx-auto">
            <div className="px-4 py-4">
              <div className="relative w-full h-40 rounded-2xl overflow-hidden border border-gray-200 shadow-md group map-mesh">
                <div className="absolute inset-0">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-lg"></div>
                  <div className="absolute top-1/3 right-1/4 w-8 h-8 bg-[#C6A75E]/30 rounded-full border border-[#C6A75E]/50 flex items-center justify-center text-[10px] font-bold text-[#0F172A]">5</div>
                  <div className="absolute bottom-1/3 left-1/4 w-10 h-10 bg-[#C6A75E]/30 rounded-full border border-[#C6A75E]/50 flex items-center justify-center text-[10px] font-bold text-[#0F172A]">12</div>
                </div>
                <div className="absolute inset-0 p-3 flex flex-col justify-between bg-gradient-to-t from-black/40 to-transparent">
                  <div className="flex justify-start">
                    <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white/95 rounded-full shadow-sm">
                      <Compass className="text-[#C6A75E] w-4 h-4" />
                      <span className="text-[11px] font-bold text-[#0F172A] uppercase tracking-wider">Membros próximos</span>
                    </div>
                  </div>
                  <button className="w-full bg-[#C6A75E] hover:bg-[#C6A75E]/90 text-white h-11 rounded-xl flex items-center justify-center gap-2 text-sm font-bold shadow-lg transition-transform active:scale-95">
                    <MapIcon className="w-5 h-5" />
                    <span>ABRIR MAPA COMPLETO</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="px-4 pb-24">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-[#0F172A] text-md font-bold uppercase tracking-wider text-xs">Próximos Encontros</h3>
                <span className="text-[11px] font-bold text-[#C6A75E]">Ver todos</span>
              </div>
              <div className="space-y-4">
                <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2 text-[#C6A75E]">
                      <Clock className="w-4.5 h-4.5" />
                      <span className="text-sm font-bold">10:30 - 11:30</span>
                    </div>
                    <div className="flex items-center gap-1 bg-orange-50 px-2 py-1 rounded-md">
                      <Coffee className="text-orange-600 w-3.5 h-3.5" />
                      <span className="text-[10px] font-bold text-orange-700 uppercase">Café Presencial</span>
                    </div>
                  </div>
                  <div className="flex gap-4 items-center mb-4">
                    <div 
                      className="w-14 h-14 rounded-full bg-center bg-cover border-2 border-white shadow-sm" 
                      style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuB3ggNNXyAwZRmYWLx0HBXHwJDZZYVReHyXSMtS7CWpIhnQ9DLg1E6WzY9kAk4Unf2CU_SacjMl1BdwcTI9fQAUeOEcEfvwgs9nG1TABhofLWpGP7kZC79lXWwfE5O61oDfVlhr7a222Q5H2Odk25JscEOwe2TQuipqLUyIRHXKu2T5LQQYioQhxrpG-IwFsiSP1RXOgU9ZktUTlhUSoCmNCwMgBmtd3LJ7fhyluKYc9ap5J90BSl2wdhZW6yT1lRyKRPWXC2jMTOM')" }}
                    ></div>
                    <div className="flex-1">
                      <h4 className="text-[#0F172A] font-bold text-base">Ricardo Almeida</h4>
                      <p className="text-gray-500 text-xs">CEO na Global Investments</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 pt-3 border-t border-gray-50">
                    <MapPin className="text-gray-400 w-4.5 h-4.5" />
                    <span className="text-xs text-gray-600">Skye Bar, São Paulo - SP</span>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2 text-[#C6A75E]">
                      <Clock className="w-4.5 h-4.5" />
                      <span className="text-sm font-bold">14:00 - 15:00</span>
                    </div>
                    <div className="flex items-center gap-1 bg-blue-50 px-2 py-1 rounded-md">
                      <Video className="text-blue-600 w-3.5 h-3.5" />
                      <span className="text-[10px] font-bold text-blue-700 uppercase">Reunião Online</span>
                    </div>
                  </div>
                  <div className="flex gap-4 items-center mb-4">
                    <div 
                      className="w-14 h-14 rounded-full bg-center bg-cover border-2 border-white shadow-sm" 
                      style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBixGnEGOIhiBY20ZaHdjTRRuy1VZnWX8h_O1mImWCNLs9s9exvXHOkhHrga3es6P9fEtNzosLLZPRefngW049zQDq_8xO6-u83tnsHbVuPJpRaSMGKMsTkBxvdE2ovIDJg5rWCodY8kvOJKTmmqi-dImQS9Wz0On_l4IDPcmpY-jsvU0SaUuDE2d4AZIaV_aWqPdWwdKnnk92V8netOat9If6BdLe3YfnC2gH7LOHgx_TAmGlGMq85v_jNhiIa9h2xLAk388wXs0k')" }}
                    ></div>
                    <div className="flex-1">
                      <h4 className="text-[#0F172A] font-bold text-base">Mariana Esteves</h4>
                      <p className="text-gray-500 text-xs">CTO na Inovação Digital</p>
                    </div>
                  </div>
                  <button className="w-full bg-[#0F172A] text-white h-10 rounded-xl flex items-center justify-center gap-2 text-sm font-bold mt-2">
                    <Video className="w-4.5 h-4.5" />
                    <span>Entrar na Chamada</span>
                  </button>
                </div>

                <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm opacity-80">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2 text-[#C6A75E]">
                      <Clock className="w-4.5 h-4.5" />
                      <span className="text-sm font-bold">16:30 - 17:30</span>
                    </div>
                    <div className="flex items-center gap-1 bg-orange-50 px-2 py-1 rounded-md">
                      <Coffee className="text-orange-600 w-3.5 h-3.5" />
                      <span className="text-[10px] font-bold text-orange-700 uppercase">Café Presencial</span>
                    </div>
                  </div>
                  <div className="flex gap-4 items-center mb-4">
                    <div 
                      className="w-14 h-14 rounded-full bg-center bg-cover border-2 border-white shadow-sm" 
                      style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDgGtLjsvVT6w7nDZdhJANcDwkJ33R9iV6KE7TAbO3VD0dv9wbHlwnYJVEpLgYatD1xdxZyfh5Hj05M3tbAYy8AZZwnjHwYBs5GWXmk4mUHUO9MTXUxYegy12Kfjhni9H5CEuz4Lb4Tnn_qPZL1V11uNK7rmBZ0iqSNhZ5EMNNmZjvhejMouECQJUy3He3hAiiZZpG6ebm-IIVpx_9AmkCFW2HDDgh1w8yE1wdArOF42X9knvgK_Jeov0S2wBhhgo75uRM0FSBKNYg')" }}
                    ></div>
                    <div className="flex-1">
                      <h4 className="text-[#0F172A] font-bold text-base">Carlos Eduardo</h4>
                      <p className="text-gray-500 text-xs">Head of Operations | LogiTech</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 pt-3 border-t border-gray-50">
                    <MapPin className="text-gray-400 w-4.5 h-4.5" />
                    <span className="text-xs text-gray-600">Club Co-Working, Av. Paulista</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <BottomNav />
      </div>
      <style>{`
        .calendar-strip::-webkit-scrollbar { display: none; }
        .calendar-strip { -ms-overflow-style: none; scrollbar-width: none; }
        .map-mesh {
            background-color: #e2e8f0;
            background-image: radial-gradient(#94a3b8 1px, transparent 1px);
            background-size: 20px 20px;
        }
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
