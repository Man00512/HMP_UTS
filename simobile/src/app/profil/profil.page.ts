import { Component, OnInit } from '@angular/core';
import { AnimationController } from '@ionic/angular';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.page.html',
  styleUrls: ['./profil.page.scss'],
  standalone: false,
})
export class ProfilPage implements OnInit {

  namaToko = 'Toko Makmur Jaya';
  namaPemilik = 'Bu Marni';
  alamat = 'Jl. Raya Kalirungkut No. 12, Surabaya';
  telepon = '0812-3456-7890';
  fotoProfil = 'https://i.pravatar.cc/300?img=47';

  constructor(private animationCtrl: AnimationController) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.munculkanAvatar();
  }

  munculkanAvatar() {
    const avatarElement = document.querySelector('#avatarProfil') as HTMLElement;
    if (!avatarElement) return;
    const animation = this.animationCtrl
      .create()
      .addElement(avatarElement)
      .duration(700)
      .keyframes([
        { offset: 0, opacity: '0', transform: 'scale(0.7)' },
        { offset: 1, opacity: '1', transform: 'scale(1)' },
      ]);
    animation.play();
  }
}