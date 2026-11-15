import React from 'react';
import { MapPin, Clock, Phone, Sparkles, ArrowRight } from 'lucide-react';

export const ShowroomBanner = ({ onOpenFastOrder }) => {
  return (
    <section className="py-6">
      <div className="bg-[#2A1C16] text-white rounded-3xl md:rounded-[2rem] p-6 sm:p-10 lg:p-12 relative overflow-hidden shadow-xl border border-[#4A3328]">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          
          {/* Левая часть: Текст и контакты */}
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-1.5 bg-[#4A3328]/80 px-3.5 py-1.5 rounded-full text-xs text-[#E6D9CF] border border-[#845E4C]/50 shadow-2xs">
              <Sparkles size={14} className="text-amber-300" /> 
              <span>Атмосферное пространство</span>
            </div>
            
            <h3 className="font-serif text-3xl sm:text-4xl font-bold leading-tight">
              Шоурум женской одежды в сердце Астаны
            </h3>
            
            <p className="text-xs sm:text-sm text-[#F5EFEA]/85 font-light leading-relaxed max-w-xl">
              Приходите на чашку ароматного кофе, примерьте новые трендовые образы и капсулы под руководством персонального стилиста в уютной обстановке.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 pb-2 text-xs text-[#E6D9CF]">
              <div className="flex items-center gap-2.5 bg-white/5 p-3 rounded-xl border border-white/10">
                <MapPin size={18} className="text-[#B89685] flex-shrink-0" />
                <span>пр. Мангилик Ел (Бутик GWS)</span>
              </div>
              <div className="flex items-center gap-2.5 bg-white/5 p-3 rounded-xl border border-white/10">
                <Clock size={18} className="text-[#B89685] flex-shrink-0" />
                <span>Ежедневно 10:00 – 21:00</span>
              </div>
              <div className="flex items-center gap-2.5 bg-white/5 p-3 rounded-xl border border-white/10">
                <Phone size={18} className="text-[#B89685] flex-shrink-0" />
                <span>+7 (777) 123-45-67</span>
              </div>
            </div>

            <div className="pt-2">
              <button 
                onClick={() => onOpenFastOrder('Запись на примерку в шоуруме с кофе')} 
                className="bg-[#B89685] hover:bg-[#9E7764] text-white font-semibold px-8 py-4 rounded-full text-xs uppercase tracking-wider transition shadow-lg active:scale-95 flex items-center gap-2 cursor-pointer"
              >
                <span>Записаться на примерку</span>
                <ArrowRight size={15} />
              </button>
            </div>
          </div>

          {/* Правая часть: Эстетичное фото бутика на ПК */}
          <div className="lg:col-span-5 hidden lg:block">
            <div className="relative h-72 rounded-2xl overflow-hidden shadow-2xl border border-white/10">
              <img 
                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=800&auto=format&fit=crop" 
                alt="GWS Showroom Astana" 
                className="w-full h-full object-cover hover:scale-105 transition duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2A1C16]/60 via-transparent to-transparent" />
            </div>
          </div>

        </div>

        {/* Фоновые декоративные круги для премиального объема */}
        <div className="absolute -right-12 -bottom-12 w-48 h-48 bg-[#845E4C]/30 rounded-full blur-3xl pointer-events-none" />
      </div>
    </section>
  );
};