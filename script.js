// === BASIC CONFIG YOU EDIT ===
const instagramFollowers = "3,400";
const tiktokFollowers = "2,300";

// YouTube videos
const youtubeVideos = [
  {
    title: "We built remy from Ratatouille | hardware projects with raspberry pi",
    embedUrl: "https://www.youtube.com/embed/niHFGQafhgs?si=qSmRnPbCHM-L6Xe9"
  },
  {
    title: "The Time I was a solo traveller",
    embedUrl: "https://www.youtube.com/embed/CTRebtZpal8?si=zPFfHPIsXgt_IODk"
  },
  {
    title: "Sorortiy recruitment undercover",
    embedUrl: "https://www.youtube.com/embed/NxP20vKH5zc?si=z8bZrVwn2TyVM_d7"
  }
];

// Instagram posts
const instagramPosts = [
  {
    imageUrl: "https://via.placeholder.com/400x400.png?text=IG+1",
    linkUrl: "https://www.instagram.com/p/DPcStJoAZ4t/?img_index=1"
  },
  {
    imageUrl: "https://via.placeholder.com/400x400.png?text=IG+2",
    linkUrl: "https://www.instagram.com/p/POST_ID_2/"
  },
  {
    imageUrl: "https://via.placeholder.com/400x400.png?text=IG+3",
    linkUrl: "https://www.instagram.com/p/POST_ID_3/"
  },
  {
    imageUrl: "https://via.placeholder.com/400x400.png?text=IG+4",
    linkUrl: "https://www.instagram.com/p/POST_ID_4/"
  }
];

// TikTok
const tiktokVideos = [
  { embedUrl: "https://www.tiktok.com/embed/7563021436604992781" },
  { embedUrl: "https://www.tiktok.com/embed/7548862416231206199" },
  { embedUrl: "https://www.tiktok.com/embed/7524759906570734903" }
];

document.addEventListener("DOMContentLoaded", () => {
  setupYouTubeCarousel();
  renderInstagramGrid();
  renderTikTokGrid();
  initSparkles();
  initThemeToggle();
});

// ========== YOUTUBE CAROUSEL WITH AUTOPLAY ==========
let currentVideoIndex = 0;
let autoSlideInterval = null;
const AUTO_SLIDE_MS = 6000; // 6 seconds

function setupYouTubeCarousel() {
  const carousel = document.getElementById("youtubeCarousel");
  const dots = document.getElementById("carouselDots");

  youtubeVideos.forEach((video, index) => {
    const slide = document.createElement("div");
    slide.classList.add("carousel-slide");
    if (index === 0) slide.classList.add("active");

    slide.innerHTML = `
      <iframe src="${video.embedUrl}" allowfullscreen></iframe>
      <p class="carousel-caption">${video.title}</p>
    `;

    carousel.appendChild(slide);

    const dot = document.createElement("div");
    dot.classList.add("carousel-dot");
    if (index === 0) dot.classList.add("active");
    dot.addEventListener("click", () => {
      showVideo(index);
      restartAutoSlide();
    });
    dots.appendChild(dot);
  });

  const prevBtn = document.getElementById("prevVideo");
  const nextBtn = document.getElementById("nextVideo");

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      showVideo(currentVideoIndex - 1);
      restartAutoSlide();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      showVideo(currentVideoIndex + 1);
      restartAutoSlide();
    });
  }

  startAutoSlide();
}

function showVideo(index) {
  const slides = document.querySelectorAll(".carousel-slide");
  const dots = document.querySelectorAll(".carousel-dot");
  if (!slides.length) return;

  if (index < 0) index = slides.length - 1;
  if (index >= slides.length) index = 0;

  currentVideoIndex = index;

  slides.forEach((slide, i) =>
    slide.classList.toggle("active", i === index)
  );

  dots.forEach((dot, i) =>
    dot.classList.toggle("active", i === index)
  );
}

function startAutoSlide() {
  stopAutoSlide();
  autoSlideInterval = setInterval(() => {
    showVideo(currentVideoIndex + 1);
  }, AUTO_SLIDE_MS);
}

function stopAutoSlide() {
  if (autoSlideInterval) {
    clearInterval(autoSlideInterval);
    autoSlideInterval = null;
  }
}

function restartAutoSlide() {
  startAutoSlide();
}

// ========== INSTAGRAM GRID ==========
function renderInstagramGrid() {
  const grid = document.getElementById("instagramGrid");
  if (!grid) return;

  instagramPosts.forEach((post) => {
    const card = document.createElement("a");
    card.href = post.linkUrl;
    card.target = "_blank";
    card.classList.add("media-card");

    card.innerHTML = `<img src="${post.imageUrl}" alt="Instagram post" />`;
    grid.appendChild(card);
  });
}

// ========== TIKTOK GRID ==========
function renderTikTokGrid() {
  const grid = document.getElementById("tiktokGrid");
  if (!grid) return;

  tiktokVideos.forEach((video) => {
    const card = document.createElement("div");
    card.classList.add("media-card");
    card.innerHTML = `<iframe src="${video.embedUrl}" allowfullscreen></iframe>`;
    grid.appendChild(card);
  });
}

/* =========================================
   ✨ SPARKLE HOVER EFFECT
   ========================================= */
function addSparkleEffect(element) {
  element.classList.add("sparkle-hover");

  element.addEventListener("mousemove", (e) => {
    const sparkle = document.createElement("div");
    sparkle.classList.add("sparkle");

    const rect = element.getBoundingClientRect();
    sparkle.style.left = `${e.clientX - rect.left}px`;
    sparkle.style.top = `${e.clientY - rect.top}px`;

    element.appendChild(sparkle);

    setTimeout(() => sparkle.remove(), 800);
  });
}

function initSparkles() {
  const sparkleSelectors = [
    ".btn",
    ".social-card",
    ".media-card",
    ".profile-picture",
    ".floating-link"
  ];

  sparkleSelectors.forEach((selector) => {
    document.querySelectorAll(selector).forEach((el) => addSparkleEffect(el));
  });
}

/* =========================================
   🌙 DARK MODE TOGGLE
   ========================================= */
function initThemeToggle() {
  const toggleBtn = document.getElementById("themeToggle");
  if (!toggleBtn) return;

  const iconSpan = toggleBtn.querySelector(".theme-toggle-icon");
  const prefersDark =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;

  const savedTheme = localStorage.getItem("theme");
  const shouldUseDark =
    savedTheme === "dark" || (!savedTheme && prefersDark);

  if (shouldUseDark) {
    document.body.classList.add("dark-mode");
    if (iconSpan) iconSpan.textContent = "☀️";
  }

  toggleBtn.addEventListener("click", () => {
    const isDark = document.body.classList.toggle("dark-mode");
    if (iconSpan) iconSpan.textContent = isDark ? "☀️" : "🌙";
    localStorage.setItem("theme", isDark ? "dark" : "light");
  });
}



  
