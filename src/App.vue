<template>
<RouterView/>
<FooterComponent></FooterComponent>
</template>

<script>
import FooterComponent from './components/FooterComponent.vue';

export default {
  data() {
    return {
      
    }
  },

  components: {
    FooterComponent: FooterComponent,
}
}
</script>
<style>
header {
  background-color: black;
  color: white;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #000000;
}
.footer {
    position: absolute;
}

i:hover {
cursor: pointer;
}
</style>