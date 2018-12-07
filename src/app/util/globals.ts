import { HttpHeaders } from '@angular/common/http';

export const globals = {
  // API
  API_BASE: 'https://k3jlseejfb.execute-api.us-east-1.amazonaws.com/dev' || 'localhost:5000/api',
  get BASE() {
    return this.API_BASE;
  },

  // ENDPOINTS
  SEARCH: '/search',


  GITHUB_URL: 'https://github.com/benkrig/recommend.me-fe',


  get HEADERS() {
    return {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Cache-Control': 'no-cache', 'Access-Control-Allow-Origin': '*'})
    };
  },
};
