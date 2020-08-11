import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

/**
 * Pet type
 */
export interface Pet {
  name: string;
  type: string;
}

/**
 * People type
 */
export interface People {
  name: string;
  gender: string;
  age: number;
  pets: Pet[];
}

/**
 * Pet group
 */
export interface PetGroups {
  Male?: string[];
  Female?: string[];
  Other?: string[];
}

@Injectable({
  providedIn: 'root'
})
export class PeopleService {
  public static readonly PEOPLE_GENDER_MALE = 'Male';
  public static readonly PEOPLE_GENDER_FEMALE = 'Female';
  public static readonly PEOPLE_GENDER_OTHER = 'Other';

  public static readonly PET_TYPE_CAT = 'Cat';
  public static readonly PET_TYPE_DOG = 'Dog';

  public static readonly DEFAULT_PET_NAME = 'Unknown';

  constructor(private http: HttpClient) { }

  peopleListApiUrl = 'https://agl-developer-test.azurewebsites.net/people.json';

  /**
   * fetch the people list from API
   */
  getPeopleList(): Observable<People[]> {
    return this.http.get<People[]>(this.peopleListApiUrl).pipe(
      tap(_ => console.log('fetched people list')),
      catchError(this.handleError<People[]>('getPeopleList', []))
    );
  }

  /**
   * Group cats by its owner's gender
   */
  groupPetsByPeopleGender(peopleList: People[], petTypeFilter: string): PetGroups {
    const petGroups: PetGroups = {};

    peopleList.forEach(people => {
      const pets = people.pets || [];
      pets.forEach(pet => {
        if (this.toTitleCase(pet && pet.type) === petTypeFilter) {
          const peopleGender = this.toFormattedGender(people.gender);
          const petGroup = petGroups[peopleGender] || [];
          petGroup.push(pet.name || PeopleService.DEFAULT_PET_NAME);
          petGroups[peopleGender] = petGroup;
        }
      });
    });

    this.sortPetNames(petGroups.Male);
    this.sortPetNames(petGroups.Female);
    this.sortPetNames(petGroups.Other);

    return petGroups;
  }

  /**
   * sort pet names in alphabetical order
   */
  private sortPetNames(petGroup: string[]): void {
    if (petGroup) {
      petGroup.sort((a, b) => a.localeCompare(b));
    }
  }

  /**
   * format gender
   */
  private toFormattedGender(gender: string): string {
    let formattedGender = this.toTitleCase(gender);
    if (
      formattedGender !== PeopleService.PEOPLE_GENDER_MALE &&
      formattedGender !== PeopleService.PEOPLE_GENDER_FEMALE
    ) {
      formattedGender = PeopleService.PEOPLE_GENDER_OTHER;
    }
    return formattedGender;
  }

  /**
   * Convert a string to titled string
   */
  private toTitleCase(str: string): string {
    return str.charAt(0).toUpperCase() + str.substr(1).toLowerCase();
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
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
