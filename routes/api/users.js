const express = require('express')
const router = express.Router()
const gravatar = require('gravatar')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const keys = require('../../config/keys')

let User = require('../../models/Users')

router.get('/test',(req,res) => res.json({msg:"Hello Users Works"}))

router.post('/register',(req,res) => {
 	User.findOne({ email:req.body.email })
 		.then(user => {
 			if(user){
 				return res.status(400).json({email: 'Email already exits'})
 			}else{
 				let avatar = gravatar.url(req.body.email, {
 					s:'200',r:'pg',d:'mm'
 				})

 				let newUser = new User({
 					name: req.body.name,
 					email: req.body.email,
 					avatar,
 					password: req.body.password
 				})

 				bcrypt.genSalt(10, (err,salt) => {
 					bcrypt.hash(newUser.password, salt, (err,hash) => {
 						if(err) throw err
 						newUser.password = hash
 						newUser.save()
 							.then(user => res.json(user))
 							.catch(err => console.log(err))
 					})
 				})
 			}
 		})
})

router.post('/login', (req,res) => {
	let email = req.body.email
	let password = req.body.password

	User.findOne({ email })
		.then(user => {
			if(!user){
				return res.status(404).json({email: 'User not found'})
			}

			bcrypt.compare(password, user.password)
				.then(isMatch => {
					if(isMatch){
						// User Match
						let payload = { id:user.id, name:user.name, avatar:user.avatar }

						// Sign Token
						jwt.sign(payload, 
							keys.secretOrKey, 
							{ expiresIn: 3600 }, 
							(err,token) => {
								res.json({
									success: true,
									token: 'Bearer : ' + token
								})
						})
					}else{
						return res.status(400).json({password: 'Password inCorrect'})
					}
				})
		})
})

module.exports = router