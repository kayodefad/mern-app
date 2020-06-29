const mongoose = require('mongoose');
const {
	Schema
} = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new Schema({
	name: {
		type: String,
		required: true,
		trim: true
	},
	email: {
		type: String,
		required: true,
		trim: true
	},
	password: {
		type: String,
		required: true,
		trim: true
	},
}, {
	timestamps: true,
});

userSchema.virtual('posts', {
	ref: 'Post',
	localField: '_id',
	foreignField: 'author'
})

userSchema.methods.generateAuthToken = function () {
	const user = this;
	const token = jwt.sign({
			_id: user._id.toString(),
			name: user.name
		},
		process.env.secretOrKey, {
			expiresIn: 31556926, // 1 year in seconds
		}
	);

	return token;
};

userSchema.pre('save', async function (next) {
	const user = this;

	if (user.isModified('password')) {
		user.password = await bcrypt.hash(user.password, 8);
	}

	next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;