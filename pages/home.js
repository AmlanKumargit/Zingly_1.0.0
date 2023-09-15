exports.HomePage = class HomePage{

    constructor(page){
        this.page = page;
        this.rooms_tab = page.getByRole('link', { name: 'rooms' })
        this.insights_tab = page.getByRole('link', { name: 'stats' })
        this.topics_tab = page.getByRole('link', { name: 'topics' })
        this.settings_tab = page.getByRole('link', { name: '/admin/settings/brand' })
        this.profile_image = page.getByRole('img')
        this.profile_button = page.getByText('Profile')
        this.brand_edit_button = page.getByRole('button', { name: 'Edit' })
        this.create_topic_button = page.getByRole('button', { name: 'Create topic' })
       }
       async gotoRoomsTab(){
        await this.rooms_tab.click();
       }
       async gotoInsightsTab(){
        await this.insights_tab.click();
       }
       async gotoTopicsTab(){
        await this.topics_tab.click();
       }
       async gotoSettingsTab(){
        await this.settings_tab.click();
       }
       async myProfilebutton(){
        await this.profile_image.nth(1).click();
       }
       async gotoProfileTab(){
        await this.profile_button.click();
       }
       async hoverPresenceStatus(){
        await this.page.locator('.sc-kQoPux > svg').hover();
       }
       async changePresenceStatus(){
        await this.page.locator('.sc-kQoPux > svg').click();
       }
       async EditBrandbutton(){
        await this.brand_edit_button.click();
       }
       async CreateTopicbutton(){
        await this.create_topic_button.click();
       }

}