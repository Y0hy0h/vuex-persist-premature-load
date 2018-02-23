<template>
    <div id="app">
        <button @click="$store.commit('add-item', 'new Item')">+</button>
        <ul>
            <li v-for="item in items">
                {{item}}
            </li>
        </ul>
    </div>
</template>

<script>
  export default {
    name: 'app',
    data () {
      return {
        items: this.$store.state.items
      }
    }
  }
</script>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }
</style>
