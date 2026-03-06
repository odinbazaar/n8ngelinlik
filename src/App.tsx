import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  Upload, 
  Wand2, 
  X, 
  ChevronRight, 
  Camera, 
  ShieldCheck,
  Settings,
  Download,
  Image as ImageIcon,
  MapPin,
  Maximize2
} from 'lucide-react';
import confetti from 'canvas-confetti';

const App: React.FC = () => {
  const [dress, setDress] = useState<string | null>(null);
  const [model, setModel] = useState<string | null>(null);
  const [background, setBackground] = useState<string | null>(null);
  const [userPrompt, setUserPrompt] = useState('Zarif bir stüdyo çekimi');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [apiKey, setApiKey] = useState(localStorage.getItem('replicate_key') || '');
  const [showSettings, setShowSettings] = useState(false);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>, setter: (val: string) => void) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setter(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  /**
   * Arka planda promptu zenginleştirir.
   * Amacı: Kullanıcı basit bir şey yazsa bile kataloğluk kaliteyi garantilemek.
   */
  const enhancePromptForCatalogue = (input: string) => {
    const baseKeywords = "vton, virtual try-on, high-end fashion photography, 8k resolution, ultra-detailed, professional studio lighting, catalogue style, sharp focus, preserve garment texture and embroidery details";
    const backgroundPart = background ? "Use the provided background image architecture and aesthetic." : "Clean, minimal high-end bridal boutique background.";
    
    return `${input}. ${baseKeywords}. ${backgroundPart}. The dress from the first image must be flawlessly transferred to the person in the second image. Elegant pose, commercial quality.`;
  };

  const generateAI = async () => {
    if (!dress || !model) {
      alert("Lütfen en az Gelinlik ve Model resimlerini yükleyin.");
      return;
    }
    
    setIsLoading(true);
    const professionalPrompt = enhancePromptForCatalogue(userPrompt);
    console.log("Refined Prompt:", professionalPrompt);

    try {
      // API entegrasyonu buraya gelecek. Şimdilik simülasyon:
      await new Promise(resolve => setTimeout(resolve, 4000));
      
      // Örnek bir başarılı sonuç simülasyonu
      setResult('https://images.unsplash.com/photo-1594553813448-423efbb22188?auto=format&fit=crop&q=80&w=1000');
      
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#d4af37', '#ffffff', '#f1e5ac']
      });

      // Sonuca otomatik kaydır
      setTimeout(() => {
        document.getElementById('result-area')?.scrollIntoView({ behavior: 'smooth' });
      }, 500);

    } catch (error) {
      console.error(error);
      alert('İşlem sırasında bir hata oluştu.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="app-wrapper fade-in">
      <div className="bg-gradient" />
      
      <header className="landing-header">
        <div className="logo">
          BRIDAL<span>STUDIO.AI</span>
        </div>
        <button 
          onClick={() => setShowSettings(!showSettings)}
          className="icon-button glass-card"
          style={{ padding: '0.75rem', borderRadius: '12px' }}
        >
          <Settings size={20} color={apiKey ? "var(--primary)" : "var(--text-muted)"} />
        </button>
      </header>

      <main>
        <section className="hero">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="playfair"
            style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '0.6rem', 
              background: 'rgba(212, 175, 55, 0.1)', 
              padding: '0.6rem 1.2rem', 
              borderRadius: '100px', 
              marginBottom: '2rem', 
              border: '1px solid rgba(212, 175, 55, 0.2)',
              fontSize: '0.8rem',
              letterSpacing: '0.15em'
            }}
          >
            <Sparkles size={16} className="gold-gradient" />
            <span className="gold-gradient" style={{ fontWeight: 700 }}>CATALOGUE INTELLIGENCE v2.0</span>
          </motion.div>
          
          <h1>Vizyonunuzu <br /> <span className="gold-gradient playfair">Gerçeğe Dönüştürün</span></h1>
          <p>Üçlü veri işleme sistemi ile cansız mankenden canlı modele, hayalinizdeki mekanda profesyonel çekimler.</p>
        </section>

        <div className="studio-grid">
          {/* UPLOAD DRESS */}
          <div className="glass-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', alignItems: 'center' }}>
              <h3 className="playfair">1. Gelinlik</h3>
              <div style={{ color: 'var(--primary)', background: 'rgba(212, 175, 55, 0.1)', padding: '0.4rem', borderRadius: '8px' }}>
                <ImageIcon size={18} />
              </div>
            </div>
            <label className="upload-zone">
              <input type="file" hidden onChange={(e) => handleFile(e, setDress)} accept="image/*" />
              {dress ? (
                <img src={dress} className="preview-img" alt="Dress" />
              ) : (
                <div style={{ textAlign: 'center', color: 'var(--text-muted)' }}>
                  <Upload style={{ margin: '0 auto 1rem', opacity: 0.5 }} />
                  <p style={{ fontSize: '0.9rem' }}>Manken Üzerindeki Ürün</p>
                </div>
              )}
            </label>
          </div>

          {/* UPLOAD MODEL */}
          <div className="glass-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', alignItems: 'center' }}>
              <h3 className="playfair">2. Model</h3>
              <div style={{ color: 'var(--primary)', background: 'rgba(212, 175, 55, 0.1)', padding: '0.4rem', borderRadius: '8px' }}>
                <Camera size={18} />
              </div>
            </div>
            <label className="upload-zone">
              <input type="file" hidden onChange={(e) => handleFile(e, setModel)} accept="image/*" />
              {model ? (
                <img src={model} className="preview-img" alt="Model" />
              ) : (
                <div style={{ textAlign: 'center', color: 'var(--text-muted)' }}>
                  <Upload style={{ margin: '0 auto 1rem', opacity: 0.5 }} />
                  <p style={{ fontSize: '0.9rem' }}>Taşıyıcı Model (Kişi)</p>
                </div>
              )}
            </label>
          </div>

          {/* UPLOAD BACKGROUND */}
          <div className="glass-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', alignItems: 'center' }}>
              <h3 className="playfair">3. Mekan</h3>
              <div style={{ color: 'var(--primary)', background: 'rgba(212, 175, 55, 0.1)', padding: '0.4rem', borderRadius: '8px' }}>
                <MapPin size={18} />
              </div>
            </div>
            <label className="upload-zone">
              <input type="file" hidden onChange={(e) => handleFile(e, setBackground)} accept="image/*" />
              {background ? (
                <img src={background} className="preview-img" alt="Background" />
              ) : (
                <div style={{ textAlign: 'center', color: 'var(--text-muted)' }}>
                  <Upload style={{ margin: '0 auto 1rem', opacity: 0.5 }} />
                  <p style={{ fontSize: '0.9rem' }}>Arka Plan (Opsiyonel)</p>
                </div>
              )}
            </label>
          </div>

          {/* PROMPT BOX */}
          <div className="glass-card prompt-section">
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', alignItems: 'center' }}>
              <div>
                <h3 className="playfair" style={{ marginBottom: '0.25rem' }}>Hayalinizdeki Sahneyi Tanımlayın</h3>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', letterSpacing: '0.05em' }}>AI SİSTEMİ TARAFINDAN OTOMATİK OLARAK ZENGİNLEŞTİRİLİR</p>
              </div>
              <Wand2 size={20} color="var(--primary)" />
            </div>
            <textarea 
              className="input-field" 
              placeholder="Örn: Gün batımında sahil kenarında, zarif ve rüzgarlı bir atmosfer..."
              value={userPrompt}
              onChange={(e) => setUserPrompt(e.target.value)}
              style={{ minHeight: '100px', fontSize: '1.1rem' }}
            />
            <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'center' }}>
              <button 
                className="btn-primary" 
                style={{ padding: '1.5rem 5rem', fontSize: '1.1rem' }}
                disabled={!dress || !model || isLoading}
                onClick={generateAI}
              >
                {isLoading ? (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div className="ai-loader" style={{ width: '24px', height: '24px', borderWidth: '3px' }} />
                    İŞLENİYOR...
                  </div>
                ) : (
                  <>PROFESYONEL ÜRETİM BAŞLAT <ChevronRight size={20} /></>
                )}
              </button>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {result && (
            <motion.div 
              id="result-area"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="result-section"
            >
              <div style={{ marginBottom: '3rem' }}>
                <h2 className="playfair" style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>Final <span className="gold-gradient">Kompozisyon</span></h2>
                <p style={{ color: 'var(--text-muted)' }}>Katalog standartlarında, ultra-detaylı yapay zeka çıktısı.</p>
              </div>
              
              <div className="result-display">
                <div style={{ position: 'relative' }}>
                   <img src={result} style={{ width: '100%', display: 'block' }} alt="Result" />
                   <div style={{ position: 'absolute', top: '20px', left: '20px', background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(10px)', padding: '0.5rem 1rem', borderRadius: '100px', fontSize: '0.7rem', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                     <Maximize2 size={12} color="var(--primary)" />
                     PREMIUM QUALITY 8K
                   </div>
                </div>
                <div style={{ padding: '2rem', background: 'var(--bg-card)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                  <div style={{ textAlign: 'left' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--success)', marginBottom: '0.25rem' }}>
                      <ShieldCheck size={18} />
                      <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>İşlem Başarılı</span>
                    </div>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Gelinlik dokusu ve ışık uyumu optimize edildi.</p>
                  </div>
                  <button className="btn-primary" style={{ padding: '0.8rem 2rem', fontSize: '0.9rem' }}>
                    <Download size={18} /> YÜKSEK ÇÖZÜNÜRLÜKTE İNDİR
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* SETTINGS MODAL */}
      <AnimatePresence>
        {showSettings && (
          <div className="modal-overlay" onClick={() => setShowSettings(false)}>
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="glass-card" 
              style={{ maxWidth: '450px', width: '90%', padding: '3rem' }}
              onClick={e => e.stopPropagation()}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2.5rem', alignItems: 'center' }}>
                <h3 className="playfair" style={{ fontSize: '1.8rem' }}>Sistem Ayarları</h3>
                <button onClick={() => setShowSettings(false)} style={{ background: 'rgba(255,255,255,0.05)', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: '0.5rem', borderRadius: '50%' }}><X size={20} /></button>
              </div>
              <div style={{ marginBottom: '2rem' }}>
                <label style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.75rem', letterSpacing: '0.1em' }}>REPLICATE API ANAHTARI</label>
                <input 
                  type="password" 
                  className="input-field" 
                  value={apiKey}
                  onChange={(e) => {
                    setApiKey(e.target.value);
                    localStorage.setItem('replicate_key', e.target.value);
                  }}
                  placeholder="r8_..."
                  style={{ background: 'rgba(0,0,0,0.3)' }}
                />
              </div>
              <div style={{ background: 'rgba(212, 175, 55, 0.05)', padding: '1rem', borderRadius: '12px', border: '1px solid rgba(212, 175, 55, 0.1)' }}>
                <p style={{ fontSize: '0.75rem', color: 'var(--primary-light)', lineHeight: '1.5' }}>
                  <strong>Bilgi:</strong> Tasarımlarınızın gerçek AI modelleri ile üretilmesi için geçerli bir API anahtarı gereklidir. Anahtarınız sadece bu cihazda saklanır.
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <footer style={{ marginTop: '8rem', padding: '4rem 0', borderTop: '1px solid rgba(255,255,255,0.05)', textAlign: 'center', color: 'var(--text-muted)' }}>
        <p style={{ fontSize: '0.8rem', letterSpacing: '0.1em' }}>PRECISION FASHION AI ENGINE • VERSION 2.0.4</p>
        <p style={{ fontSize: '0.75rem', marginTop: '1rem', opacity: 0.5 }}>© 2026 BRIDAL STUDIO. Tüm Hakları Saklıdır.</p>
      </footer>
    </div>
  );
};

export default App;
