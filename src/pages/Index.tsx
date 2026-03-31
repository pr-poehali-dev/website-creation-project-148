import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const AM_NYAM_PHOTO = "https://cdn.poehali.dev/projects/4dbfcef3-5225-4428-8681-7e590472d790/bucket/73f9b03b-34cd-4f0b-a1ee-6ea99701dd14.jpeg";

const CHARACTERS = [
  {
    id: 0,
    name: "Ам-Ням",
    type: "Главный Амнямчик",
    description: "Легендарный зелёный Ам-Ням — самый известный и любимый из всех! Обожает конфеты и всегда готов к новым приключениям.",
    trait: "Легендарный",
    power: "Конфеты",
    color: "#6DD400",
    glow: "rgba(109,212,0,0.5)",
    img: AM_NYAM_PHOTO,
    emoji: "🍬",
    level: 10,
    isMain: true,
  },
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
    isMain: false,
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
    isMain: false,
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
    isMain: false,
  },
];

const NAV_ITEMS = ["Об Амнямах", "Анимации", "Галерея"];

function useInView(ref: React.RefObject<Element>, threshold = 0.1) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) setInView(true);
    }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [ref, threshold]);
  return inView;
}

function FloatingParticle({ color, x, y, delay, size }: { color: string; x: string; y: string; delay: string; size: number }) {
  return (
    <div
      className="absolute rounded-full pointer-events-none"
      style={{
        width: size, height: size,
        left: x, top: y,
        background: color,
        animation: `float-delayed ${3 + Math.random() * 2}s ease-in-out infinite`,
        animationDelay: delay,
        opacity: 0.6,
        filter: `blur(1px)`,
      }}
    />
  );
}

function FloatingOrb({ color, size, x, y, delay }: { color: string; size: number; x: string; y: string; delay: string }) {
  return (
    <div
      className="absolute rounded-full pointer-events-none"
      style={{
        width: size, height: size,
        left: x, top: y,
        background: `radial-gradient(circle, ${color}35 0%, ${color}00 70%)`,
        animation: `pulse-glow 4s ease-in-out infinite`,
        animationDelay: delay,
        filter: 'blur(30px)',
      }}
    />
  );
}

function SpinningRing({ color, size, speed, reverse, dashed }: { color: string; size: number; speed: string; reverse?: boolean; dashed?: boolean }) {
  return (
    <div
      className={`rounded-full ${dashed ? 'border-dashed' : 'border-dotted'} border-2`}
      style={{
        width: size, height: size,
        borderColor: `${color}50`,
        animation: `${reverse ? 'spin-reverse' : 'spin-slow'} ${speed} linear infinite`,
        flexShrink: 0,
      }}
    />
  );
}

function MainHeroCharacter() {
  const [bounce, setBounce] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setBounce(true);
      setTimeout(() => setBounce(false), 600);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative flex items-center justify-center" style={{ width: 320, height: 320 }}>
      {/* outer rings */}
      <div className="absolute inset-0 flex items-center justify-center">
        <SpinningRing color="#6DD400" size={310} speed="20s" dashed />
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <SpinningRing color="#FFD93D" size={270} speed="14s" reverse dashed />
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <SpinningRing color="#6DD400" size={230} speed="9s" />
      </div>

      {/* glow bg */}
      <div
        className="absolute rounded-full"
        style={{
          width: 200, height: 200,
          background: 'radial-gradient(circle, rgba(109,212,0,0.3) 0%, transparent 70%)',
          animation: 'pulse-glow 2s ease-in-out infinite',
        }}
      />

      {/* photo */}
      <div
        className="relative z-10 rounded-2xl overflow-hidden"
        style={{
          width: 180, height: 180,
          animation: bounce ? 'bounce-in 0.6s cubic-bezier(0.34,1.56,0.64,1)' : 'float 3s ease-in-out infinite',
          boxShadow: '0 0 50px rgba(109,212,0,0.5), 0 20px 40px rgba(0,0,0,0.5)',
          border: '3px solid rgba(109,212,0,0.6)',
        }}
      >
        <img src={AM_NYAM_PHOTO} alt="Ам-Ням" className="w-full h-full object-cover object-center" />
      </div>

      {/* orbiting mini chars */}
      {CHARACTERS.slice(1).map((char, i) => (
        <div
          key={char.id}
          className="absolute rounded-full overflow-hidden border-2 z-20"
          style={{
            width: 44, height: 44,
            borderColor: char.color,
            animation: `orbit ${6 + i * 2}s linear infinite${i % 2 ? ' reverse' : ''}`,
            animationDelay: `${i * 1.5}s`,
            boxShadow: `0 0 10px ${char.glow}`,
            transformOrigin: `${130 + i * 0}px center`,
          }}
        >
          <img src={char.img} alt={char.name} className="w-full h-full object-cover" />
        </div>
      ))}

      {/* candy emoji */}
      <div className="absolute -top-4 -right-4 text-3xl z-30" style={{ animation: 'float-delayed 2s ease-in-out infinite' }}>
        🍬
      </div>
      <div className="absolute -bottom-2 -left-4 text-2xl z-30" style={{ animation: 'float 2.5s ease-in-out infinite', animationDelay: '0.8s' }}>
        ⭐
      </div>
    </div>
  );
}

