import { Route } from '@angular/router';
import { DvExampleAddonComponent } from './components/dv-example-addon/dv-example-addon.component';
import { AutoLoginPartialRoutesGuard } from 'angular-auth-oidc-client';

export const appRoutes: Route[] = [
    {
        path: 'dv-example-addon',
        component: DvExampleAddonComponent,
        canActivate: [AutoLoginPartialRoutesGuard]
    }
];
