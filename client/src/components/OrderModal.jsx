import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { ProductModalContent } from './modals/ProductModalContent';
import { FastOrderModalContent } from './modals/FastOrderModalContent';
import { FavoritesModalContent } from './modals/FavoritesModalContent';

export const OrderModal = ({
  isOpen,
  onClose,
  mode,
  selectedProduct,
  favorites = [],
  products = [],
  onSelectProduct,
}) => {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose?.();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !mode) return null;

  const isProductMode = mode.type === 'product' && Boolean(selectedProduct);
  const favProducts = products.filter((p) => favorites.includes(p._id));

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-end md:items-center justify-center p-0 md:p-4 transition-opacity duration-200"
    >
      {/* Клик по фону закрывает модалку */}
      <div
        className="absolute inset-0 cursor-pointer"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Адаптивный контейнер: шторка снизу на мобилке, окно по центру на ПК */}
      <div
        className={`relative z-10 bg-[#FAF7F5] w-full ${
          isProductMode ? 'md:max-w-3xl' : 'md:max-w-md'
        } rounded-t-[32px] md:rounded-[32px] max-h-[90vh] overflow-y-auto p-6 md:p-8 shadow-2xl border border-[#E6D9CF] animate-fade-in-up`}
      >
        {/* Полоска для свайпа только на мобильном */}
        <div className="md:hidden w-12 h-1.5 bg-[#D5BEB1] rounded-full mx-auto mb-5" />

        {/* Кнопка закрытия остаётся доступной при прокрутке */}
        <button
          type="button"
          onClick={onClose}
          className="sticky top-0 float-right z-20 -mt-2 -mr-2 md:-mt-3 md:-mr-3 p-2 text-stone-500 hover:text-[#2A1C16] hover:bg-[#F5EFEA] bg-white rounded-full shadow-sm border border-[#E6D9CF]/80 transition active:scale-95 cursor-pointer"
          aria-label="Закрыть окно"
        >
          <X size={18} />
        </button>

        <div className="clear-both">
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
    </div>
  );
};