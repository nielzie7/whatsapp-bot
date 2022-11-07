const chalk = require('chalk')
const color = (text, color) => { return !color ? chalk.cyan(text) : chalk.keyword(color)(text) }
const bgcolor = (text, bgcolor) => { return !bgcolor ? chalk.green(text) : chalk.bgKeyword(bgcolor)(text) }
const customlog = (text, color) => { return !color ? chalk.cyan('[ BOT ] ') + chalk.greenBright(text) : chalk.cyan('[ BOT ] ') + chalk.keyword(color)(text) }
module.exports = { color, bgcolor, customlog }
