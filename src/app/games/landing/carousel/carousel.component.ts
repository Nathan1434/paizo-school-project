import { Component, Input, OnInit } from '@angular/core';
import { SwiperOptions } from 'swiper';
import { Game } from '../../game.model';

@Component({
    selector: 'game-carousel[games]',
    templateUrl: './carousel.component.html',
    styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {
    @Input('games') games: Game[] = [];

    swiperConfig: SwiperOptions = {
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },

        slidesPerView: 3,
        spaceBetween: 15,
    }

    constructor() { }

    ngOnInit(): void {
    }

}
