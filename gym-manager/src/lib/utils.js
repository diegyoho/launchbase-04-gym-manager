module.exports = {
    age: function (timestamp) {
        const today = new Date()
        const birth = new Date(timestamp)

        let age = today.getUTCFullYear() - birth.getUTCFullYear()
        const month = today.getUTCMonth() - birth.getUTCMonth()

        if (month < 0 || month == 0 && today.getUTCDate() < birth.getUTCDate())
            age -= 1

        return age
    },
    date: function (timestamp) {
        const date = new Date(timestamp)

        const year = date.getUTCFullYear()
        const month = `0${date.getUTCMonth() + 1}`.slice(-2)
        const day = `0${date.getUTCDate()}`.slice(-2)

        return {
            year,
            month,
            day,
            iso: `${year}-${month}-${day}`,
            birthDay: `${day}/${month}`
        }
    },
    degree: function (id) {
        const degrees = [
            'Graduação',
            'Mestrado',
            'Doutorado'
        ]

        return degrees[id]
    },
    blood: function (id) {
        const bloods = [
            'A+',
            'A-',
            'B+',
            'B-',
            'AB+',
            'AB-',
            'O+',
            'O-'
        ]

        return bloods[id]
    }
}