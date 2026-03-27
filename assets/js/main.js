/* Sallanches.info — main.js */

document.addEventListener('DOMContentLoaded', function () {



  /* ---- SONDAGE ---- */
  var options = document.querySelectorAll('.sondage-option');
  if (options.length > 0) {
    var storageKey = 'sondage_' + (document.querySelector('.sondage-card') ? document.querySelector('.sondage-card').dataset.id || 'default' : 'default');
    var voted = localStorage.getItem(storageKey);

    if (voted) {
      showResults(voted);
    }

    options.forEach(function (btn) {
      btn.addEventListener('click', function () {
        if (localStorage.getItem(storageKey)) return;
        var val = btn.dataset.value;
        localStorage.setItem(storageKey, val);
        showResults(val);
      });
    });

    function showResults(votedValue) {
      var total = 0;
      var votes = {};
      options.forEach(function (btn) {
        var v = btn.dataset.value;
        var count = parseInt(btn.dataset.votes || '0', 10);
        if (v === votedValue) count += 1;
        votes[v] = count;
        total += count;
      });

      options.forEach(function (btn) {
        var v = btn.dataset.value;
        var pct = total > 0 ? Math.round((votes[v] / total) * 100) : 0;
        var bar = btn.querySelector('.progress-bar');
        var pctEl = btn.querySelector('.option-pct');
        if (bar) bar.style.width = pct + '%';
        if (pctEl) pctEl.textContent = pct + '%';
        if (v === votedValue) btn.classList.add('voted');
        btn.setAttribute('aria-pressed', v === votedValue ? 'true' : 'false');
      });

      var footer = document.querySelector('.sondage-footer');
      if (footer) {
        var totalVotes = total;
        footer.textContent = totalVotes + ' votant' + (totalVotes > 1 ? 's' : '');
      }
    }
  }

  /* ---- SKIP TO MAIN (accessibilité) ---- */
  var skipLink = document.querySelector('a[href="#main-content"]');
  if (skipLink) {
    skipLink.addEventListener('click', function (e) {
      e.preventDefault();
      var main = document.getElementById('main-content');
      if (main) { main.focus(); }
    });
  }

  /* ---- BREAKING NEWS TICKER - defilement si debordement ---- */
  var ticker = document.querySelector('.breaking-ticker');
  var tickerWrap = document.querySelector('.breaking-ticker-wrap');
  if (ticker && tickerWrap) {
    var checkTicker = function() {
      if (ticker.scrollWidth > tickerWrap.clientWidth) {
        // Texte deborde - dupliquer et activer l'animation
        if (!ticker.dataset.duplicated) {
          var original = ticker.querySelector('span:first-child');
          if (original) {
            var clone = document.createElement('span');
            clone.setAttribute('aria-hidden', 'true');
            clone.textContent = '   ' + original.textContent;
            ticker.appendChild(clone);
            ticker.dataset.duplicated = 'true';
          }
        }
        ticker.classList.add('is-overflow');
      } else {
        ticker.classList.remove('is-overflow');
        // Supprimer le doublon si plus nécessaire
        var spans = ticker.querySelectorAll('span[aria-hidden]');
        spans.forEach(function(s) { s.remove(); });
        ticker.dataset.duplicated = '';
      }
    };
    checkTicker();
    window.addEventListener('resize', checkTicker);
  }

  /* ---- LAZY LOAD images nativement (fallback) ---- */
  if ('loading' in HTMLImageElement.prototype) {
    var lazyImgs = document.querySelectorAll('img[loading="lazy"]');
    lazyImgs.forEach(function (img) { img.src = img.dataset.src || img.src; });
  }

});

// Ouverture et fermeture du menu burger
document.addEventListener("DOMContentLoaded", () => {
  const burgerBtn = document.getElementById("burger-btn");
  const mobileMenu = document.getElementById("mobile-menu");
  const closeBtn = document.getElementById("mobile-close");

  if (burgerBtn && mobileMenu) {
    burgerBtn.addEventListener("click", () => {
      mobileMenu.classList.add("is-open");
    });
  }
  if (closeBtn && mobileMenu) {
    closeBtn.addEventListener("click", () => {
      mobileMenu.classList.remove("is-open");
    });
  }
});
