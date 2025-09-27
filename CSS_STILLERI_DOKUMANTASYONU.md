# CSS Stilleri Dokümantasyonu - NC Diş Kliniği

## Genel Bakış

`style.css` dosyası, modern CSS3 özelliklerini kullanarak responsive ve performanslı bir tasarım oluşturur. CSS Variables, Flexbox, Grid, ve modern animasyonlar kullanılmıştır.

## CSS Mimarisi

### 1. CSS Reset ve Temel Stiller

```css
/* CSS Reset ve Temel Stiller */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
```

**Açıklama:**
- Universal selector ile tüm elementlerin margin/padding'ini sıfırlar
- `box-sizing: border-box` ile padding ve border'ı width'e dahil eder
- Cross-browser uyumluluk sağlar

### 2. CSS Variables (Custom Properties)

```css
:root {
    /* Ana Renkler */
    --primary-color: #4CAF50;        /* Nane yeşili - vurgu rengi */
    --secondary-color: #2196F3;      /* Profesyonel mavi */
    --accent-color: #FF9800;         /* Turuncu - dikkat çekici */
    
    /* Nötr Renkler */
    --white: #FFFFFF;
    --light-gray: #F8F9FA;
    --medium-gray: #E3F2FD;
    --dark-gray: #333333;
    --text-gray: #666666;
    --border-gray: #E0E0E0;
    
    /* Font Aileleri */
    --primary-font: 'Poppins', sans-serif;
    --heading-font: 'Montserrat', sans-serif;
    
    /* Spacing Değerleri */
    --spacing-xs: 0.5rem;
    --spacing-sm: 1rem;
    --spacing-md: 1.5rem;
    --spacing-lg: 2rem;
    --spacing-xl: 3rem;
    --spacing-xxl: 4rem;
    
    /* Border Radius */
    --border-radius-sm: 4px;
    --border-radius-md: 8px;
    --border-radius-lg: 12px;
    
    /* Box Shadow */
    --shadow-sm: 0 2px 4px rgba(0,0,0,0.1);
    --shadow-md: 0 4px 8px rgba(0,0,0,0.1);
    --shadow-lg: 0 8px 16px rgba(0,0,0,0.1);
}
```

**CSS Variables Avantajları:**
- Merkezi renk yönetimi
- Kolay tema değişikliği
- Tutarlı spacing sistemi
- Maintenance kolaylığı

### 3. Temel HTML Elementleri

```css
html {
    scroll-behavior: smooth;
    font-size: 16px;
}

body {
    font-family: var(--primary-font);
    line-height: 1.6;
    color: var(--dark-gray);
    background-color: var(--white);
    overflow-x: hidden;
}
```

**Açıklama:**
- `scroll-behavior: smooth`: Smooth scroll efekti
- `overflow-x: hidden`: Yatay scroll'u engeller
- `line-height: 1.6`: Okunabilirlik için optimal satır yüksekliği

## Layout Sistemleri

### 1. Container Sınıfı

```css
.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 var(--spacing-sm);
}
```

**Açıklama:**
- Tüm bölümler için ortak genişlik
- Responsive padding
- Merkezi hizalama

### 2. Grid Sistemleri

#### Hero Bölümü Grid
```css
.hero-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 var(--spacing-sm);
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--spacing-xxl);
    align-items: center;
}
```

#### Hizmetler Grid
```css
.services-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: var(--spacing-lg);
    margin-top: var(--spacing-xl);
}
```

**Grid Avantajları:**
- `auto-fit`: Otomatik sütun sayısı
- `minmax(300px, 1fr)`: Minimum 300px, maksimum eşit dağılım
- Responsive tasarım

### 3. Flexbox Kullanımı

#### Navigasyon
```css
.nav-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 var(--spacing-sm);
    display: flex;
    justify-content: space-between;
    align-items: center;
}
```

#### Hero Butonları
```css
.hero-buttons {
    display: flex;
    gap: var(--spacing-md);
    flex-wrap: wrap;
}
```

## Header ve Navigasyon

### 1. Fixed Header

```css
.header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    background-color: var(--white);
    box-shadow: var(--shadow-sm);
    z-index: 1000;
    transition: all 0.3s ease;
}
```

**Açıklama:**
- `position: fixed`: Sayfada sabit kalır
- `z-index: 1000`: Diğer elementlerin üstünde
- `transition`: Smooth geçişler

