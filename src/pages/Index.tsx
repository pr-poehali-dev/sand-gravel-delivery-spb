import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMG = "https://cdn.poehali.dev/projects/b6cc4dde-d733-4d63-bb3a-26bd00eee1e7/files/c76a53f4-167d-42b8-a978-a7d2e4412898.jpg";

const NAV_LINKS = [
  { label: "Каталог", href: "#catalog" },
  { label: "Услуги", href: "#services" },
  { label: "Прайс", href: "#price" },
  { label: "О нас", href: "#about" },
  { label: "Портфолио", href: "#portfolio" },
  { label: "Контакты", href: "#contacts" },
];

const CATALOG_ITEMS = [
  {
    icon: "Mountain",
    name: "Щебень гранитный",
    grades: ["фр. 5–20 мм", "фр. 20–40 мм", "фр. 40–70 мм"],
    desc: "Высокопрочный гранитный щебень для фундаментов, дорог и бетона. ГОСТ 8267-93.",
    price: "от 1 200 ₽/т",
  },
  {
    icon: "Layers",
    name: "Песок карьерный",
    grades: ["Мк 1.5", "Мк 2.0", "Намывной"],
    desc: "Очищенный карьерный песок для строительства, благоустройства и раствора.",
    price: "от 550 ₽/т",
  },
  {
    icon: "Droplets",
    name: "Песок речной",
    grades: ["Мк 1.2", "Чистый", "Сеяный"],
    desc: "Природный речной песок без примесей. Идеален для штукатурки и кладки.",
    price: "от 750 ₽/т",
  },
  {
    icon: "Grid3x3",
    name: "Отсев гранитный",
    grades: ["фр. 0–5 мм", "Сухой"],
    desc: "Мелкая гранитная фракция — подсыпка под плитку, дорожки, стяжку.",
    price: "от 900 ₽/т",
  },
  {
    icon: "Hexagon",
    name: "Щебень известняковый",
    grades: ["фр. 20–40 мм", "фр. 40–70 мм"],
    desc: "Мягкий щебень для подсыпки дорог, временных площадок и дренажа.",
    price: "от 850 ₽/т",
  },
  {
    icon: "Square",
    name: "Бутовый камень",
    grades: ["Ручной бой", "Крупный"],
    desc: "Природный бутовый камень для фундаментов, заборов и декора.",
    price: "от 1 100 ₽/т",
  },
];

const SERVICES = [
  {
    icon: "Truck",
    title: "Самосвалы 10–25 т",
    desc: "Парк современных самосвалов для доставки сыпучих грузов по городу и области. Загрузка от 10 тонн.",
  },
  {
    icon: "Timer",
    title: "Доставка за 3 часа",
    desc: "Принимаем заявки круглосуточно. Срочные рейсы в день обращения — без наценки.",
  },
  {
    icon: "MapPin",
    title: "Радиус 250 км",
    desc: "Работаем по всему региону. Загородные объекты, стройплощадки, карьеры.",
  },
  {
    icon: "Shield",
    title: "Документы и качество",
    desc: "Сертификаты ГОСТ, паспорта качества, накладные. Работаем с НДС и без.",
  },
];

const PRICE_ITEMS = [
  { name: "Щебень гранитный фр. 5–20", unit: "т", price: "1 200 ₽", min: "5 т" },
  { name: "Щебень гранитный фр. 20–40", unit: "т", price: "1 150 ₽", min: "5 т" },
  { name: "Щебень известняковый 20–40", unit: "т", price: "850 ₽", min: "5 т" },
  { name: "Песок карьерный Мк 2.0", unit: "т", price: "550 ₽", min: "10 т" },
  { name: "Песок речной сеяный", unit: "т", price: "750 ₽", min: "10 т" },
  { name: "Отсев гранитный фр. 0–5", unit: "т", price: "900 ₽", min: "5 т" },
  { name: "Бутовый камень", unit: "т", price: "1 100 ₽", min: "3 т" },
  { name: "Доставка самосвалом 10 т", unit: "рейс", price: "3 500 ₽", min: "1 рейс" },
  { name: "Доставка самосвалом 20 т", unit: "рейс", price: "5 500 ₽", min: "1 рейс" },
  { name: "Доставка самосвалом 25 т", unit: "рейс", price: "6 500 ₽", min: "1 рейс" },
];

const STATS = [
  { value: "15", suffix: "+", label: "лет на рынке" },
  { value: "2 400", suffix: "", label: "выполненных проектов" },
  { value: "180", suffix: " тыс.т", label: "поставлено материалов" },
  { value: "47", suffix: "", label: "единиц транспорта" },
];

