import React, { useState } from 'react';
import { X, Send, Sparkles, Truck, Store, MapPin, Check } from 'lucide-react';

export const OrderModal = ({ isOpen, onClose, mode, selectedProduct, favorites, products, onSelectProduct }) => {
  const [selectedSize, setSelectedSize] = useState('');
  const [deliveryType, setDeliveryType] = useState('astana'); // 'astana', 'pickup', 'kazakhstan'
  const [custName, setCustName] = useState('');
  const [custPhone, setCustPhone] = useState('');

  if (!isOpen) return null;

  const formatMoney = (num) => num?.toLocaleString('ru-RU') + ' ₸';

  const deliveryOptions = {
    astana: 'Доставка по Астане (с примеркой)',
    pickup: 'Самовывоз из Showroom в Астане',
    kazakhstan: 'Доставка по Казахстану (CDEK / Казпочта)'
  };

  const sendWhatsAppOrder = () => {
    const size = selectedSize || 'Не выбран';
    const delivery = deliveryOptions[deliveryType];
    const text = `Здравствуйте! Хочу заказать в GWS:%0A• *Товар:* ${selectedProduct.title}%0A• *Размер:* ${size}%0A• *Цена:* ${formatMoney(selectedProduct.price)}%0A• *Способ получения:* ${delivery}`;
    window.open(`https://wa.me/77000000000?text=${text}`, '_blank');
    onClose();
  };

  const submitGeneralOrder = () => {
    const name = custName || 'Гость';
    const phone = custPhone || 'Не указан';
    const text = `Здравствуйте! Консультация с сайта GWS:%0A• *Цель:* ${mode.reason}%0A• *Имя:* ${name}%0A• *Телефон:* ${phone}`;
    window.open(`https://wa.me/77000000000?text=${text}`, '_blank');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-end justify-center transition-all">
      {/* Клик по фону закрывает модалку */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Шторка (Bottom Sheet) */}
      <div className="relative z-10 bg-[#FAF7F5] w-full max-w-md rounded-t-[32px] max-h-[90vh] overflow-y-auto p-6 shadow-2xl border-t border-[#E6D9CF]">
        {/* Индикатор «тянуть вверх» (Mobile Handle) */}
        <div className="w-12 h-1.5 bg-[#D5BEB1] rounded-full mx-auto mb-5" />

        {/* Кнопка закрытия */}
        <button 
          onClick={onClose} 
          className="absolute top-5 right-5 p-2 text-stone-400 hover:text-stone-800 bg-white rounded-full shadow-sm border border-stone-100 transition"
        >
          <X size={18} />
        </button>

        {/* --- ВАР ИАНТ 1: КАРТОЧКА ТОВАРА --- */}
        {mode.type === 'product' && selectedProduct && (
          <div>
            {/* Заголовок и фото */}
            <div className="flex gap-4 mb-6">
              <div className="relative w-28 h-36 rounded-2xl overflow-hidden shadow-md shrink-0">
                <img src={selectedProduct.image} className="w-full h-full object-cover" alt="" />
                {selectedProduct.badge && (
                  <span className="absolute top-2 left-2 bg-[#2A1C16] text-white text-[8px] font-bold px-2 py-0.5 rounded-full uppercase tracking-widest">
                    {selectedProduct.badge}
                  </span>
                )}
              </div>
              
              <div className="flex flex-col justify-between py-1">
                <div>
                  <span className="text-[10px] tracking-[0.2em] uppercase text-[#B89685] font-semibold">
                    {selectedProduct.category}
                  </span>
                  <h3 className="font-serif text-lg font-bold text-[#2A1C16] leading-snug mt-0.5">
                    {selectedProduct.title}
                  </h3>
                  <p className="text-xs text-stone-500 mt-1">
                    Цвет: <span className="font-medium text-stone-800">{selectedProduct.color || 'Базовый'}</span>
                  </p>
                </div>
                
                <div className="font-serif font-bold text-xl text-[#2A1C16]">
                  {formatMoney(selectedProduct.price)}
                </div>
              </div>
            </div>

            {/* Выбор размера */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-stone-700">Размер</label>
                <span className="text-[11px] text-[#9E7764] underline cursor-pointer">Таблица размеров</span>
              </div>
              
              <div className="flex gap-2">
                {selectedProduct.sizes.map((s) => {
                  const isSelected = selectedSize === s;
                  return (
                    <button 
                      key={s}
                      onClick={() => setSelectedSize(s)} 
                      className={`flex-1 py-3 rounded-2xl text-xs font-semibold tracking-wider transition-all border ${
                        isSelected 
                          ? 'bg-[#2A1C16] text-white border-[#2A1C16] shadow-md scale-[1.02]' 
                          : 'bg-white text-stone-700 border-stone-200 hover:border-stone-400'
                      }`}
                    >
                      {s}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Способ получения (Премиум карточки вместо select) */}
            <div className="mb-6">
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-2.5">
                Способ получения
              </label>

              <div className="space-y-2">
                {/* Астана */}
                <div 
                  onClick={() => setDeliveryType('astana')}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                    deliveryType === 'astana' 
                      ? 'bg-white border-[#9E7764] shadow-sm ring-1 ring-[#9E7764]' 
                      : 'bg-white/60 border-stone-200'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-[#F5EFEA] text-[#845E4C]">
                      <Truck size={18} />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-stone-900">Доставка с примеркой</div>
                      <div className="text-[10px] text-stone-500">По Астане в течение дня</div>
                    </div>
                  </div>
                  {deliveryType === 'astana' && <Check size={16} className="text-[#845E4C]" />}
                </div>

                {/* Шоурум */}
                <div 
                  onClick={() => setDeliveryType('pickup')}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                    deliveryType === 'pickup' 
                      ? 'bg-white border-[#9E7764] shadow-sm ring-1 ring-[#9E7764]' 
                      : 'bg-white/60 border-stone-200'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-[#F5EFEA] text-[#845E4C]">
                      <Store size={18} />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-stone-900">Забрать из Showroom</div>
                      <div className="text-[10px] text-stone-500">Астана, бесплатно</div>
                    </div>
                  </div>
                  {deliveryType === 'pickup' && <Check size={16} className="text-[#845E4C]" />}
                </div>

                {/* По РК */}
                <div 
                  onClick={() => setDeliveryType('kazakhstan')}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                    deliveryType === 'kazakhstan' 
                      ? 'bg-white border-[#9E7764] shadow-sm ring-1 ring-[#9E7764]' 
                      : 'bg-white/60 border-stone-200'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-[#F5EFEA] text-[#845E4C]">
                      <MapPin size={18} />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-stone-900">Доставка по Казахстану</div>
                      <div className="text-[10px] text-stone-500">CDEK / Казпочта</div>
                    </div>
                  </div>
                  {deliveryType === 'kazakhstan' && <Check size={16} className="text-[#845E4C]" />}
                </div>
              </div>
            </div>

            {/* Кнопки действия */}
            <div className="space-y-2.5 pt-2">
              <button 
                onClick={sendWhatsAppOrder} 
                className="w-full bg-[#2A1C16] hover:bg-[#4A3328] text-white font-semibold py-4 rounded-2xl text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-xl transition active:scale-[0.98]"
              >
                <span>Оформить заказ в WhatsApp</span>
              </button>

              <a 
                href="https://instagram.com/gowithshop" 
                target="_blank" 
                rel="noreferrer" 
                className="w-full bg-white border border-stone-200 text-stone-800 font-medium py-3.5 rounded-2xl text-xs flex items-center justify-center gap-2 hover:bg-stone-50 transition"
              >
                <svg className="w-4 h-4 text-stone-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                </svg>
                Задать вопрос в Instagram
              </a>
            </div>
          </div>
        )}

        {/* --- ВАРИАНТ 2: БЫСТРЫЙ ЗАПРОС / КОНСУЛЬТАЦИЯ --- */}
        {mode.type === 'fastOrder' && (
          <div className="py-2">
            <div className="text-center mb-6">
              <div className="w-14 h-14 bg-[#F5EFEA] rounded-full flex items-center justify-center mx-auto mb-3 text-[#845E4C]">
                <Sparkles size={24} />
              </div>
              <h3 className="font-serif text-2xl font-bold text-[#2A1C16]">{mode.reason}</h3>
              <p className="text-xs text-stone-500 mt-1 max-w-[260px] mx-auto">
                Оставьте имя и номер, и стилист GWS поможет вам подобрать размер и образ
              </p>
            </div>

            <div className="space-y-3 mb-6">
              <input 
                type="text" 
                placeholder="Ваше имя" 
                value={custName} 
                onChange={(e) => setCustName(e.target.value)} 
                className="w-full text-xs p-4 rounded-2xl border border-stone-200 bg-white focus:outline-none focus:border-[#9E7764] transition"
              />
              <input 
                type="tel" 
                placeholder="Ваш WhatsApp / Телефон" 
                value={custPhone} 
                onChange={(e) => setCustPhone(e.target.value)} 
                className="w-full text-xs p-4 rounded-2xl border border-stone-200 bg-white focus:outline-none focus:border-[#9E7764] transition"
              />
            </div>

            <button 
              onClick={submitGeneralOrder} 
              className="w-full bg-[#2A1C16] text-white font-semibold py-4 rounded-2xl text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-xl hover:bg-[#4A3328] transition"
            >
              <Send size={16} /> Отправить стилисту
            </button>
          </div>
        )}

        {/* --- ВАРИАНТ 3: ИЗБРАННОЕ --- */}
        {mode.type === 'favorites' && (
          <div>
            <h3 className="font-serif text-xl font-bold text-[#2A1C16] mb-4">
              ❤️ Ваше Избранное
            </h3>
            <div className="space-y-3 max-h-72 overflow-y-auto mb-4 pr-1">
              {products.filter(p => favorites.includes(p._id)).map(p => (
                <div key={p._id} className="flex items-center justify-between p-3 bg-white rounded-2xl border border-stone-100 shadow-sm">
                  <div className="flex items-center gap-3">
                    <img src={p.image} className="w-12 h-16 object-cover rounded-xl" alt="" />
                    <div>
                      <h4 className="text-xs font-semibold text-stone-900">{p.title}</h4>
                      <span className="text-xs text-[#2A1C16] font-bold mt-1 block">{formatMoney(p.price)}</span>
                    </div>
                  </div>
                  <button 
                    onClick={() => onSelectProduct(p)} 
                    className="text-xs bg-[#2A1C16] text-white px-4 py-2 rounded-xl font-medium shadow-sm hover:bg-[#4A3328] transition"
                  >
                    Заказать
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};