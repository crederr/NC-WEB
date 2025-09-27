/* ========================================
   NC Diş Kliniği - JavaScript Fonksiyonları
   Modern ES6+ standartları ile yazılmış
   ======================================== */

// DOM yüklendiğinde çalışacak fonksiyonlar
document.addEventListener('DOMContentLoaded', function() {
    // Loading screen'i başlat
    initLoadingScreen();
    
    // Performans optimizasyonu için requestIdleCallback kullan
    if ('requestIdleCallback' in window) {
        requestIdleCallback(function() {
            initNonCriticalFeatures();
        });
    } else {
        // Fallback için setTimeout
        setTimeout(initNonCriticalFeatures, 100);
    }
    
    // Kritik özellikler hemen başlat
    initCriticalFeatures();
    
    console.log('NC Diş Kliniği web sitesi başarıyla yüklendi!');
});

// Kritik özellikler - hemen başlatılması gerekenler
function initCriticalFeatures() {
    // Logo tıklama loading screen'i
    initLogoLoadingScreen();
    
    // Mobil menü işlevselliği
    initMobileMenu();
    
    // Smooth scroll işlevselliği
    initSmoothScroll();
    
    // Header scroll efekti
    initHeaderScrollEffect();
    
    // Yeni slider işlevselliği
    initMainSlider();
}

// Kritik olmayan özellikler - performans için geciktirilmiş
function initNonCriticalFeatures() {
    // Form validasyonu
    initContactForm();
    
    // Scroll animasyonları
    initScrollAnimations();
    
    // Dil değiştirme işlevselliği
    initLanguageSwitcher();
    
    // Dropdown menü işlevselliği
    initDropdownMenus();
    
    // Hizmet modal işlevselliği
    initServiceModals();
    
    // İnsan kaynakları formu
    initCareerForm();
    
    // Lazy loading
    initLazyLoading();
    
    // Back to top
    initBackToTop();
    
    // Theme toggle
    initThemeToggle();
}

/* ========================================
   MOBİL MENÜ İŞLEVSELLİĞİ
   ======================================== */

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
}

/* ========================================
   SMOOTH SCROLL İŞLEVSELLİĞİ
   ======================================== */

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

/* ========================================
   İLETİŞİM FORMU VALİDASYONU
   ======================================== */

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
    }
}

// Form validasyon fonksiyonu
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

// Tekil alan validasyonu
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
        errorDiv.style.color = '#e74c3c';
        errorDiv.style.fontSize = '0.875rem';
        errorDiv.style.marginTop = '0.25rem';
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

/* ========================================
   SCROLL ANİMASYONLARI
   ======================================== */

function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.service-card, .feature, .contact-item, .testimonial-card');
    
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

/* ========================================
   HEADER SCROLL EFEKTİ
   ======================================== */

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

/* ========================================
   UTİLİTY FONKSİYONLARI
   ======================================== */

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

// Hata yakalama ve loglama
window.addEventListener('error', function(e) {
    console.error('JavaScript Hatası:', e.error);
    console.error('Hata dosyası:', e.filename);
    console.error('Hata satırı:', e.lineno);
    console.error('Hata mesajı:', e.message);
    // Burada hata raporlama servisine gönderilebilir
});

// Promise hatalarını yakala
window.addEventListener('unhandledrejection', function(e) {
    console.error('Promise Hatası:', e.reason);
});

// ========================================
// LIGHTBOX FONKSIYONLARI
// ========================================

let currentImageIndex = 0;
let galleryImages = [];

// Lightbox açma fonksiyonu
function openLightbox(imageSrc, title, description) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    const lightboxTitle = document.getElementById('lightbox-title');
    const lightboxDescription = document.getElementById('lightbox-description');
    
    if (!lightbox || !lightboxImage) return;
    
    // Tüm galeri resimlerini topla
    galleryImages = Array.from(document.querySelectorAll('.gallery-item')).map(item => {
        const img = item.querySelector('img');
        const overlay = item.querySelector('.gallery-overlay');
        return {
            src: img.src,
            title: overlay.querySelector('h3').textContent,
            description: overlay.querySelector('p').textContent
        };
    });
    
    // Mevcut resmin indexini bul
    currentImageIndex = galleryImages.findIndex(img => img.src === imageSrc);
    
    // Lightbox içeriğini güncelle
    lightboxImage.src = imageSrc;
    lightboxImage.alt = title;
    lightboxTitle.textContent = title;
    lightboxDescription.textContent = description;
    
    // Resim sayacını güncelle
    const currentImageSpan = document.getElementById('current-image');
    const totalImagesSpan = document.getElementById('total-images');
    if (currentImageSpan) {
        currentImageSpan.textContent = currentImageIndex + 1;
    }
    if (totalImagesSpan) {
        totalImagesSpan.textContent = galleryImages.length;
    }
    
    // Lightbox'ı göster
    lightbox.classList.add('show');
    document.body.style.overflow = 'hidden';
    
    // Navigasyon butonlarını güncelle
    updateNavigationButtons();
}

// Lightbox kapatma fonksiyonu
function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
        lightbox.classList.remove('show');
        document.body.style.overflow = 'auto';
    }
}

// Önceki resme git
function previousImage() {
    if (galleryImages.length === 0) return;
    
    currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
    showImage(currentImageIndex);
}

// Sonraki resme git
function nextImage() {
    if (galleryImages.length === 0) return;
    
    currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
    showImage(currentImageIndex);
}

// Belirli bir resmi göster
function showImage(index) {
    const lightboxImage = document.getElementById('lightbox-image');
    const lightboxTitle = document.getElementById('lightbox-title');
    const lightboxDescription = document.getElementById('lightbox-description');
    const currentImageSpan = document.getElementById('current-image');
    const totalImagesSpan = document.getElementById('total-images');
    
    if (!lightboxImage || !galleryImages[index]) return;
    
    const image = galleryImages[index];
    lightboxImage.src = image.src;
    lightboxImage.alt = image.title;
    lightboxTitle.textContent = image.title;
    lightboxDescription.textContent = image.description;
    
    // Resim sayacını güncelle
    if (currentImageSpan) {
        currentImageSpan.textContent = index + 1;
    }
    if (totalImagesSpan) {
        totalImagesSpan.textContent = galleryImages.length;
    }
    
    updateNavigationButtons();
}

// Navigasyon butonlarını güncelle
function updateNavigationButtons() {
    const prevBtn = document.getElementById('lightbox-prev');
    const nextBtn = document.getElementById('lightbox-next');
    
    if (prevBtn && nextBtn) {
        // Tek resim varsa butonları gizle
        if (galleryImages.length <= 1) {
            prevBtn.style.display = 'none';
            nextBtn.style.display = 'none';
        } else {
            prevBtn.style.display = 'flex';
            nextBtn.style.display = 'flex';
        }
    }
}

// Lightbox event listener'ları
document.addEventListener('DOMContentLoaded', function() {
    const lightbox = document.getElementById('lightbox');
    const closeBtn = document.querySelector('.lightbox-close');
    const prevBtn = document.getElementById('lightbox-prev');
    const nextBtn = document.getElementById('lightbox-next');
    
    // Kapatma butonu
    if (closeBtn) {
        closeBtn.addEventListener('click', closeLightbox);
    }
    
    // Lightbox dışına tıklayınca kapat
    if (lightbox) {
        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
    }
    
    // Navigasyon butonları
    if (prevBtn) {
        prevBtn.addEventListener('click', previousImage);
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', nextImage);
    }
    
    // Klavye navigasyonu
    document.addEventListener('keydown', function(e) {
        if (lightbox && lightbox.classList.contains('show')) {
            switch(e.key) {
                case 'Escape':
                    closeLightbox();
                    break;
                case 'ArrowLeft':
                    previousImage();
                    break;
                case 'ArrowRight':
                    nextImage();
                    break;
            }
        }
    });
});

