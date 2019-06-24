
// Nice peaceful flow. (randomNoteValue = undefinded though. Don't know what the note value is)
var loop = new Tone.Loop(function (time) {
    var randomNumber = Math.floor(Math.random() * newScale.length)
    var randomNote = newScale[randomNumber]
    var randomNoteValue = undefined
    piano.triggerAttackRelease(randomNote, randomNoteValue)
  }, '2m')
  loop.start(0)


  // Nice little arpegio

  var seq = new Tone.Sequence(function (time, note) {
    var randomNumber = Math.floor(Math.random() * newScale.length)
    var randomNote = newScale[randomNumber]
    var randomNumber2 = Math.floor(Math.random() * noteValues.length)
    var randomNoteValue = noteValues[randomNumber2]
    piano.triggerAttackRelease(note, randomNoteValue)
    // piano.triggerAttackRelease(randomNote, randomNoteValue)
  }, ['C4', 'E4', 'G4', 'A4'], '4n')
  seq.start(0)