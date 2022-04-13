import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { GameRequestOptions } from './game.model';
import { ErrorService } from '../shared/error.service';

@Injectable({
    providedIn: 'root'
})
export class GamesService {
    private APIUrl = 'https://api.rawg.io/api/games';
    private APIKey = 'c82550a9e6744106aa128c7a294f2589';

    constructor(private http: HttpClient, private errorService: ErrorService) { }

    getAllGames(options: GameRequestOptions = { page: 1, platforms: '' }) {
        // Creating the search params
        const params = this.createSearchQueryString(options);

        // Creating the request url
        const url = `${this.APIUrl}?${params}`;
        // const url = '/assets/mock-games.json';

        // Sending request (with error handling)
        const res = this.http.get(url).pipe(this.errorService.handleError('All Games', { count: 0, results: [] }));

        // Transforming the response
        return res.pipe(map((res: any) => ({ count: res.count, results: res.results })));
    }

    getGameDetails(slug: string) {
        return this.http.get(`${this.APIUrl}/${slug}?key=${this.APIKey}`).pipe(this.errorService.handleError('Game Details', null));
        // return this.http.get(`/assets/mock-details.json`);
    }
    getGameScreenshots(id: number) {
        return this.http.get(`${this.APIUrl}/${id}/screenshots?key=${this.APIKey}`).pipe(this.errorService.handleError('Game Screenshots', { results: [] }));
    }
    getGameAchievements(id: number) {
        return this.http.get(`${this.APIUrl}/${id}/achievements?key=${this.APIKey}`).pipe(this.errorService.handleError('Game Achievements', { results: [] }));
    }
    getGameStores(id: number) {
        return this.http.get(`${this.APIUrl}/${id}/stores?key=${this.APIKey}`).pipe(this.errorService.handleError('Game Stores', { results: [] }));
    }


    private createSearchQueryString(options: GameRequestOptions): string {
        // Create api query string
        const params = new URLSearchParams(`key=${this.APIKey}&exclude_additions=true`);

        // Add optional parameters
        const optsEntries = Object.entries(options);
        optsEntries.forEach(([key, value]) => {
            if (value) params.set(key, String(value));

            if (key === 'platforms')
                params.set('parent_platforms', value || '1,2,3,4,5,6,7,8')
        })

        // Return as string
        return params.toString();
    }
}
