const commands = require('./commands')

const isDirectMessage = function isDirectMessage (msg) {
  // slack direct messages channel id start with D
  return msg.type === 'message' && msg.channel.charAt(0) === 'D'
}

const isBotMessage = function isBotMessage (msg) {
  return msg.subtype && msg.subtype === 'bot_message'
}

const isMessage = function isMessage (msg) {
  return msg.type === 'message'
}

// for now all commands execute the same operation
const isBotCommand = function isBotCommand (msg) {
  return showAllPPs(msg);
}

const isBotSpecificCommand = function isBotSpecificCommand (msg) {
  const parameters: Array<String> = msg.text.split(" ");
  if (parameters.length <= 1) { return false }
  return showSpecificPrs(parameters[0]);
}

const showAllPPs = (msg) => commands.all.some((command) => msg.text === command)
const showSpecificPrs = (msg) => commands.specific.some((command) => msg === command)

module.exports = { isDirectMessage, isBotMessage, isMessage, isBotCommand }
