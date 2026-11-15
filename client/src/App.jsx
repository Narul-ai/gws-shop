import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Advantages } from './components/Advantages';
import { ProductCard } from './components/ProductCard';
import { ShowroomBanner } from './components/ShowroomBanner';
import { OrderModal } from './components/OrderModal';
import { MessageCircle, ShoppingBag, Sparkles, Star, Globe, MapPin, Phone, Clock } from 'lucide-react';

export default function App() {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState('all');
  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem('gws_favorites');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [toastText, setToastText] = useState('');
  const [modalMode, setModalMode] = useState({ isOpen: false, type: '', reason: '' });
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    localStorage.setItem('gws_favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    axios
      .get(`https://gws-shop.onrender.com/api/products?category=${category}`)
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err));
  }, [category]);

  const showToast = (msg) => {
    setToastText(msg);
    setTimeout(() => setToastText(''), 2500);
  };

  const toggleFavorite = (id, e) => {
    e.stopPropagation();
    if (favorites.includes(id)) {
      setFavorites(favorites.filter((favId) => favId !== id));
      showToast('Удалено из избранного');
    } else {
      setFavorites([...favorites, id]);
      showToast('Добавлено в избранное ❤️');
    }
  };

  const lookbookSets = [
    {
      title: 'Офисный шик & Встречи',
      desc: 'Базовый твидовый костюм + кожаная сумка Mini GWS',
      price: '68 900 ₸',
      oldPrice: '73 900 ₸',
      image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800&auto=format&fit=crop',
    },
    {
      title: 'Вечерний выход в Астане',
      desc: 'Шелковое платье Silk + подбор аксессуаров стилистом',
      price: '44 000 ₸',
      oldPrice: '49 500 ₸',
      image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=800&auto=format&fit=crop',
    },
    {
      title: 'Осенняя классика',
      desc: 'Элегантное пальто KAS live + шелковый платок в подарок',
      price: '45 900 ₸',
      oldPrice: '52 000 ₸',
      image: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?q=80&w=800&auto=format&fit=crop',
    },
  ];

  const reviews = [
    {
      name: 'Айгерим К.',
      city: 'Астана',
      text: 'Заезжала в шоурум на Мангилик Ел за пальто — посадка просто идеальная, ткань плотная и очень приятная. Девочки помогли собрать целый образ!',
      item: 'Элегантное пальто KAS live',
    },
    {
      name: 'Мадина С.',
      city: 'Алматы',
      text: 'Заказывала шелковое платье с доставкой в Алматы. Пришло за 2 дня в красивой упаковке, размер подошел точно по меркам стилиста.',
      item: 'Шелковое вечернее платье Silk',
    },
    {
      name: 'Диана Т.',
      city: 'Астана',
      text: 'Обожаю GWS за то, что вещи не как у всех в масс-маркете. Твидовый костюм ношу уже второй месяц — выглядит как новый.',
      item: 'Базовый твидовый костюм',
    },
  ];

  return (
    <div className="min-h-screen bg-[#FAF7F5] text-gray-800 font-sans pb-24 md:pb-12">
      {/* Toast уведомления */}
      {toastText && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-[#2A1C16] text-white text-xs sm:text-sm px-5 py-2.5 rounded-full shadow-xl animate-fade-in-up">
          {toastText}
        </div>
      )}

      {/* Шапка сайта */}
      <Header
        favCount={favorites.length}
        onOpenFav={() => setModalMode({ isOpen: true, type: 'favorites' })}
        onOpenOrder={() =>
          setModalMode({ isOpen: true, type: 'fastOrder', reason: 'Быстрый заказ со страницы' })
        }
        showToast={showToast}
      />

      {/* Основной контент на всю ширину контейнера */}
      <main>
        {/* Главный экран */}
        <Hero
          onOpenFastOrder={(reason) => setModalMode({ isOpen: true, type: 'fastOrder', reason })}
        />

        {/* Преимущества */}
        <div id="advantages" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Advantages />
        </div>

        {/* Секция каталога */}
        <section id="catalog" className="max-w-7xl mx-auto pt-8 pb-4 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-6">
            <div>
              <span className="text-[11px] uppercase tracking-[0.25em] text-[#845E4C] font-semibold block mb-1">
                Коллекция шоурума
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#2A1C16]">
                Каталог одежды
              </h2>
            </div>
            <span className="text-xs sm:text-sm text-[#845E4C] font-medium bg-[#F5EFEA] px-3.5 py-1.5 rounded-full self-start sm:self-auto border border-[#E6D9CF]/60">
              Найдено: {products.length} моделей
            </span>
          </div>

          {/* Фильтры категорий */}
          <div className="flex gap-2.5 overflow-x-auto pb-3 no-scrollbar">
            {[
              { id: 'all', name: 'Все новинки' },
              { id: 'coats', name: 'Пальто & Куртки' },
              { id: 'dresses', name: 'Вечерние платья' },
              { id: 'casual', name: 'Базовый гардероб' },
              { id: 'acc', name: 'Аксессуары' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setCategory(cat.id)}
                className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap transition cursor-pointer ${
                  category === cat.id
                    ? 'bg-[#2A1C16] text-white shadow-md'
                    : 'bg-white text-stone-600 hover:text-[#2A1C16] border border-[#E6D9CF] hover:border-[#B89685]'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Адаптивная сетка товаров: 2 колонки на телефоне, 3 на планшете, 4 на ПК */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 mt-4">
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

        {/* Секция: Готовые капсулы / Lookbook (убирает ощущение пустоты и повышает средний чек) */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8">
            <div>
              <span className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.25em] text-[#845E4C] font-semibold mb-1">
                <Sparkles size={13} /> Стилизация GWS
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#2A1C16]">
                Готовые образы сезона
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-stone-500 mt-1 sm:mt-0">
              Скидка до 15% при покупке готового сета
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {lookbookSets.map((set, idx) => (
              <div
                key={idx}
                className="group bg-white rounded-3xl overflow-hidden border border-[#E6D9CF]/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
              >
                <div className="relative h-72 overflow-hidden">
                  <img
                    src={set.image}
                    alt={set.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
                  />
                  <span className="absolute top-3 left-3 bg-[#2A1C16]/85 backdrop-blur-md text-white text-[10px] uppercase tracking-wider px-3 py-1 rounded-full">
                    Капсульный сет
                  </span>
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif text-lg font-bold text-[#2A1C16] mb-1">
                      {set.title}
                    </h3>
                    <p className="text-xs text-stone-500 leading-relaxed mb-4">{set.desc}</p>
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t border-[#F5EFEA]">
                    <div>
                      <span className="text-base font-bold text-[#2A1C16]">{set.price}</span>
                      <span className="text-xs text-stone-400 line-through ml-2">
                        {set.oldPrice}
                      </span>
                    </div>
                    <button
                      onClick={() =>
                        setModalMode({
                          isOpen: true,
                          type: 'fastOrder',
                          reason: `Бронь образа: ${set.title}`,
                        })
                      }
                      className="text-xs font-semibold text-[#845E4C] hover:text-[#2A1C16] underline underline-offset-4 cursor-pointer"
                    >
                      Заказать сет →
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Баннер шоурума в Астане */}
        <div id="showroom" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ShowroomBanner
            onOpenFastOrder={(reason) => setModalMode({ isOpen: true, type: 'fastOrder', reason })}
          />
        </div>

        {/* Секция: Отзывы клиенток */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center max-w-xl mx-auto mb-8">
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#845E4C] font-semibold block mb-1">
              Доверие покупательниц
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#2A1C16]">
              Отзывы о шоуруме GWS
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.map((rev, idx) => (
              <div
                key={idx}
                className="bg-white border border-[#E6D9CF]/80 rounded-3xl p-6 shadow-2xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-1 text-[#845E4C] mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} className="fill-[#845E4C]" />
                    ))}
                  </div>
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed italic mb-4">
                    «{rev.text}»
                  </p>
                </div>
                <div className="pt-3 border-t border-[#F5EFEA] flex items-center justify-between">
                  <div>
                    <p className="text-sm font-bold text-[#2A1C16]">{rev.name}</p>
                    <p className="text-[11px] text-stone-400">г. {rev.city}</p>
                  </div>
                  <span className="text-[10px] bg-[#F5EFEA] text-[#845E4C] px-2.5 py-1 rounded-full font-medium">
                    {rev.item}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Полноценный адаптивный футер */}
      <footer className="bg-[#2A1C16] text-[#F5EFEA] mt-10 pt-12 pb-24 md:pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-8 border-b border-white/10">
            <div>
              <div className="font-serif text-2xl font-bold tracking-[0.25em] text-white mb-2">
                G W S
              </div>
              <p className="text-xs text-[#E6D9CF]/80 leading-relaxed max-w-xs">
                Шоурум женской одежды в Астане. Премиальные ткани, капсульные коллекции и индивидуальный подбор образов.
              </p>
            </div>

            <div className="space-y-2.5 text-xs text-[#E6D9CF]/90">
              <h4 className="font-serif text-base font-semibold text-white mb-3">Контакты</h4>
              <p className="flex items-center gap-2">
                <MapPin size={14} className="text-[#B89685]" /> г. Астана, пр. Мангилик Ел (Бутик GWS)
              </p>
              <p className="flex items-center gap-2">
                <Clock size={14} className="text-[#B89685]" /> Ежедневно с 10:00 до 21:00
              </p>
              <p className="flex items-center gap-2">
                <Phone size={14} className="text-[#B89685]" /> +7 (777) 123-45-67
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="font-serif text-base font-semibold text-white mb-3">Мы в соцсетях</h4>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white text-xs px-4 py-2.5 rounded-full transition"
              >
                <Globe size={15} />
                <span>@gowithshop</span>
              </a>
            </div>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#E6D9CF]/60 gap-2">
            <p>© 2026 GWS Shop Astana. Все права защищены.</p>
            <p>Доставка по всему Казахстану • Оплата при получении</p>
          </div>
        </div>
      </footer>

      {/* Закрепленная нижняя плашка ТОЛЬКО для телефонов (< 768px) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/90 backdrop-blur-md border-t border-[#E6D9CF]/80 p-3 shadow-2xl">
        <div className="flex items-center gap-3">
          <button
            onClick={() =>
              setModalMode({
                isOpen: true,
                type: 'fastOrder',
                reason: 'Консультация и подбор образа',
              })
            }
            className="flex-1 bg-[#2A1C16] text-white py-3.5 px-4 rounded-full font-medium text-xs flex items-center justify-center gap-2 shadow-md active:scale-95"
          >
            <ShoppingBag size={16} /> <span>Заказать в 1 клик</span>
          </button>

          <a
            href="https://wa.me/77000000000?text=Здравствуйте!%20Пишу%20с%20сайта%20GWS%20Астана"
            target="_blank"
            rel="noreferrer"
            className="bg-[#25D366] text-white p-3.5 rounded-full shadow-lg flex items-center justify-center active:scale-95"
          >
            <MessageCircle size={20} />
          </a>
        </div>
      </div>

      {/* Плавающая кнопка WhatsApp для ПК (справа снизу) */}
      <a
        href="https://wa.me/77000000000?text=Здравствуйте!%20Пишу%20с%20сайта%20GWS%20Астана"
        target="_blank"
        rel="noreferrer"
        title="Написать в WhatsApp"
        className="hidden md:flex fixed bottom-6 right-6 z-40 bg-[#25D366] hover:bg-[#20bd5a] text-white px-5 py-3.5 rounded-full shadow-xl items-center gap-2.5 transition transform hover:scale-105"
      >
        <MessageCircle size={20} />
        <span className="text-xs font-semibold tracking-wide">WhatsApp шоурума</span>
      </a>

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