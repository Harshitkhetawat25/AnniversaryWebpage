/* ==========================================
   ROMANTIC WEBSITE JAVASCRIPT
   A Love Surprise for Someone Special ❤️
   ========================================== */

// ==========================================
// CONFIGURATION - Customize these values!
// ==========================================

// Set the date you started dating (Year, Month (0-11), Day)
const RELATIONSHIP_START_DATE = new Date(2025, 3, 15); // January 15, 2023

// Typewriter text to display
const TYPEWRITER_TEXT = "Thinking of you... Lolly, so I built this for you.";

// Array of heart emojis for floating effect
const HEART_EMOJIS = ["💕", "💖", "💗", "💓", "💝", "💘", "❤️", "🩷", "🩵", "💜"];

// ==========================================
// DOM ELEMENTS
// ==========================================
const floatingHeartsContainer = document.getElementById("floatingHearts");
const particlesContainer = document.getElementById("particles");
const bgMusic = document.getElementById("bgMusic");
const surpriseBtn = document.getElementById("surpriseBtn");
const loveMessage = document.getElementById("loveMessage");
const typewriterElement = document.getElementById("typewriter");
const secretHeart = document.getElementById("secretHeart");
const secretMessage = document.getElementById("secretMessage");
const missMeBtn = document.getElementById("missMeBtn");
const loveLetter = document.getElementById("loveLetter");
const closeLetter = document.getElementById("closeLetter");
const scrollTopBtn = document.getElementById("scrollTop");

// ==========================================
// FLOATING HEARTS BACKGROUND
// ==========================================
function createFloatingHeart() {
  const heart = document.createElement("span");
  heart.className = "floating-heart";
  heart.textContent =
    HEART_EMOJIS[Math.floor(Math.random() * HEART_EMOJIS.length)];

  // Random positioning and animation
  heart.style.left = Math.random() * 100 + "%";
  heart.style.fontSize = Math.random() * 20 + 15 + "px";
  heart.style.animationDuration = Math.random() * 5 + 5 + "s";
  heart.style.animationDelay = Math.random() * 2 + "s";

  floatingHeartsContainer.appendChild(heart);

  // Remove heart after animation completes
  setTimeout(() => {
    heart.remove();
  }, 13000);
}

// Create hearts continuously
function startFloatingHearts() {
  // Create initial batch
  for (let i = 0; i < 8; i++) {
    setTimeout(createFloatingHeart, i * 300);
  }

  // Continue creating hearts
  setInterval(createFloatingHeart, 1500);
}

// ==========================================
// GLOWING PARTICLES
// ==========================================
function createParticles() {
  for (let i = 0; i < 30; i++) {
    const particle = document.createElement("div");
    particle.className = "particle";
    particle.style.left = Math.random() * 100 + "%";
    particle.style.top = Math.random() * 100 + "%";
    particle.style.animationDelay = Math.random() * 4 + "s";
    particle.style.animationDuration = Math.random() * 3 + 2 + "s";
    particlesContainer.appendChild(particle);
  }
}

// ==========================================
// TYPEWRITER EFFECT
// ==========================================
function typeWriter(text, element, speed = 80) {
  let index = 0;
  element.textContent = "";

  function type() {
    if (index < text.length) {
      element.textContent += text.charAt(index);
      index++;
      setTimeout(type, speed);
    }
  }

  type();
}

// ==========================================
// SURPRISE BUTTON INTERACTION
// ==========================================
let surpriseActivated = false;

function activateSurprise() {
  if (surpriseActivated) return;
  surpriseActivated = true;

  // Try to play background music
  bgMusic.volume = 0.3;
  bgMusic.play().catch(() => {
    console.log("Audio autoplay blocked - user interaction required");
  });

  // Create burst of hearts
  burstHearts(50);

  // Show love message after a short delay
  setTimeout(() => {
    loveMessage.classList.remove("hidden");
    document.body.style.overflow = "hidden"; // Prevent scrolling
  }, 1000);

  // Change button text
  surpriseBtn.innerHTML =
    '<span>You Found My Heart 💕</span><div class="btn-glow"></div>';
}

// Close surprise message
function closeSurpriseMessage() {
  loveMessage.classList.add("hidden");
  document.body.style.overflow = "auto"; // Re-enable scrolling

  // // Pause music
  // bgMusic.pause();
  // bgMusic.currentTime = 0;

  // Reset surprise state so button works again
  surpriseActivated = false;

  // Reset button text
  surpriseBtn.innerHTML =
    '<span>Click for a Surprise 💌</span><div class="btn-glow"></div>';
}

