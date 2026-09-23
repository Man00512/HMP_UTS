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

  // animasi #1: logo fade in (contoh dari materi Week 7)
  fadeInLogo() {
    const elLogo = document.querySelector('#logoAplikasi') as HTMLElement;
    const animation = this.animationCtrl
      .create()
      .addElement(elLogo)
      .duration(5000)
      .iterations(3)
      .keyframes([
        { offset: 0, opacity: '0' },
        { offset: 0.2, opacity: '0.2' },
        { offset: 0.4, opacity: '0.4' },
        { offset: 0.6, opacity: '0.6' },
        { offset: 0.8, opacity: '0.8' },
        { offset: 1, opacity: '1' },
      ]);
    animation.play();
  }

  // animasi #2: logo berputar (contoh dari materi Week 7)
  putarLogo() {
    const elLogo = document.querySelector('#logoAplikasi') as HTMLElement;
    const animation = this.animationCtrl
      .create()
      .addElement(elLogo)
      .duration(5000)
      .iterations(3)
      .keyframes([
        { offset: 0, transform: 'rotate(0deg)' },
        { offset: 1, transform: 'rotate(360deg)' },
      ]);
    animation.play();
  }
}