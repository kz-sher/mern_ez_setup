const ForgotPwdRules = ( _ ) => {

    const title = "Forgot Password" 
    const rules = {
        "email": "required|email|exist:User,email",
    }
    return { title, rules }
}


module.exports = ForgotPwdRules;