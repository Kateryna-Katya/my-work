import axios from 'axios';


import Swiper from 'swiper';
import { SwiperOptions } from "./swiper/modules/types";


const swiper = new Swiper('.swiper-container', {
    loop: false,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    keyboard: {
        enabled: true,
        onlyInViewport: true,
    },
    mousewheel: true,
    grabCursor: true,
    slidesPerView: 1,
});


const fetchRewievs = async () => {
    try {
        const response = await axios.get("https://portfolio-js.b.goit.study/api/reviews");
        if (!response.ok) {
            throw new Error('Ошибка загрузки отзывов');
        }
        const reviews = await response.json();
        if (reviews.length === 0) {
            throw new Error('Отзывов не найдено');
        }
        renderReviews(reviews);
    } catch (error) {
        document.querySelector('.error-message').style.display = 'block';
        document.querySelector('.swiper-container').style.display = 'none';
        console.error(error.message);
    }
}



const renderReviews = reviews => {
    const swiperWrapper = document.querySelector('.swiper-wrapper');

    reviews.forEach(review => {
        const li = document.createElement('li');
        li.classList.add('swiper-slide');

        li.innerHTML = `
      <div class="review-card">
        <img class="avatar" src="${review.avatar_url}" alt="${review.author}'s avatar" />
        <div class="review-content">
          <h3 class="author">${review.author}</h3>
          <p class="review-text">${review.review}</p>
        </div>
      </div>
    `;
        swiperWrapper.appendChild(slide);
    });

    swiper.update();
}
fetchRewievs();

swiper.on('reachEnd', () => {
    document.querySelector('.swiper-button-next').classList.add('swiper-button-disabled');
});

swiper.on('reachBeginning', () => {
    document.querySelector('.swiper-button-prev').classList.add('swiper-button-disabled');
});
