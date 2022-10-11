import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { TransactionService } from 'src/app/services/transaction.service';

@Component({
  selector: 'app-init-transaction',
  templateUrl: './init-transaction.component.html',
  styleUrls: ['./init-transaction.component.css']
})
export class InitTransactionComponent implements OnInit {

  regions: Array<string> = ['Port Louis', 'Curepipe', 'Vacoas', 'Port Mathurin'];
  currencies: Array<string> = ['AED', 'EUR', 'CHF', 'MUR', 'USD'];

  transactionDetails: FormGroup;
  submissionState: string = '';

  refId: string = '';
  initialValues: any;

  @ViewChild(FormGroupDirective) formDirective!: FormGroupDirective;


  constructor(private fb: FormBuilder, private txnService: TransactionService) {
    this.transactionDetails = this.fb.group(
      {
        customerType: ["New", Validators.required],
        customerNumber: ["", [Validators.required]],
        customerName: ["", [Validators.required]],
        customerAddress: ["", [Validators.required]],
        customerPhone: ["", [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
        amount: ["", [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
        currency: ["", [Validators.required]],
        beneficiaryBank: ["", [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
        beneficiaryAccountNumber: ["", [Validators.required]],
        paymentDetails: ["", [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
        cardDetails: ["", [Validators.required]],
        region: ["", [Validators.required]]
      }
    );
    this.initialValues = this.transactionDetails.value;
  }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.transactionDetails.valid) {
      this.submissionState == 'INPROGRESS';
      console.log(this.transactionDetails.value);
      this.txnService.submitTransaction(this.transactionDetails.value).subscribe(
        (data) => {
          this.submissionState = 'SUCCESS';
          this.refId = data.referenceId;
          this.formDirective.resetForm(this.initialValues);
          // setTimeout(() => this.submissionState = '', 5000)
        },
        () => {
          this.submissionState = 'ERROR';
          this.refId = '';
          // setTimeout(() => this.submissionState = '', 10000)
        }
      )
    };
  }

}
