document.addEventListener("DOMContentLoaded", () => {
  const doc = document.documentElement;
  const body = document.body;
  const progressBar = document.createElement("div");

  progressBar.className = "scroll-progress";
  body.appendChild(progressBar);

  let ticking = false;
  let scrollTimeout;

  const updateProgress = () => {
    const maxScroll = doc.scrollHeight - doc.clientHeight;
    const progress = maxScroll > 0 ? doc.scrollTop / maxScroll : 0;
    const percent = Math.min(Math.max(progress, 0), 1) * 100;

    doc.style.setProperty("--scroll-progress", `${percent}%`);
    progressBar.style.transform = `scaleX(${progress || 0.001})`;

    body.classList.add("scrolling");
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => body.classList.remove("scrolling"), 250);

    ticking = false;
  };

  const requestTick = () => {
    if (!ticking) {
      window.requestAnimationFrame(updateProgress);
      ticking = true;
    }
  };

  window.addEventListener(
    "scroll",
    () => {
      requestTick();
    },
    { passive: true }
  );

  window.addEventListener("resize", () => {
    requestTick();
  });

  updateProgress();
});



