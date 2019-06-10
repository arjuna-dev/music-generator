<template>
<div>
  <h1>Home</h1>
  <button @click='getC4'>C4</button>
  <button @click='playPiano'>playPiano</button>
  <button @click='scalePlayer'>scalePLayer</button>
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
// '4n' = quarter note
// '8t' = eighth note triplet
// '2m' = two measures
// '8n.' = dotted-eighth note

export default {
  name: 'Home',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      synth: new Tone.FMSynth().toMaster(),
      SampleLibrary: toneInstruments.SampleLibrary,
      loopBeat: new Tone.Loop(this.song, '4n'),
      bpm: 120,
      piano: toneInstruments.SampleLibrary.load({instruments: 'piano'}),
      trumpet: toneInstruments.SampleLibrary.load({instruments: 'trumpet'}),
      tuba: toneInstruments.SampleLibrary.load({instruments: 'tuba'}),
      // Scales: steps to add from base note:
      chinese_scale: [2, 4, 7, 9]
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
      this.synth.triggerAttackRelease('C4', '8n.')
    },
    playPiano (event) {
      this.piano.toMaster()
      this.piano.triggerAttackRelease('A2')
    },
    startLoop () {
      Tone.Transport.bpm.value = this.bpm
      Tone.Transport.start()
      this.loopBeat.start(+0.1)
    },
    song (time) {
      console.log(time)
      var bassSynth = new Tone.MembraneSynth().toMaster()
      bassSynth.triggerAttackRelease('C2', '8n', time)
    },
    // scalePlayer (baseNote, scale, instrument) {
    scalePlayer () {
      console.log(toneInstruments.SampleLibrary.guitarNylon['D3'])
      // console.log('hey')
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
