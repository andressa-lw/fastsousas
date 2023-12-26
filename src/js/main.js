var swiper = new Swiper(".slideGallery", {
  slidesPerView: 3,
  spaceBetween: 30,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
})

var el = document.querySelectorAll("#cliquepr .cliqueshow")
for (let i = 0; i < el.length; i++) {
  el[i].onclick = function () {
    var c = 0
    while (c < el.length) {
      el[c++].className = "cliqueshow"
    }
    el[i].className = "cliqueshow active"
  }
}
