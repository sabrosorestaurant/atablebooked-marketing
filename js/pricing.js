/* ============================================
   ATableBooked — Pricing Toggle
   Versie: 1.0
   ES5 — geen const/let/arrow/template literals
   ============================================ */

(function () {

  var MONTHLY = 'monthly';
  var YEARLY  = 'yearly';
  var currentMode = MONTHLY;

  var prices = {
    start:   { monthly: '49', yearly: '34' },
    pro:     { monthly: '79', yearly: '55' },
    premium: { monthly: '149', yearly: '104' }
  };

  var yearlyNotes = {
    start:   'Jaarlijks: €408 (bespaar €180)',
    pro:     'Jaarlijks: €658 (bespaar €290)',
    premium: 'Jaarlijks: €1.242 (bespaar €546)'
  };

  function getEl(id) {
    return document.getElementById(id);
  }

  function fadePrice(el, newValue) {
    if (!el) { return; }
    el.style.opacity = '0';
    el.style.transition = 'opacity 180ms ease';
    setTimeout(function () {
      el.textContent = newValue;
      el.style.opacity = '1';
    }, 180);
  }

  function setNote(el, text) {
    if (!el) { return; }
    el.style.opacity = '0';
    setTimeout(function () {
      el.textContent = text;
      el.style.opacity = '1';
      el.style.transition = 'opacity 180ms ease';
    }, 180);
  }

  function clearNote(el) {
    if (!el) { return; }
    el.style.opacity = '0';
    setTimeout(function () {
      el.innerHTML = '&nbsp;';
      el.style.opacity = '1';
    }, 180);
  }

  function applyMode(mode) {
    currentMode = mode;

    var btnMonthly = getEl('toggle-monthly');
    var btnYearly  = getEl('toggle-yearly');
    var saveBadge  = getEl('billing-save-badge');

    if (mode === YEARLY) {
      if (btnMonthly) {
        btnMonthly.classList.remove('active');
        btnMonthly.setAttribute('aria-pressed', 'false');
      }
      if (btnYearly) {
        btnYearly.classList.add('active');
        btnYearly.setAttribute('aria-pressed', 'true');
      }
      if (saveBadge) {
        saveBadge.style.display = 'inline-flex';
      }

      fadePrice(getEl('price-start'),   prices.start.yearly);
      fadePrice(getEl('price-pro'),     prices.pro.yearly);
      fadePrice(getEl('price-premium'), prices.premium.yearly);

      setNote(getEl('yearly-note-start'),   yearlyNotes.start);
      setNote(getEl('yearly-note-pro'),     yearlyNotes.pro);
      setNote(getEl('yearly-note-premium'), yearlyNotes.premium);

    } else {
      if (btnMonthly) {
        btnMonthly.classList.add('active');
        btnMonthly.setAttribute('aria-pressed', 'true');
      }
      if (btnYearly) {
        btnYearly.classList.remove('active');
        btnYearly.setAttribute('aria-pressed', 'false');
      }
      if (saveBadge) {
        saveBadge.style.display = 'none';
      }

      fadePrice(getEl('price-start'),   prices.start.monthly);
      fadePrice(getEl('price-pro'),     prices.pro.monthly);
      fadePrice(getEl('price-premium'), prices.premium.monthly);

      clearNote(getEl('yearly-note-start'));
      clearNote(getEl('yearly-note-pro'));
      clearNote(getEl('yearly-note-premium'));
    }
  }

  function initPricingToggle() {
    var btnMonthly = getEl('toggle-monthly');
    var btnYearly  = getEl('toggle-yearly');
    var saveBadge  = getEl('billing-save-badge');

    if (!btnMonthly || !btnYearly) { return; }

    /* Verberg save-badge initieel
       (maandelijks is de standaard) */
    if (saveBadge) {
      saveBadge.style.display = 'none';
    }

    /* Hover effecten op toggle knoppen */
    btnMonthly.addEventListener('mouseenter', function () {
      btnMonthly.style.opacity = '0.80';
    });
    btnMonthly.addEventListener('mouseleave', function () {
      btnMonthly.style.opacity = '1';
    });
    btnYearly.addEventListener('mouseenter', function () {
      btnYearly.style.opacity = '0.80';
    });
    btnYearly.addEventListener('mouseleave', function () {
      btnYearly.style.opacity = '1';
    });

    btnMonthly.addEventListener('click', function () {
      if (currentMode !== MONTHLY) {
        applyMode(MONTHLY);
      }
    });

    btnYearly.addEventListener('click', function () {
      if (currentMode !== YEARLY) {
        applyMode(YEARLY);
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPricingToggle);
  } else {
    initPricingToggle();
  }

}());
