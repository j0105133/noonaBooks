
//신간
var swiper = new Swiper(".bookSwiper", {
    slidesPerView: 1,
    spaceBetween: 60,
    loop: true,
    autoplay: {
        delay: 2000,
        disableOnInteraction: false,
    }, 
    breakpoints: {
        460: {
        slidesPerView: 2,
        spaceBetween: 60,
        },
        768: {
        slidesPerView: 3,
        spaceBetween: 60,
        },
        1024: {
        slidesPerView: 4,
        spaceBetween: 60,
        },
        1200: {
          slidesPerView: 5,
          spaceBetween: 60,
          },
    },            
    }); 


    function openNav() {
        document.getElementById("mobileMenu").style.width = "250px";
      }
      
      function closeNav() {
        document.getElementById("mobileMenu").style.width = "0";
      }
    