### 2. Logo Stilleri

```css
.nav-logo {
    display: flex;
    align-items: center;
    font-family: var(--heading-font);
    font-size: 1.5rem;
    font-weight: 600;
    color: var(--primary-color);
    text-decoration: none;
}

.nav-logo i {
    margin-right: var(--spacing-xs);
    font-size: 1.8rem;
}
```

### 3. Mobil Menü Toggle

```css
.nav-toggle {
    display: none;
    flex-direction: column;
    cursor: pointer;
    padding: var(--spacing-xs);
}

.nav-toggle .bar {
    width: 25px;
    height: 3px;
    background-color: var(--dark-gray);
    margin: 3px 0;
    transition: 0.3s;
    border-radius: 2px;
}
```

### 4. Navigasyon Menüsü

```css
.nav-menu {
    display: flex;
    list-style: none;
    gap: var(--spacing-lg);
}

.nav-link {
    text-decoration: none;
    color: var(--dark-gray);
    font-weight: 500;
    padding: var(--spacing-xs) var(--spacing-sm);
    border-radius: var(--border-radius-sm);
    transition: all 0.3s ease;
    position: relative;
}

.nav-link:hover {
    color: var(--primary-color);
    background-color: var(--light-gray);
}

.nav-link::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 50%;
    width: 0;
    height: 2px;
    background-color: var(--primary-color);
    transition: all 0.3s ease;
    transform: translateX(-50%);
}

.nav-link:hover::after {
    width: 100%;
}
```

**Hover Efekti Açıklama:**
- `::after` pseudo-element ile alt çizgi
- `transform: translateX(-50%)`: Merkezi hizalama
- Smooth animasyon

## Hero Bölümü

### 1. Hero Container

```css
.hero {
    background: linear-gradient(135deg, var(--light-gray) 0%, var(--medium-gray) 100%);
    padding: 120px 0 var(--spacing-xxl);
    min-height: 100vh;
    display: flex;
    align-items: center;
}
```

**Açıklama:**
- `linear-gradient`: Gradient arka plan
- `min-height: 100vh`: Tam ekran yükseklik
- `padding-top: 120px`: Fixed header için boşluk

### 2. Hero İçerik

```css
.hero-content {
    animation: slideInLeft 1s ease-out;
}

.hero-title {
    font-family: var(--heading-font);
    font-size: 3.5rem;
    font-weight: 700;
    color: var(--dark-gray);
    margin-bottom: var(--spacing-md);
    line-height: 1.2;
}

.hero-description {
    font-size: 1.2rem;
    color: var(--text-gray);
    margin-bottom: var(--spacing-xl);
    line-height: 1.8;
}
```

### 3. Hero Görsel

```css
.hero-placeholder {
    background: var(--white);
    border-radius: var(--border-radius-lg);
    padding: var(--spacing-xxl);
    text-align: center;
    box-shadow: var(--shadow-lg);
    border: 2px solid var(--border-gray);
}

.hero-placeholder i {
    font-size: 4rem;
    color: var(--primary-color);
    margin-bottom: var(--spacing-md);
}
```

## Buton Stilleri

### 1. Temel Buton Sınıfı

```css
.btn {
    display: inline-block;
    padding: var(--spacing-sm) var(--spacing-lg);
    border-radius: var(--border-radius-md);
    text-decoration: none;
    font-weight: 600;
    font-size: 1rem;
    transition: all 0.3s ease;
    border: 2px solid transparent;
    cursor: pointer;
    text-align: center;
}
```

### 2. Primary Buton

```css
.btn-primary {
    background-color: var(--primary-color);
    color: var(--white);
    border-color: var(--primary-color);
}

.btn-primary:hover {
    background-color: #45a049;
    border-color: #45a049;
    transform: translateY(-2px);
    box-shadow: var(--shadow-md);
}
```

### 3. Secondary Buton

```css
.btn-secondary {
    background-color: transparent;
    color: var(--primary-color);
    border-color: var(--primary-color);
}

.btn-secondary:hover {
    background-color: var(--primary-color);
    color: var(--white);
    transform: translateY(-2px);
    box-shadow: var(--shadow-md);
}
```

**Hover Efektleri:**
- `transform: translateY(-2px)`: Yukarı hareket
- `box-shadow`: Gölge efekti
- Color transition

