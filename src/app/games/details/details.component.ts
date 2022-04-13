import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { Game } from 'src/app/games/game.model';
import { SwiperOptions } from 'swiper';
import { GamesService } from '../games.service';

@Component({
    selector: 'app-details',
    templateUrl: './details.component.html',
    styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit, OnDestroy {
    // Game details
    public game?: Game;

    get inWishlist(): boolean {
        return !!this.auth.user?.isInWishlist(this.game?.id || NaN);
    }
    public updateWishlist() {
        this.auth.updateUsersWishlist(this.game);
    }

    private getGameDetails() {
        const paramsSub = this.route.paramMap.subscribe(((params) => {
            // Get game slug from url
            const slug = params.get('slug');

            if (slug) {
                // Get game details
                const detailsSub = this.gamesService.getGameDetails(slug!).subscribe((res: any) => {
                    if (res) {
                        this.game = res;

                        this.getGameScreenshots();
                        this.getGameAchievements();
                        this.getGameStores();

                        console.log(this.game);
                    }
                    else this.router.navigateByUrl('/error');
                });
                this.subscriptions?.add(detailsSub);
            }
            else this.router.navigateByUrl('/error');

        }));
        this.subscriptions?.add(paramsSub);
    }


    private getGameScreenshots() {
        if (this.game?.screenshots_count) {
            const imagesSub = this.gamesService.getGameScreenshots(this.game.id).subscribe((res: any) =>
                this.game!.screenshots = res.results
            );

            this.subscriptions?.add(imagesSub);
        }
    }

    private getGameAchievements() {
        if (this.game?.achievements_count) {
            const achievementsSub = this.gamesService.getGameAchievements(this.game.id).subscribe((res: any) =>
                this.game!.achievements = res.results
            );

            this.subscriptions?.add(achievementsSub);
        }
    }

    private getGameStores() {
        if (this.game?.stores.length) {
            const storesSub = this.gamesService.getGameStores(this.game.id).subscribe((res: any) =>
                this.game!.store_links = res.results
            );

            this.subscriptions?.add(storesSub);
        }
    }

    public getRelatedStore(store_id: number) {
        const store = this.game?.stores.find((store) => store.store.id === store_id)?.store
        return store;
    }


    // Screenshots slideshow
    public slideshowConfig: SwiperOptions = {
        slidesPerView: 2,
        spaceBetween: 15,

        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },

        pagination: {
            el: '.swiper-pagination'
        }
    }

    // Other
    private subscriptions?: Subscription;


    constructor(private gamesService: GamesService, private auth: AuthService, private route: ActivatedRoute, private router: Router) { }

    ngOnInit(): void {
        this.getGameDetails();
    }

    ngOnDestroy(): void {
        this.subscriptions?.unsubscribe();
    }
}
