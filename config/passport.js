const JwtStrategy = require('passport-jwt').Strategy,
  ExtractJwt = require('passport-jwt').ExtractJwt,
  mongoose = require('mongoose'),
  User = mongoose.model('User')

const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.secretOrKey;

module.exports = passport => {
  passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
    User.findById(jwt_payload._id)
      .then(user => {
        if(user) {
          return done(null, user)
        }
        return done(null, false)
      })
      .catch(e => console.log(e))
  }));
}