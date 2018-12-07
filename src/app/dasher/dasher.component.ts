import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import {BackendService} from '../services/backend.service';

@Component({
  selector: 'app-dasher',
  templateUrl: './dasher.component.html',
  styleUrls: ['./dasher.component.css'],
})
export class DasherComponent {
  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'Movies', cols: 1, rows: 1, movies: []},
          { title: 'People', cols: 1, rows: 1, persons: []}
        ];
      }

      return [
        { title: 'Movies', cols: 1, rows: 1, movies: []},
        { title: 'People', cols: 1, rows: 1, persons: []}
      ];
    })
  );

  updateCards() {
    const response = this.backend.response;

    this.cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
      map(({ matches }) => {
        if (matches) {
          return [
            { title: 'Movies', cols: 1, rows: response.movies.length, movies: response.movies},
            { title: 'People', cols: 1, rows: response.actors.length, persons: response.actors}
          ];
        }

        return [
          { title: 'Movies', cols: 1, rows: response.movies.length, movies: response.movies},
          { title: 'People', cols: 1, rows: response.actors.length, persons: response.actors}
        ];
      })
    );
  }

  constructor(private breakpointObserver: BreakpointObserver,
              private backend: BackendService) {}
}
