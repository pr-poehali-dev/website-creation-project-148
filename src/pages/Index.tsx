import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const CHARACTERS = [
  {
    id: 1,
    name: "Коралька",
    type: "Огненный Амнямчик",
    description: "Самый горячий из всех Амнямов! Любит острые блюда и танцевать у костра. Его шёрстка всегда тёплая на ощупь.",
    trait: "Весёлый",
    power: "Огонь",
    color: "#FF6B6B",
    glow: "rgba(255,107,107,0.5)",
    img: "https://cdn.poehali.dev/projects/4dbfcef3-5225-4428-8681-7e590472d790/files/e6a993a9-c1de-4232-8b7e-83277a88c806.jpg",
    emoji: "🔥",
    level: 7,
  },
  {
    id: 2,
    name: "Мятушка",
    type: "Ледяной Амнямчик",
    description: "Прохладный и спокойный. Умеет охлаждать любой напиток одним касанием. Мечтает о бескрайних ледяных просторах.",
    trait: "Спокойный",
    power: "Лёд",
    color: "#4ECDC4",
    glow: "rgba(78,205,196,0.5)",
    img: "https://cdn.poehali.dev/projects/4dbfcef3-5225-4428-8681-7e590472d790/files/9c54d5cf-5a6c-4f01-8ba2-ef7f3e1e0b97.jpg",
    emoji: "❄️",
    level: 5,
  },
  {
    id: 3,
    name: "Фиолетик",
    type: "Магический Амнямчик",
    description: "Таинственный и загадочный. Знает все секреты вселенной и умеет читать мысли. По ночам светится в темноте.",
    trait: "Загадочный",
    power: "Магия",
    color: "#A855F7",
    glow: "rgba(168,85,247,0.5)",
    img: "https://cdn.poehali.dev/projects/4dbfcef3-5225-4428-8681-7e590472d790/files/d0db6eca-d077-4b30-94a3-ccb41b6d04a4.jpg",
    emoji: "✨",
    level: 9,
  },
];

const NAV_ITEMS = ["Об Амнямах", "Анимации", "Галерея"];

function useInView(ref: React.RefObject<Element>, threshold = 0.1) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [ref, threshold]);
  return inView;
}

function FloatingOrb({ color, size, x, y, delay }: { color: string; size: number; x: string; y: string; delay: string }) {
  return (
    <div
      className="absolute rounded-full pointer-events-none"
      style={{
        width: size, height: size,
        left: x, top: y,
        background: `radial-gradient(circle, ${color}40 0%, ${color}00 70%)`,
        animation: `pulse-glow 3s ease-in-out infinite`,
        animationDelay: delay,
        filter: 'blur(20px)',
      }}
    />
  );
}

function SpinningRing({ color, size, speed, reverse }: { color: string; size: number; speed: string; reverse?: boolean }) {
  return (
    <div
      className="rounded-full border-2 border-dashed"
      style={{
        width: size, height: size,
        borderColor: `${color}60`,
        animation: `${reverse ? 'spin-reverse' : 'spin-slow'} ${speed} linear infinite`,
      }}
    />
  );
}

