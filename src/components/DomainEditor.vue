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
              :items="[
                {
                  text: 'GivenDomain',
                  value: 0
                },
                {
                  text: 'DesignDomain',
                  value: 1
                }
              ]"
              label="Physical Property"
              required
              v-model="physicalProperty"
            />
          </v-row>
          <v-row>
            <v-select
              :items="[
                {
                  text: 'Causal',
                  value: 0
                },
                {
                  text: 'Biddable',
                  value: 1
                },
                {
                  text: 'Lexical',
                  value: 2
                }
              ]"
              label="DomainType"
              required
              v-model="domainType"
            />
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn color="blue darken-1" text @click="cancel">Close</v-btn>
        <v-btn color="blue darken-1" text @click="submit">Save</v-btn>
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
  domainType: number = 0
  physicalProperty: number = 0

  submit() {
    this.$emit('end-edit-domain', {
      description: this.description,
      shortName: this.shortName,
      domainType: this.domainType,
      physicalProperty: this.physicalProperty
    })
  }

  cancel() {
    this.$emit('end-edit-domain')
  }

  preSet(
    description: string,
    shortName: string,
    domainType: number,
    physicalProperty: number
  ) {
    this.description = description
    this.shortName = shortName
    this.domainType = domainType
    this.physicalProperty = physicalProperty
  }
}
</script>

<style scoped />