// Sayfa görünürlük API'si - performans optimizasyonu
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        // Sayfa gizlendiğinde animasyonları durdur
        document.body.style.animationPlayState = 'paused';
    } else {
        // Sayfa görünür olduğunda animasyonları devam ettir
        document.body.style.animationPlayState = 'running';
    }
});

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

// Sayfa yüklendiğinde performans metriklerini başlat
logPerformanceMetrics();

// Lazy loading'i başlat (eğer lazy image'lar varsa)
initLazyLoading();

/* ========================================
   DİL DEĞİŞTİRME İŞLEVSELLİĞİ
   ======================================== */

function initLanguageSwitcher() {
    const langButtons = document.querySelectorAll('.lang-btn');
    const currentLang = localStorage.getItem('selectedLanguage') || 'tr';
    
    // Mevcut dili ayarla
    setActiveLanguage(currentLang);
    
    langButtons.forEach(button => {
        button.addEventListener('click', function() {
            const selectedLang = this.getAttribute('data-lang');
            setActiveLanguage(selectedLang);
            localStorage.setItem('selectedLanguage', selectedLang);
        });
    });
}

function setActiveLanguage(lang) {
    // Aktif dil butonunu güncelle
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-lang="${lang}"]`).classList.add('active');
    
    // Sayfa dilini değiştir
    document.documentElement.lang = lang;
    
    // İçerikleri çevir
    translateContent(lang);
}

function translateContent(lang) {
    const translations = {
        tr: {
            // Navigasyon
            'nav-home': 'Ana Sayfa',
            'nav-corporate': 'Kurumsal',
            'nav-services': 'Hizmetlerimiz',
            'nav-contact': 'İletişim',
            
            // Slider
            'slide1-title': 'GÜLÜMSETMEK BİZİM İŞİMİZ!',
            'slide1-description': 'Modern teknoloji ve uzman kadromuzla gülüşünüze değer katıyoruz.',
            'slide2-title': 'UZMAN HEKİM KADROMUZ',
            'slide2-description': 'Alanında uzman diş hekimlerimizle en kaliteli hizmeti sunuyoruz.',
            'slide3-title': 'MODERN TEDAVİ YÖNTEMLERİ',
            'slide3-description': 'Son teknoloji cihazlarla ağrısız ve konforlu tedavi deneyimi.',
            'slide4-title': 'MUTLU HASTALAR',
            'slide4-description': 'Binlerce memnun hastamızın güvenini kazandık.',
            
            // Butonlar
            'btn-appointment': 'Randevu Al',
            'btn-services': 'Hizmetlerimiz',
            'btn-about': 'Hakkımızda',
            'btn-treatments': 'Tedavilerimiz',
            'btn-send-message': 'Mesaj Gönder',
            
            // Hakkımızda
            'about-title': 'Hakkımızda',
            'about-description': '1999 yılında hizmet vermeye başlayan polikliniğimiz, güler yüzlü hizmet anlayışını benimseyerek, uzman hekim kadrosu, ileri teknolojiye sahip ekipmanıyla hasta memnuniyetini birincil amaç edinmiştir. Polikliniğimiz yenilikleri ön planda tutup, en iyi olmayı hedefleyerek haftanın 7 günü "İşimiz Gülümsetmek" sloganıyla hizmet vermeye devam etmektedir.',
            'quality-title': 'Kaliteli Hizmet Belgesi',
            'quality-description': 'Zeytinburnu Özel Aksa Ağız ve Diş Sağlığı Polikliniği olarak sizlere kaliteli hizmet sağlıyor ve daha kaliteli hizmet verebilmek için gece gündüz çalışıyoruz.',
            'technology-title': 'Son Teknoloji Cihazlar',
            'technology-description': 'Zeytinburnu Özel Aksa Ağız ve Diş Sağlığı Polikliniği olarak son teknoloji cihazlar ile teknolojinin sağladığı olanaklardan faydalanarak en iyi hizmeti veriyoruz.',
            'expert-title': 'Alanında Uzman Kadro',
            'expert-description': 'Zeytinburnu Özel Aksa Ağız ve Diş Sağlığı Polikliniği olarak alanında uzman kadromuz ile sizi sağlıklı ve güzel gülümsemenize kavuşturuyoruz.',
            
            // Hizmetler
            'services-title': 'Hizmetlerimiz',
            'services-description': 'Size en iyi diş sağlığı hizmetlerini sunmak için geniş bir hizmet yelpazesi sunuyoruz.',
            'service-implant-title': 'İmplant',
            'service-implant-desc': 'Modern implant teknolojisi ile eksik dişlerinizi doğal görünümde tamamlıyoruz.',
            'service-orthodontics-title': 'Ortodonti',
            'service-orthodontics-desc': 'Düzgün diş dizilimi için şeffaf plaklar ve geleneksel braketler sunuyoruz.',
            'service-endodontics-title': 'Endodonti',
            'service-endodontics-desc': 'Kanal tedavisi ve kök kanalı problemlerinin uzman çözümü.',
            'service-smile-design-title': 'Gülüş Tasarımı',
            'service-smile-design-desc': 'Estetik diş hekimliği ile mükemmel gülüş tasarımı.',
            'service-jaw-surgery-title': 'Çene Cerrahisi',
            'service-jaw-surgery-desc': 'Çene ve yüz cerrahisi konusunda uzman hekimlerimizle hizmet.',
            'service-periodontics-title': 'Periodontoloji',
            'service-periodontics-desc': 'Diş eti hastalıkları ve periodontal tedaviler.',
            'service-pedodontics-title': 'Pedodonti',
            'service-pedodontics-desc': 'Çocuklarınızın diş sağlığı için özel yaklaşım ve tedavi yöntemleri.',
            'service-oral-care-title': 'Ağız Bakımı',
            'service-oral-care-desc': 'Profesyonel ağız bakımı ve hijyen uygulamaları.',
            'service-bad-breath-title': 'Ağız Kokusu Sorunu',
            'service-bad-breath-desc': 'Ağız kokusu problemlerinin teşhis ve tedavisi.',
            'service-dry-mouth-title': 'Ağız Kuruluğu',
            'service-dry-mouth-desc': 'Ağız kuruluğu problemlerinin çözümü ve tedavisi.',
            'service-tooth-abscess-title': 'Diş Apsesi',
            'service-tooth-abscess-desc': 'Diş apsesi tedavisi ve acil müdahale hizmetleri.',
            'service-teeth-whitening-title': 'Diş Beyazlatma',
            'service-teeth-whitening-desc': 'Güvenli ve etkili yöntemlerle dişlerinizi beyazlatıp gülüşünüzü parlatıyoruz.',
            'service-tooth-decay-title': 'Diş Çürükleri',
            'service-tooth-decay-desc': 'Diş çürüklerinin erken teşhisi ve modern tedavi yöntemleri.',
            'service-filling-title': 'Dolgu Tedavisi',
            'service-filling-desc': 'Estetik ve dayanıklı dolgu tedavileri.',
            'service-impacted-teeth-title': 'Gömük Dişler',
            'service-impacted-teeth-desc': 'Gömük dişlerin çıkarılması ve tedavi süreçleri.',
            'service-prosthetics-title': 'Protezler ve Bakımı',
            'service-prosthetics-desc': 'Protez yapımı, bakımı ve düzenli kontroller.',
            
            // İletişim
            'contact-title': 'İletişim',
            'contact-description': 'Randevu almak veya sorularınız için bizimle iletişime geçin.',
            'contact-address-title': 'Adres',
            'contact-address': 'Çırpıcı Mahallesi Rüstem Balkan Sokak No: 55/C Zeytinburnu / İSTANBUL',
            'contact-phone-title': 'Telefon',
            'contact-email-title': 'E-posta',
            
            // Form
            'form-name-placeholder': 'Adınız Soyadınız',
            'form-email-placeholder': 'E-posta Adresiniz',
            'form-phone-placeholder': 'Telefon Numaranız',
            'form-message-placeholder': 'Mesajınız',
            'form-service-select': 'Hizmet Seçiniz',
            'form-service-implant': 'İmplant Tedavisi',
            'form-service-whitening': 'Diş Beyazlatma',
            'form-service-orthodontics': 'Ortodonti',
            'form-service-preventive': 'Koruyucu Diş Hekimliği',
            'form-service-crown': 'Kron ve Köprü',
            'form-service-pediatric': 'Çocuk Diş Hekimliği',
            'form-service-consultation': 'Konsültasyon'
        },
        en: {
            // Navigation
            'nav-home': 'Home',
            'nav-corporate': 'Corporate',
            'nav-services': 'Services',
            'nav-contact': 'Contact',
            
            // Slider
            'slide1-title': 'MAKING YOU SMILE IS OUR BUSINESS!',
            'slide1-description': 'We add value to your smile with modern technology and our expert team.',
            'slide2-title': 'OUR EXPERT DOCTOR TEAM',
            'slide2-description': 'We provide the highest quality service with our expert dentists.',
            'slide3-title': 'MODERN TREATMENT METHODS',
            'slide3-description': 'Painless and comfortable treatment experience with state-of-the-art equipment.',
            'slide4-title': 'HAPPY PATIENTS',
            'slide4-description': 'We have gained the trust of thousands of satisfied patients.',
            
            // Buttons
            'btn-appointment': 'Book Appointment',
            'btn-services': 'Our Services',
            'btn-about': 'About Us',
            'btn-treatments': 'Our Treatments',
            'btn-send-message': 'Send Message',
            
            // About Us
            'about-title': 'About Us',
            'about-description': 'Our polyclinic, which started serving in 1999, has adopted a friendly service approach and has made patient satisfaction its primary goal with its expert physician staff and advanced technology equipment. Our polyclinic continues to serve 7 days a week with the slogan "Our Business is to Make You Smile" by keeping innovations in the foreground and aiming to be the best.',
            'quality-title': 'Quality Service Certificate',
            'quality-description': 'As Zeytinburnu Private Aksa Oral and Dental Health Polyclinic, we provide quality service to you and work day and night to provide better quality service.',
            'technology-title': 'Latest Technology Devices',
            'technology-description': 'As Zeytinburnu Private Aksa Oral and Dental Health Polyclinic, we provide the best service by utilizing the opportunities provided by technology with state-of-the-art devices.',
            'expert-title': 'Expert Staff in the Field',
            'expert-description': 'As Zeytinburnu Private Aksa Oral and Dental Health Polyclinic, we bring you to your healthy and beautiful smile with our expert staff in the field.',
            
            // Services
            'services-title': 'Our Services',
            'services-description': 'We offer a wide range of services to provide you with the best dental health services.',
            'service-implant-title': 'Implant',
            'service-implant-desc': 'We complete your missing teeth with a natural appearance using modern implant technology.',
            'service-orthodontics-title': 'Orthodontics',
            'service-orthodontics-desc': 'We offer clear aligners and traditional braces for proper tooth alignment.',
            'service-endodontics-title': 'Endodontics',
            'service-endodontics-desc': 'Expert solution for root canal treatment and root canal problems.',
            'service-smile-design-title': 'Smile Design',
            'service-smile-design-desc': 'Perfect smile design with aesthetic dentistry.',
            'service-jaw-surgery-title': 'Jaw Surgery',
            'service-jaw-surgery-desc': 'Service with our expert doctors in jaw and facial surgery.',
            'service-periodontics-title': 'Periodontics',
            'service-periodontics-desc': 'Gum diseases and periodontal treatments.',
            'service-pedodontics-title': 'Pedodontics',
            'service-pedodontics-desc': 'Special approach and treatment methods for your children\'s dental health.',
            'service-oral-care-title': 'Oral Care',
            'service-oral-care-desc': 'Professional oral care and hygiene practices.',
            'service-bad-breath-title': 'Bad Breath Problem',
            'service-bad-breath-desc': 'Diagnosis and treatment of bad breath problems.',
            'service-dry-mouth-title': 'Dry Mouth',
            'service-dry-mouth-desc': 'Solution and treatment of dry mouth problems.',
            'service-tooth-abscess-title': 'Tooth Abscess',
            'service-tooth-abscess-desc': 'Tooth abscess treatment and emergency intervention services.',
            'service-teeth-whitening-title': 'Teeth Whitening',
            'service-teeth-whitening-desc': 'We whiten your teeth and brighten your smile with safe and effective methods.',
            'service-tooth-decay-title': 'Tooth Decay',
            'service-tooth-decay-desc': 'Early diagnosis of tooth decay and modern treatment methods.',
            'service-filling-title': 'Filling Treatment',
            'service-filling-desc': 'Aesthetic and durable filling treatments.',
            'service-impacted-teeth-title': 'Impacted Teeth',
            'service-impacted-teeth-desc': 'Extraction and treatment processes of impacted teeth.',
            'service-prosthetics-title': 'Prosthetics and Care',
            'service-prosthetics-desc': 'Prosthesis making, maintenance and regular check-ups.',
            
            // Contact
            'contact-title': 'Contact',
            'contact-description': 'Contact us to make an appointment or for your questions.',
            'contact-address-title': 'Address',
            'contact-address': 'Çırpıcı Mahallesi Rüstem Balkan Sokak No: 55/C Zeytinburnu / ISTANBUL',
            'contact-phone-title': 'Phone',
            'contact-email-title': 'Email',
            
            // Form
            'form-name-placeholder': 'Your Name and Surname',
            'form-email-placeholder': 'Your Email Address',
            'form-phone-placeholder': 'Your Phone Number',
            'form-message-placeholder': 'Your Message',
            'form-service-select': 'Select Service',
            'form-service-implant': 'Implant Treatment',
            'form-service-whitening': 'Teeth Whitening',
            'form-service-orthodontics': 'Orthodontics',
            'form-service-preventive': 'Preventive Dentistry',
            'form-service-crown': 'Crown and Bridge',
            'form-service-pediatric': 'Pediatric Dentistry',
            'form-service-consultation': 'Consultation'
        },
        ar: {
            // التنقل
            'nav-home': 'الرئيسية',
            'nav-corporate': 'المؤسسة',
            'nav-services': 'خدماتنا',
            'nav-contact': 'اتصل بنا',
            
            // الشريط المتحرك
            'slide1-title': 'إضحاكك هو عملنا!',
            'slide1-description': 'نضيف قيمة لابتسامتك بالتكنولوجيا الحديثة وفريقنا المتخصص.',
            'slide2-title': 'فريق الأطباء المتخصصين',
            'slide2-description': 'نقدم أعلى خدمة جودة مع أطباء الأسنان المتخصصين لدينا.',
            'slide3-title': 'طرق العلاج الحديثة',
            'slide3-description': 'تجربة علاج خالية من الألم ومريحة بأحدث المعدات.',
            'slide4-title': 'مرضى سعداء',
            'slide4-description': 'لقد اكتسبنا ثقة آلاف المرضى الراضين.',
            
            // الأزرار
            'btn-appointment': 'احجز موعد',
            'btn-services': 'خدماتنا',
            'btn-about': 'من نحن',
            'btn-treatments': 'علاجاتنا',
            'btn-send-message': 'إرسال رسالة',
            
            // من نحن
            'about-title': 'من نحن',
            'about-description': 'بدأت عيادتنا في تقديم الخدمات عام 1999، وتبنت نهج الخدمة الودية وجعلت رضا المرضى هدفها الأساسي مع فريق الأطباء المتخصصين والمعدات التقنية المتقدمة. تستمر عيادتنا في تقديم الخدمات 7 أيام في الأسبوع بشعار "عملنا هو إضحاككم" من خلال وضع الابتكارات في المقدمة والسعي ليكون الأفضل.',
            'quality-title': 'شهادة الخدمة عالية الجودة',
            'quality-description': 'كعيادة أكسا الخاصة لصحة الفم والأسنان في زيتينبورنو، نقدم لكم خدمة عالية الجودة ونعمل ليل نهار لتقديم خدمة أفضل جودة.',
            'technology-title': 'أحدث الأجهزة التقنية',
            'technology-description': 'كعيادة أكسا الخاصة لصحة الفم والأسنان في زيتينبورنو، نقدم أفضل خدمة من خلال الاستفادة من الفرص التي توفرها التكنولوجيا بأحدث الأجهزة.',
            'expert-title': 'فريق متخصص في المجال',
            'expert-description': 'كعيادة أكسا الخاصة لصحة الفم والأسنان في زيتينبورنو، نوصلكم إلى ابتسامتكم الصحية والجميلة مع فريقنا المتخصص في المجال.',
            
            // الخدمات
            'services-title': 'خدماتنا',
            'services-description': 'نقدم مجموعة واسعة من الخدمات لتقديم أفضل خدمات صحة الأسنان.',
            'service-implant-title': 'زراعة الأسنان',
            'service-implant-desc': 'نكمل أسنانك المفقودة بمظهر طبيعي باستخدام تكنولوجيا الزراعة الحديثة.',
            'service-orthodontics-title': 'تقويم الأسنان',
            'service-orthodontics-desc': 'نقدم محاذيات شفافة وأقواس تقليدية لمحاذاة الأسنان الصحيحة.',
            'service-endodontics-title': 'علاج الجذور',
            'service-endodontics-desc': 'حل متخصص لعلاج قناة الجذر ومشاكل قناة الجذر.',
            'service-smile-design-title': 'تصميم الابتسامة',
            'service-smile-design-desc': 'تصميم ابتسامة مثالية مع طب الأسنان التجميلي.',
            'service-jaw-surgery-title': 'جراحة الفك',
            'service-jaw-surgery-desc': 'خدمة مع أطبائنا المتخصصين في جراحة الفك والوجه.',
            'service-periodontics-title': 'أمراض اللثة',
            'service-periodontics-desc': 'أمراض اللثة والعلاجات اللثوية.',
            'service-pedodontics-title': 'طب أسنان الأطفال',
            'service-pedodontics-desc': 'نهج خاص وطرق علاج لصحة أسنان أطفالك.',
            'service-oral-care-title': 'العناية بالفم',
            'service-oral-care-desc': 'ممارسات العناية بالفم والنظافة المهنية.',
            'service-bad-breath-title': 'مشكلة رائحة الفم',
            'service-bad-breath-desc': 'تشخيص وعلاج مشاكل رائحة الفم.',
            'service-dry-mouth-title': 'جفاف الفم',
            'service-dry-mouth-desc': 'حل وعلاج مشاكل جفاف الفم.',
            'service-tooth-abscess-title': 'خراج الأسنان',
            'service-tooth-abscess-desc': 'علاج خراج الأسنان وخدمات التدخل الطارئ.',
            'service-teeth-whitening-title': 'تبييض الأسنان',
            'service-teeth-whitening-desc': 'نبيض أسنانك ونضيء ابتسامتك بطرق آمنة وفعالة.',
            'service-tooth-decay-title': 'تسوس الأسنان',
            'service-tooth-decay-desc': 'التشخيص المبكر لتسوس الأسنان وطرق العلاج الحديثة.',
            'service-filling-title': 'علاج الحشو',
            'service-filling-desc': 'علاجات الحشو الجمالية والمتينة.',
            'service-impacted-teeth-title': 'الأسنان المطمورة',
            'service-impacted-teeth-desc': 'عمليات إزالة وعلاج الأسنان المطمورة.',
            'service-prosthetics-title': 'الأطقم والعناية',
            'service-prosthetics-desc': 'صنع الأطقم والصيانة والفحوصات الدورية.',
            
            // الاتصال
            'contact-title': 'اتصل بنا',
            'contact-description': 'تواصل معنا لحجز موعد أو لأسئلتك.',
            'contact-address-title': 'العنوان',
            'contact-address': 'حي جيربيجي، شارع رستم بالكان رقم: 55/ج زيتينبورنو / إسطنبول',
            'contact-phone-title': 'الهاتف',
            'contact-email-title': 'البريد الإلكتروني',
            
            // النموذج
            'form-name-placeholder': 'الاسم واللقب',
            'form-email-placeholder': 'عنوان البريد الإلكتروني',
            'form-phone-placeholder': 'رقم الهاتف',
            'form-message-placeholder': 'رسالتك',
            'form-service-select': 'اختر الخدمة',
            'form-service-implant': 'علاج الزراعة',
            'form-service-whitening': 'تبييض الأسنان',
            'form-service-orthodontics': 'تقويم الأسنان',
            'form-service-preventive': 'طب الأسنان الوقائي',
            'form-service-crown': 'التاج والجسر',
            'form-service-pediatric': 'طب أسنان الأطفال',
            'form-service-consultation': 'استشارة'
        }
    };
    
    const currentTranslations = translations[lang] || translations.tr;
    
    // Tüm çevirilebilir elementleri güncelle
    Object.keys(currentTranslations).forEach(key => {
        const elements = document.querySelectorAll(`[data-translate="${key}"]`);
        elements.forEach(element => {
            element.textContent = currentTranslations[key];
        });
    });
    
    // Placeholder çevirileri
    Object.keys(currentTranslations).forEach(key => {
        if (key.includes('placeholder')) {
            const elements = document.querySelectorAll(`[data-translate-placeholder="${key}"]`);
            elements.forEach(element => {
                element.placeholder = currentTranslations[key];
            });
        }
    });
    
    // RTL desteği için Arapça
    if (lang === 'ar') {
        document.body.style.direction = 'rtl';
        document.body.style.textAlign = 'right';
        document.documentElement.setAttribute('dir', 'rtl');
    } else {
        document.body.style.direction = 'ltr';
        document.body.style.textAlign = 'left';
        document.documentElement.setAttribute('dir', 'ltr');
    }
    
    // Sayfa başlığını güncelle
    const pageTitle = document.querySelector('title');
    if (pageTitle) {
        if (lang === 'tr') {
            pageTitle.textContent = 'Aksadis - Ağız & Diş Sağlığı Zeytinburnu';
        } else if (lang === 'en') {
            pageTitle.textContent = 'Aksadis - Oral & Dental Health Zeytinburnu';
        } else if (lang === 'ar') {
            pageTitle.textContent = 'أكساديس - صحة الفم والأسنان زيتينبورنو';
        }
    }
    
    // Meta description güncelle
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
        if (lang === 'tr') {
            metaDescription.setAttribute('content', 'Aksadis - Modern teknoloji ile profesyonel diş sağlığı hizmetleri. İmplant, ortodonti, beyazlatma ve daha fazlası.');
        } else if (lang === 'en') {
            metaDescription.setAttribute('content', 'Aksadis - Professional dental health services with modern technology. Implant, orthodontics, whitening and more.');
        } else if (lang === 'ar') {
            metaDescription.setAttribute('content', 'أكساديس - خدمات صحة الأسنان المهنية بالتكنولوجيا الحديثة. الزراعة، تقويم الأسنان، التبييض والمزيد.');
        }
    }
}

/* ========================================
   DROPDOWN MENÜ İŞLEVSELLİĞİ
   ======================================== */

function initDropdownMenus() {
    const dropdownItems = document.querySelectorAll('.nav-item.dropdown');
    
    dropdownItems.forEach(item => {
        const link = item.querySelector('.nav-link');
        const menu = item.querySelector('.dropdown-menu');
        
        // Menu bulunamadıysa atla
        if (!menu) {
            console.log('Dropdown menu bulunamadı:', item);
            return;
        }
        
        // Hover olayları
        item.addEventListener('mouseenter', function() {
            if (menu) {
            menu.style.display = 'grid';
            }
        });
        
        item.addEventListener('mouseleave', function() {
            if (menu) {
            menu.style.display = 'none';
            }
        });
        
        // Dropdown menü linklerine tıklama
        const dropdownLinks = menu.querySelectorAll('a');
        dropdownLinks.forEach(dropdownLink => {
            dropdownLink.addEventListener('click', function(e) {
                const targetHref = this.getAttribute('href');
                
                // Eğer link .html ile bitiyorsa normal sayfa yönlendirmesi yap
                if (targetHref.endsWith('.html')) {
                    // Menüyü kapat
                    if (menu) {
                        menu.style.display = 'none';
                    }
                    // Normal link davranışına izin ver (sayfa yönlendirmesi)
                    return;
                }
                
                // Eğer link # ile başlıyorsa scroll yap
                if (targetHref.startsWith('#')) {
                e.preventDefault();
                    const targetSection = document.querySelector(targetHref);
                
                    if (targetSection && menu) {
                    // Menüyü kapat
                    menu.style.display = 'none';
                    
                    // Hedef bölüme scroll yap
                        const header = document.querySelector('.header');
                        if (header) {
                            const headerHeight = header.offsetHeight;
                    const targetPosition = targetSection.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                        }
                    }
                }
            });
        });
    });
}

/* ========================================
   HİZMET DETAY MODALI
   ======================================== */

function initServiceModals() {
    const serviceLinks = document.querySelectorAll('.service-card, .dropdown-column a[href^="#"]');
    
    serviceLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const serviceId = this.getAttribute('href').replace('#', '');
            showServiceModal(serviceId);
        });
    });
}

function showServiceModal(serviceId) {
    const serviceData = getServiceData(serviceId);
    
    // Modal HTML oluştur
    const modalHTML = `
        <div class="service-modal-overlay" id="serviceModal">
            <div class="service-modal">
                <div class="modal-header">
                    <h2>${serviceData.title}</h2>
                    <button class="modal-close" onclick="closeServiceModal()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-content">
                    <div class="modal-image">
                        <div class="service-image-placeholder">
                            <i class="${serviceData.icon}"></i>
                        </div>
                    </div>
                    <div class="modal-text">
                        <h3>${serviceData.subtitle}</h3>
                        <p>${serviceData.description}</p>
                        <h4>Nasıl Tedavi Edilir?</h4>
                        <p>${serviceData.treatment}</p>
                        <h4>Avantajları</h4>
                        <ul>
                            ${serviceData.benefits.map(benefit => `<li>${benefit}</li>`).join('')}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Modalı sayfaya ekle
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    // Modal animasyonu
    setTimeout(() => {
        document.getElementById('serviceModal').classList.add('active');
    }, 10);
}

