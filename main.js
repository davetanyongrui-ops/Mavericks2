/* ==========================================================================
   THE MAVERICKS - BATAM YOUTH MOVEMENT
   Interactive JavaScript Functionality with Multilingual Support (ID, EN, ZH)
   ========================================================================== */

let currentLang = localStorage.getItem('preferred_lang') || 'id';

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Language Switcher System
  initLanguageSwitcher();

  // Initialize Mobile Navigation Toggle
  initMobileNav();
  
  // Initialize Animated Counters
  initCounters();
  
  // Initialize Gallery Filter & Lightbox
  initGallery();
  
  // Initialize Quiz Challenge
  initQuiz();
  
  // Initialize Volunteer Form & Newsletter
  initVolunteerForm();
  
  // Initialize Active Nav Scrolling
  initScrollSpy();
});

/* 0. Language Switcher & i18n Handler */
function applyLanguage(lang) {
  if (typeof translations === 'undefined' || !translations[lang]) lang = 'id';
  currentLang = lang;
  localStorage.setItem('preferred_lang', lang);
  document.documentElement.lang = lang;

  // Update button current lang label
  const currentLangText = document.getElementById('current-lang-text');
  if (currentLangText) {
    currentLangText.textContent = lang.toUpperCase();
  }

  // Update active option highlight in dropdown
  document.querySelectorAll('.lang-option').forEach(opt => {
    if (opt.getAttribute('data-lang') === lang) {
      opt.classList.add('active');
    } else {
      opt.classList.remove('active');
    }
  });

  // Update all elements with data-i18n attribute
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (translations[lang] && translations[lang][key]) {
      el.textContent = translations[lang][key];
    }
  });

  // Update input placeholders with data-i18n-placeholder
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (translations[lang] && translations[lang][key]) {
      el.placeholder = translations[lang][key];
    }
  });

  // Update dynamic Lightbox triggers
  document.querySelectorAll('.lightbox-trigger').forEach(trigger => {
    const titleKey = trigger.getAttribute('data-title-key');
    const descKey = trigger.getAttribute('data-desc-key');
    if (titleKey && translations[lang] && translations[lang][titleKey]) {
      trigger.setAttribute('data-title', translations[lang][titleKey]);
    }
    if (descKey && translations[lang] && translations[lang][descKey]) {
      trigger.setAttribute('data-desc', translations[lang][descKey]);
    }
  });

  // Notify components (e.g. quiz) of language change
  document.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang } }));
}

function initLanguageSwitcher() {
  const switcher = document.getElementById('lang-switcher');
  const langBtn = document.getElementById('lang-btn');
  const langOptions = document.querySelectorAll('.lang-option');

  if (switcher && langBtn) {
    langBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      switcher.classList.toggle('open');
    });

    langOptions.forEach(opt => {
      opt.addEventListener('click', (e) => {
        e.stopPropagation();
        const targetBtn = e.target.closest('.lang-option') || opt;
        const selectedLang = targetBtn.getAttribute('data-lang');
        if (selectedLang) {
          applyLanguage(selectedLang);
        }
        switcher.classList.remove('open');
      });
    });

    document.addEventListener('click', (e) => {
      if (switcher && !switcher.contains(e.target)) {
        switcher.classList.remove('open');
      }
    });
  }

  // Apply active or saved language on load
  applyLanguage(currentLang);
}

/* 1. Mobile Navigation Toggle */
function initMobileNav() {
  const mobileToggle = document.getElementById('mobile-toggle');
  const navLinks = document.getElementById('nav-links');

  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      navLinks.classList.toggle('nav-open');
      const icon = mobileToggle.querySelector('i');
      if (navLinks.classList.contains('nav-open')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-xmark');
      } else {
        icon.classList.remove('fa-xmark');
        icon.classList.add('fa-bars');
      }
    });

    // Close mobile menu on link click
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('nav-open');
        const icon = mobileToggle.querySelector('i');
        if (icon) {
          icon.classList.remove('fa-xmark');
          icon.classList.add('fa-bars');
        }
      });
    });
  }
}

