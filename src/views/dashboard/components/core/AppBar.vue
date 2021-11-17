<template>
  <v-app-bar
    id="app-bar"
    absolute
    app
    color="transparent"
    flat
    height="75"
  >
    <v-btn
      class="mr-3 d-lg-none d-xl-none d-md-none"
      elevation="1"
      fab
      small
      @click="setDrawer(!drawer)"
    >
      <v-icon>
        mdi-view-quilt
      </v-icon>
    </v-btn>

    <v-toolbar-title
      class="hidden-sm-and-down font-weight-light"
      v-text="$route.name"
    />

    <v-spacer />

    <v-text-field
      label="Search by block height, block hash, address, transaction hash"
      color="secondary"
      hide-details
      v-model="search"
    >
       <template
        v-if="$vuetify.breakpoint.mdAndUp"
        v-slot:append
      >
        <img class="loading" v-if="isLoading" :src="loadingImg"/>

      </template>

      <template
        v-slot:append-outer
      >
        <v-btn
          class="mt-n2"
          elevation="1"
          fab
          small
          @click="searchAction"
        >
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
       
      </template>
    </v-text-field>

    <div class="mx-3" />

    
  </v-app-bar>
</template>

<script>
  // Utilities
  import { mapState, mapMutations } from 'vuex'
  export default {
    name: 'DashboardCoreAppBar',

    components: {
    },

    props: {
      value: {
        type: Boolean,
        default: false,
      },
      loadingImg:{
        type:String,
        default: require("@/assets/loading.gif"),
      }
    },

    data: () => ({
      search: '',
      isLoading: false
    }),

    computed: {
      ...mapState(['drawer']),
    },

    methods: {
      ...mapMutations({
        setDrawer: 'SET_DRAWER',
        setSearch: 'SET_SEARCH_RESULT'
      }),
      async searchAction () {
        if(this.search!==''){
          this.isLoading = true;
          await this.axios.get('search', { params: { search_text: this.search }})
            .then(req => {
              if(req.data.transaction ) {
                this.redirect('/transactions/details', 
                              {
                                transaction_id: req.data.transaction.transaction_id
                              });
              }
              else if(req.data.address) {
                this.redirect('/addresses/details', {
                  address: req.data.address.address
                });

              }else if(req.data.block){
                this.redirect('/blocks/details', {
                  block_hash: (this.search.length === 66)? this.search : req.data.block.header_hash
                })
              }
            })
            .catch(err => {
              this.$toast.error("Not found!", {
              position: "top-right",
              timeout: 5000,
              closeOnClick: true,
              pauseOnFocusLoss: true,
              pauseOnHover: true,
              draggable: true,
              draggablePercent: 0.6,
              showCloseButtonOnHover: false,
              hideProgressBar: true,
              closeButton: "button",
              icon: true,
              rtl: false
            });
          });
          this.setSearch('');
          this.isLoading = false;
        }
      }
    },
  }
</script>
<style>
  .loading {
    height: 20px;
    width: 20px;
  }
</style>