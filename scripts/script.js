document.addEventListener("DOMContentLoaded", () => {
  const body = document.querySelector("body");
  const video = document.querySelector(".background");
  const fadeInElements = document.querySelectorAll("div, video, section");

  // Fade-in effect using IntersectionObserver
  const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
          if (entry.isIntersecting) {
              entry.target.classList.add("visible");
              observer.unobserve(entry.target);
          }
      });
  }, { threshold: 0.1 });

  fadeInElements.forEach((el) => observer.observe(el));
  
  // Clean up observer after all elements are visible
  setTimeout(() => observer.disconnect(), 3000);

  // Ensure fade-in effect on page load
  setOpacity(body, 1);
  setOpacity(video, 1);
});

// Utility function for setting opacity
function setOpacity(element, value) {
  if (element) element.style.opacity = value;
}

// Smooth scroll to top
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Dropdown menu toggle
function toggleDropdown() {
  document.getElementById("myDropdown").classList.toggle("show");
}

// Close dropdown when clicking outside
document.addEventListener("click", (event) => {
  if (!event.target.closest(".dropdown-content") && !event.target.matches(".hamburger-menu")) {
      document.querySelectorAll(".dropdown-content").forEach((dropdown) => dropdown.classList.remove("show"));
  }
});

// Smooth page transition with fade-out effect
window.transitionToPage = function (href) {
  const body = document.querySelector("body");
  const video = document.querySelector(".background");

  setOpacity(video, 0);
  setOpacity(body, 0);

  setTimeout(() => {
      window.location.href = href;
  }, 800);
};

// Ensure smooth transition on navigation clicks
document.querySelectorAll("nav a, .learn-more-link").forEach((anchor) => {
  anchor.addEventListener("click", function (event) {
      const href = this.getAttribute("href");

      // Exclude external links (those with "target=_blank")
      if (!href.startsWith("#") && !this.hasAttribute("target")) {
          event.preventDefault();
          transitionToPage(href);
      }
  });
});