/* 2. Animated Number Counters */
function initCounters() {
  const trustNums = document.querySelectorAll('.trust-num');
  let animated = false;

  function runCounters() {
    trustNums.forEach(counter => {
      const target = +counter.getAttribute('data-target');
      const duration = 2000;
      const step = Math.ceil(target / (duration / 16));
      let current = 0;

      const updateCount = () => {
        current += step;
        if (current >= target) {
          counter.innerText = target;
        } else {
          counter.innerText = current;
          requestAnimationFrame(updateCount);
        }
      };
      updateCount();
    });
  }

  // Intersection Observer to trigger counters when visible
  const heroSection = document.querySelector('.hero-section');
  if (heroSection && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !animated) {
          animated = true;
          runCounters();
        }
      });
    }, { threshold: 0.3 });
    observer.observe(heroSection);
  } else {
    runCounters();
  }
}

/* 3. Gallery Filtering & Lightbox Modal */
function initGallery() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');
  
  // Filtering
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      galleryItems.forEach(item => {
        const category = item.getAttribute('data-category');
        if (filter === 'all' || filter === category) {
          item.classList.remove('hidden-item');
          item.style.animation = 'fadeIn 0.4s ease forward';
        } else {
          item.classList.add('hidden-item');
        }
      });
    });
  });

  // Lightbox Modal
  const modal = document.getElementById('lightbox-modal');
  const backdrop = document.getElementById('lightbox-backdrop');
  const closeBtn = document.getElementById('lightbox-close');
  const imgEl = document.getElementById('lightbox-img');
  const titleEl = document.getElementById('lightbox-title');
  const descEl = document.getElementById('lightbox-desc');
  const triggers = document.querySelectorAll('.lightbox-trigger');

  triggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.stopPropagation();
      const imgSrc = trigger.getAttribute('data-img');
      const title = trigger.getAttribute('data-title');
      const desc = trigger.getAttribute('data-desc');

      if (imgEl && modal) {
        imgEl.src = imgSrc;
        titleEl.textContent = title;
        descEl.textContent = desc;
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  const closeModal = () => {
    if (modal) {
      modal.classList.add('hidden');
      document.body.style.overflow = '';
    }
  };

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (backdrop) backdrop.addEventListener('click', closeModal);
  
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && !modal.classList.contains('hidden')) {
      closeModal();
    }
  });
}

