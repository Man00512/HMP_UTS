import { Component } from '@angular/core';
import { AnimationController } from '@ionic/angular';

@Component({
  selector: 'app-tentang',
  templateUrl: './tentang.page.html',
  styleUrls: ['./tentang.page.scss'],
  standalone: false
})
export class TentangPage {

  namaApp: string = 'SIMOBILE';
  versi: string = '1.0.0 (UTS)';
  timPengembang = [
    { nama: 'Nama Anggota 1', nrp: '1234567' },
    { nama: 'Nama Anggota 2', nrp: '1234568' },
    { nama: 'Nama Anggota 3', nrp: '1234569' },
  ];

  constructor(private animationCtrl: AnimationController) { }

  ionViewDidEnter() {
    this.putarLogo();
  }

  // ANIMASI 2 - rotate + scale logo (transform)
  putarLogo() {
    const logoElement = document.querySelector('#logoApp') as HTMLElement;
    if (!logoElement) return;
    const animation = this.animationCtrl
      .create()
      .addElement(logoElement)
      .duration(1000)
      .iterations(1)
      .keyframes([
        { offset: 0, transform: 'rotate(0deg) scale(0.5)' },
        { offset: 1, transform: 'rotate(360deg) scale(1)' },
      ]);
    animation.play();
  }
}