import React, { useState } from 'react';
import {
  MapPin,
  Clock,
  Phone,
  Sparkles,
  ArrowRight,
  Copy,
  Check,
  Coffee,
  Navigation,
} from 'lucide-react';

export const ShowroomBanner = ({ onOpenFastOrder }) => {
  const [copiedAddress, setCopiedAddress] = useState(false);

  const showroomAddress = 'Центральный проспект, 10, 2 этаж';
  const showroomPhone = '+7 (700) 000-00-00';
  const showroomPhoneRaw = '+77000000000';

  const handleCopyAddress = () => {
    navigator.clipboard?.writeText(showroomAddress);
    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 2000);
  };

  return (
    <section id="showroom" className="py-4 sm:py-6">
      <div className="bg-gradient-to-br from-[#2A1C16] via-[#32211A] to-[#231712] text-white rounded-[28px] md:rounded-[2rem] p-5 sm:p-10 lg:p-12 relative overflow-hidden shadow-xl border border-[#4A3328]">
        {/* Фоновые световые акценты */}
        <div className="absolute -right-16 -top-16 w-72 h-72 bg-[#B89685]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-16 -bottom-16 w-64 h-64 bg-[#845E4C]/25 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 lg:gap-10 items-center relative z-10">
          {/* Левая часть: Оффер, контакты и кнопки */}
          <div className="lg:col-span-7 space-y-5">
            {/* Верхние бейджи */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-full text-[11px] text-[#E6D9CF] border border-white/15">
                <Sparkles size={13} className="text-amber-300" />
                <span>Атмосферное пространство</span>
              </div>

              <div className="inline-flex items-center gap-1.5 bg-emerald-500/15 px-3 py-1.5 rounded-full text-[11px] text-emerald-200 border border-emerald-400/25">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>Открыто до 21:00</span>
              </div>
            </div>

            <div>
              <h3 className="font-serif text-2xl sm:text-4xl font-bold leading-tight">
                Флагманский шоурум в центре города
              </h3>
              <p className="text-xs sm:text-sm text-[#F5EFEA]/80 font-light leading-relaxed max-w-xl mt-2.5">
                Загляните на чашку свежесваренного кофе, примерьте актуальные капсулы в просторных примерочных и подберите идеальную посадку вместе со стилистом.
              </p>
            </div>

            {/* Интерактивные карточки информации */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3 text-xs text-[#E6D9CF]">
              <button
                type="button"
                onClick={handleCopyAddress}
                title="Нажмите, чтобы скопировать адрес"
                className="flex items-center justify-between sm:justify-start gap-2.5 bg-white/5 hover:bg-white/10 p-3.5 rounded-2xl border border-white/10 hover:border-[#B89685]/50 transition text-left cursor-pointer group"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <MapPin size={17} className="text-[#B89685] shrink-0" />
                  <span className="truncate">{showroomAddress}</span>
                </div>
                {copiedAddress ? (
                  <Check size={14} className="text-emerald-400 shrink-0" />
                ) : (
                  <Copy
                    size={13}
                    className="text-white/40 group-hover:text-white/80 shrink-0 transition"
                  />
                )}
              </button>

              <div className="flex items-center gap-2.5 bg-white/5 p-3.5 rounded-2xl border border-white/10">
                <Clock size={17} className="text-[#B89685] shrink-0" />
                <span>Ежедневно 10:00 – 21:00</span>
              </div>

              <a
                href={`tel:${showroomPhoneRaw}`}
                className="flex items-center gap-2.5 bg-white/5 hover:bg-white/10 p-3.5 rounded-2xl border border-white/10 hover:border-[#B89685]/50 transition"
              >
                <Phone size={17} className="text-[#B89685] shrink-0" />
                <span>{showroomPhone}</span>
              </a>
            </div>

            {/* Кнопки действий */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1">
              <button
                type="button"
                onClick={() => onOpenFastOrder('Запись на персональную примерку в шоуруме')}
                className="bg-[#B89685] hover:bg-[#9E7764] text-white font-semibold px-7 py-4 rounded-full text-xs uppercase tracking-wider transition shadow-lg active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Записаться на примерку</span>
                <ArrowRight size={15} />
              </button>

              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/8 hover:bg-white/15 text-[#F5EFEA] border border-white/15 font-medium px-6 py-4 rounded-full text-xs uppercase tracking-wider transition flex items-center justify-center gap-2"
              >
                <Navigation size={14} className="text-[#B89685]" />
                <span>Маршрут на карте</span>
              </a>
            </div>
          </div>

          {/* Правая часть: Фото бутика (адаптивно и на мобилке, и на ПК) */}
          <div className="lg:col-span-5">
            <div className="relative h-52 sm:h-64 lg:h-80 rounded-2xl overflow-hidden shadow-2xl border border-white/15 group">
              <img
                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1000&auto=format&fit=crop"
                alt="Интерьер шоурума"
                className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1F140F]/85 via-[#1F140F]/20 to-transparent" />

              {/* Плашка-бонус поверх фото */}
              <div className="absolute bottom-3.5 left-3.5 right-3.5 bg-white/12 backdrop-blur-md border border-white/20 rounded-xl p-3 flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#B89685]/30 border border-[#B89685]/40 flex items-center justify-center text-[#E6D9CF] shrink-0">
                  <Coffee size={17} />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-white truncate">
                    Бесплатная бронь до 5 моделей
                  </p>
                  <p className="text-[11px] text-[#E6D9CF]/80 truncate">
                    Подготовим нужные размеры к вашему приезду
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};