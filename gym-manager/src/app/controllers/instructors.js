const { age, date, degree } = require('../../lib/utils')
const Intl = require('intl')
const Instructor = require('../models/Instructor')

module.exports = {
    index(req, res) {

        Instructor.all(function (instructors) {
            const _temp = []

            for (const instructor of instructors) {
                _temp.push({
                    ...instructor,
                    services: instructor.services.split(',')
                })
            }

            instructors = _temp

            return res.render('instructors/index', { instructors })
        })
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

        const {
            avatar_url,
            name,
            birth,
            gender,
            degree,
            services
        } = req.body

        const data = [
            avatar_url,
            name,
            birth,
            gender,
            degree,
            services,
            created_at = date(Date.now()).iso
        ]

        Instructor.create(data, function (instructor) {
            return res.redirect(`/instructors/${instructor.id}`)
        })
    },
    show(req, res) {
        const { id } = req.params

        Instructor.find(id, function (instructor) {
            instructor = {
                ...instructor,
                age: age(instructor.birth),
                degree: degree(instructor.degree),
                services: instructor.services.split(','),
                created_at: date(instructor.created_at).format
            }
            return res.render('instructors/show', { instructor })
        })
    },
    edit(req, res) {
        const { id } = req.params

        Instructor.find(id, function (instructor) {
            instructor = {
                ...instructor,
                birth: date(instructor.birth).iso
            }

            return res.render('instructors/edit', { instructor })
        })
    },
    put(req, res) {
        const keys = Object.keys(req.body)

        for (const key of keys) {
            if (req.body[key] === "")
                return res.send('Por favor, preencha todos os campos!')
        }

        const {
            avatar_url,
            name,
            birth,
            gender,
            degree,
            services,
            id
        } = req.body

        const data = [
            avatar_url,
            name,
            birth,
            gender,
            degree,
            services,
            id
        ]

        Instructor.update(data, function () {
            return res.redirect(`/instructors/${id}`)
        })
    },
    delete(req, res) {
        const { id } = req.body

        Instructor.delete(id, function () {
            return res.redirect('/instructors')
        })
    }
}