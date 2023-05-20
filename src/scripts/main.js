/* eslint-env browser */
(function () {
  ("use strict");
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

  // ::: CAROUSEL :::
  const carouselItems = document.querySelectorAll(".c-carousel-item");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  let currentIndex = 0;
  let isAnimating = false;

  // Show the initial item
  carouselItems[currentIndex].classList.add("active");

  // Function to show the next item
  function showNextItem() {
    if (isAnimating) return;
    isAnimating = true;
    carouselItems[currentIndex].classList.remove("active");
    carouselItems[currentIndex].classList.add("prev");
    currentIndex = (currentIndex + 1) % carouselItems.length;
    carouselItems[currentIndex].classList.add("next");
    setTimeout(() => {
      carouselItems[currentIndex].classList.add("active");
      carouselItems[currentIndex].classList.remove("next");
      carouselItems[currentIndex].addEventListener(
        "transitionend",
        () => {
          carouselItems[currentIndex].classList.remove("prev");
          isAnimating = false;
        },
        { once: true }
      );
    }, 10);
  }

  // Function to show the previous item
  function showPrevItem() {
    if (isAnimating) return;
    isAnimating = true;
    carouselItems[currentIndex].classList.remove("active");
    carouselItems[currentIndex].classList.add("next");
    currentIndex =
      (currentIndex - 1 + carouselItems.length) % carouselItems.length;
    carouselItems[currentIndex].classList.add("prev");
    setTimeout(() => {
      carouselItems[currentIndex].classList.add("active");
      carouselItems[currentIndex].classList.remove("prev");
      carouselItems[currentIndex].addEventListener(
        "transitionend",
        () => {
          carouselItems[currentIndex].classList.remove("next");
          isAnimating = false;
        },
        { once: true }
      );
    }, 10);
  }

  // Event listener for next button
  nextBtn.addEventListener("click", function () {
    showNextItem();
    resetAutoShowTimer();
  });

  // Event listener for previous button
  prevBtn.addEventListener("click", function () {
    showPrevItem();
    resetAutoShowTimer();
  });
})();
