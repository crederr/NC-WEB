#!/usr/bin/env python3
"""
Placeholder resimler oluşturmak için basit script
"""

import os
from PIL import Image, ImageDraw, ImageFont
import textwrap

def create_placeholder_image(width, height, text, filename, bg_color=(240, 240, 240), text_color=(100, 100, 100)):
    """Placeholder resim oluştur"""
    try:
        # Resim oluştur
        img = Image.new('RGB', (width, height), bg_color)
        draw = ImageDraw.Draw(img)
        
        # Font boyutu hesapla
        font_size = min(width, height) // 10
        try:
            font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", font_size)
        except:
            font = ImageFont.load_default()
        
        # Metni wrap et
        wrapped_text = textwrap.fill(text, width=15)
        
        # Metin boyutunu hesapla
        bbox = draw.textbbox((0, 0), wrapped_text, font=font)
        text_width = bbox[2] - bbox[0]
        text_height = bbox[3] - bbox[1]
        
        # Metni ortala
        x = (width - text_width) // 2
        y = (height - text_height) // 2
        
        # Metni çiz
        draw.text((x, y), wrapped_text, fill=text_color, font=font)
        
        # Resmi kaydet
        img.save(filename, 'JPEG', quality=85)
        print(f"✓ {filename} oluşturuldu ({width}x{height})")
        
    except Exception as e:
        print(f"✗ {filename} oluşturulamadı: {e}")

def main():
    """Ana fonksiyon"""
    print("Placeholder resimler oluşturuluyor...")
    
    # Doktor resimleri
    doctors = [
        ("images/doctors/dr-ahmet-yilmaz.jpg", "Dr. Ahmet Yılmaz\nDiş Hekimi", 300, 300),
        ("images/doctors/dr-ayse-demir.jpg", "Dr. Ayşe Demir\nOrtodontist", 300, 300),
        ("images/doctors/dr-mehmet-kaya.jpg", "Dr. Mehmet Kaya\nOral Cerrah", 300, 300),
    ]
    
    # Klinik resimleri
    clinic_images = [
        ("images/clinic/modern-clinic-interior.jpg", "Modern Klinik\nİç Mekan", 600, 400),
        ("images/clinic/modern-clinic-interior-full.jpg", "Modern Klinik\nİç Mekan", 1200, 800),
        ("images/clinic/modern-equipment.jpg", "Modern Ekipmanlar\nSon Teknoloji", 600, 400),
        ("images/clinic/modern-equipment-full.jpg", "Modern Ekipmanlar\nSon Teknoloji", 1200, 800),
        ("images/clinic/sterile-examination-room.jpg", "Steril Muayene\nOdası", 600, 400),
        ("images/clinic/sterile-examination-room-full.jpg", "Steril Muayene\nOdası", 1200, 800),
        ("images/clinic/waiting-room.jpg", "Bekleme Salonu\nKonforlu Ortam", 600, 400),
        ("images/clinic/waiting-room-full.jpg", "Bekleme Salonu\nKonforlu Ortam", 1200, 800),
    ]
    
    # Tedavi resimleri
    treatment_images = [
        ("images/treatments/dental-treatment-process.jpg", "Diş Tedavi\nSüreci", 600, 400),
        ("images/treatments/dental-treatment-process-full.jpg", "Diş Tedavi\nSüreci", 1200, 800),
        ("images/treatments/implant-treatment.jpg", "İmplant Tedavisi\nModern Teknoloji", 600, 400),
        ("images/treatments/implant-treatment-full.jpg", "İmplant Tedavisi\nModern Teknoloji", 1200, 800),
        ("images/treatments/implant-main-treatment.jpg", "İmplant Tedavisi\nAna Görsel", 600, 400),
        ("images/treatments/implant-before.jpg", "İmplant Öncesi\nDurum", 300, 200),
        ("images/treatments/implant-after.jpg", "İmplant Sonrası\nSonuç", 300, 200),
    ]
    
    # Galeri resimleri
    gallery_images = [
        ("images/gallery/happy-patient.jpg", "Mutlu Hasta\nGülen Yüz", 1920, 800),
    ]
    
    # Tüm resimleri oluştur
    all_images = doctors + clinic_images + treatment_images + gallery_images
    
    for filename, text, width, height in all_images:
        create_placeholder_image(width, height, text, filename)
    
    print(f"\n✓ Toplam {len(all_images)} placeholder resim oluşturuldu!")

if __name__ == "__main__":
    main()
