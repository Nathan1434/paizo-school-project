import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoryService } from '../category.service';

@Component({
    selector: 'app-categories',
    templateUrl: './categories.component.html',
    styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
    public options = {
        page_size: 20,

        filter: 'genre'
    }

    public categories = {
        genres$: undefined as Observable<any[]> | undefined,
        tags$: undefined as Observable<any[]> | undefined,
        platforms$: undefined as Observable<any[]> | undefined,
        developers$: undefined as Observable<any[]> | undefined,
    }

    private getAllCategoryData(): void {
        this.categories.genres$ = this.categoryService.getCategories('genres');
        this.categories.tags$ = this.categoryService.getCategories('tags', 40);
        this.categories.platforms$ = this.categoryService.getCategories('platforms/lists/parents', 8);
        this.categories.developers$ = this.categoryService.getCategories('developers');
    }

    constructor(private categoryService: CategoryService) { }

    ngOnInit(): void {
        this.getAllCategoryData();
    }

}
