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
  // Input number Ionic mengirim number, atau null saat dikosongkan.
  hargaBeli: number | string | null = '';
  hargaJual: number | string | null = '';
  stok: number | string | null = 0;

  kategoriList: string[] = [];
  modeEdit = false;
  idEdit = 0;
  sudahDikirim = false;
  produkTidakDitemukan = false;

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
      this.resetForm();
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
      this.hargaBeli = produk.hargaBeli;
      this.hargaJual = produk.hargaJual;
      this.stok = produk.stok;
    } else {
      this.produkTidakDitemukan = true;
    }
  }


  resetForm() {
    this.nama = '';
    this.kategori = '';
    this.gambar = '';
    this.hargaBeli = '';
    this.hargaJual = '';
    this.stok = 0;
    this.modeEdit = false;
    this.idEdit = 0;
    this.sudahDikirim = false;
    this.produkTidakDitemukan = false;
    this.errorNama = '';
    this.errorKategori = '';
    this.errorHargaBeli = '';
    this.errorHargaJual = '';
    this.errorStok = '';
  }

  validasiAngka(nilai: number | string | null, label: string, minimum: number): string {
    if (nilai === null || String(nilai).trim() === '') {
      return label + ' wajib diisi';
    }
    // RegEx mengikuti latihan validasi pada Week 4.
    if (!/^-?[0-9]+$/.test(String(nilai))) {
      return label + ' harus berupa angka bulat';
    }
    if (Number(nilai) < minimum) {
      if (minimum === 0) return label + ' tidak boleh negatif';
      return label + ' harus lebih dari 0';
    }
    return '';
  }

  validasi(): boolean {
    this.errorNama = '';
    if ((this.nama || '').trim() === '') this.errorNama = 'Nama produk wajib diisi';
    this.errorKategori = '';
    if (!this.kategori) this.errorKategori = 'Kategori wajib dipilih';
    this.errorHargaBeli = this.validasiAngka(this.hargaBeli, 'Harga beli', 1);
    this.errorHargaJual = this.validasiAngka(this.hargaJual, 'Harga jual', 1);
    this.errorStok = this.validasiAngka(this.stok, 'Stok', 0);
    return !this.errorNama && !this.errorKategori && !this.errorHargaBeli
      && !this.errorHargaJual && !this.errorStok;
  }

  validasiSaatInput() {
    if (this.sudahDikirim) this.validasi();
  }

  simpan() {
    this.sudahDikirim = true;
    if (this.modeEdit && !this.produkService.getProdukById(this.idEdit)) {
      this.produkTidakDitemukan = true;
      return;
    }
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
    this.resetForm();
    this.router.navigate(['/produk']);
  }
}
