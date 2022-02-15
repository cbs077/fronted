<template>
  <v-container fill-height>
    <v-layout>
      <v-flex>
        <table border="0" width="705" cellpadding="0" cellspacing="0">
            <tr>
            <td width="705"  align="center" valign="top">
              <table width="705" height="">
                <tr>
                  <td width="705" height="42" valign="top">
                    <table border="0" width="100%" id="table1" cellspacing="1">
                      <tr>
                        <td align="left">S/W관리 > 테스트 S/W 관리 > S/W 등록</td>
                      </tr>
                    </table>
                    <br style="line-height:30px">
                    <table border="0" width="100%" id="table1" cellspacing="1">
                      <tr>
                        <td align="left">
                          <img src="/common/img/icon/icon_cir_orange.gif" align="absmiddle">
                          <font size="2"><b>S/W 등록</b></font>
                        </td>
                      </tr>
                    </table>
                    <br style="line-height:10px">
                    <table class="recordTable" width="710">
                      <tr>
                        <td colspan="4" class="line_bu3"></td>
                      </tr> 
                        <tr>
                        <td width="150" align="right" bgColor="#f2f8fb">S/W Group 아이디 &nbsp;&nbsp;</td>
                        <td width="200">
                        </td>
                      </tr>
                      <tr>
                        <td width="150" align="right" bgColor="#f2f8fb">S/W Version &nbsp;&nbsp;</td>
                        <td width="200" colspan="3">
                          <input type="text" name="sw_version" size="10" maxlength="10">&nbsp;
                          <a href="javascript:dupliCheck()"><img src="/common/img/button/but_search_repe.gif" align="absmiddle"></a>	
                        </td>
                      </tr>
                      <tr>
                        <td width="150" align="right" bgColor="#f2f8fb">S/W 파일 업로드 &nbsp;&nbsp;</td>
                        <td width="200" colspan="3">
                          <input type="file" name="fileList">
                        </td>
                      </tr>
                      <tr>
                        <td width="150" align="right" bgColor="#f2f8fb">등록일 &nbsp;&nbsp;</td>
                        <td width="200"><%=CommonUtil.getNowDate()%></td>
                        <td width="150" align="right" bgColor="#f2f8fb">등록자&nbsp;&nbsp;</td>
                        <td width="200"><%=user_id %>	</td>
                      </tr>
                      </table>
                      <table border="0" width="705">
                      <tr>
                        <td><br>
                        * S/W Version 은 최대 10 자리의 숫자로 입력해 주십시오.(문자를 입력하실 경우 10자리를 채워 주십시오.)<br>
                        <br style="line-height:5px">
                          * S/W Version 입력 시 앞서 등록한 Version 이후 Version으로 입력해 주셔야 합니다. (알파벳 혹은 숫자 순서)<br><br>
                        </td>
                      </tr> 
                    </table>
                    
                      <table  width="705">
                        <tr>
                            <td align="right">
                                <!--<v-file-input label="File input" @change="selectFile"></v-file-input>
                                <input type="file" name="fileList" @change="selectFile">-->

                                <input type="file" name="swfile" @change="selectFile">
                                <v-btn @click="submit">서버에 전송하기</v-btn>
                            </td>
                        </tr>
                      </table>	
                      <download-excel :fetch="fetchExcel">
                        <button type="button" class="btn btn-success">Download Excel</button>
                      </download-excel>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </v-flex>
    </v-layout>
  </v-container>
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
      },
      swfile: "test image"
    }),
    methods: {
      login() {
        if (this.$refs.formLogin.validate()) {
          jwt.sign({
            user: this.user,
            password: this.password
          }, 'jwtSecret', (err, token) => {
            window.localStorage.setItem('token', token)
            this.$router.push('/')
          })
        }
      },
      async submit() {
        const formData = new FormData();
        formData.append("swfile", this.swfile);

        try {
          const { data } = await axios.post(
            "http://tms-test-server.p-e.kr:8081/upload",
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );
          console.log(data);
        } catch (err) {
          console.log(err);
        }
      },

      // 파일 변경 시 이벤트 핸들러
      selectFile(e) {
        //this.swfile = swfile;
        this.swfile = event.target.files[0]
      },
      async fetchExcel(){
        const response = await axios.get('http://tms-test-server.p-e.kr:8081/swgroup/list?page=2');
        return response.data.data;
      }
    }
  }
</script>