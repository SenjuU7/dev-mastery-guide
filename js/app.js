// ─────────────────────────────────────────
// STATE
// ─────────────────────────────────────────
let currentChapter = -1;
const completed    = {};
const allChapters  = [...pandasChapters, ...sqlChapters, ...rustChapters];

// ─────────────────────────────────────────
// NAVIGATION BUILD
// ─────────────────────────────────────────
function buildNav() {
  const pNav = document.getElementById('pandasNav');
  const sNav = document.getElementById('sqlNav');
  const rNav = document.getElementById('rustNav');

  pandasChapters.forEach((ch, i) => {
    pNav.innerHTML += `<div class="nav-item" id="nav-${i}" onclick="goChapter(${i})">
      <div class="nav-num">${ch.num}</div>
      <span>${ch.title}</span>
      <span class="nav-tag tag-pandas">PD</span>
    </div>`;
  });

  sqlChapters.forEach((ch, i) => {
    const gi = pandasChapters.length + i;
    sNav.innerHTML += `<div class="nav-item" id="nav-${gi}" onclick="goChapter(${gi})">
      <div class="nav-num">${ch.num}</div>
      <span>${ch.title}</span>
      <span class="nav-tag tag-sql">SQL</span>
    </div>`;
  });

  rustChapters.forEach((ch, i) => {
    const gi = pandasChapters.length + sqlChapters.length + i;
    rNav.innerHTML += `<div class="nav-item" id="nav-${gi}" onclick="goChapter(${gi})">
      <div class="nav-num">${ch.num}</div>
      <span>${ch.title}</span>
      <span class="nav-tag tag-rust">RS</span>
    </div>`;
  });
}

// ─────────────────────────────────────────
// CHAPTER BUILD
// ─────────────────────────────────────────
function buildChapters() {
  const container = document.getElementById('chaptersContainer');

  allChapters.forEach((ch, ci) => {
    const typeLabel = ch.type === 'rust' ? 'Rust 🦀' : ch.type === 'sql' ? 'PostgreSQL' : 'Pandas';
    const dotCls    = ch.type === 'rust' ? 'rust'    : ch.type === 'sql' ? 'sql'         : '';

    const div = document.createElement('div');
    div.className = 'chapter';
    div.id = `ch-${ci}`;
    div.innerHTML = `
      <div class="chapter-hero">
        <div class="hero-eyebrow">
          <div class="hero-dot ${dotCls}"></div>
          ${typeLabel} · Bab ${ch.num}
        </div>
        <div class="chapter-title">${ch.title}</div>
        <div class="chapter-subtitle">${ch.subtitle}</div>
      </div>
      <div class="tabs" id="tabs-${ci}">
        ${ch.tabs.map((t,ti) => `<div class="tab ${ti===0?'active':''}" onclick="switchTab(${ci},${ti})">${t}</div>`).join('')}
      </div>
      ${ch.tabs.map((t,ti) => `
        <div class="tab-panel ${ti===0?'active':''}" id="panel-${ci}-${ti}">
          ${ch.content[t] || ''}
        </div>`).join('')}
      <div class="completion-zone" id="cz-${ci}">
        <div class="completion-card" id="cc-${ci}">
          <div class="cc-icon">📋</div>
          <div class="cc-text">
            <div class="cc-title">Sudah selesai membaca bab ini?</div>
            <div class="cc-sub">Tandai selesai agar progress kamu tercatat</div>
          </div>
          <button class="cc-btn" onclick="markDone(${ci})">✓ Tandai Selesai</button>
        </div>
        <div class="completion-done" id="cd-${ci}" style="display:none">
          <div class="cd-check">✓</div>
          <div class="cd-text">Bab selesai!</div>
        </div>
      </div>
      <div class="nav-row">
        <button class="topbar-btn" onclick="prevChapter()" ${ci===0?'disabled':''}>← Sebelumnya</button>
        <span class="nav-counter">${ci+1} / ${allChapters.length}</span>
        <button class="topbar-btn primary" onclick="nextChapter()" ${ci===allChapters.length-1?'disabled':''}>Selanjutnya →</button>
      </div>
    `;
    container.appendChild(div);
  });
}

