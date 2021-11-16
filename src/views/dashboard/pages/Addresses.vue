<template>
  <v-container
    id='address-details'
    fluid
    tag='section'
  >
  <!-- Loading screen -->
  <LoadingScreen v-if="isLoading"/>

  <!-- Screen when loaded -->
  <v-row v-if="!isLoading">
    <v-col
      cols='12'
      md='12'
    >
      <base-material-card
        icon='mdi-clipboard-text'
        title='Addresses'
        class='px-5 py-3'
      >
        <v-card-text>
          <v-data-table
            :headers='headers'
            :items='items'
            :footer-props="{
              'items-per-page-options': [5, 10, 25, 50, -1]
            }"
            @click:row="handleClick"
            :items-per-page="25"
          />
        </v-card-text>
      </base-material-card>
    </v-col>
    </v-row>
  </v-container>
</template>
<script>
    import LoadingScreen from '../components/Loading'

    import { mapState, mapMutations } from 'vuex'
    import { convertToCurrency, truncate } from '../../../scripts/functions.js'
  

export default {
    name: 'Addresses',
    
    components:{
      LoadingScreen
    },
    data () {
      return {
        
        headers: [
          {
            sortable: false,
            text: 'Address',
            value: 'displayed_address',
          },
          {
            sortable: false,
            text: 'Balance',
            value: 'balance',
            align: 'right',
          },
        ],
        items: [],
        isLoading: true
      }
    },
    computed: {
      ...mapState(['searchResult']),
      
    },
    methods: {
      ...mapMutations({
        setSearch: 'SET_SEARCH_RESULT'
      }),
      async handleClick (e) {
          this.$router.push({ path:'/addresses/details', query: { address: e.address}})
      },
      truncIfNeeded(string){
        return (this.$vuetify.breakpoint.mobile)? truncate(string) : string;
      },
    },
    async mounted () {
      const addresses = await this.axios.get('get_addresses', { params: { offset: 0 } }) // addresses
      addresses.data.forEach((b, index) => {
        this.items.push({
          displayed_address: this.truncIfNeeded(b.address),
          address: b.address,
          balance: convertToCurrency(b.current_balance),
        })
      })
      this.isLoading= false;
    },
  }
</script>
