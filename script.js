/* =========================================================
   EDIT THESE to update contact details across the whole site
   ========================================================= */
const CONFIG = {
  // WhatsApp number: country code + number, digits only (no +, spaces or dashes). Example: 919876543210
  whatsapp: "91XXXXXXXXXX",
  // How the number is shown on the page
  whatsappDisplay: "+91 XXXXX XXXXX",
  // Default message when someone taps a WhatsApp button
  message: "Hi! I want to know about dance classes and book a free trial.",
  email: "hello@example.com",
};

document.documentElement.classList.add("js");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---------- WhatsApp links ---------- */
const waLink = (text) => `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(text || CONFIG.message)}`;

document.querySelectorAll("[data-wa]").forEach((a) => {
  a.href = waLink(a.dataset.msg);
  a.target = "_blank";
  a.rel = "noopener";
});
document.querySelectorAll("[data-wa-display]").forEach((el) => { el.textContent = CONFIG.whatsappDisplay; });
document.querySelectorAll("[data-email]").forEach((a) => { a.href = `mailto:${CONFIG.email}`; a.textContent = CONFIG.email; });

/* ---------- Mobile menu ---------- */
const menuBtn = document.getElementById("menu-btn");
const nav = document.getElementById("nav");
function setMenu(open) {
  nav.classList.toggle("open", open);
  menuBtn.setAttribute("aria-expanded", String(open));
  menuBtn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
}
menuBtn.addEventListener("click", () => setMenu(!nav.classList.contains("open")));
nav.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => setMenu(false)));
document.addEventListener("keydown", (e) => { if (e.key === "Escape") setMenu(false); });

/* ---------- Header border on scroll ---------- */
const header = document.querySelector(".site-header");
const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 8);
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

/* ---------- Highlights strip: duplicate for a seamless loop ---------- */
const track = document.querySelector(".strip-track");
if (track) track.innerHTML += track.innerHTML;

/* ---------- Scroll reveal ---------- */
const revealEls = document.querySelectorAll(".reveal");
if (reduceMotion || !("IntersectionObserver" in window)) {
  revealEls.forEach((el) => el.classList.add("in"));
} else {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
  }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
  revealEls.forEach((el) => io.observe(el));
}

/* ---------- YouTube: load the player only when clicked ---------- */
document.querySelectorAll(".yt").forEach((btn) => {
  btn.addEventListener("click", () => {
    const iframe = document.createElement("iframe");
    iframe.src = `https://www.youtube-nocookie.com/embed/${btn.dataset.yt}?autoplay=1&rel=0`;
    iframe.title = btn.getAttribute("aria-label") || "Video";
    iframe.allow = "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture";
    iframe.allowFullscreen = true;
    btn.replaceChildren(iframe);
  }, { once: true });
});

/* ---------- Enquiry form → WhatsApp ---------- */
const form = document.getElementById("enquiry");
const note = document.getElementById("form-note");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = form.name.value.trim();
  if (!name) {
    form.name.setAttribute("aria-invalid", "true");
    note.textContent = "Please add your name so we know who is writing.";
    form.name.focus();
    return;
  }
  form.name.removeAttribute("aria-invalid");
  const lines = [
    "Hi! I want to know about dance classes and book a free trial.",
    `Name: ${name}`,
    form.phone.value.trim() && `Phone: ${form.phone.value.trim()}`,
    `Class: ${form.cls.value}`,
    form.msg.value.trim() && `Message: ${form.msg.value.trim()}`,
  ].filter(Boolean).join("\n");
  window.open(waLink(lines), "_blank", "noopener");
  note.textContent = "WhatsApp is opening with your message. If nothing happened, tap the green button instead.";
});

/* ---------- Footer year ---------- */
document.getElementById("year").textContent = new Date().getFullYear();
