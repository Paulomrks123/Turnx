import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ChevronLeft, 
  CheckCircle, 
  Clock, 
  Briefcase, 
  FileText, 
  Send, 
  AlertCircle, 
  Edit3, 
  Plus
} from 'lucide-react';
import { BottomNav } from '../components/BottomNav';

export function MyServices() {
  const navigate = useNavigate();

  return (
    <div className="bg-[#f8f7f6] font-sans text-[#111418] min-h-screen">
      <div className="relative flex h-auto min-h-screen w-full mx-auto flex-col bg-white overflow-x-hidden shadow-2xl">
        {/* TopAppBar (iOS Style) */}
        <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-gray-100">
          <div className="max-w-screen-xl mx-auto flex items-center p-4 pb-2 justify-between">
            <button 
              onClick={() => navigate(-1)}
              className="text-[#111418] flex size-10 shrink-0 items-center justify-start cursor-pointer"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <h2 className="text-[#111418] text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center pr-10">Meus Serviços</h2>
          </div>
        </div>

        <div className="max-w-screen-xl mx-auto w-full flex-1">
          {/* Stats Section */}
          <div className="flex flex-wrap gap-3 p-4">
          <div className="flex min-w-[140px] flex-1 flex-col gap-1 rounded-xl p-4 border border-[#dbe0e6] bg-white">
            <p className="text-[#617289] text-xs font-medium uppercase tracking-wider">Aprovados</p>
            <div className="flex items-center gap-2">
              <p className="text-[#111418] tracking-tight text-2xl font-bold leading-tight text-green-600">12</p>
              <CheckCircle className="text-green-600 w-4 h-4" />
            </div>
          </div>
          <div className="flex min-w-[140px] flex-1 flex-col gap-1 rounded-xl p-4 border border-[#dbe0e6] bg-white">
            <p className="text-[#617289] text-xs font-medium uppercase tracking-wider">Em análise</p>
            <div className="flex items-center gap-2">
              <p className="text-[#111418] tracking-tight text-2xl font-bold leading-tight text-[#c59f47]">03</p>
              <Clock className="text-[#c59f47] w-4 h-4" />
            </div>
          </div>
        </div>

        {/* SectionHeader */}
        <div className="px-4 pt-4 pb-2">
          <h3 className="text-[#111418] text-lg font-bold leading-tight tracking-[-0.015em]">Histórico de Submissões</h3>
          <p className="text-[#617289] text-xs mt-1">Gerencie a curadoria dos seus serviços B2B</p>
        </div>

        {/* List Items Container */}
        <div className="flex flex-col">
          {/* Item: Aprovado */}
          <div className="flex flex-col border-b border-gray-100 bg-white">
            <div className="flex items-center gap-4 px-4 min-h-[80px] py-3 justify-between">
              <div className="flex items-center gap-4">
                <div className="text-[#c59f47] flex items-center justify-center rounded-lg bg-[#c59f47]/10 shrink-0 size-12">
                  <Briefcase className="w-6 h-6" />
                </div>
                <div className="flex flex-col justify-center">
                  <p className="text-[#111418] text-base font-semibold leading-normal line-clamp-1">Consultoria Estratégica M&A</p>
                  <p className="text-[#617289] text-xs font-normal leading-normal">Enviado em 12/10/2023</p>
                </div>
              </div>
              <div className="shrink-0 flex flex-col items-end gap-1">
                <span className="px-2 py-1 rounded bg-green-100 text-green-700 text-[10px] font-bold uppercase tracking-wider">Aprovado</span>
              </div>
            </div>
          </div>

          {/* Item: Em Análise */}
          <div className="flex flex-col border-b border-gray-100 bg-white">
            <div className="flex items-center gap-4 px-4 min-h-[80px] py-3 justify-between">
              <div className="flex items-center gap-4">
                <div className="text-[#617289] flex items-center justify-center rounded-lg bg-[#f0f2f4] shrink-0 size-12">
                  <FileText className="w-6 h-6" />
                </div>
                <div className="flex flex-col justify-center">
                  <p className="text-[#111418] text-base font-semibold leading-normal line-clamp-1">Auditoria de Compliance</p>
                  <p className="text-[#617289] text-xs font-normal leading-normal">Enviado em 15/10/2023</p>
                </div>
              </div>
              <div className="shrink-0">
                <span className="px-2 py-1 rounded bg-blue-100 text-[#c59f47] text-[10px] font-bold uppercase tracking-wider">Em análise</span>
              </div>
            </div>
          </div>

          {/* Item: Enviado */}
          <div className="flex flex-col border-b border-gray-100 bg-white">
            <div className="flex items-center gap-4 px-4 min-h-[80px] py-3 justify-between">
              <div className="flex items-center gap-4">
                <div className="text-[#617289] flex items-center justify-center rounded-lg bg-[#f0f2f4] shrink-0 size-12">
                  <Send className="w-6 h-6" />
                </div>
                <div className="flex flex-col justify-center">
                  <p className="text-[#111418] text-base font-semibold leading-normal line-clamp-1">Wealth Management Advisory</p>
                  <p className="text-[#617289] text-xs font-normal leading-normal">Enviado em Hoje, 09:41</p>
                </div>
              </div>
              <div className="shrink-0">
                <span className="px-2 py-1 rounded bg-gray-100 text-gray-500 text-[10px] font-bold uppercase tracking-wider">Enviado</span>
              </div>
            </div>
          </div>

          {/* Item: Recusado */}
          <div className="flex flex-col border-b border-gray-100 bg-[#fff5f5]">
            <div className="flex flex-col px-4 py-4">
              <div className="flex items-center gap-4 justify-between mb-3">
                <div className="flex items-center gap-4">
                  <div className="text-red-500 flex items-center justify-center rounded-lg bg-red-100 shrink-0 size-12">
                    <AlertCircle className="w-6 h-6" />
                  </div>
                  <div className="flex flex-col justify-center">
                    <p className="text-[#111418] text-base font-semibold leading-normal line-clamp-1 text-red-700">Mentoria Executiva SaaS</p>
                    <p className="text-[#617289] text-xs font-normal leading-normal">Recusado em 08/10/2023</p>
                  </div>
                </div>
                <div className="shrink-0">
                  <span className="px-2 py-1 rounded bg-red-100 text-red-600 text-[10px] font-bold uppercase tracking-wider">Recusado</span>
                </div>
              </div>
              {/* Refusal Reason */}
              <div className="bg-white/60 rounded-lg p-3 mb-4 border border-red-100">
                <div className="flex gap-2">
                  <AlertCircle className="text-red-500 w-4 h-4 shrink-0 mt-0.5" />
                  <p className="text-sm text-red-800 leading-snug">Documentação fiscal incompleta. O alvará de funcionamento anexado está com a validade expirada.</p>
                </div>
              </div>
              {/* Refusal Action */}
              <button className="flex items-center justify-center gap-2 w-full py-3 bg-[#c59f47] text-white rounded-lg font-semibold text-sm shadow-sm active:scale-[0.98] transition-all">
                <Edit3 className="w-4 h-4" />
                Editar e reenviar
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Spacer */}
        <div className="h-20 bg-white"></div>
      </div>

      {/* Floating Action */}
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-full px-4 max-w-screen-xl">
          <button 
            onClick={() => navigate('/create-service')}
            className="flex items-center justify-center gap-2 w-full h-14 bg-[#111418] text-white rounded-xl font-bold shadow-lg max-w-md mx-auto"
          >
            <Plus className="w-6 h-6" />
            Novo Serviço
          </button>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
