(function () {
  const carousel = document.querySelector('[data-carousel]');
  if (!carousel) return;

  const track = carousel.querySelector('.carousel__track');
  const slides = Array.from(carousel.querySelectorAll('.carousel__slide'));
  const btnPrev = carousel.querySelector('[data-carousel-prev]');
  const btnNext = carousel.querySelector('[data-carousel-next]');

  let index = 0;
  let timer = null;

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function goTo(i) {
    index = (i + slides.length) % slides.length;
    track.style.transform = `translateX(-${index * 100}%)`;
  }

  function next() { goTo(index + 1); }
  function prev() { goTo(index - 1); }

  function startAuto() {
    if (prefersReduced) return;
    stopAuto();
    timer = setInterval(next, 6000); // 6s (não muito rápido)
  }

  function stopAuto() {
    if (timer) clearInterval(timer);
    timer = null;
  }

  btnNext?.addEventListener('click', () => { next(); startAuto(); });
  btnPrev?.addEventListener('click', () => { prev(); startAuto(); });

  carousel.addEventListener('mouseenter', stopAuto);
  carousel.addEventListener('mouseleave', startAuto);
  carousel.addEventListener('focusin', stopAuto);
  carousel.addEventListener('focusout', startAuto);

  goTo(0);
  startAuto();
})();

// Botão "Voltar ao topo"
document.addEventListener("DOMContentLoaded", () => {
  const btnTop = document.getElementById("btnTop");
  if (!btnTop) return;

  const toggleBtnTop = () => {
    if (window.scrollY > 300) {
      btnTop.classList.add("show");
      btnTop.classList.remove("hidden");
    } else {
      btnTop.classList.add("hidden");
      btnTop.classList.remove("show");
    }
  };

  window.addEventListener("scroll", toggleBtnTop, { passive: true });
  toggleBtnTop(); // já ajusta ao carregar (caso a página abra no meio)
});


// Fechar menu mobile ao clicar em links
document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("menuToggle");
  if (!toggle) return;

  document.querySelectorAll("[data-close-menu]").forEach((link) => {
    link.addEventListener("click", () => {
      toggle.checked = false;
    });
  });
});