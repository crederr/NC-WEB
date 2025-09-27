# JavaScript Fonksiyonları Dokümantasyonu - NC Diş Kliniği

## Genel Bakış

`script.js` dosyası, modern ES6+ standartlarını kullanarak web sitesinin interaktif özelliklerini yönetir. Tüm fonksiyonlar modüler yapıda organize edilmiş ve performans optimizasyonları göz önünde bulundurularak geliştirilmiştir.

## JavaScript Mimarisi

### 1. DOM Content Loaded Event

```javascript
document.addEventListener('DOMContentLoaded', function() {
    // Mobil menü işlevselliği
    initMobileMenu();
    
    // Smooth scroll işlevselliği
    initSmoothScroll();
    
    // Form validasyonu
    initContactForm();
    
    // Scroll animasyonları
    initScrollAnimations();
    
    // Header scroll efekti
    initHeaderScrollEffect();
    
    console.log('NC Diş Kliniği web sitesi başarıyla yüklendi!');
});
```

**Açıklama:**
- `DOMContentLoaded`: DOM tamamen yüklendiğinde çalışır
- Modüler fonksiyon çağrıları
- Console log ile başarılı yükleme kontrolü

## Mobil Menü İşlevselliği

### 1. Ana Fonksiyon

```javascript
function initMobileMenu() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Mobil menü toggle işlevi
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
        
        // Hamburger menü animasyonu
        const bars = navToggle.querySelectorAll('.bar');
        bars.forEach((bar, index) => {
            if (navToggle.classList.contains('active')) {
                if (index === 0) bar.style.transform = 'rotate(-45deg) translate(-5px, 6px)';
                if (index === 1) bar.style.opacity = '0';
                if (index === 2) bar.style.transform = 'rotate(45deg) translate(-5px, -6px)';
            } else {
                bar.style.transform = 'none';
                bar.style.opacity = '1';
            }
        });
    });
}
```

**Fonksiyon Açıklaması:**
- `getElementById`: DOM elementlerini seçer
- `classList.toggle`: CSS sınıfını açıp kapatır
- Hamburger animasyonu: X şekline dönüşüm
- Event listener: Click olayını dinler

### 2. Menü Kapatma İşlevi

```javascript
// Menü linklerine tıklandığında menüyü kapat
navLinks.forEach(link => {
    link.addEventListener('click', function() {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
        
        // Hamburger menü animasyonunu sıfırla
        const bars = navToggle.querySelectorAll('.bar');
        bars.forEach(bar => {
            bar.style.transform = 'none';
            bar.style.opacity = '1';
        });
    });
});
```

### 3. Dışarı Tıklama Kontrolü

```javascript
// Dışarı tıklandığında menüyü kapat
document.addEventListener('click', function(event) {
    if (!navToggle.contains(event.target) && !navMenu.contains(event.target)) {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
        
        const bars = navToggle.querySelectorAll('.bar');
        bars.forEach(bar => {
            bar.style.transform = 'none';
            bar.style.opacity = '1';
        });
    }
});
```

**Event Delegation:**
- `event.target`: Tıklanan elementi kontrol eder
- `contains()`: Element içeriğini kontrol eder
- Menü dışına tıklandığında kapatma

## Smooth Scroll İşlevselliği

### 1. Ana Fonksiyon

```javascript
function initSmoothScroll() {
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}
```

**Smooth Scroll Açıklaması:**
- `preventDefault()`: Varsayılan link davranışını engeller
- `getAttribute('href')`: Hedef bölüm ID'sini alır
- `offsetTop`: Elementin sayfadaki konumunu hesaplar
- `headerHeight`: Fixed header yüksekliğini çıkarır
- `behavior: 'smooth'`: Yumuşak kaydırma

## Form Validasyonu

### 1. Form İşlevselliği Başlatma

```javascript
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Form verilerini al
            const formData = new FormData(contactForm);
            const formObject = {};
            
            formData.forEach((value, key) => {
                formObject[key] = value;
            });
            
            // Form validasyonu
            if (validateForm(formObject)) {
                // Form gönderimi simülasyonu
                submitForm(formObject);
            }
        });
    }
}
```

**FormData API:**
- Modern form veri toplama
- `forEach()`: Tüm form alanlarını işler
- Object dönüşümü

