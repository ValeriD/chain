import Vue from 'vue'

Vue.mixin({
    methods: {
        redirect: function(path, query){
            if(this.$router.currentRoute.path === path){
              this.$router.replace({path: path, query: query});
            }else{
              this.$router.push({path: path, query: query});
            }
            this.search = '';
          },
    }
})