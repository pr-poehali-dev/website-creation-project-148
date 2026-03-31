
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { useState, useRef, useEffect } from "react";
import Icon from "@/components/ui/icon";

const queryClient = new QueryClient();

const MusicPlayer = () => {
  const [playing, setPlaying] = useState(false);
  const [started, setStarted] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const handleFirstInteraction = () => {
      if (!started) {
        setPlaying(true);
        setStarted(true);
      }
      document.removeEventListener("click", handleFirstInteraction);
      document.removeEventListener("touchstart", handleFirstInteraction);
    };
    document.addEventListener("click", handleFirstInteraction);
    document.addEventListener("touchstart", handleFirstInteraction);
    return () => {
      document.removeEventListener("click", handleFirstInteraction);
      document.removeEventListener("touchstart", handleFirstInteraction);
    };
  }, [started]);

  const toggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPlaying((p) => !p);
    setStarted(true);
  };

  return (
    <>
      {started && (
        <iframe
          ref={iframeRef}
          src={`https://www.youtube.com/embed/3_OTlO5Eu5Q?autoplay=${playing ? 1 : 0}&loop=1&playlist=3_OTlO5Eu5Q&controls=0&mute=0&enablejsapi=1`}
          allow="autoplay"
          style={{ position: "fixed", top: "-9999px", left: "-9999px", width: "1px", height: "1px", opacity: 0, pointerEvents: "none" }}
          title="bg-music"
        />
      )}
      <button
        onClick={toggle}
        title={playing ? "Выключить музыку" : "Включить музыку"}
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          zIndex: 9999,
          width: "44px",
          height: "44px",
          borderRadius: "50%",
          background: playing ? "rgba(0,0,0,0.75)" : "rgba(0,0,0,0.45)",
          border: "1.5px solid rgba(255,255,255,0.25)",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          backdropFilter: "blur(8px)",
          transition: "background 0.2s",
        }}
      >
        <Icon name={playing ? "Music" : "VolumeX"} size={20} />
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
