const URL = require('../url')

function handleGetURL(req, res) {
    let { url } = req.params
    let shortURL = new URL(url)
    shortURL.searchAndRedirect(res)
}

module.exports = handleGetURL
