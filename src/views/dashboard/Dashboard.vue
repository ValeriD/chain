<template>
  <v-container
    id='dashboard'
    fluid
    tag='section'
  >
    <v-row>
      <v-col
        cols='12'
        sm='6'
        lg='3'
      >
        <base-material-stats-card
          color='primary'
          icon='mdi-arrange-send-to-back'
          title='Last block'
          value='+245'
        />
      </v-col>

      <v-col
        cols='12'
        sm='6'
        lg='3'
      >
        <base-material-stats-card
          color='info'
          icon='mdi-poll'
          title='Netspace'
          value='75.521'
        />
      </v-col>

      <v-col
        cols='12'
        sm='6'
        lg='3'
      >
        <base-material-stats-card
          color='#ff1744'
          icon='mdi-circle-multiple-outline'
          title='Circulating supply'
          value='$ 34,245'
        />
      </v-col>

      <v-col
        cols='12'
        sm='6'
        lg='3'
      >
        <base-material-stats-card
          color='orange'
          icon='mdi-account-multiple-outline'
          title='Unique address count'
          value='184'
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
        <base-material-card
          icon='mdi-clipboard-text'
          title='Simple Table'
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
            :items-per-page="10"
            />
          </v-card-text>
        </base-material-card>
      </v-col>

      <!-- <v-col cols='12' md='6'>
        <base-material-card class='px-5 py-3'>
          <template v-slot:heading>
            <v-tabs
              v-model='tabs'
              background-color='transparent'
              slider-color='white'
            >
              <span
                class='subheading font-weight-light mx-3'
                style='align-self: center'
                >Tasks:</span
              >
              <v-tab class='mr-3'>
                <v-icon class='mr-2'>
                  mdi-bug
                </v-icon>
                Bugs
              </v-tab>
              <v-tab class='mr-3'>
                <v-icon class='mr-2'>
                  mdi-code-tags
                </v-icon>
                Website
              </v-tab>
              <v-tab>
                <v-icon class='mr-2'>
                  mdi-cloud
                </v-icon>
                Server
              </v-tab>
            </v-tabs>
          </template>

          <v-tabs-items v-model='tabs' class='transparent'>
            <v-tab-item v-for='n in 3' :key='n'>
              <v-card-text>
                <template v-for='(task, i) in tasks[tabs]'>
                  <v-row :key='i' align='center'>
                    <v-col cols='1'>
                      <v-list-item-action>
                        <v-checkbox v-model='task.value' color='secondary' />
                      </v-list-item-action>
                    </v-col>

                    <v-col cols='9'>
                      <div class='font-weight-light' v-text='task.text' />
                    </v-col>

                    <v-col cols='2' class='text-right'>
                      <v-icon class='mx-1'>
                        mdi-pencil
                      </v-icon>
                      <v-icon color='error' class='mx-1'>
                        mdi-close
                      </v-icon>
                    </v-col>
                  </v-row>
                </template>
              </v-card-text>
            </v-tab-item>
          </v-tabs-items>
        </base-material-card>
      </v-col> -->
    </v-row>
  </v-container>
</template>

<script>
  export default {
    name: 'DashboardDashboard',

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
            text: 'Block Height',
            value: 'blockheight',
          },
          {
            sortable: false,
            text: 'Block Hash',
            value: 'blockhash',
            align: 'right',
          },
          {
            sortable: false,
            text: 'Number of transactions',
            value: 'numberoftransactions',
            align: 'right',
          },
          {
            sortable: false,
            text: 'Time',
            value: 'time',
            align: 'right',
          },
        ],
        items: [
          {
            id: 1,
            blockheight: 'Dakota Rice',
            blockhash: 'Niger',
            time: '$35,738',
            numberoftransactions: '100',
          },
        ],
        tabs: 0,
        tasks: {
          0: [],
          1: [],
          2: [],
        },
        list: {
          0: false,
          1: false,
          2: false,
        },
      }
    },

    methods: {
      complete (index) {
        this.list[index] = !this.list[index]
      },
    },
  }
</script>
