<template>
  <v-container
    id='regular-tables'
    fluid
    tag='section'
  >
    <v-col
      cols='12'
      md='12'
    >
      <base-material-card
        icon='mdi-clipboard-text'
        title='Addresses'
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
            :items-per-page="25"
          />
        </v-card-text>
      </base-material-card>
    </v-col>
  </v-container>
</template>
<script>
  export default {
    name: 'RegularTables',

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
            text: 'Address',
            value: 'address',
          },
          {
            sortable: false,
            text: 'Balance',
            value: 'balance',
            align: 'right',
          },
        ],
        items: [],
      }
    },
    async mounted () {
      const res = await this.axios.get('get_addresses') // addresses

      // table data filled
      res.data.forEach((b, index) => {
        this.items.push({
          id: index,
          address: b.address,
          balance: b.current_balance,
        })
      })
    },
  }
</script>
