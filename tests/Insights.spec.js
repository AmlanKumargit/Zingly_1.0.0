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

 test('Insights tab_Topics', async({page})=>{
 Home.gotoInsightsTab();
 await expect(page).toHaveURL('https://acmebank.dev.zingly.ai/#/admin/stats');

 await expect(page.getByText('Insights').nth(3)).toBeVisible();
 await expect(page.getByRole('button', { name: 'Topics' })).toBeVisible();
 await expect(page.getByRole('button', { name: 'Reps' })).toBeVisible();
 await expect(page.getByRole('button', { name: 'Rooms' })).toBeVisible();
 await expect(page.getByRole('button', { name: 'Visitors' })).toBeVisible();

 // Topics tab
 if(await page.getByText('In queue: Most').isVisible())
{  
  await page.getByText('In queue: Most').click();
  await page.getByText('Least on top').click();
}
 else
{
  await page.getByText('In queue: Least').click();
  await page.getByText('Most on top').click();    
}
await page.getByText('Status All', { exact: true }).click();
await page.getByRole('button', { name: 'Clear selected items' }).click();
await page.locator('#dropdowns').getByText('Published', { exact: true }).click();


if(await page.getByText('Type All').nth(1).isVisible())
{
    await page.getByText('Type All').nth(1).click();
    await page.getByRole('listitem').filter({ hasText: 'Regular' }).click();

    await page.getByText('Type Regular').click();
    await page.getByRole('listitem').filter({ hasText: 'Invite only' }).click();

}
else if(await page.getByText('Type Invite only').isVisible())
{
    await page.getByText('Type Invite only').click();
    await page.getByRole('listitem').filter({ hasText: 'All' }).click();

    await page.getByText('Type All').nth(1).click();
    await page.getByRole('listitem').filter({ hasText: 'Regular' }).click();

}
else
{
    await page.getByText('Type Regular').click();
    await page.getByRole('listitem').filter({ hasText: 'All' }).click();

    await page.getByText('Type All').nth(1).click();
    await page.getByRole('listitem').filter({ hasText: 'Invite only' }).click();

}

  await page.getByText('Status Published', { exact: true }).click();
  await page.locator('#dropdowns').getByText('Published', { exact: true }).click();
  await page.locator('#dropdowns').getByText('Unpublished', { exact: true }).click();

  if(await page.getByText('Type All').nth(1).isVisible())
{
    await page.getByText('Type All').nth(1).click();
    await page.getByRole('listitem').filter({ hasText: 'Regular' }).click();

    await page.getByText('Type Regular').click();
    await page.getByRole('listitem').filter({ hasText: 'Invite only' }).click();

}
else if(await page.getByText('Type Invite only').isVisible())
{
    await page.getByText('Type Invite only').click();
    await page.getByRole('listitem').filter({ hasText: 'All' }).click();

    await page.getByText('Type All').nth(1).click();
    await page.getByRole('listitem').filter({ hasText: 'Regular' }).click();

}
else
{
    await page.getByText('Type Regular').click();
    await page.getByRole('listitem').filter({ hasText: 'All' }).click();

    await page.getByText('Type All').nth(1).click();
    await page.getByRole('listitem').filter({ hasText: 'Invite only' }).click();

}

  await page.getByText('Status Unpublished', { exact: true }).click();
  await page.locator('#dropdowns').getByText('Published', { exact: true }).click();

  if(await page.getByText('Type All').nth(1).isVisible())
{
    await page.getByText('Type All').nth(1).click();
    await page.getByRole('listitem').filter({ hasText: 'Regular' }).click();

    await page.getByText('Type Regular').click();
    await page.getByRole('listitem').filter({ hasText: 'Invite only' }).click();

}
else if(await page.getByText('Type Invite only').isVisible())
{
    await page.getByText('Type Invite only').click();
    await page.getByRole('listitem').filter({ hasText: 'All' }).click();

    await page.getByText('Type All').nth(1).click();
    await page.getByRole('listitem').filter({ hasText: 'Regular' }).click();

}
else
{
    await page.getByText('Type Regular').click();
    await page.getByRole('listitem').filter({ hasText: 'All' }).click();

    await page.getByText('Type All').nth(1).click();
    await page.getByRole('listitem').filter({ hasText: 'Invite only' }).click();

}

})

