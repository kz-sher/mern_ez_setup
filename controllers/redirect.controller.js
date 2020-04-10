/**
 * Redirect url with parameters into queries using added prefix and postfix
 * e.g. http://localhost:3000/inbox/:boxid/messages/:msgid => http://localhost:3000/inbox/messages?boxid=<boxid>&msgid=<msgid>
 * @param {String} prefix - a directory added between host and original directories
 * @param {String} postfix - a directory added between original directories and parameters
 */
const redirectWithParams = (prefix = '', postfix = '') => (req, res) => {
    var queryList = Object.entries(req.params).map(([key, value], i) => `${key}=${value}`);
    var queryString = '?' + queryList.join('&');

    var removeParamsFromUrl = (main, sub) => (sub.length > 0 && sub[0] != ':') ? (main + '/' + sub) : main
    var orginalUrlWithoutParams = req.route.path.split('/').reduce(removeParamsFromUrl, '') 
    
    var url = `${prefix}${orginalUrlWithoutParams}${postfix}${queryString}`;
    res.redirect(url);
}

/**
 * Redirect to url given
 * @param {String} url - simply an url
 */
const redirect = url => (req, res) => {
    res.redirect(url);
} 

module.exports = { redirectWithParams, redirect }