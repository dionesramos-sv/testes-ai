// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('Landing Page Layout Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test.describe('Hero Section', () => {
    test('should display hero section with correct elements', async ({ page }) => {
      // Logo should be visible
      const logo = page.locator('img[alt="Studio Visual"]');
      await expect(logo).toBeVisible();

      // Badge should show "e-book"
      const badge = page.locator('span.uppercase:has-text("e-book")');
      await expect(badge).toBeVisible();

      // Title should be visible
      const title = page.locator('h1');
      await expect(title).toContainText('Google Core Update');

      // CTA button should be visible
      const ctaButton = page.locator('a:has-text("Baixe gratuitamente o e-book")');
      await expect(ctaButton).toBeVisible();
    });

    test('hero background image should load', async ({ page }) => {
      const bgImage = page.locator('img[alt="Background"]');
      await expect(bgImage).toBeVisible();
    });
  });

  test.describe('Benefits Section', () => {
    test('should display 5 benefit items', async ({ page }) => {
      const benefitsSection = page.locator('#form');
      await expect(benefitsSection).toBeVisible();

      // Check for 5 benefit icons
      const benefitIcons = page.locator('img[src*="icon-check"]');
      await expect(benefitIcons).toHaveCount(5);
    });

    test('should display benefits header', async ({ page }) => {
      const benefitsTitle = page.locator('h2:has-text("Prepare seu site para as mudanças")');
      await expect(benefitsTitle).toBeVisible();

      const benefitsBadge = page.locator('span:has-text("Benefícios")');
      await expect(benefitsBadge).toBeVisible();
    });

    test('each benefit should have title and description', async ({ page }) => {
      // Check first benefit
      const firstBenefit = page.locator('h3:has-text("Impacto da Core Update")');
      await expect(firstBenefit).toBeVisible();

      // Check E-E-A-T benefit
      const eeatBenefit = page.locator('h3:has-text("E-E-A-T Google")');
      await expect(eeatBenefit).toBeVisible();

      // Check SEO benefit
      const seoBenefit = page.locator('h3:has-text("Futuro do SEO")');
      await expect(seoBenefit).toBeVisible();
    });
  });

  test.describe('Form Section', () => {
    test('should display form with all fields', async ({ page }) => {
      // Form title
      const formTitle = page.locator('h2:has-text("Baixe agora o e-book gratuito")');
      await expect(formTitle).toBeVisible();

      // Check all form fields
      const nameInput = page.locator('input[placeholder="Digite seu nome completo"]');
      await expect(nameInput).toBeVisible();

      const emailInput = page.locator('input[placeholder="Digite seu e-mail"]');
      await expect(emailInput).toBeVisible();

      const whatsappInput = page.locator('input[type="tel"]');
      await expect(whatsappInput).toBeVisible();

      const cargoInput = page.locator('input[placeholder="Digite seu cargo"]');
      await expect(cargoInput).toBeVisible();

      const empresaInput = page.locator('input[placeholder="Digite sua empresa"]');
      await expect(empresaInput).toBeVisible();
    });

    test('should display privacy checkbox and submit button', async ({ page }) => {
      const privacyCheckbox = page.locator('#privacy');
      await expect(privacyCheckbox).toBeAttached();

      const submitButton = page.locator('button:has-text("Baixar agora")');
      await expect(submitButton).toBeVisible();
    });

    test('e-book mockup should be visible on desktop', async ({ page, viewport }) => {
      if (viewport && viewport.width >= 1024) {
        const mockup = page.locator('img[alt="E-book Mockup"]');
        await expect(mockup).toBeVisible();
      }
    });
  });

  test.describe('About Section', () => {
    test('should display about section with correct content', async ({ page }) => {
      const aboutTitle = page.locator('h2:has-text("Não fique para trás")');
      await expect(aboutTitle).toBeVisible();

      const aboutDescription = page.locator('p:has-text("Baixe o e-book agora e descubra")');
      await expect(aboutDescription).toBeVisible();

      const aboutCta = page.locator('a:has-text("Quero baixar o e-book")');
      await expect(aboutCta).toBeVisible();
    });

    test('e-book preview image should load', async ({ page }) => {
      const ebookPreview = page.locator('img[alt="E-book Preview"]');
      await expect(ebookPreview).toBeVisible();
    });
  });

  test.describe('Logos Carousel', () => {
    test('should display client logos', async ({ page }) => {
      const logosText = page.locator('p:has-text("Empresas que confiam")');
      await expect(logosText).toBeVisible();

      // Check some logos exist
      const direcionalLogo = page.locator('img[alt="Direcional"]').first();
      await expect(direcionalLogo).toBeVisible();
    });
  });

  test.describe('Footer', () => {
    test('should display footer with copyright and social icons', async ({ page }) => {
      const copyright = page.locator('p:has-text("2025 Studio Visual")');
      await expect(copyright).toBeVisible();

      const socialIcons = page.locator('img[alt="Redes Sociais"]');
      await expect(socialIcons).toBeVisible();
    });
  });

  test.describe('Responsive Design', () => {
    test('benefits grid should be single column on mobile', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      const benefitsGrid = page.locator('.grid.grid-cols-1');
      await expect(benefitsGrid).toBeVisible();
    });
  });

  test.describe('Visual Regression', () => {
    test('full page screenshot', async ({ page }) => {
      await page.waitForLoadState('networkidle');
      await expect(page).toHaveScreenshot('full-page.png', {
        fullPage: true,
        maxDiffPixelRatio: 0.1,
      });
    });

    test('hero section screenshot', async ({ page }) => {
      const hero = page.locator('section').first();
      await expect(hero).toHaveScreenshot('hero-section.png', {
        maxDiffPixelRatio: 0.1,
      });
    });

    test('benefits section screenshot', async ({ page }) => {
      const benefits = page.locator('#form');
      await benefits.scrollIntoViewIfNeeded();
      await expect(benefits).toHaveScreenshot('benefits-section.png', {
        maxDiffPixelRatio: 0.1,
      });
    });
  });
});
