import { Given, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';

Given("I open the homepage", async function () {
  const homePage = new HomePage(this.page);
  await homePage.visit();
});

Then("I should see the homepage title {string}", async function (titleText: string) {
  const homePage = new HomePage(this.page);
  await expect(homePage.title).toContainText(titleText);
});

Then("I should see buttons {string} and {string}", async function (signIn: string, signUp: string) {
  const homePage = new HomePage(this.page);
  
  // Top buttons
  await expect(homePage.topSignInButton).toContainText(signIn);
  await expect(homePage.topSignUpButton).toContainText(signUp);

  // Middle buttons
  await expect(homePage.middleSignInButton).toContainText(signIn);
  await expect(homePage.middleSignUpButton).toContainText(signUp);
});

Then("I should see the {string} option", async function (option: string) {
  const homePage = new HomePage(this.page);
  await expect(homePage.tryWithoutAccountButton).toContainText(option);
});