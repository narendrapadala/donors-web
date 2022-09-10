import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  private loggedInStatus = JSON.parse(localStorage.getItem('loggedIn') || ('false'));

  constructor() { }

  setLoginStatus(value: any) {
    this.loggedInStatus = value;
    localStorage.setItem('loggedIn', 'true');
  }

  setLogout(value : any){
    this.loggedInStatus = value;
    localStorage.removeItem('loggedIn');
  }

  get LoginStatus() {
    return JSON.parse(localStorage.getItem('loggedIn') || 
    this.loggedInStatus.toString());
  }
}
