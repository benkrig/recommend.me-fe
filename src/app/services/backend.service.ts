import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import {globals} from '../util/globals';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor(private http: HttpClient,
              private router: Router,
              private snackBar: MatSnackBar) { }

  search(q: string, next) {
    const headers = globals.HEADERS;

    const params = new HttpParams().set('q', q);

    this.http.get(globals.BASE + globals.SEARCH, {params: <HttpParams>params}).subscribe(
      (r: any) => {
        r.user.forEach((j) => {
          JSON.parse(q);
        });
        next(null, r.user);
      },
      (e) => {
        this.openSnackBar(e.error.message, 2000);
        next(e, null);
      });
  }
  /**
   * Utilities
   * */
  openSnackBar(message: string, duration: number) {
    this.snackBar.dismiss();
    this.snackBar.open(message, null, {
      duration: duration || 2000,
    });
  }
}

