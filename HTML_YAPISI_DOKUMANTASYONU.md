# HTML Yapısı Dokümantasyonu - NC Diş Kliniği

## Genel Bakış

`index.html` dosyası, modern HTML5 standartlarına uygun olarak semantic markup kullanılarak geliştirilmiştir. Dosya, accessibility (erişilebilirlik) ve SEO optimizasyonu göz önünde bulundurularak yapılandırılmıştır.

## HTML5 Semantic Yapısı

### DOCTYPE ve Meta Etiketleri

```html
<!DOCTYPE html>
<html lang="tr">
```

**Açıklama:**
- `<!DOCTYPE html>`: HTML5 doküman tipini belirtir
- `lang="tr"`: Sayfanın Türkçe olduğunu belirtir (SEO ve accessibility için önemli)

### Head Bölümü

```html
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>NC Diş Kliniği - Profesyonel Diş Sağlığı Hizmetleri</title>
    <meta name="description" content="NC Diş Kliniği - Modern teknoloji ile profesyonel diş sağlığı hizmetleri. İmplant, ortodonti, beyazlatma ve daha fazlası.">
```

**Açıklama:**
- `charset="UTF-8"`: Unicode karakter desteği
- `viewport`: Responsive tasarım için gerekli
- `title`: SEO için optimize edilmiş başlık
- `description`: Arama motorları için açıklama

### External Kaynaklar

```html
<!-- Google Fonts -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&family=Montserrat:wght@400;500;600;700&display=swap" rel="stylesheet">

<!-- Font Awesome Icons -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">

<!-- CSS Dosyası -->
<link rel="stylesheet" href="style.css">
```

**Açıklama:**
- `preconnect`: Font yükleme performansını artırır
- Google Fonts: Poppins ve Montserrat fontları
- Font Awesome: İkon kütüphanesi
- Local CSS: Ana stil dosyası

## Body Yapısı

### 1. Header Bölümü

```html
<header class="header">
    <nav class="navbar">
        <div class="nav-container">
            <!-- Logo -->
            <div class="nav-logo">
                <i class="fas fa-tooth"></i>
                <span>NC Diş Kliniği</span>
            </div>
            
            <!-- Mobil Menü Butonu -->
            <div class="nav-toggle" id="nav-toggle">
                <span class="bar"></span>
                <span class="bar"></span>
                <span class="bar"></span>
            </div>
            
            <!-- Navigasyon Menüsü -->
            <ul class="nav-menu" id="nav-menu">
                <li class="nav-item">
                    <a href="#home" class="nav-link">Ana Sayfa</a>
                </li>
                <!-- Diğer menü öğeleri... -->
            </ul>
        </div>
    </nav>
</header>
```

**Semantic Açıklama:**
- `<header>`: Sayfa başlığı ve navigasyon
- `<nav>`: Navigasyon menüsü
- `<ul>`: Menü listesi
- `id` attributes: JavaScript için gerekli

### 2. Main İçerik Bölümü

```html
<main>
    <!-- Hero Bölümü -->
    <section id="home" class="hero">
        <div class="hero-container">
            <div class="hero-content">
                <h1 class="hero-title">Gülüşünüzü Yeniden Keşfedin</h1>
                <p class="hero-description">
                    Modern teknoloji ve uzman kadromuzla, sağlıklı ve güzel bir gülüş için 
                    size en iyi diş sağlığı hizmetlerini sunuyoruz.
                </p>
                <div class="hero-buttons">
                    <a href="#contact" class="btn btn-primary">Randevu Al</a>
                    <a href="#services" class="btn btn-secondary">Hizmetlerimiz</a>
                </div>
            </div>
            <div class="hero-image">
                <div class="hero-placeholder">
                    <i class="fas fa-user-md"></i>
                    <p>Profesyonel Diş Hekimi</p>
                </div>
            </div>
        </div>
    </section>
```

**Semantic Açıklama:**
- `<main>`: Ana içerik alanı
- `<section>`: İçerik bölümleri
- `<h1>`: Ana başlık (SEO için önemli)
- `<p>`: Açıklama metni
- `id` attributes: Smooth scroll için

