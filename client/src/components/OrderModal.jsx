import React from 'react';
import { X } from 'lucide-react';
import { ProductModalContent } from './modals/ProductModalContent';
import { FastOrderModalContent } from './modals/FastOrderModalContent';
import { FavoritesModalContent } from './modals/FavoritesModalContent';

export const OrderModal = ({
  isOpen,
  onClose,
  mode,
  selectedProduct,
  favorites,
  products,
  onSelectProduct,
}) => {
  if (!isOpen) return null;

  const isProductMode = mode.type === 'product' && selectedProduct;
  const favProducts = products.filter((p) => favorites.includes(p._id));

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-end md:items-center justify-center p-0 md:p-4 transition-all">
      {/* Клик по фону закрывает модалку */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Адаптивный контейнер: снизу на мобилке, по центру на ПК (шире для карточки товара) */}
      <div
        className={`relative z-10 bg-[#FAF7F5] w-full ${
          isProductMode ? 'md:max-w-3xl' : 'md:max-w-md'
        } rounded-t-[32px] md:rounded-[32px] max-h-[90vh] overflow-y-auto p-6 md:p-8 shadow-2xl border border-[#E6D9CF] animate-fade-in-up`}
      >
        {/* Полоска для свайпа только на мобильном */}
        <div className="md:hidden w-12 h-1.5 bg-[#D5BEB1] rounded-full mx-auto mb-5" />

        {/* Кнопка закрытия */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-stone-400 hover:text-stone-800 bg-white rounded-full shadow-sm border border-stone-100 transition cursor-pointer"
          aria-label="Закрыть"
        >
          <X size={18} />
        </button>

        {isProductMode && (
          <ProductModalContent product={selectedProduct} onClose={onClose} />
        )}

        {mode.type === 'fastOrder' && (
          <FastOrderModalContent reason={mode.reason} onClose={onClose} />
        )}

        {mode.type === 'favorites' && (
          <FavoritesModalContent
            favProducts={favProducts}
            onSelectProduct={onSelectProduct}
            onClose={onClose}
          />
        )}
      </div>
    </div>
  );
};