const express = require('express');
const puppeteer = require('puppeteer');
const path = require('path');

const app = express();
app.use(express.static(path.join(__dirname, 'www')));

const server = app.listen(8101, async () => {
    try {
        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();
        
        page.on('console', msg => console.log('BROWSER LOG:', msg.text()));
        page.on('pageerror', error => console.log('BROWSER ERROR:', error.message));
        
        await page.goto('http://localhost:8101', { waitUntil: 'networkidle0' });
        
        await browser.close();
        server.close();
    } catch (e) {
        console.error('Puppeteer error:', e);
        server.close();
    }
});
