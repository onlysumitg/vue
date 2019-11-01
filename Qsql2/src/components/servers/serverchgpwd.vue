<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <md-progress-bar class="md-accent" v-if="xloading" md-mode="indeterminate"></md-progress-bar>

      <template v-slot:activator="{ on }">
        <v-btn color="primary" dark v-on="on">Change IBM i password</v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">
            Change
            <strong>{{server.userName}}</strong>
            's
            password for
            <strong>{{server.serverName}}</strong>
          </span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12>
                <v-text-field
                  v-model="oldpassword"
                  label="Current Password*"
                  type="password"
                  required
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field v-model="newpassword" label="New Password*" type="password" required></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  v-model="newpasswordagain"
                  label="New Password Again*"
                  type="password"
                  required
                ></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="dialog = false">Cancel</v-btn>
          <v-btn color="blue darken-1" flat @click="chgpwd">Update Password</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>
<script>
export default {
  props: {
    server: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    dialog: false,
    oldpassword: "",
    newpassword: "",
    newpasswordagain: ""
  }),

  //=====================================
  methods: {
    chgpwd() {
      if (
        this.isEmpty(this.oldpassword) ||
        this.isEmpty(this.newpassword) ||
        this.isEmpty(this.newpasswordagain)
      ) {
        this.$notify({
          type: "danger",
          title: "Nope!",
          message: "All Fileds are required"
        });
        return;
      }

      if (this.newpassword != this.newpasswordagain) {
        this.$notify({
          type: "danger",
          title: "Nope!",
          message: "Password does not match."
        });
        return;
      }

      this.showError = false;
      this.errorMessage = "";
      var vm = this;
      this.runWebService(
        "s/changepwd",
        {
          serverId: vm.server.serverId,
          oldpassword: vm.oldpassword,
          newpassword: vm.newpassword
        },
        function() {
          vm.processing = true;
        },
        function(respons) {
          if (respons.data.status == "s" || respons.data.status == "S") {
            vm.server.password = vm.newpassword;
            vm.$notify({
              type: "success",
              title: "Done",
              message: "Password changed sucessfully"
            });
            vm.dialog = false;
          } else {
            vm.$notify({
              type: "danger",
              title: "Error",
              message: respons.data.message
            });
          }
        },
        function(error) {
          vm.processing = false;
          vm.showError = true;
          vm.errorMessage = "" + error;
        }
      );
    }
  }
};
</script>