// Burst hearts from bottom
function burstHearts(count) {
  for (let i = 0; i < count; i++) {
    setTimeout(() => {
      const heart = document.createElement("span");
      heart.className = "burst-heart";
      heart.textContent =
        HEART_EMOJIS[Math.floor(Math.random() * HEART_EMOJIS.length)];
      heart.style.left = Math.random() * 100 + "%";
      heart.style.bottom = "0";
      heart.style.fontSize = Math.random() * 20 + 20 + "px";
      document.body.appendChild(heart);

      setTimeout(() => heart.remove(), 2000);
    }, i * 50);
  }
}

// ==========================================
// IMAGE SLIDESHOW
// ==========================================
let currentSlide = 0;
let slideInterval;
const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");

function showSlide(index) {
  // Handle index bounds
  if (index >= slides.length) currentSlide = 0;
  else if (index < 0) currentSlide = slides.length - 1;
  else currentSlide = index;

  // Hide all slides
  slides.forEach((slide) => {
    slide.classList.remove("active");
  });

  // Remove active from all dots
  dots.forEach((dot) => {
    dot.classList.remove("active");
  });

  // Show current slide and activate dot
  slides[currentSlide].classList.add("active");
  dots[currentSlide].classList.add("active");
}

function changeSlide(direction) {
  showSlide(currentSlide + direction);
  resetSlideInterval();
}

function goToSlide(index) {
  showSlide(index);
  resetSlideInterval();
}

function startSlideshow() {
  slideInterval = setInterval(() => {
    showSlide(currentSlide + 1);
  }, 4000);
}

function resetSlideInterval() {
  clearInterval(slideInterval);
  startSlideshow();
}

// ==========================================
// COUNTDOWN TIMER (CALENDAR-ACCURATE)
// ==========================================

/**
 * Calculate calendar-accurate date difference
 * This accounts for actual month lengths (28, 29, 30, 31 days)
 * @param {Date} startDate - The relationship start date
 * @param {Date} endDate - The current date
 * @returns {Object} - Years, months, days, hours, minutes, seconds
 */
function calculateDateDifference(startDate, endDate) {
  let years = endDate.getFullYear() - startDate.getFullYear();
  let months = endDate.getMonth() - startDate.getMonth();
  let days = endDate.getDate() - startDate.getDate();
  let hours = endDate.getHours() - startDate.getHours();
  let minutes = endDate.getMinutes() - startDate.getMinutes();
  let seconds = endDate.getSeconds() - startDate.getSeconds();

  // Handle negative seconds
  if (seconds < 0) {
    seconds += 60;
    minutes--;
  }

  // Handle negative minutes
  if (minutes < 0) {
    minutes += 60;
    hours--;
  }

  // Handle negative hours
  if (hours < 0) {
    hours += 24;
    days--;
  }

  // Handle negative days
  if (days < 0) {
    months--;
    // Get the number of days in the previous month
    const previousMonth = new Date(
      endDate.getFullYear(),
      endDate.getMonth(),
      0
    );
    days += previousMonth.getDate();
  }

  // Handle negative months
  if (months < 0) {
    months += 12;
    years--;
  }

  return { years, months, days, hours, minutes, seconds };
}

/**
 * Calculate total time units from milliseconds
 * @param {number} milliseconds - Time difference in milliseconds
 * @returns {Object} - Total days, hours, minutes, seconds
 */
function calculateTotalUnits(milliseconds) {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const totalMinutes = Math.floor(milliseconds / (1000 * 60));
  const totalHours = Math.floor(milliseconds / (1000 * 60 * 60));
  const totalDays = Math.floor(milliseconds / (1000 * 60 * 60 * 24));

  return { totalDays, totalHours, totalMinutes, totalSeconds };
}

/**
 * Main countdown update function
 * Updates all timer displays with calendar-accurate calculations
 */