function CharacterCard({ char, index }: { char: typeof CHARACTERS[0]; index: number }) {
  const [hovered, setHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null!);
  const inView = useInView(ref);

  if (char.isMain) {
    return (
      <div
        ref={ref}
        className="relative rounded-3xl overflow-hidden cursor-pointer group md:col-span-3"
        style={{
          background: `linear-gradient(135deg, #0d1f00 0%, #162800 50%, #0d1a00 100%)`,
          border: `2px solid ${char.color}50`,
          opacity: inView ? 1 : 0,
          transform: inView ? 'translateY(0) scale(1)' : 'translateY(40px) scale(0.97)',
          transition: `opacity 0.8s ease, transform 0.8s ease, box-shadow 0.3s ease`,
          boxShadow: hovered
            ? `0 0 80px rgba(109,212,0,0.4), 0 30px 60px rgba(0,0,0,0.6)`
            : `0 0 30px rgba(109,212,0,0.15), 0 4px 20px rgba(0,0,0,0.4)`,
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div className="absolute top-4 right-4 z-10">
          <span
            className="font-body text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider"
            style={{ background: 'rgba(109,212,0,0.2)', color: '#6DD400', border: '1px solid rgba(109,212,0,0.4)' }}
          >
            👑 Легенда
          </span>
        </div>

        <div className="p-8 md:p-12 flex flex-col md:flex-row items-center gap-10">
          {/* left: photo */}
          <div className="flex-shrink-0">
            <div className="relative rounded-2xl overflow-hidden"
              style={{
                width: 200, height: 200,
                boxShadow: '0 0 40px rgba(109,212,0,0.4)',
                border: '2px solid rgba(109,212,0,0.5)',
                animation: 'float 4s ease-in-out infinite',
              }}
            >
              <img src={AM_NYAM_PHOTO} alt="Ам-Ням" className="w-full h-full object-cover object-center" />
            </div>
          </div>

          {/* right: info */}
          <div className="flex-1 text-center md:text-left">
            <div className="font-body text-xs tracking-widest uppercase mb-2" style={{ color: '#6DD400' }}>
              {char.type}
            </div>
            <h3 className="font-display text-4xl md:text-5xl font-black text-white mb-4">{char.name}</h3>
            <p className="font-body text-gray-300 text-lg leading-relaxed mb-6 max-w-lg">{char.description}</p>

            <div className="flex gap-3 flex-wrap justify-center md:justify-start mb-6">
              {[char.trait, char.power, 'Cut the Rope'].map(tag => (
                <span key={tag} className="px-4 py-1.5 rounded-full text-sm font-body font-medium"
                  style={{ background: 'rgba(109,212,0,0.15)', color: '#6DD400', border: '1px solid rgba(109,212,0,0.35)' }}>
                  {tag}
                </span>
              ))}
            </div>

            <div className="max-w-sm mx-auto md:mx-0">
              <div className="flex justify-between text-xs font-body text-gray-500 mb-2">
                <span>Уровень легендарности</span>
                <span style={{ color: '#6DD400' }}>10/10</span>
              </div>
              <div className="w-full h-2 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.08)' }}>
                <div
                  className="h-full rounded-full"
                  style={{
                    width: inView ? '100%' : '0%',
                    background: 'linear-gradient(90deg, #6DD40080, #6DD400, #FFD93D)',
                    transition: 'width 1.2s ease 0.3s',
                    boxShadow: '0 0 12px #6DD400',
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

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
        boxShadow: hovered
          ? `0 0 60px ${char.glow}, 0 20px 40px rgba(0,0,0,0.5)`
          : `0 0 20px ${char.color}20, 0 4px 20px rgba(0,0,0,0.3)`,
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
            <SpinningRing color={char.color} size={150} speed="10s" dashed />
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <SpinningRing color={char.color} size={118} speed="7s" reverse />
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
          <div className="absolute -top-2 -right-2 text-2xl z-20" style={{ animation: 'float-delayed 3s ease-in-out infinite' }}>
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
            <span className="px-3 py-1 rounded-full text-xs font-body font-medium"
              style={{ background: `${char.color}20`, color: char.color, border: `1px solid ${char.color}40` }}>
              {char.trait}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-body font-medium"
              style={{ background: `${char.color}20`, color: char.color, border: `1px solid ${char.color}40` }}>
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
          <h2 className="font-display text-4xl md:text-5xl font-black text-white mb-4">Анимации</h2>
          <p className="font-body text-gray-400 max-w-xl mx-auto">
            Каждый Амнямчик живёт своей жизнью — вращается, парит и искрится
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {[
            { label: "Вращение", color: "#FF6B6B", anim: "spin-slow 3s linear infinite", emoji: "🔄", desc: "Бесконечное кружение", char: CHARACTERS[1] },
            { label: "Парение", color: "#6DD400", anim: "float 2s ease-in-out infinite", emoji: "🌿", desc: "Плавное покачивание", char: CHARACTERS[0] },
            { label: "Вибрация", color: "#A855F7", anim: "wiggle 1s ease-in-out infinite", emoji: "⚡", desc: "Энергичное движение", char: CHARACTERS[3] },
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
                <div className="absolute inset-0 rounded-full"
                  style={{ background: `radial-gradient(circle, ${item.color}20 0%, transparent 70%)`, animation: 'pulse-glow 2s ease-in-out infinite' }} />
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
            </div>
          ))}
        </div>

        {/* Big orbit showcase with Am Nyam center */}
        <div
          className="rounded-3xl p-10 text-center relative overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #0d1f00, #12121A)',
            border: '1px solid rgba(109,212,0,0.15)',
            opacity: inView ? 1 : 0,
            transition: 'all 0.9s ease 0.5s',
          }}
        >
          <div className="relative flex items-center justify-center h-56">
            {/* center: Am Nyam */}
            <div
              className="relative z-10 rounded-2xl overflow-hidden border-2"
              style={{
                width: 80, height: 80,
                borderColor: 'rgba(109,212,0,0.6)',
                boxShadow: '0 0 30px rgba(109,212,0,0.5)',
                animation: 'float 3s ease-in-out infinite',
              }}
            >
              <img src={AM_NYAM_PHOTO} alt="Ам-Ням" className="w-full h-full object-cover object-center" />
            </div>

            {CHARACTERS.slice(1).map((char, i) => (
              <div
                key={char.id}
                className="absolute rounded-full overflow-hidden border-2"
                style={{
                  width: 56, height: 56,
                  borderColor: char.color,
                  animation: `orbit ${5 + i * 2}s linear infinite${i % 2 ? ' reverse' : ''}`,
                  animationDelay: `${i * 1.2}s`,
                  boxShadow: `0 0 12px ${char.glow}`,
                  transformOrigin: `${90 + i * 20}px center`,
                }}
              >
                <img src={char.img} alt={char.name} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
          <p className="font-body text-gray-500 mt-2 text-sm">Ам-Ням в центре вселенной Евгеши</p>
        </div>
      </div>
    </section>
  );
}

export default function Index() {
  const [activeSection, setActiveSection] = useState("Об Амнямах");
  const [scrolled, setScrolled] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null!);
  const heroInView = useInView(heroRef);

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
    <div className="min-h-screen font-body" style={{ background: '#08080E', color: '#fff' }}>

      {/* Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <FloatingOrb color="#6DD400" size={500} x="-5%" y="-10%" delay="0s" />
        <FloatingOrb color="#A855F7" size={600} x="65%" y="5%" delay="1s" />
        <FloatingOrb color="#4ECDC4" size={350} x="45%" y="55%" delay="2s" />
        <FloatingOrb color="#FF6B6B" size={300} x="15%" y="65%" delay="0.5s" />
        <FloatingOrb color="#FFD93D" size={250} x="80%" y="70%" delay="1.5s" />
        {/* subtle grid */}
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }} />
      </div>

      {/* Nav */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          background: scrolled ? 'rgba(8,8,14,0.85)' : 'transparent',
          backdropFilter: scrolled ? 'blur(24px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : 'none',
        }}
      >
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="font-display font-black text-2xl tracking-tight"
            style={{
              background: 'linear-gradient(135deg, #6DD400, #FFD93D, #FF6B6B)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            ЕВГЕША
          </button>
          <div className="hidden sm:flex gap-1 p-1 rounded-2xl" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>
            {NAV_ITEMS.map(item => (
              <button
                key={item}
                onClick={() => scrollTo(item)}
                className="font-body text-sm px-4 py-2 rounded-xl transition-all duration-300"
                style={{
                  background: activeSection === item ? 'rgba(109,212,0,0.15)' : 'transparent',
                  color: activeSection === item ? '#6DD400' : '#6B7280',
                }}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden z-10 pt-20">
        <div ref={heroRef} className="max-w-6xl mx-auto px-6 py-20 flex flex-col lg:flex-row items-center gap-16">

          {/* Left: text */}
          <div className="flex-1 text-center lg:text-left">
            <div
              className="inline-flex items-center gap-2 font-body text-xs tracking-widest uppercase px-4 py-2 rounded-full mb-6"
              style={{
                background: 'rgba(109,212,0,0.1)',
                color: '#6DD400',
                border: '1px solid rgba(109,212,0,0.25)',
                opacity: heroInView ? 1 : 0,
                transform: heroInView ? 'translateY(0)' : 'translateY(20px)',
                transition: 'all 0.6s ease 0.1s',
              }}
            >
              <span style={{ animation: 'wiggle 2s ease-in-out infinite' }}>🍬</span>
              Коллекция персонажей
            </div>

            <h1
              className="font-display font-black leading-none mb-6"
              style={{
                fontSize: 'clamp(56px, 10vw, 120px)',
                background: 'linear-gradient(135deg, #6DD400 0%, #FFD93D 40%, #FF6B6B 70%, #A855F7 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                opacity: heroInView ? 1 : 0,
                transform: heroInView ? 'translateY(0)' : 'translateY(30px)',
                transition: 'all 0.7s ease 0.15s',
              }}
            >
              ЕВГЕША
            </h1>

            <p
              className="font-body text-lg text-gray-400 max-w-md mb-8 leading-relaxed"
              style={{
                opacity: heroInView ? 1 : 0,
                transform: heroInView ? 'translateY(0)' : 'translateY(20px)',
                transition: 'all 0.7s ease 0.25s',
              }}
            >
              Удивительный мир Амнямов — пушистых, добрых<br />и очень голодных существ!
            </p>

            <div
              className="flex gap-3 flex-wrap justify-center lg:justify-start"
              style={{
                opacity: heroInView ? 1 : 0,
                transform: heroInView ? 'translateY(0)' : 'translateY(20px)',
                transition: 'all 0.7s ease 0.35s',
              }}
            >
              <button
                onClick={() => scrollTo("Галерея")}
                className="font-body font-semibold px-6 py-3 rounded-2xl transition-all duration-300 hover:scale-105"
                style={{ background: '#6DD400', color: '#0A1200', boxShadow: '0 0 20px rgba(109,212,0,0.4)' }}
              >
                Смотреть галерею
              </button>
              <button
                onClick={() => scrollTo("Об Амнямах")}
                className="font-body font-semibold px-6 py-3 rounded-2xl transition-all duration-300 hover:scale-105"
                style={{ background: 'rgba(255,255,255,0.07)', color: '#fff', border: '1px solid rgba(255,255,255,0.12)' }}
              >
                Узнать больше
              </button>
            </div>

            {/* stats */}
            <div
              className="mt-10 flex gap-8 justify-center lg:justify-start"
              style={{
                opacity: heroInView ? 1 : 0,
                transition: 'all 0.7s ease 0.45s',
              }}
            >
              {[{ val: '4', label: 'персонажа' }, { val: '3', label: 'стихии' }, { val: '∞', label: 'веселья' }].map(s => (
                <div key={s.label} className="text-center">
                  <div className="font-display font-black text-2xl" style={{ color: '#6DD400' }}>{s.val}</div>
                  <div className="font-body text-xs text-gray-600 mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: animated character */}
          <div
            className="flex-shrink-0"
            style={{
              opacity: heroInView ? 1 : 0,
              transform: heroInView ? 'scale(1)' : 'scale(0.8)',
              transition: 'all 0.9s cubic-bezier(0.34, 1.56, 0.64, 1) 0.2s',
            }}
          >
            <MainHeroCharacter />
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
          style={{ animation: 'float 3s ease-in-out infinite', color: '#374151' }}>
          <Icon name="ChevronDown" size={18} />
          <span className="font-body text-xs">прокрути вниз</span>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none"
          style={{ background: 'linear-gradient(to top, #08080E, transparent)' }} />
      </section>

      {/* About */}
      <section id="Об Амнямах" className="relative z-10 py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-block font-body text-xs tracking-widest uppercase px-4 py-2 rounded-full mb-4"
              style={{ background: '#6DD40015', color: '#6DD400', border: '1px solid #6DD40030' }}>
              Знакомьтесь
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-black text-white mb-4">Об Амнямах</h2>
            <p className="font-body text-gray-400 max-w-2xl mx-auto text-lg">
              Амнямы — маленькие существа, которые обожают вкусную еду, добрые объятия и бесконечные приключения. Каждый из них особенный!
            </p>
          </div>

          {/* About cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
            {[
              { icon: "Heart", label: "Добрые", text: "Каждый Амнямчик готов поддержать в трудную минуту", color: "#FF6B6B", emoji: "💝" },
              { icon: "Sparkles", label: "Магические", text: "Обладают уникальными способностями и суперсилами", color: "#A855F7", emoji: "✨" },
              { icon: "Star", label: "Редкие", text: "Встретить Амнямчика — большая удача и радость", color: "#FFD93D", emoji: "⭐" },
            ].map((item, i) => (
              <div key={i} className="rounded-2xl p-6 flex gap-4 items-start group hover:scale-[1.02] transition-transform duration-300"
                style={{ background: '#12121A', border: `1px solid ${item.color}20` }}>
                <div className="text-2xl flex-shrink-0 mt-0.5" style={{ animation: `float ${3 + i * 0.5}s ease-in-out infinite`, animationDelay: `${i * 0.3}s` }}>
                  {item.emoji}
                </div>
                <div>
                  <h4 className="font-display font-bold text-white mb-1">{item.label}</h4>
                  <p className="font-body text-sm text-gray-500">{item.text}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Real photo showcase */}
          <div className="rounded-3xl overflow-hidden relative" style={{ border: '1px solid rgba(109,212,0,0.2)', background: '#0d1f00' }}>
            <div className="flex flex-col md:flex-row items-center gap-0">
              <div className="w-full md:w-80 h-64 md:h-80 flex-shrink-0 relative overflow-hidden">
                <img
                  src={AM_NYAM_PHOTO}
                  alt="Ам-Ням в реальной жизни"
                  className="w-full h-full object-cover"
                  style={{ objectPosition: 'center 60%' }}
                />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, transparent 60%, #0d1f00)' }} />
              </div>
              <div className="flex-1 p-8 md:p-10">
                <div className="font-body text-xs tracking-widest uppercase mb-3" style={{ color: '#6DD400' }}>
                  Реальное фото
                </div>
                <h3 className="font-display text-3xl font-black text-white mb-4">Ам-Ням в жизни</h3>
                <p className="font-body text-gray-400 leading-relaxed mb-6">
                  Вот как выглядит наш главный герой в реальном мире! Зелёный, круглый и невероятно милый — с любимой конфеткой в лапках и счастливой улыбкой.
                </p>
                <div className="flex gap-2 flex-wrap">
                  {['🍬 Любит конфеты', '👀 Большие глаза', '💚 Зелёный'].map(tag => (
                    <span key={tag} className="font-body text-xs px-3 py-1.5 rounded-full"
                      style={{ background: 'rgba(109,212,0,0.1)', color: '#6DD400', border: '1px solid rgba(109,212,0,0.25)' }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Animations */}
      <div className="relative z-10">
        <AnimationsSection />
      </div>

      {/* Gallery */}
      <section id="Галерея" className="relative z-10 py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-block font-body text-xs tracking-widest uppercase px-4 py-2 rounded-full mb-4"
              style={{ background: '#FFD93D15', color: '#FFD93D', border: '1px solid #FFD93D30' }}>
              Коллекция
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-black text-white mb-4">Галерея</h2>
            <p className="font-body text-gray-400 max-w-xl mx-auto">
              Все персонажи в одном месте — выбери своего любимого Амнямчика!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {CHARACTERS.map((char, i) => (
              <CharacterCard key={char.id} char={char} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Marquee */}
      <div className="relative z-10 py-6 overflow-hidden border-y" style={{ borderColor: '#ffffff08' }}>
        <div className="flex gap-10 whitespace-nowrap font-display font-black text-xl"
          style={{ animation: 'marquee 25s linear infinite', color: '#ffffff10' }}>
          {Array(8).fill(['АМ-НЯМ', '🍬', 'ЕВГЕША', '🔥', 'КОЛЛЕКЦИЯ', '❄️', 'МАГИЯ', '💚', 'АМНЯМЫ', '✨']).flat().map((item, i) => (
            <span key={i}>{item}</span>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 py-16 text-center">
        <div
          className="font-display font-black text-6xl mb-3"
          style={{
            background: 'linear-gradient(135deg, #6DD400, #FFD93D, #FF6B6B, #A855F7)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          ЕВГЕША
        </div>
        <p className="font-body text-gray-700 text-sm">Мир Амнямов 🍬</p>
      </footer>
    </div>
  );
}
