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
      // min(0) = stok tidak boleh negatif
      stok: ['0', [Validators.required, Validators.pattern(/^-?[0-9]+$/), Validators.min(0)]],
    });
  }

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
      this.form.patchValue({
        nama: produk.nama,
        kategori: produk.kategori,
        gambar: produk.gambar,
        hargaBeli: String(produk.hargaBeli),
        hargaJual: String(produk.hargaJual),
        stok: String(produk.stok),
      });
    }
  }

  pesanError(nama: string, label: string): string {
    const kontrol = this.form.get(nama);   
    if (!kontrol || !(kontrol.dirty || kontrol.touched)) {
      return '';
    }
    if (kontrol.hasError('required')) {
      return label + ' wajib diisi';
    }
    if (kontrol.hasError('pattern')) {
      if (nama == 'nama') {
        return 'Nama produk tidak boleh hanya berisi spasi';
      }
      return label + ' harus berupa angka bulat';
    }
    if (kontrol.hasError('min')) {
      if (nama == 'stok') {
        return 'Stok tidak boleh negatif';
      }
      return label + ' harus lebih dari 0';
    }
    return '';
  }

  simpan() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const nilai = this.form.value;
    const nama = String(nilai.nama).trim();
    if (this.modeEdit) {
      this.produkService.updateProduk(this.idEdit, nama, nilai.kategori, nilai.gambar,
        Number(nilai.hargaBeli), Number(nilai.hargaJual), Number(nilai.stok));
    } else {
      this.produkService.tambahProduk(nama, nilai.kategori, nilai.gambar,
        Number(nilai.hargaBeli), Number(nilai.hargaJual), Number(nilai.stok));
    }
    this.router.navigate(['/produk']);
  }
}