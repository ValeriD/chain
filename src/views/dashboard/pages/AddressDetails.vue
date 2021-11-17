<template>
  <v-container
    id='address-details'
    fluid
    tag='section'
  >
  <!-- Loading screen -->
  <LoadingScreen v-if="isLoading"/>
 
  <!-- Screen when loaded -->
  <template v-if="!isLoading">
    <v-row>
        <v-chip
        color="orange"
        rounded
        text-color="white"
        large
        align="left"
        >
        <div class="font-weight-regular display-1">Address: {{ address | formatStringLength($vuetify.breakpoint.mobile) }}</div>
        </v-chip>
    </v-row>
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
            :value='balance | formatCurrency'
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
            :value='sent | formatCurrency'
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
            title='Total received'
            :value='received | formatCurrency'
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
            :value='number_transactions | formatNumber'
            />
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
        title='Transactions'
        class='px-5 py-3'
      >
        <v-card-text>
          <v-data-table
            :headers='headers_transactions'
            :items='items_transactions'
            @click:row="handleRowClick"
            :footer-props="{
              'items-per-page-options': [5, 10, 25, 50, -1]
            }"
            :items-per-page="25"
          >
              <template v-slot:[`item.receiver`]="{ value }">
                <div>
                  <a @click.stop="handleRowClick" @click="handleColumnClick(value)">{{ value | formatStringLength($vuetify.breakpoint.mobile) }}</a>
                </div>
              </template>
              <template v-slot:[`item.sender`]="{ value }">
                <div>
                  <a @click.stop="handleRowClick" @click="handleColumnClick(value)">{{ value | formatStringLength($vuetify.breakpoint.mobile) }}</a>
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
    </template>
     </v-container>
</template>   
<script>
    import LoadingScreen from '../components/Loading'
    import { mapState, mapMutations} from 'vuex'
    import { makeFirstCaseUpper } from "../../../scripts/functions"
export default {
    components:{
      LoadingScreen
    },
    data: () => ({
       headers_transactions:[
          {
          sortable: false,
          text: 'Date',
          value: 'date',
        },
        {
          sortable: false,
          text: 'TX Type',
          value: 'type',
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
        items_transactions:[],
        balance: '',
        sent: '',
        received: '',
        number_transactions: '',
        address: '',
        isLoading: true
    }),
    computed: {
      ...mapState(['searchResult']),
      // Returns the current endpoint
      query() {
        return this.$route.query.address;
      }
    },
    methods: {
      ...mapMutations({
        setSearch: 'SET_SEARCH_RESULT'
      }),
      setValues: function(address){
        this.address = address.address;
        this.balance = address.current_balance;
        this.sent = address.total_sent
        this.received = address.total_received;
        this.number_transactions = address.number_of_transactions.toString();
        address.transactions.forEach((b) => {
        this.items_transactions.push({
                transaction_id: b.transaction.transaction_id,
                date: new Date( b.transaction.created_at).toString().slice(3, 24),
                sender: b.transaction.sender,
                receiver: b.transaction.receiver,
                amount: b.transaction.amount,
                type: makeFirstCaseUpper(b.transaction_type)
            })
        })
      },
      handleQueryChange : async function(){
        //If a search data is present use it
        if(this.searchResult && this.searchResult.address){
            this.setValues(this.searchResult.address);
        }else{
            //Handles direct change in the URL bar
            let address = (await this.axios.get('get_address', {params:{address:this.$route.query.address}})).data;
            this.setValues(address);
        }
      },
      handleRowClick(item, e){
        if(e){
         this.$router.push({ path:'/transactions/details', query:{transaction_id: item.transaction_id}})
        }
      },
      handleColumnClick(address){
        this.redirect('/addresses/details/', {address: address});
      }
    },
    async mounted () {
        let address;
        if(this.searchResult && this.searchResult.address){
            address = this.searchResult.address
        }else{
            address = (await this.axios.get('get_address', {params:{address:this.$route.query.address}})).data;
        }
        this.setValues(address);
        this.isLoading = false;
    },
    watch:{
      query(){
        this.handleQueryChange();
      }
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