// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Services data
const services = [
  {
    title: "Аудит конверсии",
    lead: "Находим трение в воронке и быстрые точки роста.",
    bullets: ["UX/UI разбор", "Карты кликов/записей", "10–15 гипотез A/B"],
    effect: "+10–35% CR",
  },
  {
    title: "Креативный брендинг",
    lead: "Образ, который продаёт и запоминается.",
    bullets: ["Айдентика", "Дизайн-система", "Пакеты креативов"],
    effect: "+CTR, +CR",
  },
  {
    title: "Поддержка разработки",
    lead: "Техвнедрение, скорость и стабильность.",
    bullets: ["Frontend/Backend правки", "Интеграции/CRM", "Оптимизация/исправления"],
    effect: "↓TTFB, ↓ошибки",
  },
  {
    title: "AI и автоматизация",
    lead: "Персонализация и скорость операций.",
    bullets: ["Автоответы/боты", "Скрипты и SLA 3–5 мин", "Репорты/алерты"],
    effect: "−20–40% отказы",
  },
  {
    title: "Уникальность бренда",
    lead: "Делаем сервис отличимым и любимым.",
    bullets: ["Сигнатурные ритуалы", "Тональность/обещание", "CJM-маркеры"],
    effect: "LTV/повторы",
  },
  {
    title: "Оптимизация UX/UI",
    lead: "Улучшаем путь к действию.",
    bullets: ["Информационная архитектура", "Формы/чекаут", "Микро-копи"],
    effect: "+CR, ↓friction",
  },
  {
    title: "CRM и процессы",
    lead: "От первого касания до повторной продажи.",
    bullets: ["Воронки/лидогенерация", "Статусы/автозадачи", "Отчёты"],
    effect: "SLA, дисциплина",
  },
  {
    title: "Скрипты и SLAs",
    lead: "Быстрые ответы и единый голос бренда.",
    bullets: ["Скрипт-плейбуки", "Автоответы", "Контроль времени"],
    effect: "+Show-Up",
  },
  {
    title: "Обучение команды",
    lead: "Закрепляем изменения в сервисе.",
    bullets: ["Микро-уроки", "Разбор диалогов", "Чек-лист качества"],
    effect: "стабильность",
  },
  {
    title: "A/B-спринты 72 часа",
    lead: "Серия креативов → тест → масштаб.",
    bullets: ["Варианты оффера", "Заголовки/визуалы", "ROAS-контроль"],
    effect: "быстрые победы",
  },
  {
    title: "Маркетплейсы WB/Ozon",
    lead: "Оформление, инфографика и видео-карточки.",
    bullets: ["A+ контент", "Серии визуалов", "Видеопревью"],
    effect: "+просмотры/+конверсия",
  },
  {
    title: "Аналитика и дашборды",
    lead: "Прозрачные цифры и атрибуция.",
    bullets: ["UTM/события", "Дашборды", "Алерты KPI"],
    effect: "управляемость",
  },
];

// Approach cards data
const approachCards = [
  {
    icon: 'bar-chart',
    title: "Данные превыше всего",
    text: "Стратегии строим на поведении и метриках — каждое решение подтверждено цифрами.",
    color: "primary",
  },
  {
    icon: 'layers',
    title: "Комплексный подход",
    text: "От аудита до внедрения — создаём сервис, который работает, вдохновляет и возвращает клиентов.",
    color: "secondary",
  },
  {
    icon: 'zap',
    title: "Скорость реакции",
    text: "На связи 24/7: быстро анализируем, корректируем и поддерживаем стабильный рост.",
    color: "accent",
  },
  {
    icon: 'shield-check',
    title: "Гарантия результата",
    text: "Берём KPI и доводим до цели. Не дотянули — дорабатываем бесплатно.",
    color: "primary",
  },
];

// SVG Icons
const icons = {
  'bar-chart': '<svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="20" x2="12" y2="10"></line><line x1="18" y1="20" x2="18" y2="4"></line><line x1="6" y1="20" x2="6" y2="16"></line></svg>',
  'layers': '<svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>',
  'zap': '<svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>',
  'shield-check': '<svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><polyline points="9 12 11 14 15 10"></polyline></svg>',
  'arrow-right': '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>'
};

// Utility: Scroll to section
function scrollToSection(id) {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
}

