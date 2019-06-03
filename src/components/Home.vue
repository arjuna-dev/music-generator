<template>
<div>
  <h1>Home</h1>
</div>
</template>

<script>
import Tone from "tone";

//create a synth and connect it to the master output (your speakers)
var synth = new Tone.Synth().toMaster()
//play a middle 'C' for the duration of an 8th note
synth.triggerAttackRelease('C4', '8n')

export default {
  name: 'Home',
  data () {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