function closeServiceModal() {
    const modal = document.getElementById('serviceModal');
    modal.classList.remove('active');
    
    setTimeout(() => {
        modal.remove();
    }, 300);
}

function getServiceData(serviceId) {
    const services = {
        'implant': {
            title: 'İmplant Tedavisi',
            subtitle: 'Eksik Dişlerin Doğal Çözümü',
            icon: 'fas fa-tooth',
            description: 'İmplant, eksik dişlerin yerine yerleştirilen titanyum vidalardır. Doğal diş kökü gibi çene kemiğine entegre olarak sağlam bir temel oluşturur.',
            treatment: 'İmplant tedavisi 3 aşamada gerçekleşir: 1) Kemik hazırlığı ve implant yerleştirme, 2) İyileşme süreci (3-6 ay), 3) Üst yapı (kron) yerleştirme. Lokal anestezi altında ağrısız bir işlemdir.',
            benefits: [
                'Doğal diş görünümü ve hissi',
                'Çene kemiğini korur',
                'Uzun ömürlü çözüm',
                'Komşu dişlere zarar vermez',
                'Güvenli ve etkili tedavi'
            ]
        },
        'ortodonti': {
            title: 'Ortodonti Tedavisi',
            subtitle: 'Düzgün Diş Dizilimi',
            icon: 'fas fa-teeth',
            description: 'Ortodonti, dişlerin ve çenelerin düzgün hizalanması ile ilgilenen diş hekimliği dalıdır. Hem estetik hem de fonksiyonel faydalar sağlar.',
            treatment: 'Ortodonti tedavisi braketler, şeffaf plaklar veya görünmez tel sistemleri ile yapılır. Tedavi süresi 6-24 ay arasında değişir. Düzenli kontrollerle dişler yavaş yavaş ideal pozisyonlarına getirilir.',
            benefits: [
                'Daha güzel gülüş',
                'Daha iyi çiğneme fonksiyonu',
                'Konuşma iyileştirmesi',
                'Diş temizliği kolaylığı',
                'Özgüven artışı'
            ]
        },
        'endodonti': {
            title: 'Endodonti (Kanal Tedavisi)',
            subtitle: 'Diş Kurtarma Tedavisi',
            icon: 'fas fa-tooth',
            description: 'Endodonti, dişin içindeki sinir ve damar dokularının tedavi edildiği diş hekimliği dalıdır. Kanal tedavisi ile dişler kurtarılabilir.',
            treatment: 'Kanal tedavisi 3 aşamada yapılır: 1) Dişin içindeki enfekte doku temizlenir, 2) Kanal şekillendirilir ve dezenfekte edilir, 3) Kanal doldurulur ve diş restore edilir. Modern tekniklerle ağrısız bir işlemdir.',
            benefits: [
                'Diş kaybını önler',
                'Doğal diş korunur',
                'Ağrı giderilir',
                'Estetik görünüm',
                'Uzun ömürlü çözüm'
            ]
        },
        'gulus-tasarimi': {
            title: 'Gülüş Tasarımı',
            subtitle: 'Mükemmel Gülüş',
            icon: 'fas fa-smile',
            description: 'Gülüş tasarımı, dişlerin şekil, renk, boyut ve dizilimini optimize ederek estetik ve doğal bir gülüş elde etme sanatıdır.',
            treatment: 'Gülüş tasarımı kişiye özel planlanır. Önce mevcut durum analiz edilir, sonra dijital tasarım yapılır. Porcelain veneer, bonding, beyazlatma gibi yöntemlerle ideal gülüş elde edilir.',
            benefits: [
                'Kişiye özel tasarım',
                'Doğal görünüm',
                'Özgüven artışı',
                'Sosyal yaşamda fark',
                'Profesyonel imaj'
            ]
        }
    };
    
    return services[serviceId] || services['implant'];
}

