const User = require("@db/users.schema")

module.exports = {
    path: '/users/:userId',
    method: 'delete',
    handler: async (req, res) => {
        const { userId: _id } = req.params
        await User.deleteOne({ _id })
        return res.json({ success: true })
    }
}