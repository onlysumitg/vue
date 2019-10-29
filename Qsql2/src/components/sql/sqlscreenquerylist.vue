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
      <div v-for="query in filteredQueryList" :key="query.id">
        <div class="card">
          <div class="card-header">{{query.id}}. {{query.name}}</div>
          <div class="card-body">
            <pre>{{query.desc}}</pre>
            <!-- <hr />
            <pre>{{query.query}}</pre>-->
            <button v-if="isAdmin" @click="editQuery(query)" class="btn btn-link">Edit</button>
            <button @click="runQuery(query)" class="btn btn-primary">Run >>></button>
          </div>
        </div>
      </div>
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
