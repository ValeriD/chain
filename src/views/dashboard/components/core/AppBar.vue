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
    },

    data: () => ({
      search: ''
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
        const req = await this.axios.get('search', { params: { search_text: this.search }}) // search
        if(req.data.transaction ) {
          this.$router.push({ path:'/pages/transactions/details' })
          this.search = ''

        }
        else if(req.data.address) {
          this.$router.push({ path:'/addresses/details' })
          this.search = ''

        }else if(req.data.block){
          this.$router.push({ path:'/pages/blocks/details', query: {block_hash: this.search} })
          this.search = ''

        }
        this.setSearch(req.data)
      }
    },
  }
</script>