/* ========================================
   YENİ SLIDER İŞLEVSELLİĞİ
   ======================================== */

function initMainSlider() {
    console.log('Yeni slider başlatılıyor...');
    
    // Daha geniş selector'lar kullan
    const slides = document.querySelectorAll('.main-slider .slide');
    const dots = document.querySelectorAll('.main-slider .dot');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    console.log('Slides bulundu:', slides.length);
    console.log('Dots bulundu:', dots.length);
    console.log('PrevBtn bulundu:', !!prevBtn);
    console.log('NextBtn bulundu:', !!nextBtn);
    
    if (slides.length === 0) {
        console.log('Slider slides bulunamadı');
        return;
    }
    
    if (!prevBtn || !nextBtn) {
        console.log('Navigation butonları bulunamadı');
        return;
    }
    
    let currentSlide = 0;
    let slideInterval;
    
    // Tüm slide'ları gizle
    slides.forEach((slide, index) => {
        slide.classList.remove('active');
        slide.style.opacity = '0';
        slide.style.zIndex = '1';
        console.log('Slide', index, 'aktif değil yapıldı');
    });
    
    // Tüm dot'ları pasif yap
    dots.forEach((dot, index) => {
        dot.classList.remove('active');
        console.log('Dot', index, 'aktif değil yapıldı');
    });
    
    // İlk slide'ı aktif yap
    if (slides[0]) {
        slides[0].classList.add('active');
        slides[0].style.opacity = '1';
        slides[0].style.zIndex = '2';
        console.log('İlk slide aktif yapıldı');
    }
    if (dots[0]) {
        dots[0].classList.add('active');
        console.log('İlk dot aktif yapıldı');
    }
    
    // Slider'ı başlat
    function startSlider() {
        if (slideInterval) {
            clearInterval(slideInterval);
        }
        slideInterval = setInterval(() => {
            nextSlide();
        }, 5000); // 5 saniyede bir değişir
        console.log('Slider otomatik kayma başlatıldı');
    }
    
    // Slider'ı hemen başlat
    setTimeout(() => {
        startSlider();
    }, 100);
    
    // Alternatif başlatma - eğer ilk başlatma çalışmazsa
    setTimeout(() => {
        if (!slideInterval) {
            console.log('Alternatif başlatma çalışıyor...');
            startSlider();
        }
    }, 1000);
    
    // Slider'ı durdur
    function stopSlider() {
        clearInterval(slideInterval);
    }
    
    // Sonraki slide'a geç
    function nextSlide() {
        console.log('nextSlide çağrıldı, mevcut slide:', currentSlide);
        
        if (slides[currentSlide]) {
            slides[currentSlide].classList.remove('active');
            slides[currentSlide].style.opacity = '0';
            slides[currentSlide].style.zIndex = '1';
        }
        if (dots[currentSlide]) {
            dots[currentSlide].classList.remove('active');
        }
        
        currentSlide = (currentSlide + 1) % slides.length;
        console.log('Yeni slide:', currentSlide);
        
        if (slides[currentSlide]) {
            slides[currentSlide].classList.add('active');
            slides[currentSlide].style.opacity = '1';
            slides[currentSlide].style.zIndex = '2';
        }
        if (dots[currentSlide]) {
            dots[currentSlide].classList.add('active');
        }
    }
    
    // Önceki slide'a geç
    function prevSlide() {
        console.log('prevSlide çağrıldı, mevcut slide:', currentSlide);
        
        if (slides[currentSlide]) {
            slides[currentSlide].classList.remove('active');
            slides[currentSlide].style.opacity = '0';
            slides[currentSlide].style.zIndex = '1';
        }
        if (dots[currentSlide]) {
            dots[currentSlide].classList.remove('active');
        }
        
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        console.log('Yeni slide:', currentSlide);
        
        if (slides[currentSlide]) {
            slides[currentSlide].classList.add('active');
            slides[currentSlide].style.opacity = '1';
            slides[currentSlide].style.zIndex = '2';
        }
        if (dots[currentSlide]) {
            dots[currentSlide].classList.add('active');
        }
    }
    
    // Belirli bir slide'a git
    function goToSlide(slideIndex) {
        if (slideIndex === currentSlide) return;
        
        console.log('goToSlide çağrıldı, hedef slide:', slideIndex);
        
        if (slides[currentSlide]) {
            slides[currentSlide].classList.remove('active');
            slides[currentSlide].style.opacity = '0';
            slides[currentSlide].style.zIndex = '1';
        }
        if (dots[currentSlide]) {
            dots[currentSlide].classList.remove('active');
        }
        
        currentSlide = slideIndex;
        
        if (slides[currentSlide]) {
            slides[currentSlide].classList.add('active');
            slides[currentSlide].style.opacity = '1';
            slides[currentSlide].style.zIndex = '2';
        }
        if (dots[currentSlide]) {
            dots[currentSlide].classList.add('active');
        }
    }
    
    // Event listeners
    nextBtn.addEventListener('click', (e) => {
        e.preventDefault();
        console.log('Next buton tıklandı');
            stopSlider();
            nextSlide();
            startSlider();
        });
    
    prevBtn.addEventListener('click', (e) => {
        e.preventDefault();
        console.log('Prev buton tıklandı');
            stopSlider();
            prevSlide();
            startSlider();
        });
    
    // Dot'lara tıklama
    dots.forEach((dot, index) => {
        dot.addEventListener('click', (e) => {
            e.preventDefault();
            console.log('Dot tıklandı:', index);
            stopSlider();
            goToSlide(index);
            startSlider();
        });
    });
    
    // Klavye navigasyonu
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            stopSlider();
            prevSlide();
            startSlider();
        } else if (e.key === 'ArrowRight') {
            stopSlider();
            nextSlide();
            startSlider();
        }
    });
    
    // Touch/swipe desteği
    let startX = 0;
    let endX = 0;
    
    const sliderContainer = document.querySelector('.main-slider');
    if (sliderContainer) {
        sliderContainer.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
        });
        
        sliderContainer.addEventListener('touchend', (e) => {
            endX = e.changedTouches[0].clientX;
            handleSwipe();
        });
    }
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = startX - endX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Sola swipe - sonraki slide
                stopSlider();
                nextSlide();
                startSlider();
            } else {
                // Sağa swipe - önceki slide
                stopSlider();
                prevSlide();
                startSlider();
            }
        }
    }
    
    console.log('Yeni slider başlatıldı - ' + slides.length + ' slide bulundu');
}

