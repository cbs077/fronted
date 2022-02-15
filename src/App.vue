<template>
<!--
  <v-app>
    <v-content>
      <router-view/>
    </v-content>
  </v-app>
-->
  <div>
    <div id="demo">
      <router-view />
    </div>
    <div v-if="is_login">
      <sidebar-menu :menu="menu" />
      <!--<div id="nav">
        <router-link to="/">Home</router-link>
        <router-link to="/login">login</router-link> 
        <router-link to="/about">About</router-link>
        <router-link to="/userMgInsert">개인정보 등록</router-link>
        <router-link to="/UserMgList">개인정보 조회</router-link>
        <router-link to="/UserInfo">개인정보</router-link>
      </div>
      -->
    </div>
  </div>
</template>

<script>
  //import { SidebarMenu } from 'vue-sidebar-menu'
  import 'vue-sidebar-menu/dist/vue-sidebar-menu.css'

  export default {
    components: {
      //SidebarMenu
    },
    name: 'App',
    computed: {
      is_login () {
        //const token = window.localStorage.getItem('token')
        //const token = window.localStorage.getItem('token')
        //const token = this.$store.state.auth
        const token = this.$session.get('token')
        console.log("token", token)
        return token
      }
    },    
    data() {
          return {
            auth: window.localStorage.getItem('token'),
            menu: 
            [
              {
                header: 'Main Navigation',
                hiddenOnCollapse: true
              },
              {
                href: '/Logout',
                title: '로그아웃'
              },                 
              {//
                href: '/UserMgList',
                title: '단말기관리',
                child: 
                [
                  {
                    href: '/UserInfo',
                    title: '+단말기',
                    child: [
                      {
                        href: '/Terminal',
                        title: '+단말기 등록/조회'
                      },
                      {
                        href: '/userMgInsert',
                        title: '+단말기 등록 이력'
                      },
                      {
                        href: '/userMgInsert',
                        title: '+삭제'
                      }
                    ]
                  },
                  {
                    href: '/UserInfo',
                    title: '+단말기 현황',
                    child: [
                      {
                        href: '/UserMgList',
                        title: '+Van사별 현황'
                      },
                      {
                        href: '/userMgInsert',
                        title: '+Van사별 현황(상세)'
                      },
                    ]
                  },
                  {
                    href: '/UserInfo',
                    title: '+단말기 사용정보',
                    child: [
                      {
                        href: '/UserMgList',
                        title: '+조회'
                      }
                    ]
                  },   
                  {
                    href: '/Terminal',
                    title: '+단말기모델',
                    child: [
                      {
                        href: '/TerminalMdl',
                        title: '+조회'
                      },
                      {
                        href: '/TerminalMdlInsert',
                        title: '+등록'
                      }
                    ]
                  },                                                         
                ]
              },
              {//사용자 
                href: '/UserMgList',
                title: '사용자관리',
                child: [
                  {
                    href: '/UserInfo',
                    title: '+사용자관리',
                    child: [
                      {
                        href: '/UserInfo',
                        title: '+개인정보'
                      },
                      {
                        href: '/UserMgList',
                        title: '+조회'
                      },
                      {
                        href: '/userMgInsert',
                        title: '+등록'
                      }
                    ]
                  }
                ]
              },
              {// s/w 관리
                href: '/GroupMg',
                title: 'S/W Group 관리',
                child: 
                [
                  {
                    href: '/GroupMg',
                    title: '+S/W Group 관리',
                    child: [
                      {
                        href: '/GroupMg',
                        title: '+S/W Group 조회'
                      },
                      {
                        href: '/GroupMgInsert',
                        title: '+S/W Group 등록'
                      }
                    ]
                  },
                  {
                    href: '/UserInfo',
                    title: '+운영 S/W 관리',
                    child: [
                      {
                        href: '/UserMgList',
                        title: '+S/W 조회'
                      },
                      {
                        href: '/userMgInsert',
                        title: '+S/W Upgrade 이력'
                      },
                      {
                        href: '/userMgInsert',
                        title: '+단말기 Update 이력'
                      },
                    ]
                  },
                  {
                    href: '/UserInfo',
                    title: '+단말기 사용정보',
                    child: [
                      {
                        href: '/UserMgList',
                        title: '+조회'
                      }
                    ]
                  },   
                  {
                    href: '/UserInfo',
                    title: '+단말기모델',
                    child: [
                      {
                        href: '/UserMgList',
                        title: '+조회'
                      },
                      {
                        href: '/userMgInsert',
                        title: '+등록'
                      }
                    ]
                  },                                                         
                ]
              },
            ]
          }
        }        // 단말기                
      }            // {
              
</script>
<style>
  #demo {
    padding-left: 350px;
    transition: 0.3s ease;
  }

  .vsm--link_level-3{
    color: #777 !important;
  }
</style>