const PORTFOLIO = [
  { name: "Строительство КАД-2", volume: "12 000 т щебня", year: "2024", type: "Дорожное строительство" },
  { name: "ЖК «Северный»", volume: "4 500 т песка", year: "2024", type: "Жилое строительство" },
  { name: "Логистический центр", volume: "8 200 т отсева", year: "2023", type: "Промышленное строительство" },
  { name: "Реконструкция набережной", volume: "1 800 т бутового камня", year: "2023", type: "Благоустройство" },
  { name: "Промышленная база", volume: "6 300 т щебня 40–70", year: "2023", type: "Промышленное строительство" },
  { name: "ТЦ «Меридиан»", volume: "3 100 т песка речного", year: "2022", type: "Коммерческое строительство" },
];

const MATERIALS_CALC = [
  { id: "gravel_5_20", name: "Щебень гранитный 5–20", price: 1200 },
  { id: "gravel_20_40", name: "Щебень гранитный 20–40", price: 1150 },
  { id: "limestone", name: "Щебень известняковый", price: 850 },
  { id: "sand_q", name: "Песок карьерный", price: 550 },
  { id: "sand_r", name: "Песок речной", price: 750 },
  { id: "screenings", name: "Отсев гранитный", price: 900 },
];

const TRUCKS = [
  { id: "t10", name: "Самосвал 10 т", price: 3500, capacity: 10 },
  { id: "t20", name: "Самосвал 20 т", price: 5500, capacity: 20 },
  { id: "t25", name: "Самосвал 25 т", price: 6500, capacity: 25 },
];

