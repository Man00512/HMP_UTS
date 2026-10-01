import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Produk } from '../produk';

@Component({
  selector: 'app-produk-form',
  templateUrl: './produk-form.page.html',
  styleUrls: ['./produk-form.page.scss'],
  standalone: false,
})
export class ProdukFormPage implements OnInit {
  form: FormGroup;
  kategoriList: string[] = [];
  modeEdit = false;
  idEdit = 0;

  private label: { [nama: string]: string } = {
    nama: 'Nama produk',
    kategori: 'Kategori',
    hargaBeli: 'Harga beli',
    hargaJual: 'Harga jual',
    stok: 'Stok',
  };

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private produkService: Produk
  ) {
    this.form = this.fb.group({
      nama: ['', [Validators.required, Validators.pattern(/\S/)]],
      kategori: ['', [Validators.required]],
      gambar: [''],
      hargaBeli: ['', [Validators.required, Validators.pattern(/^-?[0-9]+$/), Validators.min(1)]],
      hargaJual: ['', [Validators.required, Validators.pattern(/^-?[0-9]+$/), Validators.min(1)]],
      stok: ['0', [Validators.required, Validators.pattern(/^-?[0-9]+$/), Validators.min(0)]],
    });
  }

  ngOnInit() {
    this.kategoriList = this.produkService.getKategori();
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.modeEdit = true;
        this.idEdit = +params['id'];
      } else {
        this.modeEdit = false;
        this.idEdit = 0;
      }
      this.isiForm();
    });
  }

  ionViewWillEnter() {
    this.isiForm();
  }

  private isiForm(): void {
    const produk = this.modeEdit ? this.produkService.getProdukById(this.idEdit) : undefined;
    if (produk) {
      this.form.patchValue({
        nama: produk.nama,
        kategori: produk.kategori,
        gambar: produk.gambar,
        hargaBeli: String(produk.hargaBeli),
        hargaJual: String(produk.hargaJual),
        stok: String(produk.stok),
      });
    } else {
      this.form.reset({
        nama: '',
        kategori: '',
        gambar: '',
        hargaBeli: '',
        hargaJual: '',
        stok: '0',
      });
    }
  }

  pesanError(nama: string): string {
    const kontrol = this.form.get(nama);
    if (!kontrol || !(kontrol.dirty || kontrol.touched)) {
      return '';
    }
    if (kontrol.hasError('required')) {
      return this.label[nama] + ' wajib diisi';
    }
    if (kontrol.hasError('pattern')) {
      return nama === 'nama'
        ? 'Nama produk tidak boleh hanya berisi spasi'
        : this.label[nama] + ' harus berupa angka bulat';
    }
    if (kontrol.hasError('min')) {
      return nama === 'stok'
        ? 'Stok tidak boleh negatif'
        : this.label[nama] + ' harus lebih dari 0';
    }
    return '';
  }

  simpan() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const nilai = this.form.value;
    const data = {
      nama: String(nilai.nama).trim(),
      kategori: nilai.kategori,
      gambar: nilai.gambar || '',
      hargaBeli: Number(nilai.hargaBeli),
      hargaJual: Number(nilai.hargaJual),
      stok: Number(nilai.stok),
    };
    if (this.modeEdit) {
      this.produkService.updateProduk(this.idEdit, data);
    } else {
      this.produkService.tambahProduk(data);
    }
    this.router.navigate(['/produk']);
  }
}