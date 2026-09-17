import puppeteer from 'puppeteer-core';
import path from 'path';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const ARTIFACTS_DIR = 'C:\\Users\\User\\.gemini\\antigravity-ide\\brain\\d2e2be4a-b8b8-4b3b-a049-945cbac7bc3b';

async function verifyFinalSoundtrackSetup() {
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

    // 1. Capture Soundtrack section with Track 01 Hangova & Track 02 Tamil Song + Hangova Synced Lyrics alone
    await page.evaluate(() => {
      const el = document.getElementById('soundtrack');
      if (el) el.scrollIntoView({ behavior: 'instant', block: 'center' });
    });
    await new Promise(r => setTimeout(r, 600));
    await page.screenshot({ path: path.join(ARTIFACTS_DIR, 'hangova_alone_01_soundtrack_section.png') });
    console.log('Captured hangova_alone_01_soundtrack_section.png');

    // 2. Open bottom player lyrics modal
    await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      const lyricsBtn = btns.find(b => b.textContent?.trim() === 'Lyrics');
      if (lyricsBtn) lyricsBtn.click();
    });
    await new Promise(r => setTimeout(r, 500));
    await page.screenshot({ path: path.join(ARTIFACTS_DIR, 'hangova_alone_02_lyrics_modal.png') });
    console.log('Captured hangova_alone_02_lyrics_modal.png');

    // Close lyrics modal by clicking the X close button
    await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      const closeBtn = btns.find(b => b.querySelector('svg.lucide-x') || b.innerHTML.includes('lucide-x'));
      if (closeBtn) closeBtn.click();
    });
    await new Promise(r => setTimeout(r, 600));

    // 3. Scroll to Favourites Section (Tamil Song with no lyrics badge)
    await page.evaluate(() => {
      const el = document.getElementById('favourites');
      if (el) el.scrollIntoView({ behavior: 'instant', block: 'center' });
    });
    await new Promise(r => setTimeout(r, 600));
    await page.screenshot({ path: path.join(ARTIFACTS_DIR, 'hangova_alone_03_favourites_tamil_song.png') });
    console.log('Captured hangova_alone_03_favourites_tamil_song.png');

  } finally {
    await browser.close();
  }
}

verifyFinalSoundtrackSetup().catch(console.error);
