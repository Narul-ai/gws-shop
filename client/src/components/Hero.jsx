import React from 'react';

export const Hero = ({ onOpenFastOrder }) => {
  return (
    <section className="relative h-[440px] overflow-hidden rounded-b-3xl shadow-xl">
      <img 
        src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1000&auto=format&fit=crop" 
        alt="GWS New Collection" 
        className="w-full h-full object-cover object-center transform hover:scale-105 transition duration-700" 
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#2A1C16]/90 via-[#2A1C16]/30 to-transparent flex flex-col justify-end p-6 text-white">
        <span className="text-xs uppercase tracking-[0.3em] font-medium text-[#E6D9CF] mb-1">Новая коллекция 2026</span>
        <h1 className="font-serif text-3xl font-bold leading-tight mb-2">Подчеркните свою индивидуальность</h1>
        <p className="text-xs text-[#F5EFEA] font-light mb-5 max-w-[280px]">Премиальные ткани, идеальные лекала и трендовый стиль для всех девушек.</p>
        
        <div className="flex items-center gap-3">
          <a href="#catalog" className="flex-1 bg-white text-[#2A1C16] text-center py-3 rounded-full text-xs font-semibold tracking-wider uppercase shadow-lg hover:bg-[#F5EFEA] transition">
            Смотреть каталог
          </a>
          <button onClick={() => onOpenFastOrder('Консультация со стилистом')} className="px-4 py-3 bg-[#9E7764]/80 backdrop-blur-md rounded-full text-white text-xs font-medium hover:bg-[#9E7764] transition">
            ✨ Подбор размера
          </button>
        </div>
      </div>
    </section>
  );
};