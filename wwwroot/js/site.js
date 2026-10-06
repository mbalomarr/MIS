// PMU MIS Hub — site-wide behaviour: icons, sticky header, mobile menu, form submit state.
(function () {
  "use strict";

  // --- Lucide icons: replace every <i data-lucide="..."> with its SVG ---
  if (window.lucide) {
    window.lucide.createIcons({ attrs: { "stroke-width": 1.8 } });
  }

  var header = document.getElementById("site-header");
  var toggle = document.getElementById("menu-toggle");
  var menu = document.getElementById("mobile-menu");
  var menuOpen = false;

  // --- Header turns solid once scrolled, or while the mobile menu is open ---
  function updateHeader() {
    if (!header) return;
    header.dataset.solid = String(menuOpen || window.scrollY > 12);
  }

  // --- Mobile menu ---
  function setMenu(open) {
    if (!toggle || !menu) return;
    menuOpen = open;
    menu.hidden = !open;
    toggle.setAttribute("aria-expanded", String(open));
    toggle.querySelector("[data-menu-label]").textContent = open ? "Close menu" : "Open menu";
    toggle.querySelector('[data-menu-icon="open"]').classList.toggle("hidden", open);
    toggle.querySelector('[data-menu-icon="close"]').classList.toggle("hidden", !open);
    document.body.style.overflow = open ? "hidden" : "";
    updateHeader();
  }

  if (toggle && menu) {
    toggle.addEventListener("click", function () { setMenu(!menuOpen); });
    menu.querySelectorAll("[data-menu-link]").forEach(function (link) {
      link.addEventListener("click", function () { setMenu(false); });
    });
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && menuOpen) {
        setMenu(false);
        toggle.focus();
      }
    });
    window.matchMedia("(min-width: 1024px)").addEventListener("change", function (event) {
      if (event.matches) setMenu(false);
    });
  }

  window.addEventListener("scroll", updateHeader, { passive: true });
  updateHeader();

  // --- Join form: spinner + disabled button while submitting (only when the form is valid) ---
  var form = document.getElementById("join-form");
  var submit = document.getElementById("join-submit");
  if (form && submit) {
    form.addEventListener("submit", function () {
      var $ = window.jQuery;
      if ($ && $.fn.valid && !$(form).valid()) return;
      submit.disabled = true;
      submit.querySelector("[data-spinner]").classList.remove("hidden");
      submit.querySelector("[data-label]").textContent = "Submitting…";
    });
  }
})();
