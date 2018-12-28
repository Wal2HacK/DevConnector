let express = require('express')
let mongoose = require('mongoose')
let bodyParser = require('body-parser')
let passport = require('passport')

let users = require('./routes/api/users')
let posts = require('./routes/api/posts')

let app = express()

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json())

// DB Config
let db = require('./config/keys').mongoURI

// Connect to MongoDB
mongoose.connect(db,{useNewUrlParser :true })
	.then(()=>console.log('MongoDB to Connected'))
	.catch(err=>console.log(err))

// Passport middleware
app.use(passport.initialize())

// Passport Config
require('./config/passport')(passport)

// Use Routes
app.use('/api/users', users)
app.use('/api/posts', posts)

let port = process.env.PORT || 5000
app.listen(port,()=>console.log(`Server Running on PORT ${port}`))