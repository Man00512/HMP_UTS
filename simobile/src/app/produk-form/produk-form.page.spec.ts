import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { ProdukFormPageModule } from './produk-form.module';
import { ProdukFormPage } from './produk-form.page';

describe('ProdukFormPage', () => {
  let component: ProdukFormPage;
  let fixture: ComponentFixture<ProdukFormPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ProdukFormPageModule, RouterModule.forRoot([])],
    });
    fixture = TestBed.createComponent(ProdukFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('accepts Ionic number values without calling trim on a number', () => {
    component.nama = 'Produk Uji';
    component.kategori = 'Sembako';
    component.hargaBeli = 5000;
    component.hargaJual = 7000;
    component.stok = 0;
    expect(component.validasi()).toBe(true);
  });

  it('reports cleared numeric fields and preserves other input', () => {
    component.nama = 'Produk Tetap';
    component.kategori = 'Sembako';
    component.hargaBeli = null;
    component.hargaJual = 7000;
    component.stok = null;
    component.simpan();
    expect(component.errorHargaBeli).toBe('Harga beli wajib diisi');
    expect(component.errorStok).toBe('Stok wajib diisi');
    expect(component.nama).toBe('Produk Tetap');
    expect(component.hargaJual).toBe(7000);
  });

  it('rejects negative, non-numeric and fractional quantities', () => {
    expect(component.validasiAngka(-1, 'Stok', 0)).toBe('Stok tidak boleh negatif');
    expect(component.validasiAngka(0, 'Harga beli', 1)).toBe('Harga beli harus lebih dari 0');
    expect(component.validasiAngka('abc', 'Harga jual', 1)).toBe('Harga jual harus berupa angka bulat');
    expect(component.validasiAngka(1.5, 'Stok', 0)).toBe('Stok harus berupa angka bulat');
    expect(component.validasiAngka(NaN, 'Stok', 0)).toBe('Stok harus berupa angka bulat');
  });

  it('does not save an edit for a missing product', () => {
    component.modeEdit = true;
    component.idEdit = 99999;
    component.simpan();
    expect(component.produkTidakDitemukan).toBe(true);
  });
});
