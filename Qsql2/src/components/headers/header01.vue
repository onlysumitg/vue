<template>
  <nav class="navbar navbar-expand-md navbar-dark bg-primary">
    <!-- Navbar content -->
    <a class="navbar-brand" href="/#/sql" style="color: white">{{topTitle}}</a>
    <div class="collapse navbar-collapse navbar-right" id="navbarNav">
      <ul class="navbar-nav navbar-right">
        <router-link class="nav-item" :to="{ name: 'servers'}" tag="li" active-class="active" exact>
          <a class="nav-link">Servers</a>
        </router-link>
        <router-link
          class="nav-item"
          :to="{ name: 'dbdocbaseind'}"
          tag="li"
          active-class="active"
          exact
        >
          <a class="nav-link">DB Doc</a>
        </router-link>

        <router-link
          class="nav-item"
          :to="{ name: 'createtablei'}"
          tag="li"
          active-class="active"
          exact
        >
          <a class="nav-link">Create Table</a>
        </router-link>
      </ul>
    </div>
  </nav>
</template>
<script>
export default {
  components: {},
  updated() {},
  mounted() {},

  computed: {
    topTitle: function() {
      if (topTitle.topTitle == undefined) {
        return "QSQL";
      } else {
        return topTitle.topTitle;
      }
    }
  },
  data() {
    return {
      serverName: "QSQL"
    };
  },
  //---------------------------
  methods: {
    setupListeners() {
      eventBus.$on("updatetitle", data => {
        // alert(data);
        this.serverName = data;

        if (this.title.trim() === "") {
          this.serverName = "QSQL";
        }
      });
    },
    //-----------------------------------------------
    turnOffListeners() {
      eventBus.$off("updatetitle");
      this.serverName = "QSQL";
    }
  }
};
</script>

<style lang="scss" scoped>
.navbar-brand {
  color: #000;
}
.navbar {
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  z-index: 999999;
  height: 50px;
}
</style>
