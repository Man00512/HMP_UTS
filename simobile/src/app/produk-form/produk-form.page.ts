import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Produk } from '../produk';

// Soal UTS: harga wajib berupa angka yang lebih besar dari 0.
function hargaPositif(control: AbstractControl): ValidationErrors | null {
  const nilai = control.value;
  if (nilai === null || nilai === '') return null; // Ditangani Validators.required.
  if (typeof nilai !== 'number' || !Number.isFinite(nilai)) return { angka: true };
  if (nilai <= 0) return { positif: true };
  return null;
}

@Component({
  selector: 'app-produk-form',
  templateUrl: './produk-form.page.html',
  styleUrls: ['./produk-form.page.scss'],
  standalone: false,
})
export class ProdukFormPage implements OnInit {
  formProduk = new FormGroup({
    nama: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.pattern(/\S/)] }),
    kategori: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    gambar: new FormControl('', { nonNullable: true }),
    hargaBeli: new FormControl<number | null>(null, [Validators.required, hargaPositif]),
    hargaJual: new FormControl<number | null>(null, [Validators.required, hargaPositif]),
    stok: new FormControl<number | null>(0, [
      Validators.required, Validators.min(0), Validators.pattern(/^-?[0-9]+$/),
    ]),
  });

  kategoriList: string[] = [];
  modeEdit = false;
  idEdit = 0;
  sudahDikirim = false;
  produkTidakDitemukan = false;

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
      this.formProduk.setValue({
        nama: produk.nama,
        kategori: produk.kategori,
        gambar: produk.gambar,
        hargaBeli: produk.hargaBeli,
        hargaJual: produk.hargaJual,
        stok: produk.stok,
      });
    } else {
      this.produkTidakDitemukan = true;
    }
  }

  resetForm() {
    this.formProduk.reset({ nama: '', kategori: '', gambar: '', hargaBeli: null, hargaJual: null, stok: 0 });
    this.modeEdit = false;
    this.idEdit = 0;
    this.sudahDikirim = false;
    this.produkTidakDitemukan = false;
  }

  pesanError(namaField: string): string {
    const control = this.formProduk.get(namaField);
    if (!control || !(control.dirty || control.touched || this.sudahDikirim)) return '';

    const label: { [key: string]: string } = {
      nama: 'Nama produk', kategori: 'Kategori', hargaBeli: 'Harga beli',
      hargaJual: 'Harga jual', stok: 'Stok',
    };
    if (control.hasError('required')) {
      if (namaField === 'kategori') return 'Kategori wajib dipilih';
      return label[namaField] + ' wajib diisi';
    }
    if (namaField === 'nama' && control.hasError('pattern')) return 'Nama produk wajib diisi';
    if (control.hasError('angka')) return label[namaField] + ' harus berupa angka';
    if (control.hasError('positif')) return label[namaField] + ' harus lebih dari 0';
    if (control.hasError('min')) return 'Stok tidak boleh negatif';
    if (control.hasError('pattern')) return 'Stok harus berupa angka bulat';
    return '';
  }

  simpan() {
    this.sudahDikirim = true;
    this.formProduk.markAllAsTouched();
    if (this.modeEdit && !this.produkService.getProdukById(this.idEdit)) {
      this.produkTidakDitemukan = true;
      return;
    }
    if (this.formProduk.invalid) return;

    const data = this.formProduk.getRawValue();
    if (this.modeEdit) {
      this.produkService.updateProduk(
        this.idEdit, data.nama.trim(), data.kategori, data.gambar.trim(),
        Number(data.hargaBeli), Number(data.hargaJual), Number(data.stok)
      );
    } else {
      this.produkService.tambahProduk(
        data.nama.trim(), data.kategori, data.gambar.trim(),
        Number(data.hargaBeli), Number(data.hargaJual), Number(data.stok)
      );
    }
    this.resetForm();
    this.router.navigate(['/produk']);
  }
}