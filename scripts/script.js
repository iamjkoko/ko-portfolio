document.addEventListener("DOMContentLoaded", () => {
  // Fade-in effect for sections
  const fadeInElements = document.querySelectorAll("div, video, section");

  const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
          if (entry.isIntersecting) {
              entry.target.classList.add("visible");
              observer.unobserve(entry.target); // Stops observing once visible
          }
      });
  }, { threshold: 0.1 });

  fadeInElements.forEach((el) => observer.observe(el));

  // Fade-in effect for the body on page load
  document.querySelector("body").style.opacity = 1;
});

// Smooth scroll to top
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Dropdown menu toggle function
function myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
}

// Close dropdown when clicking outside
window.onclick = function(event) {
  if (!event.target.closest('.dropdown-content') && !event.target.matches('.hamburger-menu')) {
      document.querySelectorAll('.dropdown-content').forEach(dropdown => {
          dropdown.classList.remove('show');
      });
  }
};

// Smooth page transition with video fade-out
window.transitionToPage = function(href) {
  const video = document.querySelector('.background'); // Targeting the background video
  if (video) {
      video.style.opacity = "0"; // Apply fade-out effect
  }
  document.querySelector("body").style.opacity = "0"; // Fade out body as well
  setTimeout(() => {
      window.location.href = href;
  }, 800); // Match CSS transition duration
};

// Ensure smooth fade-in effect on page load
document.addEventListener("DOMContentLoaded", function() {
  document.querySelector("body").style.opacity = 1;


  // Apply transition effect when clicking navigation links
  document.querySelectorAll("nav a, .learn-more-link").forEach(anchor => {
      anchor.addEventListener("click", function(event) {
          const href = this.getAttribute("href");

          // Exclude external links (those with "target=_blank")
          if (!href.startsWith("#") && !this.hasAttribute("target")) {
              event.preventDefault();
              transitionToPage(href);
          }
      });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const images = document.querySelectorAll(".shadow");

  images.forEach((image) => {
      image.setAttribute("data-active", "false");
      const originalSrc = image.getAttribute("src");
      const altSrc = image.getAttribute("data-alt");

      image.addEventListener("click", function () {
          this.src = this.getAttribute("data-active") === "true" ? originalSrc : altSrc;
          this.setAttribute("data-active", this.getAttribute("data-active") === "true" ? "false" : "true");
      });
  });
});





