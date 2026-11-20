import React, { useState } from 'react';
import { Truck, Store, MapPin, Check, Ruler, ShieldCheck } from 'lucide-react';

export const ProductModalContent = ({ product, onClose }) => {
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || '');
  const [deliveryType, setDeliveryType] = useState('courier');
  const [showSizeGuide, setShowSizeGuide] = useState(false);

  const formatMoney = (num) => num?.toLocaleString('ru-RU') + ' ₸';

  const deliveryOptions = [
    {
      id: 'courier',
      title: 'Курьерская доставка с примеркой',
      subtitle: 'По городу в течение дня (бесплатно при выкупе)',
      label: 'Курьерская доставка по городу (с примеркой)',
      icon: Truck,
    },
    {
      id: 'pickup',
      title: 'Забрать из Showroom',
      subtitle: 'Центральный проспект, 10 — забронируем на 24 часа',
      label: 'Самовывоз из Showroom',
      icon: Store,
    },
    {
      id: 'country',
      title: 'Доставка по стране',
      subtitle: 'Курьерской службой до двери за 1–3 рабочих дня',
      label: 'Доставка по стране (до двери)',
      icon: MapPin,
    },
  ];

  const sendWhatsAppOrder = () => {
    const size = selectedSize || 'Нужна помощь с размером';
    const currentDelivery = deliveryOptions.find((d) => d.id === deliveryType)?.label;
    const text = `Здравствуйте! Хочу оформить заказ:%0A• *Товар:* ${product.title}%0A• *Размер:* ${size}%0A• *Цена:* ${formatMoney(product.price)}%0A• *Способ получения:* ${currentDelivery}`;
    window.open(`https://wa.me/77000000000?text=${text}`, '_blank');
    onClose();
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-start">
      {/* Левая колонка: Фото (на ПК большое, на телефоне компактное) */}
      <div className="md:col-span-5 flex md:block gap-4">
        <div className="relative w-28 h-36 md:w-full md:h-[420px] rounded-2xl overflow-hidden shadow-md shrink-0 bg-stone-100">
          <img
            src={product.image}
            className="w-full h-full object-cover"
            alt={product.title}
          />
          {product.badge && (
            <span className="absolute top-2.5 left-2.5 bg-[#2A1C16] text-white text-[9px] md:text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-widest">
              {product.badge}
            </span>
          )}
        </div>

        {/* Заголовок на мобильном рядом с фото */}
        <div className="flex flex-col justify-between py-1 md:hidden">
          <div>
            <span className="text-[10px] tracking-[0.2em] uppercase text-[#B89685] font-semibold">
              {product.category}
            </span>
            <h3 className="font-serif text-lg font-bold text-[#2A1C16] leading-snug mt-0.5">
              {product.title}
            </h3>
            <p className="text-xs text-stone-500 mt-1">
              Цвет: <span className="font-medium text-stone-800">{product.color || 'Базовый'}</span>
            </p>
          </div>
          <div className="font-serif font-bold text-xl text-[#2A1C16]">
            {formatMoney(product.price)}
          </div>
        </div>
      </div>

      {/* Правая колонка: Информация и оформление */}
      <div className="md:col-span-7 flex flex-col justify-between">
        {/* Заголовок на ПК */}
        <div className="hidden md:block mb-5 pb-4 border-b border-[#E6D9CF]/70">
          <span className="text-xs tracking-[0.2em] uppercase text-[#845E4C] font-semibold">
            {product.category} • В наличии
          </span>
          <h3 className="font-serif text-2xl font-bold text-[#2A1C16] leading-snug mt-1">
            {product.title}
          </h3>
          <div className="flex items-center justify-between mt-3">
            <div className="flex items-baseline gap-2.5">
              <span className="font-serif font-bold text-2xl text-[#2A1C16]">
                {formatMoney(product.price)}
              </span>
              {product.oldPrice && (
                <span className="text-sm text-stone-400 line-through">
                  {formatMoney(product.oldPrice)}
                </span>
              )}
            </div>
            <span className="text-xs text-stone-500 bg-[#F5EFEA] px-3 py-1 rounded-full">
              Цвет: <strong className="text-[#2A1C16]">{product.color || 'Базовый'}</strong>
            </span>
          </div>
        </div>

        {/* Выбор размера + Таблица размеров */}
        <div className="mb-5">
          <div className="flex justify-between items-center mb-2.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-stone-700">
              Выберите размер
            </label>
            <button
              type="button"
              onClick={() => setShowSizeGuide(!showSizeGuide)}
              className="inline-flex items-center gap-1 text-[11px] text-[#845E4C] hover:text-[#2A1C16] underline underline-offset-2 cursor-pointer"
            >
              <Ruler size={13} />
              <span>{showSizeGuide ? 'Скрыть сетку' : 'Таблица размеров'}</span>
            </button>
          </div>

          {showSizeGuide && (
            <div className="mb-3 p-3 bg-white rounded-2xl border border-[#E6D9CF] text-[11px] text-stone-600 animate-fade-in-up">
              <div className="grid grid-cols-4 font-bold text-[#2A1C16] pb-1.5 mb-1.5 border-b border-stone-100 text-center">
                <span>Размер</span>
                <span>Грудь (см)</span>
                <span>Талия (см)</span>
                <span>Бедра (см)</span>
              </div>
              <div className="space-y-1 text-center">
                <div className="grid grid-cols-4"><span>XS (40)</span><span>80–84</span><span>60–64</span><span>86–90</span></div>
                <div className="grid grid-cols-4"><span>S (42)</span><span>84–88</span><span>64–68</span><span>90–94</span></div>
                <div className="grid grid-cols-4"><span>M (44)</span><span>88–92</span><span>68–72</span><span>94–98</span></div>
                <div className="grid grid-cols-4"><span>L (46)</span><span>92–96</span><span>72–76</span><span>98–102</span></div>
              </div>
            </div>
          )}

          <div className="flex gap-2">
            {product.sizes.map((s) => {
              const isSelected = selectedSize === s;
              return (
                <button
                  key={s}
                  onClick={() => setSelectedSize(s)}
                  className={`flex-1 py-3 rounded-2xl text-xs font-semibold tracking-wider transition-all border cursor-pointer ${
                    isSelected
                      ? 'bg-[#2A1C16] text-white border-[#2A1C16] shadow-md'
                      : 'bg-white text-stone-700 border-stone-200 hover:border-[#845E4C]'
                  }`}
                >
                  {s}
                </button>
              );
            })}
          </div>
        </div>

        {/* Способ получения */}
        <div className="mb-6">
          <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-2.5">
            Способ получения
          </label>
          <div className="space-y-2">
            {deliveryOptions.map((opt) => {
              const Icon = opt.icon;
              const active = deliveryType === opt.id;
              return (
                <div
                  key={opt.id}
                  onClick={() => setDeliveryType(opt.id)}
                  className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                    active
                      ? 'bg-white border-[#845E4C] shadow-sm ring-1 ring-[#845E4C]'
                      : 'bg-white/60 border-stone-200 hover:bg-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-[#F5EFEA] text-[#845E4C]">
                      <Icon size={17} />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-stone-900">{opt.title}</div>
                      <div className="text-[10px] text-stone-500">{opt.subtitle}</div>
                    </div>
                  </div>
                  {active && <Check size={16} className="text-[#845E4C] shrink-0" />}
                </div>
              );
            })}
          </div>
        </div>

        {/* Кнопки действия */}
        <div className="space-y-2.5">
          <button
            onClick={sendWhatsAppOrder}
            className="w-full bg-[#2A1C16] hover:bg-[#3E2A21] text-white font-semibold py-4 rounded-2xl text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg transition active:scale-[0.98] cursor-pointer"
          >
            <span>Оформить заказ в WhatsApp</span>
          </button>

          <div className="flex items-center justify-center gap-1.5 text-[11px] text-stone-500 pt-1">
            <ShieldCheck size={14} className="text-[#845E4C]" />
            <span>Оплата только после примерки и проверки качества</span>
          </div>
        </div>
      </div>
    </div>
  );
};