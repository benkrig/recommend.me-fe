import { environment } from '../../environments/environment';
import { HttpHeaders } from '@angular/common/http';

export const globals = {
  // API
  API_BASE: environment.API_BASE || 'localhost:5000/api',
  get BASE() {
    return this.API_BASE + this.API_VERSION;
  },

  // STORAGE
  STORAGE_KEY: 'Authorization',
  get JWT() {
    return localStorage.getItem(this.STORAGE_KEY);
  },

  // ENDPOINTS
  SEARCH: '/search',


  GITHUB_URL: 'https://github.com/benkrig/recommend.me-fe',


  get HEADERS() {
    return {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Cache-Control': 'no-cache', 'Access-Control-Allow-Origin': '*'})
    };
  },
  get AUTH_HEADERS() {
    return new HttpHeaders({'Content-Type': 'application/json',
      'Cache-Control': 'no-cache',
      'Authorization': localStorage.getItem(this.STORAGE_KEY),
      'Access-Control-Allow-Origin': '*'});
  },
};
