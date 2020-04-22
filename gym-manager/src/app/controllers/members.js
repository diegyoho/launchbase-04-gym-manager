const { blood, date } = require('../../lib/utils')
const Member = require('../models/Member')
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

        Member.paginate(params, function (members) {
            const pagination = {
                totalPages: Math.ceil(members[0].total / limit),
                page
            }

            return res.render('members/index', { members, filter, pagination })
        })
    },
    create(req, res) {
        Instructor.all(function (instructors) {
            return res.render('members/create', { instructors })
        })
    },
    post(req, res) {
        const keys = Object.keys(req.body)

        for (const key of keys) {
            if (req.body[key] === "")
                return res.send('Please, fill all fields')
        }

        const {
            avatar_url,
            name,
            email,
            birth,
            gender,
            blood,
            height,
            weight,
            instructor,
        } = req.body

        const data = [
            avatar_url,
            name,
            email,
            date(birth).iso,
            gender,
            blood,
            height,
            weight,
            instructor
        ]

        Member.create(data, function (member) {
            return res.redirect(`/members/${member.id}`)
        })
    },
    show(req, res) {
        const { id } = req.params

        Member.find(id, function (member) {
            if (!member) return res.send('Member not found!')

            member = {
                ...member,
                birth: date(member.birth).birthDay,
                blood: blood(member.blood)
            }
            return res.render('members/show', { member })
        })
    },
    edit(req, res) {
        const { id } = req.params

        Member.find(id, function (member) {
            if (!member) return res.send('Member not found!')

            member = {
                ...member,
                birth: date(member.birth).iso
            }

            Instructor.all(function (instructors) {
                return res.render('members/edit', { member, instructors })
            })

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
            email,
            birth,
            gender,
            blood,
            height,
            weight,
            instructor,
            id
        } = req.body

        const data = [
            avatar_url,
            name,
            email,
            date(birth).iso,
            gender,
            blood,
            height,
            weight,
            instructor,
            id
        ]

        Member.update(data, function () {
            return res.redirect(`/members/${id}`)
        })
    },
    delete(req, res) {
        const { id } = req.body

        Member.delete(id, function () {
            return res.redirect('/members')
        })
    }
}