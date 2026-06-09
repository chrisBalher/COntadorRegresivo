document.addEventListener('DOMContentLoaded', function () {
    const petalsContainer = document.getElementById('petals');

    if (petalsContainer) {
        for (let i = 0; i < 18; i++) {
            const petal = document.createElement('div');
            petal.className = 'petal';
            petal.style.left = Math.random() * 100 + '%';
            petal.style.animationDuration = (4 + Math.random() * 6) + 's';
            petal.style.animationDelay = (Math.random() * 8) + 's';
            const size = (6 + Math.random() * 8) + 'px';
            petal.style.width = size;
            petal.style.height = size;
            petal.style.background = ['#f9a8c0', '#fce4ec', '#e06080', '#ffcdd2'][Math.floor(Math.random() * 4)];
            petalsContainer.appendChild(petal);
        }
    }

    const target = new Date('2026-06-13T07:00:00');
    const pad = n => String(n).padStart(2, '0');
    const totalMs = Math.max(1, target.getTime() - Date.now());

    const tzEl = document.getElementById('local-tz');
    if (tzEl) {
        tzEl.textContent = 'Hora local: ' + target.toLocaleString('es-PE', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    function updateCountdown() {
        const diff = target.getTime() - Date.now();

        if (diff <= 0) {
            const grid = document.getElementById('countdown-grid');
            if (grid) {
                grid.innerHTML = '<p style="font-family:\'Playfair Display\',serif;font-size:20px;font-style:italic;color:#c0304a">¡El momento ha llegado! ♡</p>';
            }

            const fill = document.getElementById('progress-fill');
            if (fill) fill.style.width = '100%';

            const note = document.getElementById('progress-note');
            if (note) note.textContent = '100% del camino recorrido ♡';
            return;
        }

        const days = Math.floor(diff / 86400000);
        const hours = Math.floor((diff % 86400000) / 3600000);
        const minutes = Math.floor((diff % 3600000) / 60000);
        const seconds = Math.floor((diff % 60000) / 1000);

        const daysEl = document.getElementById('days');
        const hoursEl = document.getElementById('hours');
        const minutesEl = document.getElementById('minutes');
        const secondsEl = document.getElementById('seconds');

        if (daysEl) daysEl.textContent = pad(days);
        if (hoursEl) hoursEl.textContent = pad(hours);
        if (minutesEl) minutesEl.textContent = pad(minutes);
        if (secondsEl) secondsEl.textContent = pad(seconds);

        const pct = Math.min(100, Math.max(0, Math.round(((totalMs - diff) / totalMs) * 100)));
        const fill = document.getElementById('progress-fill');
        if (fill) fill.style.width = pct + '%';

        const note = document.getElementById('progress-note');
        if (note) note.textContent = pct + '% del camino recorrido ♡';
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);
});