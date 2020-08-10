import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";

export interface Pet {
  name: string;
  type: string;
}

export interface People {
  name: string;
  gender: string;
  age: number;
  pets: Pet[];
}

@Injectable({
  providedIn: "root"
})
export class PeopleService {
  constructor(private http: HttpClient) {}

  peopleListApiUrl = "http://agl-developer-test.azurewebsites.net/people.json";

  getPeopleList(): Observable<People[]> {
    return this.http.get<People[]>(this.peopleListApiUrl).pipe(
      tap(_ => console.log("fetched people list")),
      catchError(this.handleError<People[]>("getPeopleList", []))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      alert(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
