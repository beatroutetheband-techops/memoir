const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

async function renderCarousel() {
  console.log('🚀 Starting Playwright carousel slide generator...');
  
  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: 1080, height: 1350 },
    deviceScaleFactor: 2 // High DPI 2x render for crisp studio text
  });

  const slides = [
    { src: 'slide_1.html', out: 'slide1_cover.png' },
    { src: 'slide_2.html', out: 'slide2_why.png' },
    { src: 'slide_3.html', out: 'slide3_process.png' },
    { src: 'slide_4.html', out: 'slide4_packages.png' },
    { src: 'slide_5.html', out: 'slide5_cta.png' }
  ];

  const srcDir = path.join(__dirname, 'slides_src');
  const outDir = path.join(__dirname, 'first_post');

  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  for (const slide of slides) {
    const filePath = 'file://' + path.join(srcDir, slide.src);
    console.log(`Rendering ${slide.src} -> ${slide.out}...`);
    await page.goto(filePath, { waitUntil: 'networkidle' });
    await page.screenshot({
      path: path.join(outDir, slide.out),
      type: 'png'
    });
  }

  await browser.close();
  console.log('✅ All 5 carousel slides rendered successfully to instagram_templates/first_post/');
}

renderCarousel().catch(err => {
  console.error('Error rendering carousel:', err);
  process.exit(1);
});
