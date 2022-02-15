<template>
  <div class="hello">
  <h1>{{ msg }}</h1>
  <table class="table table-striped table-bordered">
      <thead>
          <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
          </tr>
      </thead>
      <tbody>
          <tr v-for="user in items" >
            <td>{{user.VAN_ID}}</td>
            <td>{{user.CAT_MODEL_ID}}</td>
            <td>{{user.CAT_MODEL_NM}}</td>
          </tr>
      </tbody>
  </table>

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
                  <td width="150" align="right" bgColor="#f2f8fb">모델 코드 &nbsp;&nbsp;</td>
                  <td width="200" >
                    <input type="text" name="cat_model_id" size="5" maxlength="4">
                    <a href="javascript:dupliCheck()"><img src="/common/img/button/but_search_repe.gif" align="absmiddle"></a>	
                  </td>
                  <td width="150" align="right" bgColor="#f2f8fb">모델명 &nbsp;&nbsp;</td>
                  <td width="200" >
                    <input type="text" name="cat_model_nm" size="20" maxlength="100">
                  </td>
                </tr>
                  <tr>
                  <td width="150" align="right" bgColor="#f2f8fb">설명 &nbsp;&nbsp;</td>
                  <td width="200"  colspan="3">
                    <br style="line-height:10px">
                    <textarea name="description" style="width:400;height:100;" onChange="CheckStrLen('100',this);" onKeyUp="CheckStrLen('100',this);"></textarea>	
                    <br style="line-height:10px">
                  </td>
                </tr>
                <tr>
                  <td width="150" align="right" bgColor="#f2f8fb">등록일 &nbsp;&nbsp;</td>
                  <td width="200"></td>
                  <td width="150" align="right" bgColor="#f2f8fb">등록자&nbsp;&nbsp;</td>
                  <td width="200"></td>
                </tr>
                </table>
                <br style="line-height:35px">
                <table  width="705">
                  <tr>
                      <td align="right">
                      <a href="javascript:clear()"><img src="/common/img/button/but_clear.gif"></a>&nbsp;
                        <a href="javascript:insert()"><img src="/common/img/button/but_save.gif"></a>&nbsp;
                        <a href="javascript:pageView('<bean:message key="leftMenu.terminalMdl"/>')"><img src="/common/img/button/but_list.gif"></a>
                      </td>
                  </tr>
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
import axios from 'axios';

export default {
  name: 'HelloWorld',
  props: {
    msg: String,
  },
  data() {
    return {
      items: [],

    }
  },
  methods: {
    read() {
      const url = 'http://tms-test-server.p-e.kr:8081/terminal_mdl/list?page=1&cat_model_id=2&cat_model_nm=3';
      axios.get(url,
      ).then((res) => {
        console.log(res.data);
        this.items = res.data['data'];
        console.log(this.items[0]['VAN_ID']);
        this.loading = false;
      });
    },
  },
  created() {
    //console.log(http)
    this.read()
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
