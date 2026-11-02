/* ============================================================
   Albea T. Pallado — CV Website
   ============================================================ */

// ---------- Preloader ----------
window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");
  setTimeout(() => preloader.classList.add("hidden"), 500);
});

// ---------- Navbar scroll state + scroll progress + back-to-top ----------
const navbar = document.getElementById("navbar");
const scrollProgress = document.getElementById("scrollProgress");
const toTop = document.getElementById("toTop");

function onScroll() {
  const y = window.scrollY;
  navbar.classList.toggle("scrolled", y > 40);
  toTop.classList.toggle("show", y > 500);

  const docH = document.documentElement.scrollHeight - window.innerHeight;
  scrollProgress.style.width = (docH > 0 ? (y / docH) * 100 : 0) + "%";
}
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

toTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// ---------- Mobile nav toggle ----------
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");

navToggle.addEventListener("click", () => {
  navToggle.classList.toggle("open");
  navLinks.classList.toggle("open");
});

navLinks.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    navToggle.classList.remove("open");
    navLinks.classList.remove("open");
  });
});

// ---------- Scroll reveal (staggered) ----------
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const siblings = Array.from(
        el.parentElement.querySelectorAll(":scope > .reveal, :scope .reveal")
      );
      const idx = Math.max(0, siblings.indexOf(el));
      el.style.transitionDelay = Math.min(idx * 90, 450) + "ms";
      el.classList.add("visible");
      revealObserver.unobserve(el);
    });
  },
  { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
);

document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

// ---------- Animated skill bars ----------
const skillObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const fill = entry.target.querySelector(".skill-fill");
      fill.style.width = entry.target.dataset.level + "%";
      skillObserver.unobserve(entry.target);
    });
  },
  { threshold: 0.4 }
);

document.querySelectorAll(".skill").forEach((el) => skillObserver.observe(el));

// ---------- Active nav link on scroll ----------
const sections = document.querySelectorAll("main section[id]");
const navAnchors = document.querySelectorAll(".nav-link");

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navAnchors.forEach((a) =>
        a.classList.toggle(
          "active",
          a.getAttribute("href") === "#" + entry.target.id
        )
      );
    });
  },
  { threshold: 0.35 }
);

sections.forEach((s) => sectionObserver.observe(s));
