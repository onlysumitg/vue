/* eslint-disable */
import Vue from "vue";
import Router from "vue-router";
import HelloWorld from "@/components/HelloWorld";
import login from "@/components/login/login.vue";
import loginentry from "@/components/login/loginentry.vue";
import forgotpassword from "@/components/login/forgotpassword.vue";

import servers from "@/components/servers/servers.vue";

import libList from "@/components/servers/joblibl.vue";

import allsettinglist from "@/components/settings/settingsedit.vue";


import serverSettings from "@/components/servers/settings.vue";
import userSettings from "@/components/user/settings.vue";
import userList from "@/components/user/userList.vue";
import userx from "@/components/user/useredit.vue";
import usercrt from "@/components/user/usercreate.vue";

import userAuths from "@/components/user/auths.vue";

import userGroups from "@/components/user/groups.vue";

import sql from "@/components/sql/sql.vue";
import sqlscreen from "@/components/sql/sqlscreen.vue";
import results2multiRecord from "@/components/sql/results2multiRecord.vue";

import createTable from "@/components/create/table.vue";
import results2 from "@/components/sql/results2.vue";

import dbdoc from "@/components/dbdoc/dbdoc.vue";
import spdoc from "@/components/dbdoc/spdoc.vue";
import header01 from "@/components/headers/header01.vue";
import headerSpeedDial02 from "@/components/headers/headerSpeedDial02.vue";
import headerSpeedDial01 from "@/components/headers/headerSpeedDial01.vue";


headerSpeedDial02
import isource from "@/components/isource/createsource.vue";

import dirtree from "@/components/ifs/dirtree.vue";
import multifile from "@/components/ifs/multifile.vue";

import gmake from "@/components/ssh/gmake.vue";
import sshrun from "@/components/ssh/run.vue";

import gitdiff from "@/components/ssh/gitdiff.vue";


Vue.use(Router);

export default new Router({
  routes: [
    //{ path: "", component: Home },

    {
      path: "/login",
      component: login,
      name: "Login",
      children: [{
          path: "",
          component: loginentry,
          name: "loginentry"
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
    //----------------------------------------------------
    {
      path: "/settings",
      name: "settings",
      components: {
        default: allsettinglist,

      },
      children: [
        // libl
        {
          path: "liblist",
          component: libList,
          name: "libList"
        }, {
          path: "serversetting",
          component: serverSettings,
          name: "serversettings"
        },
        {
          path: "usersettings/:username?",
          component: userSettings,
          name: "usersettings"
        },
        {
          path: "userAuths/:username?",
          component: userAuths,
          name: "userAuths"
        },
        {
          path: "userGroups/:username?",
          component: userGroups,
          name: "userGroups"
        },
        {
          path: "users",
          component: userList,
          name: "userlist",



        }, {
          path: "user/:username",
          component: userx,
          name: "useredit",

        },
        {
          path: "usercreate",
          component: usercrt,
          name: "usercreate",

        },


      ]
    },
    //----------------------------- start of /sql and children element
    {
      path: "/sql",

      name: "sql",
      components: {
        default: sql,

      },

      children: [{
        path: "",
        component: results2,
        name: "basesql"
      }]

    },

    //----------------------------- start of /sql and children element
    {
      path: "/sqlscreen",

      name: "sqlscreen",
      components: {
        default: sqlscreen,
        // speedDialMenu: headerSpeedDial01
      },
      children: [{
        path: "",
        component: results2,
        name: "sqlscreensqlind"
      }]


    },
    //----------------------------- end of /sql
    {
      path: "/sqldata",
      component: results2multiRecord,
      name: "multidatasql"

    },



    //---------------- db doc independet
    {
      path: "/dbdoc",

      name: "dbdocind",
      components: {
        default: dbdoc,
        // speedDialMenu: headerSpeedDial01
      },
      children: [{
        path: "",
        component: results2,
        name: "dbdocbaseind"
      }]
    },


    //---------------- db doc independet
    {
      path: "/spdoc",

      name: "spdocind",
      components: {
        default: spdoc,
        // speedDialMenu: headerSpeedDial01
      },
      children: [{
        path: "",
        component: results2,
        name: "spdocbaseind"
      }]
    },

    //-----------------------------

    {
      path: "/createtable",
      name: "createtablei",
      components: {
        default: createTable,

      }
    },


    //-----------------------------

    {
      path: "/dirtree",
      name: "dirtree",
      components: {
        default: dirtree,
        speedDialMenu: headerSpeedDial01
      }
    },

    //-----------------------------

    {
      path: "/multifile",
      name: "multiifsfile",
      components: {
        default: multifile,
        speedDialMenu: headerSpeedDial01
      }
    },

    {
      path: "/gmake",
      name: "gmake",
      components: {
        default: gmake,
        speedDialMenu: headerSpeedDial01
      }
    },

    {
      path: "/sshrun",
      name: "sshrun",
      components: {
        default: sshrun,
      }
    },
    //-----------------------------
    {
      path: "/gitdiff",
      name: "gitdiff",
      components: {
        default: gitdiff,
      }
    },
    //-----------------------------
    {
      path: "/isource",
      name: "isource",
      components: {
        default: isource,
        speedDialMenu: headerSpeedDial01
      }
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
    },
  ]
});