### 3. Hizmetler Bölümü

```html
<section id="services" class="services">
    <div class="container">
        <div class="section-header">
            <h2 class="section-title">Hizmetlerimiz</h2>
            <p class="section-description">
                Size en iyi diş sağlığı hizmetlerini sunmak için geniş bir hizmet yelpazesi sunuyoruz.
            </p>
        </div>
        
        <div class="services-grid">
            <div class="service-card">
                <div class="service-icon">
                    <i class="fas fa-tooth"></i>
                </div>
                <h3 class="service-title">İmplant Tedavisi</h3>
                <p class="service-description">
                    Modern implant teknolojisi ile eksik dişlerinizi doğal görünümde tamamlıyoruz.
                </p>
            </div>
            <!-- Diğer hizmet kartları... -->
        </div>
    </div>
</section>
```

**Semantic Açıklama:**
- `<h2>`: Bölüm başlığı
- `<h3>`: Alt başlık
- Grid yapısı: CSS Grid ile responsive layout
- İkonlar: Font Awesome ile görsel destek

### 4. Hakkımızda Bölümü

```html
<section id="about" class="about">
    <div class="container">
        <div class="about-content">
            <div class="about-text">
                <h2 class="section-title">Hakkımızda</h2>
                <p class="about-description">
                    NC Diş Kliniği olarak, 15 yıllık deneyimimizle hastalarımıza en kaliteli 
                    diş sağlığı hizmetlerini sunmaktayız.
                </p>
                
                <div class="about-features">
                    <div class="feature">
                        <i class="fas fa-award"></i>
                        <div>
                            <h4>Uzman Kadro</h4>
                            <p>Deneyimli ve sertifikalı diş hekimleri</p>
                        </div>
                    </div>
                    <!-- Diğer özellikler... -->
                </div>
            </div>
            
            <div class="about-image">
                <div class="about-placeholder">
                    <i class="fas fa-hospital"></i>
                    <p>Modern Klinik</p>
                </div>
            </div>
        </div>
    </div>
</section>
```

**Semantic Açıklama:**
- İki sütunlu layout
- `<h4>`: Alt başlık seviyesi
- Feature listesi: İkon + metin kombinasyonu

### 5. İletişim Bölümü

```html
<section id="contact" class="contact">
    <div class="container">
        <div class="section-header">
            <h2 class="section-title">İletişim</h2>
            <p class="section-description">
                Randevu almak veya sorularınız için bizimle iletişime geçin.
            </p>
        </div>
        
        <div class="contact-content">
            <div class="contact-info">
                <div class="contact-item">
                    <i class="fas fa-map-marker-alt"></i>
                    <div>
                        <h4>Adres</h4>
                        <p>Atatürk Mahallesi, Diş Hekimliği Caddesi<br>No: 123, Merkez/İstanbul</p>
                    </div>
                </div>
                <!-- Diğer iletişim bilgileri... -->
            </div>
            
            <div class="contact-form">
                <form id="contactForm">
                    <div class="form-group">
                        <input type="text" id="name" name="name" placeholder="Adınız Soyadınız" required>
                    </div>
                    <!-- Diğer form alanları... -->
                    <button type="submit" class="btn btn-primary">Mesaj Gönder</button>
                </form>
            </div>
        </div>
    </div>
</section>
```

**Form Açıklama:**
- `<form>`: İletişim formu
- `required` attribute: Zorunlu alanlar
- `placeholder`: Kullanıcı rehberliği
- `type` attributes: Input validasyonu

### 6. Footer Bölümü

```html
<footer class="footer">
    <div class="container">
        <div class="footer-content">
            <div class="footer-section">
                <div class="footer-logo">
                    <i class="fas fa-tooth"></i>
                    <span>NC Diş Kliniği</span>
                </div>
                <p class="footer-description">
                    Sağlıklı gülüşler için profesyonel diş sağlığı hizmetleri.
                </p>
            </div>
            
            <div class="footer-section">
                <h4>Hızlı Linkler</h4>
                <ul class="footer-links">
                    <li><a href="#home">Ana Sayfa</a></li>
                    <li><a href="#services">Hizmetler</a></li>
                    <li><a href="#about">Hakkımızda</a></li>
                    <li><a href="#contact">İletişim</a></li>
                </ul>
            </div>
            <!-- Diğer footer bölümleri... -->
        </div>
        
        <div class="footer-bottom">
            <p>&copy; 2024 NC Diş Kliniği. Tüm hakları saklıdır.</p>
        </div>
    </div>
</footer>
```

