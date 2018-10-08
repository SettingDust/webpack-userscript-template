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
module.exports.header = header;
module.exports.buildedHeader = () => {
    let headerString = [];
    headerString.push("// ==UserScript==");
    for (let headerKey in header) {
        if (Array.isArray(header[headerKey])) {
            for (let p in header[headerKey]) {
                headerString.push("// @" + headerKey.padEnd(13) + header[headerKey][p]);
            }
            if (header[headerKey].length !== 0)
                headerString.push("//");
        } else {
            headerString.push("// @" + headerKey.padEnd(13) + header[headerKey]);
        }
    }
    headerString[headerString.length - 1] = "// ==/UserScript==";
    headerString.push("");
    return headerString.join("\n");
};