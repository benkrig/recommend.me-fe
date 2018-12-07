import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { globals } from '../util/globals';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  get response(): any {
    return this._response;
  }

  set response(value: any) {
    this._response = value;
  }

  private _response = {
    movies: [],
    actors: []
  };

  constructor(private http: HttpClient,
              private router: Router,
              private snackBar: MatSnackBar) { }

  search(q: string, next) {
    const subscriptionKey = 'b61a4d9d560a4ca0a5850f1d23baaa94';
    const host = 'https://api.cognitive.microsoft.com';
    const path = '/bing/v7.0/images/search';
    const term = 'tom hanks';


    const request_params = {
      method : 'GET',
      hostname : host,
      path : host + path + '?q=' + encodeURIComponent(term),
      headers : new HttpHeaders({
        'Ocp-Apim-Subscription-Key' : subscriptionKey,
      })
    };

    this.http.get(request_params.path, {headers: request_params.headers}).subscribe((r: any) => {
      console.log(r);
    });
    const headers = globals.HEADERS;
    const params = new HttpParams().set('q', q);

    this.http.get(globals.BASE + globals.SEARCH, {headers: <HttpHeaders>headers, params: <HttpParams>params}).subscribe(
      (r: any) => {
        this.response = JSON.parse(r);
        next(null, JSON.parse(r));
      },
      (e) => {
        this.openSnackBar(e, 2000);
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

  async getImageUrl(q: string) {
    const subscriptionKey = '';
    const host = 'https://api.cognitive.microsoft.com';
    const path = '/bing/v7.0/images/search';
    const term = 'tom hanks';


    const request_params = {
      method : 'GET',
      hostname : host,
      path : host + path + '?q=' + encodeURIComponent(term),
      headers : new HttpHeaders({
        'Ocp-Apim-Subscription-Key' : subscriptionKey,
      })
    };

    this.http.get(request_params.path, {headers: request_params.headers}).subscribe((r: any) => {
      return r.value[0].contentUrl;
    });
  }
}

