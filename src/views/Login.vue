<template>
  <div id="login">
    <!-- Default form login -->
    <form>
      <p class="h4 text-center mb-4">Sign in</p>
      <label for="defaultFormLoginEmailEx" class="grey-text">아이디</label>
      <input type="email" id="defaultFormLoginEmailEx" class="form-control"/>
      <br/>
      <label for="defaultFormLoginPasswordEx" class="grey-text">비밀번호</label>
      <input type="password" id="defaultFormLoginPasswordEx" class="form-control"/>
      <div class="text-center mt-4">
        <button class="btn btn-indigo" type="submit" @click="login">Login</button>
      </div>
    </form>
    <!-- Default form login -->

    <button name="button"  @click="login">login</button>
    <button name="button1"  @click="getuser">getuser</button>
  </div>
</template>

<script>
  import jwt from 'jsonwebtoken'
  import axios from 'axios'

  export default {
    data: () => ({
      user: '',
      password: '',
      validations: {
        required: v => !!v || 'This is a required field!'
      }
    }),
    methods: {
      async login() {
        const response = await axios.get('http://tms-test-server.p-e.kr:8081/login?user_id=cbs12345&password=abc');
        console.log("response", response)
        //return response.data;
        if(response.data.status == 200){
          window.localStorage.setItem('token', 'true')  // router before 때문에 필요함.
          this.$session.set('token', true)
          this.$session.set('user_id',response.data.messages.info.user_id)
          this.$session.set('van_id',response.data.messages.info.van_id)
          //this.$session.get('user_id')

          //console.log("session_user_id", this.$session.get('user_id'))
          //this.$store.state.auth = true
          //this.$store.state.user_id = response.data.messages.info.user_id
          //this.$store.state.van_id = response.data.messages.info.van_id

          this.$router.push('/Terminal')
        }
      },
      async getuser() {
        const response = await axios.get('http://tms-test-server.p-e.kr:8081/user/cbst');
        console.log("response", response)
      }
    }
  }
</script>
<style>
  #login {
    padding-left: 0px;
    transition: 0.3s ease;
  }
</style>
