import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailComponent } from './detail/detail.component';
import { CreateComponent } from './create/create.component';
import { UsersComponent } from './users.component';
import { CanActivateGuard } from './guards/can-activate.guard';
import { EditComponent } from './edit/edit.component';

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
        canActivate: [CanActivateGuard],

      },
      {
        path: ':id/edit',
        component: EditComponent,
       canActivate: [CanActivateGuard],

      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [CanActivateGuard]
})
export class UsersRoutingModule {
  static components = [UsersComponent, DetailComponent, CreateComponent];
}