//Reps tab
 test('Insights tab_Reps', async({page})=>{
    Home.gotoInsightsTab();
    await expect(page).toHaveURL('https://acmebank.dev.zingly.ai/#/admin/stats');
    await page.getByRole('button', { name: 'Reps' }).click();

    //For all topics
    await page.getByText('Rep status All').click();
    await page.getByRole('button', { name: 'Clear selected items' }).click();

    await page.locator('#dropdowns').getByText('Online').click();
    await page.locator('#dropdowns').getByText('Online').click();
    await page.locator('#dropdowns').getByText('Offline').click();
    await page.locator('#dropdowns').getByText('Offline').click();
    await page.locator('#dropdowns').getByText('Away').click();

    await page.locator('#dropdowns').getByText('Away').click();
    await page.getByText('Meeting').click();
    await page.locator('#dropdowns').getByText('Meeting').click();

    await page.getByText('Rep status All').click();
    await page.getByText('Topic All').first().click();
    await page.getByRole('textbox').click();
    await page.getByRole('textbox').fill('10th');
    await page.locator('#dropdowns').getByText('10th Apr (10th Apr edit)').click();

    //For a particular topic
    await page.getByText('Rep status All').click();
    await page.locator('#dropdowns').getByText('Online').click();
    await page.locator('#dropdowns').getByText('Online').click();
    await page.locator('#dropdowns').getByText('Offline').click();
    await page.locator('#dropdowns').getByText('Offline').click();
    await page.getByText('Away').click();
    await page.locator('#dropdowns').getByText('Away').click();
    await page.getByText('Meeting').click();
    await page.locator('#dropdowns').getByText('Meeting').click();

    await page.locator('#dropdowns').getByText('Online').click();
    await page.getByText('Offline', { exact: true }).click();
    await page.locator('#dropdowns').getByText('Offline').click();
    await page.getByText('Away').click();
    await page.getByText('Away', { exact: true }).click();
    await page.getByText('Meeting').click();
    await page.locator('#dropdowns').getByText('Online').click();
    await page.getByText('Offline', { exact: true }).click();
    await page.locator('#dropdowns').getByText('Offline').click();
    await page.getByText('Away').click();
    await page.getByRole('button', { name: 'Clear selected items' }).click();
    await page.locator('#dropdowns').getByText('Online').click();
    await page.getByRole('listitem').filter({ hasText: 'Offline' }).click();
    await page.getByText('Away').click();
    await page.locator('#dropdowns').getByText('Offline').click();
    await page.getByText('Meeting').click();
    await page.locator('#dropdowns').getByText('Online').click();
    await page.getByText('Offline', { exact: true }).click();
    await page.getByText('Online', { exact: true }).click();
    await page.getByRole('button', { name: 'Clear selected items' }).click();
    await page.getByText('Rep status All').click();

 })

//Rooms tab
 test('Insights tab_Rooms', async({page})=>{
    Home.gotoInsightsTab();
    await expect(page).toHaveURL('https://acmebank.dev.zingly.ai/#/admin/stats');

    await page.getByRole('button', { name: 'Rooms' }).click();
    if(await page.getByText('Sort by Oldest').isVisible())
    {
        await page.getByText('Sort by Oldest').click();
        await page.getByText('Newest').click();
    }
    else
    {
        await page.getByText('Sort by Newest').click();
        await page.getByText('Oldest').click();
    }

    await page.getByText('Condition All').click();
    await page.getByRole('button', { name: 'Clear selected items' }).click();
    await page.locator('#dropdowns').getByText('Open').click();
    await page.getByText('In queue', { exact: true }).click();
    await page.getByText('Closed', { exact: true }).click();
    await page.getByText('In queue', { exact: true }).click();
    await page.locator('#dropdowns').getByText('Open').click();
    await page.locator('#dropdowns').getByText('Closed').click();
    await page.getByText('In queue', { exact: true }).click();
    await page.getByRole('button', { name: 'Clear selected items' }).click();
    
    await page.getByText('Time range Today').click();
    await page.getByRole('listitem').filter({ hasText: 'All time' }).click();
    await page.getByText('Type All').first().click();
    await page.getByRole('listitem').filter({ hasText: 'Customer created' }).click();
    await page.getByText('Type Customer created').click();
    await page.getByRole('listitem').filter({ hasText: 'Room invite' }).click();
    await page.getByText('Type Room invite').click();
    await page.getByRole('listitem').filter({ hasText: 'All' }).click();
    
    await page.getByText('Contact All').click();
    await page.getByPlaceholder('Enter name...').click();
    await page.getByPlaceholder('Enter name...').fill('amlan');
    await page.getByPlaceholder('Enter name...').press('Enter');
    await page.getByText('Amlan A').click();

    await page.getByText('Condition All').click();
    await page.getByRole('button', { name: 'Clear selected items' }).click();
    await page.locator('#dropdowns').getByText('Open').click();
    await page.getByText('In queue', { exact: true }).click();
    await page.getByText('Closed', { exact: true }).click();
    await page.getByText('In queue', { exact: true }).click();
    await page.locator('#dropdowns').getByText('Open').click();
    await page.locator('#dropdowns').getByText('Closed').click();
    await page.getByText('In queue', { exact: true }).click();
    await page.getByRole('button', { name: 'Clear selected items' }).click();

    await page.getByText('Type All').first().click();
    await page.getByRole('listitem').filter({ hasText: 'Customer created' }).click();
    await page.getByText('Type Customer created').click();
    await page.getByRole('listitem').filter({ hasText: 'Room invite' }).click();
    await page.getByText('Type Room invite').click();
    await page.getByRole('listitem').filter({ hasText: 'All' }).click();

    if(await page.getByText('Sort by Oldest').isVisible())
    {
        await page.getByText('Sort by Oldest').click();
        await page.getByText('Newest').click();
    }
    else
    {
        await page.getByText('Sort by Newest').click();
        await page.getByText('Oldest').click();
    }

 })

 //Visitors tab
 test('Insights tab_Visitors', async({page})=>{
    Home.gotoInsightsTab();
    await expect(page).toHaveURL('https://acmebank.dev.zingly.ai/#/admin/stats');

    await page.getByRole('button', { name: 'Visitors' }).click();
    await page.getByText('Time range Last 7 days').click();
    await page.getByText('TODO_METRICS').click();

 })

