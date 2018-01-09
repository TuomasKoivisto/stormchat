var moment = require('moment');

var generateMessage = (from, text,room) => {
  return {
    from,
    text,
    room,
    createdAt: moment().valueOf()
  };
};

module.exports = { generateMessage };
