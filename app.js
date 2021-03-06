// ----
// DATA
// ----

// A couple jokes to start with
var jokes = {
  'the horse': {
    setup: 'A horse walks into the bar. The bartender asks...',
    punchline: 'Why the long face?'
  },
  'Orion\'s pants': {
    setup: 'How does Orion keep his pants up?',
    punchline: 'With an asteroid belt.'
  }
}

// The message to display if the jokes object is empty
var noJokesMessage = 'I... I don\'t know any jokes. 😢'

// Buttons for remember and forget joke
var btnForget = document.getElementById('forget')
var btnRemember = document.getElementById('remember')

// -------------
// PAGE UPDATERS
// -------------

var setJokes = function () {
  var stringifiedJokes = JSON.stringify(jokes)
  if (stringifiedJokes != null) {
    window.localStorage.setItem('jokes', stringifiedJokes)
  }
  updatePage()
}

var getJokes = function () {
  var stringifiedJokes = window.localStorage.getItem('jokes')
  if (stringifiedJokes != null) {
    jokes = JSON.parse(stringifiedJokes)
  }
}

// Update the listed jokes, based on the jokes object
var jokesMenuList = document.getElementById('jokes-menu')
var updateJokesMenu = function () {
  // Don't worry too much about this code for now.
  // You'll learn how to do advanced stuff like
  // this in a later lesson.
  var jokeKeys = Object.keys(jokes)
  var jokeKeyListItems = jokeKeys.join('</li><li>') || noJokesMessage
  jokesMenuList.innerHTML = '<li>' + jokeKeyListItems + '</li>'
}

// Update the displayed joke, based on the requested joke
var requestedJokeInput = document.getElementById('requested-joke')
var jokeBox = document.getElementById('joke-box')

var updateDisplayedJoke = function () {
  var requestedJokeKey = requestedJokeInput.value
  var requestedJoke = jokes[requestedJokeKey]
  if (requestedJoke) {
    jokeBox.innerHTML =
      '<p>' + requestedJoke.setup + '</p>' +
      '<p>' + requestedJoke.punchline + '</p>'
  } else {
    jokeBox.textContent = 'No matching joke found.'
  }
}

// Function to keep track of all other
// page update functions, so that we
// can call them all at once
var updatePage = function () {
  getJokes()
  updateJokesMenu()
  updateDisplayedJoke()
  clearNewInput()
}

var clearNewInput = function () {
  document.getElementById('jokeRemember').value = ''
  document.getElementById('jokeForget').value = ''
  document.getElementById('setup').value = ''
  document.getElementById('punchline').value = ''
}

// -------
// STARTUP
// -------

// Update the page immediately on startup
updatePage()
// ---------------
// EVENT LISTENERS
// ---------------

// Keep the requested joke up-to-date
requestedJokeInput.addEventListener('input', updateDisplayedJoke)

btnForget.addEventListener('click', function () {
  var jokeForget = document.getElementById('jokeForget').value
  delete jokes[jokeForget]
  setJokes()
})

btnRemember.addEventListener('click', function () {
  var jokeRemember = document.getElementById('jokeRemember').value
  var jokeSetup = document.getElementById('setup').value
  var jokePunchline = document.getElementById('punchline').value
  jokes[jokeRemember] = {setup: jokeSetup, punchline: jokePunchline}
  setJokes()
})
