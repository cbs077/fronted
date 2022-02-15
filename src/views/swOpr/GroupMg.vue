<template>
	<div>
	<select v-model="selected" class="form-control" tabindex="12">
		<option value="" selected>전체</option>
		<option key="sw_group_id" value="sw_group_id">S/W group 코드</option>
		<option key="sw_group_nm" value="sw_group_nm">S/W group 명</option>
	</select>
	<input type="text" v-model="select_val" name="select_val" size="5" maxlength="4">
	<button @click="fetchList">검색</button>
	<table id="list">
		<thead>
			<tr>
				<th>Van사명</th>
				<th>S/W Group 코드</th>
				<th>S/W Group 명</th>
				<th>등록일</th>
				<th>등록자</th>
			</tr>
		</thead>
		<tbody id="contacts">
			<tr v-for="contact in contacts">
				<td>{{contact.VAN_NM}}</td>			
				<td>{{contact.SW_GROUP_ID}}</td>
				<td>{{contact.SW_GROUP_NM}}</td>
				<td>{{contact.REG_DT}}</td>
				<td>{{contact.REG_USER}}</td>
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
	</div>
</template>

<script>
  import axios from 'axios'
  import Paginate from 'vuejs-paginate' 

  export default { 
	components: {
		Paginate
	},
	data() {
		 return { 
			 page: 1,
			 page_count: 1,
			 contacts: [],
			 datas: [],
			 selected: "",
			 select_val: ""
	}},
    mounted () {
		this.fetch_data();
		this.fetchList();
    },    
    methods: {
		clickCallback (pageNum) { 
			this.fetchList(pageNum);
		},

        async fetch_data(){		
			const response = await axios.get('http://tms-test-server.p-e.kr:8081/swgroup?van_id=111');
			this.datas = response.data.list 
		},

        async fetchList(){		
			var params = "&" + this.selected + "=" + this.select_val
			const response = await axios.get('http://tms-test-server.p-e.kr:8081/swgroup/list?page='+ this.page +'&page_count=2' + params);
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
