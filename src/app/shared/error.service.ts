import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ErrorService {

    public handleError<T = any>(path: string, data?: T) {
        return catchError((error: any): Observable<T> => {
            console.log(error, `At path: ${path}`);

            return of(data as T);
        })
    }

    constructor() { }
}
