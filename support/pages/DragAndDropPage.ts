import { Page, Locator } from '@playwright/test';

export class DragAndDropPage {
  readonly page: Page;
  
  // Element locators
  readonly sourceArea: Locator;
  readonly dropZone: Locator;
  readonly addItemButton: Locator;
  readonly resetButton: Locator;

  constructor(page: Page) {
    this.page = page;
    
    // Initialize locators
    this.sourceArea = page.locator('.card-content .space-y-3');
    this.dropZone = page.locator('#drop-zone');
    this.addItemButton = page.locator('button.btn').getByText('Add Item');
    this.resetButton = page.locator('button').getByText(/^Reset$/);
  }

  /**
   * Gets a default draggable item by its display name
   */
  getDefaultItem(name: string): Locator {
    const itemIdMap: { [key: string]: string } = {
      "Item 1": "item-1",
      "Item 2": "item-2",
      "Item 3": "item-3",
      "Item 4": "item-4"
    };
    return this.page.locator(`#${itemIdMap[name]}`);
  }

  /**
   * Gets a special dynamically added draggable item by its ID
   */
  getSpecialItem(id: string): Locator {
    return this.page.locator(`#${id}`);
  }

  /**
   * Performs drag operation of a default item to the drop zone
   */
  async dragDefaultItemToDropZone(itemName: string): Promise<void> {
    const item = this.getDefaultItem(itemName);
    const dropZone = this.dropZone;
    
    await item.scrollIntoViewIfNeeded();
    await item.hover();
    await this.page.mouse.down();
    await dropZone.hover();
    await this.page.mouse.up();
  }

  /**
   * Performs drag operation to an invalid/non-target zone
   */
  async dragDefaultItemToInvalidZone(itemName: string): Promise<void> {
    const item = this.getDefaultItem(itemName);
    
    // Create an invalid drop zone by dragging to a random position
    await item.scrollIntoViewIfNeeded();
    const box = await item.boundingBox();
    if (box) {
      await item.hover();
      await this.page.mouse.down();
      // Drag to a position outside any valid drop zone
      await this.page.mouse.move(box.x + 100, box.y - 100);
      await this.page.mouse.up();
    }
  }

  /**
   * Performs sequential drag operations for multiple default items
   */
  async dragMultipleDefaultItems(itemNames: string[]): Promise<void> {
    for (const itemName of itemNames) {
      await this.dragDefaultItemToDropZone(itemName);
      // Small delay between drag operations
      await this.page.waitForTimeout(500);
    }
  }

  /**
   * Clicks the Add Item button
   */
  async clickAddItem(): Promise<void> {
    await this.addItemButton.click();
  }

  /**
   * Clicks the Reset button
   */
  async clickReset(): Promise<void> {
    await this.resetButton.click();
  }

  /**
   * Checks if an item is visible in the source area
   */
  async isItemVisibleInSourceArea(itemId: string): Promise<boolean> {
    const item = this.sourceArea.locator(`#${itemId}`);
    return await item.isVisible();
  }

  /**
   * Checks if an item is present in the drop zone
   */
  async isItemInDropZone(itemId: string): Promise<boolean> {
    const item = this.dropZone.locator(`#${itemId}`);
    return await item.isVisible();
  }

  /**
   * Gets the count of draggable items in the source area
   */
  async getSourceItemCount(): Promise<number> {
    return await this.sourceArea.locator('[draggable="true"]').count();
  }
}