import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Produk } from '../produk';

@Component({
  selector: 'app-produk-form',
  templateUrl: './produk-form.page.html',
  styleUrls: ['./produk-form.page.scss'],
  standalone: false,
})
export class ProdukFormPage implements OnInit {

  nama: string = '';
  kategori: string = '';
  gambar: string = '';
  hargaBeli: string = '';
  hargaJual: string = '';
  stok: string = '0';

  kategoriList: string[] = [];
  modeEdit = false;
  idEdit = 0;

  errorNama: string = '';
  errorKategori: string = '';
  errorHargaBeli: string = '';
  errorHargaJual: string = '';
  errorStok: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private produkService: Produk
  ) { }

  ngOnInit() {
    this.kategoriList = this.produkService.getKategori();
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.modeEdit = true;
        this.idEdit = Number(params['id']);
        this.isiForm();
      }
    });
  }

  isiForm() {
    const produk = this.produkService.getProdukById(this.idEdit);
    if (produk) {

      this.nama = produk.nama;
      this.kategori = produk.kategori;
      this.gambar = produk.gambar;
      this.hargaBeli = String(produk.hargaBeli);
      this.hargaJual = String(produk.hargaJual);
      this.stok = String(produk.stok);
    }
  }


  validasi(): boolean {
    let valid = true;


    if (this.nama.trim() === '') {
      this.errorNama = 'Nama produk wajib diisi';
      valid = false;
    } else {
      this.errorNama = '';
    }


    if (this.kategori === '') {
      this.errorKategori = 'Kategori wajib dipilih';
      valid = false;
    } else {
      this.errorKategori = '';
    }


    const regexAngka = /^[0-9]+$/;
    if (this.hargaBeli.trim() === '') {
      this.errorHargaBeli = 'Harga beli wajib diisi';
      valid = false;
    } else if (!regexAngka.test(this.hargaBeli)) {
      this.errorHargaBeli = 'Harga beli harus berupa angka bulat positif';
      valid = false;
    } else if (Number(this.hargaBeli) < 1) {
      this.errorHargaBeli = 'Harga beli harus lebih dari 0';
      valid = false;
    } else {
      this.errorHargaBeli = '';
    }


    if (this.hargaJual.trim() === '') {
      this.errorHargaJual = 'Harga jual wajib diisi';
      valid = false;
    } else if (!regexAngka.test(this.hargaJual)) {
      this.errorHargaJual = 'Harga jual harus berupa angka bulat positif';
      valid = false;
    } else if (Number(this.hargaJual) < 1) {
      this.errorHargaJual = 'Harga jual harus lebih dari 0';
      valid = false;
    } else {
      this.errorHargaJual = '';
    }


    if (this.stok.trim() === '') {
      this.errorStok = 'Stok wajib diisi';
      valid = false;
    } else if (!regexAngka.test(this.stok)) {
      this.errorStok = 'Stok harus berupa angka bulat positif';
      valid = false;
    } else if (Number(this.stok) < 0) {
      this.errorStok = 'Stok tidak boleh negatif';
      valid = false;
    } else {
      this.errorStok = '';
    }

    return valid;
  }

  simpan() {

    if (!this.validasi()) {
      return;
    }
    const namaTrim = this.nama.trim();
    if (this.modeEdit) {
      this.produkService.updateProduk(
        this.idEdit, namaTrim, this.kategori, this.gambar,
        Number(this.hargaBeli), Number(this.hargaJual), Number(this.stok)
      );
    } else {
      this.produkService.tambahProduk(
        namaTrim, this.kategori, this.gambar,
        Number(this.hargaBeli), Number(this.hargaJual), Number(this.stok)
      );
    }
    this.router.navigate(['/produk']);
  }
}