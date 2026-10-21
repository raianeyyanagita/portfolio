// Inicializa os ícones da biblioteca Lucide e animações
document.addEventListener('DOMContentLoaded', () => {
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // Ano atual automático no rodapé
  const yearSpan = document.getElementById('current-year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // Efeito de Luz Interativa seguindo o mouse (Cursor Spotlight)
  const cursorGlow = document.getElementById('cursor-glow');
  if (cursorGlow) {
    window.addEventListener('mousemove', (e) => {
      cursorGlow.style.left = `${e.clientX}px`;
      cursorGlow.style.top = `${e.clientY}px`;
    });
  }

  // Animação de Scroll Reveal (elementos surgindo suavemente ao rolar a página)
  const revealItems = document.querySelectorAll('.reveal-item');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.12 });

  revealItems.forEach((item) => observer.observe(item));

  // Efeito de máquina de escrever / alternância de cargos no Badge do Topo
  const badgeEl = document.getElementById('typewriter-badge');
  if (badgeEl) {
    const roles = [
      'Desenvolvedora Full Stack • Trybe',
      'Desenvolvedora Front-end & Suporte de TI',
      'Licenciada em Pedagogia • UEMG'
    ];
    let roleIdx = 0;
    setInterval(() => {
      roleIdx = (roleIdx + 1) % roles.length;
      badgeEl.style.opacity = '0';
      setTimeout(() => {
        badgeEl.textContent = roles[roleIdx];
        badgeEl.style.opacity = '1';
      }, 300);
    }, 3800);
    badgeEl.style.transition = 'opacity 0.3s ease';
  }

  // Menu Mobile
  const menuToggle = document.getElementById('menu-toggle');
  const navLinks = document.getElementById('nav-links');

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
      });
    });
  }

  // Abas interativas na janela de código da Hero Section
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabPerfil = document.getElementById('tab-perfil');
  const tabMissao = document.getElementById('tab-missao');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const target = btn.getAttribute('data-tab');
      if (target === 'perfil') {
        tabPerfil.classList.remove('hidden');
        tabMissao.classList.add('hidden');
      } else {
        tabMissao.classList.remove('hidden');
        tabPerfil.classList.add('hidden');
      }
    });
  });

  // Destaque automático do link ativo na barra de navegação ao rolar a página
  const sections = document.querySelectorAll('section[id]');
  const navItems = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 140;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });

    navItems.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

  // Envio inteligente do formulário direto para o WhatsApp da Raiane
  const contactForm = document.getElementById('contact-form');
  const formFeedback = document.getElementById('form-feedback');

  if (contactForm && formFeedback) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const nome = document.getElementById('nome').value.trim();
      const email = document.getElementById('email').value.trim();
      const assunto = document.getElementById('assunto').value;
      const mensagem = document.getElementById('mensagem').value.trim();

      const textoWhatsApp = `Olá Raiane! Me chamo *${nome}* (${email}).\n*Assunto:* ${assunto}\n\n${mensagem}`;
      const urlWhatsApp = `https://wa.me/5537998211196?text=${encodeURIComponent(textoWhatsApp)}`;

      formFeedback.textContent = `Redirecionando para o WhatsApp da Raiane...`;
      formFeedback.classList.remove('hidden');

      window.open(urlWhatsApp, '_blank');
      contactForm.reset();

      setTimeout(() => {
        formFeedback.classList.add('hidden');
      }, 6000);
    });
  }
});
