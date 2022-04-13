import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { ThemeService } from './shared/theme.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    currentTheme: string = 'default';

    constructor(private auth: AuthService, private theme: ThemeService) {
        this.theme.theme$.subscribe(theme => this.currentTheme = theme);
    }

    ngOnInit(): void {
        this.auth.autoLogin();
    }
}
