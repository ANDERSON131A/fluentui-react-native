import NavigateAppPage from '../../common/NavigateAppPage';
import FocusZonePageObject, { GridButton, GridFocusZoneOption } from '../pages/FocusZonePageObject';
import { PAGE_TIMEOUT, BOOT_APP_TIMEOUT, Keys, Attribute, AttributeValue } from '../../common/consts';

// Before testing begins, allow up to 60 seconds for app to open
describe('FocusZone Testing Initialization', function () {
  it('Wait for app load', async () => {
    await NavigateAppPage.waitForPageDisplayed(BOOT_APP_TIMEOUT);
    await expect(await NavigateAppPage.isPageLoaded()).toBeTruthy(NavigateAppPage.ERRORMESSAGE_APPLOAD);
  });

  it('Click and navigate to FocusZone test page', async () => {
    /* Click on component button to navigate to test page */
    await NavigateAppPage.clickAndGoToFocusZonePage();
    await FocusZonePageObject.waitForPageDisplayed(PAGE_TIMEOUT);

    await expect(await FocusZonePageObject.isPageLoaded()).toBeTruthy(FocusZonePageObject.ERRORMESSAGE_PAGELOAD);
    await expect(await FocusZonePageObject.didAssertPopup()).toBeFalsy(FocusZonePageObject.ERRORMESSAGE_ASSERT); // Ensure no asserts popped up
  });
});

/* FocusZone Functional Testing
 *
 * This test validates that keyboard navigation using both arrow keys and
 * tab key works, even when modifying how the FocusZone functions.
 *
 * */
