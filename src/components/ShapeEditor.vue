<template>
  <v-dialog v-if="shape" :value="active" persistent max-width="600px">
    <v-card>
      <v-card-title>
        <span class="headline">Requirement Information</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-text-field label="description" v-model="shape.description" />
          </v-row>
          <v-row v-if="haveShortName">
            <v-text-field label="short name" v-model="shape.shortName" />
          </v-row>
          <v-row justify="space-between">
            <v-col>
              <v-text-field label="width" v-model="shape.width" />
            </v-col>
            <v-col>
              <v-text-field label="height" v-model="shape.height" />
            </v-col>
          </v-row>
          <v-row v-if="isDomain">
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
              v-model="shape.physicalProperty"
            />
          </v-row>
          <v-row v-if="isDomain">
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
              v-model="shape.domainType"
            />
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn color="blue darken-1" text @click="$emit('end-edit-shape')"
          >Close</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import Shape from '../app/graph/shape/Shape'
import { Domain } from '@/app/graph/shape/Domain'
import Machine from '@/app/graph/shape/Machine'

@Component({
  watch: {
    shape(val) {
      this.description = val.description
    }
  }
})
export default class ShapeEditor extends Vue {
  @Prop() active!: boolean
  @Prop() shape!: Shape

  get haveShortName(): boolean {
    return this.shape instanceof Domain || this.shape instanceof Machine
  }

  get isDomain(): boolean {
    return this.shape instanceof Domain
  }
}
</script>

<style scoped />