## Bölüm Başlıkları

### 1. Section Header

```css
.section-header {
    text-align: center;
    margin-bottom: var(--spacing-xxl);
}

.section-title {
    font-family: var(--heading-font);
    font-size: 2.5rem;
    font-weight: 600;
    color: var(--dark-gray);
    margin-bottom: var(--spacing-md);
    position: relative;
}

.section-title::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    width: 60px;
    height: 3px;
    background-color: var(--primary-color);
    transform: translateX(-50%);
    border-radius: 2px;
}
```

**Alt Çizgi Efekti:**
- `::after` pseudo-element
- Merkezi hizalama
- Brand rengi

## Hizmetler Bölümü

### 1. Service Card

```css
.service-card {
    background: var(--white);
    padding: var(--spacing-xl);
    border-radius: var(--border-radius-lg);
    text-align: center;
    box-shadow: var(--shadow-sm);
    border: 1px solid var(--border-gray);
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
}

.service-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(76, 175, 80, 0.1), transparent);
    transition: left 0.5s ease;
}

.service-card:hover::before {
    left: 100%;
}

.service-card:hover {
    transform: translateY(-5px);
    box-shadow: var(--shadow-lg);
    border-color: var(--primary-color);
}
```

**Hover Animasyonu:**
- Shimmer efekti
- Yukarı hareket
- Gölge artışı
- Border rengi değişimi

### 2. Service Icon

```css
.service-icon {
    width: 80px;
    height: 80px;
    background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto var(--spacing-md);
    transition: all 0.3s ease;
}

.service-card:hover .service-icon {
    transform: scale(1.1);
}

.service-icon i {
    font-size: 2rem;
    color: var(--white);
}
```

## Hakkımızda Bölümü

### 1. About Content

```css
.about-content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--spacing-xxl);
    align-items: center;
}

.about-text .section-title {
    text-align: left;
    margin-bottom: var(--spacing-lg);
}

.about-text .section-title::after {
    left: 0;
    transform: none;
}
```

### 2. Feature Items

```css
.feature {
    display: flex;
    align-items: flex-start;
    gap: var(--spacing-md);
}

.feature i {
    font-size: 1.5rem;
    color: var(--primary-color);
    margin-top: 5px;
    flex-shrink: 0;
}

.feature h4 {
    font-family: var(--heading-font);
    font-size: 1.1rem;
    font-weight: 600;
    color: var(--dark-gray);
    margin-bottom: var(--spacing-xs);
}
```

## İletişim Bölümü

### 1. Contact Content

```css
.contact-content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--spacing-xxl);
    margin-top: var(--spacing-xl);
}
```

### 2. Contact Items

```css
.contact-item {
    display: flex;
    align-items: flex-start;
    gap: var(--spacing-md);
    padding: var(--spacing-md);
    background: var(--light-gray);
    border-radius: var(--border-radius-md);
    transition: all 0.3s ease;
}

.contact-item:hover {
    background: var(--medium-gray);
    transform: translateX(5px);
}
```

### 3. Contact Form

```css
.contact-form {
    background: var(--light-gray);
    padding: var(--spacing-xl);
    border-radius: var(--border-radius-lg);
    box-shadow: var(--shadow-sm);
}

.form-group {
    margin-bottom: var(--spacing-md);
}

.form-group input,
.form-group select,
.form-group textarea {
    width: 100%;
    padding: var(--spacing-sm);
    border: 2px solid var(--border-gray);
    border-radius: var(--border-radius-md);
    font-family: var(--primary-font);
    font-size: 1rem;
    transition: all 0.3s ease;
    background-color: var(--white);
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 3px rgba(76, 175, 80, 0.1);
}
```

**Focus Efekti:**
- Border rengi değişimi
- Box-shadow ile glow efekti
- Outline kaldırma

## Footer

### 1. Footer Content

```css
.footer {
    background-color: var(--dark-gray);
    color: var(--white);
    padding: var(--spacing-xxl) 0 var(--spacing-lg);
}

.footer-content {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: var(--spacing-xl);
    margin-bottom: var(--spacing-xl);
}
```

### 2. Social Links