**Footer Açıklama:**
- `<footer>`: Sayfa alt bilgileri
- Copyright bilgisi
- Sosyal medya linkleri
- Hızlı navigasyon

## Accessibility (Erişilebilirlik) Özellikleri

### 1. Semantic HTML
- `<header>`, `<nav>`, `<main>`, `<section>`, `<footer>` kullanımı
- Anlamlı etiket seçimi
- Hiyerarşik başlık yapısı (h1, h2, h3, h4)

### 2. ARIA Labels
```html
<div class="nav-toggle" id="nav-toggle" aria-label="Menüyü aç/kapat">
```

### 3. Form Accessibility
```html
<input type="text" id="name" name="name" placeholder="Adınız Soyadınız" required aria-label="Ad Soyad">
```

### 4. Alt Text (Görseller için)
```html
<img src="image.jpg" alt="NC Diş Kliniği - Modern muayenehane görünümü">
```

## SEO Optimizasyonu

### 1. Meta Tags
```html
<meta name="description" content="NC Diş Kliniği - Modern teknoloji ile profesyonel diş sağlığı hizmetleri. İmplant, ortodonti, beyazlatma ve daha fazlası.">
<meta name="keywords" content="diş kliniği, implant, ortodonti, diş beyazlatma, İstanbul">
```

### 2. Structured Data (Schema.org)
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "DentalClinic",
  "name": "NC Diş Kliniği",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Atatürk Mahallesi, Diş Hekimliği Caddesi No: 123",
    "addressLocality": "Merkez",
    "addressRegion": "İstanbul"
  }
}
</script>
```

### 3. Open Graph Tags
```html
<meta property="og:title" content="NC Diş Kliniği - Profesyonel Diş Sağlığı Hizmetleri">
<meta property="og:description" content="Modern teknoloji ile profesyonel diş sağlığı hizmetleri">
<meta property="og:type" content="website">
<meta property="og:url" content="https://ncdentist.com">
```

## Performance Optimizasyonu

### 1. Resource Loading
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preload" href="style.css" as="style">
```

### 2. Lazy Loading
```html
<img src="placeholder.jpg" data-src="actual-image.jpg" loading="lazy" alt="Description">
```

### 3. Critical CSS
```html
<style>
/* Critical CSS buraya */
</style>
```

## Cross-Browser Uyumluluk

### 1. HTML5 Shim
```html
<!--[if lt IE 9]>
<script src="https://cdnjs.cloudflare.com/ajax/libs/html5shiv/3.7.3/html5shiv.min.js"></script>
<![endif]-->
```

### 2. CSS Fallbacks
```html
<!--[if IE]>
<link rel="stylesheet" href="ie-fixes.css">
<![endif]-->
```

## Güvenlik

### 1. Content Security Policy
```html
<meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' 'unsafe-inline';">
```

### 2. Form Security
```html
<form method="POST" action="/contact" enctype="multipart/form-data">
    <input type="hidden" name="csrf_token" value="...">
</form>
```

## Validation

HTML dosyası W3C Markup Validator ile test edilmelidir:
- https://validator.w3.org/

## Best Practices

1. **Semantic HTML**: Anlamlı etiket kullanımı
2. **Accessibility**: WCAG 2.1 AA standartları
3. **SEO**: Meta tags ve structured data
4. **Performance**: Optimize edilmiş resource loading
5. **Security**: XSS ve CSRF koruması
6. **Maintainability**: Temiz ve düzenli kod yapısı

---

**Not**: Bu HTML yapısı, modern web standartlarına uygun olarak geliştirilmiştir ve sürekli güncellenmelidir.


