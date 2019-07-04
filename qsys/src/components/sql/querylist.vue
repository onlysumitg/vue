<template>
  <v-layout>
    <v-flex>
      <v-card>
        <v-toolbar flat>
          <v-text-field v-model="search" label="Search" clearable></v-text-field>
          <v-spacer></v-spacer>

          <v-btn icon @click="loadQueryList()">
            <v-icon>refresh</v-icon>
          </v-btn>
        </v-toolbar>
        <v-divider></v-divider>
        <div
          v-ripple
          @click="selectQuery(query)"
          v-for="query in filteredQueryList"
          :key="query.id+'ddd'"
          style="padding:4px"
        >
          <div class="body-1 font-weight-bold">{{query.heading}}</div>
          <div class="font-weight-light caption">{{query.savedOn}}</div>
          <br>
          <pre><p>{{query.sql}}</p></pre>

          <v-divider :key="query.id+'d'"></v-divider>
        </div>
      </v-card>
    </v-flex>
  </v-layout>

  <!-- ======================2===============-->
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
    this.loadQueryList();
  },

  watch: {
    reload(newV) {
      //if (newV) this.loadQueryList();
    }
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
          vm.reload = false;
        },
        function(respons) {
          //  console.log(respons);
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
