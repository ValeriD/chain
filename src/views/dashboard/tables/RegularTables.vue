<template>
  <v-container
    id='regular-tables'
    fluid
    tag='section'
  >
  <h3>Address: {{ address }}</h3>
  <v-row>
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
  </v-container>
</template>
<script>
  export default {
    name: 'RegularTables',

    data () {
      return {
        headers: [
          {
            sortable: false,
            text: 'ID',
            value: 'id',
          },
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
        notransactions: ''
      }
    },
    methods: {
      async handleClick (e) {
        const adr = await this.axios.get('get_address', { params: { address: e.address } }) // address
        this.address = e.address
        this.balance = adr.data.current_balance
        this.sent = adr.data.total_sent
        this.recieved = adr.data.total_received
        this.notransactions = adr.data.number_of_transactions
      }
    },
    async mounted () {
      const res = await this.axios.get('get_addresses') // addresses

      // table data filled
      res.data.forEach((b, index) => {
        this.items.push({
          id: index,
          address: b.address,
          balance: b.current_balance,
        })
      })
    },
  }
</script>
