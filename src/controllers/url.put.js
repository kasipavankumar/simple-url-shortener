const validURL = require('valid-url')

const URL = require('../url')

function handleNewURL(req, res) {
    let { url } = req.body

    if (Boolean(validURL.isUri(url))) {
        let newURL = new URL(url)
        newURL.save(res)
    } else {
        res.json({ error: 'invalid URL' })
    }
}

module.exports = handleNewURL
