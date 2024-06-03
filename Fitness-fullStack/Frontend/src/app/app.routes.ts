import { Routes } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';
import { HomeComponent } from './Components/home/home.component';
import { FitnessProgramsComponent } from './Components/fitness-programs/fitness-programs.component';

export const routes: Routes = [
    {
        path:'',
        redirectTo:'/login',
        pathMatch:'full'
    },
    {

        path:'login',
        component:LoginComponent
        
    },
    {

        path:'register',
        component:RegisterComponent
        
    },
    {

        path:'home',
        component:HomeComponent
    },
    {

        path:'fitness_program',
        component:FitnessProgramsComponent
    }

  

];
