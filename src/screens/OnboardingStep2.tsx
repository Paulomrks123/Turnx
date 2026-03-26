import { useState, useEffect } from 'react';
import { ArrowRight, Handshake } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';

const carouselImages = [
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCnvKj1GE0lkNEeT5XOJVzZ8uS7CHl4LJlhWy5aYOOrk1uk735gOIIPiVnK4o_0TV6TuPD2ZSva2JoQHjLDE88reuBRZiceLXdcSV09HCWTKfZUJiGanAzyvrfBLRD0KoESUM5u1n_Ii0UD0wKg-I4CULzsooF8CNQoHVM6kxNyB_MMJyu-wUcbrflQcnyLS4Hpenf8FbK0Dvz26bCiW7QxQv9YrsnVmZH4MEwLzjqrA6tvXGqFZnQGujJBRnnekHhmjRdSS4tIlak',
  'https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800'
];

const titleWords = ['Valor Real', 'Resultados', 'Impacto'];

export function OnboardingStep2() {
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  useEffect(() => {
    const imageInterval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % carouselImages.length);
    }, 5000);

    const wordInterval = setInterval(() => {
      setCurrentWordIndex((prev) => (prev + 1) % titleWords.length);
    }, 3000);

    return () => {
      clearInterval(imageInterval);
      clearInterval(wordInterval);
    };
  }, []);

  return (
    <div className="relative flex h-full min-h-screen w-full flex-col bg-[#f8f7f6] font-sans overflow-hidden selection:bg-[#c6a85d]/30">
      <div className="h-2 w-full"></div>
      
      <div className="flex items-center justify-end px-6 py-4 z-10">
        <button 
          onClick={() => navigate('/auth')}
          className="text-slate-500 text-sm font-semibold tracking-wide hover:text-[#0F172A] transition-colors"
        >
          Pular
        </button>
      </div>
      
      <div className="flex-1 flex flex-col items-center justify-center px-6 pb-8 max-w-screen-xl mx-auto w-full">
        <div className="w-full aspect-[4/3] relative mb-10 group max-w-2xl mx-auto">
          <div className="absolute inset-0 bg-gradient-to-tr from-gray-200 to-transparent rounded-2xl transform rotate-3 scale-95 opacity-60"></div>
          
          <div className="relative w-full h-full bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentImageIndex}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 1, ease: "easeInOut" }}
                className="absolute inset-0 bg-center bg-no-repeat bg-cover"
                style={{ backgroundImage: `url("${carouselImages[currentImageIndex]}")` }}
              >
                <div className="absolute inset-0 bg-[#0F172A]/10 mix-blend-overlay"></div>
              </motion.div>
            </AnimatePresence>
            
            {/* Ecosystem Motion Overlay */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 400 400">
                <motion.circle
                  cx="150" cy="100" r="2" fill="#c6a85d"
                  animate={{ x: [0, -30, 0], y: [0, 20, 0] }}
                  transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.circle
                  cx="250" cy="250" r="2" fill="#c6a85d"
                  animate={{ x: [20, -20, 20], y: [-10, 10, -10] }}
                  transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.path
                  d="M150,100 L250,250"
                  stroke="#c6a85d"
                  strokeWidth="0.5"
                  fill="none"
                  animate={{ opacity: [0.1, 0.4, 0.1] }}
                  transition={{ duration: 6, repeat: Infinity }}
                />
              </svg>
            </div>
            
            <div className="absolute bottom-4 right-4 bg-white p-3 rounded-xl shadow-lg border border-gray-100 flex items-center justify-center z-10">
              <Handshake className="text-[#c6a85d] w-6 h-6" />
            </div>
          </div>
        </div>
        
        <div className="flex flex-col items-center w-full text-center space-y-4">
          <h1 className="text-[#0F172A] text-3xl sm:text-4xl font-extrabold leading-tight tracking-tight min-h-[130px] flex flex-col items-center justify-center w-full max-w-[90%] mx-auto">
            <span className="block">Gerar</span>
            <div className="relative h-[55px] w-full overflow-hidden mt-1">
              <AnimatePresence mode="wait">
                <motion.span
                  key={currentWordIndex}
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -30, opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0 flex items-center justify-center text-[#c6a85d] whitespace-nowrap px-2"
                >
                  {titleWords[currentWordIndex]}
                </motion.span>
              </AnimatePresence>
            </div>
          </h1>
          <p className="text-slate-600 text-sm sm:text-base font-normal leading-relaxed max-w-md">
            Vá além dos cartões de visita. Acesse fluxo de negócios exclusivo e conecte-se com líderes prontos para executar.
          </p>
        </div>
      </div>
      
      <div className="w-full px-6 pb-10 pt-4 flex flex-col items-center space-y-8 bg-[#f8f7f6] z-10 max-w-md mx-auto">
        <div className="flex flex-row items-center justify-center gap-2">
          <div className="h-1.5 w-1.5 rounded-full bg-gray-300"></div>
          <div className="h-1.5 w-8 rounded-full bg-[#c6a85d] transition-all duration-300"></div>
          <div className="h-1.5 w-1.5 rounded-full bg-gray-300"></div>
          <div className="h-1.5 w-1.5 rounded-full bg-gray-300"></div>
        </div>
        
        <button 
          onClick={() => navigate('/onboarding-3')}
          className="w-full rounded-full bg-[#c6a85d] h-12 flex items-center justify-center gap-2 hover:bg-[#b0944e] active:scale-[0.98] transition-all shadow-md"
        >
          <span className="text-white text-base font-bold tracking-wide">Próximo</span>
          <ArrowRight className="text-white w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
