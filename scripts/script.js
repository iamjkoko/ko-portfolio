// Run once the HTML is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  /*** Fade-in Elements on Scroll ***/
  const fadeInElements = document.querySelectorAll("div, video, section");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  fadeInElements.forEach(el => observer.observe(el));

  /*** Fade-in Body on Page Load ***/
  document.body.style.opacity = 1;

  /*** Smooth Page Transitions (Click Links → Fade Out → Navigate) ***/
  document.querySelectorAll("nav a, .learn-more-link").forEach(anchor => {
    anchor.addEventListener("click", (event) => {
      const href = anchor.getAttribute("href");
      if (!href.startsWith("#") && !anchor.hasAttribute("target")) {
        event.preventDefault();
        transitionToPage(href);
      }
    });
  });

  /*** Clickable Image Toggle (Shadow Images) ***/
  document.querySelectorAll(".shadow").forEach((image) => {
    image.setAttribute("data-active", "false");
    const originalSrc = image.getAttribute("src");
    const altSrc = image.getAttribute("data-alt");
    // Preload the alternate image
    const preloadImg = new Image();
    preloadImg.src = altSrc;

    image.addEventListener("click", () => {
      const isActive = image.getAttribute("data-active") === "true";
      image.src = isActive ? originalSrc : altSrc;
      image.setAttribute("data-active", isActive ? "false" : "true");
    });
  });
});

/*** Scroll to Top Function ***/
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/*** Toggle Dropdown Menu ***/
function myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
}

/*** Close Dropdown When Clicking Outside ***/
window.onclick = function(event) {
  if (!event.target.closest('.dropdown-content') && !event.target.matches('.hamburger-menu')) {
    document.querySelectorAll('.dropdown-content').forEach(dropdown => {
      dropdown.classList.remove('show');
    });
  }
};

/*** Smooth Page Transition with Fade-Out ***/
function transitionToPage(href) {
  const video = document.querySelector('.background');
  if (video) {
    video.style.opacity = "0";
  }
  document.body.style.opacity = "0";
  setTimeout(() => {
    window.location.href = href;
  }, 800);
}


/*** Gallery ***/
const slider = document.getElementById('slider');
let slides = document.querySelectorAll('.slide');
let currentIndex = 1;
let slideInterval;
const intervalTime = 3000;

const firstClone = slides[0].cloneNode(true);
const lastClone = slides[slides.length - 1].cloneNode(true);
firstClone.id = 'first-clone';
lastClone.id = 'last-clone';

slider.appendChild(firstClone);
slider.insertBefore(lastClone, slides[0]);

slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;

slider.style.transform = `translateX(-${currentIndex * 100}%)`;


function moveSlide(direction) {
  if (direction === 1 && currentIndex >= totalSlides - 1) return;
  if (direction === -1 && currentIndex <= 0) return;

  currentIndex += direction;
  slider.style.transition = 'transform 0.5s ease-in-out';
  slider.style.transform = `translateX(-${currentIndex * 100}%)`;

}

function goToSlide(index) {
  currentIndex = index;
  slider.style.transition = 'transform 0.5s ease-in-out';
  slider.style.transform = `translateX(-${currentIndex * 100}%)`;

}

slider.addEventListener('transitionend', () => {
  if (slides[currentIndex].id === 'first-clone') {
    slider.style.transition = 'none';
    currentIndex = 1;
    slider.style.transform = `translateX(-${currentIndex * 100}%)`;
  }
  if (slides[currentIndex].id === 'last-clone') {
    slider.style.transition = 'none';
    currentIndex = totalSlides - 2;
    slider.style.transform = `translateX(-${currentIndex * 100}%)`;
  }

});

function startAutoPlay() {
  slideInterval = setInterval(() => {
    moveSlide(1);
  }, intervalTime);
}

function stopAutoPlay() {
  clearInterval(slideInterval);
}

document.querySelector('.gallery-container').addEventListener('mouseenter', stopAutoPlay);
document.querySelector('.gallery-container').addEventListener('mouseleave', startAutoPlay);

startAutoPlay();
