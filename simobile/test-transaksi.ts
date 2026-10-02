import { Transaksi } from './src/app/transaksi';
import { Keranjang } from './src/app/keranjang';
import { Produk } from './src/app/produk';

const produk = new Produk();
const keranjang = new Keranjang();
const transaksi = new Transaksi(keranjang, produk);

keranjang.tambahKeKeranjang(produk.getProdukById(1)!);
console.log('Cart items before:', keranjang.getItems().length);

const result = transaksi.konfirmasi();
console.log('Result ID:', result?.id);
console.log('Cart items after:', keranjang.getItems().length);
console.log('Transaksi history length:', transaksi.getSemua().length);
