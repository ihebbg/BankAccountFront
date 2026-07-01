import { Routes } from '@angular/router';
export const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'home', loadComponent: () => import('./accueil/accueil.component').then(c => c.AccueilComponent),title:"Home",
        children: [
            {
                path: 'customers', loadComponent: () => import('./customer/list-customers/list-customers.component').then(c => c.ListCustomersComponent),title:"Customers",

            },
            {
                path: 'add-customer', loadComponent: () => import('./customer/add-customer/add-customer.component').then(c => c.AddCustomerComponent),title:"New Customer",

            },
            {
                path: 'accounts', loadComponent: () => import('./account/list-accounts/list-accounts.component').then(c => c.ListAccountsComponent),title:"Accounts",

            },
            {
                path: 'add-account', loadComponent: () => import('./account/add-account/add-account.component').then(c => c.AddAccountComponent),title:"New Account",

            },
            {
                path: 'operations', loadComponent: () => import('./operation/list-operations/list-operations.component').then(c => c.ListOperationsComponent),title:"Operations",

            },
            {
                path: 'add-operation', loadComponent: () => import('./operation/add-operation/add-operation.component').then(c => c.AddOperationComponent),title:"New Operation",

            }
        ]

    },
    {
        path: '**',
        redirectTo: 'home'
    },


];
