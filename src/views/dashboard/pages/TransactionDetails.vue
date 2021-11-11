<template>
  <v-container
    id='transaction_details'
    fluid
    tag='section'
  >
   
     <!-- Loading Screen -->
  <LoadingScreen v-if="isLoading"/>

  <!-- Screen when data loaded -->
  <v-row v-if="!isLoading">
    <v-row>
        <v-chip
        color="orange"
        rounded
        large
        text-color="white"
        align="left"
        >
        <div class="font-weight-regular display-1">Transaction ID: {{ transaction_id }}</div>
        </v-chip>
    </v-row>
    <v-row
      align='center'
      justify='center'
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
                :value='confirmation_block'
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
                :value='date_time'
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
                :value='transaction_amount'
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
                <v-card-text>
                    <v-data-table
                    :headers='headers_input'
                    :items='items_input'
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
                    :headers='headers_output'
                    :items='items_output'
                    :items-per-page="5"
                    />
                </v-card-text>
                </base-material-card>
            </v-col>
        </v-row>
  </v-row>
    </v-container>
</template>

<script>
    import LoadingScreen from '../components/Loading'

    import { mapState, mapMutations} from 'vuex'
    import { convertToCurrency } from "../../../scripts/functions"  
    export default {
        data: () => ({
            headers_input: [
            {
                sortable: false,
                text: 'Input hash',
                value: 'input_hash',
            },
            {
                sortable: false,
                text: 'Amount',
                value: 'amount',
                align: 'right',
            }
            ],
            headers_output: [
            {
                sortable: false,
                text: 'Output hash',
                value: 'output_hash',
            },
            {
                sortable: false,
                text: 'Amount',
                value: 'amount',
                align: 'right',
            }
            ],
            items_input: [],
            items_output: [],
            confirmation_block: '',
            date_time: '',
            transaction_amount: '',
            confirmations: '',
            transaction_id: '',
            isLoading: true
        }),
        computed: {
            ...mapState(['searchResult'])
        },
        methods: {
            ...mapMutations(({
                setSearch: 'SET_SEARCH_RESULT'
            }))
        },
        async mounted () {
            let transaction;
            if(this.searchResult && this.searchResult.transaction){
                transaction = this.searchResult.transaction
                this.transaction_id = transaction.transaction_id
            }else{
                this.transaction_id = this.$route.query.id
                transaction = await this.axios.get('get_transaction_info', { params:{transaction_id: this.transaction_id}});
            }
            
            this.confirmation_block = transaction.data.confirmation_block.toString();
            this.transaction_amount = convertToCurrency(transaction.data.amount)
            this.date_time = new Date(transaction.data.created_at).toString().slice(3, 24)
            this.confirmations = transaction.data.confirmations_number.toString()
            if(transaction.data.input){
                this.items_input.push({
                    input_hash: transaction.data.input.puzzle_hash,
                    amount: convertToCurrency(transaction.data.input.amount)
                })
            }
            if(transaction.data.output){
                transaction.data.outputs.forEach((output, index) => {
                    this.items_output.push({
                        output_hash: output.address,
                        amount: convertToCurrency(output.amount)
                    })
                }) 
            }
            this.isLoading = false;
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