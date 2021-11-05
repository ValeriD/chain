<template>
  <v-container
    id='dashboard'
    fluid
    tag='section'
  >
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
          :value='lastBlock'
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
          :value='convertToPiB'
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
          :value='circulatingSupply'
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
          :value='uniqueAddressCount'
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
            :items-per-page="10"
            />
          </v-card-text>
        </base-material-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    name: 'Blocks',
  
    data () {
      return {
        headers: [
          {
            sortable: false,
            text: 'Block Height',
            value: 'blockheight',
          },
          {
            sortable: false,
            text: 'Block Hash',
            value: 'blockhash',
            align: 'right',
          },
          {
            sortable: false,
            text: 'Number of transactions',
            value: 'numberoftransactions',
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
        list: {
          0: false,
          1: false,
          2: false,
        },
      }
    },

    computed: {
      convertToPiB () {
        return (this.space / 1125899906842620).toFixed(2) + ' PiB'
      },
      lastBlock () {
        return this.height.toString()
      },
    },

    methods: {
      complete (index) {
        this.list[index] = !this.list[index]
      },
    },
    async mounted () {
      const req = await this.axios.get('get_blockchain_state') // blockchain state
      const res = await this.axios.get('get_blocks', { params: { start_height: req.data.blockchain_state.peak.height-19, end_height: req.data.blockchain_state.peak.height+1 } }) // blocks

      // table data filled
      res.data.blocks.forEach((b, index) => {
        this.items.push({
          blockheight: b.reward_chain_block.height,
          blockhash: b.header_hash,
          time: b.foliage_transaction_block ? new Date(b.foliage_transaction_block?.timestamp).toString().slice(3, 24) : 'No time info',
          numberoftransactions: b.transactions_info?.reward_claims_incorporated.length || '0',
        })
      })
      this.items.reverse();

      this.height = new Intl.NumberFormat().format(req.data.blockchain_state.peak.height)
      this.space = req.data.blockchain_state.space
      this.circulatingSupply = convertToInternationalCurrencySystem(req.data.blockchain_state.circulating_supply)
      this.uniqueAddressCount = new Intl.NumberFormat().format(req.data.blockchain_state.unique_address_count)
    },
  }
  import { convertToInternationalCurrencySystem } from './component/Typography.vue'
</script>

