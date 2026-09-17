import puppeteer from 'puppeteer-core';
import path from 'path';

const artifactDir = 'C:\\Users\\User\\.gemini\\antigravity-ide\\brain\\d2e2be4a-b8b8-4b3b-a049-945cbac7bc3b';
const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function runVerification() {
  console.log('Starting UI Verification with Puppeteer and Chrome...');

  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: true,
    args: ['--no-sandbox', '--disable-gpu', '--window-size=1440,900'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  const consoleErrors = [];
  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text());
    }
  });
  page.on('pageerror', (err) => {
    consoleErrors.push(err.toString());
  });

  // 1. Visit http://localhost:5173/
  console.log('Navigating to http://localhost:5173/ ...');
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle0' });

  // 2. Capture Intro Screen
  await new Promise((r) => setTimeout(r, 1200));
  await page.screenshot({
    path: path.join(artifactDir, '01_intro_animation.png'),
  });
  console.log('Captured: 01_intro_animation.png');

  // Skip intro by clicking the Skip button
  console.log('Skipping intro...');
  await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    const skipBtn = buttons.find((b) => b.textContent.includes('Skip'));
    if (skipBtn) skipBtn.click();
  });

  // 3. Wait for Profile Selector
  await page.waitForFunction(() => document.body.innerText.includes("Who's watching?"));
  await new Promise((r) => setTimeout(r, 1000));
  await page.screenshot({
    path: path.join(artifactDir, '02_profile_selector.png'),
  });
  console.log('Captured: 02_profile_selector.png');

  // 4. Click Rubi's profile to trigger the Secret Profile Entry Transition
  console.log('Selecting Rubi profile to trigger Secret Entry Transition...');
  await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    const rubiBtn = buttons.find((b) => b.textContent.includes("Enter Rubi's World") || b.textContent.includes('Rubi'));
    if (rubiBtn) rubiBtn.click();
  });

  // Capture secret entry transition ("Now Streaming RUBI")
  await new Promise((r) => setTimeout(r, 800));
  await page.screenshot({
    path: path.join(artifactDir, '02b_profile_entry_transition.png'),
  });
  console.log('Captured: 02b_profile_entry_transition.png');

  // 5. Wait for Home / Hero to load after transition
  await page.waitForSelector('#home', { timeout: 10000 });
  await new Promise((r) => setTimeout(r, 1500));

  // 6. Capture Desktop Hero with RubiRatingBadge and buttons
  await page.screenshot({
    path: path.join(artifactDir, '03_desktop_hero.png'),
  });
  console.log('Captured: 03_desktop_hero.png');

  // 7. Test "Play My Story" -> Full Story Trailer
  console.log('Testing Story Trailer modal...');
  await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    const playBtn = buttons.find((b) => b.textContent.includes('Play My Story'));
    if (playBtn) playBtn.click();
  });
  await new Promise((r) => setTimeout(r, 2000));
  await page.screenshot({
    path: path.join(artifactDir, '04_story_trailer.png'),
  });
  console.log('Captured: 04_story_trailer.png');

  // Close Story Trailer via Escape
  await page.keyboard.press('Escape');
  await new Promise((r) => setTimeout(r, 500));

  // 8. Test Surprise Me Roulette Modal
  console.log('Testing Surprise Me modal...');
  await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    const surpriseBtn = buttons.find((b) => b.textContent.includes('Surprise Me') || b.getAttribute('aria-label') === 'Pick Random Episode');
    if (surpriseBtn) surpriseBtn.click();
  });
  await new Promise((r) => setTimeout(r, 2000));
  await page.screenshot({
    path: path.join(artifactDir, '05_surprise_me_roulette.png'),
  });
  console.log('Captured: 05_surprise_me_roulette.png');

  // Close Surprise Me modal
  await page.keyboard.press('Escape');
  await new Promise((r) => setTimeout(r, 500));

  // 9. Test Hidden 19 Easter Egg Modal
  console.log('Testing Hidden 19 Easter Egg...');
  await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    const eggBtn = buttons.find((b) => b.getAttribute('title')?.includes('Easter Egg') || b.textContent.trim() === '19');
    if (eggBtn) eggBtn.click();
  });
  await new Promise((r) => setTimeout(r, 1200));
  await page.screenshot({
    path: path.join(artifactDir, '06_easter_egg_achievement.png'),
  });
  console.log('Captured: 06_easter_egg_achievement.png');

  // Close Easter egg modal
  await page.keyboard.press('Escape');
  await new Promise((r) => setTimeout(r, 500));

  // 10. Test VideoPlayer by clicking an episode
  console.log('Testing VideoPlayer with Episode Opening Titles...');
  await page.evaluate(() => {
    const cards = Array.from(document.querySelectorAll('#college-era div[class*="cursor-pointer"]'));
    if (cards.length > 0) cards[0].click();
  });
  await new Promise((r) => setTimeout(r, 1000));
  await page.screenshot({
    path: path.join(artifactDir, '07_video_player_opening_title.png'),
  });
  console.log('Captured: 07_video_player_opening_title.png');

  // Close video player
  await page.keyboard.press('Escape');
  await new Promise((r) => setTimeout(r, 500));

  // 11. Scroll to Camera Roll Montage
  console.log('Scrolling to Camera Roll Montage...');
  await page.evaluate(() => {
    const el = document.getElementById('camera-roll');
    if (el) el.scrollIntoView({ behavior: 'instant' });
  });
  await new Promise((r) => setTimeout(r, 1000));
  await page.screenshot({
    path: path.join(artifactDir, '08_camera_roll_montage.png'),
  });
  console.log('Captured: 08_camera_roll_montage.png');

  // 12. Scroll to Original Soundtrack Section
  console.log('Scrolling to Original Soundtrack section...');
  await page.evaluate(() => {
    const el = document.getElementById('soundtrack');
    if (el) el.scrollIntoView({ behavior: 'instant' });
  });
  await new Promise((r) => setTimeout(r, 1000));
  await page.screenshot({
    path: path.join(artifactDir, '09_original_soundtrack_section.png'),
  });
  console.log('Captured: 09_original_soundtrack_section.png');

  // 13. Scroll to Dreams & Finale
  console.log('Scrolling to Dreams & Finale...');
  await page.evaluate(() => {
    const el = document.getElementById('dreams');
    if (el) el.scrollIntoView({ behavior: 'instant' });
  });
  await new Promise((r) => setTimeout(r, 1000));
  await page.screenshot({
    path: path.join(artifactDir, '10_dreams_and_finale.png'),
  });
  console.log('Captured: 10_dreams_and_finale.png');

  // 14. Test Mobile Viewport (390 x 844) & (360 x 780)
  console.log('Testing Mobile Viewports...');
  await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
  await new Promise((r) => setTimeout(r, 1200));

  // Check horizontal document overflow
  const overflowCheck390 = await page.evaluate(() => {
    const docWidth = document.documentElement.scrollWidth;
    const winWidth = window.innerWidth;
    return {
      docWidth,
      winWidth,
      hasHorizontalOverflow: docWidth > winWidth,
    };
  });
  console.log('Mobile 390px Overflow Check:', overflowCheck390);

  await page.screenshot({
    path: path.join(artifactDir, '11_mobile_390_hero.png'),
  });
  console.log('Captured: 11_mobile_390_hero.png');

  // Test 360px breakpoint
  await page.setViewport({ width: 360, height: 780, isMobile: true, hasTouch: true });
  await new Promise((r) => setTimeout(r, 800));
  const overflowCheck360 = await page.evaluate(() => {
    const docWidth = document.documentElement.scrollWidth;
    const winWidth = window.innerWidth;
    return {
      docWidth,
      winWidth,
      hasHorizontalOverflow: docWidth > winWidth,
    };
  });
  console.log('Mobile 360px Overflow Check:', overflowCheck360);

  await page.screenshot({
    path: path.join(artifactDir, '12_mobile_360_hero.png'),
  });
  console.log('Captured: 12_mobile_360_hero.png');

  await browser.close();

  console.log('\n--- VERIFICATION SUMMARY ---');
  console.log('Console Errors:', consoleErrors.length === 0 ? 'ZERO (Clean)' : consoleErrors);
  console.log('390px Horizontal Overflow:', overflowCheck390.hasHorizontalOverflow ? 'FAIL' : 'PASS (Clean)');
  console.log('360px Horizontal Overflow:', overflowCheck360.hasHorizontalOverflow ? 'FAIL' : 'PASS (Clean)');
  console.log('All screenshots written to artifact directory!');
}

runVerification().catch((err) => {
  console.error('Verification failed:', err);
  process.exit(1);
});
