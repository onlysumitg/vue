/* eslint-disable */
import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import login from "@/components/login/login.vue";
import loginentry from "@/components/login/loginentry.vue";
import forgotpassword from "@/components/login/forgotpassword.vue";

import servers from "@/components/servers/servers.vue";
import sql from "@/components/sql/sql.vue";
import results2multiRecord from "@/components/sql/results2multiRecord.vue";

import createTable from "@/components/create/table.vue";


Vue.use(Router)

export default new Router({
  routes: [
    //{ path: "", component: Home },

    {
      path: "/login",
      component: login,
      name: "Login",
      children: [{
          path: "",
          component: loginentry
        },
        {
          path: "reset",
          component: forgotpassword
        }
      ]
    },

    {
      path: "/servers",
      component: servers,
      name: "servers"
    },
    {
      path: "/sql",
      component: sql,
      name: "sql"
    },

    {
      path: "/sqldata",
      component: results2multiRecord,
      name: "multidatasql"
    },
    {
      path: "/createtable",
      component: createTable,
      name: "createtable"
    },
    //----------------------------- common redirect >> /redirect-me will go to user
    {
      path: "/redirect-me2",
      redirect: {
        name: "Login"
      }
    },

    // --------- everything else to to home
    {
      path: "/*",
      redirect: "/login"
    }
  ]
})
