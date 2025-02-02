const express = require('express')
const router = express.Router()
const { Pool, Query } = require('pg')

function double_apostrophe (str) {
  let doubled = ''
  for (const c of str) {
    if (c === '\'') {
      doubled += c + c
    } else {
      doubled += c
    }
  }
  return doubled
}

// creating a new account
router.post('/', async (req, res) => {
  try {
    // TODO: this cannot be hardcoded. --> change later
    const pool = new Pool({
      connectionString: process.env.DATABASE_URL || 'postgres://postgres:adroot@localhost:5432/Edumate',
      ssl: process.env.DATABASE_URL ? true : false
  })
    const client = await pool.connect();
    
    
    const proper_question = double_apostrophe(req.body.securityQuestion)
    const proper_answer = double_apostrophe(req.body.securityAnswer)
    console.log(proper_question)
    console.log(proper_answer)

    const query = `INSERT INTO usertable (email, username, password, user_role, mobile, security_question, security_answer) 
                    VALUES ('${req.body.email}', '${req.body.username}', crypt('${req.body.password}', gen_salt('bf')), '${req.body.role}', 
                    '${req.body.mobile}', '${proper_question}', '${proper_answer}')`
    console.log(query)
    const result = await client.query(query)
    const results = { results: (result) ? result.rows : null }
    res.send(`ayo this shit works ${results.rows}`)
    console.log("should've worked o3o")
    client.release()
  } catch (err) {
    console.error(err)
    res.send('Error ' + err)
  }
})

module.exports = router
