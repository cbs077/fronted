<template>
	<div>
	<table id="list">
		<thead>
			<tr>
				<th>번호</th>
				<th>이름</th>
				<th>전화번호</th>
				<th>주소</th>
			</tr>
		</thead>
		<tbody id="contacts">
			<tr v-for="contact in contacts">
				<td>{{contact.USER_ID}}</td>
				<td>{{contact.USER_NM}}</td>
				<td>{{contact.COMP_ID}}</td>
				<td>{{contact.USER_RIGHTS}}</td>
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
			 contacts: []
	}},
    mounted () {
		this.fetchList();
    },    
    methods: {
		clickCallback (pageNum) { 
			this.fetchList(pageNum);
		},

        async fetchList(){		
			const response = await axios.get('http://tms-test-server.p-e.kr:8081/getUserMgList?page='+ this.page +'&page_count=2');
			this.contacts = response.data.list 
			this.page_count = response.data.total_count 
			//return response.data.data;
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
