const { age, date, degree } = require('../../lib/utils')
const Intl = require('intl')

module.exports = {
    index(req, res) {
        return res.render('instructors/index', { instructors })
    },
    create(req, res) {
        return res.render('instructors/create')
    },
    post(req, res) {
        const keys = Object.keys(req.body)

        for (const key of keys) {
            if (req.body[key] === "")
                return res.send('Por favor, preencha todos os campos!')
        }

        const { avatar_url, name, birth, gender, degree, services } = req.body

        return res.redirect('/instructors')
    },
    show(req, res) {
        return res.render('instructors/show', { instructor })
    },
    edit(req, res) {
        return res.render('instructors/edit', { instructor })
    },
    put(req, res) {
        return res.redirect(`/instructors/${id}`)
    },
    delete(req, res) {
        return res.redirect('/instructors')
    }
}