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
            text: 'Date',
            value: 'date',
          },
          {
            sortable: false,
            text: 'TX Type',
            value: 'txtype',
            align: 'right',
          },
          {
            sortable: false,
            text: 'Sender',
            value: 'sender',
            align: 'right',
          },
          {
            sortable: false,
            text: 'Reciever',
            value: 'reciever',
            align: 'right',
          },
          {
            sortable: false,
            text: 'Amount',
            value: 'amount',
            align: 'right',
          },
          {
            sortable: false,
            text: 'Confirmations',
            value: 'confirmations',
            align: 'right',
          },
        ],
        items: [
          {
            id: 1,
            date: 'Dakota Rice',
            txtype: 'Niger',
            sender: 'Oud-Tunrhout',
            reciever: '$35,738',
            amount: '100',
            confirmations: '20',
          },
          {
            id: 2,
            date: 'Dakota Rice',
            txtype: 'Niger',
            sender: 'Oud-Tunrhout',
            reciever: '$35,738',
            amount: '100',
            confirmations: '20',
          },
          {
            id: 3,
            date: 'Dakota Rice',
            txtype: 'Niger',
            sender: 'Oud-Tunrhout',
            reciever: '$35,738',
            amount: '100',
            confirmations: '20',
          },
          {
            id: 4,
            date: 'Dakota Rice',
            txtype: 'Niger',
            sender: 'Oud-Tunrhout',
            reciever: '$35,738',
            amount: '100',
            confirmations: '20',
          },
          {
            id: 5,
            date: 'Dakota Rice',
            txtype: 'Niger',
            sender: 'Oud-Tunrhout',
            reciever: '$35,738',
            amount: '100',
            confirmations: '20',
          },
        ],
      }
    },
  }
</script>
