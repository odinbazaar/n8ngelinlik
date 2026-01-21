# 🎀 Gelinlik AI Görsel Üretici - Kurulum Rehberi

## 📋 Sistem Özeti

Bu sistem 3 girdi alır ve 2 çıktı üretir:

**Girdiler:**
1. **Gelinlik Görseli** - Manken üzerindeki gelinlik (zorunlu)
2. **Model Görseli** - Canlı model fotoğrafı (zorunlu)  
3. **Mekan Görseli** - Arka plan (isteğe bağlı)

**Çıktılar:**
1. Ön görünüm - Tam boy gelinlik görseli
2. Arka görünüm - Tam boy gelinlik görseli

---

## 🛠️ Kurulum Adımları

### 1. n8n Kurulumu

#### Seçenek A: n8n Cloud (Kolay)
1. [n8n.io](https://n8n.io) sitesine gidin
2. Hesap oluşturun
3. Ücretsiz deneme başlatın

#### Seçenek B: Self-hosted (Docker)
```bash
docker run -it --rm \
  --name n8n \
  -p 5678:5678 \
  -v ~/.n8n:/home/node/.n8n \
  n8nio/n8n
```

### 2. AI Görsel API Seçimi

#### Önerilen: Replicate API
1. [replicate.com](https://replicate.com) hesabı açın
2. Settings > API Tokens'dan token alın
3. Aylık $20-50 arası bütçe ayırın

#### Alternatifler:
- **Leonardo AI** - Daha ucuz, güzel sonuçlar
- **Stability AI** - SDXL modelleri
- **RunwayML** - Video da yapabilir
- **Midjourney API** - En kaliteli ama pahalı

### 3. n8n Workflow Import

1. n8n'e giriş yapın
2. Sol menüden "Workflows" seçin
3. "Import from File" tıklayın
4. `n8n-workflow-gelinlik.json` dosyasını yükleyin

### 4. Credentials Ayarları

n8n'de şu credential'ı oluşturun:

**HTTP Header Auth:**
- Name: `Replicate API`
- Header Name: `Authorization`
- Header Value: `Token YOUR_REPLICATE_TOKEN`

### 5. Web Uygulaması

Sistem için iki farklı arayüz seçeneği mevcuttur:

1.  **bridal-ai-studio.html (Önerilen)**: 
    - En yeni, en şık ve profesyonel arayüz.
    - Animasyonlu, premium tasarım.
    - Herhangi bir kuruluma gerek duymaz, tarayıcıda açmanız yeterlidir.

2.  **bridal-app/ (React Projesi)**:
    - Gelişmiş bir React projesidir.
    - `npm install` ve `npm run dev` komutları ile çalıştırılabilir.
    - Özelleştirmek ve büyütmek için idealdir.

3.  **wedding-dress-app.html**:
    - Eski, basit sürüm (Yedek olarak tutulabilir).

---

## 🔧 Gelişmiş Yapılandırma

### Farklı AI Modelleri için API Değişiklikleri

#### Leonardo AI Kullanımı:
```javascript
// API endpoint değiştir
url: "https://cloud.leonardo.ai/api/rest/v1/generations"

// Body format:
{
  "prompt": "...",
  "modelId": "6bef9f1b-29cb-40c7-b9df-32b51c1f67d3",
  "width": 1024,
  "height": 1024,
  "init_image": "base64...",
  "controlnets": [...]
}
```

#### Stability AI SDXL:
```javascript
url: "https://api.stability.ai/v2beta/stable-image/generate/sd3"
```

### Webhook Response Bekleme Sorunu

Eğer API çağrıları uzun sürerse, async pattern kullanın:

```javascript
// 1. İsteği kabul et, job_id döndür
// 2. Ayrı bir webhook ile sonucu al
// 3. Client polling yapsın
```

### CORS Ayarları

Eğer farklı domain'den istek atıyorsanız, n8n'de CORS header'larını ekleyin:

```
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: POST, OPTIONS
Access-Control-Allow-Headers: Content-Type
```

---

## 📱 Mobil Uygulama Entegrasyonu

React Native veya Flutter ile mobil app yapacaksanız:

```javascript
// React Native örneği
const sendToWebhook = async (dressImage, modelImage, bgImage) => {
  const response = await fetch('YOUR_WEBHOOK_URL', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      dress_image: dressImage, // base64
      model_image: modelImage, // base64
      background_image: bgImage, // base64 veya null
      request_id: generateUUID()
    })
  });
  return response.json();
};
```

---

## 💰 Maliyet Tahmini

| Servis | Görsel Başı | 100 Görsel/Ay | 500 Görsel/Ay |
|--------|-------------|---------------|---------------|
| Replicate (Flux) | ~$0.05 | ~$10 | ~$50 |
| Leonardo AI | ~$0.02 | ~$4 | ~$20 |
| Stability AI | ~$0.03 | ~$6 | ~$30 |

**Not:** Her istek 2 görsel ürettiği için maliyeti x2 hesaplayın.

---

## 🐛 Sorun Giderme

### "Webhook timeout" hatası
- API çağrısı 30 saniyeden uzun sürüyor
- Çözüm: Async pattern kullanın

### "CORS error" hatası
- Response header'larına CORS ekleyin
- n8n workflow'da "Respond to Webhook" node'unda header ekleyin

### Görsel kalitesi düşük
- Girdi görsellerinin yüksek çözünürlüklü olduğundan emin olun
- Prompt'ları iyileştirin
- guidance_scale değerini ayarlayın (7-12 arası)

### API limiti aşıldı
- Rate limiting uygulayın
- Queue sistemi ekleyin (Redis/Bull)

---

## 📞 Destek

Sorularınız için:
- n8n Community: [community.n8n.io](https://community.n8n.io)
- Replicate Discord: [discord.gg/replicate](https://discord.gg/replicate)

---

## 🚀 Gelecek Geliştirmeler

- [ ] Toplu görsel işleme (batch processing)
- [ ] Farklı poz seçenekleri
- [ ] Otomatik arka plan kaldırma
- [ ] Watermark ekleme
- [ ] Müşteri paneli / dashboard
- [ ] WhatsApp bot entegrasyonu
