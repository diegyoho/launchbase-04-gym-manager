const db = require('../../config/db')

module.exports = {
    all(callback) {
        db.query(`
            SELECT * FROM members
            ORDER BY name ASC`, function (err, results) {
            if (err) throw `Database error! ${err}`

            callback(results.rows)
        })
    },
    create(data, callback) {
        const query = `
            INSERT INTO members (
                avatar_url,
                name,
                email,
                birth,
                gender,
                blood,
                height,
                weight,
                instructor_id
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
            RETURNING id
        `

        db.query(query, data, function (err, results) {
            if (err) throw `Database error! ${err}`

            callback(results.rows[0])
        })
    },
    find(id, callback) {
        db.query(`
            SELECT members.*, instructors.name AS instructor
            FROM members
            LEFT JOIN instructors ON(members.instructor_id = instructors.id)
            WHERE members.id = ${id}`, function (err, results) {
            if (err) throw `Database error! ${err}`

            callback(results.rows[0])
        })
    },
    findBy(filter, callback) {
        db.query(`
            SELECT *
            FROM members
            WHERE name ILIKE '%${filter}%'
            OR email ILIKE '%${filter}%'`, function (err, results) {
            if (err) throw `Database error! ${err}`

            callback(results.rows)
        })
    },
    update(data, callback) {
        const query = `
            UPDATE members SET
                avatar_url=($1),
                name=($2),
                email=($3),
                birth=($4),
                gender=($5),
                blood=($6),
                height=($7),
                weight=($8),
                instructor_id=($9)
            WHERE id = $10
        `

        db.query(query, data, function (err, results) {
            if (err) throw `Database error! ${err}`

            callback()
        })
    },
    delete(id, callback) {
        db.query(`DELETE FROM members WHERE id = ${id}`, function (err, results) {
            if (err) throw `Database error! ${err}`

            callback()
        })
    }
}