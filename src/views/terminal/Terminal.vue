<template>
	<div>
	<!-- 검색 -->	
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
									<td width="150" align="right" bgColor="#f2f8fb">검색조건 &nbsp;&nbsp;</td>
									<td width="200" >

										<select v-model="selected" class="" tabindex="12">
											<option value="" selected>전체</option>
											<option key="sw_group_id" value="sw_group_id">S/W group 코드</option>
											<option key="sw_version" value="sw_version">S/W Version</option>									
											<option key="cat_serial_no" value="cat_serial_no">단말기 번호</option>
										</select>
										<input type="text" v-model="select_val" name="select_val" size="5" maxlength="4">
										<button @click="fetchList">검색</button>
									</td>									
								</tr>
								<tr>
									<td width="150" align="right" bgColor="#f2f8fb">결과 데이터&nbsp;&nbsp;</td>
									<td width="200" >
										<input type="checkbox" name="cat_model_id_ck"> 단말기 모델 코드 
										<input type="checkbox" name="sw_group_id_ck" > S/W Group 코드 <br>
										<input type="checkbox" name="status_ck" > 상태 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
										<input type="checkbox" name="sw_version_ck"> S/W Version <br>
										<input type="checkbox" name="reg_dt_ck"> 등록일 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
										<input type="checkbox" name="last_use_dt_ck"> 최종접속일  
									</td>
								</tr>
							</table>
							<br style="line-height:35px">
						</td>
					</tr>
				</table>
			</td>
		</tr>
	</table>	

	<table id="list">
		<thead>
			<tr>
				<th>Van사명</th>
				<th>단말기모델코드</th>
				<th>단말기번호</th>
				<th>S/W Group 코드</th>
				<th>S/W Version</th>
				<th>상태</th>
				<th>등록일</th>
				<th>최종접속일</th>
			</tr>
		</thead>
		<tbody id="contacts">
			<tr v-for="contact in contacts">
				<td>{{contact.VAN_NM}}</td>			
				<td>{{contact.CAT_MODEL_ID}}</td>
				<td>{{contact.CAT_SERIAL_NO}}</td>
				<td>{{contact.SW_GROUP_ID}}</td>
				<td>{{contact.SW_VERSION}}</td>
				<td>{{contact.STATUS}}</td>
				<td>{{contact.REG_DT}}</td>
				<td>{{contact.LAST_USE_DT}}</td>				
			</tr>
		</tbody>
	</table>
	<paginate v-model="page" 
		:page-count="page_count"
		:page-range="3" 
		:margin-pages="2" 
		:click-handler="clickCallback" 
		:prev-text="'Prev'" 
		:next-text="'Next'" 
		:container-class="'pagination'" 
		:page-class="'page-item'">
	</paginate>
	<download-excel :fetch="fetchList">
		<button type="button" class="btn btn-success">Download Excel</button>
	</download-excel>	

	<TerminalInsert/>

	</div>
</template>

<script>
  import axios from 'axios'
  import dayjs from 'dayjs'
  import Paginate from 'vuejs-paginate' 
  import TerminalInsert from './TerminalInsert.vue'

  export default { 
	components: {
		Paginate,
		TerminalInsert
	},	  
	data() {
		 return { 
			cat_model_id: '',
			data_a: [],
			select_val: "",
			page: 1,
			page_count: 1,
			contacts: [],
			selected: "",
			options: [
			{ text: 'Orange', value: 'orange' },
			{ text: 'Apple', value: 'apple' },
			{ text: 'Pineapple', value: 'pineapple' },
			{ text: 'Grape', value: 'grape' }
			]			 
	}},
    mounted () {
		this.fetchList()
    },  	  
    methods: {
		clickCallback (pageNum) { 
			this.fetchList(pageNum);
		},
        async fetchList(){		
			var params = "&" + this.selected + "=" + this.select_val
			const response = await axios.get('http://tms-test-server.p-e.kr:8081/terminal/list?page='+ this.page +'&page_count=2' + params);
			this.contacts = response.data.list 
			this.page_count = response.data.total_count 
			return response.data.list;
		},
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