// ─────────────────────────────────────────
// TAB SWITCHING
// ─────────────────────────────────────────
function switchTab(ci, ti) {
  document.querySelectorAll(`#tabs-${ci} .tab`).forEach((t,i) => t.classList.toggle('active', i===ti));
  document.querySelectorAll(`[id^="panel-${ci}-"]`).forEach((p,i) => p.classList.toggle('active', i===ti));
}

// ─────────────────────────────────────────
// COMPLETION
// ─────────────────────────────────────────
function markDone(ci) {
  if (completed[ci]) return;
  completed[ci] = true;

  document.getElementById(`cc-${ci}`).style.display = 'none';
  document.getElementById(`cd-${ci}`).style.display = 'flex';

  const navEl = document.getElementById(`nav-${ci}`);
  if (navEl) navEl.classList.add('done');

  updateProgress();
}

// ─────────────────────────────────────────
// CHAPTER NAVIGATION
// ─────────────────────────────────────────
function goChapter(i) {
  if (currentChapter === -1) {
    document.getElementById('ch-landing').classList.remove('active');
  } else {
    const prev = document.getElementById(`ch-${currentChapter}`);
    if (prev) prev.classList.remove('active');
    const pn = document.getElementById(`nav-${currentChapter}`);
    if (pn) pn.classList.remove('active');
  }

  currentChapter = i;
  const ch = allChapters[i];

  document.getElementById(`ch-${i}`).classList.add('active');

  const nn = document.getElementById(`nav-${i}`);
  if (nn) {
    nn.classList.add('active');
    if (!completed[i]) nn.classList.remove('done');
  }

  // update topbar
  const badge = document.getElementById('topBadge');
  const typeMap = { sql: 'PostgreSQL', rust: 'Rust 🦀', pandas: 'Pandas' };
  badge.textContent = typeMap[ch.type] || 'Pandas';
  badge.className   = 'chapter-badge' + (ch.type === 'sql' ? ' sql' : ch.type === 'rust' ? ' rust' : '');
  document.getElementById('topTitle').textContent = ch.title;
  document.getElementById('btnPrev').disabled = i === 0;
  document.getElementById('btnNext').disabled = i === allChapters.length - 1;

  updateProgress();
  window.scrollTo({ top: 0, behavior: 'smooth' });
  if (window.innerWidth < 768) closeSidebar();
}

function nextChapter() { if (currentChapter < allChapters.length - 1) goChapter(currentChapter + 1); }
function prevChapter() { if (currentChapter > 0) goChapter(currentChapter - 1); }

// ─────────────────────────────────────────
// PROGRESS
// ─────────────────────────────────────────
function updateProgress() {
  const done  = Object.keys(completed).length;
  const total = allChapters.length;
  document.getElementById('progressInfo').textContent = `${done} / ${total} selesai`;
  document.getElementById('progressFill').style.width = (done / total * 100) + '%';
}

// ─────────────────────────────────────────
// MOBILE SETUP
// ─────────────────────────────────────────
function handleResize() {
  const toggle = document.getElementById('mobileToggle');
  const sidebar = document.getElementById('sidebar');
  const main = document.querySelector('.main');

  if (window.innerWidth <= 768) {
    // mobile
    toggle.style.display = 'flex';
    main.style.marginLeft = '0';
    if (!sidebar.classList.contains('open')) {
      sidebar.style.transform = 'translateX(-100%)';
    }
  } else {
    // desktop
    toggle.style.display = 'none';
    main.style.marginLeft = '260px';
    sidebar.style.transform = 'translateX(0)';
    document.getElementById('sidebarOverlay').classList.remove('visible');
  }
}

// ─────────────────────────────────────────
// SIDEBAR
// ─────────────────────────────────────────
function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebarOverlay');
  const isOpen = sidebar.classList.toggle('open');
  sidebar.style.transform = isOpen ? 'translateX(0)' : 'translateX(-100%)';
  overlay.classList.toggle('visible', isOpen);
}

function closeSidebar() {
  const sidebar = document.getElementById('sidebar');
  sidebar.classList.remove('open');
  sidebar.style.transform = 'translateX(-100%)';
  document.getElementById('sidebarOverlay').classList.remove('visible');
}

// ─────────────────────────────────────────
// INIT
// ─────────────────────────────────────────
buildNav();
buildChapters();
handleResize();
window.addEventListener('resize', handleResize);
