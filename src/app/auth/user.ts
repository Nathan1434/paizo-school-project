import { Game } from "../games/game.model";

export class User {
    uid: string;

    username: string;
    email: string;

    wishlist: Game[];

    constructor(public id: string, data: { uid: string, username: string, email: string, wishlist: Game[] }) {
        this.uid = data.uid;

        this.username = data.username;
        this.email = data.email;

        this.wishlist = data.wishlist;
    }

    isInWishlist(game_id: number): boolean {
        return this.wishlist.some(i => i.id === game_id);
    }
}