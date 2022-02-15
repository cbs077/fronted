<template>
	<div>
		<table border="0" width="705" cellpadding="0" cellspacing="0">
			<tr>
				<td width="705"  align="center" valign="top">
					<table width="705" height="">
						<tr>
							<td width="705" height="42" valign="top">
								<table border="0" width="100%" id="table1" cellspacing="1">
									<tr>
										<td align="left">S/W관리 > S/W Group 관리> S/W Group 등록</td>
									</tr>
								</table>
								<br style="line-height:30px">
								<table border="0" width="100%" id="table1" cellspacing="1">
									<tr>
										<td align="left">
											<img src="/common/img/icon/icon_cir_orange.gif" align="absmiddle">
											<font size="2"><b> S/W Group 등록</b></font>
										</td>
									</tr>
								</table>
								<br style="line-height:10px">
								<table class="recordTable" width="710">
									<tr>
										<td colspan="4" class="line_bu3"></td>
									</tr> 
									<tr>
										<td width="150" align="right" bgColor="#f2f8fb">S/W Group 코드 &nbsp;&nbsp;</td>
										<td width="200" >
											<input type="text" v-model="cat_group_id" name="cat_group_id" size="5" maxlength="4">
											<a href="javascript:dupliCheck()"><img src="/common/img/button/but_search_repe.gif" align="absmiddle"></a>	
										</td>
										<td width="150" align="right" bgColor="#f2f8fb">S/W Group 명 &nbsp;&nbsp;</td>
										<td width="200" >
											<input type="text"  v-model="cat_group_nm" name="cat_group_nm" size="20" maxlength="100">
										</td>
									</tr>
									<tr>
										<td width="150" align="right" bgColor="#f2f8fb">설명 &nbsp;&nbsp;</td>
										<td width="200"  colspan="3">
											<br style="line-height:10px">
											<textarea v-model="description" name="description" style="width:400;height:100;"></textarea>	
											<br style="line-height:10px">
										</td>
									</tr>
									<tr>
										<td width="150" align="right" bgColor="#f2f8fb">등록일 &nbsp;&nbsp;</td>
										<td width="200">{{reg_dt}}</td>
										<td width="150" align="right" bgColor="#f2f8fb">등록자&nbsp;&nbsp;</td>
										<td width="200">{{user_id}}</td>
									</tr>
								</table>
								<br style="line-height:35px">
								<table  width="705">
									<button @click="TerminalInsert">서버에 전송하기</button>
								</table>	
							</td>
						</tr>
					</table>
				</td>
			</tr>
		</table>	
	</div>
</template>

<script>
  import axios from 'axios'
  import dayjs from 'dayjs'

  export default { 
	data() {
		 return { 
			 cat_group_id: 1,
			 cat_group_nm: 1,
			 description: "",
			 reg_dt: "",
			 user_id: ""
	}},
    mounted () {
      var date = new Date();
      var reg_dt = date.getFullYear()+"-"+date.getMonth()+"-"+date.getDate()

      this.reg_dt = dayjs().format('YYYY-DD-MM');//date.getFullyear;   
	  this.user_id = this.$store.state.user_id 
    },  	  
    methods: {
      async TerminalInsert() {
        var params = 
          {
			"VAN_ID": this.$store.state.van_id,
			"SW_GROUP_ID": this.cat_group_id,
			"SW_GROUP_NM": this.cat_group_nm,
			"DESCRIPTION": this.description,
			"REG_DT": this.reg_dt,
			"REG_USER": this.user_id,
			"UPDATE_DT": this.reg_dt
          }

        axios.post('http://tms-test-server.p-e.kr:8081/swgroup', 
          params
        ).then(response => {
            console.warn(response)

        }).catch((ex) => {
            console.warn("ERROR!!!!! : ",ex)
        })
      }
    }
  }
</script>

<style lang="css"> 
.pagination { } .page-item { }
table {
  border-collapse: collapse;
  width: 100%;
}

th, td {
  text-align: left;
  padding: 8px;
}

tr:nth-child(even) {background-color: #f2f2f2;}
</style>
