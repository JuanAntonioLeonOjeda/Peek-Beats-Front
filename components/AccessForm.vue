<template>
  <v-app class="font">
    <v-main>
      <v-container class="mt-5 fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="8">
            <v-card elevation="12" class="blue-grey darken-3 accent-2">
              <v-window v-model="step">
                <v-window-item :value="2">
                  <v-row>
                    <v-col
                      cols="12"
                      md="5"
                      class="alreadyOn deep-purple darken-2"
                    >
                      <v-card-text class="white--text mt-12">
                        <h1 class="text-center">
                          Already a Peek?
                        </h1>
                        <v-divider class="mt-3 mb-3" dark />
                      </v-card-text>
                      <div class="text-center">
                        <v-btn
                          class="mt-5"
                          color="teal accent-2"
                          outlined
                          elevation="2"
                          x-large
                          dark
                          @click="step--"
                        >
                          LogIn
                        </v-btn>
                      </div>
                    </v-col>
                    <v-col cols="12" md="7">
                      <v-card-text class="mt-12">
                        <h1 class="text-center teal--text text--accent-2">
                          PeekBeats
                        </h1>
                        <v-divider class="mt-3 mb-3" dark />
                        <v-form ref="form" v-model="valid" lazy-validation>
                          <v-text-field
                            v-model="username"
                            background-color="blue-grey darken-2"
                            dark
                            color="white"
                            outlined
                            :counter="10"
                            :rules="usernameRules"
                            label="Username"
                            prepend-inner-icon="mdi-form-textbox"
                            required
                          />
                          <v-text-field
                            v-model="email"
                            background-color="blue-grey darken-2"
                            dark
                            color="white"
                            outlined
                            :rules="emailRules"
                            label="E-mail"
                            prepend-inner-icon="mdi-at"
                            required
                          />
                          <v-text-field
                            v-model="pass1"
                            background-color="blue-grey darken-2"
                            dark
                            color="white"
                            hint="At least 8 characters"
                            counter
                            :rules="passwordRules"
                            outlined
                            :type="passVisible ? 'text' : 'password'"
                            label="Password"
                            prepend-inner-icon="mdi-onepassword"
                            :append-icon="
                              passVisible
                                ? 'mdi-eye-outline'
                                : 'mdi-eye-off-outline'
                            "
                            @click:append="passVisible = !passVisible"
                          />
                          <v-text-field
                            v-model="pass2"
                            background-color="blue-grey darken-2"
                            dark
                            color="white"
                            hint="At least 8 characters"
                            counter
                            :rules="passwordRules.concat(passwordConfirmationRule)"
                            outlined
                            :type="passVisible1 ? 'text' : 'password'"
                            label="Confirm password"
                            prepend-inner-icon="mdi-onepassword"
                            :append-icon="
                              passVisible1
                                ? 'mdi-eye-outline'
                                : 'mdi-eye-off-outline'
                            "
                            @click:append="passVisible1 = !passVisible1"
                          />
                          <v-row>
                            <v-col cols="12" sm="12" md="12">
                              <v-dialog
                                ref="dialog"
                                v-model="modal"
                                :return-value.sync="date"
                                persistent
                                width="290px"
                              >
                                <template #activator="{ on, attrs }">
                                  <v-text-field
                                    v-model="date"
                                    dark
                                    color="white"
                                    label="Birthday"
                                    prepend-icon="mdi-cake-variant-outline"
                                    readonly
                                    v-bind="attrs"
                                    v-on="on"
                                  />
                                </template>
                                <v-date-picker v-model="date" scrollable>
                                  <v-spacer />
                                  <v-btn
                                    text
                                    color="primary"
                                    @click="modal = false"
                                  >
                                    Cancel
                                  </v-btn>
                                  <v-btn
                                    text
                                    color="primary"
                                    @click="$refs.dialog.save(date)"
                                  >
                                    OK
                                  </v-btn>
                                </v-date-picker>
                              </v-dialog>
                            </v-col>
                          </v-row>
                          <v-row>
                            <v-col
                              cols="12"
                              sm="7"
                              md="7"
                            >
                              <v-checkbox
                                v-model="checkbox"
                                color="white"
                                dark
                                :rules="[
                                  (v) =>
                                    !!v ||
                                    'You must agree the Terms and Conditions to continue!',
                                ]"
                                label="Terms and Conditions"
                                required
                              />
                            </v-col>
                            <v-col
                              cols="12"
                              sm="5"
                              md="5"
                            >
                              <v-checkbox
                                color="white"
                                dark
                                label="Mailing List"
                                required
                              />
                            </v-col>
                          </v-row>
                          <v-divider dark />
                          <v-btn
                            :disabled="!valid"
                            class="mt-5"
                            color="teal accent-2"
                            outlined
                            elevation="2"
                            x-large
                            block
                            @click="validate(); signup()"
                          >
                            JOIN
                          </v-btn>
                        </v-form>
                      </v-card-text>
                    </v-col>
                  </v-row>
                </v-window-item>
                <v-window-item :value="1">
                  <v-row class="fill-height">
                    <v-col cols="12" md="5" class="newTo deep-purple darken-2">
                      <v-card-text class="white--text mt-12">
                        <h1 class="text-center">
                          New to PeekBeats?
                        </h1>
                      </v-card-text>
                      <v-divider class="mt-3 mb-3" dark />
                      <div class="text-center">
                        <v-btn
                          class="mt-5"
                          color="teal accent-2"
                          outlined
                          elevation="2"
                          x-large
                          dark
                          @click="step++"
                        >
                          Join now
                        </v-btn>
                      </div>
                    </v-col>
                    <v-col cols="12" md="7">
                      <v-card-text class="mt-12">
                        <h1 class="text-center teal--text text--accent-2">
                          LogIn
                        </h1>
                        <v-divider class="mt-3 mb-3" dark />
                        <v-form>
                          <v-text-field
                            v-model="email"
                            background-color="blue-grey darken-2"
                            dark
                            color="white"
                            outlined
                            :rules="emailRules"
                            label="E-mail"
                            prepend-inner-icon="mdi-at"
                            required
                          />
                          <v-text-field
                            v-model="pass1"
                            background-color="blue-grey darken-2"
                            dark
                            color="white"
                            hint="At least 8 characters"
                            counter
                            :rules="passwordRules"
                            outlined
                            :type="passVisible ? 'text' : 'password'"
                            label="Password"
                            prepend-inner-icon="mdi-onepassword"
                            :append-icon="
                              passVisible
                                ? 'mdi-eye-outline'
                                : 'mdi-eye-off-outline'
                            "
                            @click:append="passVisible = !passVisible"
                          />
                          <v-divider class="mt-3 mb-3" dark />
                          <div class="text-center mt-5">
                            <v-btn
                              class="mt-5"
                              color="teal accent-2"
                              outlined
                              elevation="2"
                              x-large
                              block
                              @click="login"
                            >
                              login
                            </v-btn>
                          </div>
                        </v-form>
                      </v-card-text>
                    </v-col>
                  </v-row>
                </v-window-item>
              </v-window>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>

