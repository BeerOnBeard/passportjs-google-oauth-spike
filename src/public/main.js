(function(){
  var DataAccess = {
    getPeople: function() {
      return fetch('/people').then(function(response) { return response.json(); });
    },
    putPerson: function(name, score) {
      return fetch(
        '/people/' + name,
        { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ score: score }) }
      )
        .then(function(response) { return response.json(); });
    },
    deletePerson: function(personId) {
      return fetch('/people/' + personId, { method: 'DELETE', headers: { 'Content-Type': 'application/json' } });
    }
  };

  function deletePerson() {
    var personElement = this.parentNode;
    DataAccess.deletePerson(personElement.id)
      .then(function() { personElement.parentNode.removeChild(personElement); });
  }

  function createPersonElement(person) {
    var element = document.createElement('div');
    element.id = person.name;

    var info = document.createElement('span');
    info.textContent = 'Name: ' + person.name + ', ' + 'Score: ' + person.score;
    element.appendChild(info);

    var deleteButton = document.createElement('input');
    deleteButton.type = 'button';
    deleteButton.value = 'Delete';
    deleteButton.addEventListener('click', deletePerson);
    element.appendChild(deleteButton);
    return element;
  }

  function upsertPersonElementInList(listElement, person) {
    var personElement = createPersonElement(person);
    var existingElement = document.getElementById(person.name);
    if (existingElement) {
      existingElement.parentNode.replaceChild(personElement, existingElement);
    } else {
      listElement.appendChild(personElement);
    }
  }

  function getListElement() {
    return document.getElementById('person-list');
  }

  function initializeList() {
    var listElement = getListElement();
    DataAccess.getPeople()
      .then(function(people) {
        people.forEach(function(person) { upsertPersonElementInList(listElement, person); });
      });
  }

  function initializeForm() {
    document.getElementById('upsert-form').addEventListener('submit', function(evt) {
      evt.preventDefault();
      var name = document.getElementById('name').value;
      var score = document.getElementById('score').value;
      DataAccess.putPerson(name, score).then(function(person) {
        var listElement = getListElement();
        upsertPersonElementInList(listElement, person);
      });
    });
  }

  document.addEventListener('DOMContentLoaded', function(){
    initializeList();
    initializeForm();
  });
}());
