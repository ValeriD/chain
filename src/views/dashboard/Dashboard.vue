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
<!--
          sub-icon='mdi-alert'
          sub-icon-color='red'
          sub-text='Get More Space...' -->
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
          <!-- <template v-slot:heading>
            <div class='text-h3 font-weight-light'>
              Employees Stats
            </div>

            <div class='text-subtitle-1 font-weight-light'>
              New employees on 15th September, 2016
            </div>
          </template> -->
          <v-card-text>
            <v-data-table
              :headers='headers'
              :items='items'
              :footer-props="{
              'items-per-page-options': [5, 10, 25, 50, -1]
            }"
            :items-per-page="10"
            />
          </v-card-text>
        </base-material-card>
      </v-col>

      <!-- <v-col cols='12' md='6'>
        <base-material-card class='px-5 py-3'>
          <template v-slot:heading>
            <v-tabs
              v-model='tabs'
              background-color='transparent'
              slider-color='white'
            >
              <span
                class='subheading font-weight-light mx-3'
                style='align-self: center'
                >Tasks:</span
              >
              <v-tab class='mr-3'>
                <v-icon class='mr-2'>
                  mdi-bug
                </v-icon>
                Bugs
              </v-tab>
              <v-tab class='mr-3'>
                <v-icon class='mr-2'>
                  mdi-code-tags
                </v-icon>
                Website
              </v-tab>
              <v-tab>
                <v-icon class='mr-2'>
                  mdi-cloud
                </v-icon>
                Server
              </v-tab>
            </v-tabs>
          </template>

          <v-tabs-items v-model='tabs' class='transparent'>
            <v-tab-item v-for='n in 3' :key='n'>
              <v-card-text>
                <template v-for='(task, i) in tasks[tabs]'>
                  <v-row :key='i' align='center'>
                    <v-col cols='1'>
                      <v-list-item-action>
                        <v-checkbox v-model='task.value' color='secondary' />
                      </v-list-item-action>
                    </v-col>

                    <v-col cols='9'>
                      <div class='font-weight-light' v-text='task.text' />
                    </v-col>

                    <v-col cols='2' class='text-right'>
                      <v-icon class='mx-1'>
                        mdi-pencil
                      </v-icon>
                      <v-icon color='error' class='mx-1'>
                        mdi-close
                      </v-icon>
                    </v-col>
                  </v-row>
                </template>
              </v-card-text>
            </v-tab-item>
          </v-tabs-items>
        </base-material-card>
      </v-col> -->
    </v-row>
  </v-container>
</template>

<script>
  export default {
    name: 'DashboardDashboard',
  
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
      const res = await this.axios.get('get_blocks', { params: { start_height: 355903, end_height: 355923 } }) // blocks
      const req = await this.axios.get('get_blockchain_state') // blockchain state

      // table data filled
      res.data.blocks.forEach((b, index) => {
        this.items.push({
          blockheight: b.reward_chain_block.height,
          blockhash: b.header_hash,
          time: b.foliage_transaction_block ? new Date(b.foliage_transaction_block?.timestamp).toString().slice(3, 24) : 'No time info',
          numberoftransactions: b.transactions_info?.reward_claims_incorporated.length || '0',
        })
      })

      this.height = req.data.blockchain_state.peak.height
      this.space = req.data.blockchain_state.space
      this.circulatingSupply = convertToInternationalCurrencySystem(req.data.blockchain_state.circulating_supply)
      this.uniqueAddressCount = req.data.blockchain_state.unique_address_count
    },
  }
  import { convertToInternationalCurrencySystem } from '../dashboard/component/Typography.vue'
</script>

