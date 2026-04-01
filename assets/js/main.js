/* Sallanches.info — main.js */

document.addEventListener('DOMContentLoaded', function () {

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
