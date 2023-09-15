 import  {test, expect} from '@playwright/test'
 import { LoginPage } from '../pages/login'
 import { HomePage } from '../pages/home'

let Login
let Home
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

  test('HomePage Landing', async({page})=>{   
    await expect(page.locator('input[type="text"]')).toHaveValue(/Acme Bank 3/);  //verify Brand name

    await Home.gotoRoomsTab(); // Rooms tab
    await expect(page.getByText('Select a room...')).toBeVisible(); // Verify select a room text

    await Home.gotoInsightsTab(); // Insights tab
  
    await expect(page.getByText('Insights').nth(3)).toBeVisible();  // Verify Insights text

    await Home.gotoTopicsTab(); // Topics tab
   
    await expect(page.locator('#PIP-boundary').getByText('Topics')).toBeVisible();  // Verify Topics text

    await Home.gotoSettingsTab(); // Settings/Brand tab
    await expect(page.getByText('Settings').nth(1)).toBeVisible();  // Verify Settings text
    await expect(page.getByText('Brand').nth(1)).toBeVisible();  // Verify Brand text

    await Home.myProfilebutton(); // Profile button
    await Home.gotoProfileTab(); // Profile tab
    await expect(page.getByText('amlank@geekyants.com')).toBeVisible(); // Verify logged in username
    await expect(page.locator('#profile_section').getByText('Profile')).toBeVisible(); // Verify Profile text

    
    // await page.locator('svg').nth(8).click({force: true});
    await page.goBack();
    await Home.hoverPresenceStatus(); 

    if(await page.getByText('Change to away').isVisible())
    {
     await Home.changePresenceStatus(); // Change status 
     await Home.hoverPresenceStatus();
     await expect(page.getByText('Change to available')).toBeVisible(); // Verifying hover text while unavailable
     await Home.changePresenceStatus();
    } 
    else
    {
     await Home.changePresenceStatus(); // Change status 
     await Home.hoverPresenceStatus();
     await expect(page.getByText('Change to away')).toBeVisible(); // Verifying hover text while available
     await Home.changePresenceStatus();
    }
    
  })

  test('Home tab Elements', async({page})=>{   
      await expect(page.getByText('Here is where it begins,')).toBeVisible();
      await expect(page.getByText('building relationships bigger than business.')).toBeVisible();
      await expect(page.locator('input[type="text"]')).toHaveValue(/Acme Bank 3/);  //verify Brand name
    
      await Home.EditBrandbutton();
      await expect(page).toHaveURL('https://acmebank.dev.zingly.ai/#/admin/settings/brand'); //Verify Brand page navigation

      await page.goBack();

      await Home.CreateTopicbutton();
      await expect(page).toHaveURL('https://acmebank.dev.zingly.ai/#/admin/topics'); //Verify Topics page navigation

      await page.goBack();
  })

  test('Rooms tab elements', async({page})=>{
    await Home.gotoRoomsTab(); // Rooms tab
    await expect(page.getByText('Select a room...')).toBeVisible(); // Verify select a room text
    
    await page.locator('.sc-feYDSs > svg').click();
    await page.pause();
    await page.check('input[type=checkbox]:nth(5)').nth(5);
    expect(await page.isChecked('input[type=checkbox]').nth(5)).toBeTruthy()
    
    //await page.locator('div').filter({ hasText: /Hot(70-100)/}).locator('div').click();
   // await page.locator('div').filter({ hasText: 'My topics' }).locator('svg').click();

  
  })

 test('Insights tab elements', async({page})=>{
  await Home.gotoInsightsTab(); // Insights tab

  await expect(page.getByText('Insights').nth(3)).toBeVisible();  // Verify Insights text
  await expect(page.getByRole('button', { name: 'Topics' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Reps' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Rooms' })).toBeVisible();

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

  if(await page.getByText('Status:All').isVisible())
  {
    await page.getByText('Status:All').click();
    await locator('#dropdowns').getByText('Published').click();
    expect(await page.getByText('Status:Published')).isVisible();
    await locator('#dropdowns').getByText('Unpublished').click();
    expect(await page.getByText('Status:Published')).isVisible();
    await locator('#dropdowns').getByText('Published').click();
    expect(await page.getByText('Status:Unpublished')).isVisible();
    // await page.getByRole('button', { name: 'Clear selected items' }).click();
    // expect(await page.getByText('Status:All')).isVisible();
  }
  else 
  if(await page.getByText('Status:Published').isVisible())
  {
    await page.getByText('Status').click();
    await page.getByText('Most on top').click();
  }
})

test.afterEach(async({page})=>{
    await page.close();
  })  


  // test.only('Topics tab elements', async({page})=>{})
  // test.only('Settings tab elements', async({page})=>{})