import React from 'react';
import { Heart, Send, ShoppingBag } from 'lucide-react';

export const FavoritesModalContent = ({ favProducts, onSelectProduct, onClose }) => {
  const formatMoney = (num) => num?.toLocaleString('ru-RU') + ' ₸';

  const sendWishlistToWhatsApp = () => {
    const listText = favProducts
      .map((p, idx) => `${idx + 1}. ${p.title} (${formatMoney(p.price)})`)
      .join('%0A');
    const text = `Здравствуйте! Понравились эти модели на сайте GWS, подскажите наличие размеров:%0A%0A${listText}`;
    window.open(`https://wa.me/77000000000?text=${text}`, '_blank');
    onClose();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4 pr-8">
        <div>
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#2A1C16]">
            Избранные модели
          </h3>
          <p className="text-xs text-stone-500">
            Сохранено моделей: {favProducts.length}
          </p>
        </div>
      </div>

      {favProducts.length === 0 ? (
        <div className="text-center py-10 px-4 bg-white rounded-3xl border border-[#E6D9CF]/60">
          <div className="w-12 h-12 rounded-full bg-[#F5EFEA] text-[#845E4C] flex items-center justify-center mx-auto mb-3">
            <Heart size={22} />
          </div>
          <h4 className="font-serif text-base font-bold text-[#2A1C16] mb-1">
            В избранном пока пусто
          </h4>
          <p className="text-xs text-stone-500 mb-5 max-w-[240px] mx-auto">
            Нажимайте на сердечко в карточках товаров, чтобы собрать свой вишлист для примерки
          </p>
          <button
            onClick={onClose}
            className="bg-[#2A1C16] text-white text-xs font-semibold px-6 py-3 rounded-full uppercase tracking-wider cursor-pointer"
          >
            Перейти в каталог
          </button>
        </div>
      ) : (
        <>
          <div className="space-y-3 max-h-80 overflow-y-auto mb-5 pr-1">
            {favProducts.map((p) => (
              <div
                key={p._id}
                className="flex items-center justify-between p-3 bg-white rounded-2xl border border-[#E6D9CF]/70 shadow-2xs gap-3"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <img
                    src={p.image}
                    className="w-14 h-18 object-cover rounded-xl shrink-0"
                    alt={p.title}
                  />
                  <div className="min-w-0">
                    <h4 className="text-xs sm:text-sm font-semibold text-[#2A1C16] truncate">
                      {p.title}
                    </h4>
                    <span className="text-xs sm:text-sm text-[#845E4C] font-bold mt-1 block">
                      {formatMoney(p.price)}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => onSelectProduct(p)}
                  className="shrink-0 inline-flex items-center gap-1.5 text-xs bg-[#2A1C16] text-white px-4 py-2.5 rounded-xl font-medium shadow-sm hover:bg-[#3E2A21] transition cursor-pointer"
                >
                  <ShoppingBag size={13} />
                  <span>Заказать</span>
                </button>
              </div>
            ))}
          </div>

          <button
            onClick={sendWishlistToWhatsApp}
            className="w-full bg-[#F5EFEA] hover:bg-[#E6D9CF] text-[#2A1C16] font-semibold py-3.5 rounded-2xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition cursor-pointer border border-[#D8C5B8]"
          >
            <Send size={15} />
            <span>Уточнить наличие всех в WhatsApp</span>
          </button>
        </>
      )}
    </div>
  );
};