// Modal kapatma olayları
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('service-modal-overlay')) {
        closeServiceModal();
    }
});

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeServiceModal();
    }
});

/* ========================================
   İNSAN KAYNAKLARI FORMU
   ======================================== */

function initCareerForm() {
    const careerForm = document.getElementById('careerForm');
    
    if (careerForm) {
        careerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Form verilerini al
            const formData = new FormData(careerForm);
            const formObject = {};
            
            formData.forEach((value, key) => {
                formObject[key] = value;
            });
            
            // Form validasyonu
            if (validateCareerForm(formObject)) {
                // Form gönderimi simülasyonu
                submitCareerForm(formObject);
            }
        });
        
        // Real-time validasyon
        const formInputs = careerForm.querySelectorAll('input, select, textarea');
        formInputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateCareerField(this);
            });
            
            input.addEventListener('input', function() {
                clearFieldError(this);
            });
        });
        
        // Dosya yükleme işlevi
        const fileInput = document.getElementById('cvUpload');
        const fileNameSpan = document.querySelector('.file-name');
        
        if (fileInput && fileNameSpan) {
            fileInput.addEventListener('change', function() {
                if (this.files.length > 0) {
                    const fileName = this.files[0].name;
                    fileNameSpan.textContent = fileName;
                    fileNameSpan.style.color = '#4CAF50';
                    fileNameSpan.style.fontWeight = '500';
                } else {
                    fileNameSpan.textContent = 'Dosya seçilmedi';
                    fileNameSpan.style.color = 'var(--text-gray)';
                    fileNameSpan.style.fontWeight = 'normal';
                }
            });
        }
    }
}

