const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const cors = require('cors')

const indexRouter = require('./routes/index')
const usersRouter = require('./routes/users')
const testAPIRouter = require('./routes/testAPI')
const registerAccountRouter = require('./routes/registerAccount')
const getCredentialsRouter = require('./routes/getCredentials')
const securityQuestionGetRouter = require('./routes/securityQuestionGet')
const changePasswordRouter = require('./routes/changePassword')
const validateSecurityAnswerRouter = require('./routes/validateSecurityAnswer')
const getCoursesRouter = require('./routes/getCourses')
const getStudentRouter = require('./routes/getStudents')
const getProfessorRouter = require('./routes/getProfessors')
const updateEnrollmentRouter = require('./routes/updateEnrollment')
const getModulesRouter = require('./routes/professor/getModules')
const addModuleRouter = require('./routes/professor/addModule')
const removeModuleRouter = require('./routes/professor/removeModule')
const editModuleRouter = require('./routes/professor/editModule')
const getCourseGradeRouter = require('./routes/getCourseGrades')
const getCourseAssignmentRouter = require('./routes/getCourseAssignments')

const { appendFile } = require('fs')
const app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')

app.use(cors())
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use('/home/*', express.static(path.join(__dirname, '/public')))
app.use('/static', express.static(path.join(__dirname, '/public/static')))

app.use('/', indexRouter)
app.use('/users', usersRouter)
app.use('/testAPI', testAPIRouter)
app.use('/registerAccount', registerAccountRouter)
app.use('/getCredentials', getCredentialsRouter)
app.use('/securityQuestionGet', securityQuestionGetRouter)
app.use('/changePassword', changePasswordRouter)
app.use('/validateSecurityAnswer', validateSecurityAnswerRouter)
app.use('/getStudents', getStudentRouter)
app.use('/getProfessors', getProfessorRouter)
app.use('/getCourses', getCoursesRouter)
app.use('/updateEnrollment', updateEnrollmentRouter)
app.use('/getModules', getModulesRouter)
app.use('/addModule', addModuleRouter)
app.use('/removeModule', removeModuleRouter)
app.use('/editModule', editModuleRouter)
app.use('/getCourseGrades', getCourseGradeRouter)
app.use('/getCourseAssignments', getCourseAssignmentRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build/index.html'))
})

module.exports = app
