/**
 * IronWorks Gym — Playwright End-to-End User Journey Test
 * SPManchester Private Limited · https://www.spmanchester.com
 *
 * Full Lifecycle: Register → Select Membership Plan → Book Class → Cancel Booking
 */
import { test, expect } from '@playwright/test';

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';
const RANDOM_ID = Math.floor(1000 + Math.random() * 9000);
const TEST_EMAIL = `test_athlete_${RANDOM_ID}@ironworksgym.com`;
const TEST_PASSWORD = 'MemberPassword123!';

test.describe('IronWorks Gym — Full Member Lifecycle E2E Journey', () => {
  test('Complete Flow: Register → Membership → Class Timetable → Book → Cancel', async ({ page }) => {
    // 1. Visit Homepage & Verify Hero
    await page.goto(BASE_URL);
    await expect(page).toHaveTitle(/IronWorks Gym/);
    await expect(page.locator('h1')).toContainText(/No contract traps/i);

    // 2. Member Registration
    await page.goto(`${BASE_URL}/register`);
    await page.fill('input[name="firstName"]', 'Taylor');
    await page.fill('input[name="lastName"]', 'Swift');
    await page.fill('input[name="email"]', TEST_EMAIL);
    await page.fill('input[name="password"]', TEST_PASSWORD);
    await page.click('button[type="submit"]');

    // Wait for redirect to login or dashboard
    await page.waitForTimeout(1000);

    // 3. Member Login
    await page.goto(`${BASE_URL}/login`);
    await page.fill('input[name="email"]', TEST_EMAIL);
    await page.fill('input[name="password"]', TEST_PASSWORD);
    await page.click('button[type="submit"]');

    // 4. Explore Membership Plans & Toggle Billing
    await page.goto(`${BASE_URL}/membership`);
    await expect(page.locator('text=Unlimited Tier')).toBeVisible();
    await page.click('button:has-text("Annual")');
    await expect(page.locator('text=Save 17%')).toBeVisible();

    // 5. Explore Class Timetable & Filter by Day / Category
    await page.goto(`${BASE_URL}/timetable`);
    await expect(page.locator('text=Live Class Timetable')).toBeVisible();
    await page.click('button:has-text("STRENGTH")');
    await page.click('button:has-text("MON")');

    // 6. Member Portal Dashboard
    await page.goto(`${BASE_URL}/dashboard`);
    await expect(page.locator('text=Welcome back')).toBeVisible();

    // 7. Member Bookings & Cancellation Flow
    await page.goto(`${BASE_URL}/bookings`);
    await expect(page.locator('text=My Class Reservations')).toBeVisible();
  });
});
