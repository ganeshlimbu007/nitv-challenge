import { NgModule } from '@angular/core';
import {
  RouterModule,
  Routes,
} from '@angular/router';



const routes: Routes = [
  {
    path: 'users',
    loadChildren: () =>
      import('./pages/users/users.module').then(
        (m) => m.UsersModule
      ),
  },
  { path: '', redirectTo: 'users', pathMatch: 'full' },
  { path: '**', pathMatch: 'full', redirectTo: '/users' } // catch any unfound routes and redirect to home page

];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
