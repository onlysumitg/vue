 
import login from "./components/login/login.vue";
import loginentry from "./components/login/loginentry.vue";
import forgotpassword from "./components/login/forgotpassword.vue";

import servers from "./components/servers/servers.vue";


export const routes = [
  //{ path: "", component: Home },
 

  { path: "/login", component: login , name:"Login",
  children :[
    {path:'', component:loginentry},
    { path: 'reset', component: forgotpassword  }, 
     
  ]},


  { path: "/servers", component: servers , name:"servers",},
   //----------------------------- common redirect >> /redirect-me will go to user
    {path:'/redirect-me2', redirect:{name:'Login'}},

  // --------- everything else to to home
   {path:'/*', redirect:"/login"},

];
//http://localhost:8080/#/
//http://localhost:8080/#/user  >> why #
//
//
//   # is default by routes
//            >>  without this # every request will goto to the server
//  check new VueRouter({mode:history})
//                      >> mode : hash >> default cause # in the url

//---------------------
// add variables in the routes
//-----------------------

//   { path: "/user/:id", component: user }  >> add a variable with name "id" and its required
// else use { path: "/user", component: user }  >
