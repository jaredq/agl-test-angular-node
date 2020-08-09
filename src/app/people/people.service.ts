import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

export interface Pet {
  name: string,
  type: string
}

export interface People {
  name: string,
  gender: string,
  age: number,
  pets: Pet[]
}

@Injectable()
export class PeopleService {
  constructor(private http: HttpClient) {}

  peopleListApiUrl = "http://agl-developer-test.azurewebsites.net/people.json";

  getPeopleList(): Observable<People[]> {
    return this.http.get(this.peopleListApiUrl) as Observable<People[]>;
  }
}
