const rules = {
    "email": "required|email|exist:User,email",
    "username": "required|string|min:4|exist:User,username",
    "firstname": "required|string",
    "lastname": "required|string",
    "country": "required|string",
    "password": "required|string|min:6|confirmed|strict",
    "gender": "required|string"
}

module.exports = rules;