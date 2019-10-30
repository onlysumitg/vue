<template>
  <div>
    <md-progress-bar class="md-accent" v-if="xloading" md-mode="indeterminate"></md-progress-bar>

    <md-toolbar class="md-transparent" md-elevation="0">
      <div style="width: 80%;">
        <md-field>
          <label>Search</label>
          <md-input v-model="search"></md-input>
        </md-field>
      </div>
      <div class="md-toolbar-section-end">
        <md-button class="md-icon-button md-dense" @click="loadQueryList()">
          <md-icon>refresh</md-icon>
        </md-button>
      </div>
    </md-toolbar>

    <div class="overflowscrollyonly" style="height: calc(100vh - 150px) ">
      <!-- ====================2=================-->

      <v-list two-line>
        <template v-for="(query, index) in filteredQueryList">
          <v-list-tile @click="runQuery(query)" :key="query.id" avatar ripple>
            <v-list-tile-avatar>{{query.id}}.</v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title>{{query.name}}</v-list-tile-title>
              <v-list-tile-sub-title class="text--primary">{{query.desc}}</v-list-tile-sub-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-btn @click="editQuery(query)" v-if="isAdmin" color="white" icon>
                <v-icon color="black">mdi-pencil-outline</v-icon>
              </v-btn>
            </v-list-tile-action>
          </v-list-tile>
          <v-divider v-if="index   < filteredQueryList.length" :key="index"></v-divider>
        </template>
      </v-list>
    </div>
    <!-- ======================2===============-->
    <br />
    <br />
    <br />
    <br />
  </div>
</template>
<script>
export default {
  props: {},
  data: function() {
    return {
      search: "",
      querylist: [],
      processing: false
    };
  },

  computed: {
    filteredQueryList() {
      var tempSearch = this.search.toUpperCase();
      if (tempSearch.trim().lenthg == 0) return this.querylist;

      return this.querylist.filter(query => {
        return (
          query.desc.toUpperCase().match(tempSearch) ||
          query.query.toUpperCase().match(tempSearch) ||
          query.name.toUpperCase().match(tempSearch)
        );
      });
    }
  },
  mounted() {
    //this.loadQueryList();
  },

  watch: {},
  methods: {
    deleteQuery() {},
    //---------------------------------------

    editQuery(query) {
      eventBus.$emit("screensql_edit", query.id);
    },
    //---------------------------------------

    runQuery(query) {
      eventBus.$emit("screensql_run", query.id);
    },
    //-------------------------
    initialize() {
      this.loadQueryList();
    },
    //---------------------------------------
    loadQueryList() {
      this.loading = true;
      var vm = this;
      this.runWebService(
        "ss/getlist",
        {},
        function() {
          vm.querylist = [];
        },
        function(respons) {
          //   vm.$notify("again");
          //  console.log(respons);
          if (respons.data.status == "s" || respons.data.status == "S") {
            respons.data.data.screensqls.forEach(query => {
              vm.querylist.push(query);
            });
          } else {
            vm.$notify(respons.data.message);
          }
        },
        function(error) {}
      );
    }
  }
};
</script>
<style scoped>
</style>
