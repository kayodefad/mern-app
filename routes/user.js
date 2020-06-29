const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = new express.Router();

const validateRegisterInput = require('../validation/register');
const validateLoginInput = require('../validation/login');
const User = require('../models/user');

router.post('/register', async (req, res) => {
	const {
		name,
		email,
		password,
		password2
	} = req.body;

	const {
		errors,
		isValid
	} = validateRegisterInput(req.body);

	if (!isValid) {
		return res.status(400).json(errors);
	}

	const user = await User.findOne({
		email
	});

	if (user) {
		return res.status(400).json({
			email: 'Email already taken'
		});
	}

	try {
		const newUser = new User({
			name,
			email,
			password
		}); //
		await newUser.save();
		res.status(201).json(newUser);
	} catch (e) {
		console.log(e);
	}
});

router.post('/login', async (req, res) => {
	const {
		email,
		password
	} = req.body;

	const {
		errors,
		isValid
	} = validateLoginInput(req.body);

	if (!isValid) {
		return res.status(400).json(errors);
	}

	// Cjeck if user exists
	const user = await User.findOne({
		email
	});

	if (!user) {
		return res.status(400).json({
			email: 'Email incorrect'
		});
	}

	// Check for password match
	const isMatch = await bcrypt.compare(password, user.password);

	if (!isMatch) {
		return res.status(400).json({
			password: 'Password incorrect'
		});
	}

	// Sign token
	const token = user.generateAuthToken();

	res.json({
		success: true,
		token: `Bearer ${token}`
	});
});

module.exports = router;