import React from 'react';
import { Heart, ChevronRight, ShoppingBag, Eye, Flame } from 'lucide-react';

export const ProductCard = ({ product, index = 0, isFav, onToggleFav, onSelect }) => {
  const price = Number(product.price) || 0;
  const oldPrice = Number(product.oldPrice) || 0;
  const sizes = Array.isArray(product.sizes) ? product.sizes : [];

  const formatMoney = (num) => num.toLocaleString('ru-RU') + ' ₸';

  const discountPercent =
    oldPrice > price ? Math.round(((oldPrice - price) / oldPrice) * 100) : null;

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    onToggleFav?.(product._id, e);
  };

  return (
    <article
      className="bg-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-sm border border-[#E6D9CF]/75 flex flex-col justify-between group transition-all duration-300 hover:shadow-xl hover:-translate-y-1.5 animate-fade-in-up"
      style={{ animationDelay: `${index * 70}ms` }}
    >
      {/* Верхняя часть с фото */}
      <div
        className="relative aspect-[3/4] overflow-hidden bg-stone-100 cursor-pointer"
        onClick={() => onSelect?.(product)}
      >
        <img
          src={product.image}
          alt={product.title}
          loading="lazy"
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
        />

        {/* Лёгкий градиент снизу для читаемости плашки */}
        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />

        {/* Верхние бейджи (Статус + Скидка) */}
        <div className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 flex flex-col items-start gap-1.5 max-w-[70%]">
          {product.badge && (
            <span className="bg-[#2A1C16]/90 backdrop-blur-md text-white text-[9px] sm:text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm truncate max-w-full">
              {product.badge}
            </span>
          )}
          {discountPercent && (
            <span className="bg-[#845E4C]/95 backdrop-blur-md text-white text-[9px] sm:text-[10px] font-bold px-2.5 py-0.5 rounded-full tracking-wider shadow-sm">
              −{discountPercent}%
            </span>
          )}
        </div>

        {/* Кнопка избранного */}
        <button
          type="button"
          onClick={handleFavoriteClick}
          className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3 p-2 sm:p-2.5 rounded-full bg-white/90 hover:bg-white backdrop-blur-md text-stone-700 hover:text-red-500 transition active:scale-75 shadow-md cursor-pointer z-10"
          title={isFav ? 'Убрать из избранного' : 'В избранное'}
          aria-label={isFav ? 'Убрать из избранного' : 'Добавить в избранное'}
        >
          <Heart
            size={17}
            className={isFav ? 'fill-red-500 text-red-500 transition-transform scale-110' : ''}
          />
        </button>

        {/* Кнопка быстрого просмотра по центру при наведении на ПК */}
        <div className="hidden md:flex absolute inset-0 items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <span className="inline-flex items-center gap-1.5 bg-white/95 backdrop-blur-md text-[#2A1C16] text-xs font-semibold px-4 py-2 rounded-full shadow-lg border border-[#E6D9CF]">
            <Eye size={14} className="text-[#845E4C]" />
            <span>Быстрый просмотр</span>
          </span>
        </div>

        {/* Плашка размеров снизу фото */}
        {sizes.length > 0 && (
          <div className="absolute bottom-2.5 left-2.5 right-2.5 sm:bottom-3 sm:left-3 sm:right-3 bg-white/92 backdrop-blur-md rounded-xl py-1.5 px-2.5 sm:px-3 flex items-center justify-between gap-1.5 shadow-sm border border-white/60">
            <span className="text-[10px] sm:text-[11px] font-medium text-[#4A3328] truncate">
              Размеры: <strong className="font-bold text-[#2A1C16]">{sizes.join(' • ')}</strong>
            </span>
            {product.color && (
              <span className="hidden sm:inline text-[10px] text-stone-500 shrink-0">
                {product.color}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Нижняя часть с информацией и кнопкой */}
      <div className="p-3.5 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Категория или статус остатка */}
          {product.stockNote ? (
            <div className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] text-[#845E4C] font-semibold mb-2 bg-[#F5EFEA] px-2.5 py-1 rounded-lg border border-[#E6D9CF]/70 max-w-full">
              <Flame size={12} className="text-[#845E4C] shrink-0" />
              <span className="truncate">{product.stockNote}</span>
            </div>
          ) : (
            product.category && (
              <span className="block text-[10px] uppercase tracking-widest text-[#B89685] font-semibold mb-1.5 truncate">
                {product.category}
              </span>
            )
          )}

          {/* Название модели */}
          <h4
            onClick={() => onSelect?.(product)}
            className="font-serif text-xs sm:text-base font-bold text-[#2A1C16] line-clamp-2 sm:line-clamp-1 mb-1.5 group-hover:text-[#845E4C] transition-colors cursor-pointer leading-snug"
          >
            {product.title}
          </h4>

          {/* Цены */}
          <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5 mb-3.5 sm:mb-4">
            <span className="font-bold text-sm sm:text-lg text-[#2A1C16]">
              {formatMoney(price)}
            </span>
            {oldPrice > price && (
              <span className="text-[11px] sm:text-xs text-stone-400 line-through">
                {formatMoney(oldPrice)}
              </span>
            )}
          </div>
        </div>

        {/* Кнопка выбора / заказа */}
        <button
          type="button"
          onClick={() => onSelect?.(product)}
          className="w-full bg-[#F5EFEA] group-hover:bg-[#2A1C16] group-hover:text-white text-[#2A1C16] text-[11px] sm:text-xs font-semibold py-2.5 sm:py-3 px-3 rounded-xl sm:rounded-2xl transition-all duration-300 flex items-center justify-center gap-1.5 active:scale-95 cursor-pointer shadow-2xs"
        >
          <ShoppingBag size={14} className="shrink-0" />
          <span className="truncate">Выбрать размер</span>
          <ChevronRight
            size={14}
            className="hidden sm:inline shrink-0 group-hover:translate-x-0.5 transition-transform"
          />
        </button>
      </div>
    </article>
  );
};