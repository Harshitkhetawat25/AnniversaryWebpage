/* ==========================================
   ROMANTIC WEBSITE JAVASCRIPT
   A Love Surprise for Someone Special ❤️
   ========================================== */

// ==========================================
// QUESTION GATE SYSTEM
// ==========================================

const questions = [
  {
    question: "Are you ready for the surprise?",
    options: ["Yes!", "Very excited!", "Thrilled!"],
    correctAnswers: ["Yes!", "Very excited!", "Thrilled!"], // All correct
  },
  {
    question: "Do you love me?",
    options: ["Yes, very much!", "Infinite ♾️", "More than anything!"],
    correctAnswers: ["Yes, very much!", "Infinite ♾️", "More than anything!"], // All correct
  },
  {
    question: "When is our Anniversary?",
    options: [
      "15 April 2025",
      "14 April 2025",
      "16 April 2025",
      "1 April 2025",
      "15 May 2025",
      "20 March 2025",
    ],
    correctAnswers: ["15 April 2025"],
  },
  {
    question: "When did You officially propose for the first time?",
    options: [
      "8 May 2025",
      "7 May 2025",
      "9 May 2025",
      "1 May 2025",
      "18 May 2025",
      "8 June 2025",
    ],
    correctAnswers: ["8 May 2025"],
  },
  {
    question: "What is our official 'Love Goal'?",
    options: [
      "To grow old together",
      "To travel the world",
      "To buy a big house",
      "To eat pizza every day",
      "To be best friends forever",
      "To never stop dating",
    ],
    correctAnswers: ["To grow old together"],
  },
  {
    question: "How many times a day do I think of you?",
    options: [
      "Every single second",
      "100 times",
      "1000 times",
      "Only when I'm awake",
      "When I'm dreaming",
      "Every hour",
    ],
    correctAnswers: ["Every single second"],
  },
  {
    question: "Who is the luckiest person in the world?",
    options: [
      "Me, because I have you ❤️",
      "Elon Musk",
      "A lottery winner",
      "The President",
      "Everyone else",
    ],
    correctAnswers: ["Me, because I have you ❤️"],
  },
];

let currentQuestion = 0;

// Sound Effects
const correctSound = document.getElementById("correctSound");
const wrongSound = document.getElementById("wrongSound");
const celebrationSound = document.getElementById("celebrationSound");

// Play sound helper function
function playSound(sound) {
  if (sound) {
    sound.currentTime = 0;
    sound.volume = 0.5;
    sound.play().catch(() => {
      console.log("Sound autoplay blocked");
    });
  }
}

// DOM Elements for Question Gate
const questionGate = document.getElementById("questionGate");
const questionTitle = document.getElementById("questionTitle");
const questionNumber = document.getElementById("questionNumber");
const optionsContainer = document.getElementById("optionsContainer");
const wrongAnswerOverlay = document.getElementById("wrongAnswerOverlay");
const celebrationOverlay = document.getElementById("celebrationOverlay");
const confettiContainer = document.getElementById("confettiContainer");
const mainContent = document.getElementById("mainContent");

// Shuffle array function
function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// Render current question
function renderQuestion() {
  const q = questions[currentQuestion];
  questionTitle.textContent = q.question;

  // Clear previous options
  optionsContainer.innerHTML = "";

  // Shuffle options for variety
  const shuffledOptions = shuffleArray(q.options);

  // Create option buttons
  shuffledOptions.forEach((option) => {
    const btn = document.createElement("button");
    btn.className = "option-btn";
    btn.textContent = option;
    btn.addEventListener("click", () => handleAnswer(option));
    optionsContainer.appendChild(btn);
  });
}

// Handle answer selection
function handleAnswer(selectedOption) {
  const q = questions[currentQuestion];
  const isCorrect = q.correctAnswers.includes(selectedOption);

  if (isCorrect) {
    // Play correct sound
    playSound(correctSound);

    // Correct answer - burst hearts animation
    createGateBurstHearts();

    // Move to next question or complete
    if (currentQuestion < questions.length - 1) {
      currentQuestion++;
      setTimeout(() => {
        renderQuestion();
      }, 500);
    } else {
      // All questions completed!
      showCelebration();
    }
  } else {
    // Wrong answer - show message and reset
    showWrongAnswer();
  }
}

// Create burst hearts for correct answer
function createGateBurstHearts() {
  const hearts = ["💕", "💖", "💗", "💓", "💝", "❤️"];
  for (let i = 0; i < 20; i++) {
    setTimeout(() => {
      const heart = document.createElement("span");
      heart.className = "gate-burst-heart";
      heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
      heart.style.left = Math.random() * 100 + "%";
      heart.style.top = "50%";
      heart.style.fontSize = Math.random() * 20 + 20 + "px";
      document.body.appendChild(heart);

      setTimeout(() => heart.remove(), 1500);
    }, i * 50);
  }
}

