import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { CategoryService } from '../category.service';
import { Game, GameRequestOptions } from '../game.model';
import { GamesService } from '../games.service';

@Component({
    selector: 'app-browse',
    templateUrl: './browse.component.html',
    styleUrls: ['./browse.component.css']
})


export class BrowseGamesComponent implements OnInit, OnDestroy {
    // Games
    public allGames: Game[] = [];
    public numOfResults: number = 0;

    private requestOptions: GameRequestOptions = {
        page: 1,
        page_size: 21,

        search: '',
        search_precise: true,
        search_exact: true,
    };

    private getAllGamesData(): void {
        this.loading = true;

        const sub = this.gamesService.getAllGames(this.requestOptions).subscribe((data) => {
            this.numOfResults = data.count;
            this.allGames = data.results;

            this.loading = false;
        });

        this.subscriptions?.add(sub);
    }

    updateWishlist(game: Game) {
        this.auth.updateUsersWishlist(game);
    }
    gameIsInWishlist(game: Game): boolean {
        return !!this.auth.user?.isInWishlist(game?.id || NaN);
    }

    // Filters
    public filterOptions: { [key: string]: any[] } = {
        platforms: [],
        genres: [],
        tags: [],
        developers: [],
    };
    private filterQuery?: { key: string, value: string };

    get selectedTag() {
        return this.filterOptions['tags'].find(t => t.checked);
    }
    get selectedDeveloper() {
        return this.filterOptions['developers'].find(d => d.checked);
    }

    private getCategoryFilters(category: string, path: string, limit: number = 20): void {
        const categorySub = this.categoryService.getCategories(path, limit).subscribe((results) => {
            this.filterOptions[category] = results.map((result: any) => ({ ...result, checked: false }));
            this.setQueryFilter(category);
        });
        this.subscriptions?.add(categorySub);
    }
    private setQueryFilter(key: string): void {
        if (!this.filterQuery || !this.filterOptions[key]?.length) return;

        const opt = this.filterOptions[key].find((p) => p.slug === this.filterQuery!.value);
        if (opt) opt.checked = true;

        this.setFilters();
    }
    public setFilters(): void {
        const entries = Object.entries(this.filterOptions);

        entries.forEach(([key, value]) => {
            const filterString = value.filter((v) => v.checked).map((v) => v.id).join();
            this.requestOptions[key] = filterString || '';
        })

        this.getAllGamesData();
    }
    public setFieldFilter(category: string, value: string) {
        this.filterOptions[category].forEach(c => c.checked = false);
        const cat = this.filterOptions[category].find(c => c.id === Number(value));
        if (cat) cat.checked = true;

        this.setFilters();
    }
    public clearFilters(): void {
        Object.keys(this.filterOptions).forEach(key => this.filterOptions[key].forEach(c => c.checked = false));

        this.router.onSameUrlNavigation = 'reload';
        this.router.navigateByUrl('/browse');
    }

    // Search
    private searchTimeout?: any;
    private readonly searchDelay = .5;
    public onSearch(query: string): void {
        if (this.searchTimeout) clearTimeout(this.searchTimeout);

        this.searchTimeout = setTimeout(() => {
            this.requestOptions.page = 1;
            this.requestOptions.search = query.trim();
            this.requestOptions.ordering = query.trim() ? '-metacritic' : '';

            this.getAllGamesData();
        }, this.searchDelay * 1000);
    }

    // Pagination
    public readonly pageNumberLimit: number = 5;

    get currentPage(): number {
        return this.requestOptions.page || 1;
    };
    get numOfPages(): number {
        return Math.ceil(this.numOfResults / this.allGames.length) || 0;
    }
    get pages(): Array<void> {
        return new Array(this.numOfPages);
    }
    get skip(): { start: number, end: number } {
        const skipStart = (this.currentPage - 1) * this.allGames.length;
        const skipEnd = ((this.currentPage - 1) * this.allGames.length) + this.allGames.length;

        return { start: skipStart, end: skipEnd }
    }

    public changePage(page: number): void {
        this.requestOptions.page = page <= 1 ? 1 : page >= this.numOfPages ? this.numOfPages : page;
        this.getAllGamesData();
    }

    // Other
    public loading: boolean = false;
    private subscriptions?: Subscription;

    constructor(private route: ActivatedRoute, private router: Router, private auth: AuthService, private gamesService: GamesService, private categoryService: CategoryService) { }

    // Lifecycle hooks
    ngOnInit(): void {
        // Get filters
        this.getCategoryFilters('platforms', 'platforms/lists/parents', 8);
        this.getCategoryFilters('genres', 'genres');
        this.getCategoryFilters('tags', 'tags', 40);
        this.getCategoryFilters('developers', 'developers');

        // Check for url query parameters
        const paramsSub = this.route.queryParams.subscribe((params: Params) => {
            // Get all games data from API
            if (!Object.keys(params).length) return this.getAllGamesData();


            // Set filter query and get data
            const [key, value] = Object.entries(params)[0];
            this.filterQuery = { key, value };

            this.setQueryFilter(key);

        })

        this.subscriptions?.add(paramsSub);
    }

    ngOnDestroy(): void {
        this.subscriptions?.unsubscribe();
    }

}
