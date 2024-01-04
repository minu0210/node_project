const _ = require('lodash')
const User = require("@db/users.schema")
const encryptPassword = require("@lib/encryptPassword")
const checkDuplicatedId = require('@lib/checkDuplicatedId')

module.exports = {
    path: '/users/:userId',
    method: 'patch',
    handler: async (req, res) => {
        const { userId: _id } = req.params
        
        // for (let i = 0; i < users.length; i++) {
        //     if (users[i].id === userId) {
        //         if (req.body.name !== undefined) {
        //             users[i].name = req.body.name
        //         }
        //     }
        // }
    
        // for (let i = 0; i < users.length; i++) {
        //     if (users[i].id === userId) {   
        //         const newUser = _.pick(req.body, ['name', 'age', 'gender', 'phoneNumber'])
        //         Object.assign(users[i], newUser)
        //     }
        // }
    
        // const userIndex = users.findIndex((user) => {
        //     return user.idx === userId
        // })

        const newUser = _.pick(req.body, ['id', 'password', 'name', 'age'])
    
        if (req.id !== undefined && await checkDuplicatedId(req.body.id)) {
            throw new Error('400:아이디가 중복됩니다.')
        }

        if (newUser.password) {
            newUser.password = encryptPassword(newUser.password)
        }
    
        await User.updateOne({ _id }, { $set: newUser })
    
        return res.json({ success: true })
    }
}