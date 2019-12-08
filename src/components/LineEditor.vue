<template>
  <v-dialog v-model="active" persistent max-width="600px">
    <v-card>
      <v-card-title>
        <span class="headline">{{ editorType }} Information</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-text-field label="description" v-model="description" required />
          </v-row>
          <v-row>
            <v-select
              :items="actorName"
              label="Initiator"
              v-model="initiator"
              required
            />
          </v-row>
          <v-row>
            <v-select
              :items="actorName"
              label="Receiver"
              v-model="receiver"
              required
            />
          </v-row>
          <v-row>
            <v-menu absolute offset-y>
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-on="on"
                  v-model="phenomenonNameEdit"
                  label="Phenomenon"
                />
              </template>
              <v-list>
                <v-list-item-group>
                  <v-list-item
                    v-for="item in globalPhenomenonListName"
                    :key="item.text"
                    @click="selectPhenomenon(item.value)"
                    >{{ item.text }}</v-list-item
                  >
                </v-list-item-group>
              </v-list>
            </v-menu>
          </v-row>
          <v-row>
            <v-select :items="lineType" label="Type" v-model="type" required />
          </v-row>
          <v-row>
            <v-checkbox
              v-if="hasConstraint"
              v-model="isConstraint"
              label="constraint"
            />
          </v-row>
          <v-row>
            <v-list>
              <v-list-item-group v-model="phenomenonSelect">
                <v-subheader>PhenomenonList</v-subheader>
                <v-list-item v-for="item in phenomenonList" :key="item.name">{{
                  `${line.initiator.description}:${item.name} ${lineType[type].text}`
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
import Shape from '@/app/graph/shape/Shape'
import { InterfaceLine } from '@/app/graph/line/InterfaceLine'
import { Phenomenon } from '@/app/graph/Phenomenon'
import { Line } from '@/app/graph/line/Line'
import Reference from '../app/graph/line/Reference'
import Constraint from '../app/graph/line/Constraint'

@Component({})
export default class LineEditor extends Vue {
  @Prop(Boolean) active!: boolean
  editorType: string = ''
  hasConstraint: boolean = false
  line: Line = null

  description: string = ''

  initiator: number = 0
  receiver: number = 1
  actors: Array<Shape> = []
  get actorName() {
    return this.actors.map((e, index) => {
      return {
        text: e.description,
        value: index
      }
    })
  }

  lineType = [
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
  ]
  type: number = 0

  isConstraint: boolean = false

  phenomenonNameEdit: string = ''
  phenomenonEdit: Phenomenon = null
  globalPhenomenonList: Array<Phenomenon> = []
  get globalPhenomenonListName() {
    return this.globalPhenomenonList.map((e, index) => {
      return {
        text: e.name,
        value: index
      }
    })
  }

  phenomenonSelect: number = -1
  phenomenonList: Array<Phenomenon> = []

  submit() {
    if (this.initiator !== this.receiver) {
      this.line.setInformation(
        this.description,
        this.actors[this.initiator],
        this.actors[this.receiver]
      )
    }
    this.line.setInformation(this.description, null, null)
    this.$emit('end-edit-line')
  }

  cancel() {
    this.$emit('end-edit-line')
  }

  preSet(line: Line) {
    if (line instanceof InterfaceLine) {
      this.editorType = 'Interface'
      this.hasConstraint = false
    } else if (line instanceof Reference) {
      this.editorType = 'Reference'
    } else if (line instanceof Constraint) {
      this.editorType = 'Constraint'
    }
    this.line = line
    this.description = line.description
    this.phenomenonList = line.phenomenonList
    this.actors = [this.line.initiator, this.line.receiver]
    this.initiator = 0
    this.receiver = 1
    this.globalPhenomenonList = Phenomenon.PhenomenonList
    this.phenomenonNameEdit = ''
    this.phenomenonSelect = 0
  }

  add(): void {
    if (
      this.phenomenonEdit &&
      this.phenomenonNameEdit === this.phenomenonEdit.name
    ) {
      this.line.addPhenomenon(this.phenomenonEdit)
    } else {
      let p = new Phenomenon(
        this.phenomenonNameEdit,
        this.type,
        this.isConstraint
      )
      this.line.addPhenomenon(p)
    }
  }

  del(): void {
    this.line.deletePhenomenon(this.phenomenonList[this.phenomenonSelect])
  }

  selectPhenomenon(index): void {
    this.phenomenonEdit = this.globalPhenomenonList[index]
    this.phenomenonNameEdit = this.globalPhenomenonList[index].name
    this.isConstraint = this.phenomenonEdit.constraint
    this.type = this.phenomenonEdit.type
  }
}
</script>

<style scoped />
