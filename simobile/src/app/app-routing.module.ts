import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then( m => m.DashboardPageModule)
  },
  {
    path: 'produk',
    loadChildren: () => import('./produk/produk.module').then( m => m.ProdukPageModule)
  },
  {
    path: 'produk-detail',
    loadChildren: () => import('./produk-detail/produk-detail.module').then( m => m.ProdukDetailPageModule)
  },
  {
    path: 'produk-form',
    loadChildren: () => import('./produk-form/produk-form.module').then( m => m.ProdukFormPageModule)
  },
  {
    path: 'transaksi',
    loadChildren: () => import('./transaksi/transaksi.module').then( m => m.TransaksiPageModule)
  },
  {
    path: 'transaksi-detail',
    loadChildren: () => import('./transaksi-detail/transaksi-detail.module').then( m => m.TransaksiDetailPageModule)
  },
  {
    path: 'keranjang',
    loadChildren: () => import('./keranjang/keranjang.module').then( m => m.KeranjangPageModule)
  },
  {
    path: 'profil',
    loadChildren: () => import('./profil/profil.module').then( m => m.ProfilPageModule)
  },
  {
    path: 'pengaturan',
    loadChildren: () => import('./pengaturan/pengaturan.module').then( m => m.PengaturanPageModule)
  },
  {
    path: 'tentang',
    loadChildren: () => import('./tentang/tentang.module').then( m => m.TentangPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
