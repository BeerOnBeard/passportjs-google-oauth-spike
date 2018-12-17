const port = 3000;

const Person = require('./Person');
const express = require('express');
const app = express();
app.use(express.json());
app.use(express.static('public'));

const people = {
  Paula: new Person('Paula', 200),
  Faith: new Person('Faith', 1000)
};

app.get('/people', (req, res) => {
  let result = Object.keys(people).map(id => people[id]);
  res.status(200).json(result);
});

app.put('/people/:name', (req, res) => {
  if (!req.body.score) {
    res.status(400).send('Body must contain a score');
    return;
  }

  let person = new Person(req.params.name, req.body.score);
  people[person.name] = person;

  res.status(200).json(person);
});

app.delete('/people/:name', (req, res) => {
  let person = people[req.params.name];
  if (!person) {
    res.status(404).end();
    return;
  }

  delete people[req.params.name];
  res.status(200).json(person);
});

app.listen(port, () => console.log(`Listening on port ${port}...`));
