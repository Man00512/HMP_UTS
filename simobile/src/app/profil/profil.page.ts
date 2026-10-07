import { Component } from '@angular/core';
import { AnimationController } from '@ionic/angular';
import { Theme } from '../theme';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.page.html',
  styleUrls: ['./profil.page.scss'],
  standalone: false,
})
export class ProfilPage {

  namaToko = 'Toko Makmur Jaya';
  namaPemilik = 'Bu Marni';
  alamat = 'Jl. Raya Kalirungkut No. 12, Surabaya';
  telepon = '0812-3456-7890';
  fotoProfil = 'https://i.pravatar.cc/300?img=47';

  constructor(private animationCtrl: AnimationController, public theme: Theme) { }

  fadeInAvatar() {
    const avatarElement = document.querySelector('#avatarProfil') as HTMLElement;
    const animation = this.animationCtrl
      .create()
      .addElement(avatarElement)
      .duration(800)
      .keyframes([
        { offset: 0, opacity: '0' },
        { offset: 1, opacity: '1' },
      ]);
    animation.play();
  }

  growShrinkAvatar() {
    const avatarElement = document.querySelector('#bingkaiAvatar') as HTMLElement;
    const animation = this.animationCtrl
      .create()
      .addElement(avatarElement)
      .duration(1000)
      .keyframes([
        { offset: 0, transform: 'scale(1)' },
        { offset: 0.5, transform: 'scale(1.15)' },
        { offset: 1, transform: 'scale(1)' },
      ]);
    animation.play();
  }

  ionViewDidEnter() {
    this.fadeInAvatar();
    this.growShrinkAvatar();
  }
}
