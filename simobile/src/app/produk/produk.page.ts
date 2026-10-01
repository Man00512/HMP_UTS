import { Component, OnInit } from '@angular/core';
import { Produk, ProdukItem } from '../produk';
import { Keranjang } from '../keranjang';

@Component({
  selector: 'app-produk',
  templateUrl: './produk.page.html',
  styleUrls: ['./produk.page.scss'],
  standalone: false,
})
export class ProdukPage implements OnInit {
  listProduk: ProdukItem[] = [];
  kategoriList: string[] = [];
  kataKunci = '';
  kategoriDipilih = 'Semua';
  gambarDefault = 'assets/produk-kosong.png';

  constructor(private produk: Produk, private keranjang: Keranjang) { }

  ngOnInit() {
    this.muat();
  }

  ionViewWillEnter() {
    this.muat();
  }

  private muat(): void {
    this.listProduk = this.produk.getSemuaProduk();
    this.kategoriList = ['Semua', ...this.produk.getKategori()];
  }

  get produkTampil(): ProdukItem[] {
    const kata = this.kataKunci.trim().toLowerCase();
    return this.listProduk.filter(p =>
      (this.kategoriDipilih === 'Semua' || p.kategori === this.kategoriDipilih) &&
      p.nama.toLowerCase().includes(kata)
    );
  }

  get jumlahKeranjang(): number {
    return this.keranjang.getTotalItem();
  }

  formatRupiah(nilai: number): string {
    return 'Rp ' + nilai.toLocaleString('id-ID');
  }
}