// script.js - Kashma Portfolio Site - FORMULÁRIO COMPLETO COM WHATSAPP DIRETO

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
        
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenuBtn.classList.remove('active');
                navMenu.classList.remove('active');
                body.style.overflow = '';
            });
        });
        
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
    const navLinks2 = document.querySelectorAll('.nav-link');
    
    function updateActiveNavLink() {
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks2.forEach(link => {
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
    // FORM CONTATO - ENVIO DIRETO PARA WHATSAPP
    // =========================================
    const contactForm = document.getElementById('contactForm');
    const successMessage = document.getElementById('successMessage');
    const backToFormBtn = document.getElementById('backToFormBtn');
    const whatsappExpertBtn = document.getElementById('whatsappExpertBtn');
    
    // Função para mostrar mensagem de sucesso
    function showSuccessMessage() {
        contactForm.style.display = 'none';
        successMessage.style.display = 'block';
        successMessage.style.animation = 'none';
        setTimeout(() => {
            successMessage.style.animation = 'fadeInUp 0.6s ease forwards';
        }, 10);
    }
    
    // Função para voltar ao formulário
    function backToForm() {
        successMessage.style.display = 'none';
        contactForm.style.display = 'flex';
        // Resetar o botão de submit
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        if (submitBtn) {
            submitBtn.innerHTML = '<span class="btn-text">Enviar Solicitação</span><span class="btn-icon">→</span>';
            submitBtn.style.background = '';
            submitBtn.disabled = false;
        }
    }
    
    // Evento de voltar ao formulário
    if (backToFormBtn) {
        backToFormBtn.addEventListener('click', function(e) {
            e.preventDefault();
            backToForm();
            const formContainer = document.querySelector('.contact-form-container');
            if (formContainer) {
                formContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        });
    }
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // 1. Capturar todos os dados do formulário
            const name = document.getElementById('name').value.trim();
            const company = document.getElementById('company').value.trim();
            const segment = document.getElementById('segment').value.trim();
            
            const needSelect = document.getElementById('need');
            const need = needSelect.options[needSelect.selectedIndex]?.text || 'Não especificado';
            
            const hasWebsiteSelect = document.getElementById('hasWebsite');
            const hasWebsite = hasWebsiteSelect.options[hasWebsiteSelect.selectedIndex]?.text || 'Não informado';
            
            const budgetSelect = document.getElementById('budget');
            const budget = budgetSelect.options[budgetSelect.selectedIndex]?.text || 'Não especificado';
            
            const message = document.getElementById('message').value.trim();
            
            // 2. Validar campos obrigatórios
            if (!name) {
                alert('Por favor, preencha seu nome.');
                document.getElementById('name').focus();
                return;
            }
            
            if (need === 'Não especificado' || !needSelect.value) {
                alert('Por favor, selecione o que você precisa.');
                document.getElementById('need').focus();
                return;
            }
            
            if (budget === 'Não especificado' || !budgetSelect.value) {
                alert('Por favor, selecione seu orçamento estimado.');
                document.getElementById('budget').focus();
                return;
            }
            
            if (!message) {
                alert('Por favor, descreva seu projeto.');
                document.getElementById('message').focus();
                return;
            }
            
            // 3. Desabilitar o botão para evitar múltiplos envios
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<span class="btn-text">Abrindo WhatsApp...</span><span class="btn-icon">⏳</span>';
            submitBtn.style.background = 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)';
            
            // 4. Montar a mensagem formatada para o WhatsApp
            const phoneNumber = '5511951625108';
            
            let whatsappMessage = `Olá, equipe Kashma!\n\n`;
            whatsappMessage += `*Nova solicitação de orçamento*\n\n`;
            whatsappMessage += `*Nome:* ${name}\n`;
            
            if (company) {
                whatsappMessage += `*Empresa:* ${company}\n`;
            }
            
            if (segment) {
                whatsappMessage += `*Segmento:* ${segment}\n`;
            }
            
            whatsappMessage += `*O que precisa?:* ${need}\n`;
            whatsappMessage += `*Já possui site?:* ${hasWebsite}\n`;
            whatsappMessage += `*Orçamento estimado:* ${budget}\n\n`;
            whatsappMessage += `*Descrição do projeto:*\n${message}\n\n`;
            whatsappMessage += `Aguardo o retorno de vocês!`;
            
            // 5. Codificar a mensagem para URL
            const encodedMessage = encodeURIComponent(whatsappMessage);
            
            // 6. Montar a URL do WhatsApp
            const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
            
            // 7. Atualizar o link do botão "Falar com Especialista"
            if (whatsappExpertBtn) {
                whatsappExpertBtn.href = whatsappUrl;
            }
            
            // 8. ABRIR O WHATSAPP DIRETO EM NOVA ABA
            window.open(whatsappUrl, '_blank');
            
            // 9. Mostrar mensagem de sucesso
            setTimeout(() => {
                showSuccessMessage();
                // Scroll para ver a mensagem de sucesso
                const formContainer = document.querySelector('.contact-form-container');
                if (formContainer) {
                    formContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }, 500);
            
            // 10. Limpar o formulário (opcional - após abrir o WhatsApp)
            setTimeout(() => {
                contactForm.reset();
                // Restaurar o botão (já que o formulário foi resetado)
                submitBtn.disabled = false;
                submitBtn.innerHTML = '<span class="btn-text">Enviar Solicitação</span><span class="btn-icon">→</span>';
                submitBtn.style.background = '';
            }, 1000);
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