### 2. Form Validasyonu

```javascript
function validateForm(formData) {
    let isValid = true;
    const errors = {};
    
    // Ad Soyad validasyonu
    if (!formData.name || formData.name.trim().length < 2) {
        errors.name = 'Ad soyad en az 2 karakter olmalıdır.';
        isValid = false;
    }
    
    // E-posta validasyonu
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email || !emailRegex.test(formData.email)) {
        errors.email = 'Geçerli bir e-posta adresi giriniz.';
        isValid = false;
    }
    
    // Telefon validasyonu
    const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
    if (!formData.phone || !phoneRegex.test(formData.phone)) {
        errors.phone = 'Geçerli bir telefon numarası giriniz.';
        isValid = false;
    }
    
    // Hizmet seçimi validasyonu
    if (!formData.service) {
        errors.service = 'Lütfen bir hizmet seçiniz.';
        isValid = false;
    }
    
    // Hataları göster
    Object.keys(errors).forEach(fieldName => {
        showFieldError(fieldName, errors[fieldName]);
    });
    
    return isValid;
}
```

**Validasyon Kuralları:**
- **Ad Soyad**: Minimum 2 karakter
- **E-posta**: Regex pattern kontrolü
- **Telefon**: Sayısal karakter kontrolü
- **Hizmet**: Zorunlu seçim

### 3. Real-time Validasyon

```javascript
// Real-time validasyon
const formInputs = contactForm.querySelectorAll('input, select, textarea');
formInputs.forEach(input => {
    input.addEventListener('blur', function() {
        validateField(this);
    });
    
    input.addEventListener('input', function() {
        clearFieldError(this);
    });
});
```

**Event Listeners:**
- `blur`: Alan odaktan çıktığında validasyon
- `input`: Kullanıcı yazarken hata temizleme

### 4. Tekil Alan Validasyonu

```javascript
function validateField(field) {
    const value = field.value.trim();
    const fieldName = field.name;
    let isValid = true;
    let errorMessage = '';
    
    switch (fieldName) {
        case 'name':
            if (value.length < 2) {
                errorMessage = 'Ad soyad en az 2 karakter olmalıdır.';
                isValid = false;
            }
            break;
            
        case 'email':
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                errorMessage = 'Geçerli bir e-posta adresi giriniz.';
                isValid = false;
            }
            break;
            
        case 'phone':
            const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
            if (!phoneRegex.test(value)) {
                errorMessage = 'Geçerli bir telefon numarası giriniz.';
                isValid = false;
            }
            break;
            
        case 'service':
            if (!value) {
                errorMessage = 'Lütfen bir hizmet seçiniz.';
                isValid = false;
            }
            break;
    }
    
    if (!isValid) {
        showFieldError(fieldName, errorMessage);
    } else {
        clearFieldError(field);
    }
    
    return isValid;
}
```

### 5. Hata Gösterme ve Temizleme

```javascript
// Alan hatası göster
function showFieldError(fieldName, message) {
    const field = document.querySelector(`[name="${fieldName}"]`);
    if (field) {
        field.style.borderColor = '#e74c3c';
        
        // Mevcut hata mesajını kaldır
        const existingError = field.parentNode.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
        
        // Yeni hata mesajı ekle
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.style.cssText = `
            color: #e74c3c;
            font-size: 0.875rem;
            margin-top: 0.25rem;
        `;
        errorDiv.textContent = message;
        
        field.parentNode.appendChild(errorDiv);
    }
}

// Alan hatasını temizle
function clearFieldError(field) {
    field.style.borderColor = '';
    const errorMessage = field.parentNode.querySelector('.error-message');
    if (errorMessage) {
        errorMessage.remove();
    }
}
```

### 6. Form Gönderimi

```javascript
// Form gönderimi simülasyonu
function submitForm(formData) {
    const submitButton = document.querySelector('#contactForm button[type="submit"]');
    const originalText = submitButton.textContent;
    
    // Buton durumunu değiştir
    submitButton.textContent = 'Gönderiliyor...';
    submitButton.disabled = true;
    
    // Simüle edilmiş API çağrısı
    setTimeout(() => {
        // Başarı mesajı göster
        showSuccessMessage();
        
        // Formu temizle
        document.getElementById('contactForm').reset();
        
        // Buton durumunu sıfırla
        submitButton.textContent = originalText;
        submitButton.disabled = false;
        
        console.log('Form verileri:', formData);
    }, 2000);
}
```

