export type CategoryId =
  | "rolls"
  | "soups"
  | "chicken"
  | "drinks"
  | "favorites";

export type MenuCategoryId = Exclude<CategoryId, "favorites">;

export type Category = {
  id: MenuCategoryId;
  name: string;
  eyebrow: string;
  description: string;
  accent: string;
  badge: string;
  poster: string;
  sections: string[];
};

export type MenuItem = {
  id: string;
  categoryId: MenuCategoryId;
  name: string;
  subtitle: string;
  description: string;
  price: number;
  heat: "mild" | "medium" | "hot";
  tags: string[];
  section: string;
};

export const categories: Category[] = [
  {
    id: "rolls",
    name: "Кимпаб и закуски",
    eyebrow: "Легкий старт",
    description: "Роллы, банчан и закуски в нежной розово-кремовой подаче.",
    accent: "#FF77AD",
    badge: "Самый нежный раздел",
    poster: "/images/screenshot_1_549.png",
    sections: ["Кимпаб и роллы", "Закуски и банчан"],
  },
  {
    id: "soups",
    name: "Супы и напитки",
    eyebrow: "Комфорт фуд",
    description: "Горячие корейские супы и освежающие напитки в одном сценарии.",
    accent: "#FFB345",
    badge: "Лучше для обеда",
    poster: "/images/screenshot_1_550.png",
    sections: ["Супы", "Напитки"],
  },
  {
    id: "drinks",
    name: "Соджу и коктейли",
    eyebrow: "Вечерний блок",
    description: "Соджу, Cass и коктейли с выразительным pink-party настроением.",
    accent: "#DB3D72",
    badge: "Для вечера и компании",
    poster: "/images/screenshot_1_551.png",
    sections: ["Соджу", "Коктейли и пиво"],
  },
  {
    id: "chicken",
    name: "Курица и пибимпап",
    eyebrow: "Сытный блок",
    description: "Яркие основные блюда, которые хорошо смотрятся как центральный акцент.",
    accent: "#72544A",
    badge: "Хит для главного экрана",
    poster: "/images/screenshot_1_552.png",
    sections: ["Курица и фри", "Пибимпап"],
  },
];

