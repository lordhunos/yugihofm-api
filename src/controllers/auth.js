const passport = require('passport')

module.exports = {
    facebook:           passport.authenticate('facebook', { 
                            authType: 'rerequest', 
                            scope: ['email'] 
                        }),

    facebookCallback:   passport.authenticate('facebook', { session: false }),
}