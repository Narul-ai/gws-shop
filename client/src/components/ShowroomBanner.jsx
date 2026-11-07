import React from 'react';
import { MapPin, Clock, Phone, Sparkles } from 'lucide-react';

export const ShowroomBanner = ({ onOpenFastOrder }) => {
  return (
    <section className="px-4 py-4">
      <div className="bg-[#2A1C16] text-white rounded-3xl p-6 relative overflow-hidden shadow-xl border border-[#4A3328]">
        <div className="relative z-10">
          <div className="inline-flex items-center gap-1.5 bg-[#4A3328]/80 px-3 py-1 rounded-full text-[11px] text-[#E6D9CF] mb-3 border border-[#845E4C]/50">
            <Sparkles size={14} className="text-amber-300" /> Атмосферное пространство
          </div>
          
          <h3 className="font-serif text-2xl font-bold mb-2">Шоурум в сердце Астаны</h3>
          <p className="text-xs text-[#F5EFEA]/80 font-light leading-relaxed mb-4">
            Приходите на чашку ароматного кофе, примерьте новые трендовые образы под руководством персонального стилиста.
          </p>

          <div className="space-y-2 text-xs text-[#E6D9CF] mb-5">
            <div className="flex items-center gap-2.5">
              <MapPin size={16} className="text-[#B89685]" /> пр. Мангилик Ел, ष् (Бутик GWS)
            </div>
            <div className="flex items-center gap-2.5">
              <Clock size={16} className="text-[#B89685]" /> Ежедневно с 10:00 до 21:00
            </div>
            <div className="flex items-center gap-2.5">
              <Phone size={16} className="text-[#B89685]" /> +7 (777) 123-45-67
            </div>
          </div>

          <button 
            onClick={() => onOpenFastOrder('Запись на примерку в шоуруме с кофе')} 
            className="w-full bg-[#B89685] hover:bg-[#9E7764] text-white font-semibold py-3.5 rounded-xl text-xs uppercase tracking-wider transition shadow-lg active:scale-95"
          >
            Записаться на примерку
          </button>
        </div>

        {/* Фоновые декоративные круги для премиального объема */}
        <div className="absolute -right-12 -bottom-12 w-48 h-48 bg-[#845E4C]/30 rounded-full blur-3xl pointer-events-none" />
      </div>
    </section>
  );
};