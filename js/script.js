function scrollToSection(href) {
  const el = document.querySelector(href);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
}

(function () {
  const navbar = document.getElementById('navbar');
  const navButtons = document.querySelectorAll('.nav-links button:not(.btn-hire)');
  const sections = ['hero', 'about', 'skills', 'projects', 'experience', 'contact'];

  function onScroll() {

    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    let current = 'hero';
    for (const id of sections) {
      const el = document.getElementById(id);
      if (el && window.scrollY >= el.offsetTop - 120) {
        current = id;
      }
    }
    navButtons.forEach((btn) => {
      const href = btn.getAttribute('onclick');
      if (href && href.includes(current)) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

function toggleMenu() {
  const menu = document.getElementById('mobileMenu');
  const ham = document.getElementById('hamburger');
  const isOpen = menu.classList.toggle('open');
  ham.classList.toggle('open', isOpen);
}

function closeMenu() {
  document.getElementById('mobileMenu').classList.remove('open');
  document.getElementById('hamburger').classList.remove('open');
}

function filterSkills(btn, category) {
  // Update active button
  document.querySelectorAll('.filter-btn').forEach((b) => b.classList.remove('active'));
  btn.classList.add('active');

  document.querySelectorAll('.skill-card').forEach((card) => {
    if (category === 'all' || card.dataset.category === category) {
      card.classList.remove('hidden');
    } else {
      card.classList.add('hidden');
    }
  });
}

function handleFormSubmit(e) {
  e.preventDefault();
  const btn = document.getElementById('sendBtn');

  btn.disabled = true;
  btn.innerHTML = '<span class="spinner"></span> Sending...';

  setTimeout(() => {
    document.getElementById('contactForm').classList.add('hidden');
    document.getElementById('formSuccess').classList.remove('hidden');
    btn.disabled = false;
    btn.innerHTML = '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg> Send Message';
  }, 1200);
}

function resetForm() {
  document.getElementById('contactForm').reset();
  document.getElementById('contactForm').classList.remove('hidden');
  document.getElementById('formSuccess').classList.add('hidden');
}

(function () {
  const style = document.createElement('style');
  style.textContent = `
    .fade-in { opacity: 0; transform: translateY(20px); transition: opacity 0.6s ease, transform 0.6s ease; }
    .fade-in.visible { opacity: 1; transform: translateY(0); }
  `;
  document.head.appendChild(style);

  const targets = document.querySelectorAll(
    '.skill-card, .project-card, .exp-card, .soft-card, .highlight-item, .section-header, .bio-card, .quick-info-card, .contact-info-card, .contact-form-card'
  );

  targets.forEach((el) => el.classList.add('fade-in'));

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  targets.forEach((el) => observer.observe(el));
})();

function openModal(id) {
  const modal = document.getElementById(id);
  if (!modal) return;
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal(id) {
  const modal = document.getElementById(id);
  if (!modal) return;
  modal.classList.remove('open');
  document.body.style.overflow = '';
}

function closeModalOutside(event, id) {
  if (event.target === event.currentTarget) {
    closeModal(id);
  }
}

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal-overlay.open').forEach(function (m) {
      m.classList.remove('open');
    });
    document.body.style.overflow = '';
  }
});

function switchDemoTab(tabBtn, views, activeId) {
  tabBtn.closest('.demo-topbar').querySelectorAll('.demo-tab').forEach(function(t){ t.classList.remove('active'); });
  tabBtn.classList.add('active');
  views.forEach(function(id){
    var el = document.getElementById(id);
    if (el) el.classList.add('hidden');
  });
  var target = document.getElementById(activeId);
  if (target) target.classList.remove('hidden');
}

function taskTab(btn, view) {
  switchDemoTab(btn, ['demo-task-kanban','demo-task-analytics'], 'demo-task-' + view);
}
function acctTab(btn, view) {
  switchDemoTab(btn, ['demo-acct-overview','demo-acct-transactions'], 'demo-acct-' + view);
}
function analyticsTab(btn, view) {
  switchDemoTab(btn, ['demo-analytics-kpis','demo-analytics-pipeline'], 'demo-analytics-' + view);
}

function demoMoveCard(card) {
  if (card.classList.contains('kanban-card--done') || card.classList.contains('kanban-card--active')) return;
  card.style.transition = 'opacity 0.3s, transform 0.3s';
  card.style.opacity = '0';
  card.style.transform = 'scale(0.9)';
  setTimeout(function() {
    var doneCol = card.closest('.kanban-board').querySelector('.kanban-col:last-child');
    card.classList.add('kanban-card--done');
    card.style.opacity = '';
    card.style.transform = '';
    doneCol.appendChild(card);
    var count = doneCol.querySelector('.kanban-count');
    if (count) count.textContent = doneCol.querySelectorAll('.kanban-card').length;
  }, 300);
}

function switchDemoTab(topbar, views, activeId) {
  topbar.querySelectorAll('.demo-tab').forEach(function(t){ t.classList.remove('active'); });
  views.forEach(function(id){
    var el = document.getElementById(id);
    if (el) el.classList.add('hidden');
  });
  var target = document.getElementById(activeId);
  if (target) target.classList.remove('hidden');
}
function taskTab(btn, view) {
  btn.classList.add('active');
  switchDemoTab(btn.closest('.demo-topbar'), ['demo-task-kanban','demo-task-analytics'], 'demo-task-' + view);
}
function acctTab(btn, view) {
  btn.classList.add('active');
  switchDemoTab(btn.closest('.demo-topbar'), ['demo-acct-overview','demo-acct-transactions'], 'demo-acct-' + view);
}
function analyticsTab(btn, view) {
  btn.classList.add('active');
  switchDemoTab(btn.closest('.demo-topbar'), ['demo-analytics-kpis','demo-analytics-pipeline'], 'demo-analytics-' + view);
}

function demoMoveCard(card) {
  var board = card.closest('.kanban-board');
  var doneCol = board.querySelector('.kanban-col:last-child');
  var todoCol = board.querySelector('.kanban-col:first-child');

  if (card.classList.contains('kanban-card--done')) {
    animateCard(card, function() {
      card.classList.remove('kanban-card--done');
      todoCol.appendChild(card);
      updateCount(doneCol);
      updateCount(todoCol);
    });
    return;
  }
  if (card.classList.contains('kanban-card--active')) return;

  animateCard(card, function() {
    card.classList.add('kanban-card--done');
    doneCol.appendChild(card);
    updateCount(doneCol);
    updateCount(todoCol);
  });
}
function animateCard(card, cb) {
  card.style.transition = 'opacity 0.22s, transform 0.22s';
  card.style.opacity = '0';
  card.style.transform = 'scale(0.9)';
  setTimeout(function() {
    card.style.opacity = '';
    card.style.transform = '';
    cb();
  }, 230);
}
function updateCount(col) {
  var cnt = col.querySelector('.kanban-count');
  if (cnt) cnt.textContent = col.querySelectorAll('.kanban-card').length;
}