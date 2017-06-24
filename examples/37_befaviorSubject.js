/* eslint-disable */

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";

@Injectable()
export class AuthService {
  isLoginSubject = new BehaviorSubject<boolean>(this.hasToken()); // valore iniziale

  isLoggedIn(): Observable<boolean> {
    return this.isLoginSubject.asObservable().share(); // evitiamo di creare più di una subscription
  }

  /**
   *  Login the user then tell all the subscribers about the new status
   */
  login(): void {
    localStorage.setItem('token', 'JWT');
    this.isLoginSubject.next(true);
  }

  /**
   * Log out the user then tell all the subscribers about the new status
   */
  logout(): void {
    localStorage.removeItem('token');
    this.isLoginSubject.next(false);
  }

  private hasToken(): boolean {
    return !!localStorage.getItem('token');
  }
}
