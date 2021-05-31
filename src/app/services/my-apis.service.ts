import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

/* use those apis to get user geolocations and nationality all apis accept get request
https://backofficeapi.online-tkt.com/api/GetAllCountriesByLangName?LangCode=en
returns all countries with country codes
*********
https://api.ipify.org/?format=json
returns users ip adress
*********
use ip adress to get user geo location and country
https://ipapi.co/${ip-adress}/json/
*/

@Injectable({
  providedIn: 'root'
})
export class MyApisService {
  headers = {'Content-Type': 'application/json'};

  constructor(public http: HttpClient) { }

  getCountries(){
    return this.http.get(`https://backofficeapi.online-tkt.com/api/GetAllCountriesByLangName?LangCode=en`,{ headers: this.headers })
  }
  getIpAdress(){
    return this.http.get(`https://api.ipify.org/?format=json`,{ headers: this.headers })
  }
  getUserLocation(ip_adress){
    return this.http.get(`https://ipapi.co/${ip_adress}/json/`,{ headers: this.headers })
  }
}
