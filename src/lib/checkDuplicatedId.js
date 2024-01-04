const User = require('@db/users.schema')

module.exports = async function (id) {
    const user = await User.findOne({ id })
    return user !== null
}