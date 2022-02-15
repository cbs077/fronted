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
										<td align="left">단말기관리 > 단말기 모델> <b>등록</b></td>
									</tr>
								</table>
								<br style="line-height:30px">
								<table border="0" width="100%" id="table1" cellspacing="1">
									<tr>
										<td align="left">
											<img src="/common/img/icon/icon_cir_orange.gif" align="absmiddle">
											<font size="2"><b>단말기 모델 신규 등록</b></font>
										</td>
									</tr>
								</table>
								<br style="line-height:10px">
								<table class="recordTable" width="710">
									<tr>
										<td colspan="4" class="line_bu3"></td>
									</tr> 
									<tr>
										<td width="150" align="right" bgColor="#f2f8fb">단말기 번호&nbsp;&nbsp;</td>
										<td width="200" >
											<input type="text" v-model="cat_model_id" name="cat_model_id" size="5" maxlength="4">
										
											<a href="javascript:dupliCheck()"><img src="/common/img/button/but_search_repe.gif" align="absmiddle"></a>	
										</td>
										<td width="150" align="right" bgColor="#f2f8fb">단말기 모델 &nbsp;&nbsp;</td>
										<td width="200" >
											<select v-model="cat_selected" name="cat_model" id="cat_model" class="form-control" tabindex="12">
												<option value="" selected>--</option>
												<option v-for="data in data_a" :key="data.CAT_MODEL_ID" :value="data.CAT_MODEL_ID">{{ data.CAT_MODEL_NM }}</option>
											</select>	
											<!-- <input type="text"  v-model="cat_model_nm" name="cat_model_nm" size="20" maxlength="100"> -->
										</td>
									</tr>
									<tr>
										<td width="150" align="right" bgColor="#f2f8fb">S/W Group 코드 &nbsp;&nbsp;</td>
										<td width="200" >
											<select v-model="group_id_selected" name="sw_group_id" id="sw_group_id" class="form-control" tabindex="12">
												<option value="" selected>--</option>
												<option v-for="data in data_b" :key="data.SW_GROUP_ID" :value="data.SW_GROUP_ID">{{ data.SW_GROUP_ID }}</option>
											</select>	
										
											<!--<a href="javascript:dupliCheck()"><img src="/common/img/button/but_search_repe.gif" align="absmiddle"></a>-->	
										</td>
										<td width="150" align="right" bgColor="#f2f8fb">S/W Group 명 &nbsp;&nbsp;</td>
										<td width="200" >
											<select v-model="group_nm_selected" name="sw_group_nm" id="sw_group_nm" class="form-control" tabindex="12">
												<option value="" selected>--</option>
												<option v-for="data in data_b" :key="data.SW_GROUP_NM" :value="data.SW_GROUP_NM">{{ data.SW_GROUP_NM }}</option>
											</select>	
											<!-- <input type="text"  v-model="cat_model_nm" name="cat_model_nm" size="20" maxlength="100"> -->
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
			 cat_model_id: 1,
			 cat_model_nm: 1,
			 description: "",
			 reg_dt: "",
			 user_id: "",
			 cat_selected: "",
			 group_id_selected: "",
			 group_nm_selected: "",
			 data_a: [],
			 data_b: []
	}},
    mounted () {
		var date = new Date();
		var reg_dt = date.getFullYear()+"-"+date.getMonth()+"-"+date.getDate()

		this.reg_dt = dayjs().format('YYYY-DD-MM');//date.getFullyear;   
		this.user_id = this.$session.get('user_id')
		this.fetch_cat_model()
		this.fetch_cat_group()
    },  	  
    methods: {
		async fetch_cat_model(){		
			const response = await axios.get('http://tms-test-server.p-e.kr:8081/terminal_mdl?van_id=111');
			this.data_a = response.data.list 
		},

		async fetch_cat_group(){		
			const response = await axios.get('http://tms-test-server.p-e.kr:8081/swgroup?van_id=111');
			this.data_b = response.data.list 
		},

        async TerminalInsert() {
			var params = 
			{
				"VAN_ID": this.$session.get('van_id'),
				"CAT_SERIAL_NO": this.cat_model_id,
				"CAT_MODEL_ID": this.cat_selected,
				"SW_GROUP_ID": this.group_id_selected,
				"SW_VERSION": "",
				"STATUS": "none",
				"REG_DT": this.reg_dt,
				"REG_USER": this.user_id
			}

        axios.post('http://tms-test-server.p-e.kr:8081/terminal', 
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
