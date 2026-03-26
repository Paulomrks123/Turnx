import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ChevronLeft, 
  ShieldCheck, 
  Link as LinkIcon, 
  Send,
  Store,
  Handshake,
  User,
  PlusCircle,
  Home,
  MessageSquare,
  Loader2
} from 'lucide-react';
import { serviceService } from '../services/serviceService';
import { useAuth } from '../hooks/useAuth';
import { BottomNav } from '../components/BottomNav';

export function CreateService() {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    sector: '',
    description: '',
    indicative_value: '',
    model: '',
    support_links: ''
  });

  const handleSubmit = async () => {
    try {
      if (authLoading) return;
      if (!user) {
        navigate('/auth');
        return;
      }

      if (!formData.title || !formData.category || !formData.description) {
        alert('Preencha os campos obrigatórios');
        return;
      }

      setLoading(true);
      await serviceService.createService({
        user_id: user.id,
        title: formData.title,
        category: formData.category,
        sector: formData.sector,
        description: formData.description,
        indicative_value: formData.indicative_value,
        model: formData.model,
        support_links: formData.support_links
      });

      alert('Serviço enviado para curadoria!');
      navigate('/marketplace');
    } catch (error: any) {
      alert('Erro ao cadastrar serviço: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white font-sans text-[#1c1a0d] min-h-screen flex flex-col">
      {/* TopAppBar */}
      <header className="sticky top-0 z-10 bg-[#f8f7f6]/80 backdrop-blur-md border-b border-gray-200 safe-top">
        <div className="max-w-screen-xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => navigate(-1)}
              className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <h1 className="text-lg font-bold leading-tight tracking-tight text-[#1c1a0d]">Cadastrar Serviço</h1>
          </div>
          <div className="w-10"></div>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto pb-24 max-w-screen-xl mx-auto w-full">
        {/* Institutional Note */}
        <div className="p-4">
          <div className="flex flex-col gap-3 rounded-xl border border-[#c59f47]/30 bg-[#c59f47]/5 p-5">
            <div className="flex items-center gap-2">
              <ShieldCheck className="text-[#c59f47] w-5 h-5" />
              <p className="text-[#1c1a0d] text-base font-bold leading-tight">Nota Institucional</p>
            </div>
            <p className="text-[#9e9147] text-sm font-normal leading-relaxed">
              Serviços publicados passam por curadoria manual para garantir relevância e exclusividade à nossa rede de executivos.
            </p>
          </div>
        </div>

        <div className="space-y-2">
          {/* Service Name */}
          <div className="px-4 py-2">
            <label className="flex flex-col">
              <span className="text-[#1c1a0d] text-sm font-semibold mb-2">Nome do Serviço</span>
              <input 
                className="w-full rounded-lg border border-[#e9e5ce] bg-white text-[#1c1a0d] h-14 px-4 placeholder:text-gray-400 focus:border-[#c59f47] focus:ring-1 focus:ring-[#c59f47] outline-none transition-all" 
                placeholder="Ex: Consultoria Estratégica em M&A" 
                type="text"
                value={formData.title}
                onChange={e => setFormData({...formData, title: e.target.value})}
              />
            </label>
          </div>

          {/* Category & Sector */}
          <div className="grid grid-cols-2 gap-4 px-4">
            <div className="py-2">
              <label className="flex flex-col">
                <span className="text-[#1c1a0d] text-sm font-semibold mb-2">Categoria</span>
                <select 
                  value={formData.category}
                  onChange={e => setFormData({...formData, category: e.target.value})}
                  className="w-full rounded-lg border border-[#e9e5ce] bg-white text-[#1c1a0d] h-14 px-4 outline-none focus:border-[#c59f47] focus:ring-1 focus:ring-[#c59f47] transition-all appearance-none bg-[url('https://lh3.googleusercontent.com/aida-public/AB6AXuAaHAgoviwudxvLDozY8yuG7erpMx3eeoPJ5ZihtNUU9wdp7Uqqx_JxJ3CaLJEwy6Gzk5NVsyc6QGmX8I2FEq8VDjT3ieSl9g15Ho6peT46j8Q4I438DE2tDZCL1Xz3b-Q18AF-hEnkAiFCMN1qOFCm_o6--9e5gMGn5Evm7Aon_ndsi1hMlvHHd7WfZDi2aTkYXvgk1Tu58At7cbF6iddtmEoTLsOPM69qQAhY87rRNnHuOhJOi-28hQ3klgDWbTWPl5LayqZyJDc')] bg-no-repeat bg-[position:right_1rem_center] bg-[length:1.5rem]"
                >
                  <option value="">Selecionar</option>
                  <option value="Consultoria">Consultoria</option>
                  <option value="Jurídico">Jurídico</option>
                  <option value="Financeiro">Financeiro</option>
                  <option value="Tecnologia">Tecnologia</option>
                </select>
              </label>
            </div>
            <div className="py-2">
              <label className="flex flex-col">
                <span className="text-[#1c1a0d] text-sm font-semibold mb-2">Setor</span>
                <select 
                  value={formData.sector}
                  onChange={e => setFormData({...formData, sector: e.target.value})}
                  className="w-full rounded-lg border border-[#e9e5ce] bg-white text-[#1c1a0d] h-14 px-4 outline-none focus:border-[#c59f47] focus:ring-1 focus:ring-[#c59f47] transition-all appearance-none bg-[url('https://lh3.googleusercontent.com/aida-public/AB6AXuAaHAgoviwudxvLDozY8yuG7erpMx3eeoPJ5ZihtNUU9wdp7Uqqx_JxJ3CaLJEwy6Gzk5NVsyc6QGmX8I2FEq8VDjT3ieSl9g15Ho6peT46j8Q4I438DE2tDZCL1Xz3b-Q18AF-hEnkAiFCMN1qOFCm_o6--9e5gMGn5Evm7Aon_ndsi1hMlvHHd7WfZDi2aTkYXvgk1Tu58At7cbF6iddtmEoTLsOPM69qQAhY87rRNnHuOhJOi-28hQ3klgDWbTWPl5LayqZyJDc')] bg-no-repeat bg-[position:right_1rem_center] bg-[length:1.5rem]"
                >
                  <option value="">Selecionar</option>
                  <option value="Agronegócio">Agronegócio</option>
                  <option value="Indústria">Indústria</option>
                  <option value="Serviços">Serviços</option>
                  <option value="Varejo">Varejo</option>
                </select>
              </label>
            </div>
          </div>

          {/* Description */}
          <div className="px-4 py-2">
            <label className="flex flex-col">
              <span className="text-[#1c1a0d] text-sm font-semibold mb-2">Descrição Detalhada</span>
              <textarea 
                className="w-full rounded-lg border border-[#e9e5ce] bg-white text-[#1c1a0d] p-4 placeholder:text-gray-400 focus:border-[#c59f47] focus:ring-1 focus:ring-[#c59f47] outline-none transition-all resize-none" 
                placeholder="Descreva o escopo, metodologia e diferenciais..." 
                rows={4}
                value={formData.description}
                onChange={e => setFormData({...formData, description: e.target.value})}
              ></textarea>
            </label>
          </div>

          {/* Value and Model */}
          <div className="grid grid-cols-2 gap-4 px-4">
            <div className="py-2">
              <label className="flex flex-col">
                <span className="text-[#1c1a0d] text-sm font-semibold mb-2">Valor Indicativo</span>
                <input 
                  className="w-full rounded-lg border border-[#e9e5ce] bg-white text-[#1c1a0d] h-14 px-4 placeholder:text-gray-400 focus:border-[#c59f47] focus:ring-1 focus:ring-[#c59f47] outline-none transition-all" 
                  placeholder="R$ 50.000,00" 
                  type="text"
                  value={formData.indicative_value}
                  onChange={e => setFormData({...formData, indicative_value: e.target.value})}
                />
              </label>
            </div>
            <div className="py-2">
              <label className="flex flex-col">
                <span className="text-[#1c1a0d] text-sm font-semibold mb-2">Modelo</span>
                <select 
                  value={formData.model}
                  onChange={e => setFormData({...formData, model: e.target.value})}
                  className="w-full rounded-lg border border-[#e9e5ce] bg-white text-[#1c1a0d] h-14 px-4 outline-none focus:border-[#c59f47] focus:ring-1 focus:ring-[#c59f47] transition-all appearance-none bg-[url('https://lh3.googleusercontent.com/aida-public/AB6AXuAaHAgoviwudxvLDozY8yuG7erpMx3eeoPJ5ZihtNUU9wdp7Uqqx_JxJ3CaLJEwy6Gzk5NVsyc6QGmX8I2FEq8VDjT3ieSl9g15Ho6peT46j8Q4I438DE2tDZCL1Xz3b-Q18AF-hEnkAiFCMN1qOFCm_o6--9e5gMGn5Evm7Aon_ndsi1hMlvHHd7WfZDi2aTkYXvgk1Tu58At7cbF6iddtmEoTLsOPM69qQAhY87rRNnHuOhJOi-28hQ3klgDWbTWPl5LayqZyJDc')] bg-no-repeat bg-[position:right_1rem_center] bg-[length:1.5rem]"
                >
                  <option value="">Selecionar</option>
                  <option value="Projeto Fixo">Projeto Fixo</option>
                  <option value="Success Fee">Success Fee</option>
                  <option value="Retainer">Retainer</option>
                  <option value="Híbrido">Híbrido</option>
                </select>
              </label>
            </div>
          </div>

          {/* Support Links */}
          <div className="px-4 py-2">
            <label className="flex flex-col">
              <div className="flex justify-between items-center mb-2">
                <span className="text-[#1c1a0d] text-sm font-semibold">Links de Apoio</span>
                <span className="text-xs text-gray-500 font-normal">Opcional</span>
              </div>
              <div className="relative">
                <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input 
                  className="w-full rounded-lg border border-[#e9e5ce] bg-white text-[#1c1a0d] h-14 pl-11 pr-4 placeholder:text-gray-400 focus:border-[#c59f47] focus:ring-1 focus:ring-[#c59f47] outline-none transition-all" 
                  placeholder="https://seuportfolio.com.br" 
                  type="url"
                  value={formData.support_links}
                  onChange={e => setFormData({...formData, support_links: e.target.value})}
                />
              </div>
            </label>
          </div>
        </div>

        {/* Submit Button Section */}
        <div className="p-6 mt-4">
          <button 
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-[#c59f47] hover:bg-[#c59f47]/90 text-[#1c1a0d] font-bold py-4 px-6 rounded-xl shadow-lg shadow-[#c59f47]/20 transition-all active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                <span>Enviar para Curadoria</span>
                <Send className="w-5 h-5" />
              </>
            )}
          </button>
          <p className="text-center text-xs text-gray-500 mt-4 leading-relaxed">
            Ao enviar, você concorda com nossos termos de conduta para prestadores de serviço do ecossistema.
          </p>
        </div>
      </main>

      <BottomNav />
    </div>
  );
}
