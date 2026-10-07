import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { ProdukPageModule } from './produk.module';
import { ProdukPage } from './produk.page';

describe('ProdukPage', () => {
  let component: ProdukPage;
  let fixture: ComponentFixture<ProdukPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ProdukPageModule, RouterModule.forRoot([])],
    });
    fixture = TestBed.createComponent(ProdukPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('shows all products when the clear button emits null', () => {
    component.kataKunci = null;
    expect(component.produkTampil().length).toBe(component.listProduk.length);
  });

  it('combines real-time name search and category selection', () => {
    component.kataKunci = 'BERAS';
    expect(component.produkTampil().length).toBe(1);
    component.kategoriDipilih = 'Minuman';
    expect(component.produkTampil()).toEqual([]);
  });
});