function updateCountdown() {
  const now = new Date();
  const diffInMs = now - RELATIONSHIP_START_DATE;

  // ===== A. Calendar-Accurate Years/Months/Days Timer =====
  const { years, months, days, hours, minutes, seconds } =
    calculateDateDifference(RELATIONSHIP_START_DATE, now);

  // ===== B-E. Total Time Units =====
  const { totalDays, totalHours, totalMinutes, totalSeconds } =
    calculateTotalUnits(diffInMs);

  // ===== Update DOM Elements =====

  // Primary Timer (Years/Months/Days/Hours/Minutes/Seconds)
  const yearsEl = document.getElementById("years");
  const monthsEl = document.getElementById("months");
  const daysEl = document.getElementById("days");
  const hoursEl = document.getElementById("hours");
  const minutesEl = document.getElementById("minutes");
  const secondsEl = document.getElementById("seconds");

  if (yearsEl) yearsEl.textContent = years;
  if (monthsEl) monthsEl.textContent = months;
  if (daysEl) daysEl.textContent = days;
  if (hoursEl) hoursEl.textContent = hours;
  if (minutesEl) minutesEl.textContent = minutes;
  if (secondsEl) secondsEl.textContent = seconds;

  // Optional: Update total counters if you add them to HTML
  // Total Days Counter
  const totalDaysEl = document.getElementById("totalDays");
  if (totalDaysEl) {
    totalDaysEl.textContent = totalDays.toLocaleString();
  }

  // Total Hours Counter
  const totalHoursEl = document.getElementById("totalHours");
  if (totalHoursEl) {
    totalHoursEl.textContent = totalHours.toLocaleString();
  }

  // Total Minutes Counter
  const totalMinutesEl = document.getElementById("totalMinutes");
  if (totalMinutesEl) {
    totalMinutesEl.textContent = totalMinutes.toLocaleString();
  }

  // Total Seconds Counter
  const totalSecondsEl = document.getElementById("totalSeconds");
  if (totalSecondsEl) {
    totalSecondsEl.textContent = totalSeconds.toLocaleString();
  }

  // Debug logging (remove in production)
  // console.log(`Time Together: ${years}y ${months}m ${days}d ${hours}h ${minutes}min ${seconds}s`);
  // console.log(`Total Days: ${totalDays} | Total Hours: ${totalHours}`);
}

// ==========================================
// SCROLL ANIMATIONS FOR LOVE LINES
// ==========================================
function handleScrollAnimations() {
  const loveLines = document.querySelectorAll(".love-line");

  loveLines.forEach((line) => {
    const rect = line.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    if (rect.top < windowHeight * 0.85) {
      line.classList.add("visible");
    }
  });

  // Show/hide scroll to top button
  if (window.scrollY > 500) {
    scrollTopBtn.classList.add("visible");
  } else {
    scrollTopBtn.classList.remove("visible");
  }
}

// ==========================================
// SECRET HEART MESSAGE
// ==========================================
function toggleSecretMessage() {
  if (secretMessage.classList.contains("hidden")) {
    secretHeart.style.display = "none";
    secretMessage.classList.remove("hidden");
    burstHearts(20);
  } else {
    secretHeart.style.display = "block";
    secretMessage.classList.add("hidden");
  }
}

// ==========================================
// LOVE LETTER POPUP
// ==========================================
function openLoveLetter() {
  loveLetter.classList.remove("hidden");
  document.body.style.overflow = "hidden";
  burstHearts(30);
}

function closeLoveLetter() {
  loveLetter.classList.add("hidden");
  document.body.style.overflow = "auto";
}

// ==========================================
// SCROLL TO TOP
// ==========================================
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

// ==========================================
// MICRO-INTERACTIONS
// ==========================================
function addMicroInteractions() {
  // Add hover sound effect simulation (visual feedback)
  const buttons = document.querySelectorAll("button");
  buttons.forEach((btn) => {
    btn.addEventListener("mouseenter", () => {
      btn.style.transition = "all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)";
    });
  });

  // Add click ripple effect to cards
  const cards = document.querySelectorAll(
    ".surprise-card, .countdown-item, .love-line"
  );
  cards.forEach((card) => {
    card.addEventListener("click", function (e) {
      const ripple = document.createElement("span");
      ripple.style.cssText = `
                position: absolute;
                width: 20px;
                height: 20px;
                background: rgba(255, 105, 180, 0.4);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
            `;

      const rect = this.getBoundingClientRect();
      ripple.style.left = e.clientX - rect.left - 10 + "px";
      ripple.style.top = e.clientY - rect.top - 10 + "px";

      this.style.position = "relative";
      this.style.overflow = "hidden";
      this.appendChild(ripple);

      setTimeout(() => ripple.remove(), 600);
    });
  });
}

// Add ripple animation keyframes dynamically
const rippleStyle = document.createElement("style");
rippleStyle.textContent = `
    @keyframes ripple {
        to {
            transform: scale(20);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// ==========================================
// PARALLAX EFFECT (Subtle)
// ==========================================
function addParallaxEffect() {
  window.addEventListener("mousemove", (e) => {
    const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
    const moveY = (e.clientY - window.innerHeight / 2) * 0.01;

    floatingHeartsContainer.style.transform = `translate(${moveX}px, ${moveY}px)`;
  });
}

// ==========================================
// TOUCH SUPPORT FOR MOBILE
// ==========================================
function addTouchSupport() {
  let touchStartX = 0;
  let touchEndX = 0;

  const slideshowContainer = document.querySelector(".slideshow-container");

  if (slideshowContainer) {
    slideshowContainer.addEventListener("touchstart", (e) => {
      touchStartX = e.changedTouches[0].screenX;
    });

    slideshowContainer.addEventListener("touchend", (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    });
  }

  function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;

    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        changeSlide(1); // Swipe left - next
      } else {
        changeSlide(-1); // Swipe right - prev
      }
    }
  }
}

// ==========================================
// KEYBOARD NAVIGATION
// ==========================================
function addKeyboardNavigation() {
  document.addEventListener("keydown", (e) => {
    switch (e.key) {
      case "ArrowLeft":
        changeSlide(-1);
        break;
      case "ArrowRight":
        changeSlide(1);
        break;
      case "Escape":
        loveMessage.classList.add("hidden");
        loveLetter.classList.add("hidden");
        document.body.style.overflow = "auto";
        break;
    }
  });
}

// ==========================================
// INITIALIZE EVERYTHING
// ==========================================
function init() {
  // Start floating hearts
  startFloatingHearts();

  // Create particles
  createParticles();

  // Start typewriter effect
  setTimeout(() => {
    typeWriter(TYPEWRITER_TEXT, typewriterElement);
  }, 500);

  // Start slideshow
  startSlideshow();

  // Start countdown
  updateCountdown();
  setInterval(updateCountdown, 1000);

  // Initial scroll check
  handleScrollAnimations();

  // Add micro-interactions
  addMicroInteractions();

  // Add parallax effect (desktop only)
  if (window.innerWidth > 768) {
    addParallaxEffect();
  }

  // Add touch support
  addTouchSupport();

  // Add keyboard navigation
  addKeyboardNavigation();

  // Event Listeners
  if (surpriseBtn) {
    surpriseBtn.addEventListener("click", activateSurprise);
  }

  // Close surprise message button
  const closeSurpriseBtn = document.getElementById("closeSurprise");
  if (closeSurpriseBtn) {
    closeSurpriseBtn.addEventListener("click", closeSurpriseMessage);
  }

  if (secretHeart) {
    secretHeart.addEventListener("click", toggleSecretMessage);
  }

  if (secretMessage) {
    secretMessage.addEventListener("click", toggleSecretMessage);
  }

  if (missMeBtn) {
    missMeBtn.addEventListener("click", openLoveLetter);
  }

  if (closeLetter) {
    closeLetter.addEventListener("click", closeLoveLetter);
  }

  if (scrollTopBtn) {
    scrollTopBtn.addEventListener("click", scrollToTop);
  }

  // Close love letter when clicking outside
  if (loveLetter) {
    loveLetter.addEventListener("click", (e) => {
      if (e.target === loveLetter) {
        closeLoveLetter();
      }
    });
  }

  // Scroll event listener
  window.addEventListener("scroll", handleScrollAnimations);

  // Console love message for developers 💕
  console.log("%c💖 Made with Love 💖", "font-size: 24px; color: #FF69B4;");
  console.log(
    "%cThis website was created to celebrate our beautiful love story.",
    "font-size: 14px; color: #FF69B4;"
  );
}

// Wait for DOM to be fully loaded
document.addEventListener("DOMContentLoaded", init);

// ==========================================
// BONUS: Easter Egg - Konami Code
// ==========================================
let konamiCode = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];
let konamiIndex = 0;

document.addEventListener("keydown", (e) => {
  if (e.key === konamiCode[konamiIndex]) {
    konamiIndex++;
    if (konamiIndex === konamiCode.length) {
      // Trigger special animation
      burstHearts(100);

      // Show special message
      const specialMsg = document.createElement("div");
      specialMsg.innerHTML = `
                <div style="
                    position: fixed;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    background: linear-gradient(135deg, #FFE4EC, #E6E6FA);
                    padding: 40px;
                    border-radius: 30px;
                    box-shadow: 0 20px 60px rgba(255,105,180,0.5);
                    z-index: 9999;
                    text-align: center;
                    animation: fadeInUp 0.5s ease;
                ">
                    <h2 style="font-family: 'Great Vibes', cursive; font-size: 2.5rem; color: #FF69B4;">
                        🎉 You Found the Secret! 🎉
                    </h2>
                    <p style="font-family: 'Dancing Script', cursive; font-size: 1.5rem; color: #666; margin-top: 20px;">
                        "I love you infinity times infinity!"
                    </p>
                    <span style="font-size: 4rem; display: block; margin-top: 20px;">💖✨💖</span>
                </div>
            `;
      document.body.appendChild(specialMsg);

      setTimeout(() => specialMsg.remove(), 5000);
      konamiIndex = 0;
    }
  } else {
    konamiIndex = 0;
  }
});
