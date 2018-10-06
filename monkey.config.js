const header = {
    name: "Good Monkey",
    version: "0.0.1",
    description: "This is a good monkey",
    include: [
        "http*://tampermonkey.net/*"
    ],
    require: [
        "https://cdn.bootcss.com/jquery/3.3.1/jquery.js"
    ]
};
module.exports = header;