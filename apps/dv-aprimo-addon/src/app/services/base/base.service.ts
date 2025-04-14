import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export abstract class BaseService {

    /**
   * A utility method to handle errors in observables.
   * @param operation | The name of the operation that failed.
   * @param result | The result to return in case of an error.
   * @returns 
   */
    protected handleError<T>(operation = 'operation', result?: T) {
      return (error: unknown): Observable<T> => {
          console.error(`${operation} failed: ${(error as Error).message}`);
          return of(result as T);
      };
    }
}