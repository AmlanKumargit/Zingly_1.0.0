exports.LoginPage = class LoginPage{

    constructor(page){
     this.page = page;
     this.username_textbox = page.getByPlaceholder('Username')
     this.password_textbox = page.getByPlaceholder('Password')
     this.signin_button = page.getByRole('button', { name: 'Sign in' })
     this.profile_button = page.getByRole('img')
     this.logout_button = page.getByText('Log out')
    }

    async gotoLoginPage(){
     await this.page.goto('https://acmebank.dev.zingly.ai/#/admin/login?autoTest=true');  
    }
    async waitforLoginPage(){
        await this.page.waitForURL('https://acmebank.dev.zingly.ai/#/admin/login?autoTest=true');
    }
    async waitforHomePage(){
     await this.page.waitForURL('https://acmebank.dev.zingly.ai/#/admin/home');
    }
    async myProfile(){
     await this.profile_button.nth(1).click();
    }
    async logout(){
     await this.logout_button.click()
    }
    
    async login(username,password){
     await this.username_textbox.fill(username)
     await this.password_textbox.fill(password)
     await this.signin_button.click()
    }
    
}
