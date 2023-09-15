exports.RoomsPage = class RoomsPage{
    
    constructor(page){
        this.page = page;
        this.topics_menu = page.locator('.sc-gEOWYS > svg')
    }

    async ClickTopicsMenu()
    {
        await this.topics_menu.click();
    }
}