import { Injectable, NgModule } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterModule, RouterStateSnapshot, Routes } from '@angular/router';
import { Observable } from 'rxjs';
import { TransactionService } from '../services/transaction.service';
import { InitTransactionComponent } from './components/init-transaction/init-transaction.component';
import { TransactionsListComponent } from './components/transactions-list/transactions-list.component';

@Injectable({ providedIn: 'root' })
export class TransctionHistoryResolver implements Resolve<number>{

  constructor(private txnService:TransactionService){}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): number | Observable<number> | Promise<number> {
    return this.txnService.getCountOfTotalTxns();  
  }

}


const routes: Routes = [
  { path: '', redirectTo:'history', pathMatch:'full' },
  { path: 'history', component: TransactionsListComponent, resolve : { totalCount : TransctionHistoryResolver} },
  { path: 'initiate-new', component: InitTransactionComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransactionManagementRoutingModule { }