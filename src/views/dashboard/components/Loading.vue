<template>
  <v-row>
    <img
      class="img"
      :src='loadingImg'
    />
  </v-row>
</template>

<script>
export default {
  name: "LoadingScreen",

  props:{
    loadingImg:{
        type:String,
        default: require("@/assets/loading.gif"),
    }
  },
  data: () => ({ 
      isLoading:true,
  }),
};
</script>

<style>
.img{
  position: absolute;
  height: 50px;
  width: 50px;
  top: 50%;
  left: 50%;
}
</style>