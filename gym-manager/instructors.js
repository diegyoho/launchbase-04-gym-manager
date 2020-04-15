const fs = require('fs')
const data = require('./data.json')
const { age, date, degree } = require('./utils')
const Intl = require('intl')

exports.show = function (req, res) {
    const { id } = req.params

    const foundInstructor = data.instructors.find(function (instructor) {
        return instructor.id == id
    })

    if (!foundInstructor) return res.send('Instrutor não encontrado!')

    const instructor = {
        ...foundInstructor,
        age: age(foundInstructor.birth),
        degree: degree(foundInstructor.degree),
        services: foundInstructor.services.split(','),
        created_at: new Intl.DateTimeFormat('pt-br').format(foundInstructor.created_at)
    }

    return res.render('instructors/show', { instructor })
}

exports.post = function (req, res) {

    const keys = Object.keys(req.body)

    for (const key of keys) {
        if (req.body[key] === "")
            return res.send('Por favor, preencha todos os campos!')
    }

    const { avatar_url, name, birth, gender, degree, services } = req.body

    data.instructors.push({
        id: Number(data.instructors.length + 1),
        avatar_url,
        name,
        birth: Date.parse(birth),
        gender,
        degree,
        services,
        created_at: Date.now()
    })

    fs.writeFile('data.json', JSON.stringify(data, null, 2), function (err) {
        if (err) return res.send("Erro na escrita do arquivo!")

        return res.redirect('/instructors')
    })
}

exports.edit = function (req, res) {
    const { id } = req.params

    const foundInstructor = data.instructors.find(function (instructor) {
        return instructor.id == id
    })

    if (!foundInstructor) return res.send('Instrutor não encontrado!')

    const instructor = {
        ...foundInstructor,
        birth: date(foundInstructor.birth)
    }

    return res.render('instructors/edit', { instructor })
}

exports.update = function (req, res) {
    const { id } = req.body
    let index = 0

    const foundInstructor = data.instructors.find(function (instructor, foundIndex) {
        if (instructor.id == id) {
            index = foundIndex
            return true
        }
    })

    if (!foundInstructor) return res.send('Instrutor não encontrado!')

    const instructor = {
        ...foundInstructor,
        ...req.body,
        birth: Date.parse(req.body.birth),
        id: Number(req.body.id)
    }

    data.instructors[index] = instructor

    fs.writeFile('data.json', JSON.stringify(data, null, 2), function (err) {
        if (err) return res.send("Erro na escrita do arquivo!")

        return res.redirect(`/instructors/${id}`)
    })
}