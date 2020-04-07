const { User } = require('../models');

async function addNewUser(req, res, cb){

    // Create user and save to database
    let user = new User(req.body);
    await user.save()
        .then(() => {
            cb(); // do something if successfully added
            return res.status(200).json({ message: "Account created successfully" });
        })
        .catch(err => {
            return res.status(500).json({ message: "Failed to add user" });
        });
}

module.exports = { addNewUser }