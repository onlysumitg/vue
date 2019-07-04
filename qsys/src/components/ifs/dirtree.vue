
<template>
  <div>
    <div class="row">
      <div class="col-3 grid-container" style="z-index:9999">
        <v-card class="sidebar">
          <v-sheet class="pa-3 primary lighten-2">
            <v-text-field
              label="Path from Root"
              v-model="pathFromRoot"
              light
              flat
              solo-inverted
              hide-details
              loading-text="hold on"
              clearable
              clear-icon="mdi-close-circle-outline"
            ></v-text-field>
          </v-sheet>
          <v-card-text>
            <v-treeview
              :active.sync="active"
              :items="items"
              :load-children="fetchChildren"
              activatable
              open-all
              open-on-click
              item-key="path"
              transition
              loading-icon="mdi-reload"
            >
              <template v-slot:prepend="{ item, open }">
                <v-icon
                  @click="reload2(item,open)"
                  v-if="!item.file"
                >{{ open ? 'mdi-folder-download' : 'mdi-folder' }}</v-icon>
                <v-icon v-else>{{ getFileIcon(item.file) }}</v-icon>
              </template>
              <template v-slot:label="{ item }">
                <span
                  style="width:100%; text-overflow:ellipsis "
                  @dblclick="openFile(item)"
                  v-bind:class="{'text-danger': (item.file=='error')}"
                >{{item.name}}</span>
              </template>
              <!-- <template v-slot:append="{ item, open }">
                <v-icon
                  @click="openFile(item)"
                  v-if="item.file && item.readable"
                >mdi-file-document-edit</v-icon>
              </template>-->
            </v-treeview>
          </v-card-text>
        </v-card>
      </div>
      <div class="col-9">
        <fileEditor :filePath="selectedFile"></fileEditor>
      </div>
    </div>
  </div>
</template>
<script>
import fileEditor from "./multifile.vue";
export default {
  components: {
    fileEditor
  },
  data: () => ({
    counter: 0,
    tree: [],
    search: "",
    files: {
      html: "mdi-language-html5",
      js: "mdi-nodejs",
      node: "mdi-nodejs",
      json: "mdi-json",
      md: "mdi-markdown",
      pdf: "mdi-file-pdf",
      png: "mdi-file-image",
      jpg: "mdi-file-image",
      jpge: "mdi-file-image",
      gif: "mdi-gif",
      conf: "mdi-tune",
      doc: "mdi-file-word",
      docx: "mdi-file-word",
      txt: "mdi-file-document-outline",
      xls: "mdi-file-excel",
      java: "mdi-language-java",
      jar: "mdi-language-java",
      php: "mdi-language-php",
      npm: "mdi-npm-variant-outline",
      sql: "mdi-database",
      table: "mdi-database",
      rpg: "mdi-alpha-r",
      xml: "mdi-xml",
      rpgle: "mdi-alpha-r-box",
      sqlrpgle: "mdi-alpha-r-box-outline",
      makefile: "mdi-telegram",
      mbr: "mdi-alpha-m-box-outline",
      error: "mdi-alert-circle",
      default: "mdi-file-document-outline"
    },
    active: [],
    selectedFile: "",
    avatar: null,
    open: [],
    root: [],
    pathFromRoot: "",
    currentRoot: {}
  }),

  computed: {
    items() {
      //alert("items");
      var name = "/[root]";
      var path = "/";
      if (!_.isEmpty(this.pathFromRoot)) {
        name = this.pathFromRoot;
        path = this.pathFromRoot;
      }

      if (name == "/") {
        name = "/[root]";
      }

      this.currentRoot = {
        name: name,
        children: this.root,
        path: path
      };
      return [this.currentRoot];
    },
    selected() {
      alert("selected");
      return;
      if (!this.active.length) return undefined;

      const id = this.active[0];

      return this.root.find(user => user.id === id);
    }
  },

  watch: {
    currentRoot(newVal, oldVal) {
      //alert(oldVal.name);
      if (
        oldVal.children === undefined ||
        oldVal.path === undefined ||
        newVal.path == undefined
      ) {
        return;
      }
      if (
        oldVal.path.trim().toUpperCase() == newVal.path.trim().toUpperCase()
      ) {
        return;
      }
      oldVal.children.length = 0;
    }
  },

  methods: {
    initialize() {},
    openFile(item) {
      if (item.file && item.readable) {
        this.selectedFile = item.path;
      } else this.selectedFile = "";
    },
    //---------------------------------------------
    getFileIcon(file) {
      if (file in this.files) {
        return this.files[file];
      } else {
        return this.files.default;
      }
    },

    //------------------------------------------------
    reload2(item, open) {
      console.log("==reload==");
      console.log(item);
      if (open) this.fetchChildren(item);
    },
    reset() {
      this.open[0].children.length = 0;
    },
    fetchChildren(item) {
      // Remove in 6 months and say
      // you've made optimizations! :)
      console.log(item);
      // alert("fetchuser");
      // await pause(1500);
      //this.users = this.items2;
      var vm = this;
      this.setupAxios();
      var request = axios.post("ifs/list", {
        serverId: vm.$session.get("currentserver"),
        requestIdToProcess: "",
        path: item.path
      });

      vm.counter += 1;
      return request
        .then(res => {
          item.children.length = 0;
          if (res.data.status == "s") {
            item.children.push(...res.data.ifsList);
          } else {
            var errorChild = {};
            errorChild.file = "error";
            errorChild.name = res.data.message;
            errorChild.path = "";
            errorChild.readable = false;
            errorChild.permission = false;
            item.children.push(errorChild);
          }
        })

        .catch(err => console.warn(err));
    }
  }
};
</script> 
<style>
html,
body {
  height: auto;

  margin: 0;
  overflow: hidden;
}

.grid-container {
  height: auto;
  max-height: 100vh;
  height: calc(100%-50px);
  padding-top: 50px;
}
.sidebar {
  overflow: scroll;
  max-height: 100vh;
  height: 100%;
}
</style>
