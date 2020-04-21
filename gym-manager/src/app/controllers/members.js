const { blood, date } = require('../../lib/utils')
const Member = require('../models/Member')

module.exports = {
    index(req, res) {

        Member.all(function (members) {
            return res.render('members/index', { members })
        })
    },
    create(req, res) {
        return res.render('members/create')
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
            weight
        } = req.body

        const data = [
            avatar_url,
            name,
            email,
            date(birth).iso,
            gender,
            blood,
            height,
            weight
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

            return res.render('members/edit', { member })
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