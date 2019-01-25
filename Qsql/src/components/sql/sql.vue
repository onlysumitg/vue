<template>
  <div class="no-gutter h-100 w-100 d-flex">
    <div class="col-4 main-screen">
      <md-drawer class="md-elevation-2" md-persistent="full" :md-active.sync="xtrue">
        <md-tabs md-elevation="1" :md-active-tab="tabIndex" @md-changed="tabUpdated">
          <md-tab md-label="SQL" id="t0">
            <sqlquery :currentSQL="selectedSQL"></sqlquery>
          </md-tab>
          <md-tab md-label="Saved SQL" id="t1">
            <querylist
              :reload="reloadSaved"
              @selectedquery="selectedSQL = $event; tabIndex = 't0' "
              qtype="S"
            ></querylist>
          </md-tab>
          <md-tab md-label="History" id="t2">
            <querylist
              :reload="reloadHistory"
              @selectedquery="selectedSQL = $event; tabIndex = 't0'"
              qtype="H"
            ></querylist>
          </md-tab>

          <md-tab md-label="Lib List" id="t3">
            <libList></libList>
          </md-tab>
        </md-tabs>
      </md-drawer>
    </div>
    <div class="col-8 pt-3">
      <results2></results2>
      <!-- <results></results> -->
    </div>

    <!-- <md-speed-dial class="md-top-right md-fixed" md-direction="bottom" md-event="click">
      <md-speed-dial-target class="md-primary">
        <md-icon class="md-morph-initial">add</md-icon>
        <md-icon class="md-morph-final">close</md-icon>
      </md-speed-dial-target>

      <md-speed-dial-content>
        <md-button class="md-icon-button">
          <md-icon>directions</md-icon>
        </md-button>

        <md-button class="md-icon-button">
          <md-icon>streetview</md-icon>
        </md-button>
      </md-speed-dial-content>
    </md-speed-dial>-->
  </div>
</template>
<script>
import sqlquery from "./sqlquery";
import querylist from "./querylist";
import results from "./results";
import results2 from "./results2";
import libList from "./../servers/joblibl";

export default {
  components: {
    sqlquery,
    querylist,
    results,
    results2,
    libList
  },
  updated() {
    // this.tabIndex = 2;
  },
  mounted() {},

  data() {
    return {
      xtrue: true,
      sqlToRun: "",
      tabIndex: "t2",
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
    }
  }
};
</script>

<style lang="scss" scoped>
.main-screen {
  width: 100vh;
  height: 100vw;
}

.md-tabs {
  margin-bottom: 24px;
}

.md-drawer {
  width: 100%;
  overflow: inherit;
}
</style>
