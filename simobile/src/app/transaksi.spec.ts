import { TestBed } from '@angular/core/testing';

import { Transaksi } from './transaksi';
import { Produk } from './produk';
import { Keranjang } from './keranjang';

describe('Transaksi', () => {
  let service: Transaksi;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Transaksi);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('checks all stock before checkout and leaves all data intact on failure', () => {
    const produk = TestBed.inject(Produk);
    const cart = TestBed.inject(Keranjang);
    cart.tambahKeKeranjang(produk.daftarProduk[0]);
    cart.tambahKeKeranjang(produk.daftarProduk[1]);
    const firstStock = produk.daftarProduk[0].stok;
    produk.daftarProduk[1].stok = 0;
    expect(service.konfirmasi()).toBeUndefined();
    expect(produk.daftarProduk[0].stok).toBe(firstStock);
    expect(cart.getItems().length).toBe(2);
    expect(service.getSemua().length).toBe(0);
    expect(service.validasiCheckout()).toContain('tersisa 0');
  });

  it('stores an independent receipt, deducts stock and rejects a second empty checkout', () => {
    const produk = TestBed.inject(Produk);
    const cart = TestBed.inject(Keranjang);
    const barang = produk.daftarProduk[0];
    const stok = barang.stok;
    const harga = barang.hargaJual;
    const nama = barang.nama;
    cart.tambahKeKeranjang(barang);
    cart.tambahKeKeranjang(barang);
    const hasil = service.konfirmasi();
    expect(hasil?.total).toBe(harga * 2);
    expect(barang.stok).toBe(stok - 2);
    expect(cart.getTotalItem()).toBe(0);
    barang.nama = 'Nama baru';
    barang.hargaJual = 1;
    expect(hasil?.items[0].nama).toBe(nama);
    expect(hasil?.items[0].hargaJual).toBe(harga);
    expect(service.konfirmasi()).toBeUndefined();
    expect(service.getSemua().length).toBe(1);
  });

  it('groups best sellers by product ID even after a rename', () => {
    const produk = TestBed.inject(Produk);
    const cart = TestBed.inject(Keranjang);
    cart.tambahKeKeranjang(produk.daftarProduk[0]);
    cart.tambahKeKeranjang(produk.daftarProduk[0]);
    service.konfirmasi();
    produk.daftarProduk[0].nama = 'Beras Ganti Nama';
    cart.tambahKeKeranjang(produk.daftarProduk[0]);
    cart.tambahKeKeranjang(produk.daftarProduk[0]);
    for (let i = 0; i < 3; i++) cart.tambahKeKeranjang(produk.daftarProduk[1]);
    service.konfirmasi();
    expect(service.getProdukTerlaris()).toBe('Beras Ganti Nama');
  });

  it('excludes other dates and returns a copy of the history array', () => {
    const produk = TestBed.inject(Produk);
    TestBed.inject(Keranjang).tambahKeKeranjang(produk.daftarProduk[0]);
    const hasil = service.konfirmasi()!;
    hasil.tanggal.setDate(hasil.tanggal.getDate() - 1);
    expect(service.getJumlahHariIni()).toBe(0);
    expect(service.getTotalHariIni()).toBe(0);
    expect(service.getProdukTerlaris()).toBe('-');
    service.getSemua().pop();
    expect(service.getSemua().length).toBe(1);
  });
});