// Header scroll effect
function initHeader() {
  const header = document.getElementById('header');
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

// Generate Services cards
function generateServices() {
  const grid = document.getElementById('services-grid');
  
  services.forEach((service, index) => {
    const card = document.createElement('div');
    card.className = 'glass-card service-card';
    card.setAttribute('data-index', index);
    
    card.innerHTML = `
      <div class="service-header">
        <h3 class="service-title">${service.title}</h3>
        <span class="service-badge">${service.effect}</span>
      </div>
      <p class="service-lead">${service.lead}</p>
      <ul class="service-bullets">
        ${service.bullets.map(bullet => `<li>${bullet}</li>`).join('')}
      </ul>
      <button class="service-cta" onclick="scrollToSection('contact')">
        Заказать аудит
        ${icons['arrow-right']}
      </button>
    `;
    
    // Add 3D tilt effect
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (y - centerY) / 20;
      const rotateY = (centerX - x) / 20;
      
      gsap.to(card, {
        rotateX: rotateX,
        rotateY: rotateY,
        duration: 0.3,
        ease: 'power2.out',
      });
    });
    
    card.addEventListener('mouseleave', () => {
      gsap.to(card, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.5,
        ease: 'power2.out',
      });
    });
    
    grid.appendChild(card);
  });
}

// Generate Approach cards
function generateApproachCards() {
  const grid = document.getElementById('approach-grid');
  
  approachCards.forEach((card, index) => {
    const cardEl = document.createElement('div');
    cardEl.className = 'glass-card approach-card';
    cardEl.setAttribute('data-index', index);
    cardEl.style.opacity = '0';
    
    const iconColorClass = card.color === 'accent' 
      ? 'text-accent' 
      : card.color === 'primary' 
      ? 'text-primary' 
      : 'text-secondary';
    
    const iconColorStyle = card.color === 'accent' 
      ? 'color: hsl(var(--accent))' 
      : card.color === 'primary' 
      ? 'color: hsl(var(--primary))' 
      : 'color: hsl(var(--secondary))';
    
    cardEl.innerHTML = `
      <div class="approach-card-overlay"></div>
      <div style="position: relative; z-index: 10;">
        <div class="icon-container">
          <div style="${iconColorStyle}">
            ${icons[card.icon]}
          </div>
        </div>
        <h3>${card.title}</h3>
        <p>${card.text}</p>
      </div>
    `;
    
    // Add hover scale effect
    cardEl.addEventListener('mouseenter', () => {
      gsap.to(cardEl, {
        scale: 1.02,
        duration: 0.3,
        ease: 'power2.out'
      });
    });
    
    cardEl.addEventListener('mouseleave', () => {
      gsap.to(cardEl, {
        scale: 1,
        duration: 0.3,
        ease: 'power2.out'
      });
    });
    
    grid.appendChild(cardEl);
  });
}

// Initialize Hero animations
function initHeroAnimations() {
  const heroTitle = document.getElementById('hero-title');
  
  if (heroTitle) {
    gsap.fromTo(
      heroTitle,
      {
        opacity: 0,
        y: 60,
        filter: 'blur(20px)',
      },
      {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 1.5,
        delay: 0.5,
        ease: 'power3.out',
      }
    );
  }
}

// Initialize Services animations
function initServicesAnimations() {
  const cards = document.querySelectorAll('.service-card');
  
  gsap.fromTo(
    cards,
    {
      opacity: 0,
      y: 40,
    },
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.08,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '#services',
        start: 'top 75%',
        once: true,
      },
    }
  );
}

// Initialize Approach animations
function initApproachAnimations() {
  const title = document.getElementById('approach-title');
  const subtitle = document.getElementById('approach-subtitle');
  
  // Animate title character by character
  if (title) {
    const chars = title.textContent.split('');
    title.innerHTML = chars
      .map(char => `<span style="display: inline-block; opacity: 0; transform: translateY(40px)">${char === ' ' ? '&nbsp;' : char}</span>`)
      .join('');
    
    const charElements = title.querySelectorAll('span');
    gsap.to(charElements, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.05,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: title,
        start: 'top 80%',
        once: true,
      },
    });
  }
  
  // Animate subtitle with blur
  if (subtitle) {
    gsap.fromTo(
      subtitle,
      { opacity: 0, y: 40, filter: 'blur(10px)' },
      {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 0.9,
        delay: 0.3,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: subtitle,
          start: 'top 80%',
          once: true,
        },
      }
    );
  }
  
  // Animate cards
  const cards = document.querySelectorAll('.approach-card');
  cards.forEach((card, index) => {
    const enterDirections = ['left', 'top', 'top', 'right'];
    const direction = enterDirections[index];
    
    const fromProps = { opacity: 0 };
    switch (direction) {
      case 'left': fromProps.x = -40; break;
      case 'right': fromProps.x = 40; break;
      case 'top': fromProps.y = 40; break;
      case 'bottom': fromProps.y = -40; break;
    }
    
    gsap.fromTo(
      card,
      fromProps,
      {
        opacity: 1,
        x: 0,
        y: 0,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: card,
          start: 'top 85%',
          once: true,
        },
      }
    );
  });
}

