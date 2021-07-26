import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailComponent } from './detail/detail.component';
import { CreateComponent } from './create/create.component';
import { UsersComponent } from './users.component';
import { CanActivateGuard } from './guards/can-activate.guard';
import { CanDeactivateGuard } from './guards/can-deactivate.guard';

const routes: Routes = [
  {
    path: '',
    component: UsersComponent,
    children: [
      {
        path: 'detail',
        component: DetailComponent,
      },
      {
        path: '',
        redirectTo: 'detail',
        pathMatch: 'full',
      },
      {
        path: 'create',
        component: CreateComponent,
       /*  canActivate: [CanActivateGuard],
        canDeactivate: [CanDeactivateGuard], */
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {
  static components = [UsersComponent, DetailComponent, CreateComponent];
}
