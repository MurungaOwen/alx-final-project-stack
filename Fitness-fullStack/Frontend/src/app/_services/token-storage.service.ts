import { Injectable } from '@angular/core';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  constructor() { }

   // Function to set user ID in sessionStorage
   setUserId(userId: string): void {
    localStorage.setItem('userId', userId);
  }

  // Function to get user ID from sessionStorage
  getUserId(): string | null {
    return localStorage.getItem('userId');
  }

  // Function to clear user ID from sessionStorage (e.g., on logout)
  clearUserId(): void {
    localStorage.removeItem('userId');
  }

  signOut(): void {
    this.clearUserId();
  }

  public saveToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string | null {
    return window.sessionStorage.getItem(TOKEN_KEY);
  }

  public saveUser(user: any): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser(): any {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }

    return {};
  }
}
