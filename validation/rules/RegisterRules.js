const RegisterRules = ( _ ) => {

    const title = "Register" 
    const rules = {
        "email": "required|email|exist:User,email",
        "username": "required|string|alpha_num|min:4|exist:User,username",
        "firstname": "required|string|alpha_dash",
        "lastname": "required|string|alpha",
        "country": "required|string",
        "password": "required|string|min:6|confirmed|strict",
        "gender": "required|string"
    }
    return { title, rules }
}


module.exports = RegisterRules;