const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.16 }
  );

  revealElements.forEach((element) => revealObserver.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add("is-visible"));
}

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const target = document.querySelector(link.getAttribute("href"));
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

document.querySelectorAll(".waitlist-card").forEach((waitlistForm) => {
  const formNote = waitlistForm.querySelector(".form-note");

  waitlistForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(waitlistForm);
    const email = String(formData.get("email") || "").trim();

    if (!email) {
      if (formNote) {
        formNote.textContent = "Enter your email to step onto the path.";
      }
      return;
    }

    if (formNote) {
      formNote.textContent = "You are on the waitlist. Your training begins soon.";
    }
    waitlistForm.reset();
  });
});
