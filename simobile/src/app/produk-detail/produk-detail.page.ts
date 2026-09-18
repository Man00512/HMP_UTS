import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProdukService, Produk } from '../produk';
import { KeranjangService } from '../keranjang';

@Component({
  selector: 'app-produk-detail',
  templateUrl: './produk-detail.page.html',
  styleUrls: ['./produk-detail.page.scss'],
  standalone: false
})
export class ProdukDetailPage implements OnInit {

  id: number = 0;
  produk?: Produk;
  gambarDefault: string = 'https://ubaya.cloud/no_image.jpg';

  constructor(
    private route: ActivatedRoute,
    private produkService: ProdukService,
    private keranjangService: KeranjangService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = +params['id']; // '+' mengubah string parameter jadi number
      this.produk = this.produkService.getProdukById(this.id);
    });
  }

  hitungUntung(): number {
    if (!this.produk) return 0;
    return this.produk.hargaJual - this.produk.hargaBeli;
  }

  tambahKeKeranjang() {
    if (this.produk) {
      this.keranjangService.tambahKeranjang(this.produk);
    }
  }
}