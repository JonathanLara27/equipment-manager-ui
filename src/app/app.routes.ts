import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./shared/components/dashboard/dashboard.component').then(m => m.DashboardComponent),
        title: 'Dashboard'
    }
];
