import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InitTransactionComponent } from './init-transaction.component';

describe('InitTransactionComponent', () => {
  let component: InitTransactionComponent;
  let fixture: ComponentFixture<InitTransactionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InitTransactionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InitTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