### 7. Başarı Mesajı

```javascript
// Başarı mesajı göster
function showSuccessMessage() {
    // Mevcut mesajları kaldır
    const existingMessages = document.querySelectorAll('.form-message');
    existingMessages.forEach(msg => msg.remove());
    
    // Başarı mesajı oluştur
    const successMessage = document.createElement('div');
    successMessage.className = 'form-message success-message';
    successMessage.style.cssText = `
        background-color: #d4edda;
        color: #155724;
        padding: 1rem;
        border-radius: 8px;
        margin-top: 1rem;
        border: 1px solid #c3e6cb;
        text-align: center;
        font-weight: 500;
    `;
    successMessage.innerHTML = `
        <i class="fas fa-check-circle" style="margin-right: 0.5rem;"></i>
        Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapacağız.
    `;
    
    // Mesajı forma ekle
    const contactForm = document.getElementById('contactForm');
    contactForm.appendChild(successMessage);
    
    // 5 saniye sonra mesajı kaldır
    setTimeout(() => {
        successMessage.remove();
    }, 5000);
}
```

## Scroll Animasyonları

### 1. Intersection Observer

```javascript
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.service-card, .feature, .contact-item');
    
    // Intersection Observer oluştur
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // Elementleri gözlemle
    animatedElements.forEach(element => {
        element.classList.add('animate-on-scroll');
        observer.observe(element);
    });
}
```

**Intersection Observer API:**
- Modern performanslı scroll detection
- `threshold: 0.1`: %10 görünür olduğunda tetikle
- `rootMargin`: Erken tetikleme için margin

## Header Scroll Efekti

### 1. Scroll Event Handler

```javascript
function initHeaderScrollEffect() {
    const header = document.querySelector('.header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Scroll yönüne göre header'ı gizle/göster
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Aşağı scroll - header'ı gizle
            header.style.transform = 'translateY(-100%)';
        } else {
            // Yukarı scroll - header'ı göster
            header.style.transform = 'translateY(0)';
        }
        
        // Header arka plan rengini değiştir
        if (scrollTop > 50) {
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.style.backgroundColor = '#FFFFFF';
            header.style.backdropFilter = 'none';
        }
        
        lastScrollTop = scrollTop;
    });
}
```

**Scroll Efektleri:**
- Yön bazlı header gizleme
- Arka plan şeffaflığı
- Backdrop blur efekti

## Utility Fonksiyonları

### 1. Debounce Fonksiyonu

```javascript
// Debounce fonksiyonu - performans optimizasyonu için
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}
```

**Debounce Açıklaması:**
- Fonksiyon çağrılarını geciktirir
- Performans optimizasyonu
- Resize event'leri için ideal

### 2. Throttle Fonksiyonu

```javascript
// Throttle fonksiyonu - scroll event'leri için
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}
```

**Throttle Açıklaması:**
- Fonksiyon çağrı sıklığını sınırlar
- Scroll event'leri için performans
- CPU kullanımını azaltır

### 3. Lazy Loading

```javascript
// Sayfa yükleme performansı için lazy loading
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}
```

### 4. Performance Metrics

```javascript
// Sayfa performans metrikleri
function logPerformanceMetrics() {
    window.addEventListener('load', function() {
        setTimeout(() => {
            const perfData = performance.getEntriesByType('navigation')[0];
            console.log('Sayfa Yükleme Süresi:', perfData.loadEventEnd - perfData.loadEventStart, 'ms');
            console.log('DOM İçerik Yükleme:', perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart, 'ms');
        }, 0);
    });
}
```

## Error Handling

### 1. Global Error Handler

```javascript
// Hata yakalama ve loglama
window.addEventListener('error', function(e) {
    console.error('JavaScript Hatası:', e.error);
    // Burada hata raporlama servisine gönderilebilir
});
```

### 2. Unhandled Promise Rejections

```javascript
window.addEventListener('unhandledrejection', function(e) {
    console.error('Promise Hatası:', e.reason);
    e.preventDefault();
});
```

## Performance Optimizasyonları

