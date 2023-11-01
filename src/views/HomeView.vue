<template>
  <div class="home"> 
    <img alt="Shake Media Logo" src="../assets/logo.png" height="250" width="250">
    
    <HelloWorld msg="Local and remote audio playback."/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'HomeView',
  components: {
    HelloWorld
  }
}
</script>
