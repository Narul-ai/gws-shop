import React from 'react';
import { Menu, Heart, Sparkles } from 'lucide-react';

export const Header = ({ favCount, onOpenFav, showToast }) => {
  return (
    <header className="sticky top-0 z-40 bg-[#FAF7F5]/90 backdrop-blur-md border-b border-[#E6D9CF]/60 transition-all">
      <div className="max-w-md mx-auto px-4 py-3.5 flex items-center justify-between">
        {/* Левая иконка меню */}
        <div className="flex items-center gap-2">
          <button 
            onClick={() => showToast("GWS | Showroom Astana")} 
            className="p-1.5 text-stone-700 hover:text-[#845E4C] transition"
            aria-label="Меню"
          >
            <Menu size={22} />
          </button>
          <span className="text-[10px] font-semibold tracking-wider text-[#845E4C] bg-[#F5EFEA] px-2 py-0.5 rounded-full uppercase border border-[#E6D9CF]/50">
            Astana
          </span>
        </div>

        {/* Брендовый логотип */}
        <div className="text-center">
          <a href="#" className="font-serif text-2xl font-bold tracking-[0.25em] text-[#2A1C16] block leading-none">
            G W S
          </a>
          <span className="text-[8px] uppercase tracking-[0.3em] text-[#B89685] font-medium block mt-1">
            Go With Style
          </span>
        </div>

        {/* Правая иконка избранного */}
        <div className="flex items-center gap-2">
          <button 
            onClick={onOpenFav} 
            className="relative p-1.5 text-stone-700 hover:text-[#845E4C] transition active:scale-95"
            aria-label="Избранное"
          >
            <Heart size={22} />
            {favCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#2A1C16] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold animate-pulse">
                {favCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};