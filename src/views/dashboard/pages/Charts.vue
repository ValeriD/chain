<template>
  <v-container
    id='user-profile'
    fluid
    tag='section'
  >
  <!-- Loading Screen -->
  <LoadingScreen v-if="isLoading"/>

  <!-- Screen when data loaded -->
  <v-row v-if="!isLoading">
    <v-col>
      <v-col
        class='pb-10'
      >
        <base-material-chart-card
          :data='maxNetspacePerDay.data'
          :options='maxNetspacePerDay.options'
          color='success'
          hover-reveal
          type='Line'
        >
          <h4 class='card-title font-weight-light mt-2 ml-2'>
            Max net space per day (PiB)
          </h4>

          <p class='d-inline-flex font-weight-light ml-2 mt-1'>
            <v-icon
              small
            >
              {{decreased ? 'mdi-arrow-up' : 'mdi-arrow-down'}}
            </v-icon>
            <span :class="{ 'green--text': decreased, 'red--text' : !decreased }">{{increaseNetspace}}%</span>&nbsp; {{decreased ? 'increase' : 'decrease'}} in Netspace
          </p>
        </base-material-chart-card>
      </v-col>
      <v-col>
        <base-material-chart-card
          :data='transactionsPerDay.data'
          :options='transactionsPerDay.options'
          :responsive-options='transactionsPerDay.responsiveOptions'
          color='#E91E63'
          hover-reveal
          type='Bar'
        >
          <template v-slot:reveal-actions>
            <v-tooltip bottom>
              <template v-slot:activator='{ attrs, on }'>
                <v-btn
                  v-bind='attrs'
                  color='info'
                  icon
                  v-on='on'
                >
                  <v-icon
                    color='info'
                  >
                    mdi-refresh
                  </v-icon>
                </v-btn>
              </template>

              <span>Refresh</span>
            </v-tooltip>

            <v-tooltip bottom>
              <template v-slot:activator='{ attrs, on }'>
                <v-btn
                  v-bind='attrs'
                  light
                  icon
                  v-on='on'
                >
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
              </template>

              <span>Change Date</span>
            </v-tooltip>
          </template>

          <h4 class='card-title font-weight-light mt-2 ml-2'>
            Transactions per day
          </h4>

          <p class='d-inline-flex font-weight-light ml-2 mt-1'>
            <v-icon
              small
            >
              {{increased ? 'mdi-arrow-up' : 'mdi-arrow-down'}}
            </v-icon>
            <span :class="{ 'green--text': increased, 'red--text' : !increased }">{{increaseTrans}}%</span>&nbsp; {{increased ? 'increase' : 'decrease'}} in number of Transactions
          </p>

        </base-material-chart-card>
      </v-col>
    </v-col>
  </v-row>
  </v-container>
</template>

<script>
  import LoadingScreen from '../components/Loading'
  export default {
    name: 'Charts',

    components: {
      LoadingScreen
    },

    data () {
      return {
        transactionsPerDay: {
          data: {
            labels: [],
            series: [[]],
          },
          options: {
            axisX: {
              showGrid: false,
            },
            axisY:{
              showGrid: true,
            },
            low: 0,
            high: this.maxTrans,
            chartPadding: {
              top: 0,
              right: 5,
              bottom: 0,
              left: 20,
            },
          },
          responsiveOptions: [
            [
              'screen and (max-width: 640px)',
              {
                seriesBarDistance: 5,
                axisY: {
                  labelInterpolationFnc: function (value) {
                    return value[0]
                  },
                },
              },
            ],
          ],
        },
        maxNetspacePerDay: {
          data: {
            labels: [],
            series: [],
          },
          options: {
            axisY:{
              showGrid: true,
            },
            lineSmooth: this.$chartist.Interpolation.cardinal({
              tension: 5,
            }),
            low: 0,
            high: this.maxNet, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
            chartPadding: {
              top: 0,
              right: 0,
              bottom: 0,
              left: 20,
            },

          },
          responsiveOptions: [
            [
              'screen and (max-width: 640px)',
              {
                seriesBarDistance: 5,
                axisY: {
                  labelInterpolationFnc: function (value) {
                    return value[0]
                  },
                },
              },
            ],
          ],
        },
        netSpaceLabels: [],
        netSpaceSeries: [],
        maxTransactionsLabels: [],
        maxTransactionsSeries: [],
        increaseTrans: 0,
        increaseNetspace: 0,
        increased: false,
        decreased: false,
        isLoading: true,
        maxNet: 0,
        maxTrans: 0,
      }
    },
    computed: {
      netSpace () {
        return this.netSpaceLabels
      },
    },
     methods:{
      getChartData: async function (req){
          const res = await this.axios.get(req);
          // Calculating the step for the dots
          const records = [];
          const step = (res.data.length<15)? 1 : Math.ceil(res.data.length/30);
         
          // Filtering the data
          for(var i = 0, j=0; i<res.data.length; j++, i+=step){
            records[j] = res.data[i];

          }
          //Mapping the labels and the values
          const labels = records.map(record => record._id);
          const series = records.map(record => (req === 'get_transactions_per_day')?record.transactions_count : record.max_netspace/1125899906842620)

          const maxRecords = series.slice(-2);
          
          if(maxRecords[1] > maxRecords[0]){
            this.increased = true
            if(req === 'get_transactions_per_day'){
              this.increaseTrans = ((maxRecords[0]-maxRecords[1])/100.0).toFixed(2)
            }else{
              this.increaseNetspace = ((maxRecords[0]-maxRecords[1])/100.0).toFixed(2)
            }
          }else{
            this.increased = false;
            if(req === 'get_transactions_per_day'){
              this.increaseTrans = ((maxRecords[0]-maxRecords[1])/100.0).toFixed(2)
            }else{
              this.increaseNetspace = ((maxRecords[0]-maxRecords[1])/100.0).toFixed(2)
            }
          }


          return {
            labels: labels,
            series: [series]
          }
      }
    },
    async mounted () {
      await Promise.all([
        await this.getChartData('get_transactions_per_day'),
        await this.getChartData('get_nespace_per_day')
      ]).then((values) => {
        this.maxNetspacePerDay = {
          ...this.maxNetspacePerDay,
          data: values[1],
          options: {
            ...this.maxNetspacePerDay.options,
          },
        }
        this.transactionsPerDay = {
          ...this.transactionsPerDay,
          data: values[0],
          options: {
            ...this.transactionsPerDay.options,
          },
        }
      })
      this.isLoading = false;
    },
     
  }
    
  
</script>
