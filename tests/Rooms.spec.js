import  {test, expect} from '@playwright/test'
import { LoginPage } from '../pages/login'
import { HomePage } from '../pages/home'
import { RoomsPage } from '../pages/rooms'

let Login
let Home
let Rooms
let x
test.beforeEach(async({page})=>{

 // const context = await browser.newContext({
 //   storageState: "./auth.json"
 // })
 // const page = await context.newPage()
  Login = new LoginPage(page);
  Home = new HomePage(page);
  Rooms = new RoomsPage(page);
  await Login.gotoLoginPage();
  await Login.waitforLoginPage();
  await Login.login('amlank@geekyants.com','Amlan@420');
  await Login.waitforHomePage();
  await expect(page).toHaveURL('https://acmebank.dev.zingly.ai/#/admin/home'); //verify HomePage url
 })

 test('Room_elements', async({page})=>{
    await page.getByRole('link', { name: 'rooms' }).getByRole('button').click();
    await expect(page.getByText('Select a room...')).toBeVisible();

    await page.getByRole('banner').getByRole('button').nth(1).click(); // Room refresh
  
    await page.getByRole('banner').getByRole('button').nth(2).click(); // Notif bell on
    await page.getByRole('banner').getByRole('button').nth(2).click(); // Notif bell off

    await page.getByRole('banner').getByRole('button').nth(3).click(); // Filter newest/oldest on top
    await page.getByText('Oldest on top').click();
    await page.getByRole('banner').getByRole('button').nth(3).click();
    await expect(page.getByRole('listitem').nth(0)).toBeVisible();
    await page.getByRole('listitem').nth(0).click();
    
    await page.getByRole('banner').getByRole('button').nth(3).click();
    await page.getByText('Newest on top').click();
    await page.getByRole('banner').getByRole('button').nth(3).click();
    await expect(page.getByRole('listitem').nth(0)).toBeVisible();
    await page.getByRole('listitem').nth(0).click();

    await expect(page.getByText('Acme Bank 3')).toBeVisible();
    await expect(page.getByRole('contentinfo').first()).toBeVisible();
    await expect(page.getByPlaceholder('Send a message...')).toBeVisible();
    await expect(page.getByText('Enriched datapowered by Clearbit')).toBeVisible();
 })

 test('My Topics_filters', async({page})=>{
    await page.getByRole('link', { name: 'rooms' }).getByRole('button').click();
    await expect(page.getByText('Select a room...')).toBeVisible();
  
    await Rooms.ClickTopicsMenu(); // My topics dropdown button(Need to replace it with proper locators not dynamic ones)
    await expect(page.getByText('My topics', { exact: true })).toBeVisible();
    await expect(page.getByText('All my topics')).toBeVisible(); 
    
    await page.getByText('All my topics').click();
    await page.getByRole('listitem').nth(0).click();
    await expect(page.locator('.sc-pVTFL').first()).not.toHaveText('Closed'); //Verify the first element in the list has an open room

    await Rooms.ClickTopicsMenu();
    await page.getByRole('button', { name: 'Closed' }).click();
    await page.locator('div').filter({ hasText: 'Select a room...You\'ve got people to meet and relationships to build.' }).nth(1).click();
    await page.getByRole('listitem').nth(0).click();
    await expect(page.locator('.sc-pVTFL').first()).toHaveText('Closed'); //Verify the first element in the list has an open room

    await Rooms.ClickTopicsMenu();
    await page.getByRole('button', { name: 'Open' }).click();
  
    await page.getByText('Follow up').click(); //FollowUp
    await page.getByText('Select a room...You\'ve got people to meet and relationships to build.').click();
    await page.getByRole('listitem').nth(0).click();
    await expect(page.locator('.sc-aaqME').first()).toHaveText('follow up')

    await Rooms.ClickTopicsMenu();
    await page.getByText('Follow up', { exact: true }).click();
    await page.getByText('Guest', { exact: true }).click(); //Guest
    await page.getByText('Select a room...You\'ve got people to meet and relationships to build.').click();
    await page.getByRole('listitem').nth(0).click();
    await expect(page.getByRole('button', { name: 'Add contact info' })).toBeVisible();

    await Rooms.ClickTopicsMenu();
    await page.getByText('Guest', { exact: true }).click();
    await page.getByText('Known').click(); //Known
    await page.getByText('Select a room...You\'ve got people to meet and relationships to build.').click();
    await page.getByRole('listitem').nth(0).click();
    await expect(page.getByRole('button', { name: 'Add contact info' })).not.toBeVisible();

    await Rooms.ClickTopicsMenu();
    await page.getByText('Known').click();
    await page.getByText('Room invite').click(); //Room Invite
    await page.getByText('Select a room...You\'ve got people to meet and relationships to build.').click();
    await page.getByRole('listitem').nth(0).click();
    await expect(page.getByRole('button', { name: 'Add contact info' })).not.toBeVisible();
    
    await Rooms.ClickTopicsMenu();
    await page.getByText('Known').click(); // RoomInvite and Known
    await page.getByText('Select a room...You\'ve got people to meet and relationships to build.').click();
    await page.getByRole('listitem').nth(0).click();
    await expect(page.getByRole('button', { name: 'Add contact info' })).not.toBeVisible();

    await Rooms.ClickTopicsMenu();
    await page.getByText('Known').click();
    await page.getByText('Guest').click(); //RoomInvite and Guest
    await page.getByText('Select a room...You\'ve got people to meet and relationships to build.').click();
    await expect(page.getByRole('listitem').nth(0)).not.toBeVisible();
    await expect(page.getByText('You\'ve done it!')).toBeVisible();
    await expect(page.getByText('Take a deep breath and enjoy the moment.')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Clear filters' })).toBeVisible();
    await page.getByRole('button', { name: 'Clear filters' }).click();
    await expect(page.getByRole('listitem').nth(0)).toBeVisible();

    await Rooms.ClickTopicsMenu();
    await page.getByText('Room invite').click();
    await page.getByText('Follow up', { exact: true }).click(); //RoomInvite and FollowUp
    await page.getByText('Select a room...You\'ve got people to meet and relationships to build.').click();
    await page.getByRole('listitem').nth(0).click();
    await expect(page.locator('.sc-aaqME').first()).toHaveText('follow up')

    await Rooms.ClickTopicsMenu();
    await page.getByText('Room invite').click();
    await page.getByText('Guest', { exact: true }).click(); //FollowUp and Guest
    await page.getByText('Select a room...You\'ve got people to meet and relationships to build.').click();
    await page.getByRole('listitem').nth(0).click();
    await expect(page.locator('.sc-aaqME').first()).toHaveText('follow up')
    await expect(page.getByRole('button', { name: 'Add contact info' })).toBeVisible();

    await Rooms.ClickTopicsMenu();
    await page.getByText('Guest', { exact: true }).click();
    await page.getByText('Known').click(); //FollowUp and Known
    await page.getByText('Select a room...You\'ve got people to meet and relationships to build.').click();
    await page.getByRole('listitem').nth(0).click();
    await expect(page.locator('.sc-aaqME').first()).toHaveText('follow up')
    await expect(page.getByRole('button', { name: 'Add contact info' })).not.toBeVisible();

    await Rooms.ClickTopicsMenu();
    await page.getByText('Follow up', { exact: true }).click();
    await page.getByText('Guest', { exact: true }).click(); //Guest and Known
    await page.getByText('Select a room...You\'ve got people to meet and relationships to build.').click();
    await expect(page.getByText('You\'ve done it!')).not.toBeVisible();
    await expect(page.getByText('Take a deep breath and enjoy the moment.')).not.toBeVisible();
    await expect(page.getByRole('button', { name: 'Clear filters' })).not.toBeVisible();

    await Rooms.ClickTopicsMenu();
    await page.getByText('Room invite').click(); // Guest, Known and Room Invite
    await page.getByText('Select a room...You\'ve got people to meet and relationships to build.').click();
    await expect(page.getByText('You\'ve done it!')).not.toBeVisible();
    await expect(page.getByText('Take a deep breath and enjoy the moment.')).not.toBeVisible();
    await expect(page.getByRole('button', { name: 'Clear filters' })).not.toBeVisible();
    
    await Rooms.ClickTopicsMenu();
    await page.getByText('Room invite').click(); //Followup, Guest and Known
    await page.locator('label').filter({ hasText: 'Follow up' }).click();
    await page.getByText('Select a room...You\'ve got people to meet and relationships to build.').click();
    await page.getByRole('listitem').nth(0).click();
    await expect(page.locator('.sc-aaqME').first()).toHaveText('follow up')

    await Rooms.ClickTopicsMenu();
    await page.getByText('Known').click();
    await page.getByText('Room invite').click(); //FollowUp, Guest and Room invite
    await page.getByText('Select a room...You\'ve got people to meet and relationships to build.').click();
    await expect(page.getByRole('listitem').nth(0)).not.toBeVisible();
    await expect(page.getByText('You\'ve done it!')).toBeVisible();
    await expect(page.getByText('Take a deep breath and enjoy the moment.')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Clear filters' })).toBeVisible();
    await page.getByRole('button', { name: 'Clear filters' }).click();
    await expect(page.getByRole('listitem').nth(0)).toBeVisible();
    
    await Rooms.ClickTopicsMenu();
    await page.getByText('Follow up').click();
    await page.getByText('Known').click();
    await page.getByText('Room invite').click(); //FollowUp, Known and Room invite
    await page.getByText('Select a room...You\'ve got people to meet and relationships to build.').click();
    await page.getByRole('listitem').nth(0).click();
    await expect(page.locator('.sc-aaqME').first()).toHaveText('follow up')
    await expect(page.getByRole('button', { name: 'Add contact info' })).not.toBeVisible();

    await Rooms.ClickTopicsMenu();
    await page.getByText('Guest').click(); //FollowUp, Guest, Known and Room invite
    await page.getByText('Select a room...You\'ve got people to meet and relationships to build.').click();
    await page.getByRole('listitem').nth(0).click();
    await expect(page.locator('.sc-aaqME').first()).toHaveText('follow up')
    await expect(page.getByRole('button', { name: 'Add contact info' })).not.toBeVisible();

    await Rooms.ClickTopicsMenu();
    await page.getByRole('button', { name: 'Clear' }).click(); // Clear room tags
    await expect(page.getByRole('button', { name: 'Clear' })).not.toBeVisible();
    
 })
 test('My Topics_filters_warmhotcold', async({page})=>{
   await page.getByRole('link', { name: 'rooms' }).getByRole('button').click();
   await expect(page.getByText('Select a room...')).toBeVisible();
  
   await Rooms.ClickTopicsMenu();
   await page.getByText('Hot').click(); // Hot
   await page.getByText('Select a room...You\'ve got people to meet and relationships to build.').click();
   await page.getByRole('listitem').nth(0).click();
   await expect(page.getByText('hot')).toBeVisible();

   await Rooms.ClickTopicsMenu();
   await page.getByText('Hot', { exact: true }).click();
   await page.getByText('Warm').click(); //Warm
   await page.getByText('Select a room...You\'ve got people to meet and relationships to build.').click();
   await page.getByRole('listitem').nth(0).click();
   await expect(page.getByText('warm')).toBeVisible();

   await Rooms.ClickTopicsMenu();
   await page.getByText('Warm', { exact: true }).click();
   await page.getByText('Cold').click(); //Cold
   await page.getByText('Select a room...You\'ve got people to meet and relationships to build.').click();
   await page.getByRole('listitem').nth(0).click();
   await expect(page.getByText('cold')).toBeVisible();

   await Rooms.ClickTopicsMenu();
   await page.getByText('Warm').click(); //Cold and Warm
   await page.getByText('Select a room...You\'ve got people to meet and relationships to build.').click();
   let a = page.getByText('w').first();
   await a.scrollIntoViewIfNeeded();
   await expect(page.getByText('w').first()).toBeVisible();
   await page.getByRole('listitem').nth(0).click();
   await expect(page.getByText('cold')).toBeVisible();

   await page.pause();
 })