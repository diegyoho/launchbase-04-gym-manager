const { blood, date } = require('../../lib/utils')
const Intl = require('intl')

module.exports = {
    index(req, res) {
        return res.render('members/index', { members })
    },
    create(req, res) {
        return res.render('members/create')
    },
    post(req, res) {
        const keys = Object.keys(req.body)

        for (const key of keys) {
            if (req.body[key] === "")
                return res.send('Por favor, preencha todos os campos!')
        }

        const { avatar_url, name, birth, gender, degree, services } = req.body

        return res.redirect('/members')
    },
    show(req, res) {
        return res.render('members/show', { member })
    },
    edit(req, res) {
        return res.render('members/edit', { member })
    },
    put(req, res) {
        const keys = Object.keys(req.body)

        for (const key of keys) {
            if (req.body[key] === "")
                return res.send('Por favor, preencha todos os campos!')
        }

        const { avatar_url, name, birth, gender, degree, services } = req.body
        return res.redirect(`/members/${id}`)
    },
    delete(req, res) {
        return res.redirect('/members')
    }
}