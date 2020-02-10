<template>

  <span class="md-title">{{serverNameXX}}</span>

</template>
<script>
export default {
    data: function() {
        return {
            serverNameXX : this.getConnectedServerName2()
        }


    },

    methods: {
        initialize() {
            this.serverNameXX =  this.getConnectedServerName2()

        },
        setupListeners() {

            eventBus.$on("serverischanged", data => {

                this.serverNameXX = this.getConnectedServerName2()
            });
        },
        turnOffListeners() {

            eventBus.$off("serverischanged");
        },




    }
}

</script>


