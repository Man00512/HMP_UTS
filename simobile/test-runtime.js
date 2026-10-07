// Pengujian browser saja; tidak dimuat oleh aplikasi SIMOBILE.
const assert = require('node:assert/strict');
const express = require('express');
const puppeteer = require('puppeteer');
const path = require('node:path');

async function main() {
  const app = express();
  app.use(express.static(path.join(__dirname, 'www')));
  app.get('/{*path}', (_req, res) => res.sendFile(path.join(__dirname, 'www/index.html')));
  const server = await new Promise(resolve => {
    const listening = app.listen(0, '127.0.0.1', () => resolve(listening));
  });
  let browser;
  let page;
  const errors = [];
  try {
    browser = await puppeteer.launch({ headless: true });
    page = await browser.newPage();
    await page.setViewport({ width: 390, height: 844 });
    page.on('pageerror', error => errors.push(error.message));
    page.on('console', message => {
      if (message.type() === 'error' && !message.text().includes('Failed to load resource')) {
        errors.push(message.text());
      }
    });
    // Simulasikan gambar eksternal gagal tanpa tergantung koneksi internet.
    await page.setRequestInterception(true);
    page.on('request', request => {
      if (/^https?:/.test(request.url()) && !request.url().startsWith('http://127.0.0.1:')) {
        request.respond({ status: 404, body: '' });
      } else {
        request.continue();
      }
    });
    const baseUrl = 'http://127.0.0.1:' + server.address().port;
    async function click(selector, options = {}) {
      await page.locator(selector).click(options);
    }
    async function input(label, value) {
      const selector = 'app-produk-form:not(.ion-page-hidden) ion-input[label="' + label + '"] input';
      await page.waitForSelector(selector, { visible: true });
      await click(selector);
      await page.keyboard.down('Control');
      await page.keyboard.press('KeyA');
      await page.keyboard.up('Control');
      await page.keyboard.press('Backspace');
      await page.type(selector, value);
    }
    async function route(expected) {
      await page.waitForFunction(value => location.pathname === value, {}, expected);
      await page.waitForFunction(() => !document.querySelector('.ion-page-invisible'));
      await page.waitForFunction(() => document.getAnimations().every(animation => animation.playState !== 'running'));
    }
    async function dismissAlert() {
      await page.waitForSelector('ion-alert:not(.overlay-hidden) .alert-button', { visible: true });
      await click('ion-alert:not(.overlay-hidden) .alert-button');
      await page.waitForFunction(() => !document.querySelector('ion-alert:not(.overlay-hidden)'));
    }
    async function lastProduct() {
      await click('app-produk:not(.ion-page-hidden) ion-col:last-child ion-card');
      await route('/produk-detail/12');
    }
    await page.goto(baseUrl + '/produk-form', { waitUntil: 'networkidle0' });
    await input('Nama Produk', 'Produk Uji Simpan');
    await click('app-produk-form ion-select');
    await page.waitForSelector('ion-alert .alert-radio-button', { visible: true });
    await click('ion-alert .alert-radio-button');
    await click('ion-alert button.alert-button:not(.alert-button-role-cancel)');
    await page.waitForFunction(() => !document.querySelector('ion-alert'));
    await input('Harga Beli', '5000');
    await input('Harga Jual', '7000');
    await input('Stok', '3');
    await click('app-produk-form .tombol-simpan');
    try {
      await page.waitForFunction(() => location.pathname === '/produk', { timeout: 5000 });
    } catch {
      throw new Error('Simpan tidak kembali ke daftar produk. Error browser: ' + errors.join('; '));
    }
    await page.waitForFunction(() => {
      const halaman = document.querySelector('app-produk:not(.ion-page-hidden)');
      return halaman && halaman.textContent.includes('Produk Uji Simpan');
    });
    console.log('PASS: tambah produk dari input angka lalu kembali ke daftar produk.');

    await page.waitForFunction(() => {
      const images = [...document.querySelectorAll('app-produk img')];
      return images.length === 12 && images.every(img => img.complete && img.naturalWidth > 0);
    });
    console.log('PASS: gambar cadangan lokal tampil ketika gambar eksternal gagal.');
    await page.type('app-produk .area-cari input', 'PRODUK UJI');
    await page.waitForFunction(() => document.querySelectorAll('app-produk .product-card').length === 1);
    await click('app-produk .input-clear-icon');
    await page.waitForFunction(() => document.querySelectorAll('app-produk .product-card').length === 12);
    console.log('PASS: pencarian langsung dan tombol hapus pencarian.');

    await lastProduct();
    await click('app-produk-detail:not(.ion-page-hidden) .tombol-edit');
    await route('/produk-form/12');
    await input('Nama Produk', 'Produk Uji Edit');
    await input('Harga Jual', '');
    await click('app-produk-form:not(.ion-page-hidden) .tombol-simpan');
    await page.waitForFunction(() => document.querySelector('app-produk-form:not(.ion-page-hidden)')?.textContent.includes('Harga jual wajib diisi'));
    assert.equal(await page.$eval('app-produk-form:not(.ion-page-hidden) ion-input[label="Nama Produk"] input', el => el.value), 'Produk Uji Edit');
    await input('Harga Jual', '12000');
    await input('Stok', '2');
    await click('app-produk-form:not(.ion-page-hidden) .tombol-simpan');
    await route('/produk');
    await page.waitForFunction(() => document.querySelector('app-produk:not(.ion-page-hidden)')?.textContent.includes('Produk Uji Edit'));
    console.log('PASS: edit produk, validasi kolom kosong, dan isian lain tidak hilang.');

    await click('app-produk:not(.ion-page-hidden) ion-button[routerlink="/produk-form"]');
    await route('/produk-form');
    assert.equal(await page.$eval('app-produk-form:not(.ion-page-hidden) ion-input[label="Nama Produk"] input', el => el.value), '');
    await click('app-produk-form:not(.ion-page-hidden) ion-back-button');
    await route('/produk');
    console.log('PASS: form tambah bersih saat dibuka lagi setelah penyimpanan.');

    await lastProduct();
    for (let i = 0; i < 2; i++) {
      await click('app-produk-detail:not(.ion-page-hidden) #tombolKeranjang');
      await dismissAlert();
    }
    await click('app-produk-detail:not(.ion-page-hidden) .tombol-edit');
    await route('/produk-form/12');
    await input('Stok', '1');
    await click('app-produk-form:not(.ion-page-hidden) .tombol-simpan');
    await route('/produk');
    await click('app-produk:not(.ion-page-hidden) ion-button[routerlink="/keranjang"]');
    await route('/keranjang');
    await click('app-keranjang .tombol-konfirmasi');
    await page.waitForFunction(() => document.querySelector('app-keranjang').textContent.includes('tersisa 1'));
    assert.equal(new URL(page.url()).pathname, '/keranjang');
    await click('app-keranjang ion-buttons ion-button:first-child');
    await click('app-keranjang .tombol-konfirmasi');
    await route('/transaksi-detail/1');
    await page.waitForFunction(() => document.querySelector('app-transaksi-detail').textContent.includes('12.000'));
    console.log('PASS: checkout menolak stok berubah; setelah jumlah diperbaiki, struk tersimpan.');

    // Route lewat UI supaya riwayat dan cache halaman Ionic ikut diuji.
    await click('app-transaksi-detail ion-back-button');
    // Ikuti riwayat navigasi nyata: struk -> keranjang -> produk -> transaksi.
    await route('/keranjang');
    await click('app-keranjang ion-back-button');
    await route('/produk');
    await click('app-produk:not(.ion-page-hidden) ion-tab-button[routerlink="/transaksi"]');
    await route('/transaksi');
    await page.waitForFunction(() => document.querySelector('app-transaksi:not(.ion-page-hidden)')?.textContent.includes('Transaksi #1'));
    await click('app-transaksi:not(.ion-page-hidden) ion-tab-button[routerlink="/dashboard"]');
    await route('/dashboard');
    await page.waitForFunction(() => {
      const text = document.querySelector('app-dashboard:not(.ion-page-hidden)')?.textContent || '';
      return text.includes('1 transaksi') && text.includes('12.000') && text.includes('Produk Uji Edit');
    });
    await click('app-dashboard ion-tab-button[routerlink="/produk"]');
    await route('/produk');
    await lastProduct();
    assert.equal(await page.$eval('app-produk-detail:not(.ion-page-hidden) #tombolKeranjang', el => el.disabled), true);
    console.log('PASS: riwayat, dashboard, dan tombol stok habis diperbarui.');

    await page.goto(baseUrl + '/pengaturan', { waitUntil: 'networkidle0' });
    await click('app-pengaturan ion-toggle');
    await page.waitForFunction(() => document.body.classList.contains('dark'));
    await click('app-pengaturan ion-toggle');
    await page.waitForFunction(() => !document.body.classList.contains('dark'));
    await page.goto(baseUrl + '/produk-form/99999', { waitUntil: 'networkidle0' });
    await page.waitForFunction(() => document.querySelector('app-produk-form').textContent.includes('Produk tidak ditemukan'));
    assert.equal(await page.$('app-produk-form .tombol-simpan'), null);
    console.log('PASS: toggle mode gelap dan URL edit yang tidak valid.');
    assert.deepEqual(errors, [], 'Tidak boleh ada error aplikasi');
    console.log('PASS: tidak ada error JavaScript aplikasi selama skenario pengujian.');
  } catch (error) {
    if (page) {
      console.error('Browser diagnostics:', await page.evaluate(() => ({
        path: location.pathname,
        text: [...document.querySelectorAll('.ion-page:not(.ion-page-hidden)')].map(el => el.textContent),
      })), errors);
      await page.screenshot({ path: path.join(__dirname, '.angular/runtime-failure.png') });
    }
    throw error;
  } finally {
    if (browser) await browser.close();
    await new Promise(resolve => server.close(resolve));
  }
}

main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
