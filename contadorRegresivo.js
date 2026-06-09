document.addEventListener('DOMContentLoaded', function () {
  const target = new Date('2026-06-13T07:00:00');
  const pad = n => String(n).padStart(2, '0');
  const progressFill = document.getElementById('progress-fill');

  const tzEl = document.getElementById('local-tz');
  if (tzEl) {
    tzEl.textContent = 'Hora local: ' + target.toLocaleString('es-PE', {
      weekday: 'long', day: 'numeric', month: 'long',
      hour: '2-digit', minute: '2-digit'
    });
  }

  const totalMs = Math.max(1, target - new Date());

  function tick() {
    const diff = target - new Date();

    if (diff <= 0) {
      const grid = document.getElementById('countdown-grid');
      if (grid) {
        grid.innerHTML = '<p style="font-size:18px; margin:0;">¡Ya comenzó!</p>';
      }
      if (progressFill) {
        progressFill.style.width = '100%';
      }
      return;
    }

    document.getElementById('days').textContent = pad(Math.floor(diff / 86400000));
    document.getElementById('hours').textContent = pad(Math.floor((diff % 86400000) / 3600000));
    document.getElementById('minutes').textContent = pad(Math.floor((diff % 3600000) / 60000));
    document.getElementById('seconds').textContent = pad(Math.floor((diff % 60000) / 1000));

    if (progressFill) {
      const pct = Math.min(100, Math.max(0, Math.round(((totalMs - diff) / totalMs) * 100)));
      progressFill.style.width = pct + '%';
    }

    setTimeout(tick, 1000);
  }

  tick();
});