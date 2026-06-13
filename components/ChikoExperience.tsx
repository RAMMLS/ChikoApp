"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import BrandLogo from "@/components/BrandLogo";
import {
  categories,
  menuItems,
  showcasePosters,
  type MenuCategoryId,
  type MenuItem,
} from "@/lib/menu-data";

type ViewId = "home" | "menu" | "favorites" | "info";

type ChikoExperienceProps = {
  view: ViewId;
  initialCategory?: MenuCategoryId;
};

const FAVORITES_STORAGE_KEY = "chiko:favorites";
const CART_STORAGE_KEY = "chiko:cart-count";

const heatTone = {
  mild: "bg-emerald-50 text-emerald-700",
  medium: "bg-amber-50 text-amber-700",
  hot: "bg-rose-50 text-rose-700",
} as const;

const heatLabel = {
  mild: "Мягкий",
  medium: "Умеренно острый",
  hot: "Острый",
} as const;

const quickMetrics = [
  { label: "Категории", value: "4" },
  { label: "Позиции", value: "18+" },
  { label: "Средний чек", value: "390 Р" },
];

export default function ChikoExperience({
  view,
  initialCategory = "rolls",
}: ChikoExperienceProps) {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState<MenuCategoryId>(initialCategory);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [selectedPoster, setSelectedPoster] = useState<(typeof showcasePosters)[number] | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [cartCount, setCartCount] = useState(0);
  const [isClientReady, setIsClientReady] = useState(false);

  useEffect(() => {
    setActiveCategory(initialCategory);
  }, [initialCategory]);

  useEffect(() => {
    setIsClientReady(true);

    try {
      const storedFavorites = window.localStorage.getItem(FAVORITES_STORAGE_KEY);
      const storedCart = window.localStorage.getItem(CART_STORAGE_KEY);

      if (storedFavorites) {
        const parsedFavorites = JSON.parse(storedFavorites) as string[];
        setFavorites(parsedFavorites);
      }

      if (storedCart) {
        setCartCount(Number(storedCart) || 0);
      }
    } catch {
      setFavorites([]);
      setCartCount(0);
    }
  }, []);

  useEffect(() => {
    if (!isClientReady) {
      return;
    }

    window.localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites));
  }, [favorites, isClientReady]);

  useEffect(() => {
    if (!isClientReady) {
      return;
    }

    window.localStorage.setItem(CART_STORAGE_KEY, String(cartCount));
  }, [cartCount, isClientReady]);

  const activeCategoryData = categories.find((category) => category.id === activeCategory) ?? categories[0];
  const favoriteItems = useMemo(
    () => menuItems.filter((item) => favorites.includes(item.id)),
    [favorites],
  );
  const filteredItems = useMemo(() => {
    if (view === "favorites") {
      return favoriteItems;
    }

    return menuItems.filter((item) => item.categoryId === activeCategory);
  }, [activeCategory, favoriteItems, view]);

  const featuredItems = useMemo(
    () => menuItems.filter((item) => item.tags.includes("Хит")).slice(0, 4),
    [],
  );

  const toggleFavorite = (itemId: string) => {
    setFavorites((current) =>
      current.includes(itemId) ? current.filter((id) => id !== itemId) : [...current, itemId],
    );
  };

  const openCategory = (categoryId: MenuCategoryId) => {
    setActiveCategory(categoryId);
    router.push(`/menu?category=${categoryId}`);
  };

  const selectedPosterForCategory =
    showcasePosters.find((poster) => poster.image === activeCategoryData.poster) ?? showcasePosters[0];

  return (
    <div className="bg-chiko-bloom">
      <main className="mx-auto min-h-screen max-w-md px-4 pb-36 pt-6 text-chiko-ink">
        <section className="glass-card bloom-border rounded-[32px] p-5 shadow-card">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <BrandLogo />
            <div className="flex flex-wrap items-center gap-2 self-start sm:justify-end">
              <Link
                href="/favorites"
                className="glass-card bloom-border flex h-11 min-w-11 items-center justify-center rounded-full px-3 text-sm font-semibold text-chiko-berry transition hover:scale-[1.03]"
              >
                {favorites.length > 0 ? `Избр. ${favorites.length}` : "Избр."}
              </Link>
              <Link
                href="/info"
                className="glass-card bloom-border flex h-11 min-w-11 items-center justify-center rounded-full px-3 text-sm font-semibold text-chiko-mocha transition hover:scale-[1.03]"
              >
                Инфо
              </Link>
            </div>
          </div>

          <div className="mt-5 grid grid-cols-3 gap-3">
            {quickMetrics.map((metric) => (
              <div key={metric.label} className="rounded-[22px] bg-white/80 px-3 py-4 shadow-soft">
                <div className="text-lg font-black text-chiko-berry">{metric.value}</div>
                <div className="mt-1 text-[11px] font-medium uppercase tracking-[0.18em] text-chiko-mocha/70">
                  {metric.label}
                </div>
              </div>
            ))}
          </div>

        </section>

        <section className="mt-6">
          <div className="mb-3 flex items-center justify-between px-1">
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.24em] text-chiko-berry/70">
                Навигация
              </div>
              <h2 className="mt-1 text-xl font-black">Разделы меню</h2>
            </div>
            <button
              type="button"
              onClick={() => setSelectedPoster(showcasePosters[0])}
              className="text-sm font-semibold text-chiko-berry"
            >
              Все постеры
            </button>
          </div>

          <div className="hide-scrollbar flex gap-3 overflow-x-auto pb-2">
            {categories.map((category) => {
              const isActive = category.id === activeCategory;

              return (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => openCategory(category.id)}
                  className={`min-w-[12.5rem] rounded-[28px] p-4 text-left shadow-soft transition ${
                    isActive ? "text-white shadow-card" : "glass-card text-chiko-ink"
                  }`}
                  style={{
                    background: isActive
                      ? `linear-gradient(135deg, ${category.accent}, #ffc8dd)`
                      : "rgba(255,255,255,0.74)",
                  }}
                >
                  <div
                    className={`text-xs font-semibold uppercase tracking-[0.22em] ${
                      isActive ? "text-white/80" : "text-chiko-berry/75"
                    }`}
                  >
                    {category.eyebrow}
                  </div>
                  <div className="mt-2 text-lg font-black">{category.name}</div>
                  <div
                    className={`mt-2 text-sm leading-6 ${
                      isActive ? "text-white/88" : "text-chiko-mocha/80"
                    }`}
                  >
                    {category.description}
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        {view === "home" && (
          <>
            <section className="mt-6 rounded-[30px] bg-white p-5 shadow-card">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-xs font-semibold uppercase tracking-[0.24em] text-chiko-berry/70">
                    Сейчас в фокусе
                  </div>
                  <h2 className="mt-1 text-2xl font-black">{activeCategoryData.name}</h2>
                  <p className="mt-2 text-sm leading-6 text-chiko-mocha/80">
                    {activeCategoryData.description}
                  </p>
                </div>
                <span
                  className="rounded-full px-3 py-2 text-[11px] font-bold uppercase tracking-[0.18em] text-white"
                  style={{ backgroundColor: activeCategoryData.accent }}
                >
                  {activeCategoryData.badge}
                </span>
              </div>

              <button
                type="button"
                onClick={() => setSelectedPoster(selectedPosterForCategory)}
                className="relative mt-5 block aspect-[9/16] w-full overflow-hidden rounded-[28px] border border-chiko-line bg-chiko-blush"
              >
                <Image
                  src={activeCategoryData.poster}
                  alt={activeCategoryData.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 420px"
                  className="object-cover object-top"
                />
                <div className="absolute inset-x-0 bottom-0 bg-[linear-gradient(180deg,rgba(44,32,34,0)_0%,rgba(44,32,34,0.82)_100%)] p-5 text-left text-white">
                  <div className="text-xs font-semibold uppercase tracking-[0.18em] text-white/70">
                    Актуальный постер
                  </div>
                  <div className="mt-1 text-lg font-black">{activeCategoryData.sections.join(" / ")}</div>
                  <div className="mt-2 text-sm text-white/78">Открыть в полном размере</div>
                </div>
              </button>
            </section>

            <section className="mt-6">
              <div className="mb-3 flex items-center justify-between px-1">
                <div>
                  <div className="text-xs font-semibold uppercase tracking-[0.24em] text-chiko-berry/70">
                    Хиты меню
                  </div>
                  <h2 className="mt-1 text-xl font-black">Популярные позиции</h2>
                </div>
                <Link href="/menu" className="text-sm font-semibold text-chiko-berry">
                  Ко всему меню
                </Link>
              </div>

              <div className="space-y-3">
                {featuredItems.map((item) => (
                  <MenuCard
                    key={item.id}
                    item={item}
                    isFavorite={favorites.includes(item.id)}
                    onFavorite={() => toggleFavorite(item.id)}
                    onOpen={() => setSelectedItem(item)}
                    onAdd={() => setCartCount((count) => count + 1)}
                  />
                ))}
              </div>
            </section>
          </>
        )}

        {(view === "menu" || view === "favorites") && (
          <>
            <section className="mt-6 rounded-[30px] bg-white p-5 shadow-card">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-xs font-semibold uppercase tracking-[0.24em] text-chiko-berry/70">
                    {view === "favorites" ? "Избранное" : "Категория"}
                  </div>
                  <h2 className="mt-1 text-2xl font-black">
                    {view === "favorites" ? "Сохраненные позиции" : activeCategoryData.name}
                  </h2>
                </div>
                {view === "favorites" && (
                  <Link
                    href="/menu"
                    className="rounded-full bg-chiko-blush px-4 py-2 text-sm font-semibold text-chiko-berry"
                  >
                    Назад в меню
                  </Link>
                )}
              </div>

              {view === "menu" && (
                <div className="hide-scrollbar mt-5 flex gap-2 overflow-x-auto pb-1">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      type="button"
                      onClick={() => openCategory(category.id)}
                      className={`rounded-full px-4 py-3 text-sm font-semibold transition ${
                        category.id === activeCategory
                          ? "text-white shadow-soft"
                          : "bg-chiko-blush text-chiko-mocha"
                      }`}
                      style={{
                        backgroundColor: category.id === activeCategory ? category.accent : undefined,
                      }}
                    >
                      {category.name}
                    </button>
                  ))}
                </div>
              )}
            </section>

            <section className="mt-4 space-y-3">
              {filteredItems.length === 0 ? (
                <div className="rounded-[30px] bg-white p-8 text-center shadow-card">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-chiko-blush text-2xl">
                    ♡
                  </div>
                  <h3 className="mt-4 text-xl font-black">Пока пусто</h3>
                  <p className="mt-2 text-sm leading-6 text-chiko-mocha/80">
                    Сохраняй позиции сердечком, и они будут доступны на отдельной странице.
                  </p>
                </div>
              ) : (
                filteredItems.map((item) => (
                  <MenuCard
                    key={item.id}
                    item={item}
                    isFavorite={favorites.includes(item.id)}
                    onFavorite={() => toggleFavorite(item.id)}
                    onOpen={() => setSelectedItem(item)}
                    onAdd={() => setCartCount((count) => count + 1)}
                  />
                ))
              )}
            </section>
          </>
        )}

        {view === "info" && (
          <>
            <section className="mt-6 rounded-[30px] bg-white p-5 shadow-card">
              <div className="text-xs font-semibold uppercase tracking-[0.24em] text-chiko-berry/70">
                О приложении
              </div>
              <h2 className="mt-1 text-2xl font-black">Нормальная продакшн-сборка</h2>
              <p className="mt-3 text-sm leading-6 text-chiko-mocha/80">
                Реальные страницы вместо псевдо-роутинга, зависимости не тянутся в git, а
                устанавливаются локально или в Vercel-среде по `package-lock.json`.
              </p>

              <div className="mt-5 grid grid-cols-2 gap-3">
                <InfoTile title="Git" value="node_modules ignored" />
                <InfoTile title="Сервер" value="npm ci / vercel build" />
                <InfoTile title="Маршруты" value="/ /menu /favorites /info" />
                <InfoTile title="Запуск" value="npm run deploy:vercel" />
              </div>
            </section>

            <section className="mt-6">
              <div className="mb-3 px-1">
                <div className="text-xs font-semibold uppercase tracking-[0.24em] text-chiko-berry/70">
                  Постеры меню
                </div>
                <h2 className="mt-1 text-xl font-black">Исходные материалы</h2>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {showcasePosters.map((poster) => (
                  <button
                    key={poster.id}
                    type="button"
                    onClick={() => setSelectedPoster(poster)}
                    className="overflow-hidden rounded-[24px] bg-white text-left shadow-soft"
                  >
                    <div className="relative aspect-[3/4]">
                      <Image
                        src={poster.image}
                        alt={poster.title}
                        fill
                        sizes="(max-width: 768px) 50vw, 220px"
                        className="object-cover object-top"
                      />
                    </div>
                    <div className="p-3">
                      <div className="text-sm font-black">{poster.title}</div>
                      <div className="mt-1 text-xs leading-5 text-chiko-mocha/75">{poster.subtitle}</div>
                    </div>
                  </button>
                ))}
              </div>
            </section>
          </>
        )}
      </main>

      <nav className="fixed inset-x-0 bottom-0 z-40 mx-auto flex max-w-md gap-2 px-4 pb-5">
        <div className="glass-card bloom-border flex w-full items-center justify-between rounded-[30px] px-3 py-3 shadow-card">
          <NavLink href="/" label="Главная" isActive={view === "home"} />
          <NavLink href="/menu" label="Меню" isActive={view === "menu"} />
          <NavLink
            href="/favorites"
            label={`Избранное${favorites.length ? ` ${favorites.length}` : ""}`}
            isActive={view === "favorites"}
          />
          <NavLink href="/info" label="Инфо" isActive={view === "info"} />
        </div>
      </nav>

      <div className="fixed inset-x-0 bottom-[5.5rem] z-30 mx-auto flex max-w-md px-4">
        <Link
          href="/menu"
          className="ml-auto flex items-center gap-3 rounded-full bg-chiko-berry px-4 py-3 text-sm font-bold text-white shadow-card transition hover:translate-y-[-1px]"
        >
          <span className="rounded-full bg-white/20 px-2 py-1">{cartCount}</span>
          <span>Корзина и быстрый заказ</span>
        </Link>
      </div>

      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-[#2c2022]/45 p-3">
          <div className="max-h-[88vh] w-full max-w-md overflow-auto rounded-[32px] bg-white p-5 shadow-card">
            <div className="mx-auto h-1.5 w-12 rounded-full bg-chiko-line" />
            <div className="mt-5 flex items-start justify-between gap-4">
              <div>
                <div className="text-xs font-semibold uppercase tracking-[0.24em] text-chiko-berry/70">
                  {selectedItem.section}
                </div>
                <h3 className="mt-1 text-2xl font-black">{selectedItem.name}</h3>
                <p className="mt-2 text-sm leading-6 text-chiko-mocha/80">{selectedItem.description}</p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedItem(null)}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-chiko-blush text-lg text-chiko-berry"
                aria-label="Закрыть карточку"
              >
                ×
              </button>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              <span className="rounded-full bg-chiko-blush px-3 py-2 text-xs font-semibold text-chiko-berry">
                {selectedItem.subtitle}
              </span>
              <span className={`rounded-full px-3 py-2 text-xs font-semibold ${heatTone[selectedItem.heat]}`}>
                {heatLabel[selectedItem.heat]}
              </span>
              {selectedItem.tags.map((tag) => (
                <span key={tag} className="rounded-full bg-stone-100 px-3 py-2 text-xs font-semibold text-stone-700">
                  {tag}
                </span>
              ))}
            </div>

            <div className="mt-6 rounded-[28px] bg-chiko-bloom p-5">
              <div className="text-sm font-semibold text-chiko-mocha/70">Цена</div>
              <div className="mt-1 text-4xl font-black text-chiko-berry">{selectedItem.price} Р</div>
              <div className="mt-3 text-sm leading-6 text-chiko-mocha/80">
                Карточка детали открывается локально поверх текущей страницы и не ломает маршрутизацию.
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={() => toggleFavorite(selectedItem.id)}
                className="flex-1 rounded-full bg-chiko-blush px-4 py-4 text-sm font-bold text-chiko-berry"
              >
                {favorites.includes(selectedItem.id) ? "Убрать из избранного" : "В избранное"}
              </button>
              <button
                type="button"
                onClick={() => {
                  setCartCount((count) => count + 1);
                  setSelectedItem(null);
                }}
                className="flex-1 rounded-full bg-chiko-berry px-4 py-4 text-sm font-bold text-white"
              >
                Добавить в заказ
              </button>
            </div>
          </div>
        </div>
      )}

      {selectedPoster && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#2c2022]/65 p-3">
          <div className="relative max-h-[96vh] w-full max-w-md overflow-hidden rounded-[32px] bg-white shadow-card">
            <button
              type="button"
              onClick={() => setSelectedPoster(null)}
              className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-lg text-chiko-berry shadow-soft"
              aria-label="Закрыть постер"
            >
              ×
            </button>
            <div className="relative aspect-[9/16] w-full">
              <Image
                src={selectedPoster.image}
                alt={selectedPoster.title}
                fill
                sizes="(max-width: 768px) 100vw, 420px"
                className="object-contain object-top"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function MenuCard({
  item,
  isFavorite,
  onFavorite,
  onOpen,
  onAdd,
}: {
  item: MenuItem;
  isFavorite: boolean;
  onFavorite: () => void;
  onOpen: () => void;
  onAdd: () => void;
}) {
  return (
    <article className="rounded-[30px] bg-white p-4 shadow-card">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-xs font-semibold uppercase tracking-[0.2em] text-chiko-berry/70">
            {item.section}
          </div>
          <h3 className="mt-1 text-xl font-black">{item.name}</h3>
          <p className="mt-1 text-sm text-chiko-mocha/80">{item.subtitle}</p>
        </div>
        <button
          type="button"
          onClick={onFavorite}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-chiko-blush text-lg text-chiko-berry"
          aria-label={isFavorite ? "Убрать из избранного" : "Добавить в избранное"}
        >
          {isFavorite ? "❤" : "♡"}
        </button>
      </div>

      <p className="mt-3 text-sm leading-6 text-chiko-mocha/80">{item.description}</p>

      <div className="mt-4 flex flex-wrap gap-2">
        {item.tags.map((tag) => (
          <span key={tag} className="rounded-full bg-stone-100 px-3 py-2 text-xs font-semibold text-stone-700">
            {tag}
          </span>
        ))}
        <span className={`rounded-full px-3 py-2 text-xs font-semibold ${heatTone[item.heat]}`}>
          {heatLabel[item.heat]}
        </span>
      </div>

      <div className="mt-5 flex items-center justify-between gap-3">
        <div>
          <div className="text-sm font-semibold text-chiko-mocha/70">Цена</div>
          <div className="text-3xl font-black text-chiko-berry">{item.price} Р</div>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={onOpen}
            className="rounded-full bg-chiko-blush px-4 py-3 text-sm font-bold text-chiko-berry"
          >
            Подробнее
          </button>
          <button
            type="button"
            onClick={onAdd}
            className="rounded-full bg-chiko-berry px-4 py-3 text-sm font-bold text-white"
          >
            В заказ
          </button>
        </div>
      </div>
    </article>
  );
}

function NavLink({
  href,
  label,
  isActive,
}: {
  href: string;
  label: string;
  isActive: boolean;
}) {
  return (
    <Link
      href={href}
      className={`rounded-full px-4 py-3 text-sm font-semibold transition ${
        isActive ? "bg-chiko-berry text-white shadow-soft" : "text-chiko-mocha/85"
      }`}
    >
      {label}
    </Link>
  );
}

function InfoTile({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-[22px] bg-chiko-bloom p-4">
      <div className="text-xs font-semibold uppercase tracking-[0.18em] text-chiko-berry/70">
        {title}
      </div>
      <div className="mt-2 text-sm font-black text-chiko-ink">{value}</div>
    </div>
  );
}
