require('dotenv').config()
const express = require('express')
const workoutRoutes = require('./routes/workout')
const userRoutes = require('./routes/user')
const mongoose = require('mongoose')

// express app
const app = express()

// middleware
app.use(express.json())

app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

// routes
app.use('/api/workouts', workoutRoutes)
app.use('/api/user', userRoutes)


//connect to db
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to database...')
    // listen for requests
    app.listen(process.env.PORT, () => {
      console.log('listening on port', process.env.PORT)
    })
  })
  .catch(() => {
    console.log(err)
  })

