const express = require('express')
const router = express.Router()
const { Pool } = require('pg')

// Validating security answer with the given security question

function double_apostrophe (str) {
  let doubled = '' // Declare the variable 'doubled'
  for (const c of str) {
    if (c === '\'') {
      doubled += c + c // Double the apostrophe
    } else {
      doubled += c
    }
  }
  return doubled
}

router.post('/', async (req, res) => {
  let client
  try {
    const pool = new Pool({
      connectionString: process.env.REACT_APP_DATABASE_URL || 'localhost',
      ssl: process.env.REACT_APP_DATABASE_URL ? { rejectUnauthorized: false } : false
    })
    client = await pool.connect()

    const proper_question = double_apostrophe(req.body.securityQuestion)
    const proper_answer = double_apostrophe(req.body.securityAnswer)

    // Parameterized query to avoid SQL injection
    const query = `
      SELECT EXISTS(
        SELECT 1 FROM users
        WHERE security_question = $1 AND security_answer = $2
      )`

    const result = await client.query(query, [proper_question, proper_answer])

    const results = { results: result.rows.length > 0 ? result.rows : null }

    console.log('Result from query:', JSON.stringify(results))

    res.json(results.results[0] || { exists: false }) // Return exists status
  } catch (err) {
    console.error(err)
    res.status(500).send('An error occurred while processing your request.')
  } finally {
    if (client) {
      client.release() // Ensure client is released
    }
  }
})

module.exports = router