// İnsan kaynakları form validasyonu
function validateCareerForm(formData) {
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
    
    // Pozisyon seçimi validasyonu
    if (!formData.position) {
        errors.position = 'Lütfen bir pozisyon seçiniz.';
        isValid = false;
    }
    
    // Hataları göster
    Object.keys(errors).forEach(fieldName => {
        showFieldError(fieldName, errors[fieldName]);
    });
    
    return isValid;
}

// İnsan kaynakları form gönderimi
function submitCareerForm(formData) {
    const submitButton = careerForm.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    
    // Buton durumunu değiştir
    submitButton.textContent = 'Gönderiliyor...';
    submitButton.disabled = true;
    
    // Simüle edilmiş API çağrısı
    setTimeout(() => {
        // Başarı mesajı göster
        showCareerSuccessMessage();
        
        // Formu temizle
        document.getElementById('careerForm').reset();
        
        // Dosya label'ını sıfırla
        const fileLabel = document.querySelector('.file-label');
        if (fileLabel) {
            fileLabel.innerHTML = '<i class="fas fa-upload"></i> CV Yükle (PDF, DOC, DOCX)';
            fileLabel.style.background = 'var(--primary-color)';
        }
        
        // Buton durumunu sıfırla
        submitButton.textContent = originalText;
        submitButton.disabled = false;
        
        console.log('İnsan kaynakları form verileri:', formData);
    }, 2000);
}

