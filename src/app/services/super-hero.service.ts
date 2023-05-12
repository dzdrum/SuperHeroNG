import { Injectable } from '@angular/core';
import { SuperHero } from '../models/super-hero';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SuperHeroService {
  private controllerUrl = "SuperHero";

  constructor(private http: HttpClient) { }

  public getSuperHeros() : Observable<SuperHero[]> {
    
    return this.http.get<SuperHero[]>(`${environment.apiUrl}/${this.controllerUrl}`);
  }

  public editSuperHero(superHero: SuperHero) : Observable<SuperHero[]> {
    console.log(`${environment.apiUrl}/${this.controllerUrl}`);
    console.log(this.http.put<SuperHero[]>(`${environment.apiUrl}/${this.controllerUrl}`, superHero));
    return this.http.put<SuperHero[]>(`${environment.apiUrl}/${this.controllerUrl}`, superHero)
                .pipe(
                  catchError(this.handleError('editSuperHero'))) as Observable<SuperHero[]>;
  }

    /**
   * Returns a function that handles Http operation failures.
   * This error handler lets the app continue to run as if no error occurred.
   *
   * @param operation - name of the operation that failed
   */
    private handleError<T>(operation = 'operation') {
      return (error: HttpErrorResponse): Observable<T> => {
        // TODO: send the error to remote logging infrastructure
        console.error(error);  // log to console instead
  
        // If a native error is caught, do not transform it. We only want to
        // transform response errors that are not wrapped in an `Error`.
        if (error.error instanceof Event) {
          throw error.error;
        }
  
        const message = `server returned code ${error.status} with body "${error.error}"`;
        // TODO: better job of transforming error for user consumption
        throw new Error(`${operation} failed: ${message}`);
      };
    }
}
