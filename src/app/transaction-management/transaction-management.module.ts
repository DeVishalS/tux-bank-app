import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionsListComponent } from './components/transactions-list/transactions-list.component';
import { InitTransactionComponent } from './components/init-transaction/init-transaction.component';
import { TransactionManagementRoutingModule } from './transaction-management-routing.module';
import { TransactionsTableComponent } from './components/transactions-table/transactions-table.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';



@NgModule({
  declarations: [
    TransactionsListComponent,
    InitTransactionComponent,
    TransactionsTableComponent
  ],
  imports: [
    CommonModule,
    TransactionManagementRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ],
  exports:[
    TransactionsListComponent,
    InitTransactionComponent,
    TransactionsTableComponent
  ]
})
export class TransactionManagementModule { }