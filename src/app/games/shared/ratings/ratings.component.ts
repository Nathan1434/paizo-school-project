import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'game-ratings-stars[rating]',
    template: `
    <span>
        <i class="bx bx-star" *ngFor="let star of stars" [ngClass]="star"></i>
    </span>
  `,
    styles: [
    ]
})
export class RatingsComponent implements OnInit {
    @Input('rating') ratingsAverage?: number;

    get stars(): string[] {
        let starsArray = new Array<string>(5).fill('bx-star');

        const ratingsAverage = (Math.round((this.ratingsAverage || 0) * 2) / 2).toFixed(1);
        const [int, dec] = ratingsAverage.split('.');

        for (let i = 0; i < Number(int); i++) {
            starsArray[i] = 'bxs-star';
        }
        if (Number(dec)) starsArray[starsArray.lastIndexOf('bxs-star')] = 'bxs-star-half';

        return starsArray;
    }

    constructor() { }

    ngOnInit(): void {

    }

}
