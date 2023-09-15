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

 test('Topics tab', async({page})=>{
    Home.gotoTopicsTab();
    await expect(page).toHaveURL('https://acmebank.dev.zingly.ai/#/admin/topics');
    const x= Math.round(Math.random()*10);

    await page.getByRole('button', { name: 'Create' }).click();
    await page.locator('a').filter({ hasText: 'General' }).click();
    await page.locator('#general_section').getByText('General').click();
    await page.getByLabel('Topic name').click();
    await page.getByLabel('Topic name').fill('AutomationTopic'+ (x*11));
    await page.getByLabel('Display name (leave blank if the same as above, max 32 characters)').click();
    await page.getByLabel('Display name (leave blank if the same as above, max 32 characters)').fill('AT'+ x);
    await page.locator('#topicEditMainSection div').filter({ hasText: 'GeneralTopics are categories of conversations within your brand. They define the' }).first().click();
    await page.getByLabel('Topic greeting').fill('H');
    await page.getByLabel('Topic greeting').click();
    await page.getByLabel('Topic greeting').fill('Hello, Welcome to the topic!');
    await page.getByLabel('Keywords associated with the topic').click();
    await page.getByLabel('Keywords associated with the topic').fill('1');
    await page.getByLabel('Keywords associated with the topic').press('Enter');
    await page.getByLabel('Keywords associated with the topic').fill('2b');
    await page.getByLabel('Keywords associated with the topic').press('Enter');
    await page.getByLabel('Keywords associated with the topic').fill('3Testing keywords');
    await page.getByLabel('Keywords associated with the topic').press('Enter');
 
    await page.locator('.sc-gSQFLo').click(); // Priority dropdown should
    await page.getByText('Medium').click();
    await page.getByPlaceholder('Search...').click();
    await page.getByPlaceholder('Search...').fill('amlan');
    await page.getByPlaceholder('Search...').press('Enter');
    await page.locator('div').filter({ hasText: 'Amlan KumarAdmin | amlank@geekyants.com' }).nth(1).click();
    await page.locator('div:nth-child(7) > .sc-jpLtl > label > .sc-furwcr > .sc-iCfMLu').click();
   
    await page.locator('#communication_section svg').nth(2).click();
    await page.getByText('Video', { exact: true }).click();
    await page.locator('div:nth-child(4) > .sc-hVTcrQ > label > .sc-kfPuZi > .sc-dJjYzT > .sc-hGPBjI').click();

    await page.locator('input[type="tel"]').click();
    await page.locator('input[type="tel"]').fill('4');
    await page.getByRole('button', { name: 'Add State' }).click();
    await page.getByPlaceholder('New flow state').click();
    await page.getByPlaceholder('New flow state').fill('1a');
    await page.getByRole('button', { name: 'Add State' }).click();
    await page.getByRole('button', { name: 'New flow state This field is required' }).getByPlaceholder('New flow state').click();
    await page.getByRole('button', { name: 'New flow state This field is required' }).getByPlaceholder('New flow state').fill('2b');
    //await page.getByPlaceholder('New flow state').fill('2b');
    
    
    await page.getByRole('button', { name: 'Done' }).click();
    await page.getByRole('button', { name: 'Save as draft' }).click();

    await page.waitForURL('https://acmebank.dev.zingly.ai/#/admin/topics');
    await page.getByPlaceholder('Search').click();
    await page.getByPlaceholder('Search').fill('AT'+ x);
    await page.getByRole('button', { name: 'Edit' }).click();
    await page.getByRole('button', { name: 'Cancel' }).click();
    await page.getByPlaceholder('Search').click();
    await page.getByPlaceholder('Search').fill('AT'+ x);
    await page.getByRole('button', { name: 'Edit' }).click();
    await page.locator('.sc-fXNlap').click();
    await page.getByPlaceholder('Search').fill('AT'+ x);
    await page.getByText('Draft').click();
    await page.getByText('Publish').click();
    await page.getByRole('button', { name: 'Publish' }).click();
    await page.locator('label div').nth(1).click();
    await page.getByText('Unpublish').click();
    await page.getByRole('button', { name: 'Never mind' }).click();
    await page.getByText('Published').click();
    await page.getByText('Unpublish').click();
    await page.getByRole('button', { name: 'Unpublish' }).click();
    await page.locator('div').filter({ hasText: 'TopicsCreate' }).locator('svg').nth(1).click();
  
 })