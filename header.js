class MetadataBlock {
    constructor() {
        this.name = 'Good Monkey'
        this.version = '0.0.1'
        this.description = 'This is a good monkey'
        this.author = 'SettingDust'
        this.include = ['http*://tampermonkey.net/*']
        this.require = ['https://cdn.bootcss.com/jquery/3.3.1/jquery.js']
        this.grant = ['GM_addStyle', 'GM_setValue']
    }
}

module.exports = new MetadataBlock()
