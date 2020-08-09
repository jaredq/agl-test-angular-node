import { Component } from "@angular/core";

import { PeopleService } from "../people/people.service";

@Component({
  selector: "app-cat-list",
  templateUrl: "./cat-list.component.html",
  styleUrls: ["./cat-list.component.css"]
})
export class CatListComponent {
  constructor(private peopleService: PeopleService) {}

  showCats() {
    this.peopleService.getPeopleList();
  }
}

/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
