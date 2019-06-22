
// Nice peaceful flow. (randomNoteValue = undefinded though. Don't know what the note value is)
var loop = new Tone.Loop(function (time) {
    var randomNumber = Math.floor(Math.random() * newScale.length)
    var randomNote = newScale[randomNumber]
    var randomNoteValue = undefined
    piano.triggerAttackRelease(randomNote, randomNoteValue)
  }, '2m')
  loop.start(0)