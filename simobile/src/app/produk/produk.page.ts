import { Component, OnInit } from '@angular/core';
import { Produk, ProdukItem } from '../produk';
import { Keranjang } from '../keranjang';
import { Theme } from '../theme';

@Component({
  selector: 'app-produk',
  templateUrl: './produk.page.html',
  styleUrls: ['./produk.page.scss'],
  standalone: false,
})
export class ProdukPage implements OnInit {
  listProduk: ProdukItem[] = [];      
  kategoriList: string[] = [];        
  kataKunci: string | null = '';
  kategoriDipilih = 'Semua';          
  gambarDefault = 'assets/no-image.svg';

  constructor(private produkService: Produk, private keranjangService: Keranjang, public theme: Theme) { }

  ngOnInit() {
    this.listProduk = this.produkService.getSemuaProduk();
    this.kategoriList = ['Semua'].concat(this.produkService.getKategori());
  }

  ionViewWillEnter() {
    this.listProduk = this.produkService.getSemuaProduk();
  }

  produkTampil(): ProdukItem[] {
    const kata = (this.kataKunci || '').toLowerCase();
    const hasil: ProdukItem[] = [];
    for (let i = 0; i < this.listProduk.length; i++) {
      const p = this.listProduk[i];
      const cocokKategori = this.kategoriDipilih == 'Semua' || p.kategori == this.kategoriDipilih;
      const cocokNama = p.nama.toLowerCase().includes(kata);
      if (cocokKategori && cocokNama) {
        hasil.push(p);
      }
    }
    return hasil;
  }

  jumlahKeranjang(): number {
    return this.keranjangService.getTotalItem();
  }

  gambarError(event: Event) {
    const gambar = event.target as HTMLImageElement;
    if (gambar.getAttribute('src') !== this.gambarDefault) {
      gambar.src = this.gambarDefault;
    }
  }

  formatRupiah(nilai: number): string {
    return 'Rp ' + nilai.toLocaleString('id-ID');
  }
}
