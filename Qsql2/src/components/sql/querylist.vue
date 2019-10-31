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
      <!-- <div @click="selectQuery(query)" v-for="query in filteredQueryList" :key="query.id">
        <div v-if="query.type !='H'" class="card">
          <div class="card-header">{{query.heading}}</div>
          <div class="card-body">
            <pre>{{query.sql}}</pre>
          </div>
        </div>
        <div v-else class="card">
          <div class="card-header">{{query.savedOn}}</div>
          <div class="card-body">
            <pre>{{query.sql}}</pre>
          </div>
        </div>
      </div>-->

      <v-list two-line>
        <template v-for="(query, index) in filteredQueryList">
          <v-list-tile @click="selectQuery(query)" :key="query.id+' xx '+index" avatar ripple>
            <v-list-tile-avatar>{{index+1}}.</v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title v-if="query.type !='H'">{{query.heading}}</v-list-tile-title>
              <v-list-tile-title v-else>{{query.savedOn}}</v-list-tile-title>
              <v-list-tile-sub-title v-html="query.sql"></v-list-tile-sub-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-btn @click="deleteQuery(query)" color="white" icon>
                <v-icon color="red">mdi-delete-outline</v-icon>
              </v-btn>
            </v-list-tile-action>
          </v-list-tile>
          <v-divider v-if="index   < filteredQueryList.length" :key="'dd'+ index"></v-divider>
        </template>
      </v-list>

      <div v-if="filteredQueryList.length <=0">
        <center class="title font-weight-light">No record found</center>
      </div>
    </div>
    <!-- ======================2===============-->
  </div>
</template>
<script>
export default {
  props: {
    qtype: {
      type: String,
      required: true
    },
    reload: {
      type: Boolean,
      required: true
    }
  },
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
          query.sql.toUpperCase().match(tempSearch) ||
          query.heading.toUpperCase().match(tempSearch)
        );
      });
    }
  },
  mounted() {
    //this.loadQueryList();
  },

  watch: {},
  methods: {
    deleteQuery(query) {
      var vm = this;
      this.runWebService(
        "r/deletequery",
        {
          queryId: query.queryId
        },
        function() {
          // vm.querylist = [];
          // vm.reload = false;
        },
        function(respons) {
          //  console.log(respons);
          if (respons.data.status == "s" || respons.data.status == "S") {
            vm.$notify({
              type: "success",
              title: "Done!!",
              message: "Query deleted sucessfully"
            });
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
    selectQuery(query) {
      this.$emit("selectedquery", query.sql);
    },
    //----------------------------
    loadQueryList() {
      var vm = this;
      this.runWebService(
        "r/getlist",
        {
          type: vm.qtype
        },
        function() {
          vm.querylist = [];
          vm.reload = false;
        },
        function(respons) {
          //  console.log(respons);
          if (respons.data.status == "s" || respons.data.status == "S") {
            respons.data.data.sqllist.forEach(query => {
              vm.querylist.push(query);
            });
          }
        },
        function(error) {}
      );
    }
  }
};
</script>
<style scoped>
.card:hover {
  background-color: rgb(230, 230, 230);
  color: rgb(255, 255, 255);
}
</style>
