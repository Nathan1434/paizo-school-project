import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { GamesService } from 'src/app/games/games.service';
import { Game, GameRequestOptions } from 'src/app/games/game.model'
import { SwiperOptions } from 'swiper';


@Component({
    selector: 'app-landing',
    templateUrl: './landing.component.html',
    styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit, OnDestroy {
    // Swiper
    swiperConfig: SwiperOptions = {
        spaceBetween: 10,
        slidesPerView: 1,

        pagination: {
            el: '.swiper-pagination',
            clickable: true
        },
    };


    // Games
    gamesQuery: { [key: string]: Game[] } = {
        featuredGames: [] as Game[],

        topSellingGames: [] as Game[],
        newAndTrendingGames: [] as Game[],
        recentlyUpdatedGames: [] as Game[],
    }
    categories = ['platform', 'genre', 'tag', 'developer']


    // Other
    subscription?: Subscription;

    constructor(private gamesService: GamesService) { }

    // Game methods
    getGamesList(collection: string, options: GameRequestOptions) {
        // Get and populate game info
        const sub = this.gamesService.getAllGames(options).subscribe((data: any) => {
            this.gamesQuery[collection] = data.results;
        });

        this.subscription?.add(sub);
    }

    // Lifecycle events
    ngOnInit(): void {
        this.getGamesList('featuredGames', { updated: '2020-01-01,2022-01-01', platforms: '1,2,3', ordering: '-rating', page_size: 5, });

        this.getGamesList('topSellingGames', { ordering: '-added', platforms: '1,2,3', page_size: 10 });
        this.getGamesList('newAndTrendingGames', { released: '2020-01-01,2022-06-01', ordering: '-metacritic', platforms: '1,2,3', page_size: 10 });
        this.getGamesList('recentlyUpdatedGames', { updated: '2021-01-01,2022-04-11', ordering: '-rating', platforms: '1,2,3', page_size: 10 });
    }

    ngOnDestroy(): void {
        this.subscription?.unsubscribe();
    }
}
