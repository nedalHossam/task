import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CustomvalidationService } from 'src/app/services/customvalidation.service';
import { MyApisService } from 'src/app/services/my-apis.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  ip_adress: string;
  selected_country: string;
  registerForm: FormGroup;
  countries;
  private subscription: Subscription;

  constructor(private formBuilder: FormBuilder, private UsersProvider: MyApisService, private _router: Router,
    private _tokenService: TokenService, private customValidator: CustomvalidationService) {
    this.getCountries();
    this.getIpAdress()
  }


  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z \W]+')])],
      email: ['', Validators.compose([Validators.required,Validators.email])],
      nationality: ['', [Validators.required]],
      ip_address: ['', [Validators.required]],
      password: ['', Validators.compose([Validators.required, Validators.minLength(8), Validators.pattern('^[^\u0621-\u064A]+$')])],
      confirm_password: ['', Validators.compose([Validators.required])]
    },
      {
        validator: this.customValidator.MatchPassword('password', 'confirm_password')
      });


  }

  get f() { return this.registerForm.controls; }

  getCountries() {
    this.UsersProvider.getCountries()
      .subscribe((res) => {
        this.countries = res;
        this.countries.sort((a, b) => {
          if (a.countryName < b.countryName) { return -1; }
          if (a.countryName > b.countryName) { return 1; }
          return 0;
        })
      },
        (err) => {
          console.error(err);
        });
  }

  getIpAdress() {
    this.UsersProvider.getIpAdress().subscribe((res: any) => {
      this.ip_adress = res.ip;
      this.UsersProvider.getUserLocation(res.ip).subscribe((result: any) => {
        if (result) {
          this.selected_country = result.country_name;
        }
      },
        (err) => {
          console.error(err);
        });
    },
      (err) => {
        console.error(err);
      })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  disableArabic(event){
    var k;  
    k = event.charCode;  //         k = event.keyCode;  (Both can be used)
   return((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || k == 32 || (k >= 48 && k <= 57)); 

  }

  onSubmit() {
    if (this.registerForm.invalid) {
      return;
    }
    else {
      this._tokenService.setToken(this.registerForm.value.email);
      localStorage.setItem("userName", this.registerForm.value.name)
      this._router.navigateByUrl("/welcome");


    }
  }

}
