import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { TransaksiPageModule } from './transaksi.module';
import { TransaksiPage } from './transaksi.page';

describe('TransaksiPage', () => {
  let component: TransaksiPage;
  let fixture: ComponentFixture<TransaksiPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TransaksiPageModule, RouterModule.forRoot([])],
    });
    fixture = TestBed.createComponent(TransaksiPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
