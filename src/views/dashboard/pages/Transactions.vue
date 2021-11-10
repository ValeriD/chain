<template>
  <v-container
    id='transactions'
    fluid
    tag='section'
  >
 
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
  import { convertToCurrency } from '../../../scripts/functions.js'

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
    }),
     computed: {
      ...mapState(['searchResult']),
    },
    methods: {
      ...mapMutations({
        setSearch: 'SET_SEARCH_RESULT'
      }),
      async handleClick (e) {
        this.$router.push({ path:'/pages/transactions/details', query:{id: e.transaction_id}})
      },
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