export const menuItems: MenuItem[] = [
  {
    id: "classic-kimbap",
    categoryId: "rolls",
    name: "Классический кимпаб",
    subtitle: "Овощи и говядина",
    description: "Сбалансированный ролл для первого знакомства с меню Chiko.",
    price: 250,
    heat: "mild",
    tags: ["Хит", "Роллы"],
    section: "Кимпаб и роллы",
  },
  {
    id: "tuna-kimbap",
    categoryId: "rolls",
    name: "Кимпаб с тунцом",
    subtitle: "Тунец и майонез",
    description: "Кремовая текстура и мягкий вкус без перегруза по специям.",
    price: 300,
    heat: "mild",
    tags: ["Нежный", "Роллы"],
    section: "Кимпаб и роллы",
  },
  {
    id: "spicy-kimbap",
    categoryId: "rolls",
    name: "Острый кимпаб",
    subtitle: "Курица и кимчи",
    description: "Острее и ярче, с характером корейского стритфуда.",
    price: 320,
    heat: "hot",
    tags: ["Острый", "Роллы"],
    section: "Кимпаб и роллы",
  },
  {
    id: "kimchi",
    categoryId: "rolls",
    name: "Кимчи",
    subtitle: "Пекинская капуста",
    description: "Фирменная закуска, которая хорошо сочетается почти с любым блюдом.",
    price: 150,
    heat: "medium",
    tags: ["Банчан", "Классика"],
    section: "Закуски и банчан",
  },
  {
    id: "kimchi-jjigae",
    categoryId: "soups",
    name: "Кимчи-чиге",
    subtitle: "Раскаляющий суп",
    description: "Насыщенный суп с правильной густотой и выразительным вкусом кимчи.",
    price: 350,
    heat: "hot",
    tags: ["Суп", "Хит"],
    section: "Супы",
  },
  {
    id: "sundubu",
    categoryId: "soups",
    name: "Сундубу-чиге",
    subtitle: "Мягкий тофу и бульон",
    description: "Комфортный вариант для тех, кому нужен мягкий, но глубокий вкус.",
    price: 380,
    heat: "medium",
    tags: ["Суп", "Тофу"],
    section: "Супы",
  },
  {
    id: "classic-bubble-tea",
    categoryId: "soups",
    name: "Классический бабл ти",
    subtitle: "С тапиокой",
    description: "Мягкий сладкий напиток с узнаваемой текстурой и ягодным акцентом.",
    price: 240,
    heat: "mild",
    tags: ["Напиток", "Bubble tea"],
    section: "Напитки",
  },
  {
    id: "mango-lemonade",
    categoryId: "soups",
    name: "Манго лимонад",
    subtitle: "Освежающий",
    description: "Легкий яркий лимонад для теплой погоды и контрастного сочетания с супами.",
    price: 190,
    heat: "mild",
    tags: ["Напиток", "Манго"],
    section: "Напитки",
  },
  {
    id: "classic-soju",
    categoryId: "drinks",
    name: "Классический соджу",
    subtitle: "Бутылка 360 мл",
    description: "Универсальная база для вечернего заказа и аккуратной подачи.",
    price: 350,
    heat: "mild",
    tags: ["Соджу", "Бар"],
    section: "Соджу",
  },
  {
    id: "grapefruit-soju",
    categoryId: "drinks",
    name: "Грейпфрут соджу",
    subtitle: "Фруктовый",
    description: "Более легкий и ароматный вариант с мягкой цитрусовой нотой.",
    price: 380,
    heat: "mild",
    tags: ["Соджу", "Фруктовый"],
    section: "Соджу",
  },
  {
    id: "cass",
    categoryId: "drinks",
    name: "Cass",
    subtitle: "Корейское пиво 0.5 л",
    description: "Чистый вкус без лишней тяжести, хорошо дружит с курицей и фри.",
    price: 300,
    heat: "mild",
    tags: ["Пиво", "Бар"],
    section: "Коктейли и пиво",
  },
  {
    id: "makkoli",
    categoryId: "drinks",
    name: "Макколи коктейль",
    subtitle: "С фруктами",
    description: "Самый атмосферный напиток для мягкой вечерней подачи в приложении.",
    price: 420,
    heat: "mild",
    tags: ["Коктейль", "Хит"],
    section: "Коктейли и пиво",
  },
  {
    id: "yangnyeom",
    categoryId: "chicken",
    name: "Яннём курочка",
    subtitle: "Сладко-пряная глазурь",
    description: "Самая фотогеничная позиция, которая должна продавать раздел с первого экрана.",
    price: 450,
    heat: "medium",
    tags: ["Курица", "Хит"],
    section: "Курица и фри",
  },
  {
    id: "garlic-chicken",
    categoryId: "chicken",
    name: "Соево-чесночная курочка",
    subtitle: "С картофелем фри",
    description: "Более понятный массовый вкус без потери фирменного корейского характера.",
    price: 480,
    heat: "mild",
    tags: ["Курица", "Фри"],
    section: "Курица и фри",
  },
  {
    id: "honey-chicken",
    categoryId: "chicken",
    name: "Медовая курочка",
    subtitle: "С рисом и соусом",
    description: "Сытная позиция, хорошо работает как основной upsell.",
    price: 500,
    heat: "mild",
    tags: ["Курица", "Рис"],
    section: "Курица и фри",
  },
  {
    id: "classic-bibimbap",
    categoryId: "chicken",
    name: "Классический пибимпап",
    subtitle: "Говядина и яйцо",
    description: "Плотный полноценный обед с приятной сборкой вкусов и текстур.",
    price: 380,
    heat: "medium",
    tags: ["Пибимпап", "Говядина"],
    section: "Пибимпап",
  },
  {
    id: "veggie-bibimbap",
    categoryId: "chicken",
    name: "Вегетарианский пибимпап",
    subtitle: "Тофу и грибы",
    description: "Нежный вариант для тех, кто хочет легкость, но не хочет терять форму блюда.",
    price: 350,
    heat: "mild",
    tags: ["Пибимпап", "Тофу"],
    section: "Пибимпап",
  },
  {
    id: "spicy-seafood-bibimbap",
    categoryId: "chicken",
    name: "Острый пибимпап",
    subtitle: "Кимчи и морепродукты",
    description: "Самый контрастный вариант по остроте и визуальной насыщенности.",
    price: 420,
    heat: "hot",
    tags: ["Пибимпап", "Острый"],
    section: "Пибимпап",
  },
];

export const showcasePosters = [
  {
    id: "poster-rolls",
    title: "Роллы и банчан",
    subtitle: "Мягкий pink-food блок",
    image: "/images/screenshot_1_549.png",
  },
  {
    id: "poster-soups",
    title: "Супы и напитки",
    subtitle: "Контраст горячего и свежего",
    image: "/images/screenshot_1_550.png",
  },
  {
    id: "poster-bar",
    title: "Соджу и бар",
    subtitle: "Вечерняя подача",
    image: "/images/screenshot_1_551.png",
  },
  {
    id: "poster-main",
    title: "Курица и пибимпап",
    subtitle: "Сытный центр меню",
    image: "/images/screenshot_1_552.png",
  },
];

export const menuCategoryIds: MenuCategoryId[] = ["rolls", "soups", "chicken", "drinks"];

export function isMenuCategoryId(value: string): value is MenuCategoryId {
  return menuCategoryIds.includes(value as MenuCategoryId);
}
