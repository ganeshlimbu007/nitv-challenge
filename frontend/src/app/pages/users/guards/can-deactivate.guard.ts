import { Injectable } from '@angular/core';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { CreateComponent} from '../create/create.component'

@Injectable()
export class CanDeactivateGuard implements CanDeactivate<CreateComponent> {

  constructor() {}

  canDeactivate(
    component: CreateComponent,
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {


    // Check with component to see if we're able to deactivate
    return true//component.canDeactivate();
  }
}
