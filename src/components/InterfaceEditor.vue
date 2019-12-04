<template>
  <v-dialog v-model="dialog" persistent max-width="600px">
    <v-card>
      <v-card-title>
        <span class="headline">Interface Information</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-text-field label="description" v-model="description" required />
          </v-row>
          <v-row>
            <v-select
              :items="[
                {
                  text: actors[0].description,
                  value: actors[0]
                },
                {
                  text: actors[1].description,
                  value: actors[1]
                }
              ]"
              label="Initiator"
              required
            />
          </v-row>
          <v-row>
            <v-select :items="[]" label="Phenomenon" required />
          </v-row>
          <v-row>
            <v-select
              :items="[
                {
                  text: 'event',
                  value: 0
                },
                {
                  text: 'state',
                  value: 1
                },
                {
                  text: 'value',
                  value: 2
                }
              ]"
              label="Type"
              required
            />
          </v-row>
          <v-select :items="globalPhenomenonList" />
          <v-textarea
            label="PhenomenonList"
            no-resize
            rows="6"
            :value="phenomenonEdit"
          />
          <v-row>
            <v-list disabled>
              <v-list-item-group>
                <v-subheader>PhenomenonList</v-subheader>
                <v-list-item v-for="item in phenomenonList" :key="item">{{
                  `${initiator.description}:${item.name} ${item.type}`
                }}</v-list-item>
              </v-list-item-group>
            </v-list>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn color="blue darken-1" text @click="dialog = false">Add</v-btn>
        <v-btn color="blue darken-1" text @click="dialog = false">Delete</v-btn>
        <v-btn color="blue darken-1" text @click="cancel">Close</v-btn>
        <v-btn color="blue darken-1" text @click="submit">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import Shape from '@/app/graph/shape/Shape'
import { InterfaceLine } from '@/app/graph/line/InterfaceLine'
import { Phenomenon } from '@/app/Phenomenon'

@Component({})
export default class InterfaceEditor extends Vue {
  @Prop(Boolean) active!: boolean
  description: string = ''
  initiator: Shape
  phenomenonList: Array<Phenomenon>
  type: number
  interfaceLine: InterfaceLine
  actors: [Shape, Shape]
  phenomenonEdit: string
  globalPhenomenonList: Array<Phenomenon> = Phenomenon.PhenomenonList

  submit() {
    this.interfaceLine.description = this.description
    this.interfaceLine.initiator = this.initiator
    this.interfaceLine.phenomenonList = this.phenomenonList
    this.interfaceLine.type = this.type
    this.$emit('end-edit-interface')
  }

  cancel() {
    this.$emit('end-edit-interface')
  }

  preSet(interfaceLine: InterfaceLine) {
    this.interfaceLine = interfaceLine
    this.description = interfaceLine.description
    this.phenomenonList = interfaceLine.phenomenonList
    this.type = interfaceLine.type
    this.actors = [this.interfaceLine.initiator, this.interfaceLine.receiver]
  }
}
</script>

<style scoped />
