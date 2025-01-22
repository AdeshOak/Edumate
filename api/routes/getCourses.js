const express = require('express')
const router = express.Router()
const { Pool, Query } = require('pg')

router.post('/courseTitle', async (req, res) => {
  try {
    console.log(process.env.REACT_APP_DATABASE_URL)
    const pool = new Pool({
      connectionString: process.env.REACT_APP_DATABASE_URL || 'localhost',
      ssl: (process.env.REACT_APP_DATABASE_URL) ? { rejectUnauthorized: false } : true
    })
    const client = await pool.connect()
    const query = `SELECT DISTINCT course_id
                    FROM enrollments WHERE course_title = '${req.body.course_title}'`
    const result = await client.query(query)
    const results = { results: (result) ? result.rows : null }
    console.log('result from query: ' + JSON.stringify(results))
    const results_json_str = JSON.stringify(results)
    const results_json = JSON.parse(results_json_str)
    console.log(JSON.parse(results_json_str).results[0])
    console.log('IN BACKEND', typeof (results_json.results))
    res.send(results)
    client.release()
  } catch (err) {
    console.error(err)
    res.send('Error ' + err)
    // throw err;
  }
})

// retrieve all courses
router.get('/all', async (req, res) => {
  try {
    const pool = new Pool({
      connectionString: process.env.REACT_APP_DATABASE_URL || 'localhost',
      ssl: (process.env.REACT_APP_DATABASE_URL) ? { rejectUnauthorized: false } : true
    })
    const client = await pool.connect()
    const query = `SELECT course_id, course_title
                    FROM courses`
    const result = await client.query(query)
    const results = { results: (result) ? result.rows : null }
    console.log('result from query: ' + JSON.stringify(results))
    const results_json_str = JSON.stringify(results)
    const results_json = JSON.parse(results_json_str)
    console.log(results_json.results[0]) //  JSON.parse(results_json) == {"results":[{"course_id":"xxxx","course_title":"asdfghjk"}]}
    res.send(results_json.results)
    client.release()
  } catch (err) {
    console.error(err)
    res.send('Error ' + err)
    // throw err;
  }
})

// retrieve courses
router.post('/', async (req, res) => {
  try {
    console.log(process.env.REACT_APP_DATABASE_URL)
    const pool = new Pool({
      connectionString: process.env.DATABASE_URL || 'postgres://postgres:adroot@localhost:5432/Edumate',
      ssl: process.env.DATABASE_URL ? true : false
  })
    const client = await pool.connect();
    const query = `SELECT course_title,course_id,semester_id
                    FROM enrollments WHERE user_email = '${req.body.email}'`
    const result = await client.query(query)
    const results = { results: (result) ? result.rows : null }
    console.log('result from query: ' + JSON.stringify(results))
    const results_json_str = JSON.stringify(results)
    const results_json = JSON.parse(results_json_str)
    console.log(JSON.parse(results_json_str).results[0])
    console.log('IN BACKEND', typeof (results_json.results))
    res.send(results)
    client.release()
  } catch (err) {
    console.error(err)
    res.send('Error ' + err)
    // throw err;
  }
})

module.exports = router