describe('FocusZone Functional Testing', () => {
  beforeEach(async () => {
    await FocusZonePageObject.scrollToTestElement();

    await FocusZonePageObject.resetTest();
  });

  it('Navigate bidirectional focuszone by arrow keys - switches focus correctly', async () => {
    // move to 2 with right arrow
    await FocusZonePageObject.sendKeys(FocusZonePageObject.gridButton(GridButton.One), [Keys.ARROW_RIGHT]);
    await expect(
      await FocusZonePageObject.compareAttribute(FocusZonePageObject.gridButton(GridButton.Two), Attribute.IsFocused, AttributeValue.true),
    ).toBeTruthy();

    // move to 3 with down arrow
    await FocusZonePageObject.sendKeys(FocusZonePageObject.gridButton(GridButton.Two), [Keys.ARROW_DOWN]);
    await expect(
      await FocusZonePageObject.compareAttribute(
        FocusZonePageObject.gridButton(GridButton.Three),
        Attribute.IsFocused,
        AttributeValue.true,
      ),
    ).toBeTruthy();

    await expect(await FocusZonePageObject.didAssertPopup()).toBeFalsy(FocusZonePageObject.ERRORMESSAGE_ASSERT);
  });

  it('Navigate horizontal focuszone by arrow keys - switches focus correctly', async () => {
    await FocusZonePageObject.configureGridFocusZone(GridFocusZoneOption.SetDirection, 'horizontal');
    // move to 2 with right arrow
    await FocusZonePageObject.sendKeys(FocusZonePageObject.gridButton(GridButton.One), [Keys.ARROW_RIGHT]);
    await expect(
      await FocusZonePageObject.compareAttribute(FocusZonePageObject.gridButton(GridButton.Two), Attribute.IsFocused, AttributeValue.true),
    ).toBeTruthy();

    // down arrow shouldn't move focus
    await FocusZonePageObject.sendKeys(FocusZonePageObject.gridButton(GridButton.Two), [Keys.ARROW_DOWN]);
    await expect(
      await FocusZonePageObject.compareAttribute(FocusZonePageObject.gridButton(GridButton.Two), Attribute.IsFocused, AttributeValue.true),
    ).toBeTruthy();

    // left arrow goes back
    await FocusZonePageObject.sendKeys(FocusZonePageObject.gridButton(GridButton.Four), [Keys.ARROW_LEFT]);
    await expect(
      await FocusZonePageObject.compareAttribute(
        FocusZonePageObject.gridButton(GridButton.Three),
        Attribute.IsFocused,
        AttributeValue.true,
      ),
    ).toBeTruthy();

    await expect(await FocusZonePageObject.didAssertPopup()).toBeFalsy(FocusZonePageObject.ERRORMESSAGE_ASSERT);
  });

  it('Navigates vertical focuszone by arrow keys - switches focus correctly', async () => {
    await FocusZonePageObject.configureGridFocusZone(GridFocusZoneOption.SetDirection, 'vertical');

    // move to 2 with down arrow
    await FocusZonePageObject.sendKeys(FocusZonePageObject.gridButton(GridButton.One), [Keys.ARROW_DOWN]);
    await expect(
      await FocusZonePageObject.compareAttribute(FocusZonePageObject.gridButton(GridButton.Two), Attribute.IsFocused, AttributeValue.true),
    ).toBeTruthy();

    // right arrow shouldn't move focus
    await FocusZonePageObject.sendKeys(FocusZonePageObject.gridButton(GridButton.Two), [Keys.ARROW_RIGHT]);
    await expect(
      await FocusZonePageObject.compareAttribute(FocusZonePageObject.gridButton(GridButton.Two), Attribute.IsFocused, AttributeValue.true),
    ).toBeTruthy();

    // up arrow goes back
    await FocusZonePageObject.sendKeys(FocusZonePageObject.gridButton(GridButton.Four), [Keys.ARROW_UP]);
    await expect(
      await FocusZonePageObject.compareAttribute(
        FocusZonePageObject.gridButton(GridButton.Three),
        Attribute.IsFocused,
        AttributeValue.true,
      ),
    ).toBeTruthy();

    await expect(await FocusZonePageObject.didAssertPopup()).toBeFalsy(FocusZonePageObject.ERRORMESSAGE_ASSERT);
  });

  it("Navigates none-direction focuszone by arrow keys - doesn't switch focus", async () => {
    await FocusZonePageObject.configureGridFocusZone(GridFocusZoneOption.SetDirection, 'none');

    // none of these key commands should move
    await FocusZonePageObject.sendKeys(FocusZonePageObject.gridButton(GridButton.Two), [Keys.ARROW_DOWN]);
    await expect(
      await FocusZonePageObject.compareAttribute(FocusZonePageObject.gridButton(GridButton.Two), Attribute.IsFocused, AttributeValue.true),
    ).toBeTruthy();

    await FocusZonePageObject.sendKeys(FocusZonePageObject.gridButton(GridButton.Two), [Keys.ARROW_UP]);
    await expect(
      await FocusZonePageObject.compareAttribute(FocusZonePageObject.gridButton(GridButton.Two), Attribute.IsFocused, AttributeValue.true),
    ).toBeTruthy();

    await FocusZonePageObject.sendKeys(FocusZonePageObject.gridButton(GridButton.Two), [Keys.ARROW_LEFT]);
    await expect(
      await FocusZonePageObject.compareAttribute(FocusZonePageObject.gridButton(GridButton.Two), Attribute.IsFocused, AttributeValue.true),
    ).toBeTruthy();

    await FocusZonePageObject.sendKeys(FocusZonePageObject.gridButton(GridButton.Two), [Keys.ARROW_RIGHT]);
    await expect(
      await FocusZonePageObject.compareAttribute(FocusZonePageObject.gridButton(GridButton.Two), Attribute.IsFocused, AttributeValue.true),
    ).toBeTruthy();

    await expect(await FocusZonePageObject.didAssertPopup()).toBeFalsy(FocusZonePageObject.ERRORMESSAGE_ASSERT);
  });

  it('Navigates bi-directional focuszone with 2d navigation - switches focus correctly', async () => {
    await FocusZonePageObject.configureGridFocusZone(GridFocusZoneOption.Set2DNavigation, true);

    await FocusZonePageObject.sendKeys(FocusZonePageObject.gridButton(GridButton.One), [Keys.ARROW_DOWN]);
    await expect(
      await FocusZonePageObject.compareAttribute(FocusZonePageObject.gridButton(GridButton.Four), Attribute.IsFocused, AttributeValue.true),
    ).toBeTruthy();

    await FocusZonePageObject.sendKeys(FocusZonePageObject.gridButton(GridButton.Four), [Keys.ARROW_RIGHT]);
    await expect(
      await FocusZonePageObject.compareAttribute(FocusZonePageObject.gridButton(GridButton.Five), Attribute.IsFocused, AttributeValue.true),
    ).toBeTruthy();

    await expect(await FocusZonePageObject.didAssertPopup()).toBeFalsy(FocusZonePageObject.ERRORMESSAGE_ASSERT);
  });

  it("Navigates focuszone with circular navigation off - doesn't switch focus", async () => {
    await FocusZonePageObject.sendKeys(FocusZonePageObject.gridButton(GridButton.One), [Keys.ARROW_LEFT]);
    await expect(
      await FocusZonePageObject.compareAttribute(FocusZonePageObject.gridButton(GridButton.One), Attribute.IsFocused, AttributeValue.true),
    ).toBeTruthy();

    await FocusZonePageObject.sendKeys(FocusZonePageObject.gridButton(GridButton.Nine), [Keys.ARROW_RIGHT]);
    await expect(
      await FocusZonePageObject.compareAttribute(FocusZonePageObject.gridButton(GridButton.Nine), Attribute.IsFocused, AttributeValue.true),
    ).toBeTruthy();

    await expect(await FocusZonePageObject.didAssertPopup()).toBeFalsy(FocusZonePageObject.ERRORMESSAGE_ASSERT);
  });

  it('Navigates focuszone with circular navigation on - switches focus correctly', async () => {
    await FocusZonePageObject.configureGridFocusZone(GridFocusZoneOption.SetCircularNavigation, true);

    await FocusZonePageObject.sendKeys(FocusZonePageObject.gridButton(GridButton.One), [Keys.ARROW_LEFT]);
    await expect(
      await FocusZonePageObject.compareAttribute(FocusZonePageObject.gridButton(GridButton.Nine), Attribute.IsFocused, AttributeValue.true),
    ).toBeTruthy();

    await FocusZonePageObject.sendKeys(FocusZonePageObject.gridButton(GridButton.Nine), [Keys.ARROW_RIGHT]);
    await expect(
      await FocusZonePageObject.compareAttribute(FocusZonePageObject.gridButton(GridButton.One), Attribute.IsFocused, AttributeValue.true),
    ).toBeTruthy();

    await expect(await FocusZonePageObject.didAssertPopup()).toBeFalsy(FocusZonePageObject.ERRORMESSAGE_ASSERT);
  });

  it("Navigates disabled focuszone by arrow keys - doesn't switch focus", async () => {
    await FocusZonePageObject.configureGridFocusZone(GridFocusZoneOption.Disable, true);

    // none of these key commands should move
    await FocusZonePageObject.sendKeys(FocusZonePageObject.gridButton(GridButton.Two), [Keys.ARROW_DOWN]);
    await expect(
      await FocusZonePageObject.compareAttribute(FocusZonePageObject.gridButton(GridButton.Two), Attribute.IsFocused, AttributeValue.true),
    ).toBeTruthy();

    await FocusZonePageObject.sendKeys(FocusZonePageObject.gridButton(GridButton.Two), [Keys.ARROW_UP]);
    await expect(
      await FocusZonePageObject.compareAttribute(FocusZonePageObject.gridButton(GridButton.Two), Attribute.IsFocused, AttributeValue.true),
    ).toBeTruthy();

    await FocusZonePageObject.sendKeys(FocusZonePageObject.gridButton(GridButton.Two), [Keys.ARROW_LEFT]);
    await expect(
      await FocusZonePageObject.compareAttribute(FocusZonePageObject.gridButton(GridButton.Two), Attribute.IsFocused, AttributeValue.true),
    ).toBeTruthy();

    await FocusZonePageObject.sendKeys(FocusZonePageObject.gridButton(GridButton.Two), [Keys.ARROW_RIGHT]);
    await expect(
      await FocusZonePageObject.compareAttribute(FocusZonePageObject.gridButton(GridButton.Two), Attribute.IsFocused, AttributeValue.true),
    ).toBeTruthy();

    await expect(await FocusZonePageObject.didAssertPopup()).toBeFalsy(FocusZonePageObject.ERRORMESSAGE_ASSERT);
  });

  it('Tabs in and out of the FocusZone - switches focus correctly', async () => {
    await FocusZonePageObject.sendKeys(FocusZonePageObject._beforeButton, [Keys.TAB]);
    await expect(
      await FocusZonePageObject.compareAttribute(FocusZonePageObject.gridButton(GridButton.One), Attribute.IsFocused, AttributeValue.true),
    ).toBeTruthy();

    await FocusZonePageObject.sendKeys(FocusZonePageObject.gridButton(GridButton.One), [Keys.TAB]);
    await expect(
      await FocusZonePageObject.compareAttribute(FocusZonePageObject._afterButton, Attribute.IsFocused, AttributeValue.true),
    ).toBeTruthy();

    await FocusZonePageObject.sendKeys(FocusZonePageObject._afterButton, [Keys.SHIFT, Keys.TAB]);
    await expect(
      await FocusZonePageObject.compareAttribute(FocusZonePageObject.gridButton(GridButton.Nine), Attribute.IsFocused, AttributeValue.true),
    ).toBeTruthy();

    await FocusZonePageObject.sendKeys(FocusZonePageObject.gridButton(GridButton.Nine), [Keys.SHIFT, Keys.TAB]);
    await expect(
      await FocusZonePageObject.compareAttribute(FocusZonePageObject._beforeButton, Attribute.IsFocused, AttributeValue.true),
    ).toBeTruthy();

    await expect(await FocusZonePageObject.didAssertPopup()).toBeFalsy(FocusZonePageObject.ERRORMESSAGE_ASSERT);
  });

  it('Tabs in and out of the FocusZone with a defaultTabbableElement set - switches focus correctly', async () => {
    // This sets the defaultTabbableElement prop of the FocusZone to be grid button #4. Whenever a user tabs into the zone, button 4 should always be the first to be selected.
    await FocusZonePageObject.configureGridFocusZone(GridFocusZoneOption.UseDefaultTabbableElement, true);

    await FocusZonePageObject.sendKeys(FocusZonePageObject._beforeButton, [Keys.TAB]);
    await expect(
      await FocusZonePageObject.compareAttribute(FocusZonePageObject.gridButton(GridButton.Four), Attribute.IsFocused, AttributeValue.true),
    ).toBeTruthy();

    await FocusZonePageObject.sendKeys(FocusZonePageObject.gridButton(GridButton.Four), [Keys.TAB]);
    await expect(
      await FocusZonePageObject.compareAttribute(FocusZonePageObject._afterButton, Attribute.IsFocused, AttributeValue.true),
    ).toBeTruthy();

    await FocusZonePageObject.sendKeys(FocusZonePageObject._afterButton, [Keys.SHIFT, Keys.TAB]);
    await expect(
      await FocusZonePageObject.compareAttribute(FocusZonePageObject.gridButton(GridButton.Four), Attribute.IsFocused, AttributeValue.true),
    ).toBeTruthy();

    // Key to another button, tab out, and tab back in to make sure the default tabbable element is still the first to be tabbed to
    await FocusZonePageObject.sendKeys(FocusZonePageObject.gridButton(GridButton.Four), [Keys.ARROW_RIGHT]);
    await expect(
      await FocusZonePageObject.compareAttribute(FocusZonePageObject.gridButton(GridButton.Five), Attribute.IsFocused, AttributeValue.true),
    ).toBeTruthy();

    await FocusZonePageObject.sendKeys(FocusZonePageObject.gridButton(GridButton.Five), [Keys.SHIFT, Keys.TAB]);
    await expect(
      await FocusZonePageObject.compareAttribute(FocusZonePageObject._beforeButton, Attribute.IsFocused, AttributeValue.true),
    ).toBeTruthy();

    await FocusZonePageObject.sendKeys(FocusZonePageObject._beforeButton, [Keys.TAB]);
    await expect(
      await FocusZonePageObject.compareAttribute(FocusZonePageObject.gridButton(GridButton.Four), Attribute.IsFocused, AttributeValue.true),
    ).toBeTruthy();

    await expect(await FocusZonePageObject.didAssertPopup()).toBeFalsy(FocusZonePageObject.ERRORMESSAGE_ASSERT);
  });
});
