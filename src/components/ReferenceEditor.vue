<template>
  <v-dialog v-model="active" persistent max-width="600px">
    <v-card>
      <v-card-title>
        <span class="headline">Interface Information</span>
      </v-card-title>
      <v-card-text>
        <v-container>
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
              label="Receiver"
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
              v-model="type"
              required
            />
          </v-row>
          <v-row>
            <v-select :items="globalPhenomenonList" v-model="phenomenonEdit" />
          </v-row>
          <v-row>
            <v-checkbox v-model="constraint" :label="`constraint:`" />
          </v-row>
          <v-row>
            <v-list disabled>
              <v-list-item-group v-model="phenomenonSelect">
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
        <v-btn color="blue darken-1" text @click="add">Add</v-btn>
        <v-btn color="blue darken-1" text @click="del">Delete</v-btn>
        <v-btn color="blue darken-1" text @click="cancel">Close</v-btn>
        <v-btn color="blue darken-1" text @click="submit">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import Reference from '@/app/graph/line/Reference'
import Shape from '@/app/graph/shape/Shape'
import { Phenomenon } from '@/app/graph/Phenomenon'

@Component({})
export default class ReferenceEditor extends Vue {
  @Prop(Boolean) active!: boolean
  description: string = ''
  type: number = 0
  initiator: Shape
  phenomenonList: Array<Phenomenon>
  reference: Reference
  actors: [Shape, Shape]
  phenomenonEdit: string
  globalPhenomenonList: Array<Phenomenon> = Phenomenon.PhenomenonList
  phenomenonSelect: number
  constraint: boolean

  submit() {
    this.reference.description = this.description
    this.reference.initiator = this.initiator
    this.reference.phenomenonList = this.phenomenonList
    // this.reference.type = this.type
    this.$emit('end-edit-reference')
  }

  cancel() {
    this.$emit('end-edit-reference')
  }

  preSet(reference: Reference) {
    this.reference = reference
    this.description = reference.description
    this.phenomenonList = reference.phenomenonList
    this.constraint = false
    this.actors = [reference.initiator, reference.receiver]
  }

  add(): void {
    let p = new Phenomenon(this.phenomenonEdit, this.type)
    this.reference.phenomenonList.push(p)
    Phenomenon.PhenomenonList.push(p)
  }

  del(): void {
    this.reference.phenomenonList.splice(this.phenomenonSelect, 1)
  }
}
</script>

<style scoped />
