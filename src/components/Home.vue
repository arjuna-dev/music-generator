<template>
<div>
  <h1>Home</h1>
  <button @click='getC4'>C4</button>
  <select name="notePicker" id="notePicker" v-model="selectedNote">
    <option value="C4">C4</option>
    <option value="C#4">C#</option>
    <option value="D4">D</option>
    <option value="D#4"> D#</option>
    <option value="E4">E</option>
    <option value="F4">F</option>
    <option value="F#4">F#</option>
    <option value="A4">A</option>
    <option value="A#4">A#</option>
    <option value="A#1">A# (for Tuba)</option>
    <option value="B4">B</option>
  </select>
  <select name="instrumentPicker" id="instrumentPicker" v-model="selectedInstrument">
    <option value="piano"> piano </option>
    <option value="flute"> flute </option>
    <option value="tuba"> tuba </option>
  </select>
  <select name="scalePicker" id="scalePicker" v-model="selectedScale">
    <option value="chinese_black_keys"> Chinese Scale </option>
    <option value="majorPentatonic"> Major Pentatonic</option>
    <option value="minorPentatonic"> Minor Pentatonic</option>
    <option value="major"> Major Scale </option>
    <option value="mixolydian"> Mixolydian Scale </option>
  </select>

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
      selectedNote: '',
      selectedInstrument: '',
      selectedScale: '',
      myScales: {
                  majorPentatonic: [0, 2, 4, 7, 9],
                  minorPentatonic: [0, 3, 5, 7, 10],
                  major: [ 0, 2, 4, 5, 7, 9, 11],
                  mixolydian:[ 0, 2, 4, 5, 7, 9, 10],
                  chinese_black_keys: [ 0, 2, 5, 7, 9],
                  chinese_gong: [ 0, 2, 4, 8, 10],
                  chinese_shang: [ 0, 2, 6, 8, 12],
                  chinese_jue: [ 0, 4, 6, 10, 12],
                  chinese_zi: [ 0, 2, 6, 8, 10],
                  chinese_yu: [ 0, 4, 6, 8, 12],
      },
     
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
      console.log(this.myScales[this.selectedScale])
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
      var instrumentio = toneInstruments.SampleLibrary.load({instruments: this.selectedInstrument})
      instrumentio.toMaster()
      var piano = instrumentio
      var noteValues = this.noteValues
      var baseNote = this.selectedNote
      var newScale = Tone.Frequency(baseNote).harmonize(this.myScales[this.selectedScale])
      console.log('newScale:', newScale)
      console.log('newScale:', JSON.stringify(newScale))

      var randomNumber3 = Math.floor(Math.random() * noteValues.length)
      var randomNoteValue3 = noteValues[randomNumber3]

      var loop = new Tone.Loop(function (time) {
        var randomNumber = Math.floor(Math.random() * newScale.length)
        var randomNote = newScale[randomNumber]
        var randomNumber2 = Math.floor(Math.random() * noteValues.length)
        var randomNoteValue = noteValues[randomNumber2]
        piano.triggerAttackRelease(randomNote, randomNoteValue)
      }, '4n')
      loop.interval = '4n'
      loop.humanize = true
      loop.probability = 0.9
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
