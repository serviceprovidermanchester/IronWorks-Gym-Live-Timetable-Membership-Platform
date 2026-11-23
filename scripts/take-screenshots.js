/**
 * IronWorks Gym — Full Site Screenshot Tool
 * Uses Puppeteer to capture all pages at 1440x900
 * Run: node scripts/take-screenshots.js
 */
const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');

const SCREENSHOTS_DIR = path.join(__dirname, '..', 'screenshots');
if (!fs.existsSync(SCREENSHOTS_DIR)) fs.mkdirSync(SCREENSHOTS_DIR, { recursive: true });

const PAGES = [
  // ── PUBLIC ──────────────────────────────────────────────────────────
  { name: '01-homepage',                url: 'http://localhost:3000/',                        scrollFull: true  },
  { name: '02-timetable',               url: 'http://localhost:3000/timetable',               scrollFull: true  },
  { name: '03-membership',              url: 'http://localhost:3000/membership',              scrollFull: true  },
  { name: '04-coach-sarah-jenkins',     url: 'http://localhost:3000/coaches/sarah-jenkins',  scrollFull: true  },
  { name: '05-login',                   url: 'http://localhost:3000/login'                                      },
  { name: '06-register',                url: 'http://localhost:3000/register'                                   },

  // ── MEMBER PORTAL (requires login) ──────────────────────────────────
  { name: '07-member-dashboard',        url: 'http://localhost:3000/dashboard',   needsLogin: true  },
  { name: '08-member-bookings',         url: 'http://localhost:3000/bookings',    needsLogin: true  },
  { name: '09-member-profile',          url: 'http://localhost:3000/profile',     needsLogin: true  },
  { name: '10-member-billing',          url: 'http://localhost:3000/billing',     needsLogin: true  },

  // ── ADMIN DASHBOARD ─────────────────────────────────────────────────
  { name: '11-admin-overview',          url: 'http://localhost:3000/admin',                   needsAdminLogin: true },
  { name: '12-admin-timetable',         url: 'http://localhost:3000/admin/timetable',         needsAdminLogin: true },
  { name: '13-admin-members',           url: 'http://localhost:3000/admin/members',           needsAdminLogin: true },
  { name: '14-admin-revenue',           url: 'http://localhost:3000/admin/revenue',           needsAdminLogin: true },
  { name: '15-admin-bookings',          url: 'http://localhost:3000/admin/bookings',          needsAdminLogin: true },
  { name: '16-admin-member-detail',     url: 'http://localhost:3000/admin/members/m001',     needsAdminLogin: true },

  // ── CMS ADMIN (port 3001) ────────────────────────────────────────────
  { name: '17-cms-dashboard',           url: 'http://localhost:3001/admin',                   scrollFull: true },
  { name: '18-cms-classes',             url: 'http://localhost:3001/admin/classes',           scrollFull: true },
  { name: '19-cms-coaches',             url: 'http://localhost:3001/admin/coaches',           scrollFull: true },
  { name: '20-cms-plans',               url: 'http://localhost:3001/admin/plans',             scrollFull: true },
  { name: '21-cms-announcements',       url: 'http://localhost:3001/admin/announcements',    scrollFull: true },
  { name: '22-cms-members',             url: 'http://localhost:3001/admin/members',           scrollFull: true },
];

async function login(page, email, password) {
  await page.goto('http://localhost:3000/login', { waitUntil: 'networkidle2', timeout: 15000 });
  await page.waitForSelector('input[type="email"]', { timeout: 5000 }).catch(() => {});
  const emailInput = await page.$('input[type="email"]') || await page.$('input[name="email"]');
  const passInput  = await page.$('input[type="password"]') || await page.$('input[name="password"]');
  if (emailInput && passInput) {
    await emailInput.type(email, { delay: 30 });
    await passInput.type(password, { delay: 30 });
    await Promise.all([
      page.keyboard.press('Enter'),
      page.waitForNavigation({ waitUntil: 'networkidle2', timeout: 10000 }).catch(() => {}),
    ]);
  }
  await new Promise(r => setTimeout(r, 1500));
}

async function screenshot(page, name) {
  const file = path.join(SCREENSHOTS_DIR, `${name}.png`);
  await page.screenshot({ path: file, fullPage: true });
  console.log(`  ✅  saved → screenshots/${name}.png`);
}

async function main() {
  console.log('\n📸  IronWorks Gym — Full Site Screenshot Capture');
  console.log('================================================\n');

  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1440,900'],
    defaultViewport: { width: 1440, height: 900 },
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  let memberLoggedIn = false;
  let adminLoggedIn  = false;

  for (const p of PAGES) {
    console.log(`📷  ${p.name}  (${p.url})`);
    try {
      // Handle auth
      if (p.needsLogin && !memberLoggedIn) {
        console.log('    → Logging in as member…');
        await login(page, 'member@ironworksgym.com', 'MemberPassword123!');
        memberLoggedIn = true;
        adminLoggedIn  = false;
      }
      if (p.needsAdminLogin && !adminLoggedIn) {
        console.log('    → Logging in as admin…');
        await login(page, 'admin@ironworksgym.com', 'AdminPassword123!');
        adminLoggedIn  = true;
        memberLoggedIn = false;
      }

      await page.goto(p.url, { waitUntil: 'networkidle2', timeout: 20000 });
      await new Promise(r => setTimeout(r, 1500)); // let animations settle

      await screenshot(page, p.name);
    } catch (err) {
      console.log(`  ⚠️   ${p.name} — ${err.message.split('\n')[0]}`);
      // Still try to screenshot whatever rendered
      try { await screenshot(page, `${p.name}_partial`); } catch {}
    }
  }

  await browser.close();

  // Summary
  const saved = fs.readdirSync(SCREENSHOTS_DIR).filter(f => f.endsWith('.png'));
  console.log(`\n✅  Done! ${saved.length} screenshots saved to /screenshots/`);
  console.log('Files:\n' + saved.map(f => `  • ${f}`).join('\n'));
}

main().catch(err => { console.error(err); process.exit(1); });
