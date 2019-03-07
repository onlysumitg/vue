import axios from "axios";
import * as monaco from 'monaco-editor';
import "./vkbeautify";


window._ = require("lodash");
window.Popper = require("popper.js").default;

window.axios = axios;


window.TableExport = require("tableexport");

self.MonacoEnvironment = {
  getWorkerUrl: function (moduleId, label) {
    alert(moduleId)
    if (label === 'json') {
      return './json.worker.bundle.js';
    }
    if (label === 'css') {
      return './css.worker.bundle.js';
    }
    if (label === 'html') {
      return './html.worker.bundle.js';
    }

    if (label === 'typescript' || label === 'javascript') {
      return './ts.worker.bundle.js';
    }
    //return './sql.worker.bundle.js';
    return './editor.worker.bundle.js';
  }
}

window.monacoxx = monaco.editor;
//new TableExport(document.getElementsByTagName("table"));

//window.acehtml = require("vue2-ace-editor/node_modules/brace/mode/html");
//window.acethemechrome = require("vue2-ace-editor/node_modules/brace/theme/chrome");
//const sToken = window.$cookies.get("QSQL_TOKEN");

window.axios.defaults.baseURL = "http://localhost:7007";
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
