import { Component, OnInit } from '@angular/core';
// ! AnimationController (PPT Week 7): import lalu inisialisasi di constructor
import { AnimationController } from '@ionic/angular';

@Component({
  selector: 'app-tentang',
  templateUrl: './tentang.page.html',
  styleUrls: ['./tentang.page.scss'],
  standalone: false,
})
export class TentangPage implements OnInit {

  namaAplikasi = 'SIMOBILE';
  versiAplikasi = '1.0.0';

  constructor(private animationCtrl: AnimationController) { }

  ngOnInit() {
  }

  fadeInLogo() {
    const elLogo = document.querySelector('#logoAplikasi') as HTMLElement;
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

  ionViewDidEnter() {
    this.fadeInLogo();
    this.putarLogo();
  }
}