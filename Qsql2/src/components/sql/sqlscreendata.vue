<template>
  <div style="padding:10px; " class="h-100">
    <md-toolbar v-if="queryId>0" class="md-transparent" md-elevation="0">
      <div class="md-toolbar-section-start">
        <v-chip @click="loadQuery(queryId)" label large color="transparent" text-color="black">
          <span class="title font-weight-light">{{queryId}}. {{queryHeading}}</span>
          <v-icon right>mdi-refresh</v-icon>
        </v-chip>
        <md-progress-bar class="md-accent" v-if="xloading" md-mode="indeterminate"></md-progress-bar>
      </div>
    </md-toolbar>
    <br />

    <div class="row" style="margin:5px">
      <div class="col-2" v-for="(paramName,indx) in getParameterList" :key="'xx'+indx">
        <v-text-field
          @blur="setValues(paramName, $event)"
          color="blue"
          hide-details
          :label="paramName"
        ></v-text-field>
      </div>
    </div>
    <br />
    <div v-if="queryId>0" class="row">
      <div class="col-2">
        <v-btn color="blue" text-color="white" @click="emitSQLToRun2('ff')">
          Submit
          <v-icon right>mdi-play</v-icon>
        </v-btn>
      </div>
    </div>
    <br />
    <br />

    <router-view></router-view>
  </div>
</template>
<script>
export default {
  props: {
    queryId: {
      type: Number,
      required: false,
      default: -1
    }
  },
  watch: {
    queryId(valx) {
      //alert("valx " + valx);
      if (valx > 0) {
        this.currentSQL = "";
        this.loadQuery(valx);
      }
    }
  },
  beforeRouteLeave(to, from, next) {
    this.beforeChangeRoute(to, from, next);
  },

  computed: {
    //---------------------------------
    ddValue: function() {
      return this.valueData;
    },

    //---------------------------------
    getParameterList: function() {
      var paramRegex = /(\$\$(.*?)\$\$)/;
      var result;
      // while ((result = paramRegex.exec(this.sqlToProcess)) !== null) {
      //   console.log(result);
      // }

      var matched = [];

      var instring = this.sqlToProcess;
      var match;
      while ((match = paramRegex.exec(instring)) != null) {
        console.log(instring);
        instring = instring.replace(paramRegex, " ");

        if (!matched.includes(match[2])) matched.push(match[2]);

        console.log(match[1]);
        console.log(match[2]);
      }

      // var arrayX = instring.matchAll(paramRegex);
      // for (const match of arrayX) {
      //   console.log(match);
      //   console.log(match.index);
      // }
      return matched;
    },

    //---------------------------------
    getParameterListwithDelimiter: function() {
      var paramRegex = /(\$\$(.*?)\$\$)/;
      var result;
      // while ((result = paramRegex.exec(this.sqlToProcess)) !== null) {
      //   console.log(result);
      // }

      var matched = [];

      var instring = this.sqlToProcess;
      var match;
      while ((match = paramRegex.exec(instring)) != null) {
        console.log(instring);
        instring = instring.replace(paramRegex, " ");

        if (!matched.includes(match[1])) matched.push(match[1]);

        console.log(match[1]);
        console.log(match[2]);
      }

      // var arrayX = instring.matchAll(paramRegex);
      // for (const match of arrayX) {
      //   console.log(match);
      //   console.log(match.index);
      // }
      return matched;
    }
  },
  //------------------------------------------------------------------------------------------
  data: function() {
    return {
      sqlToProcess: "",
      queryHeading: "",
      valueData: {}
    };
  },
  //------------------------------------------------------------------------------------------
  methods: {
    setupListeners() {},
    //-----------------------------------------------
    turnOffListeners() {},
    //--------------------------------
    initialize() {},
    //----------------------------------

    setValues(key, event) {
      //  alert("kk");
      console.log("====================================");

      this.valueData["" + key] = event.target.value;
      console.log("-------------------------------");
      console.log(this.valueData);
      console.log("====================================");
    },

    //-----------------------------------------------
    //---------------------------------------
    loadQuery(valcc) {
      var data = {
        queryId: valcc
      };

      var vm = this;

      this.runWebService(
        "ss/loadone",
        data,
        function() {},
        function(response) {
          if (response.data.status == "S") {
            vm.queryHeading = response.data.data.screensql.name;

            vm.sqlToProcess = response.data.data.screensql.query;
            //vm.groups = respons.data.groups;
          } else {
            vm.$notify({
              type: "danger",
              title: respons.data.message
            });
          }
        },
        function(error) {}
      );
    },

    //---------------------------------------------------
    emitSQLToRun2(sqltoRun) {
      //alert("ok");
      var vm = this;
      // var instring = this.sqlToProcess;

      // var params = this.getParameterListwithDelimiter;
      // _.forEach(params, function(value) {
      //   var paramRegex2 = /\$/g;
      //   var value2 = _.replace(value, paramRegex2, "");

      //   var paramValue = vm.valueData["" + value2];
      //   // alert(value + " ::: " + value2 + " ::: " + paramValue);
      //   var paramRegex3 = new RegExp(RegExp.escape(value), "g");
      //   instring = instring.replace(paramRegex3, paramValue);
      // });

      //  alert(instring);

      var params = this.getParameterList;
      var paramPair = "";
      _.forEach(params, function(value) {
        var paramValue = vm.valueData["" + value];
        if (typeof paramValue === "undefined" || paramValue === null) {
          paramValue = "";
        }
        paramPair = paramPair + value + "=" + paramValue + " ;";
      });
      var sqldata3 = {};
      sqldata3.serverId = this.$session.get("currentserver");
      sqldata3.requestIdToProcess = "";
      sqldata3.requestIdToClose = "";

      sqldata3.sqlsqlToRun =
        "@rscreensql @id " + this.queryId + " @parm " + paramPair;

      eventBus.$emit("runsql3", sqldata3);
    }
    //-----------------------------------------run selected----------

    //---------------------------------------------------
  }
};
</script>

<style>
.btnc {
  position: sticky;
  top: 0;
  margin: 5px;
}
</style>
