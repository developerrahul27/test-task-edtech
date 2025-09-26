import { test, expect } from '@playwright/test';

test.describe('Basic App Functionality', () => {
  test('should load homepage', async ({ page }) => {
    // Go to homepage
    await page.goto('/', { waitUntil: 'networkidle' });
    
    // Check page title
    await expect(page).toHaveTitle(/Project Tracker/);
    
    // Check that main heading is visible
    await expect(page.getByRole('heading', { name: /Welcome to Project Tracker/ })).toBeVisible();
  });

  test('should access login page', async ({ page }) => {
    // Go directly to login page
    await page.goto('/login', { waitUntil: 'networkidle' });
    
    // Check login page loads
    await expect(page.getByRole('heading', { name: 'Welcome Back' })).toBeVisible();
  });

  test('should access register page', async ({ page }) => {
    // Go directly to register page
    await page.goto('/register', { waitUntil: 'networkidle' });
    
    // Check register page loads
    await expect(page.getByRole('heading', { name: 'Create Account' })).toBeVisible();
  });
});