// İnsan kaynakları başarı mesajı
function showCareerSuccessMessage() {
    // Mevcut mesajları kaldır
    const existingMessages = document.querySelectorAll('.career-form-message');
    existingMessages.forEach(msg => msg.remove());
    
    // Başarı mesajı oluştur
    const successMessage = document.createElement('div');
    successMessage.className = 'career-form-message success-message';
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
        Başvurunuz başarıyla gönderildi! En kısa sürede size dönüş yapacağız.
    `;
    
    // Mesajı forma ekle
    const careerForm = document.getElementById('careerForm');
    careerForm.appendChild(successMessage);
    
    // 5 saniye sonra mesajı kaldır
    setTimeout(() => {
        successMessage.remove();
    }, 5000);
}

// ========================================
// HİZMETLER "DAHA FAZLA" BUTONU
// ========================================

function initServicesMoreButton() {
    const moreBtn = document.getElementById('services-more-btn');
    const hiddenCards = document.querySelectorAll('.service-card-hidden');
    let isExpanded = false;
    
    if (!moreBtn || hiddenCards.length === 0) {
        console.log('Services more button or hidden cards not found');
        return;
    }
    
    console.log('Found', hiddenCards.length, 'hidden service cards');
    
    moreBtn.addEventListener('click', function() {
        console.log('More button clicked, isExpanded:', isExpanded);
        
        if (!isExpanded) {
            // Gizli kartları göster
            hiddenCards.forEach((card, index) => {
                setTimeout(() => {
                    card.classList.add('show');
                    console.log('Showing card', index);
                }, index * 100);
            });
            
            // Buton metnini değiştir
            const btnText = moreBtn.querySelector('.btn-text');
            if (btnText) {
                btnText.textContent = 'Daha Az Göster';
            }
            
            // Buton durumunu güncelle
            moreBtn.classList.add('expanded');
            isExpanded = true;
            
        } else {
            // Gizli kartları gizle
            hiddenCards.forEach((card, index) => {
                setTimeout(() => {
                    card.classList.remove('show');
                    console.log('Hiding card', index);
                }, index * 50);
            });
            
            // Buton metnini değiştir
            const btnText = moreBtn.querySelector('.btn-text');
            if (btnText) {
                btnText.textContent = 'Tüm Hizmetleri Gör';
            }
            
            // Buton durumunu güncelle
            moreBtn.classList.remove('expanded');
            isExpanded = false;
        }
    });
}

// ========================================
// ANIMATED COUNTER
// ========================================

function initAnimatedCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    const animateCounter = (counter) => {
        const target = parseInt(counter.getAttribute('data-count'));
        const duration = 2000; // 2 saniye
        const increment = target / (duration / 16); // 60 FPS
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };
        
        updateCounter();
    };
    
    // Intersection Observer ile görünür olduğunda animasyonu başlat
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => {
        observer.observe(counter);
    });
}

// ========================================
// BACK TO TOP BUTTON
// ========================================

function initBackToTop() {
    const backToTopBtn = document.getElementById('back-to-top');
    
    if (!backToTopBtn) return;
    
    // Scroll event listener
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });
    
    // Click event listener
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}


// ========================================
// LOADING SCREEN
// ========================================

function initLoadingScreen() {
    console.log('initLoadingScreen çağrıldı');
    
    const loadingScreen = document.getElementById('loading-screen');
    
    if (!loadingScreen) {
        console.log('Loading screen bulunamadı');
        return;
    }
    
    console.log('Loading screen bulundu');
    
    // Koşulları kontrol et
    const shouldShowLoading = checkLoadingConditions();
    
    if (!shouldShowLoading) {
        console.log('Loading screen koşulları sağlanmadı, gizleniyor');
        loadingScreen.style.display = 'none';
        return;
    }
    
    console.log('Loading screen başlatıldı - Ana sayfa girişi');
    
    // 1.5 saniye sonra kapat
    setTimeout(() => {
        console.log('Loading screen kapatılıyor...');
        
        loadingScreen.style.opacity = '0';
        loadingScreen.style.visibility = 'hidden';
        loadingScreen.style.pointerEvents = 'none';
        loadingScreen.style.display = 'none';
        
        setTimeout(() => {
            if (loadingScreen && loadingScreen.parentNode) {
                loadingScreen.remove();
                console.log('Loading screen kaldırıldı');
            }
        }, 300);
    }, 1500);
    
    // Güvenlik için 3 saniye sonra zorla kapat
    setTimeout(() => {
        if (loadingScreen && loadingScreen.parentNode) {
            console.log('Güvenlik: Loading screen zorla kapatılıyor');
            loadingScreen.style.display = 'none';
            loadingScreen.remove();
        }
    }, 3000);
}

// Loading screen koşullarını kontrol et
function checkLoadingConditions() {
    console.log('Loading koşulları kontrol ediliyor...');
    console.log('Pathname:', window.location.pathname);
    
    // 1. Sadece ana sayfada göster
    const isHomePage = window.location.pathname === '/' || 
                      window.location.pathname === '/index.html' || 
                      window.location.pathname.endsWith('/') ||
                      window.location.pathname.includes('index.html');
    
    console.log('Ana sayfa mı?', isHomePage);
    
    if (!isHomePage) {
        console.log('Ana sayfa değil, loading screen gösterilmeyecek');
        return false;
    }
    
    // 2. Her zaman göster (ana sayfaya giriş)
    console.log('Ana sayfa - loading screen gösterilecek');
    return true;
}


// ========================================
// LOGO LOADING SCREEN
// ========================================

function initLogoLoadingScreen() {
    // Logo linklerini bul (tüm logo linkleri)
    const logoLinks = document.querySelectorAll('.nav-logo a, .logo-container a, a[href="/"], a[href="/index.html"], a[href="index.html"]');
    
    logoLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Ana sayfaya gidiyorsa loading screen göster
            if (href === '/' || href === '/index.html' || href === 'index.html') {
                // Eğer zaten ana sayfadaysa, loading screen'i manuel olarak göster
                if (window.location.pathname === '/' || 
                    window.location.pathname === '/index.html' || 
                    window.location.pathname.endsWith('/')) {
                    
                    e.preventDefault(); // Sayfa yenilenmesini engelle
                    showLoadingScreen();
                }
            }
        });
    });
}

// Manuel loading screen gösterme
function showLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    
    if (!loadingScreen) {
        console.log('Loading screen bulunamadı');
        return;
    }
    
    console.log('Logo tıklama - Loading screen gösteriliyor');
    
    // Loading screen'i göster
    loadingScreen.style.display = 'flex';
    loadingScreen.style.opacity = '1';
    loadingScreen.style.visibility = 'visible';
    loadingScreen.style.pointerEvents = 'auto';
    loadingScreen.classList.remove('hidden', 'quick-hide');
    
    // 1.5 saniye sonra kapat
    setTimeout(() => {
        console.log('Logo loading screen kapatılıyor...');
        
        loadingScreen.classList.add('hidden');
        loadingScreen.style.opacity = '0';
        loadingScreen.style.visibility = 'hidden';
        loadingScreen.style.pointerEvents = 'none';
        loadingScreen.style.display = 'none';
        
        setTimeout(() => {
            if (loadingScreen && loadingScreen.parentNode) {
                loadingScreen.remove();
                console.log('Logo loading screen kaldırıldı');
            }
        }, 300);
    }, 1500);
}

// ========================================
// SCROLL ANIMATIONS
// ========================================

function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .scale-in, .rotate-in');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// ========================================
// LIGHTBOX GALLERY
// ========================================

function initLightbox() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const modal = document.getElementById('lightbox-modal');
    const modalImg = document.querySelector('.lightbox-image');
    const closeBtn = document.getElementById('lightbox-close');
    const prevBtn = document.getElementById('lightbox-prev');
    const nextBtn = document.getElementById('lightbox-next');
    const modalTitle = document.querySelector('.lightbox-title');
    const modalDescription = document.querySelector('.lightbox-description');
    
    let currentIndex = 0;
    let images = [];
    
    // Tüm resimleri topla
    galleryItems.forEach((item, index) => {
        const placeholder = item.querySelector('.gallery-placeholder');
        const overlay = item.querySelector('.gallery-overlay');
        const title = overlay ? overlay.querySelector('h3').textContent : 'Fotoğraf';
        const description = overlay ? overlay.querySelector('p').textContent : 'Açıklama';
        
        images.push({
            src: '#', // Placeholder için
            alt: title,
            title: title,
            description: description,
            icon: placeholder ? placeholder.querySelector('i').className : 'fas fa-image'
        });
        
        item.addEventListener('click', () => {
            currentIndex = index;
            openLightbox();
        });
    });
    
    function openLightbox() {
        modal.classList.add('show');
        updateImage();
        document.body.style.overflow = 'hidden';
    }
    
    function closeLightbox() {
        modal.classList.remove('show');
        document.body.style.overflow = 'auto';
    }
    
    function updateImage() {
        const currentImage = images[currentIndex];
        
        // Placeholder için icon göster
        if (modalImg) {
            modalImg.innerHTML = `
                <div class="lightbox-placeholder">
                    <i class="${currentImage.icon}"></i>
                    <p>Fotoğraf Yükleniyor...</p>
                </div>
            `;
        }
        
        // Başlık ve açıklamayı güncelle
        if (modalTitle) {
            modalTitle.textContent = currentImage.title;
        }
        if (modalDescription) {
            modalDescription.textContent = currentImage.description;
        }
    }
    
    function nextImage() {
        currentIndex = (currentIndex + 1) % images.length;
        updateImage();
    }
    
    function prevImage() {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        updateImage();
    }
    
    // Event listeners
    closeBtn.addEventListener('click', closeLightbox);
    nextBtn.addEventListener('click', nextImage);
    prevBtn.addEventListener('click', prevImage);
    
    // Modal dışına tıklayınca kapat
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeLightbox();
        }
    });
    
    // Klavye kontrolleri
    document.addEventListener('keydown', (e) => {
        if (!modal.classList.contains('show')) return;
        
        switch(e.key) {
            case 'Escape':
                closeLightbox();
                break;
            case 'ArrowRight':
                nextImage();
                break;
            case 'ArrowLeft':
                prevImage();
                break;
        }
    });
}

// ========================================
// DARK/LIGHT MODE TOGGLE
// ========================================

function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const body = document.body;
    
            // Local storage'dan tema tercihini al (varsayılan dark)
            const savedTheme = localStorage.getItem('theme') || 'dark';
            body.setAttribute('data-theme', savedTheme);
    
    // İkonu güncelle
    updateThemeIcon(savedTheme);
    
        // Toggle event listener
        themeToggle.addEventListener('click', () => {
            const currentTheme = body.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            console.log('Theme changing from', currentTheme, 'to', newTheme);
            
            body.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeIcon(newTheme);
            
            // Smooth transition
            body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
            setTimeout(() => {
                body.style.transition = '';
            }, 300);
        });
    
    function updateThemeIcon(theme) {
        if (theme === 'dark') {
            themeIcon.className = 'fas fa-sun';
        } else {
            themeIcon.className = 'fas fa-moon';
        }
    }
}

// Services More Button'u başlat
document.addEventListener('DOMContentLoaded', () => {
    initServicesMoreButton();
    initAnimatedCounters();
    initBackToTop();
    initScrollAnimations();
    initLightbox();
    initThemeToggle();
});

console.log('Aksadis JavaScript modülleri başarıyla yüklendi!');
