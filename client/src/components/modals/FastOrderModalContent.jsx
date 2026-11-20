import React, { useState } from 'react';
import { Send, Sparkles, Clock, MessageCircle, ShieldCheck } from 'lucide-react';

const QUICK_TAGS = ['XS / 40', 'S / 42', 'M / 44', 'L / 46', 'Нужна примерка'];

export const FastOrderModalContent = ({ reason = 'Консультация со стилистом', onClose }) => {
  const [channel, setChannel] = useState('whatsapp'); // 'whatsapp' | 'telegram'
  const [custName, setCustName] = useState('');
  const [custContact, setCustContact] = useState('');
  const [custParams, setCustParams] = useState('');

  const appendQuickTag = (tag) => {
    setCustParams((prev) => {
      const trimmed = prev.trim();
      if (!trimmed) return tag;
      if (trimmed.toLowerCase().includes(tag.toLowerCase())) return trimmed;
      return `${trimmed}, ${tag}`;
    });
  };

  const resetForm = () => {
    setCustName('');
    setCustContact('');
    setCustParams('');
    setChannel('whatsapp');
  };

  const submitGeneralOrder = (e) => {
    e.preventDefault();
    const name = custName.trim() || 'Гость';
    const contact = custContact.trim() || 'Не указан';
    const channelLabel = channel === 'whatsapp' ? 'WhatsApp' : 'Telegram';
    const paramsLine = custParams.trim()
      ? `%0A• *Параметры / пожелания:* ${encodeURIComponent(custParams.trim())}`
      : '';

    const message =
      `Здравствуйте! Новая заявка из каталога:%0A` +
      `• *Запрос:* ${encodeURIComponent(reason)}%0A` +
      `• *Имя:* ${encodeURIComponent(name)}%0A` +
      `• *Связь (${channelLabel}):* ${encodeURIComponent(contact)}${paramsLine}`;

    if (channel === 'whatsapp') {
      window.open(`https://wa.me/77000000000?text=${message}`, '_blank', 'noopener,noreferrer');
    } else {
      const plainText = decodeURIComponent(message.replace(/%0A/g, '\n').replace(/\*/g, ''));
      window.open(
        `https://t.me/share/url?url=https://example.com&text=${encodeURIComponent(plainText)}`,
        '_blank',
        'noopener,noreferrer'
      );
    }

    resetForm();
    onClose?.();
  };

  return (
    <form onSubmit={submitGeneralOrder} className="py-1">
      {/* Шапка модалки */}
      <div className="text-center mb-6 pr-6">
        <div className="w-14 h-14 bg-gradient-to-br from-[#F5EFEA] to-[#EAD8CA] rounded-2xl rotate-3 flex items-center justify-center mx-auto mb-3.5 text-[#845E4C] border border-[#E6D9CF] shadow-2xs">
          <Sparkles size={24} className="-rotate-3" />
        </div>
        <span className="text-[10px] uppercase tracking-[0.22em] font-semibold text-[#845E4C] block mb-1">
          Персональный запрос
        </span>
        <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#2A1C16] leading-snug">
          {reason}
        </h3>
        <p className="text-xs text-stone-500 mt-1.5 max-w-xs mx-auto leading-relaxed">
          Оставьте контакты и удобный мессенджер — специалист поможет с размером и подбором моделей
        </p>
      </div>

      {/* Выбор канала связи */}
      <div className="mb-4">
        <label className="block text-[11px] font-semibold uppercase tracking-wider text-stone-600 mb-2">
          Где удобнее ответить
        </label>
        <div className="grid grid-cols-2 gap-2 p-1 bg-[#F5EFEA] rounded-2xl border border-[#E6D9CF]/80">
          <button
            type="button"
            onClick={() => setChannel('whatsapp')}
            className={`py-2.5 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition cursor-pointer ${
              channel === 'whatsapp'
                ? 'bg-[#2A1C16] text-white shadow-sm'
                : 'text-stone-600 hover:text-[#2A1C16]'
            }`}
          >
            <MessageCircle size={14} />
            <span>WhatsApp</span>
          </button>
          <button
            type="button"
            onClick={() => setChannel('telegram')}
            className={`py-2.5 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition cursor-pointer ${
              channel === 'telegram'
                ? 'bg-[#2A1C16] text-white shadow-sm'
                : 'text-stone-600 hover:text-[#2A1C16]'
            }`}
          >
            <Send size={14} />
            <span>Telegram</span>
          </button>
        </div>
      </div>

      {/* Поля ввода */}
      <div className="space-y-3.5 mb-5">
        <div>
          <label className="block text-[11px] font-medium text-stone-600 mb-1.5 ml-1">
            Ваше имя
          </label>
          <input
            type="text"
            required
            placeholder="Например, Алина"
            value={custName}
            onChange={(e) => setCustName(e.target.value)}
            className="w-full text-xs sm:text-sm px-4 py-3.5 rounded-2xl border border-[#E6D9CF] bg-white text-[#2A1C16] placeholder:text-stone-400 focus:outline-none focus:border-[#845E4C] focus:ring-2 focus:ring-[#845E4C]/15 transition"
          />
        </div>

        <div>
          <label className="block text-[11px] font-medium text-stone-600 mb-1.5 ml-1">
            {channel === 'whatsapp' ? 'Номер WhatsApp' : 'Телефон или @username в Telegram'}
          </label>
          <input
            type={channel === 'whatsapp' ? 'tel' : 'text'}
            required
            placeholder={channel === 'whatsapp' ? '+7 (700) 000-00-00' : '@username или +7...'}
            value={custContact}
            onChange={(e) => setCustContact(e.target.value)}
            className="w-full text-xs sm:text-sm px-4 py-3.5 rounded-2xl border border-[#E6D9CF] bg-white text-[#2A1C16] placeholder:text-stone-400 focus:outline-none focus:border-[#845E4C] focus:ring-2 focus:ring-[#845E4C]/15 transition"
          />
        </div>

        <div>
          <label className="block text-[11px] font-medium text-stone-600 mb-1.5 ml-1">
            Параметры или пожелания <span className="text-stone-400 font-normal">(необязательно)</span>
          </label>
          <input
            type="text"
            placeholder="Рост, размер, цвет или удобное время"
            value={custParams}
            onChange={(e) => setCustParams(e.target.value)}
            className="w-full text-xs sm:text-sm px-4 py-3.5 rounded-2xl border border-[#E6D9CF] bg-white text-[#2A1C16] placeholder:text-stone-400 focus:outline-none focus:border-[#845E4C] focus:ring-2 focus:ring-[#845E4C]/15 transition"
          />

          {/* Быстрые подсказки */}
          <div className="flex flex-wrap gap-1.5 mt-2">
            {QUICK_TAGS.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => appendQuickTag(tag)}
                className="text-[10px] font-medium px-2.5 py-1 rounded-full bg-[#F5EFEA] hover:bg-[#E6D9CF] text-[#6E4D3E] border border-[#E6D9CF]/80 transition cursor-pointer"
              >
                + {tag}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Кнопка отправки */}
      <button
        type="submit"
        className="w-full bg-[#2A1C16] text-white font-semibold py-4 rounded-2xl text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg hover:bg-[#3E2A21] active:scale-[0.99] transition cursor-pointer"
      >
        <Send size={15} />
        <span>
          {channel === 'whatsapp' ? 'Открыть чат в WhatsApp' : 'Перейти в Telegram'}
        </span>
      </button>

      {/* Футер формы */}
      <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-[11px] text-stone-400 mt-3.5">
        <span className="inline-flex items-center gap-1">
          <Clock size={12} className="text-[#845E4C]" />
          <span>Ежедневно 10:00 – 21:00</span>
        </span>
        <span className="inline-flex items-center gap-1">
          <ShieldCheck size={12} className="text-[#845E4C]" />
          <span>Без спама</span>
        </span>
      </div>
    </form>
  );
};