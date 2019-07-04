<template>
  <md-speed-dial
    class="md-bottom-right md-fixed"
    md-direction="top"
    md-event="click"
    style="z-index:999999999999"
  >
    <md-speed-dial-target class="md-primary">
      <md-icon class="md-morph-initial">add</md-icon>
      <md-icon class="md-morph-final">close</md-icon>
    </md-speed-dial-target>

    <md-speed-dial-content>
      <md-button class="md-icon-button">
        <md-icon>directions</md-icon>
      </md-button>
      <md-button class="md-icon-button">
        <md-icon>directions</md-icon>
      </md-button>
      <md-button class="md-icon-button">
        <md-icon>directions</md-icon>
      </md-button>
      <md-button class="md-icon-button">
        <md-icon>directions</md-icon>
      </md-button>
      <md-button class="md-icon-button">
        <md-icon>directions</md-icon>
      </md-button>
      <md-button class="md-icon-button">
        <md-icon>directions</md-icon>
      </md-button>
      <md-button class="md-icon-button">
        <md-icon>directions</md-icon>
      </md-button>
      <md-button class="md-icon-button">
        <md-icon>directions</md-icon>
      </md-button>
      <md-button class="md-icon-button">
        <md-icon>directions</md-icon>
      </md-button>
      <md-button class="md-icon-button">
        <md-icon>directions</md-icon>
      </md-button>
      <md-button class="md-icon-button">
        <md-icon>directions</md-icon>
      </md-button>
      <md-button class="md-icon-button">
        <md-icon>directions</md-icon>
      </md-button>
      <md-button class="md-icon-button">
        <md-icon>directions</md-icon>
      </md-button>
      <md-button class="md-icon-button">
        <md-icon>streetview</md-icon>
      </md-button>
      <md-button class="md-icon-button">
        <md-icon>streetview</md-icon>
      </md-button>
      <md-button class="md-icon-button">
        <md-icon>streetview</md-icon>
      </md-button>
      <md-button class="md-icon-button">
        <md-icon>streetview</md-icon>
      </md-button>
      <md-button class="md-icon-button">
        <md-icon>streetview</md-icon>
      </md-button>
      <md-button class="md-icon-button">
        <md-icon>streetview</md-icon>
      </md-button>
      <md-button class="md-icon-button">
        <md-icon>streetview</md-icon>
      </md-button>
      <md-button class="md-icon-button">
        <md-icon>streetview</md-icon>
      </md-button>
      <md-button class="md-icon-button">
        <md-icon>streetview</md-icon>
      </md-button>
      <md-button class="md-icon-button">
        <md-icon>streetview</md-icon>
      </md-button>
      <md-button class="md-icon-button">
        <md-icon>streetview</md-icon>
      </md-button>
    </md-speed-dial-content>
  </md-speed-dial>
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
