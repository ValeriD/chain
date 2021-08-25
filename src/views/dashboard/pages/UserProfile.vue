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
          :data='dailySalesChart.data'
          :options='dailySalesChart.options'
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
          :data='emailsSubscriptionChart.data'
          :options='emailsSubscriptionChart.options'
          :responsive-options='emailsSubscriptionChart.responsiveOptions'
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
        emailsSubscriptionChart: {
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
        dailySalesChart: {
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
    async mounted () {
      const res = await this.axios.get('get_nespace_per_day') // netspace per day
      const req = await this.axios.get('get_transactions_per_day') // transactions per day
      const netSpaceLabels = res.data.map(m => m._id)
      const netSpaceSeries = res.data.map(m => m.max_netspace / 1125899906842620)
      const maxTransactionsLabels = req.data.map(m => m._id) || []
      const maxTransactionsSeries = req.data.map(m => m.transactions_count) || []
      const maxTrans = maxTransactionsSeries.slice(-2)
      const maxNets = netSpaceSeries.slice(-2)

      if(maxTrans[1] > maxTrans[0]){
        this.increased = true
        this.increaseTrans = ((maxTrans[0]-maxTrans[1])/100.0).toFixed(2)
      }
      else {
        this.increased = false
        this.increaseTrans = ((maxTrans[0]-maxTrans[1])/100.0).toFixed(2)
      }
      if(maxNets[1] > maxNets[0]){
        this.decreased = true
        this.increaseNetspace = ((maxNets[0]-maxNets[1])/100.0).toFixed(2)
      }
      else {
        this.decreased = false
        this.increaseNetspace = ((maxNets[0]-maxNets[1])/100.0).toFixed(2)
      }
      if (maxTransactionsLabels || maxTransactionsSeries) {
        const chartData = {
          labels: maxTransactionsLabels.slice(-10),
          series: [maxTransactionsSeries.slice(-10)],
        }
        const chartData2 = {
          labels: netSpaceLabels.slice(-10),
          series: [netSpaceSeries.slice(-10)],
        }
        this.dailySalesChart = {
          ...this.dailySalesChart,
          data: chartData2,
          options: {
            ...this.dailySalesChart.options,
          },
        }
        this.emailsSubscriptionChart = {
          ...this.emailsSubscriptionChart,
          data: chartData,
          options: {
            ...this.emailsSubscriptionChart.options,
          },
        }
      }
    },
  }
</script>
