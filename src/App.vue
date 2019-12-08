<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawerRight"
      app
      clipped
      permanent
      right
      width="400"
    >
      <v-list dense class="body-2" expand>
        <v-list-group value="true" disabled>
          <template v-slot:activator>
            <v-list-item>Process of scenario based projection</v-list-item>
          </template>

          <v-list-group sub-group no-action disabled v-model="tmp" value="2">
            <template v-slot:activator>
              <v-list-item :input-value="activeStep === 1"
                >Step 1: Draw the context diagram</v-list-item
              >
            </template>
            <v-list-item :input-value="activeStep === 1 && subStep === 1">
              <v-list-item-action>1.1: Designate machine.</v-list-item-action>
            </v-list-item>
            <v-list-item :input-value="activeStep === 1 && subStep === 2">
              <v-list-item-action>1.2: Identify domains.</v-list-item-action>
            </v-list-item>
            <v-list-item :input-value="activeStep === 1 && subStep === 3">
              <v-list-item-action
                >1.3: Identify interactions.</v-list-item-action
              >
            </v-list-item>
            <v-list-item :input-value="activeStep === 1 && subStep === 4">
              <v-list-item-action
                >1.4: Check context diagram.</v-list-item-action
              >
            </v-list-item>
          </v-list-group>
          <v-list-group value="true" sub-group no-action disabled>
            <template v-slot:activator>
              <v-list-item :input-value="activeStep === 2"
                >Step 2: Draw the problem diagram</v-list-item
              >
            </template>
            <v-list-item :input-value="activeStep === 2 && subStep === 1">
              <v-list-item-action
                >2.1: Identity requirements.</v-list-item-action
              >
            </v-list-item>
            <v-list-item :input-value="activeStep === 2 && subStep === 2">
              <v-list-item-action>2.1: Identify references.</v-list-item-action>
            </v-list-item>
            <v-list-item :input-value="activeStep === 2 && subStep === 3">
              <v-list-item-action
                >2.3: Check problem diagram.</v-list-item-action
              >
            </v-list-item>
          </v-list-group>
        </v-list-group>
        <v-container>
          <v-row align="center" justify="space-around">
            <v-btn color="deep-purple darken-1" dark @click="back">BACK</v-btn>
            <v-btn color="deep-purple darken-1" dark @click="next">NEXT</v-btn>
          </v-row>
        </v-container>
        <v-list-group value="true">
          <template v-slot:activator>
            <v-list-item>Diagram</v-list-item>
          </template>
        </v-list-group>
        <v-list-group value="true">
          <template v-slot:activator>
            <v-list-item>Phenomenon</v-list-item>
          </template>
        </v-list-group>
        <v-list-group value="true">
          <template v-slot:activator>
            <v-list-item>Interaction</v-list-item>
          </template>
        </v-list-group>
        <v-list-group value="true">
          <template v-slot:activator>
            <v-list-item>Reference</v-list-item>
          </template>
        </v-list-group>
        <v-list-group value="true">
          <template v-slot:activator>
            <v-list-item>Other Information</v-list-item>
          </template>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>

    <v-navigation-drawer
      permanent
      mini-variant
      v-model="drawerRight"
      app
      clipped
      left
    >
      <v-list dense>
        <v-list-item-group v-model="activePen">
          <v-list-item
            v-for="item in pens"
            :title="item.name"
            :key="item.name"
            :disabled="!item.allow"
          >
            <v-list-item-action>
              <v-img :alt="item.name" width=".5em" :src="item.src" />
            </v-list-item-action>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app clipped-right clipped-left color="deep-purple darken-1" dark>
      <v-toolbar-title>Context Diagram</v-toolbar-title>
      <v-spacer />
      <v-dialog v-model="newDialog" persistent max-width="300px">
        <template v-slot:activator="{ on }">
          <v-btn text dark v-on="on">New</v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="headline">New Project</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-text-field
                  label="description"
                  v-model="projectDescription"
                />
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn color="blue darken-1" text @click="newProject"
              >Confirm</v-btn
            >
            <v-btn color="blue darken-1" text @click="newDialog = false"
              >Cancel</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-btn text>Merge</v-btn>
      <v-menu open-on-hover bottom offset-y>
        <template v-slot:activator="{ on }">
          <v-btn text v-on="on">Import</v-btn>
        </template>
        <v-list>
          <v-list-item v-for="n in 1" :key="n" @click="() => {}">
            <v-list-item-title @click="upload()"
              >Import Project</v-list-item-title
            >
          </v-list-item>
        </v-list>
      </v-menu>
      <v-btn text @click="download()">Save</v-btn>
      <v-menu open-on-hover bottom offset-y>
        <template v-slot:activator="{ on }">
          <v-btn text v-on="on">Export</v-btn>
        </template>
        <v-list>
          <v-list-item @click="download">
            <v-list-item-title>Export Project</v-list-item-title>
          </v-list-item>
          <v-list-item @click="downloadPNG">
            <v-list-item-title>Export As PNG</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

      <v-btn text>Help</v-btn>
    </v-app-bar>

    <machine-editor
      @end-edit-machine="endEditMachine"
      ref="machine-editor"
      :active="onEditMachine"
    />

    <domain-editor
      @end-edit-domain="endEditDomain"
      ref="domain-editor"
      :active="onEditDomain"
    />

    <requirement-editor
      @end-edit-requirement="endEditRequirement"
      ref="requirement-editor"
      :active="onEditRequirement"
    />

    <line-editor
      @end-edit-line="endEditLine"
      ref="line-editor"
      :active="onEditLine"
    />

    <v-content class="grey lighten-1">
      <v-container class="fill-height" fluid>
        <v-row justify="center" align="center">
          <div id="canvas"></div>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import Canvas from '@/app/Canvas'
