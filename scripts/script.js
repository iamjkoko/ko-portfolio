
// Fade effect
document.addEventListener("DOMContentLoaded", () => {
    // Automatically target sections, divs
    const fadeInElements = document.querySelectorAll("div");
  
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target); // Stops observing once visible
        }
      });
    }, { threshold: 0.1 });
  
    fadeInElements.forEach((el) => observer.observe(el));
});


function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

document.querySelectorAll('.shadow').forEach(img => {
  img.addEventListener('click', () => {
      img.style.opacity = "0"; // Fade out
      setTimeout(() => {
          let tempSrc = img.src;
          img.src = img.getAttribute('data-alt');
          img.setAttribute('data-alt', tempSrc);
          img.style.opacity = "1"; // Fade in
      }, 200); // Delay to allow the fade-out effect
  });
});


/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.hamburger-menu')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}


window.transitionToPage = function(href) {
  document.querySelector('body').style.opacity = 0;
  setTimeout(function() { 
      window.location.href = href;
  }, 200);
};

document.addEventListener("DOMContentLoaded", function() {
  document.querySelector("body").style.opacity = 1;

  // Select both navbar links and the "LEARN MORE" link
  document.querySelectorAll("nav a, .learn-more-link").forEach(anchor => {
      anchor.addEventListener("click", function(event) {
          const href = this.getAttribute("href");

          // Exclude external links (those that have "target=_blank")
          if (!href.startsWith("#") && !this.hasAttribute("target")) {
              event.preventDefault();
              transitionToPage(href);
          }
      });
  });
});






