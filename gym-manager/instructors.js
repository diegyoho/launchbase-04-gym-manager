const fs = require('fs')
const data = require('./data.json')

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