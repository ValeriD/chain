<template>
  <v-container
    id='dashboard'
    fluid
    tag='section'
  >
   <!-- Loading Screen -->
  <LoadingScreen v-if="isLoading"/>

  <!-- Screen when data loaded -->
  <template v-if="!isLoading">
    <v-row>
      <v-col
        cols='12'
        sm='6'
        lg='3'
      >
        <base-material-stats-card
          color='primary'
          icon='mdi-arrange-send-to-back'
          title='Last block'
          :value='lastBlock | formatNumber'
        />
      </v-col>

      <v-col
        cols='12'
        sm='6'
        lg='3'
      >
        <base-material-stats-card
          color='info'
          icon='mdi-harddisk'
          title='Netspace'
          :value='space | formatSpace'
        />
      </v-col>

      <v-col
        cols='12'
        sm='6'
        lg='3'
      >
        <base-material-stats-card
          color='#ff1744'
          icon='mdi-circle-multiple-outline'
          title='Circulating supply'
          :value='circulatingSupply | formatCurrency'
        />
      </v-col>

      <v-col
        cols='12'
        sm='6'
        lg='3'
      >
        <base-material-stats-card
          color='orange'
          icon='mdi-account-multiple-outline'
          title='Unique address count'
          :value='uniqueAddressCount | formatNumber'
        />
      </v-col>

      <v-col
        cols='12'
        md='12'
      >
        <base-material-card
          icon='mdi-clipboard-text'
          title='Blocks'
          class='px-5 py-3'
        >
          <v-card-text>
            <v-data-table
              :headers='headers'
              :items='items' 
              :footer-props="{
              'items-per-page-options': [10, 20]
            }"
            @click:row="handleClick"
            :items-per-page="10"
            :breakpoint=0
            >
            <template v-slot:[`item.block_height`]="{ value }">
                <div>
                  <a>{{ value | formatNumber }}</a>
                </div>
              </template>
            <template v-slot:[`item.block_hash`]="{ value }">
                <div>
                  <a>{{ value | formatStringLength($vuetify.breakpoint.mobile) }}</a>
                </div>
              </template>
            </v-data-table>
          </v-card-text>
        </base-material-card>
      </v-col>
    </v-row>
  </template>
  </v-container>
</template>

<script>
  import LoadingScreen from '../components/Loading'

export default {
    name: 'Blocks',

    components: {
      LoadingScreen
    },

    data () {
      return {
        headers: [
          {
            sortable: false,
            text: 'Block Height',
            value: 'block_height',
          },
          {
            sortable: false,
            text: 'Block Hash',
            value: 'block_hash',
            align: 'right',
          },
          {
            sortable: false,
            text: 'Number of transactions',
            value: 'number_of_transactions',
            align: 'right',
          },
          {
            sortable: false,
            text: 'Time',
            value: 'time',
            align: 'right',
          },
        ],
        items: [],
        tabs: 0,
        tasks: {
          0: [],
          1: [],
          2: [],
        },
        blockchain_state: {},
        height: '',
        space: '',
        circulatingSupply: '',
        uniqueAddressCount: '',
        isLoading: true,
        list: {
          0: false,
          1: false,
          2: false,
        },
      }
    },

    computed: {
      lastBlock () {
        return this.height.toString()
      },
    },

    methods: {
      complete (index) {
        this.list[index] = !this.list[index]
      },
      handleClick(e){
        this.$router.push({path:'/blocks/details', query: { block_hash: e.block_hash }})
      },
    },

    async mounted () {
      const blockchain_state = await this.axios.get('get_blockchain_state') // blockchain state
      const blocks = await this.axios.get('get_blocks', { params: { start_height: blockchain_state.data.blockchain_state.peak.height-19, end_height: blockchain_state.data.blockchain_state.peak.height+1 } }) // blocks
      // table data filled
      blocks.data.blocks.forEach((b) => {
        this.items.push({
          block_height: b.reward_chain_block.height,
          block_hash: b.header_hash,
          time: b.foliage_transaction_block ? new Date(b.foliage_transaction_block?.timestamp*1000).toString().slice(3, 24) : 'No time info',
          number_of_transactions: b.transactions_info?.reward_claims_incorporated.length || '0',
        })
      })
      this.items.reverse();
      this.height = blockchain_state.data.blockchain_state.peak.height
      this.space = blockchain_state.data.blockchain_state.space
      this.circulatingSupply = blockchain_state.data.blockchain_state.circulating_supply
      this.uniqueAddressCount = blockchain_state.data.blockchain_state.unique_address_count
      this.isLoading = false;
    },
  }
</script>

