// ===================================
// INICIALIZA WOW.JS
// ===================================

// Quando o documento carregar
document.addEventListener('DOMContentLoaded', function() {
    // Inicializa WOW.js
    new WOW({
        boxClass: 'wow',           // Classe dos elementos
        animateClass: 'animated',  // Classe da animação
        offset: 100,               // Distância antes de animar
        mobile: true,              // Ativa no mobile
        live: true                 // Detecta novos elementos
    }).init();
});

// ... resto do seu código do header, menu, etc

// ===================================
// HEADER E NAVEGAÇÃO
// ===================================

// Efeito de Scroll no Header
window.addEventListener('scroll', function() {
    const header = document.getElementById('header');
    
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Menu Mobile Toggle
const navbarToggle = document.getElementById('navbarToggle');
const navbarMenu = document.querySelector('.navbar-menu');

if (navbarToggle) {
    navbarToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        navbarMenu.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    });
}

// Fechar menu ao clicar em um link
const menuLinks = document.querySelectorAll('.navbar-menu a');

menuLinks.forEach(link => {
    link.addEventListener('click', function() {
        navbarToggle.classList.remove('active');
        navbarMenu.classList.remove('active');
        document.body.classList.remove('menu-open');
    });
});

// Fechar menu ao clicar fora
document.addEventListener('click', function(event) {
    const isClickInsideMenu = navbarMenu.contains(event.target);
    const isClickOnToggle = navbarToggle.contains(event.target);
    
    if (!isClickInsideMenu && !isClickOnToggle && navbarMenu.classList.contains('active')) {
        navbarToggle.classList.remove('active');
        navbarMenu.classList.remove('active');
        document.body.classList.remove('menu-open');
    }
});

// Smooth Scroll para links âncora
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const headerHeight = document.getElementById('header').offsetHeight;
            const targetPosition = targetSection.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===================================
// ANIMAÇÕES AO SCROLL
// ===================================

// Função para animar elementos ao scroll
function animateOnScroll() {
    // Seleciona todos os elementos com classe 'animate-on-scroll'
    const elements = document.querySelectorAll('.animate-on-scroll');
    
    // Para cada elemento
    elements.forEach(element => {
        // Pega a posição do elemento
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        
        // Verifica se o elemento está visível na tela
        const isVisible = (elementTop < window.innerHeight - 100) && (elementBottom > 0);
        
        // Se estiver visível e ainda não foi animado
        if (isVisible && !element.classList.contains('animated')) {
            // Adiciona a classe 'animated' para executar a animação
            element.classList.add('animated');
        }
    });
}

// Executa ao fazer scroll
window.addEventListener('scroll', animateOnScroll);

// Executa ao carregar a página (caso já esteja na section)
window.addEventListener('load', animateOnScroll);

// ===================================
// CARROSSEL VERTICAL DE DEPOIMENTOS
// ===================================

document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.testimonial-card');
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');
    let currentIndex = 0;

    function updateCarousel() {
        cards.forEach((card, index) => {
            card.classList.remove('active', 'prev', 'next');
            
            if (index === currentIndex) {
                card.classList.add('active');
            } else if (index === currentIndex - 1 || (currentIndex === 0 && index === cards.length - 1)) {
                card.classList.add('prev');
            } else if (index === currentIndex + 1 || (currentIndex === cards.length - 1 && index === 0)) {
                card.classList.add('next');
            }
        });
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % cards.length;
        updateCarousel();
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + cards.length) % cards.length;
        updateCarousel();
    }

    if (nextBtn && prevBtn) {
        nextBtn.addEventListener('click', nextSlide);
        prevBtn.addEventListener('click', prevSlide);
    }

    // Auto-play (opcional - remova se não quiser)
    setInterval(nextSlide, 5000);

    // Inicializa o carrossel
    updateCarousel();
});
    //  // Efeito Parallax
    //  window.addEventListener('scroll', function() {
    //       const depoimentosSection = document.querySelector('.depoimentos-section');
    //     const depoimentosBackground = document.querySelector('.depoimentos-background img');
        
    //      if (depoimentosSection && depoimentosBackground) {
    //          const rect = depoimentosSection.getBoundingClientRect();
    //          const scrolled = window.pageYOffset;
    //          const rate = scrolled * 0.5;
            
    //         if (rect.top <= window.innerHeight && rect.bottom >= 0) {
    //              depoimentosBackground.style.transform = `translateY(${rate}px)`;
    //          }
    //     }
    //  });

