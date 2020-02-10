<template>
  <div>
    <md-progress-bar class="md-accent" v-if="xloading" md-mode="indeterminate"></md-progress-bar>

    <md-toolbar class="md-transparent" md-elevation="0">



      <div style="width: 80%;">
        <md-field>
          <label>Search</label>
          <md-input v-model="search"></md-input>
        </md-field>


        <md-field>
          <label for="searchCatagory">Filter By Category</label>
          <md-select v-model="searchCatagory" name="searchCatagory" id="searchCatagory">
            <md-option value="*all">All</md-option>
            <md-option v-for="(xVal,indx) in categoryList" :key="indx + 'ccatg'" :value="xVal">{{xVal}}</md-option>
          </md-select>
        </md-field>
      </div>



      <div class="md-toolbar-section-end">
        <md-button class="md-icon-button md-dense" @click="loadQueryList()">
          <md-icon>refresh</md-icon>
        </md-button>
      </div>
    </md-toolbar><br/>
    <v-divider></v-divider>

    <div class="overflowscrollyonly" style="height: calc(100vh - 250px) ">
      <!-- ====================2=================-->

      <div v-for="(category,index) in filteredCatagoryList">
        <v-list three-line subheader>
          <v-subheader ><p class="subtitle-1	 font-weight-black		">{{category}}<p></p></v-subheader>

          <template v-for="(query, index) in filteredQueryListByCategory(category)">

            <v-list-tile @click="runQuery(query)" :key="query.id + 'sc'+index" avatar ripple>

              <v-list-tile-avatar> {{query.id}}.</v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-title>  {{query.name}}</v-list-tile-title>
                <v-list-tile-sub-title >{{query.desc}} </v-list-tile-sub-title>
                <v-list-tile-sub-title v-if="isAdmin">
                 <strong>Owner: {{query.owner}}</strong>
                </v-list-tile-sub-title>
              </v-list-tile-content>
              <v-list-tile-action>

                <v-btn @click="editQuery(query)" v-if="query.editable" color="white" icon>
                  <v-icon color="black">mdi-pencil-outline</v-icon>
                </v-btn>
              </v-list-tile-action>
            </v-list-tile>

          </template>
        </v-list>
        <div v-if="filteredQueryListByCategory(category).length <=0">
          <center class="title font-weight-light">No record found</center>
        </div>

        <v-divider></v-divider>
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
      processing: false,
      categoryList:[],
        searchCatagory:""
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
          query.name.toUpperCase().match(tempSearch)  ||
          query.category.toUpperCase().match(tempSearch)
        );
      });
    },
      filteredCatagoryList() {
          var tempSearch = this.searchCatagory.toUpperCase();
          if (tempSearch.trim().lenthg == 0) return this.categoryList;
          if (tempSearch.trim() == "*ALL") return this.categoryList;
          return this.categoryList.filter(query => {
              return (

                  query.toUpperCase().match(tempSearch)
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

      //----------------------------

      filteredQueryListByCategory(category) {

          if(_.isUndefined(this.filteredQueryList) || _.isEmpty(this.filteredQueryList) || this.filteredQueryList.length<=0)
          {
              return this.filteredQueryList;
          }
          return this.filteredQueryList.filter(query => {
              return (

                  query.category.toUpperCase() == category
              );
          });
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
          vm.categoryList = [];
        },
        function(respons) {
          //   vm.$notify("again");
          //  //console.log(respons);
          if (respons.data.status == "s" || respons.data.status == "S") {
            respons.data.data.screensqls.forEach(query => {
              vm.querylist.push(query);
            });

              respons.data.data.uniquecategories.forEach(catex => {
                  vm.categoryList.push(catex);
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
