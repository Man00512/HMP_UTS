import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { TransaksiDetailPageModule } from './transaksi-detail.module';
import { TransaksiDetailPage } from './transaksi-detail.page';

describe('TransaksiDetailPage', () => {
  let component: TransaksiDetailPage;
  let fixture: ComponentFixture<TransaksiDetailPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TransaksiDetailPageModule, RouterModule.forRoot([])],
    });
    fixture = TestBed.createComponent(TransaksiDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
