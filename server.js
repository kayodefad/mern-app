const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const bodyParser = require('body-parser');
const path = require('path')

mongoose
	.connect(process.env.MONGO_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log('Database connected successfully'))
	.catch(e => console.log(e));

const app = express();

app.use(bodyParser.urlencoded({
	extended: false
}));

app.use(bodyParser.json());

app.use('/api/users', require('./routes/user'));
app.use('/api/posts', require('./routes/post'));

// Passport middleware
app.use(passport.initialize());

// Passport config
require('./config/passport')(passport);

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
	// Set static folder
	app.use(express.static('client/build'))

	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
	})
}

const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`App is listening on port ${PORT}`));