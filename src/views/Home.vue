<template>
  <div>
    <button name="button"  @click="logout">logout</button>

    <button name="button1"  @click="getuser">getuser</button>
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    data: () => ({
      logged: false,
    }),
    methods: {
      isLogged() {
        window.localStorage.getItem('token')
          ? this.logged = true
          : this.logged = false
      },
      async logout() {
        //window.localStorage.removeItem('token')
        const response = await axios.get('http://tms-test-server.p-e.kr:8081/logout');
        console.log("response", response)
        this.$router.push('/login')
      },
      async getuser() {
        const response = await axios.get('http://tms-test-server.p-e.kr:8081/user/cbst');
        console.log("response", response)
      }
    },
    computed: {
      loggedUser() {
        const token = window.localStorage.getItem('token')
        const payload = JSON.parse(atob(token.split('.')[1]))
        return payload
      }
    },
    mounted() {
      this.isLogged()
    }
  }
</script>