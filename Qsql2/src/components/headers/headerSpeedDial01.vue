  
<template>
  <v-speed-dial
    v-model="fab"
    bottom
    left
    direction="top"
    open-on-hover
    transition="slide-y-reverse-transition"
    fixed
    style="z-index:999999999999999999999"
  >
    <template v-slot:activator>
      <v-btn v-model="fab" color="blue darken-3" dark fab>
        <v-icon>list</v-icon>
        <v-icon>close</v-icon>
      </v-btn>
    </template>
    <v-btn style="width:200px" :to="{ name: 'loginentry'}" color="black">Logout</v-btn>
    <v-btn style="width:200px" :to="{ name: 'settings'}" color="black">Settings</v-btn>
    <v-btn style="width:200px" :to="{ name: 'servers'}" color="black">Servers</v-btn>
    <v-btn style="width:200px" :to="{ name: 'dbdocbaseind'}" color="black">DB Docs</v-btn>
    <v-btn style="width:200px" :to="{ name: 'spdocbaseind'}" color="black">SP Docs</v-btn>

    <v-btn style="width:200px" :to="{ name: 'createtablei'}" color="black">&nbsp &nbsp Create Table</v-btn>
    <v-btn style="width:200px" :to="{ name: 'dirtree'}" color="black">IFS</v-btn>
    <v-btn style="width:200px" :to="{ name: 'basesql'}" color="black">SQL</v-btn>
  </v-speed-dial>
</template>
<script>
export default {
  name: "ButtonRouter",
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
      serverName: "QSQL",
      fab: false
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
