// array with objects
//        >> each object represents and route
//>> can lazy load these components (v-16-247)
import user from "./components/vueRoutes/User.vue";
import user2 from "./components/vueRoutes/User2.vue";
import UserStart from "./components/vueRoutes/UserStart.vue";
import UserDetail from "./components/vueRoutes/UserDetails.vue";
import UserEdit from "./components/vueRoutes/UserEdit.vue";

import Header from "./components/vueRoutes/header.vue";

import Home from "./Home.vue";
export const routes = [
  //{ path: "", component: Home },

  { path: "", name: 'Home', components:{
    default: Home,
    'header-top': Header,
  } },

  //----------------------------- Header at the bottom
  { path: "/user/:id", components :{
    default: user,
    'headerBottom': Header,
  }  },

  
  //----------------------------- with child route

  { path: "/user2", component: user2 , 
  children :[
    {path:'', component:UserStart},
    { path: ':id', component: UserDetail ,
     beforeEnter:(to,from,next)=>{
       console.log("at UserDetail >> beforeEnter")
        next();
    }},
    { path: ':id/edit', component: UserEdit, name:'userEdit' },
  ]},

   //----------------------------- common redirect >> /redirect-me will go to user
   {path:'/redirect-me', redirect:"/user2"},
   {path:'/redirect-me2', redirect:{name:'Home'}},

  // --------- everything else to to home
   {path:'/*', redirect:{name:'Home'}},

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
