document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }
    
    // Countdown Timer (Elecciones: Marzo 2026)
    const election = new Date('2026-03-15T00:00:00').getTime();
    
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = election - now;
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        
        const dayEl = document.getElementById('days');
        const hourEl = document.getElementById('hours');
        const minEl = document.getElementById('minutes');

        if (dayEl) dayEl.textContent = days;
        if (hourEl) hourEl.textContent = hours;
        if (minEl) minEl.textContent = minutes;
    }
    
    updateCountdown();
    setInterval(updateCountdown, 60000);
    
    // Smooth Scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                if (navMenu) navMenu.classList.remove('active');
            }
        });
    });
    
    // Leaflet Map
    if (document.getElementById('map')) {
        const map = L.map('map').setView([-16.5, -68.15], 12);
        
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
        }).addTo(map);
        
        // Distritos de El Alto (coordenadas aproximadas)
        const distritos = [
            { num: 1, lat: -16.48, lng: -68.18, name: 'Distrito 1', propuestas: 'Seguridad 24/7, Iluminación LED, Centros Deportivos' },
            { num: 2, lat: -16.50, lng: -68.17, name: 'Distrito 2', propuestas: 'Pavimentación, Centros de Salud, Plazas' },
            { num: 3, lat: -16.52, lng: -68.16, name: 'Distrito 3', propuestas: 'Mercados Modernos, Empleo Juvenil, Cultura' },
            { num: 4, lat: -16.49, lng: -68.14, name: 'Distrito 4', propuestas: 'Transporte Ordenado, Vías Rápidas, Señalización' },
            { num: 5, lat: -16.51, lng: -68.13, name: 'Distrito 5', propuestas: 'Escuelas Equipadas, Internet Gratis, Bibliotecas' },
            { num: 6, lat: -16.47, lng: -68.16, name: 'Distrito 6', propuestas: 'Agua Potable, Alcantarillado, Limpieza Permanente' },
            { num: 7, lat: -16.53, lng: -68.15, name: 'Distrito 7', propuestas: 'Parques, Áreas Verdes, Recreación Familiar' },
            { num: 8, lat: -16.50, lng: -68.19, name: 'Distrito 8', propuestas: 'Regularización Predial, Documentación Express' },
            { num: 9, lat: -16.48, lng: -68.13, name: 'Distrito 9', propuestas: 'Apoyo a Comerciantes, Ferias Ordenadas' },
            { num: 10, lat: -16.52, lng: -68.18, name: 'Distrito 10', propuestas: 'Centros Productivos, Microcréditos' },
            { num: 11, lat: -16.49, lng: -68.16, name: 'Distrito 11', propuestas: 'Atención Adulto Mayor, Centros de Día' },
            { num: 12, lat: -16.51, lng: -68.14, name: 'Distrito 12', propuestas: 'Obras Concluidas 2018-2021, Continuidad' }
        ];
        
        distritos.forEach(d => {
            const marker = L.marker([d.lat, d.lng]).addTo(map);
            marker.bindPopup(`
                <div style="padding: 10px;">
                    <h4 style="color: #1E3A8A; margin-bottom: 10px;">${d.name}</h4>
                    <p style="margin: 0;"><strong>Propuestas:</strong></p>
                    <p style="margin: 5px 0;">${d.propuestas}</p>
                </div>
            `);
        });
    }
    
    // Accordion
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const item = header.parentElement;
            const content = item.querySelector('.accordion-content');
            const isActive = item.classList.contains('active');
            
            // Close all
            document.querySelectorAll('.accordion-item').forEach(i => {
                i.classList.remove('active');
                i.querySelector('.accordion-content').style.maxHeight = '0';
            });
            
            // Open clicked if wasn't active
            if (!isActive) {
                item.classList.add('active');
                content.style.maxHeight = content.scrollHeight + 'px';
            }
        });
    });
    
    // Scroll Reveal Animation
    const reveals = document.querySelectorAll('.pilar-card, .testimonio-card');
    
    function checkReveal() {
        reveals.forEach(element => {
            const windowHeight = window.innerHeight;
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < windowHeight - elementVisible) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }
    
    window.addEventListener('scroll', checkReveal);
    checkReveal();
    
    // Facebook Pixel Tracking
    if (typeof fbq !== 'undefined') {
        // Track button clicks
        document.querySelectorAll('.btn-primary').forEach(btn => {
            btn.addEventListener('click', () => {
                fbq('track', 'Lead', { content_name: 'Plan de Gobierno' });
            });
        });
        
        document.querySelectorAll('.unete-option').forEach(btn => {
            btn.addEventListener('click', () => {
                fbq('track', 'Contact', { content_name: btn.querySelector('h4').textContent });
            });
        });
    }
});
