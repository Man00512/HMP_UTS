import { Component, OnInit } from '@angular/core';
import { AnimationController } from '@ionic/angular';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.page.html',
  styleUrls: ['./profil.page.scss'],
  standalone: false
})
export class ProfilPage implements OnInit {

  gambarDefault: string = 'https://ubaya.cloud/no_image.jpg';
  nama: string = 'Marni';
  role: string = 'Kasir Toko Makmur Jaya';
  foto: string = '';
  modeEdit: boolean = false;

  constructor(private animationCtrl: AnimationController) { }

  ngOnInit() { }

  ionViewDidEnter() {
    this.fadeInAvatar();
  }

  // ANIMASI 1 - fade in avatar
  fadeInAvatar() {
    const avatarElement = document.querySelector('#myAvatar') as HTMLElement;
    if (!avatarElement) return;
    const animation = this.animationCtrl
      .create()
      .addElement(avatarElement)
      .duration(800)
      .iterations(1)
      .keyframes([
        { offset: 0, opacity: '0' },
        { offset: 1, opacity: '1' },
      ]);
    animation.play();
  }

  simpanProfil() {
    this.modeEdit = false;
  }
}