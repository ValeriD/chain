<template>
  <v-container
    id='address-details'
    fluid
    tag='section'
  >
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
    
  </v-container>
</template>
<script>
    import { mapState, mapMutations } from 'vuex'
    import { convertToCurrency } from '../../../scripts/functions.js'
export default {
    name: 'Addresses',
    
    data () {
      return {
        
        headers: [
          {
            sortable: false,
            text: 'Address',
            value: 'address',
          },
          {
            sortable: false,
            text: 'Balance',
            value: 'balance',
            align: 'right',
          },
        ],
        items: [],
      }
    },
    computed: {
      ...mapState(['searchResult']),
    },
    methods: {
      ...mapMutations({
        setSearch: 'SET_SEARCH_RESULT'
      }),
      async handleClick (e, searchRes) {
          console.log(e);
          this.$router.push({ path:'/addresses/details', query: { address: e.address}})
      }
    },
    async mounted () {
      const addresses = await this.axios.get('get_addresses', { params: { offset: 0 } }) // addresses
      addresses.data.forEach((b, index) => {
        this.items.push({
          address: b.address,
          balance: convertToCurrency(b.current_balance),
        })
      })
    },
  }
</script>
