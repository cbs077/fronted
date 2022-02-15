<template>
  <div id="logout">
    <!-- Default form login -->

  </div>
</template>

<script>
  import jwt from 'jsonwebtoken'
  import axios from 'axios'

  export default {
    mounted () {
      const response = axios.get('http://tms-test-server.p-e.kr:8081/logout');
      this.$store.state.auth = false
      window.localStorage.setItem('token', 'false')
      this.$router.push('/')
    },   
  }
</script>
<style>
  #logout {
    padding-left: 0px;
    transition: 0.3s ease;
  }
</style>
