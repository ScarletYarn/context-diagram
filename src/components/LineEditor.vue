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
                    v-for="item in choices"
                    :key="item.text"
                    @click="selectPhenomenon(item.value)"
                    >{{ item.text }}</v-list-item
                  >
                </v-list-item-group>
              </v-list>
            </v-menu>
          </v-row>
          <v-row>
            <v-select
              :items="phenomenonType"
              label="Type"
              v-model="type"
              required
            />
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
                  `${line.initiator.description}:${item.description} ${phenomenonType[type].text}`
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
import { Component, Prop, Vue } from 'vue-property-decorator'
import Shape from '@/app/graph/shape/Shape'
import { InterfaceLine } from '@/app/graph/line/InterfaceLine'
import { Phenomenon, PhenomenonPosition } from '@/app/graph/Phenomenon'
import { Line } from '@/app/graph/line/Line'
import Reference from '../app/graph/line/Reference'
import Constraint from '../app/graph/line/Constraint'
import { Domain } from '@/app/graph/shape/Domain'

@Component({})
export default class LineEditor extends Vue {
  @Prop(Boolean) active!: boolean
  editorType: string = ''
  hasConstraint: boolean = false
  line: Line = null
  // Whatever the line is, a domain is associated with it.
  domain: Domain = null

  description: string = ''

  // The selected actor index for initiator
  initiator: number = 0
  // The selected actor index for receiver
  receiver: number = 1
  // The initiator and receiver of the line, used for an exchange or adding interaction.
  actors: Array<Shape> = []
  get actorName() {
    return this.actors.map((e, index) => {
      return {
        text: e.description,
        value: index
      }
    })
  }

  phenomenonType = [
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

  // The phenomenon name in edit, used for adding new phenomenon or set correspondingly when existing one is chosen
  phenomenonNameEdit: string = ''
  type: number = 0
  isConstraint: boolean = false
  // The unique name for phenomenon
  phenomenonName: string = ''
  phenomenonChoices: Array<Phenomenon> = []
  get choices() {
    if (!this.domain) return []
    else
      return this.domain.phenomenonList.map((e, index) => {
        return {
          text: e.description,
          value: index
        }
      })
  }

  // The phenomenon selected in the phenomenonList, used for query and delete.
  phenomenonSelect: number = -1
  // The phenomenons of the line which already exist.
  phenomenonList: Array<Phenomenon> = []

  submit() {
    debugger
    if (this.initiator !== this.receiver && this.initiator !== 1) {
      this.line.setInformation(
        this.description,
        this.actors[this.initiator],
        this.actors[this.receiver]
      )
    } else this.line.setInformation(this.description, null, null)
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
      this.hasConstraint = true
    } else if (line instanceof Constraint) {
      this.editorType = 'Constraint'
      this.hasConstraint = true
    }
    this.line = line
    this.description = line.description
    this.phenomenonList = line.phenomenonList
    this.phenomenonSelect = -1
    this.phenomenonNameEdit = ''
    this.type = 0
    this.isConstraint = false
    this.actors = [this.line.initiator, this.line.receiver]
    this.initiator = 0
    this.receiver = 1
    let domain: Domain
    if (this.line.initiator instanceof Domain) domain = this.line.initiator
    else if (this.line.receiver instanceof Domain) domain = this.line.receiver
    if (!domain) throw 'Line not properly connected.'
    this.domain = domain
    this.phenomenonChoices = domain.phenomenonList
  }

  add(): void {
    if (this.line instanceof InterfaceLine) {
      /* The phenomenon added is in the left part of the diagram
         No duplicate phenomenon is allowed.
       */
      if (Phenomenon.getPhenomenon(this.phenomenonNameEdit)) return
      let p = new Phenomenon(
        this.phenomenonNameEdit,
        PhenomenonPosition.Left,
        this.line.initiator,
        this.line.receiver,
        this.type
      )
      this.line.addPhenomenon(p)
      this.domain.addPhenomenon(p)
    } else {
      let p = Phenomenon.getPhenomenon(this.phenomenonNameEdit, true)
      if (p) this.line.addPhenomenon(p)
      else {
        p = new Phenomenon(
          this.phenomenonNameEdit,
          PhenomenonPosition.Right,
          this.line.initiator,
          this.line.receiver,
          this.type,
          this.isConstraint
        )
        this.line.addPhenomenon(p)
        this.domain.addPhenomenon(p)
      }
    }
  }

  del(): void {
    this.line.deletePhenomenon(this.phenomenonList[this.phenomenonSelect])
    this.domain.removePhenomenon(this.phenomenonList[this.phenomenonSelect])
    Phenomenon.deletePhenomenon(this.phenomenonName)
    this.phenomenonList.splice(this.phenomenonSelect, 1)
  }

  selectPhenomenon(index): void {
    this.phenomenonNameEdit = this.phenomenonChoices[index].description
    this.isConstraint = this.phenomenonChoices[index].constraint
    this.type = this.phenomenonChoices[index].type
    this.phenomenonName = this.phenomenonChoices[index].name
  }
}
</script>

<style scoped />
