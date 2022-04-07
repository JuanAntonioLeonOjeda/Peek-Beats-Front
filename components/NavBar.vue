<template>
  <v-app-bar
    color="deep-purple accent-4"
    dark
    app
    clipped-left
    elevation="20"
    rounded
  >
    <v-container>
      <v-row class="align-center">
        <v-col cols="2" class="text-center">
          <v-btn> Discover </v-btn>
        </v-col>
        <v-spacer />
        <v-icon>mdi-heart</v-icon>
        <v-col cols="2">
          <v-toolbar-title>Peek Beats</v-toolbar-title>
        </v-col>
        <v-spacer />
        <v-autocomplete
          v-model="model"
          :items="genres"
          :search-input.sync="search"
          chips
          clearable
          hide-details
          hide-selected
          item-text="name"
          item-value="symbol"
          label="Search for a genre..."
          solo-inverted
          multiple
          rounded
        >
          <template #no-data>
            <v-list-item>
              <v-list-item-title>
                Search for your favorite
                <strong>Genre</strong>
              </v-list-item-title>
            </v-list-item>
          </template>
          <template #selection="{ attr, on, item, selected }">
            <v-chip
              v-bind="attr"
              :input-value="selected"
              color="blue-grey"
              class="white--text"
              v-on="on"
            >
              <v-icon left>
                mdi-music-clef-treble
              </v-icon>
              <span v-text="item.name" />
            </v-chip>
          </template>
          <template #item="{ item }">
            <v-list-item-avatar
              color="indigo"
              class="text-h5 font-weight-light white--text"
            >
              {{ item.name.charAt(0) }}
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title v-text="item.name" />
              <v-list-item-subtitle v-text="item.symbol" />
            </v-list-item-content>
            <v-list-item-action>
              <v-icon>mdi-music-clef-treble</v-icon>
            </v-list-item-action>
          </template>
        </v-autocomplete>
      </v-row>
    </v-container>
  </v-app-bar>
</template>

<script>
export default {
  name: 'NavBar',
  data () {
    return {
      isLoading: false,
      items: [],
      model: null,
      search: null,
      tab: null,
      genres: []
    }
  },
  async mounted () {
    const genre = await this.$store.dispatch('getAllGenres')
    this.genres = genre
  }
}
</script>

<style lang='scss' scoped>
</style>
