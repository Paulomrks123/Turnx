import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';

const carouselImages = [
  'https://lh3.googleusercontent.com/aida-public/AB6AXuBz2MhfbXwe__uflhQBJsoO2xHW7pr2BF8nwKe_fxyPw1pQ5o1Csd0QmFuvL13EZJGhWR8Hxjzs3BTtKvPMjOJ_iUM6Z3B0eGYZuFjQrJKgI1CFRDPC3PXW6gL6CCGscDtUTyCss8Zxy7NmJ21dSr80MrHKSFFjKP0Ae8auiumiix8tc9SorwRsi69rIJNzrUANXn66BoPsdHIfLm_xgJh5toXCoFSudBBO2yy49HUjIhMNhx38qX4MXkB2vSiBn8FYq6PUNk_8TJw',
  'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&q=80&w=800'
];

const titleWords = ['Exclusivas', 'Premium', 'Curadas'];

export function OnboardingStep3() {
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
    <div className="relative flex h-full min-h-screen w-full flex-col bg-[#F9FAFB] font-sans overflow-hidden selection:bg-[#c6a85d]/30">
      {/* Hero Image Section (Occupies top ~60%) */}
      <div className="relative h-[60vh] w-full shrink-0 overflow-hidden max-w-screen-xl mx-auto">
        {/* Skip Button */}
        <div className="absolute top-0 right-0 z-20 p-6 pt-12">
          <button 
            onClick={() => navigate('/auth')}
            className="text-white/90 hover:text-white hover:bg-white/10 px-3 py-1 rounded-full text-sm font-medium tracking-wide transition-all backdrop-blur-sm"
          >
            Pular
          </button>
        </div>
        {/* Main Visual */}
        <AnimatePresence mode="wait">
          <motion.div 
            key={currentImageIndex}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 1 }}
            className="h-full w-full bg-cover bg-center bg-no-repeat relative" 
            style={{ backgroundImage: `url("${carouselImages[currentImageIndex]}")` }}
          >
            {/* Subtle Gradient Overlay for visual depth */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/20"></div>
          </motion.div>
        </AnimatePresence>

        {/* Ecosystem Motion Overlay */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
          <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 400 400">
            <motion.circle
              cx="50" cy="50" r="2" fill="#c6a85d"
              animate={{ x: [0, 40, 0], y: [0, 40, 0] }}
              transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.circle
              cx="350" cy="350" r="2" fill="#c6a85d"
              animate={{ x: [0, -40, 0], y: [0, -40, 0] }}
              transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.path
              d="M50,50 L350,350"
              stroke="#c6a85d"
              strokeWidth="0.5"
              fill="none"
              animate={{ opacity: [0.1, 0.4, 0.1] }}
              transition={{ duration: 10, repeat: Infinity }}
            />
          </svg>
        </div>
      </div>

      {/* Content Card Section */}
      <div className="flex-1 flex flex-col items-center bg-[#F9FAFB] w-full -mt-8 rounded-t-[32px] relative z-10 px-8 pt-10 pb-8 shadow-[0_-8px_30px_rgba(0,0,0,0.04)] max-w-2xl mx-auto">
        {/* Progress Indicators */}
        <div className="flex items-center gap-2.5 mb-8">
          <div className="h-2 w-2 rounded-full bg-gray-300"></div>
          <div className="h-2 w-2 rounded-full bg-gray-300"></div>
          {/* Active Step Indicator (Gold) */}
          <div className="h-2 w-8 rounded-full bg-[#c6a85d] transition-all duration-300"></div>
        </div>

        {/* Text Content */}
        <div className="flex flex-col items-center text-center w-full">
          <h1 className="text-[#0f172a] tracking-tight text-3xl sm:text-4xl font-bold leading-tight mb-4 min-h-[130px] flex flex-col items-center justify-center w-full max-w-[90%] mx-auto">
            <span className="block">Experiências</span>
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
          <p className="text-[#334155] text-sm sm:text-base font-normal leading-relaxed px-2 max-w-md">
            Conecte-se em eventos privados e jantares de negócios curados para a elite corporativa.
          </p>
        </div>

        {/* Spacer */}
        <div className="flex-grow"></div>

        {/* Action Buttons */}
        <div className="w-full flex flex-col gap-4 mt-6">
          {/* Primary CTA */}
          <button 
            onClick={() => navigate('/auth')}
            className="flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg h-14 px-5 bg-[#c6a85d] text-[#161512] text-base font-bold leading-normal tracking-[0.015em] hover:bg-[#d4b972] active:scale-[0.98] transition-all shadow-sm"
          >
            <span className="truncate">Entrar / Criar conta</span>
          </button>
          {/* Secondary Action */}
          <button 
            onClick={() => navigate('/home')}
            className="flex w-full cursor-pointer items-center justify-center rounded-lg h-10 px-5 text-[#334155] text-sm font-semibold hover:text-[#0f172a] transition-colors"
          >
            Navegar como visitante
          </button>
        </div>
        {/* Bottom Safe Area Spacer */}
        <div className="h-4"></div>
      </div>
    </div>
  );
}
