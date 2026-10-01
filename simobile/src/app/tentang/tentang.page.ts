import { Component, OnInit } from '@angular/core';
import { AnimationController } from '@ionic/angular';

@Component({
  selector: 'app-tentang',
  templateUrl: './tentang.page.html',
  styleUrls: ['./tentang.page.scss'],
  standalone: false,
})
export class TentangPage implements OnInit {

  namaAplikasi = 'SIMOBILE';
  versiAplikasi = '1.0.0 (UTS)';
  namaKelompok = 'Kelompok [isi nama kelompok]';
  anggotaKelompok = [
    '[NRP - Nama Anggota 1]',
    '[NRP - Nama Anggota 2]',
    '[NRP - Nama Anggota 3]',
  ];

  constructor(private animationCtrl: AnimationController) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.fadeInLogo();
    this.putarLogo();
  }
fadeInLogo() {
    const elLogo = document.querySelector('#logoAplikasi') as HTMLElement;
    if (!elLogo) return;
    const animation = this.animationCtrl
      .create()
      .addElement(elLogo)
      .duration(800)
      .keyframes([
        { offset: 0, opacity: '0' },
        { offset: 1, opacity: '1' },
      ]);
    animation.play();
  }

putarLogo() {
    const elLogo = document.querySelector('#logoAplikasi') as HTMLElement;
    if (!elLogo) return;
    const animation = this.animationCtrl
      .create()
      .addElement(elLogo)
      .duration(800)
      .keyframes([
        { offset: 0, transform: 'rotate(0deg)' },
        { offset: 1, transform: 'rotate(360deg)' },
      ]);
    animation.play();
  }
}