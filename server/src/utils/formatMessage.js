const moment = require('moment');

const formatMessage = (name, message) => ({
  name,
  message,
  time: moment().format('h:mm a')
});

module.exports = formatMessage;
