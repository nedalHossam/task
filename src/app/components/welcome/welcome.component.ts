import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  userName: string;

  constructor(private tokenService:TokenService,private _router: Router) { 
    this.userName = localStorage.getItem("userName")
  }

  ngOnInit(): void {
  } 

  logout()
  {
    console.log("log out");
    this.tokenService.removeToken();
    this._router.navigateByUrl('/');
  }

}
