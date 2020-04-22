const db = require('../../config/db')

module.exports = {
    all(callback) {
        db.query(`
            SELECT instructors.*, count(members) AS students
            FROM instructors
            LEFT JOIN members ON (members.instructor_id = instructors.id)
            GROUP BY instructors.id
            ORDER BY students DESC`, function (err, results) {
            if (err) throw `Database error! ${err}`

            callback(results.rows)
        })
    },
    create(data, callback) {
        const query = `
            INSERT INTO instructors (
                avatar_url,
                name,
                birth,
                gender,
                degree,
                services,
                created_at
            ) VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING id
        `

        db.query(query, data, function (err, results) {
            if (err) throw `Database error! ${err}`

            callback(results.rows[0])
        })
    },
    find(id, callback) {
        db.query(`SELECT * FROM instructors WHERE id = ${id}`, function (err, results) {
            if (err) throw `Database error! ${err}`

            callback(results.rows[0])
        })
    },
    findBy(filter, callback) {
        db.query(`
            SELECT instructors.*, count(members) AS students
            FROM instructors
            LEFT JOIN members ON (members.instructor_id = instructors.id)
            WHERE instructors.name ILIKE '%${filter}%'
            OR instructors.services ILIKE '%${filter}%'
            GROUP BY instructors.id
            ORDER BY students DESC`, function (err, results) {
            if (err) throw `Database error! ${err}`

            callback(results.rows)
        })
    },
    update(data, callback) {
        const query = `
            UPDATE instructors SET
                avatar_url=($1),
                name=($2),
                birth=($3),
                gender=($4),
                degree=($5),
                services=($6)
            WHERE id = $7
        `

        db.query(query, data, function (err, results) {
            if (err) throw `Database error! ${err}`

            callback()
        })
    },
    delete(id, callback) {
        db.query(`DELETE FROM instructors WHERE id = ${id}`, function (err, results) {
            if (err) throw `Database error! ${err}`

            callback()
        })
    },
    paginate(params, callback) {
        let { filter, limit, offset } = params

        let totalQuery = `(
            SELECT count(*) FROM instructors
        ) AS total,`

        let endQuery = `
            GROUP BY instructors.id
            ORDER BY students DESC
            LIMIT ${limit} OFFSET ${offset}
        `

        if (filter) {
            const filterQuery = `
                WHERE instructors.name ILIKE '%${filter}%'
                OR instructors.services ILIKE '%${filter}%'
            `

            totalQuery = `(
                SELECT count(*) FROM instructors
                ${filterQuery}
            ) AS total,`

            endQuery = `
                ${filterQuery}
                ${endQuery}
            `
        }

        const query = `
            SELECT instructors.*, ${totalQuery} count(members) AS students
            FROM instructors
            LEFT JOIN members ON (members.instructor_id = instructors.id)
            ${endQuery}
        `

        db.query(query, function (err, results) {
            if (err) throw `Database error! ${err}`

            callback(results.rows)
        })
    }
}