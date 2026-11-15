import React, { useState } from 'react';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Truck,
  Star,
  ChevronLeft,
  ChevronRight,
  MapPin,
} from 'lucide-react';

export const Hero = ({ onOpenFastOrder }) => {
  const [activeLook, setActiveLook] = useState(0);

  const featuredLooks = [
    {
      tag: 'Выбор стилиста',
      title: 'Капсула «Астана Осень»',
      sizes: 'Размеры XS — XL • В наличии',
      price: '68 900 ₸',
      image:
        'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1000&auto=format&fit=crop',
    },
    {
      tag: 'Хит продаж',
      title: 'Пальто кашемир KAS live',
      sizes: 'Размеры S — L • Осталось 3 шт.',
      price: '45 900 ₸',
      image:
        'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?q=80&w=1000&auto=format&fit=crop',
    },
    {
      tag: 'Вечерняя линия',
      title: 'Шелковое платье Silk',
      sizes: 'Размеры XS — M • Примерка',
      price: '44 000 ₸',
      image:
        'https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=1000&auto=format&fit=crop',
    },
  ];

  const currentLook = featuredLooks[activeLook];

  const nextLook = () => {
    setActiveLook((prev) => (prev + 1) % featuredLooks.length);
  };

  const prevLook = () => {
    setActiveLook((prev) => (prev - 1 + featuredLooks.length) % featuredLooks.length);
  };

  return (
    <section className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 pt-3 pb-4 md:py-10">
      {/* =========================================================
          1. МОБИЛЬНАЯ И ПЛАНШЕТНАЯ ВЕРСИЯ (< 1024px)
          Компактный первый экран: всё помещается без прокрутки
         ========================================================= */}
      <div className="lg:hidden relative h-[520px] sm:h-[560px] rounded-[28px] overflow-hidden shadow-xl border border-[#E6D9CF]/60">
        <img
          src={currentLook.image}
          alt={currentLook.title}
          className="w-full h-full object-cover object-center transition-all duration-700"
        />

        {/* Градиент для идеальной читаемости белого текста */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1F140F] via-[#2A1C16]/45 to-[#2A1C16]/25 flex flex-col justify-between p-5 sm:p-7 text-white">
          {/* Верхняя панель бейджей */}
          <div className="flex items-center justify-between gap-2">
            <span className="inline-flex items-center gap-1.5 bg-white/15 backdrop-blur-md border border-white/25 px-3 py-1.5 rounded-full text-[10px] uppercase tracking-[0.18em] font-medium text-[#FAF7F5]">
              <Sparkles size={12} className="text-[#E6D9CF]" />
              Коллекция 2026
            </span>

            <span className="inline-flex items-center gap-1.5 bg-[#2A1C16]/75 backdrop-blur-md border border-white/15 px-3 py-1.5 rounded-full text-[10px] text-[#E6D9CF]">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Шоурум Астана
            </span>
          </div>

          {/* Нижний блок с заголовком, мини-переключателем и кнопками */}
          <div className="space-y-4">
            {/* Мини-карточка текущего образа с переключателем */}
            <div className="bg-white/12 backdrop-blur-md border border-white/20 rounded-2xl p-3 flex items-center justify-between gap-2">
              <div className="min-w-0">
                <span className="text-[9px] uppercase tracking-widest text-[#E6D9CF] block">
                  {currentLook.tag} • {currentLook.price}
                </span>
                <p className="font-serif text-sm font-bold text-white truncate">
                  {currentLook.title}
                </p>
              </div>
              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  type="button"
                  onClick={prevLook}
                  className="w-7 h-7 rounded-full bg-white/15 flex items-center justify-center active:scale-90"
                  aria-label="Предыдущий образ"
                >
                  <ChevronLeft size={15} />
                </button>
                <button
                  type="button"
                  onClick={nextLook}
                  className="w-7 h-7 rounded-full bg-white/15 flex items-center justify-center active:scale-90"
                  aria-label="Следующий образ"
                >
                  <ChevronRight size={15} />
                </button>
              </div>
            </div>

            <div>
              <h1 className="font-serif text-[28px] sm:text-4xl font-bold leading-[1.15] mb-2">
                Подчеркните свою{' '}
                <span className="italic font-normal text-[#E6D9CF]">индивидуальность</span>
              </h1>
              <p className="text-xs sm:text-sm text-[#F5EFEA]/85 font-light leading-relaxed max-w-md">
                Премиальные ткани, идеальная посадка и примерка в шоуруме Астаны или с доставкой на дом.
              </p>
            </div>

            {/* Кнопки действий */}
            <div className="grid grid-cols-2 gap-2.5 pt-1">
              <a
                href="#catalog"
                className="bg-white text-[#2A1C16] py-3.5 px-4 rounded-full text-[11px] font-bold tracking-wider uppercase shadow-lg flex items-center justify-center gap-1.5 active:scale-95 transition"
              >
                <span>Каталог</span>
                <ArrowRight size={14} />
              </a>
              <button
                type="button"
                onClick={() => onOpenFastOrder('Бесплатный подбор размера со стилистом')}
                className="bg-[#845E4C]/90 backdrop-blur-md border border-white/25 text-white py-3.5 px-3 rounded-full text-[11px] font-semibold tracking-wider uppercase flex items-center justify-center gap-1.5 active:scale-95 transition cursor-pointer"
              >
                <Sparkles size={13} />
                <span>Размер</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================
          2. ДЕСКТОПНАЯ ВЕРСИЯ (ПК >= 1024px)
          Двухколоночный премиум-разворот с интерактивной витриной
         ========================================================= */}
      <div className="hidden lg:block relative bg-[#F5EFEA]/85 border border-[#E6D9CF] rounded-[2rem] p-12 shadow-sm overflow-hidden">
        {/* Декоративное мягкое свечение */}
        <div className="absolute top-0 right-0 w-[450px] h-[450px] bg-[#E6D9CF]/35 rounded-full blur-3xl pointer-events-none -mr-24 -mt-24" />
        <div className="absolute bottom-0 left-1/3 w-72 h-72 bg-[#B89685]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-12 gap-12 items-center relative z-10">
          {/* Левая часть: Заголовок и оффер (7 колонок) */}
          <div className="col-span-7 space-y-6">
            <div className="flex items-center gap-3">
              <div className="inline-flex items-center gap-2 bg-white border border-[#E6D9CF] px-4 py-1.5 rounded-full shadow-2xs">
                <Sparkles size={14} className="text-[#845E4C]" />
                <span className="text-xs uppercase tracking-[0.22em] font-semibold text-[#845E4C]">
                  Новая коллекция 2026
                </span>
              </div>

              <div className="inline-flex items-center gap-2 bg-white/70 border border-[#E6D9CF] px-3.5 py-1.5 rounded-full text-xs text-stone-600">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <MapPin size={13} className="text-[#845E4C]" />
                <span>Шоурум в Астане открыт</span>
              </div>
            </div>

            <h1 className="font-serif text-5xl xl:text-[54px] font-bold text-[#2A1C16] leading-[1.12] tracking-tight">
              Подчеркните свою <br />
              <span className="italic font-normal text-[#845E4C]">индивидуальность</span> и стиль
            </h1>

            <p className="text-base text-stone-600 font-normal leading-relaxed max-w-xl">
              Капсульная женская одежда из премиальных тканей с идеальной посадкой. Примерьте образы в нашем шоуруме в Астане или закажите быструю доставку с примеркой по всему Казахстану.
            </p>

            {/* Кнопки действий */}
            <div className="flex items-center gap-4 pt-2">
              <a
                href="#catalog"
                className="bg-[#2A1C16] hover:bg-[#3E2A21] text-white px-8 py-4 rounded-full text-xs font-semibold tracking-wider uppercase shadow-md hover:shadow-lg transition flex items-center gap-2.5"
              >
                <span>Смотреть каталог</span>
                <ArrowRight size={16} />
              </a>

              <button
                type="button"
                onClick={() => onOpenFastOrder('Бесплатный подбор размера со стилистом')}
                className="bg-white hover:bg-[#FAF7F5] text-[#2A1C16] border border-[#D8C5B8] px-7 py-4 rounded-full text-xs font-semibold tracking-wider uppercase transition flex items-center gap-2 cursor-pointer"
              >
                <Sparkles size={15} className="text-[#845E4C]" />
                <span>Подобрать размер</span>
              </button>
            </div>

            {/* Показатели доверия */}
            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-[#E6D9CF]">
              <div>
                <div className="flex items-center gap-1.5 text-[#2A1C16] font-serif text-2xl font-bold">
                  <span>500+</span>
                  <Star size={16} className="fill-[#845E4C] text-[#845E4C]" />
                </div>
                <p className="text-xs text-stone-500 mt-0.5">Постоянных клиенток</p>
              </div>
              <div>
                <div className="flex items-center gap-1.5 text-[#2A1C16] font-serif text-2xl font-bold">
                  <span>1–3 дня</span>
                  <Truck size={16} className="text-[#845E4C]" />
                </div>
                <p className="text-xs text-stone-500 mt-0.5">Быстрая доставка по РК</p>
              </div>
              <div>
                <div className="flex items-center gap-1.5 text-[#2A1C16] font-serif text-2xl font-bold">
                  <span>100%</span>
                  <ShieldCheck size={16} className="text-[#845E4C]" />
                </div>
                <p className="text-xs text-stone-500 mt-0.5">Оплата после примерки</p>
              </div>
            </div>
          </div>

          {/* Правая часть: Интерактивная карточка-витрина (5 колонок) */}
          <div className="col-span-5 relative">
            <div className="relative h-[480px] rounded-3xl overflow-hidden shadow-2xl border border-white/60 group">
              <img
                src={currentLook.image}
                alt={currentLook.title}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2A1C16]/55 via-transparent to-transparent" />

              {/* Кнопки переключения образов сверху справа */}
              <div className="absolute top-4 right-4 flex items-center gap-2">
                <button
                  type="button"
                  onClick={prevLook}
                  className="w-9 h-9 rounded-full bg-white/85 hover:bg-white backdrop-blur-md text-[#2A1C16] flex items-center justify-center shadow-md transition cursor-pointer"
                  title="Предыдущий образ"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  type="button"
                  onClick={nextLook}
                  className="w-9 h-9 rounded-full bg-white/85 hover:bg-white backdrop-blur-md text-[#2A1C16] flex items-center justify-center shadow-md transition cursor-pointer"
                  title="Следующий образ"
                >
                  <ChevronRight size={18} />
                </button>
              </div>

              {/* Индикаторы точек */}
              <div className="absolute top-5 left-5 flex items-center gap-1.5">
                {featuredLooks.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveLook(idx)}
                    className={`h-1.5 rounded-full transition-all cursor-pointer ${
                      activeLook === idx ? 'w-6 bg-white' : 'w-1.5 bg-white/50'
                    }`}
                    aria-label={`Образ ${idx + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Плавающая карточка бронирования снизу */}
            <div className="absolute -bottom-5 left-5 right-5 bg-white/95 backdrop-blur-md border border-[#E6D9CF] p-4 rounded-2xl shadow-xl flex items-center justify-between gap-3">
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] uppercase tracking-widest text-[#845E4C] font-bold">
                    {currentLook.tag}
                  </span>
                  <span className="text-xs font-bold text-[#2A1C16]">• {currentLook.price}</span>
                </div>
                <p className="font-serif text-base font-bold text-[#2A1C16] truncate mt-0.5">
                  {currentLook.title}
                </p>
                <p className="text-[11px] text-stone-500">{currentLook.sizes}</p>
              </div>
              <button
                type="button"
                onClick={() => onOpenFastOrder(`Бронь образа: ${currentLook.title}`)}
                className="bg-[#845E4C] hover:bg-[#6E4D3E] text-white text-xs font-semibold px-4 py-3 rounded-xl transition whitespace-nowrap shadow-sm cursor-pointer shrink-0"
              >
                Забронировать
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};