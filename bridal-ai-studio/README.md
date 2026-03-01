# 🎀 Bridal AI Studio

**Virtual Try-On** teknolojisi ile gelinlikleri model üzerinde görselleştirin.

## ✨ Özellikler

- 🖼️ **Sürükle-Bırak Upload** - Kolay görsel yükleme
- 🤖 **AI Virtual Try-On** - Replicate IDM-VTON modeli
- 💾 **Görsel İndirme** - Sonuçları HD olarak kaydedin
- 🔐 **Güvenli API Key** - Tarayıcıda şifreli saklama
- 📱 **Mobil Uyumlu** - Responsive tasarım

## 🚀 Kurulum

### Yerel Geliştirme

1. Klasörü açın ve `index.html` dosyasını tarayıcıda çalıştırın
2. [Replicate.com](https://replicate.com/account/api-tokens) adresinden API key alın
3. Uygulamada API key'i girin

### Netlify Deploy

1. Bu klasörü GitHub'a push edin
2. [Netlify](https://netlify.com) hesabınıza giriş yapın
3. "New site from Git" seçin
4. Repository'yi seçin ve deploy edin

## 🔧 Yapılandırma

### API Key Alma

1. [Replicate.com](https://replicate.com) adresine gidin
2. Ücretsiz hesap oluşturun
3. Settings > API tokens bölümünden token oluşturun
4. Token `r8_` ile başlamalıdır

### Kullanılan API'ler

| API | Amaç | Ücretsiz Limit |
|-----|------|----------------|
| [Replicate](https://replicate.com) | AI Virtual Try-On | $5 kredi/ay |
| [imgBB](https://imgbb.com) | Görsel Hosting | Sınırsız |

## 📁 Dosya Yapısı

```
bridal-ai-studio/
├── index.html      # Ana uygulama (tek dosya)
├── netlify.toml    # Netlify yapılandırması
└── README.md       # Bu dosya
```

## 🎨 Kullanım

1. **Gelinlik Yükleyin** - Manken veya askılık üzerinde gelinlik fotoğrafı
2. **Model Yükleyin** - Tam boy model fotoğrafı
3. **Oluştur** butonuna tıklayın
4. 30-60 saniye bekleyin
5. Sonucu indirin

## ⚡ Teknik Detaylar

- **Frontend**: Vanilla HTML/CSS/JavaScript
- **AI Model**: [IDM-VTON](https://replicate.com/cuuupid/idm-vton) (Virtual Try-On)
- **Image Hosting**: imgBB API
- **Deploy**: Netlify / Vercel / GitHub Pages

## 📝 Notlar

- Görsel boyutu max 10MB olmalı
- En iyi sonuç için net, düzgün ışıklı fotoğraflar kullanın
- Model fotoğrafı tam boy olmalı
- İşlem süresi 30-60 saniye arasında değişir

## 🔒 Güvenlik

- API key yalnızca tarayıcıda (localStorage) saklanır
- Sunucu tarafında hiçbir veri tutulmaz
- Görseller imgBB'de geçici olarak barındırılır

---

Made with ❤️ for bridal shops
