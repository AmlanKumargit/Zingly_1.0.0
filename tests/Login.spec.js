import  {test, expect} from '@playwright/test'
import { LoginPage } from '../pages/login'

let Login
test.beforeEach(async({page})=>{
   Login = new LoginPage(page);
   await Login.gotoLoginPage();
   await Login.waitforLoginPage();
  })

test('Login and Logout', async({page})=>{   
    await Login.login('amlank@geekyants.com','Amlan@420');
    await Login.waitforHomePage();
    await expect(page).toHaveURL('https://acmebank.dev.zingly.ai/#/admin/home'); 
    //await page.pause();
    await Login.myProfile();
    await Login.logout();
  })
  
  test('Login with invalid credentials', async({page})=>{
    await Login.login('amlank@geekyants.com','Amlan@abc');
    await expect(page).toHaveURL('https://acmebank.dev.zingly.ai/#/admin/login?autoTest=true');
    await expect(page.getByText('Incorrect username or password.')).toBeVisible();
  })
  
  test('Login with blank credentials', async({page})=>{
    await Login.login('    ','   ');
    await expect(page).toHaveURL('https://acmebank.dev.zingly.ai/#/admin/login?autoTest=true');
    await expect(page.getByText("2 validation errors detected: Value at 'userAlias' failed to satisfy constraint:")).toBeVisible();
  })
  
  test.afterEach(async({page})=>{
    await page.close();
  })
  