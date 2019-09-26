const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');

// Load input validation
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

// Load User module
const User = require('../../model/User');

// @route   GET api/users/test
// @desc    Tests users route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Users Works' }));

// @route   POST api/users/register
// @desc    Register user
// @access  Public
router.post('/register', (req, res) => {
	console.log('hi')
	const { errors, isValid } = validateRegisterInput(req.body);
	if(!isValid) return res.status(400).json(errors);
	console.log('hi2')

	User.findOne({ email: req.body.email })
		.then(user => {
			if(user) {
				errors.email = 'EMAIL ALREADY EXIST';
				return res.status(400).json(errors);
			} else {
				User.findOne({ email: req.body.sID })
					.then(user => {
						if(user) {
							errors.sID = 'SID ALREADY EXIST';
							return res.status(400).json(errors);
						} else {
							const newUser = new User({
								name: req.body.name,
								email: req.body.email,
								password: req.body.password,
								sID: req.body.sID,
								field: req.body.field
							});

							bcrypt.genSalt(10, (err, salt) => {
								bcrypt.hash(newUser.password, salt, (err, hash) => {
									if(err) throw err;
									newUser.password = hash;
									newUser.save()
										.then(user => res.json(user))
										.catch(err => console.log(err));
								});
							});
						}
					});
			}

		})
		.catch(err => console.log(err));
});

// @route   POST api/users/login
// @desc    Login user/ returning jwt
// @access  Public
router.post('/login', (req, res) => {
	const email = req.body.email;
	const password = req.body.password;

	const { errors, isValid } = validateLoginInput(req.body);
	if(!isValid) return res.status(400).json(errors);

	// find user by email
	User.findOne({email})
		.then(user => {
			if(!user) {
				errors.email = "EMAIL DOES NOT EXIST";
				return res.status(404).json(errors);
			} 
			bcrypt.compare(password, user.password)
				.then(isMached => {
					if(isMached) {
						const payload = { id : user.id, name : user.name, email: user.email };
						// 	Sign token
						jwt.sign(
							payload,
							keys.secretOrkey,
							{ expiresIn: 36000 },
							(err, token) => {
								res.json({ 
									success: true,
									token: 'Bearer ' + token
								});
							});
					} else {
						errors.password = 'WRONG PASS';
						return res.status(400).json(errors);
					}
				});
		});
});

// @route   GET api/users/current
// @desc    Return current user
// @access  Private
router.get('/current', passport.authenticate('jwt', { session: false }),  (req, res) => {
	res.json({
		id: req.user.id,
		email: req.user.email,
		name: req.user.name,
    sID: req.user.sID,
    field: req.user.field,
    answerdQuestions: req.user.answerdQuestions,
    currentQuestions: req.user.currentQuestions,
    gifts: req.user.gifts,
	});
});

// @route   GET/API/users/all
// @desc		return all users
// @access  private only the admin@maze.com with pqowieowurowieow
router.get('/all', passport.authenticate('jwt', { session: false }), (req, res) => {
	if(req.user.email !== 'admin@maze.com')
		return res.status(404).send('Unauthorized');
	User.find()
		.then(users => {
		if (!users) {
			errors.noUser = 'There are no profiles';
			return res.status(404).json(errors);
		}
		res.json(users);
		})
		.catch(err => res.status(404).json({ users: 'There are no profiles' }));
});

module.exports = router;