function Calculator() {
  const [material, setMaterial] = useState(MATERIALS_CALC[0].id);
  const [volume, setVolume] = useState(20);
  const [truck, setTruck] = useState(TRUCKS[1].id);
  const [distance, setDistance] = useState(30);

  const selectedMat = MATERIALS_CALC.find((m) => m.id === material)!;
  const selectedTruck = TRUCKS.find((t) => t.id === truck)!;
  const trips = Math.ceil(volume / selectedTruck.capacity);
  const deliveryCost = trips * selectedTruck.price + (distance > 50 ? (distance - 50) * 45 * trips : 0);
  const materialCost = volume * selectedMat.price;
  const total = materialCost + deliveryCost;

  return (
    <div className="bg-[#111316] border border-[#2a2d35] p-8 md:p-10">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-1 h-8 bg-[#c0441a]" />
        <h3 className="font-heading text-2xl font-bold uppercase tracking-wide text-white">Калькулятор стоимости</h3>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div>
            <label className="block text-xs font-body uppercase tracking-widest text-[#6b7280] mb-2">
              Материал
            </label>
            <select
              value={material}
              onChange={(e) => setMaterial(e.target.value)}
              className="w-full bg-[#1a1d22] border border-[#2a2d35] text-white font-body px-4 py-3 focus:outline-none focus:border-[#c0441a] transition-colors"
            >
              {MATERIALS_CALC.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.name} — {m.price.toLocaleString("ru")} ₽/т
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-body uppercase tracking-widest text-[#6b7280] mb-2">
              Объём: <span className="text-[#c0441a] font-semibold">{volume} т</span>
            </label>
            <input
              type="range"
              min={5}
              max={500}
              step={5}
              value={volume}
              onChange={(e) => setVolume(Number(e.target.value))}
              className="w-full accent-[#c0441a] h-1 bg-[#2a2d35] cursor-pointer"
            />
            <div className="flex justify-between text-xs text-[#6b7280] mt-1">
              <span>5 т</span><span>500 т</span>
            </div>
          </div>

          <div>
            <label className="block text-xs font-body uppercase tracking-widest text-[#6b7280] mb-2">
              Тип самосвала
            </label>
            <div className="grid grid-cols-3 gap-2">
              {TRUCKS.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTruck(t.id)}
                  className={`py-2 px-3 text-xs font-heading uppercase tracking-wide border transition-all ${
                    truck === t.id
                      ? "bg-[#c0441a] border-[#c0441a] text-white"
                      : "bg-transparent border-[#2a2d35] text-[#9ca3af] hover:border-[#c0441a] hover:text-white"
                  }`}
                >
                  {t.capacity} т
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-body uppercase tracking-widest text-[#6b7280] mb-2">
              Расстояние: <span className="text-[#c0441a] font-semibold">{distance} км</span>
            </label>
            <input
              type="range"
              min={5}
              max={250}
              step={5}
              value={distance}
              onChange={(e) => setDistance(Number(e.target.value))}
              className="w-full accent-[#c0441a] h-1 bg-[#2a2d35] cursor-pointer"
            />
            <div className="flex justify-between text-xs text-[#6b7280] mt-1">
              <span>5 км</span><span>250 км</span>
            </div>
          </div>
        </div>

        <div className="bg-[#0e1014] border border-[#2a2d35] p-6 flex flex-col justify-between">
          <div>
            <p className="text-xs font-body uppercase tracking-widest text-[#6b7280] mb-6">Расчёт стоимости</p>
            <div className="space-y-4">
              <div className="flex justify-between items-center py-3 border-b border-[#1a1d22]">
                <span className="text-[#9ca3af] font-body text-sm">Материал ({volume} т)</span>
                <span className="text-white font-heading text-lg">{materialCost.toLocaleString("ru")} ₽</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-[#1a1d22]">
                <span className="text-[#9ca3af] font-body text-sm">
                  Доставка ({trips} {trips === 1 ? "рейс" : trips < 5 ? "рейса" : "рейсов"}, {distance} км)
                </span>
                <span className="text-white font-heading text-lg">{deliveryCost.toLocaleString("ru")} ₽</span>
              </div>
              {distance > 50 && (
                <p className="text-xs text-[#6b7280] font-body">
                  * доп. {Math.round((distance - 50) * 45)} ₽/рейс за каждый км сверх 50 км
                </p>
              )}
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-[#c0441a]/30">
            <div className="flex justify-between items-end mb-6">
              <span className="text-[#9ca3af] font-body text-sm uppercase tracking-wide">Итого</span>
              <span className="text-[#c0441a] font-heading text-4xl font-bold">
                {total.toLocaleString("ru")} ₽
              </span>
            </div>
            <button className="rust-btn w-full py-4 text-sm tracking-widest">
              Оставить заявку
            </button>
            <p className="text-xs text-[#6b7280] font-body mt-3 text-center">
              Цена ориентировочная. Точный расчёт — после обращения.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [formData, setFormData] = useState({ name: "", phone: "", message: "" });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[#0e1014] text-white font-body overflow-x-hidden">

      {/* NAVBAR */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-[#0e1014]/95 backdrop-blur-sm border-b border-[#2a2d35]" : "bg-transparent"
      }`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#c0441a] flex items-center justify-center">
              <Icon name="Mountain" size={16} className="text-white" />
            </div>
            <span className="font-heading text-lg font-bold uppercase tracking-widest text-white">
              СтройКарьер
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((l) => (
              <button
                key={l.href}
                onClick={() => scrollTo(l.href)}
                className="text-xs font-heading uppercase tracking-widest text-[#9ca3af] hover:text-[#c0441a] transition-colors"
              >
                {l.label}
              </button>
            ))}
          </div>

          <a
            href="tel:+78001234567"
            className="hidden md:flex items-center gap-2 text-sm font-heading uppercase tracking-wide text-white hover:text-[#c0441a] transition-colors"
          >
            <Icon name="Phone" size={14} className="text-[#c0441a]" />
            8 (800) 123–45–67
          </a>

          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-white">
            <Icon name={menuOpen ? "X" : "Menu"} size={22} />
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden bg-[#111316] border-t border-[#2a2d35] px-6 py-4 space-y-3">
            {NAV_LINKS.map((l) => (
              <button
                key={l.href}
                onClick={() => scrollTo(l.href)}
                className="block w-full text-left text-sm font-heading uppercase tracking-widest text-[#9ca3af] hover:text-[#c0441a] py-2"
              >
                {l.label}
              </button>
            ))}
            <a href="tel:+78001234567" className="block text-sm font-heading text-white py-2">
              8 (800) 123–45–67
            </a>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section className="relative h-screen min-h-[600px] flex items-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${HERO_IMG})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0e1014]/95 via-[#0e1014]/70 to-transparent" />
        <div className="absolute inset-0 industrial-grid" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-12 bg-[#c0441a]" />
              <span className="text-xs font-heading uppercase tracking-[0.3em] text-[#c0441a]">
                Поставщик стройматериалов
              </span>
            </div>
            <h1 className="font-heading text-5xl md:text-7xl font-bold text-white uppercase leading-none mb-6">
              Песок.<br />
              Щебень.<br />
              <span className="text-[#c0441a]">Доставка.</span>
            </h1>
            <p className="font-body text-[#9ca3af] text-lg md:text-xl leading-relaxed mb-10 max-w-lg">
              15 лет поставок сыпучих материалов для строительства. Собственный транспорт,
              сертифицированное качество, доставка за 3 часа.
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => scrollTo("#catalog")}
                className="rust-btn px-8 py-4 text-sm"
              >
                Смотреть каталог
              </button>
              <button
                onClick={() => scrollTo("#calculator")}
                className="ghost-btn px-8 py-4 text-sm"
              >
                Рассчитать стоимость
              </button>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
          <div className="w-px h-12 bg-gradient-to-b from-transparent to-[#c0441a] animate-pulse" />
        </div>
      </section>

      {/* STATS */}
      <section className="bg-[#111316] border-y border-[#2a2d35] py-8">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6">
          {STATS.map((s) => (
            <div key={s.label} className="text-center">
              <div className="font-heading text-3xl md:text-4xl font-bold text-[#c0441a]">
                {s.value}<span className="text-xl ml-1">{s.suffix}</span>
              </div>
              <div className="text-xs font-body uppercase tracking-wider text-[#6b7280] mt-1">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CATALOG */}
      <section id="catalog" className="py-20 max-w-7xl mx-auto px-6">
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-px w-8 bg-[#c0441a]" />
            <span className="text-xs font-heading uppercase tracking-[0.3em] text-[#c0441a]">Каталог</span>
          </div>
          <h2 className="font-heading text-4xl md:text-5xl font-bold uppercase text-white">Строительные материалы</h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {CATALOG_ITEMS.map((item) => (
            <div key={item.name} className="metal-card p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="w-10 h-10 bg-[#c0441a]/10 border border-[#c0441a]/30 flex items-center justify-center">
                  <Icon name={item.icon} size={18} className="text-[#c0441a]" fallback="Box" />
                </div>
                <span className="text-[#c0441a] font-heading font-bold text-sm">{item.price}</span>
              </div>
              <h3 className="font-heading text-xl font-bold text-white uppercase mb-2">{item.name}</h3>
              <p className="font-body text-[#6b7280] text-sm mb-4 leading-relaxed">{item.desc}</p>
              <div className="flex flex-wrap gap-2">
                {item.grades.map((g) => (
                  <span key={g} className="text-xs px-2 py-1 border border-[#2a2d35] text-[#9ca3af] font-body">
                    {g}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CALCULATOR */}
      <section id="calculator" className="pb-12 max-w-7xl mx-auto px-6">
        <Calculator />
      </section>

      {/* SERVICES */}
      <section id="services" className="py-20 bg-[#111316] border-y border-[#2a2d35]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-px w-8 bg-[#c0441a]" />
              <span className="text-xs font-heading uppercase tracking-[0.3em] text-[#c0441a]">Услуги</span>
            </div>
            <h2 className="font-heading text-4xl md:text-5xl font-bold uppercase text-white">Грузоперевозки самосвалами</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {SERVICES.map((s) => (
              <div key={s.title} className="rust-line pl-6 py-4">
                <div className="mb-4">
                  <Icon name={s.icon} size={28} className="text-[#c0441a]" fallback="Truck" />
                </div>
                <h3 className="font-heading text-lg font-bold text-white uppercase mb-2">{s.title}</h3>
                <p className="font-body text-[#6b7280] text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {TRUCKS.map((t) => (
              <div key={t.id} className="bg-[#0e1014] border border-[#2a2d35] p-6 flex items-center justify-between hover:border-[#c0441a] transition-colors">
                <div>
                  <div className="font-heading text-2xl font-bold text-white">{t.capacity} т</div>
                  <div className="text-xs font-body uppercase tracking-wide text-[#6b7280]">{t.name}</div>
                </div>
                <div className="text-right">
                  <div className="font-heading text-xl font-bold text-[#c0441a]">{t.price.toLocaleString("ru")} ₽</div>
                  <div className="text-xs text-[#6b7280] font-body">за рейс</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICE */}
      <section id="price" className="py-20 max-w-7xl mx-auto px-6">
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-px w-8 bg-[#c0441a]" />
            <span className="text-xs font-heading uppercase tracking-[0.3em] text-[#c0441a]">Цены</span>
          </div>
          <h2 className="font-heading text-4xl md:text-5xl font-bold uppercase text-white">Прайс-лист</h2>
          <p className="font-body text-[#6b7280] mt-3 text-sm">Актуально на апрель 2026 · Возможны скидки от объёма</p>
        </div>

        <div className="border border-[#2a2d35] overflow-hidden">
          <div className="hidden md:grid grid-cols-4 bg-[#111316] border-b border-[#2a2d35] px-6 py-3">
            <span className="text-xs font-heading uppercase tracking-widest text-[#6b7280]">Материал / услуга</span>
            <span className="text-xs font-heading uppercase tracking-widest text-[#6b7280] text-center">Ед. изм.</span>
            <span className="text-xs font-heading uppercase tracking-widest text-[#6b7280] text-center">Цена</span>
            <span className="text-xs font-heading uppercase tracking-widest text-[#6b7280] text-right">Мин. заказ</span>
          </div>
          {PRICE_ITEMS.map((item, i) => (
            <div
              key={item.name}
              className={`grid grid-cols-2 md:grid-cols-4 px-6 py-4 border-b border-[#1a1d22] hover:bg-[#111316] transition-colors ${
                i % 2 === 0 ? "" : "bg-[#111316]/30"
              }`}
            >
              <span className="font-body text-white text-sm col-span-2 md:col-span-1 mb-1 md:mb-0">{item.name}</span>
              <span className="hidden md:block font-body text-[#6b7280] text-sm text-center">{item.unit}</span>
              <span className="font-heading text-[#c0441a] font-bold text-right md:text-center">{item.price}</span>
              <span className="hidden md:block font-body text-[#6b7280] text-sm text-right">{item.min}</span>
            </div>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap gap-4 items-center">
          <button className="rust-btn px-8 py-3 text-sm">
            Запросить коммерческое предложение
          </button>
          <p className="font-body text-xs text-[#6b7280]">
            Скидка 5% при заказе от 100 т · 10% от 500 т
          </p>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-20 bg-[#111316] border-y border-[#2a2d35]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="h-px w-8 bg-[#c0441a]" />
                <span className="text-xs font-heading uppercase tracking-[0.3em] text-[#c0441a]">О компании</span>
              </div>
              <h2 className="font-heading text-4xl md:text-5xl font-bold uppercase text-white mb-6">
                15 лет в строительной<br />индустрии
              </h2>
              <p className="font-body text-[#9ca3af] leading-relaxed mb-4">
                С 2009 года мы обеспечиваем строительные объекты региона качественными
                сыпучими материалами. Начинали с двух самосвалов — сегодня в парке 47 единиц
                специализированной техники.
              </p>
              <p className="font-body text-[#9ca3af] leading-relaxed mb-8">
                Работаем с крупными застройщиками, дорожными службами, частными клиентами.
                Каждая партия материала сопровождается паспортом качества и сертификатом
                соответствия ГОСТ.
              </p>

              <div className="space-y-3">
                {[
                  "Собственные карьеры в Ленинградской области",
                  "Сертифицированные материалы ГОСТ",
                  "Работа с НДС и без НДС",
                  "Круглосуточный диспетчерский центр",
                  "Индивидуальные условия для постоянных клиентов",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 bg-[#c0441a] rotate-45 flex-shrink-0" />
                    <span className="font-body text-sm text-[#d1d5db]">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: "Award", title: "ГОСТ", desc: "Все материалы сертифицированы по государственным стандартам" },
                { icon: "Users", title: "Команда", desc: "120 специалистов — водители, диспетчеры, геологи" },
                { icon: "Truck", title: "Парк", desc: "47 самосвалов грузоподъёмностью от 10 до 25 тонн" },
                { icon: "Clock", title: "24 / 7", desc: "Принимаем заявки и осуществляем доставку круглосуточно" },
              ].map((item) => (
                <div key={item.title} className="bg-[#0e1014] border border-[#2a2d35] p-5">
                  <Icon name={item.icon} size={24} className="text-[#c0441a] mb-3" fallback="Star" />
                  <h4 className="font-heading font-bold text-white uppercase text-sm mb-2">{item.title}</h4>
                  <p className="font-body text-[#6b7280] text-xs leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PORTFOLIO */}
      <section id="portfolio" className="py-20 max-w-7xl mx-auto px-6">
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-px w-8 bg-[#c0441a]" />
            <span className="text-xs font-heading uppercase tracking-[0.3em] text-[#c0441a]">Портфолио</span>
          </div>
          <h2 className="font-heading text-4xl md:text-5xl font-bold uppercase text-white">Выполненные проекты</h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {PORTFOLIO.map((p, i) => (
            <div
              key={p.name}
              className="border border-[#2a2d35] bg-[#111316] p-6 hover:border-[#c0441a] transition-all group"
            >
              <div className="flex items-start justify-between mb-4">
                <span className="font-heading text-5xl font-bold text-[#1a1d22] group-hover:text-[#2a2d35] transition-colors">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-xs font-body text-[#6b7280] border border-[#2a2d35] px-2 py-1">
                  {p.year}
                </span>
              </div>
              <h3 className="font-heading text-lg font-bold text-white uppercase mb-1">{p.name}</h3>
              <p className="font-body text-[#c0441a] text-sm font-medium mb-2">{p.volume}</p>
              <p className="font-body text-xs text-[#6b7280] uppercase tracking-wide">{p.type}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CONTACTS */}
      <section id="contacts" className="py-20 bg-[#111316] border-t border-[#2a2d35]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-px w-8 bg-[#c0441a]" />
              <span className="text-xs font-heading uppercase tracking-[0.3em] text-[#c0441a]">Контакты</span>
            </div>
            <h2 className="font-heading text-4xl md:text-5xl font-bold uppercase text-white">Оставьте заявку</h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-body uppercase tracking-widest text-[#6b7280] mb-2">Ваше имя</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Иван Иванов"
                  className="w-full bg-[#0e1014] border border-[#2a2d35] text-white font-body px-4 py-3 focus:outline-none focus:border-[#c0441a] transition-colors placeholder-[#363b45]"
                />
              </div>
              <div>
                <label className="block text-xs font-body uppercase tracking-widest text-[#6b7280] mb-2">Телефон</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+7 (999) 000–00–00"
                  className="w-full bg-[#0e1014] border border-[#2a2d35] text-white font-body px-4 py-3 focus:outline-none focus:border-[#c0441a] transition-colors placeholder-[#363b45]"
                />
              </div>
              <div>
                <label className="block text-xs font-body uppercase tracking-widest text-[#6b7280] mb-2">Сообщение</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Опишите ваш объект и потребность в материалах..."
                  rows={4}
                  className="w-full bg-[#0e1014] border border-[#2a2d35] text-white font-body px-4 py-3 focus:outline-none focus:border-[#c0441a] transition-colors placeholder-[#363b45] resize-none"
                />
              </div>
              <button className="rust-btn w-full py-4 text-sm tracking-widest">
                Отправить заявку
              </button>
              <p className="text-xs text-[#6b7280] font-body text-center">
                Перезвоним в течение 30 минут в рабочее время
              </p>
            </div>

            <div className="space-y-2">
              {[
                { icon: "Phone", label: "Телефон", value: "8 (800) 123–45–67", sub: "Бесплатно по России" },
                { icon: "Mail", label: "Email", value: "info@stroykaryer.ru", sub: "Ответим в течение часа" },
                { icon: "MapPin", label: "Адрес", value: "Промышленная ул., 14", sub: "Пн–Пт 8:00–20:00, Сб 9:00–16:00" },
                { icon: "Clock", label: "Диспетчер", value: "Круглосуточно", sub: "Приём срочных заявок 24/7" },
              ].map((c) => (
                <div key={c.label} className="flex items-start gap-4 py-4 border-b border-[#2a2d35]">
                  <div className="w-10 h-10 bg-[#c0441a]/10 border border-[#c0441a]/30 flex items-center justify-center flex-shrink-0">
                    <Icon name={c.icon} size={16} className="text-[#c0441a]" fallback="Info" />
                  </div>
                  <div>
                    <div className="text-xs font-body uppercase tracking-widest text-[#6b7280] mb-1">{c.label}</div>
                    <div className="font-heading text-white font-bold text-lg">{c.value}</div>
                    <div className="text-xs font-body text-[#6b7280] mt-0.5">{c.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#0a0b0c] border-t border-[#2a2d35] py-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 bg-[#c0441a] flex items-center justify-center">
              <Icon name="Mountain" size={12} className="text-white" />
            </div>
            <span className="font-heading text-sm uppercase tracking-widest text-[#6b7280]">
              СтройКарьер © 2009–2026
            </span>
          </div>
          <div className="flex flex-wrap gap-6 justify-center">
            {NAV_LINKS.map((l) => (
              <button
                key={l.href}
                onClick={() => scrollTo(l.href)}
                className="text-xs font-body text-[#6b7280] hover:text-[#c0441a] transition-colors"
              >
                {l.label}
              </button>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
