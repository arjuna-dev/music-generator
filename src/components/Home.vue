<template>
<div>
  <h1>Home</h1>
  <button @click='getC4'>C4</button>
  <div>
    <button @click='playPiano'>playPiano</button>
    <button @click='playPiano2'>playPiano2</button>
    <button @click='playPiano3'>playPiano3</button>
    <button @click='playPiano4'>playPiano4</button>
    <button @click='playPiano5'>playPiano5</button>
  </div>
  <button @click='scalePlayer'>Chinese Scale</button>
  <button @click='startLoop'> Play the Beat </button>
  <br>
  <br>
  <button @click='bpmMinFive'> -5 </button>
  <button @click='bpmMinOne'> -1 </button>
  <p> BPM = {{ bpm }} </p>
  <button @click='bpmPlusOne'> +1 </button>
  <button @click='bpmPlusFive'> +5 </button>

</div>
</template>

<script>

import Tone from 'tone'
import toneInstruments from '../assets/Tonejs-Instruments'

// Note durations
// n stands for note, the number before it divides it hence 4n is 1/4 of a note. m is a whole measure. t makes triplets. . ads a half of the value of the note to the note
// '4n' = quarter note
// '8t' = eighth note triplet
// '2m' = two measures
// '8n.' = dotted-eighth note

export default {
  name: 'Home',
  data () {
    return {
      noteValues: ['4n', '8t', '2m', '8n.'],
      synth: new Tone.FMSynth().toMaster(),
      SampleLibrary: toneInstruments.SampleLibrary,
      loopBeat: new Tone.Loop(this.beat, '4n'),
      bpm: 120,
      piano: toneInstruments.SampleLibrary.load({instruments: 'piano'}),
      trumpet: toneInstruments.SampleLibrary.load({instruments: 'trumpet'}),
      tuba: toneInstruments.SampleLibrary.load({instruments: 'tuba'}),
      flute: toneInstruments.SampleLibrary.load({instruments: 'flute'}),
      // Scales: steps to add from base note:
      scale_chinese: [0, 2, 5, 7, 9]
    }
  },
  methods: {
    bpmMinOne () {
      this.bpm -= 1
    },
    bpmMinFive () {
      this.bpm -= 5
    },
    bpmPlusOne () {
      this.bpm += 1
    },
    bpmPlusFive () {
      this.bpm += 5
    },
    getC4 (event) {
      this.synth.triggerAttackRelease('C4', '4n')
    },
    playPiano (event) {
      this.piano.toMaster()
      this.piano.triggerAttackRelease('C4', '1t')
    },
    playPiano2 (event) {
      this.piano.toMaster()
      this.piano.triggerAttackRelease('C4', '2t')
    },
    playPiano3 (event) {
      this.piano.toMaster()
      this.piano.triggerAttackRelease('C4', '8n')
    },
    playPiano4 (event) {
      this.piano.toMaster()
      this.piano.triggerAttackRelease('C4', '8t')
    },
    playPiano5 (event) {
      this.piano.toMaster()
      this.piano.triggerAttackRelease('C4', '3m')
    },
    startLoop () {
      Tone.Transport.bpm.value = this.bpm
      Tone.Transport.start()
      this.loopBeat.start(+0.1)
    },
    beat (time) {
      console.log(time)
      var bassSynth = new Tone.MembraneSynth().toMaster()
      bassSynth.triggerAttackRelease('C2', '8n', time)
    },
    // scalePlayer (baseNote, scale, instrument) {
    scalePlayer () {
      this.flute.toMaster()
      var piano = this.flute
      var noteValues = this.noteValues
      var baseNote = 'C#4'
      var newScale = Tone.Frequency(baseNote).harmonize(this.scale_chinese)
      console.log('newScale:', newScale)
      console.log('newScale:', JSON.stringify(newScale))
      var loop = new Tone.Loop(function (time) {
        var randomNumber = Math.floor(Math.random() * newScale.length)
        var randomNote = newScale[randomNumber]
        var randomNumber2 = Math.floor(Math.random() * noteValues.length)
        var randomNoteValue = noteValues[randomNumber2]
        piano.triggerAttackRelease(randomNote, randomNoteValue)
      }, '4n')
      loop.start(0)
      Tone.Transport.start()
    }
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
