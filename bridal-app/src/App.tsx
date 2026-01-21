import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import UploadCard from './components/UploadCard';
import ResultGallery from './components/ResultGallery';
import SettingsModal from './components/SettingsModal';
import { Shirt, User, MapPin, Wand2, Loader2, LogOut } from 'lucide-react';
import confetti from 'canvas-confetti';
import { supabase } from './lib/supabase';
import Login from './components/Login';
import type { User as SupabaseUser } from '@supabase/supabase-js';

const App: React.FC = () => {
  // Auth State
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [authLoading, setAuthLoading] = useState(true);

  // App State
  const [dressImage, setDressImage] = useState<string | null>(null);
  const [modelImage, setModelImage] = useState<string | null>(null);
  const [bgImage, setBgImage] = useState<string | null>(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [webhookUrl, setWebhookUrl] = useState(() => {
    return localStorage.getItem('bridal_webhook_url') || 'https://n8n.polmarkai.pro/webhook-test/gelinlik';
  });
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<{ image_1: string | null; image_2: string | null }>({
    image_1: null,
    image_2: null
  });

  // Auth Effect
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setAuthLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Webhook Persist Effect
  useEffect(() => {
    localStorage.setItem('bridal_webhook_url', webhookUrl);
  }, [webhookUrl]);

  // Handlers
  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  const handleGenerate = async () => {
    if (!dressImage || !modelImage) return;

    setIsLoading(true);
    setResults({ image_1: null, image_2: null });

    try {
      const payload = {
        dress_image: dressImage,
        model_image: modelImage,
        background_image: bgImage,
        timestamp: new Date().toISOString(),
        request_id: `req_${Date.now()}`
      };

      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error('Üretim işlemi başarısız oldu. Lütfen webhook URL\'ini kontrol edin.');
      }

      const data = await response.json();

      if (data.image_1 || data.image_2) {
        setResults({
          image_1: data.image_1,
          image_2: data.image_2
        });

        confetti({
          particleCount: 150,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#C9A962', '#E8D5A3', '#FFFFFF']
        });

        setTimeout(() => {
          document.querySelector('.results-container')?.scrollIntoView({ behavior: 'smooth' });
        }, 500);
      } else {
        throw new Error('AI görsel üretemedi. n8n workflow\'unu kontrol edin.');
      }

    } catch (error: any) {
      alert(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream">
        <Loader2 className="animate-spin text-gold w-12 h-12" />
      </div>
    );
  }

  if (!user) {
    return <Login />;
  }

  const isFormValid = dressImage && modelImage;

  return (
    <div className="app-container">
      <Header onOpenSettings={() => setIsSettingsOpen(true)} />

      <div className="fixed bottom-8 left-8 z-[100]">
        <button
          onClick={handleLogout}
          className="p-4 bg-white/80 backdrop-blur-md border border-gold/20 rounded-full text-soft-gray hover:text-red-500 hover:border-red-500/30 transition-all shadow-lg group"
          title="Çıkış Yap"
        >
          <LogOut size={24} />
        </button>
      </div>

      <main className="main-content">
        <section className="hero-section fade-in">
          <h1 className="hero-title">Gelinlik AI Studio</h1>
          <p className="hero-subtitle">Yapay zeka ile hayalinizdeki çekimi saniyeler içinde tasarlayın</p>
        </section>

        <section className="upload-grid">
          <UploadCard
            number={1}
            title="Gelinlik"
            subtitle="Manken Üzerinde"
            value={dressImage}
            onFileSelect={setDressImage}
            icon={<Shirt size={48} strokeWidth={1} />}
          />
          <UploadCard
            number={2}
            title="Model"
            subtitle="Canlı Model"
            value={modelImage}
            onFileSelect={setModelImage}
            icon={<User size={48} strokeWidth={1} />}
          />
          <UploadCard
            number={3}
            title="Mekan"
            subtitle="Arka Plan"
            optional
            value={bgImage}
            onFileSelect={setBgImage}
            icon={<MapPin size={48} strokeWidth={1} />}
          />
        </section>

        <div className="generate-container">
          <button
            className="primary-button"
            disabled={!isFormValid || isLoading}
            onClick={handleGenerate}
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin" />
                TASARLANIYOR...
              </>
            ) : (
              <>
                <Wand2 size={24} />
                GÖRSELİ OLUŞTUR
              </>
            )}
          </button>
        </div>

        <ResultGallery images={results} />
      </main>

      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        webhookUrl={webhookUrl}
        onSave={setWebhookUrl}
      />

      {isLoading && (
        <div className="loading-overlay">
          <div className="loading-flower"></div>
          <div className="loading-text">Yapay Zeka Çalışıyor</div>
          <p className="loading-subtext">Profesyonel çekiminiz hazırlanıyor (30-60 sn)...</p>
        </div>
      )}
    </div>
  );
};

export default App;
