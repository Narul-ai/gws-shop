import React from 'react';
import { Heart, ChevronRight, ShoppingBag } from 'lucide-react';

export const ProductCard = ({ product, index, isFav, onToggleFav, onSelect }) => {
  const formatMoney = (num) => num.toLocaleString('ru-RU') + ' ₸';

  return (
    <div 
      className="bg-white rounded-3xl overflow-hidden shadow-sm border border-[#E6D9CF]/70 flex flex-col justify-between group transition-all duration-300 hover:shadow-xl hover:-translate-y-1.5 animate-fade-in-up"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      {/* Верхняя часть с картинкой */}
      <div className="relative aspect-[3/4] overflow-hidden bg-stone-100 cursor-pointer" onClick={() => onSelect(product)}>
        <img 
          src={product.image} 
          alt={product.title} 
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out" 
        />
        
        {/* Бейдж товара (Новинка, Хит и т.д.) */}
        {product.badge && (
          <span className="absolute top-3 left-3 bg-[#2A1C16]/90 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
            {product.badge}
          </span>
        )}
        
        {/* Кнопка избранного (Лайк) */}
        <button 
          onClick={(e) => onToggleFav(product._id, e)} 
          className="absolute top-3 right-3 p-2.5 rounded-full bg-white/90 backdrop-blur-md text-stone-700 hover:text-red-500 transition active:scale-75 shadow-md cursor-pointer"
          title="В избранное"
        >
          <Heart size={18} className={isFav ? 'fill-red-500 text-red-500' : ''} />
        </button>

        {/* Размеры плашка снизу картинки */}
        <div className="absolute bottom-3 left-3 right-3 bg-white/90 backdrop-blur-md rounded-xl py-1.5 px-3 flex justify-between items-center shadow-sm">
          <span className="text-[11px] font-medium text-[#4A3328]">
            Размеры: <span className="font-bold">{product.sizes.join(', ')}</span>
          </span>
        </div>
      </div>

      {/* Нижняя часть с текстом и кнопкой */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Плашка со статусом наличия */}
         {product.stockNote && (
            <div className="flex items-center gap-1.5 text-[11px] text-[#845E4C] font-semibold mb-2 bg-[#F5EFEA] px-2.5 py-1 rounded-lg w-fit border border-[#E6D9CF]/60">
              <span>🔥</span>
              <span>{product.stockNote}</span>
            </div>
          )}

          {/* Название товара */}
          <h4 className="font-serif text-sm sm:text-base font-bold text-[#2A1C16] line-clamp-1 mb-1.5 group-hover:text-[#845E4C] transition-colors">
            {product.title}
          </h4>

          {/* Цены */}
          <div className="flex items-baseline gap-2 mb-4">
            <span className="font-bold text-base sm:text-lg text-[#2A1C16]">
              {formatMoney(product.price)}
            </span>
            {product.oldPrice && (
              <span className="text-xs text-stone-400 line-through">
                {formatMoney(product.oldPrice)}
              </span>
            )}
          </div>
        </div>

        {/* Кнопка заказа */}
        <button 
          onClick={() => onSelect(product)} 
          className="w-full bg-[#F5EFEA] group-hover:bg-[#2A1C16] group-hover:text-white text-[#2A1C16] text-xs font-semibold py-3 rounded-2xl transition-all duration-300 flex items-center justify-center gap-1.5 active:scale-95 cursor-pointer shadow-2xs"
        >
          <ShoppingBag size={15} />
          <span>Заказать модель</span>
          <ChevronRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>
    </div>
  );
};