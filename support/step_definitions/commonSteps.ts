import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { SignInPage } from '../pages/SignInPage';
import { DragAndDropPage } from '../pages/DragAndDropPage';

Given("I open the homepage", async function () {
  const homePage = new HomePage(this.page);
  await homePage.visit();
});

When("I click on the {string} button", async function (buttonText: string) {
  const homePage = new HomePage(this.page);
  const signInPage = new SignInPage(this.page);
  const dragAndDropPage = new DragAndDropPage(this.page);

  switch(buttonText) {
    case "Top Sign In":
      await expect(homePage.topSignInButton).toBeVisible();
      await homePage.topSignInButton.click();
      break;
    case "Middle Sign In":
      await expect(homePage.middleSignInButton).toBeVisible();
      await homePage.middleSignInButton.click();
      break;
    case "Try Without Account":
      await expect(homePage.tryWithoutAccountButton).toBeVisible();
      await homePage.tryWithoutAccountButton.click();
      break;
    case "Logout":
      await expect(signInPage.logoutButton).toBeVisible();
      await signInPage.logoutButton.click();
      break;
     case "Add Item":
      await expect(dragAndDropPage.addItemButton).toBeVisible();
      await dragAndDropPage.clickAddItem();
      break;
    case "Reset":
      await expect(dragAndDropPage.resetButton).toBeVisible();
      await dragAndDropPage.clickReset();
      break;
    
    default:
      throw new Error(`Button "${buttonText}" not mapped in pages`);
  }
});

Then("I should be redirected to the {string} page", async function (type: string) {
  const homePage = new HomePage(this.page);
  const signInPage = new SignInPage(this.page);

  switch (type) {
    case "dashboard":
      await expect(this.page).toHaveURL(/.*dashboard/);
      await expect(signInPage.dashboard).toBeVisible();
      break;
    case "home":
      await expect(this.page).toHaveURL(/\//);
      await expect(homePage.title).toBeVisible();
      break;
    case "sign in": 
      await expect(this.page).toHaveURL(/.*login/);
      break;
    default:
      throw new Error(`Unknown page type: ${type}`);
  }
});

Then("I should be remain on to the {string} page", async function (type: string) {
  switch (type) {
    case "sign in": 
      await expect(this.page).toHaveURL(/.*login/);
      break;
    default:
      throw new Error(`Unknown page type: ${type}`);
  }
});


Given("I navigate to {string} page", async function (pageName: string) {
  switch (pageName) {
    case "Drag and Drop": 
      await this.page.locator('span').getByText('Drag and Drop').click();
      await expect(this.page).toHaveURL(/.*drag-and-drop/);
      break;
    case "File Operations": 
      await this.page.locator('span').getByText('File Operations').click();
      await expect(this.page).toHaveURL(/.*file-operations/);
      break;
    case "Dynamic Elements": 
      await this.page.locator('span').getByText('Dynamic Elements').click();
      await expect(this.page).toHaveURL(/.*dynamic-elements/);
      break;
    case "Keyboard and Mouse Events": 
      await this.page.locator('span').getByText('Keyboard & Mouse Events').click();
      await expect(this.page).toHaveURL(/.*keyboard-mouse-events/);
      break;
    default:
      throw new Error(`Page "${pageName}" is not mapped for navigation.`);
  }
});