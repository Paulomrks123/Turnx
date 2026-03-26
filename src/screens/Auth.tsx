import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, User, Building2, Briefcase, ArrowRight, Linkedin, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';

export function Auth() {
  const [authType, setAuthType] = useState<'login' | 'register' | 'reset'>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const navigate = useNavigate();

  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [company, setCompany] = useState('');
  const [role, setRole] = useState('');

  const isSupabaseConfigured = import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY;

  const handleLogin = async () => {
    if (!isSupabaseConfigured) {
      throw new Error('Supabase não está configurado. Por favor, adicione as chaves VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY nas configurações do projeto.');
    }
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    navigate('/home');
  };

  const handleRegister = async () => {
    if (!isSupabaseConfigured) {
      throw new Error('Supabase não está configurado. Por favor, adicione as chaves VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY nas configurações do projeto.');
    }

    // Basic validation
    const errors: Record<string, string> = {};
    if (!fullName) errors.fullName = 'Nome completo é obrigatório';
    if (!company) errors.company = 'Empresa é obrigatória';
    if (!role) errors.role = 'Cargo é obrigatório';
    if (!email) errors.email = 'Email é obrigatório';
    if (!password) errors.password = 'Senha é obrigatória';
    else if (password.length < 6) errors.password = 'A senha deve ter pelo menos 6 caracteres';

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      throw new Error('Por favor, revise os dados destacados em vermelho.');
    }

    // 1. Sign up user
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (authError) {
      if (authError.message.includes('already registered') || authError.message.includes('User already exists')) {
        setAuthType('login');
        setError('Esta conta já existe. Por favor, faça login.');
        return;
      }
      throw authError;
    }

    if (authData.user) {
      // 2. Create profile in 'profiles' table
      const { error: profileError } = await supabase
        .from('profiles')
        .insert([
          {
            id: authData.user.id,
            full_name: fullName,
            company: company,
            role: role,
            email: email,
          },
        ]);

      if (profileError) {
        console.error('Erro ao criar perfil:', profileError);
        // Even if profile creation fails, the user is registered. 
        // We might want to handle this more gracefully, but for now we'll just log it.
      }
    }

    // After registration, log them in or show success
    setAuthType('login');
    setError('Cadastro realizado com sucesso! Por favor, faça login.');
  };

  const handleResetPassword = async () => {
    if (!email) {
      setFieldErrors({ email: 'Email é obrigatório para recuperação' });
      throw new Error('Por favor, insira seu email.');
    }

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth?type=recovery`,
    });

    if (error) throw error;

    setError('Email de recuperação enviado! Verifique sua caixa de entrada.');
    setAuthType('login');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setFieldErrors({});

    try {
      if (authType === 'login') {
        await handleLogin();
      } else if (authType === 'register') {
        await handleRegister();
      } else {
        await handleResetPassword();
      }
    } catch (err: any) {
      setError(err.message || 'Ocorreu um erro inesperado.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white min-h-screen transition-colors duration-200 font-sans">
      <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden">
        <div className="max-w-screen-xl mx-auto px-4 py-3 pt-6">
          <div 
            className="w-full relative bg-center bg-no-repeat bg-cover flex flex-col justify-end overflow-hidden rounded-xl min-h-[220px] shadow-sm max-w-2xl mx-auto" 
            style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBn3rX9fRxdT_P56gSXpCOXcytOXdO_CArG6pzl_nn3FXO1vCcLblqOtzqHNG6pKJqqEEQJr9OLnGfdLK9mP7f1ckoDpDJEEcwI3DB_Z_bxOxR3fo5-OrS2sob7lEjNht5Vel2A1xJYR5UfIfj6j5gMBpv-o-wvjGSF5TQWSjci2FxvST5R65Q9lvRr03lLbJSYOEizkOtrq67VKeeUJGTH0gOZhxHnr-ND36wwFNbICEHz4W78zkzsr8YtDR9BjTvlpWUZhtVXSks')" }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div className="relative z-10 p-6">
              <div className="flex items-center gap-2 mb-2">
                <div className="bg-[#C6A75E] p-1 rounded">
                  <Linkedin className="text-white w-5 h-5" />
                </div>
                <span className="text-white text-lg font-bold tracking-wide uppercase">TurnX</span>
              </div>
              <h2 className="text-white text-3xl font-bold leading-tight tracking-tight">
                {authType === 'login' ? 'Bem-vindo de volta' : 'Conecte-se com Líderes da Indústria'}
              </h2>
            </div>
          </div>
        </div>

        <div className="max-w-md mx-auto w-full px-4 py-2">
          <div className="flex h-12 w-full items-center justify-center rounded-xl bg-gray-100 p-1">
            <button
              onClick={() => { setAuthType('login'); setError(null); setFieldErrors({}); }}
              className={`flex h-full grow items-center justify-center rounded-lg text-sm font-medium transition-all duration-200 ${
                authType === 'login' ? 'bg-white text-[#161512] shadow-sm' : 'text-[#817a6a]'
              }`}
            >
              Entrar
            </button>
            <button
              onClick={() => { setAuthType('register'); setError(null); setFieldErrors({}); }}
              className={`flex h-full grow items-center justify-center rounded-lg text-sm font-medium transition-all duration-200 ${
                authType === 'register' ? 'bg-white text-[#161512] shadow-sm' : 'text-[#817a6a]'
              }`}
            >
              Cadastrar
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="max-w-md mx-auto w-full flex flex-col flex-1 px-4 py-2 space-y-4">
          {authType === 'reset' && (
            <div className="mb-2">
              <button 
                type="button" 
                onClick={() => setAuthType('login')}
                className="text-[#C6A75E] text-sm font-bold flex items-center gap-1"
              >
                ← Voltar para login
              </button>
              <h3 className="text-[#161512] text-xl font-bold mt-4">Recuperar Senha</h3>
              <p className="text-[#817a6a] text-sm mt-1">Enviaremos um link de recuperação para o seu email.</p>
            </div>
          )}
          {!isSupabaseConfigured && (
            <div className="p-4 rounded-xl text-sm bg-amber-50 text-amber-800 border border-amber-200">
              <p className="font-bold mb-1">Configuração Necessária</p>
              <p>Por favor, adicione as chaves <strong>VITE_SUPABASE_URL</strong> e <strong>VITE_SUPABASE_ANON_KEY</strong> no menu <strong>Settings</strong> do AI Studio para habilitar o banco de dados.</p>
            </div>
          )}

          {error && (
            <div className={`p-4 rounded-xl text-sm ${error.includes('sucesso') ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
              {error}
            </div>
          )}

          {authType === 'register' && (
            <>
              <div className="flex flex-col gap-1">
                <label className={`flex w-full items-center rounded-xl border ${fieldErrors.fullName ? 'border-red-500 bg-red-50' : 'border-[#e3e2dd] bg-white'} px-4 h-14 focus-within:border-[#C6A75E] focus-within:ring-1 focus-within:ring-[#C6A75E] transition-all`}>
                  <User className={`${fieldErrors.fullName ? 'text-red-500' : 'text-[#817a6a]'} mr-3 w-5 h-5`} />
                  <input 
                    className="flex-1 bg-transparent border-none p-0 text-[#161512] placeholder:text-[#817a6a] focus:ring-0 text-base font-normal" 
                    placeholder="Nome Completo" 
                    type="text" 
                    value={fullName}
                    onChange={(e) => { setFullName(e.target.value); if(fieldErrors.fullName) setFieldErrors({...fieldErrors, fullName: ''}); }}
                  />
                </label>
                {fieldErrors.fullName && <span className="text-red-500 text-xs ml-1 font-medium">{fieldErrors.fullName}</span>}
              </div>
              <div className="flex flex-col gap-1">
                <label className={`flex w-full items-center rounded-xl border ${fieldErrors.company ? 'border-red-500 bg-red-50' : 'border-[#e3e2dd] bg-white'} px-4 h-14 focus-within:border-[#C6A75E] focus-within:ring-1 focus-within:ring-[#C6A75E] transition-all`}>
                  <Building2 className={`${fieldErrors.company ? 'text-red-500' : 'text-[#817a6a]'} mr-3 w-5 h-5`} />
                  <input 
                    className="flex-1 bg-transparent border-none p-0 text-[#161512] placeholder:text-[#817a6a] focus:ring-0 text-base font-normal" 
                    placeholder="Nome da Empresa" 
                    type="text" 
                    value={company}
                    onChange={(e) => { setCompany(e.target.value); if(fieldErrors.company) setFieldErrors({...fieldErrors, company: ''}); }}
                  />
                </label>
                {fieldErrors.company && <span className="text-red-500 text-xs ml-1 font-medium">{fieldErrors.company}</span>}
              </div>
              <div className="flex flex-col gap-1">
                <label className={`flex w-full items-center rounded-xl border ${fieldErrors.role ? 'border-red-500 bg-red-50' : 'border-[#e3e2dd] bg-white'} px-4 h-14 focus-within:border-[#C6A75E] focus-within:ring-1 focus-within:ring-[#C6A75E] transition-all`}>
                  <Briefcase className={`${fieldErrors.role ? 'text-red-500' : 'text-[#817a6a]'} mr-3 w-5 h-5`} />
                  <input 
                    className="flex-1 bg-transparent border-none p-0 text-[#161512] placeholder:text-[#817a6a] focus:ring-0 text-base font-normal" 
                    placeholder="Cargo Atual" 
                    type="text" 
                    value={role}
                    onChange={(e) => { setRole(e.target.value); if(fieldErrors.role) setFieldErrors({...fieldErrors, role: ''}); }}
                  />
                </label>
                {fieldErrors.role && <span className="text-red-500 text-xs ml-1 font-medium">{fieldErrors.role}</span>}
              </div>
            </>
          )}

          <div className="flex flex-col gap-1">
            <label className={`flex w-full items-center rounded-xl border ${fieldErrors.email ? 'border-red-500 bg-red-50' : 'border-[#e3e2dd] bg-white'} px-4 h-14 focus-within:border-[#C6A75E] focus-within:ring-1 focus-within:ring-[#C6A75E] transition-all`}>
              <Mail className={`${fieldErrors.email ? 'text-red-500' : 'text-[#817a6a]'} mr-3 w-5 h-5`} />
              <input 
                className="flex-1 bg-transparent border-none p-0 text-[#161512] placeholder:text-[#817a6a] focus:ring-0 text-base font-normal" 
                placeholder="Email Corporativo" 
                type="email" 
                value={email}
                onChange={(e) => { setEmail(e.target.value); if(fieldErrors.email) setFieldErrors({...fieldErrors, email: ''}); }}
              />
            </label>
            {fieldErrors.email && <span className="text-red-500 text-xs ml-1 font-medium">{fieldErrors.email}</span>}
          </div>

          {authType !== 'reset' && (
            <div className="flex flex-col gap-1">
              <label className={`flex w-full items-center rounded-xl border ${fieldErrors.password ? 'border-red-500 bg-red-50' : 'border-[#e3e2dd] bg-white'} px-4 h-14 focus-within:border-[#C6A75E] focus-within:ring-1 focus-within:ring-[#C6A75E] transition-all`}>
                <Lock className={`${fieldErrors.password ? 'text-red-500' : 'text-[#817a6a]'} mr-3 w-5 h-5`} />
                <input 
                  className="flex-1 bg-transparent border-none p-0 text-[#161512] placeholder:text-[#817a6a] focus:ring-0 text-base font-normal" 
                  placeholder="Senha" 
                  type={showPassword ? "text" : "password"} 
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); if(fieldErrors.password) setFieldErrors({...fieldErrors, password: ''}); }}
                />
                <button 
                  className="text-[#817a6a] hover:text-[#C6A75E] transition-colors focus:outline-none" 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </label>
              {fieldErrors.password && <span className="text-red-500 text-xs ml-1 font-medium">{fieldErrors.password}</span>}
            </div>
          )}

          <div className="h-2"></div>
          
          <button 
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-[#C6A75E] hover:bg-[#b09552] text-white font-semibold h-14 text-base shadow-md transition-colors duration-200 flex items-center justify-center gap-2 disabled:opacity-70"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                {authType === 'login' ? 'Entrar' : authType === 'register' ? 'Aderir à Rede' : 'Enviar Link de Recuperação'}
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>

          {authType === 'login' && (
            <div className="text-center">
              <button 
                type="button" 
                onClick={() => setAuthType('reset')}
                className="text-[#334155] text-sm font-medium hover:underline"
              >
                Esqueci minha senha
              </button>
            </div>
          )}

          <div className="relative py-4 flex items-center justify-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative bg-white px-4 text-sm text-[#817a6a]">Ou continue com</div>
          </div>

          <button 
            className="w-full rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-[#161512] font-medium h-14 text-base transition-colors duration-200 flex items-center justify-center gap-3" 
            type="button"
          >
            <Linkedin className="w-5 h-5 text-[#0077b5]" />
            LinkedIn
          </button>

          <div className="mt-6 text-center">
            <p className="text-xs text-[#817a6a]">
              Ao {authType === 'login' ? 'entrar' : 'aderir'}, você concorda com nossos 
              <button type="button" className="text-[#C6A75E] hover:underline ml-1">Termos de Serviço</button> e 
              <button type="button" className="text-[#C6A75E] hover:underline ml-1">Política de Privacidade</button>.
            </p>
          </div>
        </form>
        <div className="h-8"></div>
      </div>
    </div>
  );
}
