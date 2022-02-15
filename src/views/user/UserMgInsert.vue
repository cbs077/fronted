<template>
    <table border="0" width="705" cellpadding="0" cellspacing="0">
    <tr>
		<td width="705"  align="center" valign="top">
			<table width="705" height="">
				<tr>
					<td width="705" height="42" valign="top">
						<table border="0" width="100%" id="table1" cellspacing="1">
							<tr>
								<td align="left">사용자관리 > 사용자관리 > 등록</td>
							</tr>
						</table>
						<br style="line-height:30px">
						<table border="0" width="100%" id="table1" cellspacing="1">
							<tr>
								<td align="left">
									<img src="/common/img/icon/icon_cir_orange.gif" align="absmiddle">
									<font size="2"><b>사용자  등록</b></font>
								</td>
							</tr>
						</table>
						<br style="line-height:10px">
						<table class="recordTable" width="710">
							<tr>
								<td colspan="4" class="line_bu3"></td>
							</tr> 
							<tr>
								<td width="150" align="right" bgColor="#f2f8fb">아이디 &nbsp;&nbsp;</td>
								<td width="200">
									<input type="text" v-model="user_id" name="user_id" size="15" maxlength="20">&nbsp;
									<a href="javascript:dupliCheck()"><img src="/common/img/button/but_search_repe.gif"></a>	
								</td>
								<td width="150" align="right" bgColor="#f2f8fb">소속사 &nbsp;&nbsp;</td>
								<td width="200">
								</td>
							</tr>
   							<tr>
								<td width="150" align="right" bgColor="#f2f8fb">패스워드&nbsp;&nbsp;</td>
								<td width="200">
									<input type="password" v-model="pwd" name="pwd" style='width:78pt;' maxlength="25">
								</td>
								<td width="150" align="right" bgColor="#f2f8fb">패스워드 확인&nbsp;&nbsp;</td>
								<td width="200">	
									<input type="password" v-model="pwd_confirm" name="pwd_confirm" style='width:78pt;' maxlength="25">	
								</td>
							</tr>
							<tr>
								<td width="150" align="right" bgColor="#f2f8fb">권한 &nbsp;&nbsp;</td>
								<td width="200">
								
									<select v-model="user_rights" name="user_rights" style='width:80pt;'>
									</select>
								</td>
								<td width="150" align="right" bgColor="#f2f8fb">전화번호&nbsp;&nbsp;</td>
								<td width="200">	
									<input type="text" v-model="phone" name="phone" size="15" maxlength="13">	
								</td>
							</tr>
							<tr>
								<td width="150" align="right" bgColor="#f2f8fb">등록일 &nbsp;&nbsp;</td>
								<td width="200">
									{{reg_dt}}&nbsp;
								</td>
								<td width="150" align="right" bgColor="#f2f8fb">팩스번호&nbsp;&nbsp;</td>
								<td width="200">	
									<input type="text" v-model="fax" name="fax" size="15" maxlength="13">	
								</td>
							</tr>
							<tr>
								<td width="150" align="right" bgColor="#f2f8fb">담당자명 &nbsp;&nbsp;</td>
								<td width="200" colspan="3">
									<input type="text" v-model="user_nm" name="user_nm" size="15" maxlength="50">
								</td>
							</tr>
							<tr>
								<td width="150" align="right" bgColor="#f2f8fb">주 소&nbsp;&nbsp;</td>
								<td width="200" colspan="3">
								<input type="text" v-model="zip_code1" name="zip_code1" size="3" readonly> - 
								<input type="text" v-model="zip_code2" name="zip_code2" size="3" readonly>
								<a href="javascript:addSearch()"><img src="/common/img/button/but_search_zip.gif" ></a>
								<br>
									<input type="text" name="addr1" size=87 maxlength="100" readonly>&nbsp; 
									<input type="text" name="addr2" size=87 maxlength="100">
								</td>
							</tr>
							<tr>
								<td width="150" align="right" bgColor="#f2f8fb">등록일 &nbsp;&nbsp;</td>
								<td width="200"></td>
								<td width="150" align="right" bgColor="#f2f8fb">등록자&nbsp;&nbsp;</td>
								<td width="200">	
								</td>
							</tr>
   						</table>
   						<br style="line-height:35px">
   						 <table  width="710">
							   <tr>
							  		<td align="right">
							  			<button @click="userMgInsert">서버에 전송하기</button>
							  			<!--<a href="javascript:pageView('<bean:message key="leftMenu.userMg"/>')"><img src="/common/img/button/but_list.gif"></a>-->
							  		</td>
							   </tr>
						  </table>	
					</td>
				</tr>
			</table>
		</td>
	</tr>
</table>
</template>

<script>
  import jwt from 'jsonwebtoken'
  import axios from 'axios'
  import dayjs from 'dayjs'

  export default {
    
    data: () => ({
      user_id: '',
      pwd: '',
      pwd_confirm: '',
      user_rights: '',
      phone: '',
      fax: '',
      user_nm: '',
      pwd: '',
      zip_code1: '',
      zip_code2: '',
      reg_dt: '',
	  reg_user_id: ''
    }),
    // computed: {
    //   reg_dt: function () {
    //     var date = new Date();

    //     this.reg_dt = date.getFullyear;   
    //     console.log(this.reg_dt)    
    //     return this.reg_dt
    //   }
    // },
    mounted () {
      var date = new Date();
      var reg_dt = date.getFullYear()+"-"+date.getMonth()+"-"+date.getDate()

      this.reg_dt = dayjs().format('YYYY-DD-MM');
	  this.reg_user_id = this.$store.state.user_id 
    },    
    methods: {
      async userMgInsert() {
        console.log("userMgInsert")
        var params = 
          {
              "USER_ID": this.user_id,
              "USER_NM": this.user_nm,
              "COMP_ID": "111",
              "PWD": "abc",
              "USER_RIGHTS": "S",
              "PHONE": this.phone,
              "FAX": this.fax,
              "ZIP_CODE": null,
              "ADDR1": null,
              "ADDR2": null,
              "REG_DT": this.reg_dt,
              "REG_USER": this.reg_user_id,
              "UPDATE_DT": this.reg_dt
          }

        axios.post('http://tms-test-server.p-e.kr:8081/user', 
          params
        ).then(response => {
            console.warn(response)
            this.result = response.data
            this.no = response.data.no
        }).catch((ex) => {
            console.warn("ERROR!!!!! : ",ex)
        })
      },
    }
  }
</script>