import React, { useState } from 'react';
import { Send, Sparkles, Clock } from 'lucide-react';

export const FastOrderModalContent = ({ reason, onClose }) => {
  const [custName, setCustName] = useState('');
  const [custPhone, setCustPhone] = useState('');
  const [custParams, setCustParams] = useState('');

  const submitGeneralOrder = (e) => {
    e.preventDefault();
    const name = custName || 'Гость';
    const phone = custPhone || 'Не указан';
    const paramsLine = custParams ? `%0A• *Пожелания / Параметры:* ${custParams}` : '';
    const text = `Здравствуйте! Заявка с сайта GWS:%0A• *Цель:* ${reason}%0A• *Имя:* ${name}%0A• *Телефон:* ${phone}${paramsLine}`;
    window.open(`https://wa.me/77000000000?text=${text}`, '_blank');
    onClose();
  };

  return (
    <form onSubmit={submitGeneralOrder} className="py-1">
      <div className="text-center mb-6">
        <div className="w-14 h-14 bg-[#F5EFEA] rounded-full flex items-center justify-center mx-auto mb-3 text-[#845E4C] border border-[#E6D9CF]">
          <Sparkles size={24} />
        </div>
        <h3 className="font-serif text-2xl font-bold text-[#2A1C16]">{reason}</h3>
        <p className="text-xs text-stone-500 mt-1.5 max-w-xs mx-auto leading-relaxed">
          Оставьте контакты — стилист шоурума GWS свяжется с вами в WhatsApp за 5 минут
        </p>
      </div>

      <div className="space-y-3 mb-6">
        <input
          type="text"
          required
          placeholder="Ваше имя *"
          value={custName}
          onChange={(e) => setCustName(e.target.value)}
          className="w-full text-xs sm:text-sm p-4 rounded-2xl border border-[#E6D9CF] bg-white focus:outline-none focus:border-[#845E4C] transition"
        />
        <input
          type="tel"
          required
          placeholder="Ваш WhatsApp / Телефон *"
          value={custPhone}
          onChange={(e) => setCustPhone(e.target.value)}
          className="w-full text-xs sm:text-sm p-4 rounded-2xl border border-[#E6D9CF] bg-white focus:outline-none focus:border-[#845E4C] transition"
        />
        <input
          type="text"
          placeholder="Рост / размер или удобное время (необязательно)"
          value={custParams}
          onChange={(e) => setCustParams(e.target.value)}
          className="w-full text-xs sm:text-sm p-4 rounded-2xl border border-[#E6D9CF] bg-white focus:outline-none focus:border-[#845E4C] transition"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-[#2A1C16] text-white font-semibold py-4 rounded-2xl text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-xl hover:bg-[#3E2A21] transition cursor-pointer"
      >
        <Send size={16} />
        <span>Отправить стилисту</span>
      </button>

      <div className="flex items-center justify-center gap-1.5 text-[11px] text-stone-400 mt-3">
        <Clock size={13} />
        <span>Отвечаем ежедневно с 10:00 до 21:00</span>
      </div>
    </form>
  );
};