### 1. Event Delegation

```javascript
// Event delegation örneği
document.addEventListener('click', function(e) {
    if (e.target.matches('.btn')) {
        // Buton tıklama işlemi
    }
});
```

### 2. Memory Management

```javascript
// Observer'ları temizle
function cleanup() {
    if (observer) {
        observer.disconnect();
    }
}

// Sayfa kapatılırken temizlik
window.addEventListener('beforeunload', cleanup);
```

### 3. Responsive Breakpoint Detection

```javascript
// Responsive breakpoint kontrolü
function getCurrentBreakpoint() {
    const width = window.innerWidth;
    if (width < 480) return 'mobile';
    if (width < 768) return 'tablet';
    if (width < 1200) return 'desktop';
    return 'large';
}

// Window resize event'i için optimize edilmiş handler
const handleResize = debounce(function() {
    const breakpoint = getCurrentBreakpoint();
    console.log('Mevcut breakpoint:', breakpoint);
    
    // Breakpoint değişikliklerinde gerekli güncellemeleri yap
    if (breakpoint === 'mobile') {
        // Mobil için özel işlemler
        document.body.classList.add('mobile-view');
    } else {
        document.body.classList.remove('mobile-view');
    }
}, 250);

window.addEventListener('resize', handleResize);
```

## Modern JavaScript Özellikleri

### 1. ES6+ Features

```javascript
// Arrow Functions
const handleClick = (e) => {
    e.preventDefault();
};

// Template Literals
const message = `Merhaba ${userName}, hoş geldiniz!`;

// Destructuring
const { name, email, phone } = formData;

// Spread Operator
const newArray = [...oldArray, newItem];

// Async/Await
async function fetchData() {
    try {
        const response = await fetch('/api/data');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Veri yükleme hatası:', error);
    }
}
```

### 2. Module Pattern

```javascript
// Modül pattern örneği
const ContactForm = {
    init() {
        this.bindEvents();
    },
    
    bindEvents() {
        document.getElementById('contactForm').addEventListener('submit', this.handleSubmit.bind(this));
    },
    
    handleSubmit(e) {
        e.preventDefault();
        // Form işleme logic
    }
};

// Kullanım
ContactForm.init();
```

## Browser Compatibility

### 1. Feature Detection

```javascript
// Intersection Observer desteği kontrolü
if ('IntersectionObserver' in window) {
    initScrollAnimations();
} else {
    // Fallback için scroll event
    window.addEventListener('scroll', handleScroll);
}

// CSS Grid desteği kontrolü
if (CSS.supports('display', 'grid')) {
    document.body.classList.add('grid-supported');
}
```

### 2. Polyfills

```javascript
// Intersection Observer polyfill
if (!('IntersectionObserver' in window)) {
    // Polyfill yükle
    const script = document.createElement('script');
    script.src = 'https://polyfill.io/v3/polyfill.min.js?features=IntersectionObserver';
    document.head.appendChild(script);
}
```

## Testing ve Debugging

### 1. Console Logging

```javascript
// Debug modu
const DEBUG = true;

function debugLog(message, data = null) {
    if (DEBUG) {
        console.log(`[DEBUG] ${message}`, data);
    }
}

// Kullanım
debugLog('Form gönderildi', formData);
```

### 2. Performance Monitoring

```javascript
// Fonksiyon performans ölçümü
function measurePerformance(func, name) {
    const start = performance.now();
    const result = func();
    const end = performance.now();
    console.log(`${name} süresi: ${end - start}ms`);
    return result;
}
```

## Best Practices

### 1. Code Organization
- Modüler yapı
- Tek sorumluluk prensibi
- Açıklayıcı fonksiyon isimleri
- Consistent naming convention

### 2. Performance
- Event delegation
- Debounced/throttled events
- Lazy loading
- Memory management

### 3. Error Handling
- Try-catch blocks
- Graceful degradation
- User-friendly error messages
- Logging system

### 4. Accessibility
- Keyboard navigation
- Screen reader support
- Focus management
- ARIA attributes

### 5. Security
- Input validation
- XSS prevention
- CSRF protection
- Secure API calls

---

**Not**: Bu JavaScript kodu, modern web standartlarına uygun olarak geliştirilmiştir ve sürekli optimize edilmelidir.


