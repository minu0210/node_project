const User = require("@db/users.schema")

module.exports = {
    path: '/users',
    method: 'get',
    handler: async (req, res) => {
        const users = await User.find()    
        return res.json(users)
    }
}