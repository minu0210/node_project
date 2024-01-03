const crypto = require('crypto')

module.exports = function encryptPassword(password) {
  return crypto
      .createHash('sha256')
      .update(password + 'QQ4d$4#()$(&^_$^')
      .digest('base64')
}