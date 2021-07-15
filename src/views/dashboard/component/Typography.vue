<template>
  <v-container id="typography" fluid tag="section">
    <v-row align="center" justify="center">
      <v-col cols="12" md="12">
        <base-material-card
          icon="mdi-clipboard-text"
          title="Simple Table"
          class="px-5 py-3"
        >
          <v-card-text>
            <v-data-table :headers="headers" :items="items" />
          </v-card-text>
        </base-material-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
const leader =
  "I will be the leader of a company that ends up being worth billions of dollars, because I got the answers. I understand culture. I am the nucleus. I think that’s a responsibility that I have, to push possibilities, to show people, this is the level that things could be at.";
const leaderShort = leader.slice(0, 105) + "...";
const material = "The Life of Material Dashboard";
const small = "Header with small subtitle";

export default {
  data: () => ({
    headers: [
      {
        sortable: false,
        text: "ID",
        value: "id"
      },
      {
        sortable: false,
        text: "Name",
        value: "name"
      },
      {
        sortable: false,
        text: "Salary",
        value: "salary",
        align: "right"
      },
      {
        sortable: false,
        text: "Country",
        value: "country",
        align: "right"
      },
      {
        sortable: false,
        text: "City",
        value: "city",
        align: "right"
      }
    ],
    items: [
      {
        id: 1,
        name: "Dakota Rice",
        country: "Niger",
        city: "Oud-Tunrhout",
        salary: "$35,738"
      },
      {
        id: 2,
        name: "Minerva Hooper",
        country: "Curaçao",
        city: "Sinaai-Waas",
        salary: "$23,738"
      },
      {
        id: 3,
        name: "Sage Rodriguez",
        country: "Netherlands",
        city: "Overland Park",
        salary: "$56,142"
      },
      {
        id: 4,
        name: "Philip Chanley",
        country: "Korea, South",
        city: "Gloucester",
        salary: "$38,735"
      },
      {
        id: 5,
        name: "Doris Greene",
        country: "Malawi",
        city: "Feldkirchen in Kārnten",
        salary: "$63,542"
      }
    ]
  })
};
</script>

<style lang="scss">
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
