import { Route } from '@angular/router';

export const appRoutes: Route[] = [
    {
        path: '',
        loadChildren: () => import('@nx-zorro-test/features/feature-shell').then(m => m.featureShellRoutes),
    }
];
