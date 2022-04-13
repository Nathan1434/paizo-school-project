import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Game } from 'src/app/games/game.model';

@Component({
    selector: 'app-wishlist',
    templateUrl: './wishlist.component.html',
    styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {

    get wishlist(): Game[] {
        return this.auth.user?.wishlist || [];
    }

    removeFromWishlist(game: Game): void {
        this.auth.updateUsersWishlist(game);
    }

    constructor(private auth: AuthService) { }

    ngOnInit(): void {
    }

}
