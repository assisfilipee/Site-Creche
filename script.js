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

document.addEventListener("DOMContentLoaded", () => {

  const images = Array.from(document.querySelectorAll(".shot img"));
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const closeBtn = document.querySelector(".lightbox .close");
  const nextBtn = document.querySelector(".lightbox .next");
  const prevBtn = document.querySelector(".lightbox .prev");

  let currentIndex = 0;

  if (!images.length) return;

  function openLightbox(index){
    currentIndex = index;
    lightboxImg.src = images[currentIndex].src;
    lightbox.classList.add("active");
    document.body.style.overflow = "hidden"; // trava scroll
  }

  function closeLightbox(){
    lightbox.classList.remove("active");
    document.body.style.overflow = "";
  }

  function showNext(){
    currentIndex = (currentIndex + 1) % images.length;
    lightboxImg.src = images[currentIndex].src;
  }

  function showPrev(){
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    lightboxImg.src = images[currentIndex].src;
  }

  images.forEach((img, index) => {
    img.addEventListener("click", () => openLightbox(index));
  });

  closeBtn.addEventListener("click", closeLightbox);
  nextBtn.addEventListener("click", showNext);
  prevBtn.addEventListener("click", showPrev);

  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  // 🔑 TECLADO
  document.addEventListener("keydown", (e) => {
    if (!lightbox.classList.contains("active")) return;

    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowRight") showNext();
    if (e.key === "ArrowLeft") showPrev();
  });

});

const numeroWhatsApp = "5551991629437"; // 55 + DDD + número (só dígitos)

const form = document.getElementById("zapForm");

form.addEventListener("submit", function (e) {
  e.preventDefault(); // impede envio padrão do form

  const nome = document.getElementById("nome").value.trim();
  const mensagem = document.getElementById("msg").value.trim();

  if (!nome || !mensagem) {
    alert("Por favor, preencha todos os campos.");
    return;
  }

  const texto =
    `Olá! Meu nome é ${nome},\n\n` + `${mensagem}`;

  const textoCodificado = encodeURIComponent(texto);

  const linkWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${textoCodificado}`;

  window.open(linkWhatsApp, "_blank");

  setTimeout(() => {
  window.location.reload();
}, 300);

});


