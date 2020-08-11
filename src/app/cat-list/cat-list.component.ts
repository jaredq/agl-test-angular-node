import { Component } from "@angular/core";

import { PeopleService, People } from "../people/people.service";

@Component({
  selector: "app-cat-list",
  templateUrl: "./cat-list.component.html",
  styleUrls: ["./cat-list.component.css"]
})
export class CatListComponent {
  constructor(private peopleService: PeopleService) {}

  peopleList = [];

  catGroups;

  showCats() {
    this.peopleService.getPeopleList().subscribe(peopleList => {
      this.peopleList = peopleList;

      this.catGroups = this.peopleService.groupPetsByPeopleGender(
        this.peopleList,
        PeopleService.PET_TYPE_CAT
      );
    });
  }
}

/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
