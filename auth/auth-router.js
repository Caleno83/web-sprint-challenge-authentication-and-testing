const express = require('express')
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const db = require("../users/usersModel")


const router = express.Router()

router.post('/register', async (req, res, next) => {
  // implement registration
  try {
		const { username, password } = req.body
		const user = await db.findBy({username}).first()
		// const user = await db.findByUsername(username)


		if (user) {
			return res.status(409).json({
				message: "You Shall Not Pass",
			})
		}

		const newUser = await db.add({
			username,
      password: await bcrypt.hash(password, 14),
		})

		.then(info => {res.status(201).json({message: "Registration Successful", info});})

		res.status(201).json(newUser)
	} catch(err) {
		next(err)
	}
});

router.post('/login', async (req, res, next) => {
  // implement login
  try {
		const { username, password } = req.body
		const user = await db.findBy({ username }).first()
		// const user = await db.findByUsername(username)
		
		if (!user) {
			return res.status(401).json({
				message: "You Shall Not Pass",
			})
		}

		const passwordValid = await bcrypt.compare(password, user.password)

		if (!passwordValid) {
			return res.status(401).json({
				message: "You Shall Not Pass",
			})
		}

		const token = jwt.sign({
			userID: user.id,
    }, process.env.JWT_SECRET)
    
    //this is will tell the client to save this token in its cookie jar
    res.cookie("token", token)


    
        
		res.json({
			message: `Welcome ${user.username}!`,
			token,
			user_id: user.id,

		})
	} catch(err) {
		next(err)
	}
});


module.exports = router;
