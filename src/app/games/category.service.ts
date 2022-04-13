import { ErrorService } from './../shared/error.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CategoryService {
    private APIUrl = 'https://api.rawg.io/api';
    private APIKey = 'c82550a9e6744106aa128c7a294f2589';

    constructor(private http: HttpClient, private errorService: ErrorService) { }


    getCategories(path: string, limit: number = 20) {
        const url = `${this.APIUrl}/${path}?key=${this.APIKey}&page_size=${limit}`;

        const res = this.http.get(url).pipe(this.errorService.handleError(path, []));

        return res.pipe(map((res: any) => res.results));
    }

}
