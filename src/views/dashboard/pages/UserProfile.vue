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

          <!-- <p class='d-inline-flex font-weight-light ml-2 mt-1'>
            <v-icon
              color='green'
              small
            >
              mdi-arrow-up
            </v-icon>
            <span class='green--text'>55%</span>&nbsp; increase in today's sales
          </p> -->

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

          <!-- <p class='d-inline-flex font-weight-light ml-2 mt-1'>
            Last Campaign Performance
          </p> -->

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
            updated 10 minutes ago</span>
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
            labels: this.maxTransactionsLabels,
            series: [[this.maxTransactionsSeries]],
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
              left: 0,
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
            labels: this.netSpaceLabels,
            series: [[this.netSpaceSeries]],
          },
          options: {
            lineSmooth: this.$chartist.Interpolation.cardinal({
              tension: 0,
            }),
            low: 0,
            high: this.maxNet, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
            chartPadding: {
              top: 0,
              right: 0,
              bottom: 0,
              left: 0,
            },
          },
        },  
        netSpaceLabels: [],
        netSpaceSeries: [],
        maxTransactionsLabels: [],
        maxTransactionsSeries:[],
        maxNet: 0,
        maxTrans: 0,
      }
    },
    computed: {
      netSpace () {
        return this.netSpaceLabels
      }
    },
    async mounted () {
      debugger;
      const res = await this.axios.get('get_nespace_per_day') // netspace per day
      const req = await this.axios.get('get_transactions_per_day') // transactions per day

      setTimeout(() => {
        this.netSpaceLabels = res.data.map(m => m._id)
        this.netSpaceSeries = res.data.map(m => m.max_netspace / 1125899906842620)
        this.maxTransactionsLabels = req.data.map(m => m._id)
        this.maxTransactionsSeries = req.data.map(m => m.transactions_count)
        
        const ncc = res.data.map(m => m.max_netspace / 1125899906842620) 
        const mts = req.data.map(m => m.transactions_count)
        this.maxNet = Math.max.apply(null, ncc) 
        this.maxTrans = Math.max.apply(null, mts)
    }, 3000)      
    },
  }
</script>
