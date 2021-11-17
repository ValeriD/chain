<template>
  <v-container
    id='transactions'
    fluid
    tag='section'
  >
   <!-- Loading Screen -->
  <LoadingScreen v-if="isLoading"/>

  <!-- Screen when data loaded -->
  <template v-if="!isLoading">
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
            >
               <template v-slot:[`item.sender`]="{ value }">
                <div>
                   <a @click.stop="handleClick" @click="handleColumnClick(value)">{{ value | formatStringLength($vuetify.breakpoint.mobile) }}</a>
                </div>
              </template>
               <template v-slot:[`item.receiver`]="{ value }" >
                <div >
                  <a @click.stop="handleClick" @click="handleColumnClick(value)">{{ value | formatStringLength($vuetify.breakpoint.mobile) }}</a>
                </div>
              </template>
              <template v-slot:[`item.amount`]="{ value }">
                <div>
                  {{ value | formatCurrency }}
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

  import { mapState, mapMutations } from 'vuex'

  export default {
    components: {
      LoadingScreen
    },
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
          text: 'Receiver',
          value: 'receiver',
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
      isLoading: true,
    }),
     computed: {
      ...mapState(['searchResult']),
    },
    methods: {
      ...mapMutations({
        setSearch: 'SET_SEARCH_RESULT'
      }),
      async handleClick (item, e) {
        if(e){
         this.$router.push({ path:'/transactions/details', query:{transaction_id: item.transaction_id}})
        }
      },
      handleColumnClick(address){
        this.redirect('/addresses/details/', {address: address});
      }
      
    },
    async mounted () {
      this.isLoading = true;
      await this.axios.get('get_transactions', { params: { limit: 100, offset: 0 } })
            .then((res)=>{
              res.data.forEach((b, index) => {
                this.items.push({
                  transaction_id: b.transaction_id,
                  date: new Date( b.created_at).toString().slice(3, 24),
                  sender: b.sender,
                  receiver: b.receiver,
                  amount: b.amount,
                })
              })
              this.isLoading = false;
            }); 
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
<style lang="sass">

</style>
