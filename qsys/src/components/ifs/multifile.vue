<template>
  <div id="app" class="grid-container">
    <v-app id="inspire" v-show="items.length>0">
      <div>
        <v-tabs v-model="currentItem" dark>
          <v-tab v-for="item in items" :key="item.hashCode" :href="'#tab-' + item.hashCode">
            <span v-on="on">{{ item.filename }}</span>

            <button
              style="color:white"
              @dblclick="remove(item, $event)"
              type="button"
              class="btn btn-link"
            >X</button>
          </v-tab>

          <v-menu v-if="more.length" bottom class="v-tabs__div" left>
            <template v-slot:activator="{ on }">
              <a class="v-tabs__item" v-on="on">
                more
                <v-icon>arrow_drop_down</v-icon>
              </a>
            </template>
            <v-list class="grey lighten-3">
              <v-list-tile
                v-for="item in more"
                :key="item.hashCode"
                @click="addItem_more(item)"
              >{{ item.filename }}</v-list-tile>
            </v-list>
          </v-menu>
        </v-tabs>

        <v-tabs-items v-model="currentItem">
          <v-tab-item
            v-for="item in items.concat(more)"
            :key="item.hashCode"
            :value="'tab-' + item.hashCode"
          >
            <fileEditor :filePath="item.filepath"></fileEditor>
          </v-tab-item>
        </v-tabs-items>
      </div>
    </v-app>
  </div>
</template>
<script>
import fileEditor from "./editIfsFile.vue";
export default {
  components: {
    fileEditor
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
    text:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
  }),

  methods: {
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
      this.addItem(this.createNewItemForPath("/home/sgoyal/makefile"));
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
<style>
.v-window__container--is-active {
  overflow: visible !important;
}

a:hover {
  text-decoration: none !important;
}

.v-tabs__item {
  font-size: 12px;
}
.grid-container {
  height: auto;
  max-height: 100vh;
  height: calc(100%-50px);
  padding-top: 50px;
  border: 2px solid red;
}
</style>