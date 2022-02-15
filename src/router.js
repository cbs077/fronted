import Vue from 'vue'
import Router from 'vue-router'

import Login from './views/Login.vue'
import Logout from './views/Logout.vue'
//모델
import Terminal from './views/terminal/Terminal.vue'
import TerminalInsert from './views/terminal/TerminalInsert.vue'

import TerminalMdl from './views/terminal/TerminalMdl.vue'
import TerminalMdlInsert from './views/terminal/TerminalMdlInsert.vue'
//사용자
import UserInfo from './views/user/UserInfo.vue'
import UserMgInsert from './views/user/UserMgInsert.vue'
import UserMgList from './views/user/UserMgList.vue'

//Sw Group
import GroupMg from './views/swOpr/GroupMg.vue'
import GroupMgInsert from './views/swOpr/GroupMgInsert.vue'

//Sw op
import OprMg from './views/swOpr/OprMg.vue'
import OprMgInsert from './views/swOpr/OprMgInsert.vue'
import SwUpgrade from './views/swOpr/SwUpgrade.vue'
import TerminalUpdate from './views/swOpr/TerminalUpdate.vue'

import store from './store'

Vue.use(Router)
const router = new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },    
    {
      path: '/Logout',
      name: 'Logout',
      component: Logout
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    //단말기
    {
      path: '/Terminal',
      name: 'Terminal',
      component: Terminal
    },   
    {
      path: '/TerminalInsert',
      name: 'TerminalInsert',
      component: TerminalInsert
    },       
    //단말기모델
    {
      path: '/TerminalMdl',
      name: 'TerminalMdl',
      component: TerminalMdl
    },   
    {
      path: '/TerminalMdlInsert',
      name: 'TerminalMdlInsert',
      component: TerminalMdlInsert
    },    
    //사용자
    {
      path: '/UserInfo',
      name: 'UserInfo',
      component: UserInfo
    },
    {
      path: '/UserMgList',
      name: 'UserMgList',
      component: UserMgList
    },
    {
      path: '/userMgInsert',
      name: 'userMgInsert',
      component: UserMgInsert
    },
    //s/w 관리
    {
      path: '/GroupMg',
      name: 'GroupMg',
      component: GroupMg
    },    
    {
      path: '/GroupMgInsert',
      name: 'GroupMgInsert',
      component: GroupMgInsert
    },
    // sw opr
    {
      path: '/OprMg',
      name: 'OprMg',
      component: OprMg
    },
    {
      path: '/OprMgInsert',
      name: 'OprMgInsert',
      component: OprMgInsert
    },
    {
      path: '/SwUpgrade',
      name: 'SwUpgrade',
      component: SwUpgrade
    },
    {
      path: '/TerminalUpdate',
      name: 'TerminalUpdate',
      component: TerminalUpdate
    }
  ]
})

router.beforeEach((to, from, next) => {
    //next()
    const token = window.localStorage.getItem('token')
    //const token = this.$session.get('token')

    if (to.fullPath === '/login') {
      console.log("token", token)
      next()
    } else {
      if (token) {
        console.log("token1", token)
        next()
      } else {
        console.log("token2", token)
        next('/login')
      }
    }
})

export default router