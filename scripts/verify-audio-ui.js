import puppeteer from 'puppeteer-core';
import path from 'path';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const ARTIFACTS_DIR = 'C:\\Users\\User\\.gemini\\antigravity-ide\\brain\\d2e2be4a-b8b8-4b3b-a049-945cbac7bc3b';

async function testCleanUI() {
  console.log('Testing Clean UI with Hangova lyrics & UI sounds...');
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--autoplay-policy=no-user-gesture-required']
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

    // 1. Bottom docked player screenshot
    await page.screenshot({ path: path.join(ARTIFACTS_DIR, 'clean_01_bottom_player.png') });

    // 2. Open lyrics drawer to verify Hangova song lyrics
    await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      const lyricsBtn = btns.find(b => b.textContent?.includes('Lyrics'));
      if (lyricsBtn) lyricsBtn.click();
    });

    await new Promise(r => setTimeout(r, 700));

    // Check lyrics content
    const lyricsHeading = await page.evaluate(() => {
      const heading = document.getElementById('lyrics-dialog-title');
      return heading ? heading.textContent : null;
    });
    console.log('Lyrics modal title:', lyricsHeading);

    await page.screenshot({ path: path.join(ARTIFACTS_DIR, 'clean_02_lyrics_modal.png') });

    // Close lyrics modal
    await page.evaluate(() => {
      const closeBtns = Array.from(document.querySelectorAll('button'));
      const close = closeBtns.find(b => b.querySelector('svg.lucide-x'));
      if (close) close.click();
    });

    await new Promise(r => setTimeout(r, 500));

    // 3. Scroll to Favourites Section (Hangova)
    await page.evaluate(() => {
      const el = document.getElementById('favourites');
      if (el) el.scrollIntoView();
    });

    await new Promise(r => setTimeout(r, 700));
    await page.screenshot({ path: path.join(ARTIFACTS_DIR, 'clean_03_favourites_hangova.png') });

    // 4. Scroll to Soundtrack Section
    await page.evaluate(() => {
      const el = document.getElementById('soundtrack');
      if (el) el.scrollIntoView();
    });

    await new Promise(r => setTimeout(r, 700));
    await page.screenshot({ path: path.join(ARTIFACTS_DIR, 'clean_04_soundtrack_clean.png') });

    console.log('Clean UI verification finished successfully!');
  } finally {
    await browser.close();
  }
}

testCleanUI().catch(err => {
  console.error('Test error:', err);
  process.exit(1);
});
