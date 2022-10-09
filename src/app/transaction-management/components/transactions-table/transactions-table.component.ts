import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs';
import { TransactionDataSource } from 'src/app/models/transaction-data-source.model';
import { TransactionService } from 'src/app/services/transaction.service';

@Component({
  selector: 'app-transactions-table',
  templateUrl: './transactions-table.component.html',
  styleUrls: ['./transactions-table.component.css']
})
export class TransactionsTableComponent implements OnInit {

  displayedColumns = ["referenceId", "customerName", "amount", "currency"];
  dataSource: TransactionDataSource;
  totalTransactionsSize! : number;
  defaultPageSize :number = 5;

  @ViewChild(MatPaginator)paginator! : MatPaginator;

  constructor(private transactionService: TransactionService, private route:ActivatedRoute) {
    this.dataSource = new TransactionDataSource(this.transactionService);
  }

  ngOnInit(): void {
    this.totalTransactionsSize = this.route.snapshot.data["totalCount"];
    this.dataSource.loadTransactions(0,this.defaultPageSize);
  }

  ngAfterViewInit() {
    this.paginator.page
      .pipe(
        tap(()=>this.loadTransactionsPage())
      ).subscribe();
  }

  loadTransactionsPage(){
    this.dataSource.loadTransactions(this.paginator.pageIndex, this.paginator.pageSize);
  }

}
