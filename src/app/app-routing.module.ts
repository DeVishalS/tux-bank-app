import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './guards/auth/auth.guard';
import { NavigationComponent } from './navigation/navigation.component';

const routes: Routes = [
  { path: '', redirectTo: 'txn', pathMatch: 'full'},
  { path: 'login', component: LoginComponent },
  { 
    path: 'txn',
    component: NavigationComponent,
    loadChildren : () => import('./transaction-management/transaction-management.module').then(m => m.TransactionManagementModule),
    canActivate:[AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
