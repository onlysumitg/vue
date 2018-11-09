<template>
    <div class="h-100">
              <div class="input-group mb-3">
  <div class="input-group-prepend">
    <span class="input-group-text" id="inputGroup-sizing-default">Search</span>
  </div>
  <input type="text" v-model="search" class="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default">
</div>
             <div @click="selectServer(server)"  class="card" v-for="server in filteredServerList" :key="server.id">
               <div class="card-body">
     <h6 class="card-subtitle mb-2">{{server.serverName}}</h6>
             
                 <p class="card-text"><small class="text-muted">{{server.userName}}@{{server.serverIP}}</small>
                 <span v-if="server.ssl" class="badge badge-pill badge-dark float-right">SSL</span>
                 </p>
                 
</div>
                  
             </div>
       
    </div>
</template>
<script>


export default {
  props:{

  },
  data: function() {
    return {
      search:"",
      serverlist: [],
      serverProto:{
            "id": 0,
            "serverName": "",
            "serverIP": "",
            "userName": "",
            "password": "",
            "ssl": false,
            "libl":[]
      }
    };
  },

  computed:{

      filteredServerList(){
        var tempSearch =this.search.toUpperCase();
        if(tempSearch.trim().lenthg == 0) return this.serverlist;

        return this.serverlist.filter(server=>  {
         return ( server.serverName.toUpperCase().match(tempSearch) ||
         server.serverIP.toUpperCase().match(tempSearch)||
         server.userName.toUpperCase().match(tempSearch) )
        })
      },

  },
  mounted() {
    this.loadServerList();
  },

  methods:{
    selectServer(server){
       this.$emit("selectedserver",server)
    },
    loadServerList(){
      var vm = this;
       this.runWebService("s/getlist",{},
       function(){},
       function(respons){
         console.log(respons)
         if(respons.data.status=='s')
         {
           respons.data.servers.forEach(server => {
             vm.serverlist.push(server);
           });
         }
       },
       function(error){}
       );
    }
  }
};
</script scoped>
<style>
.card:hover {
    background-color: rgb(230, 230, 230);
    color: rgb(255, 255, 255);
}
</style>
