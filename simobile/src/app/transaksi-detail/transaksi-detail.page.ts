import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AnimationController, ToastController } from '@ionic/angular';
import { Produk, ProdukItem } from '../produk';
import { Keranjang } from '../keranjang';

@Component({
  selector: 'app-produk-detail',
  templateUrl: './produk-detail.page.html',
  styleUrls: ['./produk-detail.page.scss'],
  standalone: false,
})
export class ProdukDetailPage implements OnInit {

  produkId = 0;
  produk: ProdukItem | undefined;
  gambarDefault = 'assets/produk-kosong.png'; // fallback kalau foto produk belum ada

  constructor(
    private route: ActivatedRoute,
    private produkService: Produk,
    private keranjangService: Keranjang,
    private animationCtrl: AnimationController,
    private toastCtrl: ToastController
  ) { }

  ngOnInit() {
    // ambil :id dari route, contoh path 'produk-detail/:id'
    this.route.params.subscribe(params => {
      this.produkId = +params['id'];
      this.produk = this.produkService.getProdukById(this.produkId);
    });
  }

  ionViewDidEnter() {
    this.munculDariBawah();
  }

  // animasi #1: kartu produk muncul dari bawah + fade in saat halaman dibuka
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

  // animasi #2: tombol "berdenyut" sebentar tiap kali produk berhasil ditambahkan ke keranjang
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

  hitungKeuntungan(): number {
    if (!this.produk) return 0;
    return this.produk.hargaJual - this.produk.hargaBeli;
  }

  async tambahKeKeranjang() {
    if (!this.produk || this.produk.stok === 0) return; // jaga-jaga walau tombol sudah disabled
    this.keranjangService.tambahKeKeranjang(this.produk);
    this.animasiTombol();

    const toast = await this.toastCtrl.create({
      message: this.produk.nama + ' ditambahkan ke keranjang',
      duration: 1500,
      color: 'success',
      position: 'bottom',
    });
    toast.present();
  }
}