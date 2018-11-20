<template>
  <div class="h-100">
 

        <md-field>
      <label>Search</label>
       <md-input v-model="search"></md-input>
    </md-field>

    <!-- ====================2=================-->
    <div @click="selectQuery(query)"   v-for="query in filteredQueryList" :key="query.id">
  
            <md-card  v-if="query.type !='H'" md-with-hover>
         <md-ripple>
             <md-card-header>
               <div class="md-subhead">{{query.heading}}</div>
             </md-card-header>
            <md-card-content>
              {{query.sql}}
            </md-card-content>
                    <md-card-actions>
          <md-button>Delete</md-button>
          
        </md-card-actions>
         </md-ripple>
      </md-card>

    
      <md-card v-else md-with-hover>
         <md-ripple>
             <md-card-header>
               <div class="md-subhead">{{query.savedOn}}</div>
             </md-card-header>
            <md-card-content>
              {{query.sql}}
            </md-card-content>
                    <md-card-actions>
          <md-button>Delete</md-button>
          
        </md-card-actions>
         </md-ripple>
      </md-card>

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
    this.loadQueryList();
  },

  methods: {
    deleteQuery() {},
    selectQuery(query) {
      this.$emit("selectedquery", query.sql);
    },
    loadQueryList() {
      var vm = this;
      this.runWebService(
        "r/getlist",
        {
          type: vm.qtype
        },
        function() {
          vm.querylist = [];
        },
        function(respons) {
          console.log(respons);
          if (respons.data.status == "s") {
            respons.data.sqllist.forEach(query => {
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
