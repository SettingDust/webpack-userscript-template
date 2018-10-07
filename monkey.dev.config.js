const monkey = require("./monkey.config");

//The test path.
monkey.require.push(__dirname + "\\test\\" + monkey.name.toLowerCase().replace(" ", "-") + ".js");

module.exports = monkey;