import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

export interface User {
  name: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  myControl = new FormControl();
  options: User[] = [
    {name: 'Mary'},
    {name: 'Shelley'},
    {name: 'Igor'}
  ];
  filteredOptions: Observable<User[]>;
  constructor() { }

  hero_msg = 'We build great websites';
  multi_platform_access_header = 'Provide access across all platforms'.toUpperCase();
  multi_platform_access_message = 'We focus on providing a robust and modern user experience for your customers across all platforms. Metafora delivers great business solutions for web, mobile web, native mobile, and native desktop.';

  tech_stack_header = 'Choose your desired tech stack'.toUpperCase();
  tech_stack_message = 'Personalize your product to meet your own unique requirements. Metafora has experience delivering professional products over a variety of modern frameworks, including a variety of Content Management Systems.';

  analysis_header = 'Track and analyze your market'.toUpperCase();
  analysis_message = 'Harness the power of cloud analytics to better understand your customers. Improve user engagement, click-throughs, and lead generation through the use of powerful analytic tools.';

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith<string | User>(''),
        map(value => typeof value === 'string' ? value : value.name),
        map(name => name ? this._filter(name) : this.options.slice())
      );
  }

  displayFn(user?: User): string | undefined {
    return user ? user.name : undefined;
  }

  private _filter(name: string): User[] {
    const filterValue = name.toLowerCase();

    return this.options.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
  }
}
