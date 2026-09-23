import { Component, OnInit } from '@angular/core';
import { Animation } from '../animation';

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

  constructor(private animService: Animation) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.munculkanAvatar();
  }

  munculkanAvatar() {
    this.animService.animateItemsIn('#avatarProfil');
  }

  onEditClick(event: Event) {
    this.animService.animatePop(event);
  }
}