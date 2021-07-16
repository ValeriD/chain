<template>
  <v-container
    id='typography'
    fluid
    tag='section'
  >
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
          title='Simple Table'
          class='px-5 py-3'
        >
          <v-card-text>
            <v-data-table
              :headers='headers'
              :items='items'
            />
          </v-card-text>
        </base-material-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    data: () => ({
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
      ],
      items: [
        {
          id: 1,
          date: 'Dakota Rice',
          txtype: 'Niger',
          sender: 'Oud-Tunrhout',
          reciever: '$35,738',
          amount: '100',
        },
        {
          id: 2,
          date: 'Dakota Rice',
          txtype: 'Niger',
          sender: 'Oud-Tunrhout',
          reciever: '$35,738',
          amount: '100',
        },
        {
          id: 3,
          date: 'Dakota Rice',
          txtype: 'Niger',
          sender: 'Oud-Tunrhout',
          reciever: '$35,738',
          amount: '100',
        },
        {
          id: 4,
          date: 'Dakota Rice',
          txtype: 'Niger',
          sender: 'Oud-Tunrhout',
          reciever: '$35,738',
          amount: '100',
        },
        {
          id: 5,
          date: 'Dakota Rice',
          txtype: 'Niger',
          sender: 'Oud-Tunrhout',
          reciever: '$35,738',
          amount: '100',
        },
      ],
    }),
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
