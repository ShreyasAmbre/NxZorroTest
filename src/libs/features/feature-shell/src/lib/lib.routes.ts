import { Route } from '@angular/router';
import { MainLayout } from './main-layout/main-layout';

export const featureShellRoutes: Route[] = [
    {
        path: '',
        component: MainLayout,
        children: [
            {
                path: 'dashboard',
                loadChildren: () => import('@nx-zorro-test/features/feature-dashboard').then(m => m.featureDashboardRoutes)
            }
        ]
    }
  
];
