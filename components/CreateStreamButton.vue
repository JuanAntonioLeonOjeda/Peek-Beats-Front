<template>
  <div>
    <v-btn color="secondary" @click="startStream">
      Start Stream
    </v-btn>
    <v-container fluid>
      <v-row align="center">
        <v-col
          class="d-flex"
          cols="12"
          sm="6"
        >
          <v-select
            v-model="genre"
            :items="genres"
            label="Standard"
            item-text="name"
          />
          <!-- <v-select
            v-model="genre"
            :items="genres"
            label="Tags"
            chips
          >
            <template #selection="{ item }">
              {{ item.name }}
            </template>
            <template #item="{ item, attrs, on }">
              <v-list-item v-bind="attrs" v-on="on">
                <v-list-item-content>
                  <v-list-item-title>
                    <span>{{ item.name }}</span>
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </template>
          </v-select>
          {{ genre.id }} -->
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
const { v4: uuidv4 } = require('uuid')
export default {
  name: 'CreateStreamButton',
  data () {
    return {
      // genres: [{ id: 1, name: 'Jazz' }, { id: 2, name: 'Rock' }, { id: 3, name: 'Electro' }],
      genres: [],
      genre: ''
    }
  },
  async mounted () {
    try {
      const genre = await this.$store.dispatch('getAllGenres')
      this.genres = genre
    } catch (error) {
      throw new Error(error)
    }
  },
  methods: {
    async startStream () {
      const genreId = this.genres.filter(e => e.name === this.genre)
      await this.$store.dispatch('createStream', genreId[0]._id)
      const roomId = uuidv4()
      const stream = await this.$store.dispatch('assignStreamRoom', roomId)
      this.$store.commit('getStreamInfo', stream)
      // this.$store.commit('getRoom', roomId)
      this.$store.commit('changeRole')
      this.$router.push({
        path: `/streams/${roomId}`
      })
    }
  }
}

</script>

<style lang="scss" scoped>

</style>
