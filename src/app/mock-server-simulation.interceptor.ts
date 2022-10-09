import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { TransactionService } from './services/transaction.service';

@Injectable()
export class MockServerSimulationInterceptor implements HttpInterceptor {


  constructor(private transactionService: TransactionService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request);
  }

  getUniqueReferenceTxnId(){
    
    // return 
  }
}
