import "./vendor/parvus.min.js";
import "./vendor/splide.min.js";

function initMobileMenu() {
  const navbars = document.querySelectorAll(".site-header .navbar");

  navbars.forEach((navbar) => {
    if (navbar.querySelector(".menu-toggle")) {
      return;
    }

    const toggleButton = document.createElement("button");
    toggleButton.type = "button";
    toggleButton.className = "menu-toggle";
    toggleButton.textContent = "Menu";
    toggleButton.setAttribute("aria-expanded", "false");
    toggleButton.setAttribute("aria-label", "Toggle navigation menu");

    navbar.prepend(toggleButton);

    toggleButton.addEventListener("click", () => {
      const isOpen = navbar.classList.toggle("is-menu-open");
      toggleButton.setAttribute("aria-expanded", String(isOpen));
    });
  });
}

document.addEventListener("DOMContentLoaded", async () => {
  new Parvus({ captionsSelector: "[data-caption]" });

  document.querySelectorAll(".thumbnail-gallery").forEach((gallery) => {
    let main;
    let thumbnails;

    if (gallery.querySelector(".thumbnail-gallery__main")) {
      main = new Splide(gallery.querySelector(".thumbnail-gallery__main"), {
        type: "fade",
        pagination: false,
        arrows: true,
        rewind: true,
        cover: true
      });
    }

    if (gallery.querySelector(".thumbnail-gallery__thumbnails")) {
      thumbnails = new Splide(gallery.querySelector(".thumbnail-gallery__thumbnails"), {
        arrows: false,
        fixedWidth: 104,
        fixedHeight: 58,
        isNavigation: true,
        gap: 10,
        focus: "center",
        pagination: false,
        cover: true,
        dragMinThreshold: { mouse: 4, touch: 10 },
        breakpoints: { 640: { fixedWidth: 66, fixedHeight: 38 } }
      });
    }

    if (main && thumbnails) {
      main.sync(thumbnails);
      main.mount();
      thumbnails.mount();
    }
  });

  initMobileMenu();
});