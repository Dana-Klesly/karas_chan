import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() {}

  setItem(key: string, value: any) {
    localStorage.setItem(key, value);
  }

  getItem(key: string): any {
    const data = localStorage.getItem(key);
    return data;
  }

  removeItem(key: string) {
    localStorage.removeItem(key);
  }

  clear() {
    localStorage.clear();
  }

  isLoggedIn(): boolean {
    const token = this.getItem('Token');
    return !!token;
  }
}
