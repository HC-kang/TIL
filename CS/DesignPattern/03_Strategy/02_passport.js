var passport = require('passport'), LocalStrategy = require('passsport-local').Strategy;

passport.use(new LocalStrategy(
    function(username, password, done) {
        username.findOne({ username: username }, function (err, user) {
            if (err) { return done(err); }
                if (!user) {
                    return done(null, false, { message: 'Incorrect username.' });
                }
                if (!user.validPassword(password)) {
                    return done(null, false, { message: 'Incorrect password.' });
                }
                return done(null, user);
        });
    }
));
