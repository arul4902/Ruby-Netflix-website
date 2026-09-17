import puppeteer from 'puppeteer-core';
import path from 'path';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const ARTIFACTS_DIR = 'C:\\Users\\User\\.gemini\\antigravity-ide\\brain\\d2e2be4a-b8b8-4b3b-a049-945cbac7bc3b';

async function testFinalSwappedUI() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900 });

    await page.goto('http://127.0.0.1:5173/', { waitUntil: 'domcontentloaded' });
    await page.evaluate(() => {
      sessionStorage.setItem('rubishna_intro_completed', 'true');
      sessionStorage.setItem('rubishna_profile_selected', 'true');
    });

    await page.reload({ waitUntil: 'networkidle0' });
    await new Promise(r => setTimeout(r, 1000));

    // 1. Bottom docked player with Hangova as default
    await page.screenshot({ path: path.join(ARTIFACTS_DIR, 'final_01_bottom_player_hangova.png') });

    // 2. Favourites Section with Naanaga Iruppadhey
    await page.evaluate(() => {
      const el = document.getElementById('favourites');
      if (el) el.scrollIntoView();
    });
    await new Promise(r => setTimeout(r, 700));
    await page.screenshot({ path: path.join(ARTIFACTS_DIR, 'final_02_favourites_naanaga.png') });

    // 3. Soundtrack Section with Hangova
    await page.evaluate(() => {
      const el = document.getElementById('soundtrack');
      if (el) el.scrollIntoView();
    });
    await new Promise(r => setTimeout(r, 700));
    await page.screenshot({ path: path.join(ARTIFACTS_DIR, 'final_03_soundtrack_hangova.png') });

    console.log('Final swapped UI captured successfully!');
  } finally {
    await browser.close();
  }
}

testFinalSwappedUI().catch(console.error);
