const fs = require('fs')
const data = require('../data.json')
const { blood, date } = require('../utils')
const Intl = require('intl')

exports.index = function (req, res) {

    return res.render('members/index', { members: data.members })
}

exports.create = function (req, res) {
    return res.render('members/create')
}

exports.post = function (req, res) {

    const keys = Object.keys(req.body)

    for (const key of keys) {
        if (req.body[key] === "")
            return res.send('Por favor, preencha todos os campos!')
    }

    const { avatar_url, name, email, birth, gender, blood, height, weight } = req.body

    let id = 1;
    if (data.members.length > 0)
        id = data.members[data.members.length - 1].id + 1

    const member = {
        id: Number(id),
        avatar_url,
        name,
        email,
        birth: Date.parse(birth),
        gender,
        blood,
        height,
        weight
    }

    data.members.push(member)

    fs.writeFile('data.json', JSON.stringify(data, null, 2), function (err) {
        if (err) return res.send("Erro na escrita do arquivo!")

        return res.redirect('/members')
    })
}

exports.show = function (req, res) {
    const { id } = req.params

    const foundMember = data.members.find(function (member) {
        return member.id == id
    })

    if (!foundMember) return res.send('Membro não encontrado!')

    const member = {
        ...foundMember,
        birth: date(foundMember.birth).birthDay,
        blood: blood(foundMember.blood)
    }

    return res.render('members/show', { member })
}

exports.edit = function (req, res) {
    const { id } = req.params

    const foundMember = data.members.find(function (member) {
        return member.id == id
    })

    if (!foundMember) return res.send('Membro não encontrado!')

    const member = {
        ...foundMember,
        birth: date(foundMember.birth).iso
    }

    return res.render('members/edit', { member })
}

exports.update = function (req, res) {
    const { id } = req.body
    let index = 0

    const foundMember = data.members.find(function (member, foundIndex) {
        if (member.id == id) {
            index = foundIndex
            return true
        }
    })

    if (!foundMember) return res.send('Membro não encontrado!')

    const member = {
        ...foundMember,
        ...req.body,
        birth: Date.parse(req.body.birth),
        id: Number(req.body.id)
    }

    data.members[index] = member

    fs.writeFile('data.json', JSON.stringify(data, null, 2), function (err) {
        if (err) return res.send("Erro na escrita do arquivo!")

        return res.redirect(`/members/${id}`)
    })
}

exports.delete = function (req, res) {
    const { id } = req.body

    const filteredMembers = data.members.filter(function (member, foundIndex) {
        return member.id != id
    })

    data.members = filteredMembers

    fs.writeFile('data.json', JSON.stringify(data, null, 2), function (err) {
        if (err) return res.send("Erro na escrita do arquivo!")

        return res.redirect('/members')
    })
}