export default {
  props: {
    source: String
  },
  data: () => ({
    step: 2,
    valid: true,
    username: '',
    usernameRules: [
      v => !!v || 'Username is required',
      v => (v && v.length <= 10) || 'Username must be less than 10 characters'
    ],
    email: '',
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
    ],
    select: null,
    checkbox: false,
    pass1: '',
    pass2: '',
    passwordRules: [
      v => !!v || 'Required.',
      v => v.length >= 8 || 'Min 8 characters'
    ],
    radioGroup: '',
    date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .substr(0, 10),
    menu: false,
    modal: false,
    menu2: false,
    passVisible: false,
    passVisible1: false,
    alert: true,
    noError: true,
    hasError: true
  }),
  computed: {
    passwordConfirmationRule () {
      return () => this.pass1 === this.pass2 || 'Password must match'
    }
  },
  mounted () {
  },

  methods: {
    validate () {
      this.$refs.form.validate()
    },
    async login () {
      await this.$auth.loginWith('local', {
        data: {
          email: this.email,
          password: this.pass1
        }
      })
      this.$router.push({ path: '/home' })
    },
    async signup () {
      const form = {
        userName: this.username,
        email: this.email,
        password: this.pass1,
        dateOfBirth: this.date
      }
      await this.$store.dispatch('signup', form)
      this.login()
    }
  }
}
</script>

<style scoped>
.font {
  font-family: "Cormorant", serif;
}
h1 {
  font-size: calc(1vw + 1vh + 2.5vmin);
}
.newTo {
  background-image: url("https://images.pexels.com/photos/1072179/pexels-photo-1072179.jpeg?cs=srgb&dl=pexels-c%C3%A1tia-matos-1072179.jpg&fm=jpg");
  background-size: 1000px 1000px;
}
.alreadyOn {
  background-image: url("https://images.pexels.com/photos/1072179/pexels-photo-1072179.jpeg?cs=srgb&dl=pexels-c%C3%A1tia-matos-1072179.jpg&fm=jpg");
  background-size: 1000px 1000px;
}
.alert {
  width: 70%;
  margin: 10px auto;
}
.text-success {
  display: none;
}
.text-danger {
  display: none;
}
</style>
