// script.js - Kashma Portfolio Site - VERSÃO CORRIGIDA COM WHATSAPP

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navMenu = document.getElementById('navMenu');
    const body = document.body;
    
    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            mobileMenuBtn.classList.toggle('active');
            navMenu.classList.toggle('active');
            body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });
        
        // Close menu when clicking a link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenuBtn.classList.remove('active');
                navMenu.classList.remove('active');
                body.style.overflow = '';
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (navMenu.classList.contains('active') && 
                !navMenu.contains(e.target) && 
                !mobileMenuBtn.contains(e.target)) {
                mobileMenuBtn.classList.remove('active');
                navMenu.classList.remove('active');
                body.style.overflow = '';
            }
        });
    }
    
    // Logo click - scroll to top
    const logoLinks = document.querySelectorAll('.logo-link');
    logoLinks.forEach(logoLink => {
        logoLink.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            if (navMenu && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                if (mobileMenuBtn) {
                    mobileMenuBtn.classList.remove('active');
                }
                body.style.overflow = '';
            }
        });
    });
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]:not(.logo-link)').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#' || href === '') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const offsetTop = target.offsetTop - 70;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Header scroll effect
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 50) {
            header.style.background = 'rgba(10, 10, 12, 0.98)';
            header.style.boxShadow = '0 0 30px rgba(0, 229, 255, 0.1)';
        } else {
            header.style.background = 'rgba(10, 10, 12, 0.95)';
            header.style.boxShadow = 'none';
        }
    });
    
    // Add active class to nav links based on scroll position
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    function updateActiveNavLink() {
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveNavLink);
    updateActiveNavLink();
    
    // =========================================
    // FORM CONTATO - ENVIO PARA WHATSAPP
    // =========================================
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Impede o envio tradicional do formulário
            
            // 1. Capturar os dados do formulário
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const interestSelect = document.getElementById('interest');
            const interest = interestSelect.options[interestSelect.selectedIndex]?.text || 'Não especificado';
            const message = document.getElementById('message').value.trim();
            
            // 2. Validar se os campos obrigatórios estão preenchidos
            if (!name || !email || !message || interest === 'Não especificado') {
                alert('Por favor, preencha todos os campos corretamente.');
                return;
            }
            
            // 3. Montar a mensagem formatada para o WhatsApp
            const phoneNumber = '5511951625108'; // Número da Kashma (sem o +)
            
            const whatsappMessage = 
                `Olá, equipe Kashma! 👋\n\n` +
                `Meu nome é *${name}*.\n` +
                `Meu e-mail é: ${email}\n\n` +
                `*Interesse:* ${interest}\n\n` +
                `*Sobre o projeto:*\n${message}\n\n` +
                `Aguardo o retorno de vocês! 🚀`;
            
            // 4. Codificar a mensagem para URL
            const encodedMessage = encodeURIComponent(whatsappMessage);
            
            // 5. Montar a URL do WhatsApp
            const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
            
            // 6. Abrir o WhatsApp em uma nova aba/janela
            window.open(whatsappUrl, '_blank');
            
            // 7. (Opcional) Feedback visual para o usuário
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            // Muda o texto do botão temporariamente
            submitBtn.innerHTML = '<span class="btn-text">Abrindo WhatsApp...</span><span class="btn-icon">📱</span>';
            submitBtn.style.background = 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)';
            
            // Limpa o formulário (opcional)
            // this.reset();
            
            // Restaura o botão após 4 segundos
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.style.background = '';
            }, 4000);
        });
    }
    
    // Prevent body scroll when menu is open on resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            if (navMenu) {
                navMenu.classList.remove('active');
                body.style.overflow = '';
            }
            if (mobileMenuBtn) {
                mobileMenuBtn.classList.remove('active');
            }
        }
    });
    
    console.log('%cKASHMA • カシマ • Tecnologia de Precisão', 'font-family: Orbitron, sans-serif; font-size: 14px; font-weight: bold; color: #00E5FF; text-shadow: 0 0 10px #00E5FF;');
});