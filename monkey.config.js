let name = "Good Monkey";
let version = "0.0.1";
let description = "This is a good monkey";

const header = {
    name: name,
    version: version,
    description: description,
    author: "SettingDust",
    include: [
        "http*://tampermonkey.net/*"
    ],
    require: [
        "https://cdn.bootcss.com/jquery/3.3.1/jquery.js"
    ],
    grant: [ //https://tampermonkey.net/documentation.php#GM_addStyle
        "GM_addStyle", //GM_addStyle(require('file'))
    ]
};
module.exports = header;