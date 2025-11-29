import { When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { DragAndDropPage } from '../pages/DragAndDropPage';

When('I drag {string} from the source area to the drop zone', async function (itemName: string) {
  const dragAndDropPage = new DragAndDropPage(this.page);
  await dragAndDropPage.dragDefaultItemToDropZone(itemName);
});

When('I drag {string} from the source area to another zone', async function (itemName: string) {
  const dragAndDropPage = new DragAndDropPage(this.page);
  await dragAndDropPage.dragDefaultItemToInvalidZone(itemName);
});

When("I drag the following items from the source area to the drop zone:", async function (dataTable: any) {
  const dragAndDropPage = new DragAndDropPage(this.page);
  const items = dataTable.rawTable.flat();
  await dragAndDropPage.dragMultipleDefaultItems(items);
});


Then('{string} should appear in the drop zone', async function (itemName: string) {
  const dragAndDropPage = new DragAndDropPage(this.page);
  const itemId = itemName.toLowerCase().replace(' ', '-');
  const isVisible = await dragAndDropPage.isItemInDropZone(itemId);
  expect(isVisible).toBe(true);
});

Then('all items should appear in the drop zone', async function () {
  const dragAndDropPage = new DragAndDropPage(this.page);
  const itemIds = ['item-1', 'item-2', 'item-3', 'item-4'];
  
  for (const itemId of itemIds) {
    const isVisible = await dragAndDropPage.isItemInDropZone(itemId);
    expect(isVisible).toBe(true);
  }
});

Then('I should see {string}', async function (itemName: string) {
  const dragAndDropPage = new DragAndDropPage(this.page);
  let itemId: string;
  
  if (itemName === "Special item 1") {
    itemId = "buggy-item-0";
  } else if (itemName === "Special item 2") {
    itemId = "buggy-item-1";
  } else {
    itemId = itemName.toLowerCase().replace(' ', '-');
  }
  
  const isVisible = await dragAndDropPage.isItemVisibleInSourceArea(itemId);
  expect(isVisible).toBe(true);
});

Then('the source area should contain {int} draggable items', async function (expectedCount: number) {
  const dragAndDropPage = new DragAndDropPage(this.page);
  const actualCount = await dragAndDropPage.getSourceItemCount();
  expect(actualCount).toBe(expectedCount);
});

Then('the drop zone should not contain {string}', async function (itemName: string) {
  const dragAndDropPage = new DragAndDropPage(this.page);
  const itemIdMap: { [key: string]: string } = {
    "Item 1": "item-1",
    "Item 2": "item-2",
    "Item 3": "item-3",
    "Item 4": "item-4"
  };
  
  const itemId = itemIdMap[itemName];
  const isVisible = await dragAndDropPage.isItemInDropZone(itemId);
  expect(isVisible).toBe(false);
});