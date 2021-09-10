<template>
  <v-container
    id='regular-tables'
    fluid
    tag='section'
  >
  <h3 v-if="address != ''">Address: {{ address }}</h3>
  <v-row v-if="address != ''">
      <v-col
        cols='12'
        sm='6'
        lg='3'
      >
        <base-material-stats-card
          color='info'
          icon='mdi-scale-balance'
          title='Current balance'
          :value='balance'
        />
      </v-col>

      <v-col
        cols='12'
        sm='6'
        lg='3'
      >
        <base-material-stats-card
          color='#ff1744'
          icon='mdi-archive-arrow-up-outline'
          title='Total sent'
          :value='sent'
        />
      </v-col>

      <v-col
        cols='12'
        sm='6'
        lg='3'
      >
        <base-material-stats-card
          color='primary'
          icon='mdi-archive-arrow-down-outline'
          title='Total recieved'
          :value='recieved'
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
          :value='notransactions'
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
      cols='12'
      md='12'
      v-if="address === ''"
    >
      <base-material-card
        icon='mdi-clipboard-text'
        title='Addresses'
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
            @click:row="handleClick"
            :items-per-page="25"
          />
        </v-card-text>
      </base-material-card>
    </v-col>
    <v-col
      cols='12'
      md='12'
      v-else
    >
      <base-material-card
        icon='mdi-clipboard-text'
        title='Transactions'
        class='px-5 py-3'
      >
        <v-card-text>
          <v-data-table
            :headers='headersTrans'
            :items='itemsTrans'
            :footer-props="{
              'items-per-page-options': [5, 10, 25, 50, -1]
            }"
            :items-per-page="25"
          />
        </v-card-text>
      </base-material-card>
    </v-col>
  </v-container>
</template>
<script>
  export default {
    name: 'RegularTables',

    data () {
      return {
        headersTrans:[
          {
          sortable: false,
          text: 'Date',
          value: 'dateTrans',
        },
        {
          sortable: false,
          text: 'TX Type',
          value: 'txtype',
        },
        {
          sortable: false,
          text: 'Sender',
          value: 'senderTrans',
          align: 'left',
        },
        {
          sortable: false,
          text: 'Reciever',
          value: 'recieverTrans',
          align: 'left',
        },
        {
          sortable: false,
          text: 'Amount',
          value: 'amountTrans',
          align: 'left',
        },
        ],
        itemsTrans:[],
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
        balance: '',
        sent: '',
        recieved: '',
        notransactions: '',
        address: ''
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
        if(searchRes.address) {
          this.address = searchRes.address.address
          this.balance = convertToInternationalCurrencySystem(searchRes.address.current_balance)
          this.sent = convertToInternationalCurrencySystem(searchRes.address.total_sent)
          this.recieved = convertToInternationalCurrencySystem(searchRes.address.total_received)
          this.notransactions =  searchRes.address.number_of_transactions
          searchRes.address.transactions.forEach((t, index) => {
            this.itemsTrans.push({
              dateTrans: new Date(t.transaction.created_at).toString().slice(3, 24),
              txtype: t.transaction_type.charAt(0).toUpperCase() + t.transaction_type.slice(1),
              senderTrans: t.transaction.sender,
              recieverTrans: t.transaction.receiver,
              amountTrans: convertToInternationalCurrencySystem(t.transaction.amount)
            })
          })
          this.setSearch('')
        }

        const adr = await this.axios.get('get_address', { params: { address: e.address } }) // address
        adr.data.transactions.forEach((t, index) => {
            this.itemsTrans.push({
              dateTrans: new Date(t.transaction.created_at).toString().slice(3, 24),
              txtype: t.transaction_type.charAt(0).toUpperCase() + t.transaction_type.slice(1),
              senderTrans: t.transaction.sender,
              recieverTrans: t.transaction.receiver,
              amountTrans: convertToInternationalCurrencySystem(t.transaction.amount)
            })
          })
        this.address = e.address
        this.balance = convertToInternationalCurrencySystem(adr.data.current_balance)
        this.sent = convertToInternationalCurrencySystem(adr.data.total_sent)
        this.recieved = convertToInternationalCurrencySystem(adr.data.total_received)
        this.notransactions = adr.data.number_of_transactions
      }
    },
    async mounted () {
      this.handleClick(false, this.searchResult)

      const res = await this.axios.get('get_addresses', { params: { offset: 0 } }) // addresses
      // table data filled
      res.data.forEach((b, index) => {
        this.items.push({
          address: b.address,
          balance: convertToInternationalCurrencySystem(b.current_balance),
        })
      })
    },
  }
  import { mapState, mapMutations } from 'vuex'
  import { convertToInternationalCurrencySystem } from '../../dashboard/component/Typography.vue'
</script>
