import { When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { SignInPage } from '../pages/SignInPage';
import * as testData from '../../fixtures/testData.json';

When("I enter credentials for a valid user", async function () {
  const signInPage = new SignInPage(this.page);
  const user = testData.validUsers[0];
  console.log(`Valid user: ${user.description} (${user.email})`);
  await signInPage.enterCredentials(user.email, user.password);
});

When("I enter credentials for an invalid user", async function () {
  const signInPage = new SignInPage(this.page);
  const user = testData.invalidUsers[0];
  console.log(`Invalid user: ${user.description}`);
  await signInPage.enterCredentials(user.email, user.password);
});

When("I submit the sign in form", async function () {
  const signInPage = new SignInPage(this.page);
  await signInPage.submit();
});