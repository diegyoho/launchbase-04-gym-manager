const { age, date, degree } = require('../../lib/utils')
const Instructor = require('../models/Instructor')

module.exports = {
    index(req, res) {
        let { filter, page, limit } = req.query

        page = page || 1
        limit = limit || 2

        let offset = limit * (page - 1)

        const params = {
            filter,
            limit,
            offset
        }

        Instructor.paginate(params, function (instructors) {
            const _temp = []

            for (const instructor of instructors) {
                _temp.push({
                    ...instructor,
                    services: instructor.services.split(',')
                })
            }

            instructors = _temp

            const pagination = {
                totalPages: Math.ceil(instructors[0].total / limit),
                page
            }

            return res.render('instructors/index', { instructors, filter, pagination })
        })
    },
    create(req, res) {
        return res.render('instructors/create')
    },
    post(req, res) {
        const keys = Object.keys(req.body)

        for (const key of keys) {
            if (req.body[key] === "")
                return res.send('Please, fill all fields!')
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
            date(birth).iso,
            gender,
            degree,
            services,
            date(Date.now()).iso
        ]

        Instructor.create(data, function (instructor) {
            return res.redirect(`/instructors/${instructor.id}`)
        })
    },
    show(req, res) {
        const { id } = req.params

        Instructor.find(id, function (instructor) {
            if (!instructor) return res.send('Instructor not found!')

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
            if (!instructor) return res.send('Instructor not found!')

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
                return res.send('Please, fill all fields')
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
            date(birth).iso,
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