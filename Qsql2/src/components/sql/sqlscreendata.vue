<template>
  <div style="padding:10px; " class="h-100">
    <md-progress-bar class="md-accent" v-if="xloading" md-mode="indeterminate"></md-progress-bar>



    <md-toolbar v-if="queryId>0" class="md-transparent" md-elevation="0">

      <div class="md-toolbar-section-start">


        <v-chip @click="loadQuery(queryId)" label large color="transparent" text-color="black">
          <span class="title font-weight-light">   <div    class="md-body-2">{{queryCategory}}</div>{{queryHeading}}<div style="margin-top: 2px" class="md-body-2">{{queryDesc}}</div></span>

          <v-icon right>mdi-refresh</v-icon>
        </v-chip>

      </div>

    </md-toolbar>




    <form>
      <div class="row" style="margin:5px">
        <div class="col-sm-3" v-for="(parameter,indx) in getParameterList" :key="'requireeed'+indx">
          <v-text-field
            v-if="parameter.required"
            @blur="setValues(parameter.name, $event)"
            color="blue"
            hide-details
            :value="valueData[''+parameter.name]"
            :label="parameter.name + '*'"
            required
          ></v-text-field>
          <v-text-field
            :value="valueData[''+parameter.name]"
            v-if="!parameter.required"
            @blur="setValues(parameter.name, $event)"
            color="blue"
            hide-details
            :label="parameter.name"
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
    </form>
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
      eventBus.$emit("resetsql3", true);
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
      let paramRegex = /(\$\$(.*?)\$\$)/;
      let result;
      // while ((result = paramRegex.exec(this.sqlToProcess)) !== null) {
      //   //console.log(result);
      // }

      let matched = [];
      let matched2 = [];

      let instring = this.sqlToProcess;
      let match;
      while ((match = paramRegex.exec(instring)) != null) {
        ////console.log(instring);
        instring = instring.replace(paramRegex, " ");

        if (!matched.includes(match[2])) {
          matched.push(match[2]);
          let parameter = {};
          parameter.name = match[2];
          parameter.required = true;
          matched2.push(parameter);
        }

        //console.log(match[1]);
        //console.log(match[2]);
      }

      let paramRegexOptional = /(\$\#(.*?)\$\#)/;
      while ((match = paramRegexOptional.exec(instring)) != null) {
        //console.log(instring);
        instring = instring.replace(paramRegexOptional, " ");

        if (!matched.includes(match[2])) {
          matched.push(match[2]);
          let parameter = {};
          parameter.name = match[2];
          parameter.required = false;
          matched2.push(parameter);
        }

        //console.log(match[1]);
        //console.log(match[2]);
      }
      // var arrayX = instring.matchAll(paramRegex);
      // for (const match of arrayX) {
      //   //console.log(match);
      //   //console.log(match.index);
      // }
      return matched2;
    },

    //---------------------------------
    getParameterListwithDelimiter: function() {
      var paramRegex = /(\$\$(.*?)\$\$)/;
      var result;
      // while ((result = paramRegex.exec(this.sqlToProcess)) !== null) {
      //   //console.log(result);
      // }

      var matched = [];

      var instring = this.sqlToProcess;
      var match;
      while ((match = paramRegex.exec(instring)) != null) {
        //console.log(instring);
        instring = instring.replace(paramRegex, " ");

        if (!matched.includes(match[1])) matched.push(match[1]);

        //console.log(match[1]);
        //console.log(match[2]);
      }

      // var arrayX = instring.matchAll(paramRegex);
      // for (const match of arrayX) {
      //   //console.log(match);
      //   //console.log(match.index);
      // }
      return matched;
    }
  },
  //------------------------------------------------------------------------------------------
  data: function() {
    return {
      sqlToProcess: "",
      queryHeading: "",
      valueData: {},
      requiredRule: [v => !!v || "required"],
        queryDesc: "",
        queryCategory:"",
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
      this.valueData["" + key] = event.target.value;
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
              vm.queryDesc = response.data.data.screensql.desc;
              vm.queryCategory = response.data.data.screensql.category;
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

      var parameters = this.getParameterList;
      var paramPair = "";
      _.forEach(parameters, function(parameter) {
        var paramValue = vm.valueData["" + parameter.name];
        if (typeof paramValue === "undefined" || paramValue === null) {
          paramValue = "";
        }
        paramPair = paramPair + parameter.name + "=" + paramValue + " ;";
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
