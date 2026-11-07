import React from 'react';
import { MapPin, Sparkles, Truck, Award } from 'lucide-react';

export const Advantages = () => {
  return (
    <section className="grid grid-cols-4 gap-2 px-4 py-6 border-b border-[#E6D9CF]/40 text-center bg-white/50 my-2 rounded-2xl mx-3 shadow-sm">
      <div className="flex flex-col items-center">
        <div className="w-10 h-10 rounded-full bg-[#F5EFEA] flex items-center justify-center text-[#845E4C] mb-1">
          <MapPin size={20} />
        </div>
        <span className="text-[10px] font-medium leading-tight text-[#2A1C16]">Шоурум<br/>в Астане</span>
      </div>
      <div className="flex flex-col items-center">
        <div className="w-10 h-10 rounded-full bg-[#F5EFEA] flex items-center justify-center text-[#845E4C] mb-1">
          <Sparkles size={20} />
        </div>
        <span className="text-[10px] font-medium leading-tight text-[#2A1C16]">Примерка<br/>до покупки</span>
      </div>
      <div className="flex flex-col items-center">
        <div className="w-10 h-10 rounded-full bg-[#F5EFEA] flex items-center justify-center text-[#845E4C] mb-1">
          <Truck size={20} />
        </div>
        <span className="text-[10px] font-medium leading-tight text-[#2A1C16]">Быстрая<br/>доставка</span>
      </div>
      <div className="flex flex-col items-center">
        <div className="w-10 h-10 rounded-full bg-[#F5EFEA] flex items-center justify-center text-[#845E4C] mb-1">
          <Award size={20} />
        </div>
        <span className="text-[10px] font-medium leading-tight text-[#2A1C16]">Премиум<br/>Качество</span>
      </div>
    </section>
  );
};