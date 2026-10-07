import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { ProdukDetailPageModule } from './produk-detail.module';
import { ProdukDetailPage } from './produk-detail.page';

describe('ProdukDetailPage', () => {
  let component: ProdukDetailPage;
  let fixture: ComponentFixture<ProdukDetailPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ProdukDetailPageModule, RouterModule.forRoot([])],
    });
    fixture = TestBed.createComponent(ProdukDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
