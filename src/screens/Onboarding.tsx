import { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';

const carouselImages = [
  'https://lh3.googleusercontent.com/aida-public/AB6AXuAjw-zqAgsXW6coeEKHlzgIMOI7rF4qFyuxSWxcAfljgaZ_6Sg_1T4bbv3IlcH-c_AxHbUP2Gg1u-ilfRLt_Ac-2KOT7KSb4mwpd6JG44m7qoXLf-TjATL4rR-v6m4GGa7Lu1oB0l5Fjy-F4DaeI6Mh9bpfSsY9KQ5qbq9bbw8lThugtoqAOGZ9CppWn2gbkx4ILzHYlavYZmaq4nKOaSBuB5lXg5mlrvy3K07_igaMWtLs4Fww1P3XoRaJiXRVjHTGHzo373G3UV8',
  'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800'
];

const titleWords = ['Qualificado', 'Altíssimo Nível', 'Exclusivo'];

export function Onboarding() {
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
    <div className="relative flex min-h-screen w-full flex-col bg-[#f8f7f6] font-sans">
      <div className="flex items-center p-4 pb-2 justify-end">
        <button 
          onClick={() => navigate('/auth')}
          className="flex items-center justify-end hover:opacity-80 transition-opacity"
        >
          <p className="text-[#817a6a] text-base font-bold leading-normal tracking-[0.015em] shrink-0">Pular</p>
        </button>
      </div>
      
      <div className="flex-1 flex flex-col items-center justify-center w-full max-w-screen-xl mx-auto">
        <div className="w-full px-4 py-3">
          <div className="w-full relative overflow-hidden rounded-xl min-h-[360px] max-w-2xl mx-auto shadow-sm bg-gray-100">
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
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </motion.div>
            </AnimatePresence>
            
            {/* Ecosystem Motion Overlay */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 400 400">
                <motion.circle
                  cx="100" cy="100" r="2" fill="#c6a85d"
                  animate={{ x: [0, 20, 0], y: [0, -20, 0] }}
                  transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.circle
                  cx="300" cy="150" r="2" fill="#c6a85d"
                  animate={{ x: [-10, 10, -10], y: [10, -10, 10] }}
                  transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.circle
                  cx="200" cy="300" r="2" fill="#c6a85d"
                  animate={{ x: [15, -15, 15], y: [-5, 5, -5] }}
                  transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.path
                  d="M100,100 L300,150 L200,300 Z"
                  stroke="#c6a85d"
                  strokeWidth="0.5"
                  fill="none"
                  animate={{ opacity: [0.1, 0.4, 0.1] }}
                  transition={{ duration: 8, repeat: Infinity }}
                />
                <motion.circle
                  cx="50" cy="250" r="1.5" fill="#c6a85d"
                  animate={{ opacity: [0.2, 0.8, 0.2] }}
                  transition={{ duration: 5, repeat: Infinity }}
                />
                <motion.circle
                  cx="350" cy="50" r="1.5" fill="#c6a85d"
                  animate={{ opacity: [0.2, 0.8, 0.2] }}
                  transition={{ duration: 7, repeat: Infinity }}
                />
              </svg>
            </div>
          </div>
        </div>
        
        <div className="w-full flex flex-col items-center mt-4">
          <h1 className="text-[#161512] tracking-tight text-3xl sm:text-4xl font-bold leading-tight px-4 text-center pb-3 min-h-[130px] flex flex-col items-center justify-center w-full max-w-[90%] mx-auto">
            <span className="block">Networking Executivo</span>
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
          <p className="text-[#56544e] text-sm sm:text-base font-normal leading-relaxed pb-6 pt-1 px-8 text-center max-w-md">
            Conecte-se com líderes e investidores verificados em um ecossistema privado, projetado para geração de negócios significativos.
          </p>
        </div>
      </div>
      
      <div className="w-full pb-8 pt-4 px-4 flex flex-col items-center gap-6 max-w-md mx-auto">
        <div className="flex flex-row items-center justify-center gap-2">
          <div className="h-2 w-8 rounded-full bg-[#c6a85d] transition-all duration-300"></div>
          <div className="h-2 w-2 rounded-full bg-[#e3e2dd]"></div>
          <div className="h-2 w-2 rounded-full bg-[#e3e2dd]"></div>
        </div>
        <button 
          onClick={() => navigate('/onboarding-2')}
          className="w-full rounded-full bg-[#c6a85d] h-12 flex items-center justify-center gap-2 hover:bg-[#b0944e] active:scale-[0.98] transition-all shadow-md"
        >
          <span className="text-white text-base font-bold tracking-wide">Começar</span>
          <ArrowRight className="text-white w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
