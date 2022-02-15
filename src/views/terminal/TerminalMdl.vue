<template>
	<div>

		<select v-model="selected" name="a" id="a" class="form-control" tabindex="12">
			<option value="" selected>전체</option>
			<option v-for="data in datas" :key="data.CAT_MODEL_ID" :value="data.CAT_MODEL_ID">{{ data.CAT_MODEL_NM }}</option>
		</select>
		<button @click="fetchList">검색</button>
		<table id="list">
			<thead>
				<tr>
					<th>Van사명</th>
					<th>모델코드</th>
					<th>모델명</th>
					<th>설명</th>
					<th>등록일</th>
				</tr>
			</thead>
			<tbody id="contacts">
				<tr v-for="contact in contacts">
					<td>{{contact.VAN_NM}}</td>			
					<td>{{contact.CAT_MODEL_ID}}</td>
					<td>{{contact.CAT_MODEL_NM}}</td>
					<td>{{contact.DESCRIPTION}}</td>
					<td>{{contact.REG_DT}}</td>
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
		<TerminalMdlInsert/>
	</div>
</template>

<script>
  import axios from 'axios'
  import Paginate from 'vuejs-paginate' 
  import TerminalMdlInsert from './TerminalMdlInsert.vue'

  export default { 
	components: {
		Paginate,
		TerminalMdlInsert
	},
	data() {
		 return { 
			 page: 1,
			 page_count: 1,
			 contacts: [],
			 datas: [],
			 selected: ""
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
			const response = await axios.get('http://tms-test-server.p-e.kr:8081/terminal_mdl?van_id=111');
			this.datas = response.data.list 
			//console.log(this.selected)
		},

        async fetchList(){		
			var params = "&cat_model_id=" + this.selected
			const response = await axios.get('http://tms-test-server.p-e.kr:8081/terminal_mdl/list?page='+ this.page +'&page_count=2' + params);
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
