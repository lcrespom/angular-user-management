import { Routes } from '@angular/router';

import { Home } from './pages/home/home';
import { UserEdit } from './pages/user-edit/user-edit';
import { UsersTable } from './pages/users-table/users-table';

export const routes: Routes = [
  {
    path: '',
    component: Home,
    pathMatch: 'full',
  },
  {
    path: 'users',
    component: UsersTable,
    pathMatch: 'full',
  },
  {
    path: 'users/:id',
    component: UserEdit,
  },
];
