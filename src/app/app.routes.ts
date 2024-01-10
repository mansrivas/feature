import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { FeatureComponent } from './feature/feature.component';

export const routes: Routes = [
    {
        path:'',
        component:LoginComponent
    },
    {
        path:'feature',
        component:FeatureComponent
    }
];
