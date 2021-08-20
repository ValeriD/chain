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
          title='Transactions'
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
      items: [],
    }),
    async mounted () {
      const res = await this.axios.get('get_transactions', { params: { limit: 100, offset: 10 } }) // transactions

      // table data filled
      res.data.forEach((b, index) => {
        this.items.push({
          id: index,
          date: new Date( b.created_at).toString().slice(3, 24),
          sender: b.sender,
          reciever: b.receiver,
          amount: b.amount,
        })
      })
    },
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
