import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private tokenStorageName: string = "token";
  constructor() { }

  setToken(token: string) {
    console.log(token)
    localStorage.setItem(this.tokenStorageName, token);
  }

  getToken() {
    let token: string = localStorage.getItem(this.tokenStorageName);
    //alert("token"+token)
    if (token == null || token == 'undefined') {
      return "";
    }
    return token;
  }

  hasAccessToken(): boolean {
    return (localStorage.getItem(this.tokenStorageName) != null && localStorage.getItem(this.tokenStorageName).length > 0)
}
  removeToken() {
    localStorage.removeItem(this.tokenStorageName);
    
 
  }

}