```css
.social-links {
    display: flex;
    gap: var(--spacing-sm);
}

.social-link {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    background-color: var(--primary-color);
    color: var(--white);
    border-radius: 50%;
    text-decoration: none;
    transition: all 0.3s ease;
}

.social-link:hover {
    background-color: var(--secondary-color);
    transform: translateY(-2px);
}
```

## Animasyonlar

### 1. Keyframe Animasyonları

```css
@keyframes slideInLeft {
    from {
        opacity: 0;
        transform: translateX(-50px);
    }
    to {
        opacity: 1;
        transform: translateX(0);
    }
}

@keyframes slideInRight {
    from {
        opacity: 0;
        transform: translateX(50px);
    }
    to {
        opacity: 1;
        transform: translateX(0);
    }
}

@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}
```

### 2. Animation Utility Classes

```css
.animate-on-scroll {
    opacity: 0;
    transform: translateY(30px);
    transition: all 0.6s ease;
}

.animate-on-scroll.animated {
    opacity: 1;
    transform: translateY(0);
}
```

## Responsive Tasarım

### 1. Tablet Görünümü (768px ve altı)

```css
@media (max-width: 768px) {
    /* Navigasyon */
    .nav-toggle {
        display: flex;
    }
    
    .nav-menu {
        position: fixed;
        left: -100%;
        top: 70px;
        flex-direction: column;
        background-color: var(--white);
        width: 100%;
        text-align: center;
        transition: 0.3s;
        box-shadow: var(--shadow-md);
        padding: var(--spacing-lg) 0;
    }
    
    .nav-menu.active {
        left: 0;
    }
    
    /* Hero Bölümü */
    .hero-container {
        grid-template-columns: 1fr;
        text-align: center;
        gap: var(--spacing-xl);
    }
    
    .hero-title {
        font-size: 2.5rem;
    }
    
    /* Hizmetler */
    .services-grid {
        grid-template-columns: 1fr;
        gap: var(--spacing-md);
    }
    
    /* Hakkımızda */
    .about-content {
        grid-template-columns: 1fr;
        gap: var(--spacing-xl);
    }
    
    /* İletişim */
    .contact-content {
        grid-template-columns: 1fr;
        gap: var(--spacing-xl);
    }
}
```

### 2. Mobil Görünümü (480px ve altı)

```css
@media (max-width: 480px) {
    .container {
        padding: 0 var(--spacing-xs);
    }
    
    .hero {
        padding: 100px 0 var(--spacing-xl);
    }
    
    .hero-title {
        font-size: 2rem;
    }
    
    .hero-description {
        font-size: 1rem;
    }
    
    .section-title {
        font-size: 2rem;
    }
    
    .hero-buttons {
        flex-direction: column;
        align-items: center;
    }
    
    .btn {
        width: 100%;
        max-width: 300px;
    }
}
```

### 3. Büyük Ekranlar (1200px ve üzeri)

```css
@media (min-width: 1200px) {
    .container {
        max-width: 1400px;
    }
    
    .hero-title {
        font-size: 4rem;
    }
    
    .section-title {
        font-size: 3rem;
    }
}
```

## Performance Optimizasyonları

### 1. CSS Optimizasyonu

```css
/* Efficient selectors */
.service-card:hover .service-icon {
    transform: scale(1.1);
}

/* CSS Variables for consistency */
:root {
    --transition-fast: 0.3s ease;
    --transition-slow: 0.6s ease;
}
```

### 2. Hardware Acceleration

```css
.service-card:hover {
    transform: translateY(-5px);
    will-change: transform;
}
```

### 3. Print Styles

```css
@media print {
    .header,
    .footer,
    .hero-buttons,
    .contact-form {
        display: none;
    }
    
    .hero {
        padding: 0;
        min-height: auto;
    }
    
    .section-title {
        color: var(--dark-gray) !important;
    }
}
```

## Best Practices

### 1. CSS Organization
- Logical grouping
- Consistent naming
- Commented sections
- Variable usage

### 2. Performance
- Efficient selectors
- Minimal repaints
- Hardware acceleration
- Optimized animations

### 3. Maintainability
- CSS Variables
- Modular structure
- Consistent spacing
- Clear documentation

### 4. Accessibility
- High contrast ratios
- Focus indicators
- Responsive design
- Screen reader friendly

---

**Not**: Bu CSS yapısı, modern web standartlarına uygun olarak geliştirilmiştir ve sürekli optimize edilmelidir.


