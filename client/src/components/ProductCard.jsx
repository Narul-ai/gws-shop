import React from 'react';
import { Heart, ChevronRight } from 'lucide-react';

export const ProductCard = ({ product, index, isFav, onToggleFav, onSelect }) => {
  const formatMoney = (num) => num.toLocaleString('ru-RU') + ' ₸';

  return (
    <div 
      className="bg-white rounded-2xl overflow-hidden shadow-sm border border-[#E6D9CF]/50 flex flex-col justify-between group transition-all duration-300 hover:shadow-lg hover:-translate-y-1 animate-fade-in-up"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-stone-100 cursor-pointer" onClick={() => onSelect(product)}>
        <img 
          src={product.image} 
          alt={product.title} 
          className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out" 
        />
        
        {product.badge && (
          <span className="absolute top-2 left-2 bg-[#2A1C16]/90 backdrop-blur-sm text-white text-[9px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm">
            {product.badge}
          </span>
        )}
        
        <button 
          onClick={(e) => onToggleFav(product._id, e)} 
          className="absolute top-2 right-2 p-2 rounded-full bg-white/80 backdrop-blur-md text-stone-700 hover:text-red-500 transition active:scale-75 shadow-sm"
        >
          <Heart size={16} className={isFav ? 'fill-red-500 text-red-500' : ''} />
        </button>

        <div className="absolute bottom-2 left-2 right-2 bg-white/90 backdrop-blur-md rounded-xl p-1.5 flex justify-between items-center opacity-95 shadow-sm">
          <span className="text-[10px] font-semibold text-[#4A3328] px-1">Размеры: {product.sizes.join(', ')}</span>
        </div>
      </div>

      <div className="p-3 flex-1 flex flex-col justify-between">
        <div>
          {/* Плашка с GIF-огоньком */}
          {product.stockNote && (
            <div className="flex items-center gap-1.5 text-[10px] text-[#9E7764] font-semibold mb-1.5 bg-[#F5EFEA] px-2 py-0.5 rounded-md w-fit border border-[#E6D9CF]/60">
              {/* Анимированный GIF огонька */}
              <img 
                src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExM3ZkZnFiOWE0dGJycjRrb3RwOGEwZXR2cjNrdG9vOHJieGkxa3ZpdCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/LpDmM2wSt6ac5fOHII/giphy.gif" 
                className="w-3.5 h-3.5 object-contain" 
                alt="Fire" 
              />
              <span>{product.stockNote}</span>
            </div>
          )}

          <h4 className="font-medium text-xs text-stone-900 line-clamp-1 mb-1 group-hover:text-[#845E4C] transition-colors">{product.title}</h4>
          <div className="flex items-baseline gap-1.5 mb-2">
            <span className="font-bold text-sm text-[#2A1C16]">{formatMoney(product.price)}</span>
            {product.oldPrice && <span className="text-[10px] text-stone-400 line-through">{formatMoney(product.oldPrice)}</span>}
          </div>
        </div>

        <button 
          onClick={() => onSelect(product)} 
          className="w-full bg-[#F5EFEA] group-hover:bg-[#2A1C16] group-hover:text-white text-[#2A1C16] text-[11px] font-semibold py-2.5 rounded-xl transition-all duration-300 flex items-center justify-center gap-1 active:scale-95"
        >
          <span>Заказать</span>
          <ChevronRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>
    </div>
  );
};