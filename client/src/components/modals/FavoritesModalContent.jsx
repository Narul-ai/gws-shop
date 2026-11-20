import React from 'react';
import { Heart, Send, ShoppingBag, Trash2 } from 'lucide-react';

export const FavoritesModalContent = ({
  favProducts = [],
  onSelectProduct,
  onToggleFavorite,
  onClearFavorites,
  onClose,
}) => {
  const formatMoney = (num) => (Number(num) || 0).toLocaleString('ru-RU') + ' ₸';

  const totalAmount = favProducts.reduce((sum, item) => sum + (Number(item.price) || 0), 0);

  const sendWishlistToWhatsApp = () => {
    if (!favProducts.length) return;

    const listText = favProducts
      .map((p, idx) => `${idx + 1}. ${p.title} — ${formatMoney(p.price)}`)
      .join('%0A');
    const summaryLine = `%0A%0A*Итого по подборке:* ${formatMoney(totalAmount)}`;
    const text = `Здравствуйте! Понравились эти модели в каталоге, подскажите наличие размеров:%0A%0A${listText}${summaryLine}`;

    window.open(`https://wa.me/77000000000?text=${text}`, '_blank', 'noopener,noreferrer');
    onClose?.();
  };

  const handleGoToCatalog = () => {
    onClose?.();
    const catalogEl = document.getElementById('catalog');
    if (catalogEl) {
      catalogEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div>
      {/* Шапка вишлиста */}
      <div className="flex items-start justify-between gap-3 mb-4 pr-8">
        <div>
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#2A1C16]">
            Избранные модели
          </h3>
          <p className="text-xs text-stone-500 mt-0.5">
            Сохранено: <strong className="text-[#2A1C16]">{favProducts.length}</strong>
            {favProducts.length > 0 && (
              <>
                {' '}• На сумму{' '}
                <strong className="text-[#845E4C]">{formatMoney(totalAmount)}</strong>
              </>
            )}
          </p>
        </div>

        {favProducts.length > 1 && onClearFavorites && (
          <button
            type="button"
            onClick={onClearFavorites}
            className="text-[11px] text-stone-400 hover:text-red-600 underline underline-offset-2 transition cursor-pointer shrink-0 pt-1"
          >
            Очистить всё
          </button>
        )}
      </div>

      {/* Пустое состояние */}
      {favProducts.length === 0 ? (
        <div className="text-center py-10 px-4 bg-white rounded-3xl border border-[#E6D9CF]/70">
          <div className="w-12 h-12 rounded-full bg-[#F5EFEA] text-[#845E4C] flex items-center justify-center mx-auto mb-3 border border-[#E6D9CF]/60">
            <Heart size={22} />
          </div>
          <h4 className="font-serif text-base font-bold text-[#2A1C16] mb-1">
            В избранном пока пусто
          </h4>
          <p className="text-xs text-stone-500 mb-5 max-w-[260px] mx-auto leading-relaxed">
            Нажимайте на сердечко в карточках товаров, чтобы собрать свой список для примерки или сравнения
          </p>
          <button
            type="button"
            onClick={handleGoToCatalog}
            className="bg-[#2A1C16] hover:bg-[#3E2A21] text-white text-xs font-semibold px-6 py-3 rounded-full uppercase tracking-wider transition cursor-pointer"
          >
            Перейти в каталог
          </button>
        </div>
      ) : (
        <>
          {/* Список избранных позиций */}
          <div className="space-y-3 max-h-80 overflow-y-auto mb-5 pr-1">
            {favProducts.map((p) => (
              <div
                key={p._id}
                className="flex items-center justify-between p-3 bg-white rounded-2xl border border-[#E6D9CF]/70 hover:border-[#D8C5B8] transition gap-3"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <img
                    src={p.image}
                    className="w-14 h-16 object-cover rounded-xl shrink-0 bg-stone-100"
                    alt={p.title}
                  />
                  <div className="min-w-0">
                    {p.category && (
                      <span className="text-[9px] uppercase tracking-widest text-[#B89685] font-semibold block truncate">
                        {p.category}
                      </span>
                    )}
                    <h4 className="text-xs sm:text-sm font-semibold text-[#2A1C16] truncate">
                      {p.title}
                    </h4>
                    <span className="text-xs sm:text-sm text-[#845E4C] font-bold mt-0.5 block">
                      {formatMoney(p.price)}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  {onToggleFavorite && (
                    <button
                      type="button"
                      onClick={() => onToggleFavorite(p._id)}
                      className="p-2.5 rounded-xl text-stone-400 hover:text-red-600 hover:bg-red-50/70 border border-transparent hover:border-red-100 transition cursor-pointer"
                      title="Убрать из избранного"
                      aria-label={`Убрать ${p.title} из избранного`}
                    >
                      <Trash2 size={15} />
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={() => onSelectProduct?.(p)}
                    className="inline-flex items-center gap-1.5 text-xs bg-[#2A1C16] text-white px-3.5 sm:px-4 py-2.5 rounded-xl font-medium shadow-sm hover:bg-[#3E2A21] transition active:scale-95 cursor-pointer"
                  >
                    <ShoppingBag size={13} />
                    <span>Заказать</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Отправка всего списка */}
          <button
            type="button"
            onClick={sendWishlistToWhatsApp}
            className="w-full bg-[#F5EFEA] hover:bg-[#E6D9CF] text-[#2A1C16] font-semibold py-3.5 rounded-2xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition active:scale-[0.99] cursor-pointer border border-[#D8C5B8]"
          >
            <Send size={15} />
            <span>Уточнить наличие всех в WhatsApp</span>
          </button>
        </>
      )}
    </div>
  );
};