// Show wrong answer overlay
function showWrongAnswer() {
  // Play wrong sound
  playSound(wrongSound);

  wrongAnswerOverlay.classList.remove("hidden");

  // Wait 2.5 seconds, then reset to question 1
  setTimeout(() => {
    wrongAnswerOverlay.classList.add("hidden");
    currentQuestion = 0; // RESET TO QUESTION 1
    renderQuestion();
  }, 2500);
}

// Show celebration and reveal website
function showCelebration() {
  // Play celebration sound
  playSound(celebrationSound);

  questionGate.classList.add("hidden");
  celebrationOverlay.classList.remove("hidden");

  // Create confetti
  createConfetti();

  // After celebration, reveal the main content
  setTimeout(() => {
    celebrationOverlay.classList.add("hidden");
    mainContent.classList.remove("hidden");

    // Initialize the main website
    initMainWebsite();
  }, 3500);
}

// Create confetti animation
function createConfetti() {
  const colors = [
    "#ff69b4",
    "#ff007f",
    "#ffd700",
    "#ff6b6b",
    "#ffb6c1",
    "#e6e6fa",
    "#ff1493",
  ];
  const shapes = ["❤️", "💖", "💕", "✨", "🌟", "💗", "🎉"];

  for (let i = 0; i < 100; i++) {
    setTimeout(() => {
      const confetti = document.createElement("span");
      confetti.className = "confetti";
      confetti.textContent = shapes[Math.floor(Math.random() * shapes.length)];
      confetti.style.left = Math.random() * 100 + "%";
      confetti.style.animationDelay = Math.random() * 0.5 + "s";
      confetti.style.animationDuration = Math.random() * 2 + 2 + "s";
      confettiContainer.appendChild(confetti);

      setTimeout(() => confetti.remove(), 4000);
    }, i * 30);
  }
}

// Initialize the question gate
function initQuestionGate() {
  renderQuestion();
}

// Start question gate when page loads
initQuestionGate();

// ==========================================
// MAIN WEBSITE INITIALIZATION
// ==========================================

function initMainWebsite() {
  // Re-query DOM elements after content is visible
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
  // CONFIGURATION - Customize these values!
  // ==========================================

  // Set the date you started dating (Year, Month (0-11), Day)
  const RELATIONSHIP_START_DATE = new Date(2025, 3, 15); // April 15, 2025

  // Typewriter text to display
  const TYPEWRITER_TEXT = "Thinking of you... Lolly, so I built this for you.";

  // Array of heart emojis for floating effect
  const HEART_EMOJIS = [
    "💕",
    "💖",
    "💗",
    "💓",
    "💝",
    "💘",
    "❤️",
    "💕",
    "💝",
    "💜",
  ];

  // ==========================================
  // FLOATING HEARTS BACKGROUND
  // ==========================================
  function createFloatingHeart() {
    const heart = document.createElement("span");
    heart.className = "floating-heart";
    heart.textContent =
      HEART_EMOJIS[Math.floor(Math.random() * HEART_EMOJIS.length)];

    heart.style.left = Math.random() * 100 + "%";
    heart.style.fontSize = Math.random() * 20 + 15 + "px";
    heart.style.animationDuration = Math.random() * 5 + 5 + "s";
    heart.style.animationDelay = Math.random() * 2 + "s";

    floatingHeartsContainer.appendChild(heart);

    setTimeout(() => {
      heart.remove();
    }, 13000);
  }

  function startFloatingHearts() {
    for (let i = 0; i < 8; i++) {
      setTimeout(createFloatingHeart, i * 300);
    }
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

    bgMusic.volume = 0.3;
    bgMusic.play().catch(() => {
      console.log("Audio autoplay blocked - user interaction required");
    });

    burstHearts(50);

    setTimeout(() => {
      loveMessage.classList.remove("hidden");
      document.body.style.overflow = "hidden";
    }, 1000);

    surpriseBtn.innerHTML =
      '<span>You Found My Heart 💕</span><div class="btn-glow"></div>';
  }

  function closeSurpriseMessage() {
    loveMessage.classList.add("hidden");
    document.body.style.overflow = "auto";
    surpriseActivated = false;
    surpriseBtn.innerHTML =
      '<span>Click for a Surprise 💌</span><div class="btn-glow"></div>';
  }

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
    if (index >= slides.length) currentSlide = 0;
    else if (index < 0) currentSlide = slides.length - 1;
    else currentSlide = index;

    slides.forEach((slide) => slide.classList.remove("active"));
    dots.forEach((dot) => dot.classList.remove("active"));

    slides[currentSlide].classList.add("active");
    dots[currentSlide].classList.add("active");
  }

  window.changeSlide = function (direction) {
    showSlide(currentSlide + direction);
    resetSlideInterval();
  };

  window.goToSlide = function (index) {
    showSlide(index);
    resetSlideInterval();
  };

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
  function calculateDateDifference(startDate, endDate) {
    let years = endDate.getFullYear() - startDate.getFullYear();
    let months = endDate.getMonth() - startDate.getMonth();
    let days = endDate.getDate() - startDate.getDate();
    let hours = endDate.getHours() - startDate.getHours();
    let minutes = endDate.getMinutes() - startDate.getMinutes();
    let seconds = endDate.getSeconds() - startDate.getSeconds();

    if (seconds < 0) {
      seconds += 60;
      minutes--;
    }
    if (minutes < 0) {
      minutes += 60;
      hours--;
    }
    if (hours < 0) {
      hours += 24;
      days--;
    }
    if (days < 0) {
      months--;
      const previousMonth = new Date(
        endDate.getFullYear(),
        endDate.getMonth(),
        0
      );
      days += previousMonth.getDate();
    }
    if (months < 0) {
      months += 12;
      years--;
    }

    return { years, months, days, hours, minutes, seconds };
  }

  function calculateTotalUnits(milliseconds) {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const totalMinutes = Math.floor(milliseconds / (1000 * 60));
    const totalHours = Math.floor(milliseconds / (1000 * 60 * 60));
    const totalDays = Math.floor(milliseconds / (1000 * 60 * 60 * 24));
    return { totalDays, totalHours, totalMinutes, totalSeconds };
  }

  function updateCountdown() {
    const now = new Date();
    const diffInMs = now - RELATIONSHIP_START_DATE;
    const { years, months, days, hours, minutes, seconds } =
      calculateDateDifference(RELATIONSHIP_START_DATE, now);
    const { totalDays, totalHours, totalMinutes, totalSeconds } =
      calculateTotalUnits(diffInMs);

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

    const totalDaysEl = document.getElementById("totalDays");
    if (totalDaysEl) totalDaysEl.textContent = totalDays.toLocaleString();

    const totalHoursEl = document.getElementById("totalHours");
    if (totalHoursEl) totalHoursEl.textContent = totalHours.toLocaleString();

    const totalMinutesEl = document.getElementById("totalMinutes");
    if (totalMinutesEl)
      totalMinutesEl.textContent = totalMinutes.toLocaleString();

    const totalSecondsEl = document.getElementById("totalSeconds");
    if (totalSecondsEl)
      totalSecondsEl.textContent = totalSeconds.toLocaleString();
  }

  // ==========================================
  // SCROLL ANIMATIONS
  // ==========================================
  function handleScrollAnimations() {
    const loveLines = document.querySelectorAll(".love-line");
    loveLines.forEach((line) => {
      const rect = line.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.85) {
        line.classList.add("visible");
      }
    });

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
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // ==========================================
  // MICRO-INTERACTIONS
  // ==========================================
  function addMicroInteractions() {
    const buttons = document.querySelectorAll("button");
    buttons.forEach((btn) => {
      btn.addEventListener("mouseenter", () => {
        btn.style.transition =
          "all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)";
      });
    });

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

  // Add ripple animation
  const rippleStyle = document.createElement("style");
  rippleStyle.textContent = `
    @keyframes ripple {
      to { transform: scale(20); opacity: 0; }
    }
  `;
  document.head.appendChild(rippleStyle);

  // ==========================================
  // PARALLAX EFFECT
  // ==========================================
  function addParallaxEffect() {
    window.addEventListener("mousemove", (e) => {
      const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
      const moveY = (e.clientY - window.innerHeight / 2) * 0.01;
      floatingHeartsContainer.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });
  }

  // ==========================================
  // TOUCH SUPPORT
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
        const diff = touchStartX - touchEndX;
        if (Math.abs(diff) > 50) {
          if (diff > 0) changeSlide(1);
          else changeSlide(-1);
        }
      });
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
  // INITIALIZE MAIN WEBSITE
  // ==========================================
  startFloatingHearts();
  createParticles();

  setTimeout(() => {
    typeWriter(TYPEWRITER_TEXT, typewriterElement);
  }, 500);

  startSlideshow();
  updateCountdown();
  setInterval(updateCountdown, 1000);
  handleScrollAnimations();
  addMicroInteractions();

  if (window.innerWidth > 768) {
    addParallaxEffect();
  }

  addTouchSupport();
  addKeyboardNavigation();

  // Event Listeners
  if (surpriseBtn) {
    surpriseBtn.addEventListener("click", activateSurprise);
  }

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

  if (loveLetter) {
    loveLetter.addEventListener("click", (e) => {
      if (e.target === loveLetter) closeLoveLetter();
    });
  }

  window.addEventListener("scroll", handleScrollAnimations);

  console.log("%c💖 Made with Love 💖", "font-size: 24px; color: #FF69B4;");
  console.log(
    "%cThis website was created to celebrate our beautiful love story.",
    "font-size: 14px; color: #FF69B4;"
  );
}

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
      // Create burst hearts
      const hearts = ["💕", "💖", "💗", "💓", "💝", "💘", "❤️"];
      for (let i = 0; i < 100; i++) {
        setTimeout(() => {
          const heart = document.createElement("span");
          heart.className = "burst-heart";
          heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
          heart.style.left = Math.random() * 100 + "%";
          heart.style.bottom = "0";
          heart.style.fontSize = Math.random() * 20 + 20 + "px";
          document.body.appendChild(heart);
          setTimeout(() => heart.remove(), 2000);
        }, i * 50);
      }

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
