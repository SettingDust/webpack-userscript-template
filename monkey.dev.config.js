const monkey = require("./monkey.config");
const header = monkey.header;

//The test path.
header.require.push(__dirname + "\\test\\" + monkey.header.name.toLowerCase().replace(" ", "-") + ".js");

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