const express = require('express')
const router = express.Router()
const { Pool } = require('pg')

// Retrieve modules for a specific course
router.post('/', async (req, res) => {
  let client // Declare 'client' in a higher scope
  try {
    console.log(process.env.REACT_APP_DATABASE_URL)
    const pool = new Pool({
      connectionString: process.env.REACT_APP_DATABASE_URL || 'localhost',
      ssl: process.env.REACT_APP_DATABASE_URL ? { rejectUnauthorized: false } : false
    })
    client = await pool.connect()

    const query = `
      SELECT *
      FROM modules
      WHERE course_id = (
        SELECT DISTINCT course_id
        FROM enrollments
        WHERE course_title = $1
      )`

    const result = await client.query(query, [req.body.course_title]) // Use parameterized query
    const results = { results: result.rows || null }
    console.log('IN BACKEND', typeof results.results)
    res.send(results)
  } catch (err) {
    console.error(err)
    res.sendStatus(404) // Send proper status code
  } finally {
    if (client) client.release() // Release the client safely
  }
})

// Retrieve a specific module given a module_title & course_id
router.post('/specificModule', async (req, res) => {
  let client // Declare 'client' in a higher scope
  try {
    console.log(process.env.REACT_APP_DATABASE_URL)
    const pool = new Pool({
      connectionString: process.env.REACT_APP_DATABASE_URL || 'localhost',
      ssl: process.env.REACT_APP_DATABASE_URL ? { rejectUnauthorized: false } : false
    })
    client = await pool.connect()

    const query = `
      SELECT *
      FROM modules
      WHERE course_id = $1 AND module_title = $2`

    const result = await client.query(query, [req.body.course_id, req.body.module_title]) // Use parameterized query
    const results = { results: result.rows || null }
    console.log('IN BACKEND', typeof results.results)
    res.send(results)
  } catch (err) {
    console.error(err)
    res.sendStatus(404) // Send proper status code
  } finally {
    if (client) client.release() // Release the client safely
  }
})

module.exports = router
