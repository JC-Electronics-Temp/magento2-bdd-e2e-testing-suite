import { test, expect, selectors } from '@playwright/test';
import { PageTester } from '../base/utils/PageTester';
import { Contact } from '../base/utils/Contact';
import slugs from '../base/fixtures/before/slugs.json';
import contactSelector from './fixtures/during/selectors/contact.json';
import globalSelector from '../base/fixtures/during/selectors/global.json';
import contactValue from './fixtures/during/input-values/contact.json';
import accountExpected from '../base/fixtures/verify/expects/contact.json';

test.describe('Test user flow', () => {
    test('Send contactform', async ({ page }) => {
        const randomNumber = Math.floor(Math.random() * 10000000);
        const emailHandle = contactValue.contactEmailHandle;
        const emailHost = contactValue.contactEmailHost;
        const uniqueEmail = `${emailHandle}${randomNumber}@${emailHost}`;

        await page.goto('/contact-details');

        await page.fill(contactSelector.contactNameSelector, contactValue.contactName);
        await page.fill(contactSelector.contactEmailSelector, uniqueEmail);
        // await page.fill(contactSelector.contactTelephoneSelector, contactValue.contactTelephoneNumber);
        await page.fill(contactSelector.contactSubjectSelector, contactValue.contactComment);
        await page.fill(contactSelector.contactCommentSelector, contactValue.contactComment);

        await page.click(contactSelector.contactButtonSelectorName);

        const contactFormSuccessNotificationText = accountExpected.contactFormSuccessNotificationText;
        await expect(page.locator(`text=${contactFormSuccessNotificationText}`)).toBeVisible();

        console.log(`Contact form submitted by email address "${uniqueEmail}"`);
    });
});
