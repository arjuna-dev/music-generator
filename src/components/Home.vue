<template>
<div>
  <h1>Home</h1>
  <button v-on:click='getC4'>C4</button>
  <button v-on:click='playPiano'>playPiano</button>
</div>
</template>

<script>

import Tone from 'tone'
import Test from '../assets/test'
import toneInstruments from '../assets/Tonejs-Instruments'


// Test.aFunction()

// var funcion = Test.dict['aFunction']

// var aFunc = toneInstruments.SampleLibrary['aFunc']
// var aFunc = toneInstruments.SampleLibrary.aFunc

// aFunc()

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
      //create a synth and connect it to the master output (your speakers)
      synth: new Tone.FMSynth().toMaster(),
      aFunc: toneInstruments.SampleLibrary.aFunc,
      SampleLibrary: toneInstruments.SampleLibrary
    }
  },
  methods: {
    getC4: function(event){
      this.synth.triggerAttackRelease('C4', '8n.')
    },
    playPiano: function(event){
      this.SampleLibrary.load({instruments:'piano'})
      // this.aFunc()
      // this.loadPiano.toMaster()
      // this.loadPiano.triggerAttack("A3")
    },
  },
  beforeMount: function(){
    
  },
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