function CharacterCard({ char, index }: { char: typeof CHARACTERS[0]; index: number }) {
  const [hovered, setHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null!);
  const inView = useInView(ref);

  return (
    <div
      ref={ref}
      className="relative rounded-3xl overflow-hidden cursor-pointer group"
      style={{
        background: `linear-gradient(135deg, #12121A 0%, #1a1a2e 100%)`,
        border: `1px solid ${char.color}30`,
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(40px)',
        transition: `opacity 0.7s ease ${index * 0.15}s, transform 0.7s ease ${index * 0.15}s, box-shadow 0.3s ease`,
        boxShadow: hovered ? `0 0 60px ${char.glow}, 0 20px 40px rgba(0,0,0,0.5)` : `0 0 20px ${char.color}20, 0 4px 20px rgba(0,0,0,0.3)`,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ background: `radial-gradient(circle at 50% 30%, ${char.color}15 0%, transparent 70%)` }}
        />
      </div>

      <div className="relative p-8 flex flex-col items-center">
        <div className="relative mb-6 flex items-center justify-center" style={{ width: 160, height: 160 }}>
          <div className="absolute inset-0 flex items-center justify-center">
            <SpinningRing color={char.color} size={150} speed="10s" />
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <SpinningRing color={char.color} size={120} speed="7s" reverse />
          </div>
          <div
            className="relative z-10 rounded-full overflow-hidden"
            style={{
              width: 100, height: 100,
              animation: hovered ? 'wiggle 2s ease-in-out infinite' : 'float 4s ease-in-out infinite',
              boxShadow: `0 0 30px ${char.glow}`,
            }}
          >
            <img src={char.img} alt={char.name} className="w-full h-full object-cover" />
          </div>
          <div
            className="absolute -top-2 -right-2 text-2xl z-20"
            style={{ animation: 'float-delayed 3s ease-in-out infinite' }}
          >
            {char.emoji}
          </div>
        </div>

        <div className="text-center w-full">
          <div className="text-xs font-body mb-1 tracking-widest uppercase" style={{ color: char.color }}>
            {char.type}
          </div>
          <h3 className="font-display text-2xl font-bold text-white mb-3">{char.name}</h3>
          <p className="font-body text-sm text-gray-400 leading-relaxed mb-5">{char.description}</p>

          <div className="flex gap-2 justify-center flex-wrap mb-5">
            <span
              className="px-3 py-1 rounded-full text-xs font-body font-medium"
              style={{ background: `${char.color}20`, color: char.color, border: `1px solid ${char.color}40` }}
            >
              {char.trait}
            </span>
            <span
              className="px-3 py-1 rounded-full text-xs font-body font-medium"
              style={{ background: `${char.color}20`, color: char.color, border: `1px solid ${char.color}40` }}
            >
              {char.power}
            </span>
          </div>

          <div className="w-full">
            <div className="flex justify-between text-xs font-body text-gray-500 mb-1">
              <span>Уровень силы</span>
              <span style={{ color: char.color }}>{char.level}/10</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-1000"
                style={{
                  width: inView ? `${char.level * 10}%` : '0%',
                  background: `linear-gradient(90deg, ${char.color}80, ${char.color})`,
                  transitionDelay: `${index * 0.15 + 0.5}s`,
                  boxShadow: `0 0 8px ${char.color}`,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AnimationsSection() {
  const ref = useRef<HTMLDivElement>(null!);
  const inView = useInView(ref);

  return (
    <section id="Анимации" className="py-24 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6" ref={ref}>
        <div
          className="text-center mb-16"
          style={{ opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(30px)', transition: 'all 0.7s ease' }}
        >
          <div className="inline-block font-body text-xs tracking-widest uppercase px-4 py-2 rounded-full mb-4"
            style={{ background: '#4ECDC420', color: '#4ECDC4', border: '1px solid #4ECDC440' }}>
            Магия движения
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-black text-white mb-4">
            Анимации
          </h2>
          <p className="font-body text-gray-400 max-w-xl mx-auto">
            Каждый Амнямчик живёт своей жизнью — вращается, парит и искрится
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { label: "Вращение", color: "#FF6B6B", anim: "spin-slow 3s linear infinite", emoji: "🔄", desc: "Бесконечное кружение", char: CHARACTERS[0] },
            { label: "Парение", color: "#4ECDC4", anim: "float 2s ease-in-out infinite", emoji: "🌊", desc: "Плавное покачивание", char: CHARACTERS[1] },
            { label: "Вибрация", color: "#A855F7", anim: "wiggle 1s ease-in-out infinite", emoji: "⚡", desc: "Энергичное движение", char: CHARACTERS[2] },
          ].map((item, i) => (
            <div
              key={i}
              className="rounded-3xl p-8 flex flex-col items-center gap-6"
              style={{
                background: '#12121A',
                border: `1px solid ${item.color}30`,
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateY(0)' : 'translateY(40px)',
                transition: `all 0.7s ease ${i * 0.2}s`,
              }}
            >
              <div className="relative flex items-center justify-center" style={{ width: 120, height: 120 }}>
                <div
                  className="absolute inset-0 rounded-full"
                  style={{ background: `radial-gradient(circle, ${item.color}20 0%, transparent 70%)`, animation: 'pulse-glow 2s ease-in-out infinite' }}
                />
                <div
                  className="relative rounded-full overflow-hidden"
                  style={{ width: 80, height: 80, animation: item.anim, boxShadow: `0 0 20px ${item.color}60` }}
                >
                  <img src={item.char.img} alt={item.char.name} className="w-full h-full object-cover" />
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl mb-2">{item.emoji}</div>
                <h3 className="font-display text-lg font-bold text-white mb-1">{item.label}</h3>
                <p className="font-body text-sm text-gray-500">{item.desc}</p>
              </div>
              <div
                className="px-4 py-2 rounded-full text-xs font-body font-semibold"
                style={{ background: `${item.color}20`, color: item.color }}
              >
                Активна
              </div>
            </div>
          ))}
        </div>

        <div
          className="mt-16 rounded-3xl p-10 text-center relative overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #12121A, #1a1a2e)',
            border: '1px solid #ffffff15',
            opacity: inView ? 1 : 0,
            transition: 'all 0.9s ease 0.5s',
          }}
        >
          <div className="relative flex items-center justify-center h-48">
            {CHARACTERS.map((char, i) => (
              <div
                key={char.id}
                className="absolute rounded-full overflow-hidden border-2"
                style={{
                  width: 70, height: 70,
                  borderColor: char.color,
                  animation: `orbit ${4 + i * 2}s linear infinite${i % 2 ? ' reverse' : ''}`,
                  animationDelay: `${i * 1.3}s`,
                  boxShadow: `0 0 15px ${char.glow}`,
                  transformOrigin: `${60 + i * 25}px center`,
                }}
              >
                <img src={char.img} alt={char.name} className="w-full h-full object-cover" />
              </div>
            ))}
            <div className="absolute font-display text-4xl font-black text-white" style={{ textShadow: '0 0 30px #A855F780' }}>
              ✨
            </div>
          </div>
          <p className="font-body text-gray-400 mt-4">Амнямы вращаются вокруг магического центра</p>
        </div>
      </div>
    </section>
  );
}

export default function Index() {
  const [activeSection, setActiveSection] = useState("Об Амнямах");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (section: string) => {
    const el = document.getElementById(section);
    if (el) { el.scrollIntoView({ behavior: "smooth" }); setActiveSection(section); }
  };

  return (
    <div className="min-h-screen font-body" style={{ background: '#0A0A0F', color: '#fff' }}>
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <FloatingOrb color="#FF6B6B" size={400} x="10%" y="5%" delay="0s" />
        <FloatingOrb color="#A855F7" size={500} x="70%" y="10%" delay="1s" />
        <FloatingOrb color="#4ECDC4" size={300} x="50%" y="60%" delay="2s" />
        <FloatingOrb color="#FFD93D" size={250} x="20%" y="70%" delay="0.5s" />
      </div>

      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrolled ? 'rgba(10,10,15,0.9)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(255,255,255,0.05)' : 'none',
        }}
      >
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="font-display font-black text-xl" style={{ background: 'linear-gradient(135deg, #FF6B6B, #A855F7, #4ECDC4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            ЕВГЕША
          </div>
          <div className="flex gap-1">
            {NAV_ITEMS.map(item => (
              <button
                key={item}
                onClick={() => scrollTo(item)}
                className="font-body text-sm px-4 py-2 rounded-full transition-all duration-300"
                style={{
                  background: activeSection === item ? 'rgba(168,85,247,0.2)' : 'transparent',
                  color: activeSection === item ? '#A855F7' : '#9CA3AF',
                  border: activeSection === item ? '1px solid rgba(168,85,247,0.4)' : '1px solid transparent',
                }}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </nav>

      <section className="relative min-h-screen flex items-center justify-center overflow-hidden z-10">
        <div className="text-center px-6 py-32">
          <div
            className="inline-block font-body text-xs tracking-widest uppercase px-4 py-2 rounded-full mb-8"
            style={{
              background: 'rgba(168,85,247,0.15)',
              color: '#A855F7',
              border: '1px solid rgba(168,85,247,0.3)',
              animation: 'fade-in-up 0.6s ease-out forwards',
            }}
          >
            🌟 Коллекция персонажей
          </div>

          <h1
            className="font-display font-black mb-6 leading-none"
            style={{
              fontSize: 'clamp(64px, 12vw, 140px)',
              background: 'linear-gradient(135deg, #FF6B6B 0%, #A855F7 50%, #4ECDC4 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              animation: 'fade-in-up 0.7s ease-out 0.1s both',
            }}
          >
            ЕВГЕША
          </h1>

          <p
            className="font-body text-lg text-gray-400 max-w-lg mx-auto mb-12"
            style={{ animation: 'fade-in-up 0.7s ease-out 0.2s both' }}
          >
            Удивительный мир Амнямов — пушистых, добрых и очень голодных существ!
          </p>

          <div
            className="flex items-center justify-center gap-4 flex-wrap"
            style={{ animation: 'fade-in-up 0.7s ease-out 0.3s both' }}
          >
            {CHARACTERS.map((char, i) => (
              <div
                key={char.id}
                className="rounded-full overflow-hidden border-2 transition-all duration-300 hover:scale-110 cursor-pointer"
                style={{
                  width: 72, height: 72,
                  borderColor: char.color,
                  animation: `float ${4 + i}s ease-in-out infinite`,
                  animationDelay: `${i * 0.5}s`,
                  boxShadow: `0 0 20px ${char.glow}`,
                }}
                onClick={() => scrollTo("Галерея")}
              >
                <img src={char.img} alt={char.name} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>

          <div
            className="mt-16 flex items-center justify-center gap-2 text-gray-600"
            style={{ animation: 'float 3s ease-in-out infinite' }}
          >
            <Icon name="ChevronDown" size={20} />
            <span className="font-body text-sm">прокрути вниз</span>
          </div>
        </div>

        <div
          className="absolute bottom-0 left-0 right-0 h-32"
          style={{ background: 'linear-gradient(to top, #0A0A0F, transparent)' }}
        />
      </section>

      <section id="Об Амнямах" className="relative z-10 py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-block font-body text-xs tracking-widest uppercase px-4 py-2 rounded-full mb-4"
              style={{ background: '#FF6B6B20', color: '#FF6B6B', border: '1px solid #FF6B6B40' }}>
              Знакомьтесь
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-black text-white mb-4">
              Об Амнямах
            </h2>
            <p className="font-body text-gray-400 max-w-2xl mx-auto text-lg">
              Амнямы — это маленькие существа, которые обожают вкусную еду, добрые объятия и бесконечные приключения. Каждый из них особенный!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16">
            {[
              { icon: "Heart", label: "Добрые", text: "Каждый Амнямчик готов поддержать в трудную минуту", color: "#FF6B6B" },
              { icon: "Sparkles", label: "Магические", text: "Обладают уникальными способностями и суперсилами", color: "#A855F7" },
              { icon: "Star", label: "Редкие", text: "Встретить Амнямчика — большая удача и радость", color: "#FFD93D" },
            ].map((item, i) => (
              <div key={i} className="rounded-2xl p-6 flex gap-4 items-start"
                style={{ background: '#12121A', border: `1px solid ${item.color}25` }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: `${item.color}20` }}>
                  <Icon name={item.icon as "Heart"} size={18} style={{ color: item.color }} />
                </div>
                <div>
                  <h4 className="font-display font-bold text-white mb-1">{item.label}</h4>
                  <p className="font-body text-sm text-gray-500">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="relative z-10">
        <AnimationsSection />
      </div>

      <section id="Галерея" className="relative z-10 py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-block font-body text-xs tracking-widest uppercase px-4 py-2 rounded-full mb-4"
              style={{ background: '#FFD93D20', color: '#FFD93D', border: '1px solid #FFD93D40' }}>
              Коллекция
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-black text-white mb-4">
              Галерея
            </h2>
            <p className="font-body text-gray-400 max-w-xl mx-auto">
              Все персонажи в одном месте — выбери своего любимого Амнямчика!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {CHARACTERS.map((char, i) => (
              <CharacterCard key={char.id} char={char} index={i} />
            ))}
          </div>
        </div>
      </section>

      <div className="relative z-10 py-8 overflow-hidden border-y" style={{ borderColor: '#ffffff10' }}>
        <div
          className="flex gap-12 whitespace-nowrap font-display font-black text-2xl"
          style={{ animation: 'marquee 20s linear infinite', color: '#ffffff15' }}
        >
          {Array(6).fill(['АМНЯМЫ', '✨', 'ЕВГЕША', '🔥', 'КОЛЛЕКЦИЯ', '❄️', 'МАГИЯ', '💫']).flat().map((item, i) => (
            <span key={i}>{item}</span>
          ))}
        </div>
      </div>

      <footer className="relative z-10 py-12 text-center">
        <div
          className="font-display font-black text-5xl mb-4"
          style={{
            background: 'linear-gradient(135deg, #FF6B6B, #A855F7, #4ECDC4)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          ЕВГЕША
        </div>
        <p className="font-body text-gray-600 text-sm">Мир Амнямов</p>
      </footer>
    </div>
  );
}
