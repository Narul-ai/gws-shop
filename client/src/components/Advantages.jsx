import React, { useState } from 'react';
import { MapPin, Sparkles, Truck, Award, ChevronDown, Info } from 'lucide-react';

export const Advantages = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const advantagesList = [
    {
      icon: <MapPin size={20} />,
      badge: 'Бесплатно',
      title: 'Уютный шоурум',
      subtitle: 'Примерка в бутике',
      details:
        'Ждём вас ежедневно с 10:00 до 21:00 по адресу Центральный проспект, 10. Угостим свежесваренным кофе и поможем собрать полный образ.',
    },
    {
      icon: <Sparkles size={20} />,
      badge: 'До 3 образов',
      title: 'Подбор стилиста',
      subtitle: 'По вашим параметрам',
      details:
        'Отправьте ваши мерки в WhatsApp — стилист подберёт идеальный размер и пришлёт живые фото и видео ткани при дневном свете.',
    },
    {
      icon: <Truck size={20} />,
      badge: '1–3 дня',
      title: 'Быстрая доставка',
      subtitle: 'По всей стране',
      details:
        'По городу доставляем курьером с примеркой в день заказа. В другие регионы отправляем быстрыми курьерскими службами до двери.',
    },
    {
      icon: <Award size={20} />,
      badge: 'Премиум',
      title: 'Качество тканей',
      subtitle: 'Отборные материалы',
      details:
        'Каждая модель проходит двойную проверку швов и фурнитуры перед отправкой. Оплата производится только после осмотра и примерки.',
    },
  ];

  const toggleDetails = (idx) => {
    setActiveIndex(activeIndex === idx ? null : idx);
  };

  return (
    <section className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 my-4 sm:my-6">
      <div className="bg-white/90 backdrop-blur-md border border-[#E6D9CF]/80 rounded-[28px] sm:rounded-3xl p-4 sm:p-6 shadow-sm">
        {/* Адаптивная сетка: на телефоне 2 вертикальные карточки, на ПК 4 горизонтальные */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4">
          {advantagesList.map((adv, index) => {
            const isOpen = activeIndex === index;
            return (
              <button
                key={index}
                type="button"
                onClick={() => toggleDetails(index)}
                className={`text-center sm:text-left flex flex-col sm:flex-row items-center sm:items-start gap-2.5 sm:gap-3.5 p-3.5 sm:p-4 rounded-2xl border transition-all cursor-pointer ${
                  isOpen
                    ? 'bg-[#F5EFEA] border-[#B89685] shadow-2xs'
                    : 'bg-[#FAF7F5]/60 sm:bg-transparent border-[#E6D9CF]/50 sm:border-transparent hover:bg-[#F5EFEA]/70'
                }`}
              >
                {/* Иконка */}
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-[#F5EFEA] border border-[#E6D9CF]/60 flex-shrink-0 flex items-center justify-center text-[#845E4C] shadow-2xs">
                  {adv.icon}
                </div>

                {/* Текстовый блок */}
                <div className="min-w-0 flex-1 w-full">
                  <span className="inline-block text-[9px] uppercase tracking-wider font-semibold text-[#845E4C] bg-[#F5EFEA] px-2 py-0.5 rounded-full mb-1">
                    {adv.badge}
                  </span>
                  <h4 className="font-serif text-xs sm:text-sm font-bold text-[#2A1C16] leading-snug break-words">
                    {adv.title}
                  </h4>
                  <p className="text-[11px] text-stone-500 font-light mt-0.5 leading-tight">
                    {adv.subtitle}
                  </p>
                </div>

                {/* Индикатор раскрытия на ПК */}
                <ChevronDown
                  size={15}
                  className={`hidden sm:block text-stone-400 shrink-0 mt-1 transition-transform duration-300 ${
                    isOpen ? 'rotate-180 text-[#845E4C]' : ''
                  }`}
                />
              </button>
            );
          })}
        </div>

        {/* Раскрывающаяся панель с подробностями при клике на любую карточку */}
        {activeIndex !== null && (
          <div className="mt-3 pt-3 border-t border-[#E6D9CF]/70 flex items-start gap-2.5 px-2 text-xs text-stone-600 animate-fade-in-up">
            <Info size={16} className="text-[#845E4C] shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong className="text-[#2A1C16]">{advantagesList[activeIndex].title}:</strong>{' '}
              {advantagesList[activeIndex].details}
            </p>
          </div>
        )}
      </div>
    </section>
  );
};