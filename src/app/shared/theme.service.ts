import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ThemeService {
    readonly currentTheme: string = 'default';
    readonly theme$ = new Subject<string>();

    constructor() { }

    setTheme(theme: string) {
        // document.body.style.setProperty('--theme',theme)
        this.theme$.next(theme);
    }
}
