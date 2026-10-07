import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AnimationController } from '@ionic/angular';
import { Produk, ProdukItem } from '../produk';
import { Keranjang } from '../keranjang';
import { Theme } from '../theme';

@Component({
  selector: 'app-produk-detail',
  templateUrl: './produk-detail.page.html',
  styleUrls: ['./produk-detail.page.scss'],
  standalone: false,
})
export class ProdukDetailPage implements OnInit {

  produkId = 0;                          
  produk: ProdukItem | undefined;        
  gambarDefault = 'assets/no-image.svg'; 
  pesanAlert = '';                       
  public alertButtons = ['OK'];          

  constructor(
    private route: ActivatedRoute,
    private produkService: Produk,
    private keranjangService: Keranjang,
    private animationCtrl: AnimationController,
    public theme: Theme
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.produkId = Number(params['id']);
      this.produk = this.produkService.getProdukById(this.produkId);
    });
  }

  ionViewWillEnter() {
    this.produk = this.produkService.getProdukById(this.produkId);
  }

  hitungKeuntungan(): number {
    if (!this.produk) return 0;
    return this.produk.hargaJual - this.produk.hargaBeli;
  }

  tambahKeKeranjang() {
    if (!this.produk) return;
    const berhasil = this.keranjangService.tambahKeKeranjang(this.produk);
    if (berhasil) {
      this.pesanAlert = this.produk.nama + ' ditambahkan ke keranjang';
      this.animasiTombol();
    } else {
      this.pesanAlert = 'Jumlah di keranjang sudah mencapai stok';
    }
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

  munculDariBawah() {
    const kartuElement = document.querySelector('#kartuProduk') as HTMLElement;
    if (!kartuElement) return;
    const animation = this.animationCtrl
      .create()
      .addElement(kartuElement)
      .duration(600)
      .easing('ease-out')
      .keyframes([
        { offset: 0, opacity: '0', transform: 'translateY(40px)' },
        { offset: 1, opacity: '1', transform: 'translateY(0px)' },
      ]);
    animation.play();
  }

  animasiTombol() {
    const tombolElement = document.querySelector('#tombolKeranjang') as HTMLElement;
    if (!tombolElement) return;
    const animation = this.animationCtrl
      .create()
      .addElement(tombolElement)
      .duration(250)
      .iterations(2)
      .keyframes([
        { offset: 0, transform: 'scale(1)' },
        { offset: 0.5, transform: 'scale(1.06)' },
        { offset: 1, transform: 'scale(1)' },
      ]);
    animation.play();
  }

  ionViewDidEnter() {
    this.munculDariBawah();
  }
}
