/* eslint-env browser */
(function () {
  "use strict";
  document.addEventListener("DOMContentLoaded", function () {
    // ::: ADDING COLOR TO NAVBAR ON SCROLL :::
    window.addEventListener("scroll", function () {
      let navbar = document.getElementById("header");
      let scrollPosition = window.scrollY;

      if (scrollPosition > 100) {
        navbar.classList.add("header__scrolled");
      } else {
        navbar.classList.remove("header__scrolled");
      }
    });
  });

  // ::: MOBILE MENU :::
  let hamburgerBtn = document.getElementById("burger");
  let mobileMenuOverlay = document.querySelector(".mobile-menu-overlay");
  let closeBtn = document.querySelector(".mobile-menu-overlay__close-btn");
  let mobileMenu = document.querySelector(".mobile-menu");

  hamburgerBtn.addEventListener("click", function () {
    mobileMenuOverlay.classList.add("mobile-menu-overlay--open");
    mobileMenu.classList.add("mobile-menu--open");
  });

  closeBtn.addEventListener("click", function () {
    mobileMenuOverlay.classList.remove("mobile-menu-overlay--open");
    mobileMenu.classList.remove("mobile-menu--open");
  });
})();
