import { expect } from '@playwright/test';
import { config } from '../../Utils/AI'; // Ensure the correct path to your utility/config file

class RegisterPage {
  constructor(page) {
    this.page = page;
  }

  async registerAndLogin() {
    const iterations = config.numberOfIterations; // Get the number of iterations from config

    for (let i = 0; i < iterations; i++) {
      const randomString = Math.random().toString(36).substring(2, 10);
      const randomName = `TesterFriendify${randomString}`;
      const randomEmail = `TesterFriendify${randomString}@gmail.com`;
      const password = 'Tester25082024@';

      // Navigate to the registration page
      await this.page.goto(config.URL);
      await this.page.getByRole('checkbox').check();
      await this.page.locator('.close-button').first().click();
      await this.page.getByRole('button', { name: 'Sign In' }).click();
      await  this.page.getByText('Sign Up').click();

      // Fill out the registration form
      await this.page.getByPlaceholder('Enter your name').fill(randomName);
      await this.page.getByPlaceholder('Enter your email').fill(randomEmail);
      await this.page.locator('#basic_password', { exact: true }).fill(password);
      await this.page.locator('#basic_re_password').fill(password);

      // Submit registration
      await this.page.getByRole('button', { name: 'Create Account' }).click();
      await expect(this.page.getByText('Sign up success')).toBeVisible();
    }
  }
}

export default RegisterPage;
