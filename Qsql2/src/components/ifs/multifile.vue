<template>
  <div id="app" class="d-flex grid-container">
    <v-app id="inspire" dark>
      <div style="height:48px ; ">
        <v-tabs v-model="currentItem" dark>
          <v-tab @click="addEmptyItem()">
            <a>+</a>
          </v-tab>
          <v-tab v-for="item in items" :key="item.hashCode" :href="'#tab-' + item.hashCode">
            <popper trigger="hover" :options="{placement: 'right' }">
              <div class="popper">{{ item.filepath }}</div>

              <a href="#" slot="reference" class="right">{{ item.filename }}</a>
            </popper>

            <button
              style="color:white"
              @dblclick="remove(item, $event)"
              type="button"
              class="btn btn-link"
            >x</button>
          </v-tab>
        </v-tabs>
      </div>
      <v-tabs-items v-model="currentItem">
        <v-tab-item
          v-for="item in items.concat(more)"
          :key="item.hashCode"
          :value="'tab-' + item.hashCode"
        >
          <fileEditor :filePath="item.filepath"></fileEditor>
        </v-tab-item>
      </v-tabs-items>
    </v-app>
  </div>
</template>
<script>
import fileEditor from "./editIfsFile.vue";
import Popper from "vue-popperjs";
import "vue-popperjs/dist/vue-popper.css";

export default {
  components: {
    fileEditor,
    popper: Popper
  },
  props: {
    filePath: {
      type: String,
      required: false
    }
  },
  watch: {
    filePath: function(valx) {
      //alert("ss" + valx);
      if (valx.trim().length > 0) {
        this.processNewItem(valx);
        this.filePath = "";
      }
    }
  },
  data: () => ({
    currentItem: "tab-Web",
    itemProto: {
      filename: "",
      filepath: "",
      hashCode: ""
    },
    items: [],
    more: [],
    fileCounter: 0,
    text:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
  }),

  methods: {
    setupListeners() {
      eventBus.$on("openIFSFileFromTree", data => {
        if (data.trim().length > 0) {
          this.processNewItem(data);
          this.filePath = "";
        }
      });
    },
    //-----------------------------------------------
    turnOffListeners() {
      eventBus.$off("openIFSFileFromTree");
    },
    addEmptyTab() {
      alert("adding new tab");
    },
    hashCode(thisString) {
      var hash = 0,
        i,
        chr;
      if (thisString.length === 0) return hash;
      for (i = 0; i < thisString.length; i++) {
        chr = thisString.charCodeAt(i);
        hash = (hash << 5) - hash + chr;
        hash |= 0; // Convert to 32bit integer
      }
      return hash;
    },
    //---------------------------------------------------------
    initialize() {
      // this.addItem(this.createNewItemForPath("/home/sgoyal/makefile"));
      //this.addItem(newItem);
    },

    //---------------------------------------------------------
    addEmptyItem() {
      this.fileCounter += 1;
      this.addItem(
        this.createNewItemForPath("/untitled__" + this.fileCounter + "__.txt")
      );
      //this.addItem(newItem);
    },

    //-----------------------------------------------------

    createNewItemForPath(path) {
      // check if path is already open

      var newItem = _.clone(this.itemProto);

      newItem.filepath = "" + path;

      newItem.filename = newItem.filepath.substring(
        newItem.filepath.lastIndexOf("/") + 1
      );
      newItem.hashCode = this.hashCode(newItem.filepath);

      return newItem;
    },

    //---------------------------------------------------------
    processNewItem(path) {
      var isThere = _.find(this.items, function(item) {
        try {
          return item.filepath == path;
        } catch (e) {
          return false;
        }
      });
      if (isThere === undefined || this.items.length <= 0) {
        this.addItem(this.createNewItemForPath(path));
      } else {
        this.$nextTick(() => {
          this.currentItem = "tab-" + isThere.hashCode;
        });
      }
    },
    //------------------------------------------
    remove(item) {
      _.remove(this.items, function(itt) {
        return item.filepath == itt.filepath;
      });
      this.$forceUpdate();
    },
    //------------------------------------------
    addItem(item) {
      //   alert("adding;");
      this.items.push(item);
      // if (this.items.length <= 5) {
      //   this.items.push(item);
      // } else {
      //   const removed = this.items.splice(0, 1);
      //   this.items.push(...this.more.splice(this.more.indexOf(item), 1));
      //   this.more.push(...removed);
      // }

      this.$nextTick(() => {
        this.currentItem = "tab-" + item.hashCode;
      });

      console.log(this.items);
    },
    //------------------------------------------
    addItem_more(item) {
      //   alert("adding;");

      const removed = this.items.splice(0, 1);
      this.items.push(...this.more.splice(this.more.indexOf(item), 1));
      this.more.push(...removed);

      this.$nextTick(() => {
        this.currentItem = "tab-" + item.hashCode;
      });

      console.log(this.items);
    }
  }
};
</script>
 

<style scoped>
.v-window__container--is-active {
  overflow: visible !important;
}

a:hover {
  text-decoration: none !important;
}

.grid-container {
  height: auto;
  max-height: 100vh;
}
</style>