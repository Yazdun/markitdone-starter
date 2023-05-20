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
  const currentItemDisplay = document.getElementById("activeIndex");
  let currentIndex = 0;
  let isAnimating = false;

  // Show the initial item
  carouselItems[currentIndex].classList.add("active");
  updateCurrentItemDisplay();
  updateButtonState();

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
      updateCurrentItemDisplay();
      updateButtonState();
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
      updateCurrentItemDisplay();
      updateButtonState();
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

  // Function to automatically show the next item every 5 seconds
  let timer = setInterval(showNextItem, 5000);

  // Function to reset the auto-show timer
  function resetAutoShowTimer() {
    clearInterval(timer);
    timer = setInterval(showNextItem, 5000);
  }

  // Function to update the current active item display
  function updateCurrentItemDisplay() {
    currentItemDisplay.textContent = currentIndex + 1;
  }

  // Function to update the button state
  function updateButtonState() {
    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex === carouselItems.length - 1;
  }

  // ::: FORM MODAL :::
  const modalTrigger = document.querySelector(".modal-trigger");
  const modal = document.getElementById("modal");
  const modalClose = document.querySelector("[data-modal-close]");

  // Test modal functionality
  // modalTrigger.addEventListener("click", function () {
  //   modal.classList.add("modal--open");
  // });

  modalClose.addEventListener("click", function () {
    modal.classList.remove("modal--open");
  });

  // ::: FORM VALIDATION
  const reservationForm = document.getElementById("reservationForm");
  const decreaseBtn = document.getElementById("decreaseBtn");
  const increaseBtn = document.getElementById("increaseBtn");
  const peopleInput = document.getElementById("people");

  // Decrease button event listener
  decreaseBtn.addEventListener("click", function () {
    if (peopleInput.value > 1) {
      peopleInput.value--;
    }
  });

  // Increase button event listener
  increaseBtn.addEventListener("click", function () {
    peopleInput.value++;
  });

  // Form submit event listener
  reservationForm.addEventListener("submit", function (event) {
    event.preventDefault();
    if (validateForm()) {
      // Form is valid, you can proceed with form submission or further processing
      modal.classList.add("modal--open");
      reservationForm.reset();
    }
  });

  // Function to validate the form fields
  function validateForm() {
    let isValid = true;

    // Validate name field
    const nameInput = document.getElementById("name");
    if (nameInput.value.trim() === "") {
      isValid = false;
      setErrorFor(nameInput, "Please enter your name");
    } else {
      setSuccessFor(nameInput);
    }

    // Validate phone field
    const phoneInput = document.getElementById("phone");
    const phoneRegex = /^\d{10}$/; // Assumes a 10-digit phone number
    if (!phoneRegex.test(phoneInput.value.trim())) {
      isValid = false;
      setErrorFor(phoneInput, "Please enter a valid phone number");
    } else {
      setSuccessFor(phoneInput);
    }

    // Validate email field
    const emailInput = document.getElementById("email");
    const emailRegex = /^\S+@\S+\.\S+$/; // Basic email validation regex
    if (!emailRegex.test(emailInput.value.trim())) {
      isValid = false;
      setErrorFor(emailInput, "Please enter a valid email address");
    } else {
      setSuccessFor(emailInput);
    }

    // Validate date field
    const dateInput = document.getElementById("date");
    const currentDate = new Date().toISOString().split("T")[0]; // Get current date
    if (dateInput.value.trim() === "" || dateInput.value < currentDate) {
      isValid = false;
      setErrorFor(dateInput, "Please choose a valid date");
    } else {
      setSuccessFor(dateInput);
    }

    // Validate time field
    const timeInput = document.getElementById("time");
    if (timeInput.value.trim() === "") {
      isValid = false;
      setErrorFor(timeInput, "Please enter a time");
    } else {
      setSuccessFor(timeInput);
    }

    // Validate number of people field
    if (peopleInput.value < 1) {
      isValid = false;
      setErrorFor(peopleInput, "Number of people must be at least 1");
    } else {
      setSuccessFor(peopleInput);
    }

    return isValid;
  }

  // Function to set error state for a field
  function setErrorFor(input, errorMessage) {
    const formControl = input.parentElement;
    const errorText = formControl.querySelector(".error");
    errorText.innerText = errorMessage;
  }

  // Function to set success state for a field
  function setSuccessFor(input) {
    const formControl = input.parentElement;
    const errorText = formControl.querySelector(".error");
    errorText.innerText = "";
  }

  // ::: FOOTER :::
  const footerDate = document.getElementById("footerData");
  const currentYear = new Date().getFullYear();
  footerDate.innerText = currentYear;
})();
