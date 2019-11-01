/* eslint-disable */
import axios from "axios";
import papa from "papaparse";



import * as monacoWithRpg from "monaco-editor";

import "./vkbeautify";


window.axios = axios;
window.monacoWithRpg = monacoWithRpg


console.log("****************************************");
//new TableExport(document.getElementsByTagName("table"));

//window.acehtml = require("vue2-ace-editor/node_modules/brace/mode/html");
//window.acethemechrome = require("vue2-ace-editor/node_modules/brace/theme/chrome");
//const sToken = window.$cookies.get("QSQL_TOKEN");


axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
axios.defaults.headers.common["Access-Control-Allow-Methods"] =
  "POST, GET, PUT, DELETE, OPTIONS";
window.axios.defaults.headers.common["Access-Control-Allow-Headers"] =
  "Origin, X-Requested-With, Content-Type, Accept, Authorization";
window.axios.defaults.headers.common = {
  Accept: "application/json",
  "Content-Type": "application/json",
  Authorization: "sToken"
};

window.axios.defaults.baseURL = "http://localhost:7007"

window.axios
  .get("https://qsql-i.firebaseio.com/url.json")
  .then(response => {
    // alert("firebase " + window.axios.defaults.baseURL)
    //console.log(response);
    try {
      window.axios.defaults.baseURL = response.data.url;
    } catch (e) {

      //  console.log(e);
      window.axios.defaults.baseURL = "http://localhost:7007";
    }
  })
  .catch(err => {
    //alert(err);
    //  console.log(err);
    window.axios.defaults.baseURL = "http://localhost:7007";

  });


window._ = require("lodash");
//window.popper = require("popper.js").default;


window.papa = papa

//window.TableExport = require("tableexport");
