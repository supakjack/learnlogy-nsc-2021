const createError = require('http-errors')
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()

require('dotenv').config()
require('./helpers/init_mongodb')
require('./helpers/init_redis')

app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

const userRouter = require('./routers/user.router')

app.use('/user', userRouter)

app.use(async (req, res, next) => {
  next(createError.NotFound())
})

app.use((err, req, res, next) => {
  res.status(err.status || 500)
  res.send({
    error: {
      status: err.status || 500,
      message: err.message
    }
  })
})

const PORT = process.env.PORT || 9999

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
