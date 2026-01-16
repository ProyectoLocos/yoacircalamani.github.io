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
    const election = new Date('2026-03-22T00:00:00').getTime();

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

        // Distritos de El Alto (coordenadas exactas)
        const distritos = [
            {
                num: 1,
                lat: -16.50847,
                lng: -68.16012,
                name: 'Distrito 1 - La Ceja',
                lugar: 'Plaza de la Luna (Ratón Pérez)',
                propuestas: 'Gran Distribuidor Vial, Reordenamiento Comercio Popular, Seguridad 24/7, Iluminación LED Total'
            },
            {
                num: 2,
                lat: -16.54672,
                lng: -68.19635,
                name: 'Distrito 2 - Villa Adela',
                lugar: 'Plaza del Obelisco',
                propuestas: 'Pavimentación Integral, Centros de Salud Equipados, Plazas Renovadas, Espacios Deportivos'
            },
            {
                num: 3,
                lat: -16.54261,
                lng: -68.21901,
                name: 'Distrito 3 - Pacajes Caluyo',
                lugar: 'Plaza principal de Caluyo',
                propuestas: 'Fortalecimiento Sistema de Salud, Mercados Modernos, Empleo Juvenil, Centros Culturales'
            },
            {
                num: 4,
                lat: -16.50325,
                lng: -68.22915,
                name: 'Distrito 4 - Libertad / Río Seco',
                lugar: 'Jach\'a Uta (Casa Municipal)',
                propuestas: 'Transporte Ordenado, Vías Rápidas, Señalización Moderna, Escuelas Deportivas'
            },
            {
                num: 5,
                lat: -16.48174,
                lng: -68.19318,
                name: 'Distrito 5 - Villa Esperanza',
                lugar: 'Puerta principal UPEA',
                propuestas: 'Escuelas Equipadas, Internet Gratis en CRPs, Bibliotecas Municipales, Apoyo Universitario'
            },
            {
                num: 6,
                lat: -16.49102,
                lng: -68.17621,
                name: 'Distrito 6 - 16 de Julio',
                lugar: 'Plaza Libertad',
                propuestas: 'Infraestructura Vial, Agua Potable Universal, Alcantarillado, Limpieza Permanente'
            },
            {
                num: 7,
                lat: -16.46331,
                lng: -68.25244,
                name: 'Distrito 7 - San Roque',
                lugar: 'Cruce San Roque (Iglesia)',
                propuestas: 'Parques Familiares, Áreas Verdes, Recreación Comunitaria, Espacios Culturales'
            },
            {
                num: 8,
                lat: -16.57534,
                lng: -68.17845,
                name: 'Distrito 8 - Senkata',
                lugar: 'Cruce de Senkata',
                propuestas: 'Regularización Predial Express, Documentación Digital, Seguridad Ciudadana'
            },
            {
                num: 9,
                lat: -16.39572,
                lng: -68.24163,
                name: 'Distrito 9 - Pomamaya',
                lugar: 'Plaza de la Comunidad',
                propuestas: 'Desarrollo Rural, Infraestructura Básica, Apoyo Agropecuario, Conectividad Digital'
            },
            {
                num: 10,
                lat: -16.65552,
                lng: -68.14441,
                name: 'Distrito 10 - Amachuma',
                lugar: 'Cruce Amachuma (Carretera)',
                propuestas: 'Mejoramiento Vial, Servicios Básicos, Producción Agrícola, Seguridad Rural'
            },
            {
                num: 11,
                lat: -16.42081,
                lng: -68.31382,
                name: 'Distrito 11 - Tacachira',
                lugar: 'Unidad Educativa Tacachira',
                propuestas: 'Educación Rural, Infraestructura Educativa, Centros de Salud, Desarrollo Comunitario'
            },
            {
                num: 12,
                lat: -16.56531,
                lng: -68.23742,
                name: 'Distrito 12 - San Salvador',
                lugar: 'Plaza San Salvador',
                propuestas: 'Continuidad Gestión 2018-2021, Obras Concluidas, Mejoramiento Barrial, Participación Vecinal'
            },
            {
                num: 13,
                lat: -16.35824,
                lng: -68.15265,
                name: 'Distrito 13 - Milluni Bajo',
                lugar: 'Mirador Cementerio de Milluni',
                propuestas: 'Protección Ambiental, Turismo Comunitario, Gestión de Riesgos, Servicios Básicos'
            },
            {
                num: 14,
                lat: -16.46168,
                lng: -68.22485,
                name: 'Distrito 14 - Bautista Saavedra',
                lugar: 'Terminal Interprovincial',
                propuestas: 'Mejoramiento Terminal, Transporte Ordenado, Conectividad Regional, Comercio Formal'
            }
        ];

        distritos.forEach(d => {
            const marker = L.marker([d.lat, d.lng]).addTo(map);
            marker.bindPopup(`
                <div style="padding: 10px; min-width: 250px;">
                    <h4 style="color: #1E3A8A; margin-bottom: 5px; font-size: 1.1rem;">${d.name}</h4>
                    <p style="margin: 0 0 10px 0; color: #666; font-size: 0.9rem;">
                        <i class="fas fa-map-marker-alt" style="color: #F7B500;"></i> ${d.lugar}
                    </p>
                    <p style="margin: 0; font-weight: 600;">Propuestas:</p>
                    <p style="margin: 5px 0 0 0; line-height: 1.5;">${d.propuestas}</p>
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
