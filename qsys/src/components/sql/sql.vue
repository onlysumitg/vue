<template>
  <v-container flex id="scroll-target" class="page-container23" style="margin-left:1px">
    <v-layout id="tryingg" fluid row style="padding:5px">
      <v-flex key="v1" xs4>
        <v-tabs v-model="active" dark grow slider-color="red">
          <v-tab v-for="n in 4" :key="n" ripple>
            <span v-if="n==1">RUN SQL</span>
            <span v-if="n==2">Saved</span>
            <span v-if="n==3">History</span>
            <span v-if="n==4">More Stuff</span>
          </v-tab>
          <v-tab-item v-for="n2 in 4" :key="'n2'+n2">
            <v-card flat>
              <v-card-text v-if="n2==1">
                <sqlquery :currentSQL="selectedSQL"></sqlquery>
              </v-card-text>
              <v-card-text v-if="n2==2">
                <querylist
                  :reload="reloadSaved"
                  @selectedquery="selectedSQL = $event; tabIndex = 't0' "
                  qtype="S"
                ></querylist>
              </v-card-text>
              <v-card-text v-if="n2==3">
                <querylist
                  :reload="reloadHistory"
                  @selectedquery="selectedSQL = $event; tabIndex = 't0'"
                  qtype="H"
                ></querylist>
              </v-card-text>
              <v-card-text v-if="n2==4">
                <settings></settings>
              </v-card-text>
            </v-card>
          </v-tab-item>
        </v-tabs>
      </v-flex>
      <v-divider vertical></v-divider>
      <v-flex key="v2" xs8 sytle="z-index:190">
        <v-card flat>
          <router-view></router-view>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import sqlquery from "./sqlquery";
import querylist from "./querylist";
// import results from "./results";
// import results2 from "./results2";
// import libList from "./../servers/joblibl";
import settings from "./../settings/settings";
export default {
  components: {
    sqlquery,
    querylist,
    // results,
    // results2,
    // libList
    settings
  },
  updated() {
    // this.tabIndex = 2;
  },
  mounted() {},

  data() {
    return {
      xtrue: true,
      sqlToRun: "",
      tabIndex: "t0",
      selectedSQL: "",
      reloadHistory: false,
      reloadSaved: false,
      tabIndexResult: "x"
    };
  },
  //---------------------------
  methods: {
    setupListeners() {
      eventBus.$on("updateHistorySQL", data => {
        this.reloadHistory = data;
      });

      eventBus.$on("updateSavedSQL", data => {
        this.reloadSaved = data;
      });
    },
    //-----------------------------------------------
    turnOffListeners() {
      eventBus.$off("updateHistorySQL");
    },
    //-----------------------------------------------
    tabUpdated: function(id) {
      this.tabIndex = id;
    },
    //-----------------------------------------------

    onScroll(e) {
      eventBus.$emit("runsql3SingleRecordDataScroll", e);
    }
  }
};
</script>

<style>
</style>

<style lang="scss" scoped>
.page-container23 {
  height: calc(100vh - 65px);
  max-height: calc(100vh - 65px);
  overflow: scroll;
  margin-right: 1px;
  padding: 0;
}

.navbar-brand {
  color: #000;
}
.stickyHead {
  position: sticky;
  background-color: #cfe3fa;
  top: 0;
  z-index: 7;
}
.main-screen {
  width: 100vh;
  height: 95vw;
}

.md-tabs {
  margin-bottom: 24px;
}

.md-drawer {
  width: 100%;
}

div.fixed {
  position: fixed;
  left: 0;
  top: 0;
  background-color: #cfe3fa;

  z-index: 9999;
}
</style>
