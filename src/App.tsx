
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { useState, useRef } from "react";
import Icon from "@/components/ui/icon";

const queryClient = new QueryClient();

const MusicPlayer = () => {
  const [showIntro, setShowIntro] = useState(true);
  const [playing, setPlaying] = useState(false);

  const enter = () => {
    setShowIntro(false);
    setPlaying(true);
  };

  const toggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPlaying((p) => !p);
  };

  return (
    <>
      {showIntro && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 99999,
          background: "linear-gradient(135deg, #1a0a2e 0%, #0d1b2a 100%)",
          display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center",
          gap: "24px",
        }}>
          <div style={{ fontSize: "80px", lineHeight: 1 }}>🍬</div>
          <div style={{
            fontFamily: "sans-serif", color: "#fff",
            fontSize: "32px", fontWeight: 800,
            textShadow: "0 0 30px rgba(109,212,0,0.8)",
            letterSpacing: "1px",
          }}>
            Мир Ам-Няма
          </div>
          <div style={{ color: "rgba(255,255,255,0.6)", fontSize: "15px", fontFamily: "sans-serif" }}>
            Нажми, чтобы войти
          </div>
          <button
            onClick={enter}
            style={{
              marginTop: "8px",
              padding: "16px 48px",
              borderRadius: "50px",
              background: "linear-gradient(135deg, #6DD400, #4aa800)",
              border: "none",
              color: "#fff",
              fontSize: "20px",
              fontWeight: 700,
              cursor: "pointer",
              boxShadow: "0 0 40px rgba(109,212,0,0.5)",
              fontFamily: "sans-serif",
              letterSpacing: "1px",
              transition: "transform 0.1s",
            }}
            onMouseDown={e => (e.currentTarget.style.transform = "scale(0.97)")}
            onMouseUp={e => (e.currentTarget.style.transform = "scale(1)")}
          >
            Войти
          </button>
        </div>
      )}

      {!showIntro && (
        <iframe
          src={`https://www.youtube.com/embed/3_OTlO5Eu5Q?autoplay=${playing ? 1 : 0}&loop=1&playlist=3_OTlO5Eu5Q&controls=0&mute=0`}
          allow="autoplay"
          style={{ position: "fixed", top: "-9999px", left: "-9999px", width: "1px", height: "1px", opacity: 0, pointerEvents: "none" }}
          title="bg-music"
        />
      )}

      {!showIntro && (
        <button
          onClick={toggle}
          title={playing ? "Выключить музыку" : "Включить музыку"}
          style={{
            position: "fixed", bottom: "20px", right: "20px", zIndex: 9999,
            width: "44px", height: "44px", borderRadius: "50%",
            background: playing ? "rgba(0,0,0,0.75)" : "rgba(0,0,0,0.45)",
            border: "1.5px solid rgba(255,255,255,0.25)",
            color: "#fff", display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "pointer", backdropFilter: "blur(8px)", transition: "background 0.2s",
          }}
        >
          <Icon name={playing ? "Music" : "VolumeX"} size={20} />
        </button>
      )}
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <MusicPlayer />
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
