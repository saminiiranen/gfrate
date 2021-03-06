var passport = require('passport'),
usersDB = require('./db/users')

exports.postPoints = [
  passport.authenticate('token', { session: false }),
  function(req, res) {
    console.log(req.body);

    if ( typeof req.body.to_add == 'undefined' && req.body.to_add == null )
    {
       res.json({ test: false , added: 0});
       return res;
    }

    req.user.points = req.user.points + req.body.to_add;

    res.json({ isOK: true , added: req.body.to_add, points: req.user.points});
    return res;
  }
]

exports.getPoints = [
  passport.authenticate('token', { session: false }),
  function(req, res) {

    res.json({ points: req.user.points });

    return res;
  }
]

exports.getHallOfFame = [
  function(req, res) {

    res.json({ topPoints: usersDB.findAll()});

    return res;
  }
]