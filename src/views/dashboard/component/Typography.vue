<template>
  <v-container
    id='typography'
    fluid
    tag='section'
  >
  <v-row v-if='isInfo === true'
  justify='space-between'
  align='center'>
    <v-btn
      class="mb-6"
      depressed
      rounded
      color="warning"
      @click="goBack"
      justify='start'
      align='left'
    >
      <v-icon dark>
        mdi-keyboard-backspace
      </v-icon> Back to transactions
    </v-btn>
    <v-chip
      color="orange"
      rounded
      text-color="white"
      medium
    >
      <div class="font-weight-regular overline">Transaction: {{ transaction }}</div>
    </v-chip>
  </v-row>
  <v-row v-if='isBlock === true'>
      <v-col
        cols='12'
        sm='6'
        lg='3'
      >
        <base-material-stats-card
          color='green'
          icon='mdi-arrange-send-to-back'
          title='Block height'
          :value='block_height'
        />
      </v-col>

      <v-col
        cols='12'
        sm='6'
        lg='3'
      >
        <base-material-stats-card
        class="font-weight-light"
          color='orange'
          icon='mdi-clock-time-four-outline'
          title='Date and time'
          :value='dateandtime_block'
        />
      </v-col>

      <v-col
        cols='12'
        sm='6'
        lg='3'
      >
        <base-material-stats-card
          color='green'
          icon='mdi-circle-multiple-outline'
          title='TX Amount'
          :value='transaction_block'
        />
      </v-col>

      <v-col
        cols='12'
        sm='6'
        lg='3'
      >
        <base-material-stats-card
          color='purple'
          icon='mdi-cached'
          title='Number of transactions'
          :value='numberoftransactions_block'
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
      </v-col>
    </v-row>
    <v-row
      align='center'
      justify='center'
      v-if='!isInfo'
    >
      <v-col
        cols='12'
        md='12'
      >
        <base-material-card
          icon='mdi-clipboard-text'
          title='Transactions'
          class='px-5 py-3'
        >
          <v-card-text>
            <v-data-table
              :headers='headers'
              :items='items'
              @click:row="handleClick"
            />
          </v-card-text>
        </base-material-card>
      </v-col>
    </v-row>
    <v-row
      align='center'
      justify='center'
      v-else
    >
  <v-row>
      <v-col
        cols='12'
        sm='6'
        lg='3'
      >
        <base-material-stats-card
          color='purple'
          icon='mdi-arrange-send-to-back'
          title='Confirmation block'
          :value='confirmationblock'
        />
      </v-col>

      <v-col
        cols='12'
        sm='6'
        lg='3'
      >
        <base-material-stats-card
          color='black'
          icon='mdi-clock-time-four-outline'
          title='Date and time'
          class="v-card--material-stats"
          :value='dateandtime'
        />
      </v-col>

      <v-col
        cols='12'
        sm='6'
        lg='3'
      >
        <base-material-stats-card
          color='#2CEEF0'
          icon='mdi-cached'
          title='TX Amount'
          :value='txamount'
        />
      </v-col>

      <v-col
        cols='12'
        sm='6'
        lg='3'
      >
        <base-material-stats-card
          color='green'
          icon='mdi-check-circle-outline'
          title='Confirmations'
          :value='confirmations'
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
      </v-col>
    </v-row>
      <v-col
        cols='6'
        md='6'
      >
        <base-material-card
          icon='mdi-clipboard-text'
          title='Input table'
          class='px-5 py-3'
          color='orange'
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
              :headers='headersInput'
              :items='itemsInput'
              :items-per-page="5"
            />
          </v-card-text>
        </base-material-card>
      </v-col>
      <v-col
        cols='6'
        md='6'
      >
        <base-material-card
          icon='mdi-clipboard-text'
          title='Output table'
          class='px-5 py-3'
          color='orange'
        >
          <v-card-text>
            <v-data-table
              :headers='headersOutput'
              :items='itemsOutput'
              :items-per-page="5"
            />
          </v-card-text>
        </base-material-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import { mapState, mapMutations } from 'vuex'

  export default {
    data: () => ({
      headers: [
        {
          sortable: false,
          text: 'Date',
          value: 'date',
        },
        {
          sortable: false,
          text: 'Sender',
          value: 'sender',
          align: 'left',
        },
        {
          sortable: false,
          text: 'Reciever',
          value: 'reciever',
          align: 'left',
        },
        {
          sortable: false,
          text: 'Amount',
          value: 'amount',
          align: 'left',
        },
      ],
      items: [],
      headersInput: [
        {
          sortable: false,
          text: 'Input hash',
          value: 'inputhash',
        },
        {
          sortable: false,
          text: 'Amount',
          value: 'amount',
          align: 'right',
        }
      ],
      headersOutput: [
        {
          sortable: false,
          text: 'Output hash',
          value: 'outputhash',
        },
        {
          sortable: false,
          text: 'Amount',
          value: 'amount',
          align: 'right',
        }
      ],
      itemsInput: [],
      itemsOutput: [],
      isInfo: false,
      isBlock: false,
      transaction: '',
      confirmationblock: '',
      dateandtime: '',
      txamount: '',
      confirmations: '',
      numberoftransactions_block: '',
      transaction_block: '',
      dateandtime_block: '',
      block_height: ''
    }),
     computed: {
      ...mapState(['searchResult']),
    },
    methods: {
      ...mapMutations({
        setSearch: 'SET_SEARCH_RESULT'
      }),
      async handleClick (e, searchRes) {
        if(searchRes.transaction) {
          this.isInfo = !this.isInfo
          this.transaction = searchRes.transaction.transaction_id
          this.confirmationblock = searchRes.transaction.confirmation_block
          this.dateandtime = new Date(searchRes.transaction.created_at).toString().slice(3, 24)
          this.txamount = convertToInternationalCurrencySystem(searchRes.transaction.amount)
          this.confirmations = searchRes.transaction.confirmations_number
          this.setSearch('')
        }
        else if(searchRes.block) {
          this.isBlock = !this.isBlock
          this.block = searchRes.block.address
          this.block_height = searchRes.block.reward_chain_block.height
          this.dateandtime_block = searchRes.block.foliage_transaction_block.timestamp && new Date(searchRes.block.foliage_transaction_block.timestamp).toString().slice(3, 24)
          this.transaction_block = convertToInternationalCurrencySystem(searchRes.block.transactions_info.amount)
          this.numberoftransactions_block = searchRes.block.transactions_info.reward_claims_incorporated.length || 0
          this.setSearch('')
        }
        else {
          this.isInfo = !!e
          this.isBlock = false
        }
        const adr = await this.axios.get('get_transaction_info', { params: { transaction_id: e.transaction_id } }) // transaction
        this.transaction = e.transaction_id
        this.confirmationblock = adr.data.confirmation_block
        this.dateandtime = new Date(adr.data.created_at).toString().slice(3, 24)
        this.txamount = convertToInternationalCurrencySystem(adr.data.amount)
        this.confirmations = adr.data.confirmations_number

        if(adr.data.input) {
          this.itemsInput.push({
            inputhash: adr.data.input.puzzle_hash,
            amount: convertToInternationalCurrencySystem(adr.data.input.amount),
          })
        }
        if(adr.data.outputs) {
          adr.data.outputs.forEach((b, index) => {
            this.itemsOutput.push({
              outputhash: b.address,
              amount: convertToInternationalCurrencySystem(b.amount)
            })
          })
        }
      },
      goBack () {
        this.isInfo = !this.isInfo
      }
    },
    async mounted () {
      this.handleClick(false, this.searchResult)
      const res = await this.axios.get('get_transactions', { params: { limit: 100, offset: 10 } }) // transactions
      // table data filled
      res.data.forEach((b, index) => {
        this.items.push({
          transaction_id: b.transaction_id,
          date: new Date( b.created_at).toString().slice(3, 24),
          sender: b.sender,
          reciever: b.receiver,
          amount: convertToInternationalCurrencySystem(b.amount),
        })
      })
    }
  }
  export function convertToInternationalCurrencySystem (labelValue) {
        // 12 for Billions
        return Number.parseFloat(labelValue / Math.pow(10, 12)).toFixed(2)
  }
</script>

<style lang='scss'>
.tim-note {
  bottom: 10px;
  color: #c0c1c2;
  display: block;
  font-weight: 400;
  font-size: 13px;
  line-height: 13px;
  left: 0;
  margin-left: 20px;
  width: 260px;
}
</style>
