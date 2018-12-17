const port = 3000;
const googleClientId = 'REPLACE_ME';
const googleClientSecret = 'REPLACE_ME';
const sessionSecret = 'very secret';

const Person = require('./Person');
const people = {
  Paula: new Person('Paula', 200),
  Faith: new Person('Faith', 1000)
};

const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const express = require('express');
const app = express();

passport.use(new GoogleStrategy({
    clientID: googleClientId,
    clientSecret: googleClientSecret,
    callbackURL: 'http://localhost:3000/auth/google/callback'
  },
  (accessToken, refreshToken, profile, cb) => cb(null, profile)
));

passport.serializeUser((user, cb) => cb(null, user));
passport.deserializeUser((obj, cb) => cb(null, obj));

app.use(require('express-session')({ secret: sessionSecret, resave: true, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
app.use(express.static('public'));

app.get('/auth/google', passport.authenticate('google', { scope: ['profile'] }));
app.get('/auth/google/callback', passport.authenticate('google'), (req, res) => res.redirect('/app.html'));

const verifyAuthenticated = (req, res, next) => {
  if (!req.isAuthenticated || !req.isAuthenticated()) {
    res.status(401).end();
    return;
  }

  next();
}

app.get('/people', verifyAuthenticated, (req, res) => {
  let result = Object.keys(people).map(id => people[id]);
  res.status(200).json(result);
});

app.put('/people/:name', verifyAuthenticated, (req, res) => {
  if (!req.body.score) {
    res.status(400).send('Body must contain a score');
    return;
  }

  let person = new Person(req.params.name, req.body.score);
  people[person.name] = person;

  res.status(200).json(person);
});

app.delete('/people/:name', verifyAuthenticated, (req, res) => {
  let person = people[req.params.name];
  if (!person) {
    res.status(404).end();
    return;
  }

  delete people[req.params.name];
  res.status(200).json(person);
});

app.listen(port, () => console.log(`Listening on port ${port}...`));
