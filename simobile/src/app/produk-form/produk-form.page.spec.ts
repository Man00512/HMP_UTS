import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router, RouterModule } from '@angular/router';
import { Produk } from '../produk';
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
    component.formProduk.patchValue({
      nama: 'Produk Uji', kategori: 'Sembako', hargaBeli: 5000, hargaJual: 7000, stok: 0,
    });
    expect(component.formProduk.valid).toBe(true);
  });

  it('reports cleared numeric fields and preserves other input', () => {
    component.formProduk.patchValue({
      nama: 'Produk Tetap', kategori: 'Sembako', hargaBeli: null, hargaJual: 7000, stok: null,
    });
    component.simpan();
    expect(component.pesanError('hargaBeli')).toBe('Harga beli wajib diisi');
    expect(component.pesanError('stok')).toBe('Stok wajib diisi');
    expect(component.formProduk.controls.nama.value).toBe('Produk Tetap');
    expect(component.formProduk.controls.hargaJual.value).toBe(7000);
  });

  it('rejects negative, non-numeric and fractional quantities', () => {
    component.formProduk.markAllAsTouched();
    component.formProduk.patchValue({ stok: -1, hargaBeli: 0, hargaJual: 'abc' as unknown as number });
    expect(component.pesanError('stok')).toBe('Stok tidak boleh negatif');
    expect(component.pesanError('hargaBeli')).toBe('Harga beli harus lebih dari 0');
    expect(component.pesanError('hargaJual')).toBe('Harga jual harus berupa angka');
    component.formProduk.controls.stok.setValue(1.5);
    expect(component.pesanError('stok')).toBe('Stok harus berupa angka bulat');
    component.formProduk.controls.hargaJual.setValue(NaN);
    expect(component.pesanError('hargaJual')).toBe('Harga jual harus berupa angka');
  });

  it('does not save an edit for a missing product', () => {
    component.modeEdit = true;
    component.idEdit = 99999;
    component.simpan();
    expect(component.produkTidakDitemukan).toBe(true);
  });

  it('rejects whitespace names and updates errors immediately after correction', () => {
    component.formProduk.controls.nama.setValue('   ');
    component.formProduk.controls.nama.markAsDirty();
    expect(component.pesanError('nama')).toBe('Nama produk wajib diisi');
    component.formProduk.controls.nama.setValue('Beras');
    expect(component.pesanError('nama')).toBe('');
    component.formProduk.controls.hargaBeli.setValue(0.5);
    expect(component.formProduk.controls.hargaBeli.valid).toBe(true);
  });

  it('saves a valid reactive form once, resets it and returns to products', () => {
    const produk = TestBed.inject(Produk);
    const navigate = vi.spyOn(TestBed.inject(Router), 'navigate').mockResolvedValue(true);
    const jumlah = produk.getJumlahProduk();
    component.formProduk.patchValue({
      nama: '  Produk Baru  ', kategori: 'Sembako', hargaBeli: 5000, hargaJual: 7000, stok: 2,
    });
    component.simpan();
    expect(produk.getJumlahProduk()).toBe(jumlah + 1);
    expect(produk.daftarProduk[jumlah].nama).toBe('Produk Baru');
    expect(navigate).toHaveBeenCalledWith(['/produk']);
    expect(component.formProduk.controls.nama.value).toBe('');
    component.simpan();
    expect(produk.getJumlahProduk()).toBe(jumlah + 1);
  });

  it('loads and edits the selected product without adding another product', () => {
    const produk = TestBed.inject(Produk);
    vi.spyOn(TestBed.inject(Router), 'navigate').mockResolvedValue(true);
    const jumlah = produk.getJumlahProduk();
    component.modeEdit = true;
    component.idEdit = 1;
    component.isiForm();
    expect(component.formProduk.controls.nama.value).toBe(produk.getProdukById(1)?.nama);
    component.formProduk.patchValue({ nama: 'Nama Baru', hargaJual: 10000, stok: 3 });
    component.simpan();
    expect(produk.getJumlahProduk()).toBe(jumlah);
    expect(produk.getProdukById(1)?.nama).toBe('Nama Baru');
    expect(produk.getProdukById(1)?.stok).toBe(3);
  });
});