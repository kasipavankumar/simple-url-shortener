class URL {
    constructor(url) {
        this.url = url
        this.db = require('./db')
        this.urlSchema = require('./models/urls.model')
    }

    /**
     * Writes the URL to database.
     * @param {any} res
     */
    save(res) {
        this.urlSchema
            .estimatedDocumentCount()
            .then((count) => {
                return new this.urlSchema({
                    original_url: this.url,
                    short_url: count + 1,
                })
            })
            .then((_tempUrl) => {
                _tempUrl
                    .save()
                    .then(() => {
                        res.json({
                            original_url: _tempUrl.original_url,
                            short_url: _tempUrl.short_url,
                        })

                        console.log('Successfully saved the document!')
                    })
                    .catch((err) =>
                        console.error(
                            'There was an error while saving the document.'
                        )
                    )
            })
            .catch(console.error)
    }

    /**
     * Search DB for the short URL & redirect.
     * @param {any} res
     */
    searchAndRedirect(res) {
        this.urlSchema
            .findOne({ short_url: this.url })
            .select('original_url')
            .then((doc) => {
                res.redirect(doc.original_url)
            })
            .catch((err) => {
                res.json({ error: 'No such URL!' })
            })
    }
}

module.exports = URL
