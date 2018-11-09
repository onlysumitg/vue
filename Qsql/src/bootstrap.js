 
import axios from 'axios'; 
 
window._ = require('lodash');
window.Popper = require('popper.js').default;
 

 
window.axios = axios;
 

 

//const sToken = window.$cookies.get("QSQL_TOKEN");

window.axios.defaults.baseURL="http://localhost:7007";
axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
axios.defaults.headers.common["Access-Control-Allow-Methods"] =
  "POST, GET, PUT, DELETE, OPTIONS";
          window.axios.defaults.headers.common["Access-Control-Allow-Headers"] =
          "Origin, X-Requested-With, Content-Type, Accept, Authorization";
window.axios.defaults.headers.common = {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization:  "sToken"
          };


 