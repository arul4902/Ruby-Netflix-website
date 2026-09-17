import puppeteer from 'puppeteer-core';
import path from 'path';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const ARTIFACTS_DIR = 'C:\\Users\\User\\.gemini\\antigravity-ide\\brain\\d2e2be4a-b8b8-4b3b-a049-945cbac7bc3b';

async function testOpenLyrics() {
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

    // Scroll to soundtrack section
    await page.evaluate(() => {
      const el = document.getElementById('soundtrack');
      if (el) el.scrollIntoView();
    });

    await new Promise(r => setTimeout(r, 500));

    // Click "Hangova (Anirudh)" tab without closing the accordion
    await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      const hangovaBtn = btns.find(b => b.textContent?.includes('Hangova (Anirudh)'));
      if (hangovaBtn) hangovaBtn.click();
    });

    await new Promise(r => setTimeout(r, 600));

    await page.screenshot({ path: path.join(ARTIFACTS_DIR, 'clean_06_hangova_lyrics_visible.png') });
    console.log('Hangova open lyrics captured!');
  } finally {
    await browser.close();
  }
}

testOpenLyrics().catch(console.error);