// Initialize About animations
function initAboutAnimations() {
  const cards = document.querySelectorAll('.about-card');
  
  gsap.fromTo(
    cards,
    {
      opacity: 0,
      y: 30,
    },
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '#about',
        start: 'top 70%',
        once: true,
      },
    }
  );
  
  // Add hover effect with GSAP
  cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      gsap.to(card, {
        scale: 1.02,
        duration: 0.3,
        ease: 'power2.out'
      });
    });
    
    card.addEventListener('mouseleave', () => {
      gsap.to(card, {
        scale: 1,
        duration: 0.3,
        ease: 'power2.out'
      });
    });
  });
}

// Initialize section scroll animations
function initSectionAnimations() {
  const sections = gsap.utils.toArray('section');
  
  sections.forEach(section => {
    gsap.from(section, {
      opacity: 0,
      y: 50,
      duration: 1,
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        end: 'top 50%',
        scrub: 1,
      },
    });
  });
}

// Contact form handler
function initContactForm() {
  const form = document.getElementById('contact-form');
  const messageEl = document.getElementById('form-message');
  
  // Функция для показа сообщения
  function showMessage(text, type = 'success') {
    messageEl.textContent = text;
    messageEl.className = `form-message form-message-${type}`;
    messageEl.style.display = 'block';
    
    // Анимация появления
    gsap.fromTo(messageEl, 
      { opacity: 0, y: -10 },
      { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' }
    );
    
    // Автоматически скрыть через 5 секунд для успешных сообщений
    if (type === 'success') {
      setTimeout(() => {
        gsap.to(messageEl, {
          opacity: 0,
          y: -10,
          duration: 0.3,
          ease: 'power2.in',
          onComplete: () => {
            messageEl.style.display = 'none';
          }
        });
      }, 5000);
    }
  }
  
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Скрыть предыдущие сообщения
    messageEl.style.display = 'none';
    
    const submitBtn = form.querySelector('.form-submit');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<span>Отправка...</span>';
    submitBtn.disabled = true;
    
    try {
      // Создаем FormData для отправки на PHP
      const formData = new FormData(form);
      
      // Отправляем на PHP обработчик
      const response = await fetch('src/send_email.php', {
        method: 'POST',
        body: formData,
      });
      
      const result = await response.json();
      
      if (result.success) {
        showMessage(result.message || 'Сообщение успешно отправлено! Мы свяжемся с вами в ближайшее время.', 'success');
        form.reset();
      } else {
        throw new Error(result.message || 'Ошибка при отправке сообщения');
      }
    } catch (error) {
      console.error('Error:', error);
      
      showMessage('Не удалось отправить сообщение. Пожалуйста, попробуйте позже или свяжитесь с нами через Telegram.', 'error');
      
      // Опционально: fallback to mailto через несколько секунд
      setTimeout(() => {
        const subject = encodeURIComponent('Новое сообщение с сайта ServiceLab');
        const body = encodeURIComponent(
          `Имя: ${form.name.value}\nEmail: ${form.email.value}\nТелефон: ${form.phone.value}\n\nСообщение:\n${form.message.value}`
        );
        window.location.href = `mailto:perchik.des@gmail.com?subject=${subject}&body=${body}`;
      }, 3000);
    } finally {
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
    }
  });
}

// Save UTM parameters
function saveUTMParams() {
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.has('utm_source')) {
    const utmData = {
      utm_source: urlParams.get('utm_source'),
      utm_medium: urlParams.get('utm_medium'),
      utm_campaign: urlParams.get('utm_campaign'),
    };
    localStorage.setItem('utm_data', JSON.stringify(utmData));
  }
}

// Set current year in footer
function setCurrentYear() {
  const yearElement = document.getElementById('current-year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
}

// Initialize all
function init() {
  // Set current year
  setCurrentYear();
  
  // Generate dynamic content
  generateServices();
  generateApproachCards();
  
  // Initialize header
  initHeader();
  
  // Initialize animations
  initHeroAnimations();
  initServicesAnimations();
  initApproachAnimations();
  initAboutAnimations();
  initSectionAnimations();
  
  // Initialize form
  initContactForm();
  
  // Save UTM params
  saveUTMParams();
  
  // Log analytics
  console.log('Analytics: Hero_Viewed');
}

// Run when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
