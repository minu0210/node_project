const _ = require('lodash')
const { v4: uuidv4 } = require('uuid')
const users = require('../../db/users')
const encryptPassword = require('../../lib/encryptPassword')

module.exports = {
    path: '/signup',
    method: 'post',
    handler: (req, res) => {
        const user = _.pick(
            req.body,
            [
                'id',
                'password', 
                'name', 
                'gender', 
                'age', 
                'phoneNumber'
            ]
        )
        
        function duplicatedUser () {
            return users.find(user => user.id === req.body.id)
        }

        if (duplicatedUser() === undefined){
            users.push(Object.assign(user, { 
                idx: uuidv4(),
                ...(user.password !== undefined && {
                    password: encryptPassword(user.password)
                })
            }))

            return res.json({ success: true })
        }
    
        return res.status(400).json({ success: false })
    }
}