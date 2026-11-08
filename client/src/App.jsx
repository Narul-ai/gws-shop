import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Advantages } from './components/Advantages';
import { ProductCard } from './components/ProductCard';
import { ShowroomBanner } from './components/ShowroomBanner';
import { OrderModal } from './components/OrderModal';
import { MessageCircle, ShoppingBag } from 'lucide-react';

export default function App() {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState('all');
  const [favorites, setFavorites] = useState([]);
  const [toastText, setToastText] = useState('');
  const [modalMode, setModalMode] = useState({ isOpen: false, type: '', reason: '' });
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    axios.get(`https://gws-shop.onrender.com/api/products?category=${category}`)
      .then(res => setProducts(res.data))
      .catch(err => console.error(err));
  }, [category]);

  const showToast = (msg) => {
    setToastText(msg);
    setTimeout(() => setToastText(''), 2500);
  };

  const toggleFavorite = (id, e) => {
    e.stopPropagation();
    if (favorites.includes(id)) {
      setFavorites(favorites.filter(favId => favId !== id));
      showToast("Удалено из избранного");
    } else {
      setFavorites([...favorites, id]);
      showToast("Добавлено в избранное ❤️");
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF7F5] text-gray-800 font-sans pb-24">
      {/* Toast уведомления */}
      {toastText && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 bg-[#2A1C16] text-white text-xs px-4 py-2.5 rounded-full shadow-xl animate-fade-in-up">
          {toastText}
        </div>
      )}

      <Header 
        favCount={favorites.length} 
        onOpenFav={() => setModalMode({ isOpen: true, type: 'favorites' })}
        showToast={showToast}
      />

      <main className="max-w-md mx-auto">
        <Hero onOpenFastOrder={(reason) => setModalMode({ isOpen: true, type: 'fastOrder', reason })} />
        <Advantages />

        {/* Секция каталога */}
        <section id="catalog" className="pt-4 pb-2 px-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-serif text-xl font-bold text-[#2A1C16]">Каталог одежды</h2>
            <span className="text-xs text-[#B89685] font-medium">{products.length} моделей</span>
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
            {[
              { id: 'all', name: 'Все новинки' },
              { id: 'coats', name: 'Пальто & Куртки' },
              { id: 'dresses', name: 'Вечерние платья' },
              { id: 'casual', name: 'Базовый гардероб' },
              { id: 'acc', name: 'Аксессуары' }
            ].map(cat => (
              <button
                key={cat.id}
                onClick={() => setCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition ${category === cat.id ? 'bg-[#2A1C16] text-white shadow-sm' : 'bg-white text-gray-600 border border-[#E6D9CF]'}`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </section>

        {/* Сетка товаров */}
        <section className="px-4 py-2">
          <div className="grid grid-cols-2 gap-3.5">
            {products.map((product, index) => (
              <ProductCard
                key={product._id}
                index={index}
                product={product}
                isFav={favorites.includes(product._id)}
                onToggleFav={toggleFavorite}
                onSelect={(p) => {
                  setSelectedProduct(p);
                  setModalMode({ isOpen: true, type: 'product' });
                }}
              />
            ))}
          </div>
        </section>

        {/* Добавленные блоки для максимального зацепа руководства */}
        
        <ShowroomBanner onOpenFastOrder={(reason) => setModalMode({ isOpen: true, type: 'fastOrder', reason })} />

        {/* Футер */}
        <footer className="px-4 py-8 text-center text-xs text-stone-400 border-t border-[#E6D9CF]/60 mt-6">
          <div className="font-serif text-xl font-bold text-[#2A1C16] mb-1 tracking-widest">G W S</div>
          <p className="text-[11px] text-stone-500 mb-3">@gowithshop • Женская одежда Астана</p>
          <p className="text-[10px] text-stone-400">© 2026 GWS Shop. Все права защищены.</p>
        </footer>
      </main>

      {/* Закрепленная нижняя плашка */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/85 backdrop-blur-md border-t border-[#E6D9CF]/80 p-3 shadow-2xl">
        <div className="max-w-md mx-auto flex items-center gap-3">
          <button 
            onClick={() => setModalMode({ isOpen: true, type: 'fastOrder', reason: 'Консультация и подбор образа' })} 
            className="flex-1 bg-[#2A1C16] text-white py-3.5 px-4 rounded-full font-medium text-xs flex items-center justify-center gap-2 shadow-md hover:bg-[#4A3328] transition active:scale-95"
          >
            <ShoppingBag size={16} /> <span>Заказать в 1 клик</span>
          </button>

          <a 
            href="https://wa.me/77000000000?text=Здравствуйте!%20Пишу%20с%20сайта%20GWS%20Астана" 
            target="_blank" 
            rel="noreferrer"
            className="bg-[#25D366] text-white p-3.5 rounded-full shadow-lg flex items-center justify-center hover:opacity-90 transition active:scale-95"
          >
            <MessageCircle size={20} />
          </a>
        </div>
      </div>

      {/* Модальное окно */}
      <OrderModal
        isOpen={modalMode.isOpen}
        onClose={() => setModalMode({ isOpen: false, type: '', reason: '' })}
        mode={modalMode}
        selectedProduct={selectedProduct}
        favorites={favorites}
        products={products}
        onSelectProduct={(p) => {
          setSelectedProduct(p);
          setModalMode({ isOpen: true, type: 'product' });
        }}
      />
    </div>
  );
}