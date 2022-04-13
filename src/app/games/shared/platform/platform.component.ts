import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'game-platform-icon[platform]',
    template: `
     <svg
        class="h-6 w-6 [fill:currentColor]"
    >
        <use
            [attr.href]="
                '/assets/icons/' +
                platform.slug +
                '.svg#icon'
            "
        />
    </svg>
  `,
    styles: [
    ]
})
export class PlatformComponent implements OnInit {
    @Input('platform') platform!: any;

    constructor() { }

    ngOnInit(): void {
    }

}
