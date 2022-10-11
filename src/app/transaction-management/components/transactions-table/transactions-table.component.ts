import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ActivatedRoute } from '@angular/router';
import { merge, tap } from 'rxjs';
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
  @ViewChild(MatSort) sort!:MatSort;

  constructor(private transactionService: TransactionService, private route:ActivatedRoute) {
    this.dataSource = new TransactionDataSource(this.transactionService);
  }

  ngOnInit(): void {
    this.totalTransactionsSize = this.route.snapshot.data["totalCount"];
    this.dataSource.loadTransactions('','asc',0,this.defaultPageSize);
  }

  ngAfterViewInit() {

    this.sort.sortChange.subscribe(()=>this.paginator.pageIndex=0);

    merge(this.sort.sortChange,this.paginator.page)
      .pipe(
        tap(()=>this.loadTransactionsPage())
      ).subscribe();
  }

  loadTransactionsPage(){
    this.dataSource.loadTransactions(this.sort.active,this.sort.direction,this.paginator.pageIndex, this.paginator.pageSize);
  }

}
