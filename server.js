let express = require('express')
let mongoose = require('mongoose')

let users = require('./routes/api/users')

let app = express()

// DB Config
let db = require('./config/keys').mongoURI

// Connect to MongoDB
mongoose.connect(db,{useNewUrlParser :true })
	.then(()=>console.log('MongoDB to Connected'))
	.catch(err=>console.log(err))

// Use Routes
app.use('/api/users', users)

let port = process.env.PORT || 5000
app.listen(port,()=>console.log(`Server Running on PORT ${port}`))