/* 4. Interactive Quiz / Curiosity Challenge */
function initQuiz() {
  let currentIndex = 0;
  let score = 0;
  let answered = []; // track answered state per question: null | 'correct' | 'wrong'

  const stepLabelEl   = document.getElementById('quiz-step-label');
  const progressFill  = document.getElementById('quiz-progress-fill');
  const dotsContainer = document.getElementById('quiz-progress-dots');
  const questionEl    = document.getElementById('quiz-question-text');
  const optionsEl     = document.getElementById('quiz-options-container');
  const feedbackEl    = document.getElementById('quiz-feedback');
  const feedbackTitle = document.getElementById('quiz-feedback-title');
  const feedbackDesc  = document.getElementById('quiz-feedback-desc');
  const prevBtn       = document.getElementById('quiz-prev-btn');
  const nextBtn       = document.getElementById('quiz-next-btn');
  const activeScreen  = document.getElementById('quiz-active');
  const completedEl   = document.getElementById('quiz-completed');
  const scoreDisplay  = document.getElementById('quiz-score-display');
  const restartBtn    = document.getElementById('quiz-restart-btn');

  if (!questionEl || !optionsEl) return;

  function getQuestions() {
    return translations[currentLang]?.questions || translations['id'].questions;
  }

  function initAnswered(questions) {
    answered = questions.map(() => null);
    score = 0;
  }

  function updateDots(questions) {
    const dots = dotsContainer ? dotsContainer.querySelectorAll('.quiz-dot') : [];
    dots.forEach((dot, i) => {
      dot.classList.remove('active', 'answered', 'wrong');
      if (i === currentIndex) dot.classList.add('active');
      else if (answered[i] === 'correct') dot.classList.add('answered');
      else if (answered[i] === 'wrong') dot.classList.add('wrong');
    });
  }

  function renderQuestion() {
    const questions = getQuestions();
    const total = questions.length;
    const q = questions[currentIndex];

    // Step label
    const stepFormat = translations[currentLang]?.quiz_step_format || 'Question {current} of {total}';
    if (stepLabelEl) {
      stepLabelEl.textContent = stepFormat
        .replace('{current}', currentIndex + 1)
        .replace('{total}', total);
    }

    // Progress bar
    if (progressFill) {
      progressFill.style.width = `${((currentIndex + 1) / total) * 100}%`;
    }

    // Dots
    updateDots(questions);

    // Question text
    questionEl.textContent = q.question;

    // Options
    optionsEl.innerHTML = '';
    q.options.forEach((opt, idx) => {
      const btn = document.createElement('button');
      btn.className = 'quiz-opt';
      btn.setAttribute('data-correct', opt.correct ? 'true' : 'false');
      btn.setAttribute('data-index', idx);
      btn.innerHTML = `<span class="opt-letter">${opt.letter}</span><span>${opt.text}</span>`;

      // Restore visual state if already answered
      if (answered[currentIndex] === 'correct') {
        if (opt.correct) {
          btn.style.borderColor = 'var(--accent-sage)';
          btn.style.backgroundColor = '#EBF3EE';
        }
        btn.disabled = true;
      } else if (answered[currentIndex] === 'wrong') {
        btn.disabled = true;
        if (opt.correct) {
          btn.style.borderColor = 'var(--accent-sage)';
          btn.style.backgroundColor = '#EBF3EE';
        }
      }

      btn.addEventListener('click', () => handleAnswer(btn, q, opt.correct));
      optionsEl.appendChild(btn);
    });

    // Feedback visibility
    if (feedbackEl) {
      if (answered[currentIndex] === 'correct') {
        feedbackEl.classList.remove('hidden');
        if (feedbackTitle) feedbackTitle.textContent = q.feedbackTitle;
        if (feedbackDesc) feedbackDesc.textContent = q.feedbackDesc;
      } else {
        feedbackEl.classList.add('hidden');
      }
    }

    // Nav buttons
    if (prevBtn) prevBtn.style.display = currentIndex > 0 ? 'inline-flex' : 'none';
    if (nextBtn) {
      if (answered[currentIndex]) {
        nextBtn.style.display = 'inline-flex';
        if (currentIndex === total - 1) {
          nextBtn.textContent = translations[currentLang]?.quiz_finish_btn || 'See Results';
        } else {
          nextBtn.textContent = translations[currentLang]?.quiz_next_btn || 'Next Question';
        }
      } else {
        nextBtn.style.display = 'none';
      }
    }
  }

  function handleAnswer(btn, q, isCorrect) {
    if (answered[currentIndex]) return; // already answered

    const allBtns = optionsEl.querySelectorAll('.quiz-opt');
    allBtns.forEach(b => b.disabled = true);

    if (isCorrect) {
      btn.style.borderColor = 'var(--accent-sage)';
      btn.style.backgroundColor = '#EBF3EE';
      answered[currentIndex] = 'correct';
      score++;

      if (feedbackEl) {
        feedbackEl.classList.remove('hidden');
        if (feedbackTitle) feedbackTitle.textContent = q.feedbackTitle;
        if (feedbackDesc) feedbackDesc.textContent = q.feedbackDesc;
      }
    } else {
      btn.style.borderColor = 'var(--primary-terracotta)';
      btn.style.backgroundColor = '#FBEBE6';
      // Highlight the correct one
      allBtns.forEach(b => {
        if (b.getAttribute('data-correct') === 'true') {
          b.style.borderColor = 'var(--accent-sage)';
          b.style.backgroundColor = '#EBF3EE';
        }
      });
      answered[currentIndex] = 'wrong';
      const wrongAlert = translations[currentLang]?.quiz_wrong_alert || 'Good effort! Think it through once more.';
      setTimeout(() => alert(wrongAlert), 50);
    }

    updateDots(getQuestions());

    // Show next button
    const questions = getQuestions();
    if (nextBtn) {
      nextBtn.style.display = 'inline-flex';
      if (currentIndex === questions.length - 1) {
        nextBtn.textContent = translations[currentLang]?.quiz_finish_btn || 'See Results';
        nextBtn.setAttribute('data-i18n', '');
      } else {
        nextBtn.textContent = translations[currentLang]?.quiz_next_btn || 'Next Question';
      }
    }
  }

  function showCompletion() {
    const questions = getQuestions();
    if (activeScreen) activeScreen.style.display = 'none';
    if (completedEl) completedEl.classList.remove('hidden');
    if (scoreDisplay) {
      const pct = Math.round((score / questions.length) * 100);
      scoreDisplay.textContent = `${score} / ${questions.length}  (${pct}%)`;
    }
  }

  function restart() {
    const questions = getQuestions();
    currentIndex = 0;
    initAnswered(questions);
    if (completedEl) completedEl.classList.add('hidden');
    if (activeScreen) activeScreen.style.display = '';
    renderQuestion();
  }

  // Prev button
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      if (currentIndex > 0) {
        currentIndex--;
        renderQuestion();
      }
    });
  }

  // Next button
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      const questions = getQuestions();
      if (currentIndex === questions.length - 1) {
        showCompletion();
      } else {
        currentIndex++;
        renderQuestion();
      }
    });
  }

  // Restart button
  if (restartBtn) {
    restartBtn.addEventListener('click', restart);
  }

  // Init
  const questions = getQuestions();
  initAnswered(questions);
  renderQuestion();

  // Re-render when language changes
  document.addEventListener('languageChanged', () => {
    const newQuestions = getQuestions();
    initAnswered(newQuestions);
    currentIndex = 0;
    if (completedEl) completedEl.classList.add('hidden');
    if (activeScreen) activeScreen.style.display = '';
    renderQuestion();
  });
}

/* 5. Volunteer Sign-Up Form & Newsletter */
function initVolunteerForm() {
  const form = document.getElementById('volunteer-form');
  const successState = document.getElementById('form-success');
  const resetBtn = document.getElementById('reset-form-btn');

  if (form && successState) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const nameInput = document.getElementById('vol-name');
      const phoneInput = document.getElementById('vol-phone');
      const roleSelect = document.getElementById('vol-role');
      const notesInput = document.getElementById('vol-notes');

      const name = nameInput ? nameInput.value.trim() : '';
      const phone = phoneInput ? phoneInput.value.trim() : '';
      const roleText = roleSelect && roleSelect.options[roleSelect.selectedIndex] ? roleSelect.options[roleSelect.selectedIndex].text : '';
      const notes = notesInput ? notesInput.value.trim() : '';

      if (!name || !phone) {
        const emptyAlert = translations[currentLang]?.form_alert_empty || "Mohon isi nama lengkap dan nomor WhatsApp Kamu!";
        alert(emptyAlert);
        return;
      }

      // Format WhatsApp Message
      let waMessage = `Halo Tim The Mavericks Batam!\n\nSaya ingin mendaftar sebagai relawan.\n\n👤 *Nama*: ${name}\n📱 *No. WhatsApp*: ${phone}\n🎯 *Peran Yang Diminati*: ${roleText}`;
      if (notes) {
        waMessage += `\n💬 *Pesan/Catatan*: ${notes}`;
      }

      const waNumber = '6281371352788';
      const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(waMessage)}`;

      // Open WhatsApp in new tab
      window.open(waUrl, '_blank');

      form.classList.add('hidden');
      successState.classList.remove('hidden');
    });

    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        form.reset();
        successState.classList.add('hidden');
        form.classList.remove('hidden');
      });
    }
  }
}

/* 6. ScrollSpy Nav Highlighting */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}
