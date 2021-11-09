<template>
  <v-container
    id='transactions'
    fluid
    tag='section'
  >
  <!-- <v-row v-if='isBlock === true'>
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
      </v-col>

      <v-col
        cols='12'
        md='12'
      >
      </v-col>
    </v-row> -->
    <v-row
      align='center'
      justify='center'
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
  </v-container>
</template>

<script>
  import { mapState, mapMutations } from 'vuex'
import { convertToFormattedInteger } from '../../../scripts/functions'

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
      
      // numberoftransactions_block: '',
      // transaction_block: '',
      // dateandtime_block: '',
      // block_height: ''
    }),
     computed: {
      ...mapState(['searchResult']),
    },
    methods: {
      ...mapMutations({
        setSearch: 'SET_SEARCH_RESULT'
      }),
      async handleClick (e, searchRes) {
        this.$router.push({ path:'/pages/transactions/details', query:{id: e.transaction_id}})
      },
      goBack () {
        this.isInfo = !this.isInfo
      }
    },
    async mounted () {
      await this.axios.get('get_transactions', { params: { limit: 100, offset: 0 } })
            .then((res)=>{
              res.data.forEach((b, index) => {
                this.items.push({
                  transaction_id: b.transaction_id,
                  date: new Date( b.created_at).toString().slice(3, 24),
                  sender: b.sender,
                  reciever: b.receiver,
                  amount: convertToCurrency(b.amount),
                })
              })
            })
            .catch((e) => {console.log(e);})      
    }
  }
  import { convertToCurrency } from '../../../scripts/functions.js'
 
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
