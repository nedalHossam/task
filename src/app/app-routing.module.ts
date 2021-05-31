import { NgModule } from '@angular/core';
import { SignupComponent } from './components/signup/signup.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './services/auth-guard.service';


const routes: Routes = [
  {path:'register',component:SignupComponent},
  {path:'welcome',component:WelcomeComponent,canActivate:[AuthGuard]},
  {path:'',component:SignupComponent},
  {path: '**', redirectTo: '', pathMatch: 'full' }
  
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
