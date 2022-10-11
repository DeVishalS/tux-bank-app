import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  // baseUrl: string = 'http://localhost:8080'
  private fakeDbSequence: number = 1;

  private transactionHistory!: Array<Transaction>;

  constructor(private http: HttpClient) { 
    this.transactionHistory = 
    [
      { customerName: 'Vishal', amount: 300, currency: 'USD', referenceId: this.createReferenceNumber() },
      { customerName: 'Raj', amount: 800, currency: 'EUR', referenceId: this.createReferenceNumber() },
      { customerName: 'Krati', amount: 100, currency: 'CHF', referenceId: this.createReferenceNumber() },
      { customerName: 'John', amount: 50, currency: 'USD', referenceId: this.createReferenceNumber() },
      { customerName: 'Vishal', amount: 900, currency: 'USD', referenceId: this.createReferenceNumber() },
      { customerName: 'Bob', amount: 1200, currency: 'USD', referenceId: this.createReferenceNumber() },
      { customerName: 'Vishal', amount: 400, currency: 'EUR', referenceId: this.createReferenceNumber() },
      { customerName: 'Raj', amount: 500, currency: 'USD', referenceId: this.createReferenceNumber() },
      { customerName: 'Vishal', amount: 600, currency: 'EUR', referenceId: this.createReferenceNumber() },
      { customerName: 'Krati', amount: 100, currency: 'USD', referenceId: this.createReferenceNumber() }
    ]
  }

  compareValues(key:string, order = 'asc') {
    return function innerSort(a:any, b:any) {
      if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
        // property doesn't exist on either object
        return 0;
      }
  
      const varA = (typeof a[key] === 'string')
        ? a[key].toUpperCase() : a[key];
      const varB = (typeof b[key] === 'string')
        ? b[key].toUpperCase() : b[key];
  
      let comparison = 0;
      if (varA > varB) {
        comparison = 1;
      } else if (varA < varB) {
        comparison = -1;
      }
      return (
        (order === 'desc') ? (comparison * -1) : comparison
      );
    };
  }

  getTransactions(sortColumn:string, sortDirection:string, pageIndex: number, pageSize: number): Observable<any> {

    this.transactionHistory.sort(this.compareValues(sortColumn,sortDirection));

    return of(
      {
        data:
        {
          totalSize: this.transactionHistory.length,
          transactions: [...this.transactionHistory].reverse().slice(pageIndex * pageSize, pageIndex * pageSize + pageSize),
        }
      }
    ).pipe(delay(1000));

    // return this.http.get(`${this.baseUrl}/transactions`).pipe(delay(3000));
  }

  submitTransaction(transaction:Transaction):Observable<any>{
    let txnRefNo = this.createReferenceNumber();
    this.transactionHistory.push({ referenceId: txnRefNo , customerName : transaction.customerName, amount : transaction.amount, currency : transaction.currency });
    return of({ referenceId: txnRefNo });
  }

  private createReferenceNumber(){
    let today = new Date();
    return `CUS${today.getFullYear()}${today.getMonth()+1}${ ( '0'+ today.getDate() ).slice(-2) }${ ( '00000' + (++this.fakeDbSequence) ).slice(-6)}`;
  }

  getCountOfTotalTxns(){
    return of(this.transactionHistory.length).pipe(delay(300));
  }
}

export interface Transaction {
  customerName: string;
  amount: number;
  currency: string;
  referenceId: string;
}
