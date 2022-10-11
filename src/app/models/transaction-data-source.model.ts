import { DataSource } from "@angular/cdk/collections";
import { BehaviorSubject, catchError, finalize, Observable, of } from "rxjs";
import { Transaction, TransactionService } from "../services/transaction.service";

export class TransactionDataSource extends DataSource<any>{

    private transactionsSubject = new BehaviorSubject<Array<Transaction>>([]);
    private loadingSubject = new BehaviorSubject<boolean>(false);

    public loading$ = this.loadingSubject.asObservable();

    constructor(private txnService: TransactionService) {
        super();
    }

    connect(): Observable<any[]> {
        return this.transactionsSubject.asObservable();
    }

    disconnect() {
        this.transactionsSubject.complete();
        this.loadingSubject.complete();
    }

    // loadTransactions(pageIndex:number, pageSize:number) {
    //     this.loadingSubject.next(true);
    //     this.txnService.getTransactions(sortpageIndex,pageSize)
    //         .pipe(
    //             catchError(()=> of([])),
    //             finalize(()=> this.loadingSubject.next(false))
    //         ).subscribe(txns => { this.transactionsSubject.next(txns.data.transactions)});
    // }

    loadTransactions(sortColumn:string, sortDirection: string,pageIndex:number, pageSize:number) {
        this.loadingSubject.next(true);
        this.txnService.getTransactions(sortColumn, sortDirection, pageIndex,pageSize)
            .pipe(
                catchError(()=> of([])),
                finalize(()=> this.loadingSubject.next(false))
            ).subscribe(txns => { this.transactionsSubject.next(txns.data.transactions)});
    }
}