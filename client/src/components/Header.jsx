import React, { useState } from 'react';
import { Menu, X, Heart, ShoppingBag, MapPin } from 'lucide-react';

export const Header = ({ favCount, onOpenFav, onOpenOrder, showToast }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Каталог', href: '#catalog' },
    { name: 'Преимущества', href: '#advantages' },
    { name: 'Шоурум', href: '#showroom' },
  ];

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF7F5]/95 backdrop-blur-md border-b border-[#E6D9CF]/70 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 md:h-20 flex items-center justify-between">
        
        {/* Левая часть: Бургер на мобилке + Навигация на ПК */}
        <div className="flex items-center gap-6 flex-1">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 -ml-2 text-stone-700 hover:text-[#845E4C] transition"
            aria-label="Меню"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <button
            onClick={() => showToast && showToast("Шоурум: Центральный проспект, 10")}
            className="hidden sm:inline-flex items-center gap-1.5 text-[11px] font-semibold tracking-wider text-[#845E4C] bg-[#F5EFEA] hover:bg-[#EFE5DD] px-3 py-1.5 rounded-full uppercase border border-[#E6D9CF]/60 transition cursor-pointer"
          >
            <MapPin size={12} />
            Showroom
          </button>

          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-stone-600 hover:text-[#2A1C16] transition relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-[#845E4C] hover:after:w-full after:transition-all"
              >
                {link.name}
              </a>
            ))}
          </nav>
        </div>

        {/* Центр: Брендовый логотип */}
        <div className="text-center flex-shrink-0">
          <a
            href="#"
            className="font-serif text-xl md:text-2xl font-bold tracking-[0.22em] text-[#2A1C16] block leading-none uppercase"
          >
            Your Store
          </a>
          <span className="text-[8px] md:text-[9px] uppercase tracking-[0.3em] text-[#B89685] font-medium block mt-1">
            Fashion & Style
          </span>
        </div>

        {/* Правая часть: Избранное + Кнопка заказа на ПК */}
        <div className="flex items-center justify-end gap-3 md:gap-4 flex-1">
          <button
            onClick={onOpenFav}
            className="relative p-2 text-stone-700 hover:text-[#845E4C] hover:bg-[#F5EFEA] rounded-full transition active:scale-95 cursor-pointer"
            aria-label="Избранное"
            title="Избранное"
          >
            <Heart size={22} />
            {favCount > 0 && (
              <span className="absolute top-0.5 right-0.5 bg-[#2A1C16] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {favCount}
              </span>
            )}
          </button>

          {/* Кнопка быстрого заказа для планшетов и ПК */}
          {onOpenOrder && (
            <button
              onClick={() => onOpenOrder()}
              className="hidden md:inline-flex items-center gap-2 bg-[#2A1C16] hover:bg-[#3E2A21] text-white text-xs font-medium tracking-wider uppercase px-5 py-2.5 rounded-full transition shadow-sm active:scale-95 cursor-pointer"
            >
              <ShoppingBag size={15} />
              <span>Заказать в 1 клик</span>
            </button>
          )}
        </div>
      </div>

      {/* Выпадающее мобильное меню */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FAF7F5] border-b border-[#E6D9CF] px-4 pt-2 pb-5 space-y-3 animate-fade-in-up">
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={handleLinkClick}
                className="text-base font-medium text-[#2A1C16] py-2 px-3 rounded-xl hover:bg-[#F5EFEA] transition"
              >
                {link.name}
              </a>
            ))}
          </div>
          <div className="pt-2 border-t border-[#E6D9CF]/60 flex items-center justify-between px-3 text-xs text-[#845E4C]">
            <span>Шоурум: Центральный проспект, 10</span>
            <span>10:00 – 21:00</span>
          </div>
        </div>
      )}
    </header>
  );
};