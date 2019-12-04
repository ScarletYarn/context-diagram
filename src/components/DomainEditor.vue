<template>
  <v-dialog v-model="active" persistent max-width="600px">
    <v-card>
      <v-card-title>
        <span class="headline">ProblemDomain Information</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-text-field label="description" v-model="description" />
          </v-row>
          <v-row>
            <v-text-field label="shortname" v-model="shortName" />
          </v-row>
          <v-row>
            <v-select
              :items="['GivenDomain', 'DesignDomain']"
              label="Physical Property"
              required
            />
          </v-row>
          <v-row>
            <v-select
              :items="['Causal', 'Biddable', 'Lexical']"
              label="DomainType"
              required
            />
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
        <v-btn color="blue darken-1" text @click="dialog = false">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component({})
export default class DomainEditor extends Vue {
  @Prop(Boolean) active!: boolean
  description: string = ''
  shortName: string = ''

  submit() {
    this.$emit('end-edit-domain', {
      description: this.description,
      shortName: this.shortName
    })
  }

  cancel() {
    this.$emit('end-edit-domain')
  }

  preSet(description: string, shortName: string) {
    this.description = description
    this.shortName = shortName
  }
}
</script>

<style scoped />
