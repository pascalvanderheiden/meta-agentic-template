#!/usr/bin/env node
/**
 * Generate screenshot of progress report template
 * Usage: node generate-screenshot.js
 */

const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

(async () => {
  const templatePath = path.resolve(__dirname, '../../.github/prompts/templates/progress-report.template.html');
  const outputPath = path.resolve(__dirname, '../images/status-report.png');

  if (!fs.existsSync(templatePath)) {
    console.error(`Template not found: ${templatePath}`);
    process.exit(1);
  }

  console.log('Launching browser...');
  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: 1400, height: 1200 }
  });

  console.log('Loading template...');
  const fileUrl = `file://${templatePath}`;
  await page.goto(fileUrl, { waitUntil: 'load' });

  // Wait for the report to render
  await page.waitForSelector('body', { timeout: 5000 });
  await page.waitForTimeout(2000); // Extra time for JS to render data

  console.log('Capturing screenshot...');
  await page.screenshot({
    path: outputPath,
    fullPage: true
  });

  await browser.close();
  console.log(`Screenshot saved to: ${outputPath}`);
})();
