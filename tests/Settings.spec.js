import  {test, expect} from '@playwright/test'
import { LoginPage } from '../pages/login'
import { HomePage } from '../pages/home'

let Login
let Home
let x
test.beforeEach(async({page})=>{

 // const context = await browser.newContext({
 //   storageState: "./auth.json"
 // })
 // const page = await context.newPage()
  Login = new LoginPage(page);
  Home = new HomePage(page);
  await Login.gotoLoginPage();
  await Login.waitforLoginPage();
  await Login.login('amlank@geekyants.com','Amlan@420');
  await Login.waitforHomePage();
  await expect(page).toHaveURL('https://acmebank.dev.zingly.ai/#/admin/home'); //verify HomePage url
 })

 test('Settings tab', async({page})=>{
 Home.gotoSettingsTab();
 await expect(page).toHaveURL('https://acmebank.dev.zingly.ai/#/admin/settings/brand'); //verify Settings>>Brand tab

 await expect(page.getByText('Brand', { exact: true }).nth(1)).toBeVisible();
 await expect(page.getByText('Brand Name')).toBeVisible();
 await expect(page.getByLabel('Brand Name')).toHaveValue(/Acme Bank 3/);
 await expect(page.getByText('Change your brand logo')).toBeVisible();
 //await page.getByText('Change your brand logo').click();
 await expect(page.getByText('Code Snippet', { exact: true })).toBeVisible();

 await page.getByRole('link', { name: 'Users' }).click();
 await expect(page).toHaveURL('https://acmebank.dev.zingly.ai/#/admin/settings/users'); //verify Settings>>Users tab

 await page.getByRole('link', { name: 'Roles & permissions' }).click();
 await expect(page).toHaveURL('https://acmebank.dev.zingly.ai/#/admin/settings/rolesPermissions'); //verify Settings>>Roles tab
 await expect(page.getByText('Roles & permissions').nth(1)).toBeVisible();
 await page.locator('label svg').click(); //When Description is toggled ON
 await page.getByPlaceholder('Search').fill('Participants');
 await page.getByPlaceholder('Search').click();
 await expect(page.getByText('Add Participants')).toBeVisible();
 await expect(page.getByText('Add participant to room')).toBeVisible();
 await expect(page.getByText('View Participants')).toBeVisible();
 await expect(page.getByText('View room participants')).toBeVisible();
 await expect(page.getByText('Remove Participants')).toBeVisible();
 await expect(page.getByText('Removes participants from room')).toBeVisible();
 await page.locator('label svg').click(); //When Description is toggled OFF
 await page.getByPlaceholder('Search').fill('Participants');
 await page.getByPlaceholder('Search').click();
 await expect(page.getByText('Add Participants')).toBeVisible();
 await expect(page.getByText('Add Participants to room')).toBeHidden();
 await expect(page.getByText('View Participants')).toBeVisible();
 await expect(page.getByText('View room participants')).toBeHidden();
 await expect(page.getByText('Remove Participants')).toBeVisible();
 await expect(page.getByText('Removes participants from room')).toBeHidden();

 await page.getByRole('link', { name: 'Account' }).click();
 await expect(page).toHaveURL('https://acmebank.dev.zingly.ai/#/admin/settings/account'); //verify Settings>>Account tab
 await expect(page.getByText('Contact Email')).toBeVisible();
 await expect(page.getByText('Contact Phone Number')).toBeVisible();
 await expect(page.getByText('ACCOUNT CREATED')).toBeVisible();
 await expect(page.getByText('Jul 25, 2022').first()).toBeVisible();
 await expect(page.getByText('SERVICE START DATE')).toBeVisible();
 await expect(page.getByText('Jul 25, 2022').nth(1)).toBeVisible();
 })