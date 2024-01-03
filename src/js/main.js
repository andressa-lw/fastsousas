var swiper = new Swiper(".slideGallery", {
  slidesPerView: 1,
  spaceBetween: 30,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  breakpoints: {
    768: {
      slidesPerView: 2,
      spaceBetween: 30,
    },
    980: {
      slidesPerView: 3,
      spaceBetween: 30,
    },
  },
})

/* FAQ */
const accordion = document.querySelectorAll('#cliquepr .cliqueshow');
for (var i = 0; i < accordion.length; i++) {
  accordion[i].addEventListener("click", function (e) {
    e.preventDefault();
    e.stopPropagation();
    var last = this.closest('ul').querySelector('.active');
    if (last && last !== this) last.classList.remove("active");
    this.classList.toggle("active");
  });
}
