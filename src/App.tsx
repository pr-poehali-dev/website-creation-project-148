
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { useState } from "react";
import Icon from "@/components/ui/icon";

const queryClient = new QueryClient();

const MusicPlayer = () => {
  const [playing, setPlaying] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const toggle = () => {
    setLoaded(true);
    setPlaying((p) => !p);
  };

  return (
    <>
      {loaded && (
        <iframe
          key={String(playing)}
          src={playing ? "https://www.youtube.com/embed/EU_4PMDidwc?autoplay=1&loop=1&playlist=EU_4PMDidwc&controls=0&mute=0" : "about:blank"}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={{ position: "fixed", bottom: 0, left: 0, width: "200px", height: "113px", opacity: 0.01, pointerEvents: "none", zIndex: 0 }}
          title="bg-music"
        />
      )}

      <button
        onClick={toggle}
        title={playing ? "Выключить музыку" : "Включить музыку"}
        style={{
          position: "fixed",
          bottom: "100px",
          right: "24px",
          zIndex: 99999,
          width: "56px",
          height: "56px",
          borderRadius: "50%",
          background: playing ? "rgba(109,212,0,0.9)" : "rgba(20,20,20,0.85)",
          border: playing ? "2px solid #6DD400" : "2px solid rgba(255,255,255,0.3)",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          backdropFilter: "blur(12px)",
          boxShadow: playing ? "0 0 24px rgba(109,212,0,0.7)" : "0 4px 20px rgba(0,0,0,0.5)",
          transition: "all 0.2s",
        }}
      >
        <Icon name={playing ? "Volume2" : "VolumeX"} size={24} />
      </button>
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