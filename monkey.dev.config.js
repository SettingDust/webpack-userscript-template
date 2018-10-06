let name = "Good Monkey";
let version = "0.0.1";
let description = "This is a good monkey";

const header = {
    name: name,
    version: version,
    description: description, //REQUIRED
    author: "SettingDust",
    include: [
        "http*://tampermonkey.net/*"
    ],
    require: [
        __dirname + "/dist/" + name.toLowerCase().replace(" ", "-") + ".js",
        "https://cdn.bootcss.com/jquery/3.3.1/jquery.js"
    ],
    grant: [ //https://tampermonkey.net/documentation.php#GM_addStyle
        "GM_addStyle", //GM_addStyle(require('path/to/css'))
    ]
};
module.exports = header;