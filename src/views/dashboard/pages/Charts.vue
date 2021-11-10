<template>
  <v-container
    id='user-profile'
    fluid
    tag='section'
  >
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
          <template
            v-slot:reveal-actions
          >
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

            <v-tooltip
            bottom
            >
              <template
              v-slot:activator='{ attrs, on }'
              >
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
            Max net space per day (PiB)
          </h4>

          <p class='d-inline-flex font-weight-light ml-2 mt-1'>
            <v-icon
              small
            >
              {{decreased ? 'mdi-arrow-up' : 'mdi-arrow-down'}}
            </v-icon>
            <span :class="{ 'green--text': decreased, 'red--text' : !decreased }">{{increaseNetspace}}%</span>&nbsp; {{decreased ? 'increase' : 'decrease'}} in today's sales
          </p>

          <template v-slot:actions>
            <v-icon
              class='mr-1'
              small
            >
              mdi-clock-outline
            </v-icon>
            <span class='text-caption grey--text font-weight-light'>updated 4 minutes ago</span>
          </template>
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
            <span :class="{ 'green--text': increased, 'red--text' : !increased }">{{increaseTrans}}%</span>&nbsp; {{increased ? 'increase' : 'decrease'}} in today's sales
          </p>

          <template v-slot:actions>
            <v-icon
              class='mr-1'
              small
            >
              mdi-clock-outline
            </v-icon>
            <span
              class='text-caption grey--text font-weight-light'
            >
            updated 10 minutes ago </span>
          </template>
        </base-material-chart-card>
      </v-col>
    </v-col>
  </v-container>
</template>

<script>
  export default {
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
                axisX: {
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
        },
        netSpaceLabels: [],
        netSpaceSeries: [],
        maxTransactionsLabels: [],
        maxTransactionsSeries: [],
        increaseTrans: 0,
        increaseNetspace: 0,
        increased: false,
        decreased: false
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
          const labels = res.data.map(record => record._id);
          const series = res.data.map(record => (req === 'get_transactions_per_day')?record.transactions_count : record.max_netspace/1125899906842620)

          const maxRecords = res.data.slice(-2);
          if(maxRecords[1] > maxRecords[0]){
            this.increased = true
            if(req === 'get_transactions_per_day'){
              this.increaseTrans = ((maxRecords[0]-maxRecords[1])/100.0).toFixed(2)
            }else{
              this.increaseTrans = ((maxRecords[0]-maxRecords[1])/100.0).toFixed(2)
            }
          }else{
            this.increased = false;
            if(req === 'get_transactions_per_day'){
              this.increaseTrans = ((maxRecords[0]-maxRecords[1])/100.0).toFixed(2)
            }else{
              this.increaseTrans = ((maxRecords[0]-maxRecords[1])/100.0).toFixed(2)
            }
          }

          return {
            labels: labels.slice(-20),
            series: [series.slice(-20)]
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
    },
     
  }
    
  
</script>
