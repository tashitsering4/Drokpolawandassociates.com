const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".main-nav");
const navigationLinks = [...document.querySelectorAll(".main-nav a")];

const menuLabel = menuButton.querySelector(".menu-label");
const pageMain = document.getElementById("main-content");
const pageFooter = document.querySelector(".site-footer");

function setMenu(open) {
  menuButton.setAttribute("aria-expanded", String(open));
  if (menuLabel) menuLabel.textContent = open ? "Close" : "Menu";
  navigation.classList.toggle("is-open", open);
  document.body.classList.toggle("menu-open", open);
  // Keep keyboard and screen-reader focus inside the open menu.
  [pageMain, pageFooter].forEach((el) => { if (el) el.inert = open; });
}

function closeMenu() {
  setMenu(false);
}

menuButton.addEventListener("click", () => {
  setMenu(menuButton.getAttribute("aria-expanded") !== "true");
});

navigationLinks.forEach((link) => link.addEventListener("click", closeMenu));

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && navigation.classList.contains("is-open")) {
    closeMenu();
    menuButton.focus();
  }
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 820) closeMenu();
});

document.querySelectorAll("#current-year").forEach((year) => {
  year.textContent = new Date().getFullYear();
});

document.querySelectorAll("[data-team-photo]").forEach((photo) => {
  const hideMissingPhoto = () => {
    photo.hidden = true;
  };

  photo.addEventListener("error", hideMissingPhoto);
  if (photo.complete && photo.naturalWidth === 0) hideMissingPhoto();
});

const contactForm = document.getElementById("contact-form");

if (contactForm) contactForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const form = new FormData(event.currentTarget);
  const subjectArea = form.get("service") || "General legal enquiry";
  const subject = `Website enquiry — ${subjectArea}`;
  const body = [
    `Name: ${form.get("name")}`,
    `Email: ${form.get("email")}`,
    `Phone: ${form.get("phone") || "Not provided"}`,
    `Area of enquiry: ${subjectArea}`,
    "",
    "Brief description:",
    form.get("message")
  ].join("\n");

  window.location.href = `mailto:jigmedorje3174@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  const note = document.getElementById("form-note");
  if (note) note.textContent = "Your email application should now open with a prepared draft. If nothing happens, please email jigmedorje3174@gmail.com directly.";
});

const publicationGrid = document.getElementById("publication-grid");

if (publicationGrid) {
  const chips = [...document.querySelectorAll(".filter-chip")];
  const emptyState = document.getElementById("publication-empty");

  const applyFilter = (filter) => {
    let visible = 0;
    publicationGrid.querySelectorAll(".publication-card").forEach((card) => {
      const show = filter === "all" || card.dataset.category === filter;
      card.hidden = !show;
      if (show) visible += 1;
    });
    if (emptyState) emptyState.hidden = visible > 0;
    chips.forEach((chip) => chip.setAttribute("aria-pressed", String(chip.dataset.filter === filter)));
  };

  chips.forEach((chip) => chip.addEventListener("click", () => applyFilter(chip.dataset.filter)));
  applyFilter("all");
}
