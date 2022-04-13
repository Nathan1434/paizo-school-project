import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
    selector: 'the-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

    get wishlistLength(): number {
        return this.auth.user?.wishlist.length || 0;
    }

    get isLoggedIn(): boolean {
        return this.auth.isLoggedIn;
    }

    constructor(private auth: AuthService) { }

    logUserOut(): void {
        this.auth.logout();
    }

    ngOnInit(): void {
    }

}
