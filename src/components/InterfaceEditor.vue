<template>
  <v-dialog v-model="active" persistent max-width="600px">
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
            <v-list>
              <v-list-item-group v-model="phenomenonSelect">
                <v-subheader>PhenomenonList</v-subheader>
                <v-list-item v-for="item in phenomenonList" :key="item.name">{{
                  `${interfaceLine.initiator.description}:${item.name} ${lineType[type].text}`
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

@Component({})
export default class InterfaceEditor extends Vue {
  @Prop(Boolean) active!: boolean

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

  interfaceLine: InterfaceLine = null

  description: string = ''

  initiator: number = 0
  receiver: number = 1
  get actorName() {
    return this.actors.map((e, index) => {
      return {
        text: e.description,
        value: index
      }
    })
  }
  actors: Array<Shape> = []

  type: number = 0

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

  phenomenonSelect: number = 0
  phenomenonList: Array<Phenomenon> = []

  submit() {
    if (this.initiator !== this.receiver) {
      this.interfaceLine.setInformation(
        this.description,
        this.actors[this.initiator],
        this.actors[this.receiver],
        this.type,
        this.phenomenonList
      )
    }
    this.interfaceLine.setInformation(
      this.description,
      null,
      null,
      this.type,
      this.phenomenonList
    )
    this.$emit('end-edit-interface')
  }

  cancel() {
    this.$emit('end-edit-interface')
  }

  preSet(interfaceLine: InterfaceLine) {
    this.interfaceLine = interfaceLine
    this.description = interfaceLine.description
    this.phenomenonList = interfaceLine.phenomenonList
    this.type = interfaceLine.lineType
    this.actors = [this.interfaceLine.initiator, this.interfaceLine.receiver]
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
      for (let item of this.interfaceLine.phenomenonList) {
        if (item === this.phenomenonEdit) return
      }
      this.interfaceLine.phenomenonList.push(this.phenomenonEdit)
    } else {
      let p = new Phenomenon(this.phenomenonNameEdit)
      this.interfaceLine.phenomenonList.push(p)
    }
  }

  del(): void {
    this.interfaceLine.phenomenonList.splice(this.phenomenonSelect, 1)
  }

  selectPhenomenon(index): void {
    this.phenomenonEdit = this.globalPhenomenonList[index]
    this.phenomenonNameEdit = this.globalPhenomenonList[index].name
  }
}
</script>

<style scoped />