import MachineEditor from '@/components/MachineEditor.vue'
import Machine from '@/app/graph/shape/Machine'
import { Domain } from '@/app/graph/shape/Domain'
import DomainEditor from '@/components/DomainEditor.vue'
import RequirementEditor from '@/components/RequirementEditor.vue'
import Requirement from '@/app/graph/shape/Requirement'
import Procedure from '@/app/Procedure'
import { Phenomenon } from '@/app/graph/Phenomenon'
import LineEditor from '@/components/LineEditor.vue'
import { Line } from '@/app/graph/line/Line'

@Component({
  components: {
    LineEditor,
    MachineEditor,
    DomainEditor,
    RequirementEditor
  },
  watch: {
    activePen(val) {
      this.canvas.activePen = val
    }
  },
  mounted() {},
  created() {
    document.addEventListener('keyup', ev => {
      if (ev.code === 'Backspace' || ev.code === 'Delete') this.deleteElement()
    })
    this.$on('editMachine', this.editMachine)
    this.$on('editDomain', this.editDomain)
    this.$on('editRequirement', this.editRequirement)
    this.$on('edit-line', this.editLine)
    this.$on('giveWarn', this.giveWarn)
  }
})
export default class App extends Vue {
  newDialog: boolean = false
  projectDescription: string = ''
  get projectName(): string {
    if (this.projectDescription.length > 0) return this.projectDescription
    else return 'Default'
  }
  drawerRight: boolean = true
  pens = [
    {
      name: 'machine',
      src: require('@/assets/machine.svg'),
      allow: false
    },
    {
      name: 'domain',
      src: require('@/assets/problem-domain.svg'),
      allow: false
    },
    {
      name: 'requirement',
      src: require('@/assets/requirement.svg'),
      allow: false
    },
    {
      name: 'interface',
      src: require('@/assets/interface.svg'),
      allow: false
    },
    {
      name: 'reference',
      src: require('@/assets/reference.svg'),
      allow: false
    },
    {
      name: 'constraint',
      src: require('@/assets/constraint.svg'),
      allow: false
    }
  ]
  tmp: any = 2
  activeStep: number = 1
  subStep: number = 1
  activePen: number = -1
  canvas: Canvas | null = null
  procedure: Procedure | null = null

  onEditMachine: boolean = false
  editingMachine: Machine | undefined

  onEditDomain: boolean = false
  editingDomain: Domain | undefined

  onEditRequirement: boolean = false
  editingRequirement: Requirement | undefined

  onEditLine: boolean = false
  editingLine: Line | undefined

  back(): void {
    let obj = this.procedure.previous()
    this.activeStep = obj.step
    this.subStep = obj.subStep
    this.flushAllow()
  }

  next(): void {
    let obj = this.procedure.next()

    if (obj.err) {
      alert(obj.err)
    } else {
      this.activeStep = obj.step
      this.subStep = obj.subStep
      if (obj.success.length > 0) alert(obj.success)
      this.flushAllow()
    }
  }

  deleteElement(): void {
    if (!this.canvas) return
    this.canvas.deleteElement()
  }

  editMachine(machine: Machine): void {
    this.onEditMachine = true
    this.editingMachine = machine
    // @ts-ignore
    this.$refs['machine-editor'].preSet(machine.description, machine.shortName)
  }

  editDomain(domain: Domain): void {
    this.onEditDomain = true
    this.editingDomain = domain
    // @ts-ignore
    this.$refs['domain-editor'].preSet(
      domain.description,
      domain.shortName,
      domain.domainType,
      domain.physicalProperty
    )
  }

  editRequirement(requirement: Requirement): void {
    this.onEditRequirement = true
    this.editingRequirement = requirement
    // @ts-ignore
    this.$refs['requirement-editor'].preSet(requirement.description)
  }

  editLine(line: Line): void {
    this.onEditLine = true
    this.editingLine = line
    // @ts-ignore
    this.$refs['line-editor'].preSet(line)
  }

  endEditMachine(info: { description: string; shortName: string }): void {
    this.onEditMachine = false
    if (!this.editingMachine) return
    this.editingMachine.setInformation(info.description, info.shortName)
    this.editingMachine = undefined
  }

  endEditDomain(info: {
    description: string
    shortName: string
    domainType: number
    physicalProperty: number
  }): void {
    this.onEditDomain = false
    if (!this.editingDomain) return
    this.editingDomain.setInformation(
      info.description,
      info.shortName,
      info.domainType,
      info.physicalProperty
    )
    this.editingDomain = undefined
  }

  endEditRequirement(info: { description: string }): void {
    this.onEditRequirement = false
    if (!this.editingRequirement) return
    this.editingRequirement.setInformation(info.description)
    this.editingRequirement = undefined
  }

  endEditLine(): void {
    this.onEditLine = false
    if (!this.editingLine) return
    this.editingLine = undefined
  }

  giveWarn(message: string) {
    alert(message)
  }

  flushAllow(): void {
    this.procedure.getAllow().forEach((item, index) => {
      this.pens[index].allow = item
    })
  }

  upload() {
    let inputObj = document.createElement('input')
    inputObj.setAttribute('id', 'file')
    inputObj.setAttribute('type', 'file')
    inputObj.setAttribute('name', 'file')
    inputObj.click()
    inputObj.onchange = e => {
      // @ts-ignore
      let files = e.target.files

      let fr = new FileReader()
      fr.onload = e => {
        // @ts-ignore
        let r = JSON.parse(e.target.result)
        this.projectDescription = r.projectName
        this.procedure = new Procedure(this.canvas, r.step, r.subStep)
        this.activeStep = r.step
        this.subStep = r.subStep
        this.flushAllow()
        for (let item of r.phenomenonList) {
          new Phenomenon(item.name)
        }
        this.canvas = Canvas.load(this, r)
      }
      fr.readAsText(files[0])
    }
  }

  download() {
    let final = {
      projectName: this.projectName,
      step: this.activeStep,
      subStep: this.subStep,
      componentsCount: this.canvas.componentsCount,
      machine: this.canvas.machine.toSerializable(),
      domainList: this.canvas.domainList.map(e => e.toSerializable()),
      domainCount: this.canvas.domainCount,
      requirement: this.canvas.requirement.toSerializable(),
      interfaceList: this.canvas.interfaceList.map(e => e.toSerializable()),
      interfaceCount: this.canvas.interfaceCount,
      referenceList: this.canvas.referenceList.map(e => e.toSerializable()),
      referenceCount: this.canvas.referenceCount,
      constraintList: this.canvas.constraintList.map(e => e.toSerializable()),
      constraintCount: this.canvas.constraintCount,
      phenomenonList: Phenomenon.PhenomenonList.map(e => e.toSerializable())
    }
    let buffer = JSON.stringify(final)
    let downloadBlobURL = URL.createObjectURL(
      new Blob([buffer], {
        type: 'text/json'
      })
    )
    let tmpNode = document.createElement('a')
    tmpNode.setAttribute('href', downloadBlobURL)
    tmpNode.setAttribute('download', this.projectName + '.json')
    tmpNode.click()
  }

  downloadPNG(): void {
    this.canvas.exportImage()
  }

  newProject(): void {
    Canvas.init(this)
    this.canvas = new Canvas()
    this.newDialog = false
    this.procedure = new Procedure(this.canvas)
    this.flushAllow()
  }
}
</script>
