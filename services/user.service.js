var User = require('../models/user.model')

const isUserExist = async query => {
    try {
        var user = await User.findOne(query);
        if(user)
            return { answer: true, user: user};
        else
            return { answer: false, user: null};
    } catch (err) {
        throw Error('Error while Paginating Users')
    }
}

module.exports = { isUserExist }