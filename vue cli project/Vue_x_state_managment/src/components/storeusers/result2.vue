<template>
    <div>
        <h1> using MapGetter</h1>
        <p>double counter : {{doubleCounter}}</p>
        <p>Click counter: {{clickCounter}}</p>
    </div>
</template>
<script>

import {mapGetters} from  'vuex';
export default {
    computed:
     mapGetters([
         "doubleCounter","clickCounter"
     ])

     // in this case we can not use any other computed property here 
     //  as mapGetters is itself a object
     //
     //   computed: {
        //  ...mapGetters([    // the ... is js version 6 >> so might need to add a new bable package
                                                // npm install --save--dev babel-preset-stage-2
        //  "doubleCounter","clickCounter"
        //     ]),
        // otherPro(){},
        //  }
    
    
}
</script>
