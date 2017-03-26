import { Routes, RouterModule } from '@angular/router';
import { Home } from '../public/home/home';
import { Login } from '../public/login/login';
// import { Signup } from './public/signup/signup';
import { AuthGuard } from './authguard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Login },
{ path: 'home', component: Home, canActivate: [AuthGuard] },
  { path: '**', redirectTo: 'login' },  // Comes last
];
export const routing = RouterModule.